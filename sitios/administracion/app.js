// Motor de curso (solo en español) para los sitios de Ciencias y Administración.
(function(){
"use strict";
const D = window.DATA, C = D.cfg, MODS = D.modules;
MODS.forEach(m => m.L.forEach(x => { if (/^[—–-]?$/.test((x.extra||"").trim())) x.extra = ""; }));
const X = window.EXTRA || {};
const app = document.getElementById("app");
const KEY = "curso_" + C.toolset;
const store = { get(k,d){ try{ const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; }catch(e){ return d; } }, set(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} } };
let P = store.get(KEY, {lessons:{}, quiz:{}, notes:{}, items:{}, last:null});
const save = () => store.set(KEY, P);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const md = s => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\*(.+?)\*/g, "<i>$1</i>");
const cap = s => s ? s[0].toUpperCase() + s.slice(1) : s;
const plain = s => String(s).replace(/\*\*?/g, "");
const href = p => "#/" + p;
const mod = id => MODS.find(m => m.id === id);
const area = c => C.areas[c] || [c, "#888", "•"];
const pct = (a,b) => b ? Math.round(100*a/b) : 0;
const bar = p => `<div class="bar" aria-label="${p}%"><i style="width:${p}%"></i></div>`;
const lk = (m,i) => m.id + "#" + i;
const modDone = m => m.L.filter((_,i) => P.lessons[lk(m,i)]).length;
const TOTAL = MODS.reduce((s,m) => s + m.L.length, 0);
const levels = [...new Set(MODS.map(m => m.lvl))].sort();
const lvlName = n => C.levelNames[n] || ("Nivel " + n);

// Personas (científicos / autores) a partir del plan
const PEOPLE = [];
MODS.forEach(m => C.peopleKeys.forEach(k => { const v = m.f[k]; if (typeof v !== "string") return;
  splitList(plain(v)).forEach(s => { const mm = s.match(/^(.+?)\s*\((.+)\)\s*$/); const name = (mm ? mm[1] : s).trim(); if (name.length > 2 && name.length < 70 && /^[A-ZÁÉÍÓÚÑ]/.test(name) && !PEOPLE.some(p => p.name === name && p.mod === m)) PEOPLE.push({name, note: mm ? mm[2] : "", mod: m}); }); }));
function splitList(s){ const out = []; let depth = 0, cur = ""; for (const ch of s.replace(/\.$/, "")) { if (ch === "(") depth++; if (ch === ")") depth--; if ((ch === "," || ch === ";") && depth === 0){ out.push(cur); cur = ""; } else cur += ch; } out.push(cur); return out.map(x => x.trim()).filter(Boolean); }

// Catálogo (experimentos o casos)
const ITEMS = [];
MODS.forEach(m => { const v = m.f[C.catalogKey]; if (!v) return; const list = Array.isArray(v) ? v : splitList(v.replace(/;/g, ";")).length > 1 ? v.split(/;\s*/) : [v];
  list.forEach((t, i) => ITEMS.push({id: m.id + "-" + i, text: t.trim(), mod: m})); });
const flags = t => ({home: t.includes("🏠"), lab: t.includes("🧪"), sim: t.includes("💻"), green: t.includes("🟢"), yellow: t.includes("🟡"), red: t.includes("🔴")});

