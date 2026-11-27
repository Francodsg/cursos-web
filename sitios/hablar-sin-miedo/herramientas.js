// Herramientas interactivas, reproductor de prácticas guiadas y simuladores.
// Cada herramienta: {t, d, l (lección), render(ctx) -> html, bind(el, ctx) -> función de limpieza opcional}.
// ctx.get() / ctx.set(v) leen y guardan su estado en el progreso (localStorage).
(function(){
"use strict";
const W = window;
const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const fmt = s => { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };
const rand = a => a[Math.floor(Math.random() * a.length)];
const copyBtn = `<button class="btn ghost" type="button" data-copy>Copiar el texto</button> <span class="meta" data-copied aria-live="polite"></span>`;
function bindCopy(el){
  const b = el.querySelector("[data-copy]"); if (!b) return;
  b.onclick = () => { const t = el.querySelector(".out").textContent; const ok = () => el.querySelector("[data-copied]").textContent = "Copiado.";
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(ok, () => {}); else { const ta = document.createElement("textarea"); ta.value = t; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); ok(); } catch(e){} ta.remove(); } };
}

// ---------- Voz (opcional, sin internet) ----------
const VOZ = {
  ok: () => "speechSynthesis" in W && typeof W.SpeechSynthesisUtterance === "function",
  voice: null,
  pick(){ if (!VOZ.ok()) return null; const vs = W.speechSynthesis.getVoices(); return vs.find(v => /^es[-_](ES|MX|US|419)/i.test(v.lang)) || vs.find(v => /^es/i.test(v.lang)) || null; },
  say(t){ if (!VOZ.ok()) return; try { W.speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t); u.lang = "es-ES"; u.rate = .9; const v = VOZ.voice || (VOZ.voice = VOZ.pick()); if (v) u.voice = v; W.speechSynthesis.speak(u); } catch(e){} },
  stop(){ if (VOZ.ok()) try { W.speechSynthesis.cancel(); } catch(e){} }
};

// ---------- Herramienta de formulario genérica ----------
function formTool(spec){
  return {
    t: spec.t, d: spec.d, l: spec.l,
    render(ctx){ const v = ctx.get() || {};
      return `<form class="panel" data-form>${spec.intro ? `<p>${spec.intro}</p>` : ""}${spec.fields.map(f => {
        const val = v[f[0]] != null ? v[f[0]] : (f[4] != null ? f[4] : "");
        if (f[2] === "area") return `<label class="field"><span>${f[1]}</span><textarea data-k="${f[0]}" placeholder="${esc(f[3] || "")}">${esc(val)}</textarea></label>`;
        if (f[2] === "select") return `<label class="field"><span>${f[1]}</span><select data-k="${f[0]}">${f[3].map(o => `<option${o === val ? " selected" : ""}>${esc(o)}</option>`).join("")}</select></label>`;
        if (f[2] === "range") return `<label class="field"><span>${f[1]}: <b data-rv="${f[0]}">${esc(val === "" ? 5 : val)}</b></span><input type="range" min="${f[3][0]}" max="${f[3][1]}" step="${f[3][2] || 1}" data-k="${f[0]}" value="${esc(val === "" ? 5 : val)}"></label>`;
        return `<label class="field"><span>${f[1]}</span><input type="text" data-k="${f[0]}" value="${esc(val)}" placeholder="${esc(f[3] || "")}"></label>`;
      }).join("")}</form><h2>${spec.outTitle || "Resultado"}</h2><div class="out" aria-live="polite"></div><p class="row">${copyBtn} <button class="btn ghost" type="button" data-clear>Borrar</button></p>${spec.after || ""}`; },
    bind(el, ctx){
      const read = () => { const v = {}; el.querySelectorAll("[data-k]").forEach(i => v[i.dataset.k] = i.type === "range" ? +i.value : i.value); return v; };
      const upd = () => { const v = read(); ctx.set(v); el.querySelectorAll("[data-rv]").forEach(b => b.textContent = v[b.dataset.rv]); el.querySelector(".out").innerHTML = spec.out(v); };
      el.querySelector("[data-form]").oninput = upd; el.querySelector("[data-form]").onchange = upd; el.querySelector("[data-form]").onsubmit = e => e.preventDefault();
      el.querySelector("[data-clear]").onclick = () => { if (confirm("¿Borrar lo que escribiste en esta herramienta?")){ ctx.set(null); el.innerHTML = this.render(ctx); this.bind(el, ctx); } };
      el.querySelector(".out").innerHTML = spec.out(read()); bindCopy(el);
    }
  };
}
const or = (x, d) => (x && String(x).trim()) ? esc(x) : `<i>${d}</i>`;
const words = s => String(s || "").trim().split(/\s+/).filter(Boolean).length;

// ---------- Herramienta de lista (entradas acumuladas) ----------
function listTool(spec){
  return {
    t: spec.t, d: spec.d, l: spec.l,
    render(ctx){ const list = ctx.get() || [];
      return `<form class="panel" data-add>${spec.fields.map(f => f[2] === "range" ? `<label class="field"><span>${f[1]}: <b data-rv="${f[0]}">50</b></span><input type="range" min="0" max="100" step="5" value="50" data-k="${f[0]}"></label>` : f[2] === "area" ? `<label class="field"><span>${f[1]}</span><textarea data-k="${f[0]}" placeholder="${esc(f[3] || "")}"></textarea></label>` : `<label class="field"><span>${f[1]}</span><input type="text" data-k="${f[0]}" placeholder="${esc(f[3] || "")}"></label>`).join("")}<button class="btn">${spec.addLabel || "Añadir"}</button></form>
      ${spec.head ? spec.head(list) : ""}<h2>${spec.listTitle || "Tus entradas"} (${list.length})</h2>${list.length ? `<ol class="toc">${list.slice().reverse().map((e, ri) => { const i = list.length - 1 - ri; return `<li><span class="meta">${esc(e._f || "")}</span> ${spec.show(e)} <button class="chip" data-del="${i}" aria-label="Borrar esta entrada">Borrar</button></li>`; }).join("")}</ol>` : `<p class="meta">Todavía no hay entradas.</p>`}`; },
    bind(el, ctx){
      const self = this, rer = () => { el.innerHTML = self.render(ctx); self.bind(el, ctx); };
      el.querySelectorAll("input[type=range]").forEach(r => r.oninput = () => el.querySelector(`[data-rv="${r.dataset.k}"]`).textContent = r.value);
      el.querySelector("[data-add]").onsubmit = ev => { ev.preventDefault(); const e = {_f:new Date().toLocaleDateString("es")}; let any = false;
        el.querySelectorAll("[data-k]").forEach(i => { e[i.dataset.k] = i.type === "range" ? +i.value : i.value.trim(); if (i.type !== "range" && i.value.trim()) any = true; });
        if (!any) return; const list = ctx.get() || []; list.push(e); ctx.set(list); rer(); };
      el.querySelectorAll("[data-del]").forEach(b => b.onclick = () => { const list = ctx.get() || []; list.splice(+b.dataset.del, 1); ctx.set(list); rer(); });
    }
  };
}

