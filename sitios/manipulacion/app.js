(function(){
"use strict";
const W = window, app = document.getElementById("app");
const EX = W.EXPERIMENTOS, TE = W.TECNICAS, PR = W.PROGRAMAS, FU = W.FUNDAMENTOS, INV = W.INVESTIGADORES;

// ---------- Utilidades ----------
const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const md = s => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\*(.+?)\*/g, "<i>$1</i>");
const norm = s => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9ñ ]/g, " ").replace(/\s+/g, " ").trim();
const H = p => "#/" + p;
const pick = (arr, n, rnd) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a.slice(0, n); };
const seeded = seed => { let s = 0; for (const ch of String(seed)) s = (s * 31 + ch.charCodeAt(0)) >>> 0; return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };
const store = { get(k, d){ try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch(e){ return d; } }, set(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} } };
const PKEY = "manipulacion-progreso-v1";
const P = Object.assign({read:{e:{}, t:{}, p:{}}, demos:{}, lessons:{}, exams:{}, sec:{}, dark:false, name:""}, store.get(PKEY, {}));
const save = () => store.set(PKEY, P);
const exBy = s => EX.find(e => e.s === s), teBy = s => TE.find(t => t.s === s), prBy = s => PR.find(p => p.s === s);
const inv = s => INV.find(i => i.s === s);
const invByName = n => INV.find(i => i.n === n);

const DEMOS = [
 {s:"anclaje", t:"Anclaje", d:"Estima una cifra después de ver un número al azar.", e:"tversky-kahneman-anclaje"},
 {s:"encuadre", t:"Encuadre", d:"La misma decisión con dos redacciones.", e:"tversky-kahneman-encuadre"},
 {s:"senuelo", t:"Señuelo", d:"Elige un plan de suscripción.", e:"efecto-senuelo"},
 {s:"ceguera-cambio", t:"Ceguera al cambio", d:"Una imagen cambia con un parpadeo. ¿Ves qué?", e:"simons-levin-puerta"},
 {s:"atencion-selectiva", t:"Atención selectiva", d:"El vídeo original del gorila invisible.", e:"simons-chabris-gorila"},
 {s:"stroop", t:"Efecto Stroop", d:"Cómo la lectura automática interfiere.", e:null},
 {s:"falsa-memoria", t:"Falsa memoria", d:"Una lista de palabras y una prueba de memoria.", e:"roediger-mcdermott-drm"},
 {s:"patron-oscuro", t:"Detecta el patrón oscuro", d:"Encuentra las trampas en una tienda ficticia.", e:"mathur-patrones-oscuros"},
 {s:"persuasion-o-manipulacion", t:"¿Persuasión o manipulación?", d:"20 casos para clasificar.", e:null}
];
const demoBy = s => DEMOS.find(d => d.s === s);

// ---------- Referencias entre fichas ----------
function ref(r){
  const i = r.indexOf(":"), k = r.slice(0, i), s = r.slice(i + 1);
  if (k === "e"){ const e = exBy(s); if (e) return {k:"Experimento", t:e.t, h:H("experimentos/" + s)}; const t = teBy(s); if (t) return {k:"Técnica", t:t.n, h:H("tecnicas/" + s)}; }
  if (k === "t"){ const t = teBy(s); if (t) return {k:"Técnica", t:t.n, h:H("tecnicas/" + s)}; const e = exBy(s); if (e) return {k:"Experimento", t:e.t, h:H("experimentos/" + s)}; }
  if (k === "p"){ const p = prBy(s); if (p) return {k:"FBI y gobiernos", t:p.n, h:H("fbi-y-gobiernos/" + s)}; }
  if (k === "f"){ const f = FU.find(x => x.s === s); if (f) return {k:"Fundamentos", t:f.t, h:H("fundamentos/" + s)}; }
  if (k === "i"){ const x = W.INVISIBLE[+s]; if (x) return {k:"Manipulación invisible", t:x.t, h:H("manipulacion-invisible/" + s)}; }
  if (k === "et"){ const x = W.ETICA.find(y => y.s === s); if (x) return {k:"Influencia ética", t:x.t, h:H("influencia-etica/" + s)}; }
  if (k === "li"){ const x = W.LIMITES.find(y => y.s === s); if (x) return {k:"Límites", t:x.t, h:H("limites/" + s)}; }
  if (k === "ad"){ const x = W.AUTODEFENSA.find(y => y.s === s); if (x) return {k:"Autodefensa", t:x.t, h:H("autodefensa/" + s)}; }
  if (k === "d"){ const x = demoBy(s); if (x) return {k:"Demostración", t:x.t, h:H("demostraciones/" + s)}; }
  if (k === "s"){ return {k:"Sección", t:s.replace(/-/g, " "), h:H(s)}; }
  return null;
}
const refLink = r => { const x = ref(r); return x ? `<a href="${x.h}">${esc(x.t)}</a> <span class="meta">(${esc(x.k)})</span>` : ""; };

// ---------- Componentes ----------
const crumbs = list => `<nav class="crumbs" aria-label="Migas de pan">${list.map((c, i) => i < list.length - 1 ? `<a href="${H(c[1] || "")}">${esc(c[0])}</a> › ` : `<span>${esc(c[0])}</span>`).join("")}</nav>`;
const estTag = e => { const st = W.ESTADOS[e.est]; return `<span class="est est-${e.est}" title="${esc(st[1])}">${esc(e.el || st[0])}</span>`; };
const gravTag = g => `<span class="grav grav-${g}">Gravedad: ${W.GRAVEDAD[g]}</span>`;
const warn = t => `<div class="cw" role="note"><b>Aviso de contenido.</b> ${t} Si necesitas apoyo, consulta <a href="${H("pedir-ayuda")}">Pedir ayuda</a>.</div>`;
function body(arr){
  return arr.map(b => {
    if (typeof b === "string") return b.startsWith("## ") ? `<h2>${md(b.slice(3))}</h2>` : `<p>${md(b)}</p>`;
    if (Array.isArray(b)) return `<ul>${b.map(li => `<li>${md(li)}</li>`).join("")}</ul>`;
    if (b.box) return `<div class="box">${md(b.box)}</div>`;
    if (b.warn) return `<div class="cw">${md(b.warn)}</div>`;
    return "";
  }).join("");
}
const exCard = e => `<a class="card" href="${H("experimentos/" + e.s)}"><div class="meta">${esc(W.CATEX[e.cat])} · ${e.y}</div><h3>${esc(e.t)}</h3><div class="meta">${esc(e.inv.join(", "))}</div><div class="tags">${estTag(e)}${e.et ? '<span class="tag">Polémica ética</span>' : ""}${P.read.e[e.s] ? '<span class="tag ok">Leída</span>' : ""}</div></a>`;
const teCard = t => `<a class="card" href="${H("tecnicas/" + t.s)}"><div class="meta">${t.amb.map(a => esc(W.AMBITOS[a])).join(" · ")}</div><h3>${esc(t.n)}</h3><p class="meta">«${esc(t.fr[0])}»</p><div class="tags">${gravTag(t.g)}${P.read.t[t.s] ? '<span class="tag ok">Leída</span>' : ""}</div></a>`;
function chart(e){
  if (!e.ch) return "";
  const max = Math.max(...e.ch.map(c => Math.abs(c[1]))) || 1;
  return `<figure class="chart" aria-label="Gráfica de resultados"><figcaption>Resultados (${esc(e.chu)})</figcaption>${e.ch.map(c => `<div class="crow"><span class="clab">${esc(c[0])}</span><span class="ctrack"><i style="width:${Math.max(2, Math.abs(c[1]) / max * 100)}%" class="${c[1] < 0 ? "neg" : ""}"></i></span><span class="cval">${String(c[1]).replace(".", ",")}</span></div>`).join("")}</figure>`;
}

// ---------- Páginas ----------
function pageHome(){
  const day = Math.floor(Date.now() / 864e5), week = Math.floor(day / 7);
  const fe = EX[day % EX.length], ft = TE[week % TE.length], fd = DEMOS[day % DEMOS.length];
  const pct = coursePct();
  return `<section class="hero"><p class="kicker">Investigación sobre la manipulación</p><h1>¿Alguna vez dijiste que sí y no sabías por qué?</h1>
  <p class="lead">Cómo funciona la manipulación, cómo reconocerla y cómo protegerse, con ${EX.length} experimentos y estudios citados, ${TE.length} técnicas con sus señales y defensas, y casos documentados del FBI y otros organismos.</p></section>
  <div class="grid three">
   <a class="card big" href="${H("fundamentos")}"><span class="num">1</span><h3>Entender</h3><p>Qué es manipular, por qué funciona y qué dicen los experimentos.</p></a>
   <a class="card big" href="${H("tecnicas")}"><span class="num">2</span><h3>Reconocer</h3><p>Técnicas en pareja, trabajo, ventas, internet, política y sectas.</p></a>
   <a class="card big" href="${H("autodefensa")}"><span class="num">3</span><h3>Protegerme</h3><p>Pausas, preguntas, verificación y dónde pedir ayuda.</p></a>
  </div>
  <div class="grid two">
   <div class="panel"><p class="kicker">Experimento destacado</p><h2><a href="${H("experimentos/" + fe.s)}">${esc(fe.t)}</a></h2><p class="meta">${esc(fe.inv.join(", "))} · ${fe.y} · ${estTag(fe)}</p><p>${md(fe.lec)}</p></div>
   <div class="panel"><p class="kicker">Técnica de la semana</p><h2><a href="${H("tecnicas/" + ft.s)}">${esc(ft.n)}</a></h2><p class="quote">«${esc(ft.fr[0])}»</p><p>${md(ft.resp[0])}</p></div>
   <div class="panel"><p class="kicker">Demostración rápida</p><h2><a href="${H("demostraciones/" + fd.s)}">${esc(fd.t)}</a></h2><p>${esc(fd.d)}</p><a class="btn" href="${H("demostraciones/" + fd.s)}">Probar</a></div>
   <div class="panel"><p class="kicker">Curso</p><h2><a href="${H("curso")}">Ruta de aprendizaje</a></h2><p>5 niveles y 52 lecciones con casos prácticos y quizzes.</p><div class="bar"><i style="width:${pct}%"></i></div><p class="meta">${pct} % completado</p></div>
  </div>
  <div class="panel note"><b>Enfoque de este sitio:</b> educativo y defensivo. Las técnicas se describen para reconocerlas y protegerse, no para usarlas. Persuadir es influir con razones verdaderas y respetando la decisión del otro; manipular es influir ocultando la intención o explotando debilidades. <a href="${H("metodologia")}">Cómo evaluamos las fuentes</a>.</div>`;
}

function pageFundamentos(){
  return crumbs([["Inicio",""],["Fundamentos"]]) + `<h1>Fundamentos</h1><p class="lead">Qué es la manipulación, la psicología de la influencia y por qué funciona.</p>
  <ol class="toc">${FU.map(f => `<li><a href="${H("fundamentos/" + f.s)}">${esc(f.t)}</a><div class="meta">${esc(f.sum)}</div></li>`).join("")}</ol>`;
}
function pageFundamento(s){
  const i = FU.findIndex(f => f.s === s); if (i < 0) return nf(); const f = FU[i];
  const prev = FU[i - 1], next = FU[i + 1];
  return crumbs([["Inicio",""],["Fundamentos","fundamentos"],[f.t]]) + `<article class="prose"><h1>${esc(f.t)}</h1><p class="lead">${esc(f.sum)}</p>${body(f.body)}
  ${f.qs ? `<h2>Comprueba lo aprendido</h2>${quizHTML("fu-" + f.s, f.qs)}` : ""}</article>
  <nav class="pager">${prev ? `<a href="${H("fundamentos/" + prev.s)}">← ${esc(prev.t)}</a>` : "<span></span>"}${next ? `<a href="${H("fundamentos/" + next.s)}">${esc(next.t)} →</a>` : ""}</nav>`;
}

