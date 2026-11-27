// Revisión de idioma: busca palabras en inglés en los textos visibles del sitio.
// Ejecutar: node pruebas/revisar-idioma.js
"use strict";
const fs = require("fs"), path = require("path");
const RAIZ = path.join(__dirname, "..");
// Palabras inglesas que no deberían aparecer en textos para el usuario.
const INGLES = ["the", "and", "with", "click", "loading", "submit", "settings", "welcome", "lesson", "lessons", "course", "next", "previous", "score", "correct", "wrong", "answer", "question", "questions", "results", "finish", "close", "you", "your", "this", "that", "from", "back", "home", "search", "progress", "dark", "light", "mode", "level", "module", "true", "false", "yes", "show", "hide", "start", "page", "not", "found", "error", "warning", "battery", "voltage", "current", "power", "switch", "outlet", "ground", "wire", "circuit", "calculate", "calculator", "simulation", "glossary", "timeline", "certificate", "exam", "print", "export", "import", "reset", "save", "saved", "share", "help", "about", "menu", "open", "brushless", "inverter", "shunt", "router", "routers", "bank", "split"];
// Excepciones técnicas aceptadas en español (siglas y préstamos habituales).
const PERMITIDAS = new Set(["LED", "RMS", "AWG", "CAT", "AND", "OR", "NOT", "NAND", "NOR", "XOR", "GFCI", "RCD", "DC", "AC", "NPN", "PNP", "breaker", "standby", "protoboard", "breadboard", "tester", "quiz", "quizzes", "Wh", "kWh", "NEC", "REBT", "NOM", "SEDE", "USB", "wifi", "error"]);
const archivos = ["index.html"].concat(fs.readdirSync(path.join(RAIZ, "datos")).map(f => "datos/" + f), fs.readdirSync(path.join(RAIZ, "js")).map(f => "js/" + f));
let hallazgos = 0, cadenas = 0;
function revisarTexto(txt, donde) {
  const limpio = txt.replace(/<[^>]*(>|$)/g, " ").replace(/^[^<]*>/, " ").replace(/&[a-z]+;/g, " ").replace(/#\/[^\s)"']*/g, " ").replace(/\b[a-z-]+="[^"]*"/g, " ");
  if (/prefers-color-scheme|prefers-reduced-motion/.test(txt)) return; // consultas de medios del navegador
  if (!/\s/.test(limpio.trim())) return; // una sola palabra: probablemente un identificador de código
  cadenas++;
  const palabras = limpio.match(/[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+/g) || [];
  for (const w of palabras) {
    if (PERMITIDAS.has(w) || PERMITIDAS.has(w.toLowerCase())) continue;
    if (w === w.toUpperCase() && w.length > 1) continue; // siglas
    if (INGLES.includes(w.toLowerCase())) { hallazgos++; console.log("Posible inglés «" + w + "» en " + donde + ": " + limpio.trim().slice(0, 110)); }
  }
}
for (const a of archivos) {
  const src = fs.readFileSync(path.join(RAIZ, a), "utf8");
  if (a.endsWith(".html")) { revisarTexto(src.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " "), a); continue; }
  const sinComent = src.replace(/^\s*\/\/.*$/gm, "");
  for (const m of sinComent.matchAll(/"((?:[^"\\\n]|\\.)*)"|'((?:[^'\\\n]|\\.)*)'|`((?:[^`\\]|\\.)*)`/g)) revisarTexto(m[1] || m[2] || m[3] || "", a);
}
console.log("\nCadenas revisadas: " + cadenas + " · Posibles textos en inglés: " + hallazgos);
process.exit(hallazgos ? 1 : 0);
