// Pruebas de las fórmulas de las calculadoras con ejemplos de control.
// Ejecutar con: node pruebas.js
"use strict";
global.window = globalThis;
require("./data-extra.js");
const C = require("./tools.js");
let ok = 0, fail = 0;
function near(nombre, real, esperado, tol){
  const bien = Math.abs(real - esperado) <= (tol == null ? 0.01 : tol);
  bien ? ok++ : fail++;
  console.log((bien ? "OK   " : "FALLO") + " " + nombre + ": " + (Math.round(real*100)/100) + " (esperado " + esperado + ")");
}

// Interés compuesto sin aportaciones: 10 000 × 1,07^10 = 19 671,51
near("Compuesto 10 000 al 7 % 10 años", C.compuesto(10000, 0, 0.07, 10).final, 19671.51);
near("Compuesto 10 000 al 7 % 30 años", C.compuesto(10000, 0, 0.07, 30).final, 76122.55);
// Aportaciones sin rentabilidad: 100 × 12 × 10 = 12 000
near("Aportaciones al 0 %", C.compuesto(0, 100, 0, 10).final, 12000);
// Anualidad mensual: 100 al mes, tasa mensual i = 1,06^(1/12) − 1, 10 años → 100 × ((1+i)^120 − 1)/i
{ const i = Math.pow(1.06, 1/12) - 1; near("Anualidad 100/mes al 6 % 10 años", C.compuesto(0, 100, 0.06, 10).final, 100 * (Math.pow(1+i,120) - 1) / i); }
// Independencia: 2 000 × 12 / 0,04 = 600 000
near("Cifra de independencia", C.independencia(2000, 0.04, 0, 0, 0).cifra, 600000);
// Sin rentabilidad: 600 000 / 1 000 al mes = 600 meses
near("Meses hasta la independencia al 0 %", C.independencia(2000, 0.04, 0, 1000, 0).meses, 600);
// Presupuesto 50/30/20 de 2 000
near("Presupuesto: ahorro del 20 %", C.presupuesto(2000, 50, 30, 20).ahorro, 400);
// Emergencia: 1 200 × 6 = 7 200; faltan 5 200; a 300/mes → 18 meses (17,33 redondeado hacia arriba)
{ const e = C.emergencia(1200, 6, 2000, 300); near("Emergencia: objetivo", e.objetivo, 7200); near("Emergencia: meses", e.meses, 18); }
// Deuda única sin interés: 1 200 con pago de 100 → 12 meses y 0 intereses
{ const d = C.deudas([{nombre:"A", saldo:1200, tae:0, minimo:100}], 0, "avalancha"); near("Deuda sin interés: meses", d.meses, 12); near("Deuda sin interés: intereses", d.intereses, 0); }
// Avalancha nunca paga más intereses que bola de nieve
{ const ds = [{nombre:"Tarjeta", saldo:3000, tae:0.24, minimo:90},{nombre:"Coche", saldo:8000, tae:0.07, minimo:200},{nombre:"Personal", saldo:1500, tae:0.12, minimo:60}];
  const av = C.deudas(ds, 150, "avalancha"), bn = C.deudas(ds, 150, "bola");
  near("Avalancha ≤ bola de nieve (intereses)", av.intereses <= bn.intereses + 0.01 ? 1 : 0, 1);
  near("Bola de nieve salda primero la más pequeña", bn.orden[0][0] === "Personal" ? 1 : 0, 1); }
// Préstamo amortizable de 100 000 a 1 año al 12 % nominal: cuota de referencia 8 884,88
near("Cuota de préstamo", C.cuota(100000, 0.12, 1), 8884.88);
near("Cuota de hipoteca 160 000 al 3 % 30 años", C.cuota(160000, 0.03, 30), 674.57);
// Comisiones: 100 000 al 6 % − 0,2 % durante 30 años = 100 000 × 1,058^30
near("Comisiones 0,2 %", C.comisiones(100000, 0, 0.06, 0.002, 30), 100000 * Math.pow(1.058, 30));
near("Comisiones 1,5 %", C.comisiones(100000, 0, 0.06, 0.015, 30), 100000 * Math.pow(1.045, 30));
// Inflación: 10 000 al 3 % 10 años → 7 440,94
near("Inflación: poder adquisitivo", C.inflacion(10000, 0.03, 10).poder, 7440.94);
// Valor neto
near("Valor neto", C.valorNeto([3000, 5000], [2000]).neto, 6000);
near("Stanley y Danko: 40 años, 50 000", C.stanleyDanko(40, 50000), 200000);
// Punto de equilibrio: 3 000 / (50 − 20) = 100
near("Punto de equilibrio", C.equilibrio(3000, 50, 20, 0).unidades, 100);
// Caídas: 10 000 en 2008 (−37 %) → 6 300 al final de 2008 mantener y vender
{ const r = C.caidas(window.SP500, 2008, 10000, 0, 0.15); near("Caídas: valor al final de 2008", r.rows[0].mantener, 6300); near("Caídas: año de venta", r.anioVenta, 2008);
  near("Caídas: vender en pánico se queda en 6 300", r.panico, 6300); }
// Comprar o alquilar sin crecimiento ni intereses: comprar = valor casa − saldo; simetría básica
{ const r = C.comprarAlquilar({precio:100000, entrada:1, gastosCompra:0, hipoteca:0.0001, plazo:1, gastosAnuales:0, revalor:0, alquiler:0, subidaAlquiler:0, rentInv:0, gastosVenta:0, horizonte:1});
  near("Comprar al contado sin gastos: casa", r.comprar, 100000, 0.5); near("Alquilar gratis e invertir la entrada al 0 %", r.alquilar, 100000, 0.5); }
// Perfil de riesgo
near("Perfil de riesgo conservador", C.perfilRiesgo([1,1,1,1,1,1,1,1])[0] === "Conservador" ? 1 : 0, 1);
near("Perfil de riesgo dinámico", C.perfilRiesgo([3,3,3,3,3,3,3,3])[0] === "Dinámico" ? 1 : 0, 1);

console.log("\n" + ok + " pruebas correctas, " + fail + " fallos.");
process.exit(fail ? 1 : 0);
