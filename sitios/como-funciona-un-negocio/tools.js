// Calculadoras del curso. Cada herramienta: t (título), mod (módulo), d (descripción), f (campos [clave, etiqueta, valor, unidad]), calc(v) → {r:[[etiqueta, valor]], big, txt}
(function(){
const g = typeof window !== "undefined" ? window : globalThis;
const fmt = (n, d) => (isFinite(n) ? Number(n).toLocaleString("es-MX", {minimumFractionDigits: d == null ? 2 : d, maximumFractionDigits: d == null ? 2 : d}) : "—");
const $ = n => "$" + fmt(n);
const pc = n => fmt(n * 100, 1) + " %";
const list = s => String(s).split(/[;,\s]+/).filter(x => x !== "").map(Number);

const CALC = {
margen: {t:"Margen y sobreprecio", mod:"M5", d:"Cuánto ganas por unidad y qué porcentaje del precio es ganancia.",
 f:[["p","Precio de venta","40","MXN"],["c","Costo variable por unidad","16","MXN"]],
 calc(v){ const m = v.p - v.c; if (v.p <= 0) return {err:"El precio debe ser mayor que cero."};
  return {big:"Margen: " + pc(m / v.p), r:[["Margen por unidad", $(m)],["Margen sobre el precio", pc(m / v.p)],["Sobreprecio (markup) sobre el costo", v.c > 0 ? pc(m / v.c) : "—"]],
  txt: m < 0 ? "Pierdes dinero en cada unidad: el precio no cubre ni el costo variable." : m / v.p < 0.3 ? "Margen bajo: queda poco para pagar renta, sueldos y otros gastos fijos." : "De cada peso que cobras, " + fmt(m / v.p * 100, 0) + " centavos quedan para cubrir gastos fijos y dejar utilidad."}; }},
precio: {t:"Precio a partir del costo", mod:"M5", d:"Qué precio necesitas para lograr un margen deseado.",
 f:[["c","Costo por unidad","16","MXN"],["m","Margen deseado sobre el precio","60","%"]],
 calc(v){ const m = v.m / 100; if (m >= 1 || m < 0) return {err:"El margen debe estar entre 0 y 99 %."};
  const p = v.c / (1 - m); return {big:"Precio: " + $(p), r:[["Precio necesario", $(p)],["Ganancia por unidad", $(p - v.c)],["Equivale a un sobreprecio de", v.c > 0 ? pc((p - v.c) / v.c) : "—"]],
  txt:"Compara este precio con el de tu competencia y con lo que tus clientes están dispuestos a pagar: el costo marca el piso, no el precio final."}; }},
equilibrio: {t:"Punto de equilibrio", mod:"M5", d:"Cuántas unidades debes vender para no ganar ni perder.",
 f:[["cf","Costos fijos al mes","18000","MXN"],["p","Precio por unidad","40","MXN"],["cv","Costo variable por unidad","16","MXN"]],
 calc(v){ const mc = v.p - v.cv; if (mc <= 0) return {err:"El precio debe ser mayor que el costo variable; si no, nunca alcanzas el equilibrio."};
  const u = v.cf / mc; return {big: fmt(Math.ceil(u - 1e-9), 0) + " unidades al mes", r:[["Margen de contribución por unidad", $(mc)],["Punto de equilibrio (unidades)", fmt(u, 1)],["Punto de equilibrio (ventas)", $(u * v.p)],["Unidades por día (30 días)", fmt(u / 30, 1)]],
  txt:"Por debajo de " + fmt(Math.ceil(u - 1e-9), 0) + " unidades al mes el negocio pierde; cada unidad extra deja " + $(mc) + " de utilidad."}; }},
descuento: {t:"Efecto de un descuento", mod:"M5", d:"Cuánto más tienes que vender para ganar lo mismo después de un descuento.",
 f:[["p","Precio normal","40","MXN"],["c","Costo variable por unidad","16","MXN"],["d","Descuento","10","%"]],
 calc(v){ const u0 = v.p - v.c, u1 = v.p * (1 - v.d / 100) - v.c; if (u0 <= 0) return {err:"Con ese precio ya pierdes antes del descuento."};
  if (u1 <= 0) return {big:"Con ese descuento pierdes en cada venta", r:[["Margen nuevo por unidad", $(u1)]], txt:"Ningún aumento de ventas compensa un descuento que deja margen negativo."};
  const k = u0 / u1; return {big:"Necesitas vender " + pc(k - 1) + " más", r:[["Margen normal por unidad", $(u0)],["Margen con descuento", $(u1)],["Ventas necesarias (veces las actuales)", fmt(k, 2)]],
  txt:"Un descuento de " + fmt(v.d, 0) + " % parece pequeño, pero obliga a vender " + pc(k - 1) + " más solo para quedar igual."}; }},
resultados: {t:"Estado de resultados", mod:"M8", d:"De las ventas a la utilidad neta, capa por capa.",
 f:[["v","Ventas del periodo","216000","MXN"],["cv","Costo de ventas","86400","MXN"],["go","Gastos de operación","90000","MXN"],["i","Intereses","3000","MXN"],["t","Tasa de impuestos","30","%"]],
 calc(v){ if (v.v <= 0) return {err:"Las ventas deben ser mayores que cero."};
  const ub = v.v - v.cv, uo = ub - v.go, ua = uo - v.i, imp = ua > 0 ? ua * v.t / 100 : 0, un = ua - imp;
  return {big:"Utilidad neta: " + $(un), r:[["Utilidad bruta", $(ub) + " (" + pc(ub / v.v) + ")"],["Utilidad de operación", $(uo) + " (" + pc(uo / v.v) + ")"],["Utilidad antes de impuestos", $(ua)],["Impuestos", $(imp)],["Utilidad neta", $(un) + " (" + pc(un / v.v) + ")"]],
  txt: un < 0 ? "El periodo cerró con pérdida: revisa primero los gastos de operación y el costo de ventas." : "De cada 100 pesos vendidos quedaron " + fmt(un / v.v * 100, 1) + " pesos de utilidad neta. Recuerda: utilidad no es lo mismo que efectivo."}; }},
flujo: {t:"Flujo de caja de 6 meses", mod:"M8", d:"Mes a mes: cuánto entra, cuánto sale y cuánto efectivo queda.",
 f:[["s","Saldo inicial en caja","20000","MXN"],["e","Cobros por mes (6 números separados por coma)","180000, 190000, 150000, 160000, 200000, 210000","MXN"],["p","Pagos por mes (6 números separados por coma)","185000, 185000, 185000, 170000, 175000, 180000","MXN"]],
 text:["e","p"],
 calc(v){ const e = list(v.e), p = list(v.p); if (e.length !== 6 || p.length !== 6 || e.concat(p).some(x => !isFinite(x))) return {err:"Escribe exactamente 6 cobros y 6 pagos, separados por comas."};
  let s = v.s, first = null; const r = [];
  for (let i = 0; i < 6; i++){ s += e[i] - p[i]; r.push(["Mes " + (i + 1) + ": entra " + $(e[i]) + ", sale " + $(p[i]), "saldo " + $(s)]); if (s < 0 && first === null) first = i + 1; }
  return {big: first ? "Te quedas sin efectivo en el mes " + first : "Saldo final: " + $(s), r, txt: first ? "Necesitas un colchón, cobrar antes, pagar después o un crédito antes del mes " + first + "." : "El efectivo alcanza los 6 meses. Vigila los meses en que el saldo baja."}; }},
empleado: {t:"Costo real de un empleado", mod:"M13", d:"Aproximación del costo anual para el negocio (México). Los porcentajes son editables y cambian según el salario y la entidad: verifica con tu contador.",
 f:[["s","Sueldo mensual bruto","9000","MXN"],["a","Días de aguinaldo","15","días"],["vac","Días de vacaciones","12","días"],["pv","Prima vacacional","25","%"],["imss","Cuotas patronales IMSS, Infonavit y SAR (aprox.)","25","%"],["isn","Impuesto sobre nómina estatal","3","%"]],
 calc(v){ const anual = v.s * 12, diario = v.s / 30, ag = diario * v.a, prima = diario * v.vac * v.pv / 100, cuotas = anual * v.imss / 100, isn = (anual + ag + prima) * v.isn / 100, tot = anual + ag + prima + cuotas + isn;
  return {big:"Costo anual: " + $(tot), r:[["Sueldos (12 meses)", $(anual)],["Aguinaldo", $(ag)],["Prima vacacional", $(prima)],["Cuotas de seguridad social", $(cuotas)],["Impuesto sobre nómina", $(isn)],["Costo mensual promedio", $(tot / 12)],["Costo sobre el sueldo", anual > 0 ? pc(tot / anual - 1) + " más" : "—"]],
  txt:"Un empleado cuesta bastante más que su sueldo. Este cálculo es educativo y aproximado; no sustituye el cálculo de un contador."}; }},
reorden: {t:"Punto de reorden", mod:"M9", d:"Cuándo pedir para no quedarte sin insumos.",
 f:[["d","Consumo promedio por día","300","piezas"],["l","Días que tarda en llegar el pedido","2","días"],["ss","Días de inventario de seguridad","1","días"]],
 calc(v){ const ss = v.d * v.ss, pr = v.d * v.l + ss;
  return {big:"Pide cuando queden " + fmt(pr, 0), r:[["Consumo durante la entrega", fmt(v.d * v.l, 0)],["Inventario de seguridad", fmt(ss, 0)],["Punto de reorden", fmt(pr, 0)]],
  txt:"Cuando el inventario baje a " + fmt(pr, 0) + " piezas, haz el pedido. El inventario de seguridad te protege si el proveedor se retrasa o vendes más de lo normal."}; }},
caclt: {t:"Costo por cliente (CAC) y valor de vida (LTV)", mod:"M11", d:"Cuánto cuesta conseguir un cliente y cuánto te deja durante su vida como cliente.",
 f:[["g","Gasto en marketing y ventas del mes","6000","MXN"],["n","Clientes nuevos del mes","120","clientes"],["t","Ticket promedio","85","MXN"],["fr","Compras por cliente al mes","4","veces"],["m","Margen bruto","55","%"],["meses","Meses que dura un cliente","12","meses"]],
 calc(v){ if (v.n <= 0) return {err:"Los clientes nuevos deben ser más de cero."}; const cac = v.g / v.n, ltv = v.t * v.fr * v.m / 100 * v.meses, k = cac > 0 ? ltv / cac : Infinity;
  return {big:"LTV / CAC = " + (isFinite(k) ? fmt(k, 1) : "—"), r:[["Costo de adquirir un cliente (CAC)", $(cac)],["Valor de vida del cliente (LTV, en margen)", $(ltv)],["Relación LTV / CAC", isFinite(k) ? fmt(k, 1) : "—"]],
  txt: k < 1 ? "Gastas más en conseguir clientes de lo que te dejan: revisa canales y retención." : k < 3 ? "Relación aceptable pero ajustada; mejora la retención o baja el costo de adquisición." : "Buena relación: cada cliente deja varias veces lo que cuesta conseguirlo."}; }},
presupuesto: {t:"Real contra presupuesto", mod:"M17", d:"Compara lo que planeaste con lo que pasó.",
 f:[["pv","Ventas presupuestadas","220000","MXN"],["rv","Ventas reales","200000","MXN"],["pc","Costos presupuestados","88000","MXN"],["rc","Costos reales","86000","MXN"],["pg","Gastos presupuestados","90000","MXN"],["rg","Gastos reales","97000","MXN"]],
 calc(v){ const row = (n, p, r, ing) => { const d = r - p, fav = ing ? d >= 0 : d <= 0; return [n, $(d) + " (" + (p ? pc(d / p) : "—") + ") " + (d === 0 ? "sin diferencia" : fav ? "favorable" : "desfavorable")]; };
  const up = v.pv - v.pc - v.pg, ur = v.rv - v.rc - v.rg;
  return {big:"Utilidad: " + $(ur) + " contra " + $(up) + " planeada", r:[row("Ventas", v.pv, v.rv, 1), row("Costos", v.pc, v.rc, 0), row("Gastos", v.pg, v.rg, 0), row("Utilidad", up, ur, 1)],
  txt:"Investiga primero la diferencia desfavorable más grande: pregunta qué pasó, por qué y qué harás el próximo mes."}; }},
recuperacion: {t:"Periodo de recuperación y valor presente", mod:"M17", d:"En cuánto tiempo recuperas una inversión y si crea valor.",
 f:[["i","Inversión","60000","MXN"],["a","Ahorro o ganancia extra al mes","5000","MXN"],["n","Meses que dura el beneficio","36","meses"],["r","Tasa de descuento anual","12","%"]],
 calc(v){ if (v.a <= 0) return {err:"El ahorro mensual debe ser mayor que cero."}; const pb = v.i / v.a, im = v.r / 100 / 12; let vp = 0; for (let t = 1; t <= v.n; t++) vp += v.a / Math.pow(1 + im, t);
  const van = vp - v.i; return {big:"Se recupera en " + fmt(pb, 1) + " meses", r:[["Periodo de recuperación", fmt(pb, 1) + " meses"],["Valor presente de los beneficios", $(vp)],["Valor presente neto (VPN)", $(van)]],
  txt: pb > v.n ? "No se recupera dentro del plazo del beneficio: no conviene." : van > 0 ? "El VPN es positivo: con la tasa elegida, la inversión crea valor." : "Se recupera, pero el VPN es negativo con esa tasa: el dinero rendiría más en otra parte."}; }},
regalias: {t:"Pagos de una franquicia", mod:"M21", d:"Cuánto paga cada mes un franquiciatario y en cuánto recupera la cuota inicial.",
 f:[["v","Ventas mensuales","400000","MXN"],["r","Regalía","6","%"],["p","Fondo de publicidad","2","%"],["u","Utilidad de operación antes de regalías","18","%"],["c","Cuota inicial de franquicia","350000","MXN"]],
 calc(v){ const pagos = v.v * (v.r + v.p) / 100, ut = v.v * v.u / 100 - pagos;
  return {big:"Pagos mensuales: " + $(pagos), r:[["Regalía", $(v.v * v.r / 100)],["Publicidad", $(v.v * v.p / 100)],["Utilidad mensual después de pagos", $(ut)],["Meses para recuperar la cuota inicial", ut > 0 ? fmt(v.c / ut, 1) : "no se recupera"]],
  txt: ut <= 0 ? "Con esos números el franquiciatario pierde: las regalías se cobran sobre ventas, no sobre utilidad." : "Las regalías se pagan aunque el local no tenga utilidad: revisa bien el margen antes de comprar."}; }},
participacion: {t:"Tabla de participación", mod:"M19", d:"Cómo cambia quién es dueño de qué después de una inversión.",
 f:[["inv","Inversión del nuevo socio","500000","MXN"],["pct","Porcentaje que recibe","20","%"],["a","Participación actual de Lupita","70","%"],["b","Participación actual de Toño","30","%"]],
 calc(v){ const k = v.pct / 100; if (k <= 0 || k >= 1) return {err:"El porcentaje debe estar entre 1 y 99 %."}; if (Math.abs(v.a + v.b - 100) > 0.01) return {err:"Las participaciones actuales deben sumar 100 %."};
  const post = v.inv / k; return {big:"Valuación después: " + $(post), r:[["Valuación antes de la inversión (pre)", $(post - v.inv)],["Valuación después (post)", $(post)],["Lupita queda con", fmt(v.a * (1 - k), 1) + " %"],["Toño queda con", fmt(v.b * (1 - k), 1) + " %"],["Nuevo socio", fmt(v.pct, 1) + " %"]],
  txt:"Los dueños actuales se «diluyen»: tienen un porcentaje menor de una empresa que ahora vale más y tiene más dinero."}; }}
};
g.CALC = CALC; g.FMT = {fmt, $, pc, list};
})();
