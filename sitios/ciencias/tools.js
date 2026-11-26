// Herramientas del curso de Ciencias: conversor de unidades, masa molar y escala del sistema solar.
window.TOOLS = {
  units: {
    "Longitud": {m:1, km:1000, cm:0.01, mm:0.001, "milla":1609.344, "pie":0.3048, "pulgada":0.0254, "año luz":9.4607e15, "UA":1.495978707e11},
    "Masa": {kg:1, g:0.001, mg:1e-6, t:1000, "libra":0.45359237, "onza":0.028349523},
    "Tiempo": {s:1, min:60, h:3600, "día":86400, "año":31557600},
    "Energía": {J:1, kJ:1000, cal:4.184, kcal:4184, kWh:3.6e6, eV:1.602176634e-19},
    "Velocidad": {"m/s":1, "km/h":1/3.6, "mph":0.44704, "nudo":0.514444},
    "Temperatura": "temp"
  },
  masses: {H:1.008,He:4.003,Li:6.94,Be:9.012,B:10.81,C:12.011,N:14.007,O:15.999,F:18.998,Ne:20.18,Na:22.99,Mg:24.305,Al:26.982,Si:28.085,P:30.974,S:32.06,Cl:35.45,Ar:39.95,K:39.098,Ca:40.078,Fe:55.845,Cu:63.546,Zn:65.38,Br:79.904,Ag:107.87,I:126.9,Au:196.97,Hg:200.59,Pb:207.2,Mn:54.938,Cr:51.996,Ni:58.693,Co:58.933,Sn:118.71,Ba:137.33},
  planets: [["Mercurio",0.39],["Venus",0.72],["Tierra",1],["Marte",1.52],["Júpiter",5.2],["Saturno",9.58],["Urano",19.2],["Neptuno",30.05]],
  page(){
    const cats = Object.keys(this.units);
    return `<div class="crumbs"><a href="#/">Inicio</a> › Herramientas</div><h1>Herramientas</h1>
    <div class="tool"><h2>Conversor de unidades</h2>
      <label>Magnitud <select id="u-cat">${cats.map(c=>`<option>${c}</option>`).join("")}</select></label>
      <label>Valor <input id="u-val" type="number" value="1" step="any"></label>
      <label>De <select id="u-from"></select></label><label>A <select id="u-to"></select></label>
      <output id="u-out"></output></div>
    <div class="tool"><h2>Calculadora de masa molar</h2>
      <label>Fórmula <input id="mm-f" value="H2O"></label><output id="mm-out"></output>
      <p class="meta">Escribe símbolos con mayúscula y subíndices como números, con paréntesis si hace falta: NaCl, C6H12O6, Ca(OH)2.</p></div>
    <div class="tool"><h2>Sistema solar a escala</h2>
      <label>Distancia del Sol a Neptuno en tu modelo (metros) <input id="ss-d" type="number" value="100" step="any"></label>
      <output id="ss-out"></output></div>`;
  },
  bind(){
    const U = this.units, cat = document.getElementById("u-cat"), from = document.getElementById("u-from"), to = document.getElementById("u-to"), val = document.getElementById("u-val"), out = document.getElementById("u-out");
    const fill = () => { const u = U[cat.value]; const keys = u === "temp" ? ["°C","°F","K"] : Object.keys(u); from.innerHTML = to.innerHTML = keys.map(k=>`<option>${k}</option>`).join(""); to.selectedIndex = Math.min(1, keys.length-1); calc(); };
    const calc = () => { const v = parseFloat(val.value); if (isNaN(v)) { out.textContent = ""; return; } const u = U[cat.value]; let r;
      if (u === "temp") { const c = from.value === "°C" ? v : from.value === "°F" ? (v-32)*5/9 : v-273.15; r = to.value === "°C" ? c : to.value === "°F" ? c*9/5+32 : c+273.15; }
      else r = v * u[from.value] / u[to.value];
      out.textContent = `${v.toLocaleString("es")} ${from.value} = ${Number(r.toPrecision(6)).toLocaleString("es", {maximumSignificantDigits: 6})} ${to.value}`; };
    cat.onchange = fill; [val, from, to].forEach(e => e.oninput = calc); fill();
    const f = document.getElementById("mm-f"), mo = document.getElementById("mm-out"), M = this.masses;
    const parse = s => { let i = 0; const group = () => { const tot = {}; while (i < s.length && s[i] !== ")") { let part;
        if (s[i] === "(") { i++; part = group(); i++; } else { const m = s.slice(i).match(/^([A-Z][a-z]?)/); if (!m) throw "Símbolo no válido"; i += m[1].length; part = {[m[1]]: 1}; }
        const n = s.slice(i).match(/^\d+/); const k = n ? +n[0] : 1; if (n) i += n[0].length; for (const e in part) tot[e] = (tot[e]||0) + part[e]*k; } return tot; }; return group(); };
    const mm = () => { try { const t = parse(f.value.trim()); let sum = 0; for (const e in t) { if (!M[e]) throw "Elemento no incluido: " + e; sum += M[e]*t[e]; }
        mo.textContent = `Masa molar de ${f.value}: ${sum.toLocaleString("es",{maximumFractionDigits:3})} g/mol`; } catch (e) { mo.textContent = e; } };
    f.oninput = mm; mm();
    const d = document.getElementById("ss-d"), so = document.getElementById("ss-out");
    const ss = () => { const D = parseFloat(d.value) || 0, k = D / 30.05; so.innerHTML = this.planets.map(([n,a]) => `${n}: ${(a*k).toLocaleString("es",{maximumFractionDigits:2})} m`).join("<br>") + `<br><span class="meta">A esa escala, el Sol mediría ${(1.3927e9/4.495e12*D*1000).toLocaleString("es",{maximumFractionDigits:1})} mm de diámetro.</span>`; };
    d.oninput = ss; ss();
  }
};
