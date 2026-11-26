// Herramientas del curso de Administración: punto de equilibrio, VAN/TIR, interés compuesto, préstamo y ratios.
window.TOOLS = {
  page(){
    const inp = (id, label, v) => `<label>${label} <input id="${id}" type="number" step="any" value="${v}"></label>`;
    return `<div class="crumbs"><a href="#/">Inicio</a> › Herramientas</div><h1>Herramientas</h1>
    <p class="meta">Los valores de ejemplo son de Café Raíz, la empresa ficticia del curso. Resultados orientativos con fines educativos.</p>
    <div class="tool"><h2>Punto de equilibrio</h2>${inp("pe-cf","Costes fijos mensuales",6000)}${inp("pe-p","Precio por unidad",3)}${inp("pe-cv","Coste variable por unidad",1)}<output id="pe-out"></output></div>
    <div class="tool"><h2>VAN, TIR y periodo de recuperación</h2>${inp("v-i","Inversión inicial",50000)}${inp("v-r","Tasa de descuento (%)",10)}
      <label>Flujos anuales (separados por comas) <input id="v-f" style="width:18rem" value="15000, 15000, 15000, 15000, 15000"></label><output id="v-out"></output></div>
    <div class="tool"><h2>Interés compuesto</h2>${inp("ic-c","Capital inicial",1000)}${inp("ic-a","Aportación mensual",100)}${inp("ic-r","Rentabilidad anual (%)",5)}${inp("ic-n","Años",20)}<output id="ic-out"></output></div>
    <div class="tool"><h2>Préstamo: cuota y amortización</h2>${inp("pr-c","Importe",20000)}${inp("pr-r","Interés anual (%)",8)}${inp("pr-n","Plazo (meses)",48)}<output id="pr-out"></output><div id="pr-tab" class="tablewrap"></div></div>
    <div class="tool"><h2>Ratios financieros básicos</h2>${inp("ra-ac","Activo corriente",40000)}${inp("ra-pc","Pasivo corriente",25000)}${inp("ra-pt","Pasivo total",60000)}${inp("ra-pn","Patrimonio neto",80000)}${inp("ra-bn","Beneficio neto",12000)}${inp("ra-at","Activo total",140000)}<output id="ra-out"></output></div>`;
  },
  bind(){
    const g = id => parseFloat(document.getElementById(id).value), n = (x, d=2) => x.toLocaleString("es", {maximumFractionDigits: d}), on = (ids, f) => { ids.forEach(i => document.getElementById(i).oninput = f); f(); };
    on(["pe-cf","pe-p","pe-cv"], () => { const cf = g("pe-cf"), m = g("pe-p") - g("pe-cv"), o = document.getElementById("pe-out");
      o.textContent = m > 0 ? `Margen de contribución: ${n(m)} u. m. por unidad · Punto de equilibrio: ${n(Math.ceil(cf/m),0)} unidades (${n(Math.ceil(cf/m)*g("pe-p"))} u. m. en ventas).` : "El precio debe ser mayor que el coste variable."; });
    on(["v-i","v-r","v-f"], () => { const I = g("v-i"), r = g("v-r")/100, F = document.getElementById("v-f").value.split(",").map(Number).filter(x => !isNaN(x));
      const van = rate => -I + F.reduce((s, f, t) => s + f / Math.pow(1+rate, t+1), 0);
      let lo = -0.99, hi = 10, tir = null; if (van(lo) * van(hi) < 0) { for (let k = 0; k < 200; k++) { const mid = (lo+hi)/2; if (van(lo) * van(mid) <= 0) hi = mid; else lo = mid; } tir = (lo+hi)/2; }
      let acc = -I, pb = null; F.forEach((f, t) => { if (pb === null && acc + f >= 0) pb = t + (-acc)/f; acc += f; });
      const v = van(r); document.getElementById("v-out").textContent = `VAN: ${n(v)} u. m. (${v >= 0 ? "el proyecto crea valor a esa tasa" : "el proyecto destruye valor a esa tasa"}) · TIR: ${tir === null ? "no calculable" : n(tir*100) + " %"} · Recuperación: ${pb === null ? "no se recupera en el horizonte" : n(pb) + " años"}`; });
    on(["ic-c","ic-a","ic-r","ic-n"], () => { const c = g("ic-c"), a = g("ic-a"), r = g("ic-r")/100/12, m = g("ic-n")*12; let s = c; for (let k = 0; k < m; k++) s = s*(1+r) + a; const put = c + a*m;
      document.getElementById("ic-out").textContent = `Valor final: ${n(s)} u. m. · Aportado: ${n(put)} u. m. · Intereses generados: ${n(s-put)} u. m. (estimación; no es una promesa de rentabilidad).`; });
    on(["pr-c","pr-r","pr-n"], () => { const C = g("pr-c"), r = g("pr-r")/100/12, N = Math.round(g("pr-n")); const q = r ? C*r/(1-Math.pow(1+r,-N)) : C/N;
      document.getElementById("pr-out").textContent = `Cuota mensual: ${n(q)} u. m. · Total pagado: ${n(q*N)} u. m. · Intereses: ${n(q*N-C)} u. m.`;
      let s = C, rows = []; for (let k = 1; k <= N; k++) { const it = s*r, am = q - it; s -= am; if (k <= 12 || k === N) rows.push(`<tr><td>${k}</td><td>${n(q)}</td><td>${n(it)}</td><td>${n(am)}</td><td>${n(Math.max(s,0))}</td></tr>`); }
      document.getElementById("pr-tab").innerHTML = `<table><thead><tr><th>Mes</th><th>Cuota</th><th>Interés</th><th>Amortización</th><th>Saldo</th></tr></thead><tbody>${rows.join("")}</tbody></table><p class="meta">Se muestran los 12 primeros meses y el último.</p>`; });
    on(["ra-ac","ra-pc","ra-pt","ra-pn","ra-bn","ra-at"], () => { document.getElementById("ra-out").innerHTML =
      `Liquidez (AC/PC): ${n(g("ra-ac")/g("ra-pc"))}<br>Endeudamiento (PT/PN): ${n(g("ra-pt")/g("ra-pn"))}<br>ROE (BN/PN): ${n(100*g("ra-bn")/g("ra-pn"))} %<br>ROA (BN/AT): ${n(100*g("ra-bn")/g("ra-at"))} %`; });
  }
};
