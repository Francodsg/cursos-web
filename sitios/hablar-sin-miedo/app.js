(function(){
"use strict";
const W = window, app = document.getElementById("app");
const MODS = (W.MODULOS || []).slice().sort((a, b) => a.n - b.n);
const HIST = W.HISTORIAS || [], RETO = W.RETO || [], PRAC = W.PRACTICAS || [], SIMS = W.SIMULADORES || [];
const TOOLS = W.TOOLS || {}, HS = W.HS || {};

// ---------- Utilidades ----------
const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const md = s => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\*(.+?)\*/g, "<i>$1</i>").replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g, (m, h, t) => `<a href="${h.startsWith("../") ? h : "#/" + h}">${t}</a>`);
const norm = s => String(s == null ? "" : s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9ñ ]/g, " ").replace(/\s+/g, " ").trim();
const H = p => "#/" + p;
const shuffle = (arr, rnd) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const seeded = seed => { let s = 0; for (const ch of String(seed)) s = (s * 31 + ch.charCodeAt(0)) >>> 0; return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };
const store = { get(k, d){ try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch(e){ return d; } }, set(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} } };
const PKEY = "hablar-sin-miedo-progreso-v1", TKEY = "hablar-sin-miedo-tema";
const blank = () => ({les:{}, quiz:{}, tries:{}, exam:null, reto:{}, prac:{}, sim:{}, tools:{}, hist:{}, name:"", last:""});
let P = Object.assign(blank(), store.get(PKEY, {}));
const save = () => store.set(PKEY, P);
const fmtMin = m => m >= 60 ? `${Math.floor(m / 60)} h${m % 60 ? " " + (m % 60) + " min" : ""}` : m + " min";
const NIVEL = ["", "Base", "Hablar", "Situaciones", "Modelos", "Práctica"];
const EVN = {solida:"Evidencia sólida", prometedora:"Evidencia prometedora", mito:"Mito o exagerado"};
const evTag = k => k && EVN[k] ? `<a class="ev ev-${k}" href="${H("evidencia")}" title="Cómo clasificamos la evidencia">${EVN[k]}</a>` : "";

const ALL = []; MODS.forEach(m => m.L.forEach((l, i) => ALL.push({m, l, i})));
const lesBy = id => ALL.find(x => x.l.id === id);
const lesHref = id => { const x = lesBy(id); return x ? H(`leccion/${x.m.n}/${x.i + 1}`) : H("curso"); };
const histBy = s => HIST.find(h => h.s === s);
const isDone = id => !!(P.les[id] && P.les[id].done);
const modPct = m => Math.round(m.L.filter(l => isDone(l.id)).length / m.L.length * 100);
const coursePct = () => ALL.length ? Math.round(ALL.filter(x => isDone(x.l.id)).length / ALL.length * 100) : 0;
const totalMin = () => MODS.reduce((s, m) => s + m.L.reduce((t, l) => t + (l.min || 0), 0) + (m.qmin || 20), 0);
const retoDone = () => RETO.filter(d => P.reto[d.d] && P.reto[d.d].done).length;
const certReady = () => MODS.every(m => (P.quiz[m.n] || 0) >= 70) && (P.exam || 0) >= 75;

