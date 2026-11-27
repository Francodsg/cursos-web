// Pruebas de las fórmulas de las calculadoras, simulaciones y preguntas generadas.
// Ejecutar: node pruebas/pruebas-calculos.js
"use strict";
const { cargar } = require("./cargar");
const { ctx } = cargar();
const F = ctx.CALC.F, N = ctx.NUM, S = ctx.SIMS, Q = ctx.QUIZ;
let ok = 0, fallo = 0;
function cerca(nombre, real, esperado, tol) {
  tol = tol === undefined ? 0.005 : tol;
  const bien = esperado === 0 ? Math.abs(real) < 1e-9 : Math.abs(real - esperado) <= Math.abs(esperado) * tol;
  if (bien) ok++; else { fallo++; console.log("FALLO " + nombre + ": " + real + " (esperado " + esperado + ")"); }
}
function igual(nombre, real, esperado) { if (JSON.stringify(real) === JSON.stringify(esperado)) ok++; else { fallo++; console.log("FALLO " + nombre + ": " + JSON.stringify(real) + " (esperado " + JSON.stringify(esperado) + ")"); } }
function lanza(nombre, fn) { try { fn(); fallo++; console.log("FALLO " + nombre + ": debía dar error"); } catch (e) { ok++; } }

// Formato y lectura de números
igual("fmt coma decimal", N.fmt(1.5), "1,5");
igual("fmt miles", N.fmt(12345), "12 345");
igual("fmtU mA", N.fmtU(0.02, "A"), "20 mA");
igual("fmtU kΩ", N.fmtU(4700, "Ω"), "4,7 kΩ");
cerca("parse 20 mA", N.parse("20 mA", "A"), 0.02);
cerca("parse 0,02 A", N.parse("0,02 A", "A"), 0.02);
cerca("parse 4,7 kΩ", N.parse("4,7 kΩ", "Ω"), 4700);
cerca("parse 4k7", N.parse("4k7", "Ω"), 4700);
cerca("parse 100µ", N.parse("100µ", "F"), 1e-4);
cerca("parse 1.5", N.parse("1.5"), 1.5);
cerca("parse 400k", N.parse("400k", "V"), 400000);
cerca("parse 100M", N.parse("100M", "W"), 1e8);
igual("parse texto no válido", isNaN(N.parse("hola")), true);

