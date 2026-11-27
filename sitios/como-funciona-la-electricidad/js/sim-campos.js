// Simulaciones de cargas, campos, ondas y máquinas: S1, S2, S7, S8, S9, S10, S11, S13.
(function () {
  "use strict";
  var U = window.SIMU, N = window.NUM, f = N.fmt, fu = N.fmtU, reducido = U.reducido;

  // ---------- S1 Globo y estática ----------
  SIMS.S1 = function (cont) {
    var carga = 0, dist = 120, obj = "papel", M = U.marco(cont, "0 0 560 280", "Globo, cabello y papelitos con cargas eléctricas"), t0 = 0;
    var bw = U.el("div", "ctrl botones"); M.ctr.appendChild(bw);
    U.boton(bw, "Frotar el globo contra el cabello", function () { carga = Math.min(20, carga + 4); }, "");
    U.boton(bw, "Descargar (tocar un grifo metálico)", function () { carga = 0; });
    U.rango(M.ctr, { et: "Distancia del globo al objeto", min: 30, max: 220, val: dist, fmt: function (x) { return f(x / 10) + " cm"; }, cambio: function (x) { dist = x; } });
    U.chips(M.ctr, "Objeto", [["papel", "Papelitos"], ["agua", "Hilo de agua"]], obj, function (v) { obj = v; });
    U.bucle(M.svg, function (dt, t) {
      var fuerza = carga * 400 / (dist * dist) * 10, s = "", bx = 330 - (220 - dist) * 0.2;
      s += '<ellipse cx="80" cy="90" rx="55" ry="45" style="fill:#8b5a2b" opacity=".7"/><text x="80" y="160" text-anchor="middle" font-size="12" fill="currentColor">cabello</text>';
      for (var k = 0; k < carga; k++) s += '<text x="' + (40 + (k % 5) * 18) + '" y="' + (72 + Math.floor(k / 5) * 14) + '" font-size="14" font-weight="700" style="fill:var(--carga-pos)">+</text>';
      var gx = 240; s += '<ellipse cx="' + gx + '" cy="110" rx="48" ry="60" style="fill:#ef4444" opacity=".85"/><path d="M' + gx + " 170 q -6 30 6 60" + '" fill="none" stroke="currentColor"/>';
      for (var j = 0; j < carga; j++) s += '<text x="' + (gx - 30 + (j % 5) * 14) + '" y="' + (85 + Math.floor(j / 5) * 16) + '" font-size="15" font-weight="700" fill="#fff">−</text>';
      var ox = gx + 48 + dist;
      if (obj === "papel") {
        for (var p = 0; p < 6; p++) { var sube = Math.min(1, fuerza / (0.6 + p * 0.25)), y = 250 - sube * (150 - p * 8) + (reducido ? 0 : Math.sin(t * 6 + p) * 2 * sube), x = ox + (p - 3) * 10 - sube * dist * 0.6; s += '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="10" height="7" style="fill:var(--panel)" stroke="currentColor" transform="rotate(' + (p * 25) + " " + (x + 5).toFixed(1) + " " + (y + 3).toFixed(1) + ')"/>'; }
        s += '<line x1="' + (ox - 60) + '" y1="262" x2="' + (ox + 60) + '" y2="262" stroke="currentColor"/>';
      } else {
        var desv = Math.min(60, fuerza * 25); s += '<rect x="' + (ox - 14) + '" y="10" width="28" height="18" style="fill:var(--panel2)" stroke="currentColor"/><path d="M' + ox + " 28 Q " + (ox - desv) + " 140 " + (ox - desv * 0.7) + ' 270" fill="none" style="stroke:var(--neutro)" stroke-width="5"/>';
      }
      M.svg.innerHTML = s;
      M.lec.textContent = "Distancia: " + f(dist / 10) + " cm · Electrones pasados al globo: " + carga * 50 + " mil millones (aprox.) · " + (carga ? "El globo quedó con carga negativa y el cabello con carga positiva." : "Globo neutro: tiene igual número de protones que de electrones.") +
        "\n" + (carga === 0 ? "Sin carga no hay atracción." : fuerza > 0.6 ? "El globo atrae al " + (obj === "papel" ? "papel" : "agua") + ": sus cargas se polarizan (las positivas se acercan al globo)." : "Atracción débil: acerca más el globo o frótalo más.");
    });
  };

  // ---------- S2 Ley de Coulomb (con carga que se arrastra) ----------
  SIMS.S2 = function (cont) {
    var q1 = 2, q2 = -2, r = 0.3, M = U.marco(cont, "0 0 560 220", "Dos cargas eléctricas y la fuerza entre ellas");
    var rq1 = U.rango(M.ctr, { et: "Carga q₁", min: -5, max: 5, paso: 0.5, val: q1, fmt: function (x) { return f(x) + " µC"; }, cambio: function (x) { q1 = x; pintar(); } });
    U.rango(M.ctr, { et: "Carga q₂", min: -5, max: 5, paso: 0.5, val: q2, fmt: function (x) { return f(x) + " µC"; }, cambio: function (x) { q2 = x; pintar(); } });
    var rr = U.rango(M.ctr, { et: "Distancia r (también puedes arrastrar q₂)", min: 0.05, max: 1, paso: 0.01, val: r, fmt: function (x) { return f(x) + " m"; }, cambio: function (x) { r = x; pintar(); } });
    var arr = false;
    function px(rr2) { return 90 + rr2 * 420; }
    M.svg.addEventListener("pointerdown", function (e) { if (e.target.closest("[data-q2]")) { arr = true; M.svg.setPointerCapture(e.pointerId); } });
    M.svg.addEventListener("pointermove", function (e) { if (!arr) return; var b = M.svg.getBoundingClientRect(), x = (e.clientX - b.left) * 560 / b.width; r = Math.max(0.05, Math.min(1, (x - 90) / 420)); rr.poner(Math.round(r * 100) / 100); pintar(); });
    M.svg.addEventListener("pointerup", function () { arr = false; });
    function pintar() {
      var F = window.CALC.F.coulomb(q1 * 1e-6, q2 * 1e-6, r), tipo = q1 * q2 < 0 ? "atracción" : q1 * q2 > 0 ? "repulsión" : "ninguna", L = F > 0 ? Math.min(110, 18 + 22 * Math.log10(1 + F * 10)) : 0;
      var x1 = 90, x2 = px(r), s = '<line x1="40" y1="110" x2="530" y2="110" stroke="currentColor" opacity=".25"/>';
      function carga(x, q, attr) { var col = q > 0 ? "var(--carga-pos)" : q < 0 ? "var(--carga-neg)" : "var(--muted)"; return "<g " + (attr || "") + ' style="cursor:grab"><circle cx="' + x + '" cy="110" r="' + (14 + Math.abs(q) * 3) + '" style="fill:' + col + '"/><text x="' + x + '" y="116" text-anchor="middle" font-size="16" font-weight="700" fill="#fff">' + (q > 0 ? "+" : q < 0 ? "−" : "0") + "</text></g>"; }
      if (L) { var d = tipo === "atracción" ? 1 : -1; s += U.flecha(x1, 60, x1 + d * L, 60, "var(--volt)", 4) + U.flecha(x2, 60, x2 - d * L, 60, "var(--volt)", 4); }
      s += carga(x1, q1) + carga(x2, q2, 'data-q2="1"') + '<text x="' + ((x1 + x2) / 2) + '" y="150" text-anchor="middle" font-size="12" fill="currentColor">r = ' + f(r) + " m</text>";
      M.svg.innerHTML = s;
      M.lec.textContent = "F = k·|q₁·q₂| / r² = 8,99·10⁹ × " + f(Math.abs(q1)) + "·10⁻⁶ × " + f(Math.abs(q2)) + "·10⁻⁶ / " + f(r) + "² = " + f(F) + " N (" + tipo + ")\nSi duplicas la distancia, la fuerza se reduce a la cuarta parte (ley de la inversa del cuadrado).";
    }
    rq1.addEventListener("input", function () { }); pintar();
  };

  // ---------- S7 Osciloscopio virtual ----------
  SIMS.S7 = function (cont) {
    var tipo = "ca", red = (window.PROGRESO && window.PROGRESO.pref("red") === "230") ? 230 : 127, Vrms = red, fr = red === 230 ? 50 : 60, M = U.marco(cont, "0 0 560 300", "Pantalla de osciloscopio con una señal");
    U.chips(M.ctr, "Señal", [["cd", "Corriente directa"], ["ca", "Corriente alterna"], ["media", "Rectificada media onda"], ["completa", "Rectificada onda completa"]], tipo, function (v) { tipo = v; pintar(); });
    U.rango(M.ctr, { et: "Voltaje eficaz (RMS) o de CD", min: 1, max: 240, val: Vrms, fmt: function (x) { return x + " V"; }, cambio: function (x) { Vrms = x; pintar(); } });
    U.rango(M.ctr, { et: "Frecuencia", min: 10, max: 120, val: fr, fmt: function (x) { return x + " Hz"; }, cambio: function (x) { fr = x; pintar(); } });
    function pintar() {
      var Vp = tipo === "cd" ? Vrms : Vrms * Math.SQRT2, esc = 110 / 350, tTot = 0.05, s = '<rect x="20" y="10" width="520" height="280" rx="8" style="fill:#0b2016"/>';
      for (var i = 0; i <= 10; i++) s += '<line x1="' + (20 + i * 52) + '" y1="10" x2="' + (20 + i * 52) + '" y2="290" stroke="#2c5a43" stroke-width="' + (i === 0 ? 0 : 1) + '"/>';
      for (var j = 0; j <= 8; j++) s += '<line x1="20" y1="' + (10 + j * 35) + '" x2="540" y2="' + (10 + j * 35) + '" stroke="#2c5a43" stroke-width="' + (j === 4 ? 2 : 1) + '"/>';
      var pts = [];
      for (var k = 0; k <= 520; k += 2) { var t = k / 520 * tTot, v = tipo === "cd" ? Vrms : Vp * Math.sin(2 * Math.PI * fr * t); if (tipo === "media") v = Math.max(0, v); if (tipo === "completa") v = Math.abs(v); pts.push((20 + k) + "," + (150 - v * esc).toFixed(1)); }
      s += '<polyline points="' + pts.join(" ") + '" fill="none" stroke="#4ade80" stroke-width="2.5"/>';
      if (tipo !== "cd") s += '<line x1="20" y1="' + (150 - Vp * esc) + '" x2="540" y2="' + (150 - Vp * esc) + '" stroke="#facc15" stroke-dasharray="6 5"/><text x="30" y="' + (146 - Vp * esc) + '" font-size="11" fill="#facc15">pico ' + f(Vp) + ' V</text><line x1="20" y1="' + (150 - Vrms * esc) + '" x2="540" y2="' + (150 - Vrms * esc) + '" stroke="#60a5fa" stroke-dasharray="3 4"/><text x="430" y="' + (146 - Vrms * esc) + '" font-size="11" fill="#60a5fa">eficaz ' + f(Vrms) + " V</text>";
      s += '<text x="530" y="284" text-anchor="end" font-size="11" fill="#9fd8b5">5 ms/div · ' + f(350 / 4) + " V/div</text>";
      M.svg.innerHTML = s;
      M.lec.textContent = tipo === "cd" ? "Corriente directa: el voltaje es constante (" + f(Vrms) + " V) y no cambia de sentido. Frecuencia: 0 Hz." :
        "Vpico = " + f(Vp) + " V · Vpico a pico = " + f(2 * Vp) + " V · Veficaz = " + f(Vrms) + " V\nFrecuencia " + fr + " Hz → periodo T = 1/f = " + fu(1 / fr, "s") + " · " + fr + " ciclos por segundo, " + 2 * fr + " cambios de sentido por segundo." + (tipo === "media" ? "\nMedia onda: un diodo deja pasar solo la mitad positiva." : tipo === "completa" ? "\nOnda completa: un puente de diodos voltea la mitad negativa; con un capacitor se alisa hasta parecer CD." : "");
    }
    pintar();
  };

  // ---------- S8 Campo magnético ----------
  function campo(fuente, x, y, I) {
    var bx = 0, by = 0;
    if (fuente === "cable") { var dx = x - 280, dy = y - 170, r2 = dx * dx + dy * dy + 50; bx = -dy * I / r2; by = dx * I / r2; return [bx * 400, by * 400]; }
    var m = fuente === "iman" ? 1 : I / 5, polos = fuente === "iman" ? [[340, 170, 1], [220, 170, -1]] : [[330, 170, 1], [230, 170, -1]];
    polos.forEach(function (p) { var dx = x - p[0], dy = y - p[1], r3 = Math.pow(dx * dx + dy * dy + 200, 1.5); bx += p[2] * m * dx / r3; by += p[2] * m * dy / r3; });
    return [bx * 3e5, by * 3e5];
  }
  SIMS._campo = campo;
  SIMS.S8 = function (cont) {
    var fuente = "iman", I = 5, bx = 120, by = 80, M = U.marco(cont, "0 0 560 340", "Campo magnético representado con brújulas");
    U.chips(M.ctr, "Fuente del campo", [["iman", "Imán de barra"], ["cable", "Cable con corriente (visto de frente)"], ["bobina", "Bobina con corriente"]], fuente, function (v) { fuente = v; pintar(); });
    U.rango(M.ctr, { et: "Corriente (cable o bobina; negativa = sentido contrario)", min: -10, max: 10, val: I, fmt: function (x) { return x + " A"; }, cambio: function (x) { I = x; pintar(); } });
    var arr = false;
    M.svg.addEventListener("pointerdown", function (e) { if (e.target.closest("[data-br]")) { arr = true; M.svg.setPointerCapture(e.pointerId); } });
    M.svg.addEventListener("pointermove", function (e) { if (!arr) return; var b = M.svg.getBoundingClientRect(); bx = Math.max(15, Math.min(545, (e.clientX - b.left) * 560 / b.width)); by = Math.max(15, Math.min(325, (e.clientY - b.top) * 340 / b.height)); pintar(); });
    M.svg.addEventListener("pointerup", function () { arr = false; });
    function aguja(x, y, B, R, extra) { var a = Math.atan2(B[1], B[0]), c = Math.cos(a) * R, s2 = Math.sin(a) * R, op = Math.min(1, 0.25 + Math.hypot(B[0], B[1]) * 2); return "<g " + (extra || "") + ' opacity="' + op.toFixed(2) + '"><line x1="' + (x - c).toFixed(1) + '" y1="' + (y - s2).toFixed(1) + '" x2="' + x + '" y2="' + y + '" stroke="currentColor" stroke-width="3"/><line x1="' + x + '" y1="' + y + '" x2="' + (x + c).toFixed(1) + '" y2="' + (y + s2).toFixed(1) + '" style="stroke:var(--carga-pos)" stroke-width="3"/></g>'; }
    function pintar() {
      var s = "";
      for (var x = 30; x < 560; x += 40) for (var y = 25; y < 340; y += 40) { if (fuente !== "cable" && x > 200 && x < 360 && y > 145 && y < 195) continue; var B = campo(fuente, x, y, I); if (fuente !== "iman" && I === 0) B = [0, 0]; s += aguja(x, y, B, 11); }
      if (fuente === "iman") s += '<rect x="220" y="150" width="60" height="40" style="fill:var(--carga-neg)"/><rect x="280" y="150" width="60" height="40" style="fill:var(--carga-pos)"/><text x="250" y="176" text-anchor="middle" fill="#fff" font-weight="700">S</text><text x="310" y="176" text-anchor="middle" fill="#fff" font-weight="700">N</text>';
      else if (fuente === "cable") s += '<circle cx="280" cy="170" r="14" style="fill:var(--panel2)" stroke="currentColor" stroke-width="2"/>' + (I > 0 ? '<circle cx="280" cy="170" r="4" fill="currentColor"/>' : I < 0 ? '<path d="M272 162 L288 178 M272 178 L288 162" stroke="currentColor" stroke-width="2.5"/>' : "");
      else { for (var k = 0; k < 8; k++) s += '<ellipse cx="' + (236 + k * 13) + '" cy="170" rx="5" ry="24" fill="none" style="stroke:var(--volt)" stroke-width="2.5"/>'; s += '<text x="280" y="215" text-anchor="middle" font-size="11" fill="currentColor">bobina</text>'; }
      var Bb = campo(fuente, bx, by, I); if (fuente !== "iman" && I === 0) Bb = [0, 0];
      s += '<g data-br="1" style="cursor:grab"><circle cx="' + bx + '" cy="' + by + '" r="22" style="fill:var(--panel)" stroke="currentColor" stroke-width="2"/>' + aguja(bx, by, Bb, 17) + "</g>";
      M.svg.innerHTML = s;
      var mag = Math.hypot(Bb[0], Bb[1]);
      M.lec.textContent = "Corriente: " + I + " A (solo afecta al cable y a la bobina) · Brújula grande (arrástrala): intensidad relativa " + f(mag * 100, 0) + " · El extremo rojo de cada aguja apunta hacia donde va el campo (de N a S por fuera del imán).\n" + (fuente === "cable" ? "Alrededor del cable el campo forma círculos (Oersted). " + (I > 0 ? "Corriente hacia ti (●): el campo gira en sentido antihorario." : I < 0 ? "Corriente alejándose (×): el campo gira en sentido horario." : "Sin corriente no hay campo.") : fuente === "bobina" ? "Una bobina con corriente se comporta como un imán de barra. Más corriente o más vueltas → campo más fuerte." : "El campo es más intenso cerca de los polos.");
    }
    pintar();
  };

  // ---------- S9 Inducción de Faraday ----------
  SIMS.S9 = function (cont) {
    var x = 80, xAnt = 80, vuel = 200, pol = 1, auto = false, emf = 0, ag = 0, M = U.marco(cont, "0 0 560 260", "Imán que se mueve dentro de una bobina conectada a un galvanómetro");
    U.rango(M.ctr, { et: "Vueltas de la bobina", min: 50, max: 500, paso: 50, val: vuel, cambio: function (v) { vuel = v; } });
    var bw = U.el("div", "ctrl botones"); M.ctr.appendChild(bw);
    U.boton(bw, "Voltear el imán", function () { pol = -pol; });
    var ba = U.boton(bw, "Mover solo (vaivén)", function () { auto = !auto; ba.textContent = auto ? "Detener el vaivén" : "Mover solo (vaivén)"; });
    var arr = false;
    M.svg.addEventListener("pointerdown", function (e) { if (e.target.closest("[data-im]")) { arr = true; auto = false; ba.textContent = "Mover solo (vaivén)"; M.svg.setPointerCapture(e.pointerId); } });
    M.svg.addEventListener("pointermove", function (e) { if (!arr) return; var b = M.svg.getBoundingClientRect(); x = Math.max(40, Math.min(420, (e.clientX - b.left) * 560 / b.width)); });
    M.svg.addEventListener("pointerup", function () { arr = false; });
    function flujo(px) { var d = (px - 300) / 60; return pol / (1 + d * d); }
    U.bucle(M.svg, function (dt, t) {
      if (auto) x = 230 + 170 * Math.sin(t * 2.2);
      var dphi = (flujo(x) - flujo(xAnt)) / Math.max(dt, 0.001); xAnt = x;
      var nuevo = -vuel * dphi * 0.004; emf += (nuevo - emf) * Math.min(1, dt * 12); ag += (Math.max(-1, Math.min(1, emf / 6)) - ag) * Math.min(1, dt * 8);
      var s = "";
      for (var k = 0; k < Math.round(vuel / 50) + 2; k++) s += '<ellipse cx="' + (255 + k * (90 / (Math.round(vuel / 50) + 1))).toFixed(1) + '" cy="120" rx="8" ry="40" fill="none" style="stroke:var(--volt)" stroke-width="2.5"/>';
      s += U.cable("M255 160 V220 H470 M345 160 V200 H440", "var(--volt)");
      s += '<g data-im="1" style="cursor:grab"><rect x="' + (x - 50) + '" y="105" width="50" height="30" style="fill:' + (pol > 0 ? "var(--carga-neg)" : "var(--carga-pos)") + '"/><rect x="' + x + '" y="105" width="50" height="30" style="fill:' + (pol > 0 ? "var(--carga-pos)" : "var(--carga-neg)") + '"/><text x="' + (x - 25) + '" y="126" text-anchor="middle" fill="#fff" font-weight="700">' + (pol > 0 ? "S" : "N") + '</text><text x="' + (x + 25) + '" y="126" text-anchor="middle" fill="#fff" font-weight="700">' + (pol > 0 ? "N" : "S") + "</text></g>";
      var a = ag * 60 * Math.PI / 180; s += '<path d="M410 200 A45 45 0 0 1 500 200" fill="none" stroke="currentColor"/><circle cx="455" cy="200" r="4" fill="currentColor"/><line x1="455" y1="200" x2="' + (455 + 42 * Math.sin(a)).toFixed(1) + '" y2="' + (200 - 42 * Math.cos(a)).toFixed(1) + '" style="stroke:var(--no)" stroke-width="3"/><text x="455" y="240" text-anchor="middle" font-size="11" fill="currentColor">galvanómetro</text>';
      s += U.foco(520, 120, Math.min(1, Math.abs(emf) / 5), false, "LED");
      s += '<text x="20" y="30" font-size="12" fill="currentColor">Arrastra el imán hacia dentro y hacia fuera de la bobina</text>';
      M.svg.innerHTML = s;
      M.lec.textContent = "Voltaje inducido ≈ " + f(emf, 2) + " V (" + vuel + " vueltas)\n" + (Math.abs(emf) < 0.05 ? "Imán quieto → el flujo magnético no cambia → no hay voltaje. Lo que induce es el CAMBIO." : (emf > 0 ? "La aguja va a la derecha" : "La aguja va a la izquierda") + ": al cambiar el sentido del movimiento o voltear el imán, el voltaje cambia de signo.");
    });
  };

  // ---------- S10 Generador y motor ----------
  SIMS.S10 = function (cont) {
    var modo = "gen", rpm = 1800, V = 6, ang = 0, hist = [], M = U.marco(cont, "0 0 560 280", "Espira girando entre los polos de un imán");
    U.chips(M.ctr, "Modo", [["gen", "Generador (giro → voltaje)"], ["motor", "Motor (voltaje → giro)"]], modo, function (v) { modo = v; hist = []; });
    var r1 = U.rango(M.ctr, { et: "Velocidad del generador", min: 0, max: 3600, paso: 60, val: rpm, fmt: function (x) { return x + " rpm (" + f(x / 60) + " Hz)"; }, cambio: function (x) { rpm = x; } });
    U.rango(M.ctr, { et: "Voltaje aplicado al motor", min: 0, max: 12, paso: 0.5, val: V, fmt: function (x) { return f(x) + " V"; }, cambio: function (x) { V = x; } });
    U.bucle(M.svg, function (dt) {
      var vel = modo === "gen" ? rpm : V * 250, w = vel / 60 * 2 * Math.PI, visual = Math.min(w, 2 * Math.PI * 1.5);
      ang += (reducido ? 0 : dt) * (modo === "gen" ? visual : visual);
      var Vpk = modo === "gen" ? rpm / 3600 * 170 : 0, salida = Vpk * Math.sin(ang);
      hist.push(salida); if (hist.length > 200) hist.shift();
      var s = '<rect x="30" y="60" width="50" height="120" style="fill:var(--carga-pos)"/><text x="55" y="125" text-anchor="middle" fill="#fff" font-weight="700">N</text><rect x="230" y="60" width="50" height="120" style="fill:var(--carga-neg)"/><text x="255" y="125" text-anchor="middle" fill="#fff" font-weight="700">S</text>';
      var c = Math.cos(ang), anchoE = 70 * Math.abs(c); s += '<rect x="' + (155 - anchoE) + '" y="70" width="' + (2 * anchoE).toFixed(1) + '" height="100" fill="none" style="stroke:var(--volt)" stroke-width="4"/><line x1="155" y1="170" x2="155" y2="220" stroke="currentColor" stroke-width="3"/>';
      s += '<rect x="140" y="220" width="30" height="16" rx="4" style="fill:var(--panel2)" stroke="currentColor"/><text x="155" y="256" text-anchor="middle" font-size="11" fill="currentColor">' + (modo === "gen" ? "anillos y escobillas" : "conmutador") + "</text>";
      s += '<rect x="310" y="40" width="230" height="160" rx="6" style="fill:#0b2016"/><line x1="310" y1="120" x2="540" y2="120" stroke="#2c5a43"/>';
      if (modo === "gen") s += '<polyline points="' + hist.map(function (v, i) { return (310 + i * 230 / 200).toFixed(1) + "," + (120 - v * 0.42).toFixed(1); }).join(" ") + '" fill="none" stroke="#4ade80" stroke-width="2"/>';
      else s += '<text x="425" y="125" text-anchor="middle" font-size="13" fill="#9fd8b5">' + Math.round(vel) + " rpm</text>";
      M.svg.innerHTML = s;
      M.lec.textContent = modo === "gen" ? "Generador: " + rpm + " rpm → frecuencia " + f(rpm / 60) + " Hz · voltaje pico ≈ " + f(Vpk) + " V\nAl girar la espira, el flujo magnético que la atraviesa cambia y se induce una onda senoidal. Girar más rápido da más voltaje y más frecuencia." : "Motor: con " + f(V) + " V gira a unas " + Math.round(vel) + " rpm.\nLa corriente en la espira dentro del campo produce fuerzas opuestas en sus lados (par de giro). El conmutador invierte la corriente cada media vuelta para que siga girando en el mismo sentido.";
    });
    r1.setAttribute("aria-describedby", "");
  };

  // ---------- S11 Transformador ----------
  SIMS._trafo = function (tipo, Vp, Np, Ns, Rl) { if (tipo === "cd") return { Vs: 0, Is: 0, Ip: 0 }; var Vs = Vp * Ns / Np, Is = Rl > 0 ? Vs / Rl : 0; return { Vs: Vs, Is: Is, Ip: Is * Vs / Vp }; };
  SIMS.S11 = function (cont) {
    var red = (window.PROGRESO && window.PROGRESO.pref("red") === "230") ? 230 : 127, Vp = red, Np = 1000, Ns = 100, Rl = 10, tipo = "ca", M = U.marco(cont, "0 0 560 260", "Transformador con núcleo y dos bobinas");
    U.chips(M.ctr, "Tipo de corriente en el primario", [["ca", "Alterna (CA)"], ["cd", "Directa (CD)"]], tipo, function (v) { tipo = v; pintar(); });
    U.rango(M.ctr, { et: "Voltaje del primario", min: 0, max: 240, val: Vp, fmt: function (x) { return x + " V"; }, cambio: function (x) { Vp = x; pintar(); } });
    U.rango(M.ctr, { et: "Vueltas del primario (Np)", min: 100, max: 2000, paso: 50, val: Np, cambio: function (x) { Np = x; pintar(); } });
    U.rango(M.ctr, { et: "Vueltas del secundario (Ns)", min: 10, max: 2000, paso: 10, val: Ns, cambio: function (x) { Ns = x; pintar(); } });
    U.rango(M.ctr, { et: "Resistencia de la carga", min: 1, max: 100, val: Rl, fmt: function (x) { return x + " Ω"; }, cambio: function (x) { Rl = x; pintar(); } });
    function pintar() {
      var r = SIMS._trafo(tipo, Vp, Np, Ns, Rl), s = '<rect x="180" y="40" width="200" height="180" rx="6" fill="none" stroke="currentColor" stroke-width="18" opacity=".45"/>';
      var np = Math.max(2, Math.round(Np / 150)), ns = Math.max(2, Math.round(Ns / 150));
      for (var i = 0; i < np; i++) s += '<ellipse cx="189" cy="' + (70 + i * (120 / np)).toFixed(1) + '" rx="22" ry="5" fill="none" style="stroke:var(--fase)" stroke-width="2.5"/>';
      for (var j = 0; j < ns; j++) s += '<ellipse cx="371" cy="' + (70 + j * (120 / ns)).toFixed(1) + '" rx="22" ry="5" fill="none" style="stroke:var(--neutro)" stroke-width="2.5"/>';
      s += U.cable("M60 70 H167 M60 190 H167", "var(--fase)") + U.cable("M393 70 H500 M393 190 H500", "var(--neutro)") + U.resistor(500, 130, true, Rl + " Ω") + U.cable("M500 70 V106 M500 154 V190");
      s += '<text x="60" y="130" font-size="13" fill="currentColor">' + Vp + " V " + (tipo === "ca" ? "~" : "⎓") + '</text><text x="70" y="150" font-size="11" fill="currentColor">Np = ' + Np + '</text><text x="410" y="40" font-size="13" fill="currentColor">Vs = ' + f(r.Vs) + ' V</text><text x="410" y="230" font-size="11" fill="currentColor">Ns = ' + Ns + "</text>";
      M.svg.innerHTML = s;
      M.lec.textContent = tipo === "cd" ? "Con corriente directa el campo magnético del núcleo no cambia, así que no se induce nada en el secundario: Vs = 0 V. Además, la bobina primaria tendría muy poca resistencia y se calentaría peligrosamente." :
        "Vs = Vp × Ns / Np = " + Vp + " × " + Ns + " / " + Np + " = " + f(r.Vs) + " V (" + (r.Vs < Vp ? "reductor" : r.Vs > Vp ? "elevador" : "1:1") + ")\nIs = Vs / R = " + fu(r.Is, "A") + " · Ip ≈ Is × Vs / Vp = " + fu(r.Ip, "A") + " (transformador ideal: potencia de entrada = potencia de salida = " + fu(r.Vs * r.Is, "W") + ")";
    }
    pintar();
  };

  // ---------- S13 Red eléctrica ----------
  var DEMANDA = [0.55, 0.5, 0.48, 0.47, 0.48, 0.55, 0.68, 0.8, 0.86, 0.88, 0.9, 0.92, 0.93, 0.92, 0.9, 0.9, 0.92, 0.97, 1.0, 0.98, 0.92, 0.82, 0.7, 0.6];
  SIMS._red = function (Vkv, hora, capMW, picoMW) { var P = DEMANDA[hora] * picoMW * 1e6, R = 5, I = P / (Vkv * 1000), Pp = I * I * R, tot = P + Pp, def = tot - capMW * 1e6, fHz = 60 - Math.max(0, def / (capMW * 1e6)) * 20; return { P: P, I: I, Pp: Pp, pct: Pp * 100 / P, tot: tot, deficit: def, f: fHz, apagon: def > 0.05 * capMW * 1e6 }; };
  SIMS.S13 = function (cont) {
    var V = 400, hora = 19, cap = 120, M = U.marco(cont, "0 0 600 250", "Red eléctrica de la central a la casa");
    U.chips(M.ctr, "Tensión de transmisión", [["13.8", "13,8 kV"], ["115", "115 kV"], ["230", "230 kV"], ["400", "400 kV"]], "400", function (v) { V = +v; pintar(); });
    U.rango(M.ctr, { et: "Hora del día", min: 0, max: 23, val: hora, fmt: function (x) { return x + ":00 h"; }, cambio: function (x) { hora = x; pintar(); } });
    U.rango(M.ctr, { et: "Capacidad de generación disponible", min: 60, max: 140, paso: 5, val: cap, fmt: function (x) { return x + " MW"; }, cambio: function (x) { cap = x; pintar(); } });
    function pintar() {
      var r = SIMS._red(V, hora, cap, 100), hz = (window.PROGRESO && window.PROGRESO.pref("red") === "230") ? 50 : 60, fr = hz - (60 - r.f) * hz / 60;
      var grosor = Math.min(14, 2 + r.pct / 2), col = r.pct > 10 ? "var(--no)" : r.pct > 2 ? "var(--volt)" : "var(--ok)";
      var s = '<rect x="15" y="110" width="70" height="60" style="fill:var(--panel2)" stroke="currentColor"/><rect x="30" y="80" width="12" height="30" style="fill:var(--panel2)" stroke="currentColor"/><text x="50" y="190" text-anchor="middle" font-size="11" fill="currentColor">Central</text>';
      s += '<rect x="110" y="125" width="40" height="40" style="fill:var(--panel2)" stroke="currentColor"/><text x="130" y="190" text-anchor="middle" font-size="10" fill="currentColor">Elevadora</text>';
      s += U.cable("M85 140 H110 M150 140 H180", "currentColor") + '<path d="M180 140 L250 70 L330 70 L400 140" fill="none" style="stroke:' + col + '" stroke-width="' + grosor.toFixed(1) + '"/>';
      [215, 290, 365].forEach(function (x) { s += '<path d="M' + (x - 12) + " 180 L" + x + " 60 L" + (x + 12) + ' 180" fill="none" stroke="currentColor"/>'; });
      s += '<text x="290" y="50" text-anchor="middle" font-size="11" fill="currentColor">Transmisión ' + f(V) + ' kV</text><rect x="400" y="125" width="40" height="40" style="fill:var(--panel2)" stroke="currentColor"/><text x="420" y="190" text-anchor="middle" font-size="10" fill="currentColor">Subestación</text>';
      s += U.cable("M440 140 H500", "currentColor") + '<line x1="500" y1="100" x2="500" y2="190" stroke="currentColor" stroke-width="3"/><rect x="490" y="105" width="20" height="18" style="fill:var(--panel2)" stroke="currentColor"/><text x="500" y="205" text-anchor="middle" font-size="10" fill="currentColor">Poste</text>';
      s += U.cable("M510 115 H545") + '<path d="M540 140 L565 118 L590 140 Z" style="fill:var(--panel2)" stroke="currentColor"/><rect x="545" y="140" width="40" height="30" style="fill:' + (r.apagon ? "var(--panel2)" : "#facc15") + '" stroke="currentColor"/><text x="565" y="190" text-anchor="middle" font-size="10" fill="currentColor">Casa</text>';
      if (r.apagon) s += '<text x="300" y="235" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--no)">APAGÓN: falta generación</text>';
      M.svg.innerHTML = s;
      M.lec.textContent = "Demanda a las " + hora + ":00 h: " + f(r.P / 1e6) + " MW · corriente en la línea: " + f(r.I) + " A\nPérdidas en la línea (R = 5 Ω): " + fu(r.Pp, "W") + " = " + f(r.pct) + " % de lo transmitido\nGeneración necesaria: " + f(r.tot / 1e6) + " MW de " + cap + " MW disponibles · frecuencia ≈ " + f(fr) + " Hz" + (r.apagon ? "\n⚠ La generación no alcanza: la frecuencia cae y los sistemas de protección desconectan zonas para no dañar la red." : r.deficit > 0 ? "\nLa frecuencia baja un poco: hay que arrancar más generación." : "") + "\nPrueba 13,8 kV: la corriente es enorme y las pérdidas se disparan. Por eso se transmite en alta tensión.";
    }
    pintar();
  };
})();
