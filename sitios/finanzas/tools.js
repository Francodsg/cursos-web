// Calculadoras del sitio Finanzas y Millonarios.
// CALC contiene las fórmulas puras (verificadas en pruebas.js con ejemplos de control).
// TOOLS describe la interfaz de cada herramienta (campos, cálculo y presentación).
(function(root){
"use strict";

// ---------- Fórmulas puras ----------
const mrate = r => Math.pow(1 + r, 1/12) - 1;          // tasa mensual equivalente a una tasa anual efectiva

const CALC = {
  // Valor futuro con aportaciones mensuales (al final de cada mes). r: rentabilidad anual efectiva (0.07 = 7 %).
  compuesto(P, A, r, years){
    const i = mrate(r), rows = []; let v = P, aport = P;
    for (let y = 1; y <= years; y++){
      for (let m = 0; m < 12; m++){ v = v * (1 + i) + A; aport += A; }
      rows.push({year:y, aportado:aport, valor:v, rend:v - aport});
    }
    return {final: rows.length ? rows[rows.length-1].valor : P, aportado: aport, rows};
  },
  // Cifra de independencia financiera y meses hasta alcanzarla.
  independencia(gastoMensual, tasaRetiro, W0, A, rReal){
    const cifra = gastoMensual * 12 / tasaRetiro, i = mrate(rReal);
    let v = W0, m = 0;
    while (v < cifra && m < 1200){ v = v * (1 + i) + A; m++; }
    return {cifra, meses: v >= cifra ? m : null};
  },
  presupuesto(ingreso, pN, pD, pA){ return {necesidades: ingreso*pN/100, deseos: ingreso*pD/100, ahorro: ingreso*pA/100}; },
  emergencia(gastos, meses, ahorrado, mensual){
    const objetivo = gastos * meses, falta = Math.max(0, objetivo - ahorrado);
    return {objetivo, falta, meses: falta === 0 ? 0 : (mensual > 0 ? Math.ceil(falta / mensual) : null), cubre: gastos > 0 ? ahorrado / gastos : 0};
  },
  // Salir de deudas. deudas: [{nombre, saldo, tae (0.24), minimo}]; metodo: "avalancha" | "bola".
  deudas(deudas, extra, metodo){
    let ds = deudas.filter(d => d.saldo > 0).map(d => ({...d, i: mrate(d.tae), pagado:0, fin:null}));
    const presupuesto = ds.reduce((s, d) => s + d.minimo, 0) + extra;
    const orden = metodo === "avalancha" ? (a, b) => b.tae - a.tae || a.saldo - b.saldo : (a, b) => a.saldo - b.saldo || b.tae - a.tae;
    let mes = 0, intereses = 0;
    while (ds.some(d => d.saldo > 0.005) && mes < 1200){
      mes++;
      ds.forEach(d => { if (d.saldo > 0){ const int = d.saldo * d.i; d.saldo += int; intereses += int; } });
      let disp = presupuesto;
      ds.forEach(d => { if (d.saldo > 0){ const p = Math.min(d.minimo, d.saldo); d.saldo -= p; disp -= p; } });
      const vivas = ds.filter(d => d.saldo > 0.005).sort(orden);
      for (const d of vivas){ if (disp <= 0) break; const p = Math.min(disp, d.saldo); d.saldo -= p; disp -= p; }
      ds.forEach(d => { if (d.saldo <= 0.005 && d.fin === null){ d.saldo = 0; d.fin = mes; } });
      if (mes === 1200) return {meses:null, intereses, orden: []};
    }
    return {meses: mes, intereses, presupuesto, orden: ds.slice().sort((a,b) => a.fin - b.fin).map(d => [d.nombre, d.fin])};
  },
  // Coste de comisiones: la comisión anual se resta de la rentabilidad bruta.
  comisiones(P, A, rBruta, fee, years){ return CALC.compuesto(P, A, rBruta - fee, years).final; },
  inflacion(x, pi, years){ const f = Math.pow(1 + pi, years); return {poder: x / f, necesario: x * f}; },
  valorNeto(activos, pasivos){ const a = activos.reduce((s,x) => s + x, 0), p = pasivos.reduce((s,x) => s + x, 0); return {activos:a, pasivos:p, neto:a - p}; },
  stanleyDanko(edad, ingresoAnual){ return edad * ingresoAnual / 10; },
  cuota(L, tasaAnual, anios){ const i = tasaAnual / 12, n = anios * 12; return i === 0 ? L / n : L * i / (1 - Math.pow(1 + i, -n)); },
  // Comprar o alquilar: patrimonio final de cada opción tras H años.
  comprarAlquilar(o){
    const L = o.precio * (1 - o.entrada), cuota = CALC.cuota(L, o.hipoteca, o.plazo), ih = o.hipoteca / 12;
    const ir = mrate(o.rentInv), iv = mrate(o.revalor);
    let saldo = L, casa = o.precio, alquiler = o.alquiler, invAlq = o.precio * (o.entrada + o.gastosCompra), invCom = 0;
    for (let m = 1; m <= o.horizonte * 12; m++){
      const pagoHip = m <= o.plazo * 12 ? cuota : 0;
      if (pagoHip){ saldo = saldo * (1 + ih) - pagoHip; if (saldo < 0) saldo = 0; }
      const costeDueno = pagoHip + casa * o.gastosAnuales / 12;
      invAlq *= (1 + ir); invCom *= (1 + ir);
      const d = costeDueno - alquiler;
      if (d > 0) invAlq += d; else invCom += -d;
      casa *= (1 + iv);
      if (m % 12 === 0) alquiler *= (1 + o.subidaAlquiler);
    }
    const comprar = casa * (1 - o.gastosVenta) - saldo + invCom;
    return {cuota, comprar, alquilar: invAlq, casa, saldo};
  },
  // Simulador de caídas: invertir al inicio de un año y comparar «mantener» con «vender en pánico».
  caidas(serie, desde, P, A, umbral){
    let hold = 0, panic = 0, vendido = false, anioVenta = null, aport = 0; const rows = [];
    const years = Object.keys(serie).map(Number).filter(y => y >= desde).sort((a,b) => a - b);
    years.forEach((y, k) => {
      const add = k === 0 ? P : A; aport += add; hold += add; panic += add;
      const r = serie[y] / 100;
      hold *= (1 + r);
      if (!vendido){ panic *= (1 + r); if (r <= -umbral){ vendido = true; anioVenta = y; } }
      rows.push({year:y, r:serie[y], aportado:aport, mantener:hold, panico:panic});
    });
    return {rows, mantener:hold, panico:panic, aportado:aport, anioVenta};
  },
  equilibrio(CF, precio, CV, ventas){
    const mc = precio - CV;
    return {margen: mc, unidades: mc > 0 ? CF / mc : null, ingresos: mc > 0 ? CF / mc * precio : null, beneficio: ventas * mc - CF};
  },
  // Puntuación de riesgo (8 respuestas de 1 a 3).
  perfilRiesgo(resp){ const s = resp.reduce((a,b) => a + b, 0); return s <= 13 ? ["Conservador", s, "Más renta fija y liquidez; acciones solo para objetivos lejanos."] : s <= 19 ? ["Moderado", s, "Un reparto equilibrado entre acciones y renta fija."] : ["Dinámico", s, "Mayor peso en acciones diversificadas, si tu horizonte es largo y tienes colchón."]; }
};

// ---------- Utilidades de formato y gráficas ----------
const MONEDAS = {EUR:"€ Euro", USD:"$ Dólar estadounidense", MXN:"$ Peso mexicano", ARS:"$ Peso argentino", COP:"$ Peso colombiano", CLP:"$ Peso chileno", PEN:"S/ Sol peruano", UYU:"$ Peso uruguayo"};
function moneda(){ try { return localStorage.getItem("fin.moneda") || "EUR"; } catch(e){ return "EUR"; } }
function fmtM(x, dec){ if (x == null || !isFinite(x)) return "—"; try { return new Intl.NumberFormat("es-ES", {style:"currency", currency: moneda(), maximumFractionDigits: dec == null ? 0 : dec}).format(x); } catch(e){ return Math.round(x) + " " + moneda(); } }
function fmtN(x, dec){ if (x == null || !isFinite(x)) return "—"; return new Intl.NumberFormat("es-ES", {maximumFractionDigits: dec == null ? 1 : dec, useGrouping: true}).format(x); }
const fmtP = x => fmtN(x * 100, 1) + " %";
const plazo = m => m == null ? "más de 100 años" : (m >= 12 ? fmtN(Math.floor(m/12),0) + " años" + (m % 12 ? " y " + (m % 12) + " meses" : "") : m + " meses");

// Gráfica de líneas en SVG. series: [{name, color, pts:[[x,y],...]}]
function lineChart(series, opt){
  opt = opt || {};
  const W = 640, H = 280, L = 86, R = 12, T = 14, B = 32;
  const xs = series.flatMap(s => s.pts.map(p => p[0])), ys = series.flatMap(s => s.pts.map(p => p[1]));
  if (!xs.length) return "";
  const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(0, ...ys), y1 = Math.max(...ys) || 1;
  const sx = x => L + (x1 === x0 ? 0 : (x - x0) / (x1 - x0)) * (W - L - R), sy = y => T + (1 - (y - y0) / (y1 - y0 || 1)) * (H - T - B);
  let g = "";
  for (let k = 0; k <= 4; k++){ const y = y0 + (y1 - y0) * k / 4; g += `<line x1="${L}" x2="${W-R}" y1="${sy(y)}" y2="${sy(y)}" class="gl"/><text x="${L-6}" y="${sy(y)+4}" text-anchor="end" class="ax">${opt.fmtY ? opt.fmtY(y) : fmtN(y,0)}</text>`; }
  const step = Math.max(1, Math.ceil((x1 - x0) / 8));
  for (let x = x0; x <= x1; x += step) g += `<text x="${sx(x)}" y="${H-10}" text-anchor="middle" class="ax">${opt.fmtX ? opt.fmtX(x) : x}</text>`;
  const lines = series.map(s => `<polyline fill="none" stroke="${s.color}" stroke-width="2.5" points="${s.pts.map(p => sx(p[0]).toFixed(1)+","+sy(p[1]).toFixed(1)).join(" ")}"/>` + (s.pts.length < 40 ? s.pts.map(p => `<circle cx="${sx(p[0]).toFixed(1)}" cy="${sy(p[1]).toFixed(1)}" r="2.5" fill="${s.color}"><title>${s.name}: ${opt.fmtX ? opt.fmtX(p[0]) : p[0]} → ${opt.fmtY ? opt.fmtY(p[1]) : fmtN(p[1],0)}</title></circle>`).join("") : "")).join("");
  const legend = series.map(s => `<span class="lg"><i style="background:${s.color}"></i>${s.name}</span>`).join("");
  return `<figure class="chart"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${opt.label || "Gráfica"}">${g}${lines}</svg><figcaption>${legend}</figcaption></figure>`;
}

// ---------- Definición de las herramientas ----------
// Campo: [id, etiqueta, valor por defecto, tipo ("m" dinero, "p" porcentaje, "n" número, "t" texto, "s" selección), opciones]
const C1 = "var(--c1)", C2 = "var(--c2)", C3 = "var(--c3)";
const TOOLS = {
compuesto:{
  intro:"Calcula cuánto puede crecer un capital inicial con aportaciones mensuales y una rentabilidad anual supuesta. Las aportaciones se hacen al final de cada mes.",
  fields:[["P","Capital inicial",10000,"m"],["A","Aportación mensual",200,"m"],["r","Rentabilidad anual supuesta",6,"p"],["n","Años",30,"n"],["inf","Inflación anual (para ver el valor en dinero de hoy)",2,"p"]],
  calc(v){
    const res = CALC.compuesto(v.P, v.A, v.r/100, Math.round(v.n)), real = res.final / Math.pow(1 + v.inf/100, v.n);
    const pes = CALC.compuesto(v.P, v.A, Math.max(0, v.r/100 - 0.03), Math.round(v.n)).final, opt = CALC.compuesto(v.P, v.A, v.r/100 + 0.02, Math.round(v.n)).final;
    return {
      kpis:[["Valor final",fmtM(res.final)],["Total aportado",fmtM(res.aportado)],["Rendimientos",fmtM(res.final - res.aportado)],["En dinero de hoy",fmtM(real)]],
      text:`Si aportas ${fmtM(v.A)} al mes durante ${fmtN(v.n,0)} años con una rentabilidad media del ${fmtN(v.r)} %, tendrías unos <b>${fmtM(res.final)}</b>, de los que ${fmtM(res.final - res.aportado)} serían rendimientos. Con la inflación supuesta, equivalen a unos ${fmtM(real)} de hoy. Escenarios: pesimista (${fmtN(Math.max(0,v.r-3))} %) ${fmtM(pes)} · optimista (${fmtN(v.r+2)} %) ${fmtM(opt)}.`,
      chart: lineChart([{name:"Valor", color:C1, pts:[[0,v.P]].concat(res.rows.map(x => [x.year, x.valor]))},{name:"Aportado", color:C2, pts:[[0,v.P]].concat(res.rows.map(x => [x.year, x.aportado]))}], {fmtY: y => fmtM(y), label:"Crecimiento del capital por años"}),
      table:[["Año","Aportado","Valor","Rendimientos"]].concat(res.rows.map(x => [x.year, fmtM(x.aportado), fmtM(x.valor), fmtM(x.rend)]))
    };
  }},
independencia:{
  intro:"La cifra de independencia financiera es el patrimonio que, invertido, cubriría tus gastos. Con la «regla del 4 %» equivale a 25 veces tus gastos anuales. Usa una rentabilidad real (descontada la inflación).",
  fields:[["G","Gastos mensuales",1500,"m"],["w","Tasa de retirada anual",4,"p"],["W0","Patrimonio invertido actual",5000,"m"],["A","Aportación mensual",400,"m"],["r","Rentabilidad real anual supuesta",4,"p"]],
  calc(v){
    const res = CALC.independencia(v.G, v.w/100, v.W0, v.A, v.r/100), pes = CALC.independencia(v.G, v.w/100, v.W0, v.A, Math.max(0, v.r/100 - 0.02)), opt = CALC.independencia(v.G, v.w/100, v.W0, v.A, v.r/100 + 0.02);
    return {
      kpis:[["Cifra de independencia",fmtM(res.cifra)],["Tiempo estimado",plazo(res.meses)],["Escenario pesimista",plazo(pes.meses)],["Escenario optimista",plazo(opt.meses)]],
      text:`Con gastos de ${fmtM(v.G)} al mes (${fmtM(v.G*12)} al año) y una retirada del ${fmtN(v.w)} %, necesitarías unos <b>${fmtM(res.cifra)}</b>. Aportando ${fmtM(v.A)} al mes, lo alcanzarías en ${plazo(res.meses)}. Limitaciones: la regla del 4 % se basa en datos históricos de EE. UU. a 30 años; para retiros más largos o en otros países, una tasa del 3–3,5 % es más prudente. Bajar tus gastos reduce la cifra y acelera el plazo a la vez.`
    };
  }},
presupuesto:{
  intro:"La regla 50/30/20 reparte los ingresos netos: 50 % necesidades (vivienda, comida, transporte, suministros), 30 % deseos y 20 % ahorro y pago de deudas. Ajusta los porcentajes a tu realidad.",
  fields:[["I","Ingresos netos mensuales",2000,"m"],["pN","Necesidades (%)",50,"n"],["pD","Deseos (%)",30,"n"],["pA","Ahorro y deudas (%)",20,"n"],["gN","Lo que gastas hoy en necesidades",0,"m"],["gD","Lo que gastas hoy en deseos",0,"m"]],
  save:"presupuesto",
  calc(v){
    const s = v.pN + v.pD + v.pA, r = CALC.presupuesto(v.I, v.pN, v.pD, v.pA), hoyA = v.I - v.gN - v.gD;
    const warn = Math.abs(s - 100) > 0.01 ? `<p class="warnbox">Los porcentajes suman ${fmtN(s)} %: deben sumar 100 %.</p>` : "";
    const cmp = (v.gN || v.gD) ? ` Hoy ahorras ${fmtM(hoyA)} (${fmtN(v.I ? hoyA / v.I * 100 : 0)} %): ${hoyA >= r.ahorro ? "cumples tu objetivo." : "te faltan " + fmtM(r.ahorro - hoyA) + " al mes para el objetivo."}` : "";
    return {
      kpis:[["Necesidades",fmtM(r.necesidades)],["Deseos",fmtM(r.deseos)],["Ahorro y deudas",fmtM(r.ahorro)],["Ahorro en un año",fmtM(r.ahorro*12)]],
      text: warn + `Con ${fmtM(v.I)} netos al mes: ${fmtM(r.necesidades)} para necesidades, ${fmtM(r.deseos)} para deseos y <b>${fmtM(r.ahorro)}</b> para ahorro y deudas.${cmp}`,
      table:[["Partida","%","Importe mensual"],["Necesidades",v.pN,fmtM(r.necesidades)],["Deseos",v.pD,fmtM(r.deseos)],["Ahorro y deudas",v.pA,fmtM(r.ahorro)]]
    };
  }},
emergencia:{
  intro:"El fondo de emergencia cubre de 3 a 6 meses de gastos esenciales. Elige más meses si tus ingresos son inestables, eres autónomo o tienes personas a cargo.",
  fields:[["E","Gastos esenciales mensuales",1200,"m"],["M","Meses de cobertura",6,"s",[["3","3 (empleo estable, sin cargas)"],["6","6 (lo habitual)"],["9","9 (ingresos inestables o autónomo)"],["12","12 (personas a cargo e ingresos variables)"]]],["S","Ahorro líquido actual",2000,"m"],["A","Ahorro mensual destinado al fondo",300,"m"]],
  calc(v){
    const r = CALC.emergencia(v.E, v.M, v.S, v.A);
    return {
      kpis:[["Objetivo",fmtM(r.objetivo)],["Te falta",fmtM(r.falta)],["Meses cubiertos hoy",fmtN(r.cubre)],["Tiempo para completarlo",r.meses == null ? "—" : plazo(r.meses)]],
      text: r.falta === 0 ? `Tu fondo ya cubre ${fmtN(r.cubre)} meses: <b>colchón lleno</b>. Lo que ahorres a partir de ahora puede ir a inversión.` : `Necesitas <b>${fmtM(r.objetivo)}</b>. Te faltan ${fmtM(r.falta)}; ${r.meses == null ? "define un ahorro mensual para calcular el plazo." : "con " + fmtM(v.A) + " al mes lo completarías en " + plazo(r.meses) + "."} Guárdalo en una cuenta segura y disponible, no en bolsa.`
    };
  }},
deudas:{
  intro:"Introduce tus deudas. En ambos métodos pagas el mínimo de todas y el dinero extra va a una: la de mayor interés (avalancha) o la de menor saldo (bola de nieve). Cuando saldas una, su pago pasa a la siguiente.",
  fields:[["n1","Deuda 1",'Tarjeta',"t"],["s1","Saldo",3000,"m"],["t1","TAE (%)",24,"p"],["m1","Pago mínimo",90,"m"],
          ["n2","Deuda 2","Préstamo coche","t"],["s2","Saldo",8000,"m"],["t2","TAE (%)",7,"p"],["m2","Pago mínimo",200,"m"],
          ["n3","Deuda 3","Préstamo personal","t"],["s3","Saldo",1500,"m"],["t3","TAE (%)",12,"p"],["m3","Pago mínimo",60,"m"],
          ["n4","Deuda 4","","t"],["s4","Saldo",0,"m"],["t4","TAE (%)",0,"p"],["m4","Pago mínimo",0,"m"],
          ["X","Pago extra mensual",150,"m"]],
  groups:4,
  calc(v){
    const ds = [1,2,3,4].map(k => ({nombre: v["n"+k] || "Deuda " + k, saldo: v["s"+k], tae: v["t"+k]/100, minimo: v["m"+k]})).filter(d => d.saldo > 0);
    if (!ds.length) return {text:"Introduce al menos una deuda con saldo."};
    const av = CALC.deudas(ds, v.X, "avalancha"), bn = CALC.deudas(ds, v.X, "bola"), sin = CALC.deudas(ds, 0, "avalancha");
    if (av.meses == null) return {text:`<p class="warnbox">Con estos pagos la deuda no se salda nunca: los intereses superan a los pagos. Aumenta el pago mensual.</p>`};
    return {
      kpis:[["Avalancha",plazo(av.meses)],["Intereses (avalancha)",fmtM(av.intereses)],["Bola de nieve",plazo(bn.meses)],["Intereses (bola de nieve)",fmtM(bn.intereses)]],
      text:`Pagando ${fmtM(av.presupuesto)} al mes, la avalancha te ahorra <b>${fmtM(bn.intereses - av.intereses)}</b> en intereses frente a la bola de nieve. Solo con los mínimos tardarías ${plazo(sin.meses)} y pagarías ${fmtM(sin.intereses)} de intereses. Orden de la avalancha: ${av.orden.map(o => esc(o[0]) + " (mes " + o[1] + ")").join(" → ")}. Orden de la bola de nieve: ${bn.orden.map(o => esc(o[0]) + " (mes " + o[1] + ")").join(" → ")}.`,
      table:[["Método","Meses","Intereses totales"],["Avalancha",av.meses,fmtM(av.intereses)],["Bola de nieve",bn.meses,fmtM(bn.intereses)],["Solo mínimos",sin.meses == null ? "—" : sin.meses,fmtM(sin.intereses)]]
    };
  }},
comisiones:{
  intro:"Compara dos productos con distinta comisión total anual (gastos corrientes, gestión, custodia). La comisión se resta cada año de la rentabilidad bruta.",
  fields:[["P","Capital inicial",10000,"m"],["A","Aportación mensual",200,"m"],["r","Rentabilidad bruta anual supuesta",6,"p"],["f1","Comisión del producto A (%)",0.2,"p"],["f2","Comisión del producto B (%)",1.5,"p"],["n","Años",30,"n"]],
  calc(v){
    const a = CALC.comisiones(v.P, v.A, v.r/100, v.f1/100, Math.round(v.n)), b = CALC.comisiones(v.P, v.A, v.r/100, v.f2/100, Math.round(v.n)), cero = CALC.comisiones(v.P, v.A, v.r/100, 0, Math.round(v.n));
    const pts = f => Array.from({length: Math.round(v.n) + 1}, (_, y) => [y, y ? CALC.comisiones(v.P, v.A, v.r/100, f/100, y) : v.P]);
    return {
      kpis:[["Producto A",fmtM(a)],["Producto B",fmtM(b)],["Diferencia",fmtM(a - b)],["B pierde frente a sin comisiones",fmtP(1 - b/cero)]],
      text:`En ${fmtN(v.n,0)} años, una comisión del ${fmtN(v.f2,2)} % frente a otra del ${fmtN(v.f1,2)} % te costaría unos <b>${fmtM(a - b)}</b>. La comisión de B se lleva el ${fmtP(1 - b/cero)} de lo que tendrías sin comisiones. Comprueba siempre el coste total anual en el documento de datos fundamentales del producto.`,
      chart: lineChart([{name:"A ("+fmtN(v.f1,2)+" %)", color:C1, pts:pts(v.f1)},{name:"B ("+fmtN(v.f2,2)+" %)", color:C3, pts:pts(v.f2)}], {fmtY: y => fmtM(y), label:"Comparación de comisiones"})
    };
  }},
inflacion:{
  intro:"La inflación reduce lo que puedes comprar con el mismo dinero. Calcula el poder adquisitivo futuro de una cantidad y cuánto necesitarás para comprar lo mismo.",
  fields:[["x","Cantidad",10000,"m"],["pi","Inflación anual supuesta",3,"p"],["n","Años",10,"n"]],
  calc(v){
    const r = CALC.inflacion(v.x, v.pi/100, v.n);
    return {
      kpis:[["Poder adquisitivo futuro",fmtM(r.poder)],["Pérdida",fmtP(1 - r.poder / v.x)],["Necesitarás",fmtM(r.necesario)]],
      text:`Con una inflación del ${fmtN(v.pi)} % anual, ${fmtM(v.x)} guardados sin rendimiento comprarán dentro de ${fmtN(v.n,0)} años lo mismo que <b>${fmtM(r.poder)}</b> hoy. Para comprar lo mismo que hoy necesitarás ${fmtM(r.necesario)}. Los activos productivos (acciones, inmuebles) tienden a proteger del efecto a largo plazo, con volatilidad.`,
      chart: lineChart([{name:"Poder adquisitivo", color:C3, pts:Array.from({length: Math.round(v.n)+1}, (_, y) => [y, v.x / Math.pow(1 + v.pi/100, y)])}], {fmtY: y => fmtM(y), label:"Poder adquisitivo por años"})
    };
  }},
"valor-neto":{
  intro:"Tu valor neto es lo que tienes menos lo que debes. Es la cifra que mide tu riqueza, no tus ingresos. Puedes guardarlo en el registro mensual de «Mi plan».",
  fields:[["a1","Efectivo y cuentas",3000,"m"],["a2","Inversiones (fondos, acciones, planes)",5000,"m"],["a3","Vivienda u otros inmuebles (valor de mercado)",0,"m"],["a4","Otros activos (negocio, vehículo)",4000,"m"],["p1","Hipoteca pendiente",0,"m"],["p2","Préstamos",2000,"m"],["p3","Tarjetas y otras deudas",500,"m"],["edad","Edad",30,"n"],["ing","Ingresos anuales antes de impuestos",30000,"m"]],
  save:"valor-neto",
  calc(v){
    const r = CALC.valorNeto([v.a1,v.a2,v.a3,v.a4],[v.p1,v.p2,v.p3]), esp = CALC.stanleyDanko(v.edad, v.ing);
    const tipo = r.neto >= 2*esp ? "gran acumulador de riqueza (al menos el doble de lo esperado)" : r.neto <= esp/2 ? "por debajo de lo esperado: el estudio lo llama «subacumulador»" : "en la media esperada";
    return {
      kpis:[["Activos",fmtM(r.activos)],["Pasivos",fmtM(r.pasivos)],["Valor neto",fmtM(r.neto)],["Esperado (Stanley y Danko)",fmtM(esp)]],
      text:`Tu valor neto es <b>${fmtM(r.neto)}</b>. Según la fórmula de Stanley y Danko (edad × ingresos ÷ 10), el patrimonio esperado sería ${fmtM(esp)}: estarías ${tipo}. La fórmula se pensó para EE. UU. en los años noventa y para personas de mediana edad; si eres joven o acabas de empezar a trabajar, tómala solo como orientación.`,
      table:[["Concepto","Importe"],["Efectivo",fmtM(v.a1)],["Inversiones",fmtM(v.a2)],["Inmuebles",fmtM(v.a3)],["Otros activos",fmtM(v.a4)],["Hipoteca",fmtM(-v.p1)],["Préstamos",fmtM(-v.p2)],["Tarjetas y otras",fmtM(-v.p3)],["Valor neto",fmtM(r.neto)]]
    };
  }},
"comprar-alquilar":{
  intro:"Compara el patrimonio final de comprar una vivienda con el de alquilar e invertir la diferencia (la entrada, los gastos de compra y la diferencia mensual de costes). Simplificación sin impuestos.",
  fields:[["precio","Precio de la vivienda",200000,"m"],["entrada","Entrada (%)",20,"p"],["gastosCompra","Impuestos y gastos de compra (%)",10,"p"],["hipoteca","Interés de la hipoteca (%)",3,"p"],["plazo","Plazo de la hipoteca (años)",30,"n"],["gastosAnuales","Gastos anuales del propietario (% del valor: impuestos, comunidad, seguro, mantenimiento)",1.5,"p"],["revalor","Revalorización anual de la vivienda (%)",2,"p"],["alquiler","Alquiler mensual equivalente",800,"m"],["subidaAlquiler","Subida anual del alquiler (%)",2,"p"],["rentInv","Rentabilidad anual de la inversión alternativa (%)",5,"p"],["gastosVenta","Gastos de venta (%)",5,"p"],["horizonte","Años de comparación",15,"n"]],
  calc(v){
    const o = {...v}; ["entrada","gastosCompra","hipoteca","gastosAnuales","revalor","subidaAlquiler","rentInv","gastosVenta"].forEach(k => o[k] = v[k]/100);
    o.horizonte = Math.round(v.horizonte); o.plazo = Math.round(v.plazo);
    const r = CALC.comprarAlquilar(o), gana = r.comprar >= r.alquilar ? "comprar" : "alquilar e invertir";
    return {
      kpis:[["Cuota de la hipoteca",fmtM(r.cuota)],["Patrimonio si compras",fmtM(r.comprar)],["Patrimonio si alquilas",fmtM(r.alquilar)],["Diferencia",fmtM(Math.abs(r.comprar - r.alquilar))]],
      text:`Con estos supuestos, a ${fmtN(v.horizonte,0)} años sale mejor <b>${gana}</b> por unos ${fmtM(Math.abs(r.comprar - r.alquilar))}. El resultado es muy sensible a la revalorización, al alquiler y a la rentabilidad alternativa: prueba varios valores. Alquilar solo gana si inviertes de verdad la diferencia; comprar da estabilidad pero concentra tu patrimonio y reduce tu movilidad.`
    };
  }},
caidas:{
  intro:"Usa la rentabilidad anual real del índice S&P 500 con dividendos (1995–2024, en dólares) para ver qué habría pasado si invertías en un año concreto y mantenías, frente a vender en pánico tras la primera gran caída y quedarte en efectivo.",
  fields:[["Y","Año de inicio",2007,"s",Array.from({length:30},(_,k)=>[String(1995+k),String(1995+k)])],["P","Inversión inicial",10000,"m"],["A","Aportación al inicio de cada año siguiente",1200,"m"],["u","Vender si un año cae más de (%)",15,"p"]],
  calc(v){
    const r = CALC.caidas(root.SP500 || {}, v.Y, v.P, v.A, v.u/100);
    return {
      kpis:[["Total aportado",fmtM(r.aportado)],["Si mantienes",fmtM(r.mantener)],["Si vendes en pánico",fmtM(r.panico)],["Año de la venta",r.anioVenta || "No hubo"]],
      text:`Empezando en ${v.Y}, mantener la inversión habría dado <b>${fmtM(r.mantener)}</b> frente a ${fmtM(r.panico)} vendiendo ${r.anioVenta ? "tras la caída de " + r.anioVenta : "(no hubo caídas de ese tamaño)"} y guardando el dinero sin invertir. Rentabilidades pasadas no garantizan las futuras; otros mercados (como Japón tras 1990) tardaron décadas en recuperarse, por eso conviene diversificar entre países.`,
      chart: lineChart([{name:"Mantener", color:C1, pts:r.rows.map(x => [x.year, x.mantener])},{name:"Vender en pánico", color:C3, pts:r.rows.map(x => [x.year, x.panico])},{name:"Aportado", color:C2, pts:r.rows.map(x => [x.year, x.aportado])}], {fmtY: y => fmtM(y), label:"Mantener frente a vender en pánico"}),
      table:[["Año","Rentabilidad S&P 500","Aportado","Mantener","Vender en pánico"]].concat(r.rows.map(x => [x.year, fmtN(x.r) + " %", fmtM(x.aportado), fmtM(x.mantener), fmtM(x.panico)]))
    };
  }},
equilibrio:{
  intro:"El punto de equilibrio es el número de ventas con el que un negocio cubre todos sus costes. Cada venta aporta su margen de contribución (precio − coste variable) a pagar los costes fijos.",
  fields:[["CF","Costes fijos mensuales (alquiler, sueldos, cuotas)",3000,"m"],["p","Precio de venta por unidad",50,"m"],["cv","Coste variable por unidad",20,"m"],["q","Ventas previstas al mes (unidades)",120,"n"]],
  calc(v){
    const r = CALC.equilibrio(v.CF, v.p, v.cv, v.q);
    if (r.unidades == null) return {text:`<p class="warnbox">El precio no cubre el coste variable: cada venta pierde dinero. Sube el precio o baja el coste.</p>`};
    return {
      kpis:[["Margen por unidad",fmtM(r.margen,2)],["Unidades de equilibrio",fmtN(Math.ceil(r.unidades),0)],["Ventas de equilibrio",fmtM(r.ingresos)],["Resultado con tus ventas",fmtM(r.beneficio)]],
      text:`Necesitas vender <b>${fmtN(Math.ceil(r.unidades),0)} unidades al mes</b> (${fmtM(r.ingresos)}) para no perder dinero. Con ${fmtN(v.q,0)} unidades, el resultado mensual sería ${fmtM(r.beneficio)}. Recuerda que el beneficio no es caja: prevé cuándo cobras y cuándo pagas.`
    };
  }}
};

function esc(s){ return String(s == null ? "" : s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])); }

root.CALC = CALC; root.TOOLS = TOOLS; root.MONEDAS = MONEDAS; root.FMT = {fmtM, fmtN, fmtP, plazo, lineChart, moneda};
if (typeof module !== "undefined") module.exports = CALC;
})(typeof window !== "undefined" ? window : globalThis);
