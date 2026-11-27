// Simulaciones de circuitos (S3, S4, S5, S6, S14, S15, S18, S19, S20, S21) y utilidades compartidas.
// Todo en SVG (se adapta al tamaño y al tema) y sin bibliotecas externas.
(function () {
  "use strict";
  var N = window.NUM, f = N.fmt, fu = N.fmtU;
  window.SIMS = window.SIMS || {};
  var reducido = false; try { reducido = matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { }
  var U = window.SIMU = {
    reducido: reducido,
    el: function (tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; },
    // Control deslizante con etiqueta y valor visible
    rango: function (cont, o) {
      var id = "r" + Math.random().toString(36).slice(2, 8), w = U.el("div", "ctrl");
      w.innerHTML = '<label for="' + id + '">' + o.et + ': <span class="val"></span></label><input id="' + id + '" type="range" min="' + o.min + '" max="' + o.max + '" step="' + (o.paso || 1) + '" value="' + o.val + '">';
      var inp = w.querySelector("input"), v = w.querySelector(".val");
      function act() { v.textContent = o.fmt ? o.fmt(+inp.value) : inp.value; }
      inp.addEventListener("input", function () { act(); if (o.cambio) o.cambio(+inp.value); }); act(); cont.appendChild(w);
      inp.poner = function (x) { inp.value = x; act(); };
      return inp;
    },
    // Grupo de botones excluyentes
    chips: function (cont, et, ops, val, cambio) {
      var w = U.el("div", "ctrl"); w.innerHTML = '<p class="estado" style="margin:.2rem 0">' + et + '</p><div class="chip-grupo" role="group" aria-label="' + et + '">' + ops.map(function (o) { return '<button type="button" class="chip' + (o[0] === val ? " on" : "") + '" data-v="' + o[0] + '" aria-pressed="' + (o[0] === val) + '">' + o[1] + "</button>"; }).join("") + "</div>";
      w.addEventListener("click", function (e) { var b = e.target.closest(".chip"); if (!b) return; w.querySelectorAll(".chip").forEach(function (x) { x.classList.toggle("on", x === b); x.setAttribute("aria-pressed", String(x === b)); }); cambio(b.getAttribute("data-v")); });
      cont.appendChild(w); return w;
    },
    boton: function (cont, txt, fn, cls) { var b = U.el("button", "btn " + (cls || "sec"), txt); b.type = "button"; b.addEventListener("click", fn); cont.appendChild(b); return b; },
    marco: function (cont, vb, etiqueta) {
      var s = document.createElementNS("http://www.w3.org/2000/svg", "svg"); s.setAttribute("viewBox", vb); s.setAttribute("class", "sim-lienzo"); s.setAttribute("role", "img"); s.setAttribute("aria-label", etiqueta || "Simulación");
      cont.appendChild(s); var ctr = U.el("div", "sim-controles"); cont.appendChild(ctr); var lec = U.el("div", "sim-lectura"); lec.setAttribute("aria-live", "polite"); cont.appendChild(lec);
      return { svg: s, ctr: ctr, lec: lec };
    },
    // Bucle de animación que se detiene cuando el elemento sale de la página
    bucle: function (el, fn) {
      var ant = null;
      function paso(t) { if (!document.body.contains(el)) return; var dt = ant === null ? 16 : Math.min(60, t - ant); ant = t; fn(dt / 1000, t / 1000); requestAnimationFrame(paso); }
      requestAnimationFrame(paso);
    },
    // Punto a lo largo de un rectángulo (perímetro) según fracción 0..1, sentido horario desde arriba a la izquierda
    rect: function (x, y, w, h, t) { t = ((t % 1) + 1) % 1; var per = 2 * (w + h), d = t * per; if (d < w) return [x + d, y]; d -= w; if (d < h) return [x + w, y + d]; d -= h; if (d < w) return [x + w - d, y + h]; d -= w; return [x, y + h - d]; },
    pila: function (x, y, V, vertical) { return '<g transform="translate(' + x + "," + y + ")" + (vertical ? " rotate(90)" : "") + '"><line x1="-6" y1="-16" x2="-6" y2="16" stroke="currentColor" stroke-width="3"/><line x1="6" y1="-9" x2="6" y2="9" stroke="currentColor" stroke-width="5"/><text x="-14" y="-20" font-size="12" fill="currentColor">+</text></g>' + (V !== undefined ? '<text x="' + (x + (vertical ? 22 : -10)) + '" y="' + (y + (vertical ? 4 : 34)) + '" font-size="13" fill="currentColor">' + V + "</text>" : ""); },
    resistor: function (x, y, vertical, etiqueta) { var p = "M-24 0 h6 l3 -8 l6 16 l6 -16 l6 16 l6 -16 l3 8 h12"; return '<g transform="translate(' + x + "," + y + ")" + (vertical ? " rotate(90)" : "") + '"><rect x="-24" y="-10" width="48" height="20" style="fill:var(--bg)" stroke="none"/><path d="' + p + '" fill="none" stroke="currentColor" stroke-width="2.5"/></g>' + (etiqueta ? '<text x="' + (x + (vertical ? 16 : 0)) + '" y="' + (y + (vertical ? 4 : -16)) + '" font-size="12" text-anchor="' + (vertical ? "start" : "middle") + '" fill="currentColor">' + etiqueta + "</text>" : ""); },
    foco: function (x, y, brillo, fundido, etiqueta) {
      var b = Math.max(0, Math.min(1, brillo));
      return '<g transform="translate(' + x + "," + y + ')"><circle r="' + (18 + 14 * b) + '" style="fill:#facc15" opacity="' + (fundido ? 0 : 0.55 * b) + '"/><circle r="15" style="fill:var(--bg)" stroke="currentColor" stroke-width="2.5"/>' + (fundido ? '<path d="M-7 -7 L7 7 M-7 7 L7 -7" stroke="var(--no)" style="stroke:var(--no)" stroke-width="3"/>' : '<path d="M-6 6 Q0 -10 6 6" fill="none" stroke="currentColor" stroke-width="1.5"/>') + "</g>" + (etiqueta ? '<text x="' + x + '" y="' + (y + 32) + '" font-size="13" text-anchor="middle" fill="currentColor">' + etiqueta + "</text>" : "");
    },
    flecha: function (x1, y1, x2, y2, color, ancho) { var a = Math.atan2(y2 - y1, x2 - x1), L = 9; return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" style="stroke:' + color + '" stroke-width="' + (ancho || 2.5) + '"/><path d="M' + x2 + " " + y2 + " L" + (x2 - L * Math.cos(a - 0.45)) + " " + (y2 - L * Math.sin(a - 0.45)) + " L" + (x2 - L * Math.cos(a + 0.45)) + " " + (y2 - L * Math.sin(a + 0.45)) + ' Z" style="fill:' + color + '"/>'; },
    cable: function (d, color, ancho) { return '<path d="' + d + '" fill="none" style="stroke:' + (color || "currentColor") + '" stroke-width="' + (ancho || 2.5) + '" stroke-linejoin="round"/>'; }
  };

  // ---------- S3 Analogía del agua ----------
  SIMS.S3 = function (cont) {
    var M = U.marco(cont, "0 0 640 260", "Circuito eléctrico y sistema de agua equivalentes"), V = 9, R = 300, fase = 0;
    U.rango(M.ctr, { et: "Voltaje = presión de la bomba", min: 1, max: 12, paso: 0.5, val: V, fmt: function (x) { return f(x) + " V"; }, cambio: function (x) { V = x; } });
    U.rango(M.ctr, { et: "Resistencia = estrechamiento del tubo", min: 50, max: 1000, paso: 10, val: R, fmt: function (x) { return f(x) + " Ω"; }, cambio: function (x) { R = x; } });
    U.bucle(M.svg, function (dt) {
      var I = V / R; fase += (reducido ? 0 : dt) * I * 25;
      var ancho = Math.max(3, 22 - R / 55), s = '<text x="160" y="20" text-anchor="middle" font-size="14" font-weight="700" fill="currentColor">Circuito</text><text x="480" y="20" text-anchor="middle" font-size="14" font-weight="700" fill="currentColor">Agua</text>';
      s += U.cable("M60 60 H260 V220 H60 Z") + U.pila(60, 140, f(V) + " V", false) + U.resistor(260, 140, true, f(R) + " Ω");
      for (var k = 0; k < 14; k++) { var p = U.rect(60, 60, 200, 160, k / 14 + fase); s += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="4" style="fill:var(--elec)"/>'; }
      s += '<rect x="380" y="50" width="200" height="180" rx="20" fill="none" style="stroke:var(--neutro)" stroke-width="22" opacity=".35"/>';
      s += '<rect x="569" y="' + (140 - 30) + '" width="22" height="60" style="fill:var(--bg)"/><rect x="' + (580 - ancho / 2) + '" y="110" width="' + ancho + '" height="60" style="fill:var(--neutro)" opacity=".35"/>';
      s += '<circle cx="380" cy="140" r="22" style="fill:var(--panel2)" stroke="currentColor" stroke-width="2"/><text x="380" y="145" text-anchor="middle" font-size="11" fill="currentColor">bomba</text>';
      for (var j = 0; j < 14; j++) { var q = U.rect(380, 50, 200, 180, j / 14 + fase); s += '<circle cx="' + q[0].toFixed(1) + '" cy="' + q[1].toFixed(1) + '" r="5" style="fill:var(--neutro)"/>'; }
      s += '<text x="600" y="145" font-size="11" fill="currentColor">tubo</text><text x="600" y="158" font-size="11" fill="currentColor">estrecho</text>';
      M.svg.innerHTML = s;
      M.lec.textContent = "Corriente I = V / R = " + f(V) + " / " + f(R) + " = " + fu(I, "A") + "  ↔  caudal de agua\nMás presión (voltaje) → más caudal; tubo más estrecho (resistencia) → menos caudal.";
    });
    M.lec.insertAdjacentHTML("afterend", '<p class="sim-nota">Límite de la analogía: en un cable la corriente no «se gasta» ni sale si el cable se corta; simplemente deja de circular. Y la energía viaja por el campo eléctrico, no por los electrones que avanzan lentamente.</p>');
  };

  // ---------- S4 Electrones en movimiento ----------
  SIMS.S4 = function (cont) {
    var M = U.marco(cont, "0 0 520 280", "Circuito con pila y resistor con electrones en movimiento"), V = 9, R = 450, fase = 0, sentido = "electronico";
    U.rango(M.ctr, { et: "Voltaje de la fuente", min: 0, max: 12, paso: 0.5, val: V, fmt: function (x) { return f(x) + " V"; }, cambio: function (x) { V = x; } });
    U.rango(M.ctr, { et: "Resistencia", min: 10, max: 1000, paso: 10, val: R, fmt: function (x) { return f(x) + " Ω"; }, cambio: function (x) { R = x; } });
    U.chips(M.ctr, "Mostrar", [["electronico", "Electrones (− a +)"], ["convencional", "Sentido convencional (+ a −)"]], sentido, function (v) { sentido = v; });
    U.bucle(M.svg, function (dt) {
      var I = V / R; fase += (reducido ? 0 : dt) * I * 20;
      var s = U.cable("M80 50 H440 V230 H80 Z") + U.pila(80, 140, f(V) + " V", false) + U.resistor(440, 140, true, f(R) + " Ω");
      s += '<text x="60" y="110" font-size="14" fill="currentColor">+</text><text x="60" y="180" font-size="14" fill="currentColor">−</text>';
      if (sentido === "electronico") for (var k = 0; k < 18; k++) { var p = U.rect(80, 50, 360, 180, -(k / 18 + fase)); s += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="5" style="fill:var(--elec)"/><text x="' + p[0].toFixed(1) + '" y="' + (p[1] + 3.5).toFixed(1) + '" text-anchor="middle" font-size="9" fill="#fff">−</text>'; }
      else if (I > 0) { s += U.flecha(150, 50, 300, 50, "var(--carga-pos)") + U.flecha(440, 80, 440, 200, "var(--carga-pos)") + U.flecha(370, 230, 220, 230, "var(--carga-pos)"); }
      s += '<text x="260" y="140" text-anchor="middle" font-size="13" fill="currentColor">I = ' + fu(I, "A") + '</text><text x="260" y="160" text-anchor="middle" font-size="12" fill="currentColor">P = ' + fu(V * I, "W") + "</text>";
      M.svg.innerHTML = s;
      M.lec.textContent = "V = " + f(V) + " V · R = " + f(R) + " Ω · I = V/R = " + fu(I, "A") + " · P = V·I = " + fu(V * I, "W") + "\nLos electrones reales avanzan muy despacio (milímetros por segundo); aquí la velocidad está exagerada para que veas que crece con la corriente.";
    });
  };

  // ---------- S5 Constructor de circuitos serie y paralelo ----------
  function resolverFocos(modo, V, Rs, fund) {
    var n = Rs.length, res = Rs.map(function () { return { V: 0, I: 0, P: 0 }; }), Req = Infinity, It = 0, i;
    if (modo === "serie") {
      if (fund.slice(0, n).some(Boolean)) { Req = Infinity; It = 0; }
      else { Req = Rs.reduce(function (a, b) { return a + b; }, 0); It = V / Req; for (i = 0; i < n; i++) { res[i].I = It; res[i].V = It * Rs[i]; } }
    } else if (modo === "paralelo") {
      var g = 0; for (i = 0; i < n; i++) if (!fund[i]) { g += 1 / Rs[i]; res[i].V = V; res[i].I = V / Rs[i]; }
      Req = g ? 1 / g : Infinity; It = g ? V * g : 0;
    } else { // mixto: foco 1 en serie con el paralelo de los demás
      var gp = 0; for (i = 1; i < n; i++) if (!fund[i]) gp += 1 / Rs[i];
      if (fund[0] || !gp) { Req = Infinity; It = 0; }
      else { var Rp = 1 / gp; Req = Rs[0] + Rp; It = V / Req; res[0].I = It; res[0].V = It * Rs[0]; var Vp = It * Rp; for (i = 1; i < n; i++) if (!fund[i]) { res[i].V = Vp; res[i].I = Vp / Rs[i]; } }
    }
    res.forEach(function (r) { r.P = r.V * r.I; });
    return { Req: Req, It: It, focos: res };
  }
  SIMS._resolverFocos = resolverFocos;
  SIMS.S5 = function (cont) {
    var M = U.marco(cont, "0 0 560 300", "Circuito de focos en serie, paralelo o mixto"), modo = "serie", n = 3, V = 12, Rs = [20, 20, 20, 20], fund = [false, false, false, false];
    U.chips(M.ctr, "Conexión", [["serie", "Serie"], ["paralelo", "Paralelo"], ["mixto", "Mixto (1 en serie + resto en paralelo)"]], modo, function (v) { modo = v; pintar(); });
    U.rango(M.ctr, { et: "Número de focos", min: 1, max: 4, val: n, cambio: function (x) { n = x; pintar(); } });
    U.rango(M.ctr, { et: "Voltaje de la pila", min: 1.5, max: 12, paso: 1.5, val: V, fmt: function (x) { return f(x) + " V"; }, cambio: function (x) { V = x; pintar(); } });
    var selW = U.el("div", "ctrl"); selW.innerHTML = '<p class="estado" style="margin:.2rem 0">Resistencia de cada foco</p>' + [0, 1, 2, 3].map(function (k) { return '<label style="display:inline-block;margin-right:.5rem;font-weight:400">F' + (k + 1) + ' <select data-k="' + k + '">' + [10, 20, 50, 100].map(function (r) { return '<option value="' + r + '"' + (r === 20 ? " selected" : "") + ">" + r + " Ω</option>"; }).join("") + "</select></label>"; }).join("");
    selW.addEventListener("change", function (e) { Rs[+e.target.getAttribute("data-k")] = +e.target.value; pintar(); }); M.ctr.appendChild(selW);
    var bw = U.el("div", "ctrl"); M.ctr.appendChild(bw); U.boton(bw, "Reparar todos los focos", function () { fund = [false, false, false, false]; pintar(); });
    M.svg.addEventListener("click", function (e) { var g = e.target.closest("[data-f]"); if (!g) return; var k = +g.getAttribute("data-f"); fund[k] = !fund[k]; pintar(); });
    function pintar() {
      var r = resolverFocos(modo, V, Rs.slice(0, n), fund), Pmax = 0.5 * V * V / 20, s = "", pos = [];
      if (modo === "serie") { s += U.cable("M60 60 H500 V240 H60 Z"); for (var i = 0; i < n; i++) pos.push([60 + 440 * (i + 1) / (n + 1), 60]); }
      else if (modo === "paralelo") { s += U.cable("M60 60 H500 M60 240 H500 M60 60 V240"); for (var j = 0; j < n; j++) { var x = 160 + j * 100; s += U.cable("M" + x + " 60 V240"); pos.push([x, 150]); } }
      else { s += U.cable("M60 60 H250 M60 60 V240 H500 M250 60 H500"); pos.push([155, 60]); for (var k = 1; k < n; k++) { var xx = 270 + (k - 1) * 90; s += U.cable("M" + xx + " 60 V240"); pos.push([xx, 150]); } if (n === 1) s += U.cable("M500 60 V240"); }
      s += U.pila(60, 150, f(V) + " V");
      pos.forEach(function (p, i) { var fo = r.focos[i]; s += '<g data-f="' + i + '" style="cursor:pointer" tabindex="0" role="button" aria-label="Foco ' + (i + 1) + (fund[i] ? " fundido" : "") + ', toca para fundirlo o repararlo">' + U.foco(p[0], p[1], fo.P / Pmax, fund[i], "F" + (i + 1) + " " + fu(fo.P, "W")) + "</g>"; });
      M.svg.innerHTML = s + '<text x="280" y="290" text-anchor="middle" font-size="12" fill="currentColor">Toca un foco para fundirlo o repararlo</text>';
      M.lec.textContent = "Req = " + (isFinite(r.Req) ? fu(r.Req, "Ω") : "∞ (circuito abierto)") + " · I total = " + fu(r.It, "A") + "\n" + r.focos.map(function (fo, i) { return "F" + (i + 1) + " (" + Rs[i] + " Ω): V = " + f(fo.V) + " V · I = " + fu(fo.I, "A") + " · P = " + fu(fo.P, "W") + (fund[i] ? " · FUNDIDO" : ""); }).join("\n");
    }
    M.svg.addEventListener("keydown", function (e) { if ((e.key === "Enter" || e.key === " ") && e.target.getAttribute("data-f") !== null) { e.preventDefault(); e.target.dispatchEvent(new MouseEvent("click", { bubbles: true })); } });
    pintar();
  };

  // ---------- S6 Kirchhoff de dos mallas ----------
  function kirchhoff(V1, V2, R1, R2, R3) { var Vn = (V1 / R1 + V2 / R2) / (1 / R1 + 1 / R2 + 1 / R3); return { Vn: Vn, I1: (V1 - Vn) / R1, I2: (V2 - Vn) / R2, I3: Vn / R3 }; }
  SIMS._kirchhoff = kirchhoff;
  SIMS.S6 = function (cont) {
    var M = U.marco(cont, "0 0 560 280", "Circuito de dos mallas con dos fuentes"), v = { V1: 12, V2: 6, R1: 2, R2: 4, R3: 6 };
    [["V1", "V₁", 0, 24, 1, "V"], ["V2", "V₂", 0, 24, 1, "V"], ["R1", "R₁", 1, 20, 1, "Ω"], ["R2", "R₂", 1, 20, 1, "Ω"], ["R3", "R₃", 1, 20, 1, "Ω"]].forEach(function (c) { U.rango(M.ctr, { et: c[1], min: c[2], max: c[3], paso: c[4], val: v[c[0]], fmt: function (x) { return f(x) + " " + c[5]; }, cambio: function (x) { v[c[0]] = x; pintar(); } }); });
    function pintar() {
      var r = kirchhoff(v.V1, v.V2, v.R1, v.R2, v.R3), c = "var(--carga-pos)";
      var s = U.cable("M60 50 H500 M60 240 H500 M60 50 V240 M280 50 V240 M500 50 V240") + U.pila(60, 180, "V₁ = " + v.V1 + " V") + U.pila(500, 180, "V₂ = " + v.V2 + " V") + U.resistor(170, 50, false, "R₁ = " + v.R1 + " Ω") + U.resistor(390, 50, false, "R₂ = " + v.R2 + " Ω") + U.resistor(280, 150, true, "R₃ = " + v.R3 + " Ω");
      s += '<circle cx="280" cy="50" r="5" fill="currentColor"/><text x="285" y="40" font-size="12" fill="currentColor">nodo A</text>';
      s += (r.I1 >= 0 ? U.flecha(95, 70, 140, 70, c) : U.flecha(140, 70, 95, 70, c)) + '<text x="100" y="92" font-size="12" fill="currentColor">I₁ = ' + f(Math.abs(r.I1)) + " A</text>";
      s += (r.I2 >= 0 ? U.flecha(465, 70, 420, 70, c) : U.flecha(420, 70, 465, 70, c)) + '<text x="405" y="92" font-size="12" fill="currentColor">I₂ = ' + f(Math.abs(r.I2)) + " A</text>";
      s += (r.I3 >= 0 ? U.flecha(300, 190, 300, 225, c) : U.flecha(300, 225, 300, 190, c)) + '<text x="306" y="215" font-size="12" fill="currentColor">I₃ = ' + f(Math.abs(r.I3)) + " A</text>";
      M.svg.innerHTML = s;
      M.lec.textContent = "Voltaje del nodo A = " + f(r.Vn) + " V\nI₁ = " + f(r.I1) + " A · I₂ = " + f(r.I2) + " A · I₃ = " + f(r.I3) + " A (un signo negativo indica que la corriente va al revés de lo supuesto)\n" +
        "LCK en A: I₁ + I₂ = " + f(r.I1 + r.I2) + " A = I₃ = " + f(r.I3) + " A ✓\n" +
        "LVK malla izquierda: V₁ − I₁·R₁ − I₃·R₃ = " + f(v.V1) + " − " + f(r.I1 * v.R1) + " − " + f(r.I3 * v.R3) + " = " + f(v.V1 - r.I1 * v.R1 - r.I3 * v.R3) + " V ✓\n" +
        "LVK malla derecha: V₂ − I₂·R₂ − I₃·R₃ = " + f(v.V2 - r.I2 * v.R2 - r.I3 * v.R3) + " V ✓";
    }
    pintar();
  };

  // ---------- S14 Tablero interactivo ----------
  SIMS.S14 = function (cont) {
    var V = (window.PROGRESO && window.PROGRESO.pref("red") === "230") ? 230 : 127;
    var circ = [
      { n: "Iluminación", A: 15, ap: [["6 focos LED", 54], ["Lámpara de escritorio", 40]] },
      { n: "Contactos de sala", A: 20, ap: [["Televisor", 120], ["Consola de videojuegos", 150], ["Calefactor eléctrico", 1500], ["Aspiradora", 1200]] },
      { n: "Cocina", A: 20, ap: [["Refrigerador", 200], ["Microondas", 1200], ["Hervidor", 1500], ["Tostador", 900]] },
      { n: "Baño", A: 20, ap: [["Secadora de cabello", 1500], ["Rasuradora", 15]], fuga: true }
    ];
    var on = circ.map(function (c) { return c.ap.map(function () { return false; }); }), dispar = circ.map(function () { return false; }), difOn = true, difDisp = false, fuga = false, conDif = true;
    var M = U.marco(cont, "0 0 560 300", "Tablero eléctrico con cuatro circuitos");
    var panel = U.el("div", "ctrl"); M.ctr.appendChild(panel);
    function pintarCtr() {
      panel.innerHTML = '<p class="estado" style="margin:.2rem 0">Red de ' + V + " V. Enciende aparatos en cada circuito:</p>" + circ.map(function (c, i) { return "<p style=\"margin:.4rem 0\"><b>" + c.n + " (" + c.A + " A)</b><br>" + c.ap.map(function (a, k) { return '<label style="display:inline-block;font-weight:400;margin-right:.6rem"><input type="checkbox" data-c="' + i + '" data-k="' + k + '"' + (on[i][k] ? " checked" : "") + "> " + a[0] + " (" + a[1] + " W)</label>"; }).join("") + "</p>"; }).join("") +
        '<p><label style="font-weight:400"><input type="checkbox" class="condif"' + (conDif ? " checked" : "") + '> Hay interruptor diferencial (protege el baño)</label></p><div class="botones"><button type="button" class="btn sec" data-a="fuga">' + (fuga ? "Quitar la fuga" : "Simular fuga a tierra en el baño (30 mA por una persona)") + '</button><button type="button" class="btn" data-a="rearmar">Rearmar interruptores</button></div>';
    }
    panel.addEventListener("change", function (e) { if (e.target.classList.contains("condif")) conDif = e.target.checked; else on[+e.target.getAttribute("data-c")][+e.target.getAttribute("data-k")] = e.target.checked; calc(); });
    panel.addEventListener("click", function (e) { var a = e.target.getAttribute("data-a"); if (a === "fuga") { fuga = !fuga; pintarCtr(); } if (a === "rearmar") { dispar = circ.map(function () { return false; }); difDisp = false; } if (a) calc(); });
    function calc() {
      var msg = [], I = circ.map(function (c, i) { return c.ap.reduce(function (s, a, k) { return s + (on[i][k] ? a[1] : 0); }, 0) / V; });
      I.forEach(function (x, i) { if (x > circ[i].A && !dispar[i]) { dispar[i] = true; msg.push("⚡ El termomagnético de «" + circ[i].n + "» se disparó: " + f(x) + " A > " + circ[i].A + " A (sobrecarga)."); } });
      if (fuga && conDif && !difDisp) { difDisp = true; msg.push("⚡ El diferencial detectó 30 mA que se van a tierra (por la persona) y cortó el baño en menos de 30 ms."); }
      if (fuga && !conDif) msg.push("⚠ ¡Peligro! Sin diferencial, la corriente de fuga sigue pasando por la persona: el termomagnético no la detecta porque es muy pequeña.");
      var s = '<rect x="10" y="10" width="540" height="280" rx="12" fill="none" stroke="currentColor" stroke-width="2"/><text x="30" y="36" font-size="13" font-weight="700" fill="currentColor">Tablero · ' + V + " V</text>";
      circ.forEach(function (c, i) {
        var x = 40 + i * 128, abierto = dispar[i] || (c.fuga && conDif && difDisp), corr = abierto ? 0 : I[i], pct = Math.min(1.3, corr / c.A);
        s += '<rect x="' + x + '" y="60" width="90" height="130" rx="8" style="fill:var(--panel2)" stroke="currentColor"/><text x="' + (x + 45) + '" y="80" text-anchor="middle" font-size="12" fill="currentColor">' + c.A + ' A</text><rect x="' + (x + 33) + '" y="' + (abierto ? 140 : 95) + '" width="24" height="35" rx="4" style="fill:' + (abierto ? "var(--no)" : "var(--ok)") + '"/><text x="' + (x + 45) + '" y="210" text-anchor="middle" font-size="11" fill="currentColor">' + c.n + '</text><text x="' + (x + 45) + '" y="228" text-anchor="middle" font-size="12" fill="currentColor">' + (abierto ? "DISPARADO" : f(corr) + " A") + '</text><rect x="' + x + '" y="240" width="90" height="10" rx="4" style="fill:var(--bg)" stroke="currentColor" stroke-width=".5"/><rect x="' + x + '" y="240" width="' + (90 * Math.min(1, pct)).toFixed(1) + '" height="10" rx="4" style="fill:' + (pct > 1 ? "var(--no)" : pct > 0.8 ? "var(--volt)" : "var(--ok)") + '"/>';
      });
      if (conDif) s += '<text x="300" y="36" font-size="12" fill="currentColor">Diferencial: ' + (difDisp ? "DISPARADO" : "en servicio") + "</text>";
      M.svg.innerHTML = s;
      M.lec.textContent = circ.map(function (c, i) { return c.n + ": " + f(I[i]) + " A de " + c.A + " A" + (dispar[i] ? " → disparado" : ""); }).join("\n") + (msg.length ? "\n" + msg.join("\n") : "");
    }
    pintarCtr(); calc();
  };

  // ---------- S15 Multímetro virtual ----------
  var CIRCUITOS15 = {
    aa: { n: "Pila AA nueva", V: 1.58, tipo: "fuente" }, p9: { n: "Pila de 9 V gastada", V: 7.2, tipo: "fuente" },
    r47: { n: "Resistencia de 4,7 kΩ (sin energía)", R: 4620, tipo: "pasivo" }, cb: { n: "Cable en buen estado", R: 0.3, tipo: "pasivo" }, cr: { n: "Cable roto por dentro", R: Infinity, tipo: "pasivo" },
    led: { n: "Circuito: pila de 9 V + resistencia + LED", V: 9, I: 0.0182, Vled: 2.0, tipo: "circuito" }, red: { n: "Contacto de pared (solo simulado)", Vac: 127, tipo: "red" }
  };
  function medir(func, borne, circ, modo, fus) {
    var c = CIRCUITOS15[circ];
    if (func === "off") return { d: "", m: "El multímetro está apagado." };
    if (fus && (func === "A")) return { d: "0.000", m: "El fusible interno está fundido: no mide corriente. Cámbialo por uno igual (o pulsa «Cambiar fusible»)." };
    if (borne === "10A" && func !== "A") return { d: "0.00", m: "⚠ La punta roja está en el borne de 10 A. Para medir voltaje o resistencia ponla en VΩmA. Si midieras voltaje así harías un cortocircuito." };
    if (func === "A") {
      if (modo === "paralelo" && (c.tipo === "fuente" || c.tipo === "circuito" || c.tipo === "red")) return { d: "FUS", m: "💥 ¡Cortocircuito! En modo corriente el multímetro casi no tiene resistencia: al ponerlo en paralelo con una fuente se fundió el fusible interno. La corriente se mide siempre en serie.", fundir: true };
      if (c.tipo === "circuito") return { d: (c.I * 1000).toFixed(1) + " mA", m: "Correcto: abriste el circuito y pusiste el multímetro en serie. Circulan unos " + f(c.I * 1000, 1) + " mA." };
      return { d: "0.0 mA", m: "No circula corriente: este elemento no forma un circuito cerrado con una fuente." };
    }
    if (modo === "serie") return { d: "—", m: "Para medir voltaje, resistencia o continuidad las puntas se apoyan en los dos extremos (en paralelo), sin abrir el circuito." };
    if (func === "Vcd") {
      if (c.tipo === "fuente") return { d: c.V.toFixed(2) + " V", m: c.V < 8 && c.V > 5 ? "Una pila de 9 V que marca 7,2 V está casi agotada." : "Pila en buen estado." };
      if (c.tipo === "circuito") return { d: c.Vled.toFixed(2) + " V", m: "Mediste el voltaje en el LED: unos 2 V. En la resistencia caen los otros 7 V (LVK)." };
      if (c.tipo === "red") return { d: "0.3 V", m: "En modo V⎓ (CD) la corriente alterna da una lectura casi nula y sin sentido. Además, medir la red es trabajo de profesionales con equipo CAT III." };
      return { d: "0.00 V", m: "Este elemento no tiene voltaje: no hay fuente." };
    }
    if (func === "Vca") {
      if (c.tipo === "red") return { d: c.Vac.toFixed(0) + " V", m: "Lectura del voltaje eficaz de la red (simulado). ⚠ En la vida real esto solo lo hace una persona capacitada con un multímetro de categoría CAT III o superior y puntas en buen estado." };
      return { d: "0.0 V", m: "En V~ (CA) una pila marca casi 0: su voltaje es de corriente directa." };
    }
    if (func === "ohm" || func === "cont") {
      if (c.tipo !== "pasivo") return { d: "Err", m: "⚠ Nunca midas resistencia ni continuidad con el circuito energizado: la lectura es falsa y puedes dañar el multímetro. Desconecta la fuente primero." };
      if (func === "ohm") return { d: isFinite(c.R) ? (c.R >= 1000 ? (c.R / 1000).toFixed(2) + " kΩ" : c.R.toFixed(1) + " Ω") : "OL", m: isFinite(c.R) ? (circ === "r47" ? "4,62 kΩ está dentro de la tolerancia de ±5 % (4,47–4,94 kΩ): la resistencia está bien." : "Resistencia casi nula: el cable conduce bien.") : "OL (fuera de rango): resistencia infinita. El cable está cortado." };
      return { d: c.R < 30 ? "🔊 0.3" : "OL", m: c.R < 30 ? "Pitido: hay continuidad." : "Sin pitido: no hay continuidad (circuito abierto)." };
    }
    return { d: "", m: "" };
  }
  SIMS._medir = medir;
  SIMS.S15 = function (cont) {
    var func = "Vcd", borne = "VOm", circ = "aa", modo = "paralelo", fus = false;
    var M = U.marco(cont, "0 0 360 360", "Multímetro digital virtual");
    U.chips(M.ctr, "Perilla (función)", [["off", "Apagado"], ["Vcd", "V⎓"], ["Vca", "V~"], ["ohm", "Ω"], ["cont", "Continuidad"], ["A", "A (mA)"]], func, function (v) { func = v; pintar(); });
    U.chips(M.ctr, "Punta roja en el borne", [["VOm", "VΩmA"], ["10A", "10 A"]], borne, function (v) { borne = v; pintar(); });
    var sw = U.el("div", "ctrl"); sw.innerHTML = '<label>¿Qué vas a medir?<select class="s15c">' + Object.keys(CIRCUITOS15).map(function (k) { return '<option value="' + k + '">' + CIRCUITOS15[k].n + "</option>"; }).join("") + "</select></label>"; M.ctr.appendChild(sw);
    sw.querySelector("select").onchange = function (e) { circ = e.target.value; pintar(); };
    U.chips(M.ctr, "Cómo conectas las puntas", [["paralelo", "En los dos extremos (paralelo)"], ["serie", "Abriendo el circuito (serie)"]], modo, function (v) { modo = v; pintar(); });
    var bw = U.el("div", "ctrl"); M.ctr.appendChild(bw); U.boton(bw, "Cambiar fusible", function () { fus = false; pintar(); });
    function pintar() {
      var r = medir(func, borne, circ, modo, fus); if (r.fundir) fus = true;
      var ang = { off: -70, Vcd: -40, Vca: -10, ohm: 20, cont: 45, A: 75 }[func];
      var s = '<rect x="60" y="10" width="240" height="340" rx="20" style="fill:var(--panel2)" stroke="currentColor" stroke-width="2"/><rect x="85" y="30" width="190" height="70" rx="6" style="fill:#c8d8b0" stroke="currentColor"/><text x="265" y="80" text-anchor="end" font-size="30" font-family="monospace" fill="#1a2410">' + r.d + "</text>";
      s += '<circle cx="180" cy="185" r="55" style="fill:var(--bg)" stroke="currentColor" stroke-width="2"/><line x1="180" y1="185" x2="' + (180 + 48 * Math.sin(ang * Math.PI / 180)).toFixed(1) + '" y2="' + (185 - 48 * Math.cos(ang * Math.PI / 180)).toFixed(1) + '" stroke="currentColor" stroke-width="6" stroke-linecap="round"/>';
      [["OFF", -70], ["V⎓", -40], ["V~", -10], ["Ω", 20], ["🔊", 45], ["A", 75]].forEach(function (p) { s += '<text x="' + (180 + 72 * Math.sin(p[1] * Math.PI / 180)).toFixed(1) + '" y="' + (190 - 72 * Math.cos(p[1] * Math.PI / 180)).toFixed(1) + '" text-anchor="middle" font-size="12" fill="currentColor">' + p[0] + "</text>"; });
      [["10A", 110, borne === "10A"], ["COM", 180, true], ["VΩmA", 250, borne === "VOm"]].forEach(function (b) { s += '<circle cx="' + b[1] + '" cy="300" r="13" fill="none" stroke="currentColor" stroke-width="2"/><text x="' + b[1] + '" y="335" text-anchor="middle" font-size="11" fill="currentColor">' + b[0] + "</text>"; if (b[2]) s += '<circle cx="' + b[1] + '" cy="300" r="7" style="fill:' + (b[0] === "COM" ? "#222" : "var(--fase)") + '"/>'; });
      if (fus) s += '<text x="180" y="125" text-anchor="middle" font-size="12" style="fill:var(--no)">FUSIBLE FUNDIDO</text>';
      M.svg.innerHTML = s; M.lec.textContent = "Pantalla: " + (r.d || "(apagada)") + "\n" + r.m;
    }
    pintar();
  };

  // ---------- S18 LED y su resistencia ----------
  var LEDS = { rojo: [2.0, "#ef4444"], amarillo: [2.1, "#facc15"], verde: [2.2, "#22c55e"], azul: [3.2, "#3b82f6"], blanco: [3.2, "#f8fafc"] };
  SIMS._led = function (Vs, Vf, R) { if (R <= 0) return { I: Infinity, quemado: Vs > Vf }; var I = Vs > Vf ? (Vs - Vf) / R : 0; return { I: I, quemado: I > 0.03 }; };
  SIMS.S18 = function (cont) {
    var Vs = 9, col = "rojo", R = 390, quem = false, M = U.marco(cont, "0 0 520 240", "Circuito con LED y resistencia");
    U.rango(M.ctr, { et: "Voltaje de la fuente", min: 1.5, max: 12, paso: 0.5, val: Vs, fmt: function (x) { return f(x) + " V"; }, cambio: function (x) { Vs = x; pintar(); } });
    U.chips(M.ctr, "Color del LED", Object.keys(LEDS).map(function (k) { return [k, k + " (" + f(LEDS[k][0]) + " V)"]; }), col, function (v) { col = v; pintar(); });
    var opts = [0, 47, 100, 150, 220, 330, 390, 470, 680, 1000, 2200, 4700];
    U.rango(M.ctr, { et: "Resistencia (valores comerciales)", min: 0, max: opts.length - 1, val: opts.indexOf(390), fmt: function (k) { return opts[k] ? fu(opts[k], "Ω") : "sin resistencia"; }, cambio: function (k) { R = opts[k]; pintar(); } });
    var bw = U.el("div", "ctrl"); M.ctr.appendChild(bw); U.boton(bw, "Poner un LED nuevo", function () { quem = false; pintar(); });
    function pintar() {
      var Vf = LEDS[col][0], r = SIMS._led(Vs, Vf, R); if (r.quemado) quem = true;
      var I = quem ? 0 : r.I, b = Math.min(1, I / 0.02);
      var s = U.cable("M70 50 H450 V190 H70 Z") + U.pila(70, 120, f(Vs) + " V") + (R ? U.resistor(220, 50, false, fu(R, "Ω")) : '<text x="220" y="40" text-anchor="middle" font-size="12" fill="currentColor">sin resistencia</text>');
      s += '<g transform="translate(450,120) rotate(90)"><circle r="' + (14 + 16 * b) + '" style="fill:' + LEDS[col][1] + '" opacity="' + (0.6 * b) + '"/><path d="M-12 -12 L-12 12 L10 0 Z" style="fill:' + (quem ? "#555" : LEDS[col][1]) + '" stroke="currentColor" stroke-width="2"/><line x1="10" y1="-12" x2="10" y2="12" stroke="currentColor" stroke-width="2.5"/></g>';
      if (quem) s += '<text x="470" y="80" font-size="22">💨</text>';
      M.svg.innerHTML = s;
      M.lec.textContent = quem ? "💥 El LED se quemó: la corriente era de " + (isFinite(r.I) ? fu(r.I, "A") : "muchísimos amperios (sin resistencia que la limite)") + ", más que el máximo de unos 30 mA. Pon una resistencia mayor y un LED nuevo." :
        "Corriente = (" + f(Vs) + " − " + f(Vf) + ") / " + f(R) + " = " + fu(I, "A") + (Vs <= Vf ? "\nLa fuente no supera el voltaje del LED: no enciende." : I < 0.005 ? "\nBrilla poco: la corriente es pequeña." : I <= 0.021 ? "\nCorriente adecuada (unos 20 mA o menos)." : "\nCorriente alta: el LED sufre y se acorta su vida.") + "\nResistencia ideal para 20 mA: " + (Vs > Vf ? fu((Vs - Vf) / 0.02, "Ω") : "—");
    }
    pintar();
  };

  // ---------- S19 Transistor como interruptor ----------
  SIMS._transistor = function (cerrado, Rb, beta, Vcc, Rc) { var Ib = cerrado ? Math.max(0, (5 - 0.7) / Rb) : 0, Isat = (Vcc - 0.2) / Rc, Ic = Math.min(beta * Ib, Isat); return { Ib: Ib, Ic: Ic, sat: beta * Ib >= Isat }; };
  SIMS.S19 = function (cont) {
    var cerrado = false, Rb = 10000, M = U.marco(cont, "0 0 520 280", "Transistor NPN como interruptor");
    U.chips(M.ctr, "Interruptor de la base (control de 5 V)", [["no", "Abierto"], ["si", "Cerrado"]], "no", function (v) { cerrado = v === "si"; pintar(); });
    var ops = [1000, 2200, 4700, 10000, 22000, 47000, 100000, 470000];
    U.rango(M.ctr, { et: "Resistencia de base Rb", min: 0, max: ops.length - 1, val: 3, fmt: function (k) { return fu(ops[k], "Ω"); }, cambio: function (k) { Rb = ops[k]; pintar(); } });
    function pintar() {
      var r = SIMS._transistor(cerrado, Rb, 100, 9, 330), b = Math.min(1, r.Ic / 0.026);
      var s = '<text x="40" y="30" font-size="12" fill="currentColor">Control 5 V</text>' + U.cable("M60 60 H120") + '<circle cx="120" cy="60" r="3" fill="currentColor"/><circle cx="160" cy="60" r="3" fill="currentColor"/>' + (cerrado ? U.cable("M120 60 H160") : U.cable("M120 60 L156 44")) + U.resistor(210, 60, false, "Rb " + fu(Rb, "Ω")) + U.cable("M160 60 H185 M235 60 H270 V140 H300");
      s += '<circle cx="320" cy="140" r="28" fill="none" stroke="currentColor" stroke-width="2"/><line x1="300" y1="120" x2="300" y2="160" stroke="currentColor" stroke-width="3"/>' + U.cable("M300 130 L330 112 V60 M300 150 L330 168 V240") + U.flecha(310, 156, 328, 167, "currentColor", 2) + '<text x="355" y="145" font-size="11" fill="currentColor">NPN</text><text x="336" y="100" font-size="11" fill="currentColor">C</text><text x="276" y="135" font-size="11" fill="currentColor">B</text><text x="336" y="190" font-size="11" fill="currentColor">E</text>';
      s += U.cable("M330 60 H430 V40") + '<text x="440" y="36" font-size="12" fill="currentColor">+9 V</text>' + U.foco(380, 60, b, false, "LED + 330 Ω") + U.cable("M60 240 H460") + '<text x="470" y="244" font-size="12" fill="currentColor">0 V</text>';
      if (r.Ib > 0) s += U.flecha(240, 75, 270, 75, "var(--elec)", 2);
      if (r.Ic > 0) s += U.flecha(345, 70, 345, 105, "var(--carga-pos)", 3);
      M.svg.innerHTML = s;
      M.lec.textContent = "Rb = " + fu(Rb, "Ω") + " · Corriente de base Ib = " + fu(r.Ib, "A") + " · Corriente de colector Ic = " + fu(r.Ic, "A") + " (ganancia β = 100)\n" + (!cerrado ? "Sin corriente de base el transistor está en corte: interruptor abierto, el LED está apagado." : r.sat ? "Saturación: el transistor conduce todo lo que permite la carga. Funciona como interruptor cerrado." : "Zona activa: Ic = β·Ib todavía es menor que el máximo; el LED brilla menos. Baja Rb para saturarlo.");
    }
    pintar();
  };

  // ---------- S20 Puertas lógicas ----------
  var PUERTAS = { AND: function (a, b) { return a && b; }, OR: function (a, b) { return a || b; }, NOT: function (a) { return !a; }, NAND: function (a, b) { return !(a && b); }, NOR: function (a, b) { return !(a || b); }, XOR: function (a, b) { return a !== b; } };
  SIMS._puertas = PUERTAS;
  SIMS.S20 = function (cont) {
    var g = "AND", A = false, Bv = false, M = U.marco(cont, "0 0 520 220", "Puerta lógica con dos entradas y una salida");
    U.chips(M.ctr, "Puerta", Object.keys(PUERTAS).map(function (k) { return [k, k]; }), g, function (v) { g = v; pintar(); });
    var bw = U.el("div", "ctrl botones"); M.ctr.appendChild(bw);
    var bA = U.boton(bw, "Entrada A: 0", function () { A = !A; pintar(); }), bB = U.boton(bw, "Entrada B: 0", function () { Bv = !Bv; pintar(); });
    function pintar() {
      var uno = g === "NOT", sal = PUERTAS[g](A, Bv); bA.textContent = "Entrada A: " + (A ? 1 : 0); bB.textContent = "Entrada B: " + (Bv ? 1 : 0); bB.disabled = uno;
      var s = U.cable("M60 " + (uno ? 110 : 80) + " H200", A ? "var(--volt)" : "currentColor", 3) + (uno ? "" : U.cable("M60 140 H200", Bv ? "var(--volt)" : "currentColor", 3));
      s += '<text x="40" y="' + (uno ? 115 : 85) + '" font-size="16" fill="currentColor">A=' + (A ? 1 : 0) + "</text>" + (uno ? "" : '<text x="40" y="145" font-size="16" fill="currentColor">B=' + (Bv ? 1 : 0) + "</text>");
      s += '<rect x="200" y="60" width="120" height="100" rx="14" style="fill:var(--panel2)" stroke="currentColor" stroke-width="2"/><text x="260" y="117" text-anchor="middle" font-size="20" font-weight="700" fill="currentColor">' + g + "</text>" + U.cable("M320 110 H420", sal ? "var(--volt)" : "currentColor", 3) + U.foco(450, 110, sal ? 1 : 0, false, "Salida = " + (sal ? 1 : 0));
      M.svg.innerHTML = s;
      var filas = uno ? [[0], [1]] : [[0, 0], [0, 1], [1, 0], [1, 1]];
      M.lec.textContent = "Tabla de verdad de " + g + ":\n" + (uno ? "A | Salida" : "A B | Salida") + "\n" + filas.map(function (r) { var o = PUERTAS[g](!!r[0], !!r[1]) ? 1 : 0, act = uno ? (!!r[0] === A) : (!!r[0] === A && !!r[1] === Bv); return r.join(" ") + " |   " + o + (act ? "   ← ahora" : ""); }).join("\n");
    }
    pintar();
  };

  // ---------- S21 Interruptor de escalera ----------
  SIMS.S21 = function (cont) {
    var s1 = 0, s2 = 0, M = U.marco(cont, "0 0 520 240", "Dos conmutadores de escalera controlando un foco");
    var bw = U.el("div", "ctrl botones"); M.ctr.appendChild(bw);
    var b1 = U.boton(bw, "Cambiar conmutador de abajo", function () { s1 = 1 - s1; pintar(); }), b2 = U.boton(bw, "Cambiar conmutador de arriba", function () { s2 = 1 - s2; pintar(); });
    function pintar() {
      var on = s1 === s2, cf = "var(--fase)", ca = "var(--volt)";
      var s = '<text x="30" y="30" font-size="12" fill="currentColor">Fase</text>' + U.cable("M30 120 H100", cf, 3) + '<circle cx="100" cy="120" r="5" fill="currentColor"/>';
      s += U.cable("M100 120 L150 " + (s1 ? 150 : 90), cf, 3) + '<circle cx="150" cy="90" r="4" fill="currentColor"/><circle cx="150" cy="150" r="4" fill="currentColor"/>';
      s += U.cable("M150 90 H330", s1 === 0 ? cf : ca, 3) + U.cable("M150 150 H330", s1 === 1 ? cf : ca, 3) + '<text x="200" y="82" font-size="11" fill="currentColor">viajero 1</text><text x="200" y="170" font-size="11" fill="currentColor">viajero 2</text>';
      s += '<circle cx="330" cy="90" r="4" fill="currentColor"/><circle cx="330" cy="150" r="4" fill="currentColor"/>' + U.cable("M330 " + (s2 ? 150 : 90) + " L380 120", on ? cf : ca, 3) + '<circle cx="380" cy="120" r="5" fill="currentColor"/>' + U.cable("M380 120 H430", on ? cf : "currentColor", 3);
      s += U.foco(450, 120, on ? 1 : 0, false, on ? "Encendido" : "Apagado") + U.cable("M465 120 H500 V210 H30", "var(--neutro)", 3) + '<text x="30" y="225" font-size="12" fill="currentColor">Neutro</text><text x="85" y="205" font-size="12" fill="currentColor">Abajo</text><text x="335" y="205" font-size="12" fill="currentColor">Arriba</text>';
      M.svg.innerHTML = s; b1.setAttribute("aria-label", "Conmutador de abajo en posición " + (s1 + 1)); b2.setAttribute("aria-label", "Conmutador de arriba en posición " + (s2 + 1));
      M.lec.textContent = "Conmutador de abajo: posición " + (s1 + 1) + " · de arriba: posición " + (s2 + 1) + " → foco " + (on ? "ENCENDIDO" : "apagado") + "\nEl foco enciende cuando los dos conmutadores eligen el mismo cable «viajero». Cambiar cualquiera de los dos invierte el estado.";
    }
    pintar();
  };
})();