// C1 Ohm
cerca("Ohm I = 9/450", F.ohm({ V: 9, I: NaN, R: 450 }).I, 0.02);
cerca("Ohm V = 0,02·450", F.ohm({ V: NaN, I: 0.02, R: 450 }).V, 9);
cerca("Ohm R = 12/0,5", F.ohm({ V: 12, I: 0.5, R: NaN }).R, 24);
lanza("Ohm con tres datos", () => F.ohm({ V: 1, I: 1, R: 1 }));
lanza("Ohm con R = 0", () => F.ohm({ V: 9, I: NaN, R: 0 }));
// C2 potencia
cerca("P = V·I (127 V, 11,8 A)", F.potencia({ V: 127, I: 11.8 }).P, 1498.6);
cerca("I microondas 1500 W a 127 V", F.potencia({ P: 1500, V: 127 }).I, 11.811);
cerca("P = V²/R", F.potencia({ V: 12, R: 6 }).P, 24);
cerca("V desde P y R", F.potencia({ P: 100, R: 4 }).V, 20);
// C3 equivalentes
cerca("Serie 100+220+330", F.equivalente("100 + 220 + 330").R, 650);
cerca("Paralelo 6||3", F.equivalente("6 || 3").R, 2);
cerca("Mixto 4 + (6||12)", F.equivalente("4 + (6 || 12)").R, 8);
cerca("Mixto con prefijos 1k + (2k2 || 4k7)", F.equivalente("1k + (2.2k || 4.7k)").R, 1000 + 2200 * 4700 / 6900);
cerca("Paralelo de tres 6||6||6", F.equivalente("6||6||6").R, 2);
lanza("Expresión mal formada", () => F.equivalente("4 + (6 || "));
cerca("serie()", F.serie([10, 20]), 30);
cerca("paralelo()", F.paralelo([10, 10]), 5);
// C4 divisores
cerca("Divisor de voltaje 12 V, 1k/2k", F.divisorV(12, 1000, 2000).Vout, 8);
cerca("Divisor de corriente I1", F.divisorI(3, 10, 20).I1, 2);
cerca("Divisor de corriente I2", F.divisorI(3, 10, 20).I2, 1);
// C5 consumo
cerca("Plancha 1200 W 0,5 h 30 días", F.consumo([{ n: "plancha", w: 1200, h: 0.5, d: 30, c: 1 }], { tipo: "fija", precio: 2 }, 0).kwh, 18);
cerca("Costo tarifa fija", F.consumo([{ n: "plancha", w: 1200, h: 0.5, d: 30, c: 1 }], { tipo: "fija", precio: 2 }, 10).costo, 46);
cerca("Escalones 200 kWh", F.costoEnergia(200, { tipo: "escalones", tramos: [{ hasta: 75, precio: 1 }, { hasta: 140, precio: 1.3 }, { hasta: Infinity, precio: 3.8 }] }).costo, 75 + 65 * 1.3 + 60 * 3.8);
cerca("Escalones dentro del primero", F.costoEnergia(50, { tipo: "escalones", tramos: [{ hasta: 75, precio: 1 }, { hasta: Infinity, precio: 3 }] }).costo, 50);
// C6 standby
cerca("Standby 3 W 20 h 8 aparatos", F.standby(3, 20, 8, 1).kwhAnio, 175.2);
// C7 batería
cerca("Power bank 10 000 mAh a 3,7 V = 37 Wh", F.autonomia(10000, 3.7, 500, "mA", 100).Wh, 37);
cerca("Autonomía 10 000 mAh / 500 mA al 85 %", F.autonomia(10000, 3.7, 500, "mA", 85).horas, 17);
cerca("Autonomía en W", F.autonomia(10000, 3.7, 3.7, "W", 100).horas, 10);
// C8 transformador
cerca("Transformador Ns para 127→12 V con Np 1000", F.transformador(127, 1000, NaN, 12).Ns, 94.488);
cerca("Transformador Vs con Ns 100", F.transformador(127, 1000, 100).Vs, 12.7);
cerca("Corriente secundaria 60 W a 12 V", F.transformador(127, 1000, NaN, 12, 60, 100).Is, 5);
cerca("Corriente primaria con 95 %", F.transformador(127, 1000, NaN, 12, 60, 95).Ip, 60 / (127 * 0.95));
// C9 colores
cerca("Amarillo-violeta-rojo = 4,7 kΩ", F.coloresAValor(["amarillo", "violeta", "rojo", "dorado"]).R, 4700);
cerca("Marrón-negro-negro-marrón (5 bandas) = 1 kΩ", F.coloresAValor(["marrón", "negro", "negro", "marrón", "marrón"]).R, 1000);
igual("Tolerancia dorado", F.coloresAValor(["amarillo", "violeta", "rojo", "dorado"]).tol, 5);
igual("4,7 kΩ a colores", F.valorAColores(4700, 4).bandas, ["amarillo", "violeta", "rojo"]);
igual("220 Ω a colores", F.valorAColores(220, 4).bandas, ["rojo", "rojo", "marrón"]);
igual("4,7 Ω a colores", F.valorAColores(4.7, 4).bandas, ["amarillo", "violeta", "dorado"]);
// C10 LED
cerca("LED 9 V, 2 V, 20 mA → 350 Ω", F.led(9, 2, 0.02, 1).R, 350);
cerca("LED comercial E12 superior a 350 → 390", F.led(9, 2, 0.02, 1).Rcomercial, 390);
cerca("Dos LED blancos con 9 V", F.led(9, 3, 0.02, 2).R, 150);
lanza("LED sin voltaje suficiente", () => F.led(3, 2, 0.02, 2));
cerca("E12 superior a 1000", F.e12Superior(1000), 1000);
cerca("E12 superior a 1001", F.e12Superior(1001), 1200);
// C11 cable
cerca("Caída de tensión 15 A, 20 m, 2,5 mm² cobre", F.cable(15, 20, 2.5, 127, "cobre").dV, 15 * 1.68e-8 * 40 / 2.5e-6);
// C12 RMS
cerca("Vpico de 127 V", F.rms(127, "rms").pico, 179.605);
cerca("Vpico de 230 V", F.rms(230, "rms").pico, 325.27);
cerca("Vrms desde pico 170", F.rms(170, "pico").rms, 120.21);
cerca("Periodo de 60 Hz", F.frecuencia(60).T, 1 / 60);
cerca("Frecuencia desde periodo 20 ms", F.frecuencia(0, 0.02).f, 50);
// C13 RC
cerca("τ de 10 kΩ y 100 µF", F.rc(10000, 100e-6).tau, 1);
cerca("63 % en 1τ", F.rc(10000, 100e-6, 1, 9).Vcarga, 9 * (1 - Math.exp(-1)));
// C14 conversiones
cerca("4700 → k", F.convertir(4700, "", "k"), 4.7);
cerca("20 mA → A", F.convertir(20, "m", ""), 0.02);
cerca("1 kWh en J", F.energia(1, "kWh").J, 3.6e6);
cerca("mAh a Wh", F.mAhAWh(5000, 3.7), 18.5);
cerca("Wh a mAh", F.WhAmAh(37, 3.7), 10000);
// C15 resistividad
cerca("10 m de cobre de 1,5 mm²", F.resistividad("cobre", 10, 1.5).R, 0.112);
// C16 pérdidas
cerca("Pérdidas 100 MW a 400 kV con 5 Ω", F.perdidas(100e6, 400e3, 5).Pp, 312500);
cerca("Pérdidas % a 400 kV", F.perdidas(100e6, 400e3, 5).pct, 0.3125);
cerca("Pérdidas a 10 veces menos tensión ×100", F.perdidas(100e6, 40e3, 5).Pp / F.perdidas(100e6, 400e3, 5).Pp, 100);
// C17 ahorro LED
cerca("Ahorro LED kWh", F.ahorroLed(60, 9, 5, 10, 2, 40).kwhAnio, 930.75);
cerca("Ahorro LED dinero", F.ahorroLed(60, 9, 5, 10, 2, 40).ahorroAnio, 1861.5);
// Coulomb
cerca("Coulomb 1 µC a 10 cm", F.coulomb(1e-6, 1e-6, 0.1), 0.899);
cerca("Coulomb a doble distancia = 1/4", F.coulomb(1e-6, 1e-6, 0.2) / F.coulomb(1e-6, 1e-6, 0.1), 0.25);

