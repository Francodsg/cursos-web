// Convierte un plan en Markdown (Planes 2 y 3) en datos para el motor de curso.
// Uso: node parse-plan.js plan.md config.json salida.js
const fs = require("fs");
const [,, planPath, cfgPath, outPath] = process.argv;
const cfg = JSON.parse(fs.readFileSync(cfgPath, "utf8"));
const lines = fs.readFileSync(planPath, "utf8").split("\n");

const modRe = /^(?:#{3,4} |\*\*)([A-Z]{2,4}\d?(?:\.\d)?)\.? (.+?) \((?:Nivel \d, )?(\d+) lecciones?(?: o rondas)?\)(?:\*\*)?\s*$/;
const mods = []; let cur = null, pendingLabel = null, inLevelObj = false, objs = [], curObj = null, inResources = false, resources = [];

for (let i = 0; i < lines.length; i++) {
  const ln = lines[i];
  // Sección 2: objetivos por nivel
  if (/^## 2\./.test(ln)) { inLevelObj = true; continue; }
  if (/^## 3\./.test(ln)) inLevelObj = false;
  if (inLevelObj) {
    const m = ln.match(/^\*\*Nivel (\d), (.+?)\.\*\*/);
    if (m) { curObj = {n: +m[1], name: m[2], obj: []}; objs.push(curObj); continue; }
    if (curObj && /^- /.test(ln)) curObj.obj.push(ln.slice(2));
    continue;
  }
  // Sección de recursos
  if (/^## 7\./.test(ln)) { inResources = true; cur = null; continue; }
  if (inResources) { if (/^## 8\./.test(ln)) { inResources = false; } else resources.push(ln); continue; }
  if (/^## /.test(ln)) { cur = null; continue; }

  const mm = ln.match(modRe);
  if (mm) {
    const id = mm[1];
    const digit = (id.match(/\d/) || [cfg.lastLevel + ""])[0];
    const prefix = id.replace(/[\d.]/g, "");
    cur = {id, t: mm[2], n: +mm[3], lvl: +digit, area: cfg.areaMap[prefix] || prefix, L: [], f: {}, ctx: ""};
    mods.push(cur); pendingLabel = null; continue;
  }
  if (!cur) continue;
  if (/^### /.test(ln) || /^---/.test(ln)) { pendingLabel = null; if (/^### /.test(ln)) cur = null; continue; }

  const row = ln.match(/^\| *(\d+) *(★)? *\| *(.+?) *\|(.*)$/);
  if (row) { cur.L.push({t: row[3], star: !!row[2], extra: row[4].replace(/\|\s*$/, "").replace(/^\s*\|?\s*/, "").trim()}); continue; }
  const rng = ln.match(/^(\d+)[–-](\d+)\. (★ )?(.+?)\.?$/);
  if (rng && !cur.hasTable && pendingLabel === null) { const a = +rng[1], b = +rng[2]; for (let k = a; k <= b; k++) cur.L.push({t: rng[4].replace(/\s*\([^)]*\)$/, "") + " (" + (k - a + 1) + " de " + (b - a + 1) + ")", star: !!rng[3], extra: ""}); continue; }
  const num = ln.match(/^(\d+)\. (★ )?(.+)$/);
  if (num && !cur.hasTable && pendingLabel === null) { cur.L.push({t: num[3], star: !!num[2], extra: ""}); continue; }
  if (/^\| ?Lección|^\|---/.test(ln)) { cur.hasTable = true; continue; }

  const lab = ln.match(/^\*\*([^*]+?):\*\*\s*(.*)$/);
  if (lab) {
    const key = lab[1].trim();
    if (lab[2]) { cur.f[key] = lab[2]; pendingLabel = null; } else { cur.f[key] = []; pendingLabel = key; }
    continue;
  }
  if (pendingLabel && /^- /.test(ln)) { cur.f[pendingLabel].push(ln.slice(2)); continue; }
  if (pendingLabel && /^\d+\. /.test(ln)) { cur.f[pendingLabel].push(ln.replace(/^\d+\. /, "")); continue; }
  if (ln.trim() === "") continue;
  if (/^[^|*#-]/.test(ln) && pendingLabel) pendingLabel = null;
  if (/^- /.test(ln) && !pendingLabel) { (cur.f["Notas"] = cur.f["Notas"] || []).push(ln.slice(2)); }
}

// Completar lecciones si el plan agrupa varias (p. ej., «3–6. Debate…»)
mods.forEach(m => {
  while (m.L.length < m.n) m.L.push({t: (cfg.fillLesson || "Sesión de práctica") + " " + (m.L.length + 1), star: false, extra: ""});
  if (m.L.length > m.n) m.L = m.L.slice(0, m.n);
  m.ctx = m.f["Contexto histórico"] || m.f["Contexto"] || "";
  delete m.hasTable;
});
// Heredar campos compartidos dentro de un grupo (FUN0.1–FUN0.5)
const groups = {};
mods.forEach(m => { const g = m.id.split(".")[0]; (groups[g] = groups[g] || []).push(m); });
Object.values(groups).forEach(g => {
  if (g.length < 2) return;
  const donor = g.find(m => Object.keys(m.f).length > 1) || g[g.length - 1];
  g.forEach(m => { for (const k in donor.f) if (!m.f[k]) m.f[k] = donor.f[k]; });
});

const total = mods.reduce((s, m) => s + m.L.length, 0);
const data = {cfg, levels: objs, modules: mods, resources};
fs.writeFileSync(outPath, "window.DATA = " + JSON.stringify(data) + ";\n");
console.log("módulos:", mods.length, "lecciones:", total);
mods.forEach(m => console.log(m.id, m.area, "nivel", m.lvl, m.L.length + "/" + m.n, Object.keys(m.f).join(", ")));
