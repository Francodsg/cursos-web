// M8. Generadores, motores y transformadores
registrarModulo({
  id: "m8", n: 8, nivel: 2, titulo: "Generadores, motores y transformadores", quizMin: 25, quizN: 15, minEsperado: 330,
  objetivo: "Explicar cómo funcionan los generadores, los motores y los transformadores, hacer cálculos con transformadores y saber dónde se usa cada máquina.",
  clave: "generador alternador dinamo motor induccion escobillas conmutador transformador vueltas eficiencia",
  actividades: ["Clasificar 12 aparatos de tu casa según tengan motor, transformador o ambos.", "Usar un motorcito de juguete como generador (experimento de la lección 8.2).", "Con la [simulación del transformador](#/simulacion/S11), diseñar uno que pase de la red de tu país a 12 V."],
  ejemplos: ["Transformador de 127 V a 12 V con 1 000 vueltas en el primario: unas 94 vueltas en el secundario.", "Para 60 W a 12 V: 5 A en el secundario y unos 0,5 A en el primario.", "Eficiencia del 95 %: 5 W de pérdidas por cada 100 W."],
  sims: ["S10", "S11"], calcs: ["C8"], gen: ["trafo"],
  evaluacion: "Quiz de módulo de 15 preguntas (25 min) con cálculos de transformadores con valores aleatorios. Se aprueba con el 70 %.",
  extra: [
    { t: "om", p: "Un motor y un generador eléctrico son…", o: ["Máquinas totalmente distintas", "En esencia la misma máquina usada en sentidos opuestos", "Dos tipos de transformador", "Dos tipos de pila"], c: 1, e: "Un motor puede funcionar como generador y viceversa.", lec: "8-1" },
    { t: "num", p: "Un transformador tiene 2 000 vueltas en el primario y 100 en el secundario. Si entra 230 V, ¿cuánto sale?", r: 11.5, u: "V", e: "230 × 100 / 2 000 = 11,5 V.", lec: "8-6" }
  ],
  lecciones: [
    {
      id: "8-1", t: "El generador", d: "Una espira que gira en un campo produce una onda senoidal: de energía mecánica a eléctrica.", min: 40, e: true, sim: "S10",
      preg: "¿Cómo se convierte el agua que cae en una presa en la electricidad de tu casa?",
      obj: ["Explicar el principio del generador eléctrico.", "Relacionar la velocidad de giro con el voltaje y la frecuencia.", "Explicar por qué cuesta más girar un generador con carga."],
      txt: `Un [[generador]] es una máquina que convierte **energía mecánica (movimiento)** en **energía eléctrica**, usando la inducción electromagnética de [Faraday](#/personajes/faraday). Casi toda la electricidad del mundo sale de generadores: en centrales hidroeléctricas, térmicas, nucleares, eólicas y geotérmicas. La gran excepción son los paneles solares.

## El principio: una espira que gira
Imagina una espira de alambre que gira entre los polos norte y sur de un imán:
1. Cuando la espira está **perpendicular** al campo, la atraviesa el **máximo** flujo.
2. Al girar 90°, queda **paralela** al campo y no la atraviesa **ningún** flujo.
3. Al seguir girando, el flujo vuelve a aumentar, pero **en sentido contrario**.

Como el flujo cambia continuamente, se induce un voltaje que sube, baja y cambia de signo: una **onda senoidal**. Cada vuelta completa produce **un ciclo** de corriente alterna. Puedes verlo en la simulación S10 en modo «Generador».

## Velocidad, voltaje y frecuencia
- **Más velocidad** de giro → el flujo cambia más rápido → **más voltaje**.
- **Más velocidad** → más vueltas por segundo → **más frecuencia**.

En un generador de un par de polos, para producir 60 Hz hay que girar a 60 vueltas por segundo = **3 600 rpm**; para 50 Hz, **3 000 rpm**. Los generadores con más polos giran más despacio: las turbinas hidráulicas lentas tienen decenas de polos.

= f = (rpm / 60) × pares de polos

## Partes de un generador real
- **Rotor:** la parte que gira. En los grandes generadores es un **electroimán** alimentado con CD.
- **Estator:** la parte fija, con las **bobinas** donde se induce el voltaje (normalmente tres grupos para producir **trifásica**).
- **Turbina o motor primario:** lo que hace girar el rotor: agua, vapor, viento, un motor diésel.
- **Excitación y regulación:** controlan el campo del rotor para mantener el voltaje constante.

## Nada es gratis: la ley de Lenz
Si el generador no tiene nada conectado (circuito abierto), no circula corriente y gira con facilidad. Cuando se conectan aparatos, la corriente que circula por las bobinas crea un campo que **se opone al giro** (ley de Lenz, lección 7.7). Hay que empujar más fuerte para mantener la velocidad. Por eso:
- Una dinamo de bicicleta frena más cuando enciendes la luz.
- En una central, cuando aumenta el consumo de la ciudad, hay que abrir más el paso de agua o de vapor; si no, los generadores se frenan y la frecuencia baja (lección 10.7).

La energía eléctrica que obtienes **sale del trabajo mecánico** que haces para girar el generador.

## Tamaños
- Dinamo de bicicleta: 3 a 6 W.
- Generador portátil de gasolina: 1 a 10 kW.
- Aerogenerador: 2 a 15 MW.
- Generador de una gran central: 100 a 1 500 MW.`,
      form: [["f = (rpm / 60) × pares de polos", "Frecuencia de un generador síncrono."], ["V ∝ N · B · A · velocidad de giro", "El voltaje crece con las vueltas, el campo, el área y la velocidad."]],
      ej: { enun: "¿A cuántas rpm debe girar un generador de 2 pares de polos para producir 60 Hz? ¿Y para 50 Hz?", pasos: ["f = (rpm / 60) × pares de polos → rpm = 60 × f / pares.", "60 Hz: rpm = 60 × 60 / 2 = 1 800 rpm.", "50 Hz: rpm = 60 × 50 / 2 = 1 500 rpm."], res: "1 800 rpm para 60 Hz y 1 500 rpm para 50 Hz." },
      vida: "Las linternas de manivela y las de «agitar» tienen un pequeño generador: tu esfuerzo se convierte en electricidad. Las bicicletas con dinamo encienden su luz con el giro de la rueda.",
      err: ["Creer que el generador «crea» energía: la convierte desde el movimiento.", "Pensar que un generador gira igual de fácil con o sin aparatos conectados.", "Confundir la frecuencia con el voltaje: ambos aumentan con la velocidad, pero son cosas distintas."],
      ejer: [["¿Qué tipo de energía convierte un generador en electricidad?", "Energía mecánica (de movimiento)."], ["Un generador de un par de polos gira a 3 000 rpm. ¿Frecuencia?", "50 Hz."], ["¿Por qué una dinamo de bicicleta frena más con la luz encendida?", "Por la ley de Lenz: la corriente inducida crea un campo que se opone al giro."]],
      quiz: [
        { t: "om", p: "Un generador convierte…", o: ["Energía eléctrica en movimiento", "Energía mecánica en eléctrica", "Calor en luz", "Energía química en eléctrica"], c: 1, e: "Del movimiento a la electricidad, por inducción." },
        { t: "om", p: "Si un generador gira más rápido, produce…", o: ["Menos voltaje y menos frecuencia", "Más voltaje y más frecuencia", "Solo más voltaje", "Corriente directa"], c: 1, e: "El flujo cambia más rápido y hay más ciclos por segundo." },
        { t: "num", p: "¿A cuántas rpm debe girar un generador de un par de polos para dar 60 Hz?", r: 3600, u: "", e: "60 Hz × 60 s = 3 600 rpm." },
        { t: "vf", p: "Un generador es más difícil de girar cuando tiene aparatos conectados.", c: true, e: "La corriente inducida se opone al giro (ley de Lenz)." },
        { t: "om", p: "¿Cuál de estas fuentes NO usa un generador giratorio?", o: ["Central hidroeléctrica", "Aerogenerador", "Panel solar fotovoltaico", "Central nuclear"], c: 2, e: "El panel solar produce CD directamente a partir de la luz." }
      ],
      res: ["El generador convierte movimiento en electricidad por inducción.", "Una espira que gira en un campo produce una onda senoidal.", "Más velocidad da más voltaje y más frecuencia.", "La corriente inducida se opone al giro: la energía sale del trabajo mecánico.", "Casi toda la electricidad del mundo, salvo la solar, sale de generadores."]
    },
    {
      id: "8-2", t: "Alternador y dinamo", d: "Diferencias; generadores de las centrales, el alternador del auto y la dinamo de bicicleta.", min: 35, sim: "S10", exp: "e-motor-generador",
      preg: "Si los generadores producen corriente alterna, ¿cómo carga el auto su batería de corriente directa?",
      obj: ["Distinguir alternador y dinamo.", "Explicar la función del conmutador y de los anillos rozantes.", "Describir el alternador de un automóvil."],
      txt: `Hay dos grandes familias de generadores según el tipo de corriente que entregan.

## El alternador: corriente alterna
Un [[alternador]] entrega **corriente alterna**. La espira (o las bobinas del rotor) se conectan al exterior mediante **anillos rozantes**: dos anillos que giran con el eje, cada uno unido a un extremo de la bobina, sobre los que se apoyan **escobillas** fijas de carbón. Como cada escobilla toca siempre el mismo extremo de la bobina, la salida reproduce la onda senoidal tal cual: CA.

En los alternadores grandes es al revés: las bobinas donde se induce la corriente están **fijas en el estator** (así no hay que sacar grandes corrientes por escobillas) y lo que gira es el electroimán del rotor. Todos los generadores de las centrales son alternadores trifásicos.

## La dinamo: corriente directa
Una [[dinamo]] entrega **corriente directa**. En lugar de anillos tiene un **conmutador**: un anillo partido en dos mitades aisladas. Cada media vuelta, justo cuando el voltaje de la espira cambia de signo, las escobillas **cambian de mitad**. Resultado: la salida siempre tiene el mismo signo (una CD pulsante, que se alisa con muchas bobinas y segmentos).

Las dinamos se usaron mucho en el siglo XIX y en los autos hasta los años sesenta. Hoy son poco comunes: es más eficiente generar CA y rectificarla con diodos.

## El alternador del auto
El motor del auto mueve, mediante una correa, un **alternador trifásico**. Su salida pasa por un **puente de diodos** (rectificador) que la convierte en CD, y un **regulador** la mantiene en unos 14 V para cargar la batería de 12 V y alimentar las luces, el radio y la electrónica mientras el motor funciona. Si el alternador falla, el auto funciona solo con la batería… hasta que se descarga.

## La dinamo de bicicleta
Las clásicas dinamos de botella que rozan la rueda son, en realidad, pequeños **alternadores** con un imán permanente que gira dentro de una bobina: producen CA de unos 6 V y 3 W, suficiente para un foco. Hoy son comunes las **dinamos de buje**, dentro del eje de la rueda.

## Motor y generador: la misma máquina
Un motor de CD de juguete, si lo haces girar con la mano, **funciona como generador**: entre sus terminales aparece un voltaje. En el experimento de esta lección encenderás un LED (o medirás el voltaje) girando un motorcito. Los autos eléctricos e híbridos aprovechan esto en el **frenado regenerativo**: al frenar, el motor funciona como generador y recarga la batería.

| Máquina | Salida | Conexión al rotor | Uso actual |
|---|---|---|---|
| Alternador | CA | Anillos rozantes (o bobinas fijas) | Centrales, autos, aerogeneradores |
| Dinamo | CD | Conmutador | Poco común; algunos equipos antiguos |`,
      vida: "Si en el tablero del auto se enciende el testigo de una batería con el motor en marcha, suele indicar que el alternador no está cargando.",
      err: ["Pensar que el alternador del auto da CD directamente: da CA que se rectifica con diodos.", "Confundir el conmutador (dinamo y motores de CD) con los anillos rozantes (alternador).", "Creer que un motor no puede generar electricidad."],
      ejer: [["¿Qué pieza convierte la CA de la espira en CD en una dinamo?", "El conmutador."], ["¿Qué voltaje aproximado entrega el sistema de carga de un auto?", "Unos 14 V para cargar la batería de 12 V."], ["¿Qué es el frenado regenerativo?", "Usar el motor eléctrico como generador al frenar para recargar la batería."]],
      quiz: [
        { t: "om", p: "Un alternador produce…", o: ["Corriente directa", "Corriente alterna", "Electricidad estática", "Calor"], c: 1, e: "Alternador = corriente alterna." },
        { t: "om", p: "En una dinamo, el conmutador sirve para…", o: ["Aumentar el voltaje", "Obtener corriente directa invirtiendo las conexiones cada media vuelta", "Enfriar la máquina", "Medir la velocidad"], c: 1, e: "Rectifica mecánicamente la salida." },
        { t: "vf", p: "El alternador del auto produce CA que luego se rectifica con diodos.", c: true, e: "Es un alternador trifásico con puente de diodos." },
        { t: "om", p: "Si giras con la mano un motorcito de juguete…", o: ["Se rompe", "Funciona como generador y produce voltaje", "Se magnetiza", "Consume energía"], c: 1, e: "Motor y generador son la misma máquina." },
        { t: "om", p: "Los generadores de las grandes centrales son…", o: ["Dinamos", "Alternadores trifásicos", "Pilas", "Transformadores"], c: 1, e: "Producen CA trifásica." }
      ],
      res: ["El alternador produce CA; la dinamo, CD.", "La dinamo usa un conmutador; el alternador, anillos o bobinas fijas.", "El alternador del auto es trifásico y se rectifica con diodos.", "Un motor puede funcionar como generador.", "El frenado regenerativo recupera energía con el motor como generador."]
    },
    {
      id: "8-3", t: "El motor de CD", d: "Escobillas, conmutador e inversión de giro: el motor de juguete por dentro.", min: 40, e: true, sim: "S10", exp: "e-motor-homopolar",
      preg: "¿Por qué un motorcito de juguete gira al revés si inviertes las pilas?",
      obj: ["Explicar cómo funciona un motor de CD.", "Describir la función de las escobillas y el conmutador.", "Controlar la velocidad y el sentido de giro."],
      txt: `Un [[motor eléctrico]] convierte **energía eléctrica en movimiento** usando la fuerza que un campo magnético ejerce sobre una corriente (lección 7.5). Es la máquina inversa del generador.

## El principio
Pon una espira con corriente entre los polos de un imán. Por un lado de la espira la corriente va «hacia adentro» y por el otro «hacia afuera». Las fuerzas en los dos lados son **opuestas**: una empuja hacia arriba y la otra hacia abajo. Juntas producen un **par de giro** y la espira gira.

## El problema de la media vuelta
Al llegar a la posición vertical, las fuerzas ya no producen giro, y si la corriente siguiera igual, después de pasar esa posición las fuerzas la **frenarían** y la devolverían atrás. La espira se quedaría oscilando.

## La solución: el conmutador
El **conmutador** es un anillo partido en dos (o más) segmentos, unido al eje. Dos **escobillas** de carbón fijas rozan sobre él y llevan la corriente de la pila a la espira. Cada media vuelta, las escobillas pasan de un segmento al otro e **invierten el sentido de la corriente** en la espira. Así la fuerza siempre empuja en el mismo sentido de giro y el motor gira continuamente.

Los motores reales tienen **muchas bobinas y segmentos** para un giro suave y potente, y un **núcleo de hierro** laminado.

## Velocidad y sentido de giro
- **Sentido:** si inviertes la polaridad de la pila, la corriente va al revés, las fuerzas se invierten y el motor **gira al revés**. ¡La respuesta a la pregunta inicial!
- **Velocidad:** aumenta con el **voltaje**. Con una carga pesada, gira más lento y pide más corriente.
- **Arranque:** un motor detenido pide mucha corriente al arrancar (no hay voltaje inducido que la limite).

## La fuerza contraelectromotriz
Al girar, el motor también funciona como generador: se induce en sus bobinas un voltaje que **se opone** al de la pila (ley de Lenz). Esa «fuerza contraelectromotriz» crece con la velocidad y limita la corriente. Por eso:
- Un motor libre gira rápido y consume poca corriente.
- Si lo frenas o lo atascas, la contra-FEM desaparece, la corriente se dispara y el motor se **calienta**: un motor bloqueado puede quemarse.

## Ventajas e inconvenientes
| Ventajas | Inconvenientes |
|---|---|
| Fácil de controlar en velocidad y sentido | Las escobillas se desgastan y producen chispas |
| Funciona con pilas y baterías | Ruido eléctrico |
| Barato en tamaños pequeños | Mantenimiento en tamaños grandes |

Se usan en juguetes, ventiladores de computadora antiguos, limpiaparabrisas, elevalunas y arranques de auto, herramientas a batería y vibradores de celular.

## El motor homopolar
El motor más simple que existe: una pila, un imán de neodimio y un alambre. La corriente que baja por el alambre atraviesa el campo del imán y siente una fuerza lateral: el alambre gira. No tiene conmutador porque la corriente nunca cambia de sentido respecto al campo. Lo construirás en el experimento de esta lección.`,
      form: [["F = B · I · L (en cada lado de la espira)", "Fuerzas opuestas forman un par de giro."], ["Velocidad ∝ voltaje aplicado (sin carga)", "Regla práctica del motor de CD."]],
      ej: { enun: "Un motor de juguete de 3 V gira a 6 000 rpm sin carga. Si lo alimentas con 1,5 V, ¿a cuánto girará aproximadamente? ¿Y si inviertes la polaridad?", pasos: ["La velocidad sin carga es aproximadamente proporcional al voltaje.", "Con la mitad de voltaje: 6 000 × 1,5 / 3 = 3 000 rpm.", "Con la polaridad invertida gira en sentido contrario a la misma velocidad."], res: "Unas 3 000 rpm; con la polaridad invertida, en sentido contrario." },
      vida: "El vibrador del celular es un motorcito de CD con una pesa descentrada en el eje. Los elevalunas eléctricos del auto invierten la polaridad del motor para subir o bajar el vidrio.",
      err: ["Pensar que el motor gira por atracción simple entre imanes: gira por el par que producen las fuerzas sobre la corriente.", "Dejar un motor bloqueado conectado: se calienta y se quema.", "Creer que el conmutador cambia el voltaje: solo invierte el sentido de la corriente en la espira."],
      ejer: [["¿Para qué sirve el conmutador en un motor de CD?", "Para invertir la corriente en la espira cada media vuelta y mantener el giro."], ["¿Cómo se invierte el sentido de giro de un motor de CD?", "Invirtiendo la polaridad de la alimentación."], ["¿Por qué un motor atascado se calienta?", "Sin giro no hay fuerza contraelectromotriz, la corriente se dispara y el efecto Joule lo calienta."]],
      quiz: [
        { t: "om", p: "Un motor eléctrico convierte…", o: ["Movimiento en electricidad", "Electricidad en movimiento", "Calor en electricidad", "Luz en movimiento"], c: 1, e: "Es lo inverso del generador." },
        { t: "om", p: "En un motor de CD, el conmutador…", o: ["Mide la velocidad", "Invierte la corriente en la espira cada media vuelta", "Enfría el motor", "Aumenta el voltaje"], c: 1, e: "Mantiene el giro en un mismo sentido." },
        { t: "vf", p: "Al invertir la polaridad de un motor de CD, gira al revés.", c: true, e: "Las fuerzas se invierten." },
        { t: "om", p: "Si un motor se atasca, su corriente…", o: ["Baja a cero", "Aumenta mucho y puede quemarlo", "No cambia", "Se vuelve alterna"], c: 1, e: "Desaparece la fuerza contraelectromotriz." },
        { t: "om", p: "Las escobillas de un motor de CD…", o: ["Barren el polvo", "Llevan la corriente al conmutador giratorio", "Son imanes", "Son fusibles"], c: 1, e: "Son contactos de carbón que rozan sobre el conmutador." }
      ],
      res: ["El motor convierte electricidad en movimiento con la fuerza sobre una corriente.", "Las fuerzas opuestas sobre la espira forman un par de giro.", "El conmutador invierte la corriente cada media vuelta para mantener el giro.", "Invertir la polaridad invierte el giro; más voltaje, más velocidad.", "Un motor bloqueado pide mucha corriente y se calienta."]
    },
    {
      id: "8-4", t: "Motores de CA y sin escobillas", d: "Motor de inducción, motor universal (licuadora) y sin escobillas (drones, autos eléctricos).", min: 40, sim: "S10",
      preg: "¿Cómo gira el motor de una lavadora si no tiene escobillas ni conmutador?",
      obj: ["Explicar el campo magnético giratorio.", "Describir el motor de inducción, el universal y el sin escobillas.", "Elegir el tipo de motor según la aplicación."],
      txt: `El motor de CD necesita escobillas que se desgastan. [Nikola Tesla](#/personajes/tesla) ideó a finales del siglo XIX una forma de hacer girar un motor **sin ninguna conexión eléctrica a la parte que gira**: el **motor de inducción**.

## El campo magnético giratorio
Si colocas tres bobinas alrededor de un rotor, separadas 120°, y las alimentas con las **tres fases** de la corriente trifásica, cada bobina alcanza su máximo campo un tercio de ciclo después que la anterior. El resultado es un campo magnético que **gira** alrededor del rotor, sin que nada se mueva físicamente, a la velocidad de la red: 3 600 rpm (60 Hz) o 3 000 rpm (50 Hz) con un par de polos.

## El motor de inducción
El rotor más común es la **jaula de ardilla**: barras de aluminio o cobre unidas en los extremos por anillos, dentro de un núcleo de hierro laminado.
1. El campo giratorio barre las barras del rotor.
2. Se **inducen** corrientes en las barras (Faraday).
3. Esas corrientes, dentro del campo, sienten **fuerzas** (lección 7.5) que arrastran al rotor detrás del campo.

El rotor gira **un poco más lento** que el campo (por ejemplo, 3 450 rpm en lugar de 3 600): esa diferencia se llama **deslizamiento**. Si girara a la misma velocidad que el campo, no habría cambio de flujo, ni corriente inducida, ni fuerza.

**Ventajas:** robusto, barato, sin escobillas, casi sin mantenimiento, muy eficiente. Es el motor más usado del mundo: bombas, ventiladores, compresores, lavadoras, refrigeradores, aires acondicionados e industria. ¡La respuesta a la pregunta inicial!

**Monofásico:** en casa solo hay una fase, que no produce un campo giratorio por sí sola. Los motores monofásicos usan un **capacitor de arranque** o una bobina auxiliar para crear un desfase que inicia el giro.

## El motor universal
Es un motor con escobillas y conmutador, parecido al de CD, pero con el imán sustituido por un electroimán **en serie** con el rotor. Como al invertirse la corriente se invierten a la vez el campo y la corriente del rotor, la fuerza sigue en el mismo sentido: funciona con **CA o CD**. Gira muy rápido (10 000 a 30 000 rpm) y tiene mucha fuerza al arrancar, pero es ruidoso y sus escobillas se desgastan.

Se usa en **licuadoras, aspiradoras, taladros, secadoras de cabello** y batidoras. El olor a «quemado» de una licuadora vieja suele venir de sus escobillas.

## El motor sin escobillas (BLDC)
El motor sin escobillas invierte la idea del motor de CD: los **imanes permanentes giran** en el rotor y las **bobinas están fijas** en el estator. Un circuito electrónico alimenta las bobinas en secuencia, creando un campo giratorio que el rotor sigue. El «conmutador» es electrónico, sin piezas que rocen.

**Ventajas:** muy eficiente, silencioso, sin desgaste, control preciso. **Inconveniente:** necesita electrónica de control.

Se usa en **drones, ventiladores de computadora, discos duros, patinetes y autos eléctricos**, lavadoras modernas con «inversor» y herramientas a batería de gama alta.

## Comparación
| Motor | Escobillas | Alimentación | Uso típico |
|---|---|---|---|
| CD con escobillas | Sí | CD | Juguetes, elevalunas |
| Inducción | No | CA (trifásica o monofásica) | Bombas, compresores, industria |
| Universal | Sí | CA o CD | Licuadoras, aspiradoras, taladros |
| Sin escobillas (BLDC) | No (electrónico) | CD con electrónica | Drones, autos eléctricos, PC |`,
      form: [["Velocidad del campo (rpm) = 60 × f / pares de polos", "Velocidad síncrona de un motor de CA."], ["Deslizamiento = (v campo − v rotor) / v campo", "En un motor de inducción suele ser del 2 al 6 %."]],
      ej: { enun: "Un motor de inducción de 2 pares de polos funciona en una red de 50 Hz y gira a 1 440 rpm. ¿Cuál es la velocidad del campo y el deslizamiento?", pasos: ["Velocidad del campo = 60 × 50 / 2 = 1 500 rpm.", "Deslizamiento = (1 500 − 1 440) / 1 500 = 60 / 1 500 = 0,04.", "En porcentaje: 4 %."], res: "Campo a 1 500 rpm; deslizamiento del 4 %." },
      vida: "Los aparatos con tecnología de inversor (aires acondicionados, refrigeradores, lavadoras) usan electrónica para controlar la velocidad del motor según la necesidad, en lugar de encenderlo y apagarlo: consumen menos y hacen menos ruido.",
      err: ["Pensar que el motor de inducción tiene imanes en el rotor: tiene barras donde se inducen corrientes.", "Creer que un motor de inducción puede girar a la misma velocidad que el campo.", "Confundir el motor universal con el de inducción."],
      ejer: [["¿Qué crea el campo magnético giratorio de un motor de inducción?", "Tres bobinas separadas 120° alimentadas con las tres fases."], ["¿Qué tipo de motor tiene una licuadora?", "Normalmente un motor universal."], ["¿Por qué los drones usan motores sin escobillas?", "Porque son ligeros, eficientes, sin desgaste y fáciles de controlar con precisión."]],
      quiz: [
        { t: "om", p: "El motor más usado en la industria y en bombas es el…", o: ["De CD con escobillas", "De inducción", "Homopolar", "De vapor"], c: 1, e: "Robusto, barato y sin escobillas." },
        { t: "om", p: "En un motor de inducción, el rotor gira…", o: ["Más rápido que el campo", "Un poco más lento que el campo", "Exactamente igual que el campo", "Al revés del campo"], c: 1, e: "Ese deslizamiento es necesario para inducir corriente." },
        { t: "vf", p: "Un motor universal puede funcionar con CA y con CD.", c: true, e: "Campo y rotor se invierten a la vez." },
        { t: "om", p: "¿Qué motor usan los drones y los autos eléctricos?", o: ["Universal", "Sin escobillas (BLDC) o síncrono de imanes", "De vapor", "Homopolar"], c: 1, e: "Eficientes y controlables electrónicamente." },
        { t: "num", p: "¿A qué velocidad gira el campo de un motor de un par de polos a 60 Hz? (rpm)", r: 3600, u: "", e: "60 × 60 / 1 = 3 600 rpm." }
      ],
      res: ["Tres fases separadas 120° crean un campo magnético giratorio.", "El motor de inducción induce corrientes en el rotor y gira algo más lento que el campo.", "El motor universal (escobillas, serie) funciona con CA o CD: licuadoras y taladros.", "El motor sin escobillas tiene imanes en el rotor y conmutación electrónica.", "Cada tipo se elige según el uso: robustez, velocidad o control."]
    },
    {
      id: "8-5", t: "El transformador", d: "Núcleo y dos bobinas; solo funciona con CA; elevador y reductor.", min: 45, e: true, sim: "S11",
      preg: "¿Cómo puede una caja sin partes móviles convertir 13 200 V en los {{V}} de tu casa?",
      obj: ["Describir las partes de un transformador.", "Explicar su funcionamiento con la inducción.", "Explicar por qué solo funciona con corriente alterna."],
      txt: `El [[transformador]] es quizá la máquina más importante de la red eléctrica: sin él no existiría la transmisión en alta tensión. Y es asombrosamente simple: **no tiene ninguna parte móvil**.

## Partes
- **Núcleo:** un marco cerrado de **láminas de acero al silicio**, aisladas entre sí.
- **Bobina primaria:** la que recibe la energía (entrada).
- **Bobina secundaria:** la que entrega la energía (salida).

Las dos bobinas **no están conectadas eléctricamente** entre sí: la energía pasa de una a otra a través del campo magnético del núcleo.

## Cómo funciona
1. La CA del primario crea en el núcleo un **campo magnético que cambia** constantemente (crece, se anula, se invierte…).
2. El núcleo de hierro lleva ese flujo variable hasta el secundario.
3. El flujo que cambia **induce un voltaje** en el secundario (ley de Faraday).

Como el mismo flujo atraviesa las dos bobinas, el voltaje inducido en cada vuelta es el mismo. Por tanto, **el voltaje de cada bobina es proporcional a su número de vueltas**:

= Vs / Vp = Ns / Np

- Si el secundario tiene **menos** vueltas: **transformador reductor** (baja el voltaje).
- Si tiene **más** vueltas: **transformador elevador** (sube el voltaje).
- Con el mismo número: transformador **de aislamiento** (1:1), que separa eléctricamente dos circuitos por seguridad.

## ¿Por qué solo con CA?
Con **corriente directa**, el campo del núcleo es **constante**: no cambia, así que **no se induce nada** en el secundario. Además, la bobina primaria, que tiene poca resistencia, dejaría pasar una corriente enorme y se quemaría. Compruébalo en la simulación S11 eligiendo «Directa».

!> Nunca conectes un transformador de red a una batería ni a corriente directa.

## Potencia: lo que se gana en voltaje se pierde en corriente
Un transformador no crea energía. Idealmente, la potencia de salida es igual a la de entrada:

= Vp · Ip = Vs · Is

Si el voltaje se reduce 10 veces, la corriente disponible aumenta 10 veces (y viceversa). Por eso, en un transformador reductor, el cable del secundario es **más grueso** que el del primario.

## Dónde están
- **Subestaciones elevadoras** junto a las centrales: de 15–25 kV a 115–400 kV o más.
- **Subestaciones reductoras** cerca de las ciudades.
- **Transformadores de poste o de pedestal** en tu calle: de media tensión (13,2–34,5 kV) a {{V}}.
- **Dentro de cargadores y fuentes** (diminutos, de alta frecuencia).
- **Soldadoras, cargadores de baterías, timbres, lámparas halógenas de 12 V.**

## El zumbido
Los transformadores zumban a 100 o 120 Hz (el doble de la red) porque las láminas del núcleo se estiran y encogen ligeramente cada vez que se magnetizan: es la **magnetostricción**.`,
      form: [["Vs / Vp = Ns / Np", "Relación de voltajes = relación de vueltas."], ["Vp · Ip = Vs · Is", "Transformador ideal: potencia de entrada = potencia de salida."], ["Is / Ip = Np / Ns", "La corriente cambia al revés que el voltaje."]],
      ej: { enun: "Un transformador tiene 1 000 vueltas en el primario y 100 en el secundario. Si se conecta a 120 V, ¿qué voltaje da? Si la carga pide 5 A, ¿qué corriente toma del primario?", pasos: ["Vs = Vp × Ns / Np = 120 × 100 / 1 000 = 12 V.", "Potencia de salida: 12 × 5 = 60 W.", "Ip = 60 / 120 = 0,5 A (ideal)."], res: "12 V en el secundario; 0,5 A en el primario." },
      vida: "El transformador gris de tu calle reduce la media tensión de la red de distribución a la baja tensión de las casas. Las lámparas halógenas de 12 V y los timbres de muchas casas tienen su propio transformador pequeño.",
      err: ["Pensar que un transformador sube la potencia al subir el voltaje.", "Creer que funciona con corriente directa.", "Pensar que el primario y el secundario están conectados por un cable."],
      ejer: [["Np = 500, Ns = 2 500. ¿Es elevador o reductor? ¿Cuánto sale con 100 V?", "Elevador; 500 V."], ["Un transformador 230 V → 23 V entrega 2 A. ¿Corriente del primario (ideal)?", "0,2 A."], ["¿Por qué el núcleo se hace de láminas?", "Para reducir las corrientes de Foucault y sus pérdidas."]],
      quiz: [
        { t: "om", p: "Un transformador funciona con…", o: ["Solo corriente directa", "Solo corriente alterna", "Cualquier corriente", "Electricidad estática"], c: 1, e: "Necesita un flujo magnético variable." },
        { t: "num", p: "Np = 1 000 y Ns = 100. Si entran 120 V, ¿cuántos salen?", r: 12, u: "V", e: "120 × 100 / 1 000 = 12 V." },
        { t: "om", p: "Si un transformador reduce el voltaje 10 veces, la corriente en el secundario…", o: ["Se reduce 10 veces", "Puede ser 10 veces mayor", "No cambia", "Se hace cero"], c: 1, e: "La potencia se conserva (idealmente)." },
        { t: "vf", p: "En un transformador, la energía pasa del primario al secundario a través del campo magnético, sin conexión eléctrica.", c: true, e: "Las bobinas están aisladas entre sí." },
        { t: "om", p: "Un transformador con más vueltas en el secundario que en el primario es…", o: ["Reductor", "Elevador", "De aislamiento", "Rectificador"], c: 1, e: "Más vueltas, más voltaje." }
      ],
      res: ["El transformador tiene un núcleo de hierro laminado y dos bobinas aisladas entre sí.", "La CA del primario crea un flujo variable que induce voltaje en el secundario.", "Vs/Vp = Ns/Np: elevador o reductor según las vueltas.", "Solo funciona con CA; con CD no induce y se quemaría.", "La potencia se conserva: si baja el voltaje, sube la corriente."]
    },
    {
      id: "8-6", t: "Cálculos de transformadores", d: "Vs/Vp = Ns/Np, potencia y eficiencia. Cinco ejemplos.", min: 45, e: true, calc: "C8", sim: "S11",
      preg: "¿Cuántas vueltas necesita un transformador para pasar de la red de tu país a 12 V?",
      obj: ["Calcular voltajes, vueltas y corrientes de un transformador.", "Incluir la eficiencia en los cálculos.", "Usar la relación de transformación."],
      txt: `Con dos relaciones puedes resolver casi cualquier problema de transformadores:

= Vs / Vp = Ns / Np     (voltajes y vueltas)
= Ps = η · Pp     (potencia con eficiencia η)

La **relación de transformación** es a = Np / Ns. Un transformador «10:1» tiene diez veces más vueltas en el primario: reduce el voltaje 10 veces.

## Ejemplo 1: calcular el voltaje de salida
Np = 2 000, Ns = 100, Vp = 230 V.
- Vs = 230 × 100 / 2 000 = **11,5 V**.

## Ejemplo 2: calcular las vueltas necesarias
Quieres pasar de **127 V a 12 V** y el primario tiene 1 000 vueltas.
- Ns = Np × Vs / Vp = 1 000 × 12 / 127 ≈ **94,5 vueltas** → en la práctica, 95 (o un poco más, para compensar las pérdidas con carga).
- Con 230 V: Ns = 1 000 × 12 / 230 ≈ 52 vueltas.

## Ejemplo 3: corrientes en un transformador ideal
El transformador anterior (127 → 12 V) alimenta una lámpara de **60 W**.
- Is = P / Vs = 60 / 12 = **5 A**.
- Ip = P / Vp = 60 / 127 ≈ **0,47 A**.
- Relación de corrientes: 5 / 0,47 ≈ 10,6 ≈ Np/Ns ✓.

## Ejemplo 4: con eficiencia
Si el transformador tiene una eficiencia del **95 %**, para entregar 60 W necesita tomar más de la red:
- Pp = Ps / η = 60 / 0,95 ≈ **63,2 W**.
- Ip = 63,2 / 127 ≈ **0,50 A**.
- Pérdidas: 63,2 − 60 = **3,2 W**, que calientan el transformador.

## Ejemplo 5: subestación
Una subestación eleva de 20 kV a 400 kV una potencia de 200 MW.
- Relación: 400 / 20 = 20 → Ns / Np = 20.
- Corriente en el lado de 20 kV: 200 × 10⁶ / 20 000 = **10 000 A**.
- Corriente en el lado de 400 kV: 200 × 10⁶ / 400 000 = **500 A**.

Veinte veces menos corriente en la línea: las pérdidas I²R se reducen **400 veces** (lección 10.3).

## Receta
1. Identifica qué datos tienes: voltajes, vueltas, potencia, corriente, eficiencia.
2. Usa Vs/Vp = Ns/Np para voltajes o vueltas.
3. Calcula la corriente del secundario con Is = Ps / Vs.
4. Calcula la potencia del primario con Pp = Ps / η y luego Ip = Pp / Vp.
5. Comprueba: el lado de **mayor voltaje** tiene **menor corriente**.

La calculadora C8 resuelve todos estos casos: dale Vp, Np y Ns (o el Vs deseado), y opcionalmente la potencia y la eficiencia.`,
      form: [["Vs / Vp = Ns / Np", "Relación de voltajes y vueltas."], ["Ns = Np · Vs / Vp", "Vueltas necesarias en el secundario."], ["Is = Ps / Vs · Ip = Ps / (η · Vp)", "Corrientes con eficiencia η."]],
      ej: { enun: "Un cargador de baterías usa un transformador de 230 V a 15 V que entrega 4 A con una eficiencia del 90 %. Calcula la potencia de salida, la de entrada y la corriente del primario.", pasos: ["Ps = 15 × 4 = 60 W.", "Pp = 60 / 0,90 ≈ 66,7 W.", "Ip = 66,7 / 230 ≈ 0,29 A.", "Pérdidas: 66,7 − 60 = 6,7 W."], res: "Ps = 60 W; Pp ≈ 66,7 W; Ip ≈ 0,29 A; 6,7 W de pérdidas." },
      vida: "Los transformadores de las subestaciones tienen eficiencias del 99 % o más. Aun así, en uno de 200 MW se pierden 2 MW en calor, y por eso llevan grandes radiadores con aceite.",
      err: ["Invertir la relación (poner Np/Ns en lugar de Ns/Np).", "Olvidar la eficiencia al calcular la corriente del primario.", "Pensar que el lado de mayor voltaje lleva más corriente."],
      ejer: [["Np = 1 200, Ns = 60, Vp = 120 V. ¿Vs?", "6 V."], ["¿Qué relación de vueltas necesitas para pasar de 230 V a 9 V?", "Np/Ns ≈ 25,6."], ["Un transformador ideal da 24 V y 3 A con 120 V de entrada. ¿Ip?", "0,6 A."]],
      quiz: [
        { t: "num", p: "Np = 2 000, Ns = 100 y Vp = 230 V. ¿Vs?", r: 11.5, u: "V", e: "230 × 100 / 2 000 = 11,5 V." },
        { t: "num", p: "¿Cuántas vueltas necesita el secundario para pasar de 127 V a 12 V si Np = 1 000?", r: 94.5, u: "", e: "Ns = 1 000 × 12 / 127 ≈ 94,5." },
        { t: "num", p: "Un transformador ideal entrega 60 W a 12 V. ¿Corriente del secundario?", r: 5, u: "A", e: "Is = 60 / 12 = 5 A." },
        { t: "num", p: "Para entregar 95 W con una eficiencia del 95 %, ¿cuánta potencia toma de la red?", r: 100, u: "W", e: "Pp = 95 / 0,95 = 100 W." },
        { t: "om", p: "En un transformador, el lado de mayor voltaje tiene…", o: ["Mayor corriente", "Menor corriente", "La misma corriente", "Corriente directa"], c: 1, e: "La potencia es (casi) igual en ambos lados." }
      ],
      res: ["Vs/Vp = Ns/Np permite calcular voltajes y vueltas.", "Is = Ps/Vs; con eficiencia, Pp = Ps/η.", "El lado de mayor voltaje lleva menos corriente.", "Elevar 20 veces el voltaje reduce 20 veces la corriente y 400 veces las pérdidas.", "La calculadora C8 resuelve estos casos con pasos."]
    },
    {
      id: "8-7", t: "Dónde se usan", d: "Subestaciones, transformador de poste, cargadores, soldadoras y autos eléctricos.", min: 30, exp: "e-desarmar",
      preg: "¿Cuántos motores y transformadores hay en tu casa? Probablemente más de los que crees.",
      obj: ["Reconocer generadores, motores y transformadores en la vida diaria.", "Relacionar cada aplicación con el tipo de máquina.", "Valorar la importancia de estas máquinas en la red y en el transporte."],
      txt: `Generadores, motores y transformadores están en todas partes. Hagamos un recorrido desde la central hasta tu bolsillo.

## En la red eléctrica
- **Centrales:** alternadores trifásicos de decenas a cientos de megawatts, movidos por turbinas de agua, vapor o gas, o por el viento.
- **Subestación elevadora:** transformadores enormes, sumergidos en aceite, que suben el voltaje para la transmisión.
- **Subestaciones reductoras y de distribución:** bajan a media tensión.
- **Transformador de poste o de pedestal:** baja a {{V}} para un grupo de casas.

## En la casa
| Aparato | Máquina | Tipo |
|---|---|---|
| Refrigerador, aire acondicionado | Motor del compresor | Inducción o sin escobillas (con inversor) |
| Lavadora | Motor del tambor | Inducción, universal o sin escobillas |
| Licuadora, aspiradora, taladro | Motor | Universal |
| Ventilador | Motor | Inducción monofásico con capacitor |
| Bomba de agua | Motor | Inducción |
| Computadora | Ventiladores | Sin escobillas |
| Cargadores | Transformador de alta frecuencia | Fuente conmutada |
| Horno de microondas | Transformador de alto voltaje | Eleva a unos 2 000 V para el magnetrón |
| Timbre, lámparas de 12 V | Transformador pequeño | Reductor |
| Cepillo de dientes eléctrico | Bobinas de carga inalámbrica | Transformador sin núcleo |

!> El transformador del horno de microondas y su capacitor manejan voltajes mortales incluso desenchufado. Nunca se abre un microondas.

## En el transporte
- **Autos de combustión:** motor de arranque (CD), alternador, motores de limpiaparabrisas, elevalunas, ventiladores.
- **Autos eléctricos e híbridos:** uno o varios motores de imanes permanentes o de inducción (100–300 kW), que funcionan como generadores al frenar; un inversor; un cargador con transformador.
- **Trenes y metros:** motores de tracción de inducción; transformadores en las subestaciones y a veces a bordo.
- **Bicicletas y patinetes eléctricos:** motores sin escobillas en el buje.

## En la industria
Motores de inducción trifásicos mueven bombas, ventiladores, cintas transportadoras, compresores y máquinas herramienta: los motores eléctricos consumen alrededor de **la mitad de toda la electricidad del mundo**. Las **soldadoras eléctricas** son transformadores que bajan el voltaje y entregan corrientes de cientos de amperios.

## Generadores de respaldo
Hospitales, edificios y comercios tienen **plantas de emergencia**: un motor diésel o de gas que mueve un alternador cuando falla la red. Las casas pueden tener generadores portátiles de gasolina.

!> Un generador portátil nunca se conecta a un contacto de la casa ni se usa en interiores: puede electrocutar a los trabajadores de la red (alimentación inversa) y su escape produce monóxido de carbono, un gas mortal. Lo instala un electricista con un interruptor de transferencia.

## Experimento
Desarma (sin pilas y con un adulto) un juguete viejo que tenga motor: identifica el imán, las bobinas, el conmutador y las escobillas.`,
      vida: "En una casa típica puede haber más de 20 motores eléctricos: en el refrigerador, la lavadora, los ventiladores, la licuadora, la aspiradora, la computadora, el lector de discos, los juguetes y hasta en el celular (vibrador).",
      err: ["Conectar un generador portátil a un contacto de la casa.", "Abrir un microondas «porque está desenchufado».", "Pensar que los autos eléctricos no tienen generador: sus motores funcionan como generadores al frenar."],
      ejer: [["Nombra tres aparatos de tu casa con motor de inducción.", "Por ejemplo: refrigerador, ventilador y bomba de agua."], ["¿Qué máquina tiene una soldadora eléctrica?", "Un transformador reductor que entrega gran corriente."], ["¿Por qué un generador portátil no se debe usar dentro de casa?", "Porque su escape produce monóxido de carbono, un gas mortal."]],
      quiz: [
        { t: "om", p: "¿Qué máquina hay dentro de un cargador de celular?", o: ["Un motor universal", "Un transformador de alta frecuencia (fuente conmutada)", "Un alternador", "Una dinamo"], c: 1, e: "Las fuentes conmutadas usan transformadores pequeños de alta frecuencia." },
        { t: "om", p: "Aproximadamente, ¿qué parte de la electricidad del mundo consumen los motores eléctricos?", o: ["1 %", "10 %", "La mitad", "Toda"], c: 2, e: "Alrededor del 45–50 %." },
        { t: "vf", p: "Se puede conectar un generador portátil a un contacto de la casa para alimentarla durante un apagón.", c: false, e: "Es muy peligroso: puede electrocutar a los trabajadores de la red. Se necesita un interruptor de transferencia instalado por un electricista.", crit: true },
        { t: "om", p: "El motor de una licuadora suele ser…", o: ["De inducción trifásico", "Universal", "Homopolar", "Sin motor"], c: 1, e: "Gira rápido y funciona con CA." },
        { t: "om", p: "¿Qué hace un auto eléctrico al frenar con frenado regenerativo?", o: ["Desconecta la batería", "Usa el motor como generador para recargar la batería", "Enciende el alternador", "Gasta más energía"], c: 1, e: "El motor se convierte en generador." }
      ],
      res: ["La red usa alternadores en las centrales y transformadores en cada etapa.", "En casa hay muchos motores (inducción, universales, sin escobillas) y transformadores.", "Los autos eléctricos usan motores que también generan al frenar.", "Los motores consumen la mitad de la electricidad mundial.", "Nunca se abre un microondas ni se conecta un generador a un contacto."]
    },
    {
      id: "8-8", t: "Pérdidas, calentamiento y eficiencia de las máquinas", d: "Calor, núcleo laminado, ruido y la placa de datos de un motor.", min: 30,
      preg: "¿Por qué se calienta un motor o un transformador aunque esté funcionando bien?",
      obj: ["Identificar las pérdidas en motores y transformadores.", "Explicar cómo se reducen.", "Interpretar la placa de datos de un motor."],
      txt: `Ninguna máquina es perfecta. En motores, generadores y transformadores, parte de la energía se convierte en **calor**, ruido y vibración. Conocer esas pérdidas ayuda a elegir y cuidar las máquinas.

## Las pérdidas principales
1. **Pérdidas en el cobre (Joule):** la corriente que atraviesa las bobinas las calienta (P = I²R). Aumentan mucho con la carga: el doble de corriente, cuatro veces más pérdidas.
2. **Pérdidas en el hierro:**
   - **Corrientes de Foucault** inducidas en el núcleo (lección 7.7).
   - **Histéresis:** cada vez que el núcleo se magnetiza en un sentido y en otro, sus dominios «rozan» y se pierde energía.
   Se dan aunque la máquina funcione sin carga.
3. **Pérdidas mecánicas** (solo en máquinas giratorias): rozamiento en los cojinetes y las escobillas, y resistencia del aire del ventilador de refrigeración.

## Cómo se reducen
- **Cables de cobre gruesos** y de buena calidad: menos resistencia.
- **Núcleos laminados** de acero al silicio, con láminas aisladas: cortan las corrientes de Foucault. En transformadores muy eficientes se usa **metal amorfo**.
- **Buenos cojinetes** y lubricación.
- **Refrigeración:** ventiladores en motores; aceite y radiadores en los transformadores grandes.

## Eficiencias típicas
| Máquina | Eficiencia |
|---|---|
| Transformador de subestación | 98,5–99,7 % |
| Transformador de poste | 97–99 % |
| Motor de inducción industrial grande | 93–97 % |
| Motor de inducción pequeño | 70–85 % |
| Motor sin escobillas | 85–95 % |
| Motor de juguete | 40–70 % |
| Generador de central | 98–99 % |

## El calentamiento
El calor de las pérdidas eleva la temperatura de la máquina. El **aislamiento** de los alambres tiene un límite: cada clase de aislamiento (A, B, F, H) indica la temperatura máxima que soporta. Como regla práctica, **cada 10 °C por encima del límite reducen a la mitad la vida del aislamiento**. Por eso un motor sobrecargado o mal ventilado se acaba quemando.

## La placa de datos de un motor
Un motor trifásico puede tener una placa así:

| Dato | Ejemplo | Significado |
|---|---|---|
| Potencia | 1,5 kW (2 HP) | Potencia **mecánica** en el eje |
| Voltaje | 220/440 V | Según la conexión de sus bobinas |
| Corriente | 6,2/3,1 A | A plena carga |
| Velocidad | 1 740 rpm | A plena carga (campo a 1 800 a 60 Hz) |
| Frecuencia | 60 Hz | |
| Eficiencia | 86 % | Potencia mecánica / eléctrica |
| Factor de potencia | 0,82 | Relación entre potencia real y aparente |
| Clase de aislamiento | F | Hasta 155 °C |

?> La potencia de la placa es la **mecánica de salida**. La potencia eléctrica que consume es mayor: 1,5 kW / 0,86 ≈ 1,74 kW.

## Señales de alarma
- Olor a barniz o a quemado.
- Zumbido más fuerte de lo normal o vibraciones.
- Carcasa tan caliente que no se puede tocar.
- La protección se dispara con frecuencia.

Ante cualquiera de ellas, hay que apagar la máquina y que la revise un técnico.`,
      form: [["Eficiencia = P salida / P entrada", "Fracción de la energía aprovechada."], ["P entrada = P salida / eficiencia", "Potencia eléctrica que consume un motor."], ["Pérdidas = P entrada − P salida", "Se convierten en calor."]],
      ej: { enun: "Un motor de 1,5 kW (potencia mecánica) tiene una eficiencia del 86 %. ¿Cuánta potencia eléctrica consume y cuánta se pierde en calor?", pasos: ["P entrada = 1 500 / 0,86 ≈ 1 744 W.", "Pérdidas = 1 744 − 1 500 = 244 W."], res: "Consume unos 1,74 kW y pierde unos 244 W en calor." },
      vida: "Los transformadores de las subestaciones llevan radiadores con aletas por donde circula aceite para enfriarse. Los motores industriales tienen un ventilador en el eje y aletas en la carcasa.",
      err: ["Pensar que la potencia de la placa de un motor es la que consume de la red: es la que entrega en el eje.", "Tapar las rejillas de ventilación de un motor.", "Creer que las pérdidas en el hierro desaparecen sin carga: existen siempre que esté conectado."],
      ejer: [["Un transformador toma 1 000 W y entrega 985 W. ¿Eficiencia y pérdidas?", "98,5 % y 15 W."], ["Nombra los tres tipos de pérdidas de un motor.", "En el cobre (Joule), en el hierro (Foucault e histéresis) y mecánicas."], ["Un motor de 750 W con eficiencia del 75 %, ¿cuánto consume?", "1 000 W."]],
      quiz: [
        { t: "om", p: "Las pérdidas en el cobre se deben a…", o: ["Las corrientes de Foucault", "El efecto Joule en las bobinas", "El rozamiento de los cojinetes", "El ruido"], c: 1, e: "P = I²R en los alambres." },
        { t: "om", p: "Los núcleos laminados reducen…", o: ["Las pérdidas en el cobre", "Las corrientes de Foucault", "El voltaje", "La frecuencia"], c: 1, e: "Las láminas aisladas cortan los remolinos de corriente." },
        { t: "num", p: "Un motor entrega 1 500 W con una eficiencia del 75 %. ¿Qué potencia consume?", r: 2000, u: "W", e: "1 500 / 0,75 = 2 000 W." },
        { t: "vf", p: "La potencia que aparece en la placa de un motor es la potencia mecánica de salida.", c: true, e: "La eléctrica de entrada es mayor." },
        { t: "om", p: "¿Cuál es una señal de alarma en un motor?", o: ["Que gire", "Olor a quemado y carcasa muy caliente", "Que tenga placa de datos", "Que sea de inducción"], c: 1, e: "Indica sobrecalentamiento." }
      ],
      res: ["Las máquinas pierden energía en el cobre, en el hierro y por rozamiento.", "Cables gruesos, núcleos laminados y buena refrigeración reducen las pérdidas.", "Los transformadores grandes superan el 99 % de eficiencia.", "El calor excesivo destruye el aislamiento y quema las máquinas.", "La placa de un motor da la potencia mecánica; la eléctrica es mayor."]
    }
  ]
});
