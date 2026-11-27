// Comprobación de los datos del curso. Uso: node sitios/hablar-sin-miedo/pruebas.js
"use strict";
const path = require("path"), fs = require("fs");
global.window = {};
const dir = __dirname;
["data-curso-1.js","data-curso-2.js","data-curso-3.js","data-historias.js","data-practica.js","data-extra.js","herramientas.js"].forEach(f => {


  require(path.join(dir, f));
});
const W = global.window; let fallos = 0, ok = 0;
const t = (cond, msg) => { if (cond) ok++; else { fallos++; console.log("FALLO:", msg); } };

const M = W.MODULOS.slice().sort((a, b) => a.n - b.n);
const ALL = []; M.forEach(m => m.L.forEach((l, i) => ALL.push({m, l, i})));
t(M.length === 7, "debe haber 7 módulos (hay " + M.length + ")");
t(ALL.length === 63, "debe haber 63 lecciones (hay " + ALL.length + ")");
const ids = new Set();
ALL.forEach(({m, l}) => {
  t(!ids.has(l.id), "id repetido " + l.id); ids.add(l.id);
  t(l.id.startsWith(m.n + "."), "id " + l.id + " no corresponde al módulo " + m.n);
  t(l.t && l.min > 0, l.id + ": título y duración");
  t(Array.isArray(l.obj) && l.obj.length >= 2, l.id + ": al menos 2 objetivos");
  t(l.ejer && l.reto && l.reto.length === 2, l.id + ": ejercicio y reto fácil/difícil");
  t(Array.isArray(l.q) && l.q.length === 5, l.id + ": 5 preguntas");
  (l.q || []).forEach((q, k) => t(q.length === 4 && Array.isArray(q[1]) && q[2] >= 0 && q[2] < q[1].length && q[3], l.id + " pregunta " + (k + 1) + " mal formada"));
  t(l.caso && l.caso[2] >= 0 && l.caso[2] < l.caso[1].length, l.id + ": caso práctico");
  if (m.n === 6) t(!!(W.HISTORIAS.find(h => h.s === l.hist)), l.id + ": historia «" + l.hist + "» no existe");
  else t(Array.isArray(l.txt) && l.txt.length >= 5 && l.clave && l.ev && l.ej && l.pasos && l.err, l.id + ": texto completo, idea clave, evidencia, ejemplo, pasos y errores");
  (l.rel || []).forEach(r => t(ALL.some(x => x.l.id === r), l.id + ": relacionada " + r + " no existe"));
});
M.forEach(m => (m.extra || []).forEach((q, k) => t(q[2] < q[1].length, "extra " + m.n + "." + k)));

// Historias
t(W.HISTORIAS.length === 11, "11 historias");
W.HISTORIAS.forEach(h => t(h.pasos.length >= 4 && h.copiar.length >= 3 && h.fuentes.length >= 1 && h.quien && h.miedo && h.momento && h.resultado, "historia " + h.s + " incompleta"));

// Reto, prácticas, simuladores
t(W.RETO.length === 30 && W.RETO.every((d, i) => d.d === i + 1 && d.f && d.x), "30 días del reto numerados con versión fácil y difícil");
W.RETO.forEach(d => t(!d.l || ids.has(d.l), "reto día " + d.d + ": lección " + d.l));
t(W.PRACTICAS.length === 10, "10 prácticas guiadas");
W.PRACTICAS.forEach(p => { const seq = [].concat(p.ini || [], ...Array.from({length:p.rep || 1}, () => p.ciclo || []), p.fin || []); const s = seq.reduce((a, x) => a + x[1], 0);
  t(seq.every(x => typeof x[0] === "string" && x[1] > 0), "práctica " + p.s + ": pasos válidos");
  t(Math.abs(s / 60 - p.min) <= 1.6, "práctica " + p.s + ": dura " + (s / 60).toFixed(1) + " min, se anuncian " + p.min); });
t(W.SIMULADORES.length === 8, "8 simuladores");
W.SIMULADORES.forEach(s => t(s.pasos.length >= 4 && s.pasos.every(p => p.op.length >= 2 && p.op.some(o => o[1] === 2)), "simulador " + s.s));
t(W.TEMAS.length >= 150, "al menos 150 temas (hay " + W.TEMAS.length + ")");
t(Object.keys(W.TOOLS).length >= 18, "al menos 18 herramientas");

// Glosario y búsqueda
t(W.GLOSARIO.length >= 90, "glosario con al menos 90 términos (hay " + W.GLOSARIO.length + ")");
W.GLOSARIO.forEach(g => t(!g[3] || ids.has(g[3]), "glosario «" + g[0] + "»: lección " + g[3]));
t(W.RESPUESTAS.length >= 35, "al menos 35 respuestas rápidas");
t(W.MITOS.length === 15 && W.TEST.length === 12, "15 mitos y 12 ítems de test");

// Enlaces internos [[ruta|texto]] y act
const rutas = h => {
  const [a, b, c] = h.split("/");
  if (h.startsWith("../")) return fs.existsSync(path.join(dir, h.split("#")[0]));
  switch (a){
    case "leccion": { const m = M.find(x => x.n === +b); return !!(m && m.L[+c - 1]); }
    case "modulo": case "quiz": return M.some(x => x.n === +b);
    case "historias": return !b || W.HISTORIAS.some(x => x.s === b);
    case "reto-30-dias": return !b || W.RETO.some(x => x.d === +b);
    case "practicas": return !b || W.PRACTICAS.some(x => x.s === b);
    case "herramientas": return !b || !!W.TOOLS[b];
    case "simuladores": return W.SIMULADORES.some(x => x.s === b);
    case "glosario": case "biblioteca": case "rutas": case "progreso": case "examen": case "curso": case "certificado": case "buscar": return true;
    default: return !!W.PAGINAS[a];
  }
};
const txt = JSON.stringify([W.MODULOS, W.HISTORIAS, W.RETO, W.PRACTICAS, W.RUTAS, W.PAGINAS, W.COMUN]);
const links = [...txt.matchAll(/\[\[([^|\]]+)\|/g)].map(x => x[1]);
links.forEach(h => t(rutas(h), "enlace interno roto: " + h));
ALL.forEach(({l}) => (l.act || []).forEach(a => t(rutas(a[0]), l.id + ": actividad rota " + a[0])));
W.RESPUESTAS.forEach(r => t(rutas(r.h), "respuesta rápida «" + r.t + "»: enlace " + r.h));

// Comillas rectas sueltas dentro de los textos (rompen el JS) ya se habrían detectado al cargar.
const min = M.reduce((s, m) => s + m.L.reduce((a, l) => a + l.min, 0) + (m.qmin || 20), 0);
const preg = M.reduce((s, m) => s + m.L.reduce((a, l) => a + l.q.length, 0) + (m.extra || []).length, 0);
console.log(`\n${ok} comprobaciones correctas, ${fallos} fallos.`);
console.log(`Módulos: ${M.length} · Lecciones: ${ALL.length} · Lecciones y quizzes: ${(min / 60).toFixed(1)} h (+ ≈ 13 h de práctica) · Preguntas: ${preg} · Términos: ${W.GLOSARIO.length} · Enlaces internos: ${links.length}`);
process.exit(fallos ? 1 : 0);