const SITUACIONES = ["Hablar en público (charla, presentación, brindis)", "Hablar con jefes, clientes o autoridades", "Hablar con desconocidos", "Llamar por teléfono", "Pedir (un precio, un aumento, un favor)", "Conflicto y críticas (decir que no, quejarse, recibir críticas)", "Hablar en otro idioma o con acento", "Hablar en grupos, reuniones o fiestas"];
const T = {};

T["test-miedo"] = {
  t:"Test: ¿cuánto te limita el miedo a hablar?", d:"12 preguntas orientativas (no es un diagnóstico) para saber desde dónde empiezas. Repítelo al final del curso.", l:"1.1",
  render(ctx){ const v = ctx.get() || {}; const Q = W.TEST || [];
    return `<form class="quiz" data-test>${Q.map((q, i) => `<fieldset><legend>${i + 1}. ${esc(q)}</legend><div class="row">${["Nunca","Pocas veces","A veces","A menudo","Casi siempre"].map((o, j) => `<label class="chip"><input type="radio" name="t${i}" value="${j}" ${v.r && v.r[i] === j ? "checked" : ""}> ${o}</label>`).join("")}</div></fieldset>`).join("")}<button class="btn">Ver mi resultado</button></form><div id="tres" aria-live="polite">${v.s != null ? this.res(v) : ""}</div>`; },
  res(v){ const s = v.s, max = (W.TEST || []).length * 4, p = Math.round(s / max * 100);
    const lvl = p < 25 ? ["Miedo bajo", "Sientes nervios normales en algunas situaciones. El curso te ayudará a pulir técnica y a hablar con más impacto."] : p < 50 ? ["Miedo moderado", "El miedo aparece en varias situaciones y a veces te hace evitar. Con práctica gradual mejora mucho: empieza por el módulo 1 y el reto de 30 días."] : p < 75 ? ["Miedo alto", "El miedo te limita con frecuencia. Sigue el curso completo, sin saltarte la exposición gradual, y considera apoyarte en un grupo o un profesional."] : ["Miedo muy alto", "El miedo parece limitarte mucho. Este curso puede ayudarte, pero te recomendamos leer «Cuándo pedir ayuda» y consultar con un profesional: la terapia cognitivo-conductual funciona muy bien."];
    return `<div class="answer"><p class="kicker">Tu resultado${v.f ? " · " + esc(v.f) : ""}</p><p class="bignum">${s} / ${max}</p><h3>${lvl[0]}</h3><p>${lvl[1]}</p>${v.prev != null ? `<p class="meta">Resultado anterior: ${v.prev} / ${max}.</p>` : ""}<p class="meta">Test orientativo creado para este curso; no es un instrumento clínico validado. <a href="#/pedir-ayuda">Cuándo pedir ayuda</a>.</p></div>`; },
  bind(el, ctx){ const Q = W.TEST || [], self = this;
    el.querySelector("[data-test]").onsubmit = ev => { ev.preventDefault(); const r = Q.map((q, i) => { const c = el.querySelector(`input[name=t${i}]:checked`); return c ? +c.value : null; });
      if (r.some(x => x == null)){ el.querySelector("#tres").innerHTML = `<p class="bad">Responde las ${Q.length} preguntas.</p>`; return; }
      const old = ctx.get() || {}; const v = {r, s:r.reduce((a, b) => a + b, 0), f:new Date().toLocaleDateString("es"), prev:old.s != null ? old.s : null}; ctx.set(v); el.querySelector("#tres").innerHTML = self.res(v); };
  }
};

T["mapa-miedo"] = {
  t:"Mi mapa del miedo", d:"Puntúa del 0 al 10 cuánto miedo te da cada situación, anota tus conductas de seguridad y tu objetivo a 90 días. El mapa alimenta tu escalera de exposición.", l:"1.8",
  render(ctx){ const v = ctx.get() || {s:{}};
    return `<form class="panel" data-mapa>${SITUACIONES.map((s, i) => `<label class="field"><span>${esc(s)}: <b data-mv="${i}">${v.s[i] != null ? v.s[i] : 5}</b>/10</span><input type="range" min="0" max="10" data-ms="${i}" value="${v.s[i] != null ? v.s[i] : 5}"></label>`).join("")}
    <label class="field"><span>¿Qué situación concreta te da más miedo? (sé específico: «presentar los resultados del trimestre ante el comité»)</span><textarea data-mk="peor">${esc(v.peor || "")}</textarea></label>
    <label class="field"><span>Tus conductas de seguridad (lo que haces para «protegerte»: leer todo, no mirar, hablar rápido, llegar tarde, quedarte en un rincón…)</span><textarea data-mk="cs">${esc(v.cs || "")}</textarea></label>
    <label class="field"><span>¿Qué te está costando el miedo? (oportunidades, dinero, relaciones)</span><textarea data-mk="coste">${esc(v.coste || "")}</textarea></label>
    <label class="field"><span>Tu objetivo en 90 días (algo observable: «dar una presentación de 10 minutos en el trabajo»)</span><textarea data-mk="obj">${esc(v.obj || "")}</textarea></label></form>
    <h2>Tu ranking</h2><div id="rank"></div><p><a class="btn" href="#/herramientas/escalera">Crear mi escalera de exposición con este mapa</a></p>`; },
  bind(el, ctx){
    const upd = () => { const v = {s:{}}; el.querySelectorAll("[data-ms]").forEach(r => { v.s[r.dataset.ms] = +r.value; el.querySelector(`[data-mv="${r.dataset.ms}"]`).textContent = r.value; }); el.querySelectorAll("[data-mk]").forEach(t => v[t.dataset.mk] = t.value); ctx.set(v);
      const order = SITUACIONES.map((s, i) => [s, v.s[i]]).sort((a, b) => b[1] - a[1]);
      el.querySelector("#rank").innerHTML = `<ol class="toc">${order.map(o => `<li>${esc(o[0])}: <b>${o[1]}</b>/10</li>`).join("")}</ol>`; };
    el.querySelector("[data-mapa]").oninput = upd; upd();
  }
};

T["mitos"] = {
  t:"Juego: ¿mito o evidencia?", d:"15 afirmaciones populares sobre hablar en público. ¿Cuáles son mitos?", l:"1.7",
  render(){ const M = W.MITOS || [];
    return `<form class="quiz" data-mitos>${M.map((m, i) => `<fieldset><legend>${i + 1}. ${esc(m[0])}</legend><div class="row"><label class="chip"><input type="radio" name="m${i}" value="1"> Mito o exagerado</label><label class="chip"><input type="radio" name="m${i}" value="0"> Tiene evidencia</label></div><p class="fb" data-fb="${i}"></p></fieldset>`).join("")}<button class="btn">Comprobar</button> <span class="meta" id="mres" aria-live="polite"></span></form>`; },
  bind(el, ctx){ const M = W.MITOS || [];
    el.querySelector("[data-mitos]").onsubmit = ev => { ev.preventDefault(); let ok = 0;
      M.forEach((m, i) => { const c = el.querySelector(`input[name=m${i}]:checked`); const good = c && (+c.value === 1) === m[1]; if (good) ok++; const fb = el.querySelector(`[data-fb="${i}"]`); fb.className = "fb " + (good ? "okc" : "bad"); fb.innerHTML = `<b>${m[1] ? "Mito o exagerado." : "Tiene evidencia."}</b> ${esc(m[2])}`; });
      el.querySelector("#mres").textContent = `${ok} de ${M.length} aciertos`; ctx.set({best:Math.max((ctx.get() || {}).best || 0, ok)}); };
  }
};

