// Pruebas del sitio Robótica y Electrónica: node sitios/robotica-electronica/pruebas.js
// Comprueba las fórmulas de las calculadoras y la coherencia de los datos del curso con el plan 7.
const fs = require("fs"), path = require("path"), vm = require("vm");
const dir = __dirname;
const ctx = {window: {}, console};
ctx.globalThis = ctx; vm.createContext(ctx);
const html = fs.readFileSync(path.join(dir, "index.html"), "utf8");
const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]).filter(s => s !== "app.js");
const parcial = process.argv.includes("--parcial"); // durante la construcción: ignora módulos aún no escritos
for (const s of scripts){
  const f = path.join(dir, s);
  if (!fs.existsSync(f)){ if (!parcial){ console.log("✘ Falta el archivo " + s); process.exitCode = 1; } continue; }
  vm.runInContext(fs.readFileSync(f, "utf8"), ctx, {filename: s});
}
const W = ctx.window, CALC = W.CALC;
let fallos = 0, ok = 0;
const check = (cond, msg) => { if (cond) ok++; else { fallos++; console.log("✘ " + msg); } };
const cerca = (a, b, tol) => Math.abs(a - b) <= (tol || 1e-6) * Math.max(1, Math.abs(b));

// ---------- Calculadoras ----------
check(cerca(CALC.led(9, 2, 0.02).R, 350), "LED: (9 − 2)/0,02 = 350 Ω");
check(CALC.led(9, 2, 0.02).comercial === 390, "LED: valor comercial E12 de 350 Ω = 390 Ω");
check(CALC.led(5, 2, 0.015).comercial === 220, "LED: (5 − 2)/0,015 = 200 → 220 Ω");
check(CALC.led(2, 3, 0.01) === null, "LED: fuente menor que el LED da null");
check(cerca(CALC.autonomia(2000, 250), 6.4), "Autonomía: 2000 × 0,8 / 250 = 6,4 h");
check(cerca(CALC.autonomia(1000, 100, 1), 10), "Autonomía con factor 1");
check(cerca(CALC.ohm({V: 9, R: 450}).I, 0.02), "Ohm: 9 V / 450 Ω = 0,02 A");
check(cerca(CALC.ohm({I: 0.05, R: 220}).V, 11), "Ohm: 0,05 A × 220 Ω = 11 V");
check(cerca(CALC.ohm({V: 5, I: 0.01}).R, 500), "Ohm: 5 V / 0,01 A = 500 Ω");
check(cerca(CALC.ohm({V: 6, I: 0.3}).P, 1.8), "Ohm: potencia 6 V × 0,3 A = 1,8 W");
check(CALC.ohm({V: 5}) === null, "Ohm: con un solo dato da null");
check(cerca(CALC.divisor(5, 10000, 20000), 10 / 3), "Divisor: 5 · 20k/30k = 3,333 V");
check(cerca(CALC.divisor(9, 1000, 1000), 4.5), "Divisor: iguales = mitad");
check(cerca(CALC.serie([100, 200, 300]), 600), "Serie");
check(cerca(CALC.paralelo([100, 100]), 50), "Paralelo de dos iguales");
check(cerca(CALC.paralelo([100, 400]), 80), "Paralelo 100 y 400 = 80 Ω");
check(cerca(CALC.rc(10000, 100e-6).tau, 1), "RC: 10 kΩ · 100 µF = 1 s");
check(cerca(CALC.colores(4, 7, 100, 5).R, 4700), "Colores: amarillo violeta rojo = 4,7 kΩ");
check(cerca(CALC.colores(2, 2, 10, 5).R, 220), "Colores: rojo rojo marrón = 220 Ω");
check(cerca(CALC.regulador(12, 5, 0.3), 2.1), "Regulador: (12 − 5) · 0,3 = 2,1 W");
check(cerca(CALC.ultrasonido(1166), 20, 0.01), "Ultrasonido: 1166 µs ≈ 20 cm");
check(cerca(CALC.wh(2000, 3.7), 7.4), "Energía: 2000 mAh · 3,7 V = 7,4 Wh");
check(cerca(CALC.adc(1023, 5, 10), 5), "ADC: 1023 → 5 V");
check(CALC.siguienteE12(82) === 82 && CALC.siguienteE12(95) === 100 && CALC.siguienteE12(4600) === 4700, "Serie E12");

// ---------- Datos del curso (según el plan 7) ----------
const PLAN = {M01: [6, 9], M02: [6, 8.5], M03: [8, 13.5], M04: [7, 10.5], M05: [8, 14.5], M06: [8, 15], M07: [10, 15], M08: [10, 17], M09: [8, 14.5], M10: [8, 13], M11: [9, 16.5],
  M12: [8, 13.5], M13: [7, 13], M14: [7, 11.5], M15: [8, 13], M16: [7, 12], M17: [6, 10.5], M18: [6, 10.5], M19: [6, 11], M20: [7, 12.5], M21: [7, 13],
  M22: [7, 14.5], M23: [7, 13.5], M24: [7, 13.5], M25: [8, 12], M26: [6, 15.5]};
