// Pruebas de integridad del contenido. Ejecutar: node pruebas/pruebas-datos.js
"use strict";
const { cargar } = require("./cargar");
const { ctx } = cargar();
const C = ctx.CURSO, Q = ctx.QUIZ, SIMS = ctx.SIMS, CALC = ctx.CALC;
let fallos = 0, ok = 0;
function check(cond, msg) { if (cond) ok++; else { fallos++; console.log("FALLO: " + msg); } }
const norm = s => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9ñ\s]/g, " ").trim().replace(/\s+/g, "-");

const mods = C.modulos, lecIds = new Set(), modIds = new Set(mods.map(m => m.id));
const glos = new Set(); (ctx.GLOSARIO || []).forEach(g => { glos.add(norm(g.t)); (g.sin || []).forEach(s => glos.add(norm(s))); });
const exps = new Map((ctx.EXPERIMENTOS || []).map(e => [e.id, e]));
const pers = new Set((ctx.PERSONAJES || []).map(p => p.id));
check(new Set(mods.map(m => m.n)).size === mods.length, "números de módulo repetidos");

function textos(obj, out) { if (typeof obj === "string") out.push(obj); else if (Array.isArray(obj)) obj.forEach(x => textos(x, out)); else if (obj && typeof obj === "object") Object.keys(obj).forEach(k => textos(obj[k], out)); return out; }
function revisarEnlaces(txt, donde) {
  for (const m of txt.matchAll(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g)) check(glos.has(norm(m[1])), donde + ": término de glosario inexistente [[" + m[1] + "]]");
  for (const m of txt.matchAll(/\]\((#[^)\s]+)\)/g)) {
    const r = m[1].replace(/^#\//, "").split("?")[0].split("/");
    const ok2 = r[0] === "leccion" ? lecIds.has(r[1]) || todasLec.has(r[1]) : r[0] === "modulo" || r[0] === "quiz" ? modIds.has(r[1]) : r[0] === "calculadora" ? !!C.calcs[r[1]] : r[0] === "simulacion" ? !!C.sims[r[1]] : r[0] === "experimento" ? exps.has(r[1]) : r[0] === "personajes" ? !r[1] || pers.has(r[1]) : ["", "curso", "laboratorio", "calculadoras", "simulaciones", "experimentos", "glosario", "formulas", "personajes", "linea-de-tiempo", "progreso", "ajustes", "acerca", "buscar", "examen-final", "certificado"].includes(r[0]);
    check(ok2, donde + ": enlace interno roto " + m[1]);
  }
}
const todasLec = new Set(); mods.forEach(m => m.lecciones.forEach(l => todasLec.add(l.id)));

function revisarPregunta(q, donde) {
  check(typeof q.p === "string" && q.p.length > 5, donde + ": enunciado vacío");
  check(typeof q.e === "string" && q.e.length > 5, donde + ": falta retroalimentación (e)");
  if (q.t === "om") { check(Array.isArray(q.o) && q.o.length >= 2, donde + ": pocas opciones"); check(Number.isInteger(q.c) && q.c >= 0 && q.c < q.o.length, donde + ": índice de respuesta correcta fuera de rango"); check(new Set(q.o).size === q.o.length, donde + ": opciones repetidas"); }
  else if (q.t === "vf") check(typeof q.c === "boolean", donde + ": vf sin booleano");
  else if (q.t === "num") check(typeof q.r === "number" && isFinite(q.r), donde + ": respuesta numérica no válida");
  else if (q.t === "ord") check(Array.isArray(q.o) && q.o.length >= 3, donde + ": ordenar con menos de 3 pasos");
  else if (q.t === "diag") { check(!!Q.DIAGRAMAS[q.dia], donde + ": diagrama inexistente " + q.dia); if (Q.DIAGRAMAS[q.dia]) check(Q.DIAGRAMAS[q.dia]().indexOf('data-z="' + q.c + '"') >= 0, donde + ": zona correcta inexistente " + q.c); }
  else check(false, donde + ": tipo de pregunta desconocido " + q.t);
  if (q.t === "num") { const txt = q.u ? ctx.NUM.fmtU(q.r, q.u) : String(q.r); check(Q.comprobarNum(q, String(q.r).replace(".", ",")) === true, donde + ": la respuesta correcta no se acepta (" + txt + ")"); }
}

let minTotal = 0, nLec = 0;
mods.forEach(m => {
  const d = "M" + m.n;
  ["titulo", "objetivo", "evaluacion"].forEach(k => check(typeof m[k] === "string" && m[k].length > 5, d + ": falta " + k));
  check(m.quizMin > 0, d + ": falta duración del quiz");
  (m.sims || []).forEach(s => { check(!!C.sims[s], d + ": simulación inexistente " + s); check(typeof SIMS[s] === "function", d + ": simulación sin implementar " + s); });
  (m.calcs || []).forEach(s => check(!!C.calcs[s] && (CALC.DEF[s] || s === "C5"), d + ": calculadora inexistente " + s));
  (m.gen || []).forEach(g => check(typeof Q.GEN[g] === "function", d + ": generador inexistente " + g));
  (m.extra || []).forEach((q, k) => revisarPregunta(q, d + " extra " + (k + 1)));
  let minMod = m.quizMin;
  m.lecciones.forEach((l, j) => {
    const dl = "Lección " + l.id; nLec++;
    check(!lecIds.has(l.id), dl + ": id repetido"); lecIds.add(l.id);
    check(l.id === m.n + "-" + (j + 1), dl + ": id no coincide con su posición (esperado " + m.n + "-" + (j + 1) + ")");
    ["t", "d", "preg", "txt", "vida"].forEach(k => check(typeof l[k] === "string" && l[k].length > 10, dl + ": falta " + k));
    check(l.min > 0, dl + ": falta duración");
    check(Array.isArray(l.obj) && l.obj.length >= 2, dl + ": menos de 2 objetivos");
    check(Array.isArray(l.res) && l.res.length === 5, dl + ": el resumen no tiene 5 puntos");
    check(Array.isArray(l.quiz) && l.quiz.length === 5, dl + ": el mini-quiz no tiene 5 preguntas");
    check(Array.isArray(l.ejer) && l.ejer.length >= 3, dl + ": menos de 3 ejercicios");
    check(Array.isArray(l.err) && l.err.length >= 2, dl + ": menos de 2 errores frecuentes");
    const pal = (l.txt.match(/\S+/g) || []).length; check(pal >= (m.n === 0 ? 250 : 350), dl + ": explicación corta (" + pal + " palabras)");
    (l.quiz || []).forEach((q, k) => revisarPregunta(q, dl + " pregunta " + (k + 1)));
    if (l.ej) check(l.ej.enun && Array.isArray(l.ej.pasos) && l.ej.pasos.length >= 2 && l.ej.res, dl + ": ejemplo resuelto incompleto");
    [].concat(l.sim || []).forEach(s => { check(!!C.sims[s], dl + ": simulación inexistente " + s); check(typeof SIMS[s] === "function", dl + ": simulación sin implementar " + s); });
    [].concat(l.calc || []).forEach(s => check(!!C.calcs[s], dl + ": calculadora inexistente " + s));
    [].concat(l.exp || []).forEach(s => check(exps.has(s), dl + ": experimento inexistente " + s));
    (l.form || []).forEach(f => check(Array.isArray(f) && f.length === 2, dl + ": fórmula mal formada"));
    revisarEnlaces(textos(l, []).join("\n"), dl);
    minMod += l.min;
  });
  revisarEnlaces(textos([m.actividades, m.ejemplos, m.objetivo, m.evaluacion, m.aviso || ""], []).join("\n"), d);
  if (m.minEsperado) check(minMod === m.minEsperado, d + ": duración " + minMod + " min, se esperaban " + m.minEsperado);
  minTotal += minMod;
});

// Simulaciones y calculadoras declaradas
Object.keys(C.sims).forEach(s => check(typeof SIMS[s] === "function", "Simulación sin implementar: " + s));
Object.keys(C.calcs).forEach(s => check(!!CALC.DEF[s] || s === "C5", "Calculadora sin implementar: " + s));
check(Object.keys(C.sims).filter(s => /^S\d+$/.test(s)).length === 21, "Deben existir 21 simulaciones S1–S21");
check(Object.keys(C.calcs).length === 17, "Deben existir 17 calculadoras");

// Experimentos
(ctx.EXPERIMENTOS || []).forEach(e => {
  const d = "Experimento " + e.id;
  ["t", "obj", "obs", "expl", "desecho"].forEach(k => check(typeof e[k] === "string" && e[k].length > 5, d + ": falta " + k));
  check(["verde", "amarillo", "rojo"].includes(e.seg), d + ": seguridad no válida");
  check(modIds.has(e.mod), d + ": módulo inexistente " + e.mod);
  check(Array.isArray(e.pasos) && e.pasos.length >= 3, d + ": menos de 3 pasos");
  check(Array.isArray(e.seguridad) && e.seguridad.length >= 1, d + ": sin normas de seguridad");
  check(typeof e.v === "number", d + ": falta el voltaje máximo (v)");
  if (e.seg !== "rojo") check(e.v <= 9, d + ": experimento casero con más de 9 V (" + e.v + " V)");
  if (e.sim) check(!!C.sims[e.sim], d + ": simulación inexistente");
  revisarEnlaces(textos(e, []).join("\n"), d);
});
check(new Set((ctx.EXPERIMENTOS || []).map(e => e.id)).size === (ctx.EXPERIMENTOS || []).length, "ids de experimentos repetidos");

// Glosario y personajes
const gt = (ctx.GLOSARIO || []).map(g => norm(g.t)); check(new Set(gt).size === gt.length, "términos de glosario repetidos");
(ctx.GLOSARIO || []).forEach(g => revisarEnlaces(g.d, "Glosario " + g.t));
(ctx.PERSONAJES || []).forEach(p => revisarEnlaces(p.txt, "Personaje " + p.id));

const completo = mods.length === 16;
if (completo) {
  check(nLec === 128, "El curso debe tener 128 lecciones (tiene " + nLec + ")");
  check(minTotal === 5185, "La duración total debe ser 5 185 min = 86 h 25 min (es " + minTotal + ")");
  check((ctx.GLOSARIO || []).length >= 150, "El glosario debe tener al menos 150 términos");
  check((ctx.PERSONAJES || []).length === 14, "Deben existir 14 personajes");
  (ctx.PERSONAJES || []).forEach(p => (p.lec || []).forEach(l => check(lecIds.has(l), "Personaje " + p.id + ": lección inexistente " + l)));
  check(Q.examenFinal().length === 40, "El examen final debe tener 40 preguntas");
}
mods.forEach(m => { const q = Q.quizModulo(m); check(q.length >= (m.quizN || 15), "M" + m.n + ": el quiz de módulo tiene " + q.length + " preguntas, se esperaban " + (m.quizN || 15)); });

console.log("\nMódulos: " + mods.length + " · Lecciones: " + nLec + " · Minutos: " + minTotal + " · Experimentos: " + (ctx.EXPERIMENTOS || []).length + " · Glosario: " + (ctx.GLOSARIO || []).length);
console.log("Comprobaciones correctas: " + ok + " · Fallos: " + fallos);
process.exit(fallos ? 1 : 0);