T["registro-pensamientos"] = listTool({
  t:"Registro de pensamientos", d:"Examina un pensamiento que te da miedo como lo haría un científico: situación, pensamiento, emoción, pruebas a favor y en contra, y un pensamiento más equilibrado.", l:"2.2",
  fields:[["sit","Situación","Mañana presento el proyecto al equipo"],["pen","Pensamiento automático","Me voy a quedar en blanco y pensarán que no sirvo"],["emo","Intensidad de la emoción ANTES (0–100)","range"],["fav","Pruebas a favor","area","Una vez me trabé en una reunión"],["con","Pruebas en contra","area","He presentado otras veces y salió bien; tengo notas; nadie comentó nada aquella vez"],["eq","Pensamiento equilibrado","area","Puede que me ponga nervioso, pero llevo notas y conozco el tema. Si me trabo, hago una pausa."],["emo2","Intensidad de la emoción DESPUÉS (0–100)","range"]],
  addLabel:"Guardar este registro", listTitle:"Tus registros",
  show:e => `<b>${esc(e.pen || e.sit)}</b><br><span class="meta">Situación: ${esc(e.sit)} · Emoción: ${e.emo} → ${e.emo2}</span><br>Pensamiento equilibrado: <i>${esc(e.eq)}</i>`
});

T["victorias"] = listTool({
  t:"Diario de victorias", d:"Anota cada día una prueba de que puedes hablar: una pregunta en una reunión, una llamada, un «no». La confianza se construye con pruebas, no con frases.", l:"2.1",
  fields:[["v","¿Qué hiciste hoy, aunque fuera pequeño?","Pregunté una duda en la reunión"],["a","¿Qué aprendiste?","Nadie me juzgó; la duda era de varios"]],
  addLabel:"Añadir victoria", listTitle:"Tus victorias",
  head:list => { const days = [...new Set(list.map(e => e._f))]; return `<div class="grid three"><div class="panel"><p class="kicker">Victorias</p><p class="bignum">${list.length}</p></div><div class="panel"><p class="kicker">Días distintos</p><p class="bignum">${days.length}</p></div></div>`; },
  show:e => `<b>${esc(e.v)}</b>${e.a ? `<br><span class="meta">Aprendí: ${esc(e.a)}</span>` : ""}`
});

T["plan-confianza"] = formTool({
  t:"Mi plan personal de confianza", d:"Une lo aprendido en los módulos 1 y 2 en un plan de 30 días.", l:"2.8",
  fields:[["obj","Mi objetivo concreto en 30 días"],["cre","La creencia que voy a poner a prueba","area"],["alt","El pensamiento alternativo que usaré","area"],["guion","Mi guion de 3 frases antes de hablar","area","Ana, estás emocionada, no en peligro. Tu mensaje es útil. Mira a una persona y empieza."],["id","La persona que quiero ser al hablar («soy alguien que…»)"],["r1","Reto 1 (fácil)"],["r2","Reto 2 (medio)"],["r3","Reto 3 (difícil)"],["cs","La conducta de seguridad que voy a soltar"],["apoyo","Quién me puede apoyar"],["fecha","Fecha de revisión"]],
  outTitle:"Tu plan (cópialo o imprímelo)",
  out:v => `MI PLAN DE CONFIANZA\n\nObjetivo en 30 días: ${or(v.obj, "…")}\nSoy alguien que ${or(v.id, "…")}\n\nCreencia a poner a prueba: ${or(v.cre, "…")}\nPensamiento alternativo: ${or(v.alt, "…")}\nGuion antes de hablar: ${or(v.guion, "…")}\n\nRetos:\n 1. ${or(v.r1, "…")}\n 2. ${or(v.r2, "…")}\n 3. ${or(v.r3, "…")}\n\nConducta de seguridad que suelto: ${or(v.cs, "…")}\nApoyo: ${or(v.apoyo, "…")}\nRevisión: ${or(v.fecha, "…")}`
});

T["mensaje"] = formTool({
  t:"Mensaje en una frase", d:"Antes de preparar una charla o una reunión: el público, el objetivo y el mensaje central en menos de 15 palabras, con 3 ideas de apoyo, inicio y cierre.", l:"3.1",
  fields:[["pub","¿Quién es tu público? ¿Qué sabe y qué le preocupa?","area"],["objt","¿Qué quieres que hagan, piensen o sientan al terminar?","select",["Informar","Convencer","Inspirar","Pedir algo","Enseñar"]],["msg","Tu mensaje en una frase (menos de 15 palabras)","Si automatizamos la facturación, ahorramos 10 horas a la semana"],["i1","Idea de apoyo 1"],["i2","Idea de apoyo 2"],["i3","Idea de apoyo 3"],["ini","Tu inicio (historia, pregunta o dato)","area"],["cie","Tu cierre (resumen + llamada a la acción)","area"],["min","Duración (minutos)"]],
  outTitle:"Esquema de tu charla",
  out:v => { const n = words(v.msg); return `${n > 15 ? `<span class="bad">Tu mensaje tiene ${n} palabras: intenta dejarlo en 15 o menos.</span>\n\n` : n ? `<span class="okc">Mensaje de ${n} palabras: bien.</span>\n\n` : ""}PÚBLICO: ${or(v.pub, "…")}\nOBJETIVO: ${esc(v.objt || "")}\nDURACIÓN: ${or(v.min, "…")} min\n\n1. INICIO: ${or(v.ini, "…")}\n2. MENSAJE: ${or(v.msg, "…")}\n3. IDEAS:\n   a) ${or(v.i1, "…")}\n   b) ${or(v.i2, "…")}\n   c) ${or(v.i3, "…")}\n4. CIERRE: ${or(v.cie, "…")}`; }
});

