// Motor del curso «Robótica y Electrónica» (solo en español). Sin servidor ni dependencias.
(function(){
"use strict";
const C = window.CURSO || {modulos: []}, X = window.EXTRA || {}, T = window.TOOLS || [], SVG = window.SVG || {};
const NIV = X.NIVELES || [];
const MODS = C.modulos.slice().sort((a, b) => a.id.localeCompare(b.id));
const app = document.getElementById("app");

// ---------- utilidades ----------
const store = { get(k, d){ try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch(e){ return d; } },
                set(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} } };
const PKEY = "robotica-progreso", TKEY = "robotica-tema";
const vacio = () => ({lecciones:{}, miniquiz:{}, quiz:{}, proyectos:{}, notas:{}, ultima:null, dias:[], examen:null, nombre:""});
let P = Object.assign(vacio(), store.get(PKEY, {}));
const save = () => store.set(PKEY, P);
const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const md = s => esc(s)
  .replace(/`([^`]+)`/g, "<code>$1</code>")
  .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
  .replace(/(^|[^*])\*([^*\s][^*]*?)\*/g, "$1<i>$2</i>")
  .replace(/\[([^\]]+)\]\((#\/[^)\s]*)\)/g, '<a href="$2">$1</a>');
const H = p => "#/" + p;
const norm = s => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const fmt = n => String(Math.round(n * 100) / 100).replace(".", ",");
const pct = (a, b) => b ? Math.round(100 * a / b) : 0;
const bar = (p, c) => `<div class="bar" role="img" aria-label="${p} % completado"${c ? ` style="--c:${c}"` : ""}><i style="width:${p}%"></i></div>`;
const hoy = () => new Date().toISOString().slice(0, 10);
const nivel = n => NIV.find(x => x.n === n) || {n, t: "Nivel " + n, color: "var(--accent)", d: "", obj: []};
const col = n => `var(--n${n})`;

// ---------- modelo ----------
MODS.forEach(m => m.L.forEach((l, i) => { l.id = m.id + "-" + (i + 1); l.i = i; l.m = m; }));
const LES = MODS.flatMap(m => m.L);
const mod = id => MODS.find(m => m.id === id);
const les = id => LES.find(l => l.id === id);
// Horas del módulo = lecciones + evaluación (quiz 0,5 h + proyecto; M26: examen final 1,5 h).
const modHoras = m => m.L.reduce((s, l) => s + l.h, 0) + (m.he != null ? m.he : 0.5 + ((m.pj && m.pj.h) || 0));
const done = l => !!P.lecciones[l.id];
const modDone = m => m.L.filter(done).length;
const pjDone = m => { const c = (m.pj && m.pj.crit) || []; const v = P.proyectos[m.id] || []; return c.length > 0 && c.every((_, i) => v[i]); };
const quizOk = m => ((P.quiz[m.id] || {}).mejor || 0) >= 70;
const modEstado = m => { const d = modDone(m); if (d === m.L.length && quizOk(m) && pjDone(m)) return "completado"; if (d > 0 || P.quiz[m.id] || (P.proyectos[m.id] || []).some(Boolean)) return "en curso"; return "disponible"; };
const TOTAL = LES.length;
const totDone = () => LES.filter(done).length;
const horasHechas = () => LES.filter(done).reduce((s, l) => s + l.h, 0);
const racha = () => { const d = new Set(P.dias); let n = 0; const t = new Date(); for (;;){ const k = t.toISOString().slice(0, 10); if (d.has(k)) { n++; t.setDate(t.getDate() - 1); } else break; } return n; };
const marcarDia = () => { const d = hoy(); if (!P.dias.includes(d)) { P.dias.push(d); if (P.dias.length > 400) P.dias = P.dias.slice(-400); } };

// ---------- insignias ----------
const modsOk = ids => ids.every(id => { const m = mod(id); return m && modDone(m) === m.L.length; });
const BADGES = [
  ["💡", "Primer LED", "Completa la lección de la ley de Ohm (M03, lección 3).", () => !!P.lecciones["M03-3"]],
  ["Ω", "Ohm dominado", "Completa el módulo M03.", () => modsOk(["M03"])],
  ["🔥", "Soldador", "Completa el módulo M06.", () => modsOk(["M06"])],
  ["⌨️", "Programador", "Completa el módulo M07.", () => modsOk(["M07"])],
  ["🔌", "Arduinista", "Completa el módulo M08.", () => modsOk(["M08"])],
  ["📡", "Comunicador", "Completa el módulo M11.", () => modsOk(["M11"])],
  ["🌡️", "Sensorial", "Completa M12 y M13.", () => modsOk(["M12", "M13"])],
  ["⚙️", "Motorizado", "Completa el módulo M14.", () => modsOk(["M14"])],
  ["🤖", "Constructor", "Completa la lista de un proyecto del Nivel 4.", () => ["M17", "M18", "M19", "M20", "M21"].some(id => { const m = mod(id); return m && pjDone(m); })],
  ["👁️", "Visión artificial", "Completa el módulo M22.", () => modsOk(["M22"])],
  ["🛡️", "Seguro", "Completa el módulo M25.", () => modsOk(["M25"])],
  ["🎓", "Ingeniero", "Completa todas las lecciones y aprueba el examen final.", () => totDone() === TOTAL && (P.examen || 0) >= 70],
  ["🔥", "Racha de 7 días", "Estudia 7 días seguidos.", () => racha() >= 7],
  ["✅", "Quiz perfecto", "Saca 100 % en un quiz de módulo.", () => Object.values(P.quiz).some(q => q.mejor === 100)]
];

// ---------- quizzes ----------
function rng(seed){ let s = 0; for (const c of String(seed)) s = (s * 31 + c.charCodeAt(0)) >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
function shuffle(a, r){ a = a.slice(); for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
// Pregunta: [enunciado, opciones[] | {n, tol, u}, correcta, explicación]
function prep(q, r){
  const [e, o, c, x] = q;
  if (!Array.isArray(o)) return {e, num: o, x};
  if (o.length <= 2 || !r) return {e, o, c, x};
  const idx = shuffle(o.map((_, i) => i), r);
  return {e, o: idx.map(i => o[i]), c: idx.indexOf(c), x};
}
function quizHTML(qs, id){
  return `<form class="quiz" id="${id}" novalidate>` + qs.map((q, i) => `<fieldset class="q" data-i="${i}"><legend><b>${i + 1}. ${md(q.e)}</b></legend>` +
    (q.num ? `<label>Tu respuesta${q.num.u ? " (" + esc(q.num.u) + ")" : ""}: <input class="input" type="text" inputmode="decimal" name="${id}-${i}" autocomplete="off"></label>`
           : q.o.map((o, j) => `<label><input type="radio" name="${id}-${i}" value="${j}"> ${md(o)}</label>`).join("")) +
    `<div class="fb" aria-live="polite"></div></fieldset>`).join("") +
    `<div class="row"><button class="btn" type="submit">Comprobar respuestas</button><span class="res" aria-live="polite"></span></div></form>`;
}
function bindQuiz(form, qs, onScore){
  if (!form) return;
  form.onsubmit = ev => {
    ev.preventDefault(); let ok = 0;
    qs.forEach((q, i) => {
      const fs = form.querySelector(`[data-i="${i}"]`), fb = fs.querySelector(".fb"); let right = false, given = "";
      if (q.num){ const v = parseFloat(String(fs.querySelector("input").value).replace(",", ".").replace(/[^\d.\-eE]/g, ""));
        given = isNaN(v) ? "" : v; const tol = q.num.tol == null ? 0.02 : q.num.tol; right = !isNaN(v) && Math.abs(v - q.num.n) <= Math.max(Math.abs(q.num.n) * tol, 1e-9); }
      else { const ch = fs.querySelector("input:checked"); given = ch ? +ch.value : ""; right = given === q.c; }
      if (right) ok++;
      fs.classList.toggle("right", right); fs.classList.toggle("wrong", !right);
      const sol = q.num ? `${fmt(q.num.n)}${q.num.u ? " " + q.num.u : ""}` : q.o[q.c];
      fb.className = "fb " + (right ? "ok" : "no");
      fb.innerHTML = (right ? "✔ Correcto. " : (given === "" ? "Sin responder. " : "✘ Incorrecto. ") + `Respuesta: <b>${md(sol)}</b>. `) + md(q.x || "");
    });
    const p = pct(ok, qs.length), res = form.querySelector(".res");
    res.className = "res result " + (p >= 70 ? "ok" : "no"); res.textContent = `${ok} de ${qs.length} (${p} %)`;
    if (onScore) onScore(p, res);
  };
}

// ---------- buscador ----------
const IDX = [];
// Texto normalizado con palabras separadas por espacios: se busca « término» para coincidir al inicio de palabra
// («ohm» encuentra «ohmios», pero «pid» no encuentra «rápido»).
const palabras = s => " " + norm(s).replace(/[^a-z0-9ñ]+/g, " ") + " ";
function addIdx(k, t, h, txt, lvl){ IDX.push({k, t, h, txt: String(txt || ""), lvl, nt: palabras(t), nx: palabras(txt || "")}); }
MODS.forEach(m => {
  addIdx("Módulo", `${m.id}. ${m.t}`, H("modulo/" + m.id), [m.d, ...(m.obj || [])].join(" "), m.n);
  m.L.forEach(l => addIdx("Lección", `${l.id.replace("-", ".")} ${l.t}`, H("leccion/" + l.id), [l.p, ...(l.o || []), ...(l.x || []), l.k, l.c ? l.c.t : "", ...(l.er || [])].join(" "), m.n));
});
(X.GLOSARIO || []).forEach(g => addIdx("Término", g[0], H("glosario/" + encodeURIComponent(g[0])), g[1]));
(X.COMPONENTES || []).forEach(c => addIdx("Componente", c.t, H("componentes/" + c.id), [c.d, c.uso, ...(c.pines || []), ...(c.ojo || [])].join(" ")));
(X.FALLAS || []).forEach((f, i) => addIdx("Solución de problemas", f.s, H("solucion-de-problemas/" + i), [...f.c, ...f.r].join(" ")));
T.forEach(t => addIdx("Herramienta", t.t, H("herramientas/" + t.id), t.d));
function buscar(q){
  const terms = palabras(q).trim().split(/\s+/).filter(w => w.length > 1); if (!terms.length) return [];
  return IDX.map(e => { let s = 0;
    for (const t of terms){ const w = " " + t; const inT = e.nt.includes(w), inX = e.nx.includes(w); if (!inT && !inX) return null; s += inT ? 10 : 0; if (inX) s += Math.min(5, e.nx.split(w).length - 1); }
    if (e.nt.includes(" " + terms.join(" "))) s += 15; if (e.k === "Lección") s += 1; return {e, s}; })
    .filter(Boolean).sort((a, b) => b.s - a.s);
}
function snippet(txt, q){
  const n = norm(txt), w = norm(q).split(/\s+/).filter(x => x.length > 1)[0] || ""; let i = w ? n.indexOf(w) : -1; if (i < 0) i = 0;
  const a = Math.max(0, i - 70); let s = txt.slice(a, a + 200).replace(/[*`]/g, "");
  s = esc((a > 0 ? "…" : "") + s + (txt.length > a + 200 ? "…" : ""));
  norm(q).split(/\s+/).filter(x => x.length > 1).forEach(t => { const re = new RegExp("(" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").split("").map(ch => ({a:"[aá]",e:"[eé]",i:"[ií]",o:"[oó]",u:"[uúü]",n:"[nñ]"}[ch] || ch)).join("") + ")", "gi"); s = s.replace(re, "<mark>$1</mark>"); });
  return s;
}

// ---------- piezas de página ----------
const crumbs = a => `<nav class="crumbs" aria-label="Migas de pan">${a.map(x => Array.isArray(x) ? `<a href="${x[1]}">${esc(x[0])}</a>` : esc(x)).join(" › ")}</nav>`;
const estadoPill = e => `<span class="pill${e === "completado" ? " ok" : ""}">${e}</span>`;
const modCard = m => { const d = modDone(m), e = modEstado(m);
  return `<a class="card lvl" style="--c:${col(m.n)}" href="${H("modulo/" + m.id)}"><span class="meta">${m.id} · Nivel ${m.n}</span><h3>${esc(m.t)}</h3>
  <p class="meta">${m.L.length} lecciones · ${fmt(modHoras(m))} h</p>${bar(pct(d, m.L.length), col(m.n))}<span class="meta">${d}/${m.L.length}</span> ${estadoPill(e)}</a>`; };
const lista = a => a && a.length ? `<ul>${a.map(x => `<li>${md(x)}</li>`).join("")}</ul>` : "";
const codeBlock = c => `<div class="codewrap"><div class="lang">${esc(c.l === "py" ? "Python" : c.l === "sh" ? "Terminal (Linux)" : c.l === "html" ? "HTML" : c.l === "txt" ? "Texto" : "Arduino (C++)")}</div><button class="copy noprint" type="button" data-copy>Copiar</button><pre class="code"><code>${esc(c.t)}</code></pre></div>`;
const diagram = k => SVG[k] ? `<figure class="diagram">${SVG[k].svg}<figcaption>${esc(SVG[k].t)}</figcaption></figure>` : "";

// ---------- páginas ----------
function pageInicio(){
  const last = P.ultima && les(P.ultima), next = LES.find(l => !done(l)) || LES[0], d = totDone();
  return `<section class="hero"><h1>Robótica, electrónica, hardware y software</h1>
  <p class="lead">Aprende a construir cosas con electricidad y código: desde tu primer LED hasta robots que ven, aprenden y se mueven solos. Curso completo en español, paso a paso, sin conocimientos previos.</p>
  <div class="row">${last ? `<a class="btn" href="${H("leccion/" + last.id)}">Continuar: ${esc(last.t)}</a>` : `<a class="btn" href="${H("leccion/" + next.id)}">Empezar el curso</a>`}<a class="btn alt" href="${H("curso")}">Ver el mapa del curso</a><a class="btn alt" href="${H("rutas")}">Elegir una ruta</a></div>
  <div class="stats"><div class="stat"><b>${NIV.length}</b>niveles</div><div class="stat"><b>${MODS.length}</b>módulos</div><div class="stat"><b>${TOTAL}</b>lecciones</div><div class="stat"><b>${fmt(MODS.reduce((s, m) => s + modHoras(m), 0))} h</b>estimadas</div><div class="stat"><b>${pct(d, TOTAL)} %</b>tu avance</div></div>
  ${bar(pct(d, TOTAL))}</section>
  <h2>Los niveles del curso</h2><div class="grid">${NIV.map(n => { const ms = MODS.filter(m => m.n === n.n), tl = ms.reduce((s, m) => s + m.L.length, 0), dl = ms.reduce((s, m) => s + modDone(m), 0);
    return `<a class="card lvl" style="--c:${col(n.n)}" href="${H("nivel/" + n.n)}"><span class="meta">Nivel ${n.n}</span><h3>${esc(n.t)}</h3><p class="meta">${esc(n.d)}</p><p class="meta">${ms.length} módulos · ${tl} lecciones · ${fmt(ms.reduce((s, m) => s + modHoras(m), 0))} h</p>${bar(pct(dl, tl), col(n.n))}</a>`; }).join("")}</div>
  <h2>Cinco robots que vas a construir</h2><div class="grid">${["M17", "M18", "M19", "M20", "M21"].map(mod).filter(Boolean).map(modCard).join("")}</div>
  <div class="box warn"><h3>⚠️ Antes de empezar</h3><p>Todas las prácticas usan pilas, baterías o USB (12 V o menos). <b>Nunca</b> se trabaja con el enchufe de la pared. Lee las <a href="${H("seguridad")}">normas de seguridad</a> y, si eres menor de edad, trabaja con un adulto.</p></div>
  <h2>Herramientas rápidas</h2><div class="grid">${T.slice(0, 4).map(t => `<a class="card" href="${H("herramientas/" + t.id)}"><h3>${esc(t.t)}</h3><p class="meta">${esc(t.d)}</p></a>`).join("")}</div>`;
}
function pageCurso(){
  return crumbs([["Inicio", H("")], "Mapa del curso"]) + `<h1>Mapa del curso</h1><p class="lead">${NIV.length} niveles, ${MODS.length} módulos y ${TOTAL} lecciones. No hay bloqueos: puedes empezar por donde quieras, aunque se recomienda seguir el orden.</p>` +
    NIV.map(n => `<h2 style="color:${col(n.n)}">Nivel ${n.n}. ${esc(n.t)}</h2><p class="meta">${esc(n.d)}</p><div class="grid">${MODS.filter(m => m.n === n.n).map(modCard).join("")}</div>`).join("");
}
function pageNivel(n){
  const N = nivel(+n), ms = MODS.filter(m => m.n === +n); if (!ms.length) return notFound();
  return crumbs([["Curso", H("curso")], "Nivel " + n]) + `<h1 style="color:${col(N.n)}">Nivel ${N.n}. ${esc(N.t)}</h1><p class="lead">${esc(N.d)}</p>
  <div class="stats"><div class="stat"><b>${ms.length}</b>módulos</div><div class="stat"><b>${ms.reduce((s, m) => s + m.L.length, 0)}</b>lecciones</div><div class="stat"><b>${fmt(ms.reduce((s, m) => s + modHoras(m), 0))} h</b>estimadas</div></div>
  <h2>Al terminar este nivel podrás…</h2>${lista(N.obj)}<h2>Módulos</h2><div class="grid">${ms.map(modCard).join("")}</div>
  <div class="row">${+n > 0 ? `<a class="btn alt" href="${H("nivel/" + (+n - 1))}">← Nivel anterior</a>` : ""}${+n < NIV.length - 1 ? `<a class="btn alt" href="${H("nivel/" + (+n + 1))}">Nivel siguiente →</a>` : ""}</div>`;
}
function pageModulo(id){
  const m = mod(id); if (!m) return notFound(); const d = modDone(m), q = P.quiz[m.id], i = MODS.indexOf(m);
  return crumbs([["Curso", H("curso")], ["Nivel " + m.n, H("nivel/" + m.n)], m.id]) +
  `<h1 style="color:${col(m.n)}">${m.id}. ${esc(m.t)}</h1><p class="lead">${md(m.d)}</p>
  <p><span class="pill">Nivel ${m.n}</span><span class="pill">${m.L.length} lecciones</span><span class="pill">${fmt(modHoras(m))} h</span>${estadoPill(modEstado(m))}</p>${bar(pct(d, m.L.length), col(m.n))}
  ${m.dep ? `<p class="meta">Se recomienda haber visto antes: ${m.dep.map(x => mod(x) ? `<a href="${H("modulo/" + x)}">${x}. ${esc(mod(x).t)}</a>` : x).join(", ")}.</p>` : ""}
  <h2>Objetivos</h2>${lista(m.obj)}
  <h2>Lecciones</h2><ol class="lesson-list">${m.L.map(l => `<li><span class="${done(l) ? "done" : "meta"}" aria-label="${done(l) ? "completada" : "pendiente"}">${done(l) ? "✔" : "○"}</span><a href="${H("leccion/" + l.id)}">${l.i + 1}. ${esc(l.t)}</a>${l.s ? ' <span class="star" title="Esencial">★</span>' : ""}<span class="meta">${fmt(l.h)} h</span></li>`).join("")}</ol>
  <div class="grid" style="margin-top:1rem">
   <div class="card"><h3>Prácticas</h3>${lista(m.prac)}</div>
   <div class="card"><h3>Materiales</h3>${lista(m.mat)}</div>
   <div class="card"><h3>Evaluación</h3><p>Quiz del módulo (12 preguntas, aprobado con 70 %). ${q ? `Tu mejor nota: <b>${q.mejor} %</b> (${q.intentos} intento${q.intentos > 1 ? "s" : ""}).` : "Aún no lo has hecho."}</p><a class="btn small" href="${H("quiz/" + m.id)}">Hacer el quiz</a>
   ${m.pj ? `<p>Proyecto: <b>${esc(m.pj.t)}</b>${m.pj.h ? ` (${fmt(m.pj.h)} h)` : ""} ${pjDone(m) ? '<span class="pill ok">completado</span>' : ""}</p><a class="btn small alt" href="${H("proyecto/" + m.id)}">Ver el proyecto</a>` : ""}
   ${m.examen ? `<p>Este módulo cierra con el <a href="${H("examen")}">examen final</a>.</p>` : ""}</div></div>
  <div class="row">${i > 0 ? `<a class="btn alt" href="${H("modulo/" + MODS[i - 1].id)}">← ${MODS[i - 1].id}</a>` : ""}${i < MODS.length - 1 ? `<a class="btn alt" href="${H("modulo/" + MODS[i + 1].id)}">${MODS[i + 1].id} →</a>` : ""}</div>`;
}
function pageLeccion(id){
  const l = les(id); if (!l) return notFound(); const m = l.m, gi = LES.indexOf(l), prev = LES[gi - 1], next = LES[gi + 1];
  P.ultima = l.id; marcarDia(); save();
  const qs = (l.q || []).map(q => prep(q, null)), mq = P.miniquiz[l.id];
  const side = `<aside class="side noprint"><details open><summary>${m.id}. ${esc(m.t)}</summary><ol>${m.L.map(x => `<li><a class="${x === l ? "on" : ""}" href="${H("leccion/" + x.id)}">${done(x) ? "✔ " : ""}${esc(x.t)}</a></li>`).join("")}</ol>
    <p class="meta"><a href="${H("quiz/" + m.id)}">Quiz del módulo</a>${m.pj ? ` · <a href="${H("proyecto/" + m.id)}">Proyecto</a>` : ""}</p></details></aside>`;
  const pr = l.pr;
  return crumbs([["Curso", H("curso")], ["Nivel " + m.n, H("nivel/" + m.n)], [m.id, H("modulo/" + m.id)], "Lección " + (l.i + 1)]) +
  `<div class="layout">${side}<article class="prose">
  <p class="meta">${m.id} · Lección ${l.i + 1} de ${m.L.length} · ${fmt(l.h)} h ${l.s ? '· <span class="star">★ esencial</span>' : ""} ${done(l) ? '· <span class="done">✔ completada</span>' : ""}</p>
  <h1>${esc(l.t)}</h1>
  ${l.p ? `<div class="box"><b>Para pensar:</b> ${md(l.p)}</div>` : ""}
  ${l.o ? `<h2>Objetivos</h2>${lista(l.o)}` : ""}
  <h2>Explicación</h2>${(l.x || []).map(p => p.startsWith("- ") ? lista(p.split("\n").map(s => s.replace(/^- /, ""))) : p.startsWith("### ") ? `<h3>${md(p.slice(4))}</h3>` : `<p>${md(p)}</p>`).join("")}
  ${l.g ? (Array.isArray(l.g) ? l.g : [l.g]).map(diagram).join("") : ""}
  ${l.k ? `<div class="box key"><h3>🔑 Idea clave</h3><p>${md(l.k)}</p></div>` : ""}
  ${l.ej ? `<h2>Ejemplo resuelto</h2><div class="box">${l.ej.map(p => `<p>${md(p)}</p>`).join("")}</div>` : ""}
  ${l.c ? `<h2>Código</h2>${codeBlock(l.c)}` : ""}
  ${pr ? `<h2>Práctica</h2>${pr.m ? `<p><b>Materiales:</b> ${pr.m.map(md).join(", ")}.</p>` : ""}<ol>${(pr.p || []).map(s => `<li>${md(s)}</li>`).join("")}</ol>${pr.e ? `<p><b>Resultado esperado:</b> ${md(pr.e)}</p>` : ""}${pr.sim ? `<p class="meta">💻 <b>Sin materiales:</b> ${md(pr.sim)}</p>` : ""}` : ""}
  ${l.sg ? `<div class="box warn"><h3>⚠️ Seguridad</h3><p>${md(l.sg)} <a href="${H("seguridad")}">Normas generales</a>.</p></div>` : ""}
  ${l.er && l.er.length ? `<h2>Errores frecuentes</h2>${lista(l.er)}` : ""}
  <h2>Mini-quiz</h2><p class="meta">5 preguntas. Se aprueba con 60 %; con 100 % la lección queda «dominada».${mq != null ? ` Tu mejor nota: ${mq} %.` : ""}</p>${quizHTML(qs, "mq")}
  <h2>Tus notas</h2><textarea id="nota" aria-label="Notas personales de esta lección" placeholder="Escribe aquí lo que quieras recordar…">${esc(P.notas[l.id] || "")}</textarea>
  <div class="row noprint"><button class="btn" id="marcar" type="button">${done(l) ? "✔ Completada (desmarcar)" : "Marcar como completada"}</button></div>
  <div class="row noprint">${prev ? `<a class="btn alt" href="${H("leccion/" + prev.id)}">← ${esc(prev.t)}</a>` : ""}<a class="btn alt" href="${H("modulo/" + m.id)}">Volver al módulo</a>${next ? `<a class="btn alt" href="${H("leccion/" + next.id)}">${esc(next.t)} →</a>` : ""}</div>
  </article></div>`;
}
function bindLeccion(id){
  const l = les(id); if (!l) return; const qs = (l.q || []).map(q => prep(q, null));
  bindQuiz(app.querySelector("#mq"), qs, p => { P.miniquiz[l.id] = Math.max(P.miniquiz[l.id] || 0, p); if (p >= 60 && !done(l)) { P.lecciones[l.id] = hoy(); const b = app.querySelector("#marcar"); if (b) b.textContent = "✔ Completada (desmarcar)"; } save(); });
  const n = app.querySelector("#nota"); if (n) n.oninput = () => { P.notas[l.id] = n.value; if (!n.value) delete P.notas[l.id]; save(); };
  const b = app.querySelector("#marcar"); if (b) b.onclick = () => { if (done(l)) delete P.lecciones[l.id]; else P.lecciones[l.id] = hoy(); save(); b.textContent = done(l) ? "✔ Completada (desmarcar)" : "Marcar como completada"; };
}
function bancoModulo(m){ return [...m.L.flatMap(l => l.q || []), ...(m.banco || [])]; }
function pageQuiz(id){
  const m = mod(id); if (!m) return notFound(); const q = P.quiz[m.id] || {mejor: 0, intentos: 0};
  const r = rng(m.id + ":" + q.intentos), qs = shuffle(bancoModulo(m), r).slice(0, 12).map(x => prep(x, r));
  pageQuiz.qs = qs;
  return crumbs([["Curso", H("curso")], [m.id, H("modulo/" + m.id)], "Quiz"]) + `<h1>Quiz del módulo ${m.id}</h1><p class="lead">${esc(m.t)}</p>
  <p>12 preguntas al azar de un banco de ${bancoModulo(m).length}. Se aprueba con 70 %. ${q.intentos ? `Mejor nota: <b>${q.mejor} %</b> en ${q.intentos} intento${q.intentos > 1 ? "s" : ""}.` : ""} Cada intento nuevo cambia las preguntas.</p>${quizHTML(qs, "mquiz")}
  <div class="row noprint"><a class="btn alt" href="${H("modulo/" + m.id)}">Volver al módulo</a><button class="btn alt" id="otra" type="button">Nuevo intento</button></div>`;
}
function bindQuizPage(id){
  const m = mod(id); if (!m) return; let saved = false;
  bindQuiz(app.querySelector("#mquiz"), pageQuiz.qs, (p, res) => { if (saved) return; saved = true; const q = P.quiz[m.id] || {mejor: 0, intentos: 0}; q.intentos++; q.mejor = Math.max(q.mejor, p); P.quiz[m.id] = q; marcarDia(); save(); res.textContent += p >= 70 ? " · ¡Aprobado!" : " · Repasa las lecciones y vuelve a intentarlo."; });
  const o = app.querySelector("#otra"); if (o) o.onclick = () => { if (!saved) { const q = P.quiz[m.id] || {mejor: 0, intentos: 0}; q.intentos++; P.quiz[m.id] = q; save(); } route(); };
}
function pageProyecto(id){
  const m = mod(id); if (!m || !m.pj) return notFound(); const pj = m.pj, v = P.proyectos[m.id] || [];
  return crumbs([["Curso", H("curso")], [m.id, H("modulo/" + m.id)], "Proyecto"]) + `<h1>Proyecto: ${esc(pj.t)}</h1><p class="meta">${m.id}. ${esc(m.t)}${pj.h ? ` · ${fmt(pj.h)} h` : ""}</p><p class="lead">${md(pj.d)}</p>
  ${pj.mat ? `<h2>Materiales</h2>${lista(pj.mat)}` : ""}<h2>Pasos</h2><ol>${pj.pasos.map(s => `<li>${md(s)}</li>`).join("")}</ol>
  ${pj.rub ? `<h2>Rúbrica</h2><div class="tbl"><table><thead><tr><th>Criterio</th><th>Peso</th></tr></thead><tbody>${pj.rub.map(r => `<tr><td>${md(r[0])}</td><td>${r[1]} %</td></tr>`).join("")}</tbody></table></div>` : ""}
  <h2>Lista de comprobación</h2><p class="meta">Marca cada criterio cuando lo cumplas. Se guarda en este navegador.</p><div class="check" id="crit">${pj.crit.map((c, i) => `<label><input type="checkbox" data-i="${i}"${v[i] ? " checked" : ""}> <span>${md(c)}</span></label>`).join("")}</div>
  <p id="pjres" aria-live="polite">${pjDone(m) ? '<span class="result ok">✔ Proyecto completado</span>' : ""}</p>
  <div class="row"><a class="btn alt" href="${H("modulo/" + m.id)}">Volver al módulo</a></div>`;
}
function bindProyecto(id){
  const m = mod(id); if (!m) return;
  app.querySelectorAll("#crit input").forEach(cb => cb.onchange = () => { const v = P.proyectos[m.id] || []; v[+cb.dataset.i] = cb.checked; P.proyectos[m.id] = v; marcarDia(); save();
    app.querySelector("#pjres").innerHTML = pjDone(m) ? '<span class="result ok">✔ Proyecto completado</span>' : ""; });
}
function pageExamen(){
  const r = rng("examen:" + Date.now()), qs = shuffle(MODS.map(m => shuffle(bancoModulo(m), r)[0]).concat(shuffle(LES.flatMap(l => l.q || []), r).slice(0, 10)), r).slice(0, 30).map(x => prep(x, r));
  pageExamen.qs = qs;
  return crumbs([["Curso", H("curso")], "Examen final"]) + `<h1>Examen final</h1><p class="lead">30 preguntas de todo el curso (al menos una de cada módulo). Se aprueba con 70 %. Duración orientativa: 1,5 h.</p>
  ${P.examen != null ? `<p>Tu mejor nota: <b>${P.examen} %</b>.</p>` : ""}${quizHTML(qs, "exam")}<div class="row"><a class="btn alt" href="${H("certificado")}">Ver certificado</a></div>`;
}
function bindExamen(){ bindQuiz(app.querySelector("#exam"), pageExamen.qs, p => { P.examen = Math.max(P.examen || 0, p); marcarDia(); save(); }); }
function pageCertificado(){
  const nivOk = NIV.filter(n => MODS.filter(m => m.n === n.n).every(m => modDone(m) === m.L.length));
  const full = totDone() === TOTAL && (P.examen || 0) >= 70;
  return crumbs([["Progreso", H("progreso")], "Certificado"]) + `<h1>Certificados</h1>
  <div class="row noprint"><label>Tu nombre para el certificado: <input class="input" id="nombre" value="${esc(P.nombre)}"></label></div>
  ${full ? `<div class="cert"><p class="meta">Certificado de finalización</p><h1>Robótica, Electrónica, Hardware y Software</h1><p>Se certifica que</p><h2 id="cn">${esc(P.nombre || "(escribe tu nombre)")}</h2><p>ha completado las ${TOTAL} lecciones de los ${MODS.length} módulos (${fmt(MODS.reduce((s, m) => s + modHoras(m), 0))} horas estimadas) y aprobado el examen final con ${P.examen} %.</p><p class="meta">${hoy()}</p></div><div class="row noprint"><button class="btn" onclick="print()">Imprimir</button></div>`
        : `<div class="box">El certificado final se obtiene al completar las ${TOTAL} lecciones y aprobar el <a href="${H("examen")}">examen final</a> con 70 % o más. Llevas ${totDone()} lecciones${P.examen != null ? ` y tu mejor nota en el examen es ${P.examen} %` : ""}.</div>`}
  <h2>Certificados por nivel</h2>${nivOk.length ? nivOk.map(n => `<div class="cert"><p class="meta">Certificado de nivel</p><h2>Nivel ${n.n}. ${esc(n.t)}</h2><p>${esc(P.nombre || "(escribe tu nombre)")}</p><p class="meta">Robótica, Electrónica, Hardware y Software</p></div>`).join("") : `<p class="meta">Completa todas las lecciones de un nivel para obtener su certificado.</p>`}`;
}
function bindCertificado(){ const n = app.querySelector("#nombre"); if (n) n.onchange = () => { P.nombre = n.value.trim(); save(); route(); }; }
function pageBuscar(q){
  q = decodeURIComponent(q || "").trim(); const tipo = pageBuscar.tipo || "", lv = pageBuscar.nivel;
  let res = buscar(q); const tipos = [...new Set(res.map(r => r.e.k))];
  res = res.filter(r => (!tipo || r.e.k === tipo) && (lv === "" || lv == null || r.e.lvl === +lv));
  return `<h1>Buscar</h1><form id="bigsearch" class="row" role="search"><input id="bq" class="input" type="search" value="${esc(q)}" placeholder="Ejemplo: ley de Ohm, servo, i2c, batería…" aria-label="Buscar" style="flex:1;min-width:200px"><button class="btn">Buscar</button></form>
  ${q ? `<div class="filters"><select id="ftipo" aria-label="Filtrar por tipo"><option value="">Todos los tipos</option>${tipos.map(t => `<option${t === tipo ? " selected" : ""}>${t}</option>`).join("")}</select>
  <select id="fniv" aria-label="Filtrar por nivel"><option value="">Todos los niveles</option>${NIV.map(n => `<option value="${n.n}"${String(lv) === String(n.n) ? " selected" : ""}>Nivel ${n.n}</option>`).join("")}</select></div>
  <p class="meta">${res.length} resultado${res.length === 1 ? "" : "s"} para «${esc(q)}»</p><ul class="results">${res.slice(0, 80).map(r => `<li><a href="${r.e.h}">${esc(r.e.t)}</a> <span class="pill">${esc(r.e.k)}</span>${r.e.lvl != null ? `<span class="pill">Nivel ${r.e.lvl}</span>` : ""}<div class="meta">${snippet(r.e.txt, q)}</div></li>`).join("")}</ul>
  ${res.length ? "" : `<p>No hay resultados. Prueba con otra palabra o revisa el <a href="${H("glosario")}">glosario</a>.</p>`}`
  : `<p class="meta">Busca en ${TOTAL} lecciones, el glosario, los componentes, la guía de fallas y las herramientas. Ejemplos: ${["ley de Ohm", "servo", "i2c", "batería LiPo", "puente H", "PID", "OpenCV"].map(x => `<a href="${H("buscar/" + encodeURIComponent(x))}">${x}</a>`).join(" · ")}</p>`}`;
}
function bindBuscar(q){
  const f = app.querySelector("#bigsearch"); if (f) f.onsubmit = ev => { ev.preventDefault(); pageBuscar.tipo = ""; pageBuscar.nivel = ""; location.hash = "#/buscar/" + encodeURIComponent(app.querySelector("#bq").value.trim()); };
  const t = app.querySelector("#ftipo"), n = app.querySelector("#fniv");
  if (t) t.onchange = () => { pageBuscar.tipo = t.value; route(); }; if (n) n.onchange = () => { pageBuscar.nivel = n.value; route(); };
  if (!q) { const b = app.querySelector("#bq"); if (b) b.focus(); }
}
function pageProgreso(){
  const d = totDone();
  return crumbs([["Inicio", H("")], "Mi progreso"]) + `<h1>Mi progreso</h1>
  <div class="stats"><div class="stat"><b>${pct(d, TOTAL)} %</b>del curso</div><div class="stat"><b>${d}/${TOTAL}</b>lecciones</div><div class="stat"><b>${fmt(horasHechas())} h</b>de lecciones</div><div class="stat"><b>${Object.values(P.quiz).filter(q => q.mejor >= 70).length}/${MODS.length}</b>quizzes aprobados</div><div class="stat"><b>${MODS.filter(pjDone).length}</b>proyectos</div><div class="stat"><b>${racha()}</b>días de racha</div></div>
  ${bar(pct(d, TOTAL))}
  <h2>Por nivel</h2><div class="tbl"><table><thead><tr><th>Nivel</th><th>Lecciones</th><th>Avance</th></tr></thead><tbody>${NIV.map(n => { const ms = MODS.filter(m => m.n === n.n), t = ms.reduce((s, m) => s + m.L.length, 0), k = ms.reduce((s, m) => s + modDone(m), 0); return `<tr><td><a href="${H("nivel/" + n.n)}">${n.n}. ${esc(n.t)}</a></td><td>${k}/${t}</td><td style="min-width:120px">${bar(pct(k, t), col(n.n))}</td></tr>`; }).join("")}</tbody></table></div>
  <h2>Por módulo</h2><div class="tbl"><table><thead><tr><th>Módulo</th><th>Lecciones</th><th>Quiz</th><th>Proyecto</th><th>Estado</th></tr></thead><tbody>${MODS.map(m => `<tr><td><a href="${H("modulo/" + m.id)}">${m.id}. ${esc(m.t)}</a></td><td>${modDone(m)}/${m.L.length}</td><td>${P.quiz[m.id] ? P.quiz[m.id].mejor + " %" : "—"}</td><td>${pjDone(m) ? "✔" : "—"}</td><td>${modEstado(m)}</td></tr>`).join("")}</tbody></table></div>
  <h2>Insignias</h2><div class="badges">${BADGES.map(b => { const g = b[3](); return `<div class="badge${g ? " got" : ""}"><div class="ico" aria-hidden="true">${b[0]}</div><b>${esc(b[1])}</b><div class="meta">${esc(b[2])}</div><div class="meta">${g ? "Conseguida" : "Pendiente"}</div></div>`; }).join("")}</div>
  <h2>Certificados y examen</h2><p><a class="btn" href="${H("examen")}">Examen final</a> <a class="btn alt" href="${H("certificado")}">Certificados</a></p>
  <h2>Tus notas</h2>${Object.keys(P.notas).length ? `<ul>${Object.keys(P.notas).map(k => les(k) ? `<li><a href="${H("leccion/" + k)}">${esc(les(k).t)}</a>: ${esc(P.notas[k].slice(0, 120))}</li>` : "").join("")}</ul>` : `<p class="meta">Aún no has escrito notas.</p>`}
  <h2>Copia de seguridad</h2><p class="meta">Tu progreso se guarda solo en este navegador. Puedes descargarlo y cargarlo en otro equipo.</p>
  <div class="row"><button class="btn alt" id="exp" type="button">Descargar progreso</button><label class="btn alt">Cargar progreso<input id="imp" type="file" accept="application/json" hidden></label><button class="btn alt" id="reset" type="button">Borrar todo</button></div>`;
}
function bindProgreso(){
  const e = app.querySelector("#exp"); if (e) e.onclick = () => { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify(P, null, 1)], {type: "application/json"})); a.download = "progreso-robotica.json"; a.click(); };
  const i = app.querySelector("#imp"); if (i) i.onchange = () => { const f = i.files[0]; if (!f) return; f.text().then(t => { try { const o = JSON.parse(t); if (typeof o !== "object" || !o.lecciones) throw 0; P = Object.assign(vacio(), o); save(); route(); alert("Progreso cargado."); } catch(err){ alert("El archivo no es un progreso válido."); } }); };
  const r = app.querySelector("#reset"); if (r) r.onclick = () => { if (confirm("¿Borrar todo tu progreso guardado en este navegador?")) { P = vacio(); save(); route(); } };
}
function pageHerramientas(id){
  if (id){ const t = T.find(x => x.id === id); if (!t) return notFound();
    return crumbs([["Herramientas", H("herramientas")], t.t]) + `<h1>${esc(t.t)}</h1><p class="lead">${esc(t.d)}</p><div class="tool" id="tool">${t.html()}</div>${t.nota ? `<div class="box">${md(t.nota)}</div>` : ""}<p><a href="${H("herramientas")}">← Todas las herramientas</a></p>`; }
  return crumbs([["Inicio", H("")], "Herramientas"]) + `<h1>Herramientas</h1><p class="lead">Calculadoras para tus proyectos. Funcionan sin internet.</p><div class="grid">${T.map(t => `<a class="card" href="${H("herramientas/" + t.id)}"><h3>${esc(t.t)}</h3><p class="meta">${esc(t.d)}</p></a>`).join("")}</div>`;
}
function pageComponentes(id){
  const L = X.COMPONENTES || [];
  if (id){ const c = L.find(x => x.id === id); if (!c) return notFound();
    return crumbs([["Componentes", H("componentes")], c.t]) + `<h1>${esc(c.t)}</h1><p><span class="pill">${esc(c.cat)}</span></p><p class="lead">${md(c.d)}</p>${c.g ? diagram(c.g) : ""}
    <h2>Para qué se usa</h2><p>${md(c.uso)}</p>${c.pines ? `<h2>Pines o terminales</h2>${lista(c.pines)}` : ""}${c.val ? `<h2>Valores típicos</h2>${lista(c.val)}` : ""}${c.ojo ? `<div class="box warn"><h3>⚠️ Precauciones</h3>${lista(c.ojo)}</div>` : ""}
    ${c.lec ? `<h2>Se estudia en</h2><ul>${c.lec.map(x => les(x) ? `<li><a href="${H("leccion/" + x)}">${x.replace("-", ".")} ${esc(les(x).t)}</a></li>` : "").join("")}</ul>` : ""}<p><a href="${H("componentes")}">← Todos los componentes</a></p>`; }
  const cats = [...new Set(L.map(c => c.cat))];
  return crumbs([["Inicio", H("")], "Componentes"]) + `<h1>Fichas de componentes</h1><p class="lead">${L.length} componentes: qué son, para qué sirven, cómo se conectan y qué cuidar.</p>` +
    cats.map(cat => `<h2>${esc(cat)}</h2><div class="grid">${L.filter(c => c.cat === cat).map(c => `<a class="card" href="${H("componentes/" + c.id)}"><h3>${esc(c.t)}</h3><p class="meta">${md(c.d.slice(0, 110))}${c.d.length > 110 ? "…" : ""}</p></a>`).join("")}</div>`).join("");
}
function pageGlosario(term){
  const G = (X.GLOSARIO || []).slice().sort((a, b) => norm(a[0]).localeCompare(norm(b[0])));
  const letra = t => norm(t[0])[0].toUpperCase(), letras = [...new Set(G.map(letra))];
  setTimeout(() => { if (term){ const el = document.getElementById("g-" + norm(decodeURIComponent(term)).replace(/[^a-z0-9]+/g, "-")); if (el) { el.scrollIntoView(); el.style.background = "var(--soft)"; } } }, 0);
  return crumbs([["Inicio", H("")], "Glosario"]) + `<h1>Glosario</h1><p class="lead">${G.length} términos de electrónica, programación y robótica.</p>
  <input id="gfil" class="input" type="search" placeholder="Filtrar términos…" aria-label="Filtrar el glosario" style="width:100%;max-width:420px">
  <nav class="az" aria-label="Letras">${letras.map(l => `<a href="#g-letra-${l}" data-letra="${l}">${l}</a>`).join("")}</nav>
  <dl class="gl" id="glist">${letras.map(l => `<h2 id="g-letra-${l}">${l}</h2>` + G.filter(g => letra(g) === l).map(g => `<div class="gi" data-t="${esc(norm(g[0] + " " + g[1]))}"><dt id="g-${norm(g[0]).replace(/[^a-z0-9]+/g, "-")}">${esc(g[0])}</dt><dd>${md(g[1])}</dd></div>`).join("")).join("")}</dl>`;
}
function bindGlosario(){
  const f = app.querySelector("#gfil"); if (f) f.oninput = () => { const q = norm(f.value); app.querySelectorAll(".gi").forEach(d => d.hidden = q && !d.dataset.t.includes(q)); };
  app.querySelectorAll(".az a").forEach(a => a.onclick = ev => { ev.preventDefault(); const el = document.getElementById("g-letra-" + a.dataset.letra); if (el) el.scrollIntoView(); });
}
function pageSeguridad(){
  const S = X.SEGURIDAD || [];
  return crumbs([["Inicio", H("")], "Seguridad"]) + `<h1>Normas de seguridad</h1><p class="lead">Léelas antes de tu primera práctica y vuelve a ellas cuando tengas dudas. Ningún proyecto vale una quemadura o un incendio.</p>` +
    S.map(s => `<div class="box${s.w ? " warn" : ""}"><h3>${esc(s.t)}</h3>${lista(s.p)}</div>`).join("") + `<p>Más a fondo en el módulo <a href="${H("modulo/M25")}">M25. Seguridad, mantenimiento y solución de problemas</a>.</p>`;
}
function pageFallas(i){
  const F = X.FALLAS || [];
  setTimeout(() => { if (i != null && i !== "") { const el = document.getElementById("f-" + i); if (el) { el.open = true; el.scrollIntoView(); } } }, 0);
  return crumbs([["Inicio", H("")], "Solución de problemas"]) + `<h1>Solución de problemas</h1><p class="lead">Busca el síntoma, revisa las causas probables en orden y aplica la solución. Cambia una sola cosa cada vez.</p>
  <div class="box"><b>Método general:</b> 1) observa y anota qué pasa exactamente; 2) reproduce el fallo; 3) divide el sistema en partes y prueba cada una por separado; 4) mide con el multímetro en lugar de suponer; 5) cambia una sola cosa y vuelve a probar; 6) anota la solución.</div>
  ${F.map((f, k) => `<details class="card" id="f-${k}" style="margin:.5rem 0"><summary><b>${esc(f.s)}</b> <span class="pill">${esc(f.cat)}</span></summary><h3>Causas probables</h3><ol>${f.c.map(x => `<li>${md(x)}</li>`).join("")}</ol><h3>Qué hacer</h3><ol>${f.r.map(x => `<li>${md(x)}</li>`).join("")}</ol></details>`).join("")}`;
}
function pageMateriales(){
  const K = X.KITS || [];
  return crumbs([["Inicio", H("")], "Materiales"]) + `<h1>Materiales y kits</h1><p class="lead">Qué comprar según tu presupuesto. Los precios son orientativos (en dólares estadounidenses) y cambian según el país y la tienda.</p>` +
    K.map(k => `<h2>${esc(k.t)}</h2><p>${md(k.d)}</p><div class="tbl"><table><thead><tr><th>Artículo</th><th>Cantidad</th><th>Precio aprox.</th><th>Para qué</th></tr></thead><tbody>${k.items.map(x => `<tr><td>${md(x[0])}</td><td>${esc(x[1])}</td><td>${esc(x[2])}</td><td>${md(x[3])}</td></tr>`).join("")}</tbody></table></div>`).join("") +
    `<h2>Materiales por módulo</h2><div class="tbl"><table><thead><tr><th>Módulo</th><th>Materiales</th></tr></thead><tbody>${MODS.map(m => `<tr><td><a href="${H("modulo/" + m.id)}">${m.id}</a></td><td>${(m.mat || []).map(md).join("; ")}</td></tr>`).join("")}</tbody></table></div>`;
}
function pageRutas(){
  const R = X.RUTAS || [];
  return crumbs([["Inicio", H("")], "Rutas"]) + `<h1>Rutas de aprendizaje</h1><p class="lead">No hay bloqueos: elige la ruta que mejor se adapte a ti.</p>` +
    R.map(r => { const ls = r.f ? LES.filter(r.f) : r.ids.map(x => les(x) || mod(x)).filter(Boolean);
      return `<div class="card" style="margin:.8rem 0"><h2 style="margin-top:0">${esc(r.t)}</h2><p>${md(r.d)}</p><p class="meta">${ls.length} pasos</p><details><summary>Ver el recorrido</summary><ol>${ls.map(x => x.L ? `<li><a href="${H("modulo/" + x.id)}">Módulo ${x.id}. ${esc(x.t)}</a> (completo)</li>` : `<li><a href="${H("leccion/" + x.id)}">${done(x) ? "✔ " : ""}${x.id.replace("-", ".")} ${esc(x.t)}</a></li>`).join("")}</ol></details></div>`; }).join("");
}
function pageTexto(k){
  const p = (X.PAGINAS || {})[k]; if (!p) return notFound();
  return crumbs([["Inicio", H("")], p[0]]) + `<h1>${esc(p[0])}</h1><div class="prose">${p[1].map(x => `<p>${md(x)}</p>`).join("")}</div>`;
}
function notFound(){ return `<h1>Página no encontrada</h1><p>No encontramos lo que buscas. <a href="${H("")}">Volver al inicio</a> o <a href="${H("buscar/")}">buscar</a>.</p>`; }

