(function(){
"use strict";
const app = document.getElementById("app"), PF = window.PERFILES, BR = window.BREVES, CATS = window.CATS;
const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const norm = s => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9ñ ]/g, " ").replace(/\s+/g, " ").trim();
const href = p => "#/" + p;
const yr = y => y < 0 ? (-y) + " a. C." : y;
const store = { get(k,d){ try{ const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; }catch(e){ return d; } }, set(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} } };
const ALL = PF.map(p => ({...p, full:true})).concat(BR.map(b => ({slug: norm(b[0]).replace(/ /g,"-"), nombre:b[0], fechas:b[1], cats:[b[2]], epoca:b[3], region:b[4], resumen:b[5], full:false, vivo:/–$/.test(b[1])})));
const bySlug = s => ALL.find(p => p.slug === s);
const catTag = c => `<span class="tag" style="background:${CATS[c][1]};color:#fff">${esc(CATS[c][0])}</span>`;
const VERDICT = {ver:["Verificada","ver"], dud:["Dudosa","dud"], apo:["Apócrifa o mal atribuida","apo"]};

// ---------- Buscador con recuadro ----------
const STOP = new Set(["que","quien","quienes","cuando","como","por","para","con","los","las","del","una","uno","fue","era","son","dijo","hizo","significa","cual","cuales","donde","sobre","sus","esta","este"]);
function score(qn, text){ const words = qn.split(" ").filter(w => w.length > 2 && !STOP.has(w)); if (!words.length) return 0; const t = norm(text); return words.filter(w => t.includes(w)).length / words.length; }
function answer(q){
  const qn = norm(q); if (!qn) return null;
  // Comparación
  const vs = qn.split(/ (?:vs|versus|contra|frente a|y) /);
  if (vs.length === 2){ const a = findPerson(vs[0]), b = findPerson(vs[1]); if (a && b && a !== b) return {kind:"Comparación", html:`<p>${esc(a.nombre)} (${esc(a.fechas)}) frente a ${esc(b.nombre)} (${esc(b.fechas)}).</p><a class="btn" href="${href("comparar/"+a.slug+"/"+b.slug)}">Ver la comparación</a>`}; }
  const gFirst = /^(que es|que son|que significa|que fue|significado de|definicion de)\b/.test(qn);
  if (gFirst){ const term = qn.replace(/^(que es|que son|que significa|que fue|significado de|definicion de)\s*(el |la |los |las |un |una )?/, "");
    const g0 = window.GLOSARIO.find(e => norm(e[0]).includes(term) || term.includes(norm(e[0]).split(" ")[0]));
    if (g0 && term.length > 2) return {kind:"Término", html:`<p><b>${esc(g0[0])}</b>: ${esc(g0[1])}</p>${g0[2]?`<p class="meta">Relacionado con <a href="${href("p/"+g0[2])}">${esc(bySlug(g0[2]).nombre)}</a></p>`:""}`}; }
  const p0 = findPersonScored(qn);
  if (p0.s >= 2 && qn.split(" ").every(w => norm(p0.p.nombre + " " + (p0.p.alias||[]).join(" ")).includes(w))) { const p = p0.p; return {kind:"Personaje", html:`<p><b>${esc(p.nombre)}</b> (${esc(p.fechas)}) · ${p.cats.map(catTag).join("")}</p><p>${esc(p.resumen)}</p><a class="btn" href="${href("p/"+p.slug)}">${p.full ? "Leer el perfil" : "Ver la ficha"}</a>`}; }
  // Pregunta frecuente
  let best = null, bs = 0; window.FAQ.forEach(f => { const s = Math.max(score(qn, f.q), f.k.filter(k => qn.includes(norm(k))).length / Math.max(2, f.k.length/2)); if (s > bs){ bs = s; best = f; } });
  const isQ = /^(que|quien|cuando|como|por que|cuantos|cuantas|donde|cual)\b/.test(qn) || q.includes("?");
  if (best && bs >= (isQ ? 0.5 : 0.75)){ const link = best.s.startsWith("tema:") ? href("temas#"+best.s.slice(5)) : href("p/"+best.s);
    return {kind:"Respuesta", html:`<p><b>${esc(best.q)}</b></p><p>${esc(best.a)}</p><p class="meta">Fuente: contenido del sitio · <a href="${link}">Leer más</a></p>`}; }
  // Cita
  const cites = allQuotes().map(c => ({c, s: score(qn, c[0])})).sort((a,b) => b.s - a.s);
  if (cites.length && cites[0].s >= 0.6){ const c = cites[0].c, v = VERDICT[c[3]];
    return {kind:"Frase o cita", html:`<p class="quote">${esc(c[0])}</p><p>Atribuida a <b>${esc(c[1])}</b>. <span class="v ${v[1]}">${v[0]}</span></p><p class="meta">${esc(c[2])}</p>`}; }
  // Personaje
  const p = findPerson(qn);
  if (p && !isQ) return {kind:"Personaje", html:`<p><b>${esc(p.nombre)}</b> (${esc(p.fechas)}) · ${p.cats.map(catTag).join("")}</p><p>${esc(p.resumen)}</p><a class="btn" href="${href("p/"+p.slug)}">${p.full ? "Leer el perfil" : "Ver la ficha"}</a>`};
  // Término del glosario
  const g = window.GLOSARIO.map(e => ({e, s: Math.max(score(qn, e[0]), norm(qn).includes(norm(e[0])) ? 1 : 0)})).sort((a,b) => b.s - a.s)[0];
  if (g && g.s >= 0.6){ const e = g.e; return {kind:"Término", html:`<p><b>${esc(e[0])}</b>: ${esc(e[1])}</p>${e[2]?`<p class="meta">Relacionado con <a href="${href("p/"+e[2])}">${esc(bySlug(e[2]).nombre)}</a></p>`:""}`}; }
  // Fecha o hecho en las cronologías
  const ev = []; PF.forEach(p => p.crono.forEach(c => ev.push({p, y:c[0], t:c[1]})));
  const e2 = ev.map(e => ({e, s: score(qn, e.t + " " + e.p.nombre)})).sort((a,b) => b.s - a.s)[0];
  if (e2 && e2.s >= 0.67) return {kind:"Fecha", html:`<p><b>${yr(e2.e.y)}</b>: ${esc(e2.e.t)} (${esc(e2.e.p.nombre)}).</p><a href="${href("p/"+e2.e.p.slug)}#crono">Ver la cronología</a>`};
  if (p) return {kind:"Personaje", html:`<p><b>${esc(p.nombre)}</b> (${esc(p.fechas)})</p><p>${esc(p.resumen)}</p><a class="btn" href="${href("p/"+p.slug)}">Abrir</a>`};
  const sug = ALL.map(x => ({x, s: score(qn, x.nombre + " " + x.resumen)})).filter(o => o.s > 0).sort((a,b) => b.s - a.s).slice(0,3);
  return {kind:"Sin respuesta", none:true, html:`<p>No tenemos información sobre esto todavía. Prueba con un personaje, un término (p. ej., «Lebensraum») o una pregunta como «¿Cómo llegó Hitler al poder?».</p>${sug.length?`<p class="meta">Quizá te interese: ${sug.map(o => `<a href="${href("p/"+o.x.slug)}">${esc(o.x.nombre)}</a>`).join(" · ")}</p>`:""}<button class="btn sec" data-fb="tema">Proponer un tema</button>`};
}
function findPerson(qn){ return findPersonScored(qn).p; }
function findPersonScored(qn){ qn = norm(qn); let best = null, bs = 0;
  ALL.forEach(p => { const names = [p.nombre, ...(p.alias||[])]; names.forEach(n => { const nn = norm(n); let s = qn === nn ? 3 : qn.includes(nn) ? 2 : nn.split(" ").includes(qn) && qn.length >= 3 ? 2 : nn.split(" ").some(w => w.length > 3 && qn.split(" ").includes(w)) ? 1 : 0; if (s > bs){ bs = s; best = p; } }); });
  return {p: best, s: bs}; }