const ESTR = {
  "PREP (punto, razón, ejemplo, punto)":["Punto: tu idea principal","Razón: por qué","Ejemplo: un caso o dato","Punto: repite la idea y lo que pides"],
  "Problema, solución, beneficio":["Problema: qué duele y a quién","Solución: tu propuesta","Beneficio: qué gana el público","Petición: el siguiente paso"],
  "Pasado, presente, futuro":["Pasado: cómo estábamos","Presente: dónde estamos","Futuro: adónde vamos","Qué necesitamos para llegar"],
  "Historia, lección, acción":["Historia: situación y conflicto","Decisión y resultado","Lección","Acción que propones al público"],
  "Conclusión primero (pirámide)":["Conclusión o recomendación","Argumento 1","Argumento 2","Argumento 3"]
};
T["estructura"] = {
  t:"Plantillas de estructura", d:"Elige una estructura y rellénala. Prueba la misma idea con dos estructuras y compara.", l:"3.2",
  render(ctx){ const v = ctx.get() || {e:Object.keys(ESTR)[0], c:{}};
    return `<div class="panel"><label class="field"><span>Estructura</span><select id="es">${Object.keys(ESTR).map(k => `<option${k === v.e ? " selected" : ""}>${esc(k)}</option>`).join("")}</select></label><div id="ef">${ESTR[v.e].map((p, i) => `<label class="field"><span>${esc(p)}</span><textarea data-i="${i}">${esc((v.c[v.e] || [])[i] || "")}</textarea></label>`).join("")}</div></div><h2>Tu texto</h2><div class="out"></div><p class="row">${copyBtn}</p>`; },
  bind(el, ctx){ const self = this;
    const upd = () => { const v = ctx.get() || {e:Object.keys(ESTR)[0], c:{}}; v.c[v.e] = [...el.querySelectorAll("[data-i]")].map(t => t.value); ctx.set(v); el.querySelector(".out").textContent = ESTR[v.e].map((p, i) => p.split(":")[0].toUpperCase() + ": " + (v.c[v.e][i] || "…")).join("\n\n"); };
    el.querySelector("#es").onchange = () => { const v = ctx.get() || {c:{}}; v.e = el.querySelector("#es").value; v.c = v.c || {}; ctx.set(v); el.innerHTML = self.render(ctx); self.bind(el, ctx); };
    el.querySelector("#ef").oninput = upd; upd(); bindCopy(el);
  }
};

T["temporizador"] = {
  t:"Temporizador de charla y contador de muletillas", d:"Ensaya con tiempo: verde mientras vas bien, amarillo cuando queda 1 minuto, rojo al pasarte. Pide a alguien que pulse «+1 muletilla» cada vez que digas «eh», «o sea» o «¿vale?».", l:"3.8",
  render(ctx){ const v = ctx.get() || {};
    return `<div class="panel"><div class="row"><label>Minutos: <input type="number" id="tm" min="1" max="60" value="${v.m || 5}" style="width:5rem"></label><label>Aviso amarillo a falta de (min): <input type="number" id="ta" min="0" max="10" value="${v.a != null ? v.a : 1}" style="width:4rem"></label></div>
    <div class="timer green" id="tt" role="timer" aria-live="off">${fmt((v.m || 5) * 60)}</div>
    <p class="row"><button class="btn" id="tgo">Empezar</button> <button class="btn ghost" id="tre">Reiniciar</button> <button class="btn warm" id="tmu">+1 muletilla</button> <span>Muletillas: <b id="tmc">0</b></span> <button class="chip" id="tmr">Poner a 0</button></p>
    <p class="meta">Palabras por minuto: lee un texto en voz alta durante 1 minuto y cuenta las palabras. Un ritmo cómodo para escuchar suele estar entre 130 y 160 palabras por minuto; con nervios solemos acelerar.</p></div>
    <h3>Tus ensayos</h3><div id="thist">${(v.h || []).length ? `<ol class="toc">${v.h.slice(-10).reverse().map(h => `<li>${esc(h.f)}: ${fmt(h.s)} de ${h.m} min · ${h.mu} muletillas</li>`).join("")}</ol>` : `<p class="meta">Aún no hay ensayos guardados. Al pulsar «Parar y guardar» se registra el ensayo.</p>`}</div>`; },
  bind(el, ctx){ const self = this; let t0 = 0, acc = 0, iv = null, mu = 0;
    const tot = () => (+el.querySelector("#tm").value || 5) * 60, warnAt = () => (+el.querySelector("#ta").value || 0) * 60;
    const draw = () => { const el2 = el.querySelector("#tt"); const run = acc + (iv ? (Date.now() - t0) / 1000 : 0), left = tot() - run;
      el2.textContent = left >= 0 ? fmt(left) : "+" + fmt(-left); el2.className = "timer " + (left < 0 ? "red" : left <= warnAt() ? "yellow" : "green"); return run; };
    const st = () => { const v = ctx.get() || {}; v.m = +el.querySelector("#tm").value || 5; v.a = +el.querySelector("#ta").value; ctx.set(v); };
    el.querySelector("#tgo").onclick = () => { const b = el.querySelector("#tgo");
      if (iv){ const run = draw(); clearInterval(iv); iv = null; acc = run; b.textContent = "Continuar"; const v = ctx.get() || {}; v.h = (v.h || []).concat([{f:new Date().toLocaleString("es"), s:run, m:+el.querySelector("#tm").value, mu}]); ctx.set(v); const keep = {acc, mu}; el.innerHTML = self.render(ctx); self.bind(el, ctx); }
      else { t0 = Date.now(); iv = setInterval(draw, 250); b.textContent = "Parar y guardar"; st(); } };
    el.querySelector("#tre").onclick = () => { clearInterval(iv); iv = null; acc = 0; el.querySelector("#tgo").textContent = "Empezar"; draw(); };
    el.querySelector("#tmu").onclick = () => { mu++; el.querySelector("#tmc").textContent = mu; };
    el.querySelector("#tmr").onclick = () => { mu = 0; el.querySelector("#tmc").textContent = 0; };
    el.querySelector("#tm").oninput = () => { st(); draw(); }; el.querySelector("#ta").oninput = () => { st(); draw(); };
    return () => clearInterval(iv);
  }
};

T["grabadora"] = {
  t:"Grabadora de ensayo", d:"Grábate con el micrófono (y la cámara si quieres) y escúchate. La grabación se queda solo en esta página: no se sube a ningún sitio y se borra al salir.", l:"3.8",
  render(){ const ok = navigator.mediaDevices && navigator.mediaDevices.getUserMedia && W.MediaRecorder;
    return ok ? `<div class="panel"><p class="row"><label class="row"><input type="checkbox" id="gcam"> Grabar también con cámara</label></p><p class="row"><button class="btn" id="grec">Empezar a grabar</button> <span class="meta" id="gst" aria-live="polite"></span></p><div id="gout"></div></div>
    <div class="box"><b>Al revisar tu grabación, fíjate en:</b><ul><li>¿Se nota tanto el nerviosismo como creías? (casi nunca: ilusión de transparencia)</li><li>Ritmo: ¿hablas rápido? ¿haces pausas?</li><li>Muletillas y frases de disculpa («perdón», «no sé si…»)</li><li>Mirada y gestos (si grabaste en video)</li><li>Una cosa que hiciste bien y una que cambiarás en el próximo ensayo</li></ul></div>` : `<div class="box warnbox">Tu navegador no permite grabar desde esta página (algunos navegadores lo bloquean al abrir el archivo sin servidor). Usa la grabadora de voz o la cámara de tu teléfono: el ejercicio es el mismo.</div>`; },
  bind(el){ let rec = null, stream = null, chunks = [], t0 = 0, iv = null; const btn = el.querySelector("#grec"); if (!btn) return;
    const stop = () => { if (rec && rec.state !== "inactive") rec.stop(); if (stream) stream.getTracks().forEach(t => t.stop()); clearInterval(iv); };
    btn.onclick = async () => {
      if (rec && rec.state === "recording"){ stop(); btn.textContent = "Grabar otra vez"; return; }
      const cam = el.querySelector("#gcam").checked;
      try { stream = await navigator.mediaDevices.getUserMedia({audio:true, video:cam}); } catch(e){ el.querySelector("#gst").textContent = "No se pudo acceder al micrófono o la cámara (permiso denegado o no disponible)."; return; }
      chunks = []; rec = new MediaRecorder(stream); rec.ondataavailable = e => chunks.push(e.data);
      rec.onstop = () => { const blob = new Blob(chunks, {type:rec.mimeType || (cam ? "video/webm" : "audio/webm")}); const url = URL.createObjectURL(blob);
        el.querySelector("#gout").innerHTML = cam ? `<video controls src="${url}" style="width:100%;max-width:520px"></video>` : `<audio controls src="${url}" style="width:100%"></audio>`; el.querySelector("#gst").textContent = "Grabación lista. Escúchala con la lista de abajo."; };
      rec.start(); t0 = Date.now(); btn.textContent = "Parar"; iv = setInterval(() => el.querySelector("#gst").textContent = "Grabando… " + fmt((Date.now() - t0) / 1000), 500);
    };
    return stop;
  }
};

