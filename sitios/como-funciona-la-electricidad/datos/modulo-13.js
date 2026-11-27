// M13. Seguridad eléctrica
registrarModulo({
  id: "m13", n: 13, nivel: 3, titulo: "Seguridad eléctrica", quizMin: 30, quizN: 20, minEsperado: 310, criticas: true,
  objetivo: "Reconocer los riesgos eléctricos, entender los efectos de la corriente en el cuerpo, conocer las protecciones y saber actuar en una emergencia.",
  clave: "seguridad electrocucion choque descarga primeros auxilios riesgos proteccion nunca agua rayos cable caido",
  actividades: ["Elaborar un plan familiar de seguridad eléctrica: dónde está el tablero, cómo cortar la luz, números de emergencia.", "Hacer el recorrido de seguridad por la casa con la lista de revisión de la lección 13.5.", "Diseñar un póster con «Lo que NUNCA hay que hacer» (lección 13.8)."],
  ejemplos: ["127 V con las manos secas (unos 100 kΩ) dan unos 1,3 mA; con las manos mojadas (unos 1 kΩ), unos 127 mA: una corriente mortal.", "Con 230 V y los mismos valores: 2,3 mA y 230 mA."],
  sims: ["S16"], calcs: ["C1"], gen: ["cuerpo"],
  evaluacion: "Quiz de módulo de 20 preguntas (30 min). Incluye preguntas críticas de seguridad marcadas en rojo: para aprobar hay que acertarlas todas y además obtener el 70 %. Al aprobar M10–M13 obtienes el certificado del Nivel 3.",
  extra: [
    { t: "om", p: "¿Cuál es el número de emergencias más extendido en gran parte de América?", o: ["112", "911", "000", "999"], c: 1, e: "911 en gran parte de América; 112 en Europa.", lec: "13-7", crit: true },
    { t: "vf", p: "Es seguro usar una secadora de cabello dentro de la bañera si el contacto tiene diferencial.", c: false, e: "Nunca: el diferencial reduce el riesgo, pero no lo elimina.", lec: "13-8", crit: true }
  ],
  lecciones: [
    {
      id: "13-1", t: "Efectos de la corriente en el cuerpo", d: "Umbrales: 1 mA se percibe; unos 10 mA impiden soltar; más de 30 mA es peligroso; 50 a 100 mA, riesgo de fibrilación. Tiempo y trayectoria.", min: 40, e: true, sim: "S16",
      preg: "¿Por qué una corriente tan pequeña como una décima de amperio puede matar a una persona?",
      obj: ["Describir los efectos de la corriente según su intensidad.", "Explicar la importancia del tiempo y de la trayectoria.", "Entender por qué la CA de 50/60 Hz es especialmente peligrosa."],
      txt: `El cuerpo humano funciona con señales eléctricas diminutas: los nervios y el corazón usan voltajes de décimas de voltio. Cuando una corriente externa atraviesa el cuerpo, **interfiere** con esas señales y además **calienta** los tejidos. Es el [[choque eléctrico]].

## Lo que importa es la corriente
El daño depende sobre todo de **cuánta corriente** atraviesa el cuerpo (y por dónde y durante cuánto tiempo). El voltaje importa porque es lo que «empuja» esa corriente (lección 13.2).

## Efectos de la corriente alterna de 50/60 Hz (mano a mano o mano a pie)
| Corriente | Efecto típico |
|---|---|
| Menos de 0,5 mA | No se percibe |
| 0,5 a 5 mA | Cosquilleo, pequeña descarga; susto que puede causar caídas |
| 5 a 10 mA | Dolor; todavía se puede soltar el objeto |
| 10 a 30 mA | **Contracción muscular**: puede ser imposible soltarse; dificultad para respirar |
| 30 a 100 mA | **Peligro grave**: riesgo de [[fibrilación ventricular]] si dura más de una fracción de segundo |
| Más de 100 mA | Fibrilación muy probable, paro cardíaco, quemaduras internas |
| Varios amperios | Quemaduras graves, daño a órganos; el corazón puede detenerse |

Estos valores son **orientativos**: varían con cada persona, su peso, su salud y la situación.

## El umbral de «no soltar»
Por encima de unos 10 mA, los músculos del antebrazo se contraen y **la mano se cierra** sobre el objeto. La persona no puede soltarse aunque quiera, y la corriente sigue pasando. Es una de las razones por las que la electricidad de la red es tan peligrosa.

## La fibrilación ventricular
El corazón late gracias a impulsos eléctricos coordinados. Una corriente de unos 50–100 mA a través del pecho puede **desordenarlos**: las fibras del corazón se contraen sin coordinación (fibrilación) y el corazón **deja de bombear sangre**. Sin un **desfibrilador** y reanimación, la muerte llega en minutos.

## El tiempo
Cuanto más dura la corriente, más peligrosa. Por eso los **diferenciales** cortan en menos de 30–40 milisegundos: con 30 mA y menos de 40 ms, el riesgo de fibrilación es muy bajo.

## La trayectoria
- **Mano a mano** o **mano a pie:** la corriente atraviesa el **pecho** y el corazón: la más peligrosa.
- **Entre dos dedos de la misma mano:** no pasa por el pecho; puede quemar, pero es menos probable que afecte al corazón.

## ¿Por qué 50/60 Hz es tan peligrosa?
Las frecuencias de la red están en el rango que **más afecta** a los músculos y al corazón. La corriente directa también es peligrosa, aunque a igual intensidad produce menos contracciones sostenidas (pero más electrólisis y quemaduras). Las corrientes de muy alta frecuencia penetran menos.

## Las quemaduras
La corriente calienta los tejidos por efecto Joule, sobre todo en los puntos de **entrada y salida**, y también **por dentro** a lo largo de su camino. Las quemaduras eléctricas pueden parecer pequeñas por fuera y ser graves por dentro: **toda persona que haya recibido una descarga de la red debe ser revisada por un médico**.`,
      form: [["Peligro ≈ f(corriente, tiempo, trayectoria)", "Los tres factores determinan la gravedad."], ["Umbral de fibrilación ≈ 50–100 mA (pecho, > 0,1 s)", "Valor orientativo."]],
      ej: { enun: "Una persona toca una fase y por su cuerpo pasan 40 mA de mano a pie. ¿Qué riesgo hay? ¿Qué hará un diferencial de 30 mA?", pasos: ["40 mA está en la zona de 30–100 mA: riesgo grave de fibrilación si dura más de una fracción de segundo.", "40 mA es una fuga a tierra mayor que 30 mA.", "El diferencial cortará en menos de 30–40 ms, antes de que el corazón sufra la fibrilación en la mayoría de los casos."], res: "Riesgo grave, pero el diferencial corta en milisegundos y muy probablemente evita la fibrilación." },
      vida: "Los desfibriladores automáticos (DEA) que hay en aeropuertos, centros comerciales y estadios sirven justamente para revertir la fibrilación ventricular, se deba a una descarga eléctrica o a un infarto.",
      err: ["Pensar que lo que mata es solo el voltaje.", "Creer que si la persona «se ve bien» después de una descarga no necesita médico.", "Pensar que la corriente directa no es peligrosa."],
      ejer: [["¿A partir de qué corriente aproximada se pierde la capacidad de soltar un objeto?", "Unos 10 mA."], ["¿Por qué la trayectoria mano a mano es muy peligrosa?", "Porque la corriente atraviesa el pecho y el corazón."], ["¿Qué hace un desfibrilador?", "Aplica una descarga controlada que reinicia el ritmo normal del corazón en fibrilación."]],
      quiz: [
        { t: "om", p: "¿Qué determina principalmente el daño de un choque eléctrico?", o: ["El color del cable", "La corriente que atraviesa el cuerpo, el tiempo y la trayectoria", "Solo el voltaje", "La hora del día"], c: 1, e: "Corriente, tiempo y camino." },
        { t: "om", p: "Una corriente de unos 15 mA por el brazo…", o: ["No se nota", "Puede impedir soltar el objeto", "Es inofensiva siempre", "Recarga el cuerpo"], c: 1, e: "Por encima de unos 10 mA hay contracción muscular." },
        { t: "om", p: "La fibrilación ventricular es…", o: ["Una quemadura de la piel", "Una contracción desordenada del corazón que impide bombear sangre", "Un tipo de corriente", "Un aparato médico"], c: 1, e: "Puede causar la muerte en minutos.", crit: true },
        { t: "vf", p: "Toda persona que recibió una descarga de la red debe ser revisada por un médico, aunque se sienta bien.", c: true, e: "Las lesiones internas y del ritmo cardíaco pueden no notarse al principio.", crit: true },
        { t: "om", p: "¿Por qué los diferenciales cortan en menos de 40 ms?", o: ["Para ahorrar energía", "Porque cuanto menos dura la corriente, menor es el riesgo de fibrilación", "Por estética", "Para proteger el cable"], c: 1, e: "El tiempo es un factor clave." }
      ],
      res: ["El daño depende de la corriente, el tiempo y la trayectoria.", "A partir de unos 10 mA puede ser imposible soltarse.", "Entre 50 y 100 mA por el pecho hay riesgo de fibrilación ventricular.", "La CA de 50/60 Hz es especialmente peligrosa para músculos y corazón.", "Tras una descarga de la red, siempre hay que ir al médico."]
    },
    {
      id: "13-2", t: "Voltaje, corriente y resistencia del cuerpo", d: "Piel seca frente a mojada con la ley de Ohm; por qué los pájaros no se electrocutan.", min: 35, e: true, sim: "S16", calc: "C1",
      preg: "Si lo que mata es la corriente, ¿por qué se habla siempre de «alto voltaje»?",
      obj: ["Aplicar la ley de Ohm al cuerpo humano.", "Explicar el efecto de la humedad en la resistencia de la piel.", "Explicar por qué no se electrocuta un pájaro posado en un cable."],
      txt: `El cuerpo humano se comporta, de forma muy simplificada, como una **resistencia**. Por eso podemos aplicar la ley de Ohm:

= I(cuerpo) = V(contacto) / R(cuerpo)

El voltaje es lo que «empuja»; la resistencia del cuerpo decide cuánta corriente pasa.

## La resistencia del cuerpo
- El **interior** del cuerpo (sangre, músculos, con agua y sales) conduce bastante bien: unos **500 Ω** de mano a mano o de mano a pie.
- La **piel** es la principal barrera, pero cambia muchísimo:

| Situación | Resistencia total aproximada |
|---|---|
| Piel seca y gruesa, contacto pequeño | 100 000 Ω o más |
| Piel húmeda (sudor) | 5 000 a 10 000 Ω |
| Piel mojada o herida, contacto grande | 1 000 Ω o menos |
| Cuerpo sumergido en agua | unos cientos de ohmios |

Además, a partir de ciertos voltajes (unos 200 V o más) la piel **se perfora** y su resistencia cae bruscamente.

## Cálculos con la ley de Ohm
| Situación | 127 V | 230 V |
|---|---|---|
| Piel seca (100 kΩ) | 1,3 mA: cosquilleo | 2,3 mA: cosquilleo |
| Piel húmeda (10 kΩ) | 12,7 mA: no se puede soltar | 23 mA: contracción, peligro |
| Piel mojada (1 kΩ) | 127 mA: **mortal** | 230 mA: **mortal** |

!> El mismo contacto que con las manos secas apenas se siente puede ser mortal con las manos mojadas. **Agua y electricidad son una combinación mortal.**

Pruébalo en la simulación S16 (un modelo educativo simplificado): cambia el voltaje, el estado de la piel y la trayectoria.

## ¿Y entonces el voltaje?
Con 9 V, ni siquiera con la piel mojada (1 000 Ω) se superan los 9 mA, y además 9 V no perforan la piel. Por eso los experimentos del curso usan **9 V o menos**. Por debajo de unos **50 V en CA** (en ambientes secos) se considera **muy baja tensión de seguridad**; los juguetes y muchos equipos de baño usan 12 o 24 V.

En cambio, con cientos o miles de voltios la corriente puede ser enorme aunque la piel esté seca. Por eso se habla de «alto voltaje»: es lo que hace posible que pase una corriente peligrosa.

## ¿Por qué no se electrocutan los pájaros?
Un pájaro posado en **un solo cable** tiene sus dos patas sobre el mismo conductor, separadas unos centímetros. Entre sus patas hay una diferencia de voltaje **casi nula** (lo que cae en unos centímetros de cable grueso). Sin diferencia de voltaje no hay corriente por su cuerpo, aunque el cable esté a miles de voltios respecto de tierra.

Pero si un pájaro grande toca **a la vez dos cables** o un cable y el poste (que está a tierra), la corriente lo atraviesa y muere. Lo mismo le pasaría a una persona colgada de un cable que tocara el suelo, otro cable o una escalera metálica.

## Lo que hay que recordar
- La corriente necesita **dos puntos de contacto** a distinto voltaje: uno puede ser el **suelo**. Por eso estar descalzo en un piso mojado es tan peligroso.
- Zapatos de suela aislante, pisos secos y no tocar objetos metálicos conectados a tierra (llaves de agua, tuberías) **reducen** el riesgo, pero **no** lo eliminan.`,
      form: [["I(cuerpo) = V / R(cuerpo)", "Ley de Ohm aplicada al cuerpo (modelo simplificado)."], ["R(cuerpo) ≈ 500 Ω (interior) + resistencia de la piel", "La piel mojada reduce mucho la resistencia total."]],
      ej: { enun: "Una persona con las manos mojadas (1 000 Ω) toca la fase de una red de 230 V estando descalza en el suelo. ¿Qué corriente pasa y qué efecto tiene?", pasos: ["I = V / R = 230 / 1 000 = 0,23 A = 230 mA.", "230 mA supera con mucho los 100 mA.", "Fibrilación muy probable si no hay un diferencial que corte de inmediato."], res: "230 mA: potencialmente mortal." },
      vida: "Por eso los secadores de cabello tienen etiquetas de advertencia, los contactos de los baños tienen diferencial y los equipos que se usan cerca del agua (como las bombas de acuarios o las luces de piscina) funcionan con muy baja tensión.",
      err: ["Creer que si la persona está seca no hay ningún riesgo con la red.", "Pensar que los pájaros resisten la electricidad.", "Creer que unos zapatos de goma garantizan la seguridad."],
      ejer: [["127 V con 10 kΩ de resistencia corporal: ¿corriente y efecto?", "12,7 mA: puede impedir soltarse."], ["¿Qué corriente pasaría con 12 V y 1 000 Ω?", "12 mA."], ["¿Por qué un pájaro en un cable no se electrocuta?", "Porque sus dos patas están casi al mismo voltaje: no hay diferencia que haga pasar corriente."]],
      quiz: [
        { t: "num", p: "Con 127 V y una resistencia corporal de 1 000 Ω, ¿qué corriente pasa? (en A)", r: 0.127, u: "A", e: "127 / 1 000 = 0,127 A = 127 mA." },
        { t: "om", p: "La humedad en la piel…", o: ["Aumenta mucho la resistencia del cuerpo", "Reduce mucho la resistencia del cuerpo", "No cambia nada", "Convierte la CA en CD"], c: 1, e: "Por eso agua y electricidad son mortales.", crit: true },
        { t: "om", p: "Un pájaro posado en un solo cable de alta tensión no se electrocuta porque…", o: ["Las plumas aíslan", "Entre sus patas casi no hay diferencia de voltaje", "Es muy pequeño", "El cable no tiene voltaje"], c: 1, e: "Sin diferencia de voltaje no hay corriente." },
        { t: "vf", p: "Con unos zapatos de goma es completamente seguro tocar la red.", c: false, e: "Reducen el riesgo pero no lo eliminan.", crit: true },
        { t: "num", p: "Con 9 V y 1 000 Ω, ¿qué corriente pasaría? (en mA)", r: 9, u: "", e: "9 / 1 000 = 0,009 A = 9 mA." }
      ],
      res: ["El cuerpo se comporta como una resistencia: I = V/R.", "La piel seca tiene mucha resistencia; mojada, muy poca.", "La misma red puede dar 1 mA (seca) o más de 100 mA (mojada).", "Con 9 V o menos no se alcanzan corrientes peligrosas.", "La corriente necesita dos puntos a distinto voltaje: por eso no muere el pájaro en un cable."]
    },
    {
      id: "13-3", t: "Tipos de riesgo", d: "Choque, arco eléctrico, quemaduras, incendios por sobrecarga y por malas conexiones.", min: 35, e: true,
      preg: "Además de la descarga en el cuerpo, ¿de qué otras formas puede causar daño la electricidad?",
      obj: ["Identificar los distintos riesgos eléctricos.", "Explicar el origen de los incendios eléctricos.", "Reconocer situaciones de riesgo en casa."],
      txt: `La electricidad puede causar daño de varias maneras. Conocerlas ayuda a prevenirlas.

## 1. Choque eléctrico
La corriente atraviesa el cuerpo (lecciones 13.1 y 13.2). Puede ser:
- **Contacto directo:** tocar una parte que normalmente tiene voltaje (un cable pelado, el interior de un aparato, un contacto con un objeto metálico).
- **Contacto indirecto:** tocar una parte que normalmente **no** tiene voltaje, pero que lo adquirió por una **falla** (la carcasa metálica de una lavadora con un cable suelto dentro). Contra este riesgo protegen la **tierra** y el **diferencial**.

## 2. Arco eléctrico
Un [[arco eléctrico]] es una descarga continua a través del aire entre dos conductores. Se produce en cortocircuitos, al abrir circuitos con mucha corriente o al acercar herramientas a partes con voltaje. Alcanza **miles de grados**: funde el metal, lo proyecta en gotas, emite una luz ultravioleta muy intensa y una **onda de presión**. Causa quemaduras graves, lesiones en los ojos y los oídos, aunque la persona no toque nada. Es uno de los principales riesgos de los electricistas en tableros.

## 3. Quemaduras
- **Eléctricas:** por el paso de la corriente por los tejidos.
- **Por arco:** por el calor y el metal fundido.
- **Térmicas:** al tocar un cable, una resistencia o un aparato muy caliente.

## 4. Incendios
Son el riesgo eléctrico más frecuente en las casas. Sus causas:
- **Sobrecarga:** demasiada corriente por un cable (regletas con muchos aparatos, extensiones delgadas, interruptores de más amperios que el cable).
- **Conexiones flojas:** un tornillo flojo en un contacto o en el tablero tiene resistencia; con la corriente se calienta (P = I²R), oxida más el contacto, aumenta la resistencia… y puede llegar a encender el material de alrededor. Muchos incendios empiezan así, **sin que salte ninguna protección**.
- **Cables dañados:** aplastados bajo muebles, mordidos por mascotas, grapados, pasados bajo alfombras.
- **Aparatos defectuosos o de mala calidad**, cargadores sin certificación, baterías de litio dañadas.
- **Aparatos de calor** cerca de cortinas o ropa.

## 5. Caídas y lesiones indirectas
Una pequeña descarga, aunque no sea peligrosa por sí misma, puede provocar un **movimiento brusco** y una caída desde una escalera.

## 6. Explosiones
Una chispa eléctrica en un ambiente con **gas** o vapores inflamables puede provocar una explosión. Si huele a gas, **no** enciendas ni apagues luces ni aparatos.

## Señales de riesgo en casa
- Contactos o enchufes **calientes**, ennegrecidos o derretidos.
- **Olor** a plástico quemado.
- Luces que **parpadean**.
- **Chispas** o zumbidos.
- Pequeñas descargas al tocar aparatos o llaves.
- Interruptores que se disparan con frecuencia.

Cualquiera de ellas exige actuar (lección 11.9).`,
      vida: "Muchos incendios domésticos empiezan en una regleta barata con un calefactor y otros aparatos conectados, o en un contacto con un tornillo flojo que se calentó durante semanas.",
      err: ["Pensar que el único riesgo eléctrico es la descarga.", "Creer que si no salta la pastilla no hay peligro de incendio.", "Encender una luz cuando huele a gas."],
      ejer: [["¿Qué diferencia hay entre contacto directo e indirecto?", "Directo: tocar algo que normalmente tiene voltaje. Indirecto: tocar algo que adquirió voltaje por una falla."], ["¿Por qué una conexión floja puede causar un incendio sin que salte el interruptor?", "Porque la corriente es normal, pero la resistencia del mal contacto produce calor localizado."], ["¿Qué no debes hacer si huele a gas?", "Encender ni apagar luces o aparatos: una chispa puede causar una explosión."]],
      quiz: [
        { t: "om", p: "Tocar la carcasa metálica de un aparato que tiene una falla interna es un…", o: ["Contacto directo", "Contacto indirecto", "Arco eléctrico", "Cortocircuito"], c: 1, e: "La carcasa adquirió voltaje por una falla." },
        { t: "om", p: "El arco eléctrico puede causar…", o: ["Solo un pequeño destello", "Quemaduras graves y lesiones en ojos y oídos sin tocar nada", "Ahorro de energía", "Nada"], c: 1, e: "Alcanza miles de grados." },
        { t: "vf", p: "Una conexión floja puede calentarse hasta provocar un incendio sin que se dispare ninguna protección.", c: true, e: "La corriente es normal, pero el calor se concentra en el mal contacto." },
        { t: "om", p: "Si huele a gas en casa, debes…", o: ["Encender la luz para ver mejor", "No accionar interruptores ni aparatos, ventilar y salir", "Prender un cerillo", "Desenchufar todo rápidamente"], c: 1, e: "Una chispa podría provocar una explosión.", crit: true },
        { t: "om", p: "¿Cuál es el riesgo eléctrico más frecuente en las casas?", o: ["Los rayos", "Los incendios", "La radiación", "El ruido"], c: 1, e: "Por sobrecargas, conexiones flojas y cables dañados." }
      ],
      res: ["Los riesgos eléctricos incluyen choque, arco, quemaduras, incendios, caídas y explosiones.", "El contacto indirecto ocurre cuando una falla da voltaje a una parte metálica.", "El arco eléctrico causa daños graves sin necesidad de tocar.", "Sobrecargas, conexiones flojas y cables dañados causan incendios.", "Con olor a gas no se acciona ningún interruptor."]
    },
    {
      id: "13-4", t: "Las protecciones", d: "Fusible, termomagnético, diferencial, tierra y doble aislamiento: qué protege cada uno.", min: 35, e: true,
      preg: "Si tu casa tiene pastillas, ¿estás protegido contra una descarga?",
      obj: ["Describir las principales protecciones eléctricas.", "Saber contra qué riesgo protege cada una.", "Entender por qué se complementan."],
      txt: `Una instalación segura combina varias protecciones, porque **cada una protege contra un riesgo distinto**. Ninguna es suficiente sola.

## Las protecciones y lo que hacen
| Protección | Detecta | Protege contra | Protege a las personas de un choque |
|---|---|---|---|
| **Fusible** | Corriente excesiva (se funde) | Sobrecargas y cortocircuitos | No |
| **Interruptor termomagnético** | Corriente excesiva | Sobrecargas y cortocircuitos (incendios) | No |
| **Interruptor diferencial (30 mA)** | Fugas a tierra | Choque por contacto con fase y tierra; incendios por fugas | **Sí** (en la mayoría de los casos) |
| **Puesta a tierra** | — (ofrece un camino) | Que las carcasas metálicas queden con voltaje | Sí, junto con las protecciones |
| **Doble aislamiento** ⧈ | — (diseño) | Contacto con partes activas del aparato | Sí |
| **Muy baja tensión** (≤ 12–24 V) | — (diseño) | Que el voltaje pueda hacer pasar una corriente peligrosa | Sí |
| **Supresor de picos** | Sobretensiones | Daños a los aparatos por rayos o maniobras | No |

## La respuesta a la pregunta inicial
Las pastillas (termomagnéticos) **no** te protegen de una descarga: se disparan con 15, 20 o 30 A, mientras que **100 mA ya pueden ser mortales**. Lo que protege a las personas es el **diferencial** (junto con la tierra y el aislamiento).

## Cómo se complementan: un ejemplo
Una lavadora con la carcasa metálica tiene un cable interno pelado que toca la carcasa:
1. **Con tierra:** la corriente de falla va a tierra.
2. Si es grande, el **termomagnético** se dispara; si es pequeña (decenas de miliamperios), el **diferencial** la detecta y corta.
3. **Sin tierra pero con diferencial:** la carcasa queda con voltaje hasta que alguien la toca; entonces la corriente por la persona dispara el diferencial en milisegundos (la persona siente la descarga, pero muy probablemente sobrevive).
4. **Sin tierra y sin diferencial:** la carcasa queda con voltaje y quien la toque recibe la descarga completa. **Situación potencialmente mortal.**

## Doble aislamiento
Los aparatos con el símbolo de un **cuadrado dentro de otro** (⧈) tienen dos capas de aislamiento independientes entre las partes con voltaje y lo que tocas. Por eso no necesitan tierra (su enchufe solo tiene dos patas). Ejemplos: secadoras de cabello, cargadores, taladros.

## Muy baja tensión de seguridad
Usar voltajes muy bajos (12 o 24 V) elimina casi por completo el riesgo de electrocución: se usa en juguetes, iluminación de piscinas, timbres y algunos equipos de baño, alimentados por un **transformador de seguridad**.

## Mantenimiento de las protecciones
- **Prueba el diferencial** con su botón cada uno a tres meses.
- **No sustituyas** fusibles ni interruptores por otros de más amperios.
- **No anules** protecciones que se disparan: busca la causa.
- Haz revisar la instalación por un electricista cada cierto tiempo, sobre todo si es antigua.`,
      vida: "Si tu casa es antigua y solo tiene pastillas sin diferencial, instalar uno (lo hace un electricista) es una de las mejoras de seguridad más baratas y eficaces que existen.",
      err: ["Creer que las pastillas protegen de una descarga.", "Pensar que con diferencial ya no hace falta tierra.", "Quitar la tierra a un aparato porque «tiene diferencial»."],
      ejer: [["¿Qué protección salva a las personas de una descarga por contacto con fase y tierra?", "El interruptor diferencial (con la ayuda de la tierra)."], ["¿Contra qué protegen el fusible y el termomagnético?", "Contra sobrecargas y cortocircuitos (incendios)."], ["¿Qué indica el símbolo de un cuadrado dentro de otro?", "Doble aislamiento: el aparato no necesita tierra."]],
      quiz: [
        { t: "om", p: "¿Qué protección salva vidas ante una fuga a tierra a través de una persona?", o: ["El fusible", "El termomagnético", "El interruptor diferencial", "El supresor de picos"], c: 2, e: "Detecta fugas de unos 30 mA.", crit: true },
        { t: "vf", p: "Un interruptor termomagnético de 20 A protege a una persona de un choque eléctrico.", c: false, e: "Se dispara con amperios; a una persona le basta una décima de amperio para morir." , crit: true },
        { t: "om", p: "El símbolo ⧈ (cuadrado dentro de otro) indica…", o: ["Aparato de CD", "Doble aislamiento", "Necesita tierra", "Alto consumo"], c: 1, e: "No necesita conexión a tierra." },
        { t: "om", p: "¿Para qué sirve un supresor de picos?", o: ["Para proteger a las personas de descargas", "Para proteger los aparatos de sobretensiones", "Para ahorrar energía", "Para medir el consumo"], c: 1, e: "Desvía los picos de voltaje." },
        { t: "om", p: "Muy baja tensión de seguridad significa…", o: ["Usar 12–24 V para eliminar casi el riesgo de electrocución", "Usar alta tensión", "Quitar la tierra", "Usar solo CD"], c: 0, e: "Por ejemplo, en piscinas o juguetes." }
      ],
      res: ["Fusibles y termomagnéticos protegen contra sobrecargas y cortocircuitos.", "El diferencial protege a las personas contra fugas a tierra.", "La tierra evita que las carcasas queden con voltaje.", "El doble aislamiento y la muy baja tensión son protecciones por diseño.", "Las protecciones se complementan: ninguna basta sola."]
    },
    {
      id: "13-5", t: "Seguridad en casa", d: "Agua y baño, extensiones y regletas, contactos sobrecargados, niños y mascotas, aparatos dañados.", min: 35, e: true, exp: "e-recorrido-seguridad",
      preg: "¿Qué peligros eléctricos hay en tu casa ahora mismo, sin que te hayas dado cuenta?",
      obj: ["Identificar los riesgos eléctricos más comunes en el hogar.", "Aplicar medidas de prevención.", "Revisar la casa con una lista de comprobación."],
      txt: `La mayoría de los accidentes eléctricos domésticos se pueden prevenir con hábitos sencillos.

## Agua y electricidad
- No uses aparatos eléctricos **con las manos mojadas**, descalzo en un piso mojado o dentro de la bañera.
- Mantén secadoras de cabello, planchas para el pelo, radios y cargadores **lejos de lavabos, bañeras y regaderas**.
- Si un aparato enchufado **cae al agua**, **no lo saques con la mano**: corta primero la electricidad desde el tablero y después desenchúfalo.
- Los contactos de baño, cocina y exteriores deben estar protegidos por **diferencial**.
- Las regaderas eléctricas (calentadores instantáneos) deben estar bien instaladas y conectadas a tierra.

## Extensiones y regletas
- Respeta su **potencia máxima**.
- No conectes **varios aparatos de calor** a la misma regleta (calefactor, hervidor, plancha).
- No hagas **cadenas** de extensiones.
- No las pases **bajo alfombras**, por puertas o ventanas, ni las grapes.
- Usa extensiones **para exteriores** cuando trabajes fuera.
- Si una extensión se calienta, está sobrecargada o es de mala calidad.

## Contactos y cables
- No sobrecargues un contacto con adaptadores múltiples («pulpos»).
- Desenchufa **tirando del enchufe**, no del cable.
- Revisa que los cables no estén **pelados, aplastados o mordidos**; si lo están, sustituye el aparato o el cable (no lo arregles con cinta).
- No uses aparatos con **enchufes rotos** o con la pata de tierra cortada.

## Niños
- Pon **tapas protectoras** o usa contactos con obturadores.
- Guarda los cargadores desenchufados; un niño puede meterse en la boca el extremo de un cargador enchufado.
- Enseña que los contactos y los cables **no son juguetes**.
- Guarda las **pilas de botón** fuera de su alcance (lección 9.7).

## Mascotas
- Protege los cables a su alcance (los cachorros y los conejos los muerden).
- Revisa periódicamente los cables de detrás de los muebles.

## Aparatos
- Compra aparatos y cargadores **certificados**.
- No dejes funcionando sin vigilancia aparatos de calor (planchas, estufas).
- Desconecta los aparatos que **echan humo, huelen a quemado o dan toques**, y no los vuelvas a usar hasta que los revise un técnico.
- No abras aparatos conectados a la red; algunos guardan carga aunque estén desenchufados (microondas, fuentes).

## Detectores de humo
Instala detectores de humo (y de monóxido de carbono si hay aparatos de gas) y prueba sus baterías periódicamente.

## Recorrido de seguridad
En el experimento de esta lección revisarás tu casa con una lista de comprobación, **sin tocar nada energizado**, y anotarás lo que hay que corregir.`,
      vida: "Los cargadores que se dejan enchufados al pie de la cama, con el cable colgando, son un riesgo para los niños pequeños y las mascotas, y se dañan al pisarlos.",
      err: ["Sacar con la mano un aparato que cayó al agua estando enchufado.", "Reparar un cable pelado con cinta adhesiva.", "Conectar el calefactor y la plancha en la misma regleta."],
      ejer: [["Un secador de pelo enchufado cae a la bañera llena. ¿Qué haces?", "No meter la mano: cortar la corriente desde el tablero y después desenchufarlo."], ["Menciona tres reglas para usar extensiones.", "Respetar su potencia, no hacer cadenas y no pasarlas bajo alfombras."], ["¿Cómo se desenchufa un aparato correctamente?", "Tirando del enchufe, no del cable."]],
      quiz: [
        { t: "om", p: "Si un aparato enchufado cae al agua, lo primero es…", o: ["Sacarlo rápido con la mano", "Cortar la electricidad desde el tablero", "Echar más agua", "Tocar el agua para ver si da toques"], c: 1, e: "Después se desenchufa y se desecha o revisa.", crit: true },
        { t: "vf", p: "Un cable pelado se puede reparar con cinta adhesiva y seguir usándolo.", c: false, e: "Hay que sustituir el cable o el aparato." },
        { t: "om", p: "¿Qué es correcto con las regletas?", o: ["Conectar varios aparatos de calor", "Respetar su potencia máxima", "Conectar una a otra en cadena", "Pasarlas bajo la alfombra"], c: 1, e: "Su potencia máxima indica el límite seguro." },
        { t: "om", p: "Para proteger a los niños pequeños de los contactos…", o: ["Se usan tapas protectoras o contactos con obturadores", "Se quita la tierra", "Se ponen más regletas", "No hace falta nada"], c: 0, e: "Evitan que introduzcan objetos." },
        { t: "om", p: "Un aparato huele a quemado. ¿Qué haces?", o: ["Seguir usándolo", "Desconectarlo y no usarlo hasta que lo revise un técnico", "Abrirlo enchufado para ver", "Echarle agua"], c: 1, e: "Puede iniciar un incendio." }
      ],
      res: ["Agua y electricidad nunca juntas; en baños y cocinas, diferencial.", "Las extensiones y regletas tienen límites: sin cadenas ni aparatos de calor juntos.", "Los cables dañados se reemplazan, no se parchan.", "Protege a niños y mascotas de contactos, cables y pilas de botón.", "Aparatos que huelen a quemado o dan toques se dejan de usar."]
    },
    {
      id: "13-6", t: "Seguridad en el exterior", d: "Cables caídos (alejarse 10 m o más), cometas, escaleras, tormentas y rayos (regla 30/30).", min: 30,
      preg: "Después de una tormenta ves un cable caído sobre un charco. ¿Qué haces?",
      obj: ["Actuar con seguridad ante cables caídos.", "Prevenir accidentes con líneas aéreas.", "Protegerse de los rayos."],
      txt: `Fuera de casa, los principales riesgos eléctricos son las **líneas aéreas**, los **cables caídos** y los **rayos**.

## Cables caídos
!> Considera **siempre** que un cable caído tiene voltaje, aunque no haga chispas, no zumbe o parezca un cable de teléfono.

- Aléjate **al menos 10 metros** (más si es de alta tensión) y mantén a otros alejados.
- Llama a la **compañía eléctrica** o a **emergencias** (911 o 112).
- No toques el cable, ni lo que esté en contacto con él (cercas, autos, charcos, ramas).
- **El suelo alrededor también puede tener voltaje:** la corriente se reparte por la tierra y crea diferencias de voltaje entre puntos cercanos (**tensión de paso**). Si das pasos largos, entre tus pies puede haber una diferencia peligrosa.
- Si te das cuenta de que estás cerca, aléjate **arrastrando los pies juntos**, con pasos muy cortos sin separarlos, o saltando con los pies juntos.

## Si un cable cae sobre tu auto
**Quédate dentro**: la carrocería te protege. Llama a emergencias y espera a que corten la corriente. Solo si hay fuego, sal **saltando** con los pies juntos sin tocar el auto y el suelo a la vez, y aléjate arrastrando los pies.

## Líneas aéreas
- No vueles **cometas, papalotes ni drones** cerca de líneas eléctricas. Si una cometa se engancha, suéltala; no intentes recuperarla.
- No **trepes** a postes, torres ni árboles cercanos a cables.
- Al usar **escaleras**, tubos o varillas largas (por ejemplo, al limpiar una alberca o pintar una fachada), mira arriba: mantén al menos **3 metros** de distancia de las líneas.
- No te subas a techos cerca de la acometida.
- No toques los **tirantes** (vientos) de los postes.
- Nunca entres a **subestaciones** ni abras transformadores de pedestal.

## Excavaciones
Antes de excavar profundo en el jardín o en la calle, pregunta si hay **cables subterráneos**. Romper uno con una pala o un pico puede ser mortal.

## Tormentas y rayos
- Si oyes **truenos**, estás al alcance de un rayo.
- **Regla 30/30:** si entre el relámpago y el trueno pasan menos de 30 segundos, refúgiate; espera 30 minutos después del último trueno.
- Refugios seguros: **edificios** con instalación eléctrica y fontanería, o **autos de techo metálico** con las ventanas cerradas.
- **Evita:** árboles aislados, campos abiertos, lugares altos, el agua (piscinas, lagos, playa), cercas y estructuras metálicas.
- Dentro de casa: no te bañes, no uses aparatos conectados a la red ni teléfonos con cable durante la tormenta; aléjate de ventanas.
- Si estás al descubierto y no hay refugio: agáchate con los pies juntos, sin tumbarte en el suelo, lejos de objetos altos.

## Inundaciones
Si el agua llega a contactos, tableros o aparatos, **no entres** al área inundada hasta que la compañía o un electricista corten la corriente.`,
      vida: "Después de huracanes y tormentas fuertes, muchas de las víctimas se producen por contacto con cables caídos o por entrar en zonas inundadas con electricidad.",
      err: ["Pensar que un cable caído sin chispas no tiene voltaje.", "Salir del auto si un cable cae sobre él (salvo fuego).", "Refugiarse bajo un árbol durante una tormenta."],
      ejer: [["¿A qué distancia mínima hay que alejarse de un cable caído?", "Al menos 10 metros."], ["¿Cómo te alejas si estás cerca de un cable caído?", "Arrastrando los pies juntos con pasos cortos o saltando con los pies juntos."], ["¿Qué haces si un cable cae sobre tu auto?", "Quedarme dentro y llamar a emergencias; solo si hay fuego, saltar sin tocar auto y suelo a la vez."]],
      quiz: [
        { t: "om", p: "Ante un cable caído en la calle debes…", o: ["Moverlo con un palo seco", "Alejarte al menos 10 m y avisar a la compañía o a emergencias", "Comprobar si tiene corriente tocándolo", "Pisarlo con zapatos de goma"], c: 1, e: "Siempre se considera energizado.", crit: true },
        { t: "om", p: "Si un cable cae sobre tu auto y no hay fuego…", o: ["Sal corriendo", "Quédate dentro y llama a emergencias", "Toca el cable para apartarlo", "Abre la puerta y pon un pie fuera"], c: 1, e: "La carrocería te protege.", crit: true },
        { t: "vf", p: "El suelo alrededor de un cable caído puede tener voltajes peligrosos.", c: true, e: "Es la tensión de paso." },
        { t: "om", p: "Durante una tormenta con truenos, el lugar más seguro es…", o: ["Bajo un árbol", "En una piscina", "Dentro de un edificio o un auto con techo metálico", "En lo alto de una colina"], c: 2, e: "Los demás atraen rayos o conducen." },
        { t: "om", p: "Si tu cometa se engancha en un cable eléctrico…", o: ["Tiras fuerte del hilo", "Subes al poste", "La sueltas y avisas a la compañía", "Le lanzas piedras"], c: 2, e: "Nunca se intenta recuperar." }
      ],
      res: ["Un cable caído se considera siempre energizado: aléjate al menos 10 m.", "Alrededor del cable el suelo puede tener tensión de paso: arrastra los pies.", "Si un cable cae sobre tu auto, quédate dentro.", "No vueles cometas ni drones ni uses escaleras cerca de líneas.", "Con truenos, refugio en edificio o auto; regla 30/30."]
    },
    {
      id: "13-7", t: "Qué hacer ante una persona electrocutada", d: "Cortar la corriente sin tocar a la persona, llamar al 911 o 112, RCP básica (descripción) y quemaduras.", min: 40, e: true,
      preg: "Ves a una persona que no puede soltar un cable y está temblando. Tu primer impulso es jalarla. ¿Por qué podría costarte la vida?",
      obj: ["Aplicar los pasos de actuación ante una persona electrocutada.", "Separar a la víctima de la corriente sin ponerse en riesgo.", "Conocer los primeros auxilios básicos y cuándo aplicarlos."],
      txt: `Ante un accidente eléctrico, **la prioridad es no convertirte en otra víctima**. Si tocas a una persona que sigue en contacto con la corriente, la corriente puede pasar también por ti.

## Los pasos: PROTEGER – AVISAR – SOCORRER
### 1. Proteger: cortar la corriente
!> **No toques a la persona** mientras siga en contacto con la fuente de electricidad.

- **Corta la corriente:** baja el interruptor principal del tablero o desenchufa el aparato si puedes hacerlo sin tocar a la víctima.
- **Si no puedes cortar la corriente** (y solo en baja tensión de una casa): sepárala de la fuente con un objeto **seco y aislante** —un palo de escoba de madera, una silla de madera o de plástico, una cuerda seca—, de pie sobre algo seco y aislante (una tabla, un tapete de goma, papel periódico grueso seco). Nunca uses objetos metálicos ni húmedos.
- **En alta tensión** (líneas de la calle, subestaciones): **no te acerques**. Mantente a más de 10 m, llama a la compañía eléctrica y a emergencias. Nadie debe acercarse hasta que corten la corriente.

### 2. Avisar: llamar a emergencias
- Llama al **911** (gran parte de América) o al **112** (Europa), o al número de tu país.
- Di qué pasó (accidente eléctrico), dónde estás y el estado de la persona (si responde y si respira).
- Si hay un **desfibrilador** (DEA) cerca, pide que lo traigan.

### 3. Socorrer: primeros auxilios
Una vez cortada la corriente:
- **Comprueba si responde:** háblale fuerte y tócale los hombros.
- **Comprueba si respira** normalmente (mira el pecho, escucha y siente durante no más de 10 segundos).
- **Si no respira o solo boquea:** inicia la **reanimación cardiopulmonar (RCP)**: compresiones en el centro del pecho, fuertes (unos 5 cm) y rápidas (100–120 por minuto), sin detenerte hasta que llegue ayuda o un DEA. El operador de emergencias te guiará por teléfono. Si hay un **DEA**, enciéndelo y sigue sus instrucciones de voz: está diseñado para usarse sin formación.
- **Si respira:** colócala de lado (posición lateral de seguridad), abrígala y vigila su respiración hasta que llegue la ayuda.
- **Quemaduras:** enfría con agua limpia a temperatura ambiente durante 10–20 minutos (si es seguro), cubre con un paño limpio, no apliques cremas, hielo ni remedios caseros, no revientes ampollas.
- **No le des de beber** ni de comer.

?> Aprender RCP en un curso presencial de primeros auxilios (Cruz Roja, protección civil, servicios de salud) es una de las mejores cosas que puedes hacer por los demás. Esta lección solo lo describe.

## Siempre al médico
Aunque la persona parezca recuperada, **debe ir a un hospital**: puede tener quemaduras internas, lesiones musculares o alteraciones del ritmo cardíaco que aparecen horas después.

## Resumen en una frase
**Corta la corriente, no toques a la persona hasta que esté separada de ella, llama a emergencias y, si no respira, inicia la RCP.**`,
      vida: "En muchos lugares públicos hay desfibriladores automáticos señalizados con un corazón y un rayo. Están pensados para que cualquier persona los use siguiendo sus instrucciones de voz.",
      err: ["Jalar con las manos a la persona que sigue en contacto con la corriente.", "Acercarse a una víctima de alta tensión antes de que corten la corriente.", "Pensar que si la persona se levanta no necesita médico."],
      ejer: [["¿Qué haces antes de tocar a una persona electrocutada?", "Cortar la corriente (tablero o desenchufar) o separarla con un objeto seco y aislante si es baja tensión."], ["¿Qué número llamas en gran parte de América? ¿Y en Europa?", "911 y 112."], ["La persona no respira tras separarla de la corriente. ¿Qué haces?", "Llamar a emergencias e iniciar la RCP; usar un DEA si hay uno."]],
      quiz: [
        { t: "ord", p: "Ordena los pasos ante una persona electrocutada:", o: ["Cortar la corriente sin tocar a la persona", "Llamar a emergencias", "Comprobar si responde y respira", "Iniciar la RCP si no respira"], e: "Proteger, avisar y socorrer.", crit: true },
        { t: "om", p: "Si no puedes cortar la corriente en una casa, para separar a la persona usas…", o: ["Tus manos", "Una varilla metálica", "Un palo de escoba de madera seco", "Un trapo mojado"], c: 2, e: "Un objeto seco y aislante.", crit: true },
        { t: "om", p: "Ante una persona electrocutada por una línea de alta tensión…", o: ["La separas con un palo de madera", "No te acercas: llamas a la compañía y a emergencias", "La jalas de la ropa", "Le echas agua"], c: 1, e: "En alta tensión el arco puede alcanzarte a distancia.", crit: true },
        { t: "vf", p: "Si una persona electrocutada se recupera rápidamente, no necesita ir al médico.", c: false, e: "Puede tener lesiones internas o arritmias que aparecen después." },
        { t: "om", p: "Para una quemadura eléctrica se recomienda…", o: ["Aplicar hielo directamente", "Enfriar con agua a temperatura ambiente y cubrir con un paño limpio", "Untar mantequilla", "Reventar las ampollas"], c: 1, e: "Sin cremas ni remedios caseros." }
      ],
      res: ["No toques a la víctima mientras siga en contacto con la corriente.", "Corta la corriente o sepárala con un objeto seco y aislante (solo en baja tensión).", "En alta tensión, aléjate y llama a la compañía y a emergencias.", "Llama al 911 o 112; si no respira, RCP y DEA.", "Toda persona electrocutada debe ir al médico."]
    },
    {
      id: "13-8", t: "Lo que NUNCA hay que hacer", d: "Veinte prohibiciones explicadas: objetos en contactos, quitar la tierra, agua, puentear fusibles y más.", min: 30, e: true,
      preg: "De todo lo que has aprendido en el curso, ¿qué es lo que nunca, bajo ninguna circunstancia, deberías hacer?",
      obj: ["Recordar las prohibiciones fundamentales de la seguridad eléctrica.", "Explicar el porqué de cada una.", "Transmitirlas a familiares y amigos."],
      txt: `Esta lección reúne las reglas que **nunca** se deben romper. Cada una tiene detrás accidentes reales.

## Las 20 prohibiciones
1. **Nunca metas objetos en un contacto** (llaves, clips, alambres, tenedores). Tocarías directamente la fase.
2. **Nunca toques aparatos eléctricos con las manos mojadas** ni estando descalzo en un piso mojado: tu resistencia cae y la corriente puede ser mortal.
3. **Nunca uses aparatos de la red dentro de la bañera** o la regadera.
4. **Nunca saques con la mano un aparato enchufado que cayó al agua:** corta antes la corriente.
5. **Nunca quites la pata de tierra** de un enchufe ni uses adaptadores que la eliminen en aparatos que la tienen.
6. **Nunca limes la pata ancha** de un enchufe polarizado.
7. **Nunca puentees un fusible** con un alambre ni lo cambies por uno de más amperios.
8. **Nunca amarres ni sujetes una pastilla** para que no se dispare, ni la sustituyas por una mayor.
9. **Nunca anules ni puentees un interruptor diferencial.**
10. **Nunca trabajes en la instalación sin cortar la corriente** desde el tablero, y nunca sin formación: los cambios de contactos, apagadores o lámparas los hace un electricista.
11. **Nunca confíes en el color de un cable** para saber si tiene voltaje.
12. **Nunca abras** cargadores, fuentes, televisores, hornos de microondas ni aparatos conectados a la red; algunos guardan carga mortal aunque estén desenchufados.
13. **Nunca uses cables pelados, enchufes rotos o aparatos que dan toques**, ni los repares con cinta.
14. **Nunca hagas cadenas de extensiones** ni conectes varios aparatos de calor a la misma regleta.
15. **Nunca toques un cable caído** ni te acerques a menos de 10 metros; nunca toques a una persona electrocutada que siga en contacto con la corriente.
16. **Nunca trepes a postes, torres o árboles cercanos a cables**, ni vueles cometas o drones cerca de líneas.
17. **Nunca entres a una subestación** ni abras un transformador o un medidor.
18. **Nunca conectes un generador portátil a un contacto** de la casa ni lo uses en interiores.
19. **Nunca uses baterías de litio hinchadas, golpeadas o calientes**, ni cargues dispositivos bajo la almohada o al sol.
20. **Nunca experimentes con la red eléctrica:** solo con pilas o baterías de 9 V o menos.

!> Si tienes dudas sobre si algo es seguro, **no lo hagas**: pregunta a un electricista o usa una simulación.

## Por qué tantas reglas
La electricidad de la red es invisible, silenciosa y no da segundas oportunidades: entre «no pasa nada» y una descarga mortal puede no haber ninguna señal previa. Por eso la seguridad eléctrica se basa en **hábitos** que se cumplen siempre, aunque «esta vez» parezca que no hace falta.

## Comparte lo aprendido
Las prohibiciones 1, 2, 3, 5, 13, 14 y 15 son las que más vidas salvan en casa. Enséñalas a tu familia, sobre todo a los niños y a los adultos mayores. En las actividades del módulo puedes diseñar un póster con ellas.`,
      vida: "Muchos accidentes en casa ocurren al «solo cambiar un contacto» o al usar un aparato dañado «solo un momento». Las reglas existen para esos momentos.",
      err: ["Pensar que «a mí no me va a pasar».", "Saltarse una regla porque «es solo un momento».", "Creer que con experiencia ya no hace falta cortar la corriente."],
      ejer: [["¿Por qué nunca se debe meter un objeto metálico en un contacto?", "Porque se tocaría directamente la fase y la corriente pasaría por el cuerpo."], ["¿Por qué no se puentea un fusible?", "Porque elimina la protección contra sobrecargas y cortocircuitos: el cable puede incendiarse."], ["Elige tres prohibiciones que enseñarías a un niño.", "Por ejemplo: no meter objetos en los contactos, no tocar aparatos con las manos mojadas y no acercarse a cables caídos."]],
      quiz: [
        { t: "vf", p: "Está bien puentear un fusible con un alambre si no tienes repuesto.", c: false, e: "Elimina la protección y puede causar un incendio.", crit: true },
        { t: "vf", p: "Se puede quitar la pata de tierra de un enchufe si el contacto no tiene el agujero.", c: false, e: "Se pierde la protección; hay que instalar un contacto con tierra.", crit: true },
        { t: "om", p: "¿Cuál de estas acciones es segura?", o: ["Usar una secadora en la bañera", "Abrir un microondas desenchufado", "Experimentar con pilas de 9 V o menos", "Conectar un generador a un contacto"], c: 2, e: "Es la regla de oro del curso." },
        { t: "om", p: "Antes de cambiar una lámpara fija del techo, un electricista…", o: ["Solo apaga el apagador", "Corta el circuito en el tablero y verifica que no hay voltaje", "Trabaja con la luz encendida para ver mejor", "Moja sus manos para mejor agarre"], c: 1, e: "El apagador puede no cortar la fase.", crit: true },
        { t: "om", p: "Si tienes dudas sobre si algo eléctrico es seguro…", o: ["Lo pruebas para ver", "No lo haces y preguntas a un electricista", "Lo haces rápido", "Le preguntas a un vecino y lo haces"], c: 1, e: "Ante la duda, no." }
      ],
      res: ["Nunca metas objetos en los contactos ni toques aparatos con las manos mojadas.", "Nunca anules protecciones: fusibles, pastillas, diferenciales ni tierra.", "Nunca abras aparatos de la red ni trabajes en la instalación sin formación.", "Nunca te acerques a cables caídos, líneas o subestaciones.", "Nunca experimentes con la red: solo con 9 V o menos."]
    }
  ]
});