const F = {cat:"", dec:"", est:"", et:"", amb:"", g:"", fr:""};
function sel(id, opts, v, label){ return `<label>${label} <select data-f="${id}"><option value="">Todos</option>${opts.map(o => `<option value="${esc(o[0])}" ${o[0] === v ? "selected" : ""}>${esc(o[1])}</option>`).join("")}</select></label>`; }
function pageExperimentos(){
  const decs = [...new Set(EX.map(e => Math.floor(e.y / 10) * 10))].sort();
  const list = EX.filter(e => (!F.cat || e.cat === F.cat) && (!F.dec || Math.floor(e.y / 10) * 10 === +F.dec) && (!F.est || e.est === F.est) && (!F.et || (F.et === "si" ? e.et : !e.et))).sort((a, b) => a.y - b.y);
  return crumbs([["Inicio",""],["Experimentos"]]) + `<h1>Catálogo de experimentos y estudios</h1><p class="lead">${EX.length} fichas con autores, año, publicación, método, resultados y estado de réplica.</p>
  <div class="legend">${Object.entries(W.ESTADOS).map(([k, v]) => `<span class="est est-${k}">${v[0]}</span> <span class="meta">${esc(v[1])}</span>`).join("<br>")}</div>
  <div class="row tool">${sel("cat", Object.entries(W.CATEX), F.cat, "Categoría")}${sel("dec", decs.map(d => [String(d), d + "s"]), F.dec, "Década")}${sel("est", Object.entries(W.ESTADOS).map(([k, v]) => [k, v[0]]), F.est, "Estado")}${sel("et", [["si","Con polémica ética"],["no","Sin polémica ética"]], F.et, "Ética")}</div>
  <p class="meta">${list.length} resultados</p><div class="grid">${list.map(exCard).join("") || "<p>No hay resultados con esos filtros.</p>"}</div>`;
}
function pageExperimento(s){
  const e = exBy(s); if (!e) return nf();
  if (!P.read.e[s]){ P.read.e[s] = 1; save(); }
  const rel = TE.filter(t => t.exp.includes(s));
  const people = e.inv.map(n => { const p = invByName(n); return p ? `<a href="${H("investigadores/" + p.s)}">${esc(n)}</a>` : esc(n); }).join(", ");
  return crumbs([["Inicio",""],["Experimentos","experimentos"],[e.t]]) + (e.et ? warn("Este experimento implicó engaño, estrés o falta de consentimiento.") : "") +
  `<article class="prose"><p class="kicker">${esc(W.CATEX[e.cat])}</p><h1>${esc(e.t)}</h1>
  <p class="meta">${people} · ${esc(e.inst)} · ${e.y}</p><p>${estTag(e)} ${e.et ? '<span class="tag">Polémica ética</span>' : ""}</p>
  <p class="cite">${esc(e.pub)}</p>
  <h2>Pregunta de investigación</h2><p>${md(e.q)}</p>
  <h2>Método</h2><p>${md(e.m)}</p>
  <h2>Resultados</h2><p>${md(e.r)}</p>${chart(e)}
  <h2>Estado de réplica</h2><ol class="tl"><li><b>${e.y}</b> Estudio original.</li><li><b>Después</b> ${md(e.rep)}</li><li><b>Estado actual</b> ${estTag(e)} ${esc(W.ESTADOS[e.est][1])}</li></ol>
  <h2>Críticas metodológicas y éticas</h2><p>${md(e.cr)}</p>
  <div class="grid two"><div class="box"><h3>Qué enseña sobre la manipulación</h3><p>${md(e.lec)}</p></div><div class="box good"><h3>Cómo protegerse</h3><p>${md(e.def)}</p></div></div>
  ${e.demo ? `<p><a class="btn" href="${H("demostraciones/" + e.demo)}">Probar la demostración: ${esc(demoBy(e.demo).t)}</a></p>` : ""}
  ${rel.length ? `<h2>Técnicas relacionadas</h2><ul>${rel.map(t => `<li><a href="${H("tecnicas/" + t.s)}">${esc(t.n)}</a></li>`).join("")}</ul>` : ""}
  <h2>Referencias</h2><ul class="refs"><li>${esc(e.pub)}</li>${e.refs.map(r => `<li>${esc(r)}</li>`).join("")}</ul></article>`;
}

function pageTecnicas(){
  const q = norm(F.fr);
  const list = TE.filter(t => (!F.amb || t.amb.includes(F.amb)) && (!F.g || t.g === +F.g) && (!q || norm(t.n + " " + t.al.join(" ") + " " + t.fr.join(" ") + " " + t.sen.join(" ")).includes(q)));
  return crumbs([["Inicio",""],["Técnicas"]]) + `<h1>Catálogo de técnicas de manipulación</h1><p class="lead">${TE.length} técnicas descritas para <b>reconocerlas</b>: mecanismo, señales, frases típicas, ejemplo y cómo responder.</p>
  <div class="row tool">${sel("amb", Object.entries(W.AMBITOS), F.amb, "Ámbito")}${sel("g", Object.entries(W.GRAVEDAD), F.g, "Gravedad")}
  <label>Frase típica <input id="frasebox" type="search" value="${esc(F.fr)}" placeholder="«¿Te lo estás imaginando?»"></label></div>
  <p class="meta">${list.length} resultados</p><div class="grid">${list.map(teCard).join("") || "<p>No hay resultados. Prueba con otra frase.</p>"}</div>`;
}
function pageTecnica(s){
  const t = teBy(s); if (!t) return nf();
  if (!P.read.t[s]){ P.read.t[s] = 1; save(); }
  return crumbs([["Inicio",""],["Técnicas","tecnicas"],[t.n]]) + (t.g === 3 ? warn("Esta ficha trata sobre abuso o control que puede resultar difícil de leer.") : "") +
  `<article class="prose"><p class="kicker">${t.amb.map(a => `<a href="#" data-amb="${a}">${esc(W.AMBITOS[a])}</a>`).join(" · ")}</p><h1>${esc(t.n)}</h1>
  <p class="meta">También llamado: ${esc(t.al.join(", "))}</p><p>${gravTag(t.g)}</p>
  <h2>Cómo funciona</h2><p>${md(t.mec)}</p>
  ${t.exp.length ? `<p class="meta">Experimentos y fichas relacionadas: ${t.exp.map(x => refLink("e:" + x)).join(" · ")}</p>` : ""}
  <div class="grid two"><div class="box warnbox"><h3>Señales</h3><ul>${t.sen.map(x => `<li>${md(x)}</li>`).join("")}</ul><h4>Frases típicas</h4><ul class="phr">${t.fr.map(x => `<li>«${esc(x)}»</li>`).join("")}</ul></div>
  <div class="box good"><h3>Qué hacer</h3><ul>${t.resp.map(x => `<li>${md(x)}</li>`).join("")}</ul></div></div>
  <h2>Ejemplo (caso ficticio)</h2><p class="quote">${md(t.ej)}</p>
  <h2>Cuándo buscar ayuda</h2><p>${t.ay ? md(W.AYUDA_REL) : "Si la situación se repite, te causa malestar o pérdidas, habla con alguien de confianza o con un servicio especializado (consumo, sindicato, abogado)."} <a href="${H("pedir-ayuda")}">Ver recursos</a>.</p>
  <h2>Fuentes</h2><ul class="refs">${t.src.map(x => `<li>${esc(x)}</li>`).join("")}</ul></article>`;
}

function pageInvisible(idx){
  const B = W.INVISIBLE;
  return crumbs([["Inicio",""],["Manipulación invisible"]]) + `<article class="prose"><h1>Manipulación invisible</h1><p class="lead">Cómo se influye sin que la persona lo note, y qué dice la evidencia: lo que funciona y lo que es mito.</p>
  <ol class="toc">${B.map((b, i) => `<li><a href="${H("manipulacion-invisible/" + i)}">${esc(b.t)}</a></li>`).join("")}</ol>
  ${B.map((b, i) => `<section id="sec-${i}"><h2>${i + 1}. ${esc(b.t)}</h2>${body(b.body)}${(b.exp || []).length || (b.tec || []).length ? `<p class="meta">Fichas: ${(b.exp || []).map(x => refLink("e:" + x)).concat((b.tec || []).map(x => refLink("t:" + x))).join(" · ")}</p>` : ""}</section>`).join("")}</article>`;
}

function pageFBI(){
  const g = grp => PR.filter(p => p.grp === grp).map(p => `<a class="card" href="${H("fbi-y-gobiernos/" + p.s)}"><div class="meta">${esc(p.org)} · ${esc(p.y)}</div><h3>${esc(p.n)}</h3>${P.read.p[p.s] ? '<span class="tag ok">Leída</span>' : ""}</a>`).join("");
  const tl = PR.filter(p => /\d{4}/.test(p.y)).map(p => ({y:+p.y.match(/\d{4}/)[0], p})).sort((a, b) => a.y - b.y);
  return crumbs([["Inicio",""],["FBI y gobiernos"]]) + `<h1>El FBI, los gobiernos y la propaganda</h1><p class="lead">Programas, investigaciones y casos documentados con fuentes oficiales: informes parlamentarios, documentos desclasificados y sentencias.</p>
  <h2>FBI</h2><div class="grid">${g("fbi")}</div><h2>Otros gobiernos y agencias</h2><div class="grid">${g("gob")}</div>
  <h2>Cronología de programas</h2><ol class="tl">${tl.map(x => `<li><b>${x.y}</b> <a href="${H("fbi-y-gobiernos/" + x.p.s)}">${esc(x.p.n)}</a> <span class="meta">(${esc(x.p.org)}, ${esc(x.p.y)})</span></li>`).join("")}</ol>`;
}
function pagePrograma(s){
  const p = prBy(s); if (!p) return nf();
  if (!P.read.p[s]){ P.read.p[s] = 1; save(); }
  return crumbs([["Inicio",""],["FBI y gobiernos","fbi-y-gobiernos"],[p.n]]) + (p.cw ? warn("Esta ficha describe abusos y experimentos sin consentimiento.") : "") +
  `<article class="prose"><p class="kicker">${esc(p.org)} · ${esc(p.y)}</p><h1>${esc(p.n)}</h1><p>${md(p.d)}</p>
  <h2>${p.s === "lecciones" ? "Contrapoderes" : p.s === "negociacion-en-crisis" || p.s === "hig" ? "Métodos" : "Tácticas documentadas"}</h2><ul>${p.tac.map(x => `<li>${md(x)}</li>`).join("")}</ul>
  ${p.desc !== "—" ? `<h2>Cómo se conoció</h2><p>${md(p.desc)}</p>` : ""}
  ${p.inv.length ? `<h2>Investigaciones y documentos oficiales</h2><ul>${p.inv.map(x => `<li>${md(x)}</li>`).join("")}</ul>` : ""}
  <h2>Consecuencias</h2><p>${md(p.cons)}</p>
  <div class="box"><h3>Lección sobre la manipulación</h3><p>${md(p.lec)}</p></div>
  <h2>Fuentes</h2><ul class="refs">${p.src.map(x => `<li>${esc(x)}</li>`).join("")}</ul></article>`;
}