T["lista-charla"] = {
  t:"Lista de control: el día de la charla", d:"Marca cada punto antes y durante tu charla o reunión importante. Imprímela si quieres.", l:"3.9",
  items:[["La víspera",["Ensayé en voz alta al menos 3 veces, de pie y con tiempo","Tengo notas con palabras clave (y el inicio y el cierre escritos)","Preparé respuestas a las 3 preguntas más difíciles","Dormí lo suficiente; evito comer pesado o mucho café"]],["Al llegar (10–30 min antes)",["Llegué con tiempo y probé proyector, micrófono y archivo","Hablé con 1–2 personas del público","Bebí agua y tengo agua a mano","Fui al baño"]],["Los 3 minutos antes",["Hice 3–5 suspiros cíclicos o respiración lenta","Me dije mi guion: «Estoy emocionado, no en peligro»","Postura abierta, pies firmes","Repasé mentalmente las 2 primeras frases"]],["Durante",["Empecé con una pausa y mirando a una persona amable","Pongo la atención en el mensaje y en el público, no en mis síntomas","Hago pausas en lugar de muletillas","Si me quedo en blanco: pausa, miro las notas, repito la última idea"]],["Después",["Anoté una cosa que hice bien y una a mejorar (no más)","Me trato como a un amigo: sin repasar mil veces lo que salió mal","Lo registré en el diario de victorias"]]],
  render(ctx){ const v = ctx.get() || {};
    return this.items.map((g, gi) => `<div class="panel"><h3 style="margin-top:0">${esc(g[0])}</h3>${g[1].map((it, i) => `<label class="row" style="margin:.35rem 0"><input type="checkbox" data-c="${gi}-${i}" ${v[gi + "-" + i] ? "checked" : ""}> ${esc(it)}</label>`).join("")}</div>`).join("") + `<p class="row"><button class="btn ghost" id="lprint">Imprimir</button> <button class="btn ghost" id="lclear">Desmarcar todo</button></p>`; },
  bind(el, ctx){ const self = this; el.querySelectorAll("[data-c]").forEach(c => c.onchange = () => { const v = ctx.get() || {}; v[c.dataset.c] = c.checked; ctx.set(v); });
    el.querySelector("#lprint").onclick = () => W.print(); el.querySelector("#lclear").onclick = () => { ctx.set({}); el.innerHTML = self.render(ctx); self.bind(el, ctx); }; }
};

T["negociacion"] = formTool({
  t:"Planificador de negociación", d:"Prepara cualquier negociación (precio, salario, plazo, condiciones) con tu objetivo, tu mínimo, tu alternativa (MAAN), tu ancla y tus preguntas.", l:"4.6",
  fields:[["que","¿Qué se negocia?"],["obj","Mi objetivo ambicioso (lo que pediré)"],["min","Mi mínimo aceptable (por debajo, me levanto)"],["maan","Mi MAAN: qué haré si no hay acuerdo","area"],["suya","Su probable MAAN y su límite","area"],["int","Sus intereses (qué le importa de verdad)","area"],["ancla","Mi primera oferta (ancla) y cómo la justifico","area"],["conc","Concesiones que puedo hacer (baratas para mí, valiosas para la otra parte)","area"],["preg","Mis preguntas abiertas («¿Cómo…?», «¿Qué…?»)","area","¿Qué necesitarías ver para aceptar? ¿Cómo podemos hacer que esto funcione para los dos?"],["etq","Etiquetas que puedo usar («Parece que…»)","area","Parece que el presupuesto es lo que más te preocupa."]],
  outTitle:"Tu hoja de negociación",
  out:v => `NEGOCIACIÓN: ${or(v.que, "…")}\n\nPEDIRÉ (ancla): ${or(v.ancla, "…")}\nOBJETIVO: ${or(v.obj, "…")}\nMÍNIMO: ${or(v.min, "…")}\nSI NO HAY ACUERDO (MAAN): ${or(v.maan, "…")}\n\nLA OTRA PARTE\n · Su alternativa y límite: ${or(v.suya, "…")}\n · Sus intereses: ${or(v.int, "…")}\n\nCONCESIONES POSIBLES: ${or(v.conc, "…")}\nPREGUNTAS: ${or(v.preg, "…")}\nETIQUETAS: ${or(v.etq, "…")}\n\nRecuerda: di tu cifra y calla. No aceptes la primera contraoferta sin pedir algo a cambio.`
});

T["aumento"] = formTool({
  t:"Guion para pedir un aumento", d:"Prepara tus datos y obtén un guion que puedes ensayar en voz alta.", l:"4.7",
  fields:[["jefe","Nombre de tu jefe o jefa"],["l1","Logro 1 (con un número si puedes)"],["l2","Logro 2"],["l3","Logro 3"],["resp","Responsabilidades nuevas que asumiste"],["mer","Dato de mercado (salario de referencia para tu puesto)"],["cifra","Cifra o porcentaje que pedirás"],["alt","Si dicen que no ahora, pediré…","select",["criterios claros y una fecha de revisión","una parte ahora y el resto en 6 meses","formación o días libres pagados","un cambio de puesto o título"]]],
  outTitle:"Tu guion (ensáyalo en voz alta 3 veces)",
  out:v => `«${or(v.jefe, "…")}, gracias por el tiempo. Quiero hablar de mi salario.\n\nEn este año he ${or(v.l1, "…")}, ${or(v.l2, "…")} y ${or(v.l3, "…")}. Además, ahora me ocupo de ${or(v.resp, "…")}.\n\nHe mirado referencias del mercado: ${or(v.mer, "…")}.\n\nPor eso te pido ${or(v.cifra, "…")}.»\n\n[SILENCIO. Cuenta hasta 7 por dentro. Deja que hable la otra persona.]\n\nSi la respuesta es «no ahora»:\n«Entiendo. ¿Qué tendría que pasar para que sea posible? Me gustaría acordar ${esc(v.alt || "")}.»\n\nCierre: «Te envío un correo con lo que hemos hablado.»`
});

