// Simulaciones de componentes y energía: S12 Batería, S16 Cuerpo humano, S17 Capacitor RC y Casa virtual.
(function () {
  "use strict";
  var U = window.SIMU, N = window.NUM, f = N.fmt, fu = N.fmtU;

  // ---------- S12 Batería ----------
  var QUIM = {
    liion: { n: "Litio-ion", Vmin: 3.0, Vnom: 3.7, Vmax: 4.2, mAh: 3000, rec: true },
    nimh: { n: "NiMH", Vmin: 1.0, Vnom: 1.2, Vmax: 1.4, mAh: 2000, rec: true },
    alcalina: { n: "Alcalina", Vmin: 0.9, Vnom: 1.5, Vmax: 1.6, mAh: 2500, rec: false },
    plomo: { n: "Plomo-ácido (celda)", Vmin: 1.9, Vnom: 2.0, Vmax: 2.15, mAh: 7000, rec: true }
  };
  function voltajeCelda(q, soc) { var c = QUIM[q]; var x = Math.max(0, Math.min(1, soc)); return c.Vmin + (c.Vmax - c.Vmin) * (0.08 + 0.75 * x + 0.17 * Math.pow(x, 6)) - (x < 0.08 ? (0.08 - x) * 3 * (c.Vmax - c.Vmin) : 0); }
  SIMS._voltajeCelda = voltajeCelda;
  SIMS.S12 = function (cont) {
    var q = "liion", soc = 0.8, modo = "pausa", C = 1, temp = 25, ns = 1, np = 1, hist = [], M = U.marco(cont, "0 0 560 260", "Batería con indicador de carga y curva de voltaje");
    U.chips(M.ctr, "Química", Object.keys(QUIM).map(function (k) { return [k, QUIM[k].n]; }), q, function (v) { q = v; hist = []; if (!QUIM[q].rec && modo === "carga") modo = "pausa"; });
    U.chips(M.ctr, "Acción", [["descarga", "Descargar"], ["pausa", "Pausa"], ["carga", "Cargar"]], "pausa", function (v) { modo = v; });
    U.rango(M.ctr, { et: "Corriente (tasa C)", min: 0.2, max: 2, paso: 0.1, val: C, fmt: function (x) { return f(x) + " C"; }, cambio: function (x) { C = x; } });
    U.rango(M.ctr, { et: "Temperatura", min: -10, max: 45, val: temp, fmt: function (x) { return x + " °C"; }, cambio: function (x) { temp = x; } });
    U.rango(M.ctr, { et: "Celdas en serie", min: 1, max: 4, val: ns, cambio: function (x) { ns = x; } });
    U.rango(M.ctr, { et: "Celdas en paralelo", min: 1, max: 4, val: np, cambio: function (x) { np = x; } });
    var acum = 0;
    U.bucle(M.svg, function (dt) {
      var c = QUIM[q], capFactor = temp < 0 ? 0.6 : temp < 10 ? 0.8 : 1, aviso = "";
      if (modo === "carga" && !c.rec) { aviso = "⚠ Las pilas alcalinas no son recargables: intentar cargarlas puede hacer que se hinchen o derramen."; }
      else if (modo !== "pausa") { var d = dt * C / 60 / capFactor * 2; soc += modo === "carga" ? d * (soc > 0.8 ? 0.4 : 1) : -d; soc = Math.max(0, Math.min(1, soc)); }
      if (modo === "carga" && temp > 40) aviso = "⚠ Cargar por encima de 40 °C acelera el desgaste y puede ser peligroso en baterías de litio.";
      if (modo === "carga" && temp < 0 && q === "liion") aviso = "⚠ No se debe cargar litio-ion bajo cero: se forma litio metálico dentro de la celda.";
      acum += dt; if (acum > 0.2) { acum = 0; hist.push(soc); if (hist.length > 120) hist.shift(); }
      var Vc = voltajeCelda(q, soc), Vt = Vc * ns, mAh = c.mAh * np * capFactor, Wh = mAh / 1000 * c.Vnom * ns, nivel = soc * 150;
      var s = '<rect x="40" y="40" width="90" height="170" rx="10" fill="none" stroke="currentColor" stroke-width="3"/><rect x="68" y="28" width="34" height="12" rx="3" fill="currentColor"/><rect x="48" y="' + (202 - nivel).toFixed(1) + '" width="74" height="' + nivel.toFixed(1) + '" rx="5" style="fill:' + (soc < 0.2 ? "var(--no)" : soc < 0.5 ? "var(--volt)" : "var(--ok)") + '"/><text x="85" y="235" text-anchor="middle" font-size="16" font-weight="700" fill="currentColor">' + Math.round(soc * 100) + " %</text>";
      if (modo === "carga" && c.rec) s += '<text x="85" y="130" text-anchor="middle" font-size="30">⚡</text>';
      s += '<rect x="180" y="30" width="360" height="190" rx="6" style="fill:var(--panel2)"/><text x="190" y="48" font-size="11" fill="currentColor">Voltaje por celda en el tiempo</text>';
      if (hist.length > 1) s += '<polyline points="' + hist.map(function (x, i) { return (190 + i * 340 / 120).toFixed(1) + "," + (210 - (voltajeCelda(q, x) - c.Vmin * 0.95) / (c.Vmax * 1.02 - c.Vmin * 0.95) * 150).toFixed(1); }).join(" ") + '" fill="none" style="stroke:var(--accent)" stroke-width="2.5"/>';
      M.svg.innerHTML = s;
      M.lec.textContent = "Tasa " + f(C) + " C · " + temp + " °C · " + c.n + " · " + ns + "S" + np + "P → voltaje " + f(Vt) + " V (nominal " + f(c.Vnom * ns) + " V) · capacidad " + f(mAh) + " mAh · energía " + f(Wh) + " Wh\nEstado: " + (modo === "pausa" ? "en reposo" : modo === "carga" ? (c.rec ? "cargando (por encima del 80 % la carga se hace más lenta)" : "no se puede cargar") : "descargando a " + f(C) + " C (" + f(C * mAh) + " mA)") + (temp < 10 ? "\nCon frío la batería entrega menos capacidad." : "") + (aviso ? "\n" + aviso : "") + "\nEn serie sube el voltaje; en paralelo sube la capacidad (mAh).";
    });
  };

  // ---------- S16 Cuerpo humano y corriente (modelo educativo) ----------
  var PIEL = { seca: 100000, humeda: 10000, mojada: 1000 };
  var TRAY = { manos: [1, "mano a mano (pasa por el pecho)"], manopie: [1.1, "mano a pie"], dedo: [0, "dos dedos de la misma mano"] };
  function efecto(I) {
    var mA = I * 1000;
    if (mA < 0.5) return [0, "No se percibe."];
    if (mA < 5) return [1, "Se siente un cosquilleo o una pequeña descarga."];
    if (mA < 10) return [2, "Dolor; todavía se puede soltar el objeto."];
    if (mA < 30) return [3, "Contracción muscular: puede ser imposible soltarse. Dificultad para respirar."];
    if (mA < 100) return [4, "Peligro grave: riesgo de fibrilación del corazón si dura más de una fracción de segundo."];
    return [5, "Mortal: fibrilación ventricular, paro cardíaco y quemaduras internas."];
  }
  SIMS._cuerpo = function (V, piel, tray) { var R = PIEL[piel] + 500, I = TRAY[tray][0] ? V / (R * TRAY[tray][0]) : V / R; return { R: R, I: I, ef: efecto(I) }; };
  SIMS.S16 = function (cont) {
    var red = (window.PROGRESO && window.PROGRESO.pref("red") === "230") ? 230 : 127, V = red, piel = "seca", tray = "manos", M = U.marco(cont, "0 0 560 280", "Silueta humana con la trayectoria de la corriente");
    U.rango(M.ctr, { et: "Voltaje de contacto", min: 0, max: 400, paso: 1, val: V, fmt: function (x) { return x + " V"; }, cambio: function (x) { V = x; pintar(); } });
    U.chips(M.ctr, "Piel", [["seca", "Seca"], ["humeda", "Húmeda (sudor)"], ["mojada", "Mojada"]], piel, function (v) { piel = v; pintar(); });
    U.chips(M.ctr, "Trayectoria", Object.keys(TRAY).map(function (k) { return [k, TRAY[k][1]]; }), tray, function (v) { tray = v; pintar(); });
    function pintar() {
      var r = SIMS._cuerpo(V, piel, tray), cols = ["var(--ok)", "var(--ok)", "var(--volt)", "var(--volt)", "var(--no)", "var(--no)"], col = cols[r.ef[0]];
      var s = '<g transform="translate(120,20)" fill="none" stroke="currentColor" stroke-width="3"><circle cx="60" cy="25" r="20"/><path d="M60 45 V150 M60 70 L10 120 M60 70 L110 120 M60 150 L25 240 M60 150 L95 240"/></g>';
      var path = tray === "manos" ? "M130 140 L180 90 L240 90 L230 140" : tray === "manopie" ? "M130 140 L180 90 L180 170 L145 260" : "M228 138 L232 132";
      s += '<path d="' + path + '" fill="none" style="stroke:' + col + '" stroke-width="' + (2 + r.ef[0] * 1.5) + '" stroke-dasharray="7 5"/>';
      var niveles = ["< 0,5 mA", "0,5–5 mA", "5–10 mA", "10–30 mA", "30–100 mA", "> 100 mA"];
      niveles.forEach(function (n, i) { s += '<rect x="330" y="' + (20 + i * 40) + '" width="210" height="34" rx="6" style="fill:' + (i === r.ef[0] ? cols[i] : "var(--panel2)") + '" opacity="' + (i === r.ef[0] ? 0.9 : 1) + '"/><text x="340" y="' + (42 + i * 40) + '" font-size="12" style="fill:' + (i === r.ef[0] ? "#fff" : "var(--ink)") + '">' + n + "</text>"; });
      M.svg.innerHTML = s;
      M.lec.textContent = "Resistencia aproximada del cuerpo: " + fu(r.R, "Ω") + " · Corriente: I = V / R = " + V + " / " + f(r.R) + " = " + fu(r.I, "A") + "\nEfecto: " + r.ef[1] + "\nModelo educativo simplificado: la resistencia real varía mucho entre personas y situaciones. Nunca hay un voltaje de red «seguro» para tocar.";
    }
    pintar();
  };

  // ---------- S17 Capacitor RC ----------
  SIMS.S17 = function (cont) {
    var R = 10000, C = 100e-6, Vs = 9, modo = "carga", t = 0, corriendo = true, M = U.marco(cont, "0 0 560 260", "Curva de carga o descarga de un capacitor");
    var Rs = [1000, 2200, 4700, 10000, 22000, 47000, 100000], Cs = [10e-6, 22e-6, 47e-6, 100e-6, 220e-6, 470e-6, 1000e-6];
    U.rango(M.ctr, { et: "Resistencia R", min: 0, max: Rs.length - 1, val: 3, fmt: function (k) { return fu(Rs[k], "Ω"); }, cambio: function (k) { R = Rs[k]; t = 0; } });
    U.rango(M.ctr, { et: "Capacidad C", min: 0, max: Cs.length - 1, val: 3, fmt: function (k) { return fu(Cs[k], "F"); }, cambio: function (k) { C = Cs[k]; t = 0; } });
    U.chips(M.ctr, "Proceso", [["carga", "Carga"], ["descarga", "Descarga"]], modo, function (v) { modo = v; t = 0; });
    var bw = U.el("div", "ctrl"); M.ctr.appendChild(bw); U.boton(bw, "Reiniciar", function () { t = 0; corriendo = true; });
    U.bucle(M.svg, function (dt) {
      var tau = R * C, Tmax = 5 * tau; if (corriendo) t += dt * Tmax / 6; if (t > Tmax) t = Tmax;
      if (U.reducido) t = Tmax;
      function v(tt) { return modo === "carga" ? Vs * (1 - Math.exp(-tt / tau)) : Vs * Math.exp(-tt / tau); }
      var X = function (tt) { return 50 + tt / Tmax * 480; }, Y = function (vv) { return 220 - vv / Vs * 180; };
      var s = '<line x1="50" y1="220" x2="535" y2="220" stroke="currentColor"/><line x1="50" y1="30" x2="50" y2="220" stroke="currentColor"/>';
      for (var k = 1; k <= 5; k++) s += '<line x1="' + X(k * tau) + '" y1="30" x2="' + X(k * tau) + '" y2="220" stroke="currentColor" opacity=".2"/><text x="' + X(k * tau) + '" y="238" text-anchor="middle" font-size="11" fill="currentColor">' + k + "τ</text>";
      s += '<line x1="50" y1="' + Y(Vs * 0.632) + '" x2="' + X(tau) + '" y2="' + Y(Vs * 0.632) + '" style="stroke:var(--volt)" stroke-dasharray="4 4"/><text x="55" y="' + (Y(Vs * 0.632) - 4) + '" font-size="11" fill="currentColor">63 %</text>';
      var pts = []; for (var i = 0; i <= 100; i++) { var tt = Tmax * i / 100; if (tt > t) break; pts.push(X(tt).toFixed(1) + "," + Y(v(tt)).toFixed(1)); }
      s += '<polyline points="' + pts.join(" ") + '" fill="none" style="stroke:var(--accent)" stroke-width="3"/><circle cx="' + X(t) + '" cy="' + Y(v(t)) + '" r="5" style="fill:var(--accent)"/><text x="40" y="34" text-anchor="end" font-size="11" fill="currentColor">' + Vs + ' V</text><text x="535" y="254" text-anchor="end" font-size="11" fill="currentColor">tiempo</text>';
      M.svg.innerHTML = s;
      M.lec.textContent = "τ = R·C = " + fu(R, "Ω") + " × " + fu(C, "F") + " = " + fu(tau, "s") + " · 5τ = " + fu(Tmax, "s") + "\nt = " + fu(t, "s") + " → V = " + f(v(t)) + " V (" + f(v(t) / Vs * 100, 1) + " %)" + "\nEn 1τ el capacitor llega al 63 % (o baja al 37 %); tras 5τ se considera completamente cargado o descargado.";
    });
  };

  // ---------- Casa virtual de consumo ----------
  SIMS.CASA = function (cont) {
    var ap = window.CALC.F.APARATOS.map(function (a) { return { n: a[0], w: a[1], on: false }; }), kwh = 0, horas = 0, vel = 3600, corre = true;
    ap[0].on = true; ap[2].on = true;
    var M = U.marco(cont, "0 0 560 120", "Medidor de energía de una casa"), lista = U.el("div", "ctrl");
    M.ctr.appendChild(lista);
    lista.innerHTML = '<p class="estado" style="margin:.2rem 0">Enciende y apaga aparatos:</p>' + ap.map(function (a, k) { return '<label style="display:inline-block;font-weight:400;margin-right:.7rem"><input type="checkbox" data-k="' + k + '"' + (a.on ? " checked" : "") + "> " + a.n + " (" + a.w + " W)</label>"; }).join("");
    lista.addEventListener("change", function (e) { ap[+e.target.getAttribute("data-k")].on = e.target.checked; });
    U.rango(M.ctr, { et: "Velocidad del tiempo", min: 600, max: 36000, paso: 600, val: vel, fmt: function (x) { return "1 s = " + f(x / 3600, 1) + " h"; }, cambio: function (x) { vel = x; } });
    var bw = U.el("div", "ctrl botones"); M.ctr.appendChild(bw);
    var bp = U.boton(bw, "Pausar", function () { corre = !corre; bp.textContent = corre ? "Pausar" : "Continuar"; });
    U.boton(bw, "Reiniciar medidor", function () { kwh = 0; horas = 0; });
    U.bucle(M.svg, function (dt) {
      var P = ap.reduce(function (s, a) { return s + (a.on ? a.w : 0); }, 0), dh = corre ? dt * vel / 3600 : 0, tar = (window.PROGRESO && +window.PROGRESO.pref("tarifa")) || 1.5, mon = (window.PROGRESO && window.PROGRESO.pref("moneda")) || "$";
      horas += dh; kwh += P * dh / 1000;
      var s = '<rect x="20" y="15" width="300" height="90" rx="10" style="fill:var(--panel2)" stroke="currentColor"/><rect x="40" y="35" width="260" height="50" rx="6" style="fill:#111"/><text x="290" y="70" text-anchor="end" font-family="monospace" font-size="26" fill="#4ade80">' + kwh.toFixed(3).replace(".", ",") + ' kWh</text><text x="340" y="45" font-size="13" fill="currentColor">Potencia: ' + f(P) + ' W</text><text x="340" y="70" font-size="13" fill="currentColor">Tiempo: ' + f(horas, 1) + ' h</text><text x="340" y="95" font-size="13" fill="currentColor">Costo: ' + mon + " " + f(kwh * tar, 2) + "</text>";
      M.svg.innerHTML = s;
      M.lec.textContent = "Energía = potencia × tiempo = " + f(P) + " W × " + f(horas, 2) + " h = " + f(kwh, 3) + " kWh · Tarifa " + mon + " " + f(tar) + "/kWh (cámbiala en Ajustes)\nA este ritmo gastarías " + f(P * 24 * 30 / 1000) + " kWh al mes (" + mon + " " + f(P * 24 * 30 / 1000 * tar, 2) + ").";
    });
  };
})();