function pageSecciones(key, title, lead, arr, base, extra){
  const done = P.sec[base];
  return crumbs([["Inicio",""],[title]]) + `<article class="prose"><h1>${esc(title)}</h1><p class="lead">${lead}</p>${extra || ""}
  <ol class="toc">${arr.map(b => `<li><a href="${H(base + "/" + b.s)}">${esc(b.t)}</a></li>`).join("")}</ol>
  ${arr.map((b, i) => `<section id="sec-${b.s}"><h2>${i + 1}. ${esc(b.t)}</h2>${body(b.body)}${b.exp ? `<p class="meta">Fichas: ${b.exp.map(x => refLink("e:" + x)).join(" · ")}</p>` : ""}${b.prog ? `<p class="meta">Ver: ${refLink("p:" + b.prog)}</p>` : ""}${b.checklist ? checklistHTML() : ""}</section>`).join("")}
  ${key ? `<div class="panel"><button class="btn" data-secdone="${base}" ${done ? "disabled" : ""}>${done ? "Sección completada ✓" : "Marcar esta sección como completada"}</button> <span class="meta">Cuenta para la insignia «${key}».</span></div>` : ""}</article>`;
}
function checklistHTML(){
  return `<div class="checklist">${Object.entries(W.CHECKLIST).map(([k, v]) => `<h3>${esc(k)}</h3><ul>${v.map(x => `<li><label><input type="checkbox"> ${esc(x)}</label></li>`).join("")}</ul>`).join("")}
  <p class="meta">Marcar varias casillas de un mismo ámbito es una señal para pausar y pedir una segunda opinión. No se guarda nada de lo que marques.</p>
  <button class="btn" id="dl-check">Descargar lista (.txt)</button> <button class="btn ghost" onclick="window.print()">Imprimir</button></div>`;
}