function allQuotes(){ const out = []; PF.forEach(p => (p.citas||[]).forEach(c => out.push([c[0], p.nombre, c[1], c[2]]))); return out.concat(window.CITAS_EXTRA); }
function infobox(q){ const a = answer(q); if (!a) return "";
  if (a.none){ const log = store.get("pp_sin_respuesta", []); if (!log.includes(q)) { log.push(q); store.set("pp_sin_respuesta", log.slice(-100)); } }
  const fb = a.none ? "" : `<div class="fb"><span class="meta">¿Te sirvió esta respuesta?</span> <button class="btn sec" data-fb="si">Sí</button> <button class="btn sec" data-fb="no">No</button> <button class="btn sec" data-fb="error">Informar de un error</button></div>`;
  return `<div class="infobox" role="status" data-q="${esc(q)}"><div class="kind">${esc(a.kind)}</div>${a.html}${fb}<p class="meta fbmsg" aria-live="polite"></p></div>`; }

// ---------- Páginas ----------
const crumbs = items => `<div class="crumbs">${items.map(([t,h]) => h != null ? `<a href="${href(h)}">${esc(t)}</a>` : esc(t)).join(" › ")}</div>`;
function card(p){ return `<a class="card" style="--c:${CATS[p.cats[0]][1]}" href="${href("p/"+p.slug)}"><div class="meta">${esc(p.fechas)} · ${esc(p.region)}</div><h3>${esc(p.nombre)}</h3><div class="meta">${esc(CATS[p.cats[0]][0])}${p.full?" · perfil completo":" · ficha breve"}</div></a>`; }
function pageHome(){
  const feat = PF[Math.floor(Date.now()/604800000) % PF.length];
  return `<h1>Personas Poderosas</h1><p class="lead">Cómo se gana, se usa y se pierde el poder: biografías con fuentes, decisiones clave, controversias y legado.</p>
  <form class="hero-search" id="hero"><input id="hq" placeholder="Busca un personaje, una frase o haz una pregunta…" aria-label="Buscar"><button class="btn">Buscar</button></form>
  <p class="meta">Prueba: «¿Cómo llegó Hitler al poder?», «Lebensraum», «El Estado soy yo», «Napoleón vs Julio César».</p>
  <h2>Personaje destacado</h2><div class="grid">${card(feat)}</div>
  <h2>Tipos de poder</h2><div class="grid">${Object.entries(CATS).map(([k,c]) => `<a class="card" style="--c:${c[1]}" href="${href("personajes?cat="+k)}"><h3>${esc(c[0])}</h3><div class="meta">${ALL.filter(p => p.cats.includes(k)).length} personajes</div></a>`).join("")}</div>
  <h2>Temas</h2><div class="grid">${window.TEMAS.map(t => `<a class="card" href="${href("temas#"+t.slug)}"><h3>${esc(t.t)}</h3></a>`).join("")}</div>
  <p class="meta" style="margin-top:1.5rem">${esc(window.REVISION)} Principios: rigor con fuentes, explicar sin glorificar, equilibrio en lo discutido. <a href="${href("metodologia")}">Metodología</a></p>`;
}
function pageList(qs){
  const params = new URLSearchParams(qs||""), cat = params.get("cat")||"", ep = params.get("ep")||"", rg = params.get("rg")||"";
  const epocas = [...new Set(ALL.map(p => p.epoca))], regiones = [...new Set(ALL.map(p => p.region))].sort();
  const list = ALL.filter(p => (!cat || p.cats.includes(cat)) && (!ep || p.epoca === ep) && (!rg || p.region === rg));
  const sel = (id, opts, v, label) => `<label>${label} <select id="${id}"><option value="">Todos</option>${opts.map(o => `<option value="${esc(o[0])}" ${o[0]===v?"selected":""}>${esc(o[1])}</option>`).join("")}</select></label>`;
  return crumbs([["Inicio",""],["Personajes"]]) + `<h1>Personajes</h1><p class="lead">${ALL.length} personajes: ${PF.length} con perfil completo y ${BR.length} con ficha breve.</p>
  <div class="row tool">${sel("f-cat", Object.entries(CATS).map(([k,c]) => [k,c[0]]), cat, "Tipo de poder")}${sel("f-ep", epocas.map(e=>[e,e]), ep, "Época")}${sel("f-rg", regiones.map(r=>[r,r]), rg, "Región")}</div>
  <div class="grid">${list.map(card).join("")}</div>`;
}
function pageProfile(slug){
  const p = bySlug(slug); if (!p) return nf();
  if (!p.full) return crumbs([["Inicio",""],["Personajes","personajes"],[p.nombre]]) + `<h1>${esc(p.nombre)}</h1><p class="meta">${esc(p.fechas)} · ${esc(p.region)} · ${esc(p.epoca)}</p>${p.cats.map(catTag).join("")}
    ${p.vivo?`<div class="live">Persona viva: solo hechos públicos verificables. ${esc(window.REVISION)}</div>`:""}
    <div class="panel"><h3>En pocas líneas</h3><p>${esc(p.resumen)}</p></div><p class="meta">Ficha breve. El perfil completo (infancia, ascenso, decisiones clave, impacto, controversias y legado) está pendiente de redacción según el plan del sitio.</p>`;
  const sec = [["resumen","En 2 minutos"],["infancia","Infancia y formación"],["ascenso","Ascenso al poder"],["poder","Ejercicio del poder"],["decisiones","Decisiones clave"],["victimas","Las víctimas"],["impacto","Impacto"],["controversias","Controversias"],["caida","Caída o final"],["legado","Legado e interpretaciones"],["crono","Cronología"],["citas","Citas"],["mitos","Mitos y realidades"],["preguntas","Preguntas para pensar"],["fuentes","Fuentes"]].filter(([k]) => p[k] && (!Array.isArray(p[k]) || p[k].length));
  const body = sec.map(([k,t]) => {
    let c; if (k === "decisiones") c = p.decisiones.map((d,i) => `<div class="dec"><b>${i+1}. ${esc(d[0])}</b><p>${esc(d[1])}</p></div>`).join("");
    else if (k === "crono") c = `<div class="tl">${p.crono.map(e => `<div><b>${yr(e[0])}</b> ${esc(e[1])}</div>`).join("")}</div>`;
    else if (k === "citas") c = p.citas.map(q => `<p class="quote">${esc(q[0])}</p><p class="meta"><span class="v ${VERDICT[q[2]][1]}">${VERDICT[q[2]][0]}</span> ${esc(q[1])}</p>`).join("");
    else if (k === "mitos") c = p.mitos.map(m => `<p><b>Mito:</b> ${esc(m[0])}<br><b>Realidad:</b> ${esc(m[1])}</p>`).join("");
    else if (k === "preguntas" || k === "fuentes") c = `<ul>${p[k].map(x => `<li>${esc(x)}</li>`).join("")}</ul>`;
    else c = `<p>${esc(p[k])}</p>`;
    return `<section id="${k}" class="${k==="victimas"?"alert":""}"><h2>${t}</h2>${c}</section>`; }).join("");
  const others = ALL.filter(o => o !== p && o.full);
  return crumbs([["Inicio",""],["Personajes","personajes"],[p.nombre]]) +
   `<h1>${esc(p.nombre)}</h1><p class="lead">${esc(p.lema)}</p>${p.cats.map(catTag).join("")}
   ${p.aviso?`<div class="alert"><b>Aviso de contenido.</b> Este perfil describe persecución, genocidio y crímenes masivos. Se presenta para entender la historia y sus víctimas, no para exaltar a su responsable.</div>`:""}
   ${p.vivo?`<div class="live"><b>Persona viva.</b> Solo hechos públicos verificables; los procesos judiciales se describen con su estado conocido. ${esc(window.REVISION)}</div>`:""}
   <div class="panel"><b>Nacimiento:</b> ${esc(p.nac)}${p.muerte?`<br><b>Muerte:</b> ${esc(p.muerte)}`:""}<br><b>Cargos:</b> ${esc(p.cargos)}<br><b>Época y región:</b> ${esc(p.epoca)} · ${esc(p.region)}</div>
   <div class="toc">${sec.map(([k,t]) => `<a href="#${k}" data-anchor="${k}">${t}</a>`).join("")}</div>${body}
   <div class="row" style="margin-top:2rem"><label>Comparar con <select id="cmpsel">${others.map(o => `<option value="${o.slug}">${esc(o.nombre)}</option>`).join("")}</select></label><button class="btn sec" id="cmpbtn" data-a="${p.slug}">Comparar</button></div>`;
}
function pageCompare(a, b){
  const A = bySlug(a), B = bySlug(b); const full = ALL.filter(p => p.full);
  const pick = (id, v) => `<select id="${id}">${ALL.map(p => `<option value="${p.slug}" ${p.slug===v?"selected":""}>${esc(p.nombre)}</option>`).join("")}</select>`;
  let table = "";
  if (A && B){ const rows = [["Fechas","fechas"],["Época","epoca"],["Región","region"],["Cargos","cargos"],["En pocas líneas","resumen"],["Ascenso","ascenso"],["Caída o final","caida"],["Legado","legado"]];
    table = `<div class="tablewrap"><table class="cmp"><thead><tr><th></th><th>${esc(A.nombre)}</th><th>${esc(B.nombre)}</th></tr></thead><tbody>${rows.map(([t,k]) => `<tr><th>${t}</th><td>${esc(A[k]||"—")}</td><td>${esc(B[k]||"—")}</td></tr>`).join("")}
    <tr><th>Decisiones clave</th><td>${(A.decisiones||[]).map(d=>esc(d[0])).join("<br>")||"—"}</td><td>${(B.decisiones||[]).map(d=>esc(d[0])).join("<br>")||"—"}</td></tr></tbody></table></div>`; }
  return crumbs([["Inicio",""],["Comparar"]]) + `<h1>Comparador</h1><div class="row tool">${pick("ca", a||full[0].slug)} ${pick("cb", b||full[1].slug)} <button class="btn" id="cmpgo">Comparar</button></div>${table}`;
}
function pageTimeline(){
  const ev = []; PF.forEach(p => p.crono.forEach(c => ev.push([c[0], c[1], p])));
  ev.sort((a,b) => a[0] - b[0]);
  return crumbs([["Inicio",""],["Línea de tiempo"]]) + `<h1>Línea de tiempo</h1><p class="lead">Hechos de los perfiles completos, de la Antigüedad a hoy.</p>
  <div class="tl">${ev.map(e => `<div><b>${yr(e[0])}</b> ${esc(e[1])} — <a href="${href("p/"+e[2].slug)}">${esc(e[2].nombre)}</a></div>`).join("")}</div>`;
}
function pageGlossary(){
  const g = window.GLOSARIO.slice().sort((a,b) => a[0].localeCompare(b[0], "es"));
  return crumbs([["Inicio",""],["Glosario"]]) + `<h1>Glosario de términos y frases</h1><input class="note" style="min-height:auto" id="filter" placeholder="Filtrar…">
  <div class="tablewrap"><table id="ftable"><tbody>${g.map(e => `<tr><td><b>${esc(e[0])}</b></td><td>${esc(e[1])}${e[2]?` <a href="${href("p/"+e[2])}">→ ${esc(bySlug(e[2]).nombre)}</a>`:""}</td></tr>`).join("")}</tbody></table></div>`;
}
function pageQuotes(){
  return crumbs([["Inicio",""],["Citas"]]) + `<h1>Citas verificadas, dudosas y falsas</h1><p class="lead">Cada cita indica su fuente y si está verificada.</p>` +
   allQuotes().map(c => `<div class="panel"><p class="quote">${esc(c[0])}</p><p><b>${esc(c[1])}</b> · <span class="v ${VERDICT[c[3]][1]}">${VERDICT[c[3]][0]}</span></p><p class="meta">${esc(c[2])}</p></div>`).join("");
}
function pageTopics(){
  return crumbs([["Inicio",""],["Temas"]]) + `<h1>Temas transversales</h1>` + window.TEMAS.map(t => `<section id="${t.slug}" class="panel"><h2>${esc(t.t)}</h2><p>${esc(t.x)}</p>${t.p.length?`<p class="meta">Ver: ${t.p.map(s => `<a href="${href("p/"+s)}">${esc(bySlug(s).nombre)}</a>`).join(" · ")}</p>`:""}</section>`).join("");
}
function pageMethod(){
  return crumbs([["Inicio",""],["Metodología"]]) + `<h1>Metodología y principios editoriales</h1><div class="panel"><ol>
  <li><b>Rigor:</b> cada afirmación importante se apoya en fuentes citadas; las cifras discutidas se dan como rango.</li>
  <li><b>Explicar, no glorificar:</b> se estudia el poder para entenderlo; los crímenes y sus víctimas se describen con claridad.</li>
  <li><b>Equilibrio:</b> se distinguen hechos documentados, interpretaciones y acusaciones no probadas.</li>
  <li><b>Personas vivas:</b> solo hechos públicos verificables y estado exacto de los procesos judiciales. ${esc(window.REVISION)}</li>
  <li><b>Citas:</b> se clasifican como verificadas, dudosas o apócrifas.</li>
  <li><b>Buscador:</b> el recuadro responde solo con contenido del sitio y dice claramente cuándo no tiene la respuesta; nunca la inventa.</li></ol></div>
  <p class="meta">Estado de la construcción: ${PF.length} perfiles completos y ${BR.length} fichas breves; los perfiles completos restantes están pendientes de redacción.</p>`;
}
function pageSearch(q){
  q = q || ""; const qn = norm(q), res = [];
  if (qn){ ALL.forEach(p => { if (score(qn, [p.nombre, p.resumen, ...(p.alias||[])].join(" ")) >= 0.5) res.push(["Personaje", p.nombre, "p/"+p.slug]); });
    window.GLOSARIO.forEach(g => { if (score(qn, g[0]+" "+g[1]) >= 0.5) res.push(["Término", g[0], "glosario"]); });
    allQuotes().forEach(c => { if (score(qn, c[0]+" "+c[1]) >= 0.5) res.push(["Cita", c[0], "citas"]); });
    window.TEMAS.forEach(t => { if (score(qn, t.t+" "+t.x) >= 0.5) res.push(["Tema", t.t, "temas#"+t.slug]); }); }
  return `<h1>Resultados: «${esc(q)}»</h1><form class="hero-search" id="hero"><input id="hq" value="${esc(q)}" aria-label="Buscar"><button class="btn">Buscar</button></form>${infobox(q)}` +
   (res.length ? `<h2>Más resultados</h2><ul>${res.slice(0,50).map(r => `<li><span class="tag">${r[0]}</span><a href="${href(r[2])}">${esc(r[1])}</a></li>`).join("")}</ul>` : "");
}
const nf = () => `<h1>Página no encontrada</h1><p><a href="#/">Inicio</a></p>`;

function route(){
  const raw = location.hash.replace(/^#\/?/, ""), [path, query] = raw.split("?"), [p0, p1, p2] = path.split("/");
  let html; const anchor = raw.includes("#") ? raw.split("#")[1] : null;
  if (!p0) html = pageHome();
  else if (p0 === "personajes") html = pageList(query);
  else if (p0 === "p") html = pageProfile(p1.split("#")[0]);
  else if (p0 === "comparar") html = pageCompare(p1, p2);
  else if (p0 === "linea-de-tiempo") html = pageTimeline();
  else if (p0 === "glosario") html = pageGlossary();
  else if (p0 === "citas") html = pageQuotes();
  else if (p0.startsWith("temas")) html = pageTopics();
  else if (p0 === "metodologia") html = pageMethod();
  else if (p0 === "buscar") html = pageSearch(decodeURIComponent((query||"").replace(/^q=/, "")));
  else html = nf();
  const nav = [["","Inicio"],["personajes","Personajes"],["temas","Temas"],["comparar","Comparar"],["linea-de-tiempo","Línea de tiempo"],["glosario","Glosario"],["citas","Citas"],["metodologia","Metodología"]];
  document.getElementById("mainnav").innerHTML = nav.map(([p,t]) => `<a href="${href(p)}" class="${(p0||"").split("#")[0]===p?"on":""}">${t}</a>`).join("");
  app.innerHTML = html; scrollTo(0,0);
  document.title = (app.querySelector("h1")?.textContent || "") + " · Personas Poderosas";
  const tgt = anchor || (p0 && p0.includes("#") ? p0.split("#")[1] : null); if (tgt){ const el = document.getElementById(tgt); if (el) el.scrollIntoView(); }
  bind();
}
function bind(){
  const hero = document.getElementById("hero"); if (hero) hero.onsubmit = e => { e.preventDefault(); location.hash = "#/buscar?q=" + encodeURIComponent(document.getElementById("hq").value); };
  ["f-cat","f-ep","f-rg"].forEach(id => { const s = document.getElementById(id); if (s) s.onchange = () => { const q = new URLSearchParams(); [["cat","f-cat"],["ep","f-ep"],["rg","f-rg"]].forEach(([k,i]) => { const v = document.getElementById(i).value; if (v) q.set(k, v); }); location.hash = "#/personajes?" + q; }; });
  document.querySelectorAll("[data-anchor]").forEach(a => a.onclick = e => { e.preventDefault(); document.getElementById(a.dataset.anchor).scrollIntoView({behavior:"smooth"}); });
  const cb = document.getElementById("cmpbtn"); if (cb) cb.onclick = () => location.hash = "#/comparar/" + cb.dataset.a + "/" + document.getElementById("cmpsel").value;
  const cg = document.getElementById("cmpgo"); if (cg) cg.onclick = () => location.hash = "#/comparar/" + document.getElementById("ca").value + "/" + document.getElementById("cb").value;
  document.querySelectorAll("[data-fb]").forEach(b => b.onclick = () => { const box = b.closest(".infobox"), k = b.dataset.fb, log = store.get("pp_opiniones", []);
    log.push({q: box.dataset.q, k, t: new Date().toISOString().slice(0,10)}); store.set("pp_opiniones", log.slice(-200));
    box.querySelector(".fbmsg").textContent = k === "tema" ? "Gracias. Tu propuesta se ha anotado (anónima, solo en este navegador) para ampliar el contenido." : k === "error" ? "Gracias. El aviso de error se ha anotado (anónimo, solo en este navegador) para la revisión editorial." : "Gracias por tu opinión.";
    box.querySelectorAll("[data-fb]").forEach(x => x.disabled = true); });
  const f = document.getElementById("filter"); if (f) f.oninput = () => { const v = norm(f.value); document.querySelectorAll("#ftable tr").forEach(tr => tr.style.display = norm(tr.textContent).includes(v) ? "" : "none"); };
}
document.getElementById("searchform").onsubmit = e => { e.preventDefault(); location.hash = "#/buscar?q=" + encodeURIComponent(document.getElementById("q").value); };
document.getElementById("theme").onclick = () => { const r = document.documentElement, dark = r.dataset.theme ? r.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches; r.dataset.theme = dark ? "light" : "dark"; store.set("pp_theme", r.dataset.theme); };
const th = store.get("pp_theme", null); if (th) document.documentElement.dataset.theme = th;
window.addEventListener("hashchange", route); route();
})();
