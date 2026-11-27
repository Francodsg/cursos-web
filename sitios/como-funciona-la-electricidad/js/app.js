// Aplicación: rutas con #, páginas, lecciones, tema claro/oscuro, menú y buscador en vivo.
(function () {
  "use strict";
  var C = window.CURSO, P = window.PROGRESO, B = window.BUSCADOR, Q = window.QUIZ, N = window.NUM, T = window.T;
  var app = document.getElementById("app");
  function esc(s) { return String(s === undefined || s === null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function hm(min) { var h = Math.floor(min / 60), m = min % 60; return h ? h + " h" + (m ? " " + (m < 10 ? "0" : "") + m + " min" : "") : m + " min"; }
  function slug(s) { return B.norm(s).trim().replace(/\s+/g, "-"); }
  function modulo(id) { return C.modulos.filter(function (m) { return m.id === id; })[0]; }
  function leccion(id) { for (var i = 0; i < C.modulos.length; i++) { var m = C.modulos[i]; for (var j = 0; j < m.lecciones.length; j++) if (m.lecciones[j].id === id) return { l: m.lecciones[j], m: m, j: j }; } return null; }
  function todas() { var r = []; C.modulos.forEach(function (m) { m.lecciones.forEach(function (l) { r.push({ l: l, m: m }); }); }); return r; }
  function minModulo(m) { return m.lecciones.reduce(function (s, l) { return s + l.min; }, 0) + (m.quizMin || 0); }
  function nSims() { return Object.keys(C.sims).filter(function (k) { return /^S\d+$/.test(k); }).length; }
  function titulo(t) { document.title = (t ? t + " · " : "") + T.sitio; }

  // ---------- Red eléctrica elegida ----------
  function red() { var r = P.pref("red"); return r === "230" ? { V: "230 V", HZ: "50 Hz", VP: "325 V", v: 230, hz: 50 } : { V: "127 V", HZ: "60 Hz", VP: "180 V", v: 127, hz: 60 }; }

  // ---------- Mini lenguaje de marcas ----------
  var GLOS = {}; (window.GLOSARIO || []).forEach(function (g) { GLOS[slug(g.t)] = g; (g.sin || []).forEach(function (s) { GLOS[slug(s)] = g; }); });
  function inline(s) {
    var r = red();
    s = esc(s).replace(/\{\{(V|HZ|VP)\}\}/g, function (_, k) { return r[k]; });
    s = s.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>").replace(/(^|[^*])\*([^*\s][^*]*)\*/g, "$1<i>$2</i>").replace(/`([^`]+)`/g, "<code>$1</code>");
    s = s.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, function (_, t, txt) { var g = GLOS[slug(t)]; return g ? '<a class="glos" href="#/glosario/' + slug(g.t) + '" title="' + esc(g.d) + '">' + (txt || t) + "</a>" : (txt || t); });
    s = s.replace(/\[([^\]]+)\]\((#[^)\s]+)\)/g, '<a href="$2">$1</a>');
    return s;
  }
  function md(txt) {
    if (!txt) return "";
    var lineas = String(txt).replace(/\r/g, "").split("\n"), out = [], i = 0;
    while (i < lineas.length) {
      var l = lineas[i];
      if (!l.trim()) { i++; continue; }
      var m;
      if ((m = l.match(/^(#{2,3}) (.*)/))) { var tag = m[1].length === 2 ? "h3" : "h4"; out.push("<" + tag + ' id="s-' + slug(m[2]) + '">' + inline(m[2]) + "</" + tag + ">"); i++; continue; }
      if (/^(>|!>|\?>|\+>) /.test(l)) {
        var cls = l[0] === "!" ? "peligro" : l[0] === "?" ? "aviso" : l[0] === "+" ? "bien" : "", buf = [];
        while (i < lineas.length && /^(>|!>|\?>|\+>) /.test(lineas[i])) { buf.push(lineas[i].replace(/^(>|!>|\?>|\+>) /, "")); i++; }
        out.push('<div class="recuadro ' + cls + '"><p>' + buf.map(inline).join("<br>") + "</p></div>"); continue;
      }
      if (/^\|/.test(l)) {
        var filas = []; while (i < lineas.length && /^\|/.test(lineas[i])) { filas.push(lineas[i]); i++; }
        filas = filas.filter(function (f) { return !/^\|\s*-/.test(f); }).map(function (f) { return f.replace(/^\||\|$/g, "").split("|").map(function (c) { return c.trim(); }); });
        out.push('<div class="tabla"><table><thead><tr>' + filas[0].map(function (c) { return "<th>" + inline(c) + "</th>"; }).join("") + "</tr></thead><tbody>" + filas.slice(1).map(function (f) { return "<tr>" + f.map(function (c) { return "<td>" + inline(c) + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table></div>"); continue;
      }
      if (/^- /.test(l)) { var it = []; while (i < lineas.length && /^- /.test(lineas[i])) { it.push("<li>" + inline(lineas[i].slice(2)) + "</li>"); i++; } out.push("<ul>" + it.join("") + "</ul>"); continue; }
      if (/^\d+\. /.test(l)) { var it2 = []; while (i < lineas.length && /^\d+\. /.test(lineas[i])) { it2.push("<li>" + inline(lineas[i].replace(/^\d+\. /, "")) + "</li>"); i++; } out.push("<ol>" + it2.join("") + "</ol>"); continue; }
      if (/^= /.test(l)) { var fs = []; while (i < lineas.length && /^= /.test(lineas[i])) { fs.push('<span class="formula-linea">' + inline(lineas[i].slice(2)) + "</span>"); i++; } out.push('<div class="recuadro formula">' + fs.join("") + "</div>"); continue; }
      var par = []; while (i < lineas.length && lineas[i].trim() && !/^(#{2,3} |>|!>|\?>|\+>|\||- |\d+\. |= )/.test(lineas[i])) { par.push(lineas[i]); i++; }
      out.push("<p>" + inline(par.join(" ")) + "</p>");
    }
    return out.join("\n");
  }
  window.MD = md;

  // ---------- Simulaciones, calculadoras y experimentos incrustados ----------
  function montarSim(cont, id, propia) {
    var s = C.sims[id]; if (!s) return;
    var w = document.createElement("section"); w.className = "sim"; w.setAttribute("data-sim", id);
    w.innerHTML = '<div class="sim-cab"><h3>' + (id === "CASA" ? "" : id + " · ") + esc(s.t) + "</h3>" + (propia ? "" : '<a href="#/simulacion/' + id + '">Abrir en pantalla completa</a>') + '</div><p class="sim-nota">' + esc(s.d) + '</p><div class="sim-cuerpo"></div>';
    cont.appendChild(w);
    try { window.SIMS[id](w.querySelector(".sim-cuerpo")); } catch (e) { w.querySelector(".sim-cuerpo").innerHTML = '<p class="error-campo">No se pudo cargar la simulación.</p>'; if (window.console) console.error(e); }
  }
  function montarCalc(cont, id, propia) {
    var s = C.calcs[id]; if (!s) return;
    var w = document.createElement("section"); w.className = "calc-envoltura"; w.setAttribute("data-calc", id);
    w.innerHTML = "<h3>" + id + " · " + esc(s.t) + (propia ? "" : ' <small><a href="#/calculadora/' + id + '">abrir</a></small>') + '</h3><p class="sim-nota">' + esc(s.d) + "</p>";
    cont.appendChild(w); window.CALC.render(w, id);
  }
  var SEGT = { verde: "🟢 Sin riesgo", amarillo: "🟡 Precaución (con un adulto)", rojo: "🔴 Nunca en casa: solo simulación" };
  function htmlExperimento(e, corto, tag) {
    tag = tag || "h3";
    var h = '<article class="panel experimento" id="exp-' + e.id + '"><' + tag + '>' + esc(e.t) + ' <span class="seg ' + e.seg + '">' + SEGT[e.seg] + "</span></" + tag + ">" + "<p><b>Objetivo:</b> " + inline(e.obj) + "</p>";
    if (corto) return h + '<p><a href="#/experimento/' + e.id + '">Ver la ficha completa</a></p></article>';
    if (e.seg === "rojo") h += '<div class="recuadro peligro"><p><b>No lo hagas en casa.</b> Este experimento se presenta solo como demostración o simulación porque involucra la red eléctrica o voltajes peligrosos.</p></div>';
    h += (e.mat && e.mat.length ? "<h4>Materiales</h4><ul>" + e.mat.map(function (x) { return "<li>" + inline(x) + "</li>"; }).join("") + "</ul>" : "") +
      "<h4>Pasos</h4><ol class=\"pasos\">" + e.pasos.map(function (x) { return "<li>" + inline(x) + "</li>"; }).join("") + "</ol>" +
      "<h4>Qué observar</h4><p>" + inline(e.obs) + "</p>" +
      (e.tabla ? '<h4>Tabla de datos</h4><div class="tabla"><table><thead><tr>' + e.tabla.map(function (c) { return "<th>" + esc(c) + "</th>"; }).join("") + "</tr></thead><tbody>" + [1, 2, 3, 4].map(function () { return "<tr>" + e.tabla.map(function () { return "<td>&nbsp;</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table></div>" : "") +
      "<h4>Explicación</h4><p>" + inline(e.expl) + "</p>" +
      (e.var && e.var.length ? "<h4>Variaciones</h4><ul>" + e.var.map(function (x) { return "<li>" + inline(x) + "</li>"; }).join("") + "</ul>" : "") +
      '<h4>Normas de seguridad</h4><ul>' + e.seguridad.map(function (x) { return "<li>" + inline(x) + "</li>"; }).join("") + "</ul>" +
      "<h4>Al terminar</h4><p>" + inline(e.desecho) + "</p>" +
      (e.sim ? '<p>Simulación relacionada: <a href="#/simulacion/' + e.sim + '">' + esc(C.sims[e.sim].t) + "</a></p>" : "") +
      '<label style="font-weight:400"><input type="checkbox" class="exp-hecho" data-e="' + e.id + '"' + (P.experimento(e.id) ? " checked" : "") + "> Ya hice este experimento</label>";
    return h + "</article>";
  }
  function experimento(id) { return (window.EXPERIMENTOS || []).filter(function (e) { return e.id === id; })[0]; }

  // ---------- Páginas ----------
  var R = {};
  function migas(arr) { return '<nav class="migas" aria-label="Ruta">' + arr.map(function (a) { return a[1] ? '<a href="' + a[1] + '">' + esc(a[0]) + "</a>" : esc(a[0]); }).join(" › ") + "</nav>"; }
  function barra(p) { return '<div class="barra" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + p + '"><i style="width:' + p + '%"></i></div>'; }
  function siguientePendiente() {
    var d = P.datos(); if (d.ultima && leccion(d.ultima) && !P.completada(d.ultima)) return d.ultima;
    var t = todas(); for (var i = 0; i < t.length; i++) if (!P.completada(t[i].l.id)) return t[i].l.id; return null;
  }

  R[""] = function () {
    titulo(""); var tot = P.avanceTotal(), sig = siguientePendiente(), lecs = todas().length, minT = C.modulos.reduce(function (s, m) { return s + minModulo(m); }, 0);
    var h = '<section class="hero"><h1>Cómo funciona la electricidad</h1><p class="lead">Un curso completo y en español, desde el átomo hasta la instalación de tu casa: ' + C.modulos.length + (C.modulos.length === 1 ? " módulo, " : " módulos, ") + lecs + " lecciones, " + nSims() + " simulaciones y " + Object.keys(C.calcs).length + " calculadoras. Duración total: " + hm(minT) + ".</p>" +
      barra(tot.pct) + '<p class="estado">Llevas ' + tot.hechas + " de " + tot.tot + " lecciones (" + tot.pct + " %).</p>" +
      '<div class="botones">' + (sig ? '<a class="btn" href="#/leccion/' + sig + '">' + (tot.hechas ? T.btn.continuar : T.btn.empezar) + "</a>" : "") + '<a class="btn sec" href="#/curso">Ver el mapa del curso</a><a class="btn sec" href="#/laboratorio">Ir al laboratorio</a></div></section>';
    h += '<div class="recuadro aviso"><p><b>Regla de oro:</b> en casa experimenta solo con pilas o baterías de 9 V o menos. La red eléctrica de tu casa ({{V}}) puede matar: en este curso se estudia, se simula y se respeta, pero nunca se toca.</p></div>'.replace("{{V}}", red().V);
    h += "<h2>Niveles</h2><div class=\"rejilla\">" + C.niveles.map(function (n) { var a = P.avanceNivel(n.n); var mods = C.modulos.filter(function (m) { return m.nivel === n.n; }); return '<a class="tarjeta" href="#/curso#nivel-' + n.n + '"><span class="etq">Nivel ' + n.n + "</span><h3>" + esc(n.nombre) + "</h3><p>" + esc(n.desc) + "</p><p>" + mods.length + " módulos · " + hm(mods.reduce(function (s, m) { return s + minModulo(m); }, 0)) + "</p>" + barra(a.pct) + "</a>"; }).join("") + "</div>";
    h += "<h2>Rutas de aprendizaje</h2><div class=\"rejilla\">" + C.rutas.map(function (r) { return '<a class="tarjeta" href="#/curso?ruta=' + r.id + '"><h3>' + esc(r.nombre) + "</h3><p>" + esc(r.desc) + "</p></a>"; }).join("") + "</div>";
    h += "<h2>Para practicar</h2><div class=\"rejilla\">" + ["C1", "C5", "C3"].map(function (k) { return '<a class="tarjeta" href="#/calculadora/' + k + '"><span class="etq">Calculadora</span><h3>' + esc(C.calcs[k].t) + "</h3><p>" + esc(C.calcs[k].d) + "</p></a>"; }).join("") + ["S5", "S7", "S15"].map(function (k) { return '<a class="tarjeta" href="#/simulacion/' + k + '"><span class="etq">Simulación</span><h3>' + esc(C.sims[k].t) + "</h3><p>" + esc(C.sims[k].d) + "</p></a>"; }).join("") + "</div>";
    app.innerHTML = h;
  };

  R.curso = function (_, qs) {
    titulo("Mapa del curso"); var ruta = qs.ruta || P.pref("ruta") || "completa", rt = C.rutas.filter(function (r) { return r.id === ruta; })[0] || C.rutas[0];
    if (qs.ruta) P.pref("ruta", ruta);
    var h = migas([["Inicio", "#/"], ["Mapa del curso"]]) + "<h1>Mapa del curso</h1><p class=\"lead\">" + C.modulos.length + " módulos organizados en " + C.niveles.length + " niveles. Elige una ruta; puedes estudiar en cualquier orden (modo libre).</p>";
    h += '<div class="chip-grupo" role="group" aria-label="Rutas">' + C.rutas.map(function (r) { return '<a class="chip' + (r.id === rt.id ? " on" : "") + '" href="#/curso?ruta=' + r.id + '">' + esc(r.nombre) + "</a>"; }).join("") + '</div><p class="sim-nota">' + esc(rt.desc) + "</p>";
    C.niveles.forEach(function (n) {
      var mods = C.modulos.filter(function (m) { return m.nivel === n.n && (!rt.modulos || rt.modulos.indexOf(m.id) >= 0); }); if (!mods.length) return;
      var a = P.avanceNivel(n.n);
      h += '<h2 id="nivel-' + n.n + '">Nivel ' + n.n + ": " + esc(n.nombre) + "</h2><p>" + esc(n.desc) + " " + (a.completo ? '<span class="hecho">✓ Nivel aprobado</span> · <a href="#/certificado/nivel-' + n.n + '">certificado</a>' : "") + "</p>";
      mods.forEach(function (m) {
        var am = P.avanceModulo(m), lecs = m.lecciones.filter(function (l) { return !rt.soloEsenciales || l.e; });
        h += '<details class="mod-det"' + (am.hechas && am.hechas < am.tot ? " open" : "") + '><summary>M' + m.n + ". " + esc(m.titulo) + ' <span class="estado">· ' + hm(minModulo(m)) + " · " + am.hechas + "/" + am.tot + (am.aprobado ? ' · <span class="hecho">✓ quiz aprobado</span>' : "") + "</span></summary>" + barra(am.pct) +
          '<ul class="lista-check">' + lecs.map(function (l) { return '<li><a href="#/leccion/' + l.id + '">' + l.id.replace("-", ".") + " " + (l.e ? "★ " : "") + esc(l.t) + '</a> <span class="estado">' + l.min + " min" + (P.completada(l.id) ? ' · <span class="hecho">✓</span>' : "") + "</span></li>"; }).join("") + '</ul><p><a href="#/modulo/' + m.id + '">Ver el módulo</a> · <a href="#/quiz/' + m.id + '">' + (m.n === 0 ? "Quiz diagnóstico" : "Quiz del módulo") + "</a></p></details>";
      });
    });
    app.innerHTML = h;
  };

  R.modulo = function (id) {
    var m = modulo(id); if (!m) return R.noEncontrado();
    titulo("M" + m.n + ". " + m.titulo); var am = P.avanceModulo(m), q = am.quiz;
    var h = migas([["Inicio", "#/"], ["Curso", "#/curso"], ["M" + m.n]]) + '<span class="etq">Nivel ' + m.nivel + '</span><h1>M' + m.n + ". " + esc(m.titulo) + '</h1><p class="lead"><b>Objetivo:</b> ' + inline(m.objetivo) + "</p><p>Duración: <b>" + hm(minModulo(m)) + "</b> (" + m.lecciones.length + " lecciones y " + (m.n === 15 ? "examen final" : "quiz") + " de " + m.quizMin + " min).</p>" + barra(am.pct);
    if (m.aviso) h += '<div class="recuadro aviso"><p>' + inline(m.aviso) + "</p></div>";
    if ((m.id === "m11" || m.id === "m12") && !["13-1", "13-2", "13-3", "13-4"].every(P.completada)) h += '<div class="recuadro peligro"><p><b>Recomendación:</b> antes de este módulo estudia las lecciones <a href="#/leccion/13-1">13.1</a> a <a href="#/leccion/13-4">13.4</a> de seguridad eléctrica.</p></div>';
    h += '<h2>Lecciones</h2><div class="tabla"><table><thead><tr><th>#</th><th>Lección</th><th>Descripción</th><th>Min</th><th>Estado</th></tr></thead><tbody>' + m.lecciones.map(function (l) { return "<tr><td>" + l.id.replace("-", ".") + (l.e ? " ★" : "") + '</td><td><a href="#/leccion/' + l.id + '">' + esc(l.t) + "</a></td><td>" + esc(l.d) + "</td><td>" + l.min + "</td><td>" + (P.completada(l.id) ? '<span class="hecho">✓</span>' : "—") + "</td></tr>"; }).join("") + "</tbody></table></div>";
    if (m.actividades && m.actividades.length) h += "<h2>Actividades prácticas</h2><ul>" + m.actividades.map(function (a) { return "<li>" + inline(a) + "</li>"; }).join("") + "</ul>";
    if (m.ejemplos && m.ejemplos.length) h += "<h2>Ejemplos del módulo</h2><ul>" + m.ejemplos.map(function (a) { return "<li>" + inline(a) + "</li>"; }).join("") + "</ul>";
    var exps = (window.EXPERIMENTOS || []).filter(function (e) { return e.mod === m.id; });
    if (exps.length) h += "<h2>Experimentos</h2><ul>" + exps.map(function (e) { return '<li><a href="#/experimento/' + e.id + '">' + esc(e.t) + '</a> <span class="seg ' + e.seg + '">' + SEGT[e.seg] + "</span></li>"; }).join("") + "</ul>";
    if (m.sims && m.sims.length) h += "<h2>Simulaciones</h2><ul>" + m.sims.map(function (s) { return '<li><a href="#/simulacion/' + s + '">' + (s === "CASA" ? "" : s + " · ") + esc(C.sims[s].t) + "</a></li>"; }).join("") + "</ul>";
    if (m.calcs && m.calcs.length) h += "<h2>Calculadoras</h2><ul>" + m.calcs.map(function (s) { return '<li><a href="#/calculadora/' + s + '">' + s + " · " + esc(C.calcs[s].t) + "</a></li>"; }).join("") + "</ul>";
    h += "<h2>Evaluación</h2><p>" + inline(m.evaluacion || "") + "</p>" + (q ? "<p>Mejor resultado: <b>" + q.mejor + " %</b> en " + q.intentos + " intento(s)." + (am.aprobado ? ' <span class="hecho">✓ Aprobado</span>' : "") + "</p>" : "") +
      '<div class="botones"><a class="btn" href="#/quiz/' + m.id + '">' + (m.n === 0 ? "Hacer el quiz diagnóstico" : "Hacer el quiz del módulo") + "</a>" + (m.n === 15 ? '<a class="btn sec" href="#/examen-final">Examen final</a>' : "") + "</div>";
    app.innerHTML = h;
  };

  R.leccion = function (id) {
    var x = leccion(id); if (!x) return R.noEncontrado();
    var l = x.l, m = x.m, prev = m.lecciones[x.j - 1], next = m.lecciones[x.j + 1];
    if (!next) { var mi = C.modulos.indexOf(m); if (C.modulos[mi + 1]) next = C.modulos[mi + 1].lecciones[0]; }
    if (!prev) { var mp = C.modulos.indexOf(m); if (C.modulos[mp - 1]) { var lm = C.modulos[mp - 1].lecciones; prev = lm[lm.length - 1]; } }
    titulo(l.id.replace("-", ".") + " " + l.t); P.verLeccion(l.id);
    var Tp = T.partes, sec = [];
    function seccion(idS, tit, cuerpo) { sec.push([idS, tit]); return '<section id="' + idS + '"><h2>' + tit + "</h2>" + cuerpo + "</section>"; }
    var h = migas([["Inicio", "#/"], ["Curso", "#/curso"], ["M" + m.n, "#/modulo/" + m.id], ["Lección " + l.id.replace("-", ".")]]);
    h += '<span class="etq">M' + m.n + " · " + l.min + " min</span>" + (l.e ? '<span class="etq" title="' + T.varios.esencial + '">★ Esencial</span>' : "") + "<h1>" + l.id.replace("-", ".") + " " + esc(l.t) + "</h1>";
    h += '<p class="pregunta-inicial">' + inline(l.preg) + "</p>";
    var cuerpo = seccion("objetivos", Tp.objetivos, "<ul>" + l.obj.map(function (o) { return "<li>" + inline(o) + "</li>"; }).join("") + "</ul>");
    cuerpo += seccion("explicacion", Tp.explicacion, md(l.txt));
    if (l.form && l.form.length) cuerpo += seccion("formulas", Tp.formulas, '<div class="recuadro formula">' + l.form.map(function (f) { return '<span class="formula-linea">' + inline(f[0]) + "</span><p>" + inline(f[1]) + "</p>"; }).join("") + "</div>");
    if (l.ej) cuerpo += seccion("ejemplo", Tp.ejemplo, "<p><b>Problema:</b> " + inline(l.ej.enun) + '</p><ol class="pasos">' + l.ej.pasos.map(function (p) { return "<li>" + inline(p) + "</li>"; }).join("") + '</ol><div class="recuadro bien"><p><b>Resultado:</b> ' + inline(l.ej.res) + "</p></div>");
    if (l.sim || l.calc || l.exp) cuerpo += seccion("practica", Tp.practica, '<div class="practica-cont"></div>');
    if (l.vida) cuerpo += seccion("vida", Tp.vida, md(l.vida));
    if (l.err && l.err.length) cuerpo += seccion("errores", Tp.errores, "<ul>" + l.err.map(function (e) { return "<li>" + inline(e) + "</li>"; }).join("") + "</ul>");
    if (l.ejer && l.ejer.length) cuerpo += seccion("ejercicios", Tp.ejercicios, l.ejer.map(function (e, k) { return "<p><b>" + (k + 1) + ".</b> " + inline(e[0]) + "</p><details><summary>" + T.btn.verSolucion + "</summary><p>" + inline(e[1]) + "</p></details>"; }).join(""));
    if (l.rubrica) cuerpo += seccion("rubrica", "Rúbrica de autoevaluación", '<div class="rubrica"></div>');
    cuerpo += seccion("miniquiz", Tp.miniquiz, '<div class="quiz-cont"></div>');
    cuerpo += seccion("resumen", Tp.resumen, "<ul>" + l.res.map(function (r) { return "<li>" + inline(r) + "</li>"; }).join("") + '</ul><div id="final-leccion"></div>');
    var hecha = P.completada(l.id);
    cuerpo += '<div class="botones"><button class="btn sec" id="marcar">' + (hecha ? T.btn.desmarcar : T.btn.marcar) + '</button><span class="estado" id="estado-l">' + (hecha ? '<span class="hecho">✓ ' + T.varios.completada + "</span>" : "") + "</span></div>";
    cuerpo += '<nav class="nav-lecciones" aria-label="Lecciones">' + (prev ? '<a class="btn sec" href="#/leccion/' + prev.id + '">← ' + prev.id.replace("-", ".") + " " + esc(prev.t) + "</a>" : "<span></span>") + (next ? '<a class="btn" href="#/leccion/' + next.id + '">' + next.id.replace("-", ".") + " " + esc(next.t) + " →</a>" : '<a class="btn" href="#/examen-final">Examen final →</a>') + "</nav>";
    if (!next || next.id.split("-")[0] !== l.id.split("-")[0]) cuerpo += '<div class="recuadro"><p>Terminaste las lecciones del módulo. <a href="#/quiz/' + m.id + '">Haz el quiz del módulo M' + m.n + "</a>.</p></div>";
    var lateral = '<aside class="indice-lateral" aria-label="Lecciones del módulo"><p class="estado"><a href="#/modulo/' + m.id + '">M' + m.n + ". " + esc(m.titulo) + "</a></p>" + m.lecciones.map(function (z) { return '<a href="#/leccion/' + z.id + '"' + (z.id === l.id ? ' class="actual" aria-current="page"' : "") + ">" + z.id.replace("-", ".") + " " + esc(z.t) + (P.completada(z.id) ? ' <span class="hecho-mini">✓</span>' : "") + "</a>"; }).join("") + '<hr><p class="estado">En esta lección</p>' + sec.map(function (s) { return '<a href="#/leccion/' + l.id + "?ir=" + s[0] + '">' + s[1] + "</a>"; }).join("") + "</aside>";
    app.innerHTML = '<div class="leccion-layout">' + lateral + '<article class="leccion-cuerpo">' + h + cuerpo + "</article></div>";
    var pc = app.querySelector(".practica-cont");
    if (pc) {
      (Array.isArray(l.sim) ? l.sim : l.sim ? [l.sim] : []).forEach(function (s) { montarSim(pc, s); });
      (Array.isArray(l.calc) ? l.calc : l.calc ? [l.calc] : []).forEach(function (c) { montarCalc(pc, c); });
      (Array.isArray(l.exp) ? l.exp : l.exp ? [l.exp] : []).forEach(function (eid) { var e = experimento(eid); if (e) pc.insertAdjacentHTML("beforeend", htmlExperimento(e)); });
    }
    if (l.rubrica) {
      var rb = app.querySelector(".rubrica"), dat = P.proyecto(l.id);
      rb.innerHTML = '<ul class="lista-check">' + l.rubrica.map(function (r, k) { return '<li><label style="font-weight:400"><input type="checkbox" data-k="' + k + '"' + (dat[k] ? " checked" : "") + "> " + inline(r) + "</label></li>"; }).join("") + '</ul><p class="estado rub-total"></p><label for="notas-proy">Mis notas del proyecto</label><textarea id="notas-proy">' + esc(dat.notas || "") + "</textarea>";
      var actualizar = function () { var d = {}; rb.querySelectorAll("input").forEach(function (i) { d[i.getAttribute("data-k")] = i.checked; }); d.notas = rb.querySelector("textarea").value; P.proyecto(l.id, d); var n = l.rubrica.filter(function (_, k) { return d[k]; }).length; rb.querySelector(".rub-total").textContent = "Criterios cumplidos: " + n + " de " + l.rubrica.length + (n === l.rubrica.length ? " · ¡Proyecto completo!" : ""); };
      rb.addEventListener("change", actualizar); rb.addEventListener("input", actualizar); actualizar();
    }
    var qc = app.querySelector(".quiz-cont");
    var crear = function () { return { id: "l-" + l.id, preguntas: l.quiz.map(function (q) { return Q.preparar(q); }), modo: "inmediato", alTerminar: function (pct) { P.registrarQuiz("l-" + l.id, pct); actualizarEstado(); }, regenerar: crear }; };
    Q.montar(qc, crear());
    function actualizarEstado() { var c = P.completada(l.id); var b = document.getElementById("marcar"), e = document.getElementById("estado-l"); if (b) b.textContent = c ? T.btn.desmarcar : T.btn.marcar; if (e) e.innerHTML = c ? '<span class="hecho">✓ ' + T.varios.completada + "</span>" : (P.quiz("l-" + l.id) ? "" : "Para completar la lección, llega al final y responde el mini-quiz."); }
    document.getElementById("marcar").onclick = function () { P.marcar(l.id, !P.completada(l.id)); actualizarEstado(); };
    var fin = document.getElementById("final-leccion");
    if ("IntersectionObserver" in window) { var io = new IntersectionObserver(function (en) { if (en.some(function (e) { return e.isIntersecting; })) { P.llegoAlFinal(l.id); actualizarEstado(); io.disconnect(); } }); io.observe(fin); vigilantes.push(io); }
    else P.llegoAlFinal(l.id);
    actualizarEstado();
  };

  R.quiz = function (id) {
    var m = modulo(id); if (!m) return R.noEncontrado();
    titulo("Quiz M" + m.n); var diag = m.n === 0;
    app.innerHTML = migas([["Inicio", "#/"], ["Curso", "#/curso"], ["M" + m.n, "#/modulo/" + m.id], ["Quiz"]]) + "<h1>" + (diag ? "Quiz diagnóstico" : "Quiz del módulo M" + m.n) + "</h1><p class=\"lead\">" + esc(m.titulo) + " · " + (m.quizN || 15) + " preguntas · " + m.quizMin + " min" + (diag ? " · sin calificación" : " · se aprueba con el " + (m.aprobar || 70) + " %") + (m.criticas ? " · las preguntas críticas deben acertarse todas" : "") + '.</p><p class="sim-nota">Las preguntas se eligen al azar y algunas tienen valores distintos en cada intento. Responde todas y pulsa «Calificar» para ver la retroalimentación.</p><div id="qz"></div>';
    var crear = function () { return { id: "m-" + m.id, preguntas: Q.quizModulo(m), modo: "final", aprobar: diag ? 0 : (m.aprobar || 70), criticas: !!m.criticas, enlaceLeccion: true, regenerar: crear,
      alTerminar: function (pct, apr) { P.registrarQuiz("m-" + m.id, (diag || apr) ? pct : Math.min(pct, (m.aprobar || 70) - 1)); var pie = document.querySelector("#qz .pie-quiz");
        if (diag && pie) pie.insertAdjacentHTML("beforeend", '<div class="recuadro"><p><b>Recomendación:</b> ' + (pct >= 80 ? "ya conoces muchos conceptos básicos: puedes seguir la ruta exprés o ir directo a los módulos que te interesen." : pct >= 40 ? "sigue la ruta completa; los primeros módulos te resultarán rápidos." : "empieza por el Nivel 1 con calma: el curso está pensado para empezar desde cero.") + ' <a href="#/curso">Ir al mapa del curso</a>.</p></div>');
        else if (apr && pie) { var a = P.avanceNivel(m.nivel); pie.insertAdjacentHTML("beforeend", '<div class="recuadro bien"><p>Ganaste la insignia <b>M' + m.n + "</b>." + (a.completo ? ' ¡Aprobaste todo el Nivel ' + m.nivel + '! <a href="#/certificado/nivel-' + m.nivel + '">Ver el certificado del nivel</a>.' : "") + "</p></div>"); }
      } }; };
    Q.montar(document.getElementById("qz"), crear());
  };

  R["examen-final"] = function () {
    titulo("Examen final");
    app.innerHTML = migas([["Inicio", "#/"], ["Examen final"]]) + '<h1>Examen final</h1><p class="lead">40 preguntas de todos los módulos · 60 minutos · se aprueba con el 75 %. Al aprobar obtienes el certificado del curso.</p><div id="qz"></div>';
    var crear = function () { return { id: "examen-final", preguntas: Q.examenFinal(), modo: "final", aprobar: 75, enlaceLeccion: true, regenerar: crear, alTerminar: function (pct, apr) { P.registrarQuiz("examen-final", pct); if (apr) document.querySelector("#qz .pie-quiz").insertAdjacentHTML("beforeend", '<div class="recuadro bien"><p>¡Felicidades! <a href="#/certificado">Obtén tu certificado</a>.</p></div>'); } }; };
    Q.montar(document.getElementById("qz"), crear());
  };

  R.certificado = function (cual) {
    titulo("Certificado"); var d = P.datos(), nivel = cual && /^nivel-\d$/.test(cual) ? +cual.slice(6) : null;
    var ok, que, f = P.quiz("examen-final");
    if (nivel !== null) { var a = P.avanceNivel(nivel); ok = a.completo; que = "el Nivel " + nivel + ": " + C.niveles[nivel].nombre; }
    else { ok = !!(f && f.mejor >= 75); que = "el curso completo «Cómo funciona la electricidad» (" + hm(C.modulos.reduce(function (s, m) { return s + minModulo(m); }, 0)) + ")"; }
    var h = migas([["Inicio", "#/"], ["Certificado"]]) + "<h1>Certificado</h1>";
    var niveles = C.niveles.filter(function (n) { return n.n > 0; }).map(function (n) { var a = P.avanceNivel(n.n); return '<li><a href="#/certificado/nivel-' + n.n + '">Nivel ' + n.n + ": " + esc(n.nombre) + "</a> " + (a.completo ? '<span class="hecho">✓ disponible</span>' : '<span class="estado">(' + a.aprobados + " de " + a.modulos + " quizzes aprobados)</span>") + "</li>"; }).join("");
    h += '<div class="no-imp"><p>Certificados disponibles:</p><ul><li><a href="#/certificado">Curso completo</a> ' + (f && f.mejor >= 75 ? '<span class="hecho">✓ disponible</span>' : '<span class="estado">(aprueba el examen final)</span>') + "</li>" + niveles + "</ul></div>";
    if (!ok) { h += '<div class="recuadro aviso"><p>Todavía no está disponible el certificado de ' + esc(que) + ". " + (nivel !== null ? "Aprueba los quizzes de todos los módulos del nivel." : '<a href="#/examen-final">Aprueba el examen final</a> con el 75 % o más.') + "</p></div>"; app.innerHTML = h; return; }
    var fecha = new Date().toLocaleDateString("es", { year: "numeric", month: "long", day: "numeric" });
    h += '<div class="no-imp"><label for="nombre-cert">Tu nombre (se guarda solo en este navegador)</label><input id="nombre-cert" type="text" value="' + esc(d.certNombre) + '" style="width:100%;max-width:28rem"></div>' +
      '<div class="certificado" id="cert"><p>Certificado de finalización</p><h1>Cómo funciona la electricidad</h1><p>Se otorga a</p><p style="font-size:1.6rem;font-family:var(--serif)" id="cert-nombre">' + esc(d.certNombre || "—") + "</p><p>por completar " + esc(que) + (nivel === null && f ? ", con un " + f.mejor + " % en el examen final" : "") + ".</p><p>" + fecha + '</p><p class="sim-nota">Certificado de autoaprendizaje sin valor oficial.</p></div><div class="botones no-imp"><button class="btn" onclick="window.print()">' + T.btn.imprimir + "</button></div>";
    app.innerHTML = h;
    document.getElementById("nombre-cert").addEventListener("input", function (e) { P.set("certNombre", e.target.value); document.getElementById("cert-nombre").textContent = e.target.value || "—"; });
  };

  R.laboratorio = function () {
    titulo("Laboratorio virtual");
    app.innerHTML = migas([["Inicio", "#/"], ["Laboratorio"]]) + '<h1>Laboratorio virtual</h1><p class="lead">' + Object.keys(C.sims).length + " simulaciones, " + Object.keys(C.calcs).length + " calculadoras y " + (window.EXPERIMENTOS || []).length + ' experimentos seguros.</p><div class="botones"><a class="btn sec" href="#/simulaciones">Todas las simulaciones</a><a class="btn sec" href="#/calculadoras">Todas las calculadoras</a><a class="btn sec" href="#/experimentos">Catálogo de experimentos</a></div>' +
      "<h2>Simulaciones</h2>" + tarjetasSims() + "<h2>Calculadoras</h2>" + tarjetasCalcs();
  };
  function tarjetasSims() { return '<div class="rejilla">' + Object.keys(C.sims).map(function (k) { var s = C.sims[k], m = modulo(s.m); return '<a class="tarjeta" href="#/simulacion/' + k + '"><span class="etq">' + (k === "CASA" ? "Extra" : k) + "</span><h3>" + esc(s.t) + "</h3><p>" + esc(s.d) + "</p>" + (m ? "<p>M" + m.n + "</p>" : "") + "</a>"; }).join("") + "</div>"; }
  function tarjetasCalcs() { return '<div class="rejilla">' + Object.keys(C.calcs).map(function (k) { var s = C.calcs[k]; return '<a class="tarjeta" href="#/calculadora/' + k + '"><span class="etq">' + k + "</span><h3>" + esc(s.t) + "</h3><p>" + esc(s.d) + "</p></a>"; }).join("") + "</div>"; }
  R.simulaciones = function () { titulo("Simulaciones"); app.innerHTML = migas([["Inicio", "#/"], ["Laboratorio", "#/laboratorio"], ["Simulaciones"]]) + "<h1>Simulaciones</h1>" + tarjetasSims(); };
  R.calculadoras = function () { titulo("Calculadoras"); app.innerHTML = migas([["Inicio", "#/"], ["Laboratorio", "#/laboratorio"], ["Calculadoras"]]) + "<h1>Calculadoras</h1><p class=\"lead\">Todas muestran el resultado, los pasos del cálculo y una interpretación.</p>" + tarjetasCalcs(); };
  R.simulacion = function (id) {
    var s = C.sims[id]; if (!s) return R.noEncontrado(); titulo(s.t); var m = modulo(s.m);
    app.innerHTML = migas([["Inicio", "#/"], ["Laboratorio", "#/laboratorio"], [s.t]]) + "<h1>" + (id === "CASA" ? "" : id + " · ") + esc(s.t) + "</h1>" + (m ? '<p>Se estudia en <a href="#/modulo/' + m.id + '">M' + m.n + ". " + esc(m.titulo) + "</a>.</p>" : "") + '<div id="sim-cont"></div>';
    montarSim(document.getElementById("sim-cont"), id, true);
    var usos = todas().filter(function (x) { var v = x.l.sim; return v === id || (Array.isArray(v) && v.indexOf(id) >= 0); });
    if (usos.length) app.insertAdjacentHTML("beforeend", "<h2>Lecciones que la usan</h2><ul>" + usos.map(function (x) { return '<li><a href="#/leccion/' + x.l.id + '">' + x.l.id.replace("-", ".") + " " + esc(x.l.t) + "</a></li>"; }).join("") + "</ul>");
  };
  R.calculadora = function (id) {
    var s = C.calcs[id]; if (!s) return R.noEncontrado(); titulo(s.t); var m = modulo(s.m);
    app.innerHTML = migas([["Inicio", "#/"], ["Calculadoras", "#/calculadoras"], [s.t]]) + "<h1>" + id + " · " + esc(s.t) + "</h1>" + (m ? '<p>Se estudia en <a href="#/modulo/' + m.id + '">M' + m.n + ". " + esc(m.titulo) + "</a>.</p>" : "") + '<div id="calc-cont"></div>';
    window.CALC.render(document.getElementById("calc-cont"), id);
  };

  R.experimentos = function (_, qs) {
    titulo("Experimentos seguros"); var lista = window.EXPERIMENTOS || [], seg = qs.seg || "", mod = qs.mod || "";
    var f = lista.filter(function (e) { return (!seg || e.seg === seg) && (!mod || e.mod === mod); });
    var h = migas([["Inicio", "#/"], ["Experimentos"]]) + '<h1>Experimentos seguros</h1><div class="recuadro aviso"><p><b>Regla de oro:</b> solo pilas o baterías de 9 V o menos. Los experimentos 🔴 nunca se hacen en casa: se presentan como simulación.</p></div>';
    h += '<div class="campos no-imp"><div class="campo"><label for="f-seg">Seguridad</label><select id="f-seg"><option value="">Todos</option><option value="verde"' + (seg === "verde" ? " selected" : "") + '>🟢 Sin riesgo</option><option value="amarillo"' + (seg === "amarillo" ? " selected" : "") + '>🟡 Precaución</option><option value="rojo"' + (seg === "rojo" ? " selected" : "") + '>🔴 Solo simulación</option></select></div><div class="campo"><label for="f-mod">Módulo</label><select id="f-mod"><option value="">Todos</option>' + C.modulos.map(function (m) { return '<option value="' + m.id + '"' + (mod === m.id ? " selected" : "") + ">M" + m.n + ". " + esc(m.titulo) + "</option>"; }).join("") + "</select></div></div>";
    h += '<p class="estado">' + f.length + " experimentos</p>" + f.map(function (e) { return htmlExperimento(e, true); }).join("");
    app.innerHTML = h;
    var ir = function () { location.hash = "#/experimentos?seg=" + document.getElementById("f-seg").value + "&mod=" + document.getElementById("f-mod").value; };
    document.getElementById("f-seg").onchange = ir; document.getElementById("f-mod").onchange = ir;
  };
  R.experimento = function (id) { var e = experimento(id); if (!e) return R.noEncontrado(); titulo(e.t); var m = modulo(e.mod); app.innerHTML = migas([["Inicio", "#/"], ["Experimentos", "#/experimentos"], [e.t]]) + (m ? '<p>Módulo: <a href="#/modulo/' + m.id + '">M' + m.n + ". " + esc(m.titulo) + "</a></p>" : "") + htmlExperimento(e, false, "h1"); };

  R.glosario = function (term) {
    titulo("Glosario"); var g = (window.GLOSARIO || []).slice().sort(function (a, b) { return a.t.localeCompare(b.t, "es"); });
    var letras = {}; g.forEach(function (x) { var L = B.norm(x.t)[0].toUpperCase(); (letras[L] = letras[L] || []).push(x); });
    var h = migas([["Inicio", "#/"], ["Glosario"]]) + "<h1>Glosario</h1><p class=\"lead\">" + g.length + ' términos de electricidad y electrónica.</p><label for="filtro-glos">Filtrar términos</label><input id="filtro-glos" type="search" style="width:100%;max-width:28rem" placeholder="Escribe para filtrar…"><p class="chip-grupo">' + Object.keys(letras).map(function (L) { return '<a class="chip" href="#/glosario?l=' + L + '">' + L + "</a>"; }).join("") + "</p>";
    h += Object.keys(letras).map(function (L) { return '<h2 id="letra-' + L + '">' + L + '</h2><dl class="glos-lista">' + letras[L].map(function (x) { return '<div class="glos-item" id="g-' + slug(x.t) + '"><dt><b>' + esc(x.t) + "</b>" + (x.sin && x.sin.length ? ' <span class="estado">(también: ' + esc(x.sin.join(", ")) + ")</span>" : "") + "</dt><dd>" + inline(x.d) + "</dd></div>"; }).join("") + "</dl>"; }).join("");
    app.innerHTML = h;
    document.getElementById("filtro-glos").addEventListener("input", function (e) { var q = B.norm(e.target.value); app.querySelectorAll(".glos-item").forEach(function (it) { it.hidden = q && B.norm(it.textContent).indexOf(q) < 0; }); });
    var qs = parseQS(location.hash); if (qs.l) irA("letra-" + qs.l);
    if (term) { var el = document.getElementById("g-" + term); if (el) { el.style.background = "var(--volt-soft)"; irA("g-" + term); } }
  };
  R.formulas = function () {
    titulo("Hoja de fórmulas"); var h = migas([["Inicio", "#/"], ["Fórmulas"]]) + '<h1>Hoja de fórmulas</h1><p class="lead">Todas las fórmulas del curso, por módulo. Puedes imprimir esta página.</p><div class="botones no-imp"><button class="btn sec" onclick="window.print()">' + T.btn.imprimir + "</button></div>";
    C.modulos.forEach(function (m) { var fs = []; m.lecciones.forEach(function (l) { (l.form || []).forEach(function (f) { fs.push([f, l]); }); }); if (!fs.length) return; h += "<h2>M" + m.n + ". " + esc(m.titulo) + '</h2><div class="tabla"><table><thead><tr><th>Fórmula</th><th>Significado</th><th>Lección</th></tr></thead><tbody>' + fs.map(function (x) { return '<tr><td class="mono"><b>' + inline(x[0][0]) + "</b></td><td>" + inline(x[0][1]) + '</td><td><a href="#/leccion/' + x[1].id + '">' + x[1].id.replace("-", ".") + "</a></td></tr>"; }).join("") + "</tbody></table></div>"; });
    app.innerHTML = h;
  };
  R.personajes = function (id) {
    titulo("Personajes"); var ps = window.PERSONAJES || [];
    app.innerHTML = migas([["Inicio", "#/"], ["Personajes"]]) + "<h1>Personajes de la electricidad</h1><p class=\"lead\">" + ps.length + ' personas que descubrieron cómo funciona la electricidad. <a href="#/linea-de-tiempo">Ver la línea de tiempo</a>.</p>' + ps.map(function (p) { return '<article class="panel" id="p-' + p.id + '"><h2 style="margin-top:0">' + esc(p.n) + ' <small class="estado">(' + esc(p.a) + ")</small></h2><p><b>" + esc(p.aporte) + "</b></p>" + md(p.txt) + (p.lec ? '<p>Se estudia en: ' + p.lec.map(function (l) { var x = leccion(l); return x ? '<a href="#/leccion/' + l + '">' + l.replace("-", ".") + " " + esc(x.l.t) + "</a>" : ""; }).join(" · ") + "</p>" : "") + "</article>"; }).join("");
    if (id) irA("p-" + id);
  };
  R["linea-de-tiempo"] = function () {
    titulo("Línea de tiempo"); var L = window.LINEA || [];
    app.innerHTML = migas([["Inicio", "#/"], ["Línea de tiempo"]]) + '<h1>Línea de tiempo de la electricidad</h1><ol class="lista-check linea">' + L.map(function (x) { return '<li><b class="mono">' + esc(x.a) + "</b> · <b>" + esc(x.t) + "</b><br>" + inline(x.d) + "</li>"; }).join("") + "</ol>";
  };

  R.progreso = function () {
    titulo("Mi progreso"); var tot = P.avanceTotal(), ins = P.insignias(), sig = siguientePendiente();
    var h = migas([["Inicio", "#/"], ["Mi progreso"]]) + "<h1>Mi progreso</h1>" + (P.disponible() ? '<p class="sim-nota">Tu progreso se guarda automáticamente en este navegador.</p>' : '<div class="recuadro aviso"><p>' + T.varios.almacen + "</p></div>");
    h += '<div class="panel"><p><b>' + tot.hechas + " de " + tot.tot + " lecciones completadas (" + tot.pct + " %)</b> · " + hm(tot.min) + " de estudio estimado.</p>" + barra(tot.pct) + (sig ? '<div class="botones"><a class="btn" href="#/leccion/' + sig + '">' + T.btn.continuar + "</a></div>" : "") + "</div>";
    h += "<h2>Por nivel y módulo</h2>" + C.niveles.map(function (n) { var a = P.avanceNivel(n.n); return "<h3>Nivel " + n.n + ": " + esc(n.nombre) + " · " + a.pct + " %" + (a.completo ? ' <span class="hecho">✓</span>' : "") + "</h3>" + C.modulos.filter(function (m) { return m.nivel === n.n; }).map(function (m) { var am = P.avanceModulo(m); return '<p style="margin:.3rem 0"><a href="#/modulo/' + m.id + '">M' + m.n + ". " + esc(m.titulo) + '</a> <span class="estado">' + am.hechas + "/" + am.tot + (am.quiz ? " · quiz: " + am.quiz.mejor + " %" : "") + (am.aprobado ? " ✓" : "") + "</span></p>" + barra(am.pct); }).join(""); }).join("");
    h += "<h2>Insignias</h2>" + (ins.length ? "<ul>" + ins.map(function (i) { return "<li>🏅 " + esc(i.t) + "</li>"; }).join("") + "</ul>" : "<p>Aprueba el quiz de un módulo para ganar tu primera insignia.</p>");
    var nexp = Object.keys(P.datos().experimentos).length; h += "<p>Experimentos realizados: <b>" + nexp + "</b>.</p>";
    h += '<h2>Copia de seguridad</h2><p>Exporta tu progreso a un archivo para pasarlo a otro dispositivo o navegador.</p><div class="botones"><button class="btn sec" id="exp">' + T.btn.exportar + '</button><label class="btn sec" for="imp" style="margin:0">' + T.btn.importar + '</label><input id="imp" type="file" accept=".json,application/json" hidden><button class="btn peligro" id="reini">' + T.btn.reiniciar + '</button></div><p id="msg-prog" class="estado" aria-live="polite"></p>';
    app.innerHTML = h;
    document.getElementById("exp").onclick = function () { var b = new Blob([P.exportar()], { type: "application/json" }), a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = "progreso-electricidad.json"; document.body.appendChild(a); a.click(); a.remove(); document.getElementById("msg-prog").textContent = "Archivo exportado."; };
    document.getElementById("imp").onchange = function (e) { var fl = e.target.files[0]; if (!fl) return; var r = new FileReader(); r.onload = function () { try { P.importar(r.result); document.getElementById("msg-prog").textContent = "Progreso importado correctamente."; R.progreso(); } catch (er) { document.getElementById("msg-prog").textContent = "No se pudo importar: " + er.message; } }; r.readAsText(fl); };
    document.getElementById("reini").onclick = function () { if (confirm("¿Seguro que quieres borrar todo tu progreso? No se puede deshacer.")) { P.reiniciar(); R.progreso(); } };
  };

  R.ajustes = function () {
    titulo("Ajustes"); var d = P.datos();
    app.innerHTML = migas([["Inicio", "#/"], ["Ajustes"]]) + '<h1>Ajustes</h1><div class="panel campos"><div class="campo"><label for="aj-red">Red eléctrica de tu país</label><select id="aj-red"><option value="127"' + (d.prefs.red !== "230" ? " selected" : "") + '>120/127 V – 60 Hz (México y gran parte de América)</option><option value="230"' + (d.prefs.red === "230" ? " selected" : "") + '>220/230 V – 50 Hz (España, gran parte de Sudamérica)</option></select></div><div class="campo"><label for="aj-mon">Símbolo de moneda</label><input id="aj-mon" type="text" value="' + esc(d.prefs.moneda) + '"></div><div class="campo"><label for="aj-tar">Tarifa por kWh (para las calculadoras)</label><input id="aj-tar" type="text" inputmode="decimal" value="' + N.fmt(+d.prefs.tarifa) + '"></div><div class="campo"><label for="aj-tema">Tema</label><select id="aj-tema"><option value="">Automático (según el sistema)</option><option value="light">Claro</option><option value="dark">Oscuro</option></select></div></div><p class="sim-nota" id="aj-msg" aria-live="polite">Los cambios se guardan al momento. Los ejemplos marcados de las lecciones usan la red que elijas.</p>';
    var tm = document.getElementById("aj-tema"); try { tm.value = localStorage.getItem("electricidad-tema") || ""; } catch (e) { }
    document.getElementById("aj-red").onchange = function (e) { P.pref("red", e.target.value); msg(); };
    document.getElementById("aj-mon").oninput = function (e) { P.pref("moneda", e.target.value.slice(0, 5) || "$"); msg(); };
    document.getElementById("aj-tar").oninput = function (e) { var v = N.parse(e.target.value); if (v >= 0) { P.pref("tarifa", v); msg(); } };
    tm.onchange = function (e) { ponerTema(e.target.value || null); msg(); };
    function msg() { document.getElementById("aj-msg").textContent = "Guardado."; }
  };
  R.acerca = function () {
    titulo("Acerca del curso"); var lecs = todas().length;
    app.innerHTML = migas([["Inicio", "#/"], ["Acerca"]]) + "<h1>Acerca del curso</h1>" + md("Curso de autoaprendizaje en español sobre cómo funciona la electricidad: " + C.modulos.length + (C.modulos.length === 1 ? " módulo, " : " módulos, ") + lecs + " lecciones, " + nSims() + " simulaciones propias y " + Object.keys(C.calcs).length + " calculadoras.\n\nEl sitio funciona sin internet: abre `index.html` en cualquier navegador. Tu progreso se guarda solo en tu navegador; no se envía a ningún servidor.\n\n### Convenciones\n- Coma decimal (1,5 V) y unidades del Sistema Internacional.\n- **CD** (corriente directa, también llamada CC o corriente continua) y **CA** (corriente alterna).\n- Ejemplos con las dos redes más comunes: 120/127 V a 60 Hz y 220/230 V a 50 Hz. Elige la tuya en [Ajustes](#/ajustes).\n- Normas citadas como referencia: NOM-001-SEDE (México), REBT (España) y NEC (EE. UU.). Consulta siempre la de tu país.\n\n### Aviso de seguridad\n!> Este curso es educativo. No te capacita para trabajar en instalaciones eléctricas. Cualquier trabajo en la red de tu casa debe hacerlo un electricista calificado. En una emergencia llama al 911 o al 112.\n\n### Accesibilidad\nEl sitio se puede usar con teclado, respeta la preferencia de movimiento reducido del sistema y tiene modo claro y oscuro. Pulsa la tecla «/» para ir al buscador.");
  };

  R.buscar = function (_, qs) {
    var q = qs.q || "", tipo = qs.tipo || ""; titulo("Buscar");
    var h = migas([["Inicio", "#/"], ["Buscar"]]) + '<h1>Buscar</h1><form id="bform" role="search"><label for="bq">Buscar lecciones y temas</label><div class="entrada-num"><input id="bq" type="search" value="' + esc(q) + '" style="flex:1;min-width:12rem"><button class="btn" type="submit">Buscar</button></div></form>';
    var tipos = ["", "leccion", "modulo", "calculadora", "simulacion", "experimento", "glosario", "personaje"];
    h += '<div class="chip-grupo" role="group" aria-label="Filtrar por tipo">' + tipos.map(function (t) { return '<a class="chip' + (t === tipo ? " on" : "") + '" href="#/buscar?q=' + encodeURIComponent(q) + "&tipo=" + t + '">' + (t ? T.tipos[t] : "Todo") + "</a>"; }).join("") + "</div>";
    if (q) {
      var r = B.buscar(q, tipo ? { tipo: tipo } : null);
      if (r.length) h += '<p class="estado">' + r.length + " " + T.varios.resultados + '</p><div class="resultados">' + r.slice(0, 60).map(function (it) { return '<a class="tarjeta" href="' + it.ruta + '" style="margin:.5rem 0"><span class="etq">' + T.tipos[it.tipo] + "</span>" + (it.sub ? '<span class="estado">' + esc(it.sub) + "</span>" : "") + "<h3>" + B.resaltar(it.titulo, q) + "</h3>" + (it.desc ? "<p>" + B.resaltar(String(it.desc).slice(0, 180), q) + "</p>" : "") + "</a>"; }).join("") + "</div>";
      else { var s = B.sugerir(q); h += "<p>" + T.varios.sinResultados + " «" + esc(q) + "».</p>" + (s.length ? "<p>" + T.varios.quizas + " " + s.map(function (w) { return '<a href="#/buscar?q=' + encodeURIComponent(w) + '">' + esc(w) + "</a>"; }).join(", ") + "</p>" : ""); }
    } else h += "<p>Prueba con: " + ["ley de Ohm", "diferencial", "kWh", "enchufe", "transformador", "multímetro", "LED"].map(function (w) { return '<a href="#/buscar?q=' + encodeURIComponent(w) + '">' + w + "</a>"; }).join(", ") + ".</p>";
    app.innerHTML = h;
    document.getElementById("bform").onsubmit = function (e) { e.preventDefault(); location.hash = "#/buscar?q=" + encodeURIComponent(document.getElementById("bq").value) + "&tipo=" + tipo; };
    if (!q) document.getElementById("bq").focus();
  };
  R.noEncontrado = function () { titulo("Página no encontrada"); app.innerHTML = '<h1>Página no encontrada</h1><p>Esa dirección no existe. <a href="#/">Volver al inicio</a> o <a href="#/buscar">buscar</a>.</p>'; };

  // ---------- Rutas ----------
  function parseQS(h) { var i = h.indexOf("?"), o = {}; if (i < 0) return o; h.slice(i + 1).split("&").forEach(function (p) { var kv = p.split("="); if (kv[0]) o[decodeURIComponent(kv[0])] = decodeURIComponent((kv[1] || "").replace(/\+/g, " ")); }); return o; }
  function irA(id) { setTimeout(function () { var el = document.getElementById(id); if (el) el.scrollIntoView({ block: "start" }); }, 30); }
  var vigilantes = [];
  function router() {
    vigilantes.forEach(function (v) { v.disconnect(); }); vigilantes = [];
    var h = location.hash.replace(/^#\/?/, ""), qs = parseQS(h), sinQ = h.split("?")[0], ancla = null;
    if (sinQ.indexOf("#") >= 0) { ancla = sinQ.split("#")[1]; sinQ = sinQ.split("#")[0]; }
    var partes = sinQ.split("/"), r = partes[0] || "", arg = partes.slice(1).map(decodeURIComponent).join("/");
    cerrarMenu(); cerrarSug();
    (R[r] || R.noEncontrado)(arg, qs);
    var bb = document.querySelectorAll(".bottombar a, .mainnav a"); bb.forEach(function (a) { var d = a.getAttribute("data-r"); a.classList.toggle("on", d === r); if (d === r) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
    if (qs.ir) irA(qs.ir); else if (ancla) irA(ancla); else window.scrollTo(0, 0);
    app.focus({ preventScroll: true });
  }

  // ---------- Tema ----------
  var btnTema = document.getElementById("tema");
  function temaActual() { return document.documentElement.getAttribute("data-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); }
  function ponerTema(t) { if (t) document.documentElement.setAttribute("data-theme", t); else document.documentElement.removeAttribute("data-theme"); try { if (t) localStorage.setItem("electricidad-tema", t); else localStorage.removeItem("electricidad-tema"); } catch (e) { } actualizarBtnTema(); window.dispatchEvent(new Event("cambio-tema")); }
  function actualizarBtnTema() { var d = temaActual() === "dark"; btnTema.textContent = d ? "☀" : "☾"; btnTema.setAttribute("aria-label", d ? "Cambiar a modo claro" : "Cambiar a modo oscuro"); }
  btnTema.onclick = function () { ponerTema(temaActual() === "dark" ? "light" : "dark"); };
  try { matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () { actualizarBtnTema(); window.dispatchEvent(new Event("cambio-tema")); }); } catch (e) { }
  actualizarBtnTema();
  window.ponerTema = ponerTema;

  // ---------- Menú ----------
  var menuBtn = document.getElementById("menubtn"), menu = document.getElementById("menu");
  document.getElementById("mainnav").innerHTML = T.nav.map(function (n) { return '<a href="#/' + n[0] + '" data-r="' + n[0] + '">' + n[1] + "</a>"; }).join("");
  menu.innerHTML = Object.keys(T.menu).map(function (g) { return '<p class="grupo">' + g + "</p>" + T.menu[g].map(function (n) { return '<a href="#/' + n[0] + '">' + n[1] + "</a>"; }).join(""); }).join("") + '<p class="grupo">Módulos</p>' + C.modulos.map(function (m) { return '<a href="#/modulo/' + m.id + '">M' + m.n + ". " + esc(m.titulo) + "</a>"; }).join("");
  function cerrarMenu() { menu.hidden = true; menuBtn.setAttribute("aria-expanded", "false"); menuBtn.textContent = "☰"; }
  menuBtn.onclick = function () { var abrir = menu.hidden; menu.hidden = !abrir; menuBtn.setAttribute("aria-expanded", String(abrir)); menuBtn.textContent = abrir ? "✕" : "☰"; menuBtn.setAttribute("aria-label", abrir ? "Cerrar el menú" : "Abrir el menú"); };

  // ---------- Buscador en vivo ----------
  var qIn = document.getElementById("q"), sug = document.getElementById("sugerencias"), sel = -1;
  function cerrarSug() { sug.hidden = true; sel = -1; qIn.setAttribute("aria-expanded", "false"); }
  function pintarSug() {
    var q = qIn.value.trim(); if (q.length < 2) { cerrarSug(); return; }
    var r = B.buscar(q).slice(0, 8);
    sug.innerHTML = r.length ? r.map(function (it, k) { return '<a role="option" id="sug-' + k + '" href="' + it.ruta + '"><span class="etq">' + T.tipos[it.tipo] + "</span>" + B.resaltar(it.titulo, q) + (it.sub ? "<small>" + esc(it.sub) + "</small>" : "") + "</a>"; }).join("") + '<a href="#/buscar?q=' + encodeURIComponent(q) + '"><b>Ver todos los resultados</b></a>' : '<a href="#/buscar?q=' + encodeURIComponent(q) + '">' + T.varios.sinResultados + " «" + esc(q) + "»</a>";
    sug.hidden = false; sel = -1; qIn.setAttribute("aria-expanded", "true");
  }
  qIn.addEventListener("input", pintarSug);
  qIn.addEventListener("keydown", function (e) {
    var it = sug.querySelectorAll("a"); if (sug.hidden || !it.length) return;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); sel = (sel + (e.key === "ArrowDown" ? 1 : -1) + it.length) % it.length; it.forEach(function (a, k) { a.classList.toggle("sel", k === sel); }); qIn.setAttribute("aria-activedescendant", it[sel].id || ""); }
    else if (e.key === "Escape") cerrarSug();
  });
  document.getElementById("searchform").addEventListener("submit", function (e) { e.preventDefault(); var it = sug.querySelectorAll("a"); if (sel >= 0 && it[sel]) location.hash = it[sel].getAttribute("href"); else location.hash = "#/buscar?q=" + encodeURIComponent(qIn.value); qIn.blur(); cerrarSug(); });
  document.addEventListener("click", function (e) { if (!e.target.closest(".search")) cerrarSug(); });
  document.addEventListener("keydown", function (e) { if (e.key === "/" && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) { e.preventDefault(); qIn.focus(); } });
  document.addEventListener("change", function (e) { if (e.target.classList && e.target.classList.contains("exp-hecho")) P.experimento(e.target.getAttribute("data-e"), e.target.checked); });

  // ---------- Inicio ----------
  if (!P.disponible()) document.getElementById("aviso-almacen").hidden = false;
  B.construir();
  window.addEventListener("hashchange", router);
  router();
  window.APP = { router: router, md: md, leccion: leccion, hm: hm, minModulo: minModulo };
})();
