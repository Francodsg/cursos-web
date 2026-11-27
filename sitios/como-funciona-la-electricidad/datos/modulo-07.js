// M7. Magnetismo y electromagnetismo
registrarModulo({
  id: "m7", n: 7, nivel: 2, titulo: "Magnetismo y electromagnetismo", quizMin: 25, quizN: 15, minEsperado: 310,
  objetivo: "Explicar los imanes y los campos magnéticos, la relación entre la corriente eléctrica y el magnetismo, y la inducción electromagnética.",
  clave: "iman magnetismo campo magnetico brujula oersted electroiman bobina induccion faraday lenz foucault",
  actividades: ["Dibujar el campo de un imán con una brújula (experimento de la lección 7.2).", "En la [simulación de campo magnético](#/simulacion/S8), comparar el campo de un imán de barra con el de una bobina.", "Identificar las piezas de una bocina (imán, bobina, cono) con el esquema de la lección 7.8."],
  ejemplos: ["Un electroimán de 40 vueltas levanta aproximadamente el doble de clips que uno de 20 con la misma corriente.", "Mover un imán al doble de velocidad dentro de una bobina induce el doble de voltaje."],
  sims: ["S8", "S9"], calcs: [], gen: [],
  evaluacion: "Quiz de módulo de 15 preguntas (25 min) sobre imanes, campos, electroimanes e inducción. Se aprueba con el 70 %.",
  extra: [
    { t: "om", p: "Si cortas un imán de barra por la mitad, obtienes…", o: ["Un polo norte y un polo sur separados", "Dos imanes, cada uno con su norte y su sur", "Dos trozos de hierro sin magnetismo", "Un solo polo"], c: 1, e: "No existen polos aislados: cada trozo es un imán completo.", lec: "7-1" },
    { t: "vf", p: "Un imán quieto dentro de una bobina induce un voltaje constante.", c: false, e: "Solo induce voltaje mientras el flujo cambia.", lec: "7-6" }
  ],
  lecciones: [
    {
      id: "7-1", t: "Los imanes", d: "Polos, atracción y repulsión, materiales ferromagnéticos y dominios magnéticos.", min: 30, e: true, sim: "S8",
      preg: "¿Por qué un imán se pega al refrigerador pero no a una lata de aluminio?",
      obj: ["Describir los polos de un imán y sus interacciones.", "Clasificar materiales según su respuesta a los imanes.", "Explicar el magnetismo con la idea de dominios."],
      txt: `Un [[imán]] es un objeto que produce un **campo magnético** a su alrededor y atrae ciertos metales. Los imanes naturales (la magnetita) se conocen desde la Antigüedad; hoy usamos imanes artificiales de ferrita, de alnico o de **neodimio**, este último muy potente.

## Los polos
Todo imán tiene dos **polos**, llamados **norte (N)** y **sur (S)**, donde su fuerza es más intensa. Las reglas se parecen a las de las cargas:
- **Polos iguales se repelen** (N con N, S con S).
- **Polos distintos se atraen** (N con S).

Pero hay una diferencia fundamental con las cargas: **no existen polos aislados**. Si cortas un imán por la mitad, no obtienes un polo norte y un polo sur separados, sino **dos imanes completos**, cada uno con su N y su S. Puedes seguir cortando hasta llegar a un átomo: seguirá siendo un pequeño imán.

## ¿Qué materiales atrae un imán?
| Tipo | Comportamiento | Ejemplos |
|---|---|---|
| **Ferromagnéticos** | Atraídos con fuerza; pueden imantarse | Hierro, acero, níquel, cobalto |
| **Paramagnéticos** | Atracción muy débil (no se nota) | Aluminio, platino |
| **Diamagnéticos** | Repulsión muy débil | Cobre, agua, oro, plástico |

Por eso el imán se pega a la puerta de acero del refrigerador, pero no a una lata de aluminio, a una moneda de cobre ni a la madera.

## ¿De dónde sale el magnetismo?
El magnetismo nace del **movimiento de las cargas**. Cada electrón, por su giro (espín) y su movimiento alrededor del núcleo, se comporta como un imán diminuto. En la mayoría de los materiales, esos imanes diminutos apuntan en direcciones al azar y se cancelan.

En los materiales ferromagnéticos, los átomos vecinos se alinean en grupos llamados **dominios magnéticos**. En un trozo de hierro normal, los dominios apuntan en direcciones distintas y el hierro no es un imán. Al acercarle un imán, los dominios **se orientan** en la misma dirección: el hierro se vuelve un imán temporal y es atraído. En el **acero** y otros materiales «duros», los dominios se quedan orientados al retirar el imán: se convierten en imanes permanentes.

## Cómo se pierde el magnetismo
- **Calor:** por encima de cierta temperatura (temperatura de Curie: 770 °C en el hierro) el magnetismo desaparece.
- **Golpes:** desordenan los dominios.
- **Campos opuestos:** un campo intenso en sentido contrario puede desimantar.

## Imanes de neodimio: cuidado
!> Los imanes de neodimio son muy potentes: pueden **pellizcar la piel** gravemente al juntarse, romperse en astillas y, si se tragan dos, **atraerse a través del intestino y perforarlo**. Son peligrosos para niños pequeños y mascotas. También pueden dañar tarjetas, marcapasos y discos duros. En los experimentos se usan siempre con un adulto.`,
      vida: "Los imanes están en las puertas del refrigerador, en los cierres de bolsas, en las bocinas y audífonos, en los motores, en los discos duros y en los sensores de las puertas de seguridad.",
      err: ["Creer que un imán atrae todos los metales: solo los ferromagnéticos (hierro, níquel, cobalto).", "Pensar que al cortar un imán se separan el norte y el sur.", "Confundir los polos magnéticos con cargas eléctricas."],
      ejer: [["¿Qué pasa si acercas el polo norte de un imán al polo norte de otro?", "Se repelen."], ["¿Atraerá un imán una moneda de cobre?", "No: el cobre no es ferromagnético."], ["¿Por qué un clavo se vuelve un imán temporal al acercarle un imán?", "Porque sus dominios magnéticos se orientan en la misma dirección."]],
      quiz: [
        { t: "om", p: "Dos polos sur se…", o: ["Atraen", "Repelen", "Anulan", "Ignoran"], c: 1, e: "Polos iguales se repelen." },
        { t: "om", p: "¿Cuál de estos materiales atrae fuertemente un imán?", o: ["Aluminio", "Cobre", "Hierro", "Plástico"], c: 2, e: "El hierro es ferromagnético." },
        { t: "vf", p: "Si cortas un imán por la mitad obtienes dos imanes completos.", c: true, e: "Cada trozo tiene su norte y su sur." },
        { t: "om", p: "Los dominios magnéticos son…", o: ["Grupos de átomos con sus imanes diminutos alineados", "Cargas positivas", "Las puntas del imán", "Trozos de cobre"], c: 0, e: "Regiones con orientación magnética común." },
        { t: "om", p: "¿Por qué son peligrosos los imanes de neodimio para los niños?", o: ["Porque dan descargas eléctricas", "Porque si se tragan dos pueden perforar el intestino", "Porque son radiactivos", "Porque se calientan"], c: 1, e: "Se atraen a través de las paredes del intestino." }
      ],
      res: ["Todo imán tiene un polo norte y un polo sur.", "Polos iguales se repelen; distintos se atraen.", "No existen polos aislados: cortar un imán da dos imanes.", "Solo los materiales ferromagnéticos (hierro, níquel, cobalto) son atraídos con fuerza.", "El magnetismo surge de los dominios alineados; el calor y los golpes lo destruyen."]
    },
    {
      id: "7-2", t: "El campo magnético", d: "Líneas de campo, brújula, campo terrestre y la unidad tesla.", min: 35, e: true, sim: "S8", exp: "e-brujula",
      preg: "¿Por qué una brújula apunta siempre al norte, esté donde esté?",
      obj: ["Representar el campo magnético con líneas de campo.", "Explicar el funcionamiento de la brújula y el campo terrestre.", "Conocer la unidad del campo magnético y valores típicos."],
      txt: `Igual que una carga crea un campo eléctrico, un imán crea a su alrededor un [[campo magnético]]: una zona donde otros imanes, materiales ferromagnéticos o cargas en movimiento sienten fuerzas magnéticas.

## Líneas de campo magnético
El campo se representa con **líneas de campo**:
- **Fuera del imán**, salen del polo **norte** y entran en el polo **sur**.
- **Dentro del imán**, van del sur al norte: son **líneas cerradas**, sin principio ni fin (a diferencia de las eléctricas).
- Donde están **más juntas**, el campo es **más intenso** (cerca de los polos).
- **Nunca se cruzan.**

Puedes «verlas» espolvoreando limaduras de hierro sobre un papel encima de un imán: cada limadura se convierte en una pequeña aguja que se alinea con el campo.

## La brújula
Una **brújula** es una aguja imantada que puede girar libremente. Su polo norte se alinea con las líneas de campo, apuntando hacia donde «van». Cerca de un imán, la brújula indica la dirección del campo en ese punto. En la simulación S8 hay una cuadrícula de brújulas y una grande que puedes **arrastrar** para explorar el campo.

## La Tierra es un imán
Como descubrió [William Gilbert](#/personajes/gilbert) en 1600, la **Tierra tiene un campo magnético** parecido al de un imán de barra, generado por los movimientos del hierro fundido de su núcleo externo. Por eso las brújulas se orientan en dirección norte-sur en todo el planeta.

Curiosidad: el polo norte de la brújula es atraído por el **polo sur magnético**, así que el «polo norte geográfico» de la Tierra es, magnéticamente, un polo sur. Además, el polo magnético no coincide exactamente con el geográfico y se desplaza lentamente con los años; la diferencia en grados se llama **declinación magnética**.

El campo terrestre nos protege del viento solar y produce las **auroras** polares cuando partículas del Sol chocan con la atmósfera cerca de los polos.

## La intensidad del campo: el tesla
La intensidad del campo magnético se mide en [[tesla|teslas]] (**T**), en honor a Nikola Tesla. Un tesla es un campo muy intenso:

| Fuente | Campo aproximado |
|---|---|
| Campo de la Tierra | 0,000 05 T (50 µT) |
| Imán de refrigerador | 0,005 T |
| Imán de neodimio pequeño | 0,3 a 1 T |
| Resonancia magnética de hospital | 1,5 a 3 T |
| Electroimanes de laboratorio | más de 20 T |

## El campo de la corriente
En la próxima lección verás algo sorprendente: los imanes no son la única fuente de campo magnético. **Toda corriente eléctrica crea un campo magnético.** De hecho, el magnetismo de los imanes se debe a las corrientes diminutas de sus electrones.`,
      form: [["1 T = 1 N / (A·m)", "Unidad de campo magnético (tesla)."], ["Campo terrestre ≈ 50 µT", "Orden de magnitud del campo de la Tierra."]],
      vida: "Los celulares tienen un magnetómetro (una brújula electrónica) que detecta el campo terrestre para orientar los mapas. Si acercas un imán al celular, la brújula de la app se vuelve loca.",
      err: ["Creer que las líneas de campo magnético empiezan y terminan como las eléctricas: son cerradas.", "Pensar que el polo norte magnético de la Tierra está exactamente en el polo norte geográfico.", "Creer que un tesla es una unidad pequeña."],
      ejer: [["¿Hacia dónde salen las líneas de campo fuera de un imán?", "Del polo norte hacia el polo sur."], ["¿Cuántas veces más intenso es un resonador de 1,5 T que el campo terrestre de 50 µT?", "1,5 / 0,000 05 = 30 000 veces."], ["¿Por qué las limaduras de hierro dibujan el campo?", "Cada limadura se imanta y se alinea con las líneas de campo."]],
      quiz: [
        { t: "om", p: "Fuera de un imán, las líneas de campo van…", o: ["Del sur al norte", "Del norte al sur", "En círculos sin dirección", "Hacia el centro del imán"], c: 1, e: "Salen del N y entran en el S." },
        { t: "om", p: "¿En qué unidad se mide el campo magnético?", o: ["Voltio", "Tesla", "Hertz", "Watt"], c: 1, e: "Tesla (T)." },
        { t: "vf", p: "La Tierra tiene un campo magnético parecido al de un imán de barra.", c: true, e: "Lo descubrió Gilbert en 1600." },
        { t: "om", p: "Donde las líneas de campo están más juntas, el campo es…", o: ["Más débil", "Más intenso", "Cero", "Igual"], c: 1, e: "La densidad de líneas indica la intensidad." },
        { t: "om", p: "Una brújula funciona porque…", o: ["Detecta la electricidad estática", "Su aguja imantada se alinea con el campo magnético", "Señala el Sol", "Mide la gravedad"], c: 1, e: "La aguja es un pequeño imán." }
      ],
      res: ["Un imán crea un campo magnético a su alrededor.", "Las líneas salen del N, entran en el S y son cerradas.", "La brújula es una aguja imantada que se alinea con el campo.", "La Tierra es un gran imán: por eso funcionan las brújulas.", "El campo se mide en teslas; el terrestre es de unos 50 µT."]
    },
    {
      id: "7-3", t: "La corriente crea magnetismo", d: "El experimento de Oersted (1820), la regla de la mano derecha y el campo alrededor de un cable.", min: 35, e: true, sim: "S8", exp: "e-oersted",
      preg: "¿Puede un simple cable con corriente mover la aguja de una brújula?",
      obj: ["Describir el experimento de Oersted.", "Aplicar la regla de la mano derecha a un cable recto.", "Explicar de qué depende la intensidad del campo de un cable."],
      txt: `En 1820, durante una clase en Copenhague, [Hans Christian Ørsted](#/personajes/oersted) notó algo que cambiaría la ciencia: al conectar una pila a un alambre, **la aguja de una brújula cercana se movía**. Al desconectarla, volvía a su posición. Al invertir la corriente, se movía al lado contrario.

Fue la primera prueba de que **la electricidad y el magnetismo están relacionados**: había nacido el [[electromagnetismo]].

+> **Toda corriente eléctrica crea a su alrededor un campo magnético.**

## La forma del campo de un cable recto
Alrededor de un cable recto con corriente, las líneas de campo son **círculos concéntricos** con el cable en el centro, en planos perpendiculares al cable. Si atraviesas una cartulina con el cable y espolvoreas limaduras, se forman anillos.

## La regla de la mano derecha
Para saber el sentido de los círculos:
1. Agarra el cable con la **mano derecha**.
2. Apunta el **pulgar** en el sentido de la **corriente convencional** (de + a −).
3. Los **dedos** que rodean el cable indican el **sentido del campo**.

En la simulación S8, elige «Cable con corriente (visto de frente)»: un punto (●) significa corriente que sale hacia ti; una cruz (×), corriente que se aleja. Cambia el signo de la corriente y verás invertirse el sentido de giro de las brújulas.

## ¿De qué depende la intensidad?
El campo de un cable recto largo:

= B = μ₀ · I / (2π · r)

- Es **proporcional a la corriente** I: el doble de corriente, el doble de campo.
- **Disminuye con la distancia** r al cable (inversamente proporcional, no al cuadrado).
- μ₀ = 4π × 10⁻⁷ T·m/A es una constante.

Por ejemplo, a 1 cm de un cable con 10 A: B = 2 × 10⁻⁷ × 10 / 0,01 = 0,000 2 T = **200 µT**, unas cuatro veces el campo terrestre. A 1 m, solo 2 µT.

## Cables de ida y vuelta
En los cables de los aparatos, la corriente va por un conductor y vuelve por el otro, muy juntos. Sus campos son opuestos y **casi se cancelan**. Por eso los cables de casa apenas afectan a una brújula, salvo muy de cerca o si separas los conductores.

## Consecuencias enormes
Este descubrimiento abrió la puerta a:
- **Electroimanes** (lección 7.4): enrollando el cable, el campo se concentra.
- **Motores** (lección 7.5 y módulo 8): si una corriente crea un campo, un campo ejerce fuerza sobre una corriente.
- **Telégrafo, timbres, relés**, y después todos los aparatos electromagnéticos.

Pocos días después de conocer el hallazgo de Ørsted, [Ampère](#/personajes/ampere) demostró que dos cables con corriente se atraen o se repelen, y formuló sus leyes matemáticas.`,
      form: [["B = μ₀ · I / (2π · r)", "Campo de un cable recto largo; μ₀ = 4π × 10⁻⁷ T·m/A."], ["Regla de la mano derecha", "Pulgar = corriente; dedos = sentido del campo."]],
      ej: { enun: "¿Qué campo magnético produce un cable con 20 A a 5 cm de distancia? Compáralo con el terrestre (50 µT).", pasos: ["B = 2 × 10⁻⁷ × I / r (porque μ₀ / 2π = 2 × 10⁻⁷).", "B = 2 × 10⁻⁷ × 20 / 0,05 = 8 × 10⁻⁵ T = 80 µT.", "80 / 50 = 1,6 veces el campo terrestre."], res: "80 µT: suficiente para desviar una brújula." },
      vida: "Los detectores de cables en la pared y las pinzas amperimétricas (que miden la corriente sin cortar el cable) detectan el campo magnético que crea la corriente alrededor del conductor.",
      err: ["Usar la mano izquierda o el sentido de los electrones en la regla de la mano derecha.", "Creer que el campo de un cable sale «en línea recta» desde el cable: forma círculos.", "Pensar que el cable de un aparato produce un campo intenso: ida y vuelta se cancelan."],
      ejer: [["Si la corriente por un cable se triplica, ¿qué pasa con su campo magnético?", "Se triplica."], ["¿Y si te alejas al doble de distancia?", "Se reduce a la mitad."], ["¿Qué forma tienen las líneas de campo alrededor de un cable recto?", "Círculos concéntricos alrededor del cable."]],
      quiz: [
        { t: "om", p: "¿Qué descubrió Ørsted en 1820?", o: ["Que los imanes atraen el hierro", "Que una corriente eléctrica desvía una brújula", "La pila eléctrica", "La ley de Ohm"], c: 1, e: "La corriente crea un campo magnético." },
        { t: "om", p: "Las líneas de campo alrededor de un cable recto con corriente son…", o: ["Rectas que salen del cable", "Círculos alrededor del cable", "Inexistentes", "Paralelas al cable"], c: 1, e: "Círculos concéntricos." },
        { t: "om", p: "En la regla de la mano derecha, el pulgar indica…", o: ["El campo", "La corriente convencional", "El polo norte", "Los electrones"], c: 1, e: "Pulgar = corriente; dedos = campo." },
        { t: "vf", p: "Si se duplica la corriente en un cable, su campo magnético se duplica.", c: true, e: "B es proporcional a I." },
        { t: "om", p: "¿Por qué el cable de una lámpara casi no desvía una brújula?", o: ["Porque no lleva corriente", "Porque la corriente de ida y la de vuelta crean campos opuestos que casi se cancelan", "Porque el cobre no es magnético", "Porque es corriente directa"], c: 1, e: "Los dos conductores están muy juntos con corrientes opuestas." }
      ],
      res: ["Toda corriente eléctrica crea un campo magnético (Ørsted, 1820).", "Alrededor de un cable recto, el campo forma círculos.", "Regla de la mano derecha: pulgar = corriente; dedos = campo.", "El campo es proporcional a la corriente y disminuye con la distancia.", "En los cables de ida y vuelta, los campos casi se cancelan."]
    },
    {
      id: "7-4", t: "Bobinas y electroimanes", d: "Número de vueltas, corriente y núcleo; electroimanes en grúas y cerraduras.", min: 40, e: true, sim: "S8", exp: "e-electroiman",
      preg: "¿Cómo levantan las grúas de los desguaces autos enteros con un disco de metal, y cómo los sueltan?",
      obj: ["Explicar cómo una bobina concentra el campo magnético.", "Identificar los factores que aumentan la fuerza de un electroimán.", "Describir aplicaciones de los electroimanes."],
      txt: `Si en lugar de un cable recto **enrollas el cable en espiral**, los campos de todas las vueltas se suman en el interior. El resultado es una [[bobina]] (o solenoide), que produce un campo magnético **muy parecido al de un imán de barra**, con su polo norte y su polo sur.

## La regla de la mano derecha para bobinas
Rodea la bobina con los **dedos de la mano derecha** en el sentido en que circula la corriente por las vueltas: el **pulgar** apunta al **polo norte** de la bobina.

## El electroimán
Un [[electroimán]] es una bobina con un **núcleo de hierro** dentro. El hierro, al ser ferromagnético, concentra y refuerza enormemente el campo (cientos o miles de veces). Su gran ventaja frente a un imán permanente:

+> **Un electroimán se enciende y se apaga con la corriente**, y su fuerza se regula cambiando la corriente.

## ¿Qué hace más fuerte a un electroimán?
1. **Más vueltas:** cada vuelta suma su campo. El doble de vueltas, aproximadamente el doble de fuerza.
2. **Más corriente:** el campo es proporcional a la corriente.
3. **Un buen núcleo:** el hierro dulce (blando) multiplica el campo y pierde el magnetismo al cortar la corriente. El acero se quedaría imantado.
4. **Forma del núcleo:** un núcleo en forma de U, que lleva los dos polos juntos sobre la pieza a levantar, aumenta mucho la fuerza.

= B ≈ μ · N · I / L

(N = número de vueltas, I = corriente, L = largo de la bobina, μ = propiedad del núcleo).

## El precio de la fuerza: calor
Más corriente significa más calor en el alambre (efecto Joule). Por eso:
- Los electroimanes grandes usan **alambre grueso** y a veces refrigeración.
- En tu experimento con una pila de 1,5 V, el alambre se calienta en segundos porque casi es un cortocircuito: **conecta solo unos segundos**.

!> No uses nunca la red de la casa para hacer un electroimán: el alambre se calentaría hasta quemarse e incendiarse en un instante.

## Aplicaciones
- **Grúas electromagnéticas** de los desguaces: levantan chatarra de hierro y la sueltan al cortar la corriente. ¡La respuesta a la pregunta inicial!
- **Cerraduras electromagnéticas** de puertas de seguridad.
- **Relés:** un pequeño electroimán acciona un interruptor de más potencia (lección 7.8).
- **Timbres, válvulas solenoides** (lavadoras, riego), **frenos electromagnéticos**.
- **Resonancia magnética** de hospitales y **aceleradores de partículas**: electroimanes superconductores enormes.
- **Trenes de levitación magnética** (maglev).

## Electroimán frente a imán permanente
| Electroimán | Imán permanente |
|---|---|
| Se enciende y apaga | Siempre activo |
| Fuerza regulable | Fuerza fija |
| Necesita energía continua | No consume energía |
| Puede ser muchísimo más fuerte | Limitado por el material |`,
      form: [["B ≈ μ · N · I / L", "Campo dentro de una bobina: crece con las vueltas (N) y la corriente (I)."]],
      ej: { enun: "Un electroimán de 20 vueltas con 2 A levanta 6 clips. Si se pasa a 40 vueltas con la misma corriente, ¿cuántos clips levantará aproximadamente? ¿Y con 40 vueltas y 1 A?", pasos: ["El campo es proporcional a N × I.", "20 × 2 = 40 «amperios-vuelta» → 6 clips.", "40 × 2 = 80 → el doble: unos 12 clips.", "40 × 1 = 40 → igual que al principio: unos 6 clips."], res: "Unos 12 clips con 40 vueltas y 2 A; unos 6 con 40 vueltas y 1 A." },
      vida: "Cuando la lavadora termina de llenar, una válvula solenoide (un electroimán) cierra el paso del agua. Las puertas de los edificios con tarjeta suelen tener cerraduras electromagnéticas que se abren al cortar la corriente.",
      err: ["Usar un núcleo de acero si quieres que se desimante al cortar la corriente.", "Dejar conectado un electroimán casero a una pila: se calienta y la pila se agota.", "Pensar que más vueltas no importan si hay más corriente: importan ambas."],
      ejer: [["Nombra tres formas de aumentar la fuerza de un electroimán.", "Más vueltas, más corriente y un núcleo de hierro dulce."], ["¿Por qué las grúas de desguace usan electroimanes y no imanes permanentes?", "Porque pueden soltar la carga cortando la corriente."], ["Si duplicas las vueltas y reduces la corriente a la mitad, ¿qué pasa con el campo?", "Queda igual (N × I no cambia)."]],
      quiz: [
        { t: "om", p: "Un electroimán es…", o: ["Un imán natural", "Una bobina con corriente, normalmente con núcleo de hierro", "Una pila", "Un cable recto"], c: 1, e: "Bobina + corriente + núcleo." },
        { t: "om", p: "¿Qué ventaja principal tiene un electroimán sobre un imán permanente?", o: ["No consume energía", "Se puede encender y apagar", "Es más pequeño", "No necesita cable"], c: 1, e: "Se controla con la corriente." },
        { t: "vf", p: "Duplicar el número de vueltas de un electroimán aumenta aproximadamente al doble su campo.", c: true, e: "B es proporcional a N·I." },
        { t: "om", p: "¿Qué material de núcleo pierde el magnetismo al cortar la corriente?", o: ["Acero", "Hierro dulce", "Neodimio", "Cobre"], c: 1, e: "El hierro dulce es magnéticamente «blando»." },
        { t: "om", p: "¿Por qué se calienta un electroimán casero con una pila?", o: ["Por el campo magnético", "Por el efecto Joule de la corriente en el alambre", "Por la fricción", "Porque el hierro arde"], c: 1, e: "El alambre tiene poca resistencia y pasa mucha corriente." }
      ],
      res: ["Una bobina con corriente se comporta como un imán de barra.", "Con núcleo de hierro se convierte en un electroimán.", "Más vueltas, más corriente y buen núcleo dan más fuerza.", "Se enciende y apaga con la corriente: grúas, cerraduras, relés, válvulas.", "La corriente calienta el alambre: los electroimanes caseros se conectan solo unos segundos."]
    },
    {
      id: "7-5", t: "Fuerza sobre un cable con corriente", d: "La fuerza de Lorentz explicada de forma intuitiva; la base del motor.", min: 35,
      preg: "Si una corriente crea un campo magnético, ¿qué le pasa a un cable con corriente colocado dentro del campo de un imán?",
      obj: ["Explicar por qué un cable con corriente siente una fuerza dentro de un campo magnético.", "Determinar el sentido de la fuerza.", "Relacionar esta fuerza con el funcionamiento de los motores y las bocinas."],
      txt: `Si una corriente crea un campo magnético, es lógico pensar que un campo magnético **ejerce una fuerza** sobre una corriente. Así es: un cable con corriente colocado dentro del campo de un imán es **empujado** hacia un lado.

## La fuerza sobre un cable
Para un cable recto de largo L con una corriente I, perpendicular a un campo B:

= F = B · I · L

- La fuerza es **perpendicular** tanto al cable como al campo.
- Es mayor con **más campo**, **más corriente** y **más longitud** de cable dentro del campo.
- Si el cable es **paralelo** al campo, la fuerza es **cero**.

Ejemplo: 10 cm de cable con 5 A en un campo de 0,5 T: F = 0,5 × 5 × 0,1 = **0,25 N** (el peso de unos 25 g).

## ¿Hacia dónde empuja? La regla de la mano izquierda
Un truco clásico (regla de Fleming de la mano izquierda): pon el pulgar, el índice y el medio de la **mano izquierda** en ángulo recto entre sí.
- **Índice:** sentido del **campo** (de N a S).
- **Medio:** sentido de la **corriente** (convencional).
- **Pulgar:** sentido de la **fuerza** (movimiento).

Si inviertes la corriente o el campo, la fuerza se invierte.

## ¿Por qué ocurre?
Recuerda que una corriente son **cargas en movimiento**. Un campo magnético ejerce una fuerza sobre cualquier carga que se mueve a través de él: es la **fuerza de Lorentz**. Cada electrón del cable es empujado de lado, y como no puede salir del cable, arrastra al cable entero.

La misma fuerza desvía los electrones en los antiguos televisores de tubo, mantiene el plasma en los reactores de fusión y produce las auroras.

## Dos cables paralelos
Como cada cable crea un campo y el otro está dentro de él, **dos cables paralelos con corriente se atraen** si las corrientes van en el mismo sentido y **se repelen** si van en sentidos opuestos. Esta fuerza se usó durante décadas para definir el amperio. En cortocircuitos de miles de amperios, puede deformar barras metálicas de los tableros.

## De la fuerza al giro: el motor
Si en lugar de un cable recto pones una **espira** (un lazo) dentro del campo, la corriente va en un sentido por un lado y en el contrario por el otro. Las fuerzas en los dos lados son **opuestas** y forman un **par de giro**: la espira gira. Ese es el principio de todos los **motores eléctricos** (lección 8.3). Puedes verlo en la simulación S10 en modo «Motor».

## La bocina
Una bocina tiene una bobina pegada a un cono de papel, dentro del campo de un imán. La señal de audio es una corriente que cambia de sentido miles de veces por segundo: la fuerza empuja el cono adelante y atrás, mueve el aire y produce sonido.`,
      form: [["F = B · I · L", "Fuerza sobre un cable perpendicular al campo (N)."], ["Regla de la mano izquierda", "Índice = campo; medio = corriente; pulgar = fuerza."]],
      ej: { enun: "Un cable de 20 cm lleva 3 A dentro de un campo de 0,4 T, perpendicular a él. ¿Qué fuerza siente? ¿Y si se duplica la corriente?", pasos: ["F = B · I · L = 0,4 × 3 × 0,2 = 0,24 N.", "Con 6 A: F = 0,4 × 6 × 0,2 = 0,48 N (el doble)."], res: "0,24 N; con el doble de corriente, 0,48 N." },
      vida: "Todos los motores eléctricos —del ventilador, la licuadora, el auto eléctrico o la vibración del celular— funcionan gracias a esta fuerza. También los audífonos y bocinas.",
      err: ["Pensar que un cable paralelo al campo siente fuerza: si es paralelo, la fuerza es cero.", "Confundir la regla de la mano derecha (campo de una corriente) con la de la mano izquierda (fuerza sobre una corriente).", "Creer que la fuerza tiene la dirección del campo: es perpendicular."],
      ejer: [["Calcula la fuerza sobre 50 cm de cable con 2 A en un campo de 0,1 T (perpendicular).", "F = 0,1 × 2 × 0,5 = 0,1 N."], ["¿Qué pasa con la fuerza si inviertes el sentido de la corriente?", "Se invierte."], ["Dos cables paralelos llevan corriente en el mismo sentido. ¿Se atraen o se repelen?", "Se atraen."]],
      quiz: [
        { t: "om", p: "Un cable con corriente dentro de un campo magnético…", o: ["No siente nada", "Siente una fuerza perpendicular al cable y al campo", "Se calienta solo por el campo", "Pierde su corriente"], c: 1, e: "Es la fuerza de Lorentz sobre las cargas en movimiento." },
        { t: "num", p: "Calcula la fuerza sobre 10 cm de cable con 5 A en un campo de 0,5 T (perpendicular).", r: 0.25, u: "N", e: "F = 0,5 × 5 × 0,1 = 0,25 N." },
        { t: "vf", p: "Si el cable es paralelo al campo, la fuerza es máxima.", c: false, e: "Es cero; es máxima cuando son perpendiculares." },
        { t: "om", p: "¿Qué aparato se basa directamente en esta fuerza?", o: ["El foco incandescente", "El motor eléctrico", "La pila", "El fusible"], c: 1, e: "Las fuerzas sobre una espira producen giro." },
        { t: "om", p: "Dos cables paralelos con corrientes en sentidos opuestos…", o: ["Se atraen", "Se repelen", "No interactúan", "Se funden"], c: 1, e: "Corrientes opuestas se repelen." }
      ],
      res: ["Un campo magnético ejerce una fuerza sobre un cable con corriente.", "F = B·I·L, perpendicular al cable y al campo.", "Regla de la mano izquierda: índice = campo, medio = corriente, pulgar = fuerza.", "Dos cables con corrientes iguales se atraen; opuestas, se repelen.", "Sobre una espira, las fuerzas producen giro: así funcionan los motores."]
    },
    {
      id: "7-6", t: "Inducción electromagnética", d: "Faraday (1831): un campo que cambia genera voltaje; flujo magnético; más vueltas o más rapidez dan más voltaje.", min: 45, e: true, sim: "S9",
      preg: "Si una corriente crea magnetismo, ¿puede el magnetismo crear una corriente?",
      obj: ["Enunciar la ley de inducción de Faraday.", "Explicar qué es el flujo magnético y por qué debe cambiar.", "Identificar los factores que aumentan el voltaje inducido."],
      txt: `Tras el descubrimiento de Ørsted, muchos científicos se preguntaron si el magnetismo podía producir electricidad. Durante diez años nadie lo consiguió, porque buscaban el efecto con imanes **quietos**. En 1831, [Michael Faraday](#/personajes/faraday) (y, casi a la vez, [Joseph Henry](#/personajes/henry)) encontró la clave: **el campo tiene que cambiar**.

## El experimento
Faraday conectó una bobina a un [[galvanómetro]] (un detector de corriente muy sensible) y metió y sacó un imán:
- Al **meter** el imán, la aguja se movía hacia un lado.
- Con el imán **quieto** dentro, la aguja volvía a cero.
- Al **sacarlo**, la aguja se movía hacia el **otro** lado.
- Moviendo el imán **más rápido**, la aguja se desviaba **más**.

Puedes repetirlo en la simulación S9: arrastra el imán dentro y fuera de la bobina, o activa el vaivén automático.

## La ley de Faraday
+> **Cuando cambia el flujo magnético que atraviesa una bobina, se induce en ella un voltaje. El voltaje es proporcional a la rapidez del cambio y al número de vueltas.**

= V = N · ΔΦ / Δt

- **N:** número de vueltas de la bobina.
- **Φ (fi):** el [[flujo magnético]], es decir, la «cantidad de campo» que atraviesa la bobina (campo × área). Se mide en webers (Wb).
- **ΔΦ/Δt:** la rapidez con que cambia el flujo.

## Formas de cambiar el flujo
1. **Mover un imán** cerca de la bobina (o la bobina cerca del imán).
2. **Girar la bobina** dentro de un campo: así funcionan los **generadores** (lección 8.1).
3. **Cambiar la corriente de otra bobina cercana**: así funcionan los **transformadores** (lección 8.5).
4. **Cambiar el área** de la espira dentro del campo.

## ¿Cómo obtener más voltaje?
- **Más vueltas** en la bobina (el doble de vueltas, el doble de voltaje).
- **Un cambio más rápido** (mover el imán más rápido, girar más rápido).
- **Un imán más fuerte** (mayor cambio de flujo).
- **Un núcleo de hierro** que concentre el campo.

Ejemplo: si un imán se mueve dentro de una bobina de 200 vueltas y el flujo cambia 0,001 Wb en 0,1 s:
- V = 200 × 0,001 / 0,1 = **2 V**.
- Si lo mueves el doble de rápido (0,05 s): **4 V**.

## Por qué es tan importante
La inducción es la base de casi toda la electricidad que usamos:
- **Generadores** de las centrales: el 99 % de la electricidad del mundo (salvo la solar fotovoltaica) se produce por inducción.
- **Transformadores** de la red y de los cargadores.
- **Cargadores inalámbricos** de celulares y cepillos de dientes.
- **Cocinas de inducción**, **detectores de metales**, **micrófonos dinámicos**, **pastillas de guitarra eléctrica** y **tarjetas sin contacto**.

Con la inducción, el círculo se cierra: la electricidad produce magnetismo (Ørsted) y el magnetismo variable produce electricidad (Faraday). [James Clerk Maxwell](#/personajes/maxwell) unificó ambas ideas en sus ecuaciones y predijo las ondas electromagnéticas.`,
      form: [["V = N · ΔΦ / Δt", "Ley de Faraday: voltaje inducido en una bobina de N vueltas."], ["Φ = B · A", "Flujo magnético (Wb) = campo (T) × área (m²), si el campo es perpendicular."]],
      ej: { enun: "Una bobina de 500 vueltas está en un campo cuyo flujo pasa de 0,002 Wb a 0 en 0,04 s. ¿Qué voltaje se induce?", pasos: ["ΔΦ = 0,002 − 0 = 0,002 Wb.", "V = N · ΔΦ / Δt = 500 × 0,002 / 0,04.", "V = 1 / 0,04 = 25 V."], res: "Se inducen 25 V mientras dura el cambio." },
      vida: "Al acercar tu celular a un cargador inalámbrico, una bobina del cargador crea un campo que cambia rápidamente; la bobina del celular lo capta e induce la corriente que carga la batería.",
      err: ["Creer que un imán quieto induce corriente.", "Pensar que la inducción depende del tamaño del imán y no de la rapidez del cambio.", "Olvidar el número de vueltas."],
      ejer: [["¿Se induce voltaje si el imán y la bobina se mueven juntos, a la misma velocidad?", "No: el flujo a través de la bobina no cambia."], ["Una bobina de 100 vueltas sufre un cambio de flujo de 0,01 Wb en 0,5 s. ¿Voltaje?", "100 × 0,01 / 0,5 = 2 V."], ["¿Qué pasa con el voltaje si pasas de 100 a 300 vueltas?", "Se triplica."]],
      quiz: [
        { t: "om", p: "Según Faraday, se induce voltaje en una bobina cuando…", o: ["Hay un imán quieto dentro", "Cambia el flujo magnético que la atraviesa", "La bobina es de cobre", "Está conectada a una pila"], c: 1, e: "Lo esencial es el cambio del flujo." },
        { t: "vf", p: "Mover el imán más rápido induce más voltaje.", c: true, e: "El voltaje es proporcional a la rapidez del cambio." },
        { t: "num", p: "Una bobina de 200 vueltas sufre un cambio de flujo de 0,001 Wb en 0,1 s. ¿Voltaje inducido?", r: 2, u: "V", e: "V = 200 × 0,001 / 0,1 = 2 V." },
        { t: "om", p: "¿Cuál de estos aparatos NO se basa en la inducción?", o: ["Generador", "Transformador", "Cargador inalámbrico", "Pila alcalina"], c: 3, e: "La pila produce voltaje por una reacción química." },
        { t: "om", p: "Al meter un imán en una bobina la aguja va a la derecha. Al sacarlo irá…", o: ["A la derecha", "A la izquierda", "No se mueve", "Gira sin parar"], c: 1, e: "El cambio de flujo tiene signo contrario." }
      ],
      res: ["Un flujo magnético que cambia induce un voltaje (Faraday, 1831).", "V = N · ΔΦ/Δt: más vueltas y cambios más rápidos dan más voltaje.", "Un imán quieto no induce nada.", "Al invertir el movimiento, se invierte el voltaje.", "La inducción es la base de generadores, transformadores y cargadores inalámbricos."]
    },
    {
      id: "7-7", t: "Ley de Lenz y corrientes de Foucault", d: "La corriente inducida se opone al cambio; freno magnético, cocinas de inducción y detectores de metales.", min: 35, sim: "S9", exp: "e-tubo-cobre",
      preg: "¿Por qué un imán cae lentísimo por dentro de un tubo de cobre, si el cobre no es magnético?",
      obj: ["Enunciar la ley de Lenz.", "Explicar qué son las corrientes de Foucault.", "Describir aplicaciones útiles y pérdidas que producen."],
      txt: `La ley de Faraday dice **cuánto** voltaje se induce. La [[ley de Lenz]] (Heinrich Lenz, 1834) dice **en qué sentido**:

+> **La corriente inducida circula en el sentido que crea un campo magnético que se opone al cambio que la produjo.**

## Qué significa
- Si **acercas** el polo norte de un imán a una bobina, la corriente inducida convierte esa cara de la bobina en un **polo norte**, que **repele** al imán: se opone a que se acerque.
- Si lo **alejas**, la bobina forma un **polo sur** en esa cara, que **atrae** al imán: se opone a que se aleje.

La naturaleza «resiste» el cambio. Es una consecuencia de la **conservación de la energía**: si la corriente inducida ayudara al movimiento, el imán se aceleraría solo y obtendríamos energía gratis, lo cual es imposible. Para generar electricidad **hay que hacer trabajo** venciendo esa oposición. Por eso cuesta más girar un generador cuando se le conecta una carga.

## Las corrientes de Foucault
Cuando un campo magnético cambia cerca de un trozo de **metal macizo** (no una bobina), se inducen corrientes que circulan en remolinos dentro del metal: las [[corrientes de Foucault]] (o corrientes parásitas), estudiadas por Léon Foucault. Por la ley de Lenz, estas corrientes se oponen al cambio y producen **frenado** y **calor**.

## La respuesta a la pregunta inicial: el imán en el tubo
Al caer un imán de neodimio por un tubo de cobre, el campo cambia en cada sección del tubo. Se inducen corrientes circulares en el cobre que crean campos opuestos al movimiento: **frenan** la caída. El imán tarda segundos en atravesar un tubo que recorrería en una fracción de segundo. El cobre se calienta un poco: la energía de la caída se convirtió en calor. Lo harás en el experimento de esta lección.

## Aplicaciones útiles
- **Cocinas de inducción:** una bobina bajo el vidrio crea un campo que cambia decenas de miles de veces por segundo. En el fondo de hierro de la olla se inducen corrientes de Foucault que la calientan directamente; el vidrio casi no se calienta.
- **Frenos magnéticos** de trenes, montañas rusas y bicicletas estáticas: frenan sin rozamiento ni desgaste.
- **Detectores de metales:** un campo variable induce corrientes en los objetos metálicos ocultos, y el detector capta el campo que producen.
- **Medidores eléctricos antiguos:** su disco de aluminio giraba gracias a corrientes inducidas.
- **Hornos de inducción** para fundir metales.

## Pérdidas indeseadas
En los **núcleos de hierro de transformadores y motores**, las corrientes de Foucault desperdician energía en calor. Para reducirlas, los núcleos se hacen con **láminas delgadas** de acero al silicio, aisladas entre sí, que cortan los remolinos (lección 8.8).`,
      form: [["V = −N · ΔΦ / Δt", "El signo menos expresa la ley de Lenz: la corriente inducida se opone al cambio."]],
      vida: "Las montañas rusas modernas usan frenos magnéticos: aletas metálicas pasan entre imanes y las corrientes de Foucault las frenan suavemente, sin piezas que se desgasten, incluso si se va la luz.",
      err: ["Creer que el tubo de cobre atrae al imán porque es magnético: el frenado se debe a las corrientes inducidas.", "Pensar que la ley de Lenz permite obtener energía gratis: dice justo lo contrario.", "Usar una olla de aluminio o cobre en una cocina de inducción sin base magnética."],
      ejer: [["Acercas el polo sur de un imán a una bobina. ¿Qué polo se forma en esa cara de la bobina?", "Un polo sur, que repele al imán."], ["¿Por qué los núcleos de los transformadores son laminados?", "Para reducir las corrientes de Foucault y sus pérdidas en calor."], ["¿Por qué cuesta más girar un generador con muchos aparatos conectados?", "Porque la corriente inducida mayor produce una fuerza mayor que se opone al giro (ley de Lenz)."]],
      quiz: [
        { t: "om", p: "La ley de Lenz dice que la corriente inducida…", o: ["Ayuda al cambio que la produce", "Se opone al cambio que la produce", "Siempre es cero", "Va del norte al sur"], c: 1, e: "Se opone al cambio de flujo." },
        { t: "om", p: "Un imán cae lentamente por un tubo de cobre porque…", o: ["El cobre es magnético", "Se inducen corrientes en el cobre que frenan al imán", "Hay aire comprimido", "El imán pierde su magnetismo"], c: 1, e: "Corrientes de Foucault según la ley de Lenz." },
        { t: "vf", p: "Las cocinas de inducción calientan la olla mediante corrientes inducidas en su fondo metálico.", c: true, e: "Son corrientes de Foucault." },
        { t: "om", p: "¿Por qué se laminan los núcleos de los transformadores?", o: ["Para que pesen menos", "Para reducir las corrientes de Foucault", "Para aumentar el voltaje", "Por estética"], c: 1, e: "Las láminas aisladas cortan los remolinos de corriente." },
        { t: "om", p: "La ley de Lenz es una consecuencia de…", o: ["La conservación de la energía", "La ley de Ohm", "La ley de Coulomb", "La gravedad"], c: 0, e: "Si no se opusiera, se crearía energía de la nada." }
      ],
      res: ["Ley de Lenz: la corriente inducida se opone al cambio que la produce.", "Es consecuencia de la conservación de la energía.", "En metales macizos se inducen corrientes de Foucault que frenan y calientan.", "Aplicaciones: cocinas de inducción, frenos magnéticos, detectores de metales.", "En transformadores y motores son pérdidas: se reducen con núcleos laminados."]
    },
    {
      id: "7-8", t: "Aplicaciones del electromagnetismo", d: "Relés, timbres, bocinas, micrófonos, tarjetas, carga inalámbrica y resonancia magnética.", min: 30,
      preg: "¿Qué tienen en común un timbre, una bocina, un relé y la resonancia magnética de un hospital?",
      obj: ["Explicar el funcionamiento de aparatos electromagnéticos comunes.", "Identificar en cada uno el principio físico (campo de una corriente, fuerza o inducción).", "Relacionar el electromagnetismo con la tecnología cotidiana."],
      txt: `Con tres ideas del módulo —**la corriente crea un campo**, **el campo ejerce fuerza sobre una corriente** y **un campo variable induce voltaje**— se explica una enorme cantidad de aparatos.

## El relé
Un [[relé]] es un **interruptor accionado por un electroimán**. Una corriente pequeña (por ejemplo, 50 mA a 5 V desde un circuito electrónico) activa la bobina, que atrae una lámina metálica y **cierra unos contactos** que pueden manejar un circuito de mucha más potencia (por ejemplo, una bomba de agua a {{V}}). Así, un circuito delicado controla uno potente **sin estar conectado eléctricamente** con él.

Se usan en autos (luces, arranque), electrodomésticos, termostatos y automatización.

## El timbre electromecánico
Al pulsar el botón, la corriente pasa por un electroimán que atrae un martillo, que golpea la campana. Al moverse, el martillo **abre el propio circuito**: el electroimán se apaga y un resorte devuelve el martillo, que vuelve a cerrar el circuito… y así muchas veces por segundo: ¡riiing!

## La bocina y el micrófono
- **Bocina:** una bobina unida a un cono, dentro del campo de un imán. La corriente de audio la empuja adelante y atrás (fuerza sobre una corriente) y el cono mueve el aire.
- **Micrófono dinámico:** el mismo dispositivo al revés. El sonido mueve el cono y la bobina dentro del campo; se **induce** un voltaje que copia la onda sonora (inducción).

## Las pastillas de la guitarra eléctrica
Bajo cada cuerda de acero hay un imán rodeado de una bobina. La cuerda, al vibrar, cambia el campo y se induce en la bobina una señal eléctrica con la frecuencia de la nota.

## Tarjetas y carga sin contacto
- **Tarjetas de transporte y de pago sin contacto (NFC):** el lector crea un campo variable que induce corriente en una bobina dentro de la tarjeta, alimentando su chip, que responde.
- **Cargadores inalámbricos:** dos bobinas, una en la base y otra en el celular, forman un transformador sin núcleo.

## Motores, generadores y transformadores
Son las aplicaciones más importantes de todas, y por eso tienen su propio módulo (módulo 8).

## La resonancia magnética
Los equipos de **resonancia magnética** de los hospitales usan electroimanes superconductores de 1,5 a 3 T. El campo orienta los núcleos de hidrógeno del cuerpo; pulsos de radio los hacen «resonar», y al relajarse emiten señales que se **inducen** en bobinas receptoras. Con ellas una computadora construye imágenes del interior del cuerpo sin rayos X.

!> Por su campo enorme, en la sala de resonancia no se puede entrar con objetos de hierro: se convierten en proyectiles. Las personas con marcapasos o implantes metálicos deben avisar antes del estudio.

## Resumen: ¿qué principio usa cada uno?
| Aparato | Principio |
|---|---|
| Electroimán, relé, timbre, válvula | La corriente crea un campo |
| Motor, bocina, audífonos | El campo ejerce fuerza sobre la corriente |
| Generador, micrófono dinámico, pastilla de guitarra | Inducción por movimiento |
| Transformador, cargador inalámbrico, NFC, cocina de inducción | Inducción por un campo variable |`,
      vida: "El sonido de tus audífonos, el clic de un relé al encender el aire acondicionado y el pitido del lector de la tarjeta del transporte son electromagnetismo en acción.",
      err: ["Pensar que un relé conecta eléctricamente el circuito de control con el de potencia: los separa.", "Creer que un micrófono y una bocina funcionan con principios distintos: son el mismo dispositivo al revés.", "Entrar a una sala de resonancia con objetos metálicos."],
      ejer: [["¿Qué hace un relé?", "Permite que una corriente pequeña controle un circuito de mucha más potencia mediante un electroimán."], ["¿Qué principio usa un micrófono dinámico?", "La inducción: el movimiento de la bobina en el campo del imán induce un voltaje."], ["¿Por qué una tarjeta sin contacto no necesita pila?", "Porque el lector induce corriente en su bobina, que alimenta el chip."]],
      quiz: [
        { t: "om", p: "Un relé es…", o: ["Un tipo de pila", "Un interruptor accionado por un electroimán", "Un foco", "Un fusible"], c: 1, e: "Una corriente pequeña acciona un interruptor de potencia." },
        { t: "om", p: "Un micrófono dinámico funciona por…", o: ["Inducción electromagnética", "Efecto Joule", "Electricidad estática", "Una reacción química"], c: 0, e: "El sonido mueve una bobina en un campo e induce voltaje." },
        { t: "vf", p: "Una bocina y un micrófono dinámico son esencialmente el mismo dispositivo usado al revés.", c: true, e: "Bobina, imán y cono en ambos." },
        { t: "om", p: "¿Qué principio usa un cargador inalámbrico?", o: ["La fuerza sobre una corriente", "La inducción por un campo variable", "La electricidad estática", "La ley de Coulomb"], c: 1, e: "Dos bobinas acopladas como un transformador." },
        { t: "om", p: "¿Por qué no se puede entrar con objetos de hierro a una resonancia magnética?", o: ["Porque se oxidan", "Porque el campo enorme los atrae como proyectiles", "Porque dan descargas", "Porque se calientan por el aire"], c: 1, e: "El campo de 1,5–3 T atrae con violencia el hierro." }
      ],
      res: ["Relés, timbres y válvulas usan el campo creado por una corriente.", "Motores, bocinas y audífonos usan la fuerza sobre una corriente.", "Generadores y micrófonos usan la inducción por movimiento.", "Transformadores, NFC y carga inalámbrica usan un campo variable.", "La resonancia magnética usa electroimanes enormes e inducción."]
    }
  ]
});
