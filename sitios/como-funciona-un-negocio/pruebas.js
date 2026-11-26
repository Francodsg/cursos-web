// Pruebas automáticas del sitio «Cómo funciona un negocio».
// Uso: node sitios/como-funciona-un-negocio/pruebas.js   (opción --parcial: no exige que estén todas las lecciones)
const fs = require("fs"), path = require("path"), vm = require("vm");
const dir = __dirname, parcial = process.argv.includes("--parcial");
const ctx = {window: {}, console}; ctx.globalThis = ctx.window; vm.createContext(ctx);
const files = ["data-curso.js","data-lecciones-1.js","data-lecciones-2.js","data-lecciones-3.js","data-lecciones-4.js","data-quizzes.js","data-casos.js","data-glosario.js","tools.js"];
for (const f of files) { const p = path.join(dir, f); if (!fs.existsSync(p)) { if (parcial) continue; throw new Error("Falta " + f); } vm.runInContext(fs.readFileSync(p, "utf8"), ctx, {filename: f}); }
const W = ctx.window, C = W.CURSO, LECC = W.LECC || {}, B = W.BANCOS || {}, E = W.EXAMENES || {}, CASOS = W.CASOS || [], G = W.GLOSARIO || [], CALC = W.CALC;
let fallos = 0, ok = 0; const avisos = [];
const t = (cond, msg) => { if (cond) ok++; else { fallos++; console.log("✗ " + msg); } };
const norm = s => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const slug = s => norm(s).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const words = s => String(s || "").replace(/[*#|]/g, " ").split(/\s+/).filter(Boolean).length;

// 1. Estructura y horas
const M = C.modulos;
t(C.niveles.length === 4, "4 niveles");
t(M.length === 29, "29 módulos (hay " + M.length + ")");
const nL = M.reduce((s, m) => s + m.L.length, 0); t(nL === 223, "223 lecciones (hay " + nL + ")");
const modMin = m => m.L.reduce((s, l) => s + l[2], 0) + (m.proyecto ? 0 : 90);
const esperado = {1:[5,41,2640],2:[10,79,5100],3:[7,52,3480],4:[7,51,3585]};
for (const n of [1,2,3,4]) { const ms = M.filter(m => m.n === n); const min = ms.reduce((s, m) => s + modMin(m), 0) + C.examenMin; t(ms.length === esperado[n][0] && ms.reduce((s, m) => s + m.L.length, 0) === esperado[n][1] && min === esperado[n][2], "Nivel " + n + ": módulos, lecciones y minutos según el plan"); }
const tot = M.reduce((s, m) => s + modMin(m), 0) + 4 * C.examenMin + C.finalMin; t(tot === 14925, "Total 248 h 45 min (hay " + tot / 60 + " h)");
t(new Set(M.map(m => m.id)).size === 29, "Identificadores de módulo únicos");

// 2. Lecciones
const valQ = (q, where) => { if (Array.isArray(q)) { t(q.length === 4 && typeof q[0] === "string" && Array.isArray(q[1]) && q[1].length >= 2 && Number.isInteger(q[2]) && q[2] >= 0 && q[2] < q[1].length && q[3] && q[3].length > 5, where + ": pregunta válida «" + String(q[0]).slice(0, 50) + "»"); t(new Set(q[1]).size === q[1].length, where + ": opciones sin repetir «" + String(q[0]).slice(0, 40) + "»"); } else t(q && q.n && typeof q.a === "number" && q.t && q.e, where + ": pregunta numérica válida"); };
let faltan = 0, cortas = [];
M.forEach(m => m.L.forEach((l, i) => {
 const id = m.id + "-" + (i + 1), X = LECC[id];
 if (!X) { faltan++; if (!parcial) t(false, "Falta el texto de la lección " + id); return; }
 for (const k of ["s","x","k","ch","gi","e","r","a"]) t(typeof X[k] === "string" && X[k].trim().length > 20, id + ": campo «" + k + "»");
 t(Array.isArray(X.o) && X.o.length >= 2 && X.o.length <= 3, id + ": 2–3 objetivos");
 t(Array.isArray(X.err) && X.err.length >= 3 && X.err.length <= 5, id + ": 3–5 errores frecuentes");
 t(Array.isArray(X.q) && X.q.length === 4, id + ": mini-quiz de 4 preguntas");
 (X.q || []).forEach(q => valQ(q, id));
 const w = words(X.x); if (w < 800) cortas.push(id + " (" + w + ")");
 t(Array.isArray(X.t) && X.t.length >= 1, id + ": términos del glosario");
 if (X.hr) t(!!CALC[X.hr], id + ": la calculadora «" + X.hr + "» existe");
 if (/`|\$\{/.test(JSON.stringify(X))) t(false, id + ": restos de plantilla");
}));
Object.keys(LECC).forEach(k => { const [mid, n] = k.split("-"); const m = M.find(x => x.id === mid); t(m && +n >= 1 && +n <= m.L.length, "Lección sobrante o mal numerada: " + k); });
t(cortas.length === 0, "Explicaciones con al menos 800 palabras; cortas: " + cortas.join(", "));

// 3. Bancos, exámenes y evaluación final
M.filter(m => !m.proyecto).forEach(m => { const b = B[m.id]; if (!b) { if (!parcial) t(false, "Falta el banco de " + m.id); return; } t(b.length >= 20, m.id + ": banco con 20 o más preguntas (hay " + b.length + ")"); b.forEach(q => valQ(q, "Banco " + m.id)); t(new Set(b.map(q => norm(Array.isArray(q) ? q[0] : q.t))).size === b.length, m.id + ": sin preguntas repetidas"); });
for (const k of ["1","2","3","4","final"]) { const x = E[k]; if (!x) { if (!parcial) t(false, "Falta el examen " + k); continue; } (x.extra || []).forEach(q => valQ(q, "Examen " + k)); t((x.prob || []).length >= 2, "Examen " + k + ": problemas o minicaso"); (x.prob || []).forEach(q => valQ(q, "Examen " + k)); }

// 4. Casos
const casoIds = new Set(CASOS.map(c => c.id)); t(casoIds.size === CASOS.length, "Casos con identificador único");
CASOS.forEach(c => { t(!!M.find(m => m.id === c.mod), c.id + ": módulo existe"); for (const k of ["t","ctx","dil","resp"]) t(c[k] && c[k].length > 20, c.id + ": campo " + k); t(["real","ficticio"].includes(c.tipo), c.id + ": tipo"); t(c.preg && c.preg.length >= 3, c.id + ": 3 o más preguntas"); t(c.lec && c.lec.length >= 2, c.id + ": lecciones"); if (c.tipo === "real") t(!!c.fuentes, c.id + ": caso real con fuentes"); if (c.les) { const [mid, n] = c.les.split("-"); const m = M.find(x => x.id === mid); t(m && +n <= m.L.length, c.id + ": lección enlazada existe"); } });
M.forEach(m => { if (m.caso && (!parcial || LECC[m.id + "-1"])) t(casoIds.has(m.caso), m.id + ": su caso «" + m.caso + "» existe"); });

// 5. Glosario
if (G.length || !parcial) {
 t(G.length >= 250, "Glosario con 250 términos o más (hay " + G.length + ")");
 const gs = new Set(G.map(g => slug(g[0]))); t(gs.size === G.length, "Términos del glosario sin repetir");
 G.forEach(g => t(g.length === 3 && g[1].length > 15 && M.find(m => m.id === g[2]), "Término válido: " + g[0]));
 Object.entries(LECC).forEach(([id, X]) => (X.t || []).forEach(term => t(gs.has(slug(term)), id + ": el término «" + term + "» está en el glosario")));
}

// 6. Calculadoras (valores de control del plan)
const run = (k, v) => CALC[k].calc(v);
const num = s => parseFloat(String(s).replace(/[^\d.\-]/g, ""));
t(Object.keys(CALC).length === 13, "13 calculadoras");
const eq = run("equilibrio", {cf:18000, p:40, cv:16}); t(num(eq.r[1][1]) === 750, "Punto de equilibrio = 750 tortas");
const mg = run("margen", {p:40, c:16}); t(mg.r[0][1] === "$24.00" && mg.r[1][1] === "60.0 %" && mg.r[2][1] === "150.0 %", "Margen 60 % y sobreprecio 150 %");
t(run("precio", {c:16, m:60}).r[0][1] === "$40.00", "Precio con margen 60 % = 40");
t(run("descuento", {p:40, c:16, d:10}).r[2][1] === "1.20", "Descuento del 10 % exige vender 1.2 veces");
t(run("recuperacion", {i:60000, a:5000, n:36, r:12}).r[0][1] === "12.0 meses", "Recuperación en 12 meses");
t(run("regalias", {v:400000, r:6, p:2, u:18, c:350000}).big === "Pagos mensuales: $32,000.00", "Regalías + publicidad = 32,000");
const pa = run("participacion", {inv:500000, pct:20, a:70, b:30}); t(pa.r[1][1] === "$2,500,000.00" && pa.r[2][1] === "56.0 %", "Valuación posterior 2.5 millones; Lupita 56 %");
t(run("caclt", {g:6000, n:120, t:85, fr:4, m:55, meses:12}).r[0][1] === "$50.00", "CAC = 50");
t(run("reorden", {d:300, l:2, ss:1}).r[2][1] === "900", "Punto de reorden = 900");
const rs = run("resultados", {v:216000, cv:86400, go:90000, i:3000, t:30}); t(rs.r[0][1].startsWith("$129,600.00"), "Utilidad bruta 129,600");
t(run("flujo", {s:20000, e:"180000,190000,150000,160000,200000,210000", p:"185000,185000,185000,170000,175000,180000"}).big === "Te quedas sin efectivo en el mes 3", "Flujo: sin efectivo en el mes 3");
t(!!run("flujo", {s:0, e:"1,2", p:"1"}).err, "Flujo: rechaza listas incompletas");
t(!!run("equilibrio", {cf:1000, p:10, cv:12}).err, "Equilibrio: rechaza precio menor que costo");
t(run("presupuesto", {pv:220000, rv:200000, pc:88000, rc:86000, pg:90000, rg:97000}).r[0][1].includes("desfavorable"), "Presupuesto: ventas por debajo = desfavorable");
const em = run("empleado", {s:9000, a:15, vac:12, pv:25, imss:25, isn:3}); t(em.r[1][1] === "$4,500.00", "Aguinaldo de 15 días con 9,000 = 4,500");

// 7. Solo español (detección básica de restos en inglés)
const sinFuentes = JSON.parse(JSON.stringify(LECC)); Object.values(sinFuentes).forEach(x => delete x.f);
const casosSin = CASOS.map(c => Object.assign({}, c, {fuentes: ""}));
const texto = JSON.stringify([sinFuentes, B, E, casosSin, G]).replace(/«[^»]*»/g, " ").replace(/\([^)]*\b(19|20)\d\d\)/g, " ");
const ingles = (texto.match(/\b(the|and|with|this|that|from|which|your|lesson|quiz question)\b/g) || []).filter(x => x);
t(ingles.length < 15, "Sin restos de texto en inglés (" + ingles.length + " coincidencias)");

console.log("\nLecciones con texto: " + (223 - faltan) + " de 223");
console.log((fallos ? "✗ " : "✓ ") + ok + " comprobaciones correctas, " + fallos + " con error.");
process.exit(fallos ? 1 : 0);
