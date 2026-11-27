// Pruebas de punta a punta en Chromium (Playwright): rutas, errores, diseño adaptable,
// tema, progreso, buscador, quizzes, calculadoras y simulaciones.
// Ejecutar: node pruebas/pruebas-navegador.js [carpeta-de-capturas]
"use strict";
const { chromium } = require("playwright");
const path = require("path"), fs = require("fs");
const { cargar } = require("./cargar");
const URL0 = "file://" + path.join(__dirname, "..", "index.html");
const CAPT = process.argv[2] || null;
const { ctx } = cargar();
const C = ctx.CURSO;
let ok = 0, fallos = 0;
function check(c, m) { if (c) ok++; else { fallos++; console.log("FALLO: " + m); } }

(async () => {
  const nav = await chromium.launch();
  const errores = [];
  async function nueva(opc) {
    const cx = await nav.newContext(Object.assign({ deviceScaleFactor: 1 }, opc));
    const p = await cx.newPage();
    p.on("console", m => { if (m.type() === "error") errores.push("[consola] " + m.text()); });
    p.on("pageerror", e => errores.push("[página] " + e.message));
    p.on("requestfailed", r => errores.push("[recurso] " + r.url()));
    p.on("dialog", d => d.accept());
    await p.goto(URL0); await p.waitForSelector("main h1");
    return { cx, p };
  }
  async function ir(p, ruta) { await p.evaluate(r => { location.hash = r; }, ruta); await p.waitForTimeout(40); }
  async function sinDesborde(p, ruta) { const d = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth); check(d <= 1, "Desbordamiento horizontal de " + d + " px en " + ruta); }

  const rutas = ["#/", "#/curso", "#/curso?ruta=expres", "#/laboratorio", "#/simulaciones", "#/calculadoras", "#/experimentos", "#/glosario", "#/formulas", "#/personajes", "#/linea-de-tiempo", "#/progreso", "#/ajustes", "#/acerca", "#/buscar?q=ohm", "#/examen-final", "#/certificado", "#/certificado/nivel-1", "#/ruta-que-no-existe"];
  C.modulos.forEach(m => { rutas.push("#/modulo/" + m.id, "#/quiz/" + m.id); m.lecciones.forEach(l => rutas.push("#/leccion/" + l.id)); });
  Object.keys(C.sims).forEach(s => rutas.push("#/simulacion/" + s));
  Object.keys(C.calcs).forEach(s => rutas.push("#/calculadora/" + s));
  (ctx.EXPERIMENTOS || []).forEach(e => rutas.push("#/experimento/" + e.id));

  // 1. Todas las rutas en celular y en PC, sin errores ni desbordamiento
  for (const [nombre, vp] of [["celular", { width: 390, height: 844 }], ["PC", { width: 1366, height: 768 }]]) {
    const { cx, p } = await nueva({ viewport: vp, isMobile: nombre === "celular", hasTouch: nombre === "celular" });
    for (const r of rutas) {
      await ir(p, r);
      const h1 = await p.$eval("main h1", e => e.textContent).catch(() => "");
      check(h1.length > 0, "Sin título h1 en " + r + " (" + nombre + ")");
      await sinDesborde(p, r + " (" + nombre + ")");
    }
    if (CAPT) { fs.mkdirSync(CAPT, { recursive: true }); for (const r of ["#/", "#/leccion/1-6", "#/simulacion/S5", "#/calculadora/C5"]) { await ir(p, r); await p.waitForTimeout(150); await p.screenshot({ path: path.join(CAPT, nombre + "-" + r.replace(/[#/?=]/g, "_") + ".png") }); } }
    await cx.close();
  }

  const { cx, p } = await nueva({ viewport: { width: 1280, height: 800 } });
  // 2. Tema claro y oscuro
  await ir(p, "#/");
  const fondo = () => p.evaluate(() => getComputedStyle(document.body).backgroundColor);
  await p.evaluate(() => window.ponerTema("light")); const f1 = await fondo();
  await p.click("#tema"); const f2 = await fondo();
  check(f1 !== f2, "El botón de tema no cambia los colores");
  check(await p.evaluate(() => document.documentElement.getAttribute("data-theme")) === "dark", "El tema oscuro no se aplica");
  await p.reload(); await p.waitForSelector("main h1");
  check(await p.evaluate(() => document.documentElement.getAttribute("data-theme")) === "dark", "El tema no se recuerda al recargar");
  if (CAPT) { await ir(p, "#/leccion/0-3"); await p.screenshot({ path: path.join(CAPT, "oscuro-leccion.png") }); }
  await p.evaluate(() => window.ponerTema("light"));

  // 3. Buscador en vivo y página de resultados
  await ir(p, "#/");
  await p.fill("#q", "tomacorriente"); await p.waitForTimeout(80);
  check(await p.isVisible("#sugerencias"), "No aparecen sugerencias al escribir");
  await p.fill("#q", "tension"); await p.waitForTimeout(80);
  check((await p.$$("#sugerencias a")).length > 1, "La búsqueda sin acento no da resultados");
  await p.keyboard.press("Escape");
  for (const q of ["ley de ohm", "seguridad", "buscador", "pila", "tranformador"]) {
    const n = await p.evaluate(q => window.BUSCADOR.buscar(q).length, q); check(n > 0, "Sin resultados para «" + q + "»");
  }
  await ir(p, "#/buscar?q=zzzzqqq"); check((await p.textContent("main")).indexOf("No encontré") >= 0, "Falta el mensaje de búsqueda vacía");
  await ir(p, "#/"); await p.keyboard.press("/"); check(await p.evaluate(() => document.activeElement.id) === "q", "La tecla / no enfoca el buscador");
  await p.keyboard.press("Escape"); await p.click("main");

  // 4. Lección: mini-quiz con retroalimentación y progreso que persiste
  const lec = C.modulos[0].lecciones[0].id;
  await p.evaluate(() => localStorage.clear()); await p.reload(); await p.waitForSelector("main h1");
  await ir(p, "#/leccion/" + lec);
  const qs = await p.$$(".quiz-cont .q");
  for (const q of qs) {
    const op = await q.$(".opcion"); if (op) { await op.click(); continue; }
    const inp = await q.$("input"); if (inp) { await inp.fill("1"); await (await q.$(".comprobar")).click(); continue; }
    const c = await q.$(".comprobar"); if (c) await c.click();
  }
  check((await p.$$(".quiz-cont .retro:not([hidden])")).length === qs.length, "No se muestra la retroalimentación de cada pregunta del mini-quiz");
  check((await p.textContent(".quiz-cont .pie-quiz")).indexOf("Resultado") >= 0, "No se muestra el resultado del mini-quiz");
  await p.evaluate(() => document.getElementById("final-leccion").scrollIntoView()); await p.waitForTimeout(300);
  await p.reload(); await p.waitForSelector("main h1");
  const prog = await p.evaluate(() => JSON.parse(localStorage.getItem("electricidad-progreso-v1")));
  check(prog && prog.quizzes["l-" + lec] && prog.lecciones[lec] && prog.lecciones[lec].completada, "La lección no queda completada y guardada tras recargar");
  await ir(p, "#/progreso"); check((await p.textContent("main")).indexOf("1 de") >= 0, "Mi progreso no refleja la lección completada");

  // 5. Quiz de módulo con calificación
  const mq = C.modulos[C.modulos.length - 1];
  await ir(p, "#/quiz/" + mq.id);
  const preg = await p.$$("#qz .q");
  check(preg.length >= (mq.quizN || 15), "El quiz del módulo tiene menos preguntas de las esperadas");
  for (const q of preg) {
    const op = await q.$(".opcion"); if (op) { await op.click(); continue; }
    const z = await q.$(".zona"); if (z) { await z.click(); continue; }
    const inp = await q.$("input"); if (inp) { await inp.fill("1"); await (await q.$(".comprobar")).click(); continue; }
    const c = await q.$(".comprobar"); if (c) await c.click();
  }
  await p.click("#qz .calificar");
  check((await p.$$("#qz .retro:not([hidden])")).length === preg.length, "El quiz de módulo no muestra la retroalimentación al calificar");
  check(await p.evaluate(id => !!JSON.parse(localStorage.getItem("electricidad-progreso-v1")).quizzes["m-" + id], mq.id), "El resultado del quiz de módulo no se guarda");
  await p.click("#qz .reintentar"); check((await p.$$("#qz .q")).length > 0, "El botón «Volver a intentar» no genera un quiz nuevo");

  // 5 bis. Examen final y certificado
  await ir(p, "#/examen-final");
  check((await p.$$("#qz .q")).length === 40, "El examen final no tiene 40 preguntas");
  await ir(p, "#/certificado");
  check((await p.$$("#nombre-cert")).length === 0, "El certificado no debería estar disponible sin aprobar el examen");
  const respaldo = await p.evaluate(() => window.PROGRESO.exportar());
  await p.evaluate(() => window.PROGRESO.registrarQuiz("examen-final", 85));
  await ir(p, "#/"); await ir(p, "#/certificado");
  await p.fill("#nombre-cert", "Persona de prueba");
  check((await p.textContent("#cert-nombre")) === "Persona de prueba", "El certificado no muestra el nombre");
  await ir(p, "#/progreso"); check((await p.textContent("main")).indexOf("Examen final aprobado") >= 0, "Falta la insignia del examen final");
  await p.evaluate(t => window.PROGRESO.importar(t), respaldo);

  // 6. Exportar e importar progreso
  const exp =await p.evaluate(() => window.PROGRESO.exportar());
  await p.evaluate(() => window.PROGRESO.reiniciar()); check(await p.evaluate(() => window.PROGRESO.avanceTotal().hechas) === 0, "Reiniciar no borra el progreso");
  await p.evaluate(t => window.PROGRESO.importar(t), exp); check(await p.evaluate(() => window.PROGRESO.avanceTotal().hechas) === 1, "Importar no recupera el progreso");

  // 7. Calculadoras desde la interfaz
  async function calc(id, valores, espera) {
    await ir(p, "#/calculadora/" + id);
    for (const k of Object.keys(valores)) { const sel = "#calc-cont [name=" + k + "]"; const tag = await p.$eval(sel, e => e.tagName); if (tag === "SELECT") await p.selectOption(sel, valores[k]); else await p.fill(sel, valores[k]); }
    await p.click("#calc-cont button[type=submit]");
    const t = await p.textContent("#calc-cont .salida"); check(t.indexOf(espera) >= 0, "Calculadora " + id + ": esperaba «" + espera + "» y salió «" + t + "»");
  }
  for (const id of Object.keys(C.calcs)) { await ir(p, "#/calculadora/" + id); const t = await p.textContent("#calc-cont .salida"); check(t.trim().length > 0 && !/error-campo/.test(await p.getAttribute("#calc-cont .salida", "class")), "La calculadora " + id + " no da un resultado con sus valores iniciales: «" + t + "»"); }
  await calc("C1", { V: "", I: "20 mA", R: "450" }, "9 V");
  await calc("C1", { V: "9", I: "", R: "450" }, "20 mA");
  await calc("C3", { expr: "4 + (6 || 12)" }, "8 Ω");
  await calc("C10", { Vs: "9", Vf: "2", I: "20 mA", n: "1" }, "390 Ω");
  await calc("C12", { v: "127", tipo: "rms", f: "60" }, "179,6 V");
  await calc("C13", { R: "10k", C: "100µ", t: "1", Vs: "9" }, "τ = 1 s");
  await calc("C9", { modo: "a-valor", nb: "4", b1: "amarillo", b2: "violeta", bm: "rojo", bt: "dorado" }, "4,7 kΩ");
  await calc("C1", { V: "abc", I: "", R: "450" }, "No entiendo");
  await ir(p, "#/calculadora/C5"); check((await p.textContent("#calc-cont .salida")).indexOf("kWh") >= 0, "C5 no calcula el consumo");
  await p.click("#calc-cont [data-a=agregar]"); check((await p.$$("#calc-cont .fila-aparato")).length === 7, "C5 no agrega aparatos");

  // 8. Simulaciones: se dibujan y responden a los controles
  for (const id of Object.keys(C.sims)) {
    await ir(p, "#/simulacion/" + id); await p.waitForTimeout(120);
    const hijos = await p.$eval("#sim-cont svg", s => s.childElementCount).catch(() => 0);
    check(hijos > 0, "La simulación " + id + " no dibuja nada");
    const antes = await p.textContent("#sim-cont .sim-lectura");
    check(antes.trim().length > 0, "La simulación " + id + " no muestra lecturas");
    const r = await p.$("#sim-cont input[type=range]"), b = await p.$("#sim-cont .chip:not(.on), #sim-cont .sim-controles button.btn, #sim-cont input[type=checkbox]");
    if (r) await r.evaluate(e => { e.value = e.min; e.dispatchEvent(new Event("input", { bubbles: true })); });
    else if (b) await b.click();
    await p.waitForTimeout(120);
    const despues = await p.textContent("#sim-cont .sim-lectura");
    check(despues !== antes || !(r || b), "La simulación " + id + " no responde a sus controles");
  }
  // Interacciones concretas
  await ir(p, "#/simulacion/S5"); await p.click("#sim-cont [data-f='0']"); check((await p.textContent("#sim-cont .sim-lectura")).indexOf("FUNDIDO") >= 0, "S5: no se puede fundir un foco");
  await ir(p, "#/simulacion/S15"); await p.click("#sim-cont .chip[data-v=A]"); check((await p.textContent("#sim-cont .sim-lectura")).indexOf("Cortocircuito") >= 0, "S15: medir corriente en paralelo debería fundir el fusible");
  await ir(p, "#/simulacion/S14"); await p.check("#sim-cont input[data-c='2'][data-k='1']"); await p.check("#sim-cont input[data-c='2'][data-k='2']"); await p.check("#sim-cont input[data-c='2'][data-k='3']");
  check((await p.textContent("#sim-cont .sim-lectura")).indexOf("disparado") >= 0, "S14: la sobrecarga de la cocina debería disparar el termomagnético");

  // 9. Navegación por menú en celular
  await cx.close();
  const m = await nueva({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await m.p.click("#menubtn"); check(await m.p.isVisible("#menu"), "El menú no se abre en el celular");
  await m.p.click("#menu a[href='#/glosario']"); await m.p.waitForTimeout(60); check(await m.p.isHidden("#menu"), "El menú no se cierra al navegar");
  check((await m.p.textContent("main h1")).indexOf("Glosario") >= 0, "El menú no lleva a la página elegida");
  check(await m.p.isVisible(".bottombar"), "No se ve la barra inferior en el celular");
  await m.cx.close();

  await nav.close();
  const unicos = [...new Set(errores)];
  unicos.forEach(e => console.log("ERROR DEL NAVEGADOR: " + e));
  check(unicos.length === 0, "Hubo " + unicos.length + " errores en la consola o recursos que no cargaron");
  console.log("\nRutas probadas: " + rutas.length + " × 2 tamaños · Comprobaciones correctas: " + ok + " · Fallos: " + fallos);
  process.exit(fallos ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
