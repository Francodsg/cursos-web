// M9. Baterías y almacenamiento de energía
registrarModulo({
  id: "m9", n: 9, nivel: 2, titulo: "Baterías y almacenamiento de energía", quizMin: 25, quizN: 15, minEsperado: 315,
  objetivo: "Explicar cómo funciona una batería, comparar sus tipos, calcular capacidad y autonomía, y entender la carga, la descarga, la seguridad y el reciclaje.",
  clave: "pila bateria litio alcalina nimh plomo mah wh capacidad autonomia carga descarga reciclaje supercapacitor",
  actividades: ["Comparar las etiquetas de 5 baterías de tu casa (voltaje, mAh, Wh, química).", "Hacer la pila de limones y medir el voltaje de cada celda.", "Elaborar una ficha «cómo alargar la vida de la batería de tu celular» con lo aprendido."],
  ejemplos: ["Batería externa de 10 000 mAh a 3,7 V = 37 Wh: unas 2 cargas de un celular de 4 000 mAh considerando pérdidas.", "Pack 3S2P de celdas de 2 500 mAh = 11,1 V y 5 Ah."],
  sims: ["S12"], calcs: ["C7", "C14"], gen: ["bateria", "wh"],
  evaluacion: "Quiz de módulo de 15 preguntas (25 min) con cálculos de capacidad y autonomía con valores aleatorios. Se aprueba con el 70 %. Al aprobar M5–M9 obtienes el certificado del Nivel 2.",
  extra: [
    { t: "om", p: "¿Qué tipo de batería tienen casi todos los celulares actuales?", o: ["Alcalina", "Plomo-ácido", "Litio-ion", "Zinc-carbono"], c: 2, e: "Litio-ion (o litio-polímero), por su alta densidad de energía.", lec: "9-3" },
    { t: "vf", p: "Las pilas usadas se pueden tirar a la basura común sin problema.", c: false, e: "Contienen metales que contaminan: se llevan a puntos de recolección.", lec: "9-7" }
  ],
  lecciones: [
    {
      id: "9-1", t: "Cómo funciona una pila", d: "Reacción redox, ánodo, cátodo, electrolito y separador.", min: 40, e: true, sim: "S12",
      preg: "¿De dónde sacan su energía las pilas si no están conectadas a nada?",
      obj: ["Describir las partes de una celda electroquímica.", "Explicar cómo una reacción química produce voltaje.", "Distinguir pila primaria y batería recargable."],
      txt: `Una [[pila]] o [[batería]] guarda energía **química** y la convierte en **energía eléctrica** cuando cierras el circuito. Su unidad básica es la [[celda]] electroquímica.

## Partes de una celda
1. **Ánodo (electrodo negativo durante la descarga):** un material que **cede electrones** fácilmente, por ejemplo zinc o litio.
2. **Cátodo (electrodo positivo):** un material que **acepta electrones**, por ejemplo dióxido de manganeso o un óxido de cobalto.
3. **Electrolito:** una sustancia (líquida, en pasta o sólida) que deja pasar **iones** pero **no electrones**.
4. **Separador:** una membrana porosa que impide que ánodo y cátodo se toquen (cortocircuito interno).

## Cómo produce electricidad
La reacción química que «quiere» ocurrir es que los electrones pasen del ánodo al cátodo. Pero el electrolito **no deja pasar electrones**: solo iones. Entonces:
1. En el **ánodo** ocurre una **oxidación**: el material pierde electrones, que se acumulan en el terminal negativo.
2. Los electrones solo pueden llegar al cátodo **por fuera**, a través del circuito que conectes: ¡esa es la corriente eléctrica que enciende tu linterna!
3. En el **cátodo** ocurre una **reducción**: el material recibe los electrones.
4. Mientras tanto, los **iones** viajan por el electrolito para mantener el equilibrio de cargas dentro de la pila.

Al conjunto de oxidación y reducción se le llama reacción **redox**. Si no hay circuito, los electrones no tienen por dónde ir y la reacción se detiene (casi): por eso una pila guardada dura años.

## ¿De qué depende el voltaje?
El voltaje de una celda depende de **qué materiales** forman el ánodo y el cátodo, no de su tamaño:
- Zinc–dióxido de manganeso (alcalina): **1,5 V**.
- Níquel–hidruro metálico (NiMH): **1,2 V**.
- Plomo–dióxido de plomo (batería de auto): **2,0 V** por celda.
- Litio–óxido de cobalto (celular): **3,6–3,7 V**.

Una pila AAA y una D tienen el mismo voltaje (1,5 V): la D es más grande y tiene más **capacidad** (dura más), no más voltaje. Para más voltaje se ponen celdas **en serie**: una batería de 9 V tiene seis celdas de 1,5 V; una de auto, seis de 2 V.

## La resistencia interna
Una pila real tiene una pequeña **resistencia interna**. Cuando entrega mucha corriente, parte del voltaje se pierde dentro y la pila se calienta. Por eso una pila débil puede marcar 1,4 V sin carga y caer a 1,0 V al encender un motor.

## Primarias y recargables
- **Pilas primarias** (desechables): su reacción no se puede invertir de forma segura. Ejemplos: alcalinas, zinc-carbono, de litio de botón.
- **Baterías secundarias** (recargables): al aplicar una corriente en sentido contrario, la reacción se **invierte** y la batería recupera su energía química. Ejemplos: litio-ion, NiMH, plomo-ácido.`,
      form: [["Energía química → energía eléctrica", "Una pila convierte energía mediante una reacción redox."], ["V terminal = V celda − I · R interna", "El voltaje baja cuando la pila entrega mucha corriente."]],
      ej: { enun: "Una pila de 1,5 V tiene una resistencia interna de 0,5 Ω. ¿Qué voltaje entrega cuando alimenta un motor que pide 0,6 A?", pasos: ["Caída interna = I × R interna = 0,6 × 0,5 = 0,3 V.", "V terminal = 1,5 − 0,3 = 1,2 V.", "Además, la pila disipa 0,6² × 0,5 = 0,18 W de calor por dentro."], res: "Entrega 1,2 V; los otros 0,3 V se pierden en su resistencia interna." },
      vida: "Si dejas el control remoto encendido sin querer, la pila no se gasta; pero si una tecla se queda pegada, el circuito se cierra y la reacción química avanza hasta agotarla.",
      err: ["Creer que una pila grande tiene más voltaje que una pequeña de la misma química.", "Pensar que la pila «guarda electricidad»: guarda energía química.", "Recargar pilas alcalinas desechables."],
      ejer: [["¿Qué parte de la pila deja pasar iones pero no electrones?", "El electrolito."], ["¿Cuántas celdas alcalinas tiene una batería de 9 V?", "Seis de 1,5 V en serie."], ["¿Por qué una pila guardada dura años sin gastarse?", "Porque sin circuito los electrones no pueden pasar del ánodo al cátodo y la reacción casi no avanza."]],
      quiz: [
        { t: "om", p: "En una pila, el electrolito deja pasar…", o: ["Electrones", "Iones", "Luz", "Nada"], c: 1, e: "Los electrones van por el circuito exterior; los iones, por el electrolito." },
        { t: "om", p: "El voltaje de una celda depende principalmente de…", o: ["Su tamaño", "Los materiales de sus electrodos", "Su color", "Su precio"], c: 1, e: "La química define el voltaje; el tamaño, la capacidad." },
        { t: "vf", p: "Una pila AAA y una D alcalinas tienen el mismo voltaje.", c: true, e: "Ambas son de 1,5 V; la D tiene más capacidad." },
        { t: "num", p: "Una pila de 1,5 V con 0,5 Ω de resistencia interna entrega 0,4 A. ¿Qué voltaje queda en sus terminales?", r: 1.3, u: "V", e: "1,5 − 0,4 × 0,5 = 1,3 V." },
        { t: "om", p: "¿Cuál de estas es una batería recargable?", o: ["Alcalina AA", "Zinc-carbono", "Litio-ion", "Pila de botón de litio desechable"], c: 2, e: "La reacción del litio-ion se puede invertir." }
      ],
      res: ["Una pila convierte energía química en eléctrica mediante una reacción redox.", "Ánodo, cátodo, electrolito y separador son sus partes.", "Los electrones van por fuera (corriente) y los iones por dentro.", "El voltaje depende de la química; el tamaño, de la capacidad.", "Las primarias son desechables; las secundarias, recargables."]
    },
    {
      id: "9-2", t: "De Volta al litio", d: "Pila voltaica (1800), Daniell, Planté, alcalina y litio-ion (Nobel de Química 2019).", min: 25,
      preg: "¿Cómo era la primera pila de la historia y qué tiene que ver con la de tu celular?",
      obj: ["Narrar la evolución histórica de las baterías.", "Relacionar cada invento con sus usos.", "Valorar el impacto del litio-ion."],
      txt: `La historia de las baterías es la historia de cómo la humanidad aprendió a **guardar electricidad** para usarla cuando y donde quisiera.

## 1780–1800: ranas y discos de metal
El médico italiano Luigi Galvani observó que las patas de una rana muerta se contraían al tocarlas con dos metales distintos. Creyó que era una «electricidad animal». [Alessandro Volta](#/personajes/volta) sospechó que la electricidad venía de los **dos metales** y no de la rana.

En **1800** lo demostró con la **pila voltaica**: una **pila** (montón) de discos alternos de **zinc y cobre** separados por cartón empapado en **salmuera**. Por primera vez se obtuvo una **corriente eléctrica continua y estable**. Por eso, en español, a las baterías pequeñas aún las llamamos «pilas».

## 1836: la pila Daniell
John Frederic Daniell separó los electrolitos del zinc y del cobre con una barrera porosa. Su pila daba un voltaje más estable (1,1 V) y fue la fuente de los **telégrafos** durante décadas.

## 1859: la primera recargable
El francés Gaston Planté inventó la **batería de plomo-ácido**: placas de plomo en ácido sulfúrico que se pueden **recargar**. Mejorada después, sigue siendo la batería de arranque de casi todos los autos.

## 1866–1950: pilas secas
Georges Leclanché creó la pila de **zinc-carbono**, cuyo electrolito luego se convirtió en una pasta: nació la **pila seca**, portátil y sin derrames. En los años cincuenta, Lewis Urry desarrolló la **pila alcalina**, con más capacidad y duración, que hoy encontramos en cualquier tienda.

## Siglo XX: níquel
Las baterías de **níquel-cadmio** (NiCd) y después de **níquel-hidruro metálico** (NiMH) permitieron las primeras herramientas, cámaras y teléfonos portátiles recargables.

## 1991: la revolución del litio
El litio es el metal más ligero y el que más fácilmente cede electrones. Tras investigaciones de **Stanley Whittingham**, **John Goodenough** y **Akira Yoshino**, en **1991** Sony comercializó la primera batería de **litio-ion**: ligera, con mucha energía, sin «efecto memoria» y con cientos de ciclos de carga. Los tres investigadores recibieron el **Premio Nobel de Química en 2019**.

Sin el litio-ion no existirían los celulares inteligentes, las laptops ligeras, los drones ni los autos eléctricos modernos.

## Hoy y mañana
- **LiFePO₄** (litio-ferrofosfato): más segura y duradera, para autos y almacenamiento en casa.
- **Baterías de estado sólido:** sustituyen el electrolito líquido por uno sólido, menos inflamable.
- **Baterías de sodio-ion:** usan sodio, abundante y barato.
- **Baterías de flujo:** para almacenar grandes cantidades de energía en la red.`,
      vida: "Cuando dices «se acabó la pila del control», usas la palabra que nació con el «montón» de discos de Volta en el año 1800.",
      err: ["Creer que Galvani tenía razón con la «electricidad animal»: la corriente venía de los metales.", "Pensar que las baterías de plomo son obsoletas: siguen en casi todos los autos.", "Creer que el litio-ion es un invento de una sola persona."],
      ejer: [["¿Qué materiales usaba la pila de Volta?", "Discos de zinc y cobre separados por cartón con salmuera."], ["¿Quién inventó la batería recargable de plomo-ácido?", "Gaston Planté, en 1859."], ["¿Por qué el litio es tan bueno para baterías?", "Es el metal más ligero y cede electrones con mucha facilidad: da mucho voltaje y energía por kilo."]],
      quiz: [
        { t: "om", p: "¿En qué año presentó Volta su pila?", o: ["1752", "1800", "1859", "1991"], c: 1, e: "La pila voltaica es de 1800." },
        { t: "om", p: "La batería de plomo-ácido se usa hoy sobre todo en…", o: ["Celulares", "Autos", "Relojes", "Drones"], c: 1, e: "Es la batería de arranque de los autos." },
        { t: "vf", p: "Los creadores de la batería de litio-ion recibieron el Premio Nobel de Química en 2019.", c: true, e: "Goodenough, Whittingham y Yoshino." },
        { t: "ord", p: "Ordena cronológicamente:", o: ["Pila de Volta", "Batería de plomo-ácido de Planté", "Pila alcalina", "Batería de litio-ion comercial"], e: "1800, 1859, años cincuenta y 1991." },
        { t: "om", p: "¿Por qué en español llamamos «pilas» a las baterías pequeñas?", o: ["Por su forma cilíndrica", "Por la «pila» (montón) de discos de Volta", "Por el agua que contienen", "Por su inventor"], c: 1, e: "Viene del montón de discos apilados." }
      ],
      res: ["Volta creó la primera pila en 1800 con zinc, cobre y salmuera.", "Planté inventó la batería recargable de plomo-ácido en 1859.", "Las pilas secas y alcalinas hicieron portátil la electricidad.", "El litio-ion (1991, Nobel 2019) revolucionó la electrónica y el transporte.", "Hoy se desarrollan baterías más seguras, baratas y abundantes."]
    },
    {
      id: "9-3", t: "Tipos de baterías", d: "Zinc-carbono, alcalina, botón, plomo-ácido, NiMH, litio-ion y LiFePO₄; tabla comparativa.", min: 40, e: true, sim: "S12",
      preg: "¿Qué pila conviene usar en un control remoto y cuál en una cámara de fotos?",
      obj: ["Comparar las principales químicas de baterías.", "Elegir la batería adecuada según el uso.", "Interpretar la densidad de energía y el número de ciclos."],
      txt: `Hay muchos tipos de baterías, y cada uno tiene ventajas e inconvenientes. Estos son los más comunes:

| Tipo | Voltaje por celda | Recargable | Densidad de energía | Ciclos | Usos típicos |
|---|---|---|---|---|---|
| Zinc-carbono | 1,5 V | No | Baja | — | Relojes, controles, juguetes baratos |
| Alcalina | 1,5 V | No | Media | — | Controles, linternas, juguetes |
| Litio de botón (CR2032) | 3 V | No | Alta | — | Relojes, placas base, llaves de auto |
| Plomo-ácido | 2,0 V | Sí | Baja (pesada) | 200–1 000 | Autos, no-break, alarmas |
| NiMH | 1,2 V | Sí | Media | 500–1 000 | Pilas AA recargables, juguetes, cámaras |
| Litio-ion (NMC, LCO) | 3,6–3,7 V | Sí | Muy alta | 500–1 500 | Celulares, laptops, autos eléctricos |
| Litio-ferrofosfato (LiFePO₄) | 3,2 V | Sí | Alta | 2 000–6 000 | Almacenamiento solar, autos, herramientas |

## Conceptos para comparar
- **Densidad de energía:** cuánta energía guarda por kilogramo (Wh/kg). Las de litio-ion guardan unas **5 veces más** que las de plomo con el mismo peso.
- **Ciclos de vida:** cuántas veces se puede cargar y descargar antes de perder alrededor del 20 % de su capacidad.
- **Autodescarga:** cuánta carga pierden solas guardadas. Alcalinas: muy poca (duran años). NiMH antiguas: mucha (unas semanas); las de «baja autodescarga» son mucho mejores.
- **Corriente máxima:** algunas pueden entregar mucha corriente de golpe (plomo para el arranque, litio para herramientas); otras no (zinc-carbono).

## Elegir la adecuada
- **Bajo consumo y uso esporádico** (control remoto, reloj de pared): **alcalinas**; duran años y no se descargan solas.
- **Alto consumo frecuente** (control de videojuegos, juguetes, cámara, linterna potente): **NiMH recargables**: se amortizan pronto.
- **Celulares, laptops, drones:** **litio-ion** integradas.
- **Arranque de auto:** **plomo-ácido**.
- **Almacenamiento solar en casa:** **LiFePO₄**, por su seguridad y su gran número de ciclos.

## El «efecto memoria»
Las antiguas baterías de **níquel-cadmio** «recordaban» si se cargaban sin haberse descargado del todo y perdían capacidad. Las **NiMH** casi no lo sufren y las de **litio no lo tienen**. Con el litio, al contrario, es mejor **no descargarlas del todo** con frecuencia (lección 9.5).

## Pilas recargables AA: un detalle
Una pila NiMH da **1,2 V**, no 1,5 V. La mayoría de los aparatos funcionan bien igualmente, porque una alcalina pasa buena parte de su vida por debajo de 1,3 V. Algunos aparatos con indicador de batería pueden mostrar «baja» antes de tiempo.

## El cadmio y el mercurio
Las baterías de níquel-cadmio y las viejas pilas de mercurio contienen metales muy tóxicos. Por eso muchas están prohibidas o restringidas, y todas las pilas deben reciclarse (lección 9.7).`,
      form: [["Energía (Wh) = Voltaje (V) × Capacidad (Ah)", "Permite comparar baterías de distinta química."], ["Densidad (Wh/kg) = Energía / Masa", "Energía por unidad de peso."]],
      ej: { enun: "Compara la energía de una pila alcalina AA (1,5 V, 2 500 mAh) con una NiMH AA (1,2 V, 2 000 mAh).", pasos: ["Alcalina: 1,5 × 2,5 = 3,75 Wh.", "NiMH: 1,2 × 2,0 = 2,4 Wh.", "La alcalina guarda más por carga, pero la NiMH se puede recargar unas 500 veces: 500 × 2,4 = 1 200 Wh en su vida."], res: "3,75 Wh frente a 2,4 Wh por carga; la recargable entrega muchísima más energía a lo largo de su vida." },
      vida: "Las placas base de las computadoras llevan una pila de botón CR2032 que mantiene la hora cuando están apagadas; dura varios años.",
      err: ["Usar pilas recargables en un aparato que se usa una vez al año.", "Mezclar pilas alcalinas y recargables en el mismo aparato.", "Creer que las baterías de litio tienen efecto memoria."],
      ejer: [["¿Qué batería conviene para un control remoto?", "Alcalina: bajo consumo y poca autodescarga."], ["¿Cuál es el voltaje de una celda de litio-ion?", "3,6–3,7 V nominales."], ["Una batería de 12 V y 7 Ah, ¿cuánta energía guarda?", "84 Wh."]],
      quiz: [
        { t: "om", p: "¿Qué batería tiene mayor densidad de energía?", o: ["Plomo-ácido", "Litio-ion", "Zinc-carbono", "Alcalina"], c: 1, e: "Guarda mucha energía por kilogramo." },
        { t: "om", p: "El voltaje de una pila NiMH es…", o: ["1,5 V", "1,2 V", "3,7 V", "2,0 V"], c: 1, e: "1,2 V por celda." },
        { t: "vf", p: "Para un reloj de pared conviene una pila alcalina por su baja autodescarga.", c: true, e: "Consume poquísimo y dura años." },
        { t: "om", p: "¿Qué batería se usa en el arranque de casi todos los autos de combustión?", o: ["Litio-ion", "NiMH", "Plomo-ácido", "Alcalina"], c: 2, e: "Entrega mucha corriente y es barata." },
        { t: "num", p: "¿Cuántos Wh guarda una batería de 12 V y 7 Ah?", r: 84, u: "Wh", e: "12 × 7 = 84 Wh." }
      ],
      res: ["Cada química tiene su voltaje, densidad de energía y número de ciclos.", "Alcalinas para bajo consumo; NiMH recargables para alto consumo frecuente.", "Litio-ion en celulares y autos; LiFePO₄ para almacenamiento solar.", "Plomo-ácido para arranque de autos y no-breaks.", "Para comparar baterías, usa la energía en Wh."]
    },
    {
      id: "9-4", t: "Capacidad y autonomía", d: "mAh, Ah y Wh; Wh = Ah × V; tiempo ≈ capacidad / consumo; el límite de 100 Wh en aviones.", min: 45, e: true, calc: "C7",
      preg: "¿Cuántas veces puede cargar tu celular una batería externa de 10 000 mAh?",
      obj: ["Interpretar la capacidad en mAh, Ah y Wh.", "Calcular la autonomía de un aparato.", "Comparar baterías de distinto voltaje con Wh."],
      txt: `La [[capacidad de una batería]] indica **cuánta carga** puede entregar. Se expresa en **amperios-hora** (Ah) o **miliamperios-hora** (mAh): una batería de 1 Ah puede entregar 1 A durante 1 hora, o 0,5 A durante 2 horas, o 100 mA durante 10 horas.

## De mAh a autonomía
= Tiempo (h) ≈ Capacidad (mAh) / Consumo (mA)

Ejemplo: una pila AA de 2 500 mAh en un juguete que consume 250 mA durará unas **10 horas**. En la práctica dura algo menos, porque la capacidad real depende de la corriente y la temperatura.

## Los mAh no lo dicen todo: usa Wh
Dos baterías con los mismos mAh pueden guardar energías muy distintas si su voltaje es distinto. Para comparar, usa la **energía en watts-hora**:

= Energía (Wh) = Capacidad (Ah) × Voltaje (V) = mAh × V / 1 000

- Pila AA alcalina: 2,5 Ah × 1,5 V = **3,75 Wh**.
- Celular: 4 000 mAh × 3,85 V / 1 000 ≈ **15,4 Wh**.
- Laptop: unos **50–100 Wh**.
- Auto eléctrico: **40 000–100 000 Wh** (40–100 kWh).

## La respuesta a la pregunta inicial: la batería externa
Una batería externa de **10 000 mAh** usa celdas de litio de **3,7 V**:
- Energía: 10 × 3,7 = **37 Wh**.
- Para cargar el celular, eleva el voltaje a 5 V (USB) y luego el celular lo baja de nuevo a su batería: en esas conversiones se pierde alrededor de un **30–35 %**. Energía útil: unos **25 Wh**.
- El celular necesita unos 15,4 Wh: 25 / 15,4 ≈ **1,6 cargas**.

Por eso una batería externa de 10 000 mAh no carga **2,5 veces** un celular de 4 000 mAh, como sugeriría dividir los mAh, sino 1,5–2 veces.

## Autonomía a partir de la potencia
Si conoces la potencia del aparato:

= Tiempo (h) ≈ Energía (Wh) × eficiencia / Potencia (W)

Una laptop con batería de 60 Wh que consume 15 W de promedio durará unas **4 horas** (60 / 15).

## El límite de los aviones
Las aerolíneas limitan las baterías de litio en la cabina, normalmente a **100 Wh** por batería sin permiso especial, y prohíben llevarlas en la maleta facturada, por riesgo de incendio. Una batería externa de 20 000 mAh a 3,7 V tiene 74 Wh: se puede llevar en la cabina. Una de 30 000 mAh tiene 111 Wh: necesita autorización.

## Usa la calculadora
La calculadora C7 calcula la energía y la autonomía a partir de la capacidad, el voltaje, el consumo (en mA o en W) y la eficiencia. La C14 convierte mAh en Wh y viceversa.`,
      form: [["Tiempo (h) ≈ mAh / mA", "Autonomía a partir de la corriente de consumo."], ["Wh = mAh × V / 1 000", "Energía de una batería."], ["Tiempo (h) ≈ Wh × η / W", "Autonomía a partir de la potencia y la eficiencia."]],
      ej: { enun: "Un dron usa una batería de 3 S (11,1 V) y 2 200 mAh. En vuelo consume 120 W. ¿Cuánta energía tiene y cuánto vuela (con un 80 % de aprovechamiento)?", pasos: ["Energía = 2 200 × 11,1 / 1 000 = 24,4 Wh.", "Energía útil = 24,4 × 0,8 = 19,5 Wh.", "Tiempo = 19,5 / 120 = 0,163 h ≈ 9,8 minutos."], res: "24,4 Wh y unos 10 minutos de vuelo." },
      vida: "Cuando tu celular dice que le quedan «5 horas», calcula la autonomía dividiendo la energía restante entre el consumo actual: por eso la estimación cambia si enciendes la cámara o el GPS.",
      err: ["Comparar baterías de distinto voltaje solo por los mAh.", "Pensar que una batería externa entrega toda su capacidad al celular: hay pérdidas.", "Llevar baterías de litio en la maleta facturada."],
      ejer: [["Una batería de 3 000 mAh alimenta un aparato de 150 mA. ¿Horas ideales?", "20 h."], ["¿Cuántos Wh tiene una batería de 20 000 mAh a 3,7 V?", "74 Wh."], ["Una laptop de 50 Wh consume 10 W. ¿Autonomía ideal?", "5 h."]],
      quiz: [
        { t: "num", p: "Una pila de 2 500 mAh alimenta un juguete que consume 250 mA. ¿Cuántas horas dura (ideal)?", r: 10, u: "s", uTexto: "h", e: "2 500 / 250 = 10 h." },
        { t: "num", p: "¿Cuántos Wh tiene una batería externa de 10 000 mAh a 3,7 V?", r: 37, u: "Wh", e: "10 000 × 3,7 / 1 000 = 37 Wh." },
        { t: "om", p: "Para comparar baterías de distinto voltaje conviene usar…", o: ["Los mAh", "Los Wh", "El tamaño", "El precio"], c: 1, e: "La energía en Wh incluye el voltaje." },
        { t: "vf", p: "Una batería externa de 10 000 mAh puede cargar exactamente 2,5 veces un celular de 4 000 mAh.", c: false, e: "Hay diferencias de voltaje y pérdidas: en la práctica, unas 1,5–2 cargas." },
        { t: "om", p: "¿Cuál es el límite habitual de energía de una batería de litio en la cabina de un avión sin permiso especial?", o: ["10 Wh", "100 Wh", "1 000 Wh", "No hay límite"], c: 1, e: "Normalmente 100 Wh por batería." }
      ],
      res: ["La capacidad en mAh indica cuánta carga entrega la batería.", "Autonomía ≈ mAh / mA, o Wh × eficiencia / W.", "Para comparar baterías de distinto voltaje, usa Wh = mAh × V / 1 000.", "Las conversiones de voltaje hacen perder un 20–35 % en una batería externa.", "En aviones, las baterías de litio suelen limitarse a 100 Wh en cabina."]
    },
    {
      id: "9-5", t: "Carga y descarga", d: "Curvas de carga, tasa C, ciclos, profundidad de descarga, carga rápida y autodescarga.", min: 40, sim: "S12",
      preg: "¿Por qué tu celular carga rapidísimo hasta el 80 % y luego se hace lento?",
      obj: ["Describir las curvas de carga y descarga.", "Usar la tasa C para expresar corrientes.", "Aplicar buenas prácticas para alargar la vida de una batería."],
      txt: `Cargar una batería es invertir su reacción química aplicando una corriente en sentido contrario. Pero no se puede hacer de cualquier manera.

## La curva de descarga
Mientras una batería se descarga, su voltaje **baja**, aunque no de forma uniforme:
- Al principio cae un poco.
- Luego se mantiene **bastante estable** durante la mayor parte de la descarga (la «meseta»).
- Al final cae **bruscamente**: la batería está casi vacía.

Una celda de litio-ion va de unos **4,2 V** (llena) a unos **3,0 V** (vacía), con la meseta cerca de 3,6–3,7 V. Los aparatos se apagan antes de llegar al mínimo para protegerla. En la simulación S12 puedes ver cómo cambia el voltaje según el porcentaje de carga.

## La tasa C
La [[tasa C]] expresa la corriente de carga o descarga **en relación con la capacidad**:
- **1 C:** la corriente que descargaría (o cargaría) la batería en **1 hora**. Para una de 3 000 mAh, 1 C = 3 A.
- **0,5 C:** 1,5 A, unas 2 horas.
- **2 C:** 6 A, unos 30 minutos.

Descargar a tasas altas da **menos capacidad útil** y más calor. Las baterías de drones y herramientas están diseñadas para tasas de 10 C o más; las de celular, para mucho menos.

## Cómo se carga una batería de litio: CC-CV
1. **Corriente constante (CC):** el cargador mete una corriente fija (por ejemplo 1 C) y el voltaje sube. Se llega rápido al 70–80 %.
2. **Voltaje constante (CV):** al alcanzar 4,2 V por celda, el cargador mantiene ese voltaje y la corriente va **bajando** poco a poco. El último 20 % es lento.
3. **Fin de carga:** cuando la corriente baja de cierto valor, el cargador se detiene.

¡Esa es la respuesta a la pregunta inicial! Por eso las «cargas rápidas» anuncian «50 % en 15 minutos», no «100 %».

## Ciclos y profundidad de descarga
Un **ciclo** es una descarga y recarga completa (o varias parciales que sumen el 100 %). Con el uso, la capacidad disminuye. La **profundidad de descarga** influye mucho:
- Descargar siempre del 100 % al 0 % desgasta más.
- Usar la batería entre el **20 % y el 80 %** puede multiplicar su número de ciclos.

## Buenas prácticas para baterías de litio
1. Evita dejarla **a 0 %** mucho tiempo: puede quedar dañada.
2. Evita tenerla **al 100 % y caliente** (por ejemplo, cargando al sol o bajo la almohada).
3. **Temperatura:** lo ideal es entre 15 y 30 °C. **No cargues bajo cero** ni por encima de unos 40–45 °C.
4. Para guardarla mucho tiempo, déjala al **40–60 %**.
5. Usa cargadores de calidad y certificados.
6. Muchos celulares tienen la opción de **carga optimizada** que se detiene en el 80 % hasta que la necesitas.

## Autodescarga
Todas las baterías pierden carga lentamente aunque no se usen: litio-ion, 1–3 % al mes; NiMH normales, 15–30 % al mes; alcalinas, 2–3 % al año.`,
      form: [["I (1 C) = capacidad (Ah) / 1 h", "Corriente de 1 C."], ["Tiempo ≈ 1 / tasa C (horas)", "A 2 C, unos 30 minutos."]],
      ej: { enun: "Una batería de 4 000 mAh se carga a 0,5 C. ¿Qué corriente es y cuánto tarda (aprox.) la fase de corriente constante hasta el 80 %?", pasos: ["1 C = 4 A → 0,5 C = 2 A.", "El 80 % son 3 200 mAh.", "Tiempo ≈ 3 200 mAh / 2 000 mA = 1,6 h ≈ 1 h 36 min.", "El 20 % restante, en fase de voltaje constante, tardará más de lo que indica esta proporción."], res: "2 A; unos 96 minutos hasta el 80 %." },
      vida: "Las laptops y celulares modernos aprenden tu rutina: si siempre los desconectas a las 7:00, esperan con la carga al 80 % y completan el 100 % justo antes.",
      err: ["Creer que hay que descargar del todo una batería de litio antes de cargarla (eso era para las de níquel-cadmio).", "Cargar el celular bajo la almohada o al sol.", "Pensar que la carga rápida llena la batería al 100 % igual de rápido."],
      ejer: [["Una batería de 2 Ah se descarga a 2 C. ¿Qué corriente es y cuánto dura (ideal)?", "4 A; unos 30 minutos."], ["¿Entre qué porcentajes conviene usar una batería de litio para alargar su vida?", "Entre el 20 % y el 80 % aproximadamente."], ["¿Por qué el último 20 % de la carga es lento?", "Porque el cargador pasa a voltaje constante y la corriente va bajando para no sobrecargar la celda."]],
      quiz: [
        { t: "num", p: "¿Qué corriente es 1 C para una batería de 3 000 mAh? (en A)", r: 3, u: "A", e: "1 C = 3 Ah / 1 h = 3 A." },
        { t: "om", p: "Una batería de litio se carga primero…", o: ["A voltaje constante y luego a corriente constante", "A corriente constante y luego a voltaje constante", "Siempre a la máxima corriente", "Descargándola del todo"], c: 1, e: "Método CC-CV." },
        { t: "vf", p: "Usar una batería de litio entre el 20 % y el 80 % ayuda a alargar su vida.", c: true, e: "Reduce el estrés de los extremos." },
        { t: "om", p: "¿Qué temperatura es peligrosa para cargar una batería de litio?", o: ["20 °C", "25 °C", "Bajo cero", "18 °C"], c: 2, e: "Bajo cero se forma litio metálico dentro de la celda." },
        { t: "om", p: "En la curva de descarga, el voltaje de una batería…", o: ["Es siempre el mismo", "Baja lentamente en una meseta y cae bruscamente al final", "Sube al descargarse", "Es cero hasta el final"], c: 1, e: "Meseta estable y caída final." }
      ],
      res: ["Al descargarse, el voltaje baja con una meseta y una caída final.", "La tasa C expresa la corriente respecto de la capacidad: 1 C vacía la batería en 1 hora.", "El litio se carga en corriente constante y luego en voltaje constante: el último 20 % es lento.", "Usarla entre el 20 y el 80 % y sin calor alarga su vida.", "No se carga bajo cero ni a más de unos 40–45 °C."]
    },
    {
      id: "9-6", t: "Baterías en serie y en paralelo", d: "Más voltaje o más capacidad; packs del tipo 3S2P.", min: 35, sim: "S12",
      preg: "¿Cómo consigue un auto eléctrico unos 400 V si cada celda de litio da 3,7 V?",
      obj: ["Calcular el voltaje y la capacidad de celdas en serie y en paralelo.", "Interpretar la notación «S» y «P» de los packs.", "Explicar por qué los packs necesitan equilibrado y protección."],
      txt: `Una sola celda rara vez basta: para más voltaje o más capacidad se combinan varias, como viste en la lección 4.8.

## En serie: más voltaje
Celdas en **serie** (el + de una con el − de la siguiente):
- **Voltaje total = suma** de los voltajes.
- **Capacidad (Ah) = la de una** celda.
- Energía total = suma de las energías.

Seis celdas de plomo de 2 V → batería de auto de 12 V.

## En paralelo: más capacidad
Celdas **iguales** en **paralelo** (todos los + juntos y todos los − juntos):
- **Voltaje = el de una** celda.
- **Capacidad = suma** de las capacidades.
- Pueden entregar más corriente total.

## La notación de los packs: «S» y «P»
Los packs de litio se describen así: **«nSmP»** significa **n grupos en serie**, cada uno formado por **m celdas en paralelo**.

Ejemplo, un pack **3S2P** con celdas de 3,7 V y 2 500 mAh:
- Voltaje: 3 × 3,7 = **11,1 V**.
- Capacidad: 2 × 2 500 = **5 000 mAh (5 Ah)**.
- Energía: 11,1 × 5 = **55,5 Wh**.
- Número de celdas: 3 × 2 = **6**.

## La respuesta a la pregunta inicial
Un auto eléctrico típico tiene un pack de unos **96S** (96 grupos en serie): 96 × 3,7 ≈ **355 V** nominales (hasta unos 400 V cargado). Cada grupo tiene muchas celdas en paralelo para alcanzar la capacidad: en total, **miles de celdas** y 50–100 kWh. Algunos autos usan arquitecturas de 800 V con el doble de celdas en serie.

## Por qué hace falta un BMS
En un pack, las celdas nunca son exactamente iguales. Con el uso, unas se cargan o descargan más que otras. Si una celda en serie se sobrecarga por encima de 4,2 V o se descarga por debajo de 3 V, se daña y puede ser peligrosa. Por eso los packs de litio llevan un **sistema de gestión de baterías (BMS)** que:
- Vigila el voltaje de **cada grupo** y la **temperatura**.
- **Equilibra** las celdas (descarga un poco las más cargadas).
- **Corta** la carga o la descarga si algo se sale de los límites.
- Calcula el porcentaje de carga.

## Reglas de oro al combinar baterías
!> Combina solo celdas **idénticas**: misma química, misma capacidad, misma marca y modelo, misma antigüedad y mismo nivel de carga. Mezclar pilas nuevas con viejas o de distinto tipo hace que la más débil se invierta o se caliente.

- En los aparatos con varias pilas, **cámbialas todas a la vez**.
- **Nunca** conectes en paralelo baterías con distinto voltaje: la corriente entre ellas puede ser enorme.
- Los packs de litio caseros (sin BMS) son peligrosos: no los construyas.

En la simulación S12 puedes cambiar el número de celdas en serie y en paralelo y ver cómo cambian el voltaje, la capacidad y la energía.`,
      form: [["Serie: V = n × V celda; Ah = Ah celda", "Celdas en serie."], ["Paralelo: V = V celda; Ah = m × Ah celda", "Celdas en paralelo."], ["Pack nSmP: V = n·Vc; Ah = m·Ahc; Wh = V·Ah", "Packs combinados."]],
      ej: { enun: "Una bicicleta eléctrica usa un pack 10S4P de celdas de 3,6 V y 3 000 mAh. Calcula voltaje, capacidad, energía y número de celdas.", pasos: ["Voltaje: 10 × 3,6 = 36 V.", "Capacidad: 4 × 3 = 12 Ah.", "Energía: 36 × 12 = 432 Wh.", "Celdas: 10 × 4 = 40."], res: "36 V, 12 Ah, 432 Wh y 40 celdas." },
      vida: "Las baterías de las laptops suelen ser 3S1P o 4S1P (11,1 o 14,8 V). Las de las herramientas a batería «18 V» o «20 V» son 5S (5 × 3,6 V = 18 V nominales).",
      err: ["Pensar que las celdas en serie suman su capacidad: suman su voltaje.", "Mezclar pilas nuevas y usadas.", "Armar packs de litio sin sistema de protección."],
      ejer: [["4 celdas de 1,2 V y 2 000 mAh en serie: ¿V y Ah?", "4,8 V y 2 000 mAh."], ["Pack 2S3P de celdas de 3,7 V y 2 Ah: ¿V, Ah y Wh?", "7,4 V, 6 Ah y 44,4 Wh."], ["¿Para qué sirve el BMS de un pack de litio?", "Vigila voltajes y temperatura, equilibra las celdas y corta si algo se sale de los límites."]],
      quiz: [
        { t: "num", p: "Un pack 3S de celdas de 3,7 V. ¿Voltaje total?", r: 11.1, u: "V", e: "3 × 3,7 = 11,1 V." },
        { t: "num", p: "Un pack 1S4P de celdas de 2 500 mAh. ¿Capacidad total en mAh?", r: 10000, u: "", e: "4 × 2 500 = 10 000 mAh." },
        { t: "om", p: "En un pack «4S2P», ¿cuántas celdas hay?", o: ["6", "8", "4", "2"], c: 1, e: "4 × 2 = 8 celdas." },
        { t: "vf", p: "Se pueden mezclar pilas nuevas y viejas en un mismo aparato sin problema.", c: false, e: "La más débil se descarga antes y puede invertirse o calentarse." },
        { t: "om", p: "¿Qué hace el BMS de una batería de litio?", o: ["Aumenta el voltaje", "Vigila, equilibra y protege las celdas", "Enfría el auto", "Convierte CA en CD"], c: 1, e: "Es el sistema de gestión y protección." }
      ],
      res: ["En serie se suman los voltajes; en paralelo, las capacidades.", "nSmP: n grupos en serie de m celdas en paralelo.", "Los autos eléctricos tienen cientos de celdas en serie y miles en total.", "Los packs de litio necesitan un BMS que vigile y equilibre las celdas.", "Solo se combinan celdas idénticas y con la misma carga."]
    },
    {
      id: "9-7", t: "Cuidado, seguridad y reciclaje", d: "Hinchazón, embalamiento térmico, temperatura, cargadores originales y reciclaje.", min: 35, e: true,
      preg: "¿Qué debes hacer si la batería de tu celular o de tu laptop empieza a hincharse?",
      obj: ["Reconocer las señales de peligro en una batería.", "Explicar el embalamiento térmico de las baterías de litio.", "Desechar y reciclar correctamente pilas y baterías."],
      txt: `Las baterías guardan mucha energía en poco espacio. Bien usadas son seguras; mal usadas pueden **derramarse, calentarse, incendiarse o explotar**.

## El riesgo de las baterías de litio
Las celdas de litio-ion tienen un electrolito **inflamable**. Si una celda se daña, se sobrecarga, se cortocircuita o se calienta demasiado, puede iniciar un [[embalamiento térmico]]:
1. La celda se calienta.
2. El calor provoca reacciones químicas internas que producen **más calor** y gases.
3. El proceso se acelera solo, la celda se hincha, expulsa gases tóxicos e inflamables y puede **arder** violentamente, contagiando a las celdas vecinas.

Un incendio de batería de litio es difícil de apagar y puede reavivarse.

## Señales de alarma
- La batería está **hinchada** (la tapa del celular se levanta, el trackpad de la laptop se abomba).
- Se **calienta mucho** sin motivo, en reposo o al cargar.
- Huele a **químico o dulzón**, o sale humo.
- Tiene golpes, perforaciones o fugas.
- En pilas alcalinas: polvo blanco o líquido en los polos (fuga de electrolito, corrosivo).

## Qué hacer
!> Si una batería de litio está hinchada, caliente o echa humo: **deja de usarla y de cargarla**, desconéctala si es seguro hacerlo, aléjala de materiales inflamables (sobre un piso de cerámica o en un recipiente metálico, al aire libre si es posible) y **nunca la perfores ni la aprietes**. Si arde, sal del lugar y llama a emergencias (911 o 112).

Una batería hinchada debe reemplazarla un técnico, y la vieja se lleva a un punto de reciclaje.

## Para prevenir
1. Usa **cargadores originales** o certificados; desconfía de los muy baratos sin marca.
2. No cargues dispositivos **sobre la cama, el sofá o bajo la almohada**: el calor no se disipa.
3. No dejes baterías al **sol** ni dentro del auto en verano.
4. No guardes pilas sueltas junto a **monedas, llaves o clips**: pueden cortocircuitarse.
5. No mezcles pilas nuevas y viejas ni de distinto tipo.
6. Saca las pilas de los aparatos que no vas a usar en meses: evitas fugas.
7. Nunca intentes **recargar pilas alcalinas** desechables.
8. Nunca abras, perfores ni tires al fuego una batería.

## Pilas de botón: peligro para niños
Una pila de botón tragada por un niño puede quedar atorada en el esófago y, en **dos horas**, producir quemaduras químicas graves. Si sospechas que un niño se tragó una, acude a urgencias de inmediato.

## Reciclaje
Las pilas y baterías contienen **metales** (zinc, manganeso, níquel, cobalto, litio, plomo y, en las antiguas, cadmio o mercurio) que contaminan el suelo y el agua si van a la basura, y que pueden recuperarse.
- **Nunca** tires pilas a la basura común ni al fuego.
- Guárdalas en un frasco (con los polos tapados con cinta si son de litio o de 9 V) y llévalas a un **punto de recolección**: tiendas, supermercados, centros de reciclaje o campañas municipales.
- Las **baterías de auto** se devuelven en la tienda al comprar una nueva: se recicla más del 95 % del plomo.
- Los aparatos con batería integrada se llevan a puntos de **residuos electrónicos**.`,
      vida: "En los aeropuertos piden llevar las baterías de litio en la cabina y no en la maleta facturada: si una se incendia, la tripulación puede verlo y apagarlo enseguida.",
      err: ["Seguir usando un celular con la batería hinchada.", "Tirar las pilas a la basura común.", "Apagar un incendio de batería grande con poca agua y volver a acercarse enseguida: puede reavivarse."],
      ejer: [["Menciona tres señales de alarma en una batería de litio.", "Hinchazón, calor excesivo sin motivo y olor químico o humo."], ["¿Por qué no se deben guardar pilas con monedas en el bolsillo?", "Porque las monedas pueden unir sus polos y provocar un cortocircuito y calentamiento."], ["¿Dónde se desechan las pilas usadas?", "En puntos de recolección o reciclaje, nunca en la basura común."]],
      quiz: [
        { t: "om", p: "Si la batería de tu celular está hinchada, debes…", o: ["Apretarla para que vuelva a su forma", "Dejar de usarla y llevarla a un técnico", "Cargarla más", "Perforarla para sacar el gas"], c: 1, e: "Nunca se perfora ni se aprieta: puede incendiarse.", crit: true },
        { t: "om", p: "El embalamiento térmico es…", o: ["Un tipo de carga rápida", "Una reacción en cadena en la que el calor produce más calor hasta incendiar la batería", "El envoltorio de la pila", "Un modo de ahorro"], c: 1, e: "Es el principal riesgo de las baterías de litio." },
        { t: "vf", p: "Cargar el celular bajo la almohada es una práctica segura.", c: false, e: "El calor no se disipa y puede dañar la batería o provocar un incendio." },
        { t: "om", p: "¿Qué se debe hacer con las pilas usadas?", o: ["Tirarlas a la basura", "Quemarlas", "Llevarlas a un punto de recolección", "Enterrarlas"], c: 2, e: "Contienen metales que se recuperan y que contaminan." },
        { t: "om", p: "Si un niño se traga una pila de botón…", o: ["Esperar a que la expulse", "Acudir a urgencias de inmediato", "Darle agua y esperar", "No pasa nada"], c: 1, e: "Puede causar quemaduras graves en unas dos horas." }
      ],
      res: ["Las baterías de litio pueden sufrir embalamiento térmico e incendiarse.", "Señales de alarma: hinchazón, calor excesivo, olor o humo.", "Usa cargadores certificados y no cargues sobre la cama o al sol.", "Las pilas de botón son muy peligrosas si un niño las traga.", "Todas las pilas y baterías se reciclan en puntos de recolección."]
    },
    {
      id: "9-8", t: "Otras formas de almacenar energía", d: "Supercapacitores, bombeo hidráulico, baterías de red, volantes de inercia e hidrógeno.", min: 30,
      preg: "Si el sol solo brilla de día, ¿cómo se puede usar la energía solar por la noche en toda una ciudad?",
      obj: ["Conocer las principales tecnologías de almacenamiento de energía.", "Comparar su capacidad, rapidez y costo.", "Entender por qué el almacenamiento es clave para las energías renovables."],
      txt: `La electricidad de la red debe producirse **en el mismo instante** en que se consume. Con centrales de carbón o gas eso es fácil: se regulan a voluntad. Pero el **sol** y el **viento** producen cuando la naturaleza quiere. Para aprovecharlos al máximo hay que **guardar** la energía sobrante y devolverla cuando haga falta.

## Bombeo hidráulico
Es la forma de almacenamiento a gran escala más usada del mundo (más del 90 % de la capacidad instalada).
1. Cuando sobra electricidad (de noche o a mediodía con mucho sol), se usa para **bombear agua** de un embalse bajo a uno alto.
2. Cuando falta, el agua **cae** por turbinas y genera electricidad.

Eficiencia de ida y vuelta: **70–80 %**. Necesita montañas y mucha agua, pero guarda enormes cantidades de energía durante horas o días.

## Baterías de red
Grandes instalaciones con miles de baterías de **litio** (o de flujo) en contenedores, conectadas a la red con inversores. Responden en **milisegundos**, ideales para estabilizar la frecuencia y cubrir los picos de la tarde. Eficiencia: **85–95 %**. Cada vez son más baratas y comunes junto a parques solares.

## Baterías domésticas
Casas con paneles solares pueden tener una batería (normalmente **LiFePO₄**, de 5 a 15 kWh) que guarda la energía del mediodía para la noche o para los apagones.

## Supercapacitores
Un [[supercapacitor]] almacena energía en un campo eléctrico, como un capacitor (lección 14.3), pero con una capacidad enorme. Se carga y descarga en **segundos**, soporta **cientos de miles de ciclos** y funciona con frío extremo. Guarda poca energía comparado con una batería, así que se usa para **picos de potencia**: autobuses eléctricos que recargan en cada parada, recuperación de energía en frenadas, arranque de motores y respaldo momentáneo.

## Volantes de inercia
Un disco pesado que gira a gran velocidad dentro de una cámara al vacío guarda energía **cinética**. Un motor-generador lo acelera para cargar y lo frena para descargar. Responde muy rápido y dura décadas; se usa para estabilizar la red y en algunos centros de datos.

## Hidrógeno
Con electricidad sobrante se descompone el agua en hidrógeno y oxígeno (**electrólisis**). El hidrógeno se almacena y después se convierte de nuevo en electricidad en una **pila de combustible** o se usa en la industria. Permite guardar energía durante **meses**, pero su eficiencia de ida y vuelta es baja (**30–40 %**).

## Otras ideas
- **Aire comprimido** en cavernas subterráneas.
- **Almacenamiento térmico:** sales fundidas en centrales solares de concentración, que siguen generando de noche.
- **Gravedad:** bloques pesados que se suben y bajan con grúas.
- **Autos eléctricos conectados a la red (V2G):** sus baterías podrían ayudar a la red cuando están estacionados.

## Comparación
| Tecnología | Escala | Respuesta | Eficiencia | Duración típica |
|---|---|---|---|---|
| Bombeo hidráulico | Muy grande | Minutos | 70–80 % | Horas a días |
| Baterías de litio | Pequeña a grande | Milisegundos | 85–95 % | 1–4 horas |
| Supercapacitores | Pequeña | Milisegundos | 90–98 % | Segundos |
| Volantes de inercia | Mediana | Milisegundos | 85–90 % | Minutos |
| Hidrógeno | Grande | Minutos | 30–40 % | Semanas a meses |`,
      form: [["Eficiencia de ida y vuelta = energía devuelta / energía guardada", "Mide cuánto se recupera de lo almacenado."]],
      ej: { enun: "Una central de bombeo guarda 1 000 MWh de electricidad sobrante con una eficiencia de ida y vuelta del 75 %. ¿Cuánta energía devuelve? ¿Cuántas casas que consumen 10 kWh al día abastece un día?", pasos: ["Energía devuelta = 1 000 × 0,75 = 750 MWh.", "750 MWh = 750 000 kWh.", "Casas = 750 000 / 10 = 75 000 casas durante un día."], res: "Devuelve 750 MWh: suficiente para unas 75 000 casas durante un día." },
      vida: "Algunos autobuses eléctricos tienen supercapacitores en lugar de grandes baterías: se recargan en segundos en cada parada con un brazo que toca un cargador en el techo.",
      err: ["Pensar que la electricidad de la red se puede guardar «en los cables».", "Creer que el almacenamiento no tiene pérdidas.", "Confundir un supercapacitor con una batería: guarda mucho menos, pero entrega la energía muchísimo más rápido."],
      ejer: [["¿Cuál es la tecnología de almacenamiento a gran escala más usada?", "El bombeo hidráulico."], ["¿Por qué los supercapacitores no sustituyen a las baterías del celular?", "Porque guardan mucha menos energía por peso."], ["Una batería de red guarda 100 MWh con 90 % de eficiencia. ¿Cuánto devuelve?", "90 MWh."]],
      quiz: [
        { t: "om", p: "¿Cómo funciona el almacenamiento por bombeo hidráulico?", o: ["Calentando agua", "Subiendo agua a un embalse alto cuando sobra energía y turbinándola cuando falta", "Congelando agua", "Con baterías bajo el agua"], c: 1, e: "Energía potencial del agua." },
        { t: "om", p: "¿Qué tecnología responde en milisegundos y es ideal para estabilizar la red?", o: ["Hidrógeno", "Baterías de red", "Bombeo hidráulico", "Carbón"], c: 1, e: "Las baterías con inversores responden muy rápido." },
        { t: "vf", p: "El hidrógeno permite guardar energía durante meses, pero con una eficiencia de ida y vuelta baja.", c: true, e: "Alrededor del 30–40 %." },
        { t: "om", p: "Un supercapacitor se caracteriza por…", o: ["Guardar más energía que una batería", "Cargarse y descargarse en segundos y soportar muchísimos ciclos", "Funcionar solo con CA", "Ser una pila alcalina"], c: 1, e: "Alta potencia, poca energía, gran durabilidad." },
        { t: "num", p: "Se guardan 200 MWh con una eficiencia del 80 %. ¿Cuántos MWh se recuperan?", r: 160, u: "", e: "200 × 0,8 = 160 MWh." }
      ],
      res: ["La red necesita almacenamiento para aprovechar el sol y el viento.", "El bombeo hidráulico es el almacenamiento masivo más usado.", "Las baterías de red responden en milisegundos.", "Los supercapacitores dan picos de potencia; el hidrógeno guarda energía por meses.", "Todo almacenamiento tiene pérdidas: se mide con la eficiencia de ida y vuelta."]
    }
  ]
});