// ---------- Demostraciones ----------
function pageDemos(){
  return crumbs([["Inicio",""],["Demostraciones"]]) + `<h1>Demostraciones interactivas</h1><p class="lead">Experimenta en ti mismo algunos de los efectos estudiados. Cada demostración explica al final qué se hizo y por qué. <b>No se envía ni se guarda ningún dato personal</b>; solo se recuerda en tu navegador qué demostraciones completaste.</p>
  <div class="grid">${DEMOS.map(d => `<a class="card" href="${H("demostraciones/" + d.s)}"><h3>${esc(d.t)}</h3><p class="meta">${esc(d.d)}</p>${P.demos[d.s] ? '<span class="tag ok">Completada</span>' : ""}</a>`).join("")}</div>`;
}
function demoShell(d, inner){
  return crumbs([["Inicio",""],["Demostraciones","demostraciones"],[d.t]]) + `<h1>${esc(d.t)}</h1><p class="lead">${esc(d.d)}</p><div id="demo" class="panel demo">${inner}</div>${d.e ? `<p class="meta">Experimento base: ${refLink("e:" + d.e)}</p>` : ""}`;
}
const doneDemo = s => { P.demos[s] = 1; save(); };
function pageDemo(s){
  const d = demoBy(s); if (!d) return nf();
  setTimeout(() => (DEMO_INIT[s] || (() => {}))(document.getElementById("demo")), 0);
  return demoShell(d, "<p>Cargando…</p>");
}
const DEMO_INIT = {
anclaje(el){
  const n = Math.random() < 0.5 ? 10 + Math.floor(Math.random() * 10) : 60 + Math.floor(Math.random() * 15);
  el.innerHTML = `<p>Pulsa el botón para girar la «ruleta».</p><button class="btn" id="spin">Girar</button><div id="st"></div>`;
  el.querySelector("#spin").onclick = () => {
    el.querySelector("#st").innerHTML = `<p class="bignum">${n}</p><p>¿El porcentaje de países africanos entre los miembros de la ONU es mayor o menor que <b>${n}</b>?</p>
    <div class="row"><button class="btn ghost" data-a="mayor">Mayor</button><button class="btn ghost" data-a="menor">Menor</button></div><div id="st2"></div>`;
    el.querySelectorAll("[data-a]").forEach(b => b.onclick = () => {
      el.querySelector("#st2").innerHTML = `<p>¿Cuál es tu estimación exacta (en %)?</p><input id="est" type="number" min="0" max="100"> <button class="btn" id="ok">Responder</button>`;
      el.querySelector("#ok").onclick = () => {
        const v = +el.querySelector("#est").value; if (isNaN(v)) return;
        const hist = store.get("manip-anclaje", []); hist.push([n, v]); store.set("manip-anclaje", hist.slice(-10));
        el.innerHTML = `<h2>Qué ha pasado</h2><p>Tu número al azar fue <b>${n}</b> y estimaste <b>${v} %</b>. La respuesta real: 54 de los 193 Estados miembros de la ONU son africanos (≈ 28 %).</p>
        <p>El número de la ruleta no tenía ninguna relación con la pregunta, pero la mitad de los visitantes ve un número bajo (10–19) y la otra mitad uno alto (60–74). En el estudio original (Tversky y Kahneman, 1974), quienes vieron 10 estimaron una mediana del 25 % y quienes vieron 65, del 45 %.</p>
        <p class="meta">Tus intentos en este navegador: ${hist.slice(-10).map(h => `ancla ${h[0]} → ${h[1]} %`).join(" · ")}. No guardamos respuestas de otros usuarios, así que la comparación es con el estudio original. Vuelve a intentarlo otro día y fíjate si tu estimación sigue al ancla.</p>
        <p><b>Defensa:</b> antes de ver la cifra de otro (precio, salario, condena), fija la tuya.</p>`;
        doneDemo("anclaje");
      };
    });
  };
},
encuadre(el){
  const g = Math.random() < 0.5;
  const A = g ? "Si se adopta el programa A, se salvarán 200 personas." : "Si se adopta el programa C, morirán 400 personas.";
  const B = g ? "Si se adopta el programa B, hay 1/3 de probabilidad de salvar a las 600 personas y 2/3 de que no se salve nadie." : "Si se adopta el programa D, hay 1/3 de probabilidad de que no muera nadie y 2/3 de que mueran las 600.";
  el.innerHTML = `<p>Imagina que el país se prepara para una epidemia que se espera que mate a 600 personas. Se proponen dos programas:</p><ul><li>${A}</li><li>${B}</li></ul><p>¿Cuál eliges?</p>
  <div class="row"><button class="btn ghost" data-c="seguro">${g ? "Programa A" : "Programa C"}</button><button class="btn ghost" data-c="riesgo">${g ? "Programa B" : "Programa D"}</button></div>`;
  el.querySelectorAll("[data-c]").forEach(b => b.onclick = () => {
    el.innerHTML = `<h2>Qué ha pasado</h2><p>Elegiste la opción <b>${b.dataset.c === "seguro" ? "segura" : "arriesgada"}</b>. Tu versión estaba redactada en términos de <b>${g ? "vidas salvadas (ganancias)" : "muertes (pérdidas)"}</b>.</p>
    <p>La otra mitad de los visitantes ve la versión ${g ? "de pérdidas: «morirán 400»" : "de ganancias: «se salvarán 200»"}. Las dos versiones son matemáticamente idénticas: «salvar a 200 de 600» es lo mismo que «morirán 400».</p>
    <p>En el estudio original (Tversky y Kahneman, 1981), con la redacción de ganancias el 72 % eligió la opción segura; con la de pérdidas, el 78 % eligió la arriesgada.</p><p><b>Defensa:</b> reformula tú la opción en el marco contrario antes de decidir.</p>`;
    doneDemo("encuadre");
  });
},
senuelo(el){
  const dec = Math.random() < 0.5;
  const plans = [["Solo digital","59 €/año"]].concat(dec ? [["Solo papel","125 €/año"]] : []).concat([["Papel + digital","125 €/año"]]);
  el.innerHTML = `<p>Eres suscriptor de una revista ficticia, <i>La Lupa</i>. ¿Qué plan eliges?</p><div class="plans">${plans.map((p, i) => `<button class="plan" data-p="${i}"><b>${p[0]}</b><span>${p[1]}</span></button>`).join("")}</div>`;
  el.querySelectorAll("[data-p]").forEach(b => b.onclick = () => {
    const ch = plans[+b.dataset.p][0];
    el.innerHTML = `<h2>Qué ha pasado</h2><p>Elegiste <b>${ch}</b>. Tu versión ${dec ? "<b>incluía</b>" : "<b>no incluía</b>"} la opción «Solo papel» a 125 €, que cuesta lo mismo que «Papel + digital» pero ofrece menos: un <b>señuelo</b> que casi nadie elige y cuya función es hacer que la combinada parezca una ganga.</p>
    <p>En la demostración divulgada por Dan Ariely, con el señuelo el 84 % eligió la combinada; sin él, solo el 32 %. Estudios posteriores muestran que el efecto es real pero frágil (Frederick y otros, 2014), y Ariely tiene estudios cuestionados.</p><p><b>Defensa:</b> elimina mentalmente la opción que nunca elegirías y compara de nuevo.</p>`;
    doneDemo("senuelo");
  });
},
"ceguera-cambio"(el){
  const scenes = [
   {ch:"La ventana de la derecha desaparece", opts:["El sol","La ventana de la derecha","La puerta","El árbol","La chimenea"], a:1, draw:x => `<rect x="60" y="90" width="160" height="110" fill="#c9a27c"/><polygon points="50,90 140,30 230,90" fill="#8a3b12"/><rect x="180" y="40" width="18" height="35" fill="#6b4a2f"/><rect x="125" y="140" width="30" height="60" fill="#5b3a1f"/><rect x="80" y="110" width="30" height="25" fill="#bde0f5"/>${x ? "" : '<rect x="170" y="110" width="30" height="25" fill="#bde0f5"/>'}<circle cx="300" cy="45" r="22" fill="#f2c94c"/><rect x="285" y="130" width="12" height="70" fill="#6b4a2f"/><circle cx="291" cy="120" r="32" fill="#4f8a3c"/><rect x="0" y="200" width="380" height="20" fill="#7aa860"/>`},
   {ch:"La rama baja del árbol cambia de lado", opts:["Las nubes","El banco","La farola","La rama del árbol","El perro"], a:3, draw:x => `<rect x="0" y="0" width="380" height="220" fill="#e8f3fb"/><ellipse cx="80" cy="40" rx="40" ry="15" fill="#fff"/><ellipse cx="260" cy="30" rx="50" ry="14" fill="#fff"/><rect x="40" y="170" width="90" height="10" fill="#7b5a3c"/><rect x="45" y="180" width="8" height="20" fill="#7b5a3c"/><rect x="117" y="180" width="8" height="20" fill="#7b5a3c"/><rect x="300" y="80" width="6" height="120" fill="#555"/><circle cx="303" cy="78" r="9" fill="#f2c94c"/><rect x="200" y="100" width="14" height="100" fill="#6b4a2f"/>${x ? '<line x1="207" y1="150" x2="250" y2="125" stroke="#6b4a2f" stroke-width="7"/>' : '<line x1="207" y1="150" x2="164" y2="125" stroke="#6b4a2f" stroke-width="7"/>'}<circle cx="207" cy="90" r="38" fill="#4f8a3c"/><ellipse cx="150" cy="195" rx="16" ry="9" fill="#a0734b"/><circle cx="165" cy="187" r="7" fill="#a0734b"/><rect x="0" y="200" width="380" height="20" fill="#7aa860"/>`},
   {ch:"La taza cambia de color", opts:["El libro","La lámpara","La taza","La planta","El reloj"], a:2, draw:x => `<rect x="0" y="0" width="380" height="220" fill="#f4efe6"/><rect x="20" y="150" width="340" height="12" fill="#8a5a33"/><rect x="40" y="110" width="70" height="40" fill="#2f5d62"/><rect x="45" y="105" width="60" height="6" fill="#ddd"/><rect x="150" y="60" width="6" height="90" fill="#444"/><polygon points="130,60 176,60 165,35 141,35" fill="#e9c46a"/><rect x="210" y="125" width="28" height="25" fill="${x ? "#c0392b" : "#2e86c1"}"/><path d="M238 130 q12 8 0 15" stroke="${x ? "#c0392b" : "#2e86c1"}" stroke-width="4" fill="none"/><rect x="280" y="120" width="30" height="30" fill="#a0522d"/><circle cx="295" cy="105" r="20" fill="#4f8a3c"/><circle cx="330" cy="50" r="22" fill="#fff" stroke="#444" stroke-width="3"/><line x1="330" y1="50" x2="330" y2="35" stroke="#444" stroke-width="3"/><line x1="330" y1="50" x2="342" y2="55" stroke="#444" stroke-width="3"/>`}
  ];
  let k = 0, score = 0, timer = null, t0 = 0;
  const run = () => {
    const sc = scenes[k]; let ph = 0;
    el.innerHTML = `<p>Escena ${k + 1} de ${scenes.length}. Algo cambia entre dos versiones de la imagen, separadas por un breve parpadeo gris. Pulsa «Lo veo» cuando lo descubras.</p>
    <svg id="sv" viewBox="0 0 380 220" class="scene" role="img" aria-label="Escena con un cambio intermitente"></svg><p><button class="btn" id="seen">Lo veo</button> <button class="btn ghost" id="giveup">No lo encuentro</button></p><div id="ans"></div>`;
    const sv = el.querySelector("#sv"); t0 = Date.now();
    timer = setInterval(() => { ph = (ph + 1) % 4; sv.innerHTML = ph === 1 || ph === 3 ? '<rect width="380" height="220" fill="#888"/>' : sc.draw(ph === 2); }, 300);
    sv.innerHTML = sc.draw(false);
    const ask = gave => { clearInterval(timer); const secs = ((Date.now() - t0) / 1000).toFixed(1);
      el.querySelector("#ans").innerHTML = gave ? `<p>El cambio era: <b>${sc.ch}</b>.</p><button class="btn" id="nx">Siguiente</button>` : `<p>¿Qué cambiaba? (${secs} s)</p>${sc.opts.map((o, i) => `<button class="btn ghost" data-o="${i}">${o}</button>`).join(" ")}`;
      el.querySelectorAll("[data-o]").forEach(b => b.onclick = () => { const ok = +b.dataset.o === sc.a; if (ok) score++; el.querySelector("#ans").innerHTML = `<p>${ok ? "¡Correcto!" : "No era eso."} El cambio era: <b>${sc.ch}</b>.</p><button class="btn" id="nx">Siguiente</button>`; bindNext(); });
      if (gave) bindNext(); };
    const bindNext = () => el.querySelector("#nx").onclick = () => { k++; k < scenes.length ? run() : end(); };
    el.querySelector("#seen").onclick = () => ask(false); el.querySelector("#giveup").onclick = () => ask(true);
  };
  const end = () => { el.innerHTML = `<h2>Qué ha pasado</h2><p>Acertaste ${score} de ${scenes.length}. Sin el parpadeo gris, verías el cambio al instante, porque el movimiento atrae la atención. El parpadeo elimina esa señal y obliga a comparar de memoria, y nuestra memoria visual detallada es muy limitada: es la <b>ceguera al cambio</b> (Rensink, O'Regan y Clark, 1997; Simons y Levin, 1998).</p><p><b>Lección:</b> damos por hecho que el mundo es estable y no notamos cambios importantes si no estamos mirando justo ahí. Por eso conviene revisar contratos y condiciones cada vez, aunque «sean los mismos de siempre».</p>`; doneDemo("ceguera-cambio"); };
  W.__demoCleanup = () => clearInterval(timer);
  run();
},
"atencion-selectiva"(el){
  el.innerHTML = `<p>La demostración más famosa de la atención selectiva es el vídeo original de Daniel Simons y Christopher Chabris (1999). Por respeto a sus derechos, no lo copiamos aquí: se abre en su canal oficial.</p>
  <ol><li>Antes de verlo, lee la instrucción: <b>cuenta cuántos pases hacen los jugadores de camiseta blanca</b>.</li><li>Abre el vídeo: <a href="https://www.youtube.com/watch?v=vJG698U2Mvo" target="_blank" rel="noopener noreferrer">«selective attention test», canal de Daniel Simons (YouTube, enlace externo)</a>.</li><li>Vuelve aquí cuando termines.</li></ol>
  <button class="btn" id="seen">Ya lo he visto</button><div id="r"></div>`;
  el.querySelector("#seen").onclick = () => { el.querySelector("#r").innerHTML = `<h2>Qué ha pasado</h2><p>Si no conocías el vídeo, es muy posible que no vieras a la persona disfrazada de gorila que cruza la escena: en el estudio original, alrededor de la mitad no la vio. La tarea de contar ocupaba tu atención.</p><p>Si ya lo conocías, Simons hizo otro vídeo («The Monkey Business Illusion», 2010) en el que, quienes esperan al gorila, se pierden otros cambios.</p><p><b>Lección:</b> quien dirige tu atención controla también lo que no ves.</p>`; doneDemo("atencion-selectiva"); };
},
stroop(el){
  const C = [["ROJO","#c0392b"],["AZUL","#2e6fd1"],["VERDE","#2e8b57"],["AMARILLO","#c9a000"]];
  const N = 8; let trials = [], i = 0, t0 = 0, res = [];
  for (let k = 0; k < N; k++){ const w = Math.floor(Math.random() * 4); trials.push([w, w, true]); }
  for (let k = 0; k < N; k++){ const w = Math.floor(Math.random() * 4); let c; do { c = Math.floor(Math.random() * 4); } while (c === w); trials.push([w, c, false]); }
  trials = pick(trials, trials.length, Math.random);
  el.innerHTML = `<p>Aparecerán palabras de colores. Pulsa el botón del <b>color de la tinta</b>, no lo que dice la palabra. Responde rápido. Son ${trials.length} palabras.</p><button class="btn" id="go">Empezar</button>`;
  const show = () => { const t = trials[i];
    el.innerHTML = `<p class="meta">${i + 1} / ${trials.length}</p><p class="stroop" style="color:${C[t[1]][1]}">${C[t[0]][0]}</p><div class="row">${C.map((c, k) => `<button class="btn ghost" data-k="${k}">${c[0].toLowerCase()}</button>`).join("")}</div>`;
    t0 = performance.now();
    el.querySelectorAll("[data-k]").forEach(b => b.onclick = () => { res.push([t[2], performance.now() - t0, +b.dataset.k === t[1]]); i++; i < trials.length ? show() : end(); }); };
  const avg = a => a.length ? Math.round(a.reduce((x, y) => x + y, 0) / a.length) : 0;
  const end = () => { const con = res.filter(r => r[0]), inc = res.filter(r => !r[0]);
    el.innerHTML = `<h2>Qué ha pasado</h2><p>Tiempo medio cuando palabra y tinta coincidían: <b>${avg(con.map(r => r[1]))} ms</b> (${con.filter(r => r[2]).length}/${con.length} aciertos).<br>Cuando no coincidían: <b>${avg(inc.map(r => r[1]))} ms</b> (${inc.filter(r => r[2]).length}/${inc.length} aciertos).</p>
    <p>Lo habitual es tardar más y fallar más cuando no coinciden: es el <b>efecto Stroop</b> (John Ridley Stroop, 1935), uno de los resultados más replicados de la psicología. Leer es tan automático que no puedes evitarlo aunque te estorbe.</p><p><b>Lección:</b> muchos procesos mentales son automáticos. Los mensajes que se leen «sin querer» (eslóganes, titulares, carteles) influyen aunque no les prestes atención: por eso la repetición funciona.</p>`;
    doneDemo("stroop"); };
  el.querySelector("#go").onclick = show;
},
"falsa-memoria"(el){
  const L = ["cama","descanso","despierto","cansado","soñar","almohada","bostezo","siesta","manta","dormitar","roncar","noche"];
  const test = [["cama",1],["sueño",0,true],["mesa",0],["almohada",1],["ventana",0],["siesta",1],["dulce",0],["noche",1],["coche",0],["descanso",1]];
  el.innerHTML = `<p>Verás ${L.length} palabras, una cada segundo. Intenta recordarlas todas.</p><button class="btn" id="go">Empezar</button>`;
  el.querySelector("#go").onclick = () => { let i = 0; el.innerHTML = `<p class="bigword" id="w"></p>`; const w = el.querySelector("#w");
    const iv = setInterval(() => { if (i < L.length){ w.textContent = L[i++]; } else { clearInterval(iv); quiz(); } }, 1000); W.__demoCleanup = () => clearInterval(iv); };
  const quiz = () => { el.innerHTML = `<p>¿Cuáles de estas palabras estaban en la lista? Marca solo las que recuerdes.</p><div class="row">${test.map((t, i) => `<label class="chip"><input type="checkbox" data-i="${i}"> ${t[0]}</label>`).join("")}</div><button class="btn" id="ok">Comprobar</button>`;
    el.querySelector("#ok").onclick = () => { const ch = [...el.querySelectorAll("[data-i]")].filter(c => c.checked).map(c => +c.dataset.i);
      const lure = ch.includes(1), hits = ch.filter(i => test[i][1]).length, fa = ch.filter(i => !test[i][1] && !test[i][2]).length;
      el.innerHTML = `<h2>Qué ha pasado</h2><p>Reconociste ${hits} de 5 palabras que sí estaban y marcaste ${fa} palabras no relacionadas.</p><p>${lure ? "<b>Marcaste «sueño». Esa palabra nunca apareció.</b>" : "No marcaste «sueño», que <b>nunca apareció</b>: ¡bien!"} Todas las palabras de la lista estaban relacionadas con el sueño, y la memoria guarda el significado general y rellena los huecos con lo que encaja.</p><p>En el estudio de Roediger y McDermott (1995), la palabra ausente se «recordó» alrededor del 40 % de las veces y se reconoció con tanta seguridad como las palabras reales.</p><p><b>Lección:</b> la seguridad con la que recuerdas algo no prueba que sea cierto. Las preguntas sugestivas y la repetición pueden aprovecharlo.</p>`;
      doneDemo("falsa-memoria"); }; };
},
"patron-oscuro"(el){
  const traps = {
   timer:["Cuenta atrás falsa","El reloj se reinicia al recargar: urgencia falsa para que no compares."],
   stock:["«Solo quedan 2»","Mensaje de escasez imposible de comprobar."],
   viewers:["«31 personas viendo esto»","Prueba social sin verificación posible."],
   ins:["Seguro premarcado","Casilla marcada por defecto que añade un coste."],
   sub:["Suscripción en la «prueba gratis»","La prueba gratuita se convierte en un pago mensual en letra pequeña."],
   shame:["«No, prefiero pagar más»","Confirmshaming: avergonzar por decir que no."],
   fee:["Gastos de gestión al final","Coste oculto que aparece en el último paso."],
   strike:["Precio tachado inflado","Ancla de un precio «anterior» que nunca se cobró."]
  };
  const legit = {ship:["Envío: 3 días","Información útil y comprobable."], ret:["Devolución en 14 días","Derecho legal informado con claridad."], total:["Resumen de pedido","Necesario para revisar la compra."]};
  const found = new Set(), wrong = new Set();
  el.innerHTML = `<p>Esta es una tienda <b>ficticia</b>. Toca todos los elementos que te parezcan trampas (hay ${Object.keys(traps).length}). Cuando termines, pulsa «Revisar».</p>
  <div class="shop" id="shop">
   <div class="shop-h">AuriTec · Auriculares inalámbricos X200 <span class="hot" data-t="timer">⏱ Oferta termina en <b id="tm">09:59</b></span></div>
   <div class="shop-b"><div class="shop-img" aria-hidden="true">🎧</div><div>
    <p><span class="hot" data-t="strike"><s>249 €</s></span> <b class="price">79 €</b></p>
    <p><span class="hot" data-t="stock">⚠ ¡Solo quedan 2 unidades!</span> <span class="hot" data-t="viewers">👀 31 personas viendo esto</span></p>
    <p><span class="hot" data-l="ship">🚚 Envío: 3 días laborables</span> · <span class="hot" data-l="ret">↩ Devolución en 14 días</span></p>
    <p><span class="hot" data-t="ins"><span aria-hidden="true">☑</span> Añadir seguro de rotura (4,99 €/mes)</span></p>
    <p><span class="hot" data-t="sub"><span aria-hidden="true">☑</span> Probar AuriMúsica gratis <span class="tiny">(después 12,99 €/mes, renovación automática)</span></span></p>
    <div class="hot box" data-l="total">Subtotal 79,00 € · Envío 0,00 € <span class="hot" data-t="fee">· Gastos de gestión 6,90 €</span></div>
    <p><span class="fakebtn">Comprar ahora</span> <span class="hot tiny" data-t="shame">No, gracias, prefiero pagar más en otra tienda</span></p>
   </div></div></div>
  <p><button class="btn" id="rev">Revisar</button> <span class="meta" id="cnt">0 marcadas</span></p><div id="res"></div>`;
  let sec = 599; const tm = el.querySelector("#tm"); const iv = setInterval(() => { sec = sec > 0 ? sec - 1 : 599; tm.textContent = String(Math.floor(sec / 60)).padStart(2, "0") + ":" + String(sec % 60).padStart(2, "0"); }, 1000);
  W.__demoCleanup = () => clearInterval(iv);
  el.querySelectorAll(".hot").forEach(h => { h.tabIndex = 0; h.setAttribute("role", "button"); h.setAttribute("aria-pressed", "false"); h.onkeydown = ev => { if (ev.key === "Enter" || ev.key === " "){ ev.preventDefault(); h.click(); } }; });
  el.querySelectorAll(".hot").forEach(h => h.onclick = ev => { ev.stopPropagation(); const k = h.dataset.t || h.dataset.l; const set = h.dataset.t ? found : wrong;
    if (set.has(k)){ set.delete(k); h.classList.remove("marked"); } else { set.add(k); h.classList.add("marked"); } h.setAttribute("aria-pressed", String(set.has(k)));
    el.querySelector("#cnt").textContent = (found.size + wrong.size) + " marcadas"; });
  el.querySelector("#rev").onclick = () => { clearInterval(iv); const all = Object.keys(traps).length;
    el.querySelector("#res").innerHTML = `<h2>Resultado: ${found.size} de ${all} trampas</h2>${wrong.size ? `<p>Marcaste ${wrong.size} elemento(s) que eran información legítima: ${[...wrong].map(k => `<b>${legit[k][0]}</b> (${legit[k][1]})`).join("; ")}.</p>` : ""}
    <ul>${Object.entries(traps).map(([k, v]) => `<li>${found.has(k) ? "✓" : "✗"} <b>${v[0]}</b>: ${v[1]}</li>`).join("")}</ul>
    <p>Estos patrones están documentados en miles de webs reales (Mathur y otros, 2019) y varios están prohibidos en la UE y perseguidos por la FTC de EE. UU. ${found.size === all && !wrong.size ? "<b>¡Has encontrado todas! Insignia «Detector de patrones oscuros» desbloqueada.</b>" : "Encuentra todas sin falsos positivos para conseguir la insignia «Detector de patrones oscuros»."}</p><button class="btn ghost" onclick="location.reload()">Repetir</button>`;
    doneDemo("patron-oscuro"); if (found.size === all && !wrong.size){ P.dark = true; save(); } };
},
"persuasion-o-manipulacion"(el){
  const cs = W.CASOS_PM; let i = 0, ok = 0;
  const show = () => { const c = cs[i];
    el.innerHTML = `<p class="meta">Caso ${i + 1} de ${cs.length} · aciertos: ${ok}</p><p class="quote">${esc(c[0])}</p><div class="row"><button class="btn ghost" data-a="p">Persuasión</button><button class="btn ghost" data-a="m">Manipulación</button></div><div id="fb"></div>`;
    el.querySelectorAll("[data-a]").forEach(b => b.onclick = () => { const good = b.dataset.a === c[1]; if (good) ok++;
      el.querySelector("#fb").innerHTML = `<p class="${good ? "okc" : "bad"}">${good ? "Correcto" : "No exactamente"}: es <b>${c[1] === "p" ? "persuasión" : "manipulación"}</b>. ${esc(c[2])}</p><button class="btn" id="nx">${i + 1 < cs.length ? "Siguiente" : "Ver resultado"}</button>`;
      el.querySelectorAll("[data-a]").forEach(x => x.disabled = true);
      el.querySelector("#nx").onclick = () => { i++; i < cs.length ? show() : end(); }; }); };
  const end = () => { el.innerHTML = `<h2>Resultado: ${ok} de ${cs.length}</h2><p>La clave casi siempre es la misma: ¿la influencia se basa en información verdadera, es transparente y respeta la decisión de la otra persona? ¿O necesita ocultar algo, crear prisa o explotar una emoción o una debilidad? Aplica el <a href="${H("influencia-etica/test-transparencia")}">test de transparencia</a>.</p>`; doneDemo("persuasion-o-manipulacion"); };
  show();
}
};

