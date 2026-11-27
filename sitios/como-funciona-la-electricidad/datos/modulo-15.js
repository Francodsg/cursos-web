// M15. Laboratorio: experimentos seguros, simulaciones, calculadoras y proyecto final
registrarModulo({
  id: "m15", n: 15, nivel: 4, titulo: "Laboratorio: experimentos, simulaciones, calculadoras y proyecto final", quizMin: 60, quizN: 15, minEsperado: 415,
  objetivo: "Integrar todo lo aprendido con experimentos seguros, el uso combinado de simulaciones y calculadoras, y un proyecto final de dos partes.",
  clave: "laboratorio taller kit proyecto final auditoria energetica examen certificado",
  actividades: ["Completar el taller de calculadoras (lección 15.3) y comprobar cada resultado con su simulación.", "Realizar el proyecto final A (auditoría energética) y el B (circuito controlado) con sus rúbricas.", "Presentar el [examen final](#/examen-final) y obtener el [certificado](#/certificado)."],
  ejemplos: ["Auditoría: inventario de 12 aparatos en la calculadora C5, comparación con el recibo y plan de ahorro del 15 %.", "Circuito final: luz nocturna con LDR, transistor y LED, calculada, simulada, montada y medida."],
  sims: ["S5", "S15", "S18", "S19", "CASA"], calcs: ["C1", "C2", "C3", "C5", "C10", "C17"], gen: ["ohmI", "serie", "paralelo", "energia", "led"],
  evaluacion: "Quiz de repaso del laboratorio de 15 preguntas y, como cierre del curso, el **examen final** de 40 preguntas de todos los módulos (60 min), que se aprueba con el 75 % y da el certificado. Los proyectos A y B se evalúan con rúbricas de autoevaluación.",
  extra: [
    { t: "om", p: "En el proyecto de auditoría energética, el consumo estimado con la calculadora es muy distinto del recibo. ¿Qué revisas primero?", o: ["Nada: la calculadora siempre acierta", "Las horas de uso y los aparatos olvidados", "El color del medidor", "El voltaje de las pilas"], c: 1, e: "Solemos subestimar horas y olvidar aparatos (bombas, calentadores, consumo en espera).", lec: "15-7" }
  ],
  lecciones: [
    {
      id: "15-1", t: "Cómo usar el laboratorio virtual", d: "Índice de las 21 simulaciones y las 17 calculadoras; cómo registrar resultados.", min: 25,
      preg: "¿Qué herramienta del curso usarías para cada pregunta que te hagas sobre un circuito?",
      obj: ["Conocer todas las simulaciones y calculadoras del curso.", "Elegir la herramienta adecuada para cada problema.", "Registrar y comprobar resultados con método."],
      txt: `El curso incluye un **laboratorio virtual** completo que puedes usar sin riesgo y sin materiales. Esta lección es un mapa para sacarle el máximo provecho.

## Las 21 simulaciones
| Tema | Simulaciones |
|---|---|
| Cargas y campos | [S1 Globo y estática](#/simulacion/S1), [S2 Ley de Coulomb](#/simulacion/S2) |
| Circuitos básicos | [S3 Analogía del agua](#/simulacion/S3), [S4 Electrones en movimiento](#/simulacion/S4) |
| Serie, paralelo y Kirchhoff | [S5 Constructor de circuitos](#/simulacion/S5), [S6 Kirchhoff de dos mallas](#/simulacion/S6) |
| Corriente alterna | [S7 Osciloscopio virtual](#/simulacion/S7) |
| Magnetismo e inducción | [S8 Campo magnético](#/simulacion/S8), [S9 Inducción de Faraday](#/simulacion/S9) |
| Máquinas | [S10 Generador y motor](#/simulacion/S10), [S11 Transformador](#/simulacion/S11) |
| Baterías y red | [S12 Batería](#/simulacion/S12), [S13 Red eléctrica](#/simulacion/S13) |
| Casa y seguridad | [S14 Tablero](#/simulacion/S14), [S15 Multímetro](#/simulacion/S15), [S16 Cuerpo humano](#/simulacion/S16), [S21 Interruptor de escalera](#/simulacion/S21) |
| Electrónica | [S17 Capacitor RC](#/simulacion/S17), [S18 LED](#/simulacion/S18), [S19 Transistor](#/simulacion/S19), [S20 Puertas lógicas](#/simulacion/S20) |
| Energía | [Casa virtual de consumo](#/simulacion/CASA) |

## Las 17 calculadoras
| Para… | Calculadoras |
|---|---|
| Circuitos | [C1 Ohm](#/calculadora/C1), [C2 Potencia](#/calculadora/C2), [C3 Equivalente](#/calculadora/C3), [C4 Divisores](#/calculadora/C4) |
| Consumo y ahorro | [C5 Consumo y costo](#/calculadora/C5), [C6 Consumo fantasma](#/calculadora/C6), [C17 Ahorro con LED](#/calculadora/C17) |
| Baterías y máquinas | [C7 Autonomía](#/calculadora/C7), [C8 Transformador](#/calculadora/C8) |
| Electrónica | [C9 Código de colores](#/calculadora/C9), [C10 LED](#/calculadora/C10), [C13 RC](#/calculadora/C13) |
| Instalaciones y red | [C11 Cable](#/calculadora/C11), [C12 RMS](#/calculadora/C12), [C16 Pérdidas](#/calculadora/C16) |
| Unidades y materiales | [C14 Conversor](#/calculadora/C14), [C15 Resistividad](#/calculadora/C15) |

## Método de trabajo en el laboratorio
1. **Pregunta:** escribe qué quieres averiguar («¿cuánto brillará cada foco si…?»).
2. **Predicción:** calcula en papel lo que esperas.
3. **Calculadora:** comprueba el cálculo; revisa los pasos que muestra.
4. **Simulación:** observa el comportamiento y compara con tu predicción.
5. **Experimento real** (si es seguro, con pilas de 9 V o menos): mide con el multímetro.
6. **Registro:** anota en una tabla la predicción, el cálculo, la simulación y la medición. Explica las diferencias (tolerancias, resistencia interna de la pila, errores de medida).

## Consejos
- Las calculadoras aceptan coma o punto y prefijos (20 mA, 4k7, 100µ).
- Las simulaciones que usan la red se ajustan a lo que elegiste en **Ajustes** (127 V/60 Hz o 230 V/50 Hz).
- Marca en cada ficha de experimento «Ya hice este experimento»: queda guardado en tu progreso.

?> Las simulaciones son **modelos simplificados**: muestran el comportamiento esencial, no todos los detalles del mundo real.`,
      vida: "Los ingenieros trabajan igual: primero calculan, luego simulan en la computadora y solo al final construyen el prototipo y lo miden.",
      err: ["Usar la calculadora sin entender los pasos.", "Creer que la simulación es exactamente la realidad.", "Pasar directamente al montaje sin predecir ni calcular."],
      ejer: [["¿Qué simulación usarías para ver por qué se transmite en alta tensión?", "S13 Red eléctrica (y la calculadora C16)."], ["¿Qué calculadora usarías para saber cuántos kWh gasta tu casa?", "C5 Consumo y costo."], ["Ordena: medir, predecir, simular, calcular.", "Predecir, calcular, simular, medir."]],
      quiz: [
        { t: "om", p: "Para ver la diferencia entre el valor pico y el eficaz usarías…", o: ["S7 Osciloscopio", "S1 Globo", "C9 Colores", "S20 Puertas"], c: 0, e: "Muestra ambas líneas." },
        { t: "om", p: "Para elegir la resistencia de un LED usarías…", o: ["C10", "C16", "C6", "C12"], c: 0, e: "Resistencia para LED." },
        { t: "ord", p: "Ordena el método del laboratorio:", o: ["Plantear la pregunta", "Predecir", "Calcular", "Simular", "Medir y registrar"], e: "De la idea a la comprobación." },
        { t: "vf", p: "Las simulaciones del curso son modelos simplificados de la realidad.", c: true, e: "Muestran lo esencial." },
        { t: "om", p: "¿Qué simulación muestra qué pasa al medir corriente en paralelo?", o: ["S15 Multímetro", "S12 Batería", "S2 Coulomb", "S8 Campo"], c: 0, e: "Funde el fusible virtual." }
      ],
      res: ["El laboratorio tiene 21 simulaciones, una casa virtual y 17 calculadoras.", "Cada herramienta corresponde a un tema del curso.", "Método: pregunta, predicción, cálculo, simulación, medición y registro.", "Las simulaciones de red usan tu configuración de Ajustes.", "Las simulaciones son modelos simplificados."]
    },
    {
      id: "15-2", t: "Tu kit casero seguro", d: "Lista de compras: portapilas, pilas de 9 V y AA, LED, resistencias, protoboard, cables, multímetro, imanes y alambre esmaltado; lo que no se debe comprar.", min: 30, e: true,
      preg: "¿Qué necesitas comprar para hacer todos los experimentos del curso, y qué no deberías comprar nunca?",
      obj: ["Armar un kit de experimentación seguro y económico.", "Saber qué componentes y herramientas son útiles.", "Evitar materiales peligrosos."],
      txt: `Con un kit pequeño y barato puedes hacer prácticamente todos los experimentos del curso. Estos son los materiales recomendados (los precios varían mucho por país; compra en tiendas de electrónica confiables).

## Lo básico
| Material | Cantidad | Para qué |
|---|---|---|
| Pilas de 9 V con conectores de broche | 2 | Casi todos los circuitos |
| Pilas AA y portapilas de 2 y 4 | 4 pilas | Serie, paralelo, gráfica V–I |
| Protoboard de 400 u 830 puntos | 1 | Montar sin soldar |
| Cables de puente (macho-macho) | 20–40 | Conexiones en la protoboard |
| Cables con pinzas de cocodrilo | 10 | Conectar pilas, limones, objetos |
| LED de colores (rojo, verde, amarillo, azul, blanco) | 20 | Indicadores |
| Resistencias surtidas (¼ W, serie E12) | Kit de 100 o más | Limitar corrientes |
| Multímetro digital sencillo | 1 | Medir (con continuidad) |

## Para el Nivel 4
- **Transistores NPN** (BC547, 2N2222): 5.
- **Diodos** 1N4007 y 1N4148: 5 de cada uno.
- **Capacitores electrolíticos** de 100, 470 y 1 000 µF (16 V o más) y cerámicos surtidos.
- **LDR** (fotorresistencias): 2.
- **Potenciómetro** de 10 kΩ: 2.
- **Pulsadores** e interruptores pequeños: 4.
- **Zumbador activo** de 5–12 V: 1.
- **Interruptor de lengüeta** e imán pequeño: 1.

## Para magnetismo
- **Brújula** pequeña.
- **Alambre de cobre esmaltado** (calibre 22–26): un rollo pequeño.
- **Clavos de hierro** y clips.
- **Imanes:** de ferrita (seguros) y, con supervisión de un adulto, uno de neodimio para el motor homopolar y el tubo de cobre.
- **Motorcito de CD** de juguete (3–6 V).

## Herramientas
- Pinzas de punta y de corte pequeñas.
- Pelacables.
- Cinta aislante.
- Gafas de seguridad (al cortar alambres, las puntas salen disparadas).

## Lo que NO debes comprar ni usar para experimentar
!> - Fuentes de alimentación que se conectan a la red y se abren, o «transformadores» de la red sin carcasa.
- Cables con enchufe para conectar a la pared.
- Baterías de litio sueltas sin protección (tipo 18650) y cargadores baratos sin certificación.
- Baterías de auto o de moto.
- Capacitores grandes de alto voltaje (de fuentes o de cámaras desarmadas).
- Kits que digan «bobina de Tesla», «electroimán de alto voltaje» o similares.
- Cualquier cosa que implique abrir microondas, televisores o fuentes de computadora.

## Orden y cuidado
- Guarda los componentes en una caja con compartimentos y etiquetas.
- Las pilas, con los polos tapados o en su empaque, separadas de los objetos metálicos.
- Recicla las pilas agotadas en un punto de recolección.
- Mantén los imanes de neodimio y las pilas de botón **fuera del alcance de niños pequeños**.`,
      vida: "Muchos «kits de iniciación a la electrónica» traen casi todo lo de esta lista en una caja: protoboard, LED, resistencias, transistores, sensores, cables y, a veces, un microcontrolador.",
      err: ["Comprar fuentes de alimentación de la red para «tener más voltaje».", "Usar baterías de litio sueltas sin protección.", "Guardar pilas sueltas junto a clips y monedas."],
      ejer: [["Nombra cinco materiales del kit básico.", "Pila de 9 V, protoboard, LED, resistencias y multímetro (también cables y portapilas)."], ["¿Por qué no se usan baterías de auto para experimentar?", "Pueden dar corrientes enormes en cortocircuito, quemar y explotar."], ["¿Qué gafas o protección se recomienda al cortar alambres?", "Gafas de seguridad."]],
      quiz: [
        { t: "om", p: "¿Cuál de estos materiales NO debe usarse para experimentar en casa?", o: ["Pila de 9 V", "Protoboard", "Fuente de computadora desarmada", "LED"], c: 2, e: "Tiene voltajes de la red y capacitores peligrosos.", crit: true },
        { t: "om", p: "Las resistencias del kit suelen ser de…", o: ["100 W", "¼ W", "10 kW", "1 MW"], c: 1, e: "Suficiente para circuitos de 9 V." },
        { t: "vf", p: "Los imanes de neodimio deben guardarse fuera del alcance de niños pequeños.", c: true, e: "Son muy peligrosos si se tragan." },
        { t: "om", p: "¿Para qué sirven los cables de puente?", o: ["Para conectar componentes en la protoboard", "Para conectar a la red", "Para medir voltaje", "Para cargar baterías"], c: 0, e: "Conexiones sin soldar." },
        { t: "om", p: "Al cortar alambres conviene usar…", o: ["Guantes de cocina", "Gafas de seguridad", "Nada", "Un imán"], c: 1, e: "Las puntas pueden salir disparadas." }
      ],
      res: ["Con pilas de 9 V, protoboard, LED, resistencias y un multímetro haces casi todo.", "Para el Nivel 4 añade transistores, diodos, capacitores, LDR y potenciómetros.", "Para magnetismo, brújula, alambre esmaltado, clavos e imanes.", "Nunca compres ni uses fuentes de la red, baterías de litio sueltas o de auto.", "Guarda todo ordenado y lejos de los niños pequeños."]
    },
    {
      id: "15-3", t: "Taller de calculadoras", d: "Doce problemas reales que se resuelven combinando Ohm, potencia, serie/paralelo y consumo.", min: 45, e: true, calc: ["C1", "C2", "C3", "C5"],
      preg: "¿Puedes resolver problemas reales combinando varias calculadoras, como lo haría un técnico?",
      obj: ["Combinar varias fórmulas y calculadoras en un mismo problema.", "Interpretar los resultados en situaciones reales.", "Comprobar los cálculos con las simulaciones."],
      txt: `Doce problemas reales. Resuélvelos primero en papel y después compruébalos con las calculadoras indicadas (y, cuando se pueda, con una simulación).

## Circuitos
**1. El LED del cargador** (C10). Un indicador LED verde de 2,2 V y 10 mA se alimenta con 5 V. → R = (5 − 2,2)/0,01 = **280 Ω** → comercial **330 Ω** (I ≈ 8,5 mA).

**2. Tres focos** (C3 + C1). Focos de 20 Ω, 30 Ω y 60 Ω en paralelo con 12 V. → Req = **10 Ω**; I = **1,2 A**. Compruébalo en S5 (modo paralelo).

**3. El circuito mixto** (C3). 5 Ω + ((10 + 20) ∥ 30) con 40 V. → Req = **20 Ω**; I = **2 A**.

**4. El divisor del sensor** (C4). 5 V, R₁ = 10 kΩ y R₂ (LDR) = 2 kΩ. → Vout = 5 × 2/12 ≈ **0,83 V**.

## Potencia
**5. ¿Cabe en el circuito?** (C2). Un calefactor de 2 000 W a 127 V. → I ≈ **15,7 A**: no cabe en un circuito de 15 A. A 230 V: 8,7 A.

**6. La resistencia del hervidor** (C2). 1 500 W a 230 V. → R = 230²/1 500 ≈ **35,3 Ω**.

**7. El cable que se calienta** (C2). Por un cable de 0,3 Ω pasan 12 A. → P = 12² × 0,3 = **43,2 W** de calor.

## Energía y costo
**8. El mes del refrigerador** (C5). 150 W de potencia media, 10 h/día, 30 días, tarifa $1,50/kWh. → **45 kWh**; **$67,50**.

**9. Consumo fantasma** (C6). 6 aparatos a 2 W en espera durante 22 h/día, $1,50/kWh. → **96,4 kWh/año**; unos **$145**.

**10. Cambiar a LED** (C17). 8 focos de 60 W por LED de 9 W, 4 h/día, $1,50/kWh, $40 cada LED. → **595,7 kWh/año**; **$893** de ahorro; se recupera en unos **4,3 meses**.

## Baterías y red
**11. El viaje en avión** (C7/C14). ¿Puede ir en la cabina una batería externa de 26 800 mAh a 3,7 V? → 99,2 Wh: **sí** (por debajo de 100 Wh).

**12. Pérdidas de transmisión** (C16). 50 MW por una línea de 4 Ω a 115 kV. → I ≈ 435 A; pérdidas ≈ **756 kW (1,5 %)**. A 230 kV: **189 kW**.

## Reflexión
En cada problema intervienen varias ideas: la ley de Ohm, la potencia, el reparto en serie o en paralelo, la energía en el tiempo. Esa es la forma de trabajar de un técnico: descomponer el problema en partes conocidas.`,
      form: [["V = I·R · P = V·I · E = P·t", "Las tres fórmulas que resuelven la mayoría de los problemas."]],
      ej: { enun: "Una regleta de 1 500 W máx. a 127 V tiene conectados un televisor (100 W), una consola (150 W) y un calefactor (1 500 W). ¿Se supera su capacidad? ¿Qué corriente pasa?", pasos: ["Potencia total: 100 + 150 + 1 500 = 1 750 W.", "1 750 W > 1 500 W: se supera la capacidad.", "Corriente: 1 750 / 127 ≈ 13,8 A.", "Solución: conectar el calefactor directamente a la pared."], res: "Sí: 1 750 W (13,8 A) superan los 1 500 W de la regleta." },
      vida: "Estos son exactamente los cálculos que hace un electricista antes de recomendar un circuito nuevo, o un asesor de energía antes de proponerte un plan de ahorro.",
      err: ["Usar valores en mA o kΩ sin convertirlos.", "Olvidar que la potencia de una regleta es la suma de todo lo conectado.", "No comparar el resultado con la realidad."],
      ejer: [["Comprueba el problema 2 en la simulación S5.", "Con tres focos de 20, 30 y 60 Ω en paralelo a 12 V, la corriente total es 1,2 A."], ["Repite el problema 8 con una tarifa de $2,20/kWh.", "45 × 2,20 = $99."], ["Repite el problema 1 con un LED rojo de 2 V.", "R = (5 − 2)/0,01 = 300 Ω → 330 Ω."]],
      quiz: [
        { t: "num", p: "Focos de 20, 30 y 60 Ω en paralelo. ¿Req?", r: 10, u: "Ω", e: "1/Req = 1/20 + 1/30 + 1/60 = 6/60 → 10 Ω." },
        { t: "num", p: "Un calefactor de 2 000 W a 127 V. ¿Corriente? (A)", r: 15.75, u: "A", e: "2 000 / 127 ≈ 15,7 A." },
        { t: "num", p: "Refrigerador: 150 W, 10 h/día, 30 días. ¿kWh?", r: 45, u: "kWh", e: "150 × 10 × 30 / 1 000 = 45 kWh." },
        { t: "num", p: "¿Cuántos Wh tiene una batería externa de 26 800 mAh a 3,7 V?", r: 99.16, u: "Wh", e: "26 800 × 3,7 / 1 000 ≈ 99,2 Wh." },
        { t: "vf", p: "La potencia total de una regleta es la suma de las potencias de todo lo conectado.", c: true, e: "Están en paralelo: las corrientes se suman." }
      ],
      res: ["Los problemas reales combinan Ohm, potencia, serie/paralelo y energía.", "Primero en papel, después con la calculadora, luego con la simulación.", "La potencia de una regleta es la suma de todo lo conectado.", "Los ahorros con LED se recuperan en pocos meses.", "Descomponer un problema en partes conocidas es la clave."]
    },
    {
      id: "15-4", t: "Taller de estática y magnetismo", d: "Repaso práctico con los mejores experimentos de M1 y M7, más un reporte.", min: 45, sim: ["S1", "S9"], exp: ["e-globo", "e-electroscopio", "e-oersted", "e-electroiman"],
      preg: "¿Puedes explicar con tus propios experimentos por qué electricidad y magnetismo son dos caras de lo mismo?",
      obj: ["Repetir experimentos clave de estática y magnetismo.", "Relacionar cada observación con su explicación.", "Escribir un reporte de laboratorio."],
      txt: `Este taller reúne en una sesión los experimentos más reveladores de los módulos 1 y 7. Al final escribirás un **reporte de laboratorio**.

## Estación 1: electricidad estática
**Experimentos:** el globo que atrae papelitos y desvía el agua; el electroscopio casero.
- **Observa:** atracción de objetos neutros; separación de las tiras del electroscopio.
- **Explica:** transferencia de electrones al frotar (lección 1.6), polarización, inducción.
- **Pregunta extra:** ¿por qué funciona peor en un día húmedo?

## Estación 2: la corriente crea magnetismo
**Experimento:** el de Oersted con una brújula y una pila.
- **Observa:** la aguja gira al cerrar el circuito y gira al revés al invertir la pila.
- **Explica:** el campo circular alrededor del cable y la regla de la mano derecha (lección 7.3).

## Estación 3: el electroimán
**Experimento:** clavo, alambre y pila, con 10, 20 y 30 vueltas.
- **Observa:** más vueltas, más clips.
- **Explica:** B ∝ N·I; el núcleo de hierro concentra el campo (lección 7.4).
- **Datos:** haz una gráfica de clips frente a vueltas.

## Estación 4: el magnetismo crea corriente (simulación)
**Simulación:** S9 Inducción de Faraday.
- **Observa:** el galvanómetro solo se mueve cuando el imán se mueve; cambia de lado al invertir el movimiento; más vueltas, más voltaje.
- **Explica:** ley de Faraday y ley de Lenz (lecciones 7.6 y 7.7).
- Si tienes un motorcito, compruébalo en la realidad: girándolo a mano obtienes voltaje (experimento de la lección 8.2).

## El reporte de laboratorio
Un reporte científico sencillo tiene estas partes:
1. **Título** y fecha.
2. **Objetivo:** qué querías comprobar.
3. **Hipótesis:** qué esperabas que pasara y por qué.
4. **Materiales.**
5. **Procedimiento:** pasos numerados, para que otra persona pueda repetirlo.
6. **Resultados:** tablas, gráficas y fotos.
7. **Análisis:** explicación con los conceptos del curso; comparación con la hipótesis.
8. **Conclusión:** respuesta al objetivo en pocas líneas.
9. **Seguridad:** qué precauciones tomaste.

## La gran conclusión
Con estas estaciones habrás comprobado por ti mismo las tres ideas del electromagnetismo: las **cargas** se atraen y se repelen; una **corriente** crea un campo magnético; un **campo magnético que cambia** crea una corriente. Sobre estas ideas funcionan los motores, los generadores, los transformadores y toda la red eléctrica.`,
      vida: "Los científicos del siglo XIX, como Oersted y Faraday, hicieron experimentos muy parecidos a estos con materiales igual de sencillos.",
      err: ["Dejar el electroimán conectado demasiado tiempo: se calienta.", "No anotar los datos en el momento.", "Escribir conclusiones que no se apoyan en los resultados."],
      ejer: [["¿Qué tres ideas del electromagnetismo comprueba el taller?", "Las cargas se atraen/repelen; la corriente crea un campo magnético; un campo variable crea corriente."], ["Nombra las partes de un reporte de laboratorio.", "Título, objetivo, hipótesis, materiales, procedimiento, resultados, análisis, conclusión y seguridad."], ["¿Qué variable cambias en la estación 3?", "El número de vueltas."]],
      quiz: [
        { t: "om", p: "En el experimento de Oersted, al invertir la pila, la aguja…", o: ["No se mueve", "Gira al lado contrario", "Se desimanta", "Gira más rápido"], c: 1, e: "El campo se invierte." },
        { t: "om", p: "En la simulación de Faraday, el galvanómetro marca voltaje cuando…", o: ["El imán está quieto dentro", "El imán se mueve", "La bobina es de plástico", "Nunca"], c: 1, e: "Solo con cambio de flujo." },
        { t: "vf", p: "En un reporte de laboratorio, la hipótesis se escribe antes de hacer el experimento.", c: true, e: "Es lo que esperas que ocurra." },
        { t: "om", p: "Un electroimán de 30 vueltas, comparado con uno de 10 con la misma corriente…", o: ["Levanta menos", "Levanta más", "Levanta igual", "No funciona"], c: 1, e: "B ∝ N·I." },
        { t: "om", p: "La estática funciona peor en días húmedos porque…", o: ["Hay menos electrones", "La humedad descarga los objetos", "El agua es aislante", "Hace frío"], c: 1, e: "Una capa de humedad deja escapar la carga." }
      ],
      res: ["El taller repite los experimentos clave de estática y magnetismo.", "Las cargas se atraen y repelen; la corriente crea magnetismo.", "Un campo magnético que cambia induce corriente.", "Un reporte de laboratorio sigue una estructura clara.", "Estas ideas son la base de motores, generadores y transformadores."]
    },
    {
      id: "15-5", t: "Taller de circuitos con pilas", d: "Serie, paralelo, medición y diagnóstico: cinco montajes guiados con tabla de datos.", min: 50, e: true, sim: ["S5", "S15"], exp: ["e-led-serie-paralelo", "e-medir-corriente-led", "e-vi"],
      preg: "¿Coinciden tus mediciones reales con lo que predicen la ley de Ohm y las de Kirchhoff?",
      obj: ["Montar circuitos en serie y en paralelo en la protoboard.", "Medir voltajes y corrientes y comprobar las leyes del Nivel 1.", "Diagnosticar fallas con el multímetro."],
      txt: `En este taller comprobarás con mediciones reales lo que calculaste en los módulos 2 a 4 y 12. Necesitas la protoboard, una pila de 9 V (o 4 pilas AA), resistencias, LED y el multímetro.

## Montaje 1: la ley de Ohm
Experimento de la **gráfica V–I** (con 1 a 4 pilas AA y una resistencia de 100 Ω).
- **Predicción:** con 1,5 V, I = 15 mA; con 6 V, I = 60 mA.
- **Medición:** voltaje en paralelo, corriente en serie.
- **Comprueba:** ¿la gráfica es una recta? ¿Su pendiente es unos 100 Ω?

## Montaje 2: resistencias en serie
Pila de 9 V con 1 kΩ, 2,2 kΩ y 4,7 kΩ en serie.
- **Predicción:** Req = 7,9 kΩ; I ≈ 1,14 mA; caídas ≈ 1,14 V, 2,51 V y 5,35 V.
- **Medición:** voltaje en cada resistencia y la corriente.
- **Comprueba la LVK:** ¿la suma de caídas da el voltaje medido de la pila?

## Montaje 3: resistencias en paralelo
Pila de 9 V con 1 kΩ y 2,2 kΩ en paralelo.
- **Predicción:** I₁ = 9 mA; I₂ ≈ 4,1 mA; I total ≈ 13,1 mA; Req ≈ 688 Ω.
- **Medición:** la corriente de cada rama y la total.
- **Comprueba la LCK:** ¿I₁ + I₂ = I total?

## Montaje 4: LED en serie y en paralelo
El experimento de LED en serie y en paralelo: compara brillos y lo que pasa al quitar uno. Mide la corriente de un LED con su resistencia (experimento de medición de corriente).

## Montaje 5: diagnóstico
Pide a otra persona que prepare en secreto **una falla** en un circuito con dos LED en paralelo: un LED al revés, un cable de puente en la columna equivocada, una resistencia de valor muy alto o una pila gastada. Encuentra la falla con el multímetro siguiendo el método de la lección 12.8.

## Tabla de resultados
| Magnitud | Predicción | Medición | Diferencia (%) |
|---|---|---|---|
| Req (montaje 2) | 7,9 kΩ | | |
| I (montaje 2) | 1,14 mA | | |
| I total (montaje 3) | 13,1 mA | | |

## ¿Por qué no coinciden exactamente?
- **Tolerancia** de las resistencias (±5 %).
- La pila no da exactamente 9 V (y su voltaje baja con la carga).
- **Precisión** del multímetro.
- Resistencia de los cables y contactos de la protoboard.

Diferencias de hasta un 5–10 % son normales. Si la diferencia es mucho mayor, revisa el montaje: probablemente hay un error de conexión.`,
      form: [["Diferencia (%) = |medición − predicción| / predicción × 100", "Para comparar teoría y práctica."]],
      ej: { enun: "En el montaje 2 mides una corriente de 1,10 mA cuando predijiste 1,14 mA. ¿Cuál es la diferencia porcentual? ¿Es aceptable?", pasos: ["Diferencia = |1,10 − 1,14| / 1,14 × 100.", "= 0,04 / 1,14 × 100 ≈ 3,5 %.", "Menos del 5–10 %: aceptable (tolerancias y voltaje real de la pila)."], res: "Un 3,5 %: aceptable." },
      vida: "En la industria se hace exactamente esto: se compara cada producto con su especificación y se aceptan las diferencias dentro de una tolerancia.",
      err: ["Medir corriente en paralelo.", "No medir el voltaje real de la pila antes de comparar.", "Pensar que la teoría falla por diferencias pequeñas."],
      ejer: [["Predice la corriente con 9 V y 1 kΩ + 2 kΩ en serie.", "3 mA."], ["En paralelo, 9 V con 3 kΩ y 6 kΩ: ¿corriente total?", "3 mA + 1,5 mA = 4,5 mA."], ["Mides 4,3 mA cuando esperabas 4,5 mA. ¿Diferencia?", "≈ 4,4 %."]],
      quiz: [
        { t: "num", p: "9 V con 1 kΩ, 2,2 kΩ y 4,7 kΩ en serie. ¿Corriente en mA?", r: 1.139, u: "", e: "9 / 7 900 ≈ 1,14 mA." },
        { t: "num", p: "9 V con 1 kΩ y 2,2 kΩ en paralelo. ¿Corriente total en mA?", r: 13.09, u: "", e: "9 + 4,09 ≈ 13,1 mA." },
        { t: "om", p: "Una diferencia del 4 % entre predicción y medición…", o: ["Indica que la ley de Ohm falla", "Es normal por tolerancias y precisión", "Significa un cortocircuito", "Es imposible"], c: 1, e: "Hasta un 5–10 % es habitual." },
        { t: "vf", p: "Para comprobar la LVK hay que medir el voltaje real de la pila.", c: true, e: "La pila no da exactamente 9 V." },
        { t: "om", p: "En el montaje de diagnóstico, si un LED de dos en paralelo no enciende, lo primero que revisas es…", o: ["Su orientación y su resistencia", "El medidor de la casa", "La frecuencia de la red", "El color de la protoboard"], c: 0, e: "Polaridad, conexión y resistencia de esa rama." }
      ],
      res: ["Las mediciones reales confirman la ley de Ohm y las de Kirchhoff.", "En serie se comprueba la LVK; en paralelo, la LCK.", "Diferencias del 5–10 % son normales.", "Tolerancias, pila real y precisión explican las diferencias.", "El diagnóstico sigue un método: fuente, camino y componentes."]
    },
    {
      id: "15-6", t: "Construye una batería casera", d: "Pila de limones, monedas o agua salada; optimizar el número de celdas para encender un LED.", min: 40, sim: "S12", exp: ["e-limones", "e-monedas"],
      preg: "¿Cuántos limones hacen falta para encender un LED?",
      obj: ["Construir baterías con materiales caseros.", "Optimizar la conexión en serie y en paralelo.", "Relacionar los resultados con la química de las pilas."],
      txt: `Volta construyó la primera pila con discos de metal y cartón empapado. Tú puedes hacer lo mismo con limones, papas o monedas, y aplicar lo aprendido sobre serie, paralelo y resistencia interna.

## El reto
Encender un LED rojo (necesita unos **1,8–2 V** y al menos 1–2 mA para verse) con una batería hecha en casa.

## Paso 1: mide una celda
Construye una celda (un limón con un clavo galvanizado y una moneda de cobre) y mide:
- **Voltaje sin carga:** unos **0,8–1,0 V**.
- **Corriente de cortocircuito** (multímetro en mA, brevemente): unos **0,5–1 mA**.

La corriente es muy pequeña porque la **resistencia interna** del limón es enorme (cientos a miles de ohmios).

## Paso 2: ¿cuántas en serie?
Para superar el voltaje del LED:
- 1 limón ≈ 0,9 V → no basta.
- 2 limones ≈ 1,8 V → justo en el umbral: el LED apenas brilla o no.
- 3 limones ≈ 2,7 V → el LED brilla débilmente.
- 4 limones ≈ 3,6 V → brilla mejor.

## Paso 3: ¿y en paralelo?
Si el LED brilla muy poco, el problema es la **corriente**. Dos grupos de 3 limones en serie, conectados en **paralelo** (3S2P, lección 9.6), dan el mismo voltaje con el **doble de corriente** disponible: el LED brilla más.

## Paso 4: mejora la celda
- **Más superficie** de electrodos (tiras de cobre y de zinc más grandes): menos resistencia interna.
- **Electrodos más cerca** (sin tocarse).
- **Mejor electrolito:** prueba vinagre con sal, agua salada o papas **hervidas** (suelen dar más corriente que las crudas).

## Paso 5: la pila de monedas
Apila monedas de cobre y arandelas galvanizadas separadas por cartón empapado en vinagre con sal: cada capa es una celda en serie. Con 4 o 5 capas superas los 2 V.

## Tabla de resultados
| Configuración | Voltaje (V) | ¿Enciende el LED? | Brillo |
|---|---|---|---|
| 1 limón | | | |
| 3 en serie | | | |
| 4 en serie | | | |
| 3S2P | | | |

## ¿De dónde sale la energía?
**No del limón:** el ácido es solo el electrolito. La energía sale de la **oxidación del zinc** del clavo galvanizado, que se va desgastando. Si dejas la pila conectada días, el zinc se consume y la pila se agota, igual que una pila comercial.

?> No comas los limones ni las papas después del experimento: tienen zinc y cobre disueltos.`,
      form: [["V total = n × V celda (serie)", "Para alcanzar el voltaje del LED."], ["I disponible ≈ m × I celda (m grupos en paralelo)", "Para aumentar la corriente."]],
      ej: { enun: "Cada limón da 0,9 V y como máximo 0,6 mA. ¿Qué configuración necesitas para tener al menos 2,5 V y 1,2 mA?", pasos: ["Voltaje: 2,5 / 0,9 ≈ 2,8 → 3 limones en serie (2,7 V).", "Corriente: 1,2 / 0,6 = 2 → 2 grupos en paralelo.", "Configuración 3S2P: 6 limones en total."], res: "3S2P: 6 limones." },
      vida: "Las celdas de los relojes de papa que venden como juguete educativo funcionan igual: el reloj digital consume tan poco que le basta la corriente diminuta de dos papas.",
      err: ["Conectar los limones al revés en la serie (cobre con cobre).", "Pensar que la energía sale del jugo de limón.", "Esperar que una pila casera encienda un motor."],
      ejer: [["¿Cuántos limones de 0,9 V en serie necesitas para superar 2 V?", "3 (2,7 V)."], ["¿Por qué un LED brilla poco con 4 limones en serie?", "Porque la corriente es muy pequeña por la gran resistencia interna."], ["¿Qué metal se consume en la pila de limón?", "El zinc del clavo galvanizado."]],
      quiz: [
        { t: "num", p: "Cada limón da 0,9 V. ¿Qué voltaje dan 4 limones en serie?", r: 3.6, u: "V", e: "4 × 0,9 = 3,6 V." },
        { t: "om", p: "Para obtener más corriente de una batería de limones conviene…", o: ["Poner más limones en serie", "Conectar grupos en paralelo", "Usar limones más ácidos y solo uno", "Calentar el LED"], c: 1, e: "En paralelo se suman las corrientes." },
        { t: "om", p: "La energía de la pila de limón proviene de…", o: ["El jugo de limón", "La oxidación del zinc", "El cobre", "La luz"], c: 1, e: "El zinc se consume." },
        { t: "vf", p: "Se pueden comer los limones después del experimento.", c: false, e: "Tienen metales disueltos." },
        { t: "om", p: "La corriente de una celda de limón es pequeña porque…", o: ["El limón no tiene voltaje", "Su resistencia interna es muy grande", "El LED es grande", "El cobre es aislante"], c: 1, e: "Cientos o miles de ohmios." }
      ],
      res: ["Una celda casera da menos de 1 V y muy poca corriente.", "En serie se alcanza el voltaje necesario.", "En paralelo se consigue más corriente.", "Más superficie y mejor electrolito reducen la resistencia interna.", "La energía sale de la oxidación del zinc, no del limón."]
    },
    {
      id: "15-7", t: "Proyecto final A: auditoría energética de tu casa", d: "Inventario de aparatos, consumo estimado frente al recibo real, plan de ahorro con cifras y revisión de seguridad.", min: 60, e: true, calc: ["C5", "C6", "C17"], sim: "CASA", exp: ["e-medidor", "e-recorrido-seguridad"],
      preg: "¿Cuánta energía usa realmente tu casa, en qué se va y cuánto podrías ahorrar sin perder comodidad?",
      obj: ["Elaborar un inventario energético completo de la casa.", "Comparar la estimación con el consumo real del recibo y del medidor.", "Proponer un plan de ahorro cuantificado y una revisión de seguridad."],
      rubrica: ["**Inventario completo:** al menos 12 aparatos con potencia, horas de uso y días, cargados en la calculadora C5.", "**Comparación con la realidad:** consumo estimado frente a recibo y lectura del medidor, con la diferencia explicada.", "**Plan de ahorro con cifras:** al menos 5 medidas con kWh y dinero ahorrados al año (C6 y C17).", "**Revisión de seguridad:** recorrido completo con la lista de la lección 13.5 y acciones definidas.", "**Presentación:** informe claro con tablas o gráficas y una conclusión."],
      txt: `El primer proyecto final aplica los módulos 6, 10, 11 y 13 a un caso real: **tu propia casa**. Al terminar, tendrás un informe útil para tu familia.

## Parte 1: inventario (calculadora C5)
1. Recorre la casa y anota **todos** los aparatos: los evidentes (refrigerador, televisor, focos) y los olvidados (bomba de agua, calentador, módem de internet, cargadores, aparatos en espera).
2. Para cada uno, la **potencia** de la placa de datos (o la tabla de la lección 6.3) y estima las **horas de uso al día** y los **días al mes**. Para el refrigerador y el aire acondicionado usa horas equivalentes de funcionamiento (ciclos).
3. Cárgalos en la calculadora C5 con la tarifa de **tu recibo** (fija o por escalones).
4. Anota el total de kWh al mes y la gráfica de reparto.

## Parte 2: comparación con la realidad
1. Toma el **consumo del recibo** y divídelo entre los días del periodo para obtener el consumo diario.
2. Haz el experimento de leer el **medidor** dos días seguidos.
3. Compara: estimación de C5 frente a recibo y medidor.
4. **Explica la diferencia:** horas subestimadas, aparatos olvidados, consumo en espera, estacionalidad (aire acondicionado en verano), o —si es enorme— una posible fuga que debe revisar un electricista.

## Parte 3: plan de ahorro
Propón **al menos cinco medidas** y calcula su ahorro anual en kWh y en dinero:
- Cambio de focos a LED (C17).
- Eliminación del consumo fantasma con regletas (C6).
- Ajuste del termostato del aire acondicionado o del calentador (por ejemplo, un 6 % menos de consumo por grado).
- Desplazar usos a horas más baratas (si tu tarifa es horaria).
- Revisar el refrigerador: distancia a la pared, empaques, temperatura.
- Reducir el tiempo de uso de los aparatos de mayor consumo.

Suma los ahorros y calcula el **porcentaje** respecto del consumo actual. Un objetivo realista es un **10–20 %**.

## Parte 4: revisión de seguridad
Haz el recorrido de seguridad (lección 13.5) y anota los riesgos y las acciones: qué puede resolver la familia (reemplazar una extensión, tapar contactos) y qué requiere un electricista (contactos calientes, falta de diferencial o de tierra).

## Parte 5: informe
Organiza todo en un informe con: inventario, gráfica de reparto, comparación, plan de ahorro con cifras, revisión de seguridad y conclusión. Usa la rúbrica de abajo para autoevaluarte: marca cada criterio cuando lo cumplas; queda guardado en tu progreso.`,
      form: [["Ahorro (%) = Σ kWh ahorrados / kWh actuales × 100", "Meta realista: 10–20 %."]],
      ej: { enun: "Una casa consume 300 kWh/mes. El plan propone: LED (−15 kWh/mes), regletas (−8), termostato del aire (−20) y refrigerador bien colocado (−5). ¿Ahorro porcentual y anual con $1,80/kWh?", pasos: ["Ahorro mensual: 15 + 8 + 20 + 5 = 48 kWh.", "Porcentaje: 48 / 300 × 100 = 16 %.", "Anual: 48 × 12 = 576 kWh × 1,80 = $1 036,80."], res: "16 % de ahorro; unos 576 kWh y $1 037 al año." },
      vida: "Las auditorías energéticas profesionales de empresas y edificios siguen exactamente estos pasos, con instrumentos que registran el consumo de cada circuito durante días.",
      err: ["Olvidar los aparatos que funcionan las 24 horas.", "Proponer medidas sin cuantificarlas.", "Abrir tableros o contactos durante la revisión de seguridad."],
      ejer: [["¿Qué datos necesitas de cada aparato para el inventario?", "Potencia, horas de uso al día y días al mes."], ["Tu estimación da 200 kWh y el recibo 280 kWh. Menciona dos posibles causas.", "Horas subestimadas, aparatos olvidados o consumo en espera."], ["¿Qué meta de ahorro es realista?", "Entre un 10 y un 20 %."]],
      quiz: [
        { t: "om", p: "En el inventario energético, ¿qué aparato se suele olvidar?", o: ["El refrigerador", "El módem de internet y los aparatos en espera", "El televisor", "La lavadora"], c: 1, e: "Consumos pequeños pero continuos." },
        { t: "num", p: "Una casa consume 300 kWh/mes y ahorra 48 kWh/mes. ¿Porcentaje de ahorro?", r: 16, u: "", e: "48 / 300 × 100 = 16 %." },
        { t: "vf", p: "Durante la revisión de seguridad se pueden abrir los contactos para ver los cables.", c: false, e: "Solo se mira; lo demás es trabajo de electricista.", crit: true },
        { t: "om", p: "¿Qué calculadora sirve para el inventario completo de la casa?", o: ["C5", "C9", "C13", "C12"], c: 0, e: "Consumo y costo." },
        { t: "om", p: "Si la diferencia entre la estimación y el recibo es enorme y no se explica, conviene…", o: ["Ignorarla", "Pedir a un electricista que revise posibles fugas", "Cambiar el medidor uno mismo", "Desconectar el refrigerador"], c: 1, e: "Puede haber una fuga en la instalación." }
      ],
      res: ["La auditoría empieza con un inventario completo en la C5.", "Se compara con el recibo y con lecturas del medidor.", "El plan de ahorro se cuantifica en kWh y dinero.", "La revisión de seguridad se hace solo mirando.", "Un ahorro del 10–20 % es una meta realista."]
    },
    {
      id: "15-8", t: "Proyecto final B: circuito controlado", d: "Diseñar, calcular, simular y montar un circuito de pila con LED, interruptor y transistor (o LDR), y medirlo con el multímetro.", min: 60, e: true, sim: ["S18", "S19"], calc: ["C10", "C13"], exp: "e-luz-nocturna",
      preg: "¿Puedes llevar una idea desde el papel hasta un circuito que funcione y cuyas mediciones coincidan con tus cálculos?",
      obj: ["Diseñar un circuito electrónico sencillo con un objetivo concreto.", "Calcular, simular, montar y medir el circuito.", "Documentar el proceso y evaluar los resultados."],
      rubrica: ["**Diseño:** objetivo claro y esquema con todos los componentes y valores.", "**Cálculos:** resistencias de LED y de base (y τ si hay capacitor) calculadas y con valores comerciales justificados.", "**Simulación:** comportamiento comprobado en S18, S19 o S17 antes de montar.", "**Montaje y mediciones:** circuito funcionando, con al menos 3 mediciones (voltajes y corriente) comparadas con los cálculos.", "**Seguridad y documentación:** solo pila de 9 V o menos; informe con fotos o dibujos, resultados y mejoras."],
      txt: `El segundo proyecto final aplica los módulos 3, 4, 12 y 14. Diseñarás un circuito **real**, alimentado con una pila de **9 V**, que haga algo útil.

## Elige un proyecto
1. **Luz nocturna automática** (LDR + transistor + LED): se enciende al oscurecer (lección 14.8).
2. **Alarma de puerta** (interruptor de lengüeta + transistor + zumbador).
3. **Luz de cortesía temporizada** (pulsador + capacitor + transistor + LED): se apaga sola tras unos segundos.
4. **Indicador de batería** (dos o tres LED que se encienden según el voltaje, con diodos Zener o divisores): más avanzado.
5. Una idea propia de dificultad similar, siempre con **9 V o menos**.

## Fase 1: diseño
- Escribe el **objetivo** en una frase («Un LED se enciende cuando la habitación queda a oscuras»).
- Dibuja el **esquema** con los símbolos de la lección 2.7, con nombres y valores (R1 = …, Q1 = BC547…).
- Haz la **lista de materiales**.

## Fase 2: cálculos
- **Resistencia del LED** con la calculadora C10: por ejemplo, 9 V, LED rojo de 2 V, 15 mA → 467 Ω → **470 Ω**.
- **Resistencia de base** del transistor (lección 14.7): Ic = 15 mA, β = 100 → Ib mín = 0,15 mA; con margen ×5, Ib = 0,75 mA. Si la base se alimenta desde unos 6 V del divisor a oscuras: Rb = (6 − 0,7)/0,00075 ≈ 7 kΩ → **6,8 kΩ** (o 4,7 kΩ para más margen).
- **Constante de tiempo** con C13 si usas un capacitor.
- **Potencias** de las resistencias.

## Fase 3: simulación
Comprueba el comportamiento en la simulación correspondiente (S18 para el LED, S19 para el transistor, S17 para el capacitor). Ajusta los valores si hace falta.

## Fase 4: montaje
- Monta en la protoboard **por partes**, probando cada una.
- Revisa polaridades (LED, electrolíticos) y las patitas del transistor.
- **Conecta la pila al final.** Si algo se calienta, desconecta.

## Fase 5: mediciones
Mide con el multímetro (lecciones 12.3 y 12.6) y compara con los cálculos:
| Magnitud | Calculado | Medido | Diferencia |
|---|---|---|---|
| Voltaje de la pila | 9 V | | |
| Voltaje en el LED encendido | ≈ 2 V | | |
| Corriente del LED | ≈ 15 mA | | |
| Voltaje base-emisor (encendido) | ≈ 0,7 V | | |

## Fase 6: informe y mejoras
Documenta con fotos o dibujos, la tabla de mediciones, qué funcionó, qué no y cómo lo mejorarías (por ejemplo, agregar histéresis para que la luz no parpadee al atardecer, o un zumbador). Autoevalúate con la rúbrica.

## ¡Final del curso!
Cuando termines los dos proyectos, presenta el **examen final** (40 preguntas, 75 % para aprobar) y descarga tu **certificado**. ¡Ya sabes cómo funciona la electricidad!`,
      form: [["R(LED) = (Vfuente − Vf) / I", "Resistencia del LED."], ["Rb = (Vbase − 0,7) / Ib", "Resistencia de base."], ["Diferencia (%) = |medido − calculado| / calculado × 100", "Comparación final."]],
      ej: { enun: "En la luz nocturna mides 18,6 mA en el LED cuando calculaste 15 mA. ¿Diferencia? ¿Qué podría explicarla?", pasos: ["Diferencia = (18,6 − 15) / 15 × 100 = 24 %.", "Es mayor que la tolerancia: revisa el valor de la resistencia del LED (¿pusiste 390 Ω en vez de 470 Ω?) y el voltaje real de la pila.", "Con 390 Ω: (9 − 2)/390 ≈ 18 mA: ¡coincide! Era la resistencia equivocada."], res: "Un 24 %; se explica por haber usado 390 Ω en lugar de 470 Ω." },
      vida: "Todos los productos electrónicos pasan por estas mismas fases: idea, esquema, cálculos, simulación, prototipo, pruebas y mejoras.",
      err: ["Montar sin haber calculado ni simulado.", "Saltarse las mediciones.", "Usar fuentes de más de 9 V o conectadas a la red."],
      ejer: [["Calcula la resistencia para un LED azul de 3 V a 15 mA con 9 V.", "(9 − 3)/0,015 = 400 Ω → 470 Ω (o 390 Ω si se acepta algo más de corriente)."], ["¿Por qué se usa un margen ×5 en la corriente de base?", "Para asegurar que el transistor se sature aunque β varíe."], ["¿Qué harías si el LED parpadea al atardecer?", "Añadir histéresis (o un capacitor) para que el cambio sea más estable."]],
      quiz: [
        { t: "ord", p: "Ordena las fases del proyecto:", o: ["Diseño y esquema", "Cálculos", "Simulación", "Montaje", "Mediciones e informe"], e: "De la idea al informe." },
        { t: "num", p: "9 V, LED rojo de 2 V, 15 mA: ¿resistencia calculada en Ω?", r: 466.7, u: "Ω", e: "(9 − 2)/0,015 ≈ 467 Ω → 470 Ω." },
        { t: "vf", p: "El proyecto B puede alimentarse con una fuente conectada a la red si es de buena calidad.", c: false, e: "Solo con pila de 9 V o menos.", crit: true },
        { t: "om", p: "Si una medición difiere mucho del cálculo, lo primero es…", o: ["Cambiar el cálculo para que coincida", "Revisar el montaje, los valores de los componentes y el voltaje real de la pila", "Ignorarla", "Cambiar de proyecto"], c: 1, e: "Suele ser un componente o una conexión equivocados." },
        { t: "om", p: "¿Qué simulación usarías para comprobar el transistor antes de montarlo?", o: ["S19", "S13", "S2", "S7"], c: 0, e: "Transistor como interruptor." }
      ],
      res: ["El proyecto B recorre diseño, cálculos, simulación, montaje y mediciones.", "Se calculan las resistencias del LED y de base con valores comerciales.", "Se simula antes de montar y se monta por partes.", "Las mediciones se comparan con los cálculos y se explican las diferencias.", "Al terminar: examen final y certificado del curso."]
    }
  ]
});
