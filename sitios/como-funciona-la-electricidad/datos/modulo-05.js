// M5. Corriente directa (CD) y corriente alterna (CA)
registrarModulo({
  id: "m5", n: 5, nivel: 2, titulo: "Corriente directa (CD) y corriente alterna (CA)", quizMin: 25, quizN: 15, minEsperado: 305,
  objetivo: "Diferenciar la corriente directa de la alterna, interpretar la onda senoidal (frecuencia, periodo, valor pico y valor eficaz) y conocer cómo se convierte una en otra.",
  clave: "cd ca cc continua alterna senoidal frecuencia hertz rms eficaz pico trifasica",
  actividades: ["Clasificar 15 aparatos de tu casa según usen CA, CD o ambas (con transformador o cargador).", "Construir una línea de tiempo de la guerra de las corrientes con los personajes de la lección 5.6.", "En el [osciloscopio virtual](#/simulacion/S7), comparar una onda de 127 V con una de 230 V y anotar sus valores pico."],
  ejemplos: ["Periodo de 60 Hz = 16,7 ms; de 50 Hz = 20 ms.", "Voltaje pico de 127 V eficaces = 179,6 V; de 230 V = 325 V.", "Leer la etiqueta de un cargador: «Entrada 100–240 V ~ 50/60 Hz · Salida 5 V ⎓ 2 A»."],
  sims: ["S7"], calcs: ["C12"], gen: ["rms", "periodo"],
  evaluacion: "Quiz de módulo de 15 preguntas (25 min), con cálculos de valor pico y periodo con valores aleatorios. Se aprueba con el 70 %.",
  extra: [
    { t: "om", p: "El símbolo «~» en una etiqueta indica…", o: ["Corriente directa", "Corriente alterna", "Tierra", "Fusible"], c: 1, e: "~ es CA; ⎓ (línea continua sobre una discontinua) es CD.", lec: "5-7" },
    { t: "vf", p: "Un transformador funciona igual con corriente directa que con alterna.", c: false, e: "Solo funciona con CA, porque necesita un campo magnético variable.", lec: "5-6" }
  ],
  lecciones: [
    {
      id: "5-1", t: "La corriente directa", d: "Sentido constante; pilas, baterías, USB y paneles solares; su gráfica.", min: 30, e: true, sim: "S7",
      preg: "¿Por qué una pila tiene un polo + y un polo −, pero el contacto de la pared no tiene marcados los suyos?",
      obj: ["Definir la corriente directa.", "Reconocer fuentes y aparatos de CD.", "Interpretar la gráfica de voltaje de una fuente de CD."],
      txt: `La **corriente directa** ([[CD]]), también llamada **corriente continua** (CC), es la que circula **siempre en el mismo sentido**: de + a − por el circuito exterior (sentido convencional). Su voltaje es, idealmente, **constante** en el tiempo.

## Fuentes de corriente directa
- **Pilas y baterías:** una reacción química mantiene un polo positivo y otro negativo.
- **Paneles solares:** la luz separa cargas en el silicio y produce CD.
- **Cargadores y fuentes de alimentación:** convierten la CA de la red en CD (lección 5.7).
- **Dinamos:** generadores con conmutador (lección 8.2).
- **Puertos USB:** entregan 5 V de CD (o más en carga rápida).

## La gráfica de la CD
Si dibujas el voltaje en función del tiempo, la CD es una **línea horizontal**: 1,5 V hoy, 1,5 V dentro de un segundo, 1,5 V dentro de un minuto. En la práctica el voltaje de una pila baja lentamente a medida que se descarga, pero no cambia de signo.

En el osciloscopio virtual de esta lección, elige «Corriente directa» y verás una línea recta por encima del eje.

## Polaridad: el + y el −
Como la corriente va siempre en el mismo sentido, en CD **la polaridad importa**:
- Si pones una pila al revés en un aparato, puede no funcionar o incluso dañarse.
- Un motor de CD gira en un sentido u otro según cómo lo conectes.
- Un LED solo enciende si su ánodo está hacia el +.
- Un capacitor electrolítico puede reventar si se conecta al revés.

Por eso las pilas, los conectores de CD y los componentes polarizados llevan marcas de + y −. El contacto de la pared, en cambio, es de CA: sus polos cambian constantemente de signo (lección 5.2).

## ¿Quién usa CD?
Casi toda la **electrónica** funciona por dentro con CD: celulares, computadoras, televisores, módems de internet, focos LED, controles remotos, autos (12 V) y autos eléctricos (cientos de voltios en la batería). Aunque los enchufes a la red de CA, dentro llevan un convertidor que entrega CD a sus circuitos.

## El símbolo de la CD
En las etiquetas, la CD se indica con el símbolo **⎓** (una línea continua sobre una discontinua) o con las letras CD, CC o DC. Por ejemplo, la salida de un cargador: «5 V ⎓ 2 A».

## Ventajas y limitaciones
| Ventajas | Limitaciones |
|---|---|
| Se puede almacenar en baterías | Con la tecnología del siglo XIX no se podía cambiar fácilmente su voltaje |
| Es la que necesita la electrónica | Transportarla lejos a bajo voltaje causaba muchas pérdidas |
| Voltaje estable | Interrumpirla con un interruptor produce arcos más difíciles de apagar |

Hoy, gracias a la electrónica de potencia, la CD vuelve con fuerza: líneas de transmisión de **alta tensión en CD** (HVDC), paneles solares, baterías domésticas y autos eléctricos.`,
      vida: "Fíjate en un cargador: dice «Entrada ~» y «Salida ⎓». Convierte la corriente alterna del contacto en directa para la batería del celular, que solo puede cargarse con CD.",
      err: ["Pensar que la corriente directa no puede ser peligrosa: una batería de auto eléctrico tiene cientos de voltios de CD.", "Creer que los aparatos enchufados funcionan con CA por dentro: casi toda la electrónica usa CD.", "Poner las pilas al revés «porque da igual»."],
      ejer: [["Nombra tres fuentes de CD.", "Pilas, paneles solares y puertos USB (también baterías de auto y fuentes de alimentación)."], ["¿Por qué importa la polaridad en CD?", "Porque la corriente siempre va en el mismo sentido; componentes como LED, motores o capacitores electrolíticos dependen de ese sentido."], ["¿Qué símbolo indica CD en una etiqueta?", "⎓ (o las letras CD, CC o DC)."]],
      quiz: [
        { t: "om", p: "La corriente directa…", o: ["Cambia de sentido 60 veces por segundo", "Circula siempre en el mismo sentido", "Solo existe en los rayos", "No tiene voltaje"], c: 1, e: "CD: sentido constante." },
        { t: "om", p: "¿Cuál de estas fuentes produce CD?", o: ["Un contacto de pared", "Un panel solar", "Un alternador sin rectificador", "La red de la ciudad"], c: 1, e: "El panel solar produce corriente directa." },
        { t: "vf", p: "En CD la polaridad (+ y −) no importa.", c: false, e: "Importa: un LED o un motor de CD se comportan distinto si se invierten." },
        { t: "om", p: "La gráfica del voltaje de una pila en el tiempo es…", o: ["Una onda senoidal", "Una línea casi horizontal", "Una serie de picos", "Un círculo"], c: 1, e: "Voltaje constante (baja lentamente al descargarse)." },
        { t: "om", p: "El símbolo ⎓ significa…", o: ["Corriente alterna", "Corriente directa", "Tierra física", "Doble aislamiento"], c: 1, e: "Línea continua sobre discontinua: CD." }
      ],
      res: ["La CD circula siempre en el mismo sentido y su voltaje es casi constante.", "Pilas, baterías, paneles solares y USB dan CD.", "En CD la polaridad importa.", "Casi toda la electrónica funciona por dentro con CD.", "Se indica con ⎓, CD, CC o DC."]
    },
    {
      id: "5-2", t: "La corriente alterna", d: "Por qué cambia de sentido y por qué se usa en la red.", min: 35, e: true, sim: "S7",
      preg: "Si la corriente de tu casa va y viene 60 (o 50) veces por segundo, ¿cómo puede «llegar» energía a la lavadora?",
      obj: ["Definir la corriente alterna.", "Explicar cómo transporta energía aunque los electrones no avancen.", "Explicar las razones por las que la red usa CA."],
      txt: `En la **corriente alterna** ([[CA]]) el voltaje cambia de signo **periódicamente**: durante un instante el primer conductor es positivo respecto del segundo, luego se hace cero, luego negativo, otra vez cero, y vuelta a empezar. La corriente que produce también **cambia de sentido**.

En una red de **60 Hz** (gran parte de América), ese ciclo completo se repite **60 veces por segundo**; en una de **50 Hz** (Europa, gran parte de Sudamérica y otros), 50 veces. Cada ciclo tiene dos cambios de sentido, así que la corriente se invierte 120 o 100 veces por segundo.

## Los electrones no viajan: vibran
En la CA los electrones del cable **no avanzan** hacia el aparato; solo **oscilan** adelante y atrás unas fracciones de milímetro. ¿Cómo llega entonces la energía?
- La energía no la transportan los electrones como si fueran camiones: la transporta el **campo electromagnético** que viaja por los cables.
- En el aparato, los electrones que vibran **chocan** con los átomos de la resistencia y producen calor, o generan fuerzas en un motor, **en cualquiera de los dos sentidos** del movimiento.

Piensa en una sierra de mano: va y viene, pero corta igual en ambos sentidos. O en una cuerda que agitas: la cuerda no se va, pero la onda (y su energía) sí viaja.

## ¿De dónde sale la CA?
Los **generadores** de las centrales hacen girar imanes junto a bobinas (o bobinas dentro de imanes). Al girar, el campo magnético que atraviesa las bobinas aumenta, disminuye y se invierte, induciendo un voltaje que sube, baja y cambia de signo: la CA aparece **de forma natural** al generar electricidad con movimiento giratorio (módulos 7 y 8).

## ¿Por qué la red usa CA?
1. **Se puede cambiar de voltaje fácilmente** con [[transformador|transformadores]], que solo funcionan con CA. Eso permite transmitir en alta tensión (pocas pérdidas) y bajar a {{V}} para las casas (lección 10.3).
2. **Es la que producen los generadores** giratorios.
3. **Los motores de inducción** de CA son robustos, baratos y casi no necesitan mantenimiento.
4. **Es más fácil interrumpirla:** como la corriente pasa por cero 100 o 120 veces por segundo, los arcos de los interruptores se apagan solos.

## Qué funciona directamente con CA
Aparatos de calor (planchas, hervidores, estufas), focos incandescentes, motores de inducción (refrigeradores, lavadoras, ventiladores, bombas). Todo lo electrónico la convierte a CD por dentro.

## CA y peligro
!> La CA de 50/60 Hz es especialmente peligrosa para el cuerpo humano: a esas frecuencias produce contracciones musculares que pueden impedir soltar un cable y puede desordenar el ritmo del corazón. Lo verás en el módulo 13.

En el osciloscopio virtual, elige «Corriente alterna» y observa cómo el voltaje sube, pasa por cero y baja, una y otra vez.`,
      vida: "Si grabas un foco LED barato o un tubo fluorescente en cámara lenta con tu celular, a veces verás que parpadea: es la corriente alterna, que pasa por cero 100 o 120 veces por segundo.",
      err: ["Imaginar que en la CA los electrones viajan desde la central hasta tu casa.", "Pensar que la CA «no transporta energía» porque va y viene.", "Creer que la CA es más segura que la CD por cambiar de sentido."],
      ejer: [["¿Cuántas veces por segundo cambia de sentido una CA de 50 Hz?", "100 veces (dos por ciclo)."], ["Da dos razones por las que la red usa CA.", "Los transformadores (solo funcionan con CA) permiten transmitir en alta tensión, y los generadores giratorios la producen de forma natural."], ["¿Qué aparatos usan la CA directamente?", "Los de calor, los focos incandescentes y los motores de inducción."]],
      quiz: [
        { t: "om", p: "En la corriente alterna, el voltaje…", o: ["Es constante", "Cambia de signo periódicamente", "Siempre es positivo", "Es cero"], c: 1, e: "Sube, baja y se invierte periódicamente." },
        { t: "vf", p: "En la CA los electrones viajan desde la central eléctrica hasta tu casa.", c: false, e: "Solo oscilan en su lugar; lo que viaja es la energía por el campo electromagnético." },
        { t: "om", p: "¿Cuál es la principal razón para usar CA en la red?", o: ["Es más bonita", "Se puede cambiar de voltaje con transformadores", "No es peligrosa", "Se almacena en pilas"], c: 1, e: "Los transformadores permiten transmitir en alta tensión." },
        { t: "num", p: "¿Cuántas veces por segundo cambia de sentido una corriente de 60 Hz?", r: 120, u: "", e: "Dos veces por ciclo: 2 × 60 = 120." },
        { t: "om", p: "¿Qué producen de forma natural los generadores giratorios?", o: ["Corriente directa pura", "Corriente alterna", "Electricidad estática", "Rayos"], c: 1, e: "El giro hace que el flujo magnético aumente, disminuya y se invierta." }
      ],
      res: ["En la CA el voltaje y la corriente cambian de sentido periódicamente.", "En la red, 50 o 60 ciclos por segundo.", "Los electrones solo oscilan; la energía viaja por el campo electromagnético.", "La red usa CA porque permite usar transformadores y la producen los generadores.", "Toda la electrónica convierte la CA en CD por dentro."]
    },
    {
      id: "5-3", t: "La onda senoidal", d: "Amplitud, ciclo, periodo y fase; leer una gráfica de osciloscopio.", min: 40, e: true, sim: "S7",
      preg: "¿Qué forma tiene exactamente el voltaje de un contacto si lo dibujamos en el tiempo?",
      obj: ["Describir la forma y las partes de una onda senoidal.", "Leer amplitud y periodo en un osciloscopio.", "Entender qué es la fase."],
      txt: `El voltaje de la red no sube y baja de cualquier manera: sigue una curva suave y perfectamente regular llamada [[onda senoidal]] (o sinusoide), la misma que describe la sombra de un punto que gira en círculo.

## ¿Por qué senoidal?
Un generador tiene una bobina que **gira a velocidad constante** dentro de un campo magnético (o un imán que gira dentro de bobinas). El voltaje inducido depende de lo rápido que cambia el flujo magnético, y para un giro uniforme ese cambio sigue la función **seno** del ángulo de giro. Por eso:

= v(t) = Vpico · sen(2π · f · t)

No te preocupes por la trigonometría: lo importante es la forma y sus partes.

## Las partes de la onda
- **Ciclo:** un recorrido completo: sube desde cero hasta el máximo, baja hasta cero, sigue bajando hasta el mínimo y vuelve a cero.
- **Amplitud o voltaje pico (Vpico):** el valor máximo que alcanza, por encima o por debajo de cero.
- **Voltaje pico a pico (Vpp):** la distancia del máximo al mínimo: Vpp = 2 · Vpico.
- **Periodo (T):** el tiempo que dura un ciclo. En 60 Hz, 16,7 milisegundos; en 50 Hz, 20 ms.
- **Frecuencia (f):** cuántos ciclos hay en un segundo (lección 5.4).
- **Valor eficaz (Vrms):** el valor «equivalente» que se anuncia como voltaje de la red (lección 5.5).

## Leer un osciloscopio
Un [[osciloscopio]] dibuja el voltaje (eje vertical) frente al tiempo (eje horizontal) sobre una cuadrícula:
- Cada cuadro horizontal es un tiempo fijo, por ejemplo **5 ms/div** (5 milisegundos por división).
- Cada cuadro vertical es un voltaje fijo, por ejemplo **100 V/div**.

Para medir:
1. **Amplitud:** cuenta los cuadros desde la línea central hasta el pico y multiplica por los V/div.
2. **Periodo:** cuenta los cuadros que ocupa un ciclo completo y multiplica por los ms/div.
3. **Frecuencia:** f = 1 / T.

Ejemplo: si un ciclo ocupa 4 divisiones a 5 ms/div, T = 20 ms y f = 1 / 0,020 = 50 Hz.

En el osciloscopio virtual de esta lección, la escala es de **5 ms por división**: comprueba que a 60 Hz un ciclo ocupa algo más de 3 divisiones (16,7 ms) y a 50 Hz exactamente 4 (20 ms). Las líneas punteadas marcan el valor pico y el eficaz.

## La fase
Dos ondas de la misma frecuencia pueden estar **desplazadas** en el tiempo: una alcanza su pico un poco antes que la otra. Esa diferencia se llama **desfase** y se mide en grados (un ciclo completo = 360°).
- En la red **trifásica**, las tres fases están desfasadas **120°** entre sí (lección 5.8).
- En circuitos con bobinas o capacitores, la corriente se adelanta o se retrasa respecto del voltaje.

## Ondas no senoidales
No toda la CA es senoidal. Los **inversores** baratos producen ondas **cuadradas** o «senoidales modificadas»; las fuentes electrónicas deforman la corriente de la red (armónicos). La onda senoidal es la ideal porque los motores y transformadores funcionan mejor con ella y produce menos interferencias.`,
      form: [["v(t) = Vpico · sen(2π · f · t)", "Ecuación de la onda senoidal."], ["Vpp = 2 · Vpico", "Voltaje pico a pico."], ["T = 1 / f", "Periodo a partir de la frecuencia."]],
      ej: { enun: "En un osciloscopio a 2 ms/div y 50 V/div, una onda tiene su pico a 3,6 divisiones del centro y un ciclo ocupa 8,3 divisiones. Calcula Vpico, Vpp, T y f.", pasos: ["Vpico = 3,6 × 50 = 180 V.", "Vpp = 2 × 180 = 360 V.", "T = 8,3 × 2 ms = 16,6 ms.", "f = 1 / 0,0166 ≈ 60 Hz."], res: "Vpico ≈ 180 V, Vpp ≈ 360 V, T ≈ 16,6 ms, f ≈ 60 Hz: es la red de 127 V." },
      vida: "Las bocinas reproducen sonidos que también son ondas: un tono puro (como el de un diapasón) es una onda senoidal; la voz y la música son combinaciones de muchas senoidales de distintas frecuencias.",
      err: ["Confundir el voltaje pico con el pico a pico.", "Leer las divisiones del osciloscopio sin multiplicarlas por la escala.", "Pensar que la amplitud depende de la frecuencia."],
      ejer: [["Una onda tiene Vpico = 325 V. ¿Cuánto vale Vpp?", "650 V."], ["Un ciclo ocupa 4 divisiones a 5 ms/div. ¿Frecuencia?", "T = 20 ms; f = 50 Hz."], ["¿Cuántos grados de desfase hay entre las fases de un sistema trifásico?", "120°."]],
      quiz: [
        { t: "om", p: "¿Cómo se llama el valor máximo de una onda senoidal?", o: ["Periodo", "Voltaje pico o amplitud", "Frecuencia", "Fase"], c: 1, e: "Es la amplitud o voltaje pico." },
        { t: "num", p: "Una onda tiene Vpico = 170 V. ¿Cuánto vale Vpp?", r: 340, u: "V", e: "Vpp = 2 × 170 = 340 V." },
        { t: "num", p: "En un osciloscopio a 5 ms/div, un ciclo ocupa 4 divisiones. ¿Cuál es la frecuencia en Hz?", r: 50, u: "Hz", e: "T = 20 ms; f = 1/0,02 = 50 Hz." },
        { t: "vf", p: "La onda senoidal aparece porque los generadores giran a velocidad constante.", c: true, e: "El giro uniforme produce un voltaje que sigue la función seno." },
        { t: "om", p: "Un ciclo completo equivale a…", o: ["90°", "180°", "360°", "120°"], c: 2, e: "Un ciclo = 360°." }
      ],
      res: ["El voltaje de la red es una onda senoidal.", "Sus partes: ciclo, voltaje pico, pico a pico, periodo y frecuencia.", "En un osciloscopio se cuentan divisiones y se multiplica por la escala.", "La fase es el desplazamiento entre dos ondas; en trifásica es de 120°.", "La onda senoidal sale del giro uniforme de los generadores."]
    },
    {
      id: "5-4", t: "La frecuencia", d: "El hertz, T = 1/f, el mapa de 50 Hz y 60 Hz, el parpadeo y los relojes.", min: 30, e: true, calc: "C12",
      preg: "¿Por qué en algunos países la red es de 50 Hz y en otros de 60 Hz? ¿Importa si viajas con tu cargador?",
      obj: ["Definir la frecuencia y su unidad.", "Calcular el periodo a partir de la frecuencia y viceversa.", "Saber qué aparatos dependen de la frecuencia de la red."],
      txt: `La [[frecuencia]] es el **número de ciclos completos que hace una onda en un segundo**. Se mide en [[hertz]] (**Hz**), en honor al físico alemán Heinrich Hertz: 1 Hz = 1 ciclo por segundo.

= f = 1 / T     T = 1 / f

| Frecuencia | Periodo |
|---|---|
| 50 Hz | 20 ms |
| 60 Hz | 16,7 ms |
| 1 kHz | 1 ms |
| 100 MHz (radio FM) | 10 ns |
| 2,4 GHz (wifi, microondas) | 0,42 ns |

## 50 Hz o 60 Hz: el mapa del mundo
Las primeras redes eléctricas, a fines del siglo XIX, usaban frecuencias muy diversas (25, 40, 50, 60, 133 Hz…). Con el tiempo se impusieron dos:
- **60 Hz:** Estados Unidos, Canadá, México, Centroamérica, Colombia, Venezuela, Ecuador, Perú (centro), Brasil, Filipinas, Corea del Sur, Taiwán, parte de Japón y otros.
- **50 Hz:** Europa (incluida España), Argentina, Chile, Uruguay, Paraguay, Bolivia, África, la mayor parte de Asia, Australia y parte de Japón.

La elección fue sobre todo histórica: los fabricantes estadounidenses (Westinghouse) adoptaron 60 Hz y los alemanes (AEG) 50 Hz, y cada uno exportó su sistema. Ninguna es claramente mejor: 60 Hz permite transformadores un poco más pequeños; 50 Hz tiene algo menos de pérdidas en líneas largas. Japón es un caso curioso: la mitad oriental usa 50 Hz y la occidental 60 Hz, con estaciones convertidoras entre ambas.

## ¿Importa al viajar?
- **Cargadores y fuentes electrónicas:** la mayoría dicen «100–240 V ~ 50/60 Hz»: funcionan en cualquier país (solo necesitas un adaptador de clavija).
- **Aparatos con motor de inducción** (algunos ventiladores, bombas, relojes de motor síncrono): a 50 Hz giran un 17 % más despacio que a 60 Hz.
- **Relojes de pared eléctricos antiguos:** cuentan los ciclos de la red; uno de 60 Hz en una red de 50 Hz atrasa 10 minutos cada hora.
- **Aparatos de calor** (planchas, secadoras): la frecuencia casi no importa, pero **el voltaje sí**: un aparato de 127 V conectado a 230 V se quema.

!> Antes de conectar un aparato en otro país, lee su etiqueta: si no dice «100–240 V», necesitas un transformador o un aparato distinto.

## La frecuencia como pulso de la red
La frecuencia de la red no es exactamente fija: si en un momento se consume más energía de la que se genera, los generadores se frenan un poquito y la frecuencia baja (por ejemplo, a 59,95 Hz). Los operadores de la red vigilan la frecuencia segundo a segundo para equilibrar la generación y el consumo (lección 10.7).

## Parpadeo
Un foco incandescente no parpadea porque su filamento tarda en enfriarse. Pero algunos LED y fluorescentes baratos sí parpadean al doble de la frecuencia de la red (100 o 120 veces por segundo). El ojo no lo nota, pero la cámara del celular a veces sí, como franjas en la imagen.`,
      form: [["f = 1 / T", "Frecuencia (Hz) a partir del periodo (s)."], ["T = 1 / f", "Periodo a partir de la frecuencia."]],
      ej: { enun: "Calcula el periodo de la red de 60 Hz y de 50 Hz, y cuántos ciclos hay en un minuto en cada una.", pasos: ["60 Hz: T = 1 / 60 = 0,016 67 s = 16,7 ms.", "50 Hz: T = 1 / 50 = 0,02 s = 20 ms.", "Ciclos por minuto: 60 Hz × 60 s = 3 600; 50 Hz × 60 s = 3 000."], res: "16,7 ms y 20 ms; 3 600 y 3 000 ciclos por minuto." },
      vida: "Los hornos de microondas funcionan a 2,45 GHz, el wifi a 2,4 o 5 GHz y la radio FM alrededor de 100 MHz: todo son ondas con su frecuencia, como la red pero muchísimo más rápidas.",
      err: ["Pensar que un aparato de 60 Hz no funciona en absoluto a 50 Hz: muchos sí, pero los motores cambian de velocidad.", "Preocuparse solo por la frecuencia y olvidar el voltaje al viajar.", "Confundir hertz con ciclos por minuto."],
      ejer: [["¿Qué frecuencia tiene una onda de periodo 4 ms?", "250 Hz."], ["¿Cuál es el periodo de una onda de 1 kHz?", "1 ms."], ["Un motor síncrono gira a 1 800 rpm a 60 Hz. ¿A cuánto girará a 50 Hz?", "1 800 × 50 / 60 = 1 500 rpm."]],
      quiz: [
        { t: "om", p: "¿Qué mide la frecuencia?", o: ["El voltaje máximo", "Los ciclos por segundo", "La corriente", "La potencia"], c: 1, e: "Ciclos por segundo, en hertz." },
        { t: "num", p: "¿Cuál es el periodo de una CA de 50 Hz, en segundos?", r: 0.02, u: "s", e: "T = 1/50 = 0,02 s = 20 ms." },
        { t: "num", p: "Una onda tiene un periodo de 0,01 s. ¿Cuál es su frecuencia?", r: 100, u: "Hz", e: "f = 1/0,01 = 100 Hz." },
        { t: "om", p: "Un cargador dice «100–240 V ~ 50/60 Hz». Esto significa que…", o: ["Solo funciona en Europa", "Funciona en casi cualquier país con un adaptador de clavija", "Solo funciona a 60 Hz", "Es de corriente directa"], c: 1, e: "Acepta ambos voltajes y ambas frecuencias." },
        { t: "vf", p: "España usa una red de 50 Hz y México una de 60 Hz.", c: true, e: "Europa usa 50 Hz; México, 60 Hz." }
      ],
      res: ["La frecuencia son los ciclos por segundo; se mide en hertz.", "f = 1/T: 60 Hz → 16,7 ms; 50 Hz → 20 ms.", "El mundo se divide en redes de 50 Hz y de 60 Hz.", "Los cargadores modernos funcionan en ambas; los motores cambian de velocidad.", "La frecuencia es el pulso de la red: baja si falta generación."]
    },
    {
      id: "5-5", t: "Valores pico, pico a pico y eficaz (RMS)", d: "Vrms = Vpico/√2: por qué 120 V «son» 170 V de pico.", min: 45, sim: "S7", calc: "C12",
      preg: "Si el voltaje de la red sube y baja todo el tiempo, ¿qué significa decir que es de 127 V o de 230 V?",
      obj: ["Definir el valor eficaz (RMS) de una corriente alterna.", "Convertir entre valor eficaz, pico y pico a pico.", "Explicar por qué se usa el valor eficaz para describir la red."],
      txt: `El voltaje de la red cambia constantemente: pasa por cero, sube hasta un máximo, vuelve a cero, baja hasta un mínimo… Entonces, ¿qué número lo describe? Hay varios valores posibles, y conviene no confundirlos.

## Los tres valores principales
- **Voltaje pico (Vpico):** el máximo instantáneo.
- **Voltaje pico a pico (Vpp):** del máximo al mínimo, el doble del pico.
- **Voltaje eficaz (Vrms):** el que se anuncia y el que miden los multímetros.

## ¿Qué es el valor eficaz?
El [[RMS|valor eficaz]] de una corriente alterna es **el valor de una corriente directa que produciría el mismo calor** en la misma resistencia.

Imagina una plancha conectada a la red de 127 V de CA. Si la conectaras a una fuente de **CD de 127 V**, se calentaría **exactamente igual**. Por eso decimos que la red es de 127 V: no es el máximo, es el valor **equivalente en efecto térmico**.

El nombre RMS viene del inglés *root mean square* (raíz cuadrática media): se elevan al cuadrado los valores instantáneos, se promedian y se saca la raíz. Para una onda **senoidal**, el resultado es muy sencillo:

= Vrms = Vpico / √2 ≈ 0,707 · Vpico
= Vpico = Vrms · √2 ≈ 1,414 · Vrms

## Los números de la red
| Red | Vrms (anunciado) | Vpico | Vpico a pico |
|---|---|---|---|
| 120 V | 120 V | 170 V | 340 V |
| 127 V | 127 V | 180 V | 359 V |
| 220 V | 220 V | 311 V | 622 V |
| 230 V | 230 V | 325 V | 650 V |

Tu red elegida en Ajustes es de **{{V}}**, con un pico de unos **{{VP}}**.

## ¿Por qué importa?
1. **Cálculo de potencia:** con valores eficaces, las fórmulas de CD (P = V·I, P = V²/R) funcionan igual en CA para resistencias. Una plancha de 1 270 W a 127 V pide 10 A eficaces.
2. **Aislamiento:** los cables, capacitores y componentes deben soportar el **pico**, no el eficaz. Un capacitor conectado a una red de 230 V debe aguantar al menos 325 V (y en la práctica se pide mucho más, por los picos transitorios).
3. **Rectificadores:** al convertir CA en CD con diodos y un capacitor, el capacitor se carga hasta casi el **pico**. Por eso, al rectificar la red de 230 V, se obtienen unos 325 V de CD (¡muy peligrosos!) dentro de las fuentes de los aparatos.
4. **Seguridad:** el voltaje que «empuja» la corriente en el instante del pico es mayor que el anunciado.

## El valor promedio
Si promedias una onda senoidal completa, el resultado es **cero**: sube tanto como baja. Por eso no sirve para describirla. A veces se usa el promedio de **media onda**, que es 2/π ≈ 0,637 del pico, sobre todo en rectificadores.

?> Las fórmulas Vpico = √2 · Vrms solo valen para ondas **senoidales**. Para ondas cuadradas o deformadas, el valor eficaz se calcula de otra forma, y los multímetros baratos pueden medir mal: los buenos indican «RMS verdadero».

Comprueba en el osciloscopio virtual las líneas de pico y de valor eficaz para 127 V y 230 V, y usa la calculadora C12 para convertir cualquier valor.`,
      form: [["Vrms = Vpico / √2 ≈ 0,707 · Vpico", "Valor eficaz de una onda senoidal."], ["Vpico = √2 · Vrms ≈ 1,414 · Vrms", "Valor pico a partir del eficaz."], ["Vpp = 2 · Vpico", "Valor pico a pico."], ["Irms = Ipico / √2", "Igual para la corriente."]],
      ej: { enun: "La red de un país es de 230 V eficaces. Calcula el voltaje pico y el pico a pico. ¿Qué voltaje mínimo debería soportar un capacitor conectado directamente a ella?", pasos: ["Vpico = 230 × 1,414 ≈ 325 V.", "Vpp = 2 × 325 = 650 V.", "El capacitor debe soportar al menos el pico: más de 325 V (en la práctica se eligen 400 V o más)."], res: "Vpico ≈ 325 V; Vpp ≈ 650 V; capacitor de al menos 400 V por seguridad." },
      vida: "Los multímetros miden el valor eficaz en la escala V~. Si mides un contacto de 127 V verás algo entre 115 y 135 V según la hora del día, aunque el voltaje real llegue a unos 180 V en cada pico.",
      err: ["Creer que el voltaje de la red nunca supera el valor anunciado.", "Usar el pico para calcular la potencia de una plancha.", "Aplicar √2 a ondas que no son senoidales."],
      ejer: [["Vrms = 120 V. ¿Vpico?", "≈ 170 V."], ["Vpico = 311 V. ¿Vrms?", "≈ 220 V."], ["Una corriente de 10 A eficaces, ¿qué pico tiene?", "≈ 14,1 A."], ["Un calefactor da el mismo calor con 127 V de CA que con… ¿cuántos voltios de CD?", "127 V de CD: esa es la definición de valor eficaz."]],
      quiz: [
        { t: "om", p: "El valor eficaz de una CA es…", o: ["Su valor máximo", "El valor de CD que produce el mismo calor", "Su promedio, que es cero", "La mitad del pico"], c: 1, e: "Es la equivalencia térmica con la CD." },
        { t: "num", p: "¿Cuál es el voltaje pico de una red de 127 V eficaces?", r: 179.6, u: "V", e: "127 × 1,414 ≈ 179,6 V." },
        { t: "num", p: "Una onda senoidal tiene 325 V de pico. ¿Cuál es su valor eficaz?", r: 229.8, u: "V", e: "325 / 1,414 ≈ 230 V." },
        { t: "vf", p: "Los componentes conectados a la red deben soportar el voltaje pico, no solo el eficaz.", c: true, e: "En cada ciclo el voltaje llega al pico." },
        { t: "om", p: "Para una onda senoidal, Vrms es aproximadamente…", o: ["0,5 × Vpico", "0,637 × Vpico", "0,707 × Vpico", "1,414 × Vpico"], c: 2, e: "Vrms = Vpico / √2 ≈ 0,707 × Vpico." }
      ],
      res: ["Valor pico: el máximo; pico a pico: el doble.", "Valor eficaz (RMS): el de CD que produce el mismo calor.", "Para senoidales: Vrms = Vpico/√2 y Vpico = 1,414·Vrms.", "127 V eficaces son unos 180 V de pico; 230 V son unos 325 V.", "Los aislamientos y capacitores deben soportar el pico."]
    },
    {
      id: "5-6", t: "La guerra de las corrientes", d: "Edison frente a Tesla y Westinghouse: por qué ganó la CA.", min: 30,
      preg: "¿Por qué tu casa tiene corriente alterna si la primera red eléctrica del mundo fue de corriente directa?",
      obj: ["Narrar la competencia entre la CD y la CA a fines del siglo XIX.", "Explicar las razones técnicas del triunfo de la CA.", "Reconocer por qué la CD vuelve hoy en ciertos usos."],
      txt: `A finales del siglo XIX, la electricidad empezaba a llegar a las ciudades. Dos sistemas compitieron por convertirse en el estándar, en una pelea tan dura que se conoce como **la guerra de las corrientes**.

## El sistema de Edison: corriente directa
En 1882, [Thomas Edison](#/personajes/edison) inauguró en la calle Pearl de Nueva York la primera central eléctrica comercial, que distribuía **corriente directa a 110 V** para iluminar oficinas con sus focos incandescentes. Era un sistema seguro y fiable, y funcionaba bien con los motores de CD de la época.

Su gran problema: **la distancia**. A 110 V, para llevar mucha potencia hacían falta corrientes grandes, y las pérdidas en los cables (I²·R) eran enormes. Una central de CD solo podía abastecer a clientes a menos de **2 km**. Para cubrir una ciudad habría que construir centrales en cada barrio.

## El sistema de Tesla y Westinghouse: corriente alterna
[Nikola Tesla](#/personajes/tesla), que había trabajado brevemente para Edison, desarrolló el **motor de inducción** y un sistema completo de **corriente alterna polifásica**. [George Westinghouse](#/personajes/westinghouse) compró sus patentes y las combinó con el **transformador**, perfeccionado en Europa por Gaulard, Gibbs y otros.

La clave era que con CA se podía:
1. **Elevar** el voltaje con un transformador para transportar la energía lejos con poca corriente y pocas pérdidas.
2. **Reducirlo** de nuevo cerca de los usuarios a un valor seguro.

## Una guerra sucia
Edison, que tenía grandes inversiones en la CD, lanzó una campaña para presentar la CA como mortalmente peligrosa. Se organizaron demostraciones públicas electrocutando animales, y un colaborador de su entorno, Harold Brown, promovió el uso de la CA en la primera **silla eléctrica** (1890), para asociarla con la muerte. Ambos bandos se acusaron de todo en los periódicos.

## La victoria de la CA
Dos acontecimientos decidieron la guerra:
- **1893:** Westinghouse ganó el contrato para iluminar la **Exposición Mundial de Chicago** con CA: cien mil lámparas que maravillaron a millones de visitantes.
- **1896:** se inauguró la central hidroeléctrica de las **cataratas del Niágara**, que con CA y transformadores enviaba energía a la ciudad de Buffalo, a 40 km.

A partir de ahí, la CA se convirtió en el estándar mundial. Incluso la empresa de Edison (que acabaría formando parte de General Electric) adoptó la CA. Las últimas redes de CD de Nueva York se apagaron en **2007**.

## El regreso de la CD
Hoy la historia da un giro: con la **electrónica de potencia** se puede convertir CD en CA y cambiar su voltaje con eficiencia. Por eso la CD regresa:
- **Líneas HVDC** (alta tensión en CD) para distancias muy largas o cables submarinos, con menos pérdidas que la CA.
- **Paneles solares y baterías**, que son de CD por naturaleza.
- **Autos eléctricos y centros de datos.**

La «guerra» terminó en empate técnico: cada tipo de corriente se usa donde es mejor.`,
      vida: "Cada vez que usas un transformador de poste o un cargador, estás usando la idea que ganó la guerra de las corrientes: cambiar el voltaje de la CA para transportarla y usarla.",
      err: ["Creer que Edison «inventó la electricidad» o que Tesla «inventó la CA»: hubo muchos inventores implicados.", "Pensar que la CD es «peor» en todo: hoy se usa en transmisión de muy larga distancia.", "Creer que la guerra fue solo técnica: también hubo intereses económicos y propaganda."],
      ejer: [["¿Cuál era el principal problema de la CD de Edison?", "No se podía cambiar su voltaje fácilmente, así que transportarla lejos a 110 V causaba grandes pérdidas."], ["¿Qué dos acontecimientos decidieron la guerra?", "La iluminación de la Exposición de Chicago (1893) y la central del Niágara (1896)."], ["Menciona un uso actual de la CD en alta tensión.", "Las líneas HVDC para distancias muy largas o cables submarinos."]],
      quiz: [
        { t: "om", p: "¿Qué tipo de corriente distribuía la central de Edison en 1882?", o: ["Alterna", "Directa", "Trifásica", "Estática"], c: 1, e: "Corriente directa a 110 V." },
        { t: "om", p: "¿Qué invento fue clave para el triunfo de la CA?", o: ["La pila", "El transformador", "El foco", "El pararrayos"], c: 1, e: "Permitió elevar y reducir el voltaje." },
        { t: "om", p: "¿Quién desarrolló el motor de inducción de CA?", o: ["Edison", "Volta", "Tesla", "Ohm"], c: 2, e: "Nikola Tesla." },
        { t: "vf", p: "Hoy se vuelven a construir líneas de transmisión de corriente directa en alta tensión.", c: true, e: "Las líneas HVDC se usan para distancias muy largas y cables submarinos." },
        { t: "ord", p: "Ordena cronológicamente:", o: ["Central de Pearl Street de Edison (CD)", "Exposición de Chicago iluminada con CA", "Central del Niágara con CA", "Últimas redes de CD de Nueva York apagadas"], e: "1882, 1893, 1896 y 2007." }
      ],
      res: ["Edison impulsó la CD; Tesla y Westinghouse, la CA.", "La CD de entonces no podía transportarse lejos sin grandes pérdidas.", "El transformador permitió a la CA transmitir en alta tensión.", "Chicago (1893) y el Niágara (1896) dieron la victoria a la CA.", "Hoy la CD regresa en HVDC, energía solar, baterías y autos eléctricos."]
    },
    {
      id: "5-7", t: "Convertir CA y CD", d: "Rectificador, cargadores y adaptadores, fuentes conmutadas e inversores.", min: 35, sim: "S7", exp: ["e-etiquetas", "e-estroboscopico"],
      preg: "¿Qué hay dentro del cargador del celular que convierte los {{V}} de CA en 5 V de CD?",
      obj: ["Explicar cómo un rectificador convierte CA en CD.", "Distinguir los tipos de adaptadores y fuentes.", "Explicar para qué sirve un inversor."],
      txt: `La red entrega CA, pero casi toda la electrónica necesita CD. Al revés, los paneles solares y las baterías dan CD, pero los aparatos de casa esperan CA. Por eso existen convertidores en ambos sentidos.

## De CA a CD: el rectificador
El [[rectificador]] usa **diodos**, componentes que solo dejan pasar la corriente en un sentido (lección 14.5).
1. **Media onda:** un solo diodo deja pasar solo los semiciclos positivos. Resultado: pulsos de una sola polaridad, con huecos.
2. **Onda completa:** un **puente de cuatro diodos** «voltea» los semiciclos negativos. Resultado: una sucesión de jorobas, todas positivas.
3. **Filtrado:** un **capacitor** grande se carga en cada joroba y se descarga lentamente entre ellas, alisando el voltaje hasta algo casi constante con un pequeño rizado.
4. **Regulación:** un circuito regulador elimina el rizado y fija el voltaje exacto (5 V, 12 V…).

En el osciloscopio virtual de esta lección puedes ver la onda alterna, la rectificada de media onda y la de onda completa.

## Los adaptadores de antes y de ahora
- **Adaptador con transformador** (los antiguos, pesados): un transformador baja el voltaje de la red a, por ejemplo, 9 V de CA, y luego se rectifica y se filtra. Pesados y poco eficientes.
- **Fuente conmutada** (los cargadores actuales, ligeros): rectifica directamente la red (obteniendo unos 180 o 325 V de CD), la «trocea» a decenas de miles de hertz con transistores, usa un transformador diminuto de alta frecuencia y vuelve a rectificar. Son pequeños, ligeros y eficientes (85–95 %), y aceptan de 100 a 240 V.

!> Dentro de un cargador conmutado hay CD de hasta 325 V en un capacitor que puede seguir cargado después de desenchufarlo. **Nunca** abras un cargador ni una fuente de alimentación.

## De CD a CA: el inversor
Un [[inversor]] hace lo contrario: con transistores que conmutan muy rápido, convierte la CD de una batería o de unos paneles solares en CA de {{V}} y {{HZ}}.
- Los **inversores de onda senoidal pura** producen una onda limpia, apta para cualquier aparato.
- Los de **onda senoidal modificada** (cuadrada escalonada) son más baratos, pero algunos motores y equipos se calientan o hacen ruido con ellos.

Se usan en sistemas solares, en autos (para enchufar una laptop), en los **no-break** (UPS) que mantienen la computadora funcionando durante un apagón, y en los autos eléctricos para alimentar el motor.

## De CD a CD
Los **convertidores CD-CD** cambian el voltaje de la CD: por ejemplo, de los 12 V del auto a los 5 V del USB, o de los 3,7 V de la batería del celular a los voltajes que necesita su procesador.

## Leer la etiqueta
Un cargador típico dice: «**Entrada: 100–240 V ~ 50/60 Hz 0,3 A. Salida: 5 V ⎓ 2 A**». Traducción: acepta cualquier red del mundo, consume como máximo 0,3 A de la red y entrega 5 V de CD con un máximo de 2 A (10 W).`,
      vida: "El no-break (UPS) de una computadora tiene una batería de CD y un inversor: cuando se va la luz, el inversor convierte la CD de la batería en CA en milisegundos y la computadora no se apaga.",
      err: ["Pensar que el cargador solo «baja» el voltaje: también lo rectifica y regula.", "Creer que un cargador desenchufado es completamente seguro por dentro: sus capacitores pueden seguir cargados.", "Usar un inversor de onda modificada con equipos sensibles."],
      ejer: [["¿Qué componente convierte la CA en CD?", "El rectificador, formado por diodos."], ["¿Para qué sirve el capacitor después del puente de diodos?", "Para alisar el voltaje pulsante y acercarlo a una CD constante."], ["¿Qué aparato convierte la CD de una batería en CA de la red?", "El inversor."]],
      quiz: [
        { t: "om", p: "¿Qué hace un rectificador?", o: ["Convierte CD en CA", "Convierte CA en CD", "Sube el voltaje", "Mide la corriente"], c: 1, e: "Con diodos, deja pasar la corriente en un solo sentido." },
        { t: "om", p: "¿Qué dispositivo convierte la CD de unos paneles solares en CA para la casa?", o: ["Un rectificador", "Un inversor", "Un fusible", "Un diodo"], c: 1, e: "El inversor." },
        { t: "vf", p: "Dentro de un cargador conmutado puede haber CD de más de 300 V.", c: true, e: "Rectifica directamente la red; por eso nunca hay que abrirlo." , crit: true },
        { t: "om", p: "Un puente de cuatro diodos produce…", o: ["Rectificación de media onda", "Rectificación de onda completa", "Corriente alterna", "Un cortocircuito"], c: 1, e: "Voltea los semiciclos negativos." },
        { t: "om", p: "«Salida: 5 V ⎓ 2 A» significa que el cargador entrega…", o: ["5 V de CA y 2 A", "5 V de CD con un máximo de 2 A", "2 V y 5 A", "10 V de CD"], c: 1, e: "⎓ es CD; 2 A es la corriente máxima (10 W)." }
      ],
      res: ["El rectificador (diodos) convierte CA en CD; el capacitor la alisa.", "Los cargadores modernos son fuentes conmutadas: pequeños y eficientes.", "Dentro de un cargador hay voltajes peligrosos: nunca se abre.", "El inversor convierte CD en CA (solar, UPS, autos).", "La etiqueta indica entrada (~) y salida (⎓)."]
    },
    {
      id: "5-8", t: "Monofásica y trifásica", d: "Introducción a las fases; por qué la industria usa trifásica; 120/208 V y 230/400 V.", min: 35,
      preg: "¿Por qué del poste de tu calle salen tres o cuatro cables, pero a tu casa llegan solo dos o tres?",
      obj: ["Distinguir los sistemas monofásico y trifásico.", "Explicar las ventajas de la corriente trifásica.", "Conocer los voltajes de fase y de línea más comunes."],
      txt: `La CA que llega a la mayoría de las casas es **monofásica**: una sola onda senoidal entre dos conductores, la **fase** y el **neutro**. Pero la electricidad se genera, transmite y usa en la industria en forma **trifásica**.

## ¿Qué es la corriente trifásica?
Un sistema [[trifásica|trifásico]] tiene **tres fases**: tres ondas senoidales de la misma frecuencia y amplitud, **desfasadas 120°** entre sí (un tercio de ciclo). Cuando una está en su pico, las otras dos están en valores negativos, y así sucesivamente: las tres «se turnan».

Se generan de forma natural poniendo **tres bobinas** separadas 120° alrededor del rotor de un generador.

## Ventajas de la trifásica
1. **Potencia constante:** en monofásica la potencia entregada pulsa (sube y baja 100 o 120 veces por segundo). En trifásica, la suma de las tres fases da una potencia **constante**: los motores giran más suaves.
2. **Motores más simples:** las tres fases crean un **campo magnético giratorio** que hace girar un motor de inducción sin necesidad de condensadores de arranque (lección 8.4).
3. **Menos cobre:** para transmitir la misma potencia, el sistema trifásico necesita menos material conductor que tres circuitos monofásicos separados; con cargas equilibradas, el neutro casi no lleva corriente.
4. **Más potencia** por instalación: talleres, fábricas, edificios y bombas grandes usan trifásica.

## Voltaje de fase y voltaje de línea
En un sistema trifásico con neutro hay dos voltajes:
- **Voltaje de fase (fase–neutro):** el que usan las casas.
- **Voltaje de línea (fase–fase):** entre dos fases; es **√3 ≈ 1,73 veces** mayor.

= V(línea) = √3 · V(fase)

| Sistema | Fase–neutro | Fase–fase |
|---|---|---|
| América (60 Hz) | 120 o 127 V | 208 o 220 V |
| Europa y otros (50 Hz) | 230 V | 400 V |

Por eso, en México, entre dos fases hay unos 220 V (127 × 1,73), que se usan para aires acondicionados o estufas eléctricas; y en España, los motores trifásicos de un taller funcionan a 400 V.

?> En Estados Unidos y Canadá es común otro sistema en las casas: **fase partida** de 120/240 V, con dos fases de 120 V opuestas y un neutro.

## ¿Qué llega a tu casa?
Del transformador del poste salen normalmente las tres fases y el neutro, que recorren la calle. Cada casa se conecta a **una fase y el neutro** (monofásica), y las casas se reparten entre las tres fases para que la carga quede equilibrada. Las casas grandes o con equipos especiales pueden tener **dos o tres fases**.

!> Entre dos fases hay más voltaje que entre fase y neutro. Toda manipulación de un tablero trifásico es exclusiva de electricistas calificados.

## Dónde se usa la trifásica
Centrales y líneas de transmisión, subestaciones, fábricas, talleres, elevadores, bombas de agua de edificios, cargadores rápidos de autos eléctricos y grandes equipos de aire acondicionado.`,
      form: [["V(línea) = √3 · V(fase) ≈ 1,73 · V(fase)", "Voltaje entre dos fases en un sistema trifásico."], ["Desfase entre fases = 120°", "Las tres ondas se reparten el ciclo."]],
      ej: { enun: "En un sistema trifásico con 127 V entre fase y neutro, ¿qué voltaje hay entre dos fases? ¿Y en uno de 230 V?", pasos: ["V(línea) = √3 × V(fase).", "127 × 1,732 ≈ 220 V.", "230 × 1,732 ≈ 398 V ≈ 400 V."], res: "220 V entre fases en la red de 127 V; 400 V en la de 230 V." },
      vida: "Los cargadores rápidos de autos eléctricos y los elevadores de los edificios usan trifásica. En el campo, las bombas de riego grandes también.",
      err: ["Creer que las tres fases son «tres corrientes distintas» sin relación: son la misma frecuencia desfasada 120°.", "Pensar que entre dos fases hay el doble del voltaje de fase: es √3 veces.", "Suponer que todas las casas son trifásicas."],
      ejer: [["¿Cuántos grados están desfasadas las fases de un sistema trifásico?", "120°."], ["Si el voltaje de fase es de 120 V, ¿cuál es el de línea?", "120 × 1,73 ≈ 208 V."], ["Menciona dos ventajas de la trifásica.", "Potencia constante (motores suaves) y campo giratorio para motores simples; también menos cobre."]],
      quiz: [
        { t: "om", p: "En un sistema trifásico, las fases están desfasadas…", o: ["90°", "120°", "180°", "360°"], c: 1, e: "Un tercio de ciclo: 120°." },
        { t: "num", p: "Con 230 V entre fase y neutro, ¿qué voltaje hay entre dos fases? (aprox.)", r: 398, u: "V", e: "230 × 1,732 ≈ 398 V ≈ 400 V." },
        { t: "om", p: "La mayoría de las casas reciben…", o: ["Corriente trifásica", "Corriente monofásica (una fase y neutro)", "Corriente directa", "Alta tensión"], c: 1, e: "Una fase y el neutro." },
        { t: "vf", p: "Una ventaja de la trifásica es que su potencia total es constante.", c: true, e: "La suma de las tres fases no pulsa." },
        { t: "om", p: "¿Dónde es común la corriente trifásica?", o: ["En pilas", "En fábricas, talleres y elevadores", "En celulares", "En linternas"], c: 1, e: "Para motores y cargas grandes." }
      ],
      res: ["Las casas suelen recibir CA monofásica: fase y neutro.", "La trifásica tiene tres fases desfasadas 120°.", "Ventajas: potencia constante, campo giratorio y menos cobre.", "V(línea) = √3·V(fase): 127/220 V o 230/400 V.", "La industria, los edificios y las líneas de transmisión usan trifásica."]
    }
  ]
});
