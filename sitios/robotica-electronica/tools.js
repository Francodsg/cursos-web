// Calculadoras del curso. CALC contiene funciones puras (probadas en pruebas.js); TOOLS, la interfaz.
(function(root){
"use strict";
const COLORES = [["negro", "#111", 0], ["marrón", "#7a4a1d", 1], ["rojo", "#d32020", 2], ["naranja", "#f07c12", 3], ["amarillo", "#f2d211", 4], ["verde", "#2c9a3c", 5], ["azul", "#2457c5", 6], ["violeta", "#7d3cc0", 7], ["gris", "#888", 8], ["blanco", "#f4f4f4", 9]];
const MULT = [["negro", 1], ["marrón", 10], ["rojo", 100], ["naranja", 1e3], ["amarillo", 1e4], ["verde", 1e5], ["azul", 1e6], ["dorado", 0.1], ["plateado", 0.01]];
const TOL = [["marrón", 1], ["rojo", 2], ["verde", 0.5], ["azul", 0.25], ["violeta", 0.1], ["dorado", 5], ["plateado", 10]];
const SERIE_E12 = [10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82];

const CALC = {
  // Ley de Ohm: pasa dos de V (voltios), I (amperios), R (ohmios); devuelve las tres y la potencia.
  ohm({V, I, R}){
    const has = x => typeof x === "number" && !isNaN(x);
    if (has(V) && has(I) && !has(R)) R = V / I;
    else if (has(V) && has(R) && !has(I)) I = V / R;
    else if (has(I) && has(R) && !has(V)) V = I * R;
    else if (!(has(V) && has(I) && has(R))) return null;
    return {V, I, R, P: V * I};
  },
  // Resistencia para un LED: (Vfuente − VLED) / I. I en amperios.
  led(vf, vled, i){ if (!(i > 0) || vf <= vled) return null; const R = (vf - vled) / i; return {R, P: (vf - vled) * i, comercial: CALC.siguienteE12(R)}; },
  // Valor comercial E12 igual o superior (más seguro para un LED).
  siguienteE12(r){ if (!(r > 0)) return null; let dec = Math.pow(10, Math.floor(Math.log10(r)) - 1);
    for (let k = 0; k < 3; k++){ for (const b of SERIE_E12){ const v = Math.round(b * dec * 1000) / 1000; if (v >= r - 1e-9) return v; } dec *= 10; } return null; },
  // Código de colores de 4 bandas: dígito, dígito, multiplicador, tolerancia.
  colores(d1, d2, mult, tol){ return {R: (d1 * 10 + d2) * mult, tol}; },
  // Divisor de voltaje: Vout = Vin · R2 / (R1 + R2).
  divisor(vin, r1, r2){ if (!(r1 + r2 > 0)) return null; return vin * r2 / (r1 + r2); },
  // Constante de tiempo RC: τ = R·C (segundos); 5τ ≈ carga completa.
  rc(r, c){ const tau = r * c; return {tau, carga: 5 * tau, pct1: 63.2}; },
  // Autonomía (horas) = capacidad (mAh) × factor (0,8 por defecto) / consumo medio (mA).
  autonomia(mah, ma, factor){ if (!(ma > 0)) return null; return mah * (factor == null ? 0.8 : factor) / ma; },
  // Serie y paralelo de resistencias.
  serie(list){ return list.reduce((s, r) => s + r, 0); },
  paralelo(list){ if (!list.length || list.some(r => !(r > 0))) return null; return 1 / list.reduce((s, r) => s + 1 / r, 0); },
  // Potencia que disipa un regulador lineal: (Vin − Vout) · I.
  regulador(vin, vout, i){ return Math.max(0, (vin - vout) * i); },
  // Distancia con ultrasonido: d (cm) = t (µs) · 0,0343 / 2.
  ultrasonido(us){ return us * 0.0343 / 2; },
  // Energía de una batería: Wh = mAh · V / 1000.
  wh(mah, v){ return mah * v / 1000; },
  // ADC: lectura → voltaje (10 bits por defecto).
  adc(lectura, vref, bits){ return lectura * (vref == null ? 5 : vref) / (Math.pow(2, bits || 10) - 1); }
};

const num = v => { const n = parseFloat(String(v).replace(",", ".")); return isNaN(n) ? undefined : n; };
const f = (n, d) => n == null || isNaN(n) ? "—" : String(Math.round(n * Math.pow(10, d == null ? 3 : d)) / Math.pow(10, d == null ? 3 : d)).replace(".", ",");
const unidad = (n, u) => { if (n == null || isNaN(n)) return "—"; const a = Math.abs(n);
  if (u === "Ω") return a >= 1e6 ? f(n / 1e6) + " MΩ" : a >= 1e3 ? f(n / 1e3) + " kΩ" : f(n, 2) + " Ω";
  if (u === "A") return a < 1 ? f(n * 1000, 2) + " mA" : f(n) + " A";
  if (u === "W") return a < 1 ? f(n * 1000, 1) + " mW" : f(n) + " W";
  if (u === "s") return a < 1 ? f(n * 1000, 2) + " ms" : f(n) + " s";
  return f(n) + " " + u; };
const inp = (id, label, val, extra) => `<label>${label}<input class="input" id="${id}" inputmode="decimal" value="${val == null ? "" : val}" ${extra || ""}></label>`;
const sel = (id, label, opts, v) => `<label>${label}<select id="${id}">${opts.map(([t, val]) => `<option value="${val}"${val == v ? " selected" : ""}>${t}</option>`).join("")}</select></label>`;
const live = (root, fn) => { const run = () => { try { fn(); } catch(e){} }; root.querySelectorAll("input,select").forEach(e => e.oninput = e.onchange = run); run(); };
const $ = (root, id) => root.querySelector("#" + id);

const TOOLS = [
 {id: "ohm", t: "Ley de Ohm", d: "Escribe dos valores (voltaje, corriente o resistencia) y calcula el tercero y la potencia.",
  nota: "V = I · R. Deja vacío el valor que quieras calcular. La corriente se escribe en miliamperios (mA): 20 mA = 0,02 A.",
  html: () => `<div class="fields">${inp("v", "Voltaje (V)", 9)}${inp("i", "Corriente (mA)", "")}${inp("r", "Resistencia (Ω)", 450)}</div><div class="out" id="out" aria-live="polite"></div>`,
  bind(root){ live(root, () => { const i = num($(root, "i").value); const r = CALC.ohm({V: num($(root, "v").value), I: i == null ? undefined : i / 1000, R: num($(root, "r").value)});
    $(root, "out").innerHTML = r ? `Voltaje: <b>${unidad(r.V, "V")}</b> · Corriente: <b>${unidad(r.I, "A")}</b> · Resistencia: <b>${unidad(r.R, "Ω")}</b> · Potencia: <b>${unidad(r.P, "W")}</b>` : "Escribe exactamente dos de los tres valores."; }); }},
 {id: "led", t: "Resistencia para un LED", d: "Calcula la resistencia que protege a un LED según la fuente y el color.",
  nota: "R = (V fuente − V LED) / I. Se recomienda el valor comercial igual o mayor. Caídas típicas: rojo 1,8–2 V; amarillo 2 V; verde 2,1–3 V; azul y blanco 3–3,2 V. Corriente segura: 10–20 mA.",
  html: () => `<div class="fields">${inp("vf", "Voltaje de la fuente (V)", 5)}${sel("vl", "Color del LED", [["Rojo (2 V)", 2], ["Amarillo (2,1 V)", 2.1], ["Verde (2,2 V)", 2.2], ["Azul (3,1 V)", 3.1], ["Blanco (3,2 V)", 3.2]], 2)}${inp("ia", "Corriente (mA)", 15)}</div><div class="out" id="out" aria-live="polite"></div>`,
  bind(root){ live(root, () => { const r = CALC.led(num($(root, "vf").value), num($(root, "vl").value), num($(root, "ia").value) / 1000);
    $(root, "out").innerHTML = r ? `Resistencia exacta: <b>${unidad(r.R, "Ω")}</b> · Valor comercial recomendado (serie E12): <b>${unidad(r.comercial, "Ω")}</b> · Potencia en la resistencia: <b>${unidad(r.P, "W")}</b> (una de 1/4 W basta si es menor de 125 mW)` : "La fuente debe ser mayor que el voltaje del LED y la corriente mayor que 0."; }); }},
 {id: "colores", t: "Código de colores de resistencias", d: "Elige los colores de las 4 bandas y obtén el valor, o al revés.",
  nota: "Lee la resistencia con la banda dorada o plateada a la derecha. Bandas 1 y 2: dígitos; banda 3: multiplicador; banda 4: tolerancia.",
  html: () => `<div class="resistor" aria-hidden="true"><span class="lead"></span><div class="body"><span id="b1"></span><span id="b2"></span><span id="b3"></span><span id="b4" style="margin-left:14px"></span></div><span class="lead"></span></div>
   <div class="fields">${sel("c1", "Banda 1", COLORES.slice(1).map(c => [c[0], c[2]]), 4)}${sel("c2", "Banda 2", COLORES.map(c => [c[0], c[2]]), 7)}${sel("c3", "Multiplicador", MULT.map(m => [m[0] + " (×" + String(m[1]).replace(".", ",") + ")", m[1]]), 10)}${sel("c4", "Tolerancia", TOL.map(t => [t[0] + " (±" + String(t[1]).replace(".", ",") + " %)", t[1]]), 5)}</div>
   <div class="out" id="out" aria-live="polite"></div>
   <h3>Del valor a los colores</h3><div class="fields">${inp("val", "Valor en ohmios", 220)}</div><div class="out" id="out2" aria-live="polite"></div>`,
  bind(root){
    const hex = name => (COLORES.find(c => c[0] === name) || {1: name === "dorado" ? "#c9a227" : name === "plateado" ? "#c0c0c0" : "#999"})[1];
    live(root, () => { const d1 = +$(root, "c1").value, d2 = +$(root, "c2").value, m = +$(root, "c3").value, t = +$(root, "c4").value, r = CALC.colores(d1, d2, m, t);
      const nm = (sel, v) => [...$(root, sel).options].find(o => o.value == v).textContent.split(" ")[0];
      ["c1", "c2", "c3", "c4"].forEach((s, k) => $(root, "b" + (k + 1)).style.background = hex(nm(s, $(root, s).value)));
      $(root, "out").innerHTML = `Valor: <b>${unidad(r.R, "Ω")}</b> ± ${String(t).replace(".", ",")} % (entre ${unidad(r.R * (1 - t / 100), "Ω")} y ${unidad(r.R * (1 + t / 100), "Ω")})`;
      const v = num($(root, "val").value);
      if (v >= 10){ const e = Math.floor(Math.log10(v)) - 1, dd = Math.round(v / Math.pow(10, e)); const a = Math.floor(dd / 10), b = dd % 10; const mm = MULT.find(x => Math.abs(x[1] - Math.pow(10, e)) < 1e-9);
        $(root, "out2").innerHTML = mm ? `${unidad(v, "Ω")} → <b>${COLORES[a][0]}, ${COLORES[b][0]}, ${mm[0]}</b> + tolerancia (dorado = ±5 %)` + (dd * Math.pow(10, e) !== v ? ` (redondeado a ${unidad(dd * Math.pow(10, e), "Ω")})` : "") : "Valor fuera de rango."; }
      else $(root, "out2").textContent = "Escribe un valor de 10 Ω o más."; }); }},
 {id: "divisor", t: "Divisor de voltaje", d: "Calcula el voltaje de salida de dos resistencias en serie.",
  nota: "Vout = Vin · R2 / (R1 + R2). Sirve para leer sensores resistivos (LDR, termistor) o bajar 5 V a 3,3 V para señales (no para alimentar motores).",
  html: () => `<div class="fields">${inp("vin", "Vin (V)", 5)}${inp("r1", "R1, arriba (Ω)", 10000)}${inp("r2", "R2, abajo (Ω)", 20000)}</div><div class="out" id="out" aria-live="polite"></div>`,
  bind(root){ live(root, () => { const vin = num($(root, "vin").value), r1 = num($(root, "r1").value), r2 = num($(root, "r2").value), v = CALC.divisor(vin, r1, r2);
    $(root, "out").innerHTML = v == null ? "Revisa los valores." : `Vout = <b>${unidad(v, "V")}</b> · Corriente por el divisor: ${unidad(vin / (r1 + r2), "A")}`; }); }},
 {id: "serie-paralelo", t: "Resistencias en serie y paralelo", d: "Suma resistencias en serie o en paralelo.",
  nota: "Serie: R = R1 + R2 + … · Paralelo: 1/R = 1/R1 + 1/R2 + … (el resultado en paralelo siempre es menor que la menor).",
  html: () => `<div class="fields"><label>Valores en ohmios, separados por espacios<input class="input" id="lst" value="220 330 1000"></label></div><div class="out" id="out" aria-live="polite"></div>`,
  bind(root){ live(root, () => { const l = $(root, "lst").value.split(/[\s;]+/).map(num).filter(x => x > 0);
    $(root, "out").innerHTML = l.length ? `En serie: <b>${unidad(CALC.serie(l), "Ω")}</b> · En paralelo: <b>${unidad(CALC.paralelo(l), "Ω")}</b>` : "Escribe al menos un valor."; }); }},
 {id: "rc", t: "Constante de tiempo RC", d: "Cuánto tarda un condensador en cargarse a través de una resistencia.",
  nota: "τ = R · C. En 1 τ el condensador llega al 63 %; en 5 τ se considera cargado (99 %).",
  html: () => `<div class="fields">${inp("r", "Resistencia (Ω)", 10000)}${inp("c", "Capacidad (µF)", 100)}</div><div class="out" id="out" aria-live="polite"></div>`,
  bind(root){ live(root, () => { const r = CALC.rc(num($(root, "r").value), num($(root, "c").value) / 1e6);
    $(root, "out").innerHTML = `τ = <b>${unidad(r.tau, "s")}</b> · Carga casi completa (5 τ): <b>${unidad(r.carga, "s")}</b>`; }); }},
 {id: "autonomia", t: "Autonomía de una batería", d: "Calcula cuántas horas funcionará tu proyecto con una batería.",
  nota: "Horas ≈ capacidad (mAh) × 0,8 / consumo medio (mA). El 0,8 deja margen por pérdidas y porque no conviene descargar del todo una batería.",
  html: () => `<div class="fields">${inp("mah", "Capacidad (mAh)", 2000)}${inp("ma", "Consumo medio (mA)", 250)}${inp("fac", "Factor de uso (0–1)", "0,8")}${inp("vb", "Voltaje de la batería (V)", "7,4")}</div><div class="out" id="out" aria-live="polite"></div>`,
  bind(root){ live(root, () => { const h = CALC.autonomia(num($(root, "mah").value), num($(root, "ma").value), num($(root, "fac").value));
    $(root, "out").innerHTML = h == null ? "El consumo debe ser mayor que 0." : `Autonomía: <b>${f(h, 2)} h</b> (≈ ${Math.round(h * 60)} minutos) · Energía almacenada: ${f(CALC.wh(num($(root, "mah").value), num($(root, "vb").value), 2), 2)} Wh`; }); }},
 {id: "regulador", t: "Calor en un regulador lineal", d: "Cuánta potencia se convierte en calor en un 7805 o AMS1117.",
  nota: "P = (Vin − Vout) · I. Por encima de ~1 W un 7805 sin disipador se calienta demasiado: usa un disipador o un convertidor buck.",
  html: () => `<div class="fields">${inp("vin", "Vin (V)", 12)}${inp("vout", "Vout (V)", 5)}${inp("i", "Corriente (mA)", 300)}</div><div class="out" id="out" aria-live="polite"></div>`,
  bind(root){ live(root, () => { const p = CALC.regulador(num($(root, "vin").value), num($(root, "vout").value), num($(root, "i").value) / 1000);
    $(root, "out").innerHTML = `Potencia disipada: <b>${unidad(p, "W")}</b> ${p > 1 ? "· ⚠️ Necesitas disipador o un convertidor conmutado." : "· Aceptable."}`; }); }},
 {id: "ultrasonido", t: "Distancia por ultrasonido", d: "Convierte el tiempo de eco del HC-SR04 en distancia.",
  nota: "d (cm) = t (µs) × 0,0343 / 2. Se divide entre 2 porque el sonido va y vuelve. 343 m/s es la velocidad del sonido a unos 20 °C.",
  html: () => `<div class="fields">${inp("t", "Tiempo de eco (µs)", 1166)}</div><div class="out" id="out" aria-live="polite"></div>`,
  bind(root){ live(root, () => { $(root, "out").innerHTML = `Distancia: <b>${f(CALC.ultrasonido(num($(root, "t").value)), 1)} cm</b>`; }); }},
 {id: "adc", t: "Lectura analógica a voltaje", d: "Convierte un valor de analogRead() en voltios.",
  nota: "V = lectura × Vref / (2^bits − 1). Arduino Uno: 10 bits (0–1023) y 5 V; ESP32: 12 bits (0–4095) y unos 3,3 V.",
  html: () => `<div class="fields">${inp("l", "Lectura", 512)}${inp("vr", "Voltaje de referencia (V)", 5)}${sel("b", "Resolución", [["10 bits (Arduino Uno)", 10], ["12 bits (ESP32)", 12]], 10)}</div><div class="out" id="out" aria-live="polite"></div>`,
  bind(root){ live(root, () => { $(root, "out").innerHTML = `Voltaje: <b>${f(CALC.adc(num($(root, "l").value), num($(root, "vr").value), +$(root, "b").value), 3)} V</b>`; }); }},
 {id: "pines", t: "Mapa de pines del Arduino Uno", d: "Qué hace cada pin del Arduino Uno y cuáles tienen PWM, I2C o SPI.",
  html: () => `<div class="tbl"><table><thead><tr><th>Pin</th><th>Funciones</th><th>Notas</th></tr></thead><tbody>${[
    ["D0 (RX), D1 (TX)", "Digital, serial (UART)", "Los usa el USB: evítalos si usas el monitor serie."],
    ["D2, D3", "Digital, interrupciones externas", "D3 también PWM."], ["D3, D5, D6, D9, D10, D11", "PWM (analogWrite)", "Marcados con ~ en la placa."],
    ["D10 (SS), D11 (MOSI), D12 (MISO), D13 (SCK)", "SPI", "D13 tiene el LED integrado."], ["A0–A5", "Entradas analógicas (10 bits) y digitales", "A4 = SDA y A5 = SCL (I2C)."],
    ["5V", "Salida de 5 V", "Desde USB o el regulador. No alimentes motores desde aquí."], ["3.3V", "Salida de 3,3 V", "Unos 50 mA como máximo."],
    ["GND", "Tierra (0 V)", "Une siempre la tierra de todas las fuentes."], ["VIN", "Entrada de 7–12 V", "Pasa por el regulador interno."],
    ["Corriente por pin", "20 mA recomendados (40 mA máximo absoluto)", "Total de la placa: unos 200 mA."]].map(r => `<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join("")}</tbody></table></div>`}
];
root.CALC = CALC; root.TOOLS = TOOLS;
if (typeof module !== "undefined") module.exports = {CALC, TOOLS};
})(typeof window !== "undefined" ? window : globalThis);
