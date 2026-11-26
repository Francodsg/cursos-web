(function(){
"use strict";
const $ = (s, el) => (el || document).querySelector(s), $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
const app = $("#app");
const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const norm = s => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9ñ ]/g, " ").replace(/\s+/g, " ").trim();
const slugify = s => norm(s).replace(/ /g, "-");
const H = p => "#/" + p;
const {fmtM, fmtN, fmtP, plazo, lineChart} = window.FMT;
const store = { get(k, d){ try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch(e){ return d; } },
                set(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} } };
const AVISO = "Contenido educativo; no es asesoría financiera, fiscal ni de inversión.";

// ---------- Datos combinados ----------
const CAM = window.CAMINOS;
const nuevos = window.MILLONARIOS_2 || [];
const PERFILES = window.MILLONARIOS.map(p => Object.assign({}, p, (window.EXTRA_PERFILES || {})[p.slug])).concat(nuevos);
// Fichas breves que aún no tengan perfil completo
window.BREVES.forEach(b => { if (!PERFILES.some(p => norm(p.nombre) === norm(b[0]))) PERFILES.push({slug: slugify(b[0]), nombre:b[0], fechas:b[1], camino:b[2], resumen:b[3], full:false, pais:"", sector:""}); });
PERFILES.forEach(p => {
  const brief = window.BREVES.find(b => norm(b[0]) === norm(p.nombre) || (p.slug === "millonario-tipico" && false));
  p.resumen = p.resumen || (brief ? brief[3] : (p.creacion || "").split(". ")[0] + ".");
  const y = parseInt(p.fechas, 10);
  p.epoca = isNaN(y) ? "Actual" : y < 1900 ? "Siglo XIX" : y < 1950 ? "Siglo XX (1900–1949)" : "Siglo XX (desde 1950)";
  p.apellido = p.nombre.split(" ").slice(-1)[0];
});
const bySlug = s => PERFILES.find(p => p.slug === s);
const EST = window.ESTRATEGIAS.map(e => ({slug:e[0], t:e[1], d:e[2], ej:e[3], tool:e[4], ...(window.ESTRATEGIA_DETALLE[e[0]] || {})}));
const TOOLMETA = Object.fromEntries(window.HERRAMIENTAS.map(h => [h[0], {slug:h[0], t:h[1], d:h[2]}]));
const toolLink = s => s && TOOLMETA[s] ? `<a href="${H("herramientas/" + s)}">${esc(TOOLMETA[s].t)}</a>` : "";
// Estrategias relacionadas con un perfil (por apellido en la lista de ejemplos)
const relEst = p => EST.filter(e => norm(e.ej).includes(norm(p.apellido)) || (e.ej === "Todos" && p.camino !== "ADV"));
// Enlaza apellidos de una lista de ejemplos con sus perfiles
function linkNames(txt){
  return esc(txt).split(/(, | y |; )/).map(part => { const p = PERFILES.find(q => q.full && part.includes(q.apellido) && q.apellido.length > 3); return p ? part.replace(p.apellido, `<a href="${H("millonarios/" + p.slug)}">${p.apellido}</a>`) : part; }).join("");
}

// ---------- Estado de «Mi plan» (solo en este navegador) ----------
const PKEY = "fin.plan";
const plan = () => Object.assign({diag:null, etapa:null, checks:{}, metas:[], registros:[], tareas:[], presupuesto:null, cartas:[], escuela:{lec:{}, quiz:{}}, revisiones:{}}, store.get(PKEY, {}));
const savePlan = p => { store.set(PKEY, p); };
function addTarea(t, origen){ const p = plan(); if (!p.tareas.some(x => x.t === t)){ p.tareas.push({t, origen, hecho:false}); savePlan(p); } toast("Añadido a «Mi plan»: " + t); }
function toast(msg){ let el = $("#toast"); if (!el){ el = document.createElement("div"); el.id = "toast"; el.setAttribute("role", "status"); document.body.appendChild(el); } el.textContent = msg; el.className = "show"; clearTimeout(toast.t); toast.t = setTimeout(() => el.className = "", 2600); }

function informe(d){
  if (!d) return null;
  const gastos = (d.gFijos || 0) + (d.gVar || 0), ahorroMes = (d.ingresos || 0) - gastos;
  const deudaTotal = d.deudas.reduce((s, x) => s + x.saldo, 0);
  const coste = deudaTotal ? d.deudas.reduce((s, x) => s + x.saldo * x.tae, 0) / deudaTotal : 0;
  const deudaCara = d.deudas.some(x => x.saldo > 0 && x.tae > 10);
  const neto = (d.ahorroLiq || 0) + (d.inversiones || 0) + (d.otrosActivos || 0) - deudaTotal;
  const colchon = gastos ? (d.ahorroLiq || 0) / gastos : 0, tasa = d.ingresos ? ahorroMes / d.ingresos : 0;
  const etapa = (colchon < 3 || deudaCara) ? 1 : tasa < 0.10 ? 2 : (d.inversiones || 0) < gastos * 12 ? 3 : (d.inversiones || 0) < gastos * 12 * 10 ? 4 : 5;
  const riesgo = d.riesgo && d.riesgo.length === 8 && d.riesgo.every(Boolean) ? window.CALC.perfilRiesgo(d.riesgo) : null;
  return {gastos, ahorroMes, deudaTotal, coste, deudaCara, neto, colchon, tasa, etapa, riesgo};
}
function racha(regs){ const ms = regs.filter(r => r.aporte > 0).map(r => r.mes).sort(); let best = 0, cur = 0, prev = null;
  ms.forEach(m => { const [y, mm] = m.split("-").map(Number), idx = y * 12 + mm; cur = prev !== null && idx === prev + 1 ? cur + 1 : 1; prev = idx; best = Math.max(best, cur); }); return best; }
function insignias(p){
  const inf = informe(p.diag), got = new Set();
  if (p.presupuesto) got.add("presupuesto");
  if (inf && inf.colchon >= 3) got.add("colchon");
  if (inf && !inf.deudaCara) got.add("sin-deuda-cara");
  if (p.checks["2-1"]) got.add("aporte");
  if (racha(p.registros) >= 12) got.add("constante");
  if ((p.cartas || []).length >= 5) got.add("lector");
  if ((p.escuela.quiz.E6 || 0) >= 0.7) got.add("antifraude");
  if (p.diag) got.add("diagnostico");
  if (window.ESCUELA.every(m => (p.escuela.quiz[m.id] || 0) >= 0.7)) got.add("escuela");
  return got;
}

