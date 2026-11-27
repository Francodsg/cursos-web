// M10. Redes eléctricas: de la central a tu casa
registrarModulo({
  id: "m10", n: 10, nivel: 3, titulo: "Redes eléctricas: de la central a tu casa", quizMin: 25, quizN: 15, minEsperado: 310,
  objetivo: "Describir la generación, la transmisión y la distribución de la electricidad, explicar por qué se transmite en alta tensión y cómo llega la luz a una casa.",
  clave: "red electrica central generacion transmision distribucion alta tension subestacion poste acometida medidor apagon frecuencia renovables solar eolica",
  actividades: ["Dibujar el mapa del recorrido de la electricidad hasta tu casa: central, líneas, subestación, transformador de poste, acometida y medidor.", "Hacer la observación guiada desde la calle (lección 10.6), sin acercarte a nada.", "Comparar la mezcla de generación de dos países con los datos de la lección 10.2."],
  ejemplos: ["100 MW por una línea de 5 Ω: a 13,8 kV las pérdidas serían mayores que la propia potencia; a 400 kV son solo el 0,3 %.", "Un panel solar de 400 W produce unos 500–700 kWh al año, según la región."],
  sims: ["S13"], calcs: ["C16"], gen: ["perdidas"],
  evaluacion: "Quiz de módulo de 15 preguntas (25 min) con un cálculo de pérdidas de transmisión con valores aleatorios. Se aprueba con el 70 %.",
  extra: [
    { t: "ord", p: "Ordena el recorrido de la electricidad:", o: ["Central eléctrica", "Subestación elevadora", "Línea de transmisión", "Subestación reductora", "Transformador de poste", "Medidor de la casa"], e: "Generación → transmisión → distribución → usuario.", lec: "10-1" },
    { t: "vf", p: "Si en un momento se consume más energía de la que se genera, la frecuencia de la red baja.", c: true, e: "Los generadores se frenan un poco.", lec: "10-7" }
  ],
  lecciones: [
    {
      id: "10-1", t: "El viaje de la electricidad", d: "Visión general: central → subestación → línea → transformador → casa.", min: 30, e: true, sim: "S13",
      preg: "¿Cuántos kilómetros recorre la energía antes de encender tu foco, y cuánto tarda?",
      obj: ["Describir las etapas de un sistema eléctrico.", "Identificar los niveles de tensión de cada etapa.", "Explicar el papel de los transformadores en el recorrido."],
      txt: `La [[red eléctrica]] es probablemente la máquina más grande que ha construido la humanidad: miles de kilómetros de cables, centrales, subestaciones y transformadores funcionando **sincronizados al mismo ritmo** ({{HZ}}), segundo a segundo.

## Las cuatro etapas
1. **Generación:** las [[central eléctrica|centrales]] convierten otra forma de energía (agua, vapor, viento, sol) en electricidad, normalmente a unos **13,8–25 kV**.
2. **Transmisión:** una **subestación elevadora** sube el voltaje a **115–765 kV** y las **líneas de transmisión** llevan la energía cientos de kilómetros.
3. **Distribución:** cerca de las ciudades, **subestaciones reductoras** bajan a **media tensión** (13,2–34,5 kV), que recorre calles y avenidas. El **transformador de poste** o de pedestal la baja a **baja tensión** ({{V}}).
4. **Consumo:** la **acometida** lleva la energía al **medidor** y al **tablero** de cada casa, y de ahí a cada contacto.

| Etapa | Nivel de tensión típico |
|---|---|
| Generador | 13,8–25 kV |
| Transmisión | 115–400 kV (hasta 765 kV o más) |
| Subtransmisión | 69–138 kV |
| Distribución (media tensión) | 13,2–34,5 kV |
| Baja tensión (casas) | 120/127 V o 230 V (fase–neutro) |

## Muchas centrales, una sola red
Las centrales no alimentan cada una a «su» ciudad: todas inyectan energía a una **red interconectada** que funciona como un gran lago. Si una central se detiene, otras compensan. Por eso todas giran **sincronizadas** a la misma frecuencia.

## ¿Cuánto tarda?
La energía viaja por los cables casi a la velocidad de la luz: de una central a 300 km de distancia tarda **alrededor de un milisegundo** en llegar. Como la red no almacena casi nada, **lo que se genera se consume en ese mismo instante**. Los operadores de la red deben ajustar la generación al consumo a cada momento (lección 10.7).

## ¿Por qué tantos cambios de voltaje?
- **Alto voltaje para transportar:** con más voltaje, la misma potencia viaja con menos corriente y muchas menos pérdidas (lección 10.3).
- **Bajo voltaje para usar:** {{V}} es manejable y relativamente seguro para los aparatos de casa.
Los transformadores hacen posibles esos cambios con eficiencias del 98–99 %.

## Pérdidas totales
Entre la central y tu casa se pierde, en promedio, entre un **6 y un 15 %** de la energía, según el país: en las líneas, los transformadores y, a veces, por conexiones ilegales.

En la simulación de esta lección verás el recorrido completo y cómo cambian las pérdidas según la tensión de transmisión.`,
      vida: "Cuando enciendes un foco, una central quizá a cientos de kilómetros produce en ese mismo instante un poquito más de energía. La red entera responde a tu interruptor.",
      err: ["Pensar que cada ciudad tiene «su» central conectada directamente.", "Creer que la red guarda la electricidad en los cables.", "Pensar que la electricidad llega a las casas con el mismo voltaje con que se genera."],
      ejer: [["Nombra las cuatro etapas del sistema eléctrico.", "Generación, transmisión, distribución y consumo."], ["¿Qué voltaje tienen típicamente las líneas de distribución de las calles?", "Media tensión: 13,2–34,5 kV."], ["¿Por qué todas las centrales de una red giran sincronizadas?", "Porque inyectan energía a la misma red de CA, que tiene una sola frecuencia."]],
      quiz: [
        { t: "om", p: "¿Qué hace una subestación elevadora?", o: ["Baja el voltaje para las casas", "Sube el voltaje para la transmisión", "Genera electricidad", "Mide el consumo"], c: 1, e: "Eleva el voltaje junto a la central." },
        { t: "om", p: "¿Qué voltaje tienen típicamente las líneas de transmisión?", o: ["127 V", "13,2 kV", "115–400 kV o más", "5 V"], c: 2, e: "Alta tensión: cientos de kilovoltios." },
        { t: "vf", p: "La red casi no almacena energía: lo que se genera se consume en el mismo instante.", c: true, e: "Por eso hay que equilibrar generación y consumo continuamente." },
        { t: "om", p: "¿Qué aparato baja la media tensión a la tensión de las casas?", o: ["El medidor", "El transformador de poste o de pedestal", "El tablero", "La central"], c: 1, e: "Está en la calle, cerca de las casas." },
        { t: "om", p: "Entre la central y tu casa se pierde típicamente…", o: ["Nada", "Entre el 6 y el 15 % de la energía", "La mitad", "El 90 %"], c: 1, e: "En líneas y transformadores." }
      ],
      res: ["El sistema eléctrico tiene generación, transmisión, distribución y consumo.", "Los transformadores suben el voltaje para transportar y lo bajan para usar.", "Todas las centrales giran sincronizadas en una red interconectada.", "La energía llega casi al instante y se consume en el momento en que se genera.", "Se pierde un 6–15 % de la energía en el camino."]
    },
    {
      id: "10-2", t: "Generación", d: "Centrales térmicas, hidroeléctricas, nucleares, eólicas, solares y geotérmicas; ventajas y desventajas.", min: 45, e: true,
      preg: "¿De dónde viene la electricidad de tu país: del agua, del gas, del sol, del viento…?",
      obj: ["Describir cómo funcionan los principales tipos de centrales.", "Comparar sus ventajas e inconvenientes.", "Distinguir fuentes renovables y no renovables."],
      txt: `Casi todas las centrales funcionan igual en su última etapa: algo hace **girar una turbina** unida a un **generador** (módulo 8). Lo que cambia es **qué** mueve la turbina. La excepción es la solar fotovoltaica, que no gira.

## Centrales térmicas (combustibles fósiles)
Queman **carbón, gas natural o petróleo** para calentar agua y producir **vapor** a alta presión, que mueve una turbina. Las de **ciclo combinado** aprovechan además los gases calientes de una turbina de gas: llegan al 55–60 % de eficiencia.
- **Ventajas:** producen cuando se necesita; las de gas arrancan rápido.
- **Inconvenientes:** emiten **CO₂** (cambio climático) y contaminantes; dependen de combustibles que se agotan y cuyo precio varía.

## Hidroeléctricas
El agua de una presa cae por tuberías y mueve las turbinas. La potencia depende de la **altura** y del **caudal**.
- **Ventajas:** renovable, sin emisiones al operar, muy flexible (se regula en minutos), larga vida.
- **Inconvenientes:** inundan valles, afectan a ríos y comunidades; dependen de las lluvias (sequías).

## Nucleares
La **fisión** de átomos de uranio en un reactor produce calor, que genera vapor y mueve turbinas, como una térmica.
- **Ventajas:** mucha energía constante sin emisiones de CO₂, ocupan poco espacio.
- **Inconvenientes:** residuos radiactivos de larga duración, alto costo y largos plazos de construcción, riesgo de accidentes graves (aunque poco frecuentes).

## Eólicas
El viento mueve las palas de un **aerogenerador**, que hace girar un generador (de 2 a 15 MW cada uno, los marinos los más grandes).
- **Ventajas:** renovable, sin emisiones al operar, costo cada vez menor.
- **Inconvenientes:** **intermitente** (depende del viento), impacto visual y sobre aves, necesita espacio.

## Solares
- **Fotovoltaica:** los **paneles solares** convierten la luz directamente en **corriente directa** con semiconductores (silicio); un **inversor** la convierte en CA. Sin partes móviles.
- **Solar térmica de concentración:** espejos concentran el sol para producir vapor; con sales fundidas puede seguir generando de noche.
- **Ventajas:** renovable, sin emisiones al operar, se instala desde un techo hasta un parque gigante; es hoy una de las fuentes más baratas.
- **Inconvenientes:** solo produce de día y depende de las nubes; necesita almacenamiento o respaldo.

## Geotérmicas
Usan el **calor del interior de la Tierra** (vapor o agua caliente de pozos profundos) para mover turbinas. Importantes en zonas volcánicas (México, Centroamérica, Islandia, Kenia).
- **Ventajas:** renovable y constante. **Inconvenientes:** solo en ciertos lugares.

## Otras
**Biomasa** (residuos agrícolas, biogás), **mareomotriz**, **undimotriz** (olas).

## Renovables y no renovables
| Renovables | No renovables |
|---|---|
| Hidráulica, eólica, solar, geotérmica, biomasa | Carbón, gas, petróleo, nuclear (uranio) |

Cada país tiene su propia **mezcla de generación** según sus recursos: algunos dependen mucho de la hidráulica, otros del gas, del carbón o de la nuclear, y casi todos están aumentando la solar y la eólica.`,
      form: [["P (hidráulica) ≈ η · ρ · g · Q · h", "Potencia: eficiencia × densidad del agua × gravedad × caudal × altura."]],
      ej: { enun: "Una pequeña hidroeléctrica tiene un caudal de 10 m³/s y una caída de 50 m, con una eficiencia del 85 %. ¿Qué potencia produce? (ρ = 1 000 kg/m³, g = 9,8 m/s²)", pasos: ["P = 0,85 × 1 000 × 9,8 × 10 × 50.", "P = 0,85 × 4 900 000 W = 4 165 000 W.", "P ≈ 4,2 MW."], res: "Unos 4,2 MW, suficientes para varios miles de casas." },
      vida: "Muchas compañías publican en internet, en tiempo real, cuánta electricidad se está generando con cada fuente. Puedes ver cómo la solar sube a mediodía y desaparece de noche.",
      err: ["Pensar que las centrales nucleares emiten CO₂ al operar: no lo emiten, aunque tienen otros problemas.", "Creer que las renovables no tienen ningún impacto ambiental.", "Pensar que los paneles solares producen corriente alterna directamente."],
      ejer: [["¿Qué tienen en común casi todas las centrales?", "Una turbina que mueve un generador."], ["¿Qué fuente no usa turbina?", "La solar fotovoltaica."], ["Da una ventaja y un inconveniente de la energía eólica.", "Ventaja: renovable y sin emisiones al operar. Inconveniente: intermitente."]],
      quiz: [
        { t: "om", p: "¿Qué fuente produce corriente directa sin turbinas?", o: ["Hidroeléctrica", "Nuclear", "Solar fotovoltaica", "Térmica de gas"], c: 2, e: "Los paneles convierten la luz directamente en CD." },
        { t: "om", p: "¿Cuál de estas es una fuente NO renovable?", o: ["Eólica", "Geotérmica", "Gas natural", "Solar"], c: 2, e: "El gas natural es un combustible fósil." },
        { t: "vf", p: "Una central nuclear funciona, en su parte final, como una térmica: produce vapor que mueve turbinas.", c: true, e: "El calor viene de la fisión." },
        { t: "om", p: "Un inconveniente principal de la energía solar y eólica es…", o: ["Que emiten mucho CO₂", "Que son intermitentes", "Que usan uranio", "Que no se pueden construir"], c: 1, e: "Dependen del sol y del viento." },
        { t: "om", p: "La potencia de una hidroeléctrica depende principalmente de…", o: ["El color del agua", "La altura de la caída y el caudal", "La temperatura del aire", "El tamaño de la ciudad"], c: 1, e: "P ∝ caudal × altura." }
      ],
      res: ["Casi todas las centrales usan una turbina que mueve un generador.", "Térmicas y nucleares producen vapor; hidráulicas y eólicas usan agua o viento.", "La solar fotovoltaica produce CD directamente, sin turbinas.", "Las renovables no emiten CO₂ al operar, pero algunas son intermitentes.", "Cada país combina varias fuentes en su mezcla de generación."]
    },
    {
      id: "10-3", t: "¿Por qué alta tensión?", d: "Pérdidas = I²·R; ejemplo numérico de la misma potencia a 13,8 kV y a 400 kV.", min: 40, e: true, sim: "S13", calc: "C16",
      preg: "Si la alta tensión es peligrosa, ¿por qué las líneas de transmisión usan cientos de miles de voltios?",
      obj: ["Explicar por qué las pérdidas dependen del cuadrado de la corriente.", "Calcular las pérdidas de una línea a distintas tensiones.", "Justificar el uso de transformadores en la red."],
      txt: `Esta lección responde a una de las preguntas más importantes de toda la electricidad, y que decidió la guerra de las corrientes (lección 5.6).

## El problema: el calor en los cables
Los cables de una línea tienen resistencia. La potencia que se pierde en ellos como calor es (efecto Joule):

= P(pérdidas) = I² · R(línea)

Las pérdidas dependen del **cuadrado de la corriente**. Si reduces la corriente a la mitad, las pérdidas bajan a la cuarta parte; si la reduces diez veces, bajan **cien veces**.

## La solución: subir el voltaje
La potencia que queremos transportar es P = V · I. Para una potencia fija, **si el voltaje es mayor, la corriente es menor**:

= I = P / V

Combinando ambas fórmulas:

= P(pérdidas) = (P / V)² · R

Las pérdidas son **inversamente proporcionales al cuadrado del voltaje**.

## Ejemplo: 100 MW por una línea de 5 Ω
| Tensión de transmisión | Corriente | Pérdidas (I²·R) | % de la potencia |
|---|---|---|---|
| 13,8 kV | 7 246 A | 262 MW | ¡más del 100 %! (imposible) |
| 115 kV | 870 A | 3,78 MW | 3,8 % |
| 230 kV | 435 A | 0,95 MW | 0,95 % |
| 400 kV | 250 A | 0,31 MW | 0,31 % |

A 13,8 kV la línea ni siquiera podría funcionar: perdería más energía de la que transporta y los cables se fundirían. A 400 kV se pierde apenas el 0,3 %.

## ¿Y por qué no un millón de voltios en todas partes?
Cuanto mayor es el voltaje:
- Más **separación** hace falta entre cables y con el suelo, y **aisladores** más largos: torres más altas y caras.
- Más pérdidas por **efecto corona** (el aire alrededor del cable se ioniza y zumba).
- **Transformadores** más grandes y costosos.

Por eso se elige un equilibrio: tensiones muy altas para grandes distancias y potencias, y tensiones menores a medida que la energía se acerca a los usuarios.

## Cables más gruesos: otra opción, pero cara
También podrías reducir R con cables más gruesos, pero el costo y el peso del metal se dispararían. Subir el voltaje es muchísimo más barato: el transformador hace el trabajo.

## Pruébalo
En la simulación S13 elige distintas tensiones de transmisión y observa cómo cambian la corriente y las pérdidas. En la calculadora C16 haz tus propios cálculos.

?> Las líneas de transmisión en **corriente directa de alta tensión** (HVDC) aplican la misma idea con algunas ventajas extra en distancias muy largas y cables submarinos.`,
      form: [["P(pérdidas) = I² · R", "Calor en los cables de la línea."], ["I = P / V", "Para la misma potencia, más voltaje significa menos corriente."], ["P(pérdidas) = (P / V)² · R", "Las pérdidas bajan con el cuadrado del voltaje."]],
      ej: { enun: "Se transmiten 50 MW por una línea de 4 Ω. Calcula las pérdidas a 115 kV y a 230 kV.", pasos: ["A 115 kV: I = 50 × 10⁶ / 115 000 ≈ 435 A; pérdidas = 435² × 4 ≈ 756 kW (1,5 %).", "A 230 kV: I = 50 × 10⁶ / 230 000 ≈ 217 A; pérdidas = 217² × 4 ≈ 189 kW (0,38 %).", "Al duplicar el voltaje, las pérdidas bajan a la cuarta parte."], res: "Unos 756 kW a 115 kV y unos 189 kW a 230 kV." },
      vida: "Las líneas de alta tensión zumban y a veces se ve un leve resplandor azulado de noche en días húmedos: es el efecto corona, una de las razones por las que no se usan voltajes aún mayores.",
      err: ["Pensar que con más voltaje se transmite «más electricidad»: se transmite la misma potencia con menos corriente.", "Olvidar que las pérdidas dependen del cuadrado de la corriente.", "Creer que en alta tensión no hay pérdidas: son pequeñas, no nulas."],
      ejer: [["Si el voltaje de transmisión se multiplica por 10, ¿qué pasa con las pérdidas?", "Se dividen entre 100."], ["1 MW a 10 kV por una línea de 2 Ω: ¿pérdidas?", "I = 100 A; P = 100² × 2 = 20 kW."], ["¿Por qué no se usa un millón de voltios en todas las líneas?", "Por el costo de torres, aisladores y transformadores y por el efecto corona."]],
      quiz: [
        { t: "om", p: "Las pérdidas en una línea dependen de…", o: ["El voltaje al cuadrado", "La corriente al cuadrado", "La frecuencia", "El color del cable"], c: 1, e: "P = I²·R." },
        { t: "om", p: "Si el voltaje de transmisión se duplica (misma potencia), las pérdidas…", o: ["Se duplican", "Se reducen a la mitad", "Se reducen a la cuarta parte", "No cambian"], c: 2, e: "La corriente baja a la mitad y las pérdidas a (1/2)² = 1/4." },
        { t: "num", p: "Se transmiten 100 MW a 400 kV por una línea de 5 Ω. ¿Cuántos kW se pierden?", r: 312.5, u: "", e: "I = 250 A; P = 250² × 5 = 312 500 W = 312,5 kW." },
        { t: "vf", p: "Subir el voltaje de transmisión permite transportar la misma potencia con menos corriente.", c: true, e: "I = P/V." },
        { t: "om", p: "¿Qué aparato permite subir y bajar el voltaje en la red?", o: ["El rectificador", "El transformador", "El medidor", "El fusible"], c: 1, e: "Solo funciona con CA." }
      ],
      res: ["Las pérdidas en los cables son P = I²·R.", "Para una potencia fija, más voltaje significa menos corriente.", "Las pérdidas bajan con el cuadrado del voltaje.", "Por eso se transmite en alta tensión y se reduce cerca de los usuarios.", "Voltajes demasiado altos encarecen las torres y causan efecto corona."]
    },
    {
      id: "10-4", t: "Transmisión", d: "Torres, conductores, aisladores y subestaciones elevadoras y reductoras.", min: 30,
      preg: "¿Por qué los cables de las torres gigantes no tienen plástico alrededor?",
      obj: ["Identificar los componentes de una línea de transmisión.", "Explicar la función de los aisladores y del cable de guarda.", "Describir qué ocurre en una subestación."],
      txt: `Las [[línea de transmisión|líneas de transmisión]] son las autopistas de la electricidad: cruzan montañas, desiertos y ríos llevando cientos de megawatts.

## Los conductores
- Son cables **desnudos**, sin aislamiento plástico: a esos voltajes haría falta un plástico de metros de espesor. El **aire** que los rodea es el aislante, por eso se mantienen alejados del suelo y entre sí.
- Normalmente son de **aluminio con alma de acero** (ACSR): el aluminio conduce y es ligero; el acero da resistencia mecánica para tramos de cientos de metros.
- En tensiones muy altas, cada fase usa **varios cables juntos** (un haz de 2, 3 o 4) para reducir el efecto corona.
- Se ven **tres fases** (o múltiplos de tres): la transmisión es **trifásica**.

## Las torres
Estructuras de acero (o postes de concreto en tensiones menores) que mantienen los cables a la altura y separación necesarias. Cuanto mayor es la tensión, más altas y anchas: una línea de 400 kV tiene torres de 40 a 60 m.

## Los aisladores
Cadenas de discos de **vidrio, porcelana o polímero** cuelgan los cables de las torres sin que la corriente pase al acero. Truco: **cuenta los discos** de la cadena: cuantos más discos, mayor la tensión. Como orientación, cada disco soporta unos 10–15 kV: una cadena de unos 20–25 discos indica una línea de 230–400 kV.

## El cable de guarda
En lo más alto de las torres hay uno o dos cables **conectados a tierra**: el **cable de guarda**. Funciona como pararrayos a lo largo de toda la línea. Hoy suele llevar dentro **fibra óptica** para las comunicaciones de la red.

## Las subestaciones
Son nodos de la red donde se:
- **Transforma** el voltaje (elevadoras junto a las centrales, reductoras cerca de las ciudades).
- **Conecta y desconecta** líneas con grandes **interruptores** que apagan arcos de miles de amperios.
- **Mide y protege:** relés de protección detectan fallas en milisegundos y aíslan el tramo dañado.

!> Las subestaciones y las torres tienen voltajes mortales incluso a distancia: un arco puede saltar varios metros. Nunca se entra a una subestación ni se trepa a una torre, y nunca se vuelan cometas ni drones cerca de las líneas.

## Servidumbre de paso
Bajo las líneas se deja una franja libre de construcciones y árboles altos, para evitar que una rama o una estructura se acerque a los cables y provoque una descarga o un apagón.`,
      vida: "Si te fijas en la carretera, verás que las líneas más grandes tienen torres más altas y cadenas de aisladores más largas que las que van por la ciudad.",
      err: ["Creer que los cables de alta tensión están forrados de plástico.", "Pensar que basta no tocar un cable de alta tensión para estar seguro: el arco puede saltar a distancia.", "Confundir el cable de guarda con una fase."],
      ejer: [["¿De qué material suelen ser los conductores de las líneas de transmisión?", "Aluminio con alma de acero."], ["¿Para qué sirve el cable de guarda?", "Para proteger la línea de los rayos (y a menudo lleva fibra óptica)."], ["¿Cómo puedes estimar la tensión de una línea desde el suelo?", "Contando los discos de las cadenas de aisladores: más discos, más tensión."]],
      quiz: [
        { t: "om", p: "Los cables de las líneas de transmisión…", o: ["Tienen un grueso aislamiento de plástico", "Son desnudos; el aire hace de aislante", "Son de plástico", "Están enterrados siempre"], c: 1, e: "Se mantienen separados en el aire." },
        { t: "om", p: "¿Para qué sirven los aisladores de las torres?", o: ["Para sostener el cable sin que la corriente pase a la torre", "Para medir la corriente", "Para enfriar el cable", "Para producir electricidad"], c: 0, e: "Son de vidrio, porcelana o polímero." },
        { t: "vf", p: "Una cadena de aisladores con más discos suele indicar una línea de mayor tensión.", c: true, e: "Hace falta más aislamiento." },
        { t: "om", p: "El cable más alto de una torre, conectado a tierra, se llama…", o: ["Fase", "Neutro", "Cable de guarda", "Acometida"], c: 2, e: "Protege contra rayos." },
        { t: "om", p: "Es seguro volar una cometa cerca de una línea de alta tensión si no se toca.", o: ["Verdadero", "Falso: el arco puede saltar y la cometa o su hilo pueden conducir"], c: 1, e: "Nunca se vuelan cometas ni drones cerca de las líneas.", crit: true }
      ],
      res: ["Las líneas de transmisión usan cables desnudos de aluminio con alma de acero.", "El aire y los aisladores evitan que la corriente pase a las torres.", "El cable de guarda protege de los rayos.", "Las subestaciones transforman, conectan y protegen.", "Nunca hay que acercarse a torres, líneas ni subestaciones."]
    },
    {
      id: "10-5", t: "Distribución", d: "Media y baja tensión, transformador de poste o de pedestal y red trifásica de barrio.", min: 35,
      preg: "¿Qué es esa caja gris (o verde) del poste o de la banqueta que a veces zumba?",
      obj: ["Describir la red de distribución en media y baja tensión.", "Explicar la función del transformador de distribución.", "Reconocer la red aérea y la subterránea."],
      txt: `La [[distribución]] es la parte de la red que lleva la energía desde las subestaciones hasta cada usuario. Es la red que ves en tu calle.

## Media tensión
Desde la subestación de distribución salen **alimentadores** de media tensión (13,2; 23; 34,5 kV, según el país) que recorren avenidas y calles. Normalmente son **tres fases**, en postes o bajo tierra. Las industrias grandes, hospitales y centros comerciales pueden conectarse directamente en media tensión y tener su propio transformador.

## El transformador de distribución
En la esquina o a mitad de la cuadra hay un **transformador de poste** (un tanque gris colgado) o **de pedestal** (una caja verde o gris en la banqueta, en redes subterráneas). Es la respuesta a la pregunta inicial: baja la media tensión a la **baja tensión** de las casas ({{V}} entre fase y neutro).

- Su potencia típica va de **15 a 150 kVA**: alimenta desde unas pocas hasta unas decenas de casas.
- Por dentro tiene un núcleo de hierro y bobinas sumergidas en **aceite** que aísla y enfría.
- Zumba a 100 o 120 Hz por la magnetostricción (lección 8.5).
- Tiene **fusibles** o cortacircuitos del lado de media tensión: si se funden, se queda sin luz todo el grupo de casas.

## La red de baja tensión
Del transformador sale la red de baja tensión hacia las casas: normalmente **tres fases y el neutro** (o, en algunos países de América, fase partida). Las casas se reparten entre las fases para **equilibrar** la carga. El **neutro** se conecta a tierra en el transformador y en varios puntos de la red.

## Red aérea y subterránea
| Aérea (postes) | Subterránea |
|---|---|
| Más barata y fácil de reparar | Más cara de construir |
| Expuesta a viento, árboles, choques y rayos | Protegida del clima; menos fallas |
| Impacto visual | Calles más limpias |
| Común en barrios y zonas rurales | Común en centros urbanos y fraccionamientos nuevos |

## Protecciones de la red
- **Restauradores:** interruptores automáticos que, ante una falla momentánea (una rama que roza el cable), cortan y reconectan solos varias veces. Por eso a veces la luz «parpadea» dos o tres veces antes de irse o de volver.
- **Fusibles y cuchillas** en los ramales.
- **Apartarrayos** junto a los transformadores.

!> Nunca te acerques a un transformador de pedestal abierto o dañado, ni trepes a un poste. Si ves un cable caído en la calle, aléjate al menos 10 metros y llama a la compañía eléctrica o a emergencias (lección 13.6).`,
      form: [["Casas por transformador ≈ kVA del transformador / demanda media por casa (kW)", "Estimación aproximada."]],
      ej: { enun: "Un transformador de 75 kVA alimenta casas con una demanda simultánea media de 2,5 kW cada una. ¿Cuántas casas puede alimentar aproximadamente (suponiendo kVA ≈ kW)?", pasos: ["Casas ≈ 75 / 2,5 = 30.", "En la práctica se deja margen para picos y crecimiento."], res: "Unas 30 casas." },
      vida: "Cuando se va la luz solo en tu cuadra, lo más probable es que se haya fundido el fusible del transformador de distribución o que haya una falla en la baja tensión. Si se va en toda la colonia, el problema suele estar en el alimentador de media tensión.",
      err: ["Pensar que el transformador de poste es una «caja de luz» sin peligro.", "Creer que todas las casas de una calle están en la misma fase.", "Pensar que un cable caído es seguro porque no hace chispas."],
      ejer: [["¿Qué voltaje recibe el transformador de poste y cuál entrega?", "Recibe media tensión (13,2–34,5 kV) y entrega baja tensión (120/127 o 230 V)."], ["¿Por qué parpadea la luz a veces antes de irse?", "Por los restauradores, que cortan y reconectan automáticamente ante una falla."], ["Da una ventaja de la red subterránea.", "Menos fallas por clima, árboles o choques; mejor aspecto urbano."]],
      quiz: [
        { t: "om", p: "El transformador de poste…", o: ["Eleva el voltaje para la transmisión", "Baja la media tensión a la tensión de las casas", "Mide el consumo", "Genera electricidad"], c: 1, e: "Es el último transformador antes de las casas." },
        { t: "om", p: "¿Qué hay dentro de un transformador de distribución, además del núcleo y las bobinas?", o: ["Agua", "Aceite aislante", "Arena", "Nada"], c: 1, e: "El aceite aísla y enfría." },
        { t: "vf", p: "Los restauradores pueden cortar y reconectar la corriente automáticamente ante una falla momentánea.", c: true, e: "Por eso la luz puede parpadear." },
        { t: "om", p: "Una ventaja de la red aérea frente a la subterránea es…", o: ["Que nunca falla", "Que es más barata y fácil de reparar", "Que no tiene voltaje", "Que es invisible"], c: 1, e: "Pero está más expuesta." },
        { t: "om", p: "Si ves un cable caído en la calle, debes…", o: ["Moverlo con un palo", "Alejarte al menos 10 m y avisar a la compañía o a emergencias", "Tocarlo para ver si tiene corriente", "Pisarlo con zapatos de goma"], c: 1, e: "Puede estar energizado y el suelo alrededor también.", crit: true }
      ],
      res: ["La distribución lleva la energía de las subestaciones a los usuarios.", "La media tensión (13,2–34,5 kV) recorre las calles.", "El transformador de poste o de pedestal baja a la tensión de las casas.", "La red puede ser aérea o subterránea, con restauradores y fusibles.", "Nunca hay que acercarse a transformadores ni a cables caídos."]
    },
    {
      id: "10-6", t: "La acometida y el medidor", d: "Cómo entra la electricidad a la casa, tipos de medidor y quién es responsable de cada tramo.", min: 30, e: true, exp: "e-observar-red",
      preg: "¿Dónde termina la red de la compañía y dónde empieza la instalación de tu casa?",
      obj: ["Describir la acometida y el medidor.", "Distinguir los tipos de medidor.", "Saber quién es responsable de cada parte de la instalación."],
      txt: `Desde la red de baja tensión de la calle, un último tramo de cable llega hasta tu casa: la [[acometida]].

## La acometida
- **Aérea:** cables trenzados desde el poste hasta un soporte en la fachada o un mástil (tubo vertical) en el techo.
- **Subterránea:** cables que salen de un registro en la banqueta y entran por un tubo enterrado.

Según el país y el consumo, una casa recibe **una fase y neutro** (lo más común), **dos fases y neutro** (por ejemplo, para aire acondicionado a 220 V en México) o **tres fases y neutro**.

## El medidor
El [[medidor]] (contador) registra la **energía consumida en kWh**. Hay varios tipos:
- **Electromecánico:** un disco de aluminio gira impulsado por las corrientes inducidas por dos bobinas (una de voltaje y otra de corriente); un contador de rodillos acumula los kWh. Cuanto más rápido gira el disco, más potencia se está usando.
- **Digital (electrónico):** mide voltaje y corriente con circuitos electrónicos y muestra los kWh en una pantalla. Un LED parpadea un número fijo de veces por kWh (por ejemplo, 1 000 veces por kWh).
- **Inteligente:** un medidor digital que envía las lecturas a la compañía a distancia, permite tarifas horarias y, a veces, desconectar o reconectar sin visitas.
- **Bidireccional:** en casas con paneles solares, registra la energía que entra y la que sale hacia la red (medición neta, lección 10.8).

## Leer el medidor
- En el electromecánico, los rodillos muestran los kWh acumulados.
- En el digital, la pantalla alterna varios datos; el que se factura suele indicarse con un código o la etiqueta «kWh».

Con dos lecturas a la misma hora en días distintos sabes tu consumo diario (experimento de la lección 6.4).

## ¿Quién es responsable de qué?
| Tramo | Responsable habitual |
|---|---|
| Red de la calle, transformador, acometida hasta el medidor (incluido) | La compañía eléctrica |
| Base del medidor, interruptor principal, tablero y toda la instalación interior | El propietario o usuario |

Esto varía según el país, pero la idea general es la misma: **del medidor hacia la calle, la compañía; del medidor hacia dentro, tú**. Las reparaciones del lado de la compañía las hace la compañía; las del lado de la casa, un **electricista calificado**.

!> El medidor y la acometida están sellados. Abrirlos, manipularlos o conectarse antes del medidor es **peligroso** (no hay ninguna protección antes del medidor) y es un **delito** en casi todos los países.

## La observación guiada
En el experimento de esta lección identificarás desde la banqueta, **sin tocar nada**, el transformador, la acometida, el medidor y el interruptor principal de tu casa.`,
      vida: "Algunos medidores digitales tienen un LED que parpadea con cada fracción de kWh: si lo cuentas durante un minuto con un solo aparato encendido, puedes estimar su potencia.",
      err: ["Creer que la acometida y el medidor son parte de la instalación que puedes manipular.", "Pensar que el medidor mide la potencia: acumula energía (kWh).", "Conectarse antes del medidor «para ahorrar»: es peligroso e ilegal."],
      ejer: [["¿Qué es la acometida?", "El tramo de cable desde la red de la calle hasta el medidor de la casa."], ["¿Qué registra el medidor?", "La energía consumida, en kWh."], ["¿De quién es responsabilidad el tablero de la casa?", "Del propietario o usuario (con un electricista calificado)."]],
      quiz: [
        { t: "om", p: "La acometida es…", o: ["El tablero de la casa", "El tramo de cable desde la red hasta el medidor", "Un tipo de foco", "La central eléctrica"], c: 1, e: "Conecta la casa a la red." },
        { t: "om", p: "Un medidor bidireccional se usa en casas con…", o: ["Gas natural", "Paneles solares conectados a la red", "Calentador de agua", "Pozos de agua"], c: 1, e: "Registra la energía que entra y la que sale." },
        { t: "vf", p: "Manipular el medidor o conectarse antes de él es peligroso e ilegal.", c: true, e: "Antes del medidor no hay ninguna protección.", crit: true },
        { t: "om", p: "En general, la instalación del medidor hacia dentro de la casa es responsabilidad de…", o: ["La compañía eléctrica", "El propietario o usuario", "Los vecinos", "Nadie"], c: 1, e: "Con un electricista calificado." },
        { t: "om", p: "En un medidor electromecánico, si el disco gira más rápido significa que…", o: ["Hay menos consumo", "Se está usando más potencia en ese momento", "El medidor está roto", "Es de noche"], c: 1, e: "La velocidad del disco es proporcional a la potencia." }
      ],
      res: ["La acometida lleva la energía de la red al medidor de la casa.", "El medidor acumula la energía consumida en kWh.", "Hay medidores electromecánicos, digitales, inteligentes y bidireccionales.", "Del medidor hacia la calle responde la compañía; hacia dentro, el usuario.", "Manipular el medidor o la acometida es peligroso e ilegal."]
    },
    {
      id: "10-7", t: "El equilibrio de la red", d: "Oferta y demanda en tiempo real, la frecuencia como pulso de la red, apagones y su recuperación.", min: 40, sim: "S13",
      preg: "¿Por qué a veces se va la luz en todo un país al mismo tiempo?",
      obj: ["Explicar por qué la generación debe igualar al consumo en cada instante.", "Relacionar el desequilibrio con la frecuencia.", "Describir las causas de los apagones y cómo se recupera la red."],
      txt: `La red eléctrica tiene una regla de hierro: **en cada instante, la energía generada debe ser igual a la consumida** (más las pérdidas). Como casi no hay almacenamiento, cualquier desequilibrio aparece de inmediato.

## La frecuencia: el pulso de la red
Todos los generadores de la red giran sincronizados. Si de pronto el consumo **aumenta** (millones de personas encienden el aire acondicionado), los generadores reciben más «freno» eléctrico (ley de Lenz) y **se frenan un poquito**: la **frecuencia baja** (por ejemplo, de 60,00 a 59,95 Hz). Si el consumo **baja**, se aceleran y la frecuencia sube.

Por eso la frecuencia es el **termómetro** del equilibrio. Los operadores la vigilan segundo a segundo.

## Cómo se mantiene el equilibrio
1. **Inercia:** las enormes masas giratorias de las turbinas amortiguan los cambios durante los primeros segundos.
2. **Regulación primaria (segundos):** los generadores tienen reguladores automáticos que abren más el paso de vapor o agua cuando la frecuencia baja.
3. **Regulación secundaria (minutos):** el centro de control ordena a ciertas centrales subir o bajar su producción para devolver la frecuencia a su valor exacto.
4. **Planificación (horas y días):** se predice la demanda (clima, día de la semana, eventos) y se programa qué centrales funcionarán.
5. **Almacenamiento y respuesta de la demanda:** baterías de red, bombeo y grandes consumidores que reducen su consumo cuando se les pide.

## La curva de demanda
El consumo cambia a lo largo del día: baja de madrugada, sube por la mañana y suele tener un **pico** al anochecer (luces, cocina, televisión, aire acondicionado). En lugares calurosos el pico puede ser a media tarde. La simulación S13 muestra una curva de demanda típica: cambia la hora y observa cómo varía la generación necesaria.

## ¿Por qué ocurren los apagones?
- **Falla de un elemento grande:** una central o una línea importante se desconecta de golpe y el resto no compensa a tiempo.
- **Demanda récord:** olas de calor o frío que superan la capacidad disponible.
- **Fenómenos naturales:** huracanes, tormentas, incendios, terremotos.
- **Efecto dominó:** cuando la frecuencia cae demasiado, las protecciones desconectan centrales para no dañarlas, lo que agrava el déficit.

Para evitar el colapso total, la red tiene **deslastre de carga automático**: si la frecuencia baja de cierto umbral, se desconectan zonas enteras de forma controlada para salvar el resto. Es mejor un apagón parcial que uno total.

## Recuperarse de un apagón total
Volver a encender una red apagada (**arranque en negro**) es delicado: hay que arrancar centrales que puedan hacerlo sin energía externa (hidroeléctricas, diésel), energizar líneas poco a poco y reconectar a los usuarios por bloques, manteniendo el equilibrio en cada paso. Puede tardar **horas**.

## Qué hacer en un apagón
- Desconecta los aparatos sensibles para evitar picos al volver la luz.
- Usa linternas, no velas cerca de cortinas.
- Mantén cerrado el refrigerador.
- **Nunca** conectes un generador portátil a un contacto (lección 8.7).`,
      form: [["Generación = Consumo + Pérdidas (en cada instante)", "Regla de equilibrio de la red."], ["Generación < Consumo → la frecuencia baja", "Y al revés: si sobra generación, sube."]],
      ej: { enun: "Una red de 10 000 MW pierde de golpe una central de 1 000 MW. Si la reserva de las demás centrales puede subir 600 MW en segundos, ¿qué déficit queda y qué podría hacer el sistema?", pasos: ["Déficit inicial: 1 000 MW.", "Reserva rápida: 600 MW → déficit restante: 400 MW.", "La frecuencia sigue bajando; si cruza el umbral, el deslastre automático desconecta unos 400 MW de consumo (zonas) para recuperar el equilibrio."], res: "Quedan 400 MW de déficit; se compensan con deslastre de carga hasta que entren más centrales." },
      vida: "Algunas compañías piden «no usar aparatos de alto consumo entre las 18 y las 22 h» en olas de calor: es la gestión de la demanda para no superar la capacidad en la hora pico.",
      err: ["Pensar que la red tiene un gran depósito de electricidad.", "Creer que un apagón se arregla «subiendo un interruptor».", "Conectar un generador a un contacto durante un apagón."],
      ejer: [["¿Qué le pasa a la frecuencia si el consumo supera a la generación?", "Baja."], ["¿Qué es el deslastre de carga?", "Desconectar zonas de consumo de forma controlada para evitar un colapso total."], ["¿A qué hora suele ser el pico de demanda?", "Normalmente al anochecer (o a media tarde en zonas calurosas)."]],
      quiz: [
        { t: "om", p: "En la red, en cada instante…", o: ["La generación debe igualar al consumo más las pérdidas", "Se genera el doble de lo que se consume", "Se guarda la electricidad sobrante en los cables", "No importa el equilibrio"], c: 0, e: "Es la regla de hierro de la red." },
        { t: "om", p: "Si de pronto el consumo aumenta, la frecuencia…", o: ["Sube", "Baja un poco", "No cambia", "Se vuelve cero"], c: 1, e: "Los generadores se frenan." },
        { t: "vf", p: "El deslastre de carga desconecta zonas a propósito para evitar un apagón total.", c: true, e: "Es mejor un apagón parcial controlado." },
        { t: "om", p: "Arrancar una red después de un apagón total se llama…", o: ["Arranque en negro", "Carga rápida", "Rectificación", "Inducción"], c: 0, e: "Requiere centrales que arranquen sin energía externa." },
        { t: "om", p: "Durante un apagón es recomendable…", o: ["Conectar un generador a un contacto", "Desconectar los aparatos sensibles", "Abrir el refrigerador a menudo", "Usar velas junto a cortinas"], c: 1, e: "Evita daños por picos al volver la luz." }
      ],
      res: ["La generación debe igualar al consumo en cada instante.", "La frecuencia baja si falta generación y sube si sobra.", "Inercia, reguladores, centros de control y almacenamiento mantienen el equilibrio.", "El deslastre de carga evita apagones totales.", "Recuperar una red apagada (arranque en negro) lleva horas."]
    },
    {
      id: "10-8", t: "Redes inteligentes y generación en casa", d: "Paneles solares en la casa, medición neta, autos eléctricos y almacenamiento.", min: 35, calc: "C5",
      preg: "¿Puede tu casa producir electricidad y vendérsela a la red?",
      obj: ["Explicar qué es la generación distribuida.", "Describir cómo funciona una instalación solar en casa y la medición neta.", "Conocer las características de una red inteligente."],
      txt: `La red tradicional era de **un solo sentido**: grandes centrales → consumidores. Hoy se está transformando en una red de **dos sentidos**, en la que millones de casas y empresas también producen energía.

## Generación distribuida
La [[generación distribuida]] es la producción de electricidad **cerca de donde se consume**: paneles solares en techos, pequeños aerogeneradores, cogeneración en fábricas. Reduce las pérdidas de transmisión y la dependencia de las grandes centrales.

## Paneles solares en casa
Una instalación típica tiene:
1. **Paneles fotovoltaicos** en el techo (cada uno de 400–600 W de pico), que producen **CD**.
2. Un **inversor** que convierte la CD en CA sincronizada con la red ({{V}}, {{HZ}}).
3. Protecciones y un **medidor bidireccional**.
4. Opcionalmente, una **batería** para guardar la energía del mediodía.

¿Cuánto produce? Depende de la radiación solar del lugar. Como orientación, un panel de **400 W** produce entre **500 y 700 kWh al año** en lugares soleados (unos 1,4–1,9 kWh al día). Una instalación de 8 paneles (3,2 kWp) podría producir unos 4 000–5 600 kWh al año, lo que consume una casa media.

= Producción diaria ≈ potencia pico (kW) × horas de sol pico

Las **horas de sol pico** van de unas 3,5 a 6 según la región.

## La medición neta
Con la **medición neta** (en algunos países, «balance neto»), cuando tus paneles producen más de lo que consumes, el excedente va a la red y el medidor lo **descuenta**. Por la noche tomas energía de la red. Al final del periodo pagas solo la **diferencia**. Las reglas exactas (si te pagan el excedente, a qué precio, con qué límites) dependen de cada país.

?> Por seguridad, los inversores conectados a la red tienen **protección anti-isla**: si se va la luz de la red, se desconectan solos en fracciones de segundo, para no energizar los cables mientras los técnicos los reparan. Sin batería, una casa con paneles **también se queda sin luz** en un apagón.

## Autos eléctricos
Un auto eléctrico consume unos 15–20 kWh cada 100 km. Si millones se cargan a la misma hora, la red sufre; si se cargan de noche o cuando sobra energía solar, ayudan a equilibrarla. En el futuro, con la tecnología **V2G** (del vehículo a la red), podrían devolver energía en los picos.

## La red inteligente
Una [[red inteligente]] incorpora comunicaciones y sensores en toda la red:
- **Medidores inteligentes** con lecturas cada pocos minutos y tarifas horarias.
- **Automatización:** detecta fallas, aísla el tramo dañado y reconecta el resto por otro camino en segundos.
- **Gestión de la demanda:** aparatos que se encienden cuando la energía es más barata o abundante.
- **Integración** de renovables, baterías y autos eléctricos.

## Lo que puedes hacer
- Desplazar consumos (lavadora, carga del auto) a las horas en que la energía es más barata o más renovable.
- Si tienes la posibilidad, estudiar una instalación solar con un instalador certificado y usar la calculadora C5 para comparar tu consumo con la producción estimada.`,
      form: [["Producción diaria (kWh) ≈ kW pico × horas de sol pico", "Estimación de una instalación solar."], ["Pago ≈ energía tomada − energía inyectada (medición neta)", "Según las reglas de cada país."]],
      ej: { enun: "Una casa instala 6 paneles de 450 W en un lugar con 5 horas de sol pico y un 80 % de rendimiento del sistema. ¿Cuánto produce al día y al año?", pasos: ["Potencia pico: 6 × 450 = 2 700 W = 2,7 kWp.", "Producción diaria: 2,7 × 5 × 0,8 = 10,8 kWh.", "Producción anual: 10,8 × 365 ≈ 3 942 kWh."], res: "Unos 10,8 kWh al día y unos 3 940 kWh al año." },
      vida: "En muchos países ya es común ver techos con paneles solares; con medición neta, en los meses soleados el recibo puede quedar casi en el cargo fijo.",
      err: ["Creer que con paneles solares sin batería la casa tiene luz durante un apagón.", "Pensar que un panel de 400 W produce 400 W todo el día.", "Instalar paneles sin un instalador certificado ni el permiso de la compañía."],
      ejer: [["¿Qué aparato convierte la CD de los paneles en CA para la casa?", "El inversor."], ["Un sistema de 3 kWp con 4,5 horas de sol pico y 80 % de rendimiento: ¿kWh al día?", "3 × 4,5 × 0,8 = 10,8 kWh."], ["¿Qué es la protección anti-isla?", "La desconexión automática del inversor cuando falla la red, para no energizar los cables."]],
      quiz: [
        { t: "om", p: "La generación distribuida es…", o: ["Generar en grandes centrales lejanas", "Generar electricidad cerca de donde se consume", "Repartir la electricidad por correo", "Un tipo de transformador"], c: 1, e: "Por ejemplo, paneles en los techos." },
        { t: "om", p: "Con la medición neta…", o: ["La casa no puede inyectar energía a la red", "El excedente que inyectas se descuenta de lo que consumes", "Pagas el doble", "No se usa medidor"], c: 1, e: "Se factura la diferencia." },
        { t: "vf", p: "Una casa con paneles solares sin batería sigue teniendo luz durante un apagón.", c: false, e: "La protección anti-isla desconecta el inversor." },
        { t: "num", p: "Un sistema de 2,7 kWp con 5 horas de sol pico y 80 % de rendimiento, ¿cuántos kWh produce al día?", r: 10.8, u: "kWh", e: "2,7 × 5 × 0,8 = 10,8 kWh." },
        { t: "om", p: "¿Qué caracteriza a una red inteligente?", o: ["Que no tiene cables", "Medidores, sensores y comunicaciones que permiten gestionar la red en tiempo real", "Que solo usa carbón", "Que no necesita transformadores"], c: 1, e: "Digitalización y gestión activa." }
      ],
      res: ["La red pasa de un solo sentido a dos sentidos.", "Los paneles solares producen CD y un inversor la convierte en CA.", "Con medición neta, el excedente inyectado se descuenta.", "Sin batería, una casa solar se queda sin luz en un apagón (protección anti-isla).", "Las redes inteligentes integran renovables, baterías y autos eléctricos."]
    }
  ]
});
