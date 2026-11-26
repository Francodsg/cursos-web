// Curso de Administración: calculadoras, simulación de empresa, rutas por perfil y plan de negocio.
// Se carga antes de app.js. window.TOOLS da la página /herramientas; window.EXTRA añade páginas propias del sitio.
(function(){
"use strict";
const KEY = "curso_admin";
const store = { get(k,d){ try{ const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; }catch(e){ return d; } }, set(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} } };
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
// Formato numérico español: 1.234,56 (también con 4 cifras, como pide el plan)
const fmt = (x, d = 2) => { if (!isFinite(x)) return "—"; const neg = x < 0; let [i, f] = Math.abs(x).toFixed(d).split(".");
  i = i.replace(/\B(?=(\d{3})+(?!\d))/g, "."); f = f ? f.replace(/0+$/, "") : ""; return (neg ? "-" : "") + i + (f ? "," + f : ""); };
const um = (x, d = 2) => fmt(x, d) + " u. m.";
const $ = id => document.getElementById(id);
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lesson = (path, t) => `<p class="meta">Lección relacionada: <a href="#/m/${path}">${t}</a></p>`;

// Estilos propios de las páginas añadidas (no tocan el estilo común del motor)
const css = document.createElement("style");
css.textContent = `.tool .interp{display:block;margin-top:.4rem;font-weight:400}.tool .good{color:#2e7d32}.tool .warnc{color:#b3261e}
.kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(9.5rem,1fr));gap:.6rem;margin:1rem 0}.kpi{background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:.6rem .8rem}.kpi b{display:block;font-size:1.15rem}
.num{text-align:right;font-variant-numeric:tabular-nums}.event{border-left:4px solid #e07a1f;padding:.5rem .8rem;background:var(--panel);margin:1rem 0;border-radius:6px}
.secplan textarea{min-height:5rem}.secplan h3{margin-bottom:.3rem}
@media print{.top,.foot,.noprint,.side{display:none!important}body{background:#fff;color:#000}}`;
document.head.appendChild(css);

// ---------------------------------------------------------------- Herramientas
const inp = (id, label, v, extra = "") => `<label>${label} <input id="${id}" type="number" step="any" value="${v}" ${extra}></label>`;
const TOOLLIST = [
  ["t-pe","Punto de equilibrio"],["t-fc","Flujo de caja"],["t-ra","Ratios"],["t-ic","Interés compuesto"],["t-van","VAN y TIR"],["t-pr","Préstamo"],["t-wacc","WACC"],
  ["t-mkt","Tamaño de mercado"],["t-cac","CAC y LTV"],["t-eoq","Inventarios"],["t-rh","Coste de personal"]];
window.TOOLS = {
  page(){
    return `<div class="crumbs"><a href="#/">Inicio</a> › Herramientas</div><h1>Herramientas</h1>
    <p class="meta">Los valores de ejemplo son de Café Raíz, la empresa ficticia del curso. Resultados orientativos con fines educativos: no son asesoría financiera, fiscal ni legal.</p>
    <div class="row chips noprint">${TOOLLIST.map(([id,t]) => `<button class="chip" data-goto="${id}">${t}</button>`).join("")}</div>
    <p class="noprint"><button class="btn sec" onclick="print()">Imprimir o guardar en PDF</button></p>

    <h2>Finanzas</h2>
    <div class="tool" id="t-pe"><h2>Punto de equilibrio</h2>${inp("pe-cf","Costes fijos mensuales",6000)}${inp("pe-p","Precio por unidad",3)}${inp("pe-cv","Coste variable por unidad",1)}<output id="pe-out"></output>${lesson("FIN1/8","FIN1 · Punto de equilibrio")}</div>
    <div class="tool" id="t-fc"><h2>Flujo de caja (6 meses)</h2><p class="meta">Beneficio no es lo mismo que caja: si cobras tarde y pagas pronto, puedes quedarte sin dinero aunque ganes.</p>
      ${inp("fc-s","Saldo inicial",5000)}${inp("fc-v","Ventas del primer mes",20000)}${inp("fc-g","Crecimiento mensual de ventas (%)",10)}${inp("fc-c","Cobrado al contado (%)",40)}${inp("fc-cv","Coste variable (% de ventas)",35)}${inp("fc-cf","Pagos fijos mensuales",12000)}
      <output id="fc-out"></output><div id="fc-tab" class="tablewrap"></div>${lesson("FIN1/6","FIN1 · Beneficio frente a caja")}</div>
    <div class="tool" id="t-ra"><h2>Ratios financieros básicos</h2>${inp("ra-ac","Activo corriente",40000)}${inp("ra-pc","Pasivo corriente",25000)}${inp("ra-pt","Pasivo total",60000)}${inp("ra-pn","Patrimonio neto",80000)}${inp("ra-bn","Beneficio neto",12000)}${inp("ra-at","Activo total",140000)}<output id="ra-out"></output>${lesson("FIN2/2","FIN2 · Ratios")}</div>
    <div class="tool" id="t-ic"><h2>Interés compuesto</h2>${inp("ic-c","Capital inicial",1000)}${inp("ic-a","Aportación mensual",100)}${inp("ic-r","Rentabilidad anual (%)",5)}${inp("ic-n","Años",20)}<output id="ic-out"></output>${lesson("FIN2/7","FIN2 · Valor del dinero en el tiempo")}</div>
    <div class="tool" id="t-van"><h2>VAN, TIR y periodo de recuperación</h2>${inp("v-i","Inversión inicial",50000)}${inp("v-r","Tasa de descuento (%)",10)}
      <label>Flujos anuales (separados por punto y coma) <input id="v-f" style="width:18rem" value="15000; 15000; 15000; 15000; 15000"></label><output id="v-out"></output>${lesson("FIN2/8","FIN2 · Evaluación de inversiones")}</div>
    <div class="tool" id="t-pr"><h2>Préstamo: cuota y amortización</h2>${inp("pr-c","Importe",20000)}${inp("pr-r","Interés anual (%)",8)}${inp("pr-n","Plazo (meses)",48)}<output id="pr-out"></output><div id="pr-tab" class="tablewrap"></div>${lesson("FIN2/10","FIN2 · Préstamos")}</div>
    <div class="tool" id="t-wacc"><h2>Coste medio ponderado del capital (WACC)</h2>${inp("w-e","Valor del patrimonio (E)",80000)}${inp("w-d","Valor de la deuda (D)",60000)}${inp("w-ke","Coste del capital propio (%)",12)}${inp("w-kd","Coste de la deuda (%)",7)}${inp("w-t","Tipo del impuesto sobre beneficios (%)",25)}<output id="w-out"></output>${lesson("FIN3/3","FIN3 · WACC")}</div>

    <h2>Marketing</h2>
    <div class="tool" id="t-mkt"><h2>Tamaño de mercado (TAM, SAM, SOM)</h2>${inp("tm-p","Población de la zona",250000)}${inp("tm-q","Consumen café fuera de casa (%)",45)}${inp("tm-g","Gasto anual por cliente",400)}${inp("tm-s","Alcanzable con tu canal (%)",20)}${inp("tm-o","Cuota que esperas lograr (%)",5)}<output id="tm-out"></output>${lesson("EMP1/3","EMP1 · Evaluar oportunidades")}</div>
    <div class="tool" id="t-cac"><h2>CAC y LTV</h2>${inp("c-m","Gasto en captación del mes",3000)}${inp("c-n","Clientes nuevos del mes",150)}${inp("c-t","Ticket medio",4.5)}${inp("c-f","Compras por cliente al mes",6)}${inp("c-mg","Margen bruto (%)",65)}${inp("c-v","Meses que sigue siendo cliente",14)}<output id="c-out"></output>${lesson("MKT3/5","MKT3 · Analítica y métricas")}</div>

    <h2>Operaciones</h2>
    <div class="tool" id="t-eoq"><h2>Lote económico, stock de seguridad y punto de pedido</h2>${inp("e-d","Demanda anual de café en grano (kg)",3600)}${inp("e-s","Coste de hacer un pedido",60)}${inp("e-h","Coste de almacenar 1 kg durante un año",4)}${inp("e-l","Plazo de entrega (días)",6)}${inp("e-sd","Desviación diaria de la demanda (kg)",3)}
      <label>Nivel de servicio <select id="e-z"><option value="1.28">90 %</option><option value="1.65" selected>95 %</option><option value="2.33">99 %</option></select></label><output id="e-out"></output>${lesson("OPE2/2","OPE2 · Gestión de inventarios")}</div>

    <h2>Recursos humanos</h2>
    <div class="tool" id="t-rh"><h2>Coste total de un empleado y rotación</h2>${inp("h-s","Salario bruto anual",21000)}${inp("h-c","Cotizaciones a cargo de la empresa (%)",30)}${inp("h-o","Otros costes anuales (formación, uniformes, seguros)",900)}
      ${inp("h-x","Salidas en el año",4)}${inp("h-m","Plantilla media",12)}${inp("h-r","Coste de sustituir a una persona (% del salario)",20)}<output id="h-out"></output>
      <p class="meta">Los porcentajes de cotización cambian según el país: consulta la norma vigente de tu país.</p>${lesson("RH1/6","RH1 · Nómina y costes laborales")}</div>`;
  },
  bind(){
    const g = id => parseFloat($(id).value), on = (ids, f) => { ids.forEach(i => $(i).oninput = f); f(); };
    const say = (el, main, txt, ok) => { $(el).innerHTML = `${main}<span class="interp ${ok === true ? "good" : ok === false ? "warnc" : ""}">${txt}</span>`; };
    document.querySelectorAll("[data-goto]").forEach(b => b.onclick = () => $(b.dataset.goto).scrollIntoView({behavior: "smooth"}));

    on(["pe-cf","pe-p","pe-cv"], () => { const cf = g("pe-cf"), p = g("pe-p"), m = p - g("pe-cv");
      if (!(m > 0)) return say("pe-out", "", "El precio debe ser mayor que el coste variable: con este margen nunca cubres los costes fijos.", false);
      const q = Math.ceil(cf / m); say("pe-out", `Margen de contribución: ${um(m)} por unidad · Punto de equilibrio: ${fmt(q,0)} unidades al mes (${um(q*p)} en ventas).`,
        `Cada unidad aporta ${um(m)} para pagar los costes fijos. A partir de la unidad ${fmt(q+1,0)}, cada venta genera beneficio. Son unas ${fmt(Math.ceil(q/30),0)} unidades al día.`); });

    on(["fc-s","fc-v","fc-g","fc-c","fc-cv","fc-cf"], () => { let saldo = g("fc-s"), v = g("fc-v"); const gr = g("fc-g")/100, c = g("fc-c")/100, cv = g("fc-cv")/100, cf = g("fc-cf");
      let pend = 0, minS = saldo, minM = 0, ben = 0; const rows = [];
      for (let m = 1; m <= 6; m++){ const cobros = v*c + pend; pend = v*(1-c); const pagos = v*cv + cf; saldo += cobros - pagos; ben += v - v*cv - cf;
        if (saldo < minS){ minS = saldo; minM = m; } rows.push(`<tr><td>${m}</td><td class="num">${fmt(v)}</td><td class="num">${fmt(cobros)}</td><td class="num">${fmt(pagos)}</td><td class="num">${fmt(saldo)}</td></tr>`); v *= 1 + gr; }
      $("fc-tab").innerHTML = `<table><thead><tr><th>Mes</th><th>Ventas</th><th>Cobros</th><th>Pagos</th><th>Saldo de caja</th></tr></thead><tbody>${rows.join("")}</tbody></table>`;
      say("fc-out", `Beneficio acumulado en 6 meses: ${um(ben)} · Saldo final de caja: ${um(saldo)}`,
        minS < 0 ? `Atención: la caja se vuelve negativa (mínimo ${um(minS)} en el mes ${minM}) aunque el negocio ${ben > 0 ? "gane dinero" : "también pierde dinero"}. Necesitas financiación a corto plazo o cobrar antes.` : `La caja no baja de cero: el saldo mínimo es ${um(minS)}.`, minS >= 0); });

    on(["ra-ac","ra-pc","ra-pt","ra-pn","ra-bn","ra-at"], () => { const liq = g("ra-ac")/g("ra-pc"), end = g("ra-pt")/g("ra-pn"), roe = 100*g("ra-bn")/g("ra-pn"), roa = 100*g("ra-bn")/g("ra-at");
      say("ra-out", `Liquidez (AC/PC): ${fmt(liq)}<br>Endeudamiento (PT/PN): ${fmt(end)}<br>ROE (BN/PN): ${fmt(roe)} %<br>ROA (BN/AT): ${fmt(roa)} %`,
        (liq < 1 ? "Liquidez por debajo de 1: las deudas a corto plazo superan al activo corriente. " : liq > 2.5 ? "Liquidez muy alta: quizá hay dinero ocioso. " : "Liquidez razonable. ") +
        (end > 2 ? "La empresa depende mucho de la deuda. " : "Nivel de deuda moderado. ") + "Compara siempre con empresas del mismo sector.", liq >= 1 && end <= 2); });

    on(["ic-c","ic-a","ic-r","ic-n"], () => { const c = g("ic-c"), a = g("ic-a"), r = g("ic-r")/100/12, m = g("ic-n")*12; let s = c; for (let k = 0; k < m; k++) s = s*(1+r) + a; const put = c + a*m;
      say("ic-out", `Valor final: ${um(s)} · Aportado: ${um(put)} · Intereses generados: ${um(s-put)}`, `Los intereses suponen el ${fmt(100*(s-put)/s,1)} % del valor final. Es una estimación con rentabilidad constante, no una promesa.`); });

    on(["v-i","v-r","v-f"], () => { const I = g("v-i"), r = g("v-r")/100, F = $("v-f").value.split(/;/).map(x => parseFloat(x.replace(/\./g, "").replace(",", "."))).filter(x => !isNaN(x));
      const van = rate => -I + F.reduce((s, f, t) => s + f / Math.pow(1+rate, t+1), 0);
      let lo = -0.99, hi = 10, tir = null; if (van(lo) * van(hi) < 0) { for (let k = 0; k < 200; k++) { const mid = (lo+hi)/2; if (van(lo) * van(mid) <= 0) hi = mid; else lo = mid; } tir = (lo+hi)/2; }
      let acc = -I, pb = null; F.forEach((f, t) => { if (pb === null && acc + f >= 0) pb = t + (-acc)/f; acc += f; });
      const v = van(r); say("v-out", `VAN: ${um(v)} · TIR: ${tir === null ? "no calculable" : fmt(tir*100) + " %"} · Recuperación: ${pb === null ? "no se recupera en el horizonte" : fmt(pb) + " años"}`,
        v >= 0 ? `Tu VAN es positivo: el proyecto crea valor con la tasa de descuento elegida${tir !== null ? ` (la TIR, ${fmt(tir*100)} %, supera el ${fmt(r*100)} % exigido)` : ""}.` : "Tu VAN es negativo: con esa tasa de descuento el proyecto destruye valor.", v >= 0); });

    on(["pr-c","pr-r","pr-n"], () => { const C = g("pr-c"), r = g("pr-r")/100/12, N = Math.round(g("pr-n")); const q = r ? C*r/(1-Math.pow(1+r,-N)) : C/N;
      say("pr-out", `Cuota mensual: ${um(q)} · Total pagado: ${um(q*N)} · Intereses: ${um(q*N-C)}`, `Pagarás un ${fmt(100*(q*N-C)/C,1)} % más de lo que te prestan. Al principio la cuota es casi todo interés.`);
      let s = C, rows = []; for (let k = 1; k <= N; k++) { const it = s*r, am = q - it; s -= am; if (k <= 12 || k === N) rows.push(`<tr><td>${k}</td><td class="num">${fmt(q)}</td><td class="num">${fmt(it)}</td><td class="num">${fmt(am)}</td><td class="num">${fmt(Math.max(s,0))}</td></tr>`); }
      $("pr-tab").innerHTML = `<table><thead><tr><th>Mes</th><th>Cuota</th><th>Interés</th><th>Amortización</th><th>Saldo</th></tr></thead><tbody>${rows.join("")}</tbody></table><p class="meta">Se muestran los 12 primeros meses y el último.</p>`; });

    on(["w-e","w-d","w-ke","w-kd","w-t"], () => { const E = g("w-e"), D = g("w-d"), V = E + D, w = (E/V)*g("w-ke") + (D/V)*g("w-kd")*(1 - g("w-t")/100);
      say("w-out", `WACC: ${fmt(w)} % · Peso del patrimonio: ${fmt(100*E/V,1)} % · Peso de la deuda: ${fmt(100*D/V,1)} %`, `Un proyecto con este riesgo debe rendir más del ${fmt(w)} % anual para crear valor. La deuda cuesta menos de lo que parece porque sus intereses reducen el impuesto.`); });

    on(["tm-p","tm-q","tm-g","tm-s","tm-o"], () => { const tam = g("tm-p")*g("tm-q")/100*g("tm-g"), sam = tam*g("tm-s")/100, som = sam*g("tm-o")/100;
      say("tm-out", `TAM: ${um(tam,0)} al año · SAM: ${um(sam,0)} · SOM: ${um(som,0)}`, `Tu objetivo realista son unas ventas de ${um(som,0)} al año (${um(som/12,0)} al mes). Contrasta los porcentajes con datos reales, no con deseos.`); });

    on(["c-m","c-n","c-t","c-f","c-mg","c-v"], () => { const cac = g("c-m")/g("c-n"), ltv = g("c-t")*g("c-f")*g("c-mg")/100*g("c-v"), ratio = ltv/cac, rec = cac/(g("c-t")*g("c-f")*g("c-mg")/100);
      say("c-out", `CAC: ${um(cac)} por cliente · LTV: ${um(ltv)} · LTV/CAC: ${fmt(ratio,1)} · Recuperas el CAC en ${fmt(rec,1)} meses`,
        ratio >= 3 ? "Relación sana (3 o más): cada cliente aporta bastante más de lo que cuesta conseguirlo." : ratio >= 1 ? "Relación ajustada: ganas poco con cada cliente. Mejora la retención o abarata la captación." : "Pierdes dinero con cada cliente nuevo: el coste de captación supera su valor.", ratio >= 3); });

    on(["e-d","e-s","e-h","e-l","e-sd","e-z"], () => { const D = g("e-d"), q = Math.sqrt(2*D*g("e-s")/g("e-h")), d = D/360, ss = g("e-z")*g("e-sd")*Math.sqrt(g("e-l")), rop = d*g("e-l") + ss, n = D/q, cost = n*g("e-s") + (q/2 + ss)*g("e-h");
      say("e-out", `Lote económico: ${fmt(q,0)} kg por pedido (${fmt(n,1)} pedidos al año) · Stock de seguridad: ${fmt(ss,1)} kg · Punto de pedido: ${fmt(rop,1)} kg`,
        `Pide ${fmt(q,0)} kg cada vez que el almacén baje a ${fmt(rop,1)} kg. Coste anual de pedir y almacenar: ${um(cost)} (se usan 360 días al año).`); });

    on(["h-s","h-c","h-o","h-x","h-m","h-r"], () => { const tot = g("h-s")*(1 + g("h-c")/100) + g("h-o"), rot = 100*g("h-x")/g("h-m"), sust = g("h-x")*g("h-s")*g("h-r")/100;
      say("h-out", `Coste total por empleado: ${um(tot)} al año (${um(tot/12)} al mes; ${fmt(100*tot/g("h-s")-100,1)} % sobre el salario bruto) · Rotación: ${fmt(rot,1)} % · Coste anual de la rotación: ${um(sust)}`,
        rot > 25 ? "Rotación alta: revisa selección, acogida, salario y carga de trabajo antes de contratar más." : "Rotación moderada.", rot <= 25); });
  }
};

// ---------------------------------------------------------------- Simulación de empresa (SIM4)
const SIMKEY = KEY + "_sim", ROUNDS = 6;
const BASE = {cash: 30000, debt: 20000, capital: 40000, machineCap: 32000, staff: 6, custSat: .7, empSat: .6, cum: 0, sustSum: 0};
const BOTS = [
  {name: "Café Exprés Low Cost", d: {price: 2.2, mkt: 2000, staff: 6, wage: 1300, invest: 0, loan: 0, fair: false}},
  {name: "Cadena Premium", d: {price: 3.8, mkt: 9000, staff: 7, wage: 1800, invest: 0, loan: 0, fair: true}},
  {name: "Café del Barrio", d: {price: 3.0, mkt: 3000, staff: 6, wage: 1500, invest: 0, loan: 0, fair: false}}];
const NEWBOT = {name: "Cadena internacional (nueva)", d: {price: 2.8, mkt: 12000, staff: 8, wage: 1600, invest: 0, loan: 0, fair: false}};
const EVENTS = {
  mp: ["Sube el precio del café en grano", "El coste variable pasa de 1,00 a 1,30 u. m. por café desde esta ronda."],
  comp: ["Llega un nuevo competidor", "Una cadena internacional abre cerca con mucha publicidad."],
  rep: ["Crisis de reputación", "Una reseña viral acusa a Café Raíz de mala higiene: la satisfacción de clientes cae esta ronda."],
  tipo: ["Sube el tipo de interés", "El interés de la deuda pasa del 6 % al 9 % anual desde esta ronda."]};
const SEASON = [1, .92, 1.08, 1.15, 1, 1.05];
function newGame(){
  let s = Date.now() % 100000; const r = () => (s = (s*16807) % 2147483647) / 2147483647;
  const keys = Object.keys(EVENTS).sort(() => r() - .5), rounds = [2,3,4,5,6].sort(() => r() - .5).slice(0, 3).sort();
  const events = {}; rounds.forEach((rd, i) => events[rd] = keys[i]);
  return {round: 1, events, firms: {you: {name: "Café Raíz (tú)", st: {...BASE}}, ...Object.fromEntries(BOTS.map((b, i) => ["b"+i, {name: b.name, bot: b.d, st: {...BASE}}]))}, hist: [], notes: {}, final: ""};
}
function activeEvents(G, r){ return Object.entries(G.events).filter(([rd]) => +rd <= r).map(([, k]) => k); }
// Calcula una ronda para todas las empresas con las mismas reglas
function playRound(G, dYou){
  const r = G.round, act = activeEvents(G, r), now = G.events[r];
  if (act.includes("comp") && !G.firms.nb) G.firms.nb = {name: NEWBOT.name, bot: NEWBOT.d, st: {...BASE, custSat: .65}};
  const rate = act.includes("tipo") ? .09 : .06, vcBase = act.includes("mp") ? 1.3 : 1;
  const market = 135000 * SEASON[r-1] * Math.pow(1.03, r-1);
  const ids = Object.keys(G.firms), dec = {}, attr = {};
  ids.forEach(id => { const f = G.firms[id]; dec[id] = id === "you" ? dYou : f.bot;
    const d = dec[id]; attr[id] = Math.pow(3 / d.price, 1.8) * (1 + .15*Math.log(1 + d.mkt/1000)) * (.6 + .8*f.st.custSat); });
  const tot = Object.values(attr).reduce((a, b) => a + b, 0), res = {};
  ids.forEach(id => { const f = G.firms[id], s = f.st, d = dec[id];
    const hires = Math.max(0, d.staff - s.staff); s.staff = d.staff;
    const demand = market * attr[id] / tot, prod = .85 + .3*s.empSat, cap = Math.min(s.machineCap, s.staff*4500*prod), sales = Math.min(demand, cap), lost = demand - sales;
    const vc = vcBase + (d.fair ? .2 : 0), revenue = sales*d.price, cogs = sales*vc, wages = s.staff*d.wage*3, rent = 11000, dep = s.capital*.025, interest = s.debt*rate/4, hireCost = hires*1000;
    const ebit = revenue - cogs - wages - rent - d.mkt - dep - hireCost, ebt = ebit - interest, tax = ebt > 0 ? ebt*.25 : 0, net = ebt - tax;
    const loan = Math.max(-s.debt, d.loan || 0);
    s.cash += net + dep - d.invest + loan; s.debt += loan; s.capital += d.invest - dep;
    let emergency = 0; if (s.cash < 0){ emergency = -s.cash; s.debt += emergency; s.cash = 0; }
    if (d.invest > 0) s.machineCap += d.invest * .8;
    const load = demand / Math.max(1, s.staff*4500);
    s.empSat = clamp(.6*s.empSat + .4*clamp(.5 + (d.wage - 1500)/1000 - Math.max(0, load - .9)*1.5));
    let cs = clamp(1 - 1.5*lost/Math.max(1, demand)) * clamp(.75 + .1*(d.price < 2.6 ? -1 : d.price > 3.4 ? 1 : 0) + .15*s.empSat + (d.fair ? .05 : 0));
    if (now === "rep" && id === "you") cs -= .3;
    s.custSat = clamp(.6*s.custSat + .4*cs);
    const sust = clamp(.35 + (d.fair ? .35 : 0) + .3*s.empSat); s.sustSum += sust; s.cum += net;
    const equity = s.cash + s.capital - s.debt, value = equity + Math.max(0, net)*8;
    res[id] = {demand, sales, cap, share: sales, revenue, cogs, wages, mkt: d.mkt, dep, interest, hireCost, tax, net, cash: s.cash, debt: s.debt, capital: s.capital, equity, value, custSat: s.custSat, empSat: s.empSat, sust, emergency};
  });
  const sold = Object.values(res).reduce((a, x) => a + x.sales, 0); Object.values(res).forEach(x => x.share = x.sales / sold);
  ids.forEach(id => res[id].index = simIndex(G.firms[id].st, res[id], r));
  G.hist.push({round: r, event: now || null, dec: dYou, res}); G.round++;
}
// Índice equilibrado: beneficio acumulado 35 %, valor 25 %, satisfacción 25 %, sostenibilidad 15 %
function simIndex(s, x, r){ return Math.round(35*clamp(.5 + s.cum/120000) + 25*clamp(x.value/250000) + 25*(x.custSat + x.empSat)/2 + 15*s.sustSum/r); }
const pctf = x => fmt(100*x, 0) + " %";
function simPage(){
  const G = store.get(SIMKEY, null);
  const head = `<div class="crumbs"><a href="#/">Inicio</a> › <a href="#/m/SIM4">SIM4</a> › Simulación</div><h1>Simulación de empresa</h1>
   <p class="lead">Diriges Café Raíz durante ${ROUNDS} trimestres frente a competidores automáticos. Cada ronda decides precio, marketing, plantilla, salarios, inversión y financiación; el sitio calcula ventas, cuota, estados financieros y satisfacción.</p>
   <p class="meta">Lee antes <a href="#/m/SIM4/1">las reglas</a> y <a href="#/m/SIM4/2">cómo leer los informes</a>. La clasificación usa un índice equilibrado (beneficio acumulado 35 %, valor de la empresa 25 %, satisfacción de clientes y empleados 25 %, sostenibilidad 15 %), no solo el beneficio.</p>`;
  if (!G) return head + `<div class="panel"><h3>Situación inicial</h3><ul><li>Caja: ${um(BASE.cash,0)} · Deuda: ${um(BASE.debt,0)} al 6 % anual · Maquinaria: ${um(BASE.capital,0)}</li><li>Capacidad de las máquinas: ${fmt(BASE.machineCap,0)} cafés por trimestre · ${BASE.staff} baristas (cada uno sirve unos 4.500 cafés por trimestre)</li><li>Coste variable: 1 u. m. por café (1,20 con café de comercio justo) · Alquiler: 11.000 u. m. por trimestre · Contratar cuesta 1.000 u. m. por persona</li><li>Pueden ocurrir sucesos imprevistos: subida de materias primas, nuevo competidor, crisis de reputación o subida de tipos.</li></ul></div><button class="btn" id="sim-start">Empezar la simulación</button>`;
  const last = G.hist[G.hist.length-1], ids = Object.keys(G.firms), done = G.round > ROUNDS, st = G.firms.you.st, prev = last ? last.dec : {price: 3, mkt: 5000, staff: 6, wage: 1500, invest: 0, loan: 0, fair: false};
  const upcoming = !done && G.events[G.round] ? `<div class="event"><b>⚠ Suceso en el trimestre ${G.round}: ${EVENTS[G.events[G.round]][0]}.</b> ${EVENTS[G.events[G.round]][1]}</div>` : "";
  const form = done ? "" : `<div class="tool"><h2>Decisiones del trimestre ${G.round} de ${ROUNDS}</h2>
    ${inp("sd-price","Precio por café (u. m.)",prev.price,'min="1" max="8"')}${inp("sd-mkt","Marketing del trimestre",prev.mkt,'min="0"')}${inp("sd-staff","Baristas",st.staff,'min="1" step="1"')}${inp("sd-wage","Salario mensual por barista",prev.wage,'min="900"')}
    ${inp("sd-invest","Inversión en maquinaria",0,'min="0"')}${inp("sd-loan","Préstamo nuevo (negativo = devolver)",0)}
    <label><input type="checkbox" id="sd-fair" ${prev.fair?"checked":""}> Café de comercio justo (+0,20 u. m. por café; mejora sostenibilidad y clientes)</label>
    <p class="meta">Caja disponible: ${um(st.cash,0)} · Deuda: ${um(st.debt,0)} · Capacidad de máquinas: ${fmt(st.machineCap,0)} cafés. Cada 10.000 u. m. invertidas añaden 8.000 cafés de capacidad. Si la caja queda negativa, el banco da un crédito de emergencia automático.</p>
    <button class="btn" id="sim-play">Cerrar el trimestre</button></div>`;
  let report = "";
  if (last){ const y = last.res.you, ev = last.event ? `<div class="event">Suceso del trimestre: <b>${EVENTS[last.event][0]}</b>. ${EVENTS[last.event][1]}</div>` : "";
    const rank = ids.map(id => [G.firms[id].name, last.res[id]]).sort((a, b) => b[1].index - a[1].index);
    report = `<h2>Informe del trimestre ${last.round}</h2>${ev}
     <div class="kpis"><div class="kpi">Ventas<b>${fmt(y.sales,0)} cafés</b><span class="meta">demanda ${fmt(y.demand,0)}</span></div><div class="kpi">Cuota de mercado<b>${pctf(y.share)}</b></div><div class="kpi">Beneficio neto<b>${um(y.net,0)}</b></div><div class="kpi">Caja<b>${um(y.cash,0)}</b></div><div class="kpi">Satisfacción clientes<b>${pctf(y.custSat)}</b></div><div class="kpi">Satisfacción empleados<b>${pctf(y.empSat)}</b></div><div class="kpi">Índice<b>${y.index}/100</b></div></div>
     ${y.sales < y.demand - 1 ? `<p class="warn">Perdiste ${fmt(y.demand - y.sales,0)} ventas por falta de capacidad (capacidad efectiva: ${fmt(y.cap,0)} cafés). Más baristas o más maquinaria.</p>` : ""}
     ${y.emergency ? `<p class="warn">La caja quedó en negativo: el banco te dio un crédito de emergencia de ${um(y.emergency,0)}.</p>` : ""}
     <div class="grid"><div class="panel"><h3>Cuenta de resultados</h3><table><tbody>
      ${[["Ingresos",y.revenue],["Coste de los cafés vendidos",-y.cogs],["Salarios",-y.wages],["Alquiler",-11000],["Marketing",-y.mkt],["Amortización",-y.dep],["Costes de contratación",-y.hireCost],["Intereses",-y.interest],["Impuesto (25 %)",-y.tax],["<b>Beneficio neto</b>",y.net]].map(([k,v]) => `<tr><td>${k}</td><td class="num">${fmt(v,0)}</td></tr>`).join("")}</tbody></table></div>
     <div class="panel"><h3>Balance al cierre</h3><table><tbody>${[["Caja",y.cash],["Maquinaria (neta)",y.capital],["<b>Activo total</b>",y.cash+y.capital],["Deuda",y.debt],["Patrimonio neto",y.equity],["Valor estimado de la empresa",y.value]].map(([k,v]) => `<tr><td>${k}</td><td class="num">${fmt(v,0)}</td></tr>`).join("")}</tbody></table></div></div>
     <h3>Clasificación</h3><div class="tablewrap"><table><thead><tr><th>#</th><th>Empresa</th><th>Índice</th><th>Cuota</th><th>Precio</th><th>Beneficio del trimestre</th><th>Beneficio acumulado</th><th>Clientes</th><th>Empleados</th></tr></thead><tbody>
      ${rank.map(([n, x], i) => { const id = ids.find(k => G.firms[k].name === n); return `<tr${id==="you"?' style="font-weight:700"':""}><td>${i+1}</td><td>${esc(n)}</td><td class="num">${x.index}</td><td class="num">${pctf(x.share)}</td><td class="num">${fmt(id==="you"?last.dec.price:G.firms[id].bot.price)}</td><td class="num">${fmt(x.net,0)}</td><td class="num">${fmt(G.firms[id].st.cum,0)}</td><td class="num">${pctf(x.custSat)}</td><td class="num">${pctf(x.empSat)}</td></tr>`; }).join("")}</tbody></table></div>
     <h3>Tu reflexión sobre el trimestre ${last.round}</h3><textarea class="note" data-simnote="${last.round}" placeholder="¿Qué decidiste, por qué y qué cambiarías?">${esc(G.notes[last.round]||"")}</textarea>`; }
  const history = G.hist.length ? `<h2>Historial de decisiones</h2><div class="tablewrap"><table><thead><tr><th>Trim.</th><th>Precio</th><th>Marketing</th><th>Baristas</th><th>Salario</th><th>Inversión</th><th>Préstamo</th><th>Comercio justo</th><th>Suceso</th><th>Beneficio</th><th>Índice</th></tr></thead><tbody>
    ${G.hist.map(h => `<tr><td>${h.round}</td><td class="num">${fmt(h.dec.price)}</td><td class="num">${fmt(h.dec.mkt,0)}</td><td class="num">${h.dec.staff}</td><td class="num">${fmt(h.dec.wage,0)}</td><td class="num">${fmt(h.dec.invest,0)}</td><td class="num">${fmt(h.dec.loan,0)}</td><td>${h.dec.fair?"Sí":"No"}</td><td>${h.event?EVENTS[h.event][0]:"—"}</td><td class="num">${fmt(h.res.you.net,0)}</td><td class="num">${h.res.you.index}</td></tr>`).join("")}</tbody></table></div>` : "";
  const fin = done ? (() => { const rank = ids.map(id => [id, G.hist[ROUNDS-1].res[id].index]).sort((a, b) => b[1] - a[1]), pos = rank.findIndex(x => x[0] === "you") + 1;
    return `<div class="panel"><h2>Informe final</h2><p>Has terminado las ${ROUNDS} rondas en la posición <b>${pos} de ${rank.length}</b> con un índice de <b>${G.hist[ROUNDS-1].res.you.index}/100</b> y un beneficio acumulado de <b>${um(st.cum,0)}</b></p>
     <p class="meta">Para aprobar la simulación (§6 del plan) hay que completar las 6 rondas y escribir un informe de decisiones. Usa la rúbrica: problema identificado, uso de conceptos, análisis de datos, alternativas, recomendación y claridad.</p>
     <textarea class="note" data-simnote="final" placeholder="Informe final: estrategia seguida, qué funcionó, qué no y qué harías distinto.">${esc(G.notes.final||"")}</textarea><p class="noprint"><button class="btn sec" onclick="print()">Imprimir o guardar en PDF</button></p></div>`; })() : "";
  return head + upcoming + fin + form + report + history + `<p class="noprint" style="margin-top:2rem"><button class="btn sec" id="sim-reset">Reiniciar la simulación</button></p>`;
}
function simBind(){
  const rerender = () => dispatchEvent(new HashChangeEvent("hashchange"));
  const s = $("sim-start"); if (s) s.onclick = () => { store.set(SIMKEY, newGame()); rerender(); };
  const p = $("sim-play"); if (p) p.onclick = () => { const G = store.get(SIMKEY, null), v = id => parseFloat($(id).value) || 0;
    const d = {price: clamp(v("sd-price"), 1, 8), mkt: Math.max(0, v("sd-mkt")), staff: Math.max(1, Math.round(v("sd-staff"))), wage: Math.max(900, v("sd-wage")), invest: Math.max(0, v("sd-invest")), loan: v("sd-loan"), fair: $("sd-fair").checked};
    playRound(G, d); store.set(SIMKEY, G); rerender(); scrollTo(0, 0); };
  const r = $("sim-reset"); if (r) r.onclick = () => { if (confirm("¿Reiniciar la simulación? Se borrarán tus rondas.")){ try{ localStorage.removeItem(SIMKEY); }catch(e){} rerender(); } };
  document.querySelectorAll("[data-simnote]").forEach(t => t.oninput = () => { const G = store.get(SIMKEY, null); G.notes[t.dataset.simnote] = t.value; store.set(SIMKEY, G); });
}

// ---------------------------------------------------------------- Rutas por perfil (§1.5)
const ROUTES = [
  ["emprendedor", "Emprendedor", "Para crear y validar tu propio negocio.", ["FUN0","ADM1","FIN1","MKT1","EMP1","FIN2","MKT2","EST2","EMP3","PROY"]],
  ["gerente", "Futuro gerente", "Para dirigir equipos y operaciones.", ["FUN0","ADM1","ADM2","RH1","RH2","OPE1","OPE2","DIR3","EST2","EST3","GOB4"]],
  ["finanzas", "Finanzas", "Para especializarte en contabilidad, inversión y valoración.", ["FUN0","ECO1","FIN1","FIN2","FIN3","EST2","EST3","GOB4"]],
  ["marketing", "Marketing", "Para especializarte en mercados, marca y canales digitales.", ["FUN0","MKT1","MKT2","MKT3","DIG2","EMP1","EST2"]],
  ["pyme", "Dueño de pyme", "Las lecciones ★ de los niveles 1 y 2, con énfasis en caja, precios, ventas y personal.", "star12"],
  ["expres", "Ruta exprés", "Solo las lecciones esenciales (★) de todo el curso.", "star"]];
function routesPage(sel){
  const D = window.DATA, P = store.get(KEY, {lessons: {}}), done = (m, i) => !!(P.lessons || {})[m.id + "#" + i], mod = id => D.modules.find(m => m.id === id);
  const lessonsOf = r => r[3] === "star" || r[3] === "star12" ? D.modules.filter(m => r[3] === "star" || (m.lvl >= 1 && m.lvl <= 2)).flatMap(m => m.L.map((x, i) => [m, i, x]).filter(z => z[2].star)) : r[3].flatMap(id => mod(id).L.map((x, i) => [mod(id), i, x]));
  const prog = r => { const L = lessonsOf(r); return [L.filter(z => done(z[0], z[1])).length, L.length]; };
  const bar = p => `<div class="bar"><i style="width:${p}%"></i></div>`, pc = ([a, b]) => b ? Math.round(100*a/b) : 0;
  const r = ROUTES.find(x => x[0] === sel);
  if (!r) return `<div class="crumbs"><a href="#/">Inicio</a> › Rutas</div><h1>Rutas por perfil</h1><p class="lead">La ruta completa recorre los niveles 0 a 4. Si tienes un objetivo concreto, sigue una de estas rutas. El modo libre no tiene bloqueos.</p>
    <div class="grid">${ROUTES.map(x => { const p = prog(x); return `<a class="card" href="#/rutas/${x[0]}"><h3>${x[1]}</h3><p class="meta">${x[2]}</p><div class="meta">${p[1]} lecciones · ${pc(p)} % completado</div>${bar(pc(p))}</a>`; }).join("")}</div>
    <div class="panel"><h3>Dependencias principales</h3><ul><li>FUN0 antes de cualquier módulo del Nivel 1.</li><li>FIN1 antes de FIN2, OPE2 (costes) y EMP3.</li><li>MKT1 antes de MKT2 y EST2.</li><li>ECO1 recomendado antes de FIN2 y EST2.</li><li>FIN2 antes de FIN3.</li><li>EST2 antes de EST3 y GOB4.</li><li>Al menos 5 módulos del Nivel 3 antes de SIM4 y PROY.</li></ul></div>`;
  const L = lessonsOf(r), p = prog(r), byMod = [];
  L.forEach(z => { let g = byMod.find(b => b[0] === z[0]); if (!g) byMod.push(g = [z[0], []]); g[1].push(z); });
  return `<div class="crumbs"><a href="#/">Inicio</a> › <a href="#/rutas">Rutas</a> › ${r[1]}</div><h1>Ruta: ${r[1]}</h1><p class="lead">${r[2]}</p>
   <div class="panel"><b>${p[0]}/${p[1]} lecciones completadas (${pc(p)} %)</b>${bar(pc(p))}</div>
   ${byMod.map(([m, zs]) => `<h2><a href="#/m/${m.id}">${m.id}. ${esc(m.t.replace(/\*/g, ""))}</a></h2><div class="panel"><ul>${zs.map(([, i, x]) => `<li>${done(m, i) ? "●" : "○"} <a href="#/m/${m.id}/${i+1}">${esc(x.t.replace(/\*/g, ""))}</a>${x.star ? ' <span class="star">★</span>' : ""}</li>`).join("")}</ul></div>`).join("")}`;
}

// ---------------------------------------------------------------- Plan de negocio (PROY)
const PLANKEY = KEY + "_plan";
const PLANSEC = [
  ["Resumen ejecutivo", "La idea en una página: problema, solución, cliente, modelo de ingresos, equipo, cifras clave y lo que necesitas.", "PROY/1"],
  ["Descripción de la empresa", "Misión, visión, valores, forma jurídica, ubicación y fase en la que está.", "ADM1/5"],
  ["Análisis del mercado", "Tamaño (TAM, SAM, SOM), tendencias PESTEL, clientes y segmentos.", "PROY/2"],
  ["Estrategia competitiva", "Cinco fuerzas, competidores, ventaja competitiva y posicionamiento.", "EST2/1"],
  ["Plan de marketing", "Marketing mix: producto, precio, distribución y comunicación; CAC y LTV previstos.", "MKT1/4"],
  ["Plan de operaciones", "Procesos, proveedores, capacidad, inventarios y calidad.", "OPE1/2"],
  ["Organización y personas", "Organigrama, puestos, contratación, salarios y cultura.", "RH1/6"],
  ["Plan financiero", "Proyecciones a 3–5 años, punto de equilibrio, flujo de caja, VAN y financiación necesaria.", "PROY/3"],
  ["Riesgos y contingencias", "Principales riesgos, probabilidad, impacto y respuesta prevista.", "PROY/4"],
  ["Impacto social y ambiental", "Efectos en clientes, empleados, comunidad y medio ambiente; indicadores ASG.", "GOB4/3"],
  ["Anexos", "Datos, encuestas, presupuestos y fuentes.", "PROY/4"]];
const RUBRIC = [["Oportunidad y propuesta de valor", 15], ["Análisis de mercado y competencia", 15], ["Estrategia y marketing", 15], ["Operaciones y organización", 10], ["Plan financiero coherente", 20], ["Riesgos y sostenibilidad", 10], ["Pitch y defensa", 15]];
function planPage(){
  const S = store.get(PLANKEY, {text: {}, score: {}}), filled = PLANSEC.filter((s, i) => (S.text[i] || "").trim().length > 40).length;
  const total = RUBRIC.reduce((a, [, w], i) => a + w * (S.score[i] || 0) / 4, 0);
  return `<div class="crumbs"><a href="#/">Inicio</a> › <a href="#/m/PROY">PROY</a> › Plan de negocio</div><h1>Plan de negocio final</h1>
   <p class="lead">El entregable del curso. Elige una idea propia o una empresa existente y redacta cada apartado. Lo que escribes se guarda solo en este navegador.</p>
   <div class="panel"><b>${filled}/${PLANSEC.length} apartados redactados</b><div class="bar"><i style="width:${Math.round(100*filled/PLANSEC.length)}%"></i></div>
   <p class="meta">Herramientas útiles: <a href="#/herramientas">punto de equilibrio, flujo de caja, VAN y TIR, tamaño de mercado, CAC y LTV</a>.</p>
   <p class="noprint"><button class="btn sec" onclick="print()">Imprimir o guardar en PDF</button></p></div>
   ${PLANSEC.map(([t, h, l], i) => `<div class="panel secplan"><h3>${i+1}. ${t}</h3><p class="meta">${h} <a class="noprint" href="#/m/${l}">Ver lección →</a></p><textarea class="note" data-plan="${i}">${esc(S.text[i] || "")}</textarea></div>`).join("")}
   <h2>Autoevaluación con la rúbrica</h2><p class="meta">Puntúa cada criterio de 0 (ausente) a 4 (excelente). Se aprueba con un 70 %.</p>
   <div class="tablewrap"><table><thead><tr><th>Criterio</th><th>Peso</th><th>Puntuación</th></tr></thead><tbody>
   ${RUBRIC.map(([c, w], i) => `<tr><td>${c}</td><td class="num">${w} %</td><td><select data-score="${i}">${[0,1,2,3,4].map(v => `<option ${+(S.score[i]||0) === v ? "selected" : ""}>${v}</option>`).join("")}</select></td></tr>`).join("")}</tbody></table></div>
   <p><b>Nota estimada: <span id="plan-total">${fmt(total,0)}</span> %</b> <span id="plan-verdict">${total >= 70 ? '<span class="ok">Aprobado</span>' : '<span class="bad">Aún no llega al 70 %</span>'}</span></p>`;
}
function planBind(){
  const get = () => store.get(PLANKEY, {text: {}, score: {}});
  document.querySelectorAll("[data-plan]").forEach(t => t.oninput = () => { const S = get(); S.text[t.dataset.plan] = t.value; store.set(PLANKEY, S); });
  document.querySelectorAll("[data-score]").forEach(s => s.onchange = () => { const S = get(); S.score[s.dataset.score] = +s.value; store.set(PLANKEY, S);
    const total = RUBRIC.reduce((a, [, w], i) => a + w * (S.score[i] || 0) / 4, 0); $("plan-total").textContent = fmt(total, 0);
    $("plan-verdict").innerHTML = total >= 70 ? '<span class="ok">Aprobado</span>' : '<span class="bad">Aún no llega al 70 %</span>'; });
}

window.EXTRA = {
  nav: [["simulacion", "Simulación"], ["rutas", "Rutas"], ["plan-de-negocio", "Plan de negocio"]],
  routes: {simulacion: simPage, rutas: routesPage, "plan-de-negocio": planPage},
  moduleExtra: m => m.id === "SIM4" ? `<h2>Simulación</h2><p>Las rondas se juegan en la página de la simulación.</p><a class="btn" href="#/simulacion">Ir a la simulación</a>`
    : m.id === "PROY" ? `<h2>Entregable</h2><p>Redacta tu plan apartado por apartado y autoevalúalo con la rúbrica.</p><a class="btn" href="#/plan-de-negocio">Abrir mi plan de negocio</a>` : "",
  homeExtra: () => `<h2>Practica</h2><div class="grid"><a class="card" href="#/rutas"><h3>🧭 Rutas por perfil</h3><div class="meta">Emprendedor, futuro gerente, finanzas, marketing, dueño de pyme y exprés</div></a>
    <a class="card" href="#/herramientas"><h3>🧮 Herramientas</h3><div class="meta">${TOOLLIST.length} calculadoras con los datos de Café Raíz</div></a>
    <a class="card" href="#/simulacion"><h3>🏆 Simulación de empresa</h3><div class="meta">Dirige Café Raíz durante 6 trimestres</div></a>
    <a class="card" href="#/plan-de-negocio"><h3>📝 Plan de negocio</h3><div class="meta">El proyecto final con rúbrica</div></a></div>`,
  bind(p){ if (p === "simulacion") simBind(); if (p === "plan-de-negocio") planBind(); }
};
})();