// ---------- Preguntas de la Escuela ----------
function hash(s){ let h = 2166136261; for (let i = 0; i < s.length; i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function shuffled(opts, seed){ const a = opts.map((o, i) => [o, i]); let h = hash(seed); for (let i = a.length - 1; i > 0; i--){ h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0; const j = h % (i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function preguntasModulo(id){
  const m = window.ESCUELA.find(x => x.id === id);
  const base = m.Q.map(q => ({lec:0, q:q[0], opts:q[1], ans:q[2], ex:""}));
  const extra = window.PREGUNTAS.filter(q => q[0] === id).map(q => ({lec:q[1], q:q[2], opts:q[3], ans:0, ex:q[4]}));
  return base.concat(extra);
}
function preguntasLeccion(id, n){
  const all = preguntasModulo(id), own = all.filter(q => q.lec === n), rest = all.filter(q => q.lec !== n).sort((a, b) => hash(a.q + n) - hash(b.q + n));
  return own.concat(rest).slice(0, 5);
}
function quizHTML(qs, key){
  return `<form class="quiz" data-key="${esc(key)}">` + qs.map((q, k) => {
    const opts = shuffled(q.opts, q.q);
    return `<fieldset class="qq" data-ans="${opts.findIndex(o => o[1] === q.ans)}"><legend>${k + 1}. ${esc(q.q)}</legend>` +
      opts.map((o, j) => `<label><input type="radio" name="q${k}" value="${j}"> ${esc(o[0])}</label>`).join("") +
      `<p class="ex" hidden>${esc(q.ex)}</p></fieldset>`;
  }).join("") + `<button class="btn" type="submit">Corregir</button> <span class="qres" aria-live="polite"></span></form>`;
}
function bindQuiz(onScore){
  $$("form.quiz").forEach(f => f.addEventListener("submit", ev => {
    ev.preventDefault(); let ok = 0; const fs = $$("fieldset.qq", f);
    fs.forEach((q, k) => { const sel = $(`input[name=q${k}]:checked`, q), good = +q.dataset.ans;
      $$("label", q).forEach((l, j) => l.className = j === good ? "right" : (sel && +sel.value === j ? "wrong" : ""));
      if (sel && +sel.value === good) ok++; const ex = $(".ex", q); if (ex.textContent) ex.hidden = false; });
    const s = ok / fs.length; $(".qres", f).innerHTML = `<b>${ok} de ${fs.length}</b> (${Math.round(s * 100)} %) ${s >= 0.7 ? "· ¡Aprobado!" : "· Necesitas un 70 % para aprobar."}`;
    if (onScore) onScore(s, f.dataset.key);
  }));
}

// ---------- Herramientas: interfaz ----------
function toolHTML(slug, compact){
  const t = window.TOOLS[slug], m = TOOLMETA[slug];
  const saved = store.get("fin.tool." + slug, {});
  const field = f => {
    const [id, label, def, type, opts] = f, val = saved[id] != null ? saved[id] : def, unit = type === "p" ? "%" : type === "m" ? window.FMT.moneda() : "";
    if (type === "s") return `<label class="fld"><span>${esc(label)}</span><select data-id="${id}" data-type="s">${opts.map(o => `<option value="${o[0]}"${String(val) === o[0] ? " selected" : ""}>${esc(o[1])}</option>`).join("")}</select></label>`;
    if (type === "t") return `<label class="fld"><span>${esc(label)}</span><input data-id="${id}" data-type="t" value="${esc(val)}"></label>`;
    return `<label class="fld"><span>${esc(label)}${unit ? ` <small>(${unit})</small>` : ""}</span><input data-id="${id}" data-type="${type}" type="number" inputmode="decimal" step="any" value="${val}"></label>`;
  };
  let fields;
  if (t.groups){ const per = (t.fields.length - 1) / t.groups; fields = Array.from({length: t.groups}, (_, g) => `<fieldset class="grp"><legend>Deuda ${g + 1}</legend>${t.fields.slice(g * per, g * per + per).map(field).join("")}</fieldset>`).join("") + t.fields.slice(t.groups * per).map(field).join(""); }
  else fields = t.fields.map(field).join("");
  return `<section class="tool" data-tool="${slug}">${compact ? `<h2>${esc(m.t)}</h2>` : ""}<p>${esc(t.intro)}</p>
  <div class="toolgrid"><form class="fields" onsubmit="return false">${fields}</form><div class="out" aria-live="polite"></div></div>
  <div class="toolbar"><button class="btn ghost" data-act="csv">Exportar CSV</button><button class="btn ghost" data-act="copy">Copiar resultado</button>${t.save ? `<button class="btn" data-act="save">${t.save === "presupuesto" ? "Guardar en «Mi plan»" : "Registrar este mes en «Mi plan»"}</button>` : ""}<button class="btn ghost" data-act="reset">Valores de ejemplo</button></div>
  <p class="aviso">Los resultados son estimaciones con supuestos simplificados, no promesas. ${AVISO}</p></section>`;
}
function bindTool(root){
  $$("section.tool", root).forEach(sec => {
    const slug = sec.dataset.tool, t = window.TOOLS[slug]; let last = null;
    const read = () => { const v = {}; $$("[data-id]", sec).forEach(i => { v[i.dataset.id] = i.dataset.type === "t" ? i.value : (parseFloat(String(i.value).replace(",", ".")) || 0); }); return v; };
    const run = () => {
      const v = read(); store.set("fin.tool." + slug, v);
      last = t.calc(v);
      $(".out", sec).innerHTML = (last.kpis ? `<div class="kpis">${last.kpis.map(k => `<div class="kpi"><span>${esc(k[0])}</span><b>${k[1]}</b></div>`).join("")}</div>` : "") +
        `<div class="interp">${last.text || ""}</div>` + (last.chart || "") +
        (last.table ? `<details class="tbl"><summary>Ver la tabla</summary><div class="scroll"><table>${last.table.map((r, i) => `<tr>${r.map(c => i ? `<td>${c}</td>` : `<th>${esc(c)}</th>`).join("")}</tr>`).join("")}</table></div></details>` : "");
    };
    sec.addEventListener("input", run);
    sec.addEventListener("click", ev => {
      const act = ev.target.dataset.act; if (!act) return;
      const plain = () => $(".out", sec).innerText;
      if (act === "csv"){ const rows = last && last.table ? last.table : (last && last.kpis ? [["Concepto","Valor"]].concat(last.kpis) : []);
        const csv = rows.map(r => r.map(c => '"' + String(c).replace(/<[^>]+>/g, "").replace(/"/g, '""') + '"').join(";")).join("\n");
        const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob(["﻿" + csv], {type:"text/csv"})); a.download = slug + ".csv"; a.click(); }
      if (act === "copy"){ (navigator.clipboard ? navigator.clipboard.writeText(plain()) : Promise.reject()).then(() => toast("Resultado copiado"), () => toast("No se pudo copiar")); }
      if (act === "reset"){ store.set("fin.tool." + slug, {}); const host = sec.parentNode, compact = !!$("h2", sec); sec.outerHTML = toolHTML(slug, compact); bindTool(host); }
      if (act === "save"){ const v = read(), p = plan();
        if (t.save === "presupuesto"){ p.presupuesto = {fecha: new Date().toISOString().slice(0, 10), ...v}; savePlan(p); toast("Presupuesto guardado en «Mi plan»"); }
        else { const r = window.CALC.valorNeto([v.a1, v.a2, v.a3, v.a4], [v.p1, v.p2, v.p3]); const mes = new Date().toISOString().slice(0, 7);
          const ex = p.registros.find(x => x.mes === mes); if (ex) ex.neto = r.neto; else p.registros.push({mes, neto: r.neto, aporte: 0}); p.registros.sort((a, b) => a.mes < b.mes ? -1 : 1); savePlan(p); toast("Valor neto registrado para " + mes); } }
    });
    run();
  });
}

// ---------- Plantillas ----------
const crumbs = items => `<nav class="crumbs" aria-label="Migas de pan"><a href="#/">Inicio</a>${items.map(i => " › " + (i[1] ? `<a href="${H(i[1])}">${esc(i[0])}</a>` : `<span>${esc(i[0])}</span>`)).join("")}</nav>`;
const camTag = c => `<span class="tag" style="--tc:${CAM[c][1]}">${esc(CAM[c][0])}</span>`;
const mono = p => `<span class="mono" style="--tc:${CAM[p.camino][1]}" aria-hidden="true">${esc(p.nombre.replace(/^(El|Los) /, "").split(/ |-/).filter(w => /^[A-ZÁÉÍÓÚ]/.test(w)).slice(0, 2).map(w => w[0]).join(""))}</span>`;
const card = p => `<a class="card pcard" href="${H("millonarios/" + p.slug)}" style="--c:${CAM[p.camino][1]}">${mono(p)}<div><h3>${esc(p.nombre)}</h3><p class="meta">${esc(p.fechas)}${p.pais ? " · " + esc(p.pais) : ""}</p>${p.sector ? `<p class="meta">${esc(p.sector)}</p>` : ""}${p.fortuna ? `<p class="fort">${esc(p.fortuna)}</p>` : ""}${camTag(p.camino)}</div></a>`;
const sesgo = `<aside class="note"><b>Sesgo de supervivencia.</b> Por cada persona de esta lista hubo muchas que siguieron estrategias parecidas y fracasaron. Por eso cada perfil separa lo que se puede copiar (hábitos, principios, conocimientos) de lo que no (suerte, momento histórico, herencia, contexto).</aside>`;
const list = a => a && a.length ? `<ul>${a.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : "<p class='meta'>—</p>";

// ---------- Páginas ----------
const V = {};
V.inicio = () => {
  const day = Math.floor(Date.now() / 864e5), full = PERFILES.filter(p => p.full && p.camino !== "ADV"), dest = full[day % full.length], e = EST[day % EST.length], p = plan();
  return `<section class="hero"><p class="kicker">Finanzas y Millonarios</p><h1>Cómo se crea y se conserva la riqueza</h1>
  <p class="lead">La meta no es hacerse rico rápido, sino dejar de ser pobre despacio: gastar menos de lo que ganas, invertir con paciencia y no perder lo construido.</p>
  <p><a class="btn" href="${H("mi-plan/diagnostico")}">${p.diag ? "Actualiza tu diagnóstico" : "Haz tu diagnóstico"}</a> <a class="btn ghost" href="${H("millonarios")}">Ver los millonarios</a></p></section>
  <div class="two"><section class="panel"><p class="kicker">Millonario destacado</p>${card(dest)}<p>${esc(dest.resumen)}</p></section>
  <section class="panel"><p class="kicker">Estrategia del día</p><h2><a href="${H("estrategias/" + e.slug)}">${esc(e.t)}</a></h2><p>${esc(e.d)}</p><p class="meta">Ejemplos: ${linkNames(e.ej)}</p></section></div>
  <section class="panel">${toolHTML("compuesto", true)}</section>
  <h2>Explora el sitio</h2><div class="grid">
  ${[["millonarios","Los millonarios",PERFILES.length + " perfiles por camino: inversores, fundadores, comercio, conglomerados, industriales, millonarios comunes y advertencias."],["estrategias","Las 16 estrategias","Síntesis de lo que hicieron, con evidencia, pasos y errores frecuentes."],["mantener","Cómo se mantiene la riqueza","Diversificación, seguros, inflación, impuestos, sucesión y fraudes."],["escuela","Escuela financiera","32 lecciones en 6 módulos con quizzes."],["herramientas","Herramientas","11 calculadoras: interés compuesto, independencia, deudas, comisiones…"],["mi-plan","Mi plan","Diagnóstico, cinco etapas, metas, valor neto e insignias."],["comparar","Comparador","Dos o tres millonarios lado a lado."],["alertas-de-fraude","Alertas de fraude","Señales de alerta y dónde denunciar."]].map(x => `<a class="card" href="${H(x[0])}"><h3>${x[1]}</h3><p class="meta">${x[2]}</p></a>`).join("")}</div>`;
};

V.millonarios = () => {
  const f = store.get("fin.filtros", {c:"", p:"", e:"", q:""});
  const paises = [...new Set(PERFILES.map(p => p.pais).filter(Boolean))].sort(), epocas = ["Siglo XIX", "Siglo XX (1900–1949)", "Siglo XX (desde 1950)", "Actual"];
  const sel = (id, label, opts, cur) => `<label class="fld inline"><span>${label}</span><select id="${id}"><option value="">Todos</option>${opts.map(o => `<option value="${esc(o[0])}"${cur === o[0] ? " selected" : ""}>${esc(o[1])}</option>`).join("")}</select></label>`;
  return crumbs([["Millonarios"]]) + `<h1>Los millonarios</h1><p class="lead">Quiénes son, qué sabían, cómo crearon su riqueza y cómo la mantienen. ${esc(window.FECHA_CIFRAS)}</p>
  <div class="filters">${sel("fc", "Camino", Object.entries(CAM).map(([k, v]) => [k, v[0]]), f.c)}${sel("fp", "País", paises.map(x => [x, x]), f.p)}${sel("fe", "Época de nacimiento", epocas.map(x => [x, x]), f.e)}
  <label class="fld inline"><span>Nombre</span><input id="fq" type="search" value="${esc(f.q)}" placeholder="Filtrar…"></label></div>
  <p id="count" class="meta" aria-live="polite"></p><div id="plist"></div>${sesgo}`;
};
function bindMillonarios(){
  const draw = () => {
    const f = {c: $("#fc").value, p: $("#fp").value, e: $("#fe").value, q: $("#fq").value}; store.set("fin.filtros", f);
    const L = PERFILES.filter(p => (!f.c || p.camino === f.c) && (!f.p || p.pais === f.p) && (!f.e || p.epoca === f.e) && (!f.q || norm(p.nombre).includes(norm(f.q))));
    $("#count").textContent = L.length + " de " + PERFILES.length + " perfiles";
    $("#plist").innerHTML = Object.keys(CAM).map(c => { const g = L.filter(p => p.camino === c); return g.length ? `<h2>${esc(CAM[c][0])}</h2><div class="grid">${g.map(card).join("")}</div>` : ""; }).join("") || "<p>No hay perfiles con esos filtros.</p>";
  };
  ["#fc", "#fp", "#fe", "#fq"].forEach(s => $(s).addEventListener("input", draw)); draw();
}

V.perfil = slug => {
  const p = bySlug(slug); if (!p) return V.notfound();
  if (!p.full) return crumbs([["Millonarios", "millonarios"], [p.nombre]]) + `<h1>${esc(p.nombre)}</h1><p>${camTag(p.camino)} <span class="meta">${esc(p.fechas)}</span></p><p class="lead">${esc(p.resumen)}</p>`;
  const rel = relEst(p), others = PERFILES.filter(q => q.full && q.slug !== p.slug && q.camino === p.camino).slice(0, 1);
  return crumbs([["Millonarios", "millonarios"], [p.nombre]]) + `<article class="perfil">
  <header class="phead" style="--c:${CAM[p.camino][1]}">${mono(p)}<div><h1>${esc(p.nombre)}</h1><p>${camTag(p.camino)} <span class="meta">${esc(p.fechas)}</span></p></div></header>
  <section class="ficha"><h2 class="sr">Ficha</h2><dl>
    <div><dt>País</dt><dd>${esc(p.pais)}</dd></div><div><dt>Sector</dt><dd>${esc(p.sector)}</dd></div>
    <div><dt>Fortuna aproximada</dt><dd>${esc(p.fortuna)}<br><small>${esc(window.FECHA_CIFRAS)}</small></dd></div>
    ${p.millon ? `<div><dt>Primer millón</dt><dd>${esc(p.millon)}</dd></div>` : ""}</dl></section>
  <nav class="toc" aria-label="Secciones del perfil">${["Punto de partida","Conocimientos clave","Cómo creó la riqueza","Decisiones clave","Cómo la mantiene","Errores y crisis","Estrategias","Qué puedes copiar","Fuentes"].map((t, i) => `<a href="#s${i}" data-anchor="s${i}">${t}</a>`).join("")}</nav>
  <h2 id="s0">Punto de partida</h2><p>${esc(p.partida)}</p>
  <h2 id="s1">Conocimientos clave</h2><p>${esc(p.conoc)}</p>
  <h2 id="s2">Cómo creó la riqueza</h2><p>${esc(p.creacion)}</p>
  <h2 id="s3">Decisiones clave</h2><ol class="decisiones">${p.decisiones.map(d => `<li><b>${esc(d[0])}.</b> ${esc(d[1])}</li>`).join("")}</ol>
  <h2 id="s4">Cómo la mantiene o la mantuvo</h2><p>${esc(p.mantiene)}</p>${p.filan && p.filan !== "—" ? `<p><b>Filantropía:</b> ${esc(p.filan)}</p>` : ""}
  <h2 id="s5">Errores y crisis</h2><p>${esc(p.errores)}</p>
  <section class="box" id="s6"><h2>Estrategias concretas</h2><ul class="strat">${p.estrategias.map(s => `<li><span>${esc(s)}</span><button class="mini" data-add="${esc(s)}" data-origen="${esc(p.nombre)}" aria-label="Añadir a mi plan: ${esc(s)}">+ Añadir a mi plan</button></li>`).join("")}</ul></section>
  <h2 id="s7">Qué puede copiar Franco y qué no</h2>
  <div class="scroll"><table class="copy"><tr><th>Se puede copiar</th><th>No se puede copiar</th></tr><tr><td>${list(p.copia)}</td><td>${list(p.nocopia)}</td></tr></table></div>
  ${p.citas && p.citas.length ? `<h2>Citas</h2>${p.citas.map(c => `<blockquote>${esc(c[0])}<cite>${esc(c[1])}</cite></blockquote>`).join("")}` : ""}
  <h2 id="s8">Para saber más</h2>${list(p.fuentes)}
  ${rel.length ? `<h2>Estrategias relacionadas</h2><p>${rel.map(e => `<a class="chip" href="${H("estrategias/" + e.slug)}">${esc(e.t)}</a>`).join(" ")}</p>` : ""}
  ${others.length ? `<p><a class="btn ghost" href="${H("comparar/" + p.slug + "/" + others[0].slug)}">Comparar con ${esc(others[0].nombre)}</a></p>` : ""}
  ${sesgo}</article>`;
};

V.estrategias = () => crumbs([["Estrategias"]]) + `<h1>Las 16 estrategias de la riqueza</h1><p class="lead">Lo que tienen en común las fortunas estudiadas, convertido en principios que cualquiera puede aplicar a su escala.</p>
  <ol class="elist">${EST.map(e => `<li><a href="${H("estrategias/" + e.slug)}"><b>${esc(e.t)}</b></a><br><span class="meta">${esc(e.d)} · Ejemplos: ${esc(e.ej)}${e.tool ? " · Herramienta: " + esc(TOOLMETA[e.tool].t) : ""}</span></li>`).join("")}</ol>`;

V.estrategia = slug => {
  const i = EST.findIndex(e => e.slug === slug); if (i < 0) return V.notfound(); const e = EST[i];
  const users = PERFILES.filter(p => p.full && relEst(p).includes(e));
  return crumbs([["Estrategias", "estrategias"], [e.t]]) + `<p class="kicker">Estrategia ${i + 1} de 16</p><h1>${esc(e.t)}</h1><p class="lead">${esc(e.d)}</p>
  <h2>Millonarios que la usaron</h2><p>${linkNames(e.ej)}</p>${users.length ? `<div class="chips">${users.map(p => `<a class="chip" href="${H("millonarios/" + p.slug)}">${esc(p.nombre)}</a>`).join("")}</div>` : ""}
  <h2>Evidencia</h2>${list(e.ev)}<h2>Cómo aplicarla</h2><ol>${(e.pasos || []).map(s => `<li>${esc(s)} <button class="mini" data-add="${esc(s)}" data-origen="${esc(e.t)}">+ Añadir a mi plan</button></li>`).join("")}</ol>
  <h2>Errores frecuentes</h2>${list(e.err)}
  ${e.tool ? `<section class="panel">${toolHTML(e.tool, true)}</section>` : ""}
  <nav class="pager">${i > 0 ? `<a href="${H("estrategias/" + EST[i - 1].slug)}">← ${esc(EST[i - 1].t)}</a>` : "<span></span>"}${i < 15 ? `<a href="${H("estrategias/" + EST[i + 1].slug)}">${esc(EST[i + 1].t)} →</a>` : ""}</nav>`;
};

V.mantener = () => crumbs([["Cómo se mantiene la riqueza"]]) + `<h1>Cómo se mantiene la riqueza</h1><p class="lead">Lo que crea una fortuna (concentración, riesgo, trabajo intenso) no es lo que la conserva (diversificación, prudencia, reglas claras).</p>
  ${window.MANTENER.map((m, i) => `<section class="panel" id="m${i}"><h2>${i + 1}. ${esc(m[0])}</h2><p>${esc(m[1])}</p>${[
    `<p>Relacionado: ${toolLink("compuesto")} · lección <a href="${H("escuela/E4/1")}">Asignación de activos</a> · ejemplos: <a href="${H("millonarios/ray-dalio")}">Ray Dalio</a>, <a href="${H("millonarios/amancio-ortega")}">Amancio Ortega (Pontegadea)</a>.</p>`,
    `<p>Relacionado: ${toolLink("emergencia")} · lección <a href="${H("escuela/E6/1")}">Seguros</a>.</p>`,
    `<p>Relacionado: ${toolLink("inflacion")}.</p>`,
    `<p>Relacionado: ${toolLink("presupuesto")} · <a href="${H("millonarios/millonario-tipico")}">El millonario de la puerta de al lado</a>.</p>`,
    `<h3>Consulta la norma de tu país</h3><p class="meta">Ejemplos orientativos; las normas cambian cada año. Verifica la norma vigente o consulta a un asesor fiscal registrado.</p><div class="scroll"><table>${window.FISCAL.map(f => `<tr><th>${esc(f[0])}</th><td>${esc(f[1])}</td></tr>`).join("")}</table></div>`,
    `<p>Ejemplos: Pontegadea (<a href="${H("millonarios/amancio-ortega")}">Ortega</a>), Cascade Investment (<a href="${H("millonarios/bill-gates")}">Gates</a>), las fundaciones de <a href="${H("millonarios/ingvar-kamprad")}">Kamprad</a>. Se explican para entenderlas, no para usarlas en patrimonios pequeños.</p>`,
    `<p>Ejemplos: la sucesión planificada de <a href="${H("millonarios/sam-walton")}">Sam Walton</a> y de <a href="${H("millonarios/amancio-ortega")}">Amancio Ortega</a>. Lección <a href="${H("escuela/E6/3")}">Sucesión</a>.</p>`,
    `<p>Ver <a href="${H("alertas-de-fraude")}">Alertas de fraude</a> y los casos de <a href="${H("millonarios/sam-bankman-fried")}">Sam Bankman-Fried</a> y <a href="${H("millonarios/eike-batista")}">Eike Batista</a>.</p>`][i]}</section>`).join("")}`;

V.escuela = () => { const p = plan();
  const done = window.ESCUELA.reduce((s, m) => s + m.L.filter((_, i) => p.escuela.lec[m.id + "-" + (i + 1)] === "done").length, 0), total = window.ESCUELA.reduce((s, m) => s + m.L.length, 0);
  return crumbs([["Escuela"]]) + `<h1>Escuela financiera</h1><p class="lead">${total} lecciones en 6 módulos, de lo básico a lo avanzado. Cada lección tiene ejemplo, millonario relacionado, herramienta, ejercicio para «Mi plan» y mini-quiz de 5 preguntas. Cada módulo termina con un quiz (aprobado con un 70 %).</p>
  <p><b>Progreso del curso:</b> ${done} de ${total} lecciones (${Math.round(done / total * 100)} %)</p><div class="bar"><i style="width:${done / total * 100}%"></i></div>
  ${window.ESCUELA.map(m => { const q = p.escuela.quiz[m.id];
    return `<section class="panel"><h2>${m.id}. ${esc(m.t)}</h2><ol class="lessons">${m.L.map((l, i) => { const st = p.escuela.lec[m.id + "-" + (i + 1)]; return `<li><a href="${H("escuela/" + m.id + "/" + (i + 1))}">${esc(l[0])}</a> <span class="st ${st || "no"}">${st === "done" ? "Completada" : st === "doing" ? "En curso" : "Sin empezar"}</span></li>`; }).join("")}</ol>
    <p><a class="btn ghost" href="${H("escuela/" + m.id + "/quiz")}">Quiz del módulo (${preguntasModulo(m.id).length} preguntas)</a> ${q != null ? `<span class="st ${q >= 0.7 ? "done" : "doing"}">Mejor nota: ${Math.round(q * 100)} %</span>` : ""}</p></section>`; }).join("")}`;
};
V.leccion = (mid, n) => {
  const m = window.ESCUELA.find(x => x.id === mid); if (!m) return V.notfound();
  if (n === "quiz") return crumbs([["Escuela", "escuela"], [m.id + ". " + m.t]]) + `<h1>Quiz del módulo ${m.id}: ${esc(m.t)}</h1><p class="meta">Aprobado con un 70 % o más. El resultado se guarda en «Mi plan».</p>${quizHTML(preguntasModulo(mid), "mod:" + mid)}`;
  const k = +n, l = m.L[k - 1]; if (!l) return V.notfound();
  const x = window.LECCION_EXTRA[mid + "-" + k] || {}, mp = x.m && bySlug(x.m), p = plan();
  if (!p.escuela.lec[mid + "-" + k]){ p.escuela.lec[mid + "-" + k] = "doing"; savePlan(p); }
  const flat = window.ESCUELA.flatMap(mm => mm.L.map((_, i) => [mm.id, i + 1, mm.L[i][0]])), pos = flat.findIndex(f => f[0] === mid && f[1] === k);
  return crumbs([["Escuela", "escuela"], [m.id + ". " + m.t, "escuela"], [l[0]]]) + `<p class="kicker">Módulo ${m.id} · Lección ${k} de ${m.L.length}</p><h1>${esc(l[0])}</h1>
  <p class="lead">${esc(l[1])}</p>${x.c ? `<p>${esc(x.c)}</p>` : ""}
  ${x.e ? `<section class="box"><h2>Ejemplo</h2><p>${esc(x.e)}</p></section>` : ""}
  <div class="two">${mp ? `<section class="panel"><p class="kicker">Millonario relacionado</p>${card(mp)}</section>` : ""}${x.h ? `<section class="panel"><p class="kicker">Herramienta</p><h3><a href="${H("herramientas/" + x.h)}">${esc(TOOLMETA[x.h].t)}</a></h3><p class="meta">${esc(TOOLMETA[x.h].d)}</p></section>` : ""}</div>
  ${x.x ? `<section class="box"><h2>Ejercicio para «Mi plan»</h2><p>${esc(x.x)}</p><button class="btn" data-add="${esc(x.x)}" data-origen="Escuela ${m.id}">+ Añadir a mis tareas</button></section>` : ""}
  <h2>Mini-quiz</h2>${quizHTML(preguntasLeccion(mid, k), "lec:" + mid + "-" + k)}
  <p><button class="btn" id="markdone">${p.escuela.lec[mid + "-" + k] === "done" ? "✓ Lección completada" : "Marcar como completada"}</button></p>
  <nav class="pager">${pos > 0 ? `<a href="${H("escuela/" + flat[pos - 1][0] + "/" + flat[pos - 1][1])}">← ${esc(flat[pos - 1][2])}</a>` : "<span></span>"}${k === m.L.length ? `<a href="${H("escuela/" + mid + "/quiz")}">Quiz del módulo →</a>` : pos < flat.length - 1 ? `<a href="${H("escuela/" + flat[pos + 1][0] + "/" + flat[pos + 1][1])}">${esc(flat[pos + 1][2])} →</a>` : ""}</nav>`;
};
function quizScore(s, key){ const p = plan();
  if (key.startsWith("mod:")){ const id = key.slice(4); p.escuela.quiz[id] = Math.max(p.escuela.quiz[id] || 0, s); }
  else if (s >= 0.6) p.escuela.lec[key.slice(4)] = "done";
  savePlan(p); }

V.herramientas = () => crumbs([["Herramientas"]]) + `<h1>Herramientas</h1><p class="lead">Calculadoras con explicación, interpretación en lenguaje sencillo y exportación. Los resultados son estimaciones, no promesas.</p>
  <label class="fld inline"><span>Moneda</span><select id="cur">${Object.entries(window.MONEDAS).map(([k, v]) => `<option value="${k}"${window.FMT.moneda() === k ? " selected" : ""}>${esc(v)}</option>`).join("")}</select></label>
  <div class="grid">${window.HERRAMIENTAS.map(h => `<a class="card" href="${H("herramientas/" + h[0])}"><h3>${esc(h[1])}</h3><p class="meta">${esc(h[2])}</p></a>`).join("")}</div><p class="aviso">${AVISO}</p>`;
V.herramienta = slug => { const m = TOOLMETA[slug]; if (!m) return V.notfound();
  const est = EST.filter(e => e.tool === slug);
  return crumbs([["Herramientas", "herramientas"], [m.t]]) + `<h1>${esc(m.t)}</h1>${toolHTML(slug, false)}${est.length ? `<p>Estrategias relacionadas: ${est.map(e => `<a href="${H("estrategias/" + e.slug)}">${esc(e.t)}</a>`).join(" · ")}</p>` : ""}`; };

V.comparar = (a, b, c) => {
  const full = PERFILES.filter(p => p.full), ids = [a || "warren-buffett", b || "amancio-ortega", c || ""];
  const sel = (k, cur) => `<label class="fld inline"><span>Millonario ${k + 1}</span><select data-k="${k}">${k === 2 ? `<option value="">(ninguno)</option>` : ""}${full.map(p => `<option value="${p.slug}"${p.slug === cur ? " selected" : ""}>${esc(p.nombre)}</option>`).join("")}</select></label>`;
  const ps = ids.map(bySlug).filter(Boolean);
  const rows = [["Fechas", p => esc(p.fechas)], ["País", p => esc(p.pais)], ["Camino", p => camTag(p.camino)], ["Sector", p => esc(p.sector)], ["Fortuna aproximada", p => esc(p.fortuna)], ["Origen", p => esc(p.partida)], ["Conocimientos clave", p => esc(p.conoc)], ["Estrategia principal", p => esc(p.estrategias[0])], ["Cómo la mantiene", p => esc(p.mantiene)], ["Filantropía", p => esc(p.filan || "—")], ["Qué puedes copiar", p => list(p.copia)]];
  return crumbs([["Comparador"]]) + `<h1>Comparador de millonarios</h1><div class="filters">${ids.map((id, k) => sel(k, id)).join("")}</div>
  <div class="scroll"><table class="cmp"><tr><th></th>${ps.map(p => `<th><a href="${H("millonarios/" + p.slug)}">${esc(p.nombre)}</a></th>`).join("")}</tr>${rows.map(r => `<tr><th>${r[0]}</th>${ps.map(p => `<td>${r[1](p)}</td>`).join("")}</tr>`).join("")}</table></div>${sesgo}`;
};

V.glosario = term => { const L = window.GLOSARIO.slice().sort((x, y) => x[0].localeCompare(y[0], "es"));
  const one = term && L.find(g => slugify(g[0]) === term);
  return crumbs(one ? [["Glosario", "glosario"], [one[0]]] : [["Glosario"]]) + (one ? `<h1>${esc(one[0])}</h1><p class="lead">${esc(one[1])}</p><p><a href="${H("glosario")}">← Todo el glosario</a></p>` :
  `<h1>Glosario financiero</h1><p class="lead">${L.length} términos explicados con sencillez.</p><label class="fld inline"><span>Filtrar</span><input id="gq" type="search" placeholder="Escribe un término…"></label>
  <dl class="gloss">${L.map(g => `<div data-t="${esc(norm(g[0] + " " + g[1]))}" id="g-${slugify(g[0])}"><dt><a href="${H("glosario/" + slugify(g[0]))}">${esc(g[0])}</a></dt><dd>${esc(g[1])}</dd></div>`).join("")}</dl>`);
};

V.biblioteca = () => { const p = plan(), cats = [...new Set(window.BIBLIOTECA.map(b => b[0]))];
  return crumbs([["Biblioteca"]]) + `<h1>Biblioteca</h1><p class="lead">Libros, cartas y documentales para seguir aprendiendo.</p>
  ${cats.map(c => `<h2>${esc(c)}</h2><ul class="books">${window.BIBLIOTECA.filter(b => b[0] === c).map(b => `<li><b>${esc(b[2])}</b> — ${esc(b[1])}<br><span class="meta">${esc(b[3])}</span></li>`).join("")}</ul>`).join("")}
  <section class="panel"><h2>Cartas de Buffett a los accionistas</h2><p class="meta">Gratuitas en la web de Berkshire Hathaway. Marca las que hayas leído: con 5 consigues la insignia «Lector de Buffett».</p>
  <ul class="checks">${window.CARTAS_BUFFETT.map((c, i) => `<li><label><input type="checkbox" data-carta="${i}"${p.cartas.includes(i) ? " checked" : ""}> Carta de ${esc(c)}</label></li>`).join("")}</ul></section>
  <h2>Fuentes citadas en los perfiles</h2><ul class="books">${PERFILES.filter(p => p.full).map(p => `<li><a href="${H("millonarios/" + p.slug)}">${esc(p.nombre)}</a>: ${esc(p.fuentes.join(" · "))}</li>`).join("")}</ul>`;
};

V.fraude = () => crumbs([["Alertas de fraude"]]) + `<h1>Alertas de fraude</h1><p class="lead">Si algo promete rendimientos altos sin riesgo y con prisa, es casi seguro una estafa.</p>
  <section class="box warn"><h2>Señales de alerta</h2><ul>${window.SENALES.map(s => `<li>${esc(s)}</li>`).join("")}</ul></section>
  <h2>Tipos de fraude y trampas</h2><div class="grid">${window.FRAUDES.map(f => `<div class="card"><h3>${esc(f[0])}</h3><p class="meta">${esc(f[1])}</p></div>`).join("")}</div>
  <h2>Dónde comprobar y denunciar</h2><p>Antes de invertir, comprueba que la entidad está registrada ante el supervisor de tu país y que no aparece en sus listas de advertencias.</p>
  <div class="scroll"><table>${window.SUPERVISORES.map(s => `<tr><th>${esc(s[0])}</th><td>${esc(s[1])}</td><td>${esc(s[2])}</td></tr>`).join("")}</table></div>
  <h2>Casos de estudio</h2><p><a href="${H("millonarios/sam-bankman-fried")}">Sam Bankman-Fried (FTX)</a> · <a href="${H("millonarios/eike-batista")}">Eike Batista</a> · <a href="${H("millonarios/jesse-livermore")}">Jesse Livermore</a> · <a href="${H("millonarios/ganadores-de-loteria")}">Ganadores de lotería</a></p>
  <p><a class="btn ghost" href="${H("escuela/E6/4")}">Lección: Fraudes</a> <a class="btn ghost" href="${H("escuela/E6/quiz")}">Quiz del módulo E6</a></p>`;

// ---------- Mi plan ----------
V.miplan = () => {
  const p = plan(), inf = informe(p.diag), got = insignias(p), etapa = p.etapa || (inf ? inf.etapa : 1);
  const head = crumbs([["Mi plan"]]) + `<h1>Mi plan</h1><p class="lead">Cómo aplicar las estrategias de los millonarios a tu vida, paso a paso. Tus datos se guardan solo en este navegador.</p>`;
  if (!inf) return head + `<section class="box"><h2>Empieza por el diagnóstico</h2><p>Un cuestionario de unos 10 minutos para conocer tu punto de partida: valor neto, tasa de ahorro, meses de colchón y coste de tus deudas.</p><a class="btn" href="${H("mi-plan/diagnostico")}">Hacer el diagnóstico</a></section>` + etapasHTML(p, 1) + accionesHTML() + datosHTML();
  const proj = [[0.02, "Pesimista (2 %)", "var(--c3)"], [0.05, "Base (5 %)", "var(--c1)"], [0.07, "Optimista (7 %)", "var(--c2)"]].map(([r, n, c]) => ({name:n, color:c, pts:[0, 1, 5, 10, 20].map(y => [y, y ? window.CALC.compuesto(Math.max(0, (p.diag.inversiones || 0) + (p.diag.ahorroLiq || 0)), Math.max(0, inf.ahorroMes), r, y).final : Math.max(0, (p.diag.inversiones || 0) + (p.diag.ahorroLiq || 0))])}));
  const fi = window.CALC.independencia(inf.gastos, 0.04, (p.diag.inversiones || 0), Math.max(0, inf.ahorroMes), 0.04);
  const pend = []; window.ETAPAS.forEach((e, i) => e[2].forEach((a, j) => { if (!p.checks[i + "-" + j] && i + 1 >= etapa) pend.push(a); }));
  const next = p.tareas.filter(t => !t.hecho).map(t => t.t).concat(pend).slice(0, 3);
  return head + `<div class="kpis big">
    <div class="kpi"><span>Etapa actual</span><b>${etapa}. ${esc(window.ETAPAS[etapa - 1][0])}</b></div>
    <div class="kpi"><span>Valor neto</span><b>${fmtM(inf.neto)}</b></div>
    <div class="kpi"><span>Tasa de ahorro</span><b>${fmtP(inf.tasa)}</b></div>
    <div class="kpi"><span>Meses de colchón</span><b>${fmtN(inf.colchon)}</b></div>
    <div class="kpi"><span>Coste medio de tus deudas</span><b>${inf.deudaTotal ? fmtN(inf.coste) + " %" : "Sin deudas"}</b></div>
    <div class="kpi"><span>Perfil de riesgo</span><b>${inf.riesgo ? inf.riesgo[0] : "—"}</b></div></div>
  <section class="box"><h2>Tus próximas 3 acciones</h2>${next.length ? `<ol>${next.map(t => `<li>${esc(t)}</li>`).join("")}</ol>` : "<p>¡Todo hecho! Haz tu revisión anual.</p>"}</section>
  <section class="panel"><h2>Informe del diagnóstico</h2>${informeTexto(p.diag, inf)}<p><a href="${H("mi-plan/diagnostico")}">Actualizar el diagnóstico</a> · <label class="inline">Etapa: <select id="etapasel">${window.ETAPAS.map((e, i) => `<option value="${i + 1}"${i + 1 === etapa ? " selected" : ""}>${i + 1}. ${esc(e[0])}</option>`).join("")}</select></label> ${p.etapa ? `<button class="mini" id="etapaauto">Usar la sugerida (${inf.etapa})</button>` : `<span class="meta">(sugerida por el diagnóstico)</span>`}</p></section>
  ${etapasHTML(p, etapa)}
  <section class="panel"><h2>Metas</h2><p class="meta">Metas SMART: específicas, medibles, alcanzables, relevantes y con fecha. Ejemplo: «Fondo de emergencia de 6 meses en 12 meses».</p>
  <ul class="checks">${p.metas.map((m, i) => `<li><label><input type="checkbox" data-meta="${i}"${m.hecho ? " checked" : ""}> <b>${esc(m.t)}</b>${m.cifra ? " · " + fmtM(m.cifra) : ""}${m.fecha ? " · antes de " + esc(m.fecha) : ""}</label>${m.cifra && m.fecha ? ` <span class="meta">(${metaMensual(m)} al mes)</span>` : ""} <button class="mini" data-delmeta="${i}" aria-label="Borrar meta">✕</button></li>`).join("") || "<li class='meta'>Aún no tienes metas.</li>"}</ul>
  <form id="metaform" class="row"><input name="t" required placeholder="Meta (p. ej., fondo de emergencia)" aria-label="Meta"><input name="cifra" type="number" step="any" placeholder="Cifra" aria-label="Cifra"><input name="fecha" type="date" aria-label="Fecha"><button class="btn">Añadir meta</button></form></section>
  <section class="panel"><h2>Proyección de patrimonio</h2><p>Con tu ahorro actual de ${fmtM(inf.ahorroMes)} al mes, invertido a 1, 5, 10 y 20 años en tres escenarios de rentabilidad nominal:</p>
  ${lineChart(proj, {fmtY: y => fmtM(y), label:"Proyección de patrimonio"})}
  <div class="scroll"><table><tr><th>Escenario</th>${[1, 5, 10, 20].map(y => `<th>${y} año${y > 1 ? "s" : ""}</th>`).join("")}</tr>${proj.map(s => `<tr><th>${s.name}</th>${s.pts.slice(1).map(pt => `<td>${fmtM(pt[1])}</td>`).join("")}</tr>`).join("")}</table></div>
  <p><b>Cifra de independencia financiera:</b> ${fmtM(fi.cifra)} (gastos anuales × 25, «regla del 4 %»). Con una rentabilidad real del 4 % la alcanzarías en ${plazo(fi.meses)}. La regla se basa en datos históricos de EE. UU.; no es una garantía. <a href="${H("herramientas/independencia")}">Ajustar en la calculadora</a>.</p>
  <p class="aviso">Las proyecciones usan rendimientos supuestos y no son promesas: los mercados pueden caer durante años.</p></section>
  ${valorNetoHTML(p)}
  ${tareasHTML(p)}
  <section class="panel"><h2>Insignias</h2><div class="badges">${window.INSIGNIAS.map(b => `<div class="badge ${got.has(b[0]) ? "on" : ""}"><b>${got.has(b[0]) ? "★" : "☆"} ${esc(b[1])}</b><span>${esc(b[2])}</span></div>`).join("")}</div></section>
  ${accionesHTML()}
  ${revisionHTML(p)}
  ${datosHTML()}
  <aside class="note"><b>Advertencias.</b> Las proyecciones no son promesas. Antes de decisiones grandes (vivienda, negocio, impuestos, jubilación), consulta a un profesional registrado en tu país. No hay atajos: este plan no propone criptomonedas especulativas, trading diario ni apuestas.</aside>`;
};
function metaMensual(m){ const meses = Math.max(1, Math.round((new Date(m.fecha) - new Date()) / (864e5 * 30.44))); return fmtM(m.cifra / meses); }
function informeTexto(d, inf){
  const c = [];
  c.push(`Gastas ${fmtM(inf.gastos)} al mes y ahorras ${fmtM(inf.ahorroMes)} (${fmtP(inf.tasa)} de tus ingresos).`);
  c.push(inf.colchon >= 3 ? `Tu colchón cubre ${fmtN(inf.colchon)} meses: bien.` : `Tu colchón cubre ${fmtN(inf.colchon)} meses: el objetivo son 3–6 (${fmtM(inf.gastos * 3)}–${fmtM(inf.gastos * 6)}).`);
  if (inf.deudaCara) c.push(`Tienes deudas caras (más del 10 %): pagarlas es la inversión más rentable y segura que tienes. Usa la herramienta <a href="${H("herramientas/deudas")}">Salir de deudas</a>.`);
  if (inf.tasa < 0.1) c.push(`Tu tasa de ahorro es baja: revisa el <a href="${H("herramientas/presupuesto")}">presupuesto</a> y los gastos fijos.`);
  if (inf.riesgo) c.push(`Perfil de riesgo: <b>${inf.riesgo[0]}</b> (${inf.riesgo[1]} de 24 puntos). ${inf.riesgo[2]}`);
  if (d.habilidades) c.push(`Habilidades e intereses declarados: ${esc(d.habilidades)}. Úsalos en la etapa 2 para elegir qué aprender.`);
  return `<ul>${c.map(x => `<li>${x}</li>`).join("")}</ul>`;
}
function etapasHTML(p, cur){
  return `<section class="panel"><h2>Las cinco etapas del plan</h2><div class="stages">${window.ETAPAS.map((e, i) => { const n = e[2].length, d = e[2].filter((_, j) => p.checks[i + "-" + j]).length;
    return `<div class="stage ${i + 1 === cur ? "cur" : ""}"><h3>${i + 1}. ${esc(e[0])}</h3><p class="meta">${esc(e[1])} · ${d}/${n}</p><div class="bar"><i style="width:${d / n * 100}%"></i></div><ul class="checks">${e[2].map((a, j) => `<li><label><input type="checkbox" data-check="${i}-${j}"${p.checks[i + "-" + j] ? " checked" : ""}> ${esc(a)}</label></li>`).join("")}</ul><p class="meta">Inspiración: ${["Read, Kamprad", "Buffett (aprender), Munger", "Bogle, Buffett, Read", "Ortega, Bezos, Blakely", "Ortega (Pontegadea), Dalio"][i]}</p></div>`; }).join("")}</div></section>`;
}
function accionesHTML(){ return `<section class="panel"><h2>De cada millonario, una acción para ti</h2><div class="grid">${window.ACCIONES.map(a => `<div class="card act"><p class="meta">Lo que hizo</p><p>${esc(a[0])}</p><p class="meta">Lo que puedes hacer esta semana</p><p><b>${esc(a[1])}</b></p><button class="mini" data-add="${esc(a[1])}" data-origen="Acciones">+ Añadir a mi plan</button></div>`).join("")}</div></section>`; }
function valorNetoHTML(p){
  const regs = p.registros.slice().sort((a, b) => a.mes < b.mes ? -1 : 1), idx = m => { const [y, mm] = m.split("-").map(Number); return y * 12 + mm - 1; };
  const chart = regs.length > 1 ? lineChart([{name:"Valor neto", color:"var(--c1)", pts:regs.map(r => [idx(r.mes), r.neto])}], {fmtY: y => fmtM(y), fmtX: x => String((x % 12) + 1).padStart(2, "0") + "/" + String(Math.floor(x / 12)).slice(2), label:"Evolución del valor neto"}) : "<p class='meta'>Registra al menos dos meses para ver la gráfica.</p>";
  return `<section class="panel"><h2>Registro mensual del valor neto</h2><p class="meta">Anota cada mes tu valor neto y lo que aportaste a tu inversión. Racha de aportaciones: <b>${racha(regs)} meses seguidos</b>.</p>${chart}
  <div class="scroll"><table><tr><th>Mes</th><th>Valor neto</th><th>Aportación</th><th></th></tr>${regs.map(r => `<tr><td>${esc(r.mes)}</td><td>${fmtM(r.neto)}</td><td>${fmtM(r.aporte)}</td><td><button class="mini" data-delreg="${esc(r.mes)}" aria-label="Borrar registro">✕</button></td></tr>`).join("")}</table></div>
  <form id="regform" class="row"><input name="mes" type="month" required value="${new Date().toISOString().slice(0, 7)}" aria-label="Mes"><input name="neto" type="number" step="any" required placeholder="Valor neto" aria-label="Valor neto"><input name="aporte" type="number" step="any" placeholder="Aportación del mes" aria-label="Aportación"><button class="btn">Registrar</button></form>
  <p class="meta">También puedes calcularlo con la herramienta <a href="${H("herramientas/valor-neto")}">Valor neto</a> y registrarlo desde allí.</p></section>`;
}
function tareasHTML(p){ return `<section class="panel"><h2>Mis tareas</h2><p class="meta">Estrategias y ejercicios que has añadido desde perfiles, estrategias y lecciones.</p><ul class="checks">${p.tareas.map((t, i) => `<li><label><input type="checkbox" data-tarea="${i}"${t.hecho ? " checked" : ""}> ${esc(t.t)}</label> <span class="meta">(${esc(t.origen)})</span> <button class="mini" data-deltarea="${i}" aria-label="Borrar tarea">✕</button></li>`).join("") || "<li class='meta'>Usa los botones «+ Añadir a mi plan» del sitio.</li>"}</ul>${p.presupuesto ? `<p class="meta">Presupuesto guardado el ${esc(p.presupuesto.fecha)}: ${fmtM(p.presupuesto.I)} netos · ${p.presupuesto.pN}/${p.presupuesto.pD}/${p.presupuesto.pA}.</p>` : ""}</section>`; }
function revisionHTML(p){ const y = new Date().getFullYear(), r = p.revisiones[y] || {};
  return `<section class="panel"><h2>Revisión anual guiada (${y})</h2><form id="revform">
  <label class="fld"><span>¿Qué funcionó este año?</span><textarea name="bien" rows="2">${esc(r.bien || "")}</textarea></label>
  <label class="fld"><span>¿Qué cambiarías?</span><textarea name="cambiar" rows="2">${esc(r.cambiar || "")}</textarea></label>
  <label class="fld"><span>Metas para el año que viene</span><textarea name="metas" rows="2">${esc(r.metas || "")}</textarea></label>
  <p class="meta">Recuerda también: rebalancear la cartera, revisar seguros y comisiones, actualizar el diagnóstico.</p><button class="btn">Guardar revisión</button></form>
  ${Object.keys(p.revisiones).filter(k => +k !== y).map(k => `<details><summary>Revisión ${esc(k)}</summary><p><b>Funcionó:</b> ${esc(p.revisiones[k].bien)}</p><p><b>Cambiar:</b> ${esc(p.revisiones[k].cambiar)}</p><p><b>Metas:</b> ${esc(p.revisiones[k].metas)}</p></details>`).join("")}</section>`; }
function datosHTML(){ return `<section class="panel"><h2>Tus datos</h2><p class="meta">Todo se guarda solo en este navegador (no hay servidor ni cuentas en esta versión). Para usarlo en otro dispositivo, exporta el archivo e impórtalo allí.</p>
  <button class="btn ghost" id="exp">Exportar mis datos (JSON)</button> <label class="btn ghost file">Importar<input type="file" id="imp" accept="application/json" hidden></label> <button class="btn danger" id="del">Borrar todos mis datos</button></section>`; }

V.diagnostico = () => {
  const d = plan().diag || {deudas:[], riesgo:[]};
  const num = (id, label, v) => `<label class="fld"><span>${label} <small>(${window.FMT.moneda()})</small></span><input name="${id}" type="number" step="any" min="0" value="${v != null ? v : ""}"></label>`;
  const deudas = [0, 1, 2, 3].map(i => { const x = d.deudas[i] || {}; return `<fieldset class="grp"><legend>Deuda ${i + 1}</legend><label class="fld"><span>Tipo</span><select name="dt${i}">${["", "Tarjeta de crédito", "Préstamo personal", "Préstamo de coche", "Hipoteca", "Préstamo de estudios", "Otra"].map(o => `<option${x.tipo === o ? " selected" : ""}>${o}</option>`).join("")}</select></label><label class="fld"><span>Saldo</span><input name="ds${i}" type="number" step="any" min="0" value="${x.saldo || ""}"></label><label class="fld"><span>Interés anual (TAE %)</span><input name="di${i}" type="number" step="any" min="0" value="${x.tae || ""}"></label></fieldset>`; }).join("");
  return crumbs([["Mi plan", "mi-plan"], ["Diagnóstico"]]) + `<h1>Diagnóstico inicial</h1><p class="lead">Unos 10 minutos. Los datos se quedan en tu navegador.</p>
  <form id="diag" class="diag">
  <fieldset><legend>1. Tú</legend><label class="fld"><span>Edad</span><input name="edad" type="number" min="14" max="100" value="${d.edad || ""}"></label>
  <label class="fld"><span>País</span><select name="pais">${["", ...window.FISCAL.map(f => f[0]), "Otro"].map(o => `<option${d.pais === o ? " selected" : ""}>${o}</option>`).join("")}</select></label>
  <label class="fld"><span>Situación laboral</span><select name="situacion">${["", "Asalariado", "Autónomo o empresario", "Estudiante", "Desempleado", "Jubilado"].map(o => `<option${d.situacion === o ? " selected" : ""}>${o}</option>`).join("")}</select></label>
  <label class="fld"><span>Moneda</span><select name="moneda">${Object.entries(window.MONEDAS).map(([k, v]) => `<option value="${k}"${window.FMT.moneda() === k ? " selected" : ""}>${esc(v)}</option>`).join("")}</select></label></fieldset>
  <fieldset><legend>2. Ingresos y gastos mensuales</legend>${num("ingresos", "Ingresos netos al mes", d.ingresos)}${num("gFijos", "Gastos fijos al mes", d.gFijos)}${num("gVar", "Gastos variables al mes", d.gVar)}</fieldset>
  <fieldset><legend>3. Patrimonio</legend>${num("ahorroLiq", "Ahorro líquido (cuentas, efectivo)", d.ahorroLiq)}${num("inversiones", "Inversiones (fondos, acciones, planes)", d.inversiones)}${num("otrosActivos", "Otros activos (vivienda, vehículo, negocio)", d.otrosActivos)}</fieldset>
  <fieldset><legend>4. Deudas</legend><div class="grp4">${deudas}</div></fieldset>
  <fieldset><legend>5. Habilidades e intereses</legend><label class="fld"><span>Formación, habilidades y temas que te interesan</span><textarea name="habilidades" rows="2">${esc(d.habilidades || "")}</textarea></label></fieldset>
  <fieldset><legend>6. Tolerancia al riesgo (8 preguntas)</legend>${window.RIESGO.map((q, i) => `<div class="rq"><p>${i + 1}. ${esc(q[0])}</p>${q[1].map((o, j) => `<label><input type="radio" name="r${i}" value="${j + 1}"${(d.riesgo || [])[i] === j + 1 ? " checked" : ""}> ${esc(o)}</label>`).join("")}</div>`).join("")}</fieldset>
  <fieldset><legend>7. Metas</legend>${[["mEmergencia", "Completar el fondo de emergencia"], ["mVivienda", "Comprar vivienda"], ["mNegocio", "Crear un negocio propio"], ["mIndep", "Alcanzar la independencia financiera"]].map(m => `<label class="chk"><input type="checkbox" name="${m[0]}"${(d.metasSel || []).includes(m[0]) ? " checked" : ""}> ${m[1]}</label>`).join("")}
  <label class="fld"><span>Fecha deseada para tu meta principal</span><input name="fechaMeta" type="date" value="${d.fechaMeta || ""}"></label></fieldset>
  <button class="btn">Ver mi informe</button></form>`;
};
function saveDiag(f){
  const g = n => f.elements[n] ? f.elements[n].value : "", nv = n => parseFloat(g(n)) || 0;
  const d = {edad: nv("edad"), pais: g("pais"), situacion: g("situacion"), ingresos: nv("ingresos"), gFijos: nv("gFijos"), gVar: nv("gVar"), ahorroLiq: nv("ahorroLiq"), inversiones: nv("inversiones"), otrosActivos: nv("otrosActivos"),
    deudas: [0, 1, 2, 3].map(i => ({tipo: g("dt" + i) || "Deuda " + (i + 1), saldo: nv("ds" + i), tae: nv("di" + i)})).filter(x => x.saldo > 0),
    habilidades: g("habilidades"), riesgo: window.RIESGO.map((_, i) => { const r = f.querySelector(`input[name=r${i}]:checked`); return r ? +r.value : 0; }),
    metasSel: ["mEmergencia", "mVivienda", "mNegocio", "mIndep"].filter(m => f.elements[m].checked), fechaMeta: g("fechaMeta"), fecha: new Date().toISOString().slice(0, 10)};
  try { localStorage.setItem("fin.moneda", g("moneda")); } catch(e){}
  const p = plan(); p.diag = d;
  const inf = informe(d);
  // Metas sugeridas a partir del diagnóstico
  if (d.metasSel.includes("mEmergencia") && !p.metas.some(m => /emergencia/i.test(m.t))) p.metas.push({t:"Fondo de emergencia de 6 meses", cifra: inf.gastos * 6, fecha: d.fechaMeta || "", hecho: inf.colchon >= 6});
  if (d.metasSel.includes("mIndep") && !p.metas.some(m => /independencia/i.test(m.t))) p.metas.push({t:"Independencia financiera", cifra: inf.gastos * 12 * 25, fecha: "", hecho:false});
  if (d.metasSel.includes("mVivienda") && !p.metas.some(m => /vivienda/i.test(m.t))) p.metas.push({t:"Ahorrar la entrada de la vivienda", cifra: 0, fecha: d.fechaMeta || "", hecho:false});
  if (d.metasSel.includes("mNegocio") && !p.metas.some(m => /negocio/i.test(m.t))) p.metas.push({t:"Validar una idea de negocio con 10 clientes", cifra: 0, fecha: d.fechaMeta || "", hecho:false});
  const mes = d.fecha.slice(0, 7); if (!p.registros.some(r => r.mes === mes)) p.registros.push({mes, neto: inf.neto, aporte: 0});
  savePlan(p); location.hash = "#/mi-plan"; toast("Diagnóstico guardado");
}

// ---------- Buscador ----------
let INDEX = null;
function buildIndex(){
  INDEX = [];
  PERFILES.forEach(p => INDEX.push({k:"Millonario", t:p.nombre, d:p.resumen, h:"millonarios/" + p.slug, x:[p.nombre, p.sector, p.pais, p.partida, p.conoc, p.creacion, p.mantiene, (p.estrategias || []).join(" ")].join(" ")}));
  EST.forEach(e => INDEX.push({k:"Estrategia", t:e.t, d:e.d, h:"estrategias/" + e.slug, x:[e.t, e.d, e.ej, (e.ev || []).join(" "), (e.pasos || []).join(" ")].join(" ")}));
  window.ESCUELA.forEach(m => m.L.forEach((l, i) => { const x = window.LECCION_EXTRA[m.id + "-" + (i + 1)] || {}; INDEX.push({k:"Lección " + m.id, t:l[0], d:l[1], h:"escuela/" + m.id + "/" + (i + 1), x:[l[0], l[1], x.c, x.e].join(" ")}); }));
  window.GLOSARIO.forEach(g => INDEX.push({k:"Glosario", t:g[0], d:g[1], h:"glosario/" + slugify(g[0]), x:g[0] + " " + g[0] + " " + g[1]}));
  window.HERRAMIENTAS.forEach(h => INDEX.push({k:"Herramienta", t:h[1], d:h[2], h:"herramientas/" + h[0], x:h[1] + " " + h[2] + " " + window.TOOLS[h[0]].intro}));
  window.MANTENER.forEach((m, i) => INDEX.push({k:"Mantener", t:m[0], d:m[1], h:"mantener", x:m[0] + " " + m[1]}));
  window.FRAUDES.forEach(f => INDEX.push({k:"Fraude", t:f[0], d:f[1], h:"alertas-de-fraude", x:f[0] + " " + f[1]}));
  INDEX.forEach(e => { e.n = norm(e.x); e.nt = norm(e.t); });
}
function search(q){
  if (!INDEX) buildIndex();
  const words = norm(q).split(" ").filter(w => w.length > 1); if (!words.length) return [];
  return INDEX.map(e => { let s = 0; words.forEach(w => { if (e.nt.includes(w)) s += 3; if (e.n.includes(w)) s += 1; }); if (e.nt === norm(q)) s += 10; return [s, e]; })
    .filter(r => r[0] >= words.length).sort((a, b) => b[0] - a[0]).map(r => r[1]);
}
V.buscar = q => { q = decodeURIComponent(q || ""); const R = search(q);
  return crumbs([["Buscar"]]) + `<h1>Buscar</h1><form id="sform2" class="row" role="search"><input id="q2" type="search" value="${esc(q)}" placeholder="Millonario, estrategia, término, herramienta…" aria-label="Buscar"><button class="btn">Buscar</button></form>
  ${q ? `<p class="meta">${R.length} resultado${R.length === 1 ? "" : "s"} para «${esc(q)}»</p><ul class="results">${R.slice(0, 60).map(r => `<li><span class="tag small">${esc(r.k)}</span> <a href="${H(r.h)}">${esc(r.t)}</a><br><span class="meta">${esc(r.d)}</span></li>`).join("")}</ul>` : ""}`; };

// ---------- Páginas informativas ----------
const PAG = {
  metodologia:["Metodología", `<p>Este sitio sigue el Plan 5. Sus principios:</p><ul><li><b>Educativo, no asesoría.</b> Enseña principios y herramientas; no recomienda productos concretos.</li><li><b>Sesgo de supervivencia explícito.</b> Cada perfil separa lo que se puede copiar de lo que no.</li><li><b>Cifras aproximadas y fechadas.</b> ${esc(window.FECHA_CIFRAS)} Se dan como orden de magnitud con su referencia (Forbes o Bloomberg, 2024–2025); para el dato del día, consulta esas fuentes.</li><li><b>Riqueza legal y ética.</b> Los fraudes aparecen solo como advertencias.</li><li><b>Realismo.</b> El objetivo es la independencia financiera, no hacerse millonario.</li></ul>
  <h2>Fuentes de los datos</h2><ul><li>Perfiles: biografías, cartas anuales e informes citados en cada perfil.</li><li>Simulador de caídas: rentabilidad total anual del S&P 500 con dividendos reinvertidos (S&P Dow Jones Indices; serie recopilada por Aswath Damodaran, NYU Stern), redondeada.</li><li>Fórmulas de las calculadoras: verificadas con ejemplos de control en <code>pruebas.js</code>.</li></ul>
  <h2>Citas</h2><p>Solo se incluyen citas con fuente conocida. Cuando una frase es una idea atribuida y no una cita literal, se indica.</p>`],
  acerca:["Acerca de", `<p>«Finanzas y Millonarios» es el quinto sitio de una serie de cursos web en español. Estudia cómo se crean y se conservan las grandes fortunas y cómo aplicar sus principios a una vida normal, con un apartado personal, «Mi plan».</p><p>Funciona sin conexión y sin servidor: abre <code>index.html</code> en el navegador.</p>`],
  "aviso-legal":["Aviso legal", `<p>${AVISO} Las cifras son aproximadas y pueden haber cambiado. Las calculadoras ofrecen estimaciones basadas en supuestos y no garantizan resultados. Rentabilidades pasadas no garantizan rentabilidades futuras. Antes de tomar decisiones financieras importantes, consulta a un profesional registrado en tu país.</p><p>Las marcas y nombres de empresas citados pertenecen a sus titulares y se mencionan solo con fines educativos.</p>`],
  privacidad:["Privacidad", `<p>Este sitio no tiene servidor, no usa cookies de seguimiento ni envía datos a terceros. Tu diagnóstico, metas, registros, tareas y progreso se guardan solo en el almacenamiento local de tu navegador.</p><p>Puedes exportarlos o borrarlos por completo en un clic desde <a href="${H("mi-plan")}">Mi plan</a>. La sincronización con una cuenta no está disponible en esta versión.</p>`],
  accesibilidad:["Accesibilidad", `<p>Objetivo: WCAG 2.2 AA. El sitio tiene modo claro y oscuro, contraste suficiente, navegación por teclado con foco visible, migas de pan, etiquetas en todos los formularios, gráficas con descripción y tablas con los datos, y un diseño adaptable a móviles.</p>`],
  contacto:["Contacto", `<p>Sitio personal y educativo. Para correcciones de datos o sugerencias, abre una incidencia en el repositorio del proyecto.</p>`]
};
V.pagina = k => crumbs([[PAG[k][0]]]) + `<h1>${PAG[k][0]}</h1>${PAG[k][1]}`;
V.notfound = () => `<h1>Página no encontrada</h1><p><a href="#/">Volver al inicio</a></p>`;

// ---------- Router ----------
const NAV = [["millonarios", "Millonarios"], ["estrategias", "Estrategias"], ["mantener", "Mantener"], ["escuela", "Escuela"], ["herramientas", "Herramientas"], ["mi-plan", "Mi plan"]];
function render(){
  const raw = location.hash.replace(/^#\/?/, ""), [path, anchor] = raw.split("#"), parts = path.split("/").filter(Boolean), r = parts[0] || "";
  let html, after = null, title = "";
  switch (r){
    case "": html = V.inicio(); after = () => bindTool(app); break;
    case "millonarios": if (parts[1]){ html = V.perfil(parts[1]); title = (bySlug(parts[1]) || {}).nombre; } else { html = V.millonarios(); after = bindMillonarios; title = "Millonarios"; } break;
    case "estrategias": html = parts[1] ? V.estrategia(parts[1]) : V.estrategias(); after = () => bindTool(app); title = "Estrategias"; break;
    case "mantener": html = V.mantener(); title = "Cómo se mantiene la riqueza"; break;
    case "escuela": html = parts[1] ? V.leccion(parts[1], parts[2] || "1") : V.escuela(); after = () => bindQuiz(quizScore); title = "Escuela"; break;
    case "herramientas": html = parts[1] ? V.herramienta(parts[1]) : V.herramientas(); after = () => bindTool(app); title = parts[1] && TOOLMETA[parts[1]] ? TOOLMETA[parts[1]].t : "Herramientas"; break;
    case "mi-plan": html = parts[1] === "diagnostico" ? V.diagnostico() : V.miplan(); title = "Mi plan"; break;
    case "comparar": html = V.comparar(parts[1], parts[2], parts[3]); title = "Comparador"; break;
    case "glosario": html = V.glosario(parts[1]); after = () => { const gq = $("#gq"); if (gq) gq.addEventListener("input", () => $$(".gloss>div").forEach(d => d.hidden = !d.dataset.t.includes(norm(gq.value)))); }; title = "Glosario"; break;
    case "biblioteca": html = V.biblioteca(); title = "Biblioteca"; break;
    case "alertas-de-fraude": html = V.fraude(); title = "Alertas de fraude"; break;
    case "buscar": html = V.buscar(parts.slice(1).join("/")); title = "Buscar"; break;
    default: html = PAG[r] ? V.pagina(r) : V.notfound(); title = PAG[r] ? PAG[r][0] : "";
  }
  app.innerHTML = html;
  document.title = (title ? title + " · " : "") + "Finanzas y Millonarios";
  $$("#mainnav a, #bottomnav a").forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#/" + r));
  $("#mainnav").classList.remove("open"); $("#menu").setAttribute("aria-expanded", "false");
  if (after) after();
  if (anchor){ const el = document.getElementById(anchor); if (el) el.scrollIntoView(); } else { window.scrollTo(0, 0); app.focus({preventScroll:true}); }
}

// Delegación de eventos global
document.addEventListener("click", ev => {
  const t = ev.target.closest("button, a"); if (!t) return;
  if (t.dataset.anchor){ ev.preventDefault(); const el = document.getElementById(t.dataset.anchor); if (el) el.scrollIntoView({behavior:"smooth"}); return; }
  if (t.dataset.add){ addTarea(t.dataset.add, t.dataset.origen || ""); return; }
  const p = plan();
  if (t.dataset.delmeta){ p.metas.splice(+t.dataset.delmeta, 1); savePlan(p); render(); }
  if (t.dataset.deltarea){ p.tareas.splice(+t.dataset.deltarea, 1); savePlan(p); render(); }
  if (t.dataset.delreg){ p.registros = p.registros.filter(r => r.mes !== t.dataset.delreg); savePlan(p); render(); }
  if (t.id === "markdone"){ const m = location.hash.match(/escuela\/(E\d)\/(\d+)/); if (m){ p.escuela.lec[m[1] + "-" + m[2]] = "done"; savePlan(p); t.textContent = "✓ Lección completada"; toast("Lección completada"); } }
  if (t.id === "etapaauto"){ p.etapa = null; savePlan(p); render(); }
  if (t.id === "exp"){ const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify({plan: p, moneda: window.FMT.moneda()}, null, 2)], {type:"application/json"})); a.download = "mi-plan-finanzas.json"; a.click(); }
  if (t.id === "del" && confirm("¿Borrar todos tus datos de este sitio en este navegador? No se puede deshacer.")){ try { Object.keys(localStorage).filter(k => k.startsWith("fin.")).forEach(k => localStorage.removeItem(k)); } catch(e){} toast("Datos borrados"); render(); }
  if (t.id === "theme"){ const cur = document.documentElement.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), nx = cur === "dark" ? "light" : "dark"; document.documentElement.dataset.theme = nx; store.set("fin.theme", nx); }
  if (t.id === "menu"){ const n = $("#mainnav"), o = !n.classList.contains("open"); n.classList.toggle("open", o); t.setAttribute("aria-expanded", String(o)); }
});
document.addEventListener("change", ev => {
  const t = ev.target, p = plan();
  if (t.dataset.check){ p.checks[t.dataset.check] = t.checked; savePlan(p); render(); }
  else if (t.dataset.meta){ p.metas[+t.dataset.meta].hecho = t.checked; savePlan(p); }
  else if (t.dataset.tarea){ p.tareas[+t.dataset.tarea].hecho = t.checked; savePlan(p); }
  else if (t.dataset.carta){ const i = +t.dataset.carta; p.cartas = p.cartas.filter(x => x !== i); if (t.checked) p.cartas.push(i); savePlan(p); if (p.cartas.length === 5 && t.checked) toast("Insignia conseguida: Lector de Buffett"); }
  else if (t.id === "etapasel"){ p.etapa = +t.value; savePlan(p); render(); }
  else if (t.id === "cur" || t.id === "curtop"){ try { localStorage.setItem("fin.moneda", t.value); } catch(e){} if ($("#curtop")) $("#curtop").value = t.value; render(); }
  else if (t.dataset.k){ const ids = $$("select[data-k]").map(s => s.value).filter(Boolean); location.hash = "#/comparar/" + ids.join("/"); }
  else if (t.id === "imp" && t.files[0]){ t.files[0].text().then(txt => { try { const j = JSON.parse(txt); if (!j.plan) throw 0; savePlan(j.plan); if (j.moneda) localStorage.setItem("fin.moneda", j.moneda); toast("Datos importados"); render(); } catch(e){ toast("Archivo no válido"); } }); }
});
document.addEventListener("submit", ev => {
  const f = ev.target, p = plan();
  if (f.id === "searchform" || f.id === "sform2"){ ev.preventDefault(); const q = (f.id === "searchform" ? $("#q") : $("#q2")).value.trim(); if (q) location.hash = "#/buscar/" + encodeURIComponent(q); }
  else if (f.id === "diag"){ ev.preventDefault(); saveDiag(f); }
  else if (f.id === "metaform"){ ev.preventDefault(); p.metas.push({t: f.t.value, cifra: parseFloat(f.cifra.value) || 0, fecha: f.fecha.value, hecho:false}); savePlan(p); render(); }
  else if (f.id === "regform"){ ev.preventDefault(); const mes = f.mes.value; p.registros = p.registros.filter(r => r.mes !== mes); p.registros.push({mes, neto: parseFloat(f.neto.value) || 0, aporte: parseFloat(f.aporte.value) || 0}); savePlan(p); render(); }
  else if (f.id === "revform"){ ev.preventDefault(); p.revisiones[new Date().getFullYear()] = {bien: f.bien.value, cambiar: f.cambiar.value, metas: f.metas.value}; savePlan(p); toast("Revisión guardada"); }
});

// Inicio
const th = store.get("fin.theme", null); if (th) document.documentElement.dataset.theme = th;
$("#mainnav").innerHTML = NAV.map(n => `<a href="${H(n[0])}">${n[1]}</a>`).join("");
$("#curtop").innerHTML = Object.keys(window.MONEDAS).map(k => `<option value="${k}"${window.FMT.moneda() === k ? " selected" : ""}>${k}</option>`).join("");
window.addEventListener("hashchange", render);
render();
})();