// ---------- navegación ----------
const NAV = [["curso", "Curso"], ["rutas", "Rutas"], ["herramientas", "Herramientas"], ["componentes", "Componentes"], ["glosario", "Glosario"], ["progreso", "Mi progreso"]];
const MENU = [...NAV, ["seguridad", "Seguridad"], ["solucion-de-problemas", "Solución de problemas"], ["materiales", "Materiales"], ["examen", "Examen final"], ["certificado", "Certificados"], ["buscar/", "Buscar"], ["acerca", "Acerca de"], ["privacidad", "Privacidad"]]
  .concat(NIV.map(n => ["nivel/" + n.n, "Nivel " + n.n + ". " + n.t]));
document.getElementById("mainnav").innerHTML = NAV.map(([h, t]) => `<a href="${H(h)}" data-r="${h}">${t}</a>`).join("");
document.getElementById("menulist").innerHTML = MENU.map(([h, t]) => `<a href="${H(h)}">${esc(t)}</a>`).join("");
const menu = document.getElementById("menu"), menubtn = document.getElementById("menubtn");
menubtn.onclick = () => { menu.hidden = !menu.hidden; menubtn.setAttribute("aria-expanded", String(!menu.hidden)); };

function route(){
  const raw = decodeURI(location.hash.replace(/^#\/?/, "")); const [r, a = ""] = [raw.split("/")[0], raw.split("/").slice(1).join("/")];
  let html, bind = null, title = "";
  switch (r){
    case "": html = pageInicio(); break;
    case "curso": html = pageCurso(); title = "Mapa del curso"; break;
    case "nivel": html = pageNivel(a); title = "Nivel " + a; break;
    case "modulo": html = pageModulo(a); title = a + (mod(a) ? ". " + mod(a).t : ""); break;
    case "leccion": html = pageLeccion(a); bind = () => bindLeccion(a); title = les(a) ? les(a).t : ""; break;
    case "quiz": html = pageQuiz(a); bind = () => bindQuizPage(a); title = "Quiz " + a; break;
    case "proyecto": html = pageProyecto(a); bind = () => bindProyecto(a); title = "Proyecto " + a; break;
    case "examen": html = pageExamen(); bind = bindExamen; title = "Examen final"; break;
    case "certificado": html = pageCertificado(); bind = bindCertificado; title = "Certificados"; break;
    case "buscar": html = pageBuscar(raw.slice(7)); bind = () => bindBuscar(raw.slice(7)); title = "Buscar"; break;
    case "progreso": html = pageProgreso(); bind = bindProgreso; title = "Mi progreso"; break;
    case "herramientas": html = pageHerramientas(a); bind = () => { const t = T.find(x => x.id === a); if (t && t.bind) t.bind(app.querySelector("#tool")); }; title = "Herramientas"; break;
    case "componentes": html = pageComponentes(a); title = "Componentes"; break;
    case "glosario": html = pageGlosario(a); bind = bindGlosario; title = "Glosario"; break;
    case "seguridad": html = pageSeguridad(); title = "Seguridad"; break;
    case "solucion-de-problemas": html = pageFallas(a); title = "Solución de problemas"; break;
    case "materiales": html = pageMateriales(); title = "Materiales"; break;
    case "rutas": html = pageRutas(); title = "Rutas"; break;
    default: html = pageTexto(r);
  }
  app.innerHTML = html; if (bind) bind();
  app.querySelectorAll("[data-copy]").forEach(b => b.onclick = () => { const t = b.parentNode.querySelector("code").textContent;
    const ok = () => { b.textContent = "Copiado"; setTimeout(() => b.textContent = "Copiar", 1500); };
    if (navigator.clipboard) navigator.clipboard.writeText(t).then(ok, () => {}); else { const ta = document.createElement("textarea"); ta.value = t; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); ok(); } catch(e){} ta.remove(); } });
  document.title = (title ? title + " · " : "") + "Robótica y Electrónica";
  document.querySelectorAll(".mainnav a").forEach(x => x.classList.toggle("on", x.dataset.r === r));
  menu.hidden = true; menubtn.setAttribute("aria-expanded", "false");
  if (!/^(glosario|solucion-de-problemas)/.test(r) || !a) window.scrollTo(0, 0);
  app.focus({preventScroll: true});
}
document.getElementById("searchform").onsubmit = ev => { ev.preventDefault(); const q = document.getElementById("q").value.trim(); pageBuscar.tipo = ""; pageBuscar.nivel = ""; location.hash = "#/buscar/" + encodeURIComponent(q); };
const themeBtn = document.getElementById("theme");
const setTheme = t => { if (t) document.documentElement.setAttribute("data-theme", t); else document.documentElement.removeAttribute("data-theme"); store.set(TKEY, t);
  const dark = t ? t === "dark" : matchMedia("(prefers-color-scheme: dark)").matches; themeBtn.textContent = dark ? "☀" : "☾"; };
setTheme(store.get(TKEY, ""));
themeBtn.onclick = () => { const cur = document.documentElement.getAttribute("data-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); setTheme(cur === "dark" ? "light" : "dark"); };
window.addEventListener("hashchange", route);
route();
})();