// RNG y quizzes
function rng(seed){ let s = 0; for (const c of seed) s = (s*31 + c.charCodeAt(0)) >>> 0; return () => { s = (s*1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
function shuffle(a,r){ a = a.slice(); for (let i=a.length-1;i>0;i--){ const j = Math.floor(r()*(i+1)); [a[i],a[j]] = [a[j],a[i]]; } return a; }
function makeQuestions(m, n, seed){
  const r = rng(seed), qs = [];
  const own = shuffle(m.L.map(x => x), r), others = shuffle(MODS.filter(o => o.id !== m.id), r);
  // Tipo 1: ¿a qué módulo pertenece este tema?
  own.slice(0, Math.ceil(n/2)).forEach(x => { const opts = shuffle([m.t, ...others.slice(0,3).map(o => o.t)], r); qs.push({q: `¿En qué módulo se estudia «${plain(x.t)}»?`, opts, a: m.t}); });
  // Tipo 2: personas con su aportación
  const ppl = shuffle(PEOPLE.filter(p => p.mod === m), r), allp = PEOPLE.filter(p => p.mod !== m);
  ppl.forEach(p => { if (qs.length >= n) return;
    if (p.note){ const wrong = shuffle(PEOPLE.filter(o => o.note && o.note !== p.note), r).slice(0,3).map(o => o.note); if (wrong.length === 3) qs.push({q: `¿Qué se asocia con ${p.name}?`, opts: shuffle([p.note, ...wrong], r), a: p.note}); }
    else { const wrong = shuffle(allp, r).slice(0,3).map(o => o.name); qs.push({q: `¿Cuál de estas personas se estudia en «${m.t}»?`, opts: shuffle([p.name, ...wrong], r), a: p.name}); } });
  // Tipo 3: área del módulo
  if (qs.length < n){ const ar = Object.keys(C.areas).filter(a => a !== m.area); qs.push({q: `¿A qué área pertenece el módulo «${m.t}»?`, opts: shuffle([area(m.area)[0], ...shuffle(ar, r).slice(0,3).map(a => area(a)[0])], r), a: area(m.area)[0]}); }
  // Relleno con temas de otros módulos
  let k = 0; while (qs.length < n && k < others.length){ const o = others[k++]; const x = o.L[Math.floor(r()*o.L.length)]; const opts = shuffle([o.t, ...shuffle(MODS.filter(z => z !== o), r).slice(0,3).map(z => z.t)], r); qs.push({q: `¿En qué módulo se estudia «${plain(x.t)}»?`, opts, a: o.t}); }
  return qs.slice(0, n);
}
function quizHTML(qs, id){
  return qs.map((q,i) => `<div class="q" data-a="${esc(q.a)}"><b>${i+1}. ${esc(q.q)}</b>${q.opts.map(o => `<label><input type="radio" name="${id}-${i}" value="${esc(o)}"> ${esc(o)}</label>`).join("")}<div class="fb" aria-live="polite"></div></div>`).join("") +
   `<div class="row"><button class="btn" data-check="${id}">Comprobar</button><span id="${id}-res" aria-live="polite"></span></div>`;
}

// ---------- Páginas ----------
const crumbs = items => `<div class="crumbs">${items.map(([t,h]) => h != null ? `<a href="${href(h)}">${esc(t)}</a>` : esc(t)).join(" › ")}</div>`;
function modCard(m){ const a = area(m.area); return `<a class="card" style="--c:${a[1]}" href="${href("m/"+m.id)}"><div class="meta">${a[2]} ${esc(a[0])} · ${m.id}</div><h3>${esc(plain(m.t))}</h3><div class="meta">${m.L.length} lecciones${P.quiz[m.id]>=70?" · ✓ quiz":""}</div>${bar(pct(modDone(m), m.L.length))}</a>`; }
function pageHome(){
  const last = P.last ? `<a class="btn sec" href="${P.last}">Continuar donde lo dejé</a>` : "";
  return `<h1>${esc(C.title)}</h1><p class="lead">${esc(C.sub)}</p><div class="row"><a class="btn" href="${href("m/"+MODS[0].id)}">Empezar</a>${last}</div>
  <div class="panel"><b>${MODS.length} módulos · ${TOTAL} lecciones · ${ITEMS.length} ${C.catalogName.toLowerCase()} · ${PEOPLE.length} ${C.peopleName.toLowerCase()}</b><p class="meta">${esc(C.legend)}</p></div>
  <h2>Áreas</h2><div class="grid">${Object.entries(C.areas).map(([k,a]) => { const ms = MODS.filter(m => m.area === k), n = ms.reduce((s,m)=>s+m.L.length,0), d = ms.reduce((s,m)=>s+modDone(m),0); return ms.length ? `<a class="card" style="--c:${a[1]}" href="${href("area/"+k)}"><h3>${a[2]} ${esc(a[0])}</h3><div class="meta">${ms.length} módulos · ${n} lecciones</div>${bar(pct(d,n))}</a>` : ""; }).join("")}</div>
  ${X.homeExtra ? X.homeExtra() : ""}<h2>Niveles</h2><div class="grid">${levels.map(n => `<a class="card" href="${href("nivel/"+n)}"><div class="meta">Nivel ${n}</div><h3>${esc(lvlName(n))}</h3><div class="meta">${MODS.filter(m=>m.lvl===n).length} módulos</div></a>`).join("")}</div>`;
}
function pageCourse(){
  const areas = Object.keys(C.areas).filter(a => MODS.some(m => m.area === a));
  return crumbs([["Inicio",""],["Mapa del curso"]]) + `<h1>Mapa del curso</h1><p class="lead">Áreas en columnas y niveles en filas. Dentro de cada nivel puedes elegir el orden de las áreas.</p>
  <div class="tablewrap"><table class="matrix"><thead><tr><th>Nivel</th>${areas.map(a => `<th style="color:${area(a)[1]}">${area(a)[2]} ${esc(area(a)[0])}</th>`).join("")}</tr></thead><tbody>
  ${levels.map(n => `<tr><th><a href="${href("nivel/"+n)}">${n}. ${esc(lvlName(n))}</a></th>${areas.map(a => `<td>${MODS.filter(m => m.lvl===n && m.area===a).map(m => `<a class="cell" style="--c:${area(a)[1]}" href="${href("m/"+m.id)}"><b>${m.id}</b> ${esc(plain(m.t))}<span class="meta">${pct(modDone(m),m.L.length)}%</span></a>`).join("")}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}
function pageLevel(n){
  n = +n; const o = D.levels.find(l => l.n === n);
  return crumbs([["Inicio",""],["Mapa del curso","curso"],["Nivel "+n]]) + `<h1>Nivel ${n}: ${esc(lvlName(n))}</h1>` +
   (o ? `<div class="panel"><h3>Objetivos de aprendizaje</h3><ul>${o.obj.map(x => `<li>${md(x)}</li>`).join("")}</ul></div>` : "") +
   `<div class="grid">${MODS.filter(m => m.lvl === n).map(modCard).join("")}</div>`;
}
function pageArea(k){
  const a = area(k); return crumbs([["Inicio",""],[a[0]]]) + `<h1>${a[2]} ${esc(a[0])}</h1>` +
   levels.map(n => { const ms = MODS.filter(m => m.area === k && m.lvl === n); return ms.length ? `<h2>Nivel ${n}: ${esc(lvlName(n))}</h2><div class="grid">${ms.map(modCard).join("")}</div>` : ""; }).join("");
}
function lessonList(m, cur){
  return `<ol>${m.L.map((x,i) => `<li class="${i===cur?"cur":""}"><span class="st ${P.lessons[lk(m,i)]?"done":""}">${P.lessons[lk(m,i)]?"●":"○"}</span> <a href="${href("m/"+m.id+"/"+(i+1))}">${md(x.t)}</a>${x.star?' <span class="star" title="esencial">★</span>':""}</li>`).join("")}</ol>`;
}
function fieldBlock(k, v){
  if (!v || (Array.isArray(v) && !v.length)) return "";
  return `<div class="panel"><h3>${esc(k)}</h3>${Array.isArray(v) ? `<ul>${v.map(x => `<li>${md(x)}</li>`).join("")}</ul>` : `<p>${md(v)}</p>`}</div>`;
}
function pageModule(id){
  const m = mod(id); if (!m) return nf(); const a = area(m.area);
  const fields = Object.entries(m.f).filter(([k]) => !/^Contexto/.test(k));
  return crumbs([["Inicio",""],["Mapa del curso","curso"],["Nivel "+m.lvl,"nivel/"+m.lvl],[a[0],"area/"+m.area],[m.id]]) +
   `<div class="tag" style="background:${a[1]};color:#fff">${a[2]} ${esc(a[0])} · Nivel ${m.lvl}</div><h1>${m.id}. ${md(m.t)}</h1>
   <p class="meta">${m.L.length} lecciones · ${pct(modDone(m),m.L.length)}% completado</p>${bar(pct(modDone(m),m.L.length))}
   ${m.ctx ? `<div class="panel"><h3>Contexto histórico</h3><p>${md(cap(m.ctx))}</p></div>` : ""}
   <h2>Lecciones</h2><div class="panel">${lessonList(m,-1)}</div>
   ${fields.map(([k,v]) => fieldBlock(k, v)).join("")}
   <h2>Quiz del módulo</h2><p>${P.quiz[m.id]!=null ? "Mejor resultado: " + P.quiz[m.id] + "%" : "10 preguntas · se aprueba con 70 %"}</p><a class="btn" href="${href("m/"+m.id+"/quiz")}">Hacer el quiz</a>${X.moduleExtra ? X.moduleExtra(m) : ""}`;
}
function pageLesson(id, n){
  const m = mod(id); if (!m) return nf(); const i = +n - 1, x = m.L[i]; if (!x) return nf(); const k = lk(m, i), a = area(m.area);
  const items = ITEMS.filter(it => it.mod === m), item = items.length ? items[i % items.length] : null;
  const ex = m.f["Ejercicios"], exList = Array.isArray(ex) ? ex : (ex ? ex.split(/;\s*/) : []), exercise = exList.length ? exList[i % exList.length] : null;
  const errs = m.f["Errores frecuentes"];
  const people = PEOPLE.filter(p => p.mod === m);
  const qs = makeQuestions(m, 5, k);
  P.last = location.hash; save();
  return `<div class="layout"><aside class="side panel"><b>${m.id}. ${md(m.t)}</b>${lessonList(m, i)}<a href="${href("m/"+m.id+"/quiz")}">Quiz del módulo</a></aside><article>
   ${crumbs([["Mapa del curso","curso"],["Nivel "+m.lvl,"nivel/"+m.lvl],[m.id,"m/"+m.id],["Lección "+n]])}
   <div class="tag" style="background:${a[1]};color:#fff">${a[2]} ${esc(a[0])}</div>
   <h1>${md(x.t)} ${x.star?'<span class="star" title="esencial">★</span>':""}</h1>
   <p class="meta">Lección ${n} de ${m.L.length} · ≈ 25 min ${P.lessons[k]?' · <span class="ok">✓ completada</span>':""}</p>
   <div class="panel"><h3>Objetivos</h3><ul><li>Explicar con tus palabras: ${md(x.t)}.</li><li>Relacionarlo con el resto del módulo «${md(m.t)}».</li>${x.extra?`<li>Usar los conceptos clave: ${md(x.extra)}.</li>`:""}</ul></div>
   ${x.extra ? `<div class="formula"><b>Conceptos y herramientas clave:</b> ${md(x.extra)}</div>` : ""}
   ${m.ctx ? `<div class="panel"><h3>Contexto</h3><p>${md(cap(m.ctx))}</p></div>` : ""}
   ${people.length ? `<h2>${esc(C.peopleName)} relacionados</h2><ul class="cols">${people.map(p => `<li><b>${esc(p.name)}</b>${p.note?" — "+esc(p.note):""}</li>`).join("")}</ul>` : ""}
   ${item ? `<h2>${C.toolset==="ciencias"?"Experimento o simulación":"Caso de estudio"}</h2><div class="panel item">${md(item.text)}${C.toolset==="ciencias"?safety(item.text):""}<p><a href="${href("catalogo")}">Ver todos los ${C.catalogName.toLowerCase()} →</a></p></div>` : ""}
   ${exercise ? `<h2>Ejercicio práctico</h2><div class="panel">${md(exercise)}</div>` : ""}
   ${errs ? `<h2>Errores frecuentes</h2><div class="panel">${md(Array.isArray(errs)?errs.join(" "):errs)}</div>` : ""}
   <h2>Mini-quiz</h2>${quizHTML(qs, "lq")}
   <h2>Tus notas</h2><textarea class="note" id="note" data-k="${k}">${esc(P.notes[k]||"")}</textarea>
   <div class="row" style="margin-top:1rem"><button class="btn" id="markdone" data-k="${k}">${P.lessons[k]?"✓ Completada":"Marcar como completada"}</button></div>
   <div class="pn">${i>0?`<a class="btn sec" href="${href("m/"+m.id+"/"+i)}">← Anterior</a>`:`<a class="btn sec" href="${href("m/"+m.id)}">Volver al módulo</a>`}
   ${i<m.L.length-1?`<a class="btn" href="${href("m/"+m.id+"/"+(i+2))}">Siguiente →</a>`:`<a class="btn" href="${href("m/"+m.id+"/quiz")}">Quiz del módulo →</a>`}</div></article></div>`;
}
function safety(t){ const f = flags(t); if (f.red) return `<p class="warn">🔴 Solo en laboratorio supervisado. Nunca en casa.</p>`; if (f.yellow) return `<p class="warn">🟡 Con precaución y con un adulto presente.</p>`; return ""; }
function pageQuiz(id){
  const m = mod(id); if (!m) return nf(); const qs = makeQuestions(m, 10, "Q" + m.id);
  return crumbs([["Mapa del curso","curso"],[m.id,"m/"+m.id],["Quiz"]]) + `<h1>Quiz: ${md(m.t)}</h1><p class="meta">10 preguntas · se aprueba con 70 %</p>${quizHTML(qs,"mq")}`;
}
function pageCatalog(){
  const isSci = C.toolset === "ciencias";
  const filters = isSci ? `<div class="row chips">${[["all","Todos"],["home","🏠 Casa"],["lab","🧪 Laboratorio"],["sim","💻 Simulación"],["green","🟢 Sin riesgo"],["yellow","🟡 Precaución"],["red","🔴 Solo laboratorio"]].map(([k,t]) => `<button class="chip" data-f="${k}">${t}</button>`).join("")}</div>` : "";
  return crumbs([["Inicio",""],[C.catalogName]]) + `<h1>${esc(C.catalogName)}</h1><p class="lead">${ITEMS.length} ${C.catalogName.toLowerCase()} de todos los módulos.</p>${isSci?`<p class="meta">${esc(C.legend)}</p>`:""}
  <input class="note" style="min-height:auto" id="filter" placeholder="Buscar en el catálogo…">${filters}
  <div id="items">${ITEMS.map(it => { const f = isSci ? Object.entries(flags(it.text)).filter(([,v])=>v).map(([k])=>k).join(" ") : ""; const done = P.items[it.id];
    return `<div class="panel item" data-flags="${f}"><div class="meta"><a href="${href("m/"+it.mod.id)}">${it.mod.id}. ${esc(plain(it.mod.t))}</a></div><p>${md(it.text)}</p>${isSci?safety(it.text):""}<label class="meta"><input type="checkbox" data-item="${it.id}" ${done?"checked":""}> ${isSci?"Lo realicé":"Lo analicé"}</label></div>`; }).join("")}</div>`;
}
function pagePeople(){
  return crumbs([["Inicio",""],[C.peopleName]]) + `<h1>${esc(C.peopleName)}</h1><input class="note" style="min-height:auto" id="filter" placeholder="Filtrar…">
  <div class="tablewrap"><table id="ftable"><thead><tr><th>Nombre</th><th>Aportación</th><th>Módulo</th></tr></thead><tbody>${PEOPLE.map(p => `<tr><td><b>${esc(p.name)}</b></td><td>${esc(p.note)}</td><td><a href="${href("m/"+p.mod.id)}">${p.mod.id}. ${esc(plain(p.mod.t))}</a></td></tr>`).join("")}</tbody></table></div>`;
}
function pageResources(){
  const html = []; let list = false;
  D.resources.forEach(l => { if (/^- /.test(l)){ if (!list){ html.push("<ul>"); list = true; } html.push(`<li>${md(l.slice(2))}</li>`); } else { if (list){ html.push("</ul>"); list = false; } if (/^\*\*.+\*\*/.test(l)) html.push(`<p>${md(l)}</p>`); else if (l.trim()) html.push(`<p>${md(l)}</p>`); } });
  if (list) html.push("</ul>");
  return crumbs([["Inicio",""],["Recursos"]]) + `<h1>Recursos sugeridos</h1><div class="panel">${html.join("")}</div>`;
}
function pageProgress(){
  const d = Object.values(P.lessons).filter(Boolean).length, q = Object.values(P.quiz).filter(v => v >= 70).length, it = Object.values(P.items).filter(Boolean).length;
  return crumbs([["Inicio",""],["Mi progreso"]]) + `<h1>Mi progreso</h1><div class="panel"><h3>Progreso global: ${pct(d,TOTAL)}%</h3>${bar(pct(d,TOTAL))}
   <p>${d}/${TOTAL} lecciones · ${q}/${MODS.length} quizzes aprobados · ${it} ${C.catalogName.toLowerCase()} marcados</p></div>
   <h2>Por área</h2><div class="grid">${Object.entries(C.areas).map(([k,a]) => { const ms = MODS.filter(m => m.area===k); if (!ms.length) return ""; const n = ms.reduce((s,m)=>s+m.L.length,0), dd = ms.reduce((s,m)=>s+modDone(m),0); return `<div class="card" style="--c:${a[1]}"><h3>${a[2]} ${esc(a[0])}</h3><div class="meta">${dd}/${n}</div>${bar(pct(dd,n))}</div>`; }).join("")}</div>
   <h2>Módulos</h2><div class="grid">${MODS.map(modCard).join("")}</div><p style="margin-top:2rem"><button class="btn sec" id="reset">Borrar mi progreso</button></p>`;
}
function pageSearch(q){
  q = (q||"").trim().toLowerCase(); const res = [];
  if (q){ MODS.forEach(m => { if (plain(m.t).toLowerCase().includes(q)) res.push(["Módulo", m.id+". "+plain(m.t), "m/"+m.id]); m.L.forEach((x,i) => { if ((x.t+" "+x.extra).toLowerCase().includes(q)) res.push(["Lección", plain(x.t)+" ("+m.id+")", "m/"+m.id+"/"+(i+1)]); }); });
    PEOPLE.forEach(p => { if ((p.name+" "+p.note).toLowerCase().includes(q)) res.push([C.peopleName, p.name, "m/"+p.mod.id]); });
    ITEMS.forEach(it => { if (it.text.toLowerCase().includes(q)) res.push([C.catalogName, plain(it.text).slice(0,120), "m/"+it.mod.id]); }); }
  return `<h1>Resultados: «${esc(q)}»</h1>` + (res.length ? `<ul>${res.slice(0,100).map(r => `<li><span class="tag">${esc(r[0])}</span><a href="${href(r[2])}">${esc(r[1])}</a></li>`).join("")}</ul>` : "<p>Sin resultados.</p>");
}
const nf = () => `<h1>Página no encontrada</h1><p><a href="${href("")}">Inicio</a></p>`;

// ---------- Rutas ----------
function route(){
  const h = location.hash.replace(/^#\/?/, ""), [p0, p1, p2] = h.split("/");
  let html;
  if (!p0) html = pageHome();
  else if (p0 === "curso") html = pageCourse();
  else if (p0 === "nivel") html = pageLevel(p1);
  else if (p0 === "area") html = pageArea(p1);
  else if (p0 === "m" && p2 === "quiz") html = pageQuiz(decodeURIComponent(p1));
  else if (p0 === "m" && p2) html = pageLesson(decodeURIComponent(p1), p2);
  else if (p0 === "m") html = pageModule(decodeURIComponent(p1));
  else if (p0 === "catalogo") html = pageCatalog();
  else if (p0 === "personas") html = pagePeople();
  else if (p0 === "herramientas") html = window.TOOLS ? window.TOOLS.page() : nf();
  else if (p0 === "recursos") html = pageResources();
  else if (p0 === "progreso") html = pageProgress();
  else if (p0.startsWith("buscar")) html = pageSearch(decodeURIComponent(h.split("?q=")[1]||""));
  else if (X.routes && X.routes[p0]) html = X.routes[p0](p1, p2);
  else html = nf();
  const nav = [["","Inicio"],["curso","Mapa del curso"],["catalogo",C.catalogName],["personas",C.peopleName],["herramientas","Herramientas"],...(X.nav||[]),["recursos","Recursos"],["progreso","Mi progreso"]];
  document.getElementById("mainnav").innerHTML = nav.map(([p,t]) => `<a href="${href(p)}" class="${p0===p||(!p0&&!p)?"on":""}">${t}</a>`).join("");
  const same = app.dataset.route === h, y = scrollY; app.innerHTML = html; app.dataset.route = h; scrollTo(0, same ? y : 0);
  document.title = (app.querySelector("h1")?.textContent || "") + " · " + C.short;
  bind();
}
function bind(){
  const note = document.getElementById("note"); if (note) note.oninput = () => { P.notes[note.dataset.k] = note.value; save(); };
  const mdn = document.getElementById("markdone"); if (mdn) mdn.onclick = () => { P.lessons[mdn.dataset.k] = !P.lessons[mdn.dataset.k]; save(); route(); };
  app.querySelectorAll("[data-check]").forEach(b => b.onclick = () => { let ok = 0; const qs = app.querySelectorAll(".q");
    qs.forEach(q => { const s = q.querySelector("input:checked"), fb = q.querySelector(".fb"); if (s && s.value === q.dataset.a){ ok++; fb.innerHTML = '<span class="ok">¡Correcto!</span>'; } else fb.innerHTML = `<span class="bad">Incorrecto.</span> Respuesta: ${esc(q.dataset.a)}`; });
    const p = pct(ok, qs.length); document.getElementById(b.dataset.check+"-res").innerHTML = `Resultado: ${ok}/${qs.length} (${p}%) — ${p>=70?'<span class="ok">Aprobado</span>':'<span class="bad">No aprobado (se necesita 70 %)</span>'}`;
    if (b.dataset.check === "mq"){ const id = decodeURIComponent(location.hash.split("/")[2]); P.quiz[id] = Math.max(P.quiz[id]||0, p); save(); } });
  const f = document.getElementById("filter"); if (f) f.oninput = () => { const v = f.value.toLowerCase(); document.querySelectorAll("#ftable tbody tr, #items .item").forEach(e => e.style.display = e.textContent.toLowerCase().includes(v) ? "" : "none"); };
  document.querySelectorAll(".chip").forEach(c => c.onclick = () => { document.querySelectorAll(".chip").forEach(x => x.classList.remove("on")); c.classList.add("on"); document.querySelectorAll("#items .item").forEach(e => e.style.display = c.dataset.f === "all" || e.dataset.flags.includes(c.dataset.f) ? "" : "none"); });
  document.querySelectorAll("[data-item]").forEach(c => c.onchange = () => { P.items[c.dataset.item] = c.checked; save(); });
  const rs = document.getElementById("reset"); if (rs) rs.onclick = () => { if (confirm("¿Seguro? Se borrará todo tu progreso.")){ P = {lessons:{}, quiz:{}, notes:{}, items:{}, last:null}; save(); route(); } };
  if (window.TOOLS && location.hash.startsWith("#/herramientas")) window.TOOLS.bind();
  if (X.bind) X.bind(location.hash.replace(/^#\/?/, "").split("/")[0]);
}
document.getElementById("brand").textContent = C.short; document.getElementById("brand").href = "#/";
document.getElementById("foot").textContent = C.footer;
document.getElementById("searchform").onsubmit = e => { e.preventDefault(); location.hash = "#/buscar?q=" + encodeURIComponent(document.getElementById("q").value); };
document.getElementById("theme").onclick = () => { const r = document.documentElement, dark = r.dataset.theme ? r.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches; r.dataset.theme = dark ? "light" : "dark"; store.set(KEY+"_theme", r.dataset.theme); };
const th = store.get(KEY+"_theme", null); if (th) document.documentElement.dataset.theme = th;
window.addEventListener("hashchange", route); route();
})();
