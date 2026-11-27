// M1. Qué es la electricidad
registrarModulo({
  id: "m1", n: 1, nivel: 1, titulo: "Qué es la electricidad", quizMin: 25, quizN: 15, minEsperado: 300,
  objetivo: "Explicar la electricidad a partir del átomo y la carga eléctrica, distinguir conductores de aislantes y explicar la electricidad estática.",
  clave: "carga atomo electron estatica conductores aislantes coulomb",
  actividades: ["Clasificar 20 materiales de tu casa en conductores y aislantes y comprobar algunos con el probador de la lección 1.5.", "Explicar con un dibujo por qué a veces da «toques» la puerta de un auto o la perilla de una puerta.", "Usar la simulación [Ley de Coulomb](#/simulacion/S2) para comprobar que a doble distancia la fuerza es la cuarta parte."],
  ejemplos: ["Fuerza entre dos cargas de 1 µC a 10 cm (0,9 N) y a 20 cm (0,22 N).", "Cuántos electrones hay en 1 culombio: unos 6,24 × 10¹⁸."],
  sims: ["S1", "S2"], calcs: ["C14"], gen: ["coulomb"],
  evaluacion: "Quiz de módulo de 15 preguntas (25 min) sacadas de las lecciones, con una pregunta numérica de la ley de Coulomb con valores aleatorios. Se aprueba con el 70 %.",
  extra: [
    { t: "om", p: "¿Qué tienen en común un rayo y la chispa al tocar una perilla después de caminar sobre una alfombra?", o: ["Ambos son descargas de electricidad estática acumulada", "Ambos son corriente alterna", "Ambos los produce un imán", "No tienen nada en común"], c: 0, e: "Los dos son descargas que igualan cargas acumuladas; el rayo es muchísimo más grande.", lec: "1-7" },
    { t: "vf", p: "Un objeto neutro no tiene cargas eléctricas.", c: false, e: "Un objeto neutro tiene muchísimas cargas, pero tantas positivas como negativas.", lec: "1-3" },
    { t: "om", p: "¿Por qué el cobre se usa en los cables?", o: ["Porque es barato y no conduce", "Porque tiene muchos electrones libres y conduce muy bien", "Porque es magnético", "Porque es aislante"], c: 1, e: "El cobre tiene un electrón libre por átomo y una resistividad muy baja; además es dúctil y relativamente barato.", lec: "1-5" }
  ],
  lecciones: [
    {
      id: "1-1", t: "La electricidad en tu día", d: "Dónde está la electricidad: luz, aparatos, cuerpo humano y rayos; qué es y qué no es.", min: 25,
      preg: "Si mañana desapareciera la electricidad, ¿qué cosas dejarían de funcionar… y qué cosas seguirían pasando en tu cuerpo y en el cielo?",
      obj: ["Reconocer fenómenos eléctricos en la vida diaria y en la naturaleza.", "Explicar en una frase qué es la electricidad.", "Distinguir entre electricidad, energía y corriente."],
      txt: `Piensa en un día normal. Te despierta la alarma del celular, enciendes la luz, sacas leche fría del refrigerador, cargas el teléfono y ves una pantalla. Todo eso funciona con **electricidad**. Pero la electricidad no es un invento humano: ya estaba en los **rayos** de las tormentas, en las **anguilas eléctricas** que aturden a sus presas y en tu propio cuerpo, donde cada latido del corazón y cada pensamiento son señales eléctricas que viajan por las células.

## Entonces, ¿qué es la electricidad?
La palabra viene del griego *élektron*, que significa ámbar. Hace más de 2 500 años, [Tales de Mileto](#/personajes/tales) notó que el ámbar frotado con piel atraía pajitas. Hoy sabemos explicarlo:

> **La electricidad es el conjunto de fenómenos producidos por las cargas eléctricas, tanto en reposo como en movimiento.**

Toda la materia está hecha de [[átomo|átomos]], y los átomos contienen partículas con [[carga eléctrica]]: los **protones** (positivos) y los **electrones** (negativos). Cuando las cargas se acumulan en un sitio hablamos de **electricidad estática**; cuando se mueven de forma ordenada por un camino hablamos de **corriente eléctrica**.

## Tres palabras que se suelen confundir
- **Electricidad:** el fenómeno general, la «ciencia» de las cargas.
- **Corriente eléctrica:** el movimiento ordenado de cargas por un conductor; se mide en amperios.
- **Energía eléctrica:** la capacidad de esas cargas en movimiento de hacer un trabajo (encender un foco, mover un motor, calentar agua); es lo que pagas en el recibo, en kilowatts-hora.

Cuando alguien dice «se fue la luz», en realidad quiere decir que dejó de llegar **energía eléctrica** a su casa.

## La electricidad como «mensajero de energía»
Una idea clave del curso: la electricidad casi nunca es lo que realmente queremos. Lo que queremos es **luz, calor, movimiento, sonido o información**. La electricidad es una forma muy práctica de **llevar energía** desde donde se produce (una presa, un panel solar, una pila) hasta donde se usa, y de transformarla allí en lo que necesitamos. Por eso tiene tanto éxito: viaja casi instantáneamente, por cables delgados, y se convierte con facilidad en casi cualquier otra forma de energía.

| Aparato | Convierte la energía eléctrica en… |
|---|---|
| Foco LED | luz (y un poco de calor) |
| Plancha, hervidor | calor |
| Ventilador, licuadora | movimiento |
| Bocina | sonido |
| Celular | luz, sonido, ondas de radio e información |

## La electricidad en la naturaleza
- **Rayos:** descargas gigantescas entre nubes y el suelo (lección 1.7).
- **Sistema nervioso:** las neuronas envían impulsos eléctricos de unas décimas de voltio.
- **Corazón:** un marcapasos natural produce pulsos eléctricos que el electrocardiograma registra.
- **Animales eléctricos:** la anguila eléctrica produce descargas de hasta unos 600 V.

## Lo que NO es la electricidad
No es un fluido que se «gasta» como el agua de un tinaco, ni algo que «sale» del contacto si se deja destapado. Los electrones ya están dentro de los cables; la fuente (pila o central) solo los **empuja** para que se muevan y transporten energía. Esa idea la desarrollaremos en el módulo 2.`,
      vida: "Revisa tu recibo de luz: no cobra «electricidad» ni «corriente», sino **energía** en kWh. Y fíjate en las etiquetas de tus aparatos: indican cuánta potencia usan para convertir la electricidad en luz, calor o movimiento.",
      err: ["Pensar que la electricidad solo existe en los cables: también está en los rayos, en los seres vivos y en cada átomo.", "Decir que los contactos «tienen electricidad guardada» que se escapa: el contacto ofrece un voltaje; solo hay corriente si se cierra un circuito.", "Usar «corriente», «energía» y «electricidad» como si fueran lo mismo."],
      ejer: [["Nombra tres fenómenos eléctricos naturales.", "Por ejemplo: los rayos, los impulsos nerviosos y el latido del corazón (también la anguila eléctrica o la estática del pelo)."], ["¿En qué convierte la energía eléctrica una licuadora? ¿Y un hervidor?", "La licuadora, en movimiento (motor); el hervidor, en calor."], ["¿Qué paga exactamente el recibo de luz?", "La energía eléctrica consumida, medida en kilowatts-hora (kWh)."]],
      quiz: [
        { t: "om", p: "¿De qué palabra griega viene «electricidad»?", o: ["Del nombre del ámbar", "Del nombre del rayo", "Del nombre del imán", "Del nombre del cobre"], c: 0, e: "*Élektron* significa ámbar: Tales observó que el ámbar frotado atraía objetos ligeros." },
        { t: "om", p: "¿Cuál es la mejor definición de electricidad?", o: ["Un fluido que se guarda en los cables", "El conjunto de fenómenos producidos por las cargas eléctricas", "La energía que produce una central", "La luz de los focos"], c: 1, e: "La electricidad abarca todos los fenómenos de las cargas, en reposo (estática) o en movimiento (corriente)." },
        { t: "vf", p: "El cuerpo humano usa señales eléctricas para funcionar.", c: true, e: "Las neuronas y el corazón funcionan con impulsos eléctricos." },
        { t: "om", p: "Lo que cobra la compañía en tu recibo es…", o: ["La corriente", "El voltaje", "La energía", "La resistencia"], c: 2, e: "Se cobra la energía consumida, en kWh." },
        { t: "om", p: "Un ventilador convierte la energía eléctrica principalmente en…", o: ["Luz", "Movimiento", "Sonido", "Calor"], c: 1, e: "Su motor convierte la energía eléctrica en movimiento (y algo de calor)." }
      ],
      res: ["La electricidad son los fenómenos de las cargas eléctricas, en reposo o en movimiento.", "Toda la materia tiene cargas: protones positivos y electrones negativos.", "La corriente es el movimiento ordenado de cargas; la energía es lo que esa corriente transporta.", "La electricidad lleva energía de un lugar a otro y se transforma en luz, calor, movimiento o sonido.", "Hay electricidad en la naturaleza: rayos, nervios, corazón y animales eléctricos."]
    },
    {
      id: "1-2", t: "El átomo por dentro", d: "Protones, neutrones y electrones; núcleo y capas; electrones libres.", min: 35, e: true,
      preg: "Si todo está hecho de átomos, y los átomos tienen cargas, ¿por qué tu mesa no te da toques?",
      obj: ["Describir las partes del átomo y la carga de cada partícula.", "Explicar qué es un electrón libre y por qué es importante.", "Relacionar la estructura atómica con la electricidad."],
      txt: `Todo lo que te rodea está hecho de [[átomo|átomos]], tan pequeños que en el grosor de un cabello caben alrededor de un millón en fila. Para entender la electricidad tenemos que mirar dentro de ellos.

## Las tres partículas
| Partícula | Dónde está | Carga | Masa relativa |
|---|---|---|---|
| **Protón** | en el núcleo | positiva (+) | 1 836 |
| **Neutrón** | en el núcleo | sin carga (0) | 1 839 |
| **Electrón** | alrededor del núcleo | negativa (−) | 1 |

El **núcleo** es diminuto y concentra casi toda la masa: si el átomo fuera un estadio de fútbol, el núcleo sería una canica en el centro. Los **electrones** se mueven alrededor, en una nube organizada por **capas** o niveles de energía.

## Un átomo normal es neutro
Un átomo tiene **el mismo número de protones que de electrones**. Las cargas positivas y negativas se compensan exactamente, y por eso el átomo, en conjunto, es **neutro**. Esa es la respuesta a la pregunta inicial: tu mesa tiene billones de billones de cargas, pero tantas positivas como negativas; sus efectos se cancelan.

Por ejemplo, el **cobre** tiene 29 protones y 29 electrones. El número de protones define el elemento: 1 es hidrógeno, 6 es carbono, 29 es cobre, 79 es oro.

## Los electrones de la última capa
Los electrones de las capas internas están muy sujetos al núcleo. Pero los de la **capa más externa** (electrones de valencia) están más lejos y menos atados. En los **metales**, esos electrones externos se desprenden con facilidad y pasan a moverse por todo el material, saltando de átomo en átomo: son los [[electrón libre|electrones libres]].

Imagina el metal como una red de iones positivos fijos, inmersa en un «mar» de electrones libres que se mueven al azar en todas direcciones, a gran velocidad. Mientras se mueven al azar, no hay corriente. Cuando una pila los empuja, todos empiezan a desplazarse, en promedio, en una misma dirección: eso es la **corriente eléctrica**.

## Iones: átomos con carga
Si un átomo **pierde** electrones, le sobran protones y queda con carga **positiva**: es un **ion positivo**. Si **gana** electrones, queda **negativo**. Los protones, en cambio, no se mueven de un átomo a otro en los fenómenos eléctricos cotidianos: están atrapados en el núcleo. Por eso, cuando un objeto se carga, siempre es porque **ganó o perdió electrones**.

?> En los líquidos (como el agua con sal o el ácido de una batería) y en los gases, los que se mueven son **iones** completos, positivos y negativos. En los metales, solo electrones.

## Del átomo a la electricidad
- La **carga** de un objeto depende del balance entre sus protones y sus electrones.
- La **corriente** en un metal es el movimiento ordenado de sus electrones libres.
- Que un material sea **conductor** o **aislante** depende de cuántos electrones libres tiene (lección 1.5).

Con estas tres ideas puedes explicar casi todo lo que viene en el curso.`,
      form: [["Carga de un objeto = (número de protones − número de electrones) × e", "e = 1,6 × 10⁻¹⁹ C es la carga elemental. Si sobran electrones, la carga es negativa."]],
      ej: { enun: "Un átomo de cobre (29 protones) pierde 2 electrones. ¿Qué carga neta tiene y cómo se llama?", pasos: ["Protones: 29. Electrones después de perder 2: 29 − 2 = 27.", "Carga neta = (29 − 27) × e = +2e.", "+2e = 2 × 1,6 × 10⁻¹⁹ C = 3,2 × 10⁻¹⁹ C."], res: "Queda con carga +2e (3,2 × 10⁻¹⁹ C): es un ion positivo de cobre, Cu²⁺." },
      sim: "S4",
      vida: "Los cables de tu casa son de cobre porque sus átomos sueltan con facilidad un electrón de su capa externa. El plástico que los recubre, en cambio, tiene sus electrones bien sujetos: por eso te protege.",
      err: ["Creer que en la corriente se mueven los protones: en los metales solo se mueven los electrones.", "Pensar que un objeto neutro no tiene cargas: tiene muchas, pero equilibradas.", "Imaginar los electrones como planetas en órbitas fijas: es un modelo útil, pero en realidad forman una «nube» de probabilidad."],
      ejer: [["Un átomo tiene 8 protones y 10 electrones. ¿Cuál es su carga neta?", "8 − 10 = −2, es decir, −2e: un ion negativo (O²⁻ si es oxígeno)."], ["¿Por qué los protones no pasan de un objeto a otro al frotarlos?", "Están en el núcleo, unidos muy fuertemente por la fuerza nuclear; solo los electrones externos pueden transferirse."], ["¿Qué diferencia hay entre un electrón de valencia y un electrón libre?", "El de valencia está en la capa externa de un átomo; cuando se separa y se mueve por todo el material, se le llama electrón libre."], ["Calcula la carga en culombios de un ion con carga −3e.", "−3 × 1,6 × 10⁻¹⁹ = −4,8 × 10⁻¹⁹ C."]],
      quiz: [
        { t: "om", p: "¿Qué partícula del átomo tiene carga negativa?", o: ["Protón", "Neutrón", "Electrón", "Núcleo"], c: 2, e: "El electrón es negativo; el protón, positivo; el neutrón no tiene carga." },
        { t: "om", p: "Un átomo neutro tiene…", o: ["Más protones que electrones", "Igual número de protones que de electrones", "Solo neutrones", "Ningún electrón"], c: 1, e: "Cuando protones y electrones son iguales, las cargas se compensan." },
        { t: "vf", p: "Cuando un objeto se carga positivamente es porque ganó protones.", c: false, e: "Se carga positivamente porque PERDIÓ electrones; los protones no se mueven." },
        { t: "om", p: "Los electrones libres de un metal…", o: ["Están fijos en el núcleo", "Se mueven por todo el material y forman la corriente", "No tienen carga", "Solo existen en los imanes"], c: 1, e: "Son electrones externos que se desprenden de su átomo y se mueven por el metal." },
        { t: "num", p: "Un átomo tiene 11 protones y 10 electrones. ¿Cuál es su carga neta en múltiplos de e? (escribe el número)", r: 1, u: "", e: "11 − 10 = +1: es un ion positivo (Na⁺ si es sodio)." }
      ],
      res: ["El átomo tiene un núcleo con protones (+) y neutrones (0), rodeado de electrones (−).", "Un átomo normal es neutro: tantos protones como electrones.", "Los objetos se cargan al ganar o perder electrones, nunca protones.", "En los metales hay electrones libres que pueden moverse por todo el material.", "La corriente en un metal es el movimiento ordenado de esos electrones libres."]
    },
    {
      id: "1-3", t: "La carga eléctrica", d: "Carga positiva y negativa, el culombio, carga del electrón y conservación de la carga.", min: 35, e: true,
      preg: "Cuando frotas un globo en tu cabello, ¿se «crea» electricidad o solo se cambia de lugar?",
      obj: ["Explicar las reglas de atracción y repulsión entre cargas.", "Usar el culombio y la carga elemental en cálculos sencillos.", "Aplicar el principio de conservación de la carga."],
      txt: `La [[carga eléctrica]] es una propiedad de algunas partículas, igual que la masa. Pero a diferencia de la masa, que siempre atrae, la carga viene en **dos tipos**, que [Benjamin Franklin](#/personajes/franklin) llamó **positiva** y **negativa**.

## La regla de oro de las cargas
- **Cargas iguales se repelen** (+ con +, − con −).
- **Cargas distintas se atraen** (+ con −).

Esta regla explica por qué el electrón, negativo, se mantiene unido al núcleo, positivo, y por qué dos globos frotados se alejan uno del otro.

## ¿Cómo se mide la carga?
La unidad de carga del Sistema Internacional es el [[culombio]] (**C**), en honor a [Charles-Augustin de Coulomb](#/personajes/coulomb). Un culombio es una cantidad enorme de carga. La carga más pequeña que existe libre en la naturaleza es la del electrón (negativa) o la del protón (positiva), llamada **carga elemental**:

= e = 1,6 × 10⁻¹⁹ C

¿Cuántos electrones hacen falta para juntar un culombio? Basta dividir:

= 1 C ÷ 1,6 × 10⁻¹⁹ C = 6,25 × 10¹⁸ electrones

Son más de seis trillones. En la vida diaria usamos submúltiplos: el **microculombio** (µC = 10⁻⁶ C) y el **nanoculombio** (nC = 10⁻⁹ C). Un globo frotado tiene cargas del orden de nanoculombios.

## La carga está «cuantizada»
Toda carga que puedas medir es un número entero de cargas elementales: e, 2e, 3e… No existe un objeto con media carga de electrón. Por eso la carga de cualquier objeto es

= q = n × e

donde **n** es el número de electrones de más (carga negativa) o de menos (carga positiva).

## Conservación de la carga
Uno de los principios más sólidos de la física dice:

+> **La carga eléctrica no se crea ni se destruye; solo se transfiere de un cuerpo a otro.**

Cuando frotas un globo con tu cabello, no aparece carga nueva: el globo **le quita electrones** al cabello. Si el globo gana 1 000 millones de electrones, tu cabello pierde exactamente 1 000 millones. El globo queda negativo y el cabello positivo, en la misma cantidad. La suma total sigue siendo cero, como al principio.

## Objetos cargados y neutros
- **Neutro:** igual número de protones y electrones.
- **Cargado negativamente:** le sobran electrones.
- **Cargado positivamente:** le faltan electrones.

Un objeto cargado puede atraer incluso a objetos neutros (como los papelitos), porque reacomoda sus cargas: lo verás en la lección 1.6.

## Carga y corriente
La carga en movimiento es la corriente. Si por un cable pasan 2 culombios cada segundo, la corriente es de 2 amperios. Esta relación (I = Q/t) la estudiarás con detalle en la lección 2.2.`,
      form: [["q = n × e", "Carga (C) = número de electrones en exceso o en defecto × carga elemental (1,6 × 10⁻¹⁹ C)."], ["n = q ÷ e", "Número de electrones transferidos a partir de la carga."]],
      ej: { enun: "Un globo frotado adquiere una carga de −8 nC. ¿Cuántos electrones ganó?", pasos: ["Datos: q = −8 nC = −8 × 10⁻⁹ C; e = 1,6 × 10⁻¹⁹ C.", "Fórmula: n = |q| ÷ e.", "Sustitución: n = 8 × 10⁻⁹ ÷ 1,6 × 10⁻¹⁹ = 5 × 10¹⁰.", "Como la carga es negativa, son electrones ganados."], res: "El globo ganó 5 × 10¹⁰ electrones (50 000 millones), que perdió el cabello." },
      sim: "S1", calc: "C14",
      vida: "Al quitarte un suéter de lana en un día seco oyes chasquidos: el suéter y tu camiseta intercambiaron electrones y, al separarse, las cargas saltan como pequeñas chispas.",
      err: ["Decir que al frotar «se crea» carga: solo se transfiere.", "Pensar que un objeto positivo «tiene protones de más» porque los ganó: lo que pasa es que perdió electrones.", "Olvidar que un culombio es muchísima carga; la estática cotidiana es de nanoculombios."],
      ejer: [["¿Qué carga tiene un objeto que perdió 3 × 10¹² electrones?", "q = +3 × 10¹² × 1,6 × 10⁻¹⁹ = +4,8 × 10⁻⁷ C = +0,48 µC."], ["Dos esferas: una +5 µC y otra −5 µC. ¿Se atraen o se repelen?", "Se atraen, porque tienen cargas de signo distinto."], ["Si un globo queda con −2 nC, ¿qué carga tiene el pelo con el que se frotó (si no hubo más intercambios)?", "+2 nC, por conservación de la carga."]],
      quiz: [
        { t: "om", p: "Dos cargas negativas…", o: ["Se atraen", "Se repelen", "No interactúan", "Se anulan"], c: 1, e: "Cargas iguales se repelen." },
        { t: "om", p: "¿Cuál es la unidad de carga eléctrica?", o: ["Voltio", "Amperio", "Culombio", "Ohmio"], c: 2, e: "La carga se mide en culombios (C)." },
        { t: "vf", p: "Al frotar un globo con el cabello, la carga total del sistema globo + cabello sigue siendo cero.", c: true, e: "La carga se conserva: lo que gana uno lo pierde el otro." },
        { t: "num", p: "¿Cuántos electrones hay en una carga de 1,6 × 10⁻¹⁸ C? (escribe el número)", r: 10, u: "", e: "n = 1,6 × 10⁻¹⁸ ÷ 1,6 × 10⁻¹⁹ = 10 electrones." },
        { t: "om", p: "Un objeto con carga positiva…", o: ["Ganó protones", "Perdió electrones", "Ganó electrones", "Perdió neutrones"], c: 1, e: "Le faltan electrones; los protones no se transfieren." }
      ],
      res: ["Hay dos tipos de carga: positiva y negativa.", "Cargas iguales se repelen y distintas se atraen.", "La carga se mide en culombios; la carga elemental es 1,6 × 10⁻¹⁹ C.", "Toda carga es un múltiplo entero de e: q = n × e.", "La carga se conserva: no se crea ni se destruye, solo se transfiere."]
    },
    {
      id: "1-4", t: "Ley de Coulomb", d: "F = k·q₁·q₂/r²: atracción, repulsión y cómo cambia la fuerza con la distancia.", min: 40,
      preg: "Si alejas un globo cargado al doble de distancia de unos papelitos, ¿la atracción se reduce a la mitad… o a menos?",
      obj: ["Enunciar la ley de Coulomb y el significado de cada término.", "Calcular la fuerza entre dos cargas puntuales.", "Explicar la relación de la inversa del cuadrado."],
      txt: `En 1785 [Charles-Augustin de Coulomb](#/personajes/coulomb) midió con una balanza de torsión cómo de fuerte se atraen o se repelen dos esferas cargadas. Encontró una regla sencilla y precisa, la [[ley de Coulomb]]:

= F = k · |q₁ · q₂| / r²

- **F** es la fuerza entre las cargas, en newtons (N).
- **q₁** y **q₂** son las cargas, en culombios (C).
- **r** es la distancia entre ellas, en metros (m).
- **k** es la constante de Coulomb: k ≈ 8,99 × 10⁹ N·m²/C² (en los cálculos rápidos se usa 9 × 10⁹).

La fuerza actúa a lo largo de la línea que une las cargas. Si los signos son iguales, la fuerza es de **repulsión**; si son distintos, de **atracción**. Por eso en la fórmula usamos el valor absoluto y luego decidimos el sentido con la regla de los signos.

## Qué nos dice la fórmula
1. **Más carga, más fuerza.** Si duplicas una de las cargas, la fuerza se duplica. Si duplicas las dos, se cuadruplica.
2. **Más distancia, mucha menos fuerza.** La distancia está **al cuadrado** en el denominador. A doble distancia, la fuerza es **la cuarta parte**; a triple distancia, **la novena parte**. Es la relación de la [[inversa del cuadrado]], la misma que sigue la gravedad.
3. **La constante es enorme.** k vale casi nueve mil millones. Eso significa que la fuerza eléctrica es muy intensa: dos cargas de un culombio a un metro se empujarían con 9 × 10⁹ N, el peso de casi un millón de toneladas. Por eso en la vida diaria nunca vemos objetos con cargas de culombios: las cargas se neutralizan antes.

## La fuerza eléctrica frente a la gravedad
Entre un protón y un electrón, la atracción eléctrica es unas 10³⁹ veces más fuerte que la gravitatoria. Si notamos la gravedad y no la electricidad es porque casi toda la materia es neutra: las fuerzas eléctricas de atracción y repulsión se cancelan.

## Cómo resolver un problema de Coulomb
1. Pasa las cargas a culombios (µC → × 10⁻⁶; nC → × 10⁻⁹) y la distancia a metros.
2. Multiplica las cargas (en valor absoluto).
3. Eleva la distancia al cuadrado.
4. Aplica F = k · q₁q₂ / r².
5. Decide si es atracción o repulsión según los signos.

?> Error típico: olvidar elevar la distancia al cuadrado o dejarla en centímetros. 10 cm son 0,1 m, y 0,1² = 0,01.

## Prueba en la simulación
En la simulación de abajo puedes cambiar las cargas y arrastrar la segunda para cambiar la distancia. Comprueba que, al pasar de 0,2 m a 0,4 m, la fuerza baja a la cuarta parte.`,
      form: [["F = k · |q₁ · q₂| / r²", "Fuerza (N) entre dos cargas puntuales; k = 8,99 × 10⁹ N·m²/C²; r en metros."], ["F₂ / F₁ = (r₁ / r₂)²", "Relación de la inversa del cuadrado: a doble distancia, ¼ de la fuerza."]],
      ej: { enun: "Dos cargas de +1 µC están separadas 10 cm. ¿Qué fuerza se ejercen? ¿Y a 20 cm?", pasos: ["Datos: q₁ = q₂ = 1 × 10⁻⁶ C; r = 0,10 m; k = 8,99 × 10⁹ N·m²/C².", "Producto de cargas: 1 × 10⁻⁶ × 1 × 10⁻⁶ = 1 × 10⁻¹² C².", "r² = 0,10² = 0,01 m².", "F = 8,99 × 10⁹ × 1 × 10⁻¹² / 0,01 = 0,899 N, de repulsión (mismo signo).", "A 20 cm: r² = 0,04 → F = 0,899 / 4 ≈ 0,225 N."], res: "0,9 N de repulsión a 10 cm y unos 0,22 N a 20 cm: a doble distancia, la cuarta parte." },
      sim: "S2",
      vida: "Las impresoras láser y las fotocopiadoras usan la atracción de Coulomb: un tambor con zonas cargadas atrae el polvo de tóner solo donde tiene que haber tinta. Los filtros electrostáticos de las chimeneas industriales atrapan el humo con el mismo principio.",
      err: ["No pasar los centímetros a metros.", "Olvidar el cuadrado de la distancia.", "Confundir el signo: la fórmula da la magnitud; el sentido (atracción o repulsión) se decide con los signos."],
      ejer: [["Dos cargas de 2 µC y −3 µC están a 0,3 m. ¿Qué fuerza se ejercen?", "F = 9 × 10⁹ × 2 × 10⁻⁶ × 3 × 10⁻⁶ / 0,09 = 0,6 N, de atracción."], ["Si la distancia entre dos cargas se triplica, ¿qué pasa con la fuerza?", "Se divide entre 9 (3²)."], ["Si una de las cargas se duplica y la distancia también se duplica, ¿qué pasa con la fuerza?", "×2 por la carga y ÷4 por la distancia: queda la mitad."]],
      quiz: [
        { t: "om", p: "En la ley de Coulomb, la fuerza es inversamente proporcional a…", o: ["La distancia", "El cuadrado de la distancia", "La carga", "El cuadrado de la carga"], c: 1, e: "F depende de 1/r²: inversa del cuadrado." },
        { t: "om", p: "Si la distancia entre dos cargas se duplica, la fuerza…", o: ["Se duplica", "Se reduce a la mitad", "Se reduce a la cuarta parte", "No cambia"], c: 2, e: "(1/2)² = 1/4." },
        { t: "vf", p: "Una carga positiva y una negativa se repelen.", c: false, e: "Cargas de signo distinto se atraen." },
        { t: "num", p: "¿Qué fuerza hay entre dos cargas de 1 µC separadas 0,3 m? Usa k = 9 × 10⁹.", r: 0.1, u: "N", e: "F = 9 × 10⁹ × 10⁻¹² / 0,09 = 0,1 N." },
        { t: "om", p: "Si las dos cargas se duplican y la distancia no cambia, la fuerza…", o: ["Se duplica", "Se cuadruplica", "No cambia", "Se reduce a la mitad"], c: 1, e: "2 × 2 = 4 veces." }
      ],
      res: ["La ley de Coulomb: F = k·|q₁·q₂|/r², con k ≈ 9 × 10⁹ N·m²/C².", "La fuerza crece con las cargas y disminuye con el cuadrado de la distancia.", "A doble distancia, la cuarta parte de la fuerza.", "Signos iguales: repulsión; signos distintos: atracción.", "La fuerza eléctrica es muchísimo más intensa que la gravedad."]
    },
    {
      id: "1-5", t: "Conductores, aislantes y semiconductores", d: "Por qué el cobre conduce y el plástico no; tabla de materiales; el agua y el cuerpo humano.", min: 35, e: true, exp: "e-conductores",
      preg: "¿Por qué los cables son de cobre por dentro y de plástico por fuera?",
      obj: ["Clasificar materiales en conductores, aislantes y semiconductores.", "Explicar la diferencia a partir de los electrones libres.", "Reconocer que el agua común y el cuerpo humano conducen."],
      txt: `No todos los materiales dejan pasar la corriente igual de bien. La diferencia está en cuántos **electrones libres** tienen (lección 1.2).

## Conductores
Un [[conductor]] tiene muchísimos electrones libres, así que una pequeña fuerza eléctrica basta para ponerlos en marcha. Los mejores son los **metales**:

| Material | Uso típico |
|---|---|
| Plata | el mejor conductor; contactos de precisión |
| Cobre | cables de casas, bobinas, circuitos impresos |
| Oro | contactos que no deben oxidarse (conectores) |
| Aluminio | líneas de alta tensión (es ligero) |
| Hierro, acero | estructuras; conduce peor |
| Grafito (carbón) | minas de lápiz, escobillas de motores |

El cobre es el favorito para cables: conduce casi tan bien como la plata, cuesta mucho menos, es flexible y se puede estirar en hilos.

## Aislantes
Un [[aislante]] tiene sus electrones fuertemente ligados a los átomos; casi no hay electrones libres. Por eso la corriente prácticamente no pasa. Ejemplos: **plástico (PVC), caucho, vidrio, cerámica, madera seca, papel seco, aire seco, aceite**.

Los aislantes son tan importantes como los conductores: el plástico de los cables, la cerámica de los aisladores de los postes y el caucho de los guantes de los electricistas impiden que la corriente vaya adonde no debe.

!> Ningún aislante es perfecto. Si el voltaje es suficientemente alto, cualquier aislante «se rompe» y conduce: el aire conduce en un rayo, y la madera húmeda conduce bastante bien.

## Semiconductores
Entre ambos extremos están los [[semiconductor|semiconductores]], como el **silicio** y el **germanio**. Puros conducen poco, pero su conductividad se puede controlar añadiendo impurezas o aplicando luz, calor o voltaje. Con ellos se fabrican diodos, LED, transistores, paneles solares y chips (módulo 14).

## El agua y el cuerpo humano
El agua **pura** (destilada) conduce muy mal. Pero el agua que nos rodea —de la llave, de la lluvia, de mar, el sudor— lleva **sales disueltas**, y esas sales forman iones que sí conducen. Por eso:
- El agua de la llave **conduce lo suficiente** para ser peligrosa con la red eléctrica.
- El cuerpo humano, que es agua con sales, **es conductor**. La piel seca ofrece bastante resistencia, pero mojada o sudada, mucho menos.

Esa es la razón de las reglas de seguridad: nada de aparatos eléctricos cerca de la bañera o con las manos mojadas (módulo 13).

## Conductores frente a aislantes en un mismo objeto
Mira cualquier aparato: el **interior** que lleva la corriente es de metal y **todo lo que tocas** es aislante. El cable de un cargador tiene hilos de cobre dentro de una funda de plástico; el contacto de la pared tiene láminas metálicas dentro de una caja aislante; las pinzas de un electricista tienen mangos de plástico grueso.

## Comprueba con un experimento
Con una pila de 9 V, un LED, una resistencia y dos cables puedes construir un **probador de conductividad**: si el material conduce, el LED enciende. Encontrarás la ficha completa en la sección de práctica de esta lección.`,
      vida: "Fíjate en una extensión eléctrica: por dentro, cobre; por fuera, plástico. Las herramientas para electricista tienen mangos aislados marcados con «1000 V». Y los pájaros se posan en los cables sin peligro porque no tocan otro conductor a distinto voltaje (lo verás en la lección 13.2).",
      err: ["Creer que el agua siempre es aislante porque «la pura no conduce»: el agua real tiene sales y conduce.", "Pensar que la madera nunca conduce: seca conduce muy poco, pero húmeda conduce bastante.", "Confundir semiconductor con «medio conductor de mala calidad»: su gracia es que su conducción se puede controlar."],
      ejer: [["Clasifica: llave de metal, goma de borrar, mina de lápiz, vidrio, papel de aluminio, agua salada.", "Conductores: llave, mina de lápiz (grafito), papel de aluminio, agua salada. Aislantes: goma de borrar, vidrio."], ["¿Por qué las líneas de alta tensión usan aluminio y no cobre?", "Porque el aluminio es mucho más ligero y barato; conduce algo peor, pero se compensa usando cables más gruesos."], ["¿Por qué es peligroso usar una secadora de cabello en la bañera?", "Porque el agua con sales y el cuerpo mojado conducen: una falla podría hacer pasar corriente por la persona."]],
      quiz: [
        { t: "om", p: "¿Qué tienen los conductores que no tienen los aislantes?", o: ["Más protones", "Muchos electrones libres", "Más neutrones", "Carga positiva"], c: 1, e: "Los electrones libres son los que pueden moverse y formar la corriente." },
        { t: "om", p: "¿Cuál de estos materiales es un aislante?", o: ["Cobre", "Grafito", "Vidrio", "Agua de mar"], c: 2, e: "El vidrio es aislante; los otros conducen." },
        { t: "vf", p: "El agua de la llave conduce la electricidad lo suficiente para ser peligrosa.", c: true, e: "Lleva sales disueltas que forman iones." },
        { t: "om", p: "¿Para qué se usa principalmente el silicio en electrónica?", o: ["Para aislar cables", "Para fabricar semiconductores como diodos y chips", "Para hacer imanes", "Para conducir en las líneas"], c: 1, e: "Es el semiconductor más usado." },
        { t: "om", p: "¿Por qué el cobre es el metal más usado en cables?", o: ["Es el único conductor", "Conduce muy bien, es flexible y no es tan caro", "Es magnético", "Es aislante"], c: 1, e: "La plata conduce un poco mejor, pero es mucho más cara." }
      ],
      res: ["Los conductores tienen muchos electrones libres; los aislantes, casi ninguno.", "Los metales (plata, cobre, oro, aluminio) son buenos conductores.", "Plástico, vidrio, caucho, cerámica y madera seca son aislantes.", "Los semiconductores, como el silicio, tienen una conducción controlable.", "El agua común y el cuerpo humano conducen por las sales disueltas."]
    },
    {
      id: "1-6", t: "Electricidad estática", d: "Carga por frotamiento, contacto e inducción; polarización; serie triboeléctrica.", min: 40, e: true, sim: "S1", exp: ["e-globo", "e-pendulo", "e-electroscopio"],
      preg: "¿Cómo puede un globo cargado atraer papelitos que no tienen carga?",
      obj: ["Describir las tres formas de cargar un objeto.", "Explicar la polarización de objetos neutros.", "Usar la serie triboeléctrica para predecir el signo de la carga."],
      txt: `La [[electricidad estática]] es carga que se acumula en un objeto y se queda ahí, «quieta», hasta que encuentra un camino para escapar. Es la electricidad más antigua que se conoce: la del ámbar de Tales.

## Tres formas de cargar un objeto
### 1. Por frotamiento
Al frotar dos materiales distintos, uno le arranca electrones al otro. El que gana electrones queda **negativo** y el que los pierde queda **positivo**, en la misma cantidad. Así se cargan el globo y el cabello, el peine y el pelo, o tus zapatos con la alfombra.

¿Cuál gana electrones? Depende de los materiales. La **serie triboeléctrica** los ordena: los de arriba tienden a quedar positivos y los de abajo negativos.

| Tiende a quedar **positivo** | |
|---|---|
| Piel humana seca, pelo | |
| Vidrio | |
| Lana, nailon | |
| Seda, algodón | (casi neutros) |
| Ámbar, caucho, globo de látex | |
| Poliéster, PVC, teflón | |
| Tiende a quedar **negativo** | |

Por eso el globo (látex) frotado con pelo queda negativo y el pelo queda positivo.

### 2. Por contacto
Si tocas un objeto neutro con otro cargado, parte de la carga pasa al neutro. Los dos quedan con carga **del mismo signo** y, por tanto, se repelen. Es lo que ves en el péndulo electrostático: la bolita es atraída, toca el globo, se carga igual que él… y sale rechazada.

### 3. Por inducción
Un objeto cargado puede cargar otro **sin tocarlo**. Si acercas el globo negativo a una lata metálica, los electrones libres de la lata se alejan hacia el lado opuesto. Si en ese momento tocas ese lado con el dedo, los electrones se van a tierra a través de ti; retiras el dedo y luego el globo: la lata queda **positiva**.

## Polarización: por qué se atraen los objetos neutros
Los papelitos no tienen carga, entonces ¿por qué los atrae el globo? Porque el globo negativo empuja ligeramente los electrones de cada molécula del papel hacia el lado lejano. Cada molécula queda con su lado positivo un poquito más cerca del globo: es la [[polarización]]. Como la fuerza de Coulomb disminuye con la distancia, la atracción del lado cercano (+) gana a la repulsión del lado lejano (−). Resultado: **atracción neta**.

Lo mismo pasa con un hilo de agua de la llave: se curva hacia el globo porque sus moléculas se orientan.

## Por qué la estática es peor en días secos
El aire húmedo tiene una delgada capa de agua sobre todo; esa humedad deja escapar poco a poco la carga. En días secos, en invierno o con calefacción, la carga se acumula más y oyes más chasquidos.

## Usos y riesgos
- **Usos:** impresoras láser, fotocopiadoras, pintura electrostática de autos, filtros de humo.
- **Riesgos:** una descarga estática (de miles de voltios, aunque de muy poca energía) puede dañar chips electrónicos; por eso los técnicos usan pulseras antiestáticas. En gasolineras, una chispa estática puede encender vapores: no se debe volver al auto a mitad de la carga sin tocar antes una parte metálica.`,
      vida: "Cuando te bajas del auto y al cerrar la puerta recibes un toque, es estática: al deslizarte por el asiento te cargaste. Truco: sujeta la parte metálica de la puerta mientras sales para descargarte poco a poco.",
      err: ["Creer que la atracción de los papelitos prueba que tienen carga: están neutros, pero polarizados.", "Pensar que la estática es «otra clase» de electricidad: son las mismas cargas; solo que están quietas.", "Confundir alto voltaje con peligro: la estática tiene miles de voltios pero muy poca energía; la red tiene menos voltaje pero puede dar corriente de forma continua."],
      ejer: [["Frotas una regla de plástico (PVC) con un paño de lana. ¿Qué carga queda en cada uno?", "Según la serie triboeléctrica, el PVC queda negativo y la lana positiva."], ["¿Por qué la bolita del péndulo se aleja después de tocar el globo?", "Al tocarlo se carga por contacto con el mismo signo que el globo; cargas iguales se repelen."], ["Explica por qué un globo frotado se pega a la pared.", "La pared se polariza: sus cargas positivas quedan más cerca del globo negativo y la atracción supera a la repulsión."]],
      quiz: [
        { t: "om", p: "¿Qué ocurre al frotar dos materiales distintos?", o: ["Se crean cargas nuevas", "Se transfieren electrones de uno a otro", "Se transfieren protones", "Nada"], c: 1, e: "Uno gana electrones (negativo) y el otro los pierde (positivo)." },
        { t: "om", p: "Un globo negativo atrae papelitos neutros porque…", o: ["Los papelitos tienen carga positiva", "Los papelitos se polarizan", "El globo es un imán", "Los papelitos son conductores"], c: 1, e: "Sus moléculas se orientan y la atracción del lado cercano gana." },
        { t: "vf", p: "Al cargar un objeto por contacto, queda con carga del mismo signo que el objeto que lo tocó.", c: true, e: "Recibe parte de la misma carga." },
        { t: "om", p: "¿Por qué hay más chasquidos estáticos en días secos?", o: ["Porque hay más electrones en el aire", "Porque la humedad del aire deja escapar la carga y en días secos no la hay", "Porque hace más frío", "Porque hay más tormentas"], c: 1, e: "La humedad descarga lentamente los objetos." },
        { t: "ord", p: "Ordena los pasos para cargar una lata por inducción con un globo negativo:", o: ["Acercar el globo a la lata sin tocarla", "Tocar el lado lejano de la lata con el dedo", "Retirar el dedo", "Retirar el globo: la lata queda positiva"], e: "Primero se separan las cargas, luego se da salida a los electrones, se corta esa salida y al final se aleja el globo." }
      ],
      res: ["La electricidad estática es carga acumulada que no circula.", "Se carga un objeto por frotamiento, por contacto o por inducción.", "La serie triboeléctrica predice qué material queda positivo y cuál negativo.", "Los objetos neutros se atraen porque se polarizan.", "La humedad descarga los objetos; la estática es mayor en días secos."]
    },
    {
      id: "1-7", t: "Chispas, descargas y rayos", d: "Descargas en la vida diaria, cómo se forma un rayo, pararrayos y descargas en electrónica.", min: 30,
      preg: "Un rayo y la chispa de tu dedo en una perilla, ¿son lo mismo?",
      obj: ["Explicar qué es una descarga eléctrica y cuándo ocurre.", "Describir cómo se forma un rayo.", "Explicar cómo funciona un pararrayos y cómo protegerse de los rayos."],
      txt: `Una carga acumulada busca neutralizarse. Si encuentra un camino, los electrones saltan de donde sobran a donde faltan: eso es una **descarga**.

## ¿Cuándo salta una chispa?
El aire es aislante, pero no infinitamente. Cuando la diferencia de carga (el voltaje) es suficientemente grande, el aire **se ioniza**: sus moléculas pierden electrones, se vuelve conductor y aparece un canal brillante y caliente. En aire seco hacen falta unos **30 000 voltios por centímetro** para que salte una chispa. Si la chispa de tu dedo a la perilla mide medio centímetro, ¡tu cuerpo estaba a unos 15 000 V respecto de la perilla! No te hace daño porque la **carga** acumulada es diminuta y la descarga dura menos de una millonésima de segundo.

## El rayo: una chispa gigante
Dentro de las nubes de tormenta (cumulonimbos), corrientes de aire violentas hacen chocar cristales de hielo y granizo. En esos choques se separan cargas: la parte alta de la nube queda **positiva** y la parte baja **negativa**. La base negativa induce carga positiva en el suelo de abajo.

1. Cuando la diferencia de voltaje alcanza cientos de millones de voltios, un **líder escalonado** de aire ionizado baja desde la nube a saltos de decenas de metros.
2. Desde objetos altos del suelo (árboles, torres, personas) suben **serpentinas** de carga positiva.
3. Cuando se encuentran, se cierra el canal y se produce la **descarga de retorno**: decenas de miles de amperios en una fracción de segundo. Es lo que vemos como el rayo.

| Magnitud | Valor típico de un rayo |
|---|---|
| Corriente | 30 000 A (hasta 200 000 A) |
| Temperatura del canal | unos 30 000 °C (cinco veces la superficie del Sol) |
| Duración | menos de un segundo, con varios destellos |
| Longitud | de 1 a más de 10 km |

El aire se calienta tan rápido que se expande de golpe: esa onda de choque es el **trueno**. Como la luz llega casi al instante y el sonido viaja a unos 340 m/s, puedes calcular la distancia: **cuenta los segundos entre el relámpago y el trueno y divide entre 3: el resultado es la distancia en kilómetros**.

## El pararrayos
[Benjamin Franklin](#/personajes/franklin) propuso en 1752 una varilla metálica en lo alto de los edificios, unida a tierra por un cable grueso. No «atrae» rayos de lejos: ofrece al rayo que va a caer en esa zona un **camino de baja resistencia** hasta el suelo, para que la corriente no atraviese el edificio. El [[pararrayos]] protege el edificio, no a las personas que estén afuera.

## Cómo protegerse de los rayos
!> Si oyes truenos, estás al alcance de un rayo. Entra a un edificio o a un auto con techo metálico. Aléjate de árboles aislados, postes, cercas metálicas, el agua y las zonas altas. No uses aparatos conectados a la red ni te bañes durante la tormenta.

Regla **30/30**: si entre el relámpago y el trueno hay menos de 30 segundos, refúgiate; espera 30 minutos después del último trueno antes de salir.

## Descargas y electrónica
Las descargas electrostáticas (ESD) pequeñas, que ni sientes, pueden dañar chips. Por eso las memorias y las tarjetas se venden en bolsas antiestáticas, y los técnicos se conectan a tierra con una pulsera.`,
      form: [["Distancia (km) ≈ segundos entre relámpago y trueno ÷ 3", "El sonido recorre aproximadamente 1 km cada 3 segundos."], ["Rigidez del aire seco ≈ 30 000 V/cm", "Voltaje necesario para que salte una chispa por cada centímetro de aire."]],
      ej: { enun: "Ves un relámpago y oyes el trueno 9 segundos después. ¿A qué distancia cayó el rayo? ¿Debes refugiarte?", pasos: ["Distancia ≈ segundos ÷ 3 = 9 ÷ 3 = 3 km.", "Comprobación: 340 m/s × 9 s = 3 060 m ≈ 3 km.", "Regla 30/30: 9 s < 30 s, así que estás dentro de la zona de peligro."], res: "Cayó a unos 3 km. Sí: debes refugiarte de inmediato." },
      sim: "S1",
      vida: "Los aviones reciben, en promedio, un rayo al año. No pasa nada porque el fuselaje metálico conduce la corriente por fuera (jaula de Faraday). Lo mismo te protege dentro de un auto con techo metálico, no los neumáticos.",
      err: ["Creer que los neumáticos del auto protegen de un rayo: protege la carrocería metálica.", "Pensar que el pararrayos atrae rayos de kilómetros a la redonda.", "Creer que un rayo nunca cae dos veces en el mismo lugar: los edificios altos reciben muchos rayos al año."],
      ejer: [["Entre relámpago y trueno pasan 15 segundos. ¿A qué distancia cayó el rayo?", "15 ÷ 3 = 5 km."], ["Una chispa de 2 cm salta en aire seco. ¿Qué voltaje aproximado había?", "2 × 30 000 = 60 000 V."], ["¿Por qué no te hace daño una chispa de 15 000 V al tocar una perilla?", "Porque la carga y la energía son diminutas y la descarga dura muy poco; lo peligroso es una corriente sostenida."]],
      quiz: [
        { t: "om", p: "¿Qué es el trueno?", o: ["El ruido de las nubes al chocar", "La onda de choque del aire calentado bruscamente por el rayo", "El sonido de la lluvia", "La electricidad al llegar al suelo"], c: 1, e: "El aire calentado a miles de grados se expande de golpe." },
        { t: "num", p: "Entre el relámpago y el trueno pasan 12 segundos. ¿A cuántos kilómetros cayó el rayo?", r: 4, u: "", e: "12 ÷ 3 = 4 km." },
        { t: "vf", p: "Dentro de un auto con techo metálico estás más protegido de un rayo que bajo un árbol.", c: true, e: "La carrocería conduce la corriente por fuera; el árbol aislado atrae los rayos y es peligroso." },
        { t: "om", p: "¿Para qué sirve un pararrayos?", o: ["Para atraer todos los rayos de la ciudad", "Para dar al rayo un camino seguro a tierra y proteger el edificio", "Para producir electricidad", "Para evitar que llueva"], c: 1, e: "Conduce la corriente del rayo a tierra sin que atraviese la estructura." },
        { t: "om", p: "Según la regla 30/30, ¿cuánto hay que esperar tras el último trueno para salir?", o: ["30 segundos", "3 minutos", "30 minutos", "3 horas"], c: 2, e: "30 minutos después del último trueno." }
      ],
      res: ["Una descarga ocurre cuando el voltaje es tan alto que el aire se vuelve conductor.", "En aire seco hacen falta unos 30 000 V por centímetro para una chispa.", "El rayo es una descarga gigante entre la nube y el suelo; el trueno es su onda de choque.", "El pararrayos ofrece un camino seguro a tierra.", "Durante una tormenta: refugio en un edificio o en un auto; regla 30/30."]
    },
    {
      id: "1-8", t: "Campo y potencial eléctrico: la idea", d: "El campo como «zona de influencia» y el potencial como «altura eléctrica».", min: 35,
      preg: "¿Cómo «sabe» una carga que hay otra carga cerca, si no se tocan?",
      obj: ["Explicar qué es el campo eléctrico y cómo se representa.", "Explicar el potencial eléctrico con la analogía de la altura.", "Relacionar la diferencia de potencial con el voltaje."],
      txt: `Hasta ahora hemos hablado de fuerzas entre cargas. Pero las cargas no se tocan: ¿cómo se «empujan» a distancia? Los físicos responden con la idea de **campo**, propuesta por [Michael Faraday](#/personajes/faraday).

## El campo eléctrico
Toda carga crea a su alrededor un [[campo eléctrico]]: una «zona de influencia» donde cualquier otra carga siente una fuerza. Es como el campo de gravedad de la Tierra: no lo ves, pero cualquier objeto que dejes caer lo nota.

El campo se representa con **líneas de campo**:
- Salen de las cargas **positivas** y entran en las **negativas**.
- Donde las líneas están más juntas, el campo es más **intenso**.
- Una carga positiva colocada en el campo se mueve a lo largo de las líneas; una negativa, en sentido contrario.

La intensidad del campo es la fuerza que sentiría una carga de 1 C colocada en ese punto:

= E = F / q

Se mide en newtons por culombio (N/C), que equivale a **voltios por metro (V/m)**.

## La analogía de la altura
Para entender el **potencial** usaremos una analogía con la gravedad.

Una pelota en lo alto de una colina tiene **energía potencial**: si la sueltas, rueda hacia abajo y gana velocidad. Cuanto más alta está, más energía puede liberar. Lo que importa no es la altura absoluta, sino la **diferencia de altura** entre dos puntos.

En electricidad pasa lo mismo:
- Una carga positiva en un punto de **alto potencial** es como una pelota en lo alto: tiende a «caer» hacia el bajo potencial y, al hacerlo, libera energía.
- El **potencial eléctrico** es la energía que tendría cada culombio de carga en ese punto. Se mide en **voltios** (1 V = 1 julio por culombio).
- La **diferencia de potencial** entre dos puntos es el [[voltaje]].

= V = energía / carga  (1 V = 1 J/C)

## Del campo al circuito
Una pila crea una diferencia de potencial entre sus terminales: el **+** es la «parte alta» y el **−** la «parte baja». Cuando unes los terminales con un cable, se establece un campo eléctrico **dentro del cable** que empuja a los electrones libres. Ese campo viaja por el cable a casi la velocidad de la luz; por eso el foco enciende al instante aunque los electrones avancen lentísimo (lección 2.2).

## Ejemplos de diferencias de potencial
| Situación | Voltaje aproximado |
|---|---|
| Membrana de una neurona | 0,07 V |
| Pila AA | 1,5 V |
| Batería de auto | 12 V |
| Contacto de una casa | {{V}} (eficaz) |
| Tu cuerpo tras caminar en una alfombra | 10 000 V o más |
| Nube de tormenta y suelo | cientos de millones de voltios |

## Por qué importa
Con la idea de potencial ya tienes el concepto central del módulo 2: el **voltaje** es la «diferencia de altura eléctrica» que empuja la corriente por un circuito. Sin diferencia de potencial no hay corriente, del mismo modo que el agua no fluye en un tubo horizontal sin diferencia de altura o presión.`,
      form: [["E = F / q", "Campo eléctrico (N/C o V/m): fuerza por unidad de carga."], ["V = W / q", "Diferencia de potencial (V): energía (J) por unidad de carga (C). 1 V = 1 J/C."], ["W = q × V", "Energía que gana o pierde una carga al pasar por una diferencia de potencial."]],
      ej: { enun: "Una pila de 9 V mueve 2 C de carga por un circuito. ¿Cuánta energía entrega?", pasos: ["Datos: V = 9 V; q = 2 C.", "Fórmula: W = q × V.", "W = 2 C × 9 V = 18 J."], res: "La pila entrega 18 julios de energía a esas cargas, que se convierten en luz y calor en el circuito." },
      vida: "Las líneas de alta tensión tienen un campo eléctrico intenso a su alrededor; por eso se mantienen las distancias de seguridad. A pequeña escala, la pantalla táctil de tu celular detecta tu dedo porque este altera el campo eléctrico de la pantalla.",
      err: ["Pensar que el voltaje «fluye»: lo que fluye es la corriente; el voltaje es una diferencia entre dos puntos.", "Decir «el voltaje de un punto» sin decir respecto de qué otro punto.", "Creer que las líneas de campo existen como hilos reales: son una forma de dibujar el campo."],
      ejer: [["¿Qué energía entrega una pila de 1,5 V al mover 10 C?", "W = 10 × 1,5 = 15 J."], ["Una carga de 0,002 C siente una fuerza de 4 N. ¿Cuánto vale el campo?", "E = 4 / 0,002 = 2 000 N/C (= 2 000 V/m)."], ["¿Hacia dónde apuntan las líneas de campo alrededor de una carga negativa?", "Hacia la carga (entran en ella)."]],
      quiz: [
        { t: "om", p: "Las líneas de campo eléctrico…", o: ["Salen de las cargas negativas", "Salen de las positivas y entran en las negativas", "Forman círculos cerrados", "Solo existen dentro de los imanes"], c: 1, e: "Por convención, salen de + y llegan a −." },
        { t: "om", p: "Un voltio equivale a…", o: ["Un amperio por segundo", "Un julio por culombio", "Un culombio por segundo", "Un newton por metro"], c: 1, e: "1 V = 1 J/C." },
        { t: "vf", p: "El voltaje es una diferencia entre dos puntos.", c: true, e: "Siempre se mide entre dos puntos: diferencia de potencial." },
        { t: "num", p: "¿Cuánta energía (en julios) entrega una batería de 12 V al mover 5 C de carga?", r: 60, u: "J", e: "W = q·V = 5 × 12 = 60 J." },
        { t: "om", p: "En la analogía de la gravedad, el potencial eléctrico se parece a…", o: ["La masa", "La altura", "La velocidad", "El tiempo"], c: 1, e: "Como la altura, lo que importa es la diferencia entre dos puntos." }
      ],
      res: ["Toda carga crea un campo eléctrico: una zona donde otras cargas sienten fuerza.", "Las líneas de campo salen de + y entran en −; más juntas = más intenso.", "El potencial es la energía por unidad de carga; se mide en voltios.", "El voltaje es la diferencia de potencial entre dos puntos: 1 V = 1 J/C.", "Una pila crea una diferencia de potencial que establece un campo en el cable y mueve los electrones."]
    }
  ]
});
