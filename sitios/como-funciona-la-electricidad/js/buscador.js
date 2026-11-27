// Buscador: índice en memoria, normalización sin acentos, sinónimos, puntuación por campo,
// coincidencia por prefijo y tolerancia a un error en palabras de 5 letras o más.
(function () {
  "use strict";
  var VACIAS = "el la los las un una unos unas de del al y o u a en por para con sin que se su sus es son lo como mas más muy ya le les me te mi tu".split(" ");
  var SINONIMOS = [
    ["cd", "cc", "directa", "continua"],
    ["ca", "alterna"],
    ["enchufe", "contacto", "tomacorriente", "toma", "clavija"],
    ["tablero", "centro de carga", "cuadro", "caja de breakers"],
    ["foco", "bombilla", "ampolleta", "bombillo", "lampara", "lámpara"],
    ["pastilla", "breaker", "termomagnetico", "termomagnético", "interruptor automatico"],
    ["voltaje", "tension", "tensión", "diferencia de potencial"],
    ["diferencial", "id", "rcd", "gfci", "disyuntor"],
    ["tierra", "aterrizaje", "puesta a tierra"],
    ["pila", "bateria", "batería", "acumulador"],
    ["condensador", "capacitor"],
    ["corriente", "amperaje", "intensidad"],
    ["electrocutado", "electrocucion", "electrocución", "choque", "descarga"],
    ["luz", "electricidad", "energia electrica"],
    ["cable", "conductor", "alambre"],
    ["kwh", "kilowatt hora", "kilovatio hora"],
    ["watt", "vatio", "watts", "vatios"]
  ];
  function norm(s) { return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9ñ\s]/g, " "); }
  function tokens(s) { return norm(s).split(/\s+/).filter(function (w) { return w && VACIAS.indexOf(w) < 0; }); }
  var mapaSin = {};
  SINONIMOS.forEach(function (g) { var ng = g.map(norm); ng.forEach(function (w) { mapaSin[w] = ng; }); });

  function lev1(a, b) { // ¿distancia de edición ≤ 1?
    if (a === b) return true;
    var la = a.length, lb = b.length; if (Math.abs(la - lb) > 1) return false;
    var i = 0, j = 0, dif = 0;
    while (i < la && j < lb) {
      if (a[i] === b[j]) { i++; j++; continue; }
      if (++dif > 1) return false;
      if (la > lb) i++; else if (lb > la) j++; else { i++; j++; }
    }
    return dif + (la - i) + (lb - j) <= 1;
  }

  var indice = [];
  function agregar(it) {
    it._t = norm(it.titulo); it._k = norm(it.clave || ""); it._h = norm(it.encab || ""); it._x = norm(it.texto || "");
    it._pal = {}; (it._t + " " + it._k + " " + it._h + " " + it._x).split(/\s+/).forEach(function (w) { if (w.length > 2) it._pal[w] = 1; });
    it._palArr = Object.keys(it._pal);
    indice.push(it);
  }
  function quitarMarcas(s) { return String(s || "").replace(/\[\[([^\]|]+)(\|[^\]]+)?\]\]/g, "$1").replace(/[*#>{}]/g, " "); }

  function construir() {
    indice = [];
    var C = window.CURSO;
    C.modulos.forEach(function (m) {
      agregar({ tipo: "modulo", titulo: "M" + m.n + ". " + m.titulo, clave: (m.clave || ""), texto: m.objetivo, ruta: "#/modulo/" + m.id, sub: "Nivel " + m.nivel });
      m.lecciones.forEach(function (l) {
        var enc = (l.txt || "").split("\n").filter(function (x) { return /^##/.test(x); }).join(" ");
        var cuerpo = [l.d, l.preg, quitarMarcas(l.txt), (l.vida || ""), (l.err || []).join(" "), (l.res || []).join(" "), (l.form || []).map(function (f) { return f.join(" "); }).join(" ")].join(" ");
        agregar({ tipo: "leccion", titulo: l.id.replace("-", ".") + " " + l.t, clave: (l.clave || ""), encab: enc, texto: cuerpo, ruta: "#/leccion/" + l.id, sub: "M" + m.n + ". " + m.titulo, desc: l.d });
      });
    });
    Object.keys(C.sims).forEach(function (k) { var s = C.sims[k]; agregar({ tipo: "simulacion", titulo: s.t, clave: "simulacion simulador " + k, texto: s.d, ruta: "#/simulacion/" + k, desc: s.d }); });
    Object.keys(C.calcs).forEach(function (k) { var s = C.calcs[k]; agregar({ tipo: "calculadora", titulo: s.t, clave: "calculadora calcular " + k, texto: s.d, ruta: "#/calculadora/" + k, desc: s.d }); });
    (window.EXPERIMENTOS || []).forEach(function (e) { agregar({ tipo: "experimento", titulo: e.t, clave: "experimento " + (e.mat || []).join(" "), texto: e.obj + " " + (e.expl || ""), ruta: "#/experimento/" + e.id, desc: e.obj }); });
    (window.GLOSARIO || []).forEach(function (g) { agregar({ tipo: "glosario", titulo: g.t, clave: (g.sin || []).join(" "), texto: g.d, ruta: "#/glosario/" + encodeURIComponent(norm(g.t).replace(/\s+/g, "-")), desc: g.d }); });
    (window.PERSONAJES || []).forEach(function (p) { agregar({ tipo: "personaje", titulo: p.n, clave: p.aporte, texto: p.txt, ruta: "#/personajes/" + p.id, desc: p.aporte }); });
    [["Mapa del curso", "#/curso", "niveles módulos rutas"], ["Mi progreso", "#/progreso", "avance insignias exportar"], ["Hoja de fórmulas", "#/formulas", "formulas ecuaciones"],
     ["Examen final", "#/examen-final", "examen evaluación"], ["Certificado", "#/certificado", "certificado diploma"], ["Línea de tiempo", "#/linea-de-tiempo", "historia fechas"],
     ["Ajustes", "#/ajustes", "configuración red 127 230 moneda tarifa"], ["Laboratorio virtual", "#/laboratorio", "laboratorio simulaciones calculadoras"]].forEach(function (s) {
      agregar({ tipo: "seccion", titulo: s[0], clave: s[2], texto: "", ruta: s[1] });
    });
  }

  function expandir(w) { return mapaSin[w] || [w]; }
  function puntuar(it, qtoks, frase) {
    var total = 0;
    for (var i = 0; i < qtoks.length; i++) {
      var variantes = expandir(qtoks[i]), mejor = 0;
      for (var v = 0; v < variantes.length; v++) {
        var w = variantes[v], p = 0;
        if (w.indexOf(" ") >= 0) { // sinónimo de varias palabras
          if (it._t.indexOf(w) >= 0) p = 5; else if (it._k.indexOf(w) >= 0) p = 3; else if (it._x.indexOf(w) >= 0) p = 1;
        } else {
          var re = new RegExp("(^|\\s)" + w);
          if (re.test(it._t)) p = 5; else if (re.test(it._k)) p = 3; else if (re.test(it._h)) p = 2; else if (re.test(it._x)) p = 1;
          if (!p && w.length >= 5) {
            for (var j = 0; j < it._palArr.length; j++) { var x = it._palArr[j]; if (lev1(w, x) || (x.length > w.length && lev1(w, x.slice(0, w.length)))) { p = (it._t.indexOf(x) >= 0) ? 2.5 : 0.6; break; } }
          }
        }
        if (p > mejor) mejor = p;
      }
      if (!mejor) return 0; // todas las palabras deben aparecer
      total += mejor;
    }
    if (frase && it._t.indexOf(frase) >= 0) total += 4;
    var bonus = { leccion: 0.6, calculadora: 0.4, simulacion: 0.4, glosario: 0.3, modulo: 0.3 }[it.tipo] || 0;
    return total + bonus;
  }
  function buscar(q, filtro) {
    if (!indice.length) construir();
    var qt = tokens(q); if (!qt.length) return [];
    var frase = norm(q).trim();
    var r = [];
    indice.forEach(function (it) { if (filtro && filtro.tipo && it.tipo !== filtro.tipo) return; var s = puntuar(it, qt, frase); if (s > 0) r.push({ it: it, s: s }); });
    r.sort(function (a, b) { return b.s - a.s; });
    return r.map(function (x) { return x.it; });
  }
  function sugerir(q) { // términos parecidos cuando no hay resultados
    if (!indice.length) construir();
    var qt = tokens(q), out = {};
    qt.forEach(function (w) {
      indice.forEach(function (it) { it._t.split(/\s+/).forEach(function (x) { if (x.length > 3 && (lev1(w, x) || x.indexOf(w.slice(0, 4)) === 0)) out[x] = 1; }); });
    });
    return Object.keys(out).slice(0, 6);
  }
  function resaltar(texto, q) {
    var qt = tokens(q); var s = String(texto);
    var esc = function (x) { return x.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
    s = esc(s); if (!qt.length) return s;
    var plano = norm(s);
    var marcas = [];
    qt.forEach(function (w) { expandir(w).forEach(function (v) { var i = -1; while ((i = plano.indexOf(v, i + 1)) >= 0) { if (i === 0 || /\s/.test(plano[i - 1])) marcas.push([i, i + v.length]); } }); });
    if (!marcas.length) return s;
    marcas.sort(function (a, b) { return a[0] - b[0]; });
    var res = "", pos = 0;
    marcas.forEach(function (m) { if (m[0] < pos) return; res += s.slice(pos, m[0]) + "<mark>" + s.slice(m[0], m[1]) + "</mark>"; pos = m[1]; });
    return res + s.slice(pos);
  }
  window.BUSCADOR = { construir: construir, buscar: buscar, sugerir: sugerir, resaltar: resaltar, norm: norm, _indice: function () { return indice; } };
})();