T["conversacion"] = formTool({
  t:"Preparar una conversación difícil", d:"Basado en las tres conversaciones de Stone, Patton y Heen: qué pasó, las emociones y lo que dice de tu identidad. Obtén una primera frase desde la «tercera historia».", l:"5.3",
  fields:[["con","¿Con quién?"],["hechos","Los hechos (lo que una cámara grabaría, sin juicios)","area"],["mia","Mi historia (cómo lo veo yo)","area"],["suya","Su historia probable (cómo lo ve la otra persona)","area"],["impacto","El impacto que tuvo en mí (no su intención)","area"],["emo","Mis emociones"],["ident","¿Qué me hace sentir sobre mí? («¿soy mala jefa si…?»)"],["obj","Mi objetivo: ¿qué quiero que pase al final?","area"]],
  outTitle:"Tu primera frase y tu guion",
  out:v => `PRIMERA FRASE (tercera historia):\n«${or(v.con, "…")}, quería hablar contigo de ${or(v.hechos, "lo que pasó")}. Creo que lo vemos de forma distinta y me gustaría entender tu punto de vista y contarte el mío, para que encontremos ${or(v.obj, "una solución")}.»\n\nDESPUÉS:\n1. Pregunta y escucha su historia hasta el final. Resume: «Entonces, para ti…».\n2. Cuenta tu historia: «Lo que yo vi fue… Me afectó porque… (${or(v.impacto, "impacto")}) Me sentí ${or(v.emo, "…")}.»\n3. Separa intención de impacto: «No creo que lo hicieras a propósito; aun así, me afectó».\n4. Busca juntos: «¿Qué podemos hacer para que no vuelva a pasar?».\n\nPara ti (no lo digas): ${or(v.ident, "…")}. Recuerda que una conversación difícil no decide quién eres.`
});

const SENT = ["preocupado/a","frustrado/a","cansado/a","triste","molesto/a","agobiado/a","confundido/a","inseguro/a","decepcionado/a","nervioso/a"];
const NEC = ["respeto","descanso","claridad","apoyo","tiempo para mí","colaboración","confianza","orden","ser escuchado/a","seguridad"];
T["cnv"] = formTool({
  t:"Mensaje de comunicación no violenta", d:"Construye un mensaje para poner un límite o pedir un cambio con los 4 pasos de Marshall Rosenberg: observación, sentimiento, necesidad y petición.", l:"5.5",
  fields:[["obs","1. Observación (hechos, sin juzgar)","Cuando me llamas después de las 22:00 por temas de trabajo"],["sen","2. Sentimiento","select",SENT],["nec","3. Necesidad","select",NEC],["pet","4. Petición (concreta, realizable, en positivo)","¿Podrías escribirme un mensaje y lo vemos a las 9:00?"]],
  outTitle:"Tu mensaje",
  out:v => `«${or(v.obs, "Cuando…")}, me siento ${esc(v.sen || "…")}, porque necesito ${esc(v.nec || "…")}. ${or(v.pet, "¿Podrías…?")}»\n\nComprueba: ¿la observación tiene juicios («siempre», «nunca», «eres un…»)? ¿La petición es concreta y se puede cumplir? ¿Aceptarías un «no» y negociarías? Si no, es una exigencia.`
});

T["escalera"] = {
  t:"Mi escalera de exposición", d:"10 peldaños de menos a más miedo (0–100). Sube uno a uno, repítelo hasta que el miedo baje o compruebes que lo temido no pasa, y marca cada peldaño superado.", l:"7.1",
  render(ctx){ const v = ctx.get() || {p:[]};
    const rows = Array.from({length:10}, (_, i) => v.p[i] || {t:"", s:(i + 1) * 10, d:false});
    return `<div class="panel"><p class="meta">Consejo: el peldaño 1 debería darte un poco de miedo (10–20) y el 10 ser tu objetivo de 90 días. Si dos peldaños están muy separados, añade uno intermedio.</p><p class="row"><button class="btn ghost" id="efill">Rellenar con ideas según mi mapa del miedo</button></p>
    <ol class="toc">${rows.map((r, i) => `<li><div class="row"><input type="text" data-et="${i}" value="${esc(r.t)}" placeholder="Peldaño ${i + 1}" style="flex:1;min-width:12rem"><label>Miedo: <input type="number" min="0" max="100" step="5" data-es="${i}" value="${r.s}" style="width:4.5rem"></label><label class="row"><input type="checkbox" data-ed="${i}" ${r.d ? "checked" : ""}> superado</label></div></li>`).join("")}</ol></div>
    <p class="meta" id="emsg">${rows.filter(r => r.d).length} de 10 peldaños superados.</p>`; },
  bind(el, ctx){ const self = this;
    const upd = () => { const p = Array.from({length:10}, (_, i) => ({t:el.querySelector(`[data-et="${i}"]`).value, s:+el.querySelector(`[data-es="${i}"]`).value, d:el.querySelector(`[data-ed="${i}"]`).checked})); ctx.set({p}); el.querySelector("#emsg").textContent = p.filter(r => r.d).length + " de 10 peldaños superados."; };
    el.querySelector("ol").oninput = upd; el.querySelector("ol").onchange = upd;
    el.querySelector("#efill").onclick = () => { const mapa = (ctx.all()["mapa-miedo"] || {s:{}}).s; const IDEAS = W.IDEAS_ESCALERA || {};
      const order = SITUACIONES.map((s, i) => [i, mapa[i] != null ? mapa[i] : 5]).sort((a, b) => b[1] - a[1]); const top = order.slice(0, 2).map(o => o[0]);
      const list = []; top.forEach(i => (IDEAS[i] || []).forEach(x => list.push(x))); list.sort((a, b) => a[1] - b[1]);
      const pick = list.length >= 10 ? Array.from({length:10}, (_, k) => list[Math.round(k * (list.length - 1) / 9)]) : list;
      const old = (ctx.get() || {p:[]}).p; if (old.some(r => r && r.t) && !confirm("¿Sustituir los peldaños que ya escribiste?")) return;
      ctx.set({p:pick.map(x => ({t:x[0], s:x[1], d:false}))}); el.innerHTML = self.render(ctx); self.bind(el, ctx); };
  }
};