const NIVEL = {M01: 0, M02: 0, M03: 1, M04: 1, M05: 1, M06: 1, M07: 2, M08: 2, M09: 2, M10: 2, M11: 2, M12: 3, M13: 3, M14: 3, M15: 3, M16: 3, M17: 4, M18: 4, M19: 4, M20: 4, M21: 4, M22: 5, M23: 5, M24: 5, M25: 6, M26: 6};
const MODS = W.CURSO.modulos;
const horas = m => m.L.reduce((s, l) => s + l.h, 0) + (m.he != null ? m.he : 0.5 + ((m.pj && m.pj.h) || 0));
const ids = MODS.map(m => m.id);
check(new Set(ids).size === ids.length, "Ids de módulo únicos");
for (const id of Object.keys(PLAN)){
  const m = MODS.find(x => x.id === id);
  if (!m){ if (!parcial) check(false, `Falta el módulo ${id}`); continue; }
  check(m.L.length === PLAN[id][0], `${id}: ${m.L.length} lecciones (plan: ${PLAN[id][0]})`);
  check(cerca(horas(m), PLAN[id][1]), `${id}: ${horas(m)} h (plan: ${PLAN[id][1]} h)`);
  check(m.n === NIVEL[id], `${id}: nivel ${m.n} (plan: ${NIVEL[id]})`);
  check(m.t && m.d && m.obj && m.obj.length && m.prac && m.mat, `${id}: faltan título, descripción, objetivos, prácticas o materiales`);
  check(m.pj && m.pj.t && m.pj.pasos && m.pj.pasos.length >= 4 && m.pj.crit && m.pj.crit.length >= 4, `${id}: proyecto incompleto`);
  const banco = m.L.flatMap(l => l.q || []).concat(m.banco || []);
  check(banco.length >= 20, `${id}: banco de ${banco.length} preguntas (mínimo 20)`);
  m.L.forEach((l, i) => {
    const lid = `${id}-${i + 1}`;
    check(l.t && l.h > 0, `${lid}: falta título u horas`);
    check(l.x && l.x.join(" ").split(/\s+/).length >= 150, `${lid}: explicación corta (${l.x ? l.x.join(" ").split(/\s+/).length : 0} palabras)`);
    check(l.o && l.o.length >= 2, `${lid}: menos de 2 objetivos`);
    check(l.q && l.q.length === 5, `${lid}: ${l.q ? l.q.length : 0} preguntas (deben ser 5)`);
    (l.q || []).forEach((q, k) => {
      const [e, o, c, x] = q;
      check(typeof e === "string" && e.length > 5 && typeof x === "string" && x.length > 3, `${lid} p${k + 1}: falta enunciado o explicación`);
      if (Array.isArray(o)) check(o.length >= 2 && Number.isInteger(c) && c >= 0 && c < o.length && new Set(o).size === o.length, `${lid} p${k + 1}: opciones o respuesta inválidas`);
      else check(o && typeof o.n === "number" && !isNaN(o.n), `${lid} p${k + 1}: respuesta numérica inválida`);
    });
    if (l.g) (Array.isArray(l.g) ? l.g : [l.g]).forEach(g => check(W.SVG[g], `${lid}: diagrama «${g}» no existe`));
    if (l.c) check(l.c.t && l.c.t.length > 10, `${lid}: código vacío`);
  });
}
const nL = MODS.reduce((s, m) => s + m.L.length, 0), nH = MODS.reduce((s, m) => s + horas(m), 0);
if (!parcial){ check(MODS.length === 26, `Módulos: ${MODS.length} (plan: 26)`); check(nL === 192, `Lecciones: ${nL} (plan: 192)`); check(cerca(nH, 336.5), `Horas: ${nH} (plan: 336,5)`); }

// ---------- Enlaces internos ----------
const lesIds = new Set(MODS.flatMap(m => m.L.map((_, i) => `${m.id}-${i + 1}`)));
const texto = JSON.stringify(MODS) + JSON.stringify(W.EXTRA);
for (const [, ruta] of texto.matchAll(/\]\(#\/([^)]+)\)/g)){
  const [r, a] = [ruta.split("/")[0], ruta.split("/").slice(1).join("/")];
  if (r === "leccion") check(lesIds.has(a) || parcial, `Enlace a lección inexistente: ${ruta}`);
  else if (r === "modulo") check(ids.includes(a) || parcial, `Enlace a módulo inexistente: ${ruta}`);
  else if (r === "herramientas") check(!a || W.TOOLS.some(t => t.id === a), `Enlace a herramienta inexistente: ${ruta}`);
  else check(["seguridad", "materiales", "progreso", "glosario", "componentes", "solucion-de-problemas", "rutas", "curso", "examen", "buscar"].includes(r), `Enlace desconocido: ${ruta}`);
}
(W.EXTRA.COMPONENTES || []).forEach(c => (c.lec || []).forEach(x => check(lesIds.has(x) || parcial, `Componente ${c.id}: lección inexistente ${x}`)));
(W.EXTRA.RUTAS || []).forEach(r => (r.ids || []).forEach(x => check(lesIds.has(x) || ids.includes(x) || parcial, `Ruta «${r.t}»: paso inexistente ${x}`)));
(W.EXTRA.COMPONENTES || []).forEach(c => { if (c.g) check(W.SVG[c.g], `Componente ${c.id}: diagrama ${c.g} inexistente`); });
check((W.EXTRA.GLOSARIO || []).length >= 150, `Glosario: ${(W.EXTRA.GLOSARIO || []).length} términos (mínimo 150)`);
check((W.EXTRA.COMPONENTES || []).length >= 40, `Componentes: ${(W.EXTRA.COMPONENTES || []).length} (mínimo 40)`);
check((W.EXTRA.FALLAS || []).length >= 30, `Fallas: ${(W.EXTRA.FALLAS || []).length} (mínimo 30)`);
check(Object.keys(W.SVG).length >= 16, `Diagramas: ${Object.keys(W.SVG).length}`);

console.log(`\nMódulos: ${MODS.length} · Lecciones: ${nL} · Horas: ${String(nH).replace(".", ",")} · Preguntas: ${MODS.reduce((s, m) => s + m.L.reduce((t, l) => t + (l.q || []).length, 0), 0)}`);
console.log(`${ok} comprobaciones correctas, ${fallos} fallos.`);
process.exit(fallos ? 1 : 0);
