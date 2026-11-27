// Utilidades numéricas (formato con coma decimal y prefijos) y las 17 calculadoras.
// Las funciones de cálculo son puras: se prueban con node en pruebas/pruebas-calculos.js.
(function (raiz) {
  "use strict";
  var PREF = { "p": 1e-12, "n": 1e-9, "µ": 1e-6, "u": 1e-6, "m": 1e-3, "": 1, "k": 1e3, "K": 1e3, "M": 1e6, "G": 1e9 };

  // ---------- Formato ----------
  function fmt(n, dec) {
    if (n === null || n === undefined || isNaN(n)) return "—";
    if (!isFinite(n)) return n > 0 ? "∞" : "−∞";
    var a = Math.abs(n);
    if (dec === undefined) dec = a >= 1000 ? 0 : a >= 100 ? 1 : a >= 10 ? 2 : a >= 1 ? 2 : a >= 0.01 ? 4 : 6;
    var s = (Math.round(n * Math.pow(10, dec)) / Math.pow(10, dec)).toFixed(dec);
    if (s.indexOf(".") >= 0) s = s.replace(/0+$/, "").replace(/\.$/, "");
    var partes = s.split("."); var ent = partes[0], neg = ent[0] === "-"; if (neg) ent = ent.slice(1);
    if (ent.length > 4) ent = ent.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return (neg ? "−" : "") + ent + (partes[1] ? "," + partes[1] : "");
  }
  // Con prefijo SI: fmtU(0.02,"A") → "20 mA"
  function fmtU(n, u, dec) {
    if (n === null || n === undefined || isNaN(n)) return "—";
    if (n === 0) return "0 " + u;
    n = +n.toPrecision(12);
    var a = Math.abs(n), p = "", f = 1;
    if (a >= 1e9) { p = "G"; f = 1e9; } else if (a >= 1e6) { p = "M"; f = 1e6; } else if (a >= 1e3 && u !== "$" && u !== "kWh" && u !== "Wh" && u !== "%") { p = "k"; f = 1e3; }
    else if (a < 1e-6) { p = "n"; f = 1e-9; } else if (a < 1e-3) { p = "µ"; f = 1e-6; } else if (a < 1 && u !== "%" && u !== "kWh" && u !== "$") { p = "m"; f = 1e-3; }
    if (u === "%" || u === "$" || u === "kWh") { p = ""; f = 1; }
    return fmt(n / f, dec) + " " + p + u;
  }
  // Lee "20 mA", "0,02", "4k7", "4,7 kΩ", "1.5e-3" → número en la unidad base.
  function parse(txt, unidad) {
    if (typeof txt === "number") return txt;
    var s = String(txt || "").trim().replace(/\s+/g, "").replace(/−/g, "-");
    if (!s) return NaN;
    var u = unidad || "";
    var alias = { "Ω": ["Ω", "ohms", "ohm", "ohmios", "ohmio", "Ohm", "Ohms"], "A": ["A", "amperios", "amperes"], "V": ["V", "voltios", "volts"], "W": ["W", "watts", "vatios"], "Hz": ["Hz", "hz"], "s": ["s", "seg"], "F": ["F"], "C": ["C"], "N": ["N"], "J": ["J"], "Wh": ["Wh"], "kWh": ["kWh"], "mAh": ["mAh"], "$": ["$"], "%": ["%"], "m": ["m"], "T": ["T"] };
    var lista = alias[u] || (u ? [u] : []);
    if (u === "kWh" || u === "mAh") { s = s.replace(new RegExp(u + "$"), ""); lista = []; }
    for (var i = 0; i < lista.length; i++) { var al = lista[i]; if (s.length > al.length && s.slice(-al.length) === al) { s = s.slice(0, -al.length); break; } }
    // notación 4k7
    var m47 = s.match(/^(\d+)([kKMmuµ])(\d+)$/);
    if (m47) s = m47[1] + "." + m47[3] + m47[2];
    var pre = 1;
    var ult = s.slice(-1);
    if (u !== "m" && PREF[ult] !== undefined && ult !== "" && /[\d.,]$/.test(s.slice(0, -1))) { pre = PREF[ult]; s = s.slice(0, -1); }
    // coma decimal; también miles con espacio ya eliminados
    if (s.indexOf(",") >= 0 && s.indexOf(".") >= 0) s = s.replace(/\./g, "").replace(",", ".");
    else s = s.replace(",", ".");
    if (!/^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i.test(s)) return NaN;
    return parseFloat(s) * pre;
  }
  function cerca(a, b, tol) { tol = tol === undefined ? 0.02 : tol; if (b === 0) return Math.abs(a) < 1e-9; return Math.abs(a - b) <= Math.abs(b) * tol; }
  var NUM = { fmt: fmt, fmtU: fmtU, parse: parse, cerca: cerca, PREF: PREF };

  function req(cond, msg) { if (!cond) throw new Error(msg); }
  function pos(x, nombre) { req(isFinite(x) && x > 0, "«" + nombre + "» debe ser un número mayor que cero."); }

  // ---------- Funciones de cálculo ----------
  var F = {};
  F.ohm = function (d) {
    var V = d.V, I = d.I, R = d.R, n = [V, I, R].filter(function (x) { return x !== undefined && !isNaN(x); }).length;
    req(n === 2, "Escribe exactamente dos valores y deja vacío el que quieres calcular.");
    if (isNaN(V) || V === undefined) { pos(I, "Corriente"); pos(R, "Resistencia"); return { V: I * R, I: I, R: R, calc: "V", pasos: ["V = I · R", "V = " + fmtU(I, "A") + " · " + fmtU(R, "Ω"), "V = " + fmtU(I * R, "V")] }; }
    if (isNaN(I) || I === undefined) { pos(R, "Resistencia"); return { V: V, I: V / R, R: R, calc: "I", pasos: ["I = V / R", "I = " + fmtU(V, "V") + " / " + fmtU(R, "Ω"), "I = " + fmtU(V / R, "A")] }; }
    pos(I, "Corriente"); return { V: V, I: I, R: V / I, calc: "R", pasos: ["R = V / I", "R = " + fmtU(V, "V") + " / " + fmtU(I, "A"), "R = " + fmtU(V / I, "Ω")] };
  };
  F.potencia = function (d) {
    var k = ["P", "V", "I", "R"].filter(function (x) { return d[x] !== undefined && !isNaN(d[x]); });
    req(k.length === 2, "Escribe exactamente dos de los cuatro valores.");
    k.forEach(function (x) { req(d[x] > 0, "Los valores deben ser mayores que cero."); });
    var P = d.P, V = d.V, I = d.I, R = d.R, pasos = [], par = k.join("");
    if (par === "VI") { P = V * I; R = V / I; pasos = ["P = V · I = " + fmt(V) + " V · " + fmt(I) + " A = " + fmtU(P, "W"), "R = V / I = " + fmtU(R, "Ω")]; }
    else if (par === "VR") { I = V / R; P = V * V / R; pasos = ["P = V² / R = " + fmt(V) + "² / " + fmt(R) + " = " + fmtU(P, "W"), "I = V / R = " + fmtU(I, "A")]; }
    else if (par === "IR") { V = I * R; P = I * I * R; pasos = ["P = I² · R = " + fmt(I) + "² · " + fmt(R) + " = " + fmtU(P, "W"), "V = I · R = " + fmtU(V, "V")]; }
    else if (par === "PV") { I = P / V; R = V * V / P; pasos = ["I = P / V = " + fmt(P) + " W / " + fmt(V) + " V = " + fmtU(I, "A"), "R = V² / P = " + fmtU(R, "Ω")]; }
    else if (par === "PI") { V = P / I; R = P / (I * I); pasos = ["V = P / I = " + fmtU(V, "V"), "R = P / I² = " + fmtU(R, "Ω")]; }
    else if (par === "PR") { V = Math.sqrt(P * R); I = Math.sqrt(P / R); pasos = ["V = √(P · R) = " + fmtU(V, "V"), "I = √(P / R) = " + fmtU(I, "A")]; }
    return { P: P, V: V, I: I, R: R, pasos: pasos };
  };
  F.serie = function (l) { req(l.length > 0, "Agrega al menos una resistencia."); return l.reduce(function (a, b) { return a + b; }, 0); };
  F.paralelo = function (l) { req(l.length > 0, "Agrega al menos una resistencia."); l.forEach(function (r) { pos(r, "Resistencia"); }); return 1 / l.reduce(function (a, b) { return a + 1 / b; }, 0); };
  // Expresión: "4 + (6 || 12)". || tiene prioridad sobre +.
  F.equivalente = function (expr) {
    var s = String(expr || "").replace(/∥/g, "||").replace(/Ω|ohm(s|ios)?/gi, ""), i = 0, pasos = [];
    function esp() { while (s[i] === " ") i++; }
    function numero() {
      esp(); var m = s.slice(i).match(/^(\d+[.,]?\d*|[.,]\d+)\s*([kKMm]?)(?![a-z])/);
      req(m, "Expresión no válida cerca de «" + s.slice(i, i + 6) + "». Usa números, +, || y paréntesis.");
      i += m[0].length; var v = parseFloat(m[1].replace(",", ".")) * (PREF[m[2]] || 1); return v;
    }
    function factor() { esp(); if (s[i] === "(") { i++; var v = suma(); esp(); req(s[i] === ")", "Falta cerrar un paréntesis."); i++; return v; } return numero(); }
    function par() {
      var v = factor(); esp();
      while (s.slice(i, i + 2) === "||") { i += 2; var w = factor(); pos(v, "Resistencia"); pos(w, "Resistencia"); var r = v * w / (v + w); pasos.push(fmtU(v, "Ω") + " ∥ " + fmtU(w, "Ω") + " = (" + fmt(v) + " · " + fmt(w) + ") / (" + fmt(v) + " + " + fmt(w) + ") = " + fmtU(r, "Ω")); v = r; esp(); }
      return v;
    }
    function suma() { var v = par(); esp(); while (s[i] === "+") { i++; var w = par(); pasos.push(fmtU(v, "Ω") + " + " + fmtU(w, "Ω") + " = " + fmtU(v + w, "Ω")); v = v + w; esp(); } return v; }
    var r = suma(); esp(); req(i >= s.length, "Sobra algo al final de la expresión: «" + s.slice(i) + "».");
    return { R: r, pasos: pasos };
  };
  F.divisorV = function (Vin, R1, R2) { pos(R1, "R₁"); pos(R2, "R₂"); var I = Vin / (R1 + R2); return { Vout: Vin * R2 / (R1 + R2), VR1: Vin * R1 / (R1 + R2), I: I }; };
  F.divisorI = function (I, R1, R2) { pos(R1, "R₁"); pos(R2, "R₂"); return { I1: I * R2 / (R1 + R2), I2: I * R1 / (R1 + R2), Req: R1 * R2 / (R1 + R2) }; };
  F.costoEnergia = function (kwh, tarifa) {
    if (!tarifa || tarifa.tipo !== "escalones") return { costo: kwh * (tarifa ? tarifa.precio : 0), detalle: [] };
    var resto = kwh, prev = 0, costo = 0, det = [];
    var tramos = tarifa.tramos.slice().sort(function (a, b) { return (a.hasta || Infinity) - (b.hasta || Infinity); });
    for (var k = 0; k < tramos.length && resto > 0; k++) {
      var lim = tramos[k].hasta || Infinity, cant = Math.min(resto, lim - prev);
      if (cant > 0) { costo += cant * tramos[k].precio; det.push({ kwh: cant, precio: tramos[k].precio, sub: cant * tramos[k].precio }); resto -= cant; }
      prev = lim;
    }
    return { costo: costo, detalle: det };
  };
  F.consumo = function (aparatos, tarifa, cargoFijo) {
    var det = aparatos.map(function (a) { var kwh = a.w * a.h * a.d * (a.c || 1) / 1000; return { n: a.n, kwh: kwh }; });
    var tot = det.reduce(function (s, x) { return s + x.kwh; }, 0);
    var c = F.costoEnergia(tot, tarifa);
    det.forEach(function (x) { x.pct = tot ? x.kwh * 100 / tot : 0; x.costo = tot ? c.costo * x.kwh / tot : 0; });
    return { kwh: tot, costoEnergia: c.costo, costo: c.costo + (cargoFijo || 0), detalle: det, tramos: c.detalle };
  };
  F.standby = function (w, h, n, precio) { var kwh = w * h * 365 * (n || 1) / 1000; return { kwhAnio: kwh, costoAnio: kwh * precio, kwhMes: kwh / 12 }; };
  F.autonomia = function (mAh, V, consumo, unidad, efic) {
    pos(mAh, "Capacidad"); pos(V, "Voltaje"); pos(consumo, "Consumo");
    var e = (efic === undefined ? 100 : efic) / 100, Wh = mAh / 1000 * V, horas;
    if (unidad === "W") horas = Wh * e / consumo; else horas = mAh * e / consumo;
    return { Wh: Wh, horas: horas };
  };
  F.transformador = function (Vp, Np, Ns, Vs, P, efic) {
    pos(Vp, "Voltaje primario"); pos(Np, "Vueltas del primario");
    if (!(Ns > 0)) { pos(Vs, "Voltaje secundario o vueltas del secundario"); Ns = Np * Vs / Vp; } else Vs = Vp * Ns / Np;
    var e = (efic || 100) / 100, r = { Vs: Vs, Ns: Ns, rel: Np / Ns, tipo: Vs > Vp ? "elevador" : (Vs < Vp ? "reductor" : "aislador (1:1)") };
    if (P > 0) { r.Is = P / Vs; r.Ip = P / (Vp * e); r.Pent = P / e; }
    return r;
  };
  var COLORES = ["negro", "marrón", "rojo", "naranja", "amarillo", "verde", "azul", "violeta", "gris", "blanco"];
  var MULT = { "plata": 0.01, "dorado": 0.1 }; COLORES.forEach(function (c, k) { MULT[c] = Math.pow(10, k); });
  var TOL = { "marrón": 1, "rojo": 2, "verde": 0.5, "azul": 0.25, "violeta": 0.1, "gris": 0.05, "dorado": 5, "plata": 10, "ninguna": 20 };
  F.COLORES = COLORES; F.TOL = TOL;
  F.coloresAValor = function (bandas) { // [d1,d2,(d3),mult,tol]
    var dig = bandas.slice(0, bandas.length - 2), mult = bandas[bandas.length - 2], tol = bandas[bandas.length - 1];
    var v = 0; dig.forEach(function (c) { var k = COLORES.indexOf(c); req(k >= 0, "Color de dígito no válido: " + c); v = v * 10 + k; });
    req(MULT[mult] !== undefined, "Multiplicador no válido."); return { R: v * MULT[mult], tol: TOL[tol] };
  };
  F.valorAColores = function (R, nb) {
    pos(R, "Resistencia"); var cifras = nb === 5 ? 3 : 2;
    var exp = Math.floor(Math.log10(R)) - (cifras - 1), sig = Math.round(R / Math.pow(10, exp));
    if (sig >= Math.pow(10, cifras)) { sig = sig / 10; exp++; }
    req(exp >= -2 && exp <= 9, "Valor fuera del rango del código de colores.");
    var ds = String(sig).split("").map(function (d) { return COLORES[+d]; });
    var mult = exp === -1 ? "dorado" : exp === -2 ? "plata" : COLORES[exp];
    return { bandas: ds.concat([mult]), real: sig * Math.pow(10, exp) };
  };
  var E12 = [1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2];
  F.E12 = E12;
  F.e12Superior = function (R) { var d = Math.pow(10, Math.floor(Math.log10(R))); for (var k = 0; k < E12.length; k++) { var v = E12[k] * d; if (v >= R * 0.9999) return Math.round(v * 1000) / 1000; } return 10 * d; };
  F.led = function (Vs, Vf, I, n) {
    n = n || 1; pos(Vs, "Voltaje de la fuente"); pos(Vf, "Voltaje del LED"); pos(I, "Corriente del LED");
    var caida = Vs - Vf * n; req(caida > 0, "La fuente no alcanza: necesitas más de " + fmt(Vf * n) + " V para " + n + " LED en serie.");
    var R = caida / I, Rc = F.e12Superior(R), Ireal = caida / Rc, P = caida * Ireal;
    var Pnom = [0.125, 0.25, 0.5, 1, 2, 5].filter(function (p) { return p >= 2 * P; })[0] || 5;
    return { R: R, Rcomercial: Rc, Ireal: Ireal, P: P, Pnominal: Pnom };
  };
  var RHO = { cobre: 1.68e-8, aluminio: 2.65e-8, plata: 1.59e-8, oro: 2.44e-8, hierro: 9.7e-8, tungsteno: 5.6e-8, nicromo: 1.10e-6, grafito: 3.5e-5 };
  F.RHO = RHO;
  F.resistividad = function (mat, L, Amm2) { req(RHO[mat], "Material desconocido."); pos(L, "Longitud"); pos(Amm2, "Sección"); return { R: RHO[mat] * L / (Amm2 * 1e-6), rho: RHO[mat] }; };
  var SECC = [[1.5, 15, "16 AWG"], [2.5, 20, "14 AWG"], [4, 27, "12 AWG"], [6, 34, "10 AWG"], [10, 46, "8 AWG"], [16, 61, "6 AWG"], [25, 80, "4 AWG"], [35, 99, "2 AWG"]];
  F.SECCIONES = SECC;
  F.cable = function (I, L, S, V, mat) {
    pos(I, "Corriente"); pos(L, "Distancia"); pos(S, "Sección"); pos(V, "Voltaje");
    var rho = RHO[mat || "cobre"], R = rho * 2 * L / (S * 1e-6), dV = I * R, pct = dV * 100 / V;
    var fact = mat === "aluminio" ? 0.78 : 1, sug = null;
    for (var k = 0; k < SECC.length; k++) { var s = SECC[k], Rk = rho * 2 * L / (s[0] * 1e-6); if (s[1] * fact >= I && I * Rk * 100 / V <= 3) { sug = { mm2: s[0], awg: s[2], amp: s[1] * fact, pct: I * Rk * 100 / V }; break; } }
    var cap = null; SECC.forEach(function (s) { if (s[0] === S) cap = s[1] * fact; });
    return { R: R, dV: dV, pct: pct, sugerida: sug, capacidad: cap };
  };
  F.rms = function (v, tipo) {
    pos(v, "Valor"); var pico = tipo === "pico" ? v : tipo === "pp" ? v / 2 : v * Math.SQRT2;
    return { pico: pico, rms: pico / Math.SQRT2, pp: 2 * pico, prom: 2 * pico / Math.PI };
  };
  F.frecuencia = function (f, T) { if (f > 0) return { f: f, T: 1 / f, w: 2 * Math.PI * f }; pos(T, "Periodo o frecuencia"); return { f: 1 / T, T: T, w: 2 * Math.PI / T }; };
  F.rc = function (R, C, t, Vs) {
    pos(R, "Resistencia"); pos(C, "Capacidad"); var tau = R * C, r = { tau: tau, t5: 5 * tau };
    if (t >= 0 && Vs > 0) { r.Vcarga = Vs * (1 - Math.exp(-t / tau)); r.Vdescarga = Vs * Math.exp(-t / tau); r.pct = 100 * (1 - Math.exp(-t / tau)); }
    return r;
  };
  F.convertir = function (v, de, a) { req(PREF[de] !== undefined && PREF[a] !== undefined, "Prefijo no válido."); return v * PREF[de] / PREF[a]; };
  F.energia = function (v, u) { var J = u === "J" ? v : u === "Wh" ? v * 3600 : u === "kWh" ? v * 3.6e6 : u === "cal" ? v * 4.184 : NaN; req(!isNaN(J), "Unidad no válida."); return { J: J, Wh: J / 3600, kWh: J / 3.6e6, cal: J / 4.184 }; };
  F.mAhAWh = function (mAh, V) { return mAh * V / 1000; };
  F.WhAmAh = function (Wh, V) { return Wh * 1000 / V; };
  F.perdidas = function (P, V, R) { pos(P, "Potencia"); pos(V, "Tensión"); pos(R, "Resistencia de la línea"); var I = P / V, Pp = I * I * R; return { I: I, Pp: Pp, pct: Pp * 100 / P, caida: I * R }; };
  F.ahorroLed = function (wv, wn, h, n, precio, costoFoco) {
    var kwh = (wv - wn) * h * 365 * n / 1000, ahorro = kwh * precio, inv = n * (costoFoco || 0);
    return { kwhAnio: kwh, ahorroAnio: ahorro, inversion: inv, mesesRecuperacion: ahorro > 0 ? inv / (ahorro / 12) : Infinity };
  };
  F.coulomb = function (q1, q2, r) { pos(r, "Distancia"); return 8.99e9 * Math.abs(q1 * q2) / (r * r); };

  // ---------- Interfaz de las calculadoras ----------
  function moneda() { try { return (raiz.PROGRESO && raiz.PROGRESO.pref("moneda")) || "$"; } catch (e) { return "$"; } }
  function tarifa() { try { return +(raiz.PROGRESO && raiz.PROGRESO.pref("tarifa")) || 1.5; } catch (e) { return 1.5; } }
  function red() { try { return (raiz.PROGRESO && raiz.PROGRESO.pref("red")) || "127"; } catch (e) { return "127"; } }
  function $m(n) { return moneda() + " " + fmt(n, 2); }

  // Definiciones: campos + función que devuelve {salida, pasos[], interp}
  var DEF = {};
  DEF.C1 = { campos: [["V", "Voltaje (V)", "V", ""], ["I", "Corriente (I)", "A", "20 mA"], ["R", "Resistencia (R)", "Ω", "450"]],
    nota: "Deja vacío el valor que quieres calcular. Puedes escribir prefijos: 20 mA, 4,7 kΩ.",
    fn: function (v) { var r = F.ohm(v); var nom = { V: "Voltaje", I: "Corriente", R: "Resistencia" }[r.calc]; var u = { V: "V", I: "A", R: "Ω" }[r.calc];
      return { salida: nom + " = " + fmtU(r[r.calc], u), pasos: r.pasos, interp: r.calc === "I" ? (r.I > 0.03 ? "Más de 30 mA: si esto pasara por el cuerpo sería peligroso." : "Corriente pequeña, típica de LED y circuitos electrónicos.") : "Recuerda: V = I · R. Si duplicas la resistencia con el mismo voltaje, la corriente se reduce a la mitad." }; } };
  DEF.C2 = { campos: [["P", "Potencia (P)", "W", ""], ["V", "Voltaje (V)", "V", "127"], ["I", "Corriente (I)", "A", "11,8"], ["R", "Resistencia (R)", "Ω", ""]],
    nota: "Escribe dos valores cualesquiera y deja vacíos los otros dos.",
    fn: function (v) { var r = F.potencia(v); return { salida: "P = " + fmtU(r.P, "W") + " · V = " + fmtU(r.V, "V") + " · I = " + fmtU(r.I, "A") + " · R = " + fmtU(r.R, "Ω"), pasos: r.pasos, interp: r.P > 1000 ? "Es un aparato de alto consumo (más de 1 kW): calefactores, planchas, hornos." : "Consumo moderado." }; } };
  DEF.C3 = { campos: [["expr", "Expresión del circuito", "texto", "4 + (6 || 12)"]],
    nota: "Usa + para serie y || para paralelo. Ejemplos: 100 + 220 + 330 · 6 || 3 · 1k + (2k2 || 4k7).",
    fn: function (v) { var r = F.equivalente(v.expr); return { salida: "Resistencia equivalente = " + fmtU(r.R, "Ω"), pasos: r.pasos.length ? r.pasos : ["Un solo valor: no hay nada que reducir."], interp: "En serie la resistencia total siempre es mayor que la mayor; en paralelo siempre es menor que la menor." }; } };
  DEF.C4 = { campos: [["modo", "¿Qué quieres calcular?", "sel", "voltaje", [["voltaje", "Divisor de voltaje (serie)"], ["corriente", "Divisor de corriente (paralelo)"]]], ["X", "Voltaje de entrada (V) o corriente total (A)", "", "12"], ["R1", "R₁", "Ω", "1k"], ["R2", "R₂", "Ω", "2k"]],
    fn: function (v) {
      if (v.modo === "corriente") { var c = F.divisorI(v.X, v.R1, v.R2); return { salida: "I₁ = " + fmtU(c.I1, "A") + " · I₂ = " + fmtU(c.I2, "A"), pasos: ["I₁ = I · R₂ / (R₁ + R₂) = " + fmtU(c.I1, "A"), "I₂ = I · R₁ / (R₁ + R₂) = " + fmtU(c.I2, "A"), "Comprobación: I₁ + I₂ = " + fmtU(c.I1 + c.I2, "A")], interp: "Por la rama de menor resistencia pasa más corriente." }; }
      var d = F.divisorV(v.X, v.R1, v.R2); return { salida: "V en R₂ = " + fmtU(d.Vout, "V") + " · V en R₁ = " + fmtU(d.VR1, "V"), pasos: ["I = Vin / (R₁ + R₂) = " + fmtU(d.I, "A"), "Vout = Vin · R₂ / (R₁ + R₂) = " + fmtU(d.Vout, "V"), "Comprobación (LVK): " + fmt(d.VR1) + " + " + fmt(d.Vout) + " = " + fmt(d.VR1 + d.Vout) + " V"], interp: "La resistencia mayor se queda con la mayor parte del voltaje." };
    } };
  DEF.C6 = { campos: [["w", "Potencia en espera", "W", "3"], ["h", "Horas en espera al día", "", "20"], ["n", "Número de aparatos", "", "8"], ["p", "Tarifa por kWh", "", ""]],
    fn: function (v) { var p = isNaN(v.p) ? tarifa() : v.p; var r = F.standby(v.w, v.h, v.n, p); return { salida: fmt(r.kwhAnio) + " kWh al año · " + $m(r.costoAnio) + " al año", pasos: ["kWh/año = W × h/día × 365 × aparatos ÷ 1000", "= " + fmt(v.w) + " × " + fmt(v.h) + " × 365 × " + fmt(v.n) + " ÷ 1000 = " + fmt(r.kwhAnio) + " kWh", "Costo = " + fmt(r.kwhAnio) + " × " + fmt(p) + " = " + $m(r.costoAnio)], interp: "Desconectar o usar regletas con interruptor elimina este gasto." }; } };
  DEF.C7 = { campos: [["mAh", "Capacidad", "mAh", "10000"], ["V", "Voltaje nominal", "V", "3,7"], ["c", "Consumo del aparato", "", "500"], ["u", "Unidad del consumo", "sel", "mA", [["mA", "mA (corriente)"], ["W", "W (potencia)"]]], ["e", "Eficiencia (%)", "%", "85"]],
    fn: function (v) { var c = v.u === "mA" ? v.c / 1 : v.c; var r = F.autonomia(v.mAh, v.V, c, v.u, v.e); return { salida: "Energía: " + fmt(r.Wh) + " Wh · Autonomía ≈ " + fmt(r.horas) + " h", pasos: ["Wh = mAh ÷ 1000 × V = " + fmt(v.mAh) + " ÷ 1000 × " + fmt(v.V) + " = " + fmt(r.Wh) + " Wh", v.u === "W" ? "Horas = Wh × eficiencia ÷ W = " + fmt(r.Wh) + " × " + fmt(v.e / 100) + " ÷ " + fmt(c) + " = " + fmt(r.horas) + " h" : "Horas = mAh × eficiencia ÷ mA = " + fmt(v.mAh) + " × " + fmt(v.e / 100) + " ÷ " + fmt(c) + " = " + fmt(r.horas) + " h"], interp: r.Wh > 100 ? "Más de 100 Wh: muchas aerolíneas no permiten llevarla sin autorización." : "Es un valor estimado: el consumo real cambia con el uso y la temperatura." }; } };
  DEF.C8 = { campos: [["Vp", "Voltaje del primario", "V", "127"], ["Np", "Vueltas del primario", "", "1000"], ["Ns", "Vueltas del secundario (o deja vacío)", "", ""], ["Vs", "Voltaje del secundario deseado (si no das Ns)", "V", "12"], ["P", "Potencia de la carga (opcional)", "W", "60"], ["e", "Eficiencia (%)", "%", "95"]],
    fn: function (v) { var r = F.transformador(v.Vp, v.Np, v.Ns, v.Vs, v.P, v.e); var p = ["Vs / Vp = Ns / Np", "Ns = " + fmt(r.Ns) + " vueltas · Vs = " + fmtU(r.Vs, "V"), "Relación de vueltas Np:Ns = " + fmt(r.rel) + " : 1 (" + r.tipo + ")"];
      if (r.Is) p.push("Is = P / Vs = " + fmtU(r.Is, "A"), "Ip = P / (Vp × eficiencia) = " + fmtU(r.Ip, "A"));
      return { salida: "Vs = " + fmtU(r.Vs, "V") + " · Ns = " + fmt(r.Ns) + " vueltas" + (r.Is ? " · Is = " + fmtU(r.Is, "A") + " · Ip = " + fmtU(r.Ip, "A") : ""), pasos: p, interp: "Un transformador reductor baja el voltaje pero aumenta la corriente del lado de salida. Solo funciona con corriente alterna." }; } };
  DEF.C9 = { campos: [["modo", "Sentido", "sel", "a-valor", [["a-valor", "De colores a ohmios"], ["a-colores", "De ohmios a colores"]]], ["nb", "Número de bandas", "sel", "4", [["4", "4 bandas"], ["5", "5 bandas"]]],
      ["b1", "Banda 1", "color", "amarillo"], ["b2", "Banda 2", "color", "violeta"], ["b3", "Banda 3 (solo en 5 bandas)", "color", "negro"], ["bm", "Multiplicador", "mult", "rojo"], ["bt", "Tolerancia", "tol", "dorado"], ["R", "Valor en ohmios (para «de ohmios a colores»)", "Ω", "4k7"]],
    fn: function (v) {
      if (v.modo === "a-colores") { var c = F.valorAColores(v.R, +v.nb); return { salida: "Bandas: " + c.bandas.join(" – ") + " – (tolerancia, por ejemplo dorado ±5 %)", pasos: ["Valor más cercano representable: " + fmtU(c.real, "Ω")], interp: "Lee las bandas empezando por el extremo más alejado de la banda de tolerancia." , colores: c.bandas}; }
      var b = [v.b1, v.b2]; if (v.nb === "5") b.push(v.b3); b.push(v.bm, v.bt); var r = F.coloresAValor(b);
      return { salida: fmtU(r.R, "Ω") + " ± " + fmt(r.tol) + " %", pasos: ["Dígitos: " + b.slice(0, b.length - 2).map(function (x) { return x + " = " + COLORES.indexOf(x); }).join(", "), "Multiplicador " + v.bm + " = ×" + fmt(MULT[v.bm]), "Rango aceptable: " + fmtU(r.R * (1 - r.tol / 100), "Ω") + " a " + fmtU(r.R * (1 + r.tol / 100), "Ω")], interp: "Si el multímetro marca un valor dentro del rango, la resistencia está bien.", colores: b };
    } };
  DEF.C10 = { campos: [["Vs", "Voltaje de la fuente", "V", "9"], ["Vf", "Voltaje del LED (rojo ≈ 2 V, azul o blanco ≈ 3 V)", "V", "2"], ["I", "Corriente del LED", "A", "20 mA"], ["n", "LED en serie", "", "1"]],
    fn: function (v) { var r = F.led(v.Vs, v.Vf, v.I, v.n || 1); return { salida: "R = " + fmtU(r.R, "Ω") + " → usa " + fmtU(r.Rcomercial, "Ω") + " (serie E12) de " + fmt(r.Pnominal) + " W", pasos: ["R = (Vfuente − n·VLED) / I = (" + fmt(v.Vs) + " − " + fmt((v.n || 1) * v.Vf) + ") / " + fmt(v.I) + " = " + fmtU(r.R, "Ω"), "Valor comercial inmediato superior: " + fmtU(r.Rcomercial, "Ω"), "Corriente real = " + fmtU(r.Ireal, "A"), "Potencia en la resistencia = " + fmtU(r.P, "W") + " → resistencia de " + fmt(r.Pnominal) + " W (margen ×2)"], interp: "Se elige el valor comercial superior para no pasar de la corriente máxima del LED." }; } };
  DEF.C11 = { campos: [["I", "Corriente del circuito", "A", "15"], ["L", "Distancia del tablero a la carga (ida)", "m", "20"], ["S", "Sección del cable (mm²)", "sel", "2.5", SECC.map(function (s) { return [String(s[0]), fmt(s[0]) + " mm² (≈ " + s[2] + ")"]; })], ["V", "Voltaje del circuito", "V", ""], ["mat", "Material", "sel", "cobre", [["cobre", "Cobre"], ["aluminio", "Aluminio"]]]],
    nota: "Cálculo orientativo para aprender. El calibre real de una instalación lo decide un electricista con la norma de tu país.",
    fn: function (v) { var V = isNaN(v.V) ? +red() : v.V; var r = F.cable(v.I, v.L, +v.S, V, v.mat);
      return { salida: "Caída de tensión: " + fmtU(r.dV, "V") + " (" + fmt(r.pct) + " %)", pasos: ["R del cable (ida y vuelta) = ρ · 2L / S = " + fmtU(r.R, "Ω"), "ΔV = I · R = " + fmt(v.I) + " × " + fmt(r.R) + " = " + fmtU(r.dV, "V"), "Porcentaje = ΔV / V × 100 = " + fmt(r.pct) + " %", "Capacidad orientativa de " + fmt(+v.S) + " mm²: " + (r.capacidad ? fmt(r.capacidad) + " A" : "—"), r.sugerida ? "Sección mínima sugerida (≤ 3 % de caída y capacidad suficiente): " + fmt(r.sugerida.mm2) + " mm² (≈ " + r.sugerida.awg + ")" : "Ninguna sección de la tabla cumple: divide el circuito o acorta la distancia."],
        interp: (r.capacidad && v.I > r.capacidad ? "⚠ La corriente supera la capacidad orientativa del cable: se calentaría. " : "") + (r.pct > 3 ? "La caída supera el 3 % recomendado." : "La caída está dentro del 3 % recomendado.") }; } };
  DEF.C12 = { campos: [["v", "Valor de voltaje", "V", ""], ["tipo", "Ese valor es…", "sel", "rms", [["rms", "Eficaz (RMS)"], ["pico", "Pico"], ["pp", "Pico a pico"]]], ["f", "Frecuencia (opcional)", "Hz", ""]],
    fn: function (v) { var x = isNaN(v.v) ? +red() : v.v; var r = F.rms(x, v.tipo); var p = ["Vpico = Vrms × √2 ≈ Vrms × 1,414", "Vrms = " + fmtU(r.rms, "V") + " · Vpico = " + fmtU(r.pico, "V") + " · Vpp = " + fmtU(r.pp, "V")]; var s = "Eficaz " + fmtU(r.rms, "V") + " · Pico " + fmtU(r.pico, "V") + " · Pico a pico " + fmtU(r.pp, "V");
      if (v.f > 0) { var q = F.frecuencia(v.f); p.push("T = 1 / f = 1 / " + fmt(v.f) + " = " + fmtU(q.T, "s")); s += " · Periodo " + fmtU(q.T, "s"); }
      return { salida: s, pasos: p, interp: "El valor que se anuncia para la red (127 V, 230 V) es el eficaz: produce el mismo calor que una CD de ese valor." }; } };
  DEF.C13 = { campos: [["R", "Resistencia", "Ω", "10k"], ["C", "Capacidad", "F", "100µ"], ["t", "Instante (opcional)", "s", "1"], ["Vs", "Voltaje de la fuente", "V", "9"]],
    nota: "Prefijos de capacidad: µ (micro), n (nano), p (pico). Ejemplo: 100µ, 47n.",
    fn: function (v) { var r = F.rc(v.R, v.C, v.t, v.Vs); var p = ["τ = R · C = " + fmtU(v.R, "Ω") + " × " + fmtU(v.C, "F") + " = " + fmtU(r.tau, "s"), "Carga casi completa (≈ 99 %) en 5τ = " + fmtU(r.t5, "s")]; if (r.Vcarga !== undefined) p.push("Cargando: V(t) = Vs(1 − e^(−t/τ)) = " + fmtU(r.Vcarga, "V") + " (" + fmt(r.pct) + " %)", "Descargando: V(t) = Vs · e^(−t/τ) = " + fmtU(r.Vdescarga, "V"));
      return { salida: "τ = " + fmtU(r.tau, "s") + " · 5τ = " + fmtU(r.t5, "s"), pasos: p, interp: "En una constante de tiempo el capacitor llega al 63 % de su carga." }; } };
  DEF.C14 = { campos: [["modo", "Tipo de conversión", "sel", "prefijo", [["prefijo", "Prefijos (µ, m, k, M)"], ["energia", "Energía (J, Wh, kWh, cal)"], ["mah", "mAh a Wh"], ["wh", "Wh a mAh"]]], ["v", "Valor", "", "4700"], ["de", "Desde (prefijo o unidad)", "sel", "", [["", "sin prefijo"], ["µ", "µ (micro)"], ["m", "m (mili)"], ["k", "k (kilo)"], ["M", "M (mega)"], ["J", "J"], ["Wh", "Wh"], ["kWh", "kWh"], ["cal", "cal"]]], ["a", "Hacia (prefijo)", "sel", "k", [["", "sin prefijo"], ["µ", "µ (micro)"], ["m", "m (mili)"], ["k", "k (kilo)"], ["M", "M (mega)"]]], ["V", "Voltaje (para mAh ↔ Wh)", "V", "3,7"]],
    fn: function (v) {
      if (v.modo === "energia") { var u = ["J", "Wh", "kWh", "cal"].indexOf(v.de) >= 0 ? v.de : "Wh"; var e = F.energia(v.v, u); return { salida: fmt(e.J) + " J = " + fmt(e.Wh) + " Wh = " + fmt(e.kWh, 6) + " kWh = " + fmt(e.cal) + " cal", pasos: ["1 Wh = 3 600 J · 1 kWh = 3,6 millones de J · 1 cal = 4,184 J"], interp: "La compañía eléctrica cobra en kWh." }; }
      if (v.modo === "mah") { var w = F.mAhAWh(v.v, v.V); return { salida: fmt(v.v) + " mAh a " + fmt(v.V) + " V = " + fmt(w) + " Wh", pasos: ["Wh = mAh × V ÷ 1000"], interp: "Para comparar baterías de distinto voltaje usa Wh, no mAh." }; }
      if (v.modo === "wh") { var m = F.WhAmAh(v.v, v.V); return { salida: fmt(v.v) + " Wh a " + fmt(v.V) + " V = " + fmt(m) + " mAh", pasos: ["mAh = Wh × 1000 ÷ V"], interp: "" }; }
      var de = PREF[v.de] !== undefined ? v.de : "", r = F.convertir(v.v, de, v.a); return { salida: fmt(v.v) + " " + (de || "(unidad)") + " = " + fmt(r, 9) + " " + (v.a || "(unidad)"), pasos: ["Multiplica por " + fmt(PREF[de], 9) + " y divide entre " + fmt(PREF[v.a], 9)], interp: "Ejemplo: 4 700 Ω = 4,7 kΩ; 0,02 A = 20 mA." };
    } };
  DEF.C15 = { campos: [["mat", "Material", "sel", "cobre", Object.keys(RHO).map(function (k) { return [k, k[0].toUpperCase() + k.slice(1) + " (ρ = " + RHO[k].toExponential(2).replace(".", ",") + " Ω·m)"]; })], ["L", "Longitud", "m", "10"], ["A", "Sección (mm²)", "", "1,5"]],
    fn: function (v) { var r = F.resistividad(v.mat, v.L, v.A); return { salida: "R = " + fmtU(r.R, "Ω"), pasos: ["R = ρ · L / A", "A = " + fmt(v.A) + " mm² = " + fmt(v.A * 1e-6, 9) + " m²", "R = " + r.rho.toExponential(2).replace(".", ",") + " × " + fmt(v.L) + " / " + fmt(v.A * 1e-6, 9) + " = " + fmtU(r.R, "Ω")], interp: "Doble de largo: doble de resistencia. Doble de grueso (sección): la mitad." }; } };
  DEF.C16 = { campos: [["P", "Potencia transmitida", "W", "100M"], ["V", "Tensión de la línea", "V", "400k"], ["R", "Resistencia de la línea", "Ω", "5"]],
    fn: function (v) { var r = F.perdidas(v.P, v.V, v.R); return { salida: "Pérdida: " + fmtU(r.Pp, "W") + " (" + fmt(r.pct) + " % de la potencia)", pasos: ["I = P / V = " + fmtU(r.I, "A"), "Pérdida = I² · R = " + fmt(r.I) + "² × " + fmt(v.R) + " = " + fmtU(r.Pp, "W"), "Porcentaje = " + fmt(r.pct) + " %"], interp: "Si la tensión se multiplica por 10, la corriente se divide entre 10 y las pérdidas entre 100." }; } };
  DEF.C17 = { campos: [["wv", "Potencia del foco actual", "W", "60"], ["wn", "Potencia del LED equivalente", "W", "9"], ["h", "Horas encendido al día", "", "5"], ["n", "Número de focos", "", "10"], ["p", "Tarifa por kWh", "", ""], ["c", "Precio de cada LED", "", "40"]],
    fn: function (v) { var p = isNaN(v.p) ? tarifa() : v.p; var r = F.ahorroLed(v.wv, v.wn, v.h, v.n, p, v.c); return { salida: "Ahorro: " + fmt(r.kwhAnio) + " kWh y " + $m(r.ahorroAnio) + " al año · se recupera en " + fmt(r.mesesRecuperacion, 1) + " meses", pasos: ["kWh ahorrados = (W viejo − W nuevo) × h × 365 × n ÷ 1000 = " + fmt(r.kwhAnio), "Ahorro = " + fmt(r.kwhAnio) + " × " + fmt(p) + " = " + $m(r.ahorroAnio), "Inversión = " + fmt(v.n) + " × " + fmt(v.c) + " = " + $m(r.inversion)], interp: "Un LED dura de 15 000 a 25 000 horas; un foco incandescente, unas 1 000." }; } };

  // Aparatos típicos para C5 (potencias orientativas)
  var APARATOS = [["Refrigerador", 150, 10, 30], ["Televisor LED", 100, 4, 30], ["Focos LED (6)", 54, 5, 30], ["Lavadora", 500, 1, 8], ["Plancha", 1200, 0.5, 8], ["Microondas", 1200, 0.25, 30], ["Computadora portátil", 60, 6, 22], ["Cargador de celular", 10, 3, 30], ["Ventilador", 60, 6, 30], ["Hervidor eléctrico", 1500, 0.2, 30], ["Secadora de cabello", 1500, 0.15, 20], ["Aire acondicionado", 1200, 6, 30]];
  F.APARATOS = APARATOS;

  function el(tag, attrs, html) { var e = document.createElement(tag); if (attrs) Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); }); if (html !== undefined) e.innerHTML = html; return e; }
  function escH(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  var COLHEX = { negro: "#111", "marrón": "#7a4a1f", rojo: "#d22", naranja: "#f80", amarillo: "#fd0", verde: "#1a3", azul: "#26d", violeta: "#82c", gris: "#888", blanco: "#fafafa", dorado: "#c9a227", plata: "#c0c0c0", ninguna: "transparent" };

  function dibujarResistor(cols) {
    var x = 70, s = '<svg viewBox="0 0 300 70" class="sim-lienzo" role="img" aria-label="Resistencia con bandas: ' + cols.join(", ") + '" style="max-width:320px"><line x1="0" y1="35" x2="300" y2="35" stroke="currentColor" stroke-width="4"/><rect x="55" y="15" width="190" height="40" rx="18" fill="#e9d3a5" stroke="currentColor"/>';
    cols.forEach(function (c, k) { var px = k === cols.length - 1 ? 215 : x + k * 26; s += '<rect x="' + px + '" y="15" width="12" height="40" fill="' + (COLHEX[c] || "#000") + '" stroke="#0003"/>'; });
    return s + "</svg>";
  }

  function renderGenerico(cont, id) {
    var d = DEF[id], f = el("form", { "class": "panel calc", novalidate: "" });
    f.innerHTML = (d.nota ? '<p class="sim-nota">' + escH(d.nota) + "</p>" : "") + '<div class="campos"></div><div class="botones"><button class="btn" type="submit">Calcular</button><button class="btn sec" type="reset">Limpiar</button></div><div class="salida" aria-live="polite"></div><div class="salida-pasos" hidden></div><p class="interp sim-nota"></p><div class="extra"></div>';
    var cs = f.querySelector(".campos");
    d.campos.forEach(function (c) {
      var idc = "c-" + id + "-" + c[0], w = el("div", { "class": "campo" }), lab = escH(c[1]) + (c[2] && ["sel", "texto", "color", "mult", "tol"].indexOf(c[2]) < 0 ? ' <span class="unidad">(' + escH(c[2]) + ")</span>" : "");
      var ctrl;
      if (c[2] === "sel" || c[2] === "color" || c[2] === "mult" || c[2] === "tol") {
        var ops = c[2] === "sel" ? c[4] : (c[2] === "color" ? COLORES : c[2] === "mult" ? COLORES.concat(["dorado", "plata"]) : Object.keys(TOL)).map(function (o) { return typeof o === "string" ? [o, o] : o; });
        ctrl = '<select id="' + idc + '" name="' + c[0] + '">' + ops.map(function (o) { return '<option value="' + escH(o[0]) + '"' + (o[0] === c[3] ? " selected" : "") + ">" + escH(o[1]) + "</option>"; }).join("") + "</select>";
      } else ctrl = '<input id="' + idc + '" name="' + c[0] + '" type="text" inputmode="' + (c[2] === "texto" ? "text" : "decimal") + '" value="' + escH(c[3]) + '">';
      w.innerHTML = '<label for="' + idc + '">' + lab + "</label>" + ctrl; cs.appendChild(w);
    });
    function calcular(ev) {
      if (ev) ev.preventDefault();
      var v = {};
      d.campos.forEach(function (c) { var x = f.elements[c[0]].value; v[c[0]] = (["sel", "texto", "color", "mult", "tol"].indexOf(c[2]) >= 0) ? x : (x.trim() === "" ? NaN : parse(x, c[2] === "%" ? "%" : c[2])); });
      var sal = f.querySelector(".salida"), pas = f.querySelector(".salida-pasos"), it = f.querySelector(".interp"), ex = f.querySelector(".extra");
      try {
        d.campos.forEach(function (c) { var x = f.elements[c[0]].value; if (["sel", "texto", "color", "mult", "tol"].indexOf(c[2]) < 0 && x.trim() !== "" && isNaN(v[c[0]])) throw new Error("No entiendo el valor «" + x + "» en «" + c[1] + "»."); });
        var r = d.fn(v);
        sal.className = "salida"; sal.textContent = r.salida; pas.hidden = false; pas.textContent = "Pasos:\n" + r.pasos.join("\n"); it.textContent = r.interp || "";
        ex.innerHTML = r.colores ? dibujarResistor(r.colores) : "";
      } catch (e) { sal.className = "salida error-campo"; sal.textContent = e.message; pas.hidden = true; it.textContent = ""; ex.innerHTML = ""; }
    }
    f.addEventListener("submit", calcular);
    f.addEventListener("reset", function () { setTimeout(function () { f.querySelector(".salida").textContent = ""; f.querySelector(".salida-pasos").hidden = true; f.querySelector(".interp").textContent = ""; f.querySelector(".extra").innerHTML = ""; }, 0); });
    cont.appendChild(f); calcular();
  }

  function renderC5(cont) {
    var f = el("div", { "class": "panel calc" }), filas = APARATOS.slice(0, 6).map(function (a) { return { n: a[0], w: a[1], h: a[2], d: a[3], c: 1 }; });
    f.innerHTML = '<p class="sim-nota">Agrega tus aparatos con su potencia (W, en la etiqueta), horas de uso al día y días al mes. La tarifa se toma de Ajustes si dejas el campo vacío.</p>' +
      '<div class="lista-aparatos"></div><div class="botones"><select class="sel-tipico" aria-label="Aparato típico">' + APARATOS.map(function (a, k) { return '<option value="' + k + '">' + escH(a[0]) + " (" + a[1] + " W)</option>"; }).join("") + '</select><button class="btn sec" type="button" data-a="agregar">Agregar aparato</button></div>' +
      '<div class="campos"><div class="campo"><label for="c5-tipo">Tipo de tarifa</label><select id="c5-tipo"><option value="fija">Fija (un precio por kWh)</option><option value="escalones">Por escalones</option></select></div><div class="campo"><label for="c5-precio">Precio por kWh (tarifa fija)</label><input id="c5-precio" type="text" inputmode="decimal" placeholder="Ajustes"></div>' +
      '<div class="campo"><label for="c5-esc">Escalones (hasta kWh:precio, separados por punto y coma)</label><input id="c5-esc" type="text" value="75:1,0; 140:1,3; :3,8"></div><div class="campo"><label for="c5-fijo">Cargo fijo mensual</label><input id="c5-fijo" type="text" inputmode="decimal" value="0"></div></div>' +
      '<div class="botones"><button class="btn" type="button" data-a="calc">Calcular</button></div><div class="salida" aria-live="polite"></div><div class="salida-pasos" hidden></div><div class="grafica"></div><p class="interp sim-nota"></p>';
    var lista = f.querySelector(".lista-aparatos");
    function pintar() {
      lista.innerHTML = filas.map(function (a, k) {
        return '<div class="fila-aparato" data-k="' + k + '"><div><label for="ap-n' + k + '">Aparato</label><input id="ap-n' + k + '" data-c="n" type="text" value="' + escH(a.n) + '"></div><div><label for="ap-w' + k + '">Potencia (W)</label><input id="ap-w' + k + '" data-c="w" type="text" inputmode="decimal" value="' + fmt(a.w) + '"></div><div><label for="ap-h' + k + '">Horas/día</label><input id="ap-h' + k + '" data-c="h" type="text" inputmode="decimal" value="' + fmt(a.h) + '"></div><div><label for="ap-d' + k + '">Días/mes</label><input id="ap-d' + k + '" data-c="d" type="text" inputmode="decimal" value="' + fmt(a.d) + '"></div><div><label for="ap-c' + k + '">Cantidad</label><input id="ap-c' + k + '" data-c="c" type="text" inputmode="decimal" value="' + fmt(a.c) + '"></div><div><button class="btn sec" type="button" data-a="quitar" data-k="' + k + '" aria-label="Quitar ' + escH(a.n) + '">Quitar</button></div></div>';
      }).join("");
    }
    function leer() { lista.querySelectorAll(".fila-aparato").forEach(function (fila) { var k = +fila.getAttribute("data-k"); fila.querySelectorAll("input").forEach(function (i) { var c = i.getAttribute("data-c"); filas[k][c] = c === "n" ? i.value : parse(i.value); }); }); }
    function calc() {
      leer(); var sal = f.querySelector(".salida"), pas = f.querySelector(".salida-pasos"), g = f.querySelector(".grafica");
      try {
        filas.forEach(function (a) { req(isFinite(a.w) && isFinite(a.h) && isFinite(a.d) && isFinite(a.c), "Revisa los números de «" + a.n + "»."); });
        var tipo = f.querySelector("#c5-tipo").value, tar;
        if (tipo === "escalones") {
          var tr = f.querySelector("#c5-esc").value.split(";").map(function (x) { var p = x.split(":"); return { hasta: p[0].trim() === "" ? Infinity : parse(p[0]), precio: parse(p[1]) }; });
          tr.forEach(function (t) { req(isFinite(t.precio) && t.precio >= 0, "Escalones no válidos. Ejemplo: 75:1,0; 140:1,3; :3,8"); });
          tar = { tipo: "escalones", tramos: tr };
        } else { var pr = f.querySelector("#c5-precio").value.trim(); tar = { tipo: "fija", precio: pr ? parse(pr) : tarifa() }; req(isFinite(tar.precio), "Precio por kWh no válido."); }
        var fijo = parse(f.querySelector("#c5-fijo").value || "0") || 0, r = F.consumo(filas, tar, fijo);
        sal.className = "salida"; sal.textContent = "Consumo: " + fmt(r.kwh) + " kWh al mes · Costo estimado: " + $m(r.costo);
        pas.hidden = false; pas.textContent = "Pasos:\nkWh = W × horas/día × días × cantidad ÷ 1000\n" + r.detalle.map(function (x) { return "• " + x.n + ": " + fmt(x.kwh) + " kWh (" + fmt(x.pct, 1) + " %) ≈ " + $m(x.costo); }).join("\n") + (r.tramos.length ? "\nEscalones: " + r.tramos.map(function (t) { return fmt(t.kwh) + " kWh × " + fmt(t.precio) + " = " + fmt(t.sub, 2); }).join(" + ") : "") + (fijo ? "\nCargo fijo: " + $m(fijo) : "");
        var orden = r.detalle.slice().sort(function (a, b) { return b.kwh - a.kwh; }), max = orden[0] ? orden[0].kwh : 1;
        g.innerHTML = '<svg viewBox="0 0 400 ' + (orden.length * 26 + 10) + '" class="sim-lienzo" role="img" aria-label="Reparto del consumo por aparato">' + orden.map(function (x, k) { var w = max ? 200 * x.kwh / max : 0; return '<text x="4" y="' + (k * 26 + 22) + '" font-size="12" fill="currentColor">' + escH(x.n.slice(0, 22)) + '</text><rect x="160" y="' + (k * 26 + 9) + '" width="' + w.toFixed(1) + '" height="16" rx="3" fill="var(--accent)"/><text x="' + (166 + w).toFixed(1) + '" y="' + (k * 26 + 22) + '" font-size="12" fill="currentColor">' + fmt(x.pct, 1) + ' %</text>'; }).join("") + "</svg>";
        f.querySelector(".interp").textContent = orden[0] ? "El aparato que más consume es «" + orden[0].n + "». Reducir su uso es lo que más baja el recibo." : "";
      } catch (e) { sal.className = "salida error-campo"; sal.textContent = e.message; pas.hidden = true; g.innerHTML = ""; }
    }
    f.addEventListener("click", function (e) {
      var a = e.target.getAttribute("data-a"); if (!a) return;
      if (a === "agregar") { leer(); var t = APARATOS[+f.querySelector(".sel-tipico").value]; filas.push({ n: t[0], w: t[1], h: t[2], d: t[3], c: 1 }); pintar(); calc(); }
      if (a === "quitar") { leer(); filas.splice(+e.target.getAttribute("data-k"), 1); pintar(); calc(); }
      if (a === "calc") calc();
    });
    pintar(); cont.appendChild(f); calc();
  }

  function render(cont, id) { if (id === "C5") renderC5(cont); else if (DEF[id]) renderGenerico(cont, id); else cont.innerHTML = "<p>Calculadora no encontrada.</p>"; }

  var API = { F: F, NUM: NUM, DEF: DEF, render: render };
  raiz.NUM = NUM; raiz.CALC = API;
  if (typeof module !== "undefined" && module.exports) module.exports = API;
})(typeof window !== "undefined" ? window : globalThis);