T["rutina"] = {
  t:"Rutina diaria de 15 minutos", d:"Respiración, voz, improvisación, un microrreto y el diario. Hazla cada día: la constancia vale más que la intensidad.", l:"7.2",
  render(ctx){ const v = ctx.get() || {}; const hoy = new Date().toLocaleDateString("es"); const d = v[hoy] || {};
    const now = ctx.retoNow();
    const S = [["r","3 min · Respiración", `Haz la práctica <a href="#/practicas/respiracion-lenta">Respiración lenta</a> o 5 suspiros cíclicos.`],["v","3 min · Voz", `Lee en voz alta un texto (una noticia, un libro) con pausas al final de cada frase. Exagera un poco el volumen y la entonación.`],["i","1 min · Improvisación", `Tema al azar: <b id="rtema">${esc(rand(W.TEMAS || ["Tu comida favorita"]))}</b> <button class="chip" id="rnew">Otro tema</button> Habla 60 segundos sin parar.`],["m","5 min · Microrreto", now ? `Haz el <a href="#/reto-30-dias/${now.d}">día ${now.d} del reto: ${esc(now.t)}</a>.` : "Repite un reto que te costó."],["d","2 min · Diario", `Anota una victoria en el <a href="#/herramientas/victorias">diario de victorias</a>.`]];
    const days = Object.keys(v).length;
    return `<div class="panel"><p class="kicker">Hoy, ${esc(hoy)}</p>${S.map(s => `<label class="row" style="margin:.6rem 0;align-items:flex-start"><input type="checkbox" data-r="${s[0]}" ${d[s[0]] ? "checked" : ""} style="margin-top:.35rem"> <span><b>${s[1]}</b><br>${s[2]}</span></label>`).join("")}</div>
    <div class="timer green" id="rt" role="timer">1:00</div><p class="row"><button class="btn" id="rgo">Temporizador de 1 minuto</button> <button class="btn ghost" id="rgo3">3 minutos</button></p>
    <p class="meta">Días con la rutina empezada: ${days}.</p>`; },
  bind(el, ctx){ const self = this, hoy = new Date().toLocaleDateString("es"); let iv = null;
    el.querySelectorAll("[data-r]").forEach(c => c.onchange = () => { const v = ctx.get() || {}; v[hoy] = v[hoy] || {}; v[hoy][c.dataset.r] = c.checked; ctx.set(v); });
    const nb = el.querySelector("#rnew"); if (nb) nb.onclick = ev => { ev.preventDefault(); el.querySelector("#rtema").textContent = rand(W.TEMAS || ["Tu comida favorita"]); };
    const go = s => { clearInterval(iv); const end = Date.now() + s * 1000, t = el.querySelector("#rt"); iv = setInterval(() => { const l = (end - Date.now()) / 1000; t.textContent = fmt(Math.max(0, l)); t.className = "timer " + (l <= 0 ? "red" : l <= 10 ? "yellow" : "green"); if (l <= 0) clearInterval(iv); }, 200); };
    el.querySelector("#rgo").onclick = () => go(60); el.querySelector("#rgo3").onclick = () => go(180);
    return () => clearInterval(iv);
  }
};

T["temas"] = {
  t:"Generador de temas para improvisar", d:"Habla 60 segundos sobre un tema al azar sin prepararlo. Entrena hablar sin guion y tolerar la incertidumbre. Estructura rápida: opinión, razón, ejemplo, cierre.", l:"7.4",
  render(){ return `<div class="panel"><p class="bigword" id="tema">Pulsa «Nuevo tema»</p><div class="timer green" id="tt2" role="timer">1:00</div><p class="row"><button class="btn" id="tn">Nuevo tema y empezar</button> <button class="btn ghost" id="ts">Parar</button></p><p class="meta">Si te bloqueas: di «Lo que más me llama la atención de esto es…» y sigue. No pasa nada si dices algo simple.</p></div>`; },
  bind(el, ctx){ let iv = null;
    el.querySelector("#tn").onclick = () => { el.querySelector("#tema").textContent = rand(W.TEMAS || ["Tu comida favorita"]); clearInterval(iv); const end = Date.now() + 60000, t = el.querySelector("#tt2");
      iv = setInterval(() => { const l = (end - Date.now()) / 1000; t.textContent = fmt(Math.max(0, l)); t.className = "timer " + (l <= 0 ? "red" : l <= 10 ? "yellow" : "green"); if (l <= 0){ clearInterval(iv); const v = ctx.get() || {n:0}; v.n++; ctx.set(v); } }, 200); };
    el.querySelector("#ts").onclick = () => clearInterval(iv);
    return () => clearInterval(iv);
  }
};

const CRIT = [["Mensaje","No hay un mensaje claro","El mensaje aparece, pero difuso","Mensaje claro","Mensaje claro, memorable y repetido al final"],["Estructura","Ideas sueltas","Hay orden, pero se pierde a ratos","Estructura clara","Estructura clara con transiciones"],["Inicio","Empiezo con disculpas o rodeos","Inicio correcto pero plano","Inicio que capta la atención","Inicio con historia, pregunta o dato potente"],["Cierre","Termino con «eso es todo»","Cierre débil","Resumen o llamada a la acción","Resumen + llamada a la acción memorable"],["Voz","Muy rápida o inaudible","Audible, con muchas muletillas","Ritmo adecuado y algunas pausas","Volumen, ritmo y pausas al servicio del mensaje"],["Cuerpo y mirada","Evito mirar; postura cerrada","Miro a ratos","Miro a varias personas, gestos naturales","Presencia tranquila y gestos que apoyan"],["Nervios y errores","El miedo me paró","Seguí, pero me castigué","Me recuperé de un error o de los nervios","Usé una técnica a propósito y funcionó"],["Aplicación","No usé técnicas del curso","Usé 1 técnica","Usé 2–3 técnicas","Preparé, ensayé y usé técnicas de varios módulos"]];
T["rubrica"] = {
  t:"Proyecto final y rúbrica", d:"Opción A: una charla de 5 minutos grabada. Opción B: una negociación o conversación difícil real. Evalúate con 8 criterios (1 a 4) y compara con tu mapa del miedo del principio.", l:"7.7",
  render(ctx){ const v = ctx.get() || {c:{}}; const m = ctx.all()["mapa-miedo"];
    return `<div class="panel"><label class="field"><span>Opción elegida</span><select id="ro">${["A: charla de 5 minutos grabada","B: negociación o conversación difícil real"].map(o => `<option${v.o === o ? " selected" : ""}>${o}</option>`).join("")}</select></label><label class="field"><span>Describe qué hiciste, dónde y con quién</span><textarea id="rd">${esc(v.d || "")}</textarea></label></div>
    <div class="tablewrap"><table><thead><tr><th>Criterio</th><th>1</th><th>2</th><th>3</th><th>4</th></tr></thead><tbody>${CRIT.map((c, i) => `<tr><th>${c[0]}</th>${[1,2,3,4].map(n => `<td><label><input type="radio" name="rc${i}" value="${n}" ${v.c[i] === n ? "checked" : ""}> ${esc(c[n])}</label></td>`).join("")}</tr>`).join("")}</tbody></table></div>
    <p class="bignum" id="rtot"></p><label class="field"><span>Reflexión: ¿qué cambió desde el día 1? ¿Qué harás en los próximos 90 días?</span><textarea id="rr">${esc(v.r || "")}</textarea></label>
    ${m ? `<div class="box"><b>Tu mapa del miedo al empezar:</b> ${SITUACIONES.map((s, i) => `${esc(s.split(" (")[0])}: ${m.s[i] != null ? m.s[i] : "—"}`).join(" · ")}. <a href="#/herramientas/mapa-miedo">Actualízalo ahora</a> y compara.</div>` : ""}`; },
  bind(el, ctx){ const upd = () => { const v = {o:el.querySelector("#ro").value, d:el.querySelector("#rd").value, r:el.querySelector("#rr").value, c:{}}; CRIT.forEach((c, i) => { const x = el.querySelector(`input[name=rc${i}]:checked`); if (x) v.c[i] = +x.value; }); ctx.set(v);
      const n = Object.keys(v.c).length, s = Object.values(v.c).reduce((a, b) => a + b, 0); el.querySelector("#rtot").textContent = n ? `${s} / 32 puntos${n < 8 ? ` (${n} de 8 criterios)` : s >= 24 ? " · ¡Proyecto superado!" : " · Repite el proyecto cuando quieras: lo importante es haberlo hecho."}` : ""; };
    el.oninput = upd; el.onchange = upd; upd(); }
};
W.TOOLS = T;