// ---------- Quizzes ----------
function quizHTML(id, qs){
  return `<form class="quiz" data-quiz="${esc(id)}">${qs.map((q, i) => `<fieldset><legend>${i + 1}. ${md(q[0])}</legend>${q[1].map((o, j) => `<label><input type="radio" name="q${i}" value="${j}"> ${md(o)}</label>`).join("")}<p class="fb" data-fb="${i}"></p></fieldset>`).join("")}<button class="btn" type="submit">Comprobar</button> <span class="qres meta"></span></form>`;
}
const QUIZ = {};
function bindQuizzes(){
  app.querySelectorAll("form[data-quiz]").forEach(f => f.onsubmit = ev => {
    ev.preventDefault(); const id = f.dataset.quiz, qs = QUIZ[id] || (FU.find(x => "fu-" + x.s === id) || {}).qs || []; let ok = 0;
    qs.forEach((q, i) => { const v = f.querySelector(`input[name=q${i}]:checked`), good = v && +v.value === q[2]; if (good) ok++;
      const fb = f.querySelector(`[data-fb="${i}"]`); fb.className = "fb " + (good ? "okc" : "bad"); fb.innerHTML = (good ? "Correcto. " : `Respuesta correcta: <b>${md(q[1][q[2]])}</b>. `) + md(q[3] || ""); });
    const pct = Math.round(ok / qs.length * 100); f.querySelector(".qres").textContent = `${ok} de ${qs.length} (${pct} %)`;
    const cb = QUIZ_CB[id]; if (cb) cb(pct);
  });
}
const QUIZ_CB = {};

// Generación de preguntas a partir de las fichas
function qFromRef(r, rnd){
  const i = r.indexOf(":"), k = r.slice(0, i), s = r.slice(i + 1), out = [];
  const opts = (right, pool) => { const o = pick([...new Set(pool.filter(x => x !== right))], 3, rnd).concat([right]); const sh = pick(o, o.length, rnd); return [sh, sh.indexOf(right)]; };
  if (k === "e"){ const e = exBy(s); if (!e) return out;
    out.push([`¿Cuál es el estado de réplica de «${e.t}» (${e.y})?`, Object.values(W.ESTADOS).map(v => v[0]), Object.keys(W.ESTADOS).indexOf(e.est), W.ESTADOS[e.est][1] + " " + e.rep]);
    let [o, a] = opts(e.inv[0], EX.map(x => x.inv[0])); out.push([`¿Quién dirigió o firmó en primer lugar «${e.t}»?`, o, a, e.pub]);
    [o, a] = opts(e.lec, EX.map(x => x.lec)); out.push([`¿Qué enseña «${e.t}» sobre la manipulación?`, o, a, ""]);
  }
  if (k === "t"){ const t = teBy(s); if (!t) return out;
    let [o, a] = opts(t.n, TE.map(x => x.n)); out.push([`¿Qué técnica sugiere la frase «${t.fr[0]}»?`, o, a, t.sen[0]]);
    [o, a] = opts(t.n, TE.map(x => x.n)); out.push([`¿A qué técnica corresponde este caso? ${t.ej}`, o, a, t.resp[0]]);
  }
  if (k === "p"){ const p = prBy(s); if (!p || p.org === "—") return out;
    let [o, a] = opts(p.org, PR.map(x => x.org).filter(x => x !== "—")); out.push([`¿Qué organismo estuvo detrás de «${p.n}»?`, o, a, p.d.slice(0, 160) + "…"]);
    [o, a] = opts(p.y, PR.map(x => x.y).filter(x => x !== "—")); out.push([`¿En qué periodo se sitúa «${p.n}»?`, o, a, ""]);
  }
  if (k === "f"){ const f = FU.find(x => x.s === s); if (f) out.push(...f.qs); }
  return out;
}
function lessonQuiz(n, l){
  const L = W.NIVELES[n - 1].L[l], rnd = seeded("L" + n + "-" + l);
  let pool = (L.q || []).slice(); const gen = []; L.r.forEach(r => gen.push(...qFromRef(r, rnd)));
  pool = pool.concat(pick(gen, gen.length, rnd));
  if (pool.length < 5){ const extra = []; W.NIVELES[n - 1].L.forEach((x, j) => j !== l && x.r.forEach(r => extra.push(...qFromRef(r, rnd)))); pool = pool.concat(pick(extra, 5 - pool.length, rnd)); }
  return pool.slice(0, 5);
}
function examQuiz(n){
  const rnd = seeded("X" + n + "-" + (P.exams["try" + n] || 0)), all = [];
  W.NIVELES[n - 1].L.forEach(L => { (L.q || []).forEach(q => all.push(q)); L.r.forEach(r => all.push(...qFromRef(r, rnd))); all.push(L.c); });
  return pick(all, 10, rnd);
}
const lessonKey = (n, l) => n + "-" + l;
const totalLessons = () => W.NIVELES.reduce((a, N) => a + N.L.length, 0);
const coursePct = () => Math.round(Object.values(P.lessons).filter(v => v >= 60).length / totalLessons() * 100);

