// Motor de quizzes: opción múltiple, verdadero/falso, numérica (con unidades y prefijos, ±2 %),
// ordenar pasos y señalar en un diagrama. Retroalimentación inmediata y enlaces a la lección.
(function () {
  "use strict";
  var N = window.NUM, T = window.T;
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function md(s) { return esc(s).replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>").replace(/\*([^*]+)\*/g, "<i>$1</i>"); }
  function barajar(a, rnd) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor((rnd || Math.random)() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function ent(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function de(lista) { return lista[Math.floor(Math.random() * lista.length)]; }
  var f = N.fmt, fu = N.fmtU;

  // ---------- Diagramas para preguntas de «señalar» ----------
  var SIMB = {
    pila: '<line x1="-14" y1="-12" x2="-14" y2="12" stroke="currentColor" stroke-width="3"/><line x1="-4" y1="-6" x2="-4" y2="6" stroke="currentColor" stroke-width="3"/>',
    res: '<path d="M-20 0 h6 l3 -7 l6 14 l6 -14 l6 14 l6 -14 l3 7 h4" fill="none" stroke="currentColor" stroke-width="2"/>',
    foco: '<circle r="12" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-8 -8 L8 8 M-8 8 L8 -8" stroke="currentColor" stroke-width="2"/>',
    led: '<path d="M-10 -10 L-10 10 L8 0 Z" fill="none" stroke="currentColor" stroke-width="2"/><line x1="8" y1="-10" x2="8" y2="10" stroke="currentColor" stroke-width="2"/><path d="M2 -14 l6 -6 M8 -12 l6 -6" stroke="currentColor" stroke-width="1.5"/>',
    inter: '<circle cx="-12" r="2.5" fill="currentColor"/><circle cx="12" r="2.5" fill="currentColor"/><line x1="-12" y1="0" x2="10" y2="-10" stroke="currentColor" stroke-width="2"/>',
    fus: '<rect x="-14" y="-6" width="28" height="12" fill="none" stroke="currentColor" stroke-width="2"/><line x1="-18" y1="0" x2="18" y2="0" stroke="currentColor" stroke-width="1.5"/>',
    tierra: '<line x1="0" y1="-12" x2="0" y2="0" stroke="currentColor" stroke-width="2"/><line x1="-12" y1="0" x2="12" y2="0" stroke="currentColor" stroke-width="2"/><line x1="-8" y1="5" x2="8" y2="5" stroke="currentColor" stroke-width="2"/><line x1="-4" y1="10" x2="4" y2="10" stroke="currentColor" stroke-width="2"/>',
    cap: '<line x1="-4" y1="-12" x2="-4" y2="12" stroke="currentColor" stroke-width="3"/><line x1="4" y1="-12" x2="4" y2="12" stroke="currentColor" stroke-width="3"/>',
    volt: '<circle r="13" fill="none" stroke="currentColor" stroke-width="2"/><text y="5" text-anchor="middle" font-size="14" fill="currentColor">V</text>',
    amp: '<circle r="13" fill="none" stroke="currentColor" stroke-width="2"/><text y="5" text-anchor="middle" font-size="14" fill="currentColor">A</text>',
    diodo: '<path d="M-10 -10 L-10 10 L8 0 Z" fill="none" stroke="currentColor" stroke-width="2"/><line x1="8" y1="-10" x2="8" y2="10" stroke="currentColor" stroke-width="2"/>'
  };
  function rejillaSimbolos(lista) {
    var s = '<svg viewBox="0 0 400 ' + (Math.ceil(lista.length / 4) * 90) + '" role="img" aria-label="Símbolos de circuito numerados">';
    lista.forEach(function (k, i) { var x = 50 + (i % 4) * 100, y = 40 + Math.floor(i / 4) * 90; s += '<g transform="translate(' + x + "," + y + ')">' + SIMB[k] + '</g><text x="' + x + '" y="' + (y + 38) + '" text-anchor="middle" font-size="13" fill="currentColor">' + (i + 1) + '</text><rect class="zona" data-z="' + k + '" x="' + (x - 45) + '" y="' + (y - 35) + '" width="90" height="82" rx="8"/>'; });
    return s + "</svg>";
  }
  var DIAGRAMAS = {
    simbolos: function () { return rejillaSimbolos(["pila", "res", "foco", "led", "inter", "fus", "tierra", "cap"]); },
    simbolos2: function () { return rejillaSimbolos(["volt", "amp", "diodo", "res", "pila", "cap", "inter", "tierra"]); },
    multimetro: function () {
      return '<svg viewBox="0 0 300 330" role="img" aria-label="Multímetro con sus partes"><rect x="40" y="10" width="220" height="310" rx="18" fill="none" stroke="currentColor" stroke-width="2"/><rect x="65" y="30" width="170" height="60" rx="6" fill="none" stroke="currentColor" stroke-width="2"/><text x="150" y="70" text-anchor="middle" font-size="26" font-family="monospace" fill="currentColor">8.88</text><circle cx="150" cy="170" r="50" fill="none" stroke="currentColor" stroke-width="2"/><line x1="150" y1="170" x2="150" y2="128" stroke="currentColor" stroke-width="4"/><text x="90" y="130" font-size="12" fill="currentColor">V⎓</text><text x="190" y="130" font-size="12" fill="currentColor">V~</text><text x="200" y="185" font-size="12" fill="currentColor">Ω</text><text x="85" y="185" font-size="12" fill="currentColor">A</text>' +
        '<circle cx="85" cy="275" r="13" fill="none" stroke="currentColor" stroke-width="2"/><text x="85" y="305" text-anchor="middle" font-size="11" fill="currentColor">10A</text><circle cx="150" cy="275" r="13" fill="none" stroke="currentColor" stroke-width="2"/><text x="150" y="305" text-anchor="middle" font-size="11" fill="currentColor">COM</text><circle cx="215" cy="275" r="13" fill="none" stroke="var(--fase)" stroke-width="2"/><text x="215" y="305" text-anchor="middle" font-size="11" fill="currentColor">VΩmA</text>' +
        '<rect class="zona" data-z="pantalla" x="60" y="25" width="180" height="70" rx="8"/><rect class="zona" data-z="perilla" x="95" y="115" width="110" height="110" rx="55"/><rect class="zona" data-z="a10" x="65" y="255" width="40" height="58" rx="8"/><rect class="zona" data-z="com" x="130" y="255" width="40" height="58" rx="8"/><rect class="zona" data-z="vohm" x="190" y="255" width="50" height="58" rx="8"/></svg>';
    },
    tablero: function () {
      var s = '<svg viewBox="0 0 320 260" role="img" aria-label="Tablero eléctrico con sus partes"><rect x="20" y="10" width="280" height="240" rx="10" fill="none" stroke="currentColor" stroke-width="2"/><rect x="40" y="30" width="60" height="90" rx="6" fill="none" stroke="currentColor" stroke-width="2.5"/><text x="70" y="140" text-anchor="middle" font-size="11" fill="currentColor">Principal</text><rect x="120" y="30" width="60" height="90" rx="6" fill="none" stroke="currentColor" stroke-width="2"/><text x="150" y="80" text-anchor="middle" font-size="11" fill="currentColor">T</text><text x="150" y="140" text-anchor="middle" font-size="11" fill="currentColor">Prueba</text><circle cx="150" cy="105" r="6" fill="var(--volt)"/>';
      for (var i = 0; i < 4; i++) s += '<rect x="' + (40 + i * 65) + '" y="165" width="40" height="60" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><text x="' + (60 + i * 65) + '" y="200" text-anchor="middle" font-size="11" fill="currentColor">' + [15, 20, 20, 30][i] + 'A</text>';
      s += '<line x1="200" y1="60" x2="290" y2="60" stroke="var(--tierra)" stroke-width="4"/><text x="245" y="50" text-anchor="middle" font-size="11" fill="currentColor">Barra de tierra</text>';
      return s + '<rect class="zona" data-z="principal" x="35" y="25" width="70" height="120" rx="8"/><rect class="zona" data-z="diferencial" x="115" y="25" width="70" height="120" rx="8"/><rect class="zona" data-z="derivados" x="35" y="160" width="250" height="70" rx="8"/><rect class="zona" data-z="tierra" x="195" y="35" width="100" height="40" rx="8"/></svg>';
    }
  };

  // ---------- Generadores de preguntas numéricas con valores aleatorios ----------
  var GEN = {
    ohmI: function () { var V = de([1.5, 3, 4.5, 5, 9, 12, 24]), R = de([100, 150, 220, 330, 470, 1000, 2200]); return { t: "num", p: "Una fuente de " + f(V) + " V alimenta un resistor de " + f(R) + " Ω. ¿Qué corriente circula?", r: V / R, u: "A", e: "I = V / R = " + f(V) + " / " + f(R) + " = " + fu(V / R, "A") + "." }; },
    ohmV: function () { var I = de([0.01, 0.02, 0.05, 0.1, 0.5, 2]), R = de([10, 47, 100, 220, 470]); return { t: "num", p: "Por un resistor de " + f(R) + " Ω circulan " + fu(I, "A") + ". ¿Qué voltaje tiene entre sus terminales?", r: I * R, u: "V", e: "V = I · R = " + fu(I, "A") + " × " + f(R) + " Ω = " + fu(I * R, "V") + "." }; },
    ohmR: function () { var V = de([5, 9, 12, 24]), I = de([0.01, 0.02, 0.025, 0.05, 0.1, 0.2]); return { t: "num", p: "Un componente conectado a " + f(V) + " V deja pasar " + fu(I, "A") + ". ¿Cuál es su resistencia?", r: V / I, u: "Ω", e: "R = V / I = " + f(V) + " / " + f(I) + " = " + fu(V / I, "Ω") + "." }; },
    serie: function () { var a = de([100, 220, 330, 470]), b = de([150, 680, 1000]), c = de([47, 100, 220]), V = de([9, 12]); var R = a + b + c; return { t: "num", p: "Tres resistores de " + a + " Ω, " + b + " Ω y " + c + " Ω están en serie con una pila de " + V + " V. ¿Cuál es la corriente?", r: V / R, u: "A", e: "Req = " + a + " + " + b + " + " + c + " = " + R + " Ω; I = " + V + " / " + R + " = " + fu(V / R, "A") + "." }; },
    paralelo: function () { var p = de([[6, 3], [12, 6], [10, 15], [20, 30], [100, 100], [4, 12], [60, 30]]); var R = p[0] * p[1] / (p[0] + p[1]); return { t: "num", p: "¿Cuál es la resistencia equivalente de " + p[0] + " Ω en paralelo con " + p[1] + " Ω?", r: R, u: "Ω", e: "Req = (" + p[0] + " × " + p[1] + ") / (" + p[0] + " + " + p[1] + ") = " + f(R) + " Ω." }; },
    mixto: function () { var a = de([2, 4, 5, 10]), p = de([[6, 12], [6, 3], [10, 10], [20, 5]]); var R = a + p[0] * p[1] / (p[0] + p[1]); return { t: "num", p: "Un resistor de " + a + " Ω está en serie con un paralelo de " + p[0] + " Ω y " + p[1] + " Ω. ¿Resistencia equivalente?", r: R, u: "Ω", e: "Paralelo: " + f(p[0] * p[1] / (p[0] + p[1])) + " Ω; más " + a + " Ω en serie = " + f(R) + " Ω." }; },
    lck: function () { var t = de([2, 3, 5, 1.5]), a = de([0.5, 0.8, 1]); return { t: "num", p: "A un nodo entran " + f(t) + " A y salen dos corrientes; una de ellas es " + f(a) + " A. ¿Cuánto vale la otra?", r: t - a, u: "A", e: "LCK: lo que entra = lo que sale → I₂ = " + f(t) + " − " + f(a) + " = " + f(t - a) + " A." }; },
    lvk: function () { var V = de([12, 24, 9]), a = de([2, 3, 4]), b = de([1, 2, 3]); return { t: "num", p: "En una malla con una fuente de " + V + " V hay tres resistores. Dos tienen caídas de " + a + " V y " + b + " V. ¿Cuál es la caída en el tercero?", r: V - a - b, u: "V", e: "LVK: " + V + " = " + a + " + " + b + " + V₃ → V₃ = " + (V - a - b) + " V." }; },
    potencia: function () { var V = de([120, 127, 230]), I = de([0.5, 2, 5, 8, 10]); return { t: "num", p: "Un aparato conectado a " + V + " V consume " + f(I) + " A. ¿Cuál es su potencia?", r: V * I, u: "W", e: "P = V · I = " + V + " × " + f(I) + " = " + f(V * I) + " W." }; },
    energia: function () { var W = de([60, 100, 500, 1000, 1200, 1500, 2000]), h = de([0.5, 1, 2, 3, 4, 8]), d = 30; var k = W * h * d / 1000; return { t: "num", p: "Un aparato de " + W + " W se usa " + f(h) + " h al día durante 30 días. ¿Cuántos kWh consume en el mes?", r: k, u: "kWh", e: "kWh = " + W + " × " + f(h) + " × 30 ÷ 1000 = " + f(k) + " kWh." }; },
    costo: function () { var k = de([18, 36, 45, 90, 120]), p = de([1.2, 1.5, 2, 2.5, 0.2]); return { t: "num", p: "Si consumes " + k + " kWh y la tarifa es " + f(p) + " por kWh, ¿cuánto pagas por esa energía (sin cargos fijos)?", r: k * p, u: "", e: "Costo = " + k + " × " + f(p) + " = " + f(k * p) + "." }; },
    rms: function () { var v = de([120, 127, 220, 230]); return { t: "num", p: "La red de tu casa es de " + v + " V eficaces (RMS). ¿Cuál es el voltaje pico aproximado?", r: v * Math.SQRT2, u: "V", e: "Vpico = Vrms × √2 = " + v + " × 1,414 = " + f(v * Math.SQRT2) + " V." }; },
    periodo: function () { var hz = de([50, 60]); return { t: "num", p: "¿Cuál es el periodo de una corriente alterna de " + hz + " Hz?", r: 1 / hz, u: "s", e: "T = 1 / f = 1 / " + hz + " = " + fu(1 / hz, "s") + "." }; },
    trafo: function () { var Vp = de([120, 127, 230]), Np = de([500, 1000, 2000]), Ns = de([50, 100, 200]); return { t: "num", p: "Un transformador tiene " + Np + " vueltas en el primario y " + Ns + " en el secundario. Si entra " + Vp + " V, ¿cuánto sale?", r: Vp * Ns / Np, u: "V", e: "Vs = Vp × Ns / Np = " + Vp + " × " + Ns + " / " + Np + " = " + f(Vp * Ns / Np) + " V." }; },
    bateria: function () { var m = de([2000, 3000, 4000, 5000, 10000]), c = de([100, 200, 250, 500]); return { t: "num", p: "Una batería de " + m + " mAh alimenta un aparato que consume " + c + " mA. ¿Cuántas horas dura, en el caso ideal?", r: m / c, u: "s", uTexto: "h", e: "Horas = mAh / mA = " + m + " / " + c + " = " + f(m / c) + " h." }; },
    wh: function () { var m = de([3000, 5000, 10000, 20000]), V = 3.7; return { t: "num", p: "¿Cuántos Wh almacena una batería de " + m + " mAh a 3,7 V?", r: m * V / 1000, u: "Wh", e: "Wh = mAh × V ÷ 1000 = " + m + " × 3,7 ÷ 1000 = " + f(m * V / 1000) + " Wh." }; },
    perdidas: function () { var P = 1e6, R = de([2, 5, 10]), V = de([10000, 100000]); var I = P / V, Pp = I * I * R; return { t: "num", p: "Se transmite 1 MW por una línea de " + R + " Ω a " + f(V) + " V. ¿Qué potencia se pierde en la línea?", r: Pp, u: "W", e: "I = P / V = " + f(I) + " A; pérdida = I²R = " + f(I) + "² × " + R + " = " + fu(Pp, "W") + "." }; },
    cuerpo: function () { var V = de([120, 127, 230]), R = de([1000, 2000, 100000]); return { t: "num", p: "Con " + V + " V y una resistencia del cuerpo de " + f(R) + " Ω, ¿qué corriente atravesaría a la persona?", r: V / R, u: "A", e: "I = V / R = " + V + " / " + f(R) + " = " + fu(V / R, "A") + (V / R > 0.03 ? ", una corriente potencialmente mortal." : ", que se percibe como una descarga."), crit: false }; },
    led: function () { var Vs = de([5, 9, 12]), Vf = de([2, 3]), I = 0.02; return { t: "num", p: "¿Qué resistencia necesita un LED de " + Vf + " V y 20 mA con una fuente de " + Vs + " V? (valor calculado, no comercial)", r: (Vs - Vf) / I, u: "Ω", e: "R = (" + Vs + " − " + Vf + ") / 0,02 = " + f((Vs - Vf) / I) + " Ω." }; },
    rc: function () { var R = de([1000, 10000, 47000]), C = de([1e-6, 10e-6, 100e-6]); return { t: "num", p: "¿Cuál es la constante de tiempo τ de un circuito con R = " + fu(R, "Ω") + " y C = " + fu(C, "F") + "?", r: R * C, u: "s", e: "τ = R · C = " + f(R) + " × " + C + " = " + fu(R * C, "s") + "." }; },
    coulomb: function () { var r = de([0.1, 0.2, 0.5]); var F = 8.99e9 * 1e-6 * 1e-6 / (r * r); return { t: "num", p: "¿Qué fuerza hay entre dos cargas de 1 µC separadas " + f(r) + " m? (k = 8,99·10⁹ N·m²/C²)", r: F, u: "N", e: "F = k·q₁·q₂/r² = 8,99·10⁹ × 10⁻⁶ × 10⁻⁶ / " + f(r) + "² = " + f(F) + " N." }; }
  };

  // ---------- Comprobación ----------
  function comprobarNum(q, txt) {
    var u = q.uTexto ? "" : (q.u || ""); var v = N.parse(String(txt).replace(q.uTexto || "§§", ""), u);
    if (isNaN(v)) return null;
    var tol = q.tol === undefined ? 0.02 : q.tol;
    return N.cerca(v, q.r, tol);
  }
  function textoRespuesta(q) {
    if (q.t === "om") return q.o[q.c];
    if (q.t === "vf") return q.c ? T.quiz.verdadero : T.quiz.falso;
    if (q.t === "num") return q.uTexto ? f(q.r) + " " + q.uTexto : (q.u ? fu(q.r, q.u) : f(q.r));
    if (q.t === "ord") return q.o.map(function (x, i) { return (i + 1) + ". " + x; }).join(" · ");
    if (q.t === "diag") return q.cTexto || "la zona indicada";
    return "";
  }

  // Prepara una copia lista para mostrar (baraja opciones de «om»).
  function preparar(q, barajarOpciones) {
    var c = JSON.parse(JSON.stringify(q));
    if (c.t === "om" && barajarOpciones !== false) {
      var idx = c.o.map(function (_, i) { return i; }), b = barajar(idx);
      // opciones del tipo «Todas las anteriores» no se mueven
      if (c.o.some(function (o) { return /anteriores/i.test(o); })) b = idx;
      c.o = b.map(function (i) { return q.o[i]; }); c.c = b.indexOf(q.c);
    }
    if (c.t === "ord") c.mezcla = barajar(c.o.map(function (_, i) { return i; }));
    return c;
  }

  // ---------- Renderizado de una pregunta ----------
  function htmlPregunta(q, k) {
    var h = '<div class="q" data-k="' + k + '"><p class="enun">' + (k + 1) + ". " + md(q.p) + (q.crit ? '<span class="critica">' + T.quiz.critica + "</span>" : "") + "</p>";
    if (q.t === "om") h += '<div class="opciones">' + q.o.map(function (o, i) { return '<button type="button" class="opcion" data-i="' + i + '"><b>' + "abcdef"[i] + ")</b> <span>" + md(o) + "</span></button>"; }).join("") + "</div>";
    else if (q.t === "vf") h += '<div class="opciones"><button type="button" class="opcion" data-i="1">' + T.quiz.verdadero + '</button><button type="button" class="opcion" data-i="0">' + T.quiz.falso + "</button></div>";
    else if (q.t === "num") h += '<div class="entrada-num"><label class="sr" for="num-' + k + '" style="margin:0">Respuesta' + (q.uTexto || q.u ? " (" + esc(q.uTexto || q.u) + ")" : "") + ':</label><input id="num-' + k + '" type="text" inputmode="decimal" autocomplete="off"><button type="button" class="btn sec comprobar">' + T.btn.comprobar + '</button></div><p class="sim-nota">' + T.quiz.numAyuda + "</p>";
    else if (q.t === "ord") h += '<ol class="orden-lista">' + q.mezcla.map(function (i) { return '<li data-i="' + i + '"><span>' + md(q.o[i]) + '</span><button type="button" class="iconbtn" data-m="-1" aria-label="' + T.btn.subir + '">↑</button><button type="button" class="iconbtn" data-m="1" aria-label="' + T.btn.bajar + '">↓</button></li>'; }).join("") + '</ol><button type="button" class="btn sec comprobar">' + T.btn.comprobar + "</button>";
    else if (q.t === "diag") h += '<div class="diag">' + (DIAGRAMAS[q.dia] ? DIAGRAMAS[q.dia]() : "") + '</div><p class="sim-nota">Toca la parte correcta del diagrama.</p>';
    return h + '<div class="retro" hidden aria-live="polite"></div></div>';
  }

  // opciones: {id, preguntas, modo:"inmediato"|"final", aprobar, criticas, alTerminar(pct, aprobado), titulo, enlaceLeccion(fn)}
  function montar(cont, opts) {
    var qs = opts.preguntas, resp = new Array(qs.length), ok = new Array(qs.length);
    var div = document.createElement("div"); div.className = "quiz"; div.setAttribute("data-quiz", opts.id);
    div.innerHTML = (opts.titulo ? "<h3>" + esc(opts.titulo) + "</h3>" : "") + qs.map(htmlPregunta).join("") + '<div class="pie-quiz"></div>';
    cont.appendChild(div);
    var inmediato = opts.modo !== "final";

    function retro(k) {
      var q = qs[k], el = div.querySelector('.q[data-k="' + k + '"]'), r = el.querySelector(".retro");
      r.hidden = false; r.className = "retro " + (ok[k] ? "bien" : "mal");
      var enlace = opts.enlaceLeccion && q._lec ? ' <a href="#/leccion/' + q._lec + '">' + T.quiz.repasa + " lección " + q._lec.replace("-", ".") + "</a>" : "";
      r.innerHTML = "<b>" + (ok[k] ? T.quiz.correcto : T.quiz.incorrecto) + "</b> " + (ok[k] ? "" : T.quiz.laRespuesta + " <b>" + md(textoRespuesta(q)) + "</b>. ") + md(q.e || "") + (ok[k] ? "" : enlace);
      el.querySelectorAll(".opcion").forEach(function (b) { b.disabled = true; var i = +b.getAttribute("data-i"); var correcta = q.t === "om" ? i === q.c : (i === 1) === !!q.c; if (correcta) b.classList.add("correcta"); else if (resp[k] === i) b.classList.add("incorrecta"); });
      el.querySelectorAll(".zona").forEach(function (z) { var zz = z.getAttribute("data-z"); if (zz === q.c) z.classList.add("correcta"); else if (zz === resp[k]) z.classList.add("incorrecta"); });
      el.querySelectorAll("input,.comprobar,.orden-lista button").forEach(function (x) { x.disabled = true; });
    }
    function registrar(k, valor, correcto) {
      if (resp[k] !== undefined && inmediato) return;
      resp[k] = valor; ok[k] = correcto;
      if (inmediato) retro(k);
      else { var el = div.querySelector('.q[data-k="' + k + '"]'); el.querySelectorAll(".opcion").forEach(function (b) { b.classList.toggle("correcta", false); b.style.outline = (+b.getAttribute("data-i") === valor) ? "3px solid var(--accent)" : ""; }); el.querySelectorAll(".zona").forEach(function (z) { z.style.fill = z.getAttribute("data-z") === valor ? "var(--accent-soft)" : ""; z.style.fillOpacity = z.getAttribute("data-z") === valor ? ".7" : ""; }); }
      revisar();
    }
    function revisar() {
      var pie = div.querySelector(".pie-quiz"), n = resp.filter(function (x) { return x !== undefined; }).length;
      if (inmediato) { if (n === qs.length) terminar(); }
      else pie.innerHTML = '<p class="estado">Respondidas: ' + n + " de " + qs.length + '</p><button type="button" class="btn calificar"' + (n < qs.length ? " disabled" : "") + ">" + T.btn.calificar + "</button>";
    }
    function terminar() {
      var buenas = ok.filter(Boolean).length, pct = Math.round(buenas * 100 / qs.length);
      var critFallo = qs.some(function (q, k) { return q.crit && !ok[k]; });
      var aprobado = pct >= (opts.aprobar || 0) && !(opts.criticas && critFallo);
      var pie = div.querySelector(".pie-quiz");
      var temas = {}; qs.forEach(function (q, k) { if (!ok[k] && q._lec) temas[q._lec] = q._lecT || q._lec; });
      var listaTemas = Object.keys(temas).map(function (l) { return '<li><a href="#/leccion/' + l + '">Lección ' + l.replace("-", ".") + " " + esc(temas[l]) + "</a></li>"; }).join("");
      pie.innerHTML = '<div class="recuadro ' + (aprobado || !opts.aprobar ? "bien" : "aviso") + '"><p class="resultado-quiz"><b>Resultado: ' + buenas + " de " + qs.length + " (" + pct + " %)</b>" + (opts.aprobar ? " · " + (aprobado ? T.quiz.aprobado : T.quiz.noAprobado) : "") + "</p>" +
        (opts.criticas && critFallo ? "<p><b>Fallaste al menos una pregunta crítica de seguridad.</b> Para aprobar este módulo debes acertarlas todas.</p>" : "") +
        (listaTemas ? "<p>Temas para repasar:</p><ul>" + listaTemas + "</ul>" : "") + '<div class="botones"><button type="button" class="btn sec reintentar">' + T.btn.reintentar + "</button></div></div>";
      if (opts.alTerminar) opts.alTerminar(pct, aprobado, resp);
    }
    div.addEventListener("click", function (e) {
      var b = e.target.closest("button, .zona"); if (!b) return;
      var qd = b.closest(".q"); var k = qd ? +qd.getAttribute("data-k") : -1, q = qs[k];
      if (b.classList.contains("reintentar")) { div.remove(); var n = opts.regenerar ? opts.regenerar() : opts; montar(cont, n); return; }
      if (b.classList.contains("calificar")) { qs.forEach(function (_, i) { retro(i); }); terminar(); return; }
      if (!q) return;
      if (b.classList.contains("opcion")) { var i = +b.getAttribute("data-i"); registrar(k, i, q.t === "om" ? i === q.c : (i === 1) === !!q.c); }
      else if (b.classList.contains("zona")) { var z = b.getAttribute("data-z"); registrar(k, z, z === q.c); }
      else if (b.getAttribute("data-m")) { var li = b.closest("li"), m = +b.getAttribute("data-m"); if (m < 0 && li.previousElementSibling) li.parentNode.insertBefore(li, li.previousElementSibling); if (m > 0 && li.nextElementSibling) li.parentNode.insertBefore(li.nextElementSibling, li); b.focus(); }
      else if (b.classList.contains("comprobar")) {
        if (q.t === "num") { var inp = qd.querySelector("input"), c = comprobarNum(q, inp.value); if (c === null) { var r = qd.querySelector(".retro"); r.hidden = false; r.className = "retro mal"; r.textContent = "No entiendo ese número. " + T.quiz.numAyuda; return; } registrar(k, inp.value, c); }
        if (q.t === "ord") { var orden = Array.prototype.map.call(qd.querySelectorAll(".orden-lista li"), function (x) { return +x.getAttribute("data-i"); }); registrar(k, orden.join(","), orden.every(function (v, i) { return v === i; })); }
      }
    });
    div.addEventListener("keydown", function (e) { if (e.key === "Enter" && e.target.matches(".entrada-num input")) { e.preventDefault(); e.target.parentNode.querySelector(".comprobar").click(); } });
    // las zonas del diagrama se pueden activar con teclado
    div.querySelectorAll(".zona").forEach(function (z) { z.setAttribute("tabindex", "0"); z.setAttribute("role", "button"); z.setAttribute("aria-label", "Zona del diagrama"); z.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); z.dispatchEvent(new MouseEvent("click", { bubbles: true })); } }); });
    revisar();
    return div;
  }

  // ---------- Bancos ----------
  function bancoModulo(m) {
    var b = [];
    m.lecciones.forEach(function (l) { (l.quiz || []).forEach(function (q) { var c = JSON.parse(JSON.stringify(q)); c._lec = l.id; c._lecT = l.t; b.push(c); }); });
    (m.extra || []).forEach(function (q) { var c = JSON.parse(JSON.stringify(q)); c._lec = c.lec || null; if (c._lec) { var l = m.lecciones.filter(function (x) { return x.id === c._lec; })[0]; c._lecT = l ? l.t : ""; } b.push(c); });
    return b;
  }
  function generar(lista, lec) { return (lista || []).map(function (g) { var q = GEN[g](); q._lec = lec || null; q._gen = g; return q; }); }
  function quizModulo(m) {
    var n = m.quizN || 15, banco = bancoModulo(m), gens = generar(m.gen, null);
    // Solo en los módulos con preguntas críticas obligatorias se garantizan (hasta 8 por intento).
    var crit = m.criticas ? barajar(banco.filter(function (q) { return q.crit; })).slice(0, 8) : [];
    var resto = barajar(banco.filter(function (q) { return m.criticas ? !q.crit : true; }));
    var nGen = Math.min(gens.length, Math.ceil(n / 4), Math.max(0, n - crit.length));
    var sel = crit.concat(gens.slice(0, nGen));
    for (var i = 0; sel.length < n && i < resto.length; i++) sel.push(resto[i]);
    return barajar(sel).map(function (q) { return preparar(q); });
  }
  function examenFinal() {
    var mods = window.CURSO.modulos.filter(function (m) { return m.n > 0; }), sel = [];
    mods.forEach(function (m) { var b = barajar(bancoModulo(m)); sel = sel.concat(b.slice(0, 2)); });
    var gens = barajar(Object.keys(GEN)).slice(0, 10); sel = sel.concat(generar(gens));
    return barajar(sel).slice(0, 40).map(function (q) { return preparar(q); });
  }

  window.QUIZ = { montar: montar, preparar: preparar, quizModulo: quizModulo, examenFinal: examenFinal, bancoModulo: bancoModulo, GEN: GEN, DIAGRAMAS: DIAGRAMAS, comprobarNum: comprobarNum, textoRespuesta: textoRespuesta, barajar: barajar, md: md };
})();
