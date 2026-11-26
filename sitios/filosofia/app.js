(function(){
"use strict";
const MODS = window.MODULES, LV = window.LEVELS;
const app = document.getElementById("app");
const store = {
  get(k, d){ try{ const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; }catch(e){ return d; } },
  set(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
};
let P = store.get("fil_prog", {lessons:{}, quiz:{}, notes:{}, last:null});
const save = () => store.set("fil_prog", P);

let lang = "es";
const L = () => window.UI[lang];
const T = (pair) => Array.isArray(pair) ? pair[lang === "es" ? 0 : 1] : pair;
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const fmt = (s, o) => s.replace(/\{(\w+)\}/g, (_, k) => o[k]);
const href = (path) => "#/" + lang + "/" + path;
const modById = (id) => MODS.find(m => m.id === id);
const lvl = (n) => LV.find(l => l.n === n);

// Philosopher pool (for indices and quizzes)
const PH = [];
MODS.forEach(m => m.ph.forEach(p => PH.push({name:p[0], dates:p[1], idea:[p[2],p[3]], works:[p[4],p[5]], mod:m})));

// Seeded RNG for stable quizzes
function rng(seed){ let s = 0; for (const c of seed) s = (s*31 + c.charCodeAt(0)) >>> 0; return () => { s = (s*1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
function shuffle(a, r){ a = a.slice(); for (let i=a.length-1;i>0;i--){ const j = Math.floor(r()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }

function makeQuestions(pool, n, seed){
  const r = rng(seed + lang), qs = [];
  const people = shuffle(pool, r);
  for (let i=0; i<people.length && qs.length<n; i++){
    const p = people[i], kind = i % 3;
    const others = shuffle(PH.filter(x => x.name !== p.name), r);
    if (kind === 0){
      const w = T(p.works).split(";")[0].trim();
      const opts = shuffle([p.name, ...others.slice(0,3).map(o=>o.name)], r);
      qs.push({q: fmt(L().whoWrote, {w}), opts, a: p.name});
    } else if (kind === 1){
      const opts = shuffle([T(p.idea), ...others.filter(o=>T(o.idea)!==T(p.idea)).slice(0,3).map(o=>T(o.idea))], r);
      qs.push({q: fmt(L().whichIdea, {p: p.name}), opts, a: T(p.idea)});
    } else {
      const otherMods = shuffle(MODS.filter(m => m.id !== p.mod.id && m.ph.length), r).slice(0,3);
      const opts = shuffle([T(p.mod.t), ...otherMods.map(m=>T(m.t))], r);
      qs.push({q: fmt(L().whichCurrent, {p: p.name}), opts, a: T(p.mod.t)});
    }
  }
  return qs;
}

function quizHTML(qs, id){
  return qs.map((q, i) => `<div class="q" data-a="${esc(q.a)}"><b>${i+1}. ${esc(q.q)}</b>
    ${q.opts.map(o => `<label><input type="radio" name="${id}-${i}" value="${esc(o)}"> ${esc(o)}</label>`).join("")}
    <div class="fb" aria-live="polite"></div></div>`).join("") +
    `<div class="row"><button class="btn" data-check="${id}">${L().check}</button><span id="${id}-res" aria-live="polite"></span></div>`;
}
function gradeQuiz(id){
  const qs = app.querySelectorAll(".q"); let ok = 0;
  qs.forEach(q => {
    const sel = q.querySelector("input:checked"), fb = q.querySelector(".fb"), a = q.dataset.a;
    if (sel && sel.value === a){ ok++; fb.innerHTML = `<span class="ok">${L().correct}</span>`; }
    else fb.innerHTML = `<span class="bad">${L().wrong}</span> ${esc(a)}`;
  });
  return {ok, n: qs.length};
}

// Progress helpers
const lkey = (m, i) => m.id + "-" + i;
const modDone = (m) => m.L.filter((_, i) => P.lessons[lkey(m, i)]).length;
const totalLessons = MODS.reduce((s, m) => s + m.L.length, 0);
const doneLessons = () => Object.keys(P.lessons).filter(k => P.lessons[k]).length;
const pct = (a, b) => b ? Math.round(100 * a / b) : 0;
const bar = (p) => `<div class="bar" aria-label="${p}%"><i style="width:${p}%"></i></div>`;

// ---------- Pages ----------
function crumbs(items){ return `<div class="crumbs">${items.map(([t, h]) => h ? `<a href="${href(h)}">${esc(t)}</a>` : esc(t)).join(" › ")}</div>`; }

function pageHome(){
  const last = P.last ? `<a class="btn sec" href="#${P.last.replace(/^#?\/(es|en)\//, "/"+lang+"/")}">${L().cont}</a>` : "";
  return `<h1>${L().brand}</h1><p class="lead">${L().heroSub}</p>
  <div class="row"><a class="btn" href="${href("m/M0")}">${L().start}</a>${last}</div>
  <blockquote class="quote">${lang==="es" ? "«Todos los hombres desean por naturaleza saber.» — Aristóteles, Metafísica I" : "“All men by nature desire to know.” — Aristotle, Metaphysics I"}</blockquote>
  <h2>${L().how}</h2><div class="grid">
   <div class="card"><h3>1</h3><p>${L().how1}</p></div><div class="card"><h3>2</h3><p>${L().how2}</p></div><div class="card"><h3>3</h3><p>${L().how3}</p></div></div>
  <h2>${L().levels}</h2>${levelsGrid()}`;
}
function levelsGrid(){
  return `<div class="grid">${LV.map(l => {
    const ms = MODS.filter(m => m.lvl === l.n), n = ms.reduce((s,m)=>s+m.L.length,0), d = ms.reduce((s,m)=>s+modDone(m),0);
    return `<a class="card" style="--c:${l.c}" href="${href("nivel/"+l.n)}"><div class="meta">${L().level} ${l.n}</div><h3>${esc(T(l.t))}</h3>
      <div class="meta">${ms.length} ${L().modules.toLowerCase()} · ${n} ${L().lessons}</div>${bar(pct(d,n))}</a>`;
  }).join("")}</div>`;
}
function pageCourse(){
  return crumbs([[L().nav.home,""],[L().nav.course]]) + `<h1>${L().nav.course}</h1>
   <p class="lead">${MODS.length} ${L().modules.toLowerCase()} · ${totalLessons} ${L().lessons}</p>` +
   LV.map(l => `<div class="lvlhead" style="--c:${l.c}"><span class="dot"></span><h2>${L().level} ${l.n}: ${esc(T(l.t))}</h2></div>` + modGrid(MODS.filter(m => m.lvl === l.n), l.c)).join("");
}
function modGrid(ms, c){
  return `<div class="grid">${ms.map(m => `<a class="card" style="--c:${c}" href="${href("m/"+m.id)}"><div class="meta">${m.id} · ${esc(T(m.per))}</div>
   <h3>${esc(T(m.t))}</h3><div class="meta">${m.L.length} ${L().lessons}${P.quiz[m.id]>=70?" · ✓ quiz":""}</div>${bar(pct(modDone(m), m.L.length))}</a>`).join("")}</div>`;
}
function pageLevel(n){
  const l = lvl(+n); if (!l) return notFound();
  return crumbs([[L().nav.home,""],[L().nav.course,"curso"],[L().level+" "+n]]) +
   `<h1>${L().level} ${n}: ${esc(T(l.t))}</h1><div class="panel"><h3>${L().objectives}</h3><ul>${l.obj.map(o=>`<li>${esc(T(o))}</li>`).join("")}</ul></div>` +
   modGrid(MODS.filter(m => m.lvl === l.n), l.c);
}
function lessonList(m, cur){
  return `<ol>${m.L.map((x, i) => `<li class="${i===cur?"cur":""}"><span class="st ${P.lessons[lkey(m,i)]?"done":""}">${P.lessons[lkey(m,i)]?"●":"○"}</span>
   <a href="${href("m/"+m.id+"/"+(i+1))}">${esc(T(x))}</a>${x[2]?` <span class="star" title="${L().essential}">★</span>`:""}</li>`).join("")}</ol>`;
}
function phTable(list){
  if (!list.length) return "";
  return `<div class="tablewrap"><table><thead><tr><th>${L().philosophers}</th><th>${L().dates}</th><th>${L().ideas}</th><th>${L().texts}</th></tr></thead><tbody>
   ${list.map(p => `<tr><td><b>${esc(p[0])}</b></td><td>${esc(p[1])}</td><td>${esc(lang==="es"?p[2]:p[3])}</td><td><i>${esc(lang==="es"?p[4]:p[5])}</i></td></tr>`).join("")}</tbody></table></div>`;
}
function pageModule(id){
  const m = modById(id); if (!m) return notFound(); const l = lvl(m.lvl);
  return crumbs([[L().nav.home,""],[L().nav.course,"curso"],[L().level+" "+m.lvl,"nivel/"+m.lvl],[m.id]]) +
   `<h1>${m.id}. ${esc(T(m.t))}</h1><p class="meta">${esc(T(m.per))} · ${m.L.length} ${L().lessons} · ${pct(modDone(m),m.L.length)}%</p>${bar(pct(modDone(m),m.L.length))}
   <div class="panel"><h3>${L().context}</h3><p>${esc(T(m.ctx))}</p></div>
   ${m.ph.length?`<h2>${L().philosophers}</h2>${phTable(m.ph)}`:""}
   <h2>${L().lessonsList}</h2><div class="panel side" style="position:static;max-height:none">${lessonList(m,-1)}</div>
   <h2>${L().activities}</h2><ul>${m.A.map(a=>`<li>${esc(T(a))}</li>`).join("")}</ul>
   ${m.ph.length?`<h2>${L().quiz}</h2><p>${P.quiz[m.id]!=null?`${L().score}: ${P.quiz[m.id]}%`:""}</p><a class="btn" href="${href("m/"+m.id+"/quiz")}">${L().takeQuiz}</a>`:""}`;
}
function figuresFor(m, title){
  const t = title.toLowerCase();
  const hits = m.ph.filter(p => { const parts = p[0].toLowerCase().replace(/[()]/g,"").split(/\s+/).filter(w => w.length > 3 && !["von","della","del","de","las"].includes(w)); return parts.some(w => t.includes(w)); });
  return hits.length ? hits : m.ph.slice(0, 3);
}
function pageLesson(id, n){
  const m = modById(id); if (!m) return notFound(); const i = +n - 1, x = m.L[i]; if (!x) return notFound();
  const k = lkey(m, i), title = T(x), figs = figuresFor(m, x[0] + " " + x[1]);
  const act = m.A[i % m.A.length];
  const pool = figs.map(p => PH.find(q => q.name === p[0] && q.mod.id === m.id)).filter(Boolean);
  const qs = pool.length ? makeQuestions(pool.length >= 3 ? pool : PH.filter(q => q.mod.id === m.id), 3, k) : [];
  P.last = location.hash; save();
  return `<div class="layout"><aside class="side panel"><b>${m.id}. ${esc(T(m.t))}</b>${lessonList(m, i)}<a href="${href("m/"+m.id+"/quiz")}">${L().quiz}</a></aside><article>
   ${crumbs([[L().nav.course,"curso"],[L().level+" "+m.lvl,"nivel/"+m.lvl],[m.id,"m/"+m.id],[L().lesson+" "+n]])}
   <h1>${esc(title)} ${x[2]?`<span class="star" title="${L().essential}">★</span>`:""}</h1>
   <p class="meta">${L().lesson} ${n}/${m.L.length} · ≈ 25 min ${P.lessons[k]?` · <span class="ok">✓ ${L().done}</span>`:""}</p>
   <div class="quote">${L().trigger}: ${esc(T(m.trig))}</div>
   <p>${esc(fmt(L().lessonIntro, {m: T(m.t)}))}</p>
   <div class="panel"><h3>${L().context}</h3><p>${esc(T(m.ctx))}</p></div>
   ${figs.length?`<h2>${L().keyFigures}</h2>${phTable(figs)}`:""}
   <h2>${L().activity}</h2><div class="panel"><p>${esc(T(act))}</p></div>
   ${qs.length?`<h2>${L().miniquiz}</h2>${quizHTML(qs, "lq")}`:""}
   <h2>${L().yourNotes}</h2><textarea class="note" id="note">${esc(P.notes[k]||"")}</textarea>
   <div class="row" style="margin-top:1rem"><button class="btn" id="markdone">${P.lessons[k]?"✓ "+L().done:L().markDone}</button></div>
   <div class="pn">${i>0?`<a class="btn sec" href="${href("m/"+m.id+"/"+i)}">${L().prev}</a>`:`<a class="btn sec" href="${href("m/"+m.id)}">${L().back}</a>`}
   ${i<m.L.length-1?`<a class="btn" href="${href("m/"+m.id+"/"+(i+2))}">${L().next}</a>`:`<a class="btn" href="${href("m/"+m.id+"/quiz")}">${L().quiz} →</a>`}</div>
   </article></div>`;
}
function pageQuiz(id){
  const m = modById(id); if (!m) return notFound();
  const pool = PH.filter(q => q.mod.id === m.id);
  const qs = makeQuestions(pool.length >= 4 ? pool.concat(pool) : PH.filter(q => q.mod.lvl === m.lvl), 10, "Q"+m.id);
  return crumbs([[L().nav.course,"curso"],[m.id,"m/"+m.id],[L().quiz]]) + `<h1>${L().quiz}: ${esc(T(m.t))}</h1>
   <p class="meta">${qs.length} · ≥ 70 %</p>${quizHTML(qs, "mq")}<p><a href="${href("m/"+m.id)}">${L().back}</a></p>`;
}
function pagePhil(){
  const list = PH.slice().sort((a,b) => a.mod.lvl - b.mod.lvl);
  return crumbs([[L().nav.home,""],[L().nav.philosophers]]) + `<h1>${L().allPhil}</h1>
   <input class="note" style="min-height:auto" id="filter" placeholder="${L().filter}">
   <div class="tablewrap"><table id="ftable"><thead><tr><th>${L().philosophers}</th><th>${L().dates}</th><th>${L().ideas}</th><th>${L().module}</th></tr></thead><tbody>
   ${list.map(p => `<tr><td><b>${esc(p.name)}</b></td><td>${esc(p.dates)}</td><td>${esc(T(p.idea))}</td><td><a href="${href("m/"+p.mod.id)}">${p.mod.id}. ${esc(T(p.mod.t))}</a></td></tr>`).join("")}</tbody></table></div>`;
}
function pageWorks(){
  const rows = [];
  PH.forEach(p => T(p.works).split(";").forEach(w => { w = w.trim(); if (w) rows.push([w, p.name, p.mod]); }));
  rows.sort((a,b) => a[2].lvl - b[2].lvl);
  return crumbs([[L().nav.home,""],[L().nav.works]]) + `<h1>${L().allWorks}</h1>
   <input class="note" style="min-height:auto" id="filter" placeholder="${L().filter}">
   <div class="tablewrap"><table id="ftable"><thead><tr><th>${L().texts}</th><th>${L().philosophers}</th><th>${L().module}</th></tr></thead><tbody>
   ${rows.map(r => `<tr><td><i>${esc(r[0])}</i></td><td>${esc(r[1])}</td><td><a href="${href("m/"+r[2].id)}">${r[2].id}</a></td></tr>`).join("")}</tbody></table></div>`;
}
function pageGlossary(){
  const g = window.GLOSSARY.slice().sort((a,b) => (lang==="es"?a[0]:a[1]).localeCompare(lang==="es"?b[0]:b[1], lang));
  return crumbs([[L().nav.home,""],[L().nav.glossary]]) + `<h1>${L().glossaryTitle}</h1>
   <input class="note" style="min-height:auto" id="filter" placeholder="${L().filter}">
   <div class="tablewrap"><table id="ftable"><tbody>${g.map(e => `<tr><td><b>${esc(lang==="es"?e[0]:e[1])}</b><div class="meta">${esc(e[2])}</div></td><td>${esc(lang==="es"?e[3]:e[4])}</td></tr>`).join("")}</tbody></table></div>`;
}
function pageResources(){
  return crumbs([[L().nav.home,""],[L().nav.resources]]) + `<h1>${L().resourcesTitle}</h1>` +
   window.RESOURCES[lang].map(r => `<div class="panel"><h3>${esc(r[0])}</h3><p>${esc(r[1])}</p></div>`).join("");
}
function pageProgress(){
  const d = doneLessons(), qp = Object.values(P.quiz).filter(v => v >= 70).length;
  return crumbs([[L().nav.home,""],[L().progressTitle]]) + `<h1>${L().progressTitle}</h1>
   <div class="panel"><h3>${L().overall}: ${pct(d,totalLessons)}%</h3>${bar(pct(d,totalLessons))}
   <p>${d}/${totalLessons} ${L().lessonsDone} · ${qp}/${MODS.filter(m=>m.ph.length).length} ${L().quizzesPassed}</p></div>
   ${LV.map(l => `<div class="lvlhead" style="--c:${l.c}"><span class="dot"></span><h3>${L().level} ${l.n}: ${esc(T(l.t))}</h3></div>` + modGrid(MODS.filter(m=>m.lvl===l.n), l.c)).join("")}
   <p style="margin-top:2rem"><button class="btn sec" id="reset">${L().reset}</button></p>`;
}
function pageSearch(q){
  q = (q || "").trim().toLowerCase(); const res = [];
  if (q) {
    MODS.forEach(m => {
      if ((m.t[0]+" "+m.t[1]+" "+m.ctx[0]+" "+m.ctx[1]).toLowerCase().includes(q)) res.push([`${m.id}. ${T(m.t)}`, "m/"+m.id, L().module]);
      m.L.forEach((x,i) => { if ((x[0]+" "+x[1]).toLowerCase().includes(q)) res.push([T(x), "m/"+m.id+"/"+(i+1), L().lesson+" · "+m.id]); });
    });
    PH.forEach(p => { if ((p.name+" "+p.idea.join(" ")+" "+p.works.join(" ")).toLowerCase().includes(q)) res.push([p.name+" — "+T(p.idea), "m/"+p.mod.id, L().philosophers]); });
    window.GLOSSARY.forEach(g => { if (g.join(" ").toLowerCase().includes(q)) res.push([(lang==="es"?g[0]:g[1])+" — "+(lang==="es"?g[3]:g[4]), "glosario", L().nav.glossary]); });
  }
  return `<h1>${L().searchTitle}: «${esc(q)}»</h1>` + (res.length ? `<ul>${res.slice(0,80).map(r => `<li><span class="tag">${esc(r[2])}</span><a href="${href(r[1])}">${esc(r[0])}</a></li>`).join("")}</ul>` : `<p>${L().noResults}</p>`);
}
function notFound(){ return `<h1>404</h1><p><a href="${href("")}">${L().nav.home}</a></p>`; }

// ---------- Router ----------
function route(){
  const h = location.hash.replace(/^#\/?/, "");
  let [lg, ...rest] = h.split("/");
  if (lg !== "es" && lg !== "en"){ const pref = store.get("fil_lang", null) || ((navigator.language||"es").startsWith("es") ? "es" : "en"); location.replace("#/" + pref + "/" + h); return; }
  lang = lg; store.set("fil_lang", lang);
  document.documentElement.lang = lang;
  const path = rest.join("/"), [p0, p1, p2] = rest;
  let html;
  if (!p0) html = pageHome();
  else if (p0 === "curso") html = pageCourse();
  else if (p0 === "nivel") html = pageLevel(p1);
  else if (p0 === "m" && p2 === "quiz") html = pageQuiz(p1);
  else if (p0 === "m" && p2) html = pageLesson(p1, p2);
  else if (p0 === "m") html = pageModule(p1);
  else if (p0 === "filosofos") html = pagePhil();
  else if (p0 === "obras") html = pageWorks();
  else if (p0 === "glosario") html = pageGlossary();
  else if (p0 === "recursos") html = pageResources();
  else if (p0 === "progreso") html = pageProgress();
  else if (p0.startsWith("buscar")) html = pageSearch(decodeURIComponent((path.split("?q=")[1]||"")));
  else html = notFound();
  chrome(p0 || "");
  const y = window.scrollY, sameRoute = app.dataset.route === path;
  app.innerHTML = html; app.dataset.route = path;
  if (!sameRoute) window.scrollTo(0, 0); else window.scrollTo(0, y);
  document.title = (app.querySelector("h1")?.textContent || "") + " · " + L().brand;
  bind();
}
function chrome(cur){
  document.getElementById("brand").textContent = L().brand;
  document.getElementById("brand").href = href("");
  const nav = [["",L().nav.home],["curso",L().nav.course],["filosofos",L().nav.philosophers],["obras",L().nav.works],["glosario",L().nav.glossary],["recursos",L().nav.resources],["progreso",L().nav.progress]];
  document.getElementById("mainnav").innerHTML = nav.map(([p,t]) => `<a href="${href(p)}" class="${cur===p?"on":""}">${t}</a>`).join("");
  document.getElementById("q").placeholder = L().searchPh;
  document.getElementById("q").setAttribute("aria-label", L().searchPh);
  document.getElementById("theme").setAttribute("aria-label", L().theme);
  document.getElementById("btn-es").setAttribute("aria-pressed", lang === "es");
  document.getElementById("btn-en").setAttribute("aria-pressed", lang === "en");
  document.getElementById("foot").textContent = L().footer;
}
function bind(){
  const note = document.getElementById("note");
  if (note){ const k = location.hash.split("/").slice(3,5).join("-").replace(/^(M\d+)-(\d+)$/, (_,a,b) => a+"-"+(b-1)); note.oninput = () => { P.notes[k] = note.value; save(); }; }
  const md = document.getElementById("markdone");
  if (md){ const parts = location.hash.split("/"); const k = parts[3] + "-" + (parts[4]-1); md.onclick = () => { P.lessons[k] = !P.lessons[k]; save(); route(); }; }
  app.querySelectorAll("[data-check]").forEach(b => b.onclick = () => {
    const id = b.dataset.check, r = gradeQuiz(id), p = pct(r.ok, r.n), out = document.getElementById(id + "-res");
    out.innerHTML = `${L().score}: ${r.ok}/${r.n} (${p}%) — ${p>=70?`<span class="ok">${L().passed}</span>`:`<span class="bad">${L().failed}</span>`}`;
    if (id === "mq"){ const mid = location.hash.split("/")[3]; P.quiz[mid] = Math.max(P.quiz[mid]||0, p); save(); }
  });
  const f = document.getElementById("filter");
  if (f) f.oninput = () => { const v = f.value.toLowerCase(); document.querySelectorAll("#ftable tbody tr").forEach(tr => tr.style.display = tr.textContent.toLowerCase().includes(v) ? "" : "none"); };
  const rs = document.getElementById("reset");
  if (rs) rs.onclick = () => { if (confirm(L().resetConfirm)){ P = {lessons:{}, quiz:{}, notes:{}, last:null}; save(); route(); } };
}
document.querySelectorAll(".langtoggle button").forEach(b => b.onclick = () => {
  const rest = location.hash.replace(/^#\/(es|en)\/?/, "");
  location.hash = "#/" + b.dataset.lang + "/" + rest;
});
document.getElementById("searchform").onsubmit = (e) => { e.preventDefault(); location.hash = href("buscar?q=" + encodeURIComponent(document.getElementById("q").value)); };
document.getElementById("theme").onclick = () => {
  const r = document.documentElement, dark = r.dataset.theme ? r.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  r.dataset.theme = dark ? "light" : "dark"; store.set("fil_theme", r.dataset.theme);
};
const th = store.get("fil_theme", null); if (th) document.documentElement.dataset.theme = th;
window.addEventListener("hashchange", route);
route();
})();
