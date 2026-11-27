// Carga los archivos de datos y de lógica del sitio en node (sin navegador) para las pruebas.
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const RAIZ = path.join(__dirname, "..");
function cargar() {
  const ctx = { console: console, Math: Math, JSON: JSON, Date: Date, Object: Object, Array: Array, String: String, Number: Number, RegExp: RegExp, Error: Error, isNaN: isNaN, isFinite: isFinite, parseFloat: parseFloat, Infinity: Infinity, NaN: NaN };
  ctx.window = ctx; ctx.globalThis = ctx;
  vm.createContext(ctx);
  const html = fs.readFileSync(path.join(RAIZ, "index.html"), "utf8");
  const scripts = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m => m[1]).filter(s => !/app\.js$/.test(s));
  for (const s of scripts) {
    const codigo = fs.readFileSync(path.join(RAIZ, s), "utf8");
    vm.runInContext(codigo, ctx, { filename: s });
  }
  return { ctx, scripts };
}
module.exports = { cargar, RAIZ };