// Simulaciones (funciones internas)
const s1 = S._resolverFocos("serie", 12, [20, 20, 20], [false, false, false]);
cerca("S5 serie Req", s1.Req, 60); cerca("S5 serie I", s1.It, 0.2);
igual("S5 serie con foco fundido apaga todo", S._resolverFocos("serie", 12, [20, 20], [true, false]).It, 0);
const s2 = S._resolverFocos("paralelo", 12, [20, 20, 20], [false, true, false]);
cerca("S5 paralelo con uno fundido", s2.It, 1.2); cerca("S5 paralelo V en rama", s2.focos[2].V, 12);
const s3 = S._resolverFocos("mixto", 12, [10, 20, 20], [false, false, false]);
cerca("S5 mixto Req", s3.Req, 20); cerca("S5 mixto V en paralelo", s3.focos[1].V, 6);
const k = S._kirchhoff(12, 6, 2, 4, 6);
cerca("S6 LCK", k.I1 + k.I2, k.I3); cerca("S6 LVK izquierda", 12 - k.I1 * 2 - k.I3 * 6, 0); cerca("S6 nodo", k.Vn, 7.5 / (0.5 + 0.25 + 1 / 6));
igual("S15 corriente en paralelo funde el fusible", !!S._medir("A", "VOm", "aa", "paralelo", false).fundir, true);
igual("S15 resistencia de cable roto = OL", S._medir("ohm", "VOm", "cr", "paralelo", false).d, "OL");
igual("S15 medir resistencia energizado da error", S._medir("ohm", "VOm", "p9", "paralelo", false).d, "Err");
cerca("S18 LED corriente", S._led(9, 2, 390).I, 7 / 390); igual("S18 sin resistencia se quema", S._led(9, 2, 0).quemado, true);
igual("S19 saturación", S._transistor(true, 1000, 100, 9, 330).sat, true); igual("S19 corte", S._transistor(false, 1000, 100, 9, 330).Ic, 0);
cerca("S11 transformador", S._trafo("ca", 120, 1000, 100, 10).Vs, 12); igual("S11 en CD no hay salida", S._trafo("cd", 120, 1000, 100, 10).Vs, 0);
igual("S20 XOR", [S._puertas.XOR(true, true), S._puertas.XOR(true, false)], [false, true]);
igual("S20 NAND", S._puertas.NAND(true, true), false);
cerca("S16 piel mojada 127 V", S._cuerpo(127, "mojada", "manos").I, 127 / 1500);
igual("S13 a 13,8 kV hay apagón con 120 MW", S._red(13.8, 19, 120, 100).apagon, true);
igual("S13 a 400 kV no hay apagón", S._red(400, 19, 120, 100).apagon, false);
igual("S12 voltaje celda litio lleno ≈ 4,2", Math.abs(S._voltajeCelda("liion", 1) - 4.2) < 0.01, true);
igual("S12 voltaje crece con la carga", S._voltajeCelda("liion", 0.8) > S._voltajeCelda("liion", 0.3), true);
igual("S8 campo de cable gira con la corriente", Math.sign(S._campo("cable", 380, 170, 5)[1]) === -Math.sign(S._campo("cable", 380, 170, -5)[1]), true);

// Preguntas generadas: su propia respuesta debe aceptarse
Object.keys(Q.GEN).forEach(g => { for (let i = 0; i < 20; i++) { const q = Q.GEN[g](); if (Q.comprobarNum(q, String(q.r)) === true && isFinite(q.r)) ok++; else { fallo++; console.log("FALLO generador " + g + ": " + q.p + " r=" + q.r); break; } } });
igual("Numérica acepta unidades", Q.comprobarNum({ t: "num", r: 0.02, u: "A" }, "20 mA"), true);
igual("Numérica tolera 2 %", Q.comprobarNum({ t: "num", r: 100, u: "Ω" }, "101,5"), true);
igual("Numérica rechaza 5 % de error", Q.comprobarNum({ t: "num", r: 100, u: "Ω" }, "105"), false);
igual("Numérica con horas", Q.comprobarNum({ t: "num", r: 20, u: "s", uTexto: "h" }, "20 h"), true);

console.log("\nCorrectas: " + ok + " · Fallos: " + fallo);
process.exit(fallo ? 1 : 0);
