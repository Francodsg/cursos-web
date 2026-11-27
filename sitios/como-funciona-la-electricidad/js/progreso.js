// Progreso guardado en localStorage con versión, modo en memoria si el navegador lo bloquea,
// exportar/importar y cálculo de avance por módulo y nivel.
(function () {
  "use strict";
  var CLAVE = "electricidad-progreso-v1", VERSION = 1;
  var memoria = null, disponible = true;

  function vacio() {
    return { version: VERSION, lecciones: {}, quizzes: {}, experimentos: {}, ultima: null,
      prefs: { red: "127", moneda: "$", tarifa: 1.5, ruta: "completa" }, compromiso: false,
      certNombre: "", proyectos: {}, creado: new Date().toISOString() };
  }
  function migrar(d) {
    if (!d || typeof d !== "object") return vacio();
    var base = vacio();
    // Versiones futuras: aquí se transforman los datos antiguos.
    Object.keys(base).forEach(function (k) { if (d[k] === undefined) d[k] = base[k]; });
    Object.keys(base.prefs).forEach(function (k) { if (d.prefs[k] === undefined) d.prefs[k] = base.prefs[k]; });
    d.version = VERSION;
    return d;
  }
  function leer() {
    if (memoria) return memoria;
    try {
      var s = localStorage.getItem(CLAVE);
      memoria = migrar(s ? JSON.parse(s) : null);
    } catch (e) { disponible = false; memoria = vacio(); }
    return memoria;
  }
  function guardar() {
    try { localStorage.setItem(CLAVE, JSON.stringify(memoria)); disponible = true; }
    catch (e) { disponible = false; }
    if (window.alCambiarProgreso) window.alCambiarProgreso();
  }
  function ahora() { return new Date().toISOString(); }

  var P = {
    CLAVE: CLAVE,
    datos: leer,
    disponible: function () { leer(); try { localStorage.setItem("electricidad-prueba", "1"); localStorage.removeItem("electricidad-prueba"); return true; } catch (e) { return false; } },
    pref: function (k, v) { var d = leer(); if (v === undefined) return d.prefs[k]; d.prefs[k] = v; guardar(); },
    set: function (k, v) { var d = leer(); d[k] = v; guardar(); },
    verLeccion: function (id) {
      var d = leer(); var l = d.lecciones[id] || (d.lecciones[id] = {});
      if (!l.vista) l.vista = ahora(); d.ultima = id; guardar();
    },
    llegoAlFinal: function (id) { var d = leer(); var l = d.lecciones[id] || (d.lecciones[id] = {}); if (!l.final) { l.final = ahora(); P.revisarCompleta(id); guardar(); } },
    revisarCompleta: function (id) {
      var d = leer(); var l = d.lecciones[id]; var q = d.quizzes["l-" + id];
      if (l && l.final && q && !l.completada) l.completada = ahora();
    },
    marcar: function (id, valor) {
      var d = leer(); var l = d.lecciones[id] || (d.lecciones[id] = {});
      if (valor) l.completada = ahora(); else delete l.completada; guardar();
    },
    completada: function (id) { var l = leer().lecciones[id]; return !!(l && l.completada); },
    registrarQuiz: function (id, pct, respuestas) {
      var d = leer(); var q = d.quizzes[id] || (d.quizzes[id] = { mejor: 0, intentos: 0 });
      q.intentos++; q.ultima = pct; q.fecha = ahora(); if (pct > q.mejor) q.mejor = pct;
      if (respuestas) q.respuestas = respuestas;
      if (id.indexOf("l-") === 0) P.revisarCompleta(id.slice(2));
      guardar(); return q;
    },
    quiz: function (id) { return leer().quizzes[id] || null; },
    experimento: function (id, valor) { var d = leer(); if (valor === undefined) return !!d.experimentos[id]; if (valor) d.experimentos[id] = ahora(); else delete d.experimentos[id]; guardar(); },
    proyecto: function (id, datos) { var d = leer(); if (datos === undefined) return d.proyectos[id] || {}; d.proyectos[id] = datos; guardar(); },
    // Avance
    avanceModulo: function (m) {
      var tot = m.lecciones.length, hechas = 0, min = 0, minTot = 0;
      m.lecciones.forEach(function (l) { minTot += l.min; if (P.completada(l.id)) { hechas++; min += l.min; } });
      var q = P.quiz("m-" + m.id);
      return { tot: tot, hechas: hechas, pct: tot ? Math.round(hechas * 100 / tot) : 0, min: min, minTot: minTot, quiz: q, aprobado: !!(q && q.mejor >= (m.aprobar || 70)) };
    },
    avanceNivel: function (n) {
      var mods = window.CURSO.modulos.filter(function (m) { return m.nivel === n; });
      var tot = 0, hechas = 0, aprob = 0;
      mods.forEach(function (m) { var a = P.avanceModulo(m); tot += a.tot; hechas += a.hechas; if (a.aprobado) aprob++; });
      return { tot: tot, hechas: hechas, pct: tot ? Math.round(hechas * 100 / tot) : 0, modulos: mods.length, aprobados: aprob, completo: mods.length > 0 && aprob === mods.length };
    },
    avanceTotal: function () {
      var tot = 0, hechas = 0, min = 0;
      window.CURSO.modulos.forEach(function (m) { var a = P.avanceModulo(m); tot += a.tot; hechas += a.hechas; min += a.min; });
      return { tot: tot, hechas: hechas, pct: tot ? Math.round(hechas * 100 / tot) : 0, min: min };
    },
    insignias: function () {
      var r = [];
      window.CURSO.modulos.forEach(function (m) { if (P.avanceModulo(m).aprobado) r.push({ id: m.id, t: "Insignia M" + m.n + ": " + m.titulo }); });
      var f = P.quiz("examen-final"); if (f && f.mejor >= 75) r.push({ id: "final", t: "Examen final aprobado" });
      return r;
    },
    exportar: function () { return JSON.stringify(leer(), null, 2); },
    importar: function (texto) {
      var d = JSON.parse(texto);
      if (!d || typeof d !== "object" || !d.lecciones) throw new Error("El archivo no es un progreso válido de este curso.");
      memoria = migrar(d); guardar(); return true;
    },
    reiniciar: function () { var prefs = leer().prefs; memoria = vacio(); memoria.prefs = prefs; guardar(); },
    _reset: function () { memoria = null; }
  };
  window.PROGRESO = P;
})();