function pageCurso(){
  const tot = totalLessons(), done = Object.values(P.lessons).filter(v => v >= 60).length;
  return crumbs([["Inicio",""],["Curso"]]) + `<h1>Ruta de aprendizaje</h1><p class="lead">Un curso opcional de 5 niveles y ${tot} lecciones. Cada lección: lectura de fichas, caso práctico y mini-quiz de 5 preguntas (aprobada con ≥ 60 %). Cada nivel tiene un examen final de 10 preguntas (≥ 70 % para aprobar). Al aprobar los cinco exámenes obtienes el certificado.</p>
  <div class="bar"><i style="width:${coursePct()}%"></i></div><p class="meta">${done} de ${tot} lecciones completadas · <a href="${H("progreso")}">Ver progreso e insignias</a></p>
  ${W.NIVELES.map(N => { const d = N.L.filter((x, l) => (P.lessons[lessonKey(N.n, l)] || 0) >= 60).length;
    return `<div class="panel"><h2>Nivel ${N.n}. ${esc(N.t)}</h2><p class="meta">${esc(N.d)} · ${d}/${N.L.length} lecciones · Examen: ${P.exams[N.n] != null ? P.exams[N.n] + " %" + (P.exams[N.n] >= 70 ? " ✓" : "") : "pendiente"}</p>
    <ol>${N.L.map((L, l) => `<li><span class="st ${(P.lessons[lessonKey(N.n, l)] || 0) >= 60 ? "done" : ""}">${(P.lessons[lessonKey(N.n, l)] || 0) >= 60 ? "✓" : "○"}</span> <a href="${H("curso/" + N.n + "/" + (l + 1))}">${esc(L.t)}</a></li>`).join("")}</ol>
    <a class="btn ghost" href="${H("curso/" + N.n + "/examen")}">Examen del nivel ${N.n}</a></div>`; }).join("")}
  ${certReady() ? `<p><a class="btn" href="${H("curso/certificado")}">Ver tu certificado</a></p>` : ""}`;
}
const certReady = () => W.NIVELES.every(N => (P.exams[N.n] || 0) >= 70);
function pageLeccion(n, l){
  const N = W.NIVELES[n - 1]; if (!N || !N.L[l]) return nf(); const L = N.L[l], key = lessonKey(n, l);
  const qs = lessonQuiz(n, l), qid = "L" + key; QUIZ[qid] = qs;
  QUIZ_CB[qid] = pct => { P.lessons[key] = Math.max(P.lessons[key] || 0, pct); autoSections(); save(); };
  const c = L.c, prev = l > 0 ? H("curso/" + n + "/" + l) : null, next = l + 1 < N.L.length ? H("curso/" + n + "/" + (l + 2)) : H("curso/" + n + "/examen");
  return crumbs([["Inicio",""],["Curso","curso"],["Nivel " + n, "curso"],[L.t]]) + `<article class="prose"><p class="kicker">Nivel ${n} · Lección ${l + 1} de ${N.L.length}</p><h1>${esc(L.t)}</h1>
  <h2>1. Lectura</h2><p>Lee estas fichas (se abren en esta misma ventana; vuelve con el botón Atrás):</p><ul>${L.r.map(r => `<li>${refLink(r)}</li>`).join("")}</ul>
  <h2>2. Caso práctico</h2><p class="quote">${md(c[0])}</p><form class="quiz" data-case="1">${c[1].map((o, j) => `<label><input type="radio" name="c" value="${j}"> ${md(o)}</label>`).join("")}<button class="btn" type="submit">Responder</button><p class="fb" id="casefb"></p></form>
  <h2>3. Mini-quiz</h2>${quizHTML(qid, qs)}
  ${P.lessons[key] != null ? `<p class="meta">Tu mejor resultado: ${P.lessons[key]} %</p>` : ""}</article>
  <nav class="pager">${prev ? `<a href="${prev}">← Lección anterior</a>` : "<span></span>"}<a href="${next}">${l + 1 < N.L.length ? "Siguiente lección →" : "Examen del nivel →"}</a></nav>`;
}
function pageExamen(n){
  const N = W.NIVELES[n - 1]; if (!N) return nf(); const qs = examQuiz(n), qid = "X" + n; QUIZ[qid] = qs;
  QUIZ_CB[qid] = pct => { P.exams[n] = Math.max(P.exams[n] || 0, pct); P.exams["try" + n] = (P.exams["try" + n] || 0) + 1; save();
    app.querySelector("#exres").innerHTML = pct >= 70 ? `<div class="box good">¡Aprobado con ${pct} %! ${certReady() ? `<a href="${H("curso/certificado")}">Ver certificado</a>` : `<a href="${H("curso")}">Volver al curso</a>`}</div>` : `<div class="box warnbox">${pct} %: necesitas un 70 %. Repasa las lecciones y <a href="javascript:location.reload()">vuelve a intentarlo</a> (las preguntas cambian).</div>`; };
  return crumbs([["Inicio",""],["Curso","curso"],["Examen del nivel " + n]]) + `<h1>Examen del nivel ${n}: ${esc(N.t)}</h1><p class="lead">10 preguntas. Necesitas un 70 % para aprobar.${P.exams[n] != null ? ` Tu mejor resultado: ${P.exams[n]} %.` : ""}</p>${quizHTML(qid, qs)}<div id="exres"></div>`;
}
function pageCertificado(){
  if (!certReady()) return crumbs([["Inicio",""],["Curso","curso"],["Certificado"]]) + `<h1>Certificado</h1><p>Aprueba los exámenes de los cinco niveles para obtener tu certificado.</p><a class="btn" href="${H("curso")}">Ir al curso</a>`;
  return crumbs([["Inicio",""],["Curso","curso"],["Certificado"]]) + `<p class="noprint"><label>Tu nombre para el certificado: <input id="certname" value="${esc(P.name)}"></label> <button class="btn ghost" onclick="window.print()">Imprimir o guardar en PDF</button></p>
  <div class="cert"><p class="kicker">Certificado de finalización</p><h1>Investigación sobre la Manipulación</h1><p>Se certifica que</p><p class="certname" id="cn">${esc(P.name || "—")}</p><p>ha completado la ruta de aprendizaje de 5 niveles (${totalLessons()} lecciones) y ha aprobado los exámenes de cada nivel:</p>
  <p>${W.NIVELES.map(N => `${esc(N.t)}: ${P.exams[N.n]} %`).join(" · ")}</p><p class="meta">Certificado de autoaprendizaje sin validez académica oficial. Emitido el ${new Date().toLocaleDateString("es-ES")}.</p></div>`;
}

// ---------- Progreso e insignias ----------
function autoSections(){
  if ([0,1,2,3].every(l => (P.lessons["5-" + l] || 0) >= 60)) P.sec["influencia-etica"] = true;
  if ([7,8,9].every(l => (P.lessons["5-" + l] || 0) >= 60)) P.sec["autodefensa"] = true;
}
function badges(){
  const skept = EX.filter(e => (e.est === "n" || e.est === "f") && P.read.e[e.s]).length;
  return [
   ["Escéptico", "Lee 5 fichas de estudios no replicados o fraudulentos.", skept >= 5, `${Math.min(skept, 5)}/5`],
   ["Inoculado", "Completa las 9 demostraciones.", DEMOS.every(d => P.demos[d.s]), `${DEMOS.filter(d => P.demos[d.s]).length}/9`],
   ["Detector de patrones oscuros", "Encuentra todas las trampas de la tienda ficticia sin falsos positivos.", P.dark, P.dark ? "1/1" : "0/1"],
   ["Negociador ético", "Completa la sección Influencia ética (o las lecciones 1–4 del nivel 5).", !!P.sec["influencia-etica"], P.sec["influencia-etica"] ? "1/1" : "0/1"],
   ["Defensor", "Completa la sección Autodefensa (o las lecciones 8–10 del nivel 5).", !!P.sec["autodefensa"], P.sec["autodefensa"] ? "1/1" : "0/1"]
  ];
}
function pageProgreso(){
  const ne = Object.keys(P.read.e).length, nt = Object.keys(P.read.t).length, np = Object.keys(P.read.p).length;
  return crumbs([["Inicio",""],["Progreso"]]) + `<h1>Tu progreso</h1><p class="lead">Se guarda solo en este navegador. No hay cuentas ni se envía nada a ningún servidor.</p>
  <div class="grid three"><div class="panel"><p class="bignum">${coursePct()} %</p><p>del curso</p></div><div class="panel"><p class="bignum">${ne}/${EX.length}</p><p>experimentos leídos</p></div><div class="panel"><p class="bignum">${nt}/${TE.length}</p><p>técnicas leídas</p></div><div class="panel"><p class="bignum">${np}/${PR.length}</p><p>fichas de FBI y gobiernos</p></div><div class="panel"><p class="bignum">${Object.keys(P.demos).length}/9</p><p>demostraciones</p></div></div>
  <h2>Insignias</h2><div class="grid">${badges().map(b => `<div class="card badge ${b[2] ? "on" : ""}"><h3>${b[2] ? "🏅" : "🔒"} ${esc(b[0])}</h3><p class="meta">${esc(b[1])}</p><p>${b[3]}</p></div>`).join("")}</div>
  <p><button class="btn ghost" id="reset">Borrar mi progreso</button></p>`;
}