// ---------- Reproductor de prácticas guiadas ----------
function practica(el, p, done){
  const seq = [].concat(p.ini || [], ...Array.from({length:p.rep || 1}, () => p.ciclo || []), p.fin || []);
  const total = seq.reduce((a, s) => a + s[1], 0); let i = -1, left = 0, iv = null, paused = false, elapsed = 0;
  const voiceOk = VOZ.ok();
  el.innerHTML = `<div class="breath" id="pb" aria-hidden="true"></div><p class="stepnow" id="ps" aria-live="polite">Pulsa «Empezar» cuando estés listo. Duración: ${fmt(total)}.</p><p class="cnt" id="pc"></p><div class="bar"><i id="pbar" style="width:0%"></i></div>
  <p class="row" style="justify-content:center;margin-top:1rem"><button class="btn" id="pgo">Empezar</button> <button class="btn ghost" id="pre">Reiniciar</button> ${voiceOk ? `<label class="row"><input type="checkbox" id="pv"> Leer en voz alta</label>` : `<span class="meta">Tu navegador no tiene voz: sigue el texto.</span>`}</p>`;
  const B = el.querySelector("#pb"), S = el.querySelector("#ps"), C = el.querySelector("#pc"), BAR = el.querySelector("#pbar");
  const useV = () => voiceOk && el.querySelector("#pv") && el.querySelector("#pv").checked;
  if (!seq.some(s => s[2])) B.style.display = "none";
  const show = () => { const s = seq[i]; S.textContent = s[0]; B.className = "breath " + (s[2] || ""); if (useV()) VOZ.say(s[0]); };
  const tick = () => { if (paused) return; left -= 1; elapsed += 1; BAR.style.width = Math.min(100, elapsed / total * 100) + "%";
    if (left <= 0){ i++; if (i >= seq.length){ clearInterval(iv); iv = null; S.textContent = "Práctica terminada. ¿Cómo te sientes ahora?"; C.textContent = ""; B.className = "breath"; el.querySelector("#pgo").textContent = "Repetir"; if (useV()) VOZ.say("Práctica terminada."); done(); return; } left = seq[i][1]; show(); }
    C.textContent = left > 0 ? left + " s" : ""; };
  el.querySelector("#pgo").onclick = () => { const b = el.querySelector("#pgo");
    if (!iv){ if (i < 0 || i >= seq.length){ i = 0; elapsed = 0; left = seq[0][1]; show(); C.textContent = left + " s"; } paused = false; iv = setInterval(tick, 1000); b.textContent = "Pausa"; }
    else { paused = !paused; b.textContent = paused ? "Continuar" : "Pausa"; if (paused) VOZ.stop(); } };
  el.querySelector("#pre").onclick = () => { clearInterval(iv); iv = null; i = -1; elapsed = 0; BAR.style.width = "0%"; S.textContent = "Pulsa «Empezar» cuando estés listo."; C.textContent = ""; B.className = "breath"; el.querySelector("#pgo").textContent = "Empezar"; VOZ.stop(); };
  if (voiceOk && W.speechSynthesis.onvoiceschanged !== undefined) W.speechSynthesis.onvoiceschanged = () => { VOZ.voice = VOZ.pick(); };
  return () => { clearInterval(iv); VOZ.stop(); };
}

// ---------- Simuladores ----------
function simulador(el, s, done){
  let i = 0, pts = 0;
  const step = () => {
    if (i >= s.pasos.length){ const pct = Math.round(pts / (s.pasos.length * 2) * 100); done(pct);
      el.innerHTML = `<h2 style="margin-top:0">Resultado: ${pct} %</h2><p>${pct >= 80 ? "Muy bien: elegiste casi siempre la respuesta más eficaz y respetuosa." : pct >= 50 ? "Bien. Revisa las explicaciones de las decisiones que fallaste y vuelve a intentarlo." : "Repasa la lección relacionada y vuelve a intentarlo: es un entrenamiento, no un examen."}</p>${s.cierre ? `<div class="box">${esc(s.cierre)}</div>` : ""}<p class="row"><button class="btn" id="sagain">Repetir</button> <a class="btn ghost" href="#/herramientas">Otros simuladores</a></p>`;
      el.querySelector("#sagain").onclick = () => { i = 0; pts = 0; step(); }; return; }
    const p = s.pasos[i];
    el.innerHTML = `<p class="kicker">Decisión ${i + 1} de ${s.pasos.length}</p><p class="sit">${esc(p.sit)}</p><div class="quiz">${p.op.map((o, j) => `<label><input type="radio" name="so" value="${j}"> ${esc(o[0])}</label>`).join("")}</div><p class="fb" id="sfb" aria-live="polite"></p><p class="row"><button class="btn" id="sok">Elegir</button></p>`;
    el.querySelector("#sok").onclick = () => { const c = el.querySelector("input[name=so]:checked"); if (!c) return; const o = p.op[+c.value]; pts += o[1];
      const best = p.op.reduce((b, x) => x[1] > b[1] ? x : b, p.op[0]);
      el.querySelector("#sfb").className = "fb " + (o[1] === 2 ? "okc" : o[1] === 1 ? "" : "bad");
      el.querySelector("#sfb").innerHTML = `<b>${o[1] === 2 ? "Muy buena opción." : o[1] === 1 ? "Aceptable, pero mejorable." : "Poco eficaz."}</b> ${esc(o[2])}${o[1] < 2 ? `<br><span class="meta">Mejor opción: «${esc(best[0])}»</span>` : ""}`;
      el.querySelectorAll("input[name=so]").forEach(x => x.disabled = true);
      const b = el.querySelector("#sok"); b.textContent = i + 1 < s.pasos.length ? "Siguiente" : "Ver resultado"; b.onclick = () => { i++; step(); }; };
  };
  step();
}
W.HS = {practica, simulador, VOZ};
})();
