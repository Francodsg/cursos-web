// Cómo funciona un negocio: aplicación de una sola página, sin servidor.
(function(){
"use strict";
const C = window.CURSO, LECC = window.LECC || {}, BANCOS = window.BANCOS || {}, EXAMENES = window.EXAMENES || {}, CASOS = window.CASOS || [], GLOS = window.GLOSARIO || [], CALC = window.CALC || {};
const {fmt} = window.FMT;
const app = document.getElementById("app");

// ---------- Almacenamiento seguro ----------
const KEY = "negocio-v1", TKEY = "negocio-tema";
const store = {
 get(k, d){ try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch(e){ return d; } },
 set(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch(e){ return false; } },
 del(k){ try { localStorage.removeItem(k); } catch(e){} }
};
const blank = () => ({done:{}, mq:{}, quiz:{}, ex:{}, notes:{}, casos:{}, canvas:{}, org:null, proj:{}, rub:{}, name:"", last:null, days:[]});
let P = Object.assign(blank(), store.get(KEY, {}));
function save(){ store.set(KEY, P); }
function today(){ const d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
function markDay(){ const t = today(); if (!P.days.includes(t)) { P.days.push(t); if (P.days.length > 400) P.days = P.days.slice(-400); save(); } }
function streak(){ const set = new Set(P.days); let n = 0; const d = new Date(); for (;;) { const k = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); if (set.has(k)) { n++; d.setDate(d.getDate() - 1); } else break; } return n; }

// ---------- Utilidades ----------
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const norm = s => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const slug = s => norm(s).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const h = p => "#/" + p;
function inl(s){ return esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/(^|[\s(«])\*([^*\s][^*]*?)\*(?=[\s).,;:»]|$)/g, "$1<i>$2</i>"); }
function table(rows){
 const cells = r => r.trim().replace(/^\||\|$/g, "").split("|").map(x => x.trim());
 const body = rows.filter(r => !/^\|[\s:|-]+\|?$/.test(r.trim()));
 const isNum = x => /^[$\-−+]?\s?[\d.,]+\s?(%|MXN|h|min)?$/.test(x);
 const head = cells(body[0]);
 return `<div class="tablewrap"><table><thead><tr>${head.map(x => `<th>${inl(x)}</th>`).join("")}</tr></thead><tbody>${body.slice(1).map(r => `<tr>${cells(r).map(x => `<td${isNum(x) ? ' class="num"' : ""}>${inl(x)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}
function md(s){
 if (!s) return "";
 const L = String(s).replace(/\r/g, "").split("\n"); let out = "", i = 0;
 const special = /^(## |\||- |\d+\. )/;
 while (i < L.length){
  const ln = L[i];
  if (!ln.trim()) { i++; continue; }
  if (/^## /.test(ln)) { out += `<h3>${inl(ln.slice(3))}</h3>`; i++; continue; }
  if (/^\|/.test(ln)) { const rows = []; while (i < L.length && /^\|/.test(L[i])) rows.push(L[i++]); out += table(rows); continue; }
  if (/^- /.test(ln)) { const it = []; while (i < L.length && /^- /.test(L[i])) it.push(L[i++].slice(2)); out += "<ul>" + it.map(x => `<li>${inl(x)}</li>`).join("") + "</ul>"; continue; }
  if (/^\d+\. /.test(ln)) { const it = []; while (i < L.length && /^\d+\. /.test(L[i])) it.push(L[i++].replace(/^\d+\. /, "")); out += "<ol>" + it.map(x => `<li>${inl(x)}</li>`).join("") + "</ol>"; continue; }
  const para = []; while (i < L.length && L[i].trim() && !special.test(L[i])) para.push(L[i++]);
  out += `<p>${inl(para.join(" "))}</p>`;
 }
 return out;
}
const plain = s => String(s || "").replace(/[*#|]/g, " ").replace(/\s+/g, " ").trim();
const words = s => plain(s).split(" ").filter(Boolean).length;
function shuffle(a){ a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
const bar = (p, c) => `<div class="bar" role="progressbar" aria-valuenow="${Math.round(p)}" aria-valuemin="0" aria-valuemax="100"${c ? ` style="--c:${c}"` : ""}><i style="width:${Math.max(0, Math.min(100, p))}%"></i></div>`;
const hm = min => { const H = Math.floor(min / 60), M = Math.round(min % 60); return H ? H + " h" + (M ? " " + M + " min" : "") : M + " min"; };

// ---------- Modelo ----------
const MODS = C.modulos;
const modById = id => MODS.find(m => m.id === id);
const lid = (m, i) => m.id + "-" + (i + 1);
const modMin = m => m.L.reduce((s, l) => s + l[2], 0) + (m.proyecto ? 0 : 90);
const levelMin = n => MODS.filter(m => m.n === n).reduce((s, m) => s + modMin(m), 0) + C.examenMin;
const totalMin = () => C.niveles.reduce((s, l) => s + levelMin(l.n), 0) + C.finalMin;
const allLessons = () => MODS.flatMap(m => m.L.map((l, i) => ({m, i, id: lid(m, i), t: l[0], d: l[1], min: l[2], star: !!l[3]})));
const hasQuiz = m => !m.proyecto;
const modDone = m => m.L.filter((l, i) => P.done[lid(m, i)]).length;
const modComplete = m => modDone(m) === m.L.length && (!hasQuiz(m) || (P.quiz[m.id] || 0) >= 70);
const lvMods = n => MODS.filter(m => m.n === n);
const lvColor = n => `var(--l${n})`;
const pct = (a, b) => b ? a / b * 100 : 0;
const totalL = () => MODS.reduce((s, m) => s + m.L.length, 0);
const doneL = () => Object.keys(P.done).filter(k => P.done[k]).length;
function normQ(q){ if (Array.isArray(q)) return {t:q[0], o:q[1], a:q[2], e:q[3]}; return q; }

// ---------- Quizzes ----------
let QZ = {};
function quizHTML(qs, id, opt){
 opt = opt || {};
 QZ[id] = {qs: qs.map(normQ), cb: opt.cb};
 return `<form class="quiz" data-quiz="${id}">${QZ[id].qs.map((q, k) => `<fieldset class="q" data-k="${k}"><p>${k + 1}. ${inl(q.t)}</p>${
  q.n ? `<label>Respuesta: <input type="number" step="any" name="q${k}" inputmode="decimal"> ${esc(q.u || "")}</label>`
      : q.o.map((o, j) => `<label><input type="radio" name="q${k}" value="${j}"> <span>${inl(o)}</span></label>`).join("")
 }<div class="fb" hidden></div></fieldset>`).join("")}<div class="row"><button class="btn" type="submit">Revisar respuestas</button><span class="score" aria-live="polite"></span></div></form>`;
}
function bindQuizzes(){
 app.querySelectorAll("form[data-quiz]").forEach(f => f.addEventListener("submit", ev => {
  ev.preventDefault(); const Z = QZ[f.dataset.quiz]; let ok = 0;
  Z.qs.forEach((q, k) => {
   const fs = f.querySelector(`[data-k="${k}"]`), fb = fs.querySelector(".fb"); let good = false, ans = "";
   if (q.n) { const v = parseFloat(String((fs.querySelector("input").value || "")).replace(",", ".")); const tol = q.tol == null ? 0.01 : q.tol; good = isFinite(v) && Math.abs(v - q.a) <= Math.abs(q.a) * tol + 1e-9; ans = fmt(q.a, Number.isInteger(q.a) ? 0 : 2) + " " + (q.u || ""); }
   else { const s = fs.querySelector("input:checked"); good = !!s && +s.value === q.a; ans = q.o[q.a]; }
   if (good) ok++;
   fb.hidden = false; fb.className = "fb " + (good ? "ok" : "no");
   fb.innerHTML = (good ? "<b>Correcto.</b> " : "<b>Incorrecto.</b> Respuesta correcta: " + inl(ans) + ". ") + inl(q.e || "");
  });
  const sc = Math.round(ok / Z.qs.length * 100);
  f.querySelector(".score").textContent = `${ok} de ${Z.qs.length} (${sc} %)`;
  if (Z.cb) Z.cb(sc, f);
 }));
}

// ---------- Insignias ----------
const BADGES = [
 {id:"primera", ico:"👣", t:"Primer paso", d:"Completa tu primera lección.", ok:() => doneL() >= 1},
 {id:"primer-peso", ico:"💵", t:"Primer peso", d:"Completa el módulo M5 (cómo fluye el dinero).", ok:() => modComplete(modById("M5"))},
 {id:"organigrama", ico:"🗂️", t:"Organigrama", d:"Completa el módulo M6 (estructura).", ok:() => modComplete(modById("M6"))},
 {id:"numeros", ico:"📊", t:"Dueño de los números", d:"Completa el módulo M8 (finanzas).", ok:() => modComplete(modById("M8"))},
 {id:"cuellos", ico:"⏱️", t:"Cazador de cuellos de botella", d:"Completa el módulo M9 (operaciones).", ok:() => modComplete(modById("M9"))},
 {id:"negociador", ico:"🤝", t:"Negociador", d:"Completa el módulo M10 (proveedores).", ok:() => modComplete(modById("M10"))},
 {id:"franquiciante", ico:"🍔", t:"Franquiciante", d:"Completa el módulo M21 (franquicias).", ok:() => modComplete(modById("M21"))},
 {id:"consejero", ico:"🏛", t:"Consejero", d:"Completa el módulo M24 (gobierno corporativo).", ok:() => modComplete(modById("M24"))},
 {id:"radiologo", ico:"🔬", t:"Radiólogo de empresas", d:"Completa el módulo M28 (radiografías).", ok:() => modComplete(modById("M28"))},
 {id:"nivel1", ico:"🥉", t:"Nivel 1 aprobado", d:"Aprueba el examen del Nivel 1.", ok:() => (P.ex[1] || 0) >= 70},
 {id:"nivel2", ico:"🥈", t:"Nivel 2 aprobado", d:"Aprueba el examen del Nivel 2.", ok:() => (P.ex[2] || 0) >= 70},
 {id:"nivel3", ico:"🥇", t:"Nivel 3 aprobado", d:"Aprueba el examen del Nivel 3.", ok:() => (P.ex[3] || 0) >= 70},
 {id:"nivel4", ico:"🏆", t:"Nivel 4 aprobado", d:"Aprueba el examen del Nivel 4.", ok:() => (P.ex[4] || 0) >= 70},
 {id:"racha7", ico:"🔥", t:"Racha de 7 días", d:"Estudia 7 días seguidos.", ok:() => streak() >= 7},
 {id:"director", ico:"🎓", t:"Director general", d:"Obtén el certificado del curso.", ok:() => certReqs().every(r => r[1])}
];
function badgeGrid(){ return `<div class="grid small">${BADGES.map(b => { const on = b.ok(); return `<div class="card badge${on ? " on" : ""}"><div class="ico" aria-hidden="true">${b.ico}</div><b>${esc(b.t)}</b><p class="meta">${esc(b.d)}</p><p class="meta">${on ? "✓ Obtenida" : "Pendiente"}</p></div>`; }).join("")}</div>`; }
function certReqs(){
 const rq = [];
 rq.push(["Completar las " + totalL() + " lecciones", doneL() >= totalL()]);
 rq.push(["Aprobar los " + MODS.filter(hasQuiz).length + " quizzes de módulo (70 % o más)", MODS.filter(hasQuiz).every(m => (P.quiz[m.id] || 0) >= 70)]);
 C.niveles.forEach(l => rq.push(["Aprobar el examen del Nivel " + l.n, (P.ex[l.n] || 0) >= 70]));
 rq.push(["Aprobar la evaluación final", (P.ex.final || 0) >= 70]);
 rq.push(["Proyecto final con autoevaluación de 70 % o más", rubScore() >= 70]);
 return rq;
}

// ---------- Navegación ----------
const NAV = [["curso","Curso"],["casos","Casos"],["herramientas","Calculadoras"],["glosario","Glosario"],["mi-progreso","Mi progreso"]];
const MENU = [["","Inicio"],["curso","Mapa del curso"]].concat(C.niveles.map(l => ["nivel/" + l.n, "Nivel " + l.n + ": " + l.t.split(":")[0]]), [["casos","Casos"],["herramientas","Calculadoras"],["herramientas/lienzo","Lienzo de modelo de negocio"],["herramientas/organigrama","Constructor de organigramas"],["glosario","Glosario"],["proyecto","Proyecto final"],["examen-final","Evaluación final"],["mi-progreso","Mi progreso"],["certificado","Certificado"],["acerca","Acerca del curso"],["aviso-legal","Aviso legal"]]);
function renderNav(path){
 const top = path.split("/")[0];
 document.getElementById("mainnav").innerHTML = NAV.map(([p, t]) => `<a href="${h(p)}"${top === p.split("/")[0] ? ' class="on" aria-current="page"' : ""}>${t}</a>`).join("");
 document.getElementById("menulist").innerHTML = MENU.map(([p, t]) => `<a href="${h(p)}">${esc(t)}</a>`).join("");
}
const crumbs = items => `<nav class="crumbs" aria-label="Ruta">${items.map(([u, t], i) => i < items.length - 1 ? `<a href="${h(u)}">${esc(t)}</a> › ` : esc(t)).join("")}</nav>`;

// ---------- Páginas ----------
function pageHome(){
 const last = P.last && LECC[P.last] !== undefined ? P.last : null;
 const lm = last ? modById(last.split("-")[0]) : null;
 return `<section class="hero"><p class="kicker">Curso completo en español · ${C.niveles.length} niveles · ${MODS.length} módulos · ${totalL()} lecciones · ≈ ${Math.round(totalMin() / 60)} horas</p>
 <h1>${esc(C.titulo)}</h1><p class="sub">${esc(C.subtitulo)}</p>
 <p class="lead prose">Aprende cómo se organiza y cómo funciona por dentro un negocio: de dónde sale el dinero y a dónde va, quién decide, qué hace cada área, cómo se consigue a los clientes y a los proveedores, y cómo un changarro puede convertirse en una empresa gigante.</p>
 <div class="row">${last ? `<a class="btn" href="${h("m/" + lm.id + "/" + last.split("-")[1])}">Continuar: ${esc(lm.L[+last.split("-")[1] - 1][0])} →</a>` : `<a class="btn" href="${h("m/M1/1")}">Empezar el curso →</a>`}<a class="btn ghost" href="${h("curso")}">Ver el mapa del curso</a></div>
 <div class="panel"><b>Tu progreso:</b> ${doneL()} de ${totalL()} lecciones (${Math.round(pct(doneL(), totalL()))} %) · racha de ${streak()} día(s)${bar(pct(doneL(), totalL()))}</div></section>
 <h2>Los cuatro niveles</h2><div class="grid">${C.niveles.map(l => levelCard(l)).join("")}</div>
 <h2>La historia que nos acompaña: Tortas Lupita</h2>
 <div class="box sit prose"><p><b>Tortas Lupita es un negocio ficticio</b> que crece contigo a lo largo del curso.</p><ul><li><b>Nivel 1:</b> un puesto de tortas en la calle; Lupita y su hijo Toño lo hacen todo.</li><li><b>Nivel 2:</b> un local formal con 6 empleados, organigrama, nómina, proveedores y sistema de punto de venta.</li><li><b>Nivel 3:</b> tres sucursales, cocina central, crédito bancario y, después, franquicias.</li><li><b>Nivel 4:</b> «Grupo Lupita», un grupo con varias marcas, consejo de administración y una hipotética salida a bolsa.</li></ul></div>
 <h2>Además del curso</h2><div class="grid">
 <a class="card" href="${h("herramientas")}"><h3>🧮 Calculadoras</h3><p class="meta">${Object.keys(CALC).length} calculadoras, el lienzo de modelo de negocio y un constructor de organigramas.</p></a>
 <a class="card" href="${h("casos")}"><h3>📁 Casos</h3><p class="meta">${CASOS.length} casos con dilema, preguntas y respuesta modelo.</p></a>
 <a class="card" href="${h("glosario")}"><h3>📖 Glosario</h3><p class="meta">${GLOS.length} términos explicados en lenguaje sencillo.</p></a>
 <a class="card" href="${h("mi-progreso")}"><h3>🏅 Insignias y certificado</h3><p class="meta">${BADGES.length} insignias y un certificado imprimible.</p></a></div>`;
}
function levelCard(l){
 const ms = lvMods(l.n), nl = ms.reduce((s, m) => s + m.L.length, 0), dn = ms.reduce((s, m) => s + modDone(m), 0);
 return `<a class="card lv${l.n}" href="${h("nivel/" + l.n)}"><p class="kicker">Nivel ${l.n}</p><h3>${esc(l.t)}</h3><p class="meta">${ms.length} módulos · ${nl} lecciones · ${hm(levelMin(l.n))}</p>${bar(pct(dn, nl), lvColor(l.n))}<p class="meta">${dn} de ${nl} lecciones${(P.ex[l.n] || 0) >= 70 ? " · ✓ examen aprobado" : ""}</p></a>`;
}
function modCard(m){
 return `<a class="card lv${m.n}" href="${h("m/" + m.id)}"><p class="kicker">${m.ico} ${m.id} · Nivel ${m.n}</p><h3>${esc(m.t)}</h3><p class="meta">${m.L.length} lecciones · ${hm(modMin(m))}${hasQuiz(m) && (P.quiz[m.id] || 0) >= 70 ? " · ✓ quiz" : ""}</p>${bar(pct(modDone(m), m.L.length), lvColor(m.n))}</a>`;
}
function pageCourse(){
 return `${crumbs([["","Inicio"],["","Mapa del curso"]])}<h1>Mapa del curso</h1>
 <p class="lead">${C.niveles.length} niveles · ${MODS.length} módulos · ${totalL()} lecciones · ≈ ${Math.round(totalMin() / 60)} horas (incluye actividades, quizzes, exámenes de nivel y evaluación final). Las lecciones esenciales (★) forman la ruta exprés.</p>
 <div class="panel"><b>Cómo avanzar:</b> lee cada lección, responde su mini-quiz (se marca como completada con 3 de 4 aciertos o con el botón) y al final del módulo haz el quiz de 10 preguntas (se aprueba con 70 %). Nada se bloquea: puedes ir en el orden que quieras.</div>
 ${C.niveles.map(l => `<section class="levelhead lv${l.n}"><h2>Nivel ${l.n}. ${esc(l.t)}</h2><p class="meta">${hm(levelMin(l.n))} · <a href="${h("examen/nivel-" + l.n)}">Examen del Nivel ${l.n}</a></p></section><div class="grid">${lvMods(l.n).map(modCard).join("")}</div>`).join("")}
 <h2>Evaluación final</h2><div class="grid"><a class="card" href="${h("examen-final")}"><h3>🎯 Evaluación final</h3><p class="meta">40 preguntas + 2 problemas + 1 caso · ${hm(C.finalMin)}</p></a><a class="card" href="${h("proyecto")}"><h3>🧾 Proyecto final</h3><p class="meta">Radiografía de un negocio real</p></a><a class="card" href="${h("certificado")}"><h3>🎓 Certificado</h3><p class="meta">Requisitos y certificado imprimible</p></a></div>`;
}
function pageLevel(n){
 const l = C.niveles.find(x => x.n === n); if (!l) return notFound();
 return `${crumbs([["","Inicio"],["curso","Curso"],["","Nivel " + n]])}<div class="levelhead lv${n}"><p class="kicker">Nivel ${n}</p><h1>${esc(l.t)}</h1></div>
 <p class="meta">${lvMods(n).length} módulos · ${lvMods(n).reduce((s, m) => s + m.L.length, 0)} lecciones · ${hm(levelMin(n))} (incluye el examen de nivel)</p>
 <h2>Al terminar este nivel podrás…</h2><ul class="prose">${l.obj.map(o => `<li>${esc(o)}</li>`).join("")}</ul>
 <h2>Módulos</h2><div class="grid">${lvMods(n).map(modCard).join("")}</div>
 <h2>Examen del Nivel ${n}</h2><div class="panel"><p>25 preguntas + problemas numéricos o un minicaso · ${hm(C.examenMin)} · se aprueba con 70 %. ${P.ex[n] != null ? "Mejor resultado: <b>" + P.ex[n] + " %</b>." : ""}</p><a class="btn" href="${h("examen/nivel-" + n)}">Presentar el examen</a></div>
 <div class="row">${n > 1 ? `<a class="btn ghost" href="${h("nivel/" + (n - 1))}">← Nivel ${n - 1}</a>` : ""}${n < 4 ? `<a class="btn ghost" href="${h("nivel/" + (n + 1))}">Nivel ${n + 1} →</a>` : ""}</div>`;
}
function lessonList(m, cur){
 return `<ol class="lessonlist">${m.L.map((l, i) => { const id = lid(m, i), d = P.done[id]; return `<li><span class="n">${i + 1}${l[3] ? "★" : ""}</span><span class="d"><a href="${h("m/" + m.id + "/" + (i + 1))}"${cur === i ? ' aria-current="page"' : ""}>${esc(l[0])}</a><small>${esc(l[1])} · ${l[2]} min${P.mq[id] != null ? " · mini-quiz " + P.mq[id] + " %" : ""}</small></span>${d ? '<span class="chk" title="Completada">✓</span>' : ""}</li>`; }).join("")}</ol>`;
}
function pageModule(id){
 const m = modById(id); if (!m) return notFound();
 const lv = C.niveles.find(l => l.n === m.n), caso = CASOS.find(c => c.id === m.caso);
 const lmin = m.L.reduce((s, l) => s + l[2], 0);
 return `${crumbs([["","Inicio"],["curso","Curso"],["nivel/" + m.n, "Nivel " + m.n],["", m.id]])}
 <div class="levelhead lv${m.n}"><p class="kicker">${m.ico} Módulo ${m.id} · Nivel ${m.n}: ${esc(lv.t)}</p><h1>${esc(m.t)}</h1></div>
 <p class="meta">${m.L.length} lecciones · lecciones ${hm(lmin)}${m.proyecto ? "" : " + actividades 1 h + quiz 30 min"} · total ${hm(modMin(m))}</p>
 ${bar(pct(modDone(m), m.L.length), lvColor(m.n))}<p class="meta">${modDone(m)} de ${m.L.length} lecciones completadas${hasQuiz(m) && P.quiz[m.id] != null ? " · mejor quiz: " + P.quiz[m.id] + " %" : ""}</p>
 <div class="box key prose"><h3>Objetivo del módulo</h3><p>${esc(m.obj)}</p></div>
 ${m.legal ? `<div class="box warn prose"><p><b>Aviso:</b> este módulo trata temas legales, fiscales o financieros con fines educativos. Las reglas cambian y dependen del país: consulta la norma vigente y a un profesional antes de decidir.</p></div>` : ""}
 <h2>Lecciones</h2>${lessonList(m)}
 ${m.act.length ? `<h2>Actividades prácticas</h2><ul class="prose">${m.act.map(x => `<li>${inl(x)}</li>`).join("")}</ul>` : ""}
 ${m.ej.length ? `<h2>Ejercicios</h2><ul class="prose">${m.ej.map(x => `<li>${inl(x)}</li>`).join("")}</ul>` : ""}
 ${m.ejr.length ? `<h2>Ejemplos reales</h2><ul class="prose">${m.ejr.map(x => `<li>${inl(x)}</li>`).join("")}</ul>` : ""}
 ${m.tools ? `<h2>Calculadoras del módulo</h2><div class="grid small">${m.tools.map(t => toolCardSmall(t)).join("")}</div>` : ""}
 ${caso ? `<h2>Caso del módulo</h2><a class="card lv${m.n}" href="${h("casos/" + caso.id)}"><p class="kicker">${caso.tipo === "real" ? "Caso real" : "Caso ficticio"}</p><h3>${esc(caso.t)}</h3><p class="meta">${esc(caso.dil)}</p></a>` : ""}
 ${hasQuiz(m) ? `<h2>Quiz del módulo</h2><div class="panel"><p>10 preguntas al azar de un banco de ${(BANCOS[m.id] || []).length} · se aprueba con 70 % · intentos ilimitados (cada intento trae preguntas distintas).</p><a class="btn" href="${h("m/" + m.id + "/quiz")}">Hacer el quiz</a></div>` : `<h2>Proyecto</h2><div class="panel"><p>Este módulo se trabaja en la página del proyecto final, donde se guarda tu avance y te autoevalúas con la rúbrica.</p><a class="btn" href="${h("proyecto")}">Abrir el proyecto final</a></div>`}
 ${modNav(m)}`;
}
function modNav(m){ const i = MODS.indexOf(m); return `<div class="row">${i > 0 ? `<a class="btn ghost" href="${h("m/" + MODS[i - 1].id)}">← ${MODS[i - 1].id}</a>` : ""}${i < MODS.length - 1 ? `<a class="btn ghost" href="${h("m/" + MODS[i + 1].id)}">${MODS[i + 1].id} →</a>` : ""}</div>`; }
function toolCardSmall(t){ const T = CALC[t] || {organigrama:{t:"Constructor de organigramas"}, lienzo:{t:"Lienzo de modelo de negocio"}}[t]; return T ? `<a class="card" href="${h("herramientas/" + t)}"><b>🧮 ${esc(T.t)}</b></a>` : ""; }
function glossLink(term){ const g = GLOS.find(x => slug(x[0]) === slug(term) || norm(x[0]) === norm(term)); return g ? `<a class="tag" href="${h("glosario/" + slug(g[0]))}">${esc(g[0])}</a>` : `<span class="tag">${esc(term)}</span>`; }

function pageLesson(mid, n){
 const m = modById(mid); if (!m || !(n >= 1 && n <= m.L.length)) return notFound();
 const i = n - 1, id = lid(m, i), L = m.L[i], X = LECC[id];
 P.last = id; markDay(); save();
 const side = `<aside class="side panel noprint" aria-label="Lecciones del módulo"><b>${m.ico} ${m.id}. ${esc(m.t)}</b><ol>${m.L.map((l, k) => `<li class="${P.done[lid(m, k)] ? "done" : ""}"><a href="${h("m/" + m.id + "/" + (k + 1))}"${k === i ? ' class="on" aria-current="page"' : ""}>${esc(l[0])}${P.done[lid(m, k)] ? " ✓" : ""}</a></li>`).join("")}</ol>${hasQuiz(m) ? `<a href="${h("m/" + m.id + "/quiz")}">Quiz del módulo</a>` : `<a href="${h("proyecto")}">Proyecto final</a>`}</aside>`;
 let body;
 if (!X) body = `<div class="box warn"><p>El texto de esta lección no está disponible.</p></div>`;
 else body = `
 <div class="box sit"><h3>Situación inicial</h3>${md(X.s)}</div>
 <h2>Objetivos</h2><ul>${X.o.map(o => `<li>${inl(o)}</li>`).join("")}</ul>
 <h2>Explicación</h2>${md(X.x)}
 <div class="box key"><h3>Concepto clave</h3>${md(X.k)}</div>
 <div class="box"><h3>Del changarro al gigante</h3><div class="duo"><div><b>🏪 En un negocio chico</b>${md(X.ch)}</div><div><b>🏢 En una empresa gigante</b>${md(X.gi)}</div></div></div>
 <h2>Ejemplo resuelto con Tortas Lupita</h2>${md(X.e)}
 ${X.hr ? calcEmbed(X.hr) : ""}
 <h2>Empresa real</h2>${md(X.r)}${X.f ? `<p class="meta">Fuente: ${inl(X.f)}</p>` : ""}
 <div class="box warn"><h3>Errores frecuentes</h3><ul>${X.err.map(e => `<li>${inl(e)}</li>`).join("")}</ul></div>
 <h2>Actividad práctica</h2>${md(X.a)}${X.sol ? `<details class="panel"><summary><b>Ver solución o pauta de autoevaluación</b></summary>${md(X.sol)}</details>` : ""}
 <h2>Mini-quiz</h2><p class="meta">4 preguntas. Con 3 aciertos o más la lección queda completada.${P.mq[id] != null ? " Tu mejor resultado: " + P.mq[id] + " %." : ""}</p>${quizHTML(X.q.map(q => shuffleOpts(normQ(q))), "mq-" + id, {cb: sc => { P.mq[id] = Math.max(P.mq[id] || 0, sc); if (sc >= 75) P.done[id] = true; save(); updDone(); }})}
 ${X.t && X.t.length ? `<h2>Términos del glosario</h2><div class="tags">${X.t.map(glossLink).join("")}</div>` : ""}`;
 return `${crumbs([["","Inicio"],["curso","Curso"],["nivel/" + m.n, "Nivel " + m.n],["m/" + m.id, m.id],["","Lección " + n]])}
 <div class="layout">${side}<article class="prose">
 <p class="kicker">${m.id} · Lección ${n} de ${m.L.length}${L[3] ? " · ★ esencial" : ""} · ${L[2]} min</p><h1>${esc(L[0])}</h1><p class="lead">${esc(L[1])}</p>
 ${m.legal ? `<p class="notice">Contenido educativo: no es asesoría legal, fiscal ni financiera.</p>` : ""}
 ${body}
 <h2>Mis notas</h2><textarea id="notes" aria-label="Mis notas de esta lección" placeholder="Escribe aquí tus notas; se guardan en este navegador.">${esc(P.notes[id] || "")}</textarea>
 <div class="row noprint"><button class="btn${P.done[id] ? " ghost" : ""}" id="donebtn" type="button">${P.done[id] ? "✓ Completada (desmarcar)" : "Marcar como completada"}</button><button class="btn ghost" type="button" onclick="window.print()">Imprimir</button></div>
 <div class="row noprint">${i > 0 ? `<a class="btn ghost" href="${h("m/" + m.id + "/" + (n - 1))}">← Anterior</a>` : `<a class="btn ghost" href="${h("m/" + m.id)}">← Módulo</a>`}
 ${i < m.L.length - 1 ? `<a class="btn" href="${h("m/" + m.id + "/" + (n + 1))}">Siguiente lección →</a>` : hasQuiz(m) ? `<a class="btn" href="${h("m/" + m.id + "/quiz")}">Quiz del módulo →</a>` : `<a class="btn" href="${h("proyecto")}">Proyecto final →</a>`}</div>
 </article></div>`;
}
function updDone(){ const b = document.getElementById("donebtn"); if (!b) return; const id = P.last; b.textContent = P.done[id] ? "✓ Completada (desmarcar)" : "Marcar como completada"; b.className = "btn" + (P.done[id] ? " ghost" : ""); }

function pageQuiz(mid){
 const m = modById(mid); if (!m || !hasQuiz(m)) return notFound();
 const bank = BANCOS[m.id] || []; const qs = shuffle(bank).slice(0, 10).map(q => shuffleOpts(normQ(q)));
 return `${crumbs([["","Inicio"],["curso","Curso"],["m/" + m.id, m.id],["","Quiz"]])}<h1>Quiz del módulo ${m.id}</h1><p class="lead">${esc(m.t)}</p>
 <p class="meta">10 preguntas al azar de un banco de ${bank.length}. Se aprueba con 70 %. ${P.quiz[m.id] != null ? "Mejor resultado: " + P.quiz[m.id] + " %." : ""}</p>
 <div class="prose">${quizHTML(qs, "quiz-" + m.id, {cb: sc => { P.quiz[m.id] = Math.max(P.quiz[m.id] || 0, sc); save(); }})}</div>
 <div class="row"><button class="btn ghost" type="button" id="retry">Nuevo intento con otras preguntas</button><a class="btn ghost" href="${h("m/" + m.id)}">Volver al módulo</a></div>`;
}
function shuffleOpts(q){ if (q.n || !q.o) return q; const idx = shuffle(q.o.map((_, i) => i)); return {t:q.t, o:idx.map(i => q.o[i]), a:idx.indexOf(q.a), e:q.e}; }
function examQs(n){
 const banks = lvMods(n).filter(hasQuiz).map(m => shuffle(BANCOS[m.id] || []));
 const E = EXAMENES[n] || {extra:[], prob:[]}; const picked = [];
 let k = 0; while (picked.length < 15 && banks.some(b => b.length)) { const b = banks[k++ % banks.length]; if (b.length) picked.push(b.pop()); }
 return shuffle(picked.concat(E.extra || []).map(normQ)).slice(0, 25).map(shuffleOpts).concat((E.prob || []).map(normQ).map(shuffleOpts));
}
function pageExam(n){
 const l = C.niveles.find(x => x.n === n); if (!l) return notFound();
 const qs = examQs(n);
 return `${crumbs([["","Inicio"],["curso","Curso"],["nivel/" + n, "Nivel " + n],["","Examen"]])}<h1>Examen del Nivel ${n}</h1><p class="lead">${esc(l.t)}</p>
 <p class="meta">${qs.length} preguntas (25 de opción múltiple + problemas o minicaso) · tiempo sugerido ${hm(C.examenMin)} · se aprueba con 70 %. ${P.ex[n] != null ? "Mejor resultado: " + P.ex[n] + " %." : ""}</p>
 <div class="prose">${quizHTML(qs, "ex-" + n, {cb: sc => { P.ex[n] = Math.max(P.ex[n] || 0, sc); save(); }})}</div><div class="row"><a class="btn ghost" href="${h("nivel/" + n)}">Volver al nivel</a></div>`;
}
function pageFinal(){
 const F = EXAMENES.final || {extra:[], prob:[]};
 let qs = [];
 C.niveles.forEach(l => { const pool = shuffle(lvMods(l.n).filter(hasQuiz).flatMap(m => BANCOS[m.id] || []).concat((EXAMENES[l.n] || {}).extra || [])); qs = qs.concat(pool.slice(0, 10)); });
 qs = shuffle(qs.map(normQ)).map(shuffleOpts).concat((F.prob || []).map(normQ).map(shuffleOpts));
 return `${crumbs([["","Inicio"],["curso","Curso"],["","Evaluación final"]])}<h1>Evaluación final</h1>
 <p class="meta">${qs.length} preguntas: 40 de todo el curso (10 por nivel) + 2 problemas numéricos + 1 caso integrador · tiempo sugerido ${hm(C.finalMin)} · se aprueba con 70 %. ${P.ex.final != null ? "Mejor resultado: " + P.ex.final + " %." : ""}</p>
 <div class="prose">${quizHTML(qs, "final", {cb: sc => { P.ex.final = Math.max(P.ex.final || 0, sc); save(); }})}</div>`;
}

// ---------- Casos ----------
function pageCasos(){
 const f = new URLSearchParams(location.hash.split("?")[1] || ""); const lv = f.get("nivel") || "", tp = f.get("tipo") || "";
 const list = CASOS.filter(c => (!lv || String(modById(c.mod).n) === lv) && (!tp || c.tipo === tp));
 return `${crumbs([["","Inicio"],["","Casos"]])}<h1>Casos</h1><p class="lead">Cada caso tiene contexto, un dilema, datos, preguntas de análisis y una respuesta modelo. Los casos reales usan solo información pública; los ficticios están marcados.</p>
 <div class="row"><label>Nivel <select id="fnivel"><option value="">Todos</option>${C.niveles.map(l => `<option value="${l.n}"${lv == l.n ? " selected" : ""}>Nivel ${l.n}</option>`).join("")}</select></label>
 <label>Tipo <select id="ftipo"><option value="">Todos</option><option value="real"${tp === "real" ? " selected" : ""}>Reales</option><option value="ficticio"${tp === "ficticio" ? " selected" : ""}>Ficticios</option></select></label><span class="meta">${list.length} casos</span></div>
 <div class="grid">${list.map(c => { const m = modById(c.mod); return `<a class="card lv${m.n}" href="${h("casos/" + c.id)}"><p class="kicker">${c.tipo === "real" ? "Real" : "Ficticio"} · ${m.id}${P.casos[c.id] ? " · ✓ respondido" : ""}</p><h3>${esc(c.t)}</h3><p class="meta">${esc(c.dil)}</p></a>`; }).join("")}</div>`;
}
function pageCaso(id){
 const c = CASOS.find(x => x.id === id); if (!c) return notFound(); const m = modById(c.mod); const ans = P.casos[c.id] || {};
 return `${crumbs([["","Inicio"],["casos","Casos"],["", c.t]])}<article class="prose"><p class="kicker">${c.tipo === "real" ? "Caso real" : "Caso ficticio"} · Módulo <a href="${h("m/" + m.id)}">${m.id}</a>${c.les ? ` · Lección <a href="${h("m/" + c.les.replace("-", "/"))}">${c.les}</a>` : ""}</p><h1>${esc(c.t)}</h1>
 <h2>Contexto</h2>${md(c.ctx)}<div class="box sit"><h3>El dilema</h3>${md(c.dil)}</div>
 ${c.datos ? `<h2>Datos</h2>${md(c.datos)}` : ""}
 <h2>Preguntas de análisis</h2>${c.preg.map((p, k) => `<div class="field"><label for="cp${k}">${k + 1}. ${inl(p)}</label><textarea id="cp${k}" data-caso="${c.id}" data-k="${k}">${esc(ans[k] || "")}</textarea></div>`).join("")}
 <details class="panel"><summary><b>${c.tipo === "real" ? "Qué ocurrió realmente y respuesta modelo" : "Respuesta modelo"}</b></summary>${md(c.resp)}</details>
 <div class="box good"><h3>Lecciones para el negocio</h3><ul>${c.lec.map(x => `<li>${inl(x)}</li>`).join("")}</ul></div>
 ${c.fuentes ? `<p class="meta">Fuentes: ${inl(c.fuentes)}</p>` : ""}</article>`;
}

// ---------- Herramientas ----------
const SPECIAL = {lienzo:{t:"Lienzo de modelo de negocio", mod:"M4", d:"Los 9 bloques de cualquier modelo de negocio. Se guarda en este navegador."}, organigrama:{t:"Constructor de organigramas", mod:"M6", d:"Arma el organigrama de un negocio: agrega puestos y a quién reportan."}};
function pageTools(){
 const all = Object.entries(CALC).concat(Object.entries(SPECIAL));
 return `${crumbs([["","Inicio"],["","Calculadoras"]])}<h1>Calculadoras y herramientas</h1><p class="lead">Escribe tus propios números; el resultado y su interpretación se actualizan al momento. Vienen precargadas con datos de Tortas Lupita.</p>
 <div class="grid">${all.map(([k, T]) => { const m = modById(T.mod); return `<a class="card lv${m.n}" href="${h("herramientas/" + k)}"><p class="kicker">${m.id}</p><h3>${esc(T.t)}</h3><p class="meta">${esc(T.d)}</p></a>`; }).join("")}</div>`;
}
function calcForm(k, pre){
 const T = CALC[k]; const saved = store.get("negocio-calc-" + k, null) || {};
 return `<form class="panel calc" data-calc="${k}" id="${pre}${k}" onsubmit="return false"><div class="fields">${T.f.map(([key, lab, def, u]) => `<div class="field"${(T.text || []).includes(key) ? ' style="grid-column:1/-1"' : ""}><label for="${pre}${k}-${key}">${esc(lab)}${u ? " (" + esc(u) + ")" : ""}</label><input id="${pre}${k}-${key}" name="${key}" ${(T.text || []).includes(key) ? 'type="text"' : 'type="number" step="any" inputmode="decimal"'} value="${esc(saved[key] != null ? saved[key] : def)}"></div>`).join("")}</div>
 <div class="result" aria-live="polite"></div><div class="row"><button type="button" class="btn ghost small" data-reset="${k}">Volver a los datos de ejemplo</button></div></form>`;
}
function calcEmbed(k){ const T = CALC[k]; if (!T) return ""; return `<div class="box"><h3>🧮 Prueba la calculadora: ${esc(T.t)}</h3>${calcForm(k, "e-")}<p class="meta"><a href="${h("herramientas/" + k)}">Abrir en su propia página</a></p></div>`; }
function runCalc(f){
 const k = f.dataset.calc, T = CALC[k], v = {}, raw = {};
 T.f.forEach(([key]) => { const el = f.querySelector(`[name="${key}"]`); raw[key] = el.value; v[key] = (T.text || []).includes(key) ? el.value : parseFloat(String(el.value).replace(",", ".")); });
 const box = f.querySelector(".result");
 const bad = T.f.find(([key]) => !(T.text || []).includes(key) && !isFinite(v[key]));
 if (bad) { box.innerHTML = `<p><b>Revisa el campo «${esc(bad[1])}»:</b> escribe un número.</p>`; return; }
 if (T.f.some(([key]) => !(T.text || []).includes(key) && v[key] < 0)) { box.innerHTML = `<p><b>Revisa los datos:</b> no uses números negativos.</p>`; return; }
 store.set("negocio-calc-" + k, raw);
 let R; try { R = T.calc(v); } catch(e) { R = {err:"No se pudo calcular con esos datos."}; }
 if (R.err) { box.innerHTML = `<p><b>${esc(R.err)}</b></p>`; return; }
 box.innerHTML = `<p class="big">${esc(R.big)}</p><div class="tablewrap"><table><tbody>${R.r.map(([a, b]) => `<tr><th scope="row">${esc(a)}</th><td class="num">${esc(b)}</td></tr>`).join("")}</tbody></table></div><p>${esc(R.txt)}</p>`;
}
function pageTool(k){
 if (k === "lienzo") return pageCanvas(); if (k === "organigrama") return pageOrg();
 const T = CALC[k]; if (!T) return notFound(); const m = modById(T.mod);
 return `${crumbs([["","Inicio"],["herramientas","Calculadoras"],["", T.t]])}<h1>${esc(T.t)}</h1><p class="lead">${esc(T.d)}</p>${calcForm(k, "t-")}<p class="meta">Se explica en el módulo <a href="${h("m/" + m.id)}">${m.id}. ${esc(m.t)}</a>. Herramienta educativa: los resultados dependen de los datos que escribas.</p>`;
}
const CANVAS = [["so","Socios clave","¿Quién te ayuda? Proveedores, aliados."],["ac","Actividades clave","¿Qué tienes que hacer muy bien?"],["re","Recursos clave","¿Qué necesitas tener?"],["pv","Propuesta de valor","¿Qué problema resuelves y por qué te eligen?"],["rc","Relación con clientes","¿Cómo los atiendes y los conservas?"],["ca","Canales","¿Cómo te encuentran, compran y reciben?"],["se","Segmentos de clientes","¿Para quién creas valor?"],["co","Estructura de costos","¿En qué se va el dinero?"],["in","Fuentes de ingreso","¿Por qué y cómo te pagan?"]];
const CANVAS_EJ = {so:"Panadería que surte el pan diario; carnicería; proveedor de gas.",ac:"Preparar tortas rápido y siempre igual; comprar bien; atender con buen trato.",re:"Plancha, refrigerador, el puesto, la receta de la salsa, Lupita y Toño.",pv:"Tortas abundantes, sabrosas y rápidas a 40 pesos, cerca del trabajo y de la escuela.",rc:"Trato personal, saludar por su nombre a los clientes frecuentes, pedidos por WhatsApp.",ca:"El puesto en la esquina; pedidos por WhatsApp para oficinas cercanas.",se:"Trabajadores de oficinas y talleres cercanos; estudiantes; vecinos.",co:"Ingredientes (costo variable), gas, permiso, renta del lugar, sueldo de Toño.",in:"Venta de tortas y refrescos en efectivo y con transferencia."};
function pageCanvas(){
 return `${crumbs([["","Inicio"],["herramientas","Calculadoras"],["","Lienzo"]])}<h1>Lienzo de modelo de negocio</h1><p class="lead">Llena los 9 bloques del negocio que elijas. Se guarda automáticamente en este navegador. Se explica en la lección <a href="${h("m/M4/2")}">M4 · 2</a>.</p>
 <div class="field" style="max-width:420px"><label for="cvname">Nombre del negocio</label><input type="text" id="cvname" data-cv="nombre" value="${esc(P.canvas.nombre || "")}"></div>
 <div class="canvas">${CANVAS.map(([k, t, q]) => `<div class="cell" style="grid-area:${k}"><label for="cv-${k}">${esc(t)}</label><p class="meta">${esc(q)}</p><textarea id="cv-${k}" data-cv="${k}">${esc(P.canvas[k] || "")}</textarea></div>`).join("")}</div>
 <div class="row noprint"><button type="button" class="btn ghost" id="cvej">Cargar el ejemplo de Tortas Lupita</button><button type="button" class="btn ghost" onclick="window.print()">Imprimir</button><button type="button" class="btn ghost" id="cvclear">Borrar el lienzo</button></div>`;
}
const ORG_EJ = [
 {t:"Etapa 1: puesto", n:[["Lupita (dueña: compra, cocina, cobra)",""],["Toño (ayudante)","Lupita (dueña: compra, cocina, cobra)"]]},
 {t:"Etapa 2: local con 6 empleados", n:[["Lupita (directora general)",""],["Toño (encargado del local)","Lupita (directora general)"],["Contador externo","Lupita (directora general)"],["Cocinero 1","Toño (encargado del local)"],["Cocinero 2","Toño (encargado del local)"],["Cajera","Toño (encargado del local)"],["Repartidor","Toño (encargado del local)"]]},
 {t:"Etapa 3: tres sucursales", n:[["Lupita (directora general)",""],["Gerente de operaciones (Toño)","Lupita (directora general)"],["Gerente de administración y finanzas","Lupita (directora general)"],["Gerente de cocina central","Gerente de operaciones (Toño)"],["Gerente sucursal Centro","Gerente de operaciones (Toño)"],["Gerente sucursal Norte","Gerente de operaciones (Toño)"],["Gerente sucursal Sur","Gerente de operaciones (Toño)"],["Contabilidad y nómina","Gerente de administración y finanzas"],["Compras","Gerente de administración y finanzas"]]},
 {t:"Etapa 4: Grupo Lupita", n:[["Asamblea de accionistas",""],["Consejo de administración","Asamblea de accionistas"],["Director general (CEO)","Consejo de administración"],["Director de finanzas (CFO)","Director general (CEO)"],["Director de operaciones (COO)","Director general (CEO)"],["Director de marketing (CMO)","Director general (CEO)"],["Director de personas","Director general (CEO)"],["Director jurídico","Director general (CEO)"],["Marca Tortas Lupita","Director de operaciones (COO)"],["Marca de cafeterías","Director de operaciones (COO)"],["Franquicias","Director de operaciones (COO)"]]}];
function orgTree(nodes){
 const kids = p => nodes.filter(x => x[1] === p);
 const rec = p => { const k = kids(p); return k.length ? `<ul>${k.map(x => `<li><span class="node">${esc(x[0])}</span>${x[0] !== p ? rec(x[0]) : ""}</li>`).join("")}</ul>` : ""; };
 const roots = nodes.filter(x => !x[1] || !nodes.some(y => y[0] === x[1]));
 return `<div class="org"><ul>${roots.map(r => `<li><span class="node">${esc(r[0])}</span>${rec(r[0])}</li>`).join("")}</ul></div>`;
}
function pageOrg(){
 const nodes = P.org || [];
 return `${crumbs([["","Inicio"],["herramientas","Calculadoras"],["","Organigrama"]])}<h1>Constructor de organigramas</h1><p class="lead">Agrega puestos y elige a quién reporta cada uno. Se guarda en este navegador. Se explica en el módulo <a href="${h("m/M6")}">M6</a>.</p>
 <form class="panel noprint" id="orgform" onsubmit="return false"><div class="fields"><div class="field"><label for="orgname">Puesto o persona</label><input type="text" id="orgname" maxlength="80"></div><div class="field"><label for="orgboss">Reporta a</label><select id="orgboss"><option value="">(nadie: es la cabeza)</option>${nodes.map(x => `<option>${esc(x[0])}</option>`).join("")}</select></div></div><div class="row"><button class="btn" type="button" id="orgadd">Agregar puesto</button><button class="btn ghost" type="button" id="orgdel">Quitar el último</button><button class="btn ghost" type="button" id="orgclear">Borrar todo</button></div>
 <p class="meta">Cargar un ejemplo de Tortas Lupita: ${ORG_EJ.map((e, i) => `<button type="button" class="btn ghost small" data-orgej="${i}">${esc(e.t)}</button>`).join(" ")}</p></form>
 <h2>Tu organigrama</h2>${nodes.length ? orgTree(nodes) : `<p class="meta">Todavía no hay puestos. Agrega el primero o carga un ejemplo.</p>`}`;
}

// ---------- Glosario ----------
function pageGlos(){
 const sorted = GLOS.slice().sort((a, b) => norm(a[0]).localeCompare(norm(b[0]), "es"));
 const letters = [...new Set(sorted.map(g => norm(g[0])[0].toUpperCase()))];
 return `${crumbs([["","Inicio"],["","Glosario"]])}<h1>Glosario</h1><p class="lead">${GLOS.length} términos de negocios explicados en lenguaje sencillo.</p>
 <div class="field" style="max-width:420px"><label for="gfilter">Filtrar términos</label><input type="search" id="gfilter" placeholder="Escribe una palabra…"></div>
 <nav class="letters" aria-label="Letras">${letters.map(l => `<a href="#gl-${l}" data-letter="${l}">${l}</a>`).join("")}</nav>
 <dl class="gl">${letters.map(l => `<h2 id="gl-${l}" tabindex="-1">${l}</h2>` + sorted.filter(g => norm(g[0])[0].toUpperCase() === l).map(g => `<div class="gterm" data-s="${esc(norm(g[0] + " " + g[1]))}"><dt><a href="${h("glosario/" + slug(g[0]))}">${esc(g[0])}</a></dt><dd>${inl(g[1])} <span class="meta">(${g[2]})</span></dd></div>`).join("")).join("")}</dl>`;
}
function pageTerm(s){
 const g = GLOS.find(x => slug(x[0]) === s); if (!g) return notFound();
 const les = allLessons().filter(l => LECC[l.id] && (LECC[l.id].t || []).some(t => slug(t) === s));
 const m = modById(g[2]);
 return `${crumbs([["","Inicio"],["glosario","Glosario"],["", g[0]]])}<article class="prose"><h1>${esc(g[0])}</h1><div class="box key">${md(g[1])}</div>
 <p>Se explica en el módulo <a href="${h("m/" + m.id)}">${m.id}. ${esc(m.t)}</a>.</p>
 ${les.length ? `<h2>Lecciones donde aparece</h2><ul>${les.map(l => `<li><a href="${h("m/" + l.m.id + "/" + (l.i + 1))}">${l.m.id} · ${esc(l.t)}</a></li>`).join("")}</ul>` : ""}
 <p><a href="${h("glosario")}">← Volver al glosario</a></p></article>`;
}

// ---------- Buscador ----------
let IDX = null;
function buildIndex(){
 IDX = [];
 allLessons().forEach(l => { const X = LECC[l.id] || {}; IDX.push({k:"Lección", t:l.m.id + " · " + l.t, u:"m/" + l.m.id + "/" + (l.i + 1), s:norm(l.t), b:plain([l.d, X.s, X.x, X.k, X.ch, X.gi, X.e, X.r].join(" "))}); });
 MODS.forEach(m => IDX.push({k:"Módulo", t:m.id + ". " + m.t, u:"m/" + m.id, s:norm(m.t), b:plain(m.obj + " " + m.L.map(x => x[0] + " " + x[1]).join(" "))}));
 CASOS.forEach(c => IDX.push({k:"Caso", t:c.t, u:"casos/" + c.id, s:norm(c.t), b:plain([c.ctx, c.dil, c.datos].join(" "))}));
 GLOS.forEach(g => IDX.push({k:"Glosario", t:g[0], u:"glosario/" + slug(g[0]), s:norm(g[0]), b:plain(g[1])}));
 Object.entries(CALC).concat(Object.entries(SPECIAL)).forEach(([k, T]) => IDX.push({k:"Calculadora", t:T.t, u:"herramientas/" + k, s:norm(T.t), b:plain(T.d)}));
 IDX.forEach(x => x.nb = norm(x.b));
}
function search(q){
 if (!IDX) buildIndex();
 const terms = norm(q).split(/\s+/).filter(t => t.length > 1); if (!terms.length) return [];
 const res = [];
 IDX.forEach(x => { let sc = 0; for (const t of terms) { const inT = x.s.includes(t), inB = x.nb.includes(t); if (!inT && !inB) { sc = -1; break; } sc += (inT ? 10 : 0) + (inB ? 1 + Math.min(5, x.nb.split(t).length - 1) : 0); } if (sc > 0) { if (x.s === norm(q).trim()) sc += 50; res.push([sc, x]); } });
 return res.sort((a, b) => b[0] - a[0]).map(r => r[1]);
}
function snippet(x, q){
 const t = norm(q).split(/\s+/).filter(s => s.length > 1)[0] || ""; const pos = x.nb.indexOf(t);
 if (pos < 0) return esc(x.b.slice(0, 160)) + (x.b.length > 160 ? "…" : "");
 const a = Math.max(0, pos - 70), b = Math.min(x.b.length, pos + t.length + 110);
 return (a > 0 ? "…" : "") + esc(x.b.slice(a, pos)) + "<mark>" + esc(x.b.slice(pos, pos + t.length)) + "</mark>" + esc(x.b.slice(pos + t.length, b)) + (b < x.b.length ? "…" : "");
}
function pageSearch(q){
 const r = q ? search(q) : []; const groups = {};
 r.forEach(x => (groups[x.k] = groups[x.k] || []).push(x));
 return `${crumbs([["","Inicio"],["","Buscar"]])}<h1>Buscar</h1><form class="row" id="bigsearch"><input type="search" id="q2" value="${esc(q)}" aria-label="Buscar" style="flex:1;min-width:12rem"><button class="btn" type="submit">Buscar</button></form>
 ${q ? `<p class="meta">${r.length} resultado(s) para «${esc(q)}».</p>` : `<p class="meta">Busca en lecciones, módulos, casos, glosario y calculadoras. No importan los acentos ni las mayúsculas.</p>`}
 ${Object.entries(groups).map(([k, xs]) => `<h2>${k === "Glosario" ? "Glosario" : k + "s"} (${xs.length})</h2>${xs.slice(0, 30).map(x => `<div class="panel"><a href="${h(x.u)}"><b>${esc(x.t)}</b></a><p class="meta">${snippet(x, q)}</p></div>`).join("")}${xs.length > 30 ? `<p class="meta">Se muestran los 30 primeros.</p>` : ""}`).join("")}
 ${q && !r.length ? `<p>No encontramos nada. Prueba con otra palabra, por ejemplo «margen», «organigrama», «consejo» o «franquicia».</p>` : ""}`;
}

// ---------- Progreso ----------
function pageProgress(){
 const mq = MODS.filter(hasQuiz);
 return `${crumbs([["","Inicio"],["","Mi progreso"]])}<h1>Mi progreso</h1>
 <div class="panel"><p class="score">${doneL()} de ${totalL()} lecciones (${Math.round(pct(doneL(), totalL()))} %)</p>${bar(pct(doneL(), totalL()))}
 <p class="meta">Quizzes de módulo aprobados: ${mq.filter(m => (P.quiz[m.id] || 0) >= 70).length} de ${mq.length} · Exámenes de nivel aprobados: ${C.niveles.filter(l => (P.ex[l.n] || 0) >= 70).length} de 4 · Evaluación final: ${P.ex.final != null ? P.ex.final + " %" : "pendiente"} · Racha: ${streak()} día(s) · Días de estudio: ${P.days.length}</p></div>
 ${C.niveles.map(l => `<h2 class="levelhead lv${l.n}">Nivel ${l.n}. ${esc(l.t)} ${P.ex[l.n] != null ? `<span class="tag${P.ex[l.n] >= 70 ? " ok" : ""}">examen ${P.ex[l.n]} %</span>` : ""}</h2>
 <div class="tablewrap"><table><thead><tr><th>Módulo</th><th class="num">Lecciones</th><th class="num">Quiz</th><th>Estado</th></tr></thead><tbody>${lvMods(l.n).map(m => `<tr><td><a href="${h("m/" + m.id)}">${m.id}. ${esc(m.t)}</a></td><td class="num">${modDone(m)}/${m.L.length}</td><td class="num">${hasQuiz(m) ? (P.quiz[m.id] != null ? P.quiz[m.id] + " %" : "—") : "proyecto"}</td><td>${modComplete(m) ? "✓ completado" : modDone(m) ? "en curso" : "sin empezar"}</td></tr>`).join("")}</tbody></table></div>`).join("")}
 <h2>Insignias</h2>${badgeGrid()}
 <h2>Certificado</h2><p><a class="btn" href="${h("certificado")}">Ver requisitos del certificado</a></p>
 <h2>Guardar o mover tu progreso</h2><div class="panel noprint"><p class="meta">Tu progreso solo vive en este navegador. Descárgalo para guardarlo o pasarlo a otro dispositivo.</p>
 <div class="row"><button class="btn ghost" type="button" id="pexport">Descargar mi progreso (JSON)</button><label class="btn ghost">Cargar progreso <input type="file" id="pimport" accept="application/json,.json" hidden></label><button class="btn ghost" type="button" id="preset">Reiniciar todo</button></div><p id="pmsg" class="meta" aria-live="polite"></p></div>`;
}

// ---------- Proyecto final ----------
const PROJ = [
 ["Parte 1. Ficha del negocio", [["nombre","Nombre del negocio real que elegiste"],["ficha","Tamaño, sector, giro, forma legal y antigüedad"],["modelo","Modelo de negocio: propuesta de valor, clientes, canales e ingresos"]]],
 ["Parte 2. Radiografía interna", [["org","Organigrama (quién hace qué y a quién reporta)"],["areas","Cómo funciona cada área: dirección, finanzas, operaciones, compras, ventas, marketing, RH, legal y tecnología"],["procesos","Procesos diarios, inventario y calidad"],["clientes","Clientes y proveedores: cómo los consigue, conserva y elige"],["numeros","Números estimados: ventas, costos, margen, punto de equilibrio y flujo de caja"]]],
 ["Parte 3. Plan de crecimiento", [["etapa","En qué etapa está y cuál sería la siguiente"],["decisiones","Decisiones clave, riesgos y cómo reducirlos"],["financ","Cómo financiaría el crecimiento"]]],
 ["Parte 4. Conclusiones", [["concl","Tres aprendizajes y tres recomendaciones para el dueño"]]]];
const RUB = [["modelo","Modelo de negocio",15],["estructura","Estructura y áreas",20],["numeros","Números",20],["cp","Clientes y proveedores",15],["plan","Plan de crecimiento y riesgos",20],["claridad","Claridad",10]];
const RUBLV = [[0,"No está"],[50,"Incompleto"],[75,"Correcto"],[100,"Excelente"]];
function rubScore(){ return Math.round(RUB.reduce((s, [k, , w]) => s + (P.rub[k] || 0) * w / 100, 0)); }
function pageProject(){
 return `${crumbs([["","Inicio"],["m/M29","M29"],["","Proyecto final"]])}<h1>Proyecto final: radiografía de un negocio real</h1>
 <p class="lead">Elige un negocio que conozcas (la tienda de tu colonia, el taller de un familiar, la empresa donde trabajas) y aplícale todo el curso. Tus respuestas se guardan en este navegador mientras escribes. Las lecciones de <a href="${h("m/M29")}">M29</a> te guían paso a paso.</p>
 ${PROJ.map(([t, fs]) => `<h2>${esc(t)}</h2>${fs.map(([k, l]) => `<div class="field"><label for="pj-${k}">${esc(l)}</label><textarea id="pj-${k}" data-pj="${k}">${esc(P.proj[k] || "")}</textarea></div>`).join("")}`).join("")}
 <h2>Autoevaluación con la rúbrica</h2><p class="meta">Califica con honestidad cada criterio. Se aprueba con 70 % o más.</p>
 <div class="tablewrap"><table><thead><tr><th>Criterio</th><th class="num">Peso</th><th>Nivel</th></tr></thead><tbody>${RUB.map(([k, t, w]) => `<tr><td>${esc(t)}</td><td class="num">${w} %</td><td><select data-rub="${k}" aria-label="${esc(t)}">${RUBLV.map(([v, l]) => `<option value="${v}"${(P.rub[k] || 0) === v ? " selected" : ""}>${l} (${v} %)</option>`).join("")}</select></td></tr>`).join("")}</tbody></table></div>
 <p class="score" id="rubtotal">Calificación: ${rubScore()} %</p>
 <div class="row noprint"><button class="btn" type="button" id="pjdown">Descargar el proyecto (texto)</button><button class="btn ghost" type="button" onclick="window.print()">Imprimir</button></div>`;
}
function projText(){ return "PROYECTO FINAL: CÓMO FUNCIONA UN NEGOCIO\n\n" + PROJ.map(([t, fs]) => t.toUpperCase() + "\n" + fs.map(([k, l]) => l + ":\n" + (P.proj[k] || "(sin responder)") + "\n").join("\n")).join("\n") + "\nAUTOEVALUACIÓN: " + rubScore() + " %\n" + RUB.map(([k, t, w]) => "- " + t + " (" + w + " %): " + (P.rub[k] || 0) + " %").join("\n") + "\n"; }
function download(name, text, type){ const b = new Blob([text], {type: type || "text/plain;charset=utf-8"}); const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500); }

// ---------- Certificado ----------
function pageCert(){
 const rq = certReqs(), ok = rq.every(r => r[1]);
 return `${crumbs([["","Inicio"],["","Certificado"]])}<h1>Certificado del curso</h1>
 <div class="panel noprint"><h2>Requisitos</h2><ul>${rq.map(r => `<li>${r[1] ? "✅" : "⬜"} ${esc(r[0])}</li>`).join("")}</ul>
 <div class="field" style="max-width:420px"><label for="certname">Tu nombre como aparecerá en el certificado</label><input type="text" id="certname" maxlength="80" value="${esc(P.name)}"></div></div>
 ${ok ? `<div class="cert"><p class="kicker">Certificado de terminación</p><h1>${esc(C.titulo)}</h1><p class="sub">${esc(C.subtitulo)}</p><p>Se otorga a</p><p style="font-size:1.6rem;font-family:var(--serif)"><b id="certshow">${esc(P.name || "(escribe tu nombre arriba)")}</b></p>
 <p>por completar ${MODS.length} módulos y ${totalL()} lecciones (≈ ${Math.round(totalMin() / 60)} horas), aprobar los exámenes de los 4 niveles con ${C.niveles.map(l => P.ex[l.n] + " %").join(", ")}, la evaluación final con ${P.ex.final} % y el proyecto final con ${rubScore()} %.</p><p class="meta">Emitido el ${new Date().toLocaleDateString("es-MX", {year:"numeric", month:"long", day:"numeric"})} · Certificado de autoaprendizaje generado en el navegador; no es un título oficial.</p></div>
 <div class="row noprint"><button class="btn" type="button" onclick="window.print()">Imprimir o guardar como PDF</button></div>` : `<div class="box warn"><p>Cuando cumplas todos los requisitos aparecerá aquí tu certificado imprimible.</p></div>`}`;
}

// ---------- Páginas fijas ----------
function pageAbout(){
 return `${crumbs([["","Inicio"],["","Acerca"]])}<article class="prose"><h1>Acerca del curso</h1>
 <p>«${esc(C.titulo)}: ${esc(C.subtitulo)}» es un curso gratuito de autoaprendizaje, en español, para cualquier persona desde los 15 años que quiera entender cómo se organiza y cómo funciona por dentro un negocio.</p>
 <h2>Cómo está hecho</h2><ul><li><b>${C.niveles.length} niveles, ${MODS.length} módulos y ${totalL()} lecciones</b>, con unas ${Math.round(totalMin() / 60)} horas de estudio en total.</li><li>Cada lección tiene situación inicial, objetivos, explicación, concepto clave, el recuadro «Del changarro al gigante», un ejemplo resuelto con Tortas Lupita, una empresa real, errores frecuentes, una actividad y un mini-quiz.</li><li>El país de referencia es México (SAT, IMSS, Profeco, IMPI, BMV, Cofece). Los temas legales y fiscales incluyen equivalentes de otros países y avisos.</li><li>Los ejemplos usan pesos mexicanos (MXN) y el formato numérico de México (1,234.56).</li></ul>
 <h2>Sobre las empresas reales</h2><p>Los casos de empresas reales se basan en información pública (informes anuales, comunicados, prensa económica, libros). Las cifras pueden cambiar con el tiempo; verifica siempre la fuente más reciente. Tortas Lupita, Don Chuy, Grupo Lupita y otros casos marcados como ficticios son inventados.</p>
 <h2>Privacidad</h2><p>El sitio no usa cuentas, servidores ni rastreadores. Tu progreso, notas, lienzos y proyecto se guardan solo en el almacenamiento local de tu navegador. Puedes descargarlos o borrarlos desde <a href="${h("mi-progreso")}">Mi progreso</a>.</p></article>`;
}
function pageLegal(){
 return `${crumbs([["","Inicio"],["","Aviso legal"]])}<article class="prose"><h1>Aviso legal</h1><p>Este curso tiene fines exclusivamente educativos. No constituye asesoría legal, fiscal, contable, laboral, financiera ni de inversión.</p><ul><li>Las leyes, tasas de impuestos, cuotas de seguridad social, salarios mínimos y requisitos de trámites cambian con frecuencia y dependen del país, del estado y del municipio. Consulta siempre la norma vigente y a un profesional.</li><li>Las calculadoras dan resultados aproximados según los datos que escribas; no garantizan resultados reales.</li><li>Las menciones a empresas reales son descriptivas y educativas, se basan en información pública y no implican relación, patrocinio ni recomendación de compra o inversión.</li><li>El certificado es de autoaprendizaje y no es un título ni una constancia oficial.</li></ul></article>`;
}
function notFound(){ return `<h1>Página no encontrada</h1><p>La dirección no existe. <a href="${h("")}">Ir al inicio</a> o <a href="${h("curso")}">ver el mapa del curso</a>.</p>`; }

// ---------- Enrutador ----------
function route(){
 QZ = {};
 const raw = decodeURIComponent((location.hash || "#/").slice(2)); const [path, qs] = raw.split("?"); const p = path.split("/").filter(Boolean);
 let html; const a = p[0] || "";
 try {
  if (!a) html = pageHome();
  else if (a === "curso") html = pageCourse();
  else if (a === "nivel") html = pageLevel(+p[1]);
  else if (a === "m" && p.length === 2) html = pageModule(p[1]);
  else if (a === "m" && p[2] === "quiz") html = pageQuiz(p[1]);
  else if (a === "m" && p.length === 3) html = pageLesson(p[1], +p[2]);
  else if (a === "examen" && /^nivel-[1-4]$/.test(p[1] || "")) html = pageExam(+p[1].slice(6));
  else if (a === "examen-final") html = pageFinal();
  else if (a === "casos" && !p[1]) html = pageCasos();
  else if (a === "casos") html = pageCaso(p[1]);
  else if (a === "herramientas" && !p[1]) html = pageTools();
  else if (a === "herramientas") html = pageTool(p[1]);
  else if (a === "glosario" && !p[1]) html = pageGlos();
  else if (a === "glosario") html = pageTerm(p[1]);
  else if (a === "buscar") html = pageSearch(new URLSearchParams(qs || "").get("q") || "");
  else if (a === "mi-progreso") html = pageProgress();
  else if (a === "proyecto") html = pageProject();
  else if (a === "certificado") html = pageCert();
  else if (a === "acerca") html = pageAbout();
  else if (a === "aviso-legal") html = pageLegal();
  else html = notFound();
 } catch(e) { console.error(e); html = `<h1>Algo salió mal</h1><p>No se pudo mostrar esta página. <a href="${h("")}">Volver al inicio</a>.</p>`; }
 app.innerHTML = html;
 renderNav(path || "");
 const t = app.querySelector("h1"); document.title = (t && a ? t.textContent + " · " : "") + "Cómo funciona un negocio";
 document.getElementById("menu").hidden = true; document.getElementById("menubtn").setAttribute("aria-expanded", "false");
 bindPage(a);
 window.scrollTo(0, 0); app.focus({preventScroll:true});
}
function bindPage(a){
 bindQuizzes();
 app.querySelectorAll("form.calc").forEach(f => { runCalc(f); f.addEventListener("input", () => runCalc(f)); f.querySelector("[data-reset]").addEventListener("click", () => { const T = CALC[f.dataset.calc]; T.f.forEach(([k, , d]) => f.querySelector(`[name="${k}"]`).value = d); runCalc(f); }); });
 const notes = document.getElementById("notes"); if (notes) notes.addEventListener("input", () => { P.notes[P.last] = notes.value; save(); });
 const db = document.getElementById("donebtn"); if (db) db.addEventListener("click", () => { P.done[P.last] = !P.done[P.last]; if (!P.done[P.last]) delete P.done[P.last]; save(); updDone(); });
 app.querySelectorAll("textarea[data-caso]").forEach(t => t.addEventListener("input", () => { const c = t.dataset.caso; P.casos[c] = P.casos[c] || {}; P.casos[c][t.dataset.k] = t.value; save(); }));
 ["fnivel","ftipo"].forEach(id => { const s = document.getElementById(id); if (s) s.addEventListener("change", () => { const n = document.getElementById("fnivel").value, tp = document.getElementById("ftipo").value; const q = new URLSearchParams(); if (n) q.set("nivel", n); if (tp) q.set("tipo", tp); location.hash = "#/casos" + (q.toString() ? "?" + q : ""); }); });
 app.querySelectorAll("[data-cv]").forEach(t => t.addEventListener("input", () => { P.canvas[t.dataset.cv] = t.value; save(); }));
 const cvej = document.getElementById("cvej"); if (cvej) cvej.addEventListener("click", () => { P.canvas = Object.assign({nombre:"Tortas Lupita (puesto)"}, CANVAS_EJ); save(); route(); });
 const cvc = document.getElementById("cvclear"); if (cvc) cvc.addEventListener("click", () => { if (confirm("¿Borrar todo el lienzo?")) { P.canvas = {}; save(); route(); } });
 const oa = document.getElementById("orgadd"); if (oa) {
  oa.addEventListener("click", () => { const n = document.getElementById("orgname").value.trim(); if (!n) return; P.org = P.org || []; if (P.org.some(x => x[0] === n)) { alert("Ese puesto ya existe; usa otro nombre."); return; } P.org.push([n, document.getElementById("orgboss").value]); save(); route(); });
  document.getElementById("orgdel").addEventListener("click", () => { if (P.org && P.org.length) { P.org.pop(); save(); route(); } });
  document.getElementById("orgclear").addEventListener("click", () => { if (confirm("¿Borrar el organigrama?")) { P.org = []; save(); route(); } });
  app.querySelectorAll("[data-orgej]").forEach(b => b.addEventListener("click", () => { P.org = ORG_EJ[+b.dataset.orgej].n.map(x => x.slice()); save(); route(); }));
 }
 const gf = document.getElementById("gfilter"); if (gf) gf.addEventListener("input", () => { const q = norm(gf.value.trim()); app.querySelectorAll(".gterm").forEach(d => d.hidden = q && !d.dataset.s.includes(q)); app.querySelectorAll("dl.gl h2").forEach(h2 => { let n = h2.nextElementSibling, any = false; while (n && n.tagName !== "H2") { if (!n.hidden) any = true; n = n.nextElementSibling; } h2.hidden = !any; }); });
 app.querySelectorAll("[data-letter]").forEach(l => l.addEventListener("click", ev => { ev.preventDefault(); const t = document.getElementById("gl-" + l.dataset.letter); if (t) { t.scrollIntoView(); t.focus({preventScroll:true}); } }));
 const rt = document.getElementById("retry"); if (rt) rt.addEventListener("click", route);
 const bs = document.getElementById("bigsearch"); if (bs) bs.addEventListener("submit", ev => { ev.preventDefault(); location.hash = "#/buscar?q=" + encodeURIComponent(document.getElementById("q2").value); });
 const pe = document.getElementById("pexport"); if (pe) {
  pe.addEventListener("click", () => download("progreso-como-funciona-un-negocio.json", JSON.stringify(P, null, 1), "application/json"));
  document.getElementById("pimport").addEventListener("change", ev => { const f = ev.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { try { const d = JSON.parse(r.result); if (typeof d !== "object" || !d || !d.done) throw 0; P = Object.assign(blank(), d); save(); route(); } catch(e) { document.getElementById("pmsg").textContent = "El archivo no es un progreso válido de este curso."; } }; r.readAsText(f); });
  document.getElementById("preset").addEventListener("click", () => { if (confirm("¿Seguro? Se borrará todo tu progreso, notas, lienzo, organigrama y proyecto.")) { P = blank(); save(); route(); } });
 }
 app.querySelectorAll("[data-pj]").forEach(t => t.addEventListener("input", () => { P.proj[t.dataset.pj] = t.value; save(); }));
 app.querySelectorAll("[data-rub]").forEach(s => s.addEventListener("change", () => { P.rub[s.dataset.rub] = +s.value; save(); document.getElementById("rubtotal").textContent = "Calificación: " + rubScore() + " %"; }));
 const pd = document.getElementById("pjdown"); if (pd) pd.addEventListener("click", () => download("proyecto-final-negocio.txt", projText()));
 const cn = document.getElementById("certname"); if (cn) cn.addEventListener("input", () => { P.name = cn.value; save(); const s = document.getElementById("certshow"); if (s) s.textContent = cn.value || "(escribe tu nombre arriba)"; });
}

// ---------- Inicio ----------
function applyTheme(t){ if (t) document.documentElement.setAttribute("data-theme", t); else document.documentElement.removeAttribute("data-theme"); const dark = t ? t === "dark" : window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches; const b = document.getElementById("theme"); b.textContent = dark ? "☀" : "☾"; b.setAttribute("aria-label", dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"); }
applyTheme(store.get(TKEY, null));
document.getElementById("theme").addEventListener("click", () => { const cur = document.documentElement.getAttribute("data-theme") || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); const nx = cur === "dark" ? "light" : "dark"; store.set(TKEY, nx); applyTheme(nx); });
document.getElementById("menubtn").addEventListener("click", () => { const m = document.getElementById("menu"); m.hidden = !m.hidden; document.getElementById("menubtn").setAttribute("aria-expanded", String(!m.hidden)); });
document.getElementById("searchform").addEventListener("submit", ev => { ev.preventDefault(); const q = document.getElementById("q").value.trim(); if (q) location.hash = "#/buscar?q=" + encodeURIComponent(q); });
window.addEventListener("hashchange", route);
route();
window.__NEGOCIO = {search, md, words, certReqs, examQs, rubScore};
})();