// ---------- Línea de tiempo, investigadores, glosario, biblioteca, ayuda ----------
const EXTRA_TL = [
 [1917,"Comité de Información Pública (Comité Creel) en EE. UU.","p:bernays"],[1928,"Edward Bernays publica «Propaganda»","p:bernays"],[1937,"Institute for Propaganda Analysis: siete técnicas de propaganda","t:propaganda-clasica"],
 [1944,"Película «Luz que agoniza» (Gaslight)","t:gaslighting"],[1947,"Código de Núremberg","li:etica-investigacion"],[1950,"Edward Hunter populariza el término «lavado de cerebro»","p:lavado-de-cerebro-corea"],
 [1961,"Lifton publica «Thought Reform»","t:reforma-del-pensamiento"],[1964,"Asesinato de Kitty Genovese, relato exagerado por la prensa","e:darley-latane-espectador"],[1971,"Robo de documentos del FBI en Media (Pensilvania)","p:cointelpro"],
 [1972,"Se revela el estudio de Tuskegee","li:etica-investigacion"],[1975,"Comité Church del Senado de EE. UU.","p:cointelpro"],[1977,"Audiencias del Senado sobre MKUltra","p:mkultra"],[1979,"Informe Belmont","li:etica-investigacion"],
 [1983,"Comienza la Operación INFEKTION","p:medidas-activas"],[1984,"Cialdini publica «Influence»","f:principios-cialdini"],[1989,"Caso de los Cinco de Central Park","p:confesiones-falsas"],[1992,"Modelo PEACE en el Reino Unido","p:confesiones-falsas"],
 [1997,"Desclasificación del manual KUBARK","p:kubark"],[2002,"Exoneración de los Cinco de Central Park","p:confesiones-falsas"],[2008,"Thaler y Sunstein publican «Nudge»","i:0"],[2009,"Creación del HIG","p:hig"],
 [2010,"Harry Brignull acuña «dark patterns»","t:cancelacion-laberintica"],[2011,"Kahneman publica «Pensar rápido, pensar despacio»","f:dos-velocidades"],[2015,"El control coercitivo se tipifica como delito en Inglaterra y Gales","li:limites-legales"],
 [2016,"Réplica multilaboratorio del agotamiento del ego","e:baumeister-agotamiento-ego"],[2018,"Escándalo de Cambridge Analytica","i:3"],[2019,"Informe Mueller","p:desinformacion-contemporanea"],[2021,"Retractación del estudio «firmar al principio»","e:shu-ariely-firma-retractado"],
 [2022,"Ley de Servicios Digitales de la UE (prohíbe patrones oscuros en plataformas)","li:limites-legales"],[2025,"Acuerdo de Amazon con la FTC por la baja de Prime","li:casos-consecuencias"]
];
let TLF = "";
function pageTimeline(){
  const items = EX.map(e => [e.y, e.t + " (" + e.inv[0] + ")", "e:" + e.s, "exp"]).concat(EXTRA_TL.map(x => [x[0], x[1], x[2], "hist"])).sort((a, b) => a[0] - b[0]).filter(x => !TLF || x[3] === TLF);
  return crumbs([["Inicio",""],["Línea de tiempo"]]) + `<h1>Línea de tiempo</h1><p class="lead">Cronología de la investigación y los casos documentados.</p>
  <div class="row tool"><label>Mostrar <select id="tlf"><option value="">Todo</option><option value="exp" ${TLF === "exp" ? "selected" : ""}>Experimentos y estudios</option><option value="hist" ${TLF === "hist" ? "selected" : ""}>Casos, leyes y publicaciones</option></select></label></div>
  <ol class="tl big">${items.map(x => { const r = ref(x[2]); return `<li class="${x[3]}"><b>${x[0]}</b> ${r ? `<a href="${r.h}">${esc(x[1])}</a>` : esc(x[1])}</li>`; }).join("")}</ol>`;
}
function pageInvestigadores(){
  return crumbs([["Inicio",""],["Investigadores"]]) + `<h1>Investigadores</h1><p class="lead">${INV.length} fichas de las personas detrás de los estudios y las críticas.</p><div class="grid">${INV.map(p => `<a class="card" href="${H("investigadores/" + p.s)}"><h3>${esc(p.n)}</h3><p class="meta">${esc(p.f)} · ${esc(p.i)}</p></a>`).join("")}</div>`;
}
function pageInvestigador(s){
  const p = inv(s); if (!p) return nf(); const ex = EX.filter(e => e.inv.includes(p.n));
  return crumbs([["Inicio",""],["Investigadores","investigadores"],[p.n]]) + `<article class="prose"><h1>${esc(p.n)}</h1><p class="meta">${esc(p.f)} · ${esc(p.i)}</p>
  <h2>Aportaciones</h2><ul>${p.a.map(x => `<li>${md(x)}</li>`).join("")}</ul>${ex.length ? `<h2>Experimentos en este sitio</h2><ul>${ex.map(e => `<li><a href="${H("experimentos/" + e.s)}">${esc(e.t)}</a> (${e.y}) ${estTag(e)}</li>`).join("")}</ul>` : ""}
  <h2>Críticas y matices</h2><p>${md(p.c)}</p></article>`;
}
function pageGlosario(term){
  const G = W.GLOSARIO, slug = g => norm(g[0]).replace(/ /g, "-");
  if (term){ const g = G.find(x => slug(x) === term); if (!g) return nf(); const r = ref(g[2]);
    return crumbs([["Inicio",""],["Glosario","glosario"],[g[0]]]) + `<article class="prose"><h1>${esc(g[0])}</h1><p class="lead">${md(g[1])}</p>${r ? `<p>Más información: <a href="${r.h}">${esc(r.t)}</a> (${esc(r.k)})</p>` : ""}</article>`; }
  const letters = [...new Set(G.map(g => norm(g[0])[0].toUpperCase()))];
  return crumbs([["Inicio",""],["Glosario"]]) + `<h1>Glosario</h1><p class="lead">${G.length} términos.</p><p class="letters">${letters.map(l => `<a href="#" data-letter="${l}">${l}</a>`).join(" ")}</p>
  <dl class="gl">${G.map(g => `<dt id="g-${slug(g)}" data-l="${norm(g[0])[0].toUpperCase()}"><a href="${H("glosario/" + slug(g))}">${esc(g[0])}</a></dt><dd>${md(g[1])}</dd>`).join("")}</dl>`;
}
function pageBiblioteca(){
  const B = W.BIBLIOTECA;
  return crumbs([["Inicio",""],["Biblioteca"]]) + `<h1>Biblioteca</h1><p class="lead">Libros, documentos y películas recomendados. Los artículos originales de cada experimento están citados en su ficha.</p>
  <h2>Libros</h2><div class="tablewrap"><table><thead><tr><th>Autor</th><th>Obra</th><th>Por qué leerla</th></tr></thead><tbody>${B.libros.map(b => `<tr><td>${esc(b[0])}</td><td><i>${esc(b[1])}</i></td><td>${esc(b[2])}</td></tr>`).join("")}</tbody></table></div>
  <h2>Documentos y artículos</h2><div class="tablewrap"><table><thead><tr><th>Autor</th><th>Título</th><th>Contenido</th></tr></thead><tbody>${B.docs.map(b => `<tr><td>${esc(b[0])}</td><td>${esc(b[1])}</td><td>${esc(b[2])}</td></tr>`).join("")}</tbody></table></div>
  <h2>Documentales y películas (para debate)</h2><ul>${B.pelis.map(b => `<li><i>${esc(b[0])}</i>: ${esc(b[1])}</li>`).join("")}</ul>`;
}
function pageAyuda(){
  return crumbs([["Inicio",""],["Pedir ayuda"]]) + `<h1>Pedir ayuda</h1>
  <div class="cw big"><b>Si estás en peligro inmediato, llama al número de emergencias de tu país: 112 en Europa, 911 en EE. UU., México, Argentina y gran parte de América.</b></div>
  <p class="lead">No necesitas estar seguro de que lo que vives «es suficiente» para llamar: estos servicios orientan, escuchan y te ayudan a decidir. Este sitio es educativo y no sustituye la ayuda psicológica, médica ni legal.</p>
  <p class="meta">Teléfonos recopilados en noviembre de 2026 y pendientes de verificación con cada servicio oficial. Pueden cambiar: confírmalos en la web oficial de cada servicio. Si un número no funciona, avísanos desde <a href="${H("contacto")}">Contacto</a>.</p>
  ${W.AYUDA.map(c => `<section class="panel"><h2>${esc(c.p)}</h2><div class="tablewrap"><table><thead><tr><th>Servicio</th><th>Teléfono o web</th><th>Horario</th></tr></thead><tbody>${c.r.map(r => `<tr><td>${esc(r[0])}</td><td><b>${esc(r[1])}</b></td><td>${esc(r[2])}</td></tr>`).join("")}</tbody></table></div></section>`).join("")}
  <h2>Si usas un dispositivo compartido</h2><ul><li>Este sitio no guarda nada salvo tu progreso del curso en este navegador (puedes borrarlo en <a href="${H("progreso")}">Progreso</a>).</li><li>Usa una ventana privada o de incógnito si te preocupa que alguien vea tu historial.</li><li>Borra del registro de llamadas los números a los que llames si es necesario.</li></ul>`;
}
function pageMetodologia(){ return crumbs([["Inicio",""],["Metodología"]]) + `<article class="prose"><h1>Metodología</h1><p class="lead">Cómo se evalúan las fuentes y el estado de réplica.</p>${body(W.METODOLOGIA)}</article>`; }
const STATIC = {
 acerca:["Acerca de este sitio",["Investigación sobre la Manipulación es un sitio educativo en español para entender cómo funciona la manipulación, reconocerla y protegerse. Está dirigido a personas desde los 16 años, estudiantes de psicología, comunicación y derecho, docentes y cualquiera que quiera protegerse en sus relaciones, en el trabajo, en el consumo y en internet.","## Principios",["**Enfoque defensivo y educativo:** las técnicas se describen con sus señales y defensas.","**Persuasión frente a manipulación:** la diferencia se explica con claridad.","**Rigor científico:** cada experimento indica su estado de réplica.","**Fuentes verificables:** artículos revisados por pares, documentos oficiales, informes parlamentarios.","**Ética:** se explica por qué muchos experimentos clásicos hoy no se aprobarían.","**Ayuda real:** enlaces a servicios de ayuda de cada país."]]],
 "aviso-legal":["Aviso legal",["Contenido educativo. **No sustituye la ayuda psicológica, médica ni legal.** Si estás en peligro, llama a emergencias.","Los casos de ejemplo de las técnicas son ficticios. Las marcas, webs y tiendas de las demostraciones son inventadas.","Las referencias legales son información general y pueden no estar actualizadas; consulta a un profesional.","Las obras citadas pertenecen a sus autores; se citan con fines de investigación y enseñanza."]],
 privacidad:["Privacidad",["Este sitio funciona sin servidor: **no recoge, envía ni vende datos**. No usa cookies de seguimiento ni analítica.","Tu progreso (lecciones, demostraciones, insignias, tema claro u oscuro y el nombre del certificado) se guarda solo en el almacenamiento local de tu navegador. Puedes borrarlo en la página Progreso.","Las demostraciones no guardan respuestas personales, salvo tus propios intentos de la demostración de anclaje, también solo en tu navegador.","El único enlace externo de las demostraciones (el vídeo de Simons y Chabris) abre un sitio de terceros con su propia política de privacidad."]],
 accesibilidad:["Accesibilidad",["El sitio busca cumplir las pautas WCAG 2.2 de nivel AA: contraste suficiente en modo claro y oscuro, navegación con teclado, enlace para saltar al contenido, migas de pan, textos alternativos en las imágenes de las demostraciones y diseño adaptable a móviles.","Las etiquetas de estado de réplica usan texto además de color.","Si encuentras una barrera, escríbenos desde Contacto."]],
 contacto:["Contacto",["Para comunicar errores, proponer correcciones o avisar de un teléfono de ayuda que no funciona, escribe al responsable del sitio indicando la página y la fuente de la corrección.","**Política de correcciones:** las correcciones se publican al pie de la ficha correspondiente con su fecha.","Este sitio no ofrece atención a víctimas: si necesitas ayuda, ve a Pedir ayuda."]]
};
const pageStatic = k => crumbs([["Inicio",""],[STATIC[k][0]]]) + `<article class="prose"><h1>${esc(STATIC[k][0])}</h1>${body(STATIC[k][1])}</article>`;

// ---------- Buscador ----------
let IDX = null;
function buildIndex(){
  IDX = [];
  EX.forEach(e => IDX.push({k:"Experimento", t:e.t, h:H("experimentos/" + e.s), txt:[e.t, e.inv.join(" "), e.y, e.q, e.lec, W.CATEX[e.cat]].join(" "), d:e.inv.join(", ") + " · " + e.y}));
  TE.forEach(t => IDX.push({k:"Técnica", t:t.n, h:H("tecnicas/" + t.s), txt:[t.n, t.al.join(" "), t.fr.join(" "), t.sen.join(" "), t.mec].join(" "), d:"«" + t.fr[0] + "»", fr:t.fr, te:t}));
  PR.forEach(p => IDX.push({k:"FBI y gobiernos", t:p.n, h:H("fbi-y-gobiernos/" + p.s), txt:[p.n, p.org, p.y, p.d].join(" "), d:p.org + " · " + p.y}));
  FU.forEach(f => IDX.push({k:"Fundamentos", t:f.t, h:H("fundamentos/" + f.s), txt:f.t + " " + f.sum + " " + JSON.stringify(f.body), d:f.sum}));
  W.INVISIBLE.forEach((b, i) => IDX.push({k:"Manipulación invisible", t:b.t, h:H("manipulacion-invisible/" + i), txt:b.t + " " + JSON.stringify(b.body), d:""}));
  [["influencia-etica", W.ETICA, "Influencia ética"], ["limites", W.LIMITES, "Límites"], ["autodefensa", W.AUTODEFENSA, "Autodefensa"]].forEach(([b, arr, k]) => arr.forEach(x => IDX.push({k, t:x.t, h:H(b + "/" + x.s), txt:x.t + " " + JSON.stringify(x.body), d:""})));
  INV.forEach(p => IDX.push({k:"Investigador", t:p.n, h:H("investigadores/" + p.s), txt:p.n + " " + p.a.join(" ") + " " + p.i, d:p.f}));
  W.GLOSARIO.forEach(g => IDX.push({k:"Glosario", t:g[0], h:H("glosario/" + norm(g[0]).replace(/ /g, "-")), txt:g[0] + " " + g[1], d:g[1]}));
  DEMOS.forEach(d => IDX.push({k:"Demostración", t:d.t, h:H("demostraciones/" + d.s), txt:d.t + " " + d.d, d:d.d}));
  IDX.push({k:"Ayuda", t:"Pedir ayuda", h:H("pedir-ayuda"), txt:"ayuda telefono emergencia violencia 016 144 maltrato suicidio estafa denuncia " + JSON.stringify(W.AYUDA), d:"Recursos por país"});
  IDX.forEach(x => x.n = norm(x.txt));
}
function search(q){
  if (!IDX) buildIndex(); const qn = norm(q); if (!qn) return {res:[], phrase:null};
  const words = qn.split(" ").filter(w => w.length > 1);
  let phrase = null, bestP = 0;
  TE.forEach(t => t.fr.forEach(f => { const fn = norm(f); const fw = fn.split(" ").filter(w => w.length > 2); if (!fw.length) return;
    const s = fn.includes(qn) || qn.includes(fn) ? 1 : fw.filter(w => qn.includes(w)).length / fw.length; if (s > bestP){ bestP = s; phrase = {t, f}; } }));
  if (bestP < 0.67) phrase = null;
  const res = IDX.map(x => { let s = 0; words.forEach(w => { if (norm(x.t).includes(w)) s += 3; else if (x.n.includes(w)) s += 1; }); if (norm(x.t) === qn) s += 10; return {x, s}; }).filter(r => r.s >= Math.max(1, words.length * 0.75)).sort((a, b) => b.s - a.s).slice(0, 40);
  return {res, phrase};
}
function pageBuscar(q){
  const {res, phrase} = search(q);
  return crumbs([["Inicio",""],["Buscar"]]) + `<h1>Buscar</h1><form class="row tool" id="bigsearch"><input id="bq" type="search" value="${esc(q)}" placeholder="Busca un experimento, técnica, programa o una frase que te dijeron" style="flex:1"><button class="btn">Buscar</button></form>
  ${phrase ? `<div class="answer"><p class="kicker">Frase típica reconocida</p><p>«${esc(phrase.f)}» es una frase típica de <b><a href="${H("tecnicas/" + phrase.t.s)}">${esc(phrase.t.n)}</a></b>.</p><p>${md(phrase.t.sen[0])}</p><p><b>Qué hacer:</b> ${md(phrase.t.resp[0])}</p></div>` : ""}
  ${q ? `<p class="meta">${res.length} resultados para «${esc(q)}»</p><ul class="results">${res.map(r => `<li><a href="${r.x.h}">${esc(r.x.t)}</a> <span class="tag">${esc(r.x.k)}</span><div class="meta">${esc(String(r.x.d).slice(0, 160))}</div></li>`).join("")}</ul>` : `<p class="meta">Ejemplos: <a href="${H("buscar/" + encodeURIComponent("¿Te lo estás imaginando?"))}">«¿Te lo estás imaginando?»</a> · <a href="${H("buscar/milgram")}">Milgram</a> · <a href="${H("buscar/cointelpro")}">COINTELPRO</a> · <a href="${H("buscar/" + encodeURIComponent("si me quisieras"))}">«si me quisieras»</a></p>`}`;
}

