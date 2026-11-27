// M6. Potencia y energía eléctrica
registrarModulo({
  id: "m6", n: 6, nivel: 2, titulo: "Potencia y energía eléctrica", quizMin: 25, quizN: 15, minEsperado: 330,
  objetivo: "Calcular la potencia y la energía eléctrica, leer un recibo de luz y estimar el consumo y el costo de cada aparato para ahorrar.",
  clave: "potencia energia watt kilowatt kwh recibo luz consumo costo tarifa ahorro standby joule",
  actividades: ["Hacer el inventario de los aparatos de tu casa en la [calculadora de consumo y costo](#/calculadora/C5) y ver qué porcentaje del recibo representa cada uno.", "Leer el medidor dos días seguidos a la misma hora (experimento de la lección 6.4).", "Diseñar un plan personal de ahorro con al menos 5 medidas y su ahorro estimado."],
  ejemplos: ["Plancha de 1 200 W usada 30 min al día durante 30 días = 18 kWh.", "Foco de 60 W frente a LED de 9 W: ahorro de 93 kWh al año por foco con 5 h diarias.", "Microondas de 1 500 W a 127 V: unos 11,8 A."],
  sims: ["S5", "CASA"], calcs: ["C2", "C5", "C6", "C17"], gen: ["potencia", "energia", "costo"],
  evaluacion: "Quiz de módulo de 15 preguntas (25 min), con cálculos de potencia, energía y costo con valores aleatorios y un problema de recibo. Se aprueba con el 70 %.",
  extra: [
    { t: "num", p: "Un recibo marca 250 kWh en el periodo y la tarifa es de 2 por kWh, más un cargo fijo de 30. ¿Cuánto se paga?", r: 530, u: "", e: "250 × 2 + 30 = 530.", lec: "6-5" },
    { t: "om", p: "¿Qué aparato suele consumir más energía al mes en una casa sin aire acondicionado?", o: ["El cargador del celular", "El refrigerador", "El control remoto", "El foco del baño"], c: 1, e: "El refrigerador funciona las 24 horas; suele ser uno de los mayores consumos.", lec: "6-6" }
  ],
  lecciones: [
    {
      id: "6-1", t: "Energía y potencia no son lo mismo", d: "Energía = cantidad; potencia = rapidez con que se usa. Julio y watt.", min: 35, e: true,
      preg: "¿Qué gasta más energía: un hervidor de 1 500 W funcionando 3 minutos o un foco LED de 9 W encendido toda la noche?",
      obj: ["Distinguir energía de potencia.", "Usar el julio y el watt.", "Calcular energía a partir de potencia y tiempo."],
      txt: `Dos palabras que se usan como sinónimos y no lo son: **energía** y **potencia**.

## Energía: la cantidad
La **energía** es la capacidad de producir un cambio: calentar agua, mover un auto, encender una luz. Se mide en **julios** (J). Un julio es poquito: es la energía necesaria para levantar una manzana de 100 g un metro.

## Potencia: la rapidez
La [[potencia eléctrica|potencia]] es **la rapidez con que se usa (o se entrega) la energía**: cuánta energía por segundo. Se mide en **watts** (W), en honor a James Watt:

= P = E / t     (1 W = 1 J/s)

Un aparato de 1 500 W convierte 1 500 julios de energía eléctrica en calor **cada segundo**. Uno de 9 W, solo 9 julios por segundo.

## Una analogía con el agua
- La **energía** es como la cantidad de agua en un tinaco (litros).
- La **potencia** es como el caudal de la llave (litros por segundo).

Con una llave muy abierta (mucha potencia) vacías el tinaco rápido; con un goteo (poca potencia) tardas mucho, pero si lo dejas suficiente tiempo también lo vacías.

## La respuesta a la pregunta inicial
= E = P × t

- Hervidor: 1 500 W × 180 s = **270 000 J**.
- Foco LED: 9 W × 8 h × 3 600 s/h = 9 × 28 800 = **259 200 J**.

¡Casi lo mismo! El hervidor tiene mucha más **potencia**, pero funciona muy poco **tiempo**. El foco tiene muy poca potencia, pero funciona muchas horas. Lo que pagas en el recibo es la **energía**, no la potencia.

## Potencia alta no significa consumo alto
| Aparato | Potencia | Uso típico al día | Energía al día |
|---|---|---|---|
| Hervidor | 1 500 W | 10 min | 0,25 kWh |
| Secadora de cabello | 1 500 W | 10 min | 0,25 kWh |
| Refrigerador (promedio) | 150 W | 24 h (cicla) | 1 a 1,5 kWh |
| Televisor | 100 W | 4 h | 0,4 kWh |
| Módem de internet | 10 W | 24 h | 0,24 kWh |

El módem de internet, con apenas 10 W, gasta casi lo mismo que el hervidor de 1 500 W porque está siempre encendido.

## ¿Por qué importa la potencia entonces?
La potencia determina **cuánta corriente pide** un aparato y, por tanto, qué cable y qué protección necesita (P = V · I, lección 6.2). Si enciendes a la vez muchos aparatos de alta potencia en el mismo circuito, la corriente total puede disparar el termomagnético, aunque la energía consumida en el mes sea pequeña.

## Unidades más grandes
Como el julio es muy pequeño, para la electricidad se usa el **kilowatt-hora** (kWh): la energía de 1 000 W durante una hora = 3 600 000 J (lección 6.4).`,
      form: [["P = E / t", "Potencia (W) = energía (J) ÷ tiempo (s). 1 W = 1 J/s."], ["E = P × t", "Energía (J) = potencia (W) × tiempo (s)."]],
      ej: { enun: "Una secadora de cabello de 1 800 W se usa 5 minutos. ¿Cuánta energía consume en julios y en kWh?", pasos: ["t = 5 min = 300 s.", "E = 1 800 × 300 = 540 000 J.", "En kWh: 1,8 kW × (5/60) h = 0,15 kWh."], res: "540 000 J = 0,15 kWh." },
      vida: "Los aparatos de alta potencia (planchas, secadoras, hervidores) suelen usarse poco tiempo. Los de baja potencia pero siempre encendidos (refrigerador, módem de internet, aparatos en espera) pueden pesar más en el recibo.",
      err: ["Decir «este aparato gasta 1 500 W al mes»: la potencia no es consumo; el consumo se mide en kWh.", "Pensar que un aparato de más potencia siempre cuesta más al mes.", "Confundir el watt (potencia) con el watt-hora (energía)."],
      ejer: [["¿Cuánta energía en julios consume un foco de 10 W durante 1 minuto?", "600 J."], ["Un motor convierte 6 000 J en 2 s. ¿Qué potencia tiene?", "3 000 W = 3 kW."], ["¿Qué consume más: 2 000 W durante 15 min o 100 W durante 6 h?", "2 000 W × 0,25 h = 500 Wh; 100 W × 6 h = 600 Wh. Consume más el de 100 W."]],
      quiz: [
        { t: "om", p: "La potencia es…", o: ["La cantidad total de energía", "La rapidez con que se usa la energía", "La corriente de un aparato", "El voltaje de la red"], c: 1, e: "Energía por unidad de tiempo." },
        { t: "om", p: "¿En qué unidad se mide la potencia?", o: ["Julio", "Watt", "Kilowatt-hora", "Amperio"], c: 1, e: "Watt (W) = J/s." },
        { t: "num", p: "Un aparato de 500 W funciona 10 s. ¿Cuántos julios consume?", r: 5000, u: "J", e: "E = 500 × 10 = 5 000 J." },
        { t: "vf", p: "Un aparato de mucha potencia siempre consume más energía al mes que uno de poca potencia.", c: false, e: "Depende del tiempo de uso: E = P × t." },
        { t: "om", p: "Lo que se cobra en el recibo de luz es…", o: ["La potencia", "La energía", "El voltaje", "La frecuencia"], c: 1, e: "La energía consumida, en kWh." }
      ],
      res: ["La energía es la cantidad; la potencia, la rapidez con que se usa.", "P = E/t; 1 W = 1 J/s.", "E = P × t: el consumo depende de la potencia y del tiempo.", "Aparatos de poca potencia siempre encendidos pueden consumir mucho.", "La potencia determina la corriente, el cable y la protección necesarios."]
    },
    {
      id: "6-2", t: "La potencia eléctrica", d: "P = V·I, P = I²·R, P = V²/R: la rueda de fórmulas.", min: 45, e: true, calc: "C2",
      preg: "¿Qué corriente pide un microondas de 1 500 W conectado a {{V}}?",
      obj: ["Calcular la potencia eléctrica con P = V·I.", "Combinarla con la ley de Ohm para obtener P = I²R y P = V²/R.", "Elegir la fórmula adecuada según los datos."],
      txt: `La potencia que consume (o entrega) un componente eléctrico es el producto de su voltaje por su corriente:

= P = V · I

- **P:** potencia en watts (W).
- **V:** voltaje en voltios (V).
- **I:** corriente en amperios (A).

¿Por qué? El voltaje es energía por culombio (J/C) y la corriente son culombios por segundo (C/s). Su producto es julios por segundo: watts.

## La respuesta a la pregunta inicial
= I = P / V

- Con 127 V: I = 1 500 / 127 ≈ **11,8 A**.
- Con 230 V: I = 1 500 / 230 ≈ **6,5 A**.

Por eso, para la misma potencia, las redes de 230 V usan menos corriente y pueden usar cables algo más delgados que las de 127 V.

## Combinando con la ley de Ohm
Sustituyendo V = I·R o I = V/R en P = V·I se obtienen dos fórmulas muy útiles:

= P = I² · R
= P = V² / R

- **P = I²·R:** útil cuando conoces la **corriente**, por ejemplo para calcular el calor que se pierde en un cable (lección 6.8 y 10.3). Si la corriente se duplica, ¡la potencia se cuadruplica!
- **P = V²/R:** útil cuando conoces el **voltaje**, por ejemplo para aparatos conectados a la red. Si el voltaje baja un 10 %, la potencia de una resistencia baja un 19 %.

## La rueda de fórmulas
Con las cuatro magnitudes V, I, R y P, si conoces **dos** puedes calcular las otras dos:

| Conoces | Calculas P | Y además |
|---|---|---|
| V e I | P = V·I | R = V/I |
| I y R | P = I²·R | V = I·R |
| V y R | P = V²/R | I = V/R |
| P y V | — | I = P/V; R = V²/P |
| P e I | — | V = P/I; R = P/I² |
| P y R | — | V = √(P·R); I = √(P/R) |

La calculadora C2 hace todas estas combinaciones: escribe dos valores y deja los demás vacíos.

## Ejemplos
- **Foco de auto:** 12 V y 5 A → P = 60 W.
- **Resistencia de 100 Ω con 10 V:** P = 10² / 100 = 1 W. Si el resistor es de ¼ W, ¡se quemará!
- **Cable de 0,2 Ω con 15 A:** P = 15² × 0,2 = 45 W de calor en el cable.

## Potencia nominal de los componentes
Los resistores, focos, motores y cables tienen una **potencia máxima** que pueden disipar sin dañarse. En electrónica es habitual elegir resistores con el **doble** de la potencia calculada como margen de seguridad (la calculadora C10 lo hace).

?> En CA, P = V·I es exacta para aparatos resistivos (planchas, focos incandescentes). Con motores y fuentes electrónicas aparece el **factor de potencia**, y la potencia real puede ser algo menor que V·I. Para este curso, usaremos la potencia de la etiqueta.`,
      form: [["P = V · I", "Potencia eléctrica (W)."], ["P = I² · R", "Potencia a partir de la corriente y la resistencia."], ["P = V² / R", "Potencia a partir del voltaje y la resistencia."], ["I = P / V", "Corriente que pide un aparato de potencia P."]],
      ej: { enun: "Un calefactor de 2 000 W se conecta a 127 V. ¿Qué corriente pide y qué resistencia tiene? ¿Cabe en un circuito de 15 A?", pasos: ["I = P / V = 2 000 / 127 ≈ 15,7 A.", "R = V² / P = 127² / 2 000 = 16 129 / 2 000 ≈ 8,1 Ω.", "15,7 A > 15 A: el termomagnético de 15 A se dispararía.", "Con 230 V: I = 8,7 A y R = 26,5 Ω."], res: "Pide unos 15,7 A (8,1 Ω): no cabe en un circuito de 15 A con 127 V." },
      vida: "Cuando ves en una etiqueta «127 V ~ 60 Hz 1 200 W», puedes calcular al instante la corriente: 1 200 / 127 ≈ 9,4 A. Así sabes si puedes conectarlo en la misma extensión que otro aparato.",
      err: ["Usar P = V·I con el voltaje de la fuente y la corriente de otro componente.", "Olvidar elevar al cuadrado en P = I²R o P = V²/R.", "Pensar que un resistor de ¼ W aguanta cualquier potencia."],
      ejer: [["V = 230 V, I = 4 A. ¿P?", "920 W."], ["P = 60 W, V = 12 V. ¿I y R?", "I = 5 A; R = 2,4 Ω."], ["R = 50 Ω, I = 2 A. ¿P?", "200 W."], ["R = 1 kΩ, V = 20 V. ¿P?", "0,4 W."]],
      quiz: [
        { t: "om", p: "La potencia eléctrica se calcula como…", o: ["P = V / I", "P = V · I", "P = I / R", "P = V + I"], c: 1, e: "P = V·I." },
        { t: "num", p: "¿Qué corriente pide un microondas de 1 500 W a 127 V?", r: 11.81, u: "A", e: "I = 1 500/127 ≈ 11,8 A." },
        { t: "num", p: "Una resistencia de 100 Ω tiene 10 V. ¿Qué potencia disipa?", r: 1, u: "W", e: "P = V²/R = 100/100 = 1 W." },
        { t: "om", p: "Si la corriente por una resistencia se duplica, la potencia…", o: ["Se duplica", "Se cuadruplica", "No cambia", "Se reduce a la mitad"], c: 1, e: "P = I²R: (2I)² = 4I²." },
        { t: "num", p: "Por un cable de 0,2 Ω pasan 15 A. ¿Cuántos watts se convierten en calor?", r: 45, u: "W", e: "P = 15² × 0,2 = 45 W." }
      ],
      res: ["P = V·I: watts = voltios × amperios.", "Con la ley de Ohm: P = I²R y P = V²/R.", "Con dos magnitudes de V, I, R y P se obtienen las otras dos.", "Para la misma potencia, a mayor voltaje menos corriente.", "Cada componente tiene una potencia máxima que no debe superarse."]
    },
    {
      id: "6-3", t: "Watts, kilowatts y la placa de datos", d: "Leer la etiqueta de los aparatos; tabla de potencias típicas.", min: 30,
      preg: "¿Dónde dice cuánto consume tu refrigerador y cómo se lee esa información?",
      obj: ["Leer e interpretar la placa de datos de un aparato.", "Conocer las potencias típicas de los aparatos del hogar.", "Usar kW y MW."],
      txt: `Todo aparato eléctrico tiene una [[placa de datos]]: una etiqueta o grabado (normalmente atrás o abajo) con sus características eléctricas **nominales**, es decir, para las que fue diseñado.

## Qué dice una placa de datos
Ejemplo de la etiqueta de una plancha:

| Dato | Significado |
|---|---|
| 127 V ~ | Voltaje nominal de CA |
| 60 Hz | Frecuencia de la red |
| 1 200 W | Potencia nominal |
| 9,4 A | Corriente (a veces aparece en lugar de la potencia) |
| ⧈ | Doble aislamiento (no necesita tierra) |
| Marcas de certificación | Cumple las normas de seguridad del país |

Si la etiqueta da la **corriente** en lugar de la potencia, la calculas: P ≈ V × I. Una lavadora que dice «127 V 4 A» tiene unos 500 W.

## Múltiplos del watt
- **kilowatt (kW)** = 1 000 W: aparatos grandes. Una estufa eléctrica de 2 kW.
- **megawatt (MW)** = 1 000 000 W: una turbina eólica grande (3–15 MW).
- **gigawatt (GW)** = 1 000 MW: una gran central nuclear o hidroeléctrica.

## Potencias típicas del hogar
| Aparato | Potencia típica |
|---|---|
| Cargador de celular | 5–25 W |
| Foco LED | 5–12 W |
| Foco incandescente (antiguo) | 40–100 W |
| Módem de internet | 6–15 W |
| Laptop | 45–90 W |
| Televisor LED | 50–150 W |
| Ventilador | 40–80 W |
| Refrigerador | 100–250 W (promedio menor: cicla) |
| Lavadora | 400–1 000 W |
| Licuadora | 300–700 W |
| Microondas | 800–1 500 W |
| Plancha, tostador | 900–1 500 W |
| Secadora de cabello, hervidor | 1 200–2 200 W |
| Aire acondicionado | 900–3 500 W |
| Calentador de agua eléctrico | 1 500–4 500 W |
| Estufa o horno eléctrico | 2 000–5 000 W |

## Potencia nominal frente a potencia real
- Los aparatos de calor (plancha, hervidor) consumen casi exactamente su potencia nominal **mientras están calentando**, pero los termostatos los apagan y encienden.
- Los refrigeradores y aires acondicionados funcionan por **ciclos**: el compresor arranca y para. Su consumo real promedio es menor que la potencia de la placa.
- Los aparatos electrónicos indican su potencia **máxima**: una laptop con cargador de 65 W puede consumir 20 W navegando.
- Al arrancar, los motores piden por un instante varias veces su corriente nominal.

## Etiquetas de eficiencia energética
Muchos países exigen una **etiqueta energética** en refrigeradores, lavadoras y aires acondicionados, con el **consumo anual estimado en kWh** y una escala de eficiencia (por ejemplo, de A a G). Es más útil que la potencia de la placa para comparar consumos (lección 6.8).

## Cómo medir el consumo real
Existen **medidores de enchufe** baratos que se colocan entre el contacto y el aparato y muestran la potencia instantánea y los kWh acumulados. Son la mejor forma de conocer el consumo real de un aparato.`,
      form: [["P ≈ V × I", "Potencia aproximada a partir de la corriente de la placa."], ["1 kW = 1 000 W · 1 MW = 10⁶ W · 1 GW = 10⁹ W", "Múltiplos del watt."]],
      ej: { enun: "La placa de un ventilador dice «120 V ~ 60 Hz 0,5 A». ¿Qué potencia tiene aproximadamente? ¿Y cuánta corriente pediría un modelo de 230 V con la misma potencia?", pasos: ["P ≈ V × I = 120 × 0,5 = 60 W.", "Modelo de 230 V: I = 60 / 230 ≈ 0,26 A."], res: "Unos 60 W; el modelo de 230 V pediría unos 0,26 A." },
      vida: "Antes de comprar una extensión o una regleta, suma las potencias de lo que vas a conectar: si pasas de lo que indica la extensión (por ejemplo, 1 500 W o 13 A), se calentará.",
      err: ["Pensar que la potencia de la placa es lo que consume siempre el aparato.", "Ignorar que los motores piden más corriente al arrancar.", "No revisar el voltaje de la placa antes de conectar un aparato traído de otro país."],
      ejer: [["Una placa dice «230 V 50 Hz 2,2 kW». ¿Corriente?", "≈ 9,6 A."], ["¿Cuántos focos LED de 9 W equivalen a un hervidor de 1 800 W?", "200."], ["Una lavadora dice «127 V 3,5 A». ¿Potencia aproximada?", "≈ 445 W."]],
      quiz: [
        { t: "om", p: "¿Qué información NO suele aparecer en la placa de datos?", o: ["El voltaje nominal", "La potencia o la corriente", "La frecuencia", "El consumo exacto del mes pasado"], c: 3, e: "La placa da características nominales, no consumos históricos." },
        { t: "num", p: "Una placa dice «120 V 5 A». ¿Qué potencia aproximada tiene el aparato?", r: 600, u: "W", e: "P ≈ 120 × 5 = 600 W." },
        { t: "om", p: "¿Cuántos watts son 2,5 kW?", o: ["25", "250", "2 500", "25 000"], c: 2, e: "2,5 × 1 000 = 2 500 W." },
        { t: "vf", p: "Un refrigerador consume continuamente la potencia de su placa las 24 horas.", c: false, e: "Funciona por ciclos: su consumo promedio es menor." },
        { t: "om", p: "¿Qué aparato suele tener mayor potencia?", o: ["Módem de internet", "Foco LED", "Calentador de agua eléctrico", "Cargador de celular"], c: 2, e: "Los calentadores de agua van de 1,5 a 4,5 kW." }
      ],
      res: ["La placa de datos indica voltaje, frecuencia y potencia o corriente nominales.", "Si da la corriente, P ≈ V × I.", "kW, MW y GW son múltiplos del watt.", "Los aparatos de calor tienen gran potencia; los electrónicos, poca.", "La potencia nominal no es el consumo real: hay ciclos y termostatos."]
    },
    {
      id: "6-4", t: "Energía: Wh y kWh", d: "E = P·t; 1 kWh = 3,6 MJ; ejemplos cotidianos.", min: 35, e: true, exp: "e-medidor", sim: "CASA",
      preg: "¿Cuánto es exactamente un kilowatt-hora, esa unidad que aparece en el recibo?",
      obj: ["Definir el watt-hora y el kilowatt-hora.", "Calcular la energía consumida en kWh.", "Convertir entre kWh y julios."],
      txt: `El julio es una unidad muy pequeña para la electricidad de una casa: un solo día de uso serían decenas de millones de julios. Por eso se usa el [[kilowatt-hora]].

## El watt-hora y el kilowatt-hora
- **1 watt-hora (Wh)** es la energía que consume un aparato de 1 W durante 1 hora.
- **1 kilowatt-hora (kWh)** es la energía que consume un aparato de **1 000 W durante 1 hora** (o uno de 100 W durante 10 horas, o uno de 10 W durante 100 horas).

= E (kWh) = P (kW) × t (h) = P (W) × t (h) / 1 000

?> El kilowatt-hora **no** es «kilowatts por hora». Es kilowatts **multiplicados** por horas: una unidad de energía, no de potencia.

## Equivalencia con el julio
1 kWh = 1 000 W × 3 600 s = **3 600 000 J = 3,6 MJ**.

## ¿Cuánto es 1 kWh?
Con 1 kWh puedes, aproximadamente:
- Tener encendido un foco LED de 10 W durante **100 horas**.
- Cargar un celular unas **80 veces**.
- Ver televisión (100 W) durante **10 horas**.
- Hervir unos **10 litros** de agua.
- Hacer funcionar un refrigerador eficiente durante **un día**.
- Recorrer unos **6 km** en un auto eléctrico.

Una casa típica consume entre **100 y 400 kWh al mes**, según el clima, los aparatos y el número de personas.

## Calcular la energía de un aparato
1. Toma la potencia en watts.
2. Multiplica por las horas de uso.
3. Divide entre 1 000 para pasar a kWh.

Ejemplo: televisor de 100 W, 4 h al día, 30 días:
- E = 100 × 4 × 30 / 1 000 = **12 kWh** al mes.

## El medidor de tu casa
El [[medidor]] de la acometida cuenta los kWh que pasan hacia tu casa, como el odómetro de un auto cuenta los kilómetros. La compañía lee el número cada cierto tiempo y te cobra la **diferencia** entre dos lecturas. En el experimento de esta lección leerás tu propio medidor dos días seguidos para saber cuánto consumes al día.

## La casa virtual
En la simulación de esta lección puedes encender aparatos y ver cómo se acumulan los kWh en un medidor virtual a un ritmo acelerado, con su costo según la tarifa de tus Ajustes.

## Energía de las baterías
Las baterías también se describen con watts-hora: una batería de laptop puede tener 50 Wh; una batería externa, 37 Wh; la batería de un auto eléctrico, 60 000 Wh (60 kWh). Lo verás en el módulo 9.`,
      form: [["E (kWh) = P (W) × t (h) / 1 000", "Energía consumida en kilowatts-hora."], ["1 kWh = 3,6 × 10⁶ J", "Equivalencia con el julio."], ["1 Wh = 3 600 J", "Equivalencia del watt-hora."]],
      ej: { enun: "Un refrigerador de 150 W de potencia media funciona en ciclos el equivalente a 10 h al día. ¿Cuántos kWh consume al mes (30 días)? ¿Y al año?", pasos: ["Energía diaria: 150 × 10 / 1 000 = 1,5 kWh.", "Al mes: 1,5 × 30 = 45 kWh.", "Al año: 1,5 × 365 = 547,5 kWh."], res: "45 kWh al mes y unos 548 kWh al año." },
      vida: "Los medidores digitales modernos muestran en su pantalla, alternando, el total de kWh, la potencia instantánea y a veces el voltaje. Algunos permiten ver el consumo hora por hora en una aplicación.",
      err: ["Escribir kW/h en lugar de kWh.", "Olvidar dividir entre 1 000 al pasar de Wh a kWh.", "Pensar que el kWh mide la potencia de la casa."],
      ejer: [["¿Cuántos kWh consume un aparato de 2 000 W durante 30 minutos?", "1 kWh."], ["Un foco de 9 W, 6 h al día durante 30 días. ¿kWh?", "1,62 kWh."], ["¿Cuántos julios son 0,5 kWh?", "1,8 millones de julios."]],
      quiz: [
        { t: "om", p: "1 kWh es la energía de…", o: ["1 000 W durante 1 segundo", "1 000 W durante 1 hora", "1 W durante 1 000 horas", "Las respuestas b y c"], c: 3, e: "1 000 W × 1 h = 1 W × 1 000 h = 1 kWh." },
        { t: "num", p: "Un televisor de 100 W funciona 4 h al día durante 30 días. ¿Cuántos kWh consume?", r: 12, u: "kWh", e: "100 × 4 × 30 / 1 000 = 12 kWh." },
        { t: "num", p: "¿Cuántos julios son 1 kWh? (escribe el número)", r: 3600000, u: "", e: "1 000 × 3 600 = 3 600 000 J." },
        { t: "vf", p: "El kWh es una unidad de potencia.", c: false, e: "Es una unidad de energía (potencia × tiempo)." },
        { t: "om", p: "¿Qué cuenta el medidor de tu casa?", o: ["Los amperios", "Los kWh consumidos", "Los voltios", "Los hertz"], c: 1, e: "Acumula la energía consumida en kWh." }
      ],
      res: ["1 kWh = 1 000 W durante 1 hora = 3,6 MJ.", "E (kWh) = W × horas / 1 000.", "Una casa típica consume de 100 a 400 kWh al mes.", "El medidor acumula los kWh como un odómetro.", "El kWh es energía, no potencia: no se escribe kW/h."]
    },
    {
      id: "6-5", t: "Leer tu recibo de luz", d: "Lecturas del medidor, periodo, tarifa, escalones, cargos fijos e impuestos. Recibo de ejemplo anotado.", min: 45, e: true, calc: "C5",
      preg: "¿Por qué si consumes un poco más, a veces el recibo sube mucho más de lo esperado?",
      obj: ["Identificar las partes de un recibo de luz.", "Calcular el costo de la energía con tarifa fija y con escalones.", "Entender los cargos fijos, impuestos y subsidios."],
      txt: `Cada compañía y cada país tienen un formato de recibo distinto, pero casi todos contienen la misma información. Vamos a leer un **recibo de ejemplo** (con cifras inventadas en una moneda genérica «$»).

## Un recibo de ejemplo
| Concepto | Valor |
|---|---|
| Periodo | 1 de marzo – 30 de abril (61 días) |
| Lectura actual del medidor | 18 452 kWh |
| Lectura anterior | 18 152 kWh |
| **Consumo** | **300 kWh** |
| Energía: primeros 150 kWh a $1,00 | $150,00 |
| Energía: siguientes 130 kWh a $1,30 | $169,00 |
| Energía: 20 kWh excedentes a $3,80 | $76,00 |
| Cargo fijo | $40,00 |
| Subtotal | $435,00 |
| Impuestos (16 %) | $69,60 |
| **Total a pagar** | **$504,60** |

## Las partes del recibo
1. **Periodo de facturación:** cuántos días abarca (30, 60…). Para comparar recibos, divide el consumo entre los días.
2. **Lecturas del medidor:** el consumo es la **diferencia** entre la lectura actual y la anterior: 18 452 − 18 152 = 300 kWh.
3. **Tarifa:** el precio por kWh. Puede ser:
   - **Fija:** el mismo precio para todos los kWh.
   - **Por escalones (bloques):** los primeros kWh son más baratos y los siguientes más caros. Muchos países subsidian un consumo básico y cobran más el excedente.
   - **Horaria:** distinta según la hora del día (más cara en horas punta).
4. **Cargo fijo:** se paga aunque no consumas nada; cubre el medidor, la lectura y la conexión.
5. **Impuestos y otros cargos:** IVA, alumbrado público, derechos, etc.
6. **Historial de consumo:** muchos recibos traen una gráfica de los últimos meses. ¡Úsala para detectar aumentos!

## La respuesta a la pregunta inicial
Con tarifas por escalones, el **último** kWh que consumes es el más caro. En el ejemplo, los 20 kWh excedentes cuestan $3,80 cada uno: casi cuatro veces más que los primeros. Si un mes consumes 30 kWh más por usar más el aire acondicionado, esos 30 kWh se cobran al precio más alto. Además, en algunos países, si superas un límite durante varios meses, pierdes el subsidio y **todos** los kWh pasan a pagarse a tarifa alta.

## Cómo calcular con escalones
1. Reparte el consumo en los tramos, de abajo hacia arriba.
2. Multiplica los kWh de cada tramo por su precio.
3. Suma, añade el cargo fijo y los impuestos.

Ejemplo: 300 kWh con tramos de 150 a $1,00; hasta 280 a $1,30; el resto a $3,80.
- 150 × 1,00 = 150.
- 130 × 1,30 = 169.
- 20 × 3,80 = 76.
- Energía: 395. Con cargo fijo (40): 435. Con impuestos (16 %): 504,60.

## Usa la calculadora
La calculadora C5 admite tarifas fijas y por escalones (escribe los tramos como «150:1,0; 280:1,3; :3,8») y un cargo fijo. Pon tus propios aparatos y la tarifa de tu recibo para estimar tu consumo.

?> Las tarifas reales cambian según el país, la región, la temporada y la compañía. Usa siempre los precios de tu propio recibo.`,
      form: [["Consumo (kWh) = lectura actual − lectura anterior", "Energía facturada en el periodo."], ["Costo = Σ (kWh de cada tramo × precio del tramo) + cargo fijo + impuestos", "Cálculo con tarifa por escalones."]],
      ej: { enun: "Un recibo de 30 días marca un consumo de 180 kWh. Tarifa: primeros 75 kWh a $1,00, de 76 a 140 a $1,30 y el resto a $3,80; cargo fijo $25; impuestos 16 %. ¿Total?", pasos: ["Tramo 1: 75 × 1,00 = 75.", "Tramo 2: 65 × 1,30 = 84,50.", "Tramo 3: 40 × 3,80 = 152.", "Energía: 311,50; con cargo fijo: 336,50.", "Impuestos: 336,50 × 0,16 = 53,84. Total: 390,34."], res: "Total: $390,34. Consumo diario: 180 / 30 = 6 kWh." },
      vida: "Si tu tarifa tiene escalones, reducir unos pocos kWh al final del periodo puede ahorrar mucho, porque son los kWh más caros.",
      err: ["Comparar recibos de periodos de distinta duración sin dividir entre los días.", "Pensar que todos los kWh cuestan lo mismo cuando la tarifa tiene escalones.", "Olvidar el cargo fijo y los impuestos al estimar el costo."],
      ejer: [["Lecturas: 5 230 y 5 470 kWh. ¿Consumo?", "240 kWh."], ["Tarifa fija de $2 por kWh, consumo 150 kWh, cargo fijo $30. ¿Total sin impuestos?", "$330."], ["Un recibo bimestral (60 días) marca 360 kWh. ¿Consumo diario?", "6 kWh por día."]],
      quiz: [
        { t: "num", p: "La lectura actual es 18 452 kWh y la anterior 18 152 kWh. ¿Cuál es el consumo?", r: 300, u: "kWh", e: "18 452 − 18 152 = 300 kWh." },
        { t: "om", p: "En una tarifa por escalones, los últimos kWh consumidos…", o: ["Son gratis", "Suelen ser los más caros", "Cuestan lo mismo que los primeros", "No se cobran"], c: 1, e: "Los tramos altos tienen precios mayores." },
        { t: "num", p: "Consumo de 100 kWh: primeros 75 a $1 y el resto a $2. ¿Costo de la energía?", r: 125, u: "", e: "75 × 1 + 25 × 2 = 125." },
        { t: "vf", p: "El cargo fijo se paga aunque no consumas nada.", c: true, e: "Cubre el servicio, el medidor y la conexión." },
        { t: "om", p: "Para comparar el consumo de dos recibos de periodos distintos, conviene…", o: ["Comparar el total a pagar", "Dividir el consumo entre los días del periodo", "Comparar el cargo fijo", "Mirar solo los impuestos"], c: 1, e: "El consumo diario permite comparar periodos distintos." }
      ],
      res: ["El consumo es la diferencia entre dos lecturas del medidor.", "Las tarifas pueden ser fijas, por escalones u horarias.", "Con escalones, los últimos kWh son los más caros.", "Al total se suman el cargo fijo y los impuestos.", "Compara recibos usando el consumo diario."]
    },
    {
      id: "6-6", t: "Consumo y costo de cada aparato", d: "Método paso a paso: W × h/día × días ÷ 1 000 × tarifa.", min: 45, e: true, calc: "C5",
      preg: "Si quisieras bajar tu recibo un 20 %, ¿qué aparato apagarías primero?",
      obj: ["Calcular el consumo mensual y el costo de cada aparato.", "Identificar los aparatos que más pesan en el recibo.", "Hacer un inventario energético de la casa."],
      txt: `Para reducir el recibo primero hay que saber **dónde se va la energía**. El método es sencillo y lo puedes aplicar a cada aparato.

## El método en cuatro pasos
1. **Potencia (W):** de la placa de datos o de un medidor de enchufe.
2. **Horas de uso al día:** estímalas con honestidad. Para aparatos con ciclos (refrigerador, aire acondicionado) usa las horas equivalentes de funcionamiento.
3. **Días de uso al mes.**
4. **Cálculo:**

= kWh al mes = W × horas/día × días / 1 000
= Costo = kWh × tarifa

## Ejemplos (tarifa de ejemplo: $1,50 por kWh)
| Aparato | W | h/día | Días | kWh/mes | Costo/mes |
|---|---|---|---|---|---|
| Refrigerador | 150 | 10 | 30 | 45 | $67,50 |
| Aire acondicionado | 1 200 | 6 | 30 | 216 | $324,00 |
| Televisor | 100 | 4 | 30 | 12 | $18,00 |
| 6 focos LED | 54 | 5 | 30 | 8,1 | $12,15 |
| Lavadora | 500 | 1 | 8 | 4 | $6,00 |
| Plancha | 1 200 | 0,5 | 8 | 4,8 | $7,20 |
| Microondas | 1 200 | 0,25 | 30 | 9 | $13,50 |
| Módem de internet | 10 | 24 | 30 | 7,2 | $10,80 |
| Computadora portátil | 60 | 6 | 22 | 7,9 | $11,88 |

Total aproximado: unos **314 kWh**. El aire acondicionado, por sí solo, representa casi el **70 %**.

## La respuesta a la pregunta inicial
En casi todas las casas, los grandes consumidores son:
1. **Climatización:** aire acondicionado, calefactores eléctricos.
2. **Agua caliente eléctrica:** calentadores y regaderas eléctricas.
3. **Refrigeración:** refrigeradores y congeladores, sobre todo los viejos.
4. **Cocina eléctrica:** hornos, estufas, hervidores muy usados.
5. **Consumos permanentes:** aparatos en espera, módems de internet, decodificadores (lección 6.7).

La iluminación LED y los cargadores suelen pesar poco. Para bajar un 20 %, ataca primero los grandes: un grado más en el termostato del aire acondicionado, menos tiempo de calentador, un refrigerador eficiente y bien regulado.

## Hazlo con la calculadora
La calculadora C5 trae una lista de aparatos típicos que puedes modificar, agregar o quitar. Muestra el consumo de cada uno, el total y una **gráfica de reparto** que señala cuál consume más. Puedes usar tarifa fija o por escalones, y tu moneda y tarifa de Ajustes.

## Comprueba con tu recibo
Si tu estimación da muy distinto de lo que marca el recibo:
- Revisa las horas de uso (solemos subestimarlas).
- Piensa en aparatos olvidados (bomba de agua, calentador, congelador).
- Considera los consumos en espera.
- Si la diferencia es enorme, podría haber una **fuga** en la instalación o un problema con el medidor: consulta a un electricista o a la compañía.`,
      form: [["kWh/mes = W × h/día × días / 1 000", "Consumo mensual de un aparato."], ["Costo = kWh × tarifa", "Costo de la energía (sin cargos fijos ni escalones)."], ["% de un aparato = kWh del aparato / kWh total × 100", "Peso en el recibo."]],
      ej: { enun: "Un calefactor de 1 500 W se usa 3 h al día durante 30 días. Con una tarifa de $1,80 por kWh, ¿cuánto cuesta al mes?", pasos: ["kWh = 1 500 × 3 × 30 / 1 000 = 135 kWh.", "Costo = 135 × 1,80 = $243.", "Si se usa 2 h en lugar de 3: 90 kWh y $162: ahorro de $81 al mes."], res: "135 kWh y $243 al mes; reducir una hora diaria ahorra $81." },
      vida: "Muchas compañías ofrecen calculadoras de consumo en sus sitios web. La C5 de este curso funciona igual, pero sin conexión y con tus propias tarifas.",
      err: ["Usar la potencia máxima de aparatos que funcionan por ciclos como si estuvieran siempre al máximo.", "Olvidar los aparatos que funcionan las 24 horas.", "Concentrarse en apagar focos LED mientras el aire acondicionado consume el 70 %."],
      ejer: [["Un hervidor de 2 000 W, 10 min al día, 30 días: ¿kWh?", "2 000 × (1/6) × 30 / 1 000 = 10 kWh."], ["Un congelador de 200 W que funciona 12 h al día: ¿kWh al mes?", "72 kWh."], ["Si tu consumo es de 300 kWh y el aire acondicionado gasta 210, ¿qué porcentaje representa?", "70 %."]],
      quiz: [
        { t: "num", p: "Un aire acondicionado de 1 200 W funciona 6 h al día durante 30 días. ¿kWh al mes?", r: 216, u: "kWh", e: "1 200 × 6 × 30 / 1 000 = 216 kWh." },
        { t: "num", p: "Si la tarifa es de $1,50/kWh, ¿cuánto cuestan 216 kWh?", r: 324, u: "", e: "216 × 1,5 = 324." },
        { t: "om", p: "En la mayoría de las casas, ¿qué suele consumir más?", o: ["Los cargadores de celular", "La climatización y el agua caliente eléctrica", "Los focos LED", "Los relojes"], c: 1, e: "Los aparatos de calor y frío son los mayores consumidores." },
        { t: "vf", p: "Para bajar el recibo, lo más eficaz suele ser reducir el uso de los aparatos de mayor consumo mensual.", c: true, e: "Hay que atacar donde más energía se va." },
        { t: "num", p: "Un módem de internet de 10 W encendido todo el mes (30 días). ¿kWh?", r: 7.2, u: "kWh", e: "10 × 24 × 30 / 1 000 = 7,2 kWh." }
      ],
      res: ["kWh/mes = W × horas/día × días / 1 000.", "Costo = kWh × tarifa (más cargos y escalones).", "La climatización y el agua caliente suelen ser los mayores consumos.", "Los aparatos siempre encendidos suman bastante.", "Un inventario con la calculadora C5 muestra dónde ahorrar."]
    },
    {
      id: "6-7", t: "Consumo fantasma (en espera)", d: "Aparatos que consumen apagados y cómo estimarlo.", min: 30, calc: "C6",
      preg: "¿Gasta electricidad la televisión cuando la apagas con el control remoto?",
      obj: ["Explicar qué es el consumo en espera.", "Estimar su costo anual.", "Aplicar medidas para reducirlo."],
      txt: `Muchos aparatos **siguen consumiendo energía aunque estén «apagados»**, mientras sigan enchufados. Es el [[consumo fantasma]] o consumo en espera.

## ¿Por qué consumen?
- La **televisión** apagada con el control sigue esperando la señal del control remoto.
- El **microondas** y el horno mantienen encendido el reloj.
- Los **cargadores** enchufados sin celular siguen alimentando su circuito interno (aunque los modernos gastan muy poco).
- **Decodificadores, consolas, impresoras y bocinas** mantienen funciones de red o de actualización.
- Los **transformadores** de los adaptadores antiguos tienen pérdidas aunque no se use la salida.

## ¿Cuánto es?
Un aparato moderno en espera suele consumir **0,5 a 2 W**; los antiguos o algunos decodificadores, **5 a 20 W**. Parece poco, pero se acumula **24 horas al día, 365 días al año**:

= kWh/año = W en espera × horas al día en espera × 365 / 1 000

Ejemplo: 8 aparatos con 3 W de promedio, 20 h al día en espera:
- 3 × 20 × 365 × 8 / 1 000 = **175 kWh al año**.
- Con $1,50 por kWh: **$263 al año** por no hacer nada.

En muchas casas, el consumo en espera representa entre el **5 y el 10 %** del recibo.

## Cómo detectarlo
- Un **medidor de enchufe** muestra la potencia de un aparato apagado.
- **Truco del medidor:** con todo apagado (pero enchufado), mira si la rueda o la luz del medidor de la casa sigue moviéndose o parpadeando, y cuánto marca en una hora.
- Los aparatos con luces, relojes o que responden al control remoto **siempre** consumen algo.

## Cómo reducirlo
1. **Regletas con interruptor:** apaga de un golpe la televisión, el decodificador, la consola y las bocinas.
2. **Desenchufa** los aparatos que usas poco (la impresora, el microondas si no usas su reloj, cargadores sin celular).
3. Configura los aparatos en el modo de **bajo consumo** en espera (algunas consolas y televisores tienen «inicio rápido» que gasta mucho más).
4. Al comprar, revisa el **consumo en espera** en la ficha técnica; muchas normas exigen menos de 0,5–1 W.

?> No desenchufes el refrigerador, el congelador ni los equipos médicos o de seguridad: deben funcionar siempre.

## Usa la calculadora
La calculadora C6 estima el consumo fantasma anual y su costo con la tarifa de tus Ajustes.`,
      form: [["kWh/año = W × h/día × 365 × n / 1 000", "Consumo anual en espera de n aparatos."]],
      ej: { enun: "Un decodificador consume 12 W en espera durante 20 h al día. ¿Cuántos kWh y cuánto dinero gasta al año con $1,50/kWh?", pasos: ["kWh/año = 12 × 20 × 365 / 1 000 = 87,6 kWh.", "Costo = 87,6 × 1,50 = $131,40."], res: "87,6 kWh y unos $131 al año solo en espera." },
      vida: "Si de noche miras tu sala a oscuras y cuentas las lucecitas encendidas, cada una es un aparato que consume algo. Una regleta con interruptor las apaga todas.",
      err: ["Pensar que un aparato apagado con el control no consume nada.", "Desenchufar aparatos que deben estar siempre encendidos (refrigerador).", "Creer que el consumo en espera es insignificante sin calcularlo."],
      ejer: [["Un microondas consume 2 W en espera las 24 h. ¿kWh al año?", "17,5 kWh."], ["10 aparatos a 1 W en espera las 24 h: ¿kWh al año?", "87,6 kWh."], ["Menciona dos formas de reducir el consumo en espera.", "Usar regletas con interruptor y desenchufar los aparatos poco usados."]],
      quiz: [
        { t: "vf", p: "Una televisión apagada con el control remoto sigue consumiendo algo de energía.", c: true, e: "Espera la señal del control." },
        { t: "num", p: "Un aparato consume 5 W en espera las 24 h todo el año. ¿Cuántos kWh al año?", r: 43.8, u: "kWh", e: "5 × 24 × 365 / 1 000 = 43,8 kWh." },
        { t: "om", p: "¿Cuál es una buena medida contra el consumo fantasma?", o: ["Desenchufar el refrigerador", "Usar regletas con interruptor", "Dejar todo en espera", "Comprar más cargadores"], c: 1, e: "Permiten cortar varios aparatos a la vez." },
        { t: "om", p: "El consumo en espera de una casa suele representar…", o: ["Más del 50 % del recibo", "Entre el 5 y el 10 %", "Exactamente 0 %", "El 100 %"], c: 1, e: "Típicamente un 5–10 %." },
        { t: "vf", p: "Se debe desenchufar el refrigerador por la noche para ahorrar.", c: false, e: "Debe funcionar siempre para conservar los alimentos." }
      ],
      res: ["Muchos aparatos consumen aunque estén apagados, si siguen enchufados.", "Cada uno gasta poco, pero 24 horas al día todo el año.", "Puede ser el 5–10 % del recibo.", "Regletas con interruptor y desenchufar lo poco usado lo reducen.", "El refrigerador y los equipos de seguridad deben seguir conectados."]
    },
    {
      id: "6-8", t: "Eficiencia, efecto Joule y ahorro", d: "Calor por efecto Joule, LED frente a incandescente, etiquetas de eficiencia y hábitos.", min: 40, sim: "S5", calc: "C17",
      preg: "¿Por qué un foco LED de 9 W ilumina igual que uno incandescente de 60 W?",
      obj: ["Definir la eficiencia y calcularla.", "Explicar el efecto Joule y sus usos y pérdidas.", "Calcular el ahorro de cambiar a tecnologías eficientes."],
      txt: `Ningún aparato convierte toda la energía eléctrica en lo que queremos. Una parte se «pierde», casi siempre como **calor**. La [[eficiencia]] mide qué porcentaje se aprovecha:

= Eficiencia (%) = energía útil / energía consumida × 100

## El efecto Joule
Cuando la corriente atraviesa una resistencia, los choques de los electrones con los átomos la calientan. Es el [[efecto Joule]], descubierto por James Joule en 1841:

= P(calor) = I² · R

- **Cuando lo queremos:** planchas, hervidores, tostadores, estufas, secadoras y calentadores son resistencias diseñadas para calentarse. Su eficiencia para producir calor es casi del 100 %.
- **Cuando es una pérdida:** el calor en los cables, los transformadores, los motores y los focos es energía desperdiciada. Además, calienta y desgasta los aparatos.

## La respuesta a la pregunta inicial: focos
Un **foco incandescente** produce luz calentando un filamento a 2 500 °C. Solo un **5 %** de la energía sale como luz visible; el **95 %** es calor. Un **LED** produce luz directamente en un semiconductor, con mucho menos calor: su eficiencia luminosa es de 5 a 8 veces mayor.

| Tipo de foco | Potencia para unos 800 lúmenes | Vida útil |
|---|---|---|
| Incandescente | 60 W | 1 000 h |
| Halógeno | 43 W | 2 000 h |
| Fluorescente compacto | 13–15 W | 8 000 h |
| LED | 8–10 W | 15 000–25 000 h |

La luz se mide en **lúmenes** (lm), no en watts. Al comprar, compara lúmenes, no watts.

## Cuánto se ahorra
Cambiar un foco de 60 W por un LED de 9 W, encendido 5 h al día:
- Ahorro diario: (60 − 9) × 5 = 255 Wh.
- Ahorro anual: 255 × 365 / 1 000 ≈ **93 kWh** por foco.
- Con 10 focos y $2 por kWh: **930 kWh y $1 860 al año**. Si cada LED cuesta $40, la inversión de $400 se recupera en menos de 3 meses.

La calculadora C17 hace este cálculo con tus datos.

## Etiquetas de eficiencia energética
Refrigeradores, lavadoras, aires acondicionados y otros aparatos llevan una **etiqueta de eficiencia** con:
- Una **escala** (por ejemplo, de A a G, o con estrellas), donde la mejor clase es la más eficiente.
- El **consumo anual estimado en kWh**.

Un refrigerador de 15 años puede consumir el doble que uno nuevo eficiente. A veces el ahorro paga el aparato nuevo en pocos años.

## Hábitos de ahorro que funcionan
1. **Aire acondicionado:** cada grado de más en el termostato (en modo frío) ahorra alrededor de un 5–8 %. Mantén puertas y ventanas cerradas y filtros limpios.
2. **Refrigerador:** no lo pongas junto a la estufa ni al sol; no metas comida caliente; revisa los empaques de la puerta.
3. **Agua caliente:** duchas más cortas, calentador a 50–55 °C.
4. **Lavado:** cargas completas y agua fría cuando sea posible.
5. **Plancha:** planchar mucha ropa de una vez, no prenda por prenda.
6. **Iluminación:** LED y aprovechar la luz natural.
7. **Consumo fantasma:** regletas con interruptor (lección 6.7).

## Eficiencia de otros aparatos
- Motor eléctrico: 80–96 %.
- Transformador grande: 98–99 %.
- Cargador moderno: 85–95 %.
- Panel solar: 18–23 % (de la luz que recibe).
- Motor de gasolina: 25–35 %.`,
      form: [["Eficiencia = E útil / E consumida × 100", "Porcentaje de energía aprovechada."], ["P(calor) = I² · R", "Efecto Joule."], ["Ahorro (kWh/año) = (W viejo − W nuevo) × h/día × 365 / 1 000", "Ahorro al cambiar un aparato por otro más eficiente."]],
      ej: { enun: "Un motor consume 1 000 W y entrega 850 W de potencia mecánica. ¿Cuál es su eficiencia y cuánta potencia se pierde como calor?", pasos: ["Eficiencia = 850 / 1 000 × 100 = 85 %.", "Pérdidas = 1 000 − 850 = 150 W, en forma de calor."], res: "85 % de eficiencia y 150 W de pérdidas." },
      vida: "La parte trasera del refrigerador está tibia: ahí suelta el calor que saca del interior. Si la pegas a la pared sin espacio, trabaja más y consume más.",
      err: ["Comparar focos por los watts y no por los lúmenes.", "Pensar que el calor de un foco «no cuesta»: es energía pagada que no ilumina.", "Creer que un aparato nuevo siempre se paga solo: hay que hacer la cuenta."],
      ejer: [["Un foco de 100 W produce 5 W de luz. ¿Eficiencia?", "5 %."], ["¿Cuántos kWh al año ahorra cambiar un foco de 60 W por uno de 9 W usado 3 h al día?", "(51 × 3 × 365) / 1 000 ≈ 55,8 kWh."], ["Un refrigerador viejo gasta 900 kWh/año y uno nuevo 350. ¿Ahorro anual con $2/kWh?", "550 kWh y $1 100."]],
      quiz: [
        { t: "om", p: "¿Qué porcentaje de la energía de un foco incandescente se convierte en luz?", o: ["Alrededor del 5 %", "Alrededor del 50 %", "Alrededor del 95 %", "El 100 %"], c: 0, e: "El 95 % se va como calor." },
        { t: "num", p: "Un motor consume 2 000 W y entrega 1 700 W útiles. ¿Eficiencia (%)?", r: 85, u: "", e: "1 700 / 2 000 × 100 = 85 %." },
        { t: "om", p: "Para comparar la luz de dos focos hay que fijarse en…", o: ["Los watts", "Los lúmenes", "Los voltios", "El color de la caja"], c: 1, e: "Los lúmenes miden la luz emitida." },
        { t: "vf", p: "El efecto Joule es siempre una pérdida indeseada.", c: false, e: "En planchas, estufas y hervidores es justamente lo que queremos." },
        { t: "num", p: "Cambiar un foco de 60 W por uno de 9 W usado 5 h al día. ¿kWh ahorrados al año?", r: 93.08, u: "kWh", e: "(60 − 9) × 5 × 365 / 1 000 ≈ 93 kWh." }
      ],
      res: ["Eficiencia = energía útil / energía consumida.", "El efecto Joule (P = I²R) es útil en calefactores y una pérdida en cables y focos.", "Un LED da la misma luz con 5–8 veces menos energía que un incandescente.", "Las etiquetas de eficiencia indican el consumo anual en kWh.", "Los mayores ahorros están en climatización, agua caliente y refrigeración."]
    }
  ]
});