// ---------- Componentes ----------
const crumbs = list => `<nav class="crumbs" aria-label="Migas de pan">${list.map((c, i) => i < list.length - 1 ? `<a href="${H(c[1] || "")}">${esc(c[0])}</a> › ` : `<span>${esc(c[0])}</span>`).join("")}</nav>`;
function body(arr){
  return (arr || []).map(b => {
    if (typeof b === "string") return b.startsWith("## ") ? `<h2>${md(b.slice(3))}</h2>` : b.startsWith("### ") ? `<h3>${md(b.slice(4))}</h3>` : `<p>${md(b)}</p>`;
    if (Array.isArray(b)) return `<ul>${b.map(li => `<li>${md(li)}</li>`).join("")}</ul>`;
    if (b.ol) return `<ol class="steps">${b.ol.map(li => `<li>${md(li)}</li>`).join("")}</ol>`;
    if (b.box) return `<div class="box${b.c ? " " + b.c : ""}">${b.h ? `<h3>${md(b.h)}</h3>` : ""}${md(b.box)}</div>`;
    if (b.quote) return `<blockquote class="quote">${md(b.quote)}${b.f ? `<br><span class="meta">— ${md(b.f)}</span>` : ""}</blockquote>`;
    if (b.table) return `<div class="tablewrap"><table><thead><tr>${b.table[0].map(c => `<th>${md(c)}</th>`).join("")}</tr></thead><tbody>${b.table.slice(1).map(r => `<tr>${r.map(c => `<td>${md(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
    return "";
  }).join("");
}
function quizHTML(id, qs, label){
  return `<form class="quiz" data-quiz="${esc(id)}" aria-label="${esc(label || "Quiz")}">${qs.map((q, i) => `<fieldset><legend>${i + 1}. ${md(q[0])}</legend>${q[1].map((o, j) => `<label><input type="radio" name="q${i}" value="${j}"> ${md(o)}</label>`).join("")}<p class="fb" data-fb="${i}" aria-live="polite"></p></fieldset>`).join("")}<button class="btn" type="submit">Comprobar respuestas</button> <span class="qres meta" aria-live="polite"></span><div class="qafter"></div></form>`;
}
const QUIZ = {}, QUIZ_CB = {};
function bindQuizzes(){
  app.querySelectorAll("form[data-quiz]").forEach(f => f.onsubmit = ev => {
    ev.preventDefault(); const id = f.dataset.quiz, qs = QUIZ[id] || []; let ok = 0, miss = 0;
    qs.forEach((q, i) => { const v = f.querySelector(`input[name=q${i}]:checked`); if (!v) miss++; const good = v && +v.value === q[2]; if (good) ok++;
      const fb = f.querySelector(`[data-fb="${i}"]`); fb.className = "fb " + (good ? "okc" : "bad"); fb.innerHTML = (good ? "Correcto. " : `Respuesta correcta: <b>${md(q[1][q[2]])}</b>. `) + md(q[3] || ""); });
    const pct = Math.round(ok / qs.length * 100); f.querySelector(".qres").textContent = `${ok} de ${qs.length} (${pct} %)${miss ? ` · ${miss} sin responder` : ""}`;
    const cb = QUIZ_CB[id]; if (cb) f.querySelector(".qafter").innerHTML = cb(pct) || "";
  });
}
function caseHTML(c){
  if (!c) return "";
  return `<form class="quiz" data-case="1"><fieldset><legend>${md(c[0])}</legend>${c[1].map((o, j) => `<label><input type="radio" name="c" value="${j}"> ${md(o)}</label>`).join("")}<p class="fb" id="casefb" aria-live="polite"></p></fieldset><button class="btn ghost" type="submit">Ver la explicación</button></form>`;
}

// ---------- Insignias ----------
const BADGES = [
 ["primer-paso","Primer paso","Completa tu primera lección.", () => ALL.some(x => isDone(x.l.id))],
 ...MODS.map(m => ["mod" + m.n, m.badge || ("Módulo " + m.n), `Aprueba el quiz del módulo ${m.n}: ${m.t}.`, () => (P.quiz[m.n] || 0) >= 70]),
 ["sem1","Semana 1","Completa los días 1 a 7 del reto.", () => [1,2,3,4,5,6,7].every(d => P.reto[d] && P.reto[d].done)],
 ["sem2","Semana 2","Completa los días 8 a 14 del reto.", () => [8,9,10,11,12,13,14].every(d => P.reto[d] && P.reto[d].done)],
 ["sem3","Semana 3","Completa los días 15 a 21 del reto.", () => [15,16,17,18,19,20,21].every(d => P.reto[d] && P.reto[d].done)],
 ["reto30","30 días","Completa los 30 días del reto.", () => retoDone() === 30],
 ["respira","Respira","Haz las 10 prácticas guiadas al menos una vez.", () => PRAC.length && PRAC.every(p => P.prac[p.s])],
 ["rechazo","A prueba de rechazo","Completa el día 19 del reto y la lección 4.5.", () => P.reto[19] && P.reto[19].done && isDone("4.5")],
 ["simulador","Sin guion","Termina los 8 simuladores.", () => SIMS.length && SIMS.every(s => P.sim[s.s] != null)],
 ["graduado","Graduado","Obtén el certificado.", certReady]
];
const badgesOn = () => BADGES.filter(b => { try { return !!b[3](); } catch(e){ return false; } });

// ---------- Páginas ----------
function pageHome(){
  const next = ALL.find(x => !isDone(x.l.id)), last = P.last && lesBy(P.last);
  const dayNow = RETO.find(d => !(P.reto[d.d] && P.reto[d.d].done));
  const h = HIST.length ? HIST[new Date().getDate() % HIST.length] : null;
  return `<section class="hero"><p class="kicker">Curso gratuito en español · ${MODS.length} módulos · ${ALL.length} lecciones · ≈ ${Math.round(totalMin() / 60 + 13)} horas</p>
  <h1>Cómo dejar de tener miedo y hablar sin temor</h1>
  <p class="lead">En los negocios y en otras áreas de la vida. El miedo no se va antes de hablar: se va hablando. Aquí aprenderás qué es el miedo, cómo lo superaron personas reales paso a paso y cómo practicar cada día hasta hablar con seguridad.</p>
  <p class="row"><a class="btn" href="${next ? lesHref(next.l.id) : H("curso")}">${ALL.some(x => isDone(x.l.id)) ? "Continuar el curso" : "Empezar el curso"}</a> <a class="btn ghost" href="${H("reto-30-dias")}">Reto de 30 días</a> <a class="btn ghost" href="${H("rutas")}">Tengo poco tiempo</a></p>
  ${ALL.some(x => isDone(x.l.id)) ? `<div class="bar" aria-label="Progreso del curso"><i style="width:${coursePct()}%"></i></div><p class="meta">${coursePct()} % del curso completado${last ? ` · Última lección abierta: <a href="${lesHref(last.l.id)}">${esc(last.l.id)} ${esc(last.l.t)}</a>` : ""}</p>` : ""}
  </section>
  <div class="grid three">
   <a class="card" href="${H("modulo/1")}"><h3>Entender</h3><p>Qué es el miedo a hablar, por qué aparece y qué lo mantiene. Tu mapa personal del miedo.</p></a>
   <a class="card" href="${H("practicas")}"><h3>Practicar</h3><p>Respiración, voz, ensayo y exposición gradual con prácticas guiadas, herramientas y simuladores.</p></a>
   <a class="card" href="${H("modulo/4")}"><h3>Negocios</h3><p>Presentar ideas, vender, negociar, pedir un aumento, poner precio y liderar reuniones.</p></a>
  </div>
  <div class="grid two">
   ${dayNow ? `<div class="panel"><p class="kicker">Reto de hoy · día ${dayNow.d}</p><h3>${esc(dayNow.t)}</h3><p>${md(dayNow.f)}</p><a href="${H("reto-30-dias/" + dayNow.d)}">Abrir el día ${dayNow.d}</a></div>` : `<div class="panel"><h3>¡Reto de 30 días completado!</h3><p>Crea una nueva escalera y vuelve a empezar con retos más difíciles.</p></div>`}
   ${h ? `<div class="panel"><p class="kicker">Historia real</p><h3>${esc(h.n)}</h3><p>${md(h.lema || h.quien)}</p><a href="${H("historias/" + h.s)}">Qué hizo, paso a paso</a></div>` : ""}
  </div>
  <h2>Los módulos</h2>${modCards()}
  <div class="box warnbox"><b>Importante:</b> este curso es educativo. Si el miedo te provoca ataques de pánico o te impide trabajar o estudiar, lee <a href="${H("pedir-ayuda")}">Cuándo pedir ayuda</a>. La terapia cognitivo-conductual tiene evidencia sólida para la ansiedad social.</div>`;
}
const modCards = () => `<div class="grid">${MODS.map(m => `<a class="card${modPct(m) === 100 ? " done" : ""}" href="${H("modulo/" + m.n)}"><span class="num">${m.n}</span> <span class="meta">Nivel ${m.nivel}: ${NIVEL[m.nivel]}</span><h3>${esc(m.t)}</h3><p class="meta">${esc(m.d)}</p><p class="meta">${m.L.length} lecciones · ${esc(m.dur)}${P.quiz[m.n] != null ? ` · Quiz: ${P.quiz[m.n]} %` : ""}</p><div class="bar"><i style="width:${modPct(m)}%"></i></div></a>`).join("")}</div>`;

function pageCurso(){
  return crumbs([["Inicio",""],["Curso"]]) + `<h1>El curso completo</h1>
  <p class="lead">${MODS.length} módulos en 5 niveles, ${ALL.length} lecciones y ≈ 46 horas (≈ 33 h de lecciones y quizzes + ≈ 13 h de práctica: reto de 30 días, prácticas guiadas, simuladores y proyecto final).</p>
  <div class="bar"><i style="width:${coursePct()}%"></i></div><p class="meta">${ALL.filter(x => isDone(x.l.id)).length} de ${ALL.length} lecciones completadas · <a href="${H("progreso")}">Ver progreso e insignias</a></p>
  <div class="panel"><h3>Cómo funciona</h3><ul><li>Cada lección: situación inicial, objetivos, explicación, idea clave con su nivel de evidencia, ejemplo real, paso a paso, errores frecuentes, ejercicio, reto de la vida real, caso práctico y <b>mini-quiz de 5 preguntas</b> (se aprueba con 60 % y la lección queda completada).</li><li>Cada módulo termina con un <b>quiz de 12 preguntas</b> al azar (70 % para aprobar; si repites, cambian).</li><li>El <a href="${H("examen")}">examen final</a> tiene 30 preguntas (75 %). Con los 7 quizzes de módulo y el examen aprobados obtienes el <a href="${H("certificado")}">certificado</a>.</li><li>Todo es libre: puedes abrir cualquier lección en cualquier orden o seguir una <a href="${H("rutas")}">ruta</a>.</li></ul></div>
  ${MODS.map(m => `<h2 id="m${m.n}"><a href="${H("modulo/" + m.n)}">Módulo ${m.n}. ${esc(m.t)}</a></h2><p class="meta">Nivel ${m.nivel}: ${NIVEL[m.nivel]} · ${m.L.length} lecciones · ${esc(m.dur)}</p><ol class="toc">${m.L.map((l, i) => `<li><span class="st${isDone(l.id) ? " done" : ""}">${isDone(l.id) ? "✓" : "○"}</span> <a href="${H(`leccion/${m.n}/${i + 1}`)}">${esc(l.id)} ${esc(l.t)}</a> <span class="meta">(${l.min} min)</span></li>`).join("")}<li><span class="st">${P.quiz[m.n] >= 70 ? "✓" : "○"}</span> <a href="${H("quiz/" + m.n)}">Quiz del módulo ${m.n}</a></li></ol>`).join("")}
  <h2>Final</h2><p><a class="btn" href="${H("examen")}">Examen final</a> <a class="btn ghost" href="${H("herramientas/rubrica")}">Proyecto final y rúbrica</a></p>`;
}

function pageModulo(n){
  const m = MODS.find(x => x.n === n); if (!m) return nf();
  return crumbs([["Inicio",""],["Curso","curso"],["Módulo " + n]]) + `<p class="kicker">Nivel ${m.nivel}: ${NIVEL[m.nivel]} · Módulo ${m.n}</p><h1>${esc(m.t)}</h1><p class="lead">${esc(m.d)}</p>
  <div class="panel"><p><b>Objetivo del módulo:</b> ${md(m.obj)}</p><p class="meta">${m.L.length} lecciones · ${esc(m.dur)} · Quiz del módulo: 12 preguntas, 70 % para aprobar${P.quiz[m.n] != null ? ` · Tu mejor nota: ${P.quiz[m.n]} %` : ""}</p><div class="bar"><i style="width:${modPct(m)}%"></i></div></div>
  ${m.intro ? body(m.intro) : ""}
  <div class="grid">${m.L.map((l, i) => `<a class="card${isDone(l.id) ? " done" : ""}" href="${H(`leccion/${m.n}/${i + 1}`)}"><p class="kicker">Lección ${esc(l.id)} · ${l.min} min${isDone(l.id) ? " · ✓ completada" : ""}</p><h3>${esc(l.t)}</h3><p class="meta">${esc((l.obj || [])[0] || "")}</p></a>`).join("")}</div>
  <p class="row"><a class="btn" href="${H("quiz/" + m.n)}">Hacer el quiz del módulo</a>${n > 1 ? ` <a class="btn ghost" href="${H("modulo/" + (n - 1))}">← Módulo ${n - 1}</a>` : ""}${n < MODS.length ? ` <a class="btn ghost" href="${H("modulo/" + (n + 1))}">Módulo ${n + 1} →</a>` : ""}</p>`;
}

function actLinks(l){
  if (!l.act || !l.act.length) return "";
  return `<h2>Actividad interactiva</h2><div class="row">${l.act.map(a => `<a class="btn ghost" href="${H(a[0])}">${esc(a[1])}</a>`).join("")}</div>`;
}
function histBlock(h){
  if (!h) return "";
  return `<div class="panel"><p class="kicker">${esc(h.fechas || "")}</p><p><b>Quién era:</b> ${md(h.quien)}</p><p><b>Su miedo:</b> ${md(h.miedo)}</p><p><b>El momento más difícil:</b> ${md(h.momento)}</p></div>
  <h2>Qué hizo, paso a paso</h2><ol class="steps">${h.pasos.map(p => `<li>${md(p)}</li>`).join("")}</ol>
  <h2>Resultado</h2><p>${md(h.resultado)}</p>
  <div class="box good"><h3>Lo que puedes copiar</h3><ul>${h.copiar.map(c => `<li>${md(c)}</li>`).join("")}</ul></div>
  ${h.versiones ? `<div class="box warnbox"><b>Lo que no está claro o cambia según la fuente:</b> ${md(h.versiones)}</div>` : ""}
  ${h.ejercicio ? `<h2>Ejercicio «Hazlo como ${esc(h.corto || h.n)}»</h2><p>${md(h.ejercicio)}</p>` : ""}
  <h2>Fuentes</h2><ul class="meta">${h.fuentes.map(f => `<li>${md(f)}</li>`).join("")}</ul>`;
}
function pageLeccion(n, i){
  const m = MODS.find(x => x.n === n); if (!m) return nf(); const l = m.L[i]; if (!l) return nf();
  P.last = l.id; save();
  const h = l.hist ? histBy(l.hist) : null;
  QUIZ["l-" + l.id] = l.q || [];
  QUIZ_CB["l-" + l.id] = pct => { const pr = P.les[l.id] || {}; pr.score = Math.max(pr.score || 0, pct); if (pct >= 60) pr.done = true; P.les[l.id] = pr; save();
    return pct >= 60 ? `<div class="box good">¡Lección completada con ${pct} %! ${i + 1 < m.L.length ? `<a href="${H(`leccion/${n}/${i + 2}`)}">Siguiente lección →</a>` : `<a href="${H("quiz/" + n)}">Hacer el quiz del módulo →</a>`}</div>` : `<div class="box warnbox">${pct} %: necesitas un 60 %. Lee las explicaciones y vuelve a intentarlo.</div>`; };
  const prev = i > 0 ? [`leccion/${n}/${i}`, m.L[i - 1]] : n > 1 ? [`leccion/${n - 1}/${MODS[n - 2].L.length}`, MODS[n - 2].L[MODS[n - 2].L.length - 1]] : null;
  const next = i + 1 < m.L.length ? [`leccion/${n}/${i + 2}`, m.L[i + 1]] : null;
  return crumbs([["Inicio",""],["Curso","curso"],["Módulo " + n, "modulo/" + n],["Lección " + l.id]]) + `<article class="prose">
  <p class="kicker">Módulo ${n}: ${esc(m.t)} · Lección ${esc(l.id)} · ${l.min} min${isDone(l.id) ? " · ✓ completada" : ""}</p>
  <h1>${esc(l.t)}</h1>
  ${l.sit ? `<p class="sit">${md(l.sit)}</p>` : ""}
  <h2>Objetivos</h2><ul>${(l.obj || []).map(o => `<li>${md(o)}</li>`).join("")}</ul>
  ${l.temas ? `<p class="meta"><b>Temas:</b> ${l.temas.map(esc).join(" · ")}</p>` : ""}
  ${h ? histBlock(h) : ""}
  ${body(l.txt)}
  ${l.clave ? `<div class="box key"><h3>La idea clave</h3>${md(l.clave)}${l.ev ? `<p>${evTag(l.ev)} ${l.evt ? `<span class="meta">${md(l.evt)}</span>` : ""}</p>` : ""}</div>` : ""}
  ${l.ej ? `<h2>Ejemplo real</h2><p>${md(l.ej.t)}</p>${l.ej.f ? `<p class="meta">Fuente: ${md(l.ej.f)}</p>` : ""}` : ""}
  ${l.pasos ? `<h2>Paso a paso</h2><ol class="steps">${l.pasos.map(p => `<li>${md(p)}</li>`).join("")}</ol>` : ""}
  ${l.err ? `<h2>Errores frecuentes</h2><ul>${l.err.map(e => `<li>${md(e)}</li>`).join("")}</ul>` : ""}
  ${l.ejer ? `<h2>Ejercicio práctico</h2><div class="panel">${md(l.ejer)}</div>` : ""}
  ${l.reto ? `<h2>Reto de la vida real</h2><div class="grid two"><div class="box good"><b>Versión fácil:</b> ${md(l.reto[0])}</div><div class="box warm"><b>Versión difícil:</b> ${md(l.reto[1])}</div></div>` : ""}
  ${actLinks(l)}
  ${l.caso ? `<h2>Caso práctico: ¿qué harías?</h2>${caseHTML(l.caso)}` : ""}
  ${l.q && l.q.length ? `<h2>Mini-quiz</h2><p class="meta">5 preguntas. Con un 60 % la lección queda completada.${P.les[l.id] && P.les[l.id].score != null ? ` Tu mejor nota: ${P.les[l.id].score} %.` : ""}</p>${quizHTML("l-" + l.id, l.q, "Mini-quiz de la lección " + l.id)}` : ""}
  ${l.mas ? `<h2>Para saber más</h2><ul class="meta">${l.mas.map(x => `<li>${md(x)}</li>`).join("")}</ul>` : ""}
  <div class="panel meta"><b>Ficha:</b> duración ${l.min} min${l.mat ? ` · Materiales: ${l.mat.map(esc).join(", ")}` : ""}${l.rel ? ` · Relacionadas: ${l.rel.map(r => `<a href="${lesHref(r)}">${esc(r)}</a>`).join(", ")}` : ""}</div>
  <p class="noprint">${isDone(l.id) ? `<button class="btn ghost" data-undone="${esc(l.id)}">Marcar como no completada</button>` : `<button class="btn ghost" data-done="${esc(l.id)}">Marcar como completada sin quiz</button>`}</p>
  <nav class="pager">${prev ? `<a href="${H(prev[0])}">← ${esc(prev[1].id)} ${esc(prev[1].t)}</a>` : "<span></span>"}${next ? `<a href="${H(next[0])}">${esc(next[1].id)} ${esc(next[1].t)} →</a>` : `<a href="${H("quiz/" + n)}">Quiz del módulo ${n} →</a>`}</nav>
  </article>`;
}
function modBank(m){ return m.L.reduce((a, l) => a.concat(l.q || []), []).concat(m.extra || []); }
function pageQuiz(n){
  const m = MODS.find(x => x.n === n); if (!m) return nf();
  const t = (P.tries[n] || 0); const qs = shuffle(modBank(m), seeded("m" + n + "-" + t)).slice(0, 12);
  QUIZ["m-" + n] = qs;
  QUIZ_CB["m-" + n] = pct => { P.quiz[n] = Math.max(P.quiz[n] || 0, pct); P.tries[n] = t + 1; save();
    return pct >= 70 ? `<div class="box good">¡Aprobado con ${pct} %! Insignia «${esc(m.badge || "Módulo " + n)}». ${n < MODS.length ? `<a href="${H("modulo/" + (n + 1))}">Ir al módulo ${n + 1} →</a>` : `<a href="${H("examen")}">Ir al examen final →</a>`}</div>` : `<div class="box warnbox">${pct} %: necesitas un 70 %. Repasa las lecciones y <a href="${H("quiz/" + n)}" data-reload="1">vuelve a intentarlo</a> (las preguntas cambian).</div>`; };
  return crumbs([["Inicio",""],["Curso","curso"],["Módulo " + n, "modulo/" + n],["Quiz"]]) + `<h1>Quiz del módulo ${n}: ${esc(m.t)}</h1><p class="lead">12 preguntas elegidas al azar entre ${modBank(m).length}. Necesitas un 70 %.${P.quiz[n] != null ? ` Tu mejor nota: ${P.quiz[n]} %.` : ""}</p>` + quizHTML("m-" + n, qs, "Quiz del módulo " + n);
}
function pageExamen(){
  const t = P.tries.exam || 0; const all = MODS.reduce((a, m) => a.concat(modBank(m)), []); const qs = shuffle(all, seeded("ex-" + t)).slice(0, 30);
  QUIZ.exam = qs;
  QUIZ_CB.exam = pct => { P.exam = Math.max(P.exam || 0, pct); P.tries.exam = t + 1; save();
    return pct >= 75 ? `<div class="box good">¡Examen aprobado con ${pct} %! ${certReady() ? `<a href="${H("certificado")}">Ver tu certificado</a>` : `Te falta aprobar algún quiz de módulo para el certificado: <a href="${H("progreso")}">ver progreso</a>.`}</div>` : `<div class="box warnbox">${pct} %: necesitas un 75 %. <a href="${H("examen")}" data-reload="1">Volver a intentarlo</a> (las preguntas cambian).</div>`; };
  return crumbs([["Inicio",""],["Curso","curso"],["Examen final"]]) + `<h1>Examen final</h1><p class="lead">30 preguntas de todo el curso, elegidas al azar entre ${all.length}. Necesitas un 75 %.${P.exam != null ? ` Tu mejor nota: ${P.exam} %.` : ""}</p>` + quizHTML("exam", qs, "Examen final");
}
function pageCertificado(){
  if (!certReady()) return crumbs([["Inicio",""],["Curso","curso"],["Certificado"]]) + `<h1>Certificado</h1><p>Para obtener el certificado aprueba los 7 quizzes de módulo (70 %) y el examen final (75 %).</p><ul>${MODS.map(m => `<li>${(P.quiz[m.n] || 0) >= 70 ? "✓" : "○"} <a href="${H("quiz/" + m.n)}">Quiz del módulo ${m.n}</a> ${P.quiz[m.n] != null ? `(${P.quiz[m.n]} %)` : ""}</li>`).join("")}<li>${(P.exam || 0) >= 75 ? "✓" : "○"} <a href="${H("examen")}">Examen final</a> ${P.exam != null ? `(${P.exam} %)` : ""}</li></ul>`;
  const d = new Date().toLocaleDateString("es", {day:"numeric", month:"long", year:"numeric"});
  return crumbs([["Inicio",""],["Curso","curso"],["Certificado"]]) + `<p class="noprint"><label>Tu nombre para el certificado: <input id="certname" value="${esc(P.name)}"></label> <button class="btn ghost" id="printcert">Imprimir o guardar en PDF</button></p>
  <div class="cert"><p class="kicker">Certificado de finalización</p><p>Se certifica que</p><p class="certname" id="cn">${esc(P.name) || "—"}</p><p>ha completado el curso</p><h2>Cómo dejar de tener miedo y hablar sin temor: en negocios y en otras áreas de la vida</h2><p>${MODS.length} módulos · ${ALL.length} lecciones · ≈ 46 horas · Examen final: ${P.exam} %</p><p class="meta">${d} · Certificado de autoaprendizaje sin valor académico oficial.</p></div>`;
}

// ---------- Historias ----------
function pageHistorias(){
  return crumbs([["Inicio",""],["Historias reales"]]) + `<h1>Historias reales: cómo lo hicieron</h1><p class="lead">Personas reales que tenían miedo a hablar (o tartamudeaban, o eran muy tímidas) y lo que hicieron, paso a paso. Solo usamos hechos documentados y señalamos cuando las fuentes no coinciden.</p>
  <div class="grid">${HIST.map(h => `<a class="card${P.hist[h.s] ? " done" : ""}" href="${H("historias/" + h.s)}"><p class="kicker">${esc(h.fechas || "")}</p><h3>${esc(h.n)}</h3><p class="meta">${md(h.lema || "")}</p></a>`).join("")}</div>
  <h2>¿Qué tienen en común?</h2>${body(W.COMUN || [])}`;
}
function pageHistoria(s){
  const h = histBy(s); if (!h) return nf(); P.hist[s] = true; save();
  const les = ALL.find(x => x.l.hist === s);
  return crumbs([["Inicio",""],["Historias","historias"],[h.n]]) + `<article class="prose"><h1>${esc(h.n)}</h1><p class="lead">${md(h.lema || "")}</p>${histBlock(h)}${les ? `<p><a class="btn" href="${lesHref(les.l.id)}">Lección ${esc(les.l.id)} con ejercicio y quiz</a></p>` : ""}</article>`;
}

// ---------- Reto ----------
function pageReto(){
  const now = RETO.find(d => !(P.reto[d.d] && P.reto[d.d].done));
  const weeks = [["Semana 1: bajo riesgo",1,7],["Semana 2: hablar un poco más",8,14],["Semana 3: conversaciones y peticiones",15,21],["Semana 4: situaciones importantes",22,30]];
  return crumbs([["Inicio",""],["Reto de 30 días"]]) + `<h1>Reto de 30 días</h1><p class="lead">Un reto pequeño cada día, de menos a más. Cada día anotas tu miedo antes y después (de 0 a 100) y ves cómo baja. Unos 15 minutos al día.</p>
  <div class="bar"><i style="width:${Math.round(retoDone() / 30 * 100)}%"></i></div><p class="meta">${retoDone()} de 30 días completados${now ? ` · <a href="${H("reto-30-dias/" + now.d)}">Ir al día ${now.d}</a>` : ""}</p>
  ${weeks.map(w => `<h2>${w[0]}</h2><div class="days">${RETO.filter(d => d.d >= w[1] && d.d <= w[2]).map(d => `<a class="day${P.reto[d.d] && P.reto[d.d].done ? " done" : ""}${now && now.d === d.d ? " now" : ""}" href="${H("reto-30-dias/" + d.d)}" title="${esc(d.t)}" aria-label="Día ${d.d}: ${esc(d.t)}">${d.d}</a>`).join("")}</div><ul class="meta">${RETO.filter(d => d.d >= w[1] && d.d <= w[2]).map(d => `<li>Día ${d.d}: ${esc(d.t)}</li>`).join("")}</ul>`).join("")}
  ${sudsChart()}
  <div class="box"><b>Reglas del reto:</b> elige la versión fácil o difícil según tu día; si un reto te parece imposible, haz uno más pequeño del mismo tipo (no lo saltes); no uses tus conductas de seguridad; repite un día si lo necesitas. Explicación completa en la <a href="${lesHref("7.3")}">lección 7.3</a>.</div>`;
}
function pageRetoDia(d){
  const r = RETO.find(x => x.d === d); if (!r) return nf(); const st = P.reto[d] || {};
  return crumbs([["Inicio",""],["Reto de 30 días","reto-30-dias"],["Día " + d]]) + `<article class="prose"><p class="kicker">Día ${d} de 30${st.done ? " · ✓ completado" : ""}</p><h1>${esc(r.t)}</h1>
  <div class="grid two"><div class="box good"><b>Versión fácil:</b> ${md(r.f)}</div><div class="box warm"><b>Versión difícil:</b> ${md(r.x)}</div></div>
  ${r.c ? `<p><b>Consejo:</b> ${md(r.c)}</p>` : ""}${r.l ? `<p class="meta">Lección relacionada: <a href="${lesHref(r.l)}">${esc(r.l)} ${esc((lesBy(r.l) || {l:{}}).l.t || "")}</a></p>` : ""}
  <form id="retoform" class="panel"><label class="field"><span>Miedo ANTES de hacerlo (0 = nada, 100 = máximo): <b id="av">${st.a != null ? st.a : 50}</b></span><input type="range" min="0" max="100" step="5" id="ra" value="${st.a != null ? st.a : 50}"></label>
  <label class="field"><span>Miedo DESPUÉS: <b id="bv">${st.b != null ? st.b : 50}</b></span><input type="range" min="0" max="100" step="5" id="rb" value="${st.b != null ? st.b : 50}"></label>
  <label class="field"><span>¿Qué pasó? ¿Qué temías y qué ocurrió en realidad?</span><textarea id="rn">${esc(st.n || "")}</textarea></label>
  <label class="row"><input type="checkbox" id="rv" ${st.v === "x" ? "checked" : ""}> Hice la versión difícil</label>
  <p class="row"><button class="btn" type="submit">${st.done ? "Guardar cambios" : "Completar el día " + d}</button>${st.done ? ` <button class="btn ghost" type="button" id="rundo">Desmarcar</button>` : ""}</p><p id="rmsg" aria-live="polite"></p></form>
  <nav class="pager">${d > 1 ? `<a href="${H("reto-30-dias/" + (d - 1))}">← Día ${d - 1}</a>` : "<span></span>"}${d < 30 ? `<a href="${H("reto-30-dias/" + (d + 1))}">Día ${d + 1} →</a>` : `<a href="${H("reto-30-dias")}">Ver el reto</a>`}</nav></article>`;
}
function sudsChart(){
  const pts = RETO.filter(d => P.reto[d.d] && P.reto[d.d].done && P.reto[d.d].a != null);
  if (pts.length < 2) return `<p class="meta">Cuando completes al menos 2 días verás aquí la gráfica de tu miedo antes y después.</p>`;
  const x = d => 30 + (d - 1) * (540 / 29), y = v => 10 + (100 - v) * 1.6;
  const line = k => pts.map(p => `${x(p.d).toFixed(1)},${y(P.reto[p.d][k]).toFixed(1)}`).join(" ");
  return `<figure class="chart"><figcaption>Tu miedo en el reto (0–100): <span style="color:var(--warm)">● antes</span> · <span style="color:var(--accent)">● después</span></figcaption><svg viewBox="0 0 580 190" role="img" aria-label="Gráfica del miedo antes y después en cada día del reto">
  ${[0,50,100].map(v => `<line x1="30" x2="570" y1="${y(v)}" y2="${y(v)}" stroke="currentColor" stroke-opacity=".15"/><text x="2" y="${y(v) + 4}" font-size="11" fill="currentColor" opacity=".7">${v}</text>`).join("")}
  <polyline fill="none" stroke="var(--warm)" stroke-width="2.5" points="${line("a")}"/><polyline fill="none" stroke="var(--accent)" stroke-width="2.5" points="${line("b")}"/>
  ${pts.map(p => `<circle cx="${x(p.d)}" cy="${y(P.reto[p.d].a)}" r="3.5" fill="var(--warm)"/><circle cx="${x(p.d)}" cy="${y(P.reto[p.d].b)}" r="3.5" fill="var(--accent)"/>`).join("")}
  <text x="30" y="186" font-size="11" fill="currentColor" opacity=".7">Día 1</text><text x="535" y="186" font-size="11" fill="currentColor" opacity=".7">Día 30</text></svg></figure>`;
}

// ---------- Prácticas, herramientas, simuladores ----------
function pagePracticas(){
  return crumbs([["Inicio",""],["Prácticas guiadas"]]) + `<h1>Prácticas guiadas</h1><p class="lead">10 prácticas con temporizador, guía visual y lectura en voz alta opcional (usa la voz en español de tu navegador; no hace falta internet). Si tu navegador no tiene voz, sigue el texto en pantalla.</p>
  <p><a class="btn warm" href="${H("herramientas/rutina")}">Hacer la rutina diaria de 15 minutos</a></p>
  <div class="grid">${PRAC.map(p => `<a class="card${P.prac[p.s] ? " done" : ""}" href="${H("practicas/" + p.s)}"><p class="kicker">${p.min} min${P.prac[p.s] ? ` · hecha ${P.prac[p.s]} ${P.prac[p.s] === 1 ? "vez" : "veces"}` : ""}</p><h3>${esc(p.t)}</h3><p class="meta">${esc(p.d)}</p>${evTag(p.ev)}</a>`).join("")}</div>`;
}
function pagePractica(s){
  const p = PRAC.find(x => x.s === s); if (!p) return nf();
  return crumbs([["Inicio",""],["Prácticas","practicas"],[p.t]]) + `<article class="prose"><p class="kicker">Práctica guiada · ${p.min} min</p><h1>${esc(p.t)}</h1><p class="lead">${md(p.d)}</p>${body(p.intro)}<p>${evTag(p.ev)} ${p.fuente ? `<span class="meta">${md(p.fuente)}</span>` : ""}</p><div id="player" class="panel"></div>${p.cierre ? `<div class="box">${md(p.cierre)}</div>` : ""}</article>`;
}
function pageHerramientas(){
  const list = Object.entries(TOOLS);
  return crumbs([["Inicio",""],["Herramientas"]]) + `<h1>Herramientas</h1><p class="lead">Plantillas interactivas que se guardan en tu navegador. Úsalas con las lecciones.</p>
  <div class="grid">${list.map(([k, t]) => `<a class="card${P.tools[k] ? " done" : ""}" href="${H("herramientas/" + k)}"><h3>${esc(t.t)}</h3><p class="meta">${esc(t.d)}</p>${t.l ? `<span class="tag">Lección ${esc(t.l)}</span>` : ""}</a>`).join("")}</div>
  <h2>Simuladores</h2><div class="grid">${SIMS.map(s => `<a class="card${P.sim[s.s] != null ? " done" : ""}" href="${H("simuladores/" + s.s)}"><h3>${esc(s.t)}</h3><p class="meta">${esc(s.d)}</p>${P.sim[s.s] != null ? `<span class="tag ok">Mejor: ${P.sim[s.s]} %</span>` : ""}</a>`).join("")}</div>`;
}
function pageHerramienta(k){
  const t = TOOLS[k]; if (!t) return nf();
  return crumbs([["Inicio",""],["Herramientas","herramientas"],[t.t]]) + `<article class="prose"><h1>${esc(t.t)}</h1><p class="lead">${md(t.d)}</p>${t.l ? `<p class="meta">Se usa en la lección <a href="${lesHref(t.l)}">${esc(t.l)}</a>.</p>` : ""}<div id="tool"></div></article>`;
}
function pageSimulador(s){
  const x = SIMS.find(y => y.s === s); if (!x) return nf();
  return crumbs([["Inicio",""],["Herramientas","herramientas"],["Simulador"]]) + `<article class="prose"><p class="kicker">Simulador${x.l ? ` · lección ${esc(x.l)}` : ""}</p><h1>${esc(x.t)}</h1><p class="lead">${md(x.d)}</p><div id="sim" class="panel"></div></article>`;
}

// ---------- Rutas, glosario, biblioteca, estáticas ----------
function pageRutas(){
  return crumbs([["Inicio",""],["Rutas"]]) + `<h1>Rutas de aprendizaje</h1><p class="lead">Elige un camino según tu objetivo y tu tiempo.</p>` + (W.RUTAS || []).map(r => {
    const ids = r.ids === "all" ? ALL.map(x => x.l.id) : r.ids, done = ids.filter(isDone).length;
    return `<div class="panel"><h2 style="margin-top:0">${esc(r.t)}</h2><p>${md(r.d)}</p><p class="meta">${ids.length} lecciones · ${done} completadas</p><div class="bar"><i style="width:${Math.round(done / ids.length * 100)}%"></i></div>${r.ids === "all" ? "" : `<ol class="toc">${ids.map(id => { const x = lesBy(id); return x ? `<li><span class="st${isDone(id) ? " done" : ""}">${isDone(id) ? "✓" : "○"}</span> <a href="${lesHref(id)}">${esc(id)} ${esc(x.l.t)}</a></li>` : ""; }).join("")}</ol>`}${r.extra ? `<p>${md(r.extra)}</p>` : ""}</div>`; }).join("");
}
function pageGlosario(){
  const G = (W.GLOSARIO || []).slice().sort((a, b) => a[0].localeCompare(b[0], "es"));
  const L = [...new Set(G.map(g => norm(g[0])[0].toUpperCase()))];
  return crumbs([["Inicio",""],["Glosario"]]) + `<h1>Glosario</h1><p class="lead">${G.length} términos del curso con definición sencilla, ejemplo y lección relacionada.</p><p><input type="search" id="gfilter" placeholder="Filtrar términos…" aria-label="Filtrar el glosario"></p><p class="letters">${L.map(x => `<a href="#" data-letter="${x}">${x}</a>`).join("")}</p>
  <dl class="gl">${G.map(g => `<div data-g="${esc(norm(g[0] + " " + g[1]))}"><dt data-l="${norm(g[0])[0].toUpperCase()}" id="g-${esc(norm(g[0]).replace(/ /g, "-"))}">${esc(g[0])}</dt><dd>${md(g[1])}${g[2] ? `<br><i>Ejemplo:</i> ${md(g[2])}` : ""}${g[3] ? ` · <a href="${lesHref(g[3])}">Lección ${esc(g[3])}</a>` : ""}</dd></div>`).join("")}</dl>`;
}
function pageBiblioteca(){
  const B = W.BIBLIO || {};
  const sec = (t, arr) => arr && arr.length ? `<h2>${t}</h2><ul>${arr.map(x => `<li>${md(x)}</li>`).join("")}</ul>` : "";
  return crumbs([["Inicio",""],["Biblioteca"]]) + `<h1>Biblioteca</h1><p class="lead">Libros, estudios y charlas citados en el curso.</p>${sec("Libros", B.libros)}${sec("Estudios científicos", B.estudios)}${sec("Charlas y videos", B.charlas)}${sec("Organizaciones", B.org)}`;
}
function pageStatic(k){
  const s = (W.PAGINAS || {})[k]; if (!s) return nf();
  return crumbs([["Inicio",""],[s[0]]]) + `<article class="prose"><h1>${esc(s[0])}</h1>${body(s[1])}</article>`;
}

// ---------- Progreso ----------
function pageProgreso(){
  const on = badgesOn().map(b => b[0]);
  return crumbs([["Inicio",""],["Progreso"]]) + `<h1>Tu progreso</h1><p class="lead">Todo se guarda solo en este navegador.</p>
  <div class="grid three"><div class="panel"><p class="kicker">Curso</p><p class="bignum">${coursePct()} %</p><p class="meta">${ALL.filter(x => isDone(x.l.id)).length} de ${ALL.length} lecciones</p></div><div class="panel"><p class="kicker">Reto de 30 días</p><p class="bignum">${retoDone()}/30</p><p class="meta">días completados</p></div><div class="panel"><p class="kicker">Insignias</p><p class="bignum">${on.length}/${BADGES.length}</p><p class="meta">${certReady() ? `<a href="${H("certificado")}">Ver certificado</a>` : "Certificado pendiente"}</p></div></div>
  <h2>Por módulo</h2><div class="tablewrap"><table><thead><tr><th>Módulo</th><th>Lecciones</th><th>Quiz (mejor nota)</th></tr></thead><tbody>${MODS.map(m => `<tr><td><a href="${H("modulo/" + m.n)}">${m.n}. ${esc(m.t)}</a></td><td>${m.L.filter(l => isDone(l.id)).length}/${m.L.length}<div class="bar"><i style="width:${modPct(m)}%"></i></div></td><td>${P.quiz[m.n] != null ? P.quiz[m.n] + " %" + (P.quiz[m.n] >= 70 ? " ✓" : "") : "—"}</td></tr>`).join("")}<tr><td><a href="${H("examen")}">Examen final</a></td><td></td><td>${P.exam != null ? P.exam + " %" + (P.exam >= 75 ? " ✓" : "") : "—"}</td></tr></tbody></table></div>
  ${sudsChart()}
  <h2>Insignias</h2><div class="grid">${BADGES.map(b => `<div class="card badge${on.includes(b[0]) ? " on" : ""}"><h3>${on.includes(b[0]) ? "★" : "☆"} ${esc(b[1])}</h3><p class="meta">${esc(b[2])}</p></div>`).join("")}</div>
  <h2>Guardar o mover tu progreso</h2><p>Puedes descargar tu progreso en un archivo y cargarlo en otro navegador o equipo.</p>
  <p class="row"><button class="btn ghost" id="export">Descargar mi progreso</button> <label class="btn ghost">Cargar un archivo <input type="file" id="import" accept="application/json,.json" hidden></label> <button class="btn ghost" id="reset">Borrar todo mi progreso</button></p><p id="pmsg" aria-live="polite"></p>`;
}

// ---------- Buscador ----------
let IDX = null;
function buildIndex(){
  IDX = [];
  const flat = arr => (arr || []).map(b => typeof b === "string" ? b : Array.isArray(b) ? b.join(" ") : b.ol ? b.ol.join(" ") : b.box || b.quote || (b.table ? b.table.flat().join(" ") : "")).join(" ");
  ALL.forEach(x => IDX.push({k:"Lección " + x.l.id, t:x.l.t, h:lesHref(x.l.id), s:[x.l.sit, (x.l.obj || []).join(" "), (x.l.temas || []).join(" "), flat(x.l.txt), x.l.clave, x.l.ej && x.l.ej.t, (x.l.pasos || []).join(" "), (x.l.err || []).join(" "), x.l.ejer].join(" ")}));
  HIST.forEach(h => IDX.push({k:"Historia real", t:h.n, h:H("historias/" + h.s), s:[h.lema, h.quien, h.miedo, h.momento, h.pasos.join(" "), h.resultado, h.copiar.join(" ")].join(" ")}));
  RETO.forEach(d => IDX.push({k:"Reto, día " + d.d, t:d.t, h:H("reto-30-dias/" + d.d), s:[d.f, d.x, d.c].join(" ")}));
  PRAC.forEach(p => IDX.push({k:"Práctica guiada", t:p.t, h:H("practicas/" + p.s), s:[p.d, flat(p.intro)].join(" ")}));
  Object.entries(TOOLS).forEach(([k, t]) => IDX.push({k:"Herramienta", t:t.t, h:H("herramientas/" + k), s:t.d}));
  SIMS.forEach(s => IDX.push({k:"Simulador", t:s.t, h:H("simuladores/" + s.s), s:s.d}));
  (W.GLOSARIO || []).forEach(g => IDX.push({k:"Glosario", t:g[0], h:H("glosario/" + norm(g[0]).replace(/ /g, "-")), s:g[1] + " " + (g[2] || "")}));
  Object.entries(W.PAGINAS || {}).forEach(([k, p]) => IDX.push({k:"Página", t:p[0], h:H(k), s:flat(p[1])}));
  IDX.forEach(x => { x.nt = norm(x.t); x.ns = norm(x.s); });
}
const STOP = new Set("a al ante con de del el en es la las lo los me mi mis o para por que se si su sus te tu un una y como cuando muy mas pero yo hay ser esta este esto".split(" "));
function quickAnswer(q){
  const nq = norm(q), qt = nq.split(" ").filter(w => w && !STOP.has(w)); let best = null, bs = 0;
  (W.RESPUESTAS || []).forEach(r => r.f.forEach(f => { const nf = norm(f), ft = nf.split(" ").filter(w => w && !STOP.has(w));
    let sc = nq.includes(nf) || nf.includes(nq) && nq.length > 6 ? 1 : 0;
    if (!sc && ft.length){ const hit = ft.filter(w => qt.some(t => t === w || (t.length > 4 && w.length > 4 && (t.startsWith(w.slice(0, 5)) || w.startsWith(t.slice(0, 5)))))).length; sc = hit / Math.max(ft.length, qt.length); }
    if (sc > bs){ bs = sc; best = r; } }));
  return bs >= .6 ? best : null;
}
function search(q){
  if (!IDX) buildIndex();
  const terms = norm(q).split(" ").filter(w => w && !STOP.has(w)); if (!terms.length) return [];
  return IDX.map(x => { let sc = 0; terms.forEach(t => { if (x.nt.includes(t)) sc += 5; const m = x.ns.split(t).length - 1; sc += Math.min(m, 5); }); if (terms.every(t => x.nt.includes(t) || x.ns.includes(t))) sc += 6; return [sc, x]; }).filter(r => r[0] > 0).sort((a, b) => b[0] - a[0]).slice(0, 40);
}
function snippet(x, q){
  const terms = norm(q).split(" ").filter(w => w.length > 2 && !STOP.has(w)); const src = String(x.s || ""); const ns = norm(src);
  let pos = -1; for (const t of terms){ pos = ns.indexOf(t); if (pos >= 0) break; }
  let s = pos < 0 ? src.slice(0, 180) : src.slice(Math.max(0, pos - 70), pos + 140); s = esc(s.replace(/\*\*|\*|\[\[[^|]*\||\]\]/g, ""));
  terms.forEach(t => { s = s.replace(new RegExp("(" + t.split("").map(ch => ch.replace(/[a-z]/, c => `[${c}${({a:"á",e:"é",i:"í",o:"ó",u:"úü",n:"ñ"})[c] || ""}]`)).join("") + ")", "gi"), "<mark>$1</mark>"); });
  return (pos > 70 ? "…" : "") + s + "…";
}
function pageBuscar(q){
  const res = q ? search(q) : [], qa = q ? quickAnswer(q) : null;
  return crumbs([["Inicio",""],["Buscar"]]) + `<h1>Buscar en el curso</h1><form id="bigsearch" class="row" role="search"><input id="bq" type="search" value="${esc(q)}" placeholder="Ejemplo: me tiembla la voz, pedir un aumento, decir que no…" aria-label="Buscar" style="flex:1;min-width:0"><button class="btn">Buscar</button></form>
  ${qa ? `<div class="answer" role="region" aria-label="Respuesta rápida"><p class="kicker">Respuesta rápida</p><h2 style="margin-top:.2rem">${esc(qa.t)}</h2>${body(qa.r)}<p><a class="btn" href="${H(qa.h)}">${esc(qa.ht || "Ir a la lección")}</a></p></div>` : ""}
  ${q ? `<p class="meta">${res.length} resultados para «${esc(q)}»</p><ul class="results">${res.map(r => `<li><a href="${r[1].h}"><b>${esc(r[1].t)}</b></a> <span class="tag">${esc(r[1].k)}</span><br><span class="meta">${snippet(r[1], q)}</span></li>`).join("")}</ul>` : `<p>Prueba con: ${["me quedé en blanco","me tiembla la voz","tengo una presentación mañana","cómo pedir un aumento","cómo decir que no","miedo a llamar por teléfono","negociar un precio"].map(s => `<a href="${H("buscar/" + encodeURIComponent(s))}">${s}</a>`).join(" · ")}</p>`}`;
}
const nf = () => `<h1>Página no encontrada</h1><p>La página que buscas no existe. <a href="${H("")}">Volver al inicio</a>.</p>`;

// ---------- Navegación ----------
const NAV = [["curso","Curso"],["historias","Historias"],["reto-30-dias","Reto 30 días"],["practicas","Prácticas"],["herramientas","Herramientas"],["progreso","Progreso"]];
const MENU = [["curso","Curso completo"],...MODS.map(m => ["modulo/" + m.n, m.n + ". " + m.t]),["historias","Historias reales"],["reto-30-dias","Reto de 30 días"],["practicas","Prácticas guiadas"],["herramientas","Herramientas y simuladores"],["rutas","Rutas"],["glosario","Glosario"],["biblioteca","Biblioteca"],["examen","Examen final"],["progreso","Progreso e insignias"],["evidencia","Cómo clasificamos la evidencia"],["pedir-ayuda","Cuándo pedir ayuda"]];
function renderNav(top){
  document.getElementById("mainnav").innerHTML = NAV.map(n => `<a href="${H(n[0])}" class="${top === n[0] ? "on" : ""}">${n[1]}</a>`).join("");
  document.getElementById("menulist").innerHTML = MENU.map(n => `<a href="${H(n[0])}" class="${top === n[0].split("/")[0] ? "on" : ""}">${esc(n[1])}</a>`).join("");
  document.querySelectorAll(".bottombar a").forEach(a => a.classList.toggle("on", a.getAttribute("href") === H(top)));
}
let cleanup = null;
function route(){
  if (cleanup){ try { cleanup(); } catch(e){} cleanup = null; }
  const raw = location.hash.replace(/^#\/?/, ""); const parts = raw.split("/").map(x => { try { return decodeURIComponent(x); } catch(e){ return x; } }); const [a, b, c] = parts;
  let html, after = null, anchor = null;
  switch (a || ""){
    case "": html = pageHome(); break;
    case "curso": html = pageCurso(); break;
    case "modulo": html = pageModulo(+b); break;
    case "leccion": html = pageLeccion(+b, (+c || 1) - 1); break;
    case "quiz": html = pageQuiz(+b); break;
    case "examen": html = pageExamen(); break;
    case "certificado": html = pageCertificado(); break;
    case "historias": html = b ? pageHistoria(b) : pageHistorias(); break;
    case "reto-30-dias": html = b ? pageRetoDia(+b) : pageReto(); break;
    case "practicas": html = b ? pagePractica(b) : pagePracticas();
      if (b && HS.practica){ const p = PRAC.find(x => x.s === b); if (p) after = () => { cleanup = HS.practica(app.querySelector("#player"), p, () => { P.prac[p.s] = (P.prac[p.s] || 0) + 1; save(); }); }; } break;
    case "herramientas": html = b ? pageHerramienta(b) : pageHerramientas();
      if (b && TOOLS[b]) after = () => { const t = TOOLS[b]; const el = app.querySelector("#tool"); const ctx = {get:() => P.tools[b], set:v => { P.tools[b] = v; save(); }, all:() => P.tools, P, save, H, esc, md, lesHref, RETO, retoNow:() => RETO.find(d => !(P.reto[d.d] && P.reto[d.d].done))};
        el.innerHTML = t.render(ctx); const cl = t.bind && t.bind(el, ctx); if (typeof cl === "function") cleanup = cl; }; break;
    case "simuladores": html = pageSimulador(b);
      if (HS.simulador){ const s = SIMS.find(x => x.s === b); if (s) after = () => HS.simulador(app.querySelector("#sim"), s, pct => { P.sim[s.s] = Math.max(P.sim[s.s] || 0, pct); save(); }); } break;
    case "rutas": html = pageRutas(); break;
    case "glosario": html = pageGlosario(); if (b) anchor = "g-" + b; break;
    case "biblioteca": html = pageBiblioteca(); break;
    case "progreso": html = pageProgreso(); break;
    case "buscar": html = pageBuscar(parts.slice(1).join("/")); break;
    default: html = (W.PAGINAS || {})[a] ? pageStatic(a) : nf();
  }
  app.innerHTML = html; renderNav(a || "");
  document.title = (app.querySelector("h1") ? app.querySelector("h1").textContent + " · " : "") + "Hablar sin miedo";
  document.getElementById("menu").hidden = true; document.getElementById("menubtn").setAttribute("aria-expanded", "false");
  bindPage(); if (after) after();
  if (anchor){ const el = document.getElementById(anchor); if (el){ el.scrollIntoView(); return; } }
  window.scrollTo(0, 0); app.focus({preventScroll:true});
}
function bindPage(){
  bindQuizzes();
  const cf = app.querySelector("form[data-case]"); if (cf){ const parts = location.hash.split("/"), m = MODS.find(x => x.n === +parts[2]), l = m && m.L[(+parts[3] || 1) - 1], c = l && l.caso;
    if (c) cf.onsubmit = ev => { ev.preventDefault(); const v = cf.querySelector("input:checked"); if (!v) return; const ok = +v.value === c[2]; const fbx = cf.querySelector("#casefb"); fbx.className = "fb " + (ok ? "okc" : "bad"); fbx.innerHTML = (ok ? "Buena elección. " : `La mejor opción es: <b>${md(c[1][c[2]])}</b>. `) + md(c[3]); }; }
  app.querySelectorAll("[data-done]").forEach(b => b.onclick = () => { const id = b.dataset.done; P.les[id] = Object.assign(P.les[id] || {}, {done:true}); save(); route(); });
  app.querySelectorAll("[data-undone]").forEach(b => b.onclick = () => { const id = b.dataset.undone; if (P.les[id]) P.les[id].done = false; save(); route(); });
  app.querySelectorAll("[data-reload]").forEach(a => a.onclick = ev => { ev.preventDefault(); route(); });
  app.querySelectorAll("[data-letter]").forEach(x => x.onclick = ev => { ev.preventDefault(); const d = app.querySelector(`dt[data-l="${x.dataset.letter}"]`); if (d) d.scrollIntoView(); });
  const gf = app.querySelector("#gfilter"); if (gf) gf.oninput = () => { const v = norm(gf.value); app.querySelectorAll("[data-g]").forEach(d => d.hidden = v && !d.dataset.g.includes(v)); };
  const bs = app.querySelector("#bigsearch"); if (bs){ bs.onsubmit = ev => { ev.preventDefault(); location.hash = "#/buscar/" + encodeURIComponent(app.querySelector("#bq").value.trim()); }; if (!app.querySelector("#bq").value) app.querySelector("#bq").focus(); }
  const rf = app.querySelector("#retoform"); if (rf){ const d = +location.hash.split("/")[2]; const ra = rf.querySelector("#ra"), rb = rf.querySelector("#rb");
    ra.oninput = () => rf.querySelector("#av").textContent = ra.value; rb.oninput = () => rf.querySelector("#bv").textContent = rb.value;
    rf.onsubmit = ev => { ev.preventDefault(); P.reto[d] = {done:true, a:+ra.value, b:+rb.value, n:rf.querySelector("#rn").value, v:rf.querySelector("#rv").checked ? "x" : "f", f:new Date().toISOString().slice(0, 10)}; save();
      const drop = +ra.value - +rb.value; rf.querySelector("#rmsg").innerHTML = `<span class="okc">¡Día ${d} completado!</span> ${drop > 0 ? `Tu miedo bajó ${drop} puntos.` : drop < 0 ? "Esta vez el miedo subió: es normal al principio. Repite un reto parecido mañana." : ""} ${d < 30 ? `<a href="${H("reto-30-dias/" + (d + 1))}">Ver el día ${d + 1}</a>` : `<a href="${H("progreso")}">Ver tu progreso</a>`}`; };
    const ru = rf.querySelector("#rundo"); if (ru) ru.onclick = () => { delete P.reto[d]; save(); route(); }; }
  const cn = app.querySelector("#certname"); if (cn) cn.oninput = () => { P.name = cn.value; save(); app.querySelector("#cn").textContent = cn.value || "—"; };
  const pc = app.querySelector("#printcert"); if (pc) pc.onclick = () => window.print();
  const ex = app.querySelector("#export"); if (ex) ex.onclick = () => { const blob = new Blob([JSON.stringify(P, null, 1)], {type:"application/json"}); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "hablar-sin-miedo-progreso.json"; document.body.appendChild(a); a.click(); a.remove(); };
  const im = app.querySelector("#import"); if (im) im.onchange = () => { const f = im.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { try { const d = JSON.parse(r.result); if (typeof d !== "object" || !d || !d.les) throw 0; P = Object.assign(blank(), d); save(); route(); app.querySelector("#pmsg").innerHTML = `<span class="okc">Progreso cargado.</span>`; } catch(e){ app.querySelector("#pmsg").innerHTML = `<span class="bad">El archivo no es un progreso válido de este curso.</span>`; } }; r.readAsText(f); };
  const rs = app.querySelector("#reset"); if (rs) rs.onclick = () => { if (confirm("¿Borrar todo tu progreso guardado en este navegador? No se puede deshacer.")){ P = blank(); try { localStorage.removeItem(PKEY); } catch(e){} route(); } };
}

// ---------- Cabecera ----------
document.getElementById("searchform").onsubmit = ev => { ev.preventDefault(); const q = document.getElementById("q").value.trim(); location.hash = "#/buscar/" + encodeURIComponent(q); };
const themeBtn = document.getElementById("theme");
const isDark = () => (document.documentElement.getAttribute("data-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")) === "dark";
const setTheme = t => { if (t) document.documentElement.setAttribute("data-theme", t); else document.documentElement.removeAttribute("data-theme"); store.set(TKEY, t); themeBtn.textContent = isDark() ? "☀" : "☾"; themeBtn.setAttribute("aria-label", isDark() ? "Cambiar a modo claro" : "Cambiar a modo oscuro"); };
setTheme(store.get(TKEY, ""));
themeBtn.onclick = () => setTheme(isDark() ? "light" : "dark");
document.getElementById("menubtn").onclick = () => { const m = document.getElementById("menu"), b = document.getElementById("menubtn"); m.hidden = !m.hidden; b.setAttribute("aria-expanded", String(!m.hidden)); };
window.addEventListener("hashchange", route);
W.__HSM = {MODS, ALL, P: () => P};
route();
})();