const nf = () => `<h1>Página no encontrada</h1><p>La página que buscas no existe. <a href="${H("")}">Volver al inicio</a>.</p>`;

// ---------- Navegación ----------
const NAV = [["experimentos","Experimentos"],["tecnicas","Técnicas"],["fbi-y-gobiernos","FBI y gobiernos"],["autodefensa","Autodefensa"],["curso","Curso"]];
const MENU = [["fundamentos","Fundamentos"],["experimentos","Experimentos"],["tecnicas","Técnicas"],["manipulacion-invisible","Manipulación invisible"],["fbi-y-gobiernos","FBI y gobiernos"],["influencia-etica","Qué se puede hacer"],["limites","Qué no se debe hacer"],["autodefensa","Autodefensa"],["demostraciones","Demostraciones"],["curso","Curso"],["linea-de-tiempo","Línea de tiempo"],["investigadores","Investigadores"],["glosario","Glosario"],["biblioteca","Biblioteca"],["metodologia","Metodología"],["progreso","Progreso e insignias"],["pedir-ayuda","Pedir ayuda"]];
function renderNav(top){
  document.getElementById("mainnav").innerHTML = NAV.map(n => `<a href="${H(n[0])}" class="${top === n[0] ? "on" : ""}">${n[1]}</a>`).join("");
  document.getElementById("menulist").innerHTML = MENU.map(n => `<a href="${H(n[0])}" class="${top === n[0] ? "on" : ""}">${n[1]}</a>`).join("");
  document.querySelectorAll(".bottombar a").forEach(a => a.classList.toggle("on", a.getAttribute("href") === H(top)));
}
function route(){
  if (W.__demoCleanup){ W.__demoCleanup(); W.__demoCleanup = null; }
  const raw = decodeURIComponent(location.hash.replace(/^#\/?/, "")); const [a, b, c] = raw.split("/");
  let html, anchor = null;
  switch (a || ""){
    case "": html = pageHome(); break;
    case "fundamentos": html = b ? pageFundamento(b) : pageFundamentos(); break;
    case "experimentos": html = b ? pageExperimento(b) : pageExperimentos(); break;
    case "tecnicas": html = b ? pageTecnica(b) : pageTecnicas(); break;
    case "manipulacion-invisible": html = pageInvisible(); anchor = b != null ? "sec-" + b : null; break;
    case "fbi-y-gobiernos": html = b ? pagePrograma(b) : pageFBI(); break;
    case "influencia-etica": html = pageSecciones("Negociador ético", "Qué se puede hacer: influencia y persuasión éticas", "Cómo influir sin manipular: transparencia, evidencia, escucha y respeto por la decisión del otro.", W.ETICA, "influencia-etica"); anchor = b ? "sec-" + b : null; break;
    case "limites": html = pageSecciones(null, "Qué no se debe hacer: límites éticos y legales", "Dónde está la línea, qué dice la ley y por qué manipular sale caro.", W.LIMITES, "limites"); anchor = b ? "sec-" + b : null; break;
    case "autodefensa": html = pageSecciones("Defensor", "Autodefensa: cómo protegerse y proteger a otros", "Herramientas prácticas para reconocer la manipulación a tiempo y responder.", W.AUTODEFENSA, "autodefensa", `<p><a class="btn" href="${H("pedir-ayuda")}">Pedir ayuda</a> <a class="btn ghost" href="${H("autodefensa/lista-verificacion")}">Lista de verificación</a></p>`); anchor = b ? "sec-" + b : null; break;
    case "demostraciones": html = b ? pageDemo(b) : pageDemos(); break;
    case "curso": html = !b ? pageCurso() : b === "certificado" ? pageCertificado() : c === "examen" ? pageExamen(+b) : pageLeccion(+b, (+c || 1) - 1); break;
    case "linea-de-tiempo": html = pageTimeline(); break;
    case "investigadores": html = b ? pageInvestigador(b) : pageInvestigadores(); break;
    case "glosario": html = pageGlosario(b); break;
    case "biblioteca": html = pageBiblioteca(); break;
    case "pedir-ayuda": html = pageAyuda(); break;
    case "metodologia": html = pageMetodologia(); break;
    case "progreso": html = pageProgreso(); break;
    case "buscar": html = pageBuscar(raw.slice(7)); break;
    default: html = STATIC[a] ? pageStatic(a) : nf();
  }
  app.innerHTML = html; renderNav(a || "");
  document.title = (app.querySelector("h1") ? app.querySelector("h1").textContent + " · " : "") + "Investigación sobre la Manipulación";
  document.getElementById("menu").hidden = true; document.getElementById("menubtn").setAttribute("aria-expanded", "false");
  bindPage();
  if (anchor){ const el = document.getElementById(anchor); if (el){ el.scrollIntoView(); return; } }
  window.scrollTo(0, 0); app.focus({preventScroll:true});
}
function bindPage(){
  bindQuizzes();
  app.querySelectorAll("select[data-f]").forEach(s => s.onchange = () => { F[s.dataset.f] = s.value; route(); });
  const fb = app.querySelector("#frasebox"); if (fb){ fb.oninput = () => { F.fr = fb.value; const pos = fb.selectionStart; route(); const n = app.querySelector("#frasebox"); n.focus(); n.setSelectionRange(pos, pos); }; }
  app.querySelectorAll("[data-amb]").forEach(x => x.onclick = ev => { ev.preventDefault(); F.amb = x.dataset.amb; F.g = ""; F.fr = ""; location.hash = "#/tecnicas"; });
  app.querySelectorAll("[data-secdone]").forEach(b => b.onclick = () => { P.sec[b.dataset.secdone] = true; save(); route(); });
  const cf = app.querySelector("form[data-case]"); if (cf){ const n = +location.hash.split("/")[2], l = +location.hash.split("/")[3] - 1 || 0, c = W.NIVELES[n - 1].L[l].c;
    cf.onsubmit = ev => { ev.preventDefault(); const v = cf.querySelector("input:checked"); if (!v) return; const ok = +v.value === c[2]; const fbx = cf.querySelector("#casefb"); fbx.className = "fb " + (ok ? "okc" : "bad"); fbx.innerHTML = (ok ? "Correcto. " : `La mejor respuesta es: <b>${md(c[1][c[2]])}</b>. `) + md(c[3]); }; }
  const tlf = app.querySelector("#tlf"); if (tlf) tlf.onchange = () => { TLF = tlf.value; route(); };
  app.querySelectorAll("[data-letter]").forEach(x => x.onclick = ev => { ev.preventDefault(); const d = app.querySelector(`dt[data-l="${x.dataset.letter}"]`); if (d) d.scrollIntoView(); });
  const bs = app.querySelector("#bigsearch"); if (bs) bs.onsubmit = ev => { ev.preventDefault(); location.hash = "#/buscar/" + encodeURIComponent(app.querySelector("#bq").value); };
  const rs = app.querySelector("#reset"); if (rs) rs.onclick = () => { if (confirm("¿Borrar todo tu progreso guardado en este navegador?")){ try { localStorage.removeItem(PKEY); } catch(e){} location.reload(); } };
  const cn = app.querySelector("#certname"); if (cn) cn.oninput = () => { P.name = cn.value; save(); app.querySelector("#cn").textContent = cn.value || "—"; };
  const dl = app.querySelector("#dl-check"); if (dl) dl.onclick = () => {
    const txt = "LISTA DE VERIFICACIÓN: SEÑALES DE MANIPULACIÓN\nInvestigación sobre la Manipulación (contenido educativo)\n\n" + Object.entries(W.CHECKLIST).map(([k, v]) => k.toUpperCase() + "\n" + v.map(x => "[ ] " + x).join("\n")).join("\n\n") +
      "\n\nSi marcas varias casillas de un mismo ámbito: pausa, pregunta «¿quién gana con esto?» y pide una segunda opinión.\nEmergencias: 112 (Europa) / 911 (gran parte de América). España: 016 (violencia contra las mujeres). Argentina: 144. Más recursos en la página «Pedir ayuda».\n";
    const blob = new Blob([txt], {type:"text/plain;charset=utf-8"}); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "lista-senales-manipulacion.txt"; document.body.appendChild(a); a.click(); a.remove(); };
}

// ---------- Cabecera ----------
document.getElementById("searchform").onsubmit = ev => { ev.preventDefault(); const q = document.getElementById("q").value.trim(); location.hash = "#/buscar/" + encodeURIComponent(q); };
const themeBtn = document.getElementById("theme");
const setTheme = t => { if (t) document.documentElement.setAttribute("data-theme", t); else document.documentElement.removeAttribute("data-theme"); store.set("manip-tema", t); };
setTheme(store.get("manip-tema", ""));
themeBtn.onclick = () => { const cur = document.documentElement.getAttribute("data-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); setTheme(cur === "dark" ? "light" : "dark"); };
document.getElementById("menubtn").onclick = () => { const m = document.getElementById("menu"), b = document.getElementById("menubtn"); m.hidden = !m.hidden; b.setAttribute("aria-expanded", String(!m.hidden)); };
window.addEventListener("hashchange", route);
route();
})();
