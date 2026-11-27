// M2. Voltaje, corriente y resistencia
registrarModulo({
  id: "m2", n: 2, nivel: 1, titulo: "Voltaje, corriente y resistencia", quizMin: 25, quizN: 15, minEsperado: 305,
  objetivo: "Definir voltaje, corriente y resistencia con sus unidades (voltio, amperio y ohmio), entender cómo se relacionan y leer diagramas de circuitos.",
  clave: "voltaje corriente resistencia amperio voltio ohmio esquemas simbolos",
  actividades: ["Dibujar el esquema de una linterna con los símbolos de la lección 2.7.", "Identificar símbolos haciendo clic en el diagrama del mini-quiz de la lección 2.7.", "Hacer el experimento de la [resistencia de grafito](#/experimento/e-grafito)."],
  ejemplos: ["3 C en 2 s dan una corriente de 1,5 A.", "Resistencia de 10 m de cobre de 1,5 mm²: unos 0,11 Ω.", "Convertir 4 700 Ω en 4,7 kΩ y 0,02 A en 20 mA."],
  sims: ["S3", "S4"], calcs: ["C15", "C14"], gen: ["ohmI"],
  evaluacion: "Quiz de módulo de 15 preguntas (25 min), con al menos 4 numéricas. Se aprueba con el 70 %.",
  extra: [
    { t: "num", p: "Por un cable pasan 6 C en 3 s. ¿Cuál es la corriente?", r: 2, u: "A", e: "I = Q / t = 6 / 3 = 2 A.", lec: "2-2" },
    { t: "num", p: "Convierte 0,035 A a miliamperios.", r: 35, u: "", e: "0,035 × 1 000 = 35 mA.", lec: "2-6" },
    { t: "om", p: "Si un cable se hace el doble de largo, su resistencia…", o: ["Se reduce a la mitad", "Se duplica", "No cambia", "Se cuadruplica"], c: 1, e: "R = ρ·L/A: es proporcional a la longitud.", lec: "2-5" },
    { t: "diag", p: "Toca el símbolo de la **resistencia**.", dia: "simbolos2", c: "res", cTexto: "el símbolo en zigzag (4)", e: "La resistencia se dibuja como un zigzag (o un rectángulo en la norma europea).", lec: "2-7" }
  ],
  lecciones: [
    {
      id: "2-1", t: "La analogía del agua y sus límites", d: "Presión = voltaje, caudal = corriente, tubería estrecha = resistencia. Dónde falla la analogía.", min: 30, e: true, sim: "S3",
      preg: "Si la electricidad fuera agua, ¿qué sería la pila, qué sería el cable y qué sería un foco?",
      obj: ["Relacionar voltaje, corriente y resistencia con presión, caudal y estrechamiento.", "Usar la analogía para predecir el comportamiento de un circuito sencillo.", "Reconocer en qué casos la analogía no funciona."],
      txt: `Voltaje, corriente y resistencia son invisibles. Para hacerse una idea, desde hace más de un siglo los profesores usan una comparación con el **agua que circula por tuberías**. No es perfecta, pero ayuda muchísimo.

## El circuito de agua
Imagina un circuito cerrado de tuberías llenas de agua, con una **bomba** que la empuja y un tramo **estrecho** por donde le cuesta pasar.

| Circuito de agua | Circuito eléctrico | Unidad |
|---|---|---|
| Bomba que crea presión | Pila o fuente de [[voltaje]] | voltio (V) |
| Diferencia de presión | Voltaje (diferencia de potencial) | voltio (V) |
| Caudal: litros por segundo | [[corriente eléctrica|Corriente]]: culombios por segundo | amperio (A) |
| Tramo estrecho | [[resistencia eléctrica|Resistencia]] | ohmio (Ω) |
| Tuberías llenas de agua | Cables llenos de electrones libres | — |
| Turbina que mueve el agua | Foco o motor que usa la energía | — |
| Válvula | Interruptor | — |

## Lo que la analogía explica bien
1. **Más presión, más caudal.** Si la bomba empuja más fuerte (más voltaje), pasa más agua por segundo (más corriente).
2. **Más estrechamiento, menos caudal.** Con la misma bomba, un tubo más angosto deja pasar menos agua: más resistencia, menos corriente.
3. **El agua no se gasta.** El agua que sale de la bomba vuelve a ella; lo que se «usa» es la energía que la bomba le dio. Igual en el circuito: los electrones vuelven a la pila; lo que se transforma es la energía.
4. **La válvula cerrada detiene todo.** Un interruptor abierto corta el circuito y la corriente se detiene en todas partes, no solo después del interruptor.
5. **Las tuberías ya están llenas.** Cuando enciendes la bomba, el agua empieza a moverse en todo el circuito a la vez, aunque cada gota avance despacio. Por eso el foco enciende al instante.

Prueba estas ideas en la simulación: sube el voltaje (presión de la bomba) y mira cómo aumenta el caudal; sube la resistencia (estrecha el tubo) y mira cómo baja.

## Dónde falla la analogía
?> Ninguna analogía es la realidad. Estas son las diferencias más importantes:

- **Un cable cortado no «gotea».** Si cortas una tubería, el agua sale; si cortas un cable, la electricidad no se derrama: simplemente deja de circular.
- **La energía no viaja dentro de los electrones** como el agua lleva su energía. En un circuito, la energía viaja por el **campo electromagnético** alrededor de los cables, casi a la velocidad de la luz, mientras los electrones se arrastran a milímetros por segundo.
- **En corriente alterna** los electrones solo vibran adelante y atrás, sin avanzar. Con agua sería extraño imaginar una bomba que empuja y jala 60 veces por segundo.
- **El agua puede acumularse en un recipiente**; la carga en un circuito normal no se acumula en ningún punto (salvo en los capacitores).

## Otra analogía útil: la colina
También puedes imaginar la pila como un **elevador** que sube canicas (cargas) a lo alto de una colina. Las canicas bajan rodando por el circuito (corriente) y, al pasar por obstáculos (resistencias), pierden energía en forma de calor. El voltaje es la **altura** de la colina. Esta imagen es la del potencial de la lección 1.8.`,
      vida: "Cuando abres más la llave del jardín, sale más agua: como subir el voltaje. Si pisas la manguera, sale menos: como aumentar la resistencia. Pero si cortas un cable de una lámpara, no «sale» electricidad: la lámpara simplemente se apaga.",
      err: ["Creer que la corriente «se gasta» a lo largo del circuito: la misma corriente que sale de la pila vuelve a ella.", "Pensar que la electricidad se escapa por un contacto sin nada conectado.", "Tomar la analogía al pie de la letra en corriente alterna."],
      ejer: [["En la analogía del agua, ¿qué es el voltaje?", "La diferencia de presión que crea la bomba."], ["Si cierras parcialmente una válvula, ¿qué cambia en el circuito eléctrico equivalente?", "Aumenta la resistencia y disminuye la corriente."], ["Menciona una diferencia entre un cable cortado y un tubo cortado.", "El tubo cortado derrama agua; el cable cortado simplemente deja de conducir corriente."]],
      quiz: [
        { t: "om", p: "En la analogía del agua, la corriente eléctrica corresponde a…", o: ["La presión", "El caudal", "El diámetro del tubo", "La bomba"], c: 1, e: "La corriente es la cantidad de carga por segundo, como el caudal es litros por segundo." },
        { t: "om", p: "Un tubo más estrecho corresponde a…", o: ["Más voltaje", "Más resistencia", "Más corriente", "Un interruptor cerrado"], c: 1, e: "Se opone al paso, como la resistencia." },
        { t: "vf", p: "En un circuito, la corriente se «gasta» y vuelve menos corriente a la pila.", c: false, e: "La corriente es la misma en todo el lazo; lo que se transforma es la energía." },
        { t: "vf", p: "Si cortas un cable, la electricidad se derrama como el agua de un tubo roto.", c: false, e: "Es uno de los límites de la analogía: el circuito simplemente se abre." },
        { t: "om", p: "Si la bomba empuja más fuerte y el tubo no cambia, el caudal…", o: ["Aumenta", "Disminuye", "No cambia", "Se vuelve cero"], c: 0, e: "Más voltaje con la misma resistencia da más corriente (ley de Ohm)." }
      ],
      res: ["Voltaje ↔ presión; corriente ↔ caudal; resistencia ↔ estrechamiento.", "Más voltaje da más corriente; más resistencia da menos corriente.", "La corriente no se gasta: lo que se transforma es la energía.", "Un circuito abierto detiene la corriente en todo el lazo.", "La analogía falla con cables cortados, con la CA y con el viaje de la energía."]
    },
    {
      id: "2-2", t: "La corriente eléctrica", d: "Flujo de carga, I = Q/t, el amperio; sentido convencional y electrónico; velocidad de deriva.", min: 40, e: true, sim: "S4",
      preg: "Cuando enciendes la luz, ¿cuánto tarda un electrón en ir del interruptor al foco?",
      obj: ["Definir la corriente eléctrica y su unidad, el amperio.", "Calcular la corriente con I = Q/t.", "Distinguir el sentido convencional del sentido real de los electrones."],
      txt: `La [[corriente eléctrica]] es el **paso de carga eléctrica por un punto del circuito en cada segundo**. Es lo que en la analogía del agua llamábamos caudal.

= I = Q / t

- **I** es la corriente, en **amperios** (A).
- **Q** es la carga que pasa, en culombios (C).
- **t** es el tiempo, en segundos (s).

Un [[amperio]] es un culombio por segundo: unos 6,25 trillones de electrones cruzando cada segundo. La unidad honra a [André-Marie Ampère](#/personajes/ampere).

## Corrientes típicas
| Aparato | Corriente aproximada |
|---|---|
| Reloj de pulsera | 0,000 001 A (1 µA) |
| LED indicador | 0,02 A (20 mA) |
| Cargador de celular (salida) | 1 a 3 A |
| Foco LED de 9 W a 127 V | 0,07 A |
| Microondas a 127 V | unos 12 A |
| Motor de arranque de un auto | 150 a 300 A |
| Rayo | unos 30 000 A |

## Sentido convencional y sentido de los electrones
Cuando se empezó a estudiar la electricidad no se conocían los electrones. [Franklin](#/personajes/franklin) supuso que lo que se movía era carga **positiva**, que salía del polo **+** de la fuente, recorría el circuito y volvía por el polo **−**. Ese es el [[sentido convencional]], y es el que se dibuja en todos los esquemas y se usa en todos los cálculos.

Más de un siglo después se descubrió que en los metales lo que se mueve son **electrones**, negativos, que van **al revés**: del polo − al polo +. ¿Hay que corregir todo? No: matemáticamente, una carga negativa que va hacia la izquierda produce el mismo efecto que una positiva que va hacia la derecha. Por eso se mantiene la convención.

+> En este curso las flechas de corriente siguen el sentido convencional (de + a − por el circuito exterior), salvo cuando digamos expresamente «electrones».

## La sorpresa: los electrones van muy despacio
Los electrones libres de un cable se mueven al azar a velocidades enormes (cientos de kilómetros por segundo), pero chocando constantemente con los átomos. Cuando hay corriente, a ese movimiento caótico se le suma un desplazamiento promedio muy lento: la [[velocidad de deriva]]. En un cable de cobre de 1,5 mm² con 10 A, ¡es de apenas medio milímetro por segundo! Un electrón tardaría **horas** en recorrer un metro.

Entonces, ¿por qué la luz enciende al instante? Porque el cable **ya está lleno de electrones**. Al cerrar el interruptor, el campo eléctrico se propaga por el cable a casi la velocidad de la luz y empuja a **todos** los electrones a la vez, como cuando empujas una fila de canicas que ya se tocan: la última se mueve en cuanto empujas la primera.

## La corriente es la misma en todo un lazo
En un circuito de un solo camino, la corriente es igual en todos sus puntos: los electrones no se acumulan ni se pierden. Lo que entra a un foco por un cable sale por el otro. Esta idea es la base de la ley de corrientes de Kirchhoff (lección 3.6).

## Corriente directa y alterna
Si los electrones avanzan siempre en el mismo sentido, la corriente es **directa** ([[CD]]), como la de una pila. Si cambian de sentido muchas veces por segundo, es **alterna** ([[CA]]), como la de los contactos de tu casa. Lo estudiarás en el módulo 5.`,
      form: [["I = Q / t", "Corriente (A) = carga (C) ÷ tiempo (s)."], ["Q = I × t", "Carga que pasa en un tiempo dado."], ["1 A = 1 C/s", "Un amperio es un culombio por segundo."]],
      ej: { enun: "Por un foco pasan 90 C de carga en 2 minutos. ¿Qué corriente circula?", pasos: ["Datos: Q = 90 C; t = 2 min = 120 s.", "Fórmula: I = Q / t.", "Sustitución: I = 90 / 120 = 0,75 A."], res: "Circulan 0,75 A (750 mA)." },
      vida: "Los cargadores de celular indican su corriente de salida, por ejemplo «5 V ⎓ 2 A». Un cargador de 3 A llena la batería más rápido que uno de 1 A porque mete más carga por segundo.",
      err: ["Creer que los electrones van rapidísimo por el cable: lo rápido es la señal, no los electrones.", "Pensar que la corriente es mayor al principio del circuito y menor al final.", "Confundir el sentido convencional con el sentido real de los electrones."],
      ejer: [["¿Qué corriente hay si pasan 3 C en 2 s?", "I = 3 / 2 = 1,5 A."], ["Una corriente de 0,5 A circula durante 1 minuto. ¿Cuánta carga pasa?", "Q = 0,5 × 60 = 30 C."], ["En un esquema, la corriente convencional sale del polo… de la pila.", "Del polo positivo (+)."]],
      quiz: [
        { t: "om", p: "¿Qué es la corriente eléctrica?", o: ["La energía de la pila", "La carga que pasa por un punto en cada segundo", "La presión de los electrones", "La resistencia del cable"], c: 1, e: "I = Q/t: carga por unidad de tiempo." },
        { t: "num", p: "Pasan 12 C de carga en 4 s. ¿Cuál es la corriente?", r: 3, u: "A", e: "I = 12 / 4 = 3 A." },
        { t: "vf", p: "En un cable de cobre, los electrones avanzan a casi la velocidad de la luz.", c: false, e: "La velocidad de deriva es de milímetros por segundo; lo que viaja rápido es el campo." },
        { t: "om", p: "El sentido convencional de la corriente va…", o: ["Del − al + por fuera de la pila", "Del + al − por fuera de la pila", "Siempre de izquierda a derecha", "En el mismo sentido que los electrones"], c: 1, e: "Por convención, de + a −; los electrones van al revés." },
        { t: "num", p: "Una corriente de 2 A circula durante 30 s. ¿Cuántos culombios pasan?", r: 60, u: "C", e: "Q = I × t = 2 × 30 = 60 C." }
      ],
      res: ["La corriente es la carga que pasa por segundo: I = Q/t.", "Se mide en amperios: 1 A = 1 C/s.", "El sentido convencional va de + a −; los electrones van al revés.", "Los electrones avanzan muy despacio, pero la señal viaja casi a la velocidad de la luz.", "En un circuito de un solo camino, la corriente es igual en todos los puntos."]
    },
    {
      id: "2-3", t: "El voltaje", d: "Diferencia de potencial, el voltio, fuentes de voltaje y tabla de valores típicos.", min: 40, e: true,
      preg: "¿Por qué una pila de 9 V y una de 1,5 V pueden tener el mismo tamaño, pero una «empuja» seis veces más?",
      obj: ["Definir el voltaje como diferencia de potencial y su unidad.", "Reconocer las principales fuentes de voltaje.", "Comparar voltajes típicos de la vida diaria y su peligrosidad."],
      txt: `El [[voltaje]] (también llamado **tensión** o **diferencia de potencial**) es la «fuerza de empuje» que hace moverse a las cargas por un circuito. Más exactamente, es la **energía que gana o pierde cada culombio de carga** al pasar de un punto a otro (lección 1.8).

= V = W / Q   (1 V = 1 J/C)

La unidad es el [[voltio]], en honor a [Alessandro Volta](#/personajes/volta), inventor de la pila. Una pila de 1,5 V entrega 1,5 julios de energía a cada culombio que la atraviesa; una de 9 V, seis veces más.

## El voltaje siempre es entre dos puntos
No tiene sentido decir «el voltaje de este cable» si no se dice respecto de qué. Una pila de 9 V tiene **9 V entre sus terminales**. En una casa, el contacto tiene {{V}} **entre la fase y el neutro**. Cuando no se dice nada, normalmente el voltaje se mide respecto de **tierra** o del polo negativo, que se toma como 0 V.

Por eso un multímetro mide voltaje con **dos puntas**, colocadas en los dos puntos que quieres comparar (en paralelo, lección 12.3).

## ¿Qué produce voltaje?
Para que exista voltaje hay que **separar cargas** y mantenerlas separadas. Eso requiere energía, que la fuente obtiene de otra forma de energía:

| Fuente | Energía de origen | Voltaje típico |
|---|---|---|
| Pila o batería | química | 1,2 a 12 V |
| Generador / alternador | mecánica (giro) | de 12 V a 20 000 V |
| Panel solar | luminosa | 0,5 V por celda, 30–40 V por panel |
| Termopar | calor | milivoltios |
| Piezoeléctrico (encendedor de estufa) | presión | miles de voltios, muy poca energía |
| Frotamiento (estática) | mecánica | miles de voltios |

## Voltajes de la vida diaria
| Situación | Voltaje |
|---|---|
| Señal de una neurona | 0,07 V |
| Pila AA o AAA | 1,5 V |
| Celda de litio de un celular | 3,7 V |
| Puerto USB | 5 V |
| Batería de auto | 12 V |
| Contactos de una casa | 120/127 V o 220/230 V |
| Cables de un poste de distribución | 13 200 a 34 500 V |
| Líneas de transmisión | 115 000 a 400 000 V o más |

## Voltaje y peligro
!> El voltaje es lo que «empuja» la corriente a través de tu cuerpo. Por debajo de unos 50 V en ambientes secos el riesgo de electrocución es bajo; la red de una casa ya puede ser mortal.

Ojo: no es el voltaje solo lo que mata, sino la **corriente** que ese voltaje logra hacer pasar por el cuerpo (lección 13.2). La estática tiene miles de voltios pero casi no puede mantener corriente; la red tiene «solo» {{V}} pero puede mantener corriente todo el tiempo que estés en contacto.

## Voltaje nominal y voltaje real
El valor impreso en una pila es su voltaje **nominal**. Una pila AA nueva da unos 1,6 V; a media vida, 1,3 V; se considera agotada hacia 0,9–1,0 V. En la red, el voltaje real puede variar un ±10 % respecto del nominal según la hora y la carga de la red.`,
      form: [["V = W / Q", "Voltaje (V) = energía (J) ÷ carga (C)."], ["W = V × Q", "Energía que recibe una carga al atravesar una fuente de voltaje V."]],
      ej: { enun: "Una batería de auto de 12 V hace circular 600 C de carga durante el arranque. ¿Cuánta energía entrega?", pasos: ["Datos: V = 12 V; Q = 600 C.", "Fórmula: W = V × Q.", "Sustitución: W = 12 × 600 = 7 200 J."], res: "Entrega 7 200 J (7,2 kJ) al motor de arranque." },
      calc: "C14",
      vida: "El cargador de tu celular transforma los {{V}} del contacto en 5 V (o algo más en carga rápida) para el puerto USB. Por eso puedes tocar el conector USB sin riesgo, pero nunca el interior del cargador.",
      err: ["Hablar del voltaje «de un punto» sin decir respecto de qué.", "Pensar que más voltaje significa siempre más peligro, sin importar la corriente que pueda dar la fuente.", "Creer que una pila de 1,5 V nueva y otra gastada tienen el mismo voltaje."],
      ejer: [["¿Cuánta energía da una pila de 1,5 V a 4 C de carga?", "W = 1,5 × 4 = 6 J."], ["Una fuente da 24 J a 2 C. ¿Cuál es su voltaje?", "V = 24 / 2 = 12 V."], ["Ordena de menor a mayor: USB, batería de auto, pila AA, contacto de casa.", "Pila AA (1,5 V) < USB (5 V) < batería de auto (12 V) < contacto ({{V}})."]],
      quiz: [
        { t: "om", p: "¿En qué unidad se mide el voltaje?", o: ["Amperio", "Ohmio", "Voltio", "Culombio"], c: 2, e: "En voltios (V)." },
        { t: "vf", p: "El voltaje siempre se mide entre dos puntos.", c: true, e: "Es una diferencia de potencial." },
        { t: "num", p: "Una fuente entrega 45 J a 5 C de carga. ¿Cuál es su voltaje?", r: 9, u: "V", e: "V = W/Q = 45/5 = 9 V." },
        { t: "om", p: "¿Qué tipo de energía usa una pila para producir voltaje?", o: ["Luminosa", "Química", "Nuclear", "Mecánica"], c: 1, e: "Una reacción química separa las cargas." },
        { t: "om", p: "¿Qué voltaje tiene un puerto USB estándar?", o: ["1,5 V", "5 V", "12 V", "127 V"], c: 1, e: "El USB estándar entrega 5 V." }
      ],
      res: ["El voltaje es la energía por unidad de carga entre dos puntos: V = W/Q.", "Se mide en voltios; 1 V = 1 J/C.", "Las fuentes separan cargas usando energía química, mecánica, luminosa o térmica.", "Voltajes típicos: 1,5 V (pila), 5 V (USB), 12 V (auto), 120–230 V (casa).", "Lo peligroso es la corriente que el voltaje logra hacer pasar por el cuerpo."]
    },
    {
      id: "2-4", t: "La resistencia", d: "Qué causa la resistencia, el ohmio, el resistor como componente y el calor que genera.", min: 35, e: true,
      preg: "Si los cables y el filamento de un foco son de metal, ¿por qué el filamento se pone al rojo vivo y los cables no?",
      obj: ["Explicar el origen microscópico de la resistencia.", "Usar el ohmio y sus múltiplos.", "Relacionar la resistencia con el calor que se produce."],
      txt: `La [[resistencia eléctrica]] es la **oposición que presenta un material al paso de la corriente**. En la analogía del agua es el tramo estrecho de la tubería.

## ¿De dónde sale la resistencia?
Los electrones libres, al avanzar empujados por el campo eléctrico, **chocan** constantemente con los átomos del metal, que vibran por la temperatura, y con las impurezas y defectos del material. En cada choque pierden parte de la energía que les dio la fuente, y esa energía queda en el material como **vibración de los átomos**, es decir, como **calor**. Ese calentamiento se llama [[efecto Joule]].

- Un material con pocos choques (cobre, plata) tiene **poca** resistencia.
- Un material con muchos choques (nicromo, tungsteno, grafito) tiene **mucha**.
- Un aislante casi no tiene electrones libres: su resistencia es **altísima**.

## El ohmio
La resistencia se mide en [[ohmio|ohmios]] (**Ω**, la letra griega omega), en honor a [Georg Ohm](#/personajes/ohm). Un ohmio es la resistencia que deja pasar **1 amperio cuando se le aplica 1 voltio**.

| Objeto | Resistencia aproximada |
|---|---|
| 1 m de cable de cobre de 1,5 mm² | 0,011 Ω |
| Filamento de foco de 100 W encendido (127 V) | 160 Ω |
| Resistencia de un hervidor de 1 500 W (127 V) | 11 Ω |
| Resistor típico de electrónica | 10 Ω a 1 MΩ |
| Cuerpo humano, piel seca | 1 000 a 100 000 Ω |
| Plástico de un cable | miles de millones de Ω |

## El resistor: resistencia «a propósito»
Además de la resistencia que tienen todos los materiales, en electrónica se fabrican componentes con un valor preciso de resistencia: los [[resistor|resistores]], que en el habla común también llamamos «resistencias». Sirven para **limitar la corriente** (por ejemplo, para que un LED no se queme), **repartir voltajes** (divisor de voltaje) o **producir calor** (estufas, planchas, secadoras).

Los resistores pequeños llevan su valor pintado con un [[código de colores]] (lección 14.2): por ejemplo, amarillo-violeta-rojo significa 4 700 Ω.

## Resistencia y calor: la respuesta a la pregunta inicial
Por el cable de una lámpara y por su filamento pasa **la misma corriente** (están en serie). Pero el filamento tiene una resistencia **mucho mayor** que los cables, y la potencia que se convierte en calor en cada parte es P = I²·R (lección 6.2). Con la misma corriente, donde hay más resistencia hay más calor. El filamento de tungsteno, delgadísimo, llega a 2 500 °C y brilla; los cables gruesos de cobre apenas se entibian.

Ese mismo principio explica por qué un **cable demasiado delgado** para la corriente que lleva se calienta y puede provocar un incendio, y por qué los aparatos de calefacción tienen resistencias especiales de nicromo.

## Resistencia y temperatura
En los metales, la resistencia **aumenta con la temperatura**, porque los átomos vibran más y los choques son más frecuentes. Un filamento frío tiene unas diez veces menos resistencia que caliente; por eso los focos incandescentes se solían fundir justo al encenderlos. En algunos materiales pasa lo contrario: los **termistores** NTC bajan su resistencia al calentarse y se usan como sensores de temperatura.`,
      form: [["R = V / I", "Resistencia (Ω) = voltaje (V) ÷ corriente (A). 1 Ω = 1 V/A."], ["P = I² × R", "Calor producido por segundo (W) en una resistencia por la que pasa una corriente I."]],
      ej: { enun: "Un hervidor conectado a 127 V deja pasar 11,8 A. ¿Cuál es la resistencia de su elemento calefactor?", pasos: ["Datos: V = 127 V; I = 11,8 A.", "Fórmula: R = V / I.", "Sustitución: R = 127 / 11,8 ≈ 10,8 Ω."], res: "Unos 10,8 Ω. Con 230 V, un hervidor de la misma potencia tendría unos 35 Ω." },
      calc: "C1",
      vida: "La plancha, el tostador, la secadora de cabello y el calentador de agua eléctrico funcionan con resistencias que se calientan a propósito. Los cables de la casa, en cambio, se eligen gruesos para tener muy poca resistencia y no calentarse.",
      err: ["Pensar que la resistencia «consume corriente»: la corriente que entra es la misma que sale; lo que se transforma es energía.", "Creer que los cables no tienen resistencia: tienen muy poca, pero no cero.", "Confundir el resistor (componente) con la resistencia (propiedad)."],
      ejer: [["Un resistor deja pasar 0,02 A con 9 V. ¿Cuánto vale?", "R = 9 / 0,02 = 450 Ω."], ["¿Por qué los cables de una estufa eléctrica son gruesos?", "Para tener poca resistencia y no calentarse con la gran corriente que lleva la estufa."], ["¿Qué pasa con la resistencia de un filamento de tungsteno al calentarse?", "Aumenta, porque los átomos vibran más y los electrones chocan más."]],
      quiz: [
        { t: "om", p: "¿Qué causa la resistencia en un metal?", o: ["Que los protones se mueven", "Los choques de los electrones con los átomos del material", "La falta de voltaje", "El campo magnético"], c: 1, e: "Los choques frenan a los electrones y convierten energía en calor." },
        { t: "om", p: "¿Cuál es la unidad de resistencia?", o: ["Voltio", "Amperio", "Ohmio", "Watt"], c: 2, e: "El ohmio (Ω)." },
        { t: "vf", p: "En un metal, la resistencia aumenta cuando sube la temperatura.", c: true, e: "Los átomos vibran más y hay más choques." },
        { t: "num", p: "Un resistor deja pasar 0,5 A cuando se le aplican 12 V. ¿Cuál es su resistencia?", r: 24, u: "Ω", e: "R = V/I = 12/0,5 = 24 Ω." },
        { t: "om", p: "¿Por qué brilla el filamento de un foco y no sus cables?", o: ["Porque por el filamento pasa más corriente", "Porque el filamento tiene mucha más resistencia y se calienta más con la misma corriente", "Porque los cables son aislantes", "Porque el filamento tiene más voltaje de la red"], c: 1, e: "Con la misma corriente, el calor P = I²R es mayor donde R es mayor." }
      ],
      res: ["La resistencia es la oposición de un material al paso de la corriente.", "Se debe a los choques de los electrones con los átomos, y produce calor (efecto Joule).", "Se mide en ohmios: 1 Ω deja pasar 1 A con 1 V.", "Los resistores son componentes con una resistencia precisa.", "En los metales la resistencia aumenta con la temperatura."]
    },
    {
      id: "2-5", t: "Resistividad: de qué depende la resistencia", d: "R = ρ·L/A: material, longitud, grosor y temperatura. Por qué los cables gruesos conducen mejor.", min: 40, calc: "C15", exp: "e-grafito",
      preg: "¿Por qué una extensión eléctrica larga y delgada se calienta cuando conectas una estufa, pero una corta y gruesa no?",
      obj: ["Aplicar la fórmula R = ρ·L/A.", "Predecir cómo cambia la resistencia con la longitud, la sección y el material.", "Elegir materiales según su resistividad."],
      txt: `La resistencia de un cable depende de **tres cosas**: de qué está hecho, cuánto mide y qué tan grueso es. Las tres se reúnen en una fórmula:

= R = ρ · L / A

- **R:** resistencia, en ohmios (Ω).
- **ρ** (letra griega *rho*): la [[resistividad]] del material, en ohmios por metro (Ω·m).
- **L:** longitud del conductor, en metros (m).
- **A:** área de la sección transversal (el «grosor»), en metros cuadrados (m²).

## 1. El material: la resistividad
La resistividad es una propiedad de cada material: indica cuánto se opone a la corriente un cubo de un metro de lado. Cuanto más pequeña, mejor conductor.

| Material | Resistividad ρ (Ω·m) a 20 °C |
|---|---|
| Plata | 1,59 × 10⁻⁸ |
| Cobre | 1,68 × 10⁻⁸ |
| Oro | 2,44 × 10⁻⁸ |
| Aluminio | 2,65 × 10⁻⁸ |
| Tungsteno | 5,6 × 10⁻⁸ |
| Hierro | 9,7 × 10⁻⁸ |
| Nicromo (aleación de calefactores) | 1,1 × 10⁻⁶ |
| Grafito | unos 3,5 × 10⁻⁵ |
| Agua de mar | unos 0,2 |
| Vidrio | 10¹⁰ a 10¹⁴ |

El nicromo tiene unas 65 veces la resistividad del cobre: por eso se usa en resistencias de estufas y tostadores.

## 2. La longitud
La resistencia es **proporcional a la longitud**: un cable del doble de largo tiene el doble de resistencia, porque los electrones tienen que atravesar el doble de material y sufren el doble de choques.

## 3. La sección (el grosor)
La resistencia es **inversamente proporcional a la sección**: un cable con el doble de sección tiene la mitad de resistencia, porque hay el doble de «carriles» por donde pueden pasar los electrones. Ojo: si duplicas el **diámetro**, la sección se multiplica por cuatro (A = π·d²/4), y la resistencia baja a la cuarta parte.

Los cables se venden por su sección en **mm²** (1,5; 2,5; 4; 6 mm²…) o por su calibre [[AWG]] (14, 12, 10…; en AWG, a mayor número, cable más delgado). Para usar la fórmula, pasa los mm² a m²: **1 mm² = 10⁻⁶ m²**.

## 4. La temperatura
La resistividad de los metales aumenta con la temperatura, aproximadamente un 0,4 % por cada grado en el cobre. Un cable a 70 °C tiene alrededor de un 20 % más de resistencia que a 20 °C. Por eso un cable sobrecargado entra en un círculo vicioso: se calienta, su resistencia sube y se calienta todavía más.

## La respuesta a la pregunta inicial
Una extensión **larga y delgada** tiene más resistencia (L grande, A pequeña). Cuando conectas una estufa que pide mucha corriente, el calor en el cable (P = I²·R) es mayor. Por eso las extensiones indican la corriente o potencia máxima que soportan, y para aparatos de calefacción se recomiendan extensiones cortas y de cable grueso, o mejor, conectarlos directamente a la pared.`,
      form: [["R = ρ · L / A", "Resistencia de un conductor: resistividad × longitud ÷ sección."], ["1 mm² = 10⁻⁶ m²", "Conversión necesaria para usar la sección de los cables en la fórmula."], ["A = π · d² / 4", "Sección de un cable redondo de diámetro d."]],
      ej: { enun: "¿Qué resistencia tiene un cable de cobre de 10 m y 1,5 mm² de sección?", pasos: ["Datos: ρ = 1,68 × 10⁻⁸ Ω·m; L = 10 m; A = 1,5 mm² = 1,5 × 10⁻⁶ m².", "Fórmula: R = ρ · L / A.", "Sustitución: R = 1,68 × 10⁻⁸ × 10 / 1,5 × 10⁻⁶.", "R = 1,68 × 10⁻⁷ / 1,5 × 10⁻⁶ = 0,112 Ω."], res: "Unos 0,11 Ω. Si la corriente va y vuelve por dos conductores, la resistencia total es el doble: 0,22 Ω." },
      vida: "Las líneas de alta tensión usan aluminio con alma de acero: el aluminio es más ligero y barato que el cobre; como conduce algo peor, se usan cables más gruesos. Los cables de los audífonos son delgadísimos porque llevan corrientes diminutas.",
      err: ["Olvidar pasar los mm² a m² (multiplicar por 10⁻⁶).", "Pensar que duplicar el diámetro duplica la sección: la cuadruplica.", "Creer que en AWG un número mayor es un cable más grueso: es al revés."],
      ejer: [["Un cable tiene 2 Ω. ¿Cuánto tendrá otro igual pero del triple de largo?", "6 Ω (proporcional a la longitud)."], ["Un cable de 4 mm² y otro de 2 mm², del mismo material y largo. ¿Cuál tiene más resistencia y cuántas veces?", "El de 2 mm², el doble."], ["¿Qué resistencia tiene 1 m de nicromo de 0,5 mm²?", "R = 1,1 × 10⁻⁶ × 1 / 0,5 × 10⁻⁶ = 2,2 Ω."]],
      quiz: [
        { t: "om", p: "Si un cable se hace el doble de grueso (doble de sección), su resistencia…", o: ["Se duplica", "Se reduce a la mitad", "No cambia", "Se cuadruplica"], c: 1, e: "R es inversamente proporcional a la sección." },
        { t: "om", p: "¿Qué material tiene la resistividad más baja?", o: ["Cobre", "Aluminio", "Plata", "Hierro"], c: 2, e: "La plata es el mejor conductor, aunque el cobre está muy cerca." },
        { t: "num", p: "¿Qué resistencia tiene un cable de cobre (ρ = 1,68 × 10⁻⁸ Ω·m) de 100 m y 2 mm²?", r: 0.84, u: "Ω", e: "R = 1,68 × 10⁻⁸ × 100 / 2 × 10⁻⁶ = 0,84 Ω." },
        { t: "vf", p: "En el sistema AWG, un cable 10 es más grueso que uno 14.", c: true, e: "En AWG, a menor número, más grueso." },
        { t: "om", p: "¿Por qué un cable sobrecargado puede entrar en un «círculo vicioso»?", o: ["Porque su resistencia baja al calentarse", "Porque al calentarse aumenta su resistencia y produce aún más calor", "Porque pierde electrones", "Porque se magnetiza"], c: 1, e: "En los metales, más temperatura significa más resistencia y más calor." }
      ],
      res: ["R = ρ·L/A: la resistencia depende del material, la longitud y la sección.", "La resistividad (ρ) es propia de cada material; la plata y el cobre son los más bajos.", "Doble de largo, doble de resistencia; doble de sección, la mitad.", "Para la fórmula: 1 mm² = 10⁻⁶ m².", "La resistencia de los metales sube con la temperatura."]
    },
    {
      id: "2-6", t: "Múltiplos y submúltiplos", d: "mA, µA, kΩ, MΩ, mV, kV; notación científica y conversiones.", min: 30, calc: "C14",
      preg: "¿Es lo mismo 4,7 kΩ que 4 700 Ω? ¿Y 20 mA que 0,02 A?",
      obj: ["Usar los prefijos del Sistema Internacional más comunes en electricidad.", "Convertir entre unidades con prefijos.", "Escribir valores en notación científica."],
      txt: `En electricidad aparecen números muy grandes y muy pequeños: corrientes de microamperios en un reloj y de miles de amperios en un rayo; resistencias de milésimas de ohmio en un cable y de millones de ohmios en un aislante. Para no escribir tantos ceros se usan **prefijos**.

## Los prefijos que más usarás
| Prefijo | Símbolo | Factor | Ejemplo |
|---|---|---|---|
| giga | G | 1 000 000 000 = 10⁹ | 1 GW: una gran central nuclear |
| mega | M | 1 000 000 = 10⁶ | 1 MΩ: resistencia de un aislante pobre |
| kilo | k | 1 000 = 10³ | 4,7 kΩ; 1 kW; 13,2 kV |
| — | — | 1 | 1 V, 1 A, 1 Ω |
| mili | m | 0,001 = 10⁻³ | 20 mA (LED); 500 mV |
| micro | µ | 0,000 001 = 10⁻⁶ | 100 µF; 50 µA |
| nano | n | 10⁻⁹ | 10 nF; 5 nC |
| pico | p | 10⁻¹² | 22 pF |

!> Ojo con las mayúsculas: **m** (mili, milésima) y **M** (mega, millón) son muy distintas. 1 mΩ es una milésima de ohmio; 1 MΩ es un millón.

## Cómo convertir
Regla práctica:
- Para pasar **de la unidad a un prefijo** (de Ω a kΩ), **divide** entre el factor: 4 700 Ω ÷ 1 000 = **4,7 kΩ**.
- Para pasar **de un prefijo a la unidad** (de mA a A), **multiplica** por el factor: 20 mA × 0,001 = **0,02 A**.
- Para pasar entre dos prefijos, pasa primero a la unidad base.

Ejemplos:
- 0,35 A = 350 mA
- 2,2 kΩ = 2 200 Ω
- 0,000 05 A = 50 µA
- 13 200 V = 13,2 kV
- 1 500 W = 1,5 kW

## Notación científica
Un número en notación científica se escribe como un número entre 1 y 10 multiplicado por una potencia de 10:
- 6 250 000 000 000 000 000 = 6,25 × 10¹⁸
- 0,000 000 000 000 000 000 16 = 1,6 × 10⁻¹⁹

Cada prefijo equivale a una potencia de 10, así que 4,7 kΩ = 4,7 × 10³ Ω y 20 mA = 20 × 10⁻³ A = 2 × 10⁻² A.

## Notaciones que verás en los componentes
En los esquemas y componentes a veces la coma decimal se sustituye por el prefijo, para evitar que una coma borrosa se lea mal:
- **4k7** = 4,7 kΩ
- **2R2** = 2,2 Ω (la R hace de coma)
- **1M5** = 1,5 MΩ
- **n47** = 0,47 nF

Las calculadoras de este curso entienden estas notaciones: puedes escribir «4k7», «20 mA» o «100µ».

## Un truco para no equivocarse
Antes de usar una fórmula, **pasa todo a unidades base** (V, A, Ω, s). Haz la cuenta y, al final, elige el prefijo que deje un número cómodo. Si te sale una corriente de 0,000 3 A, escríbela como 0,3 mA o 300 µA.`,
      form: [["k = 10³ · M = 10⁶ · m = 10⁻³ · µ = 10⁻⁶", "Prefijos más usados en electricidad."], ["valor en unidad base = valor con prefijo × factor", "Ejemplo: 20 mA = 20 × 10⁻³ A = 0,02 A."]],
      ej: { enun: "Una corriente de 350 mA pasa por un resistor de 2,2 kΩ. Escribe ambos valores en unidades base y calcula el voltaje con V = I·R.", pasos: ["350 mA = 350 × 10⁻³ A = 0,35 A.", "2,2 kΩ = 2,2 × 10³ Ω = 2 200 Ω.", "V = 0,35 × 2 200 = 770 V.", "Comprobación con potencias: 3,5 × 10⁻¹ × 2,2 × 10³ = 7,7 × 10² V."], res: "V = 770 V. (Un valor así es peligroso: ¡no es un circuito para casa!)" },
      vida: "En la etiqueta de un cargador verás «Salida 5 V ⎓ 2 000 mA», es decir, 2 A. Y en las baterías, «5 000 mAh», que son 5 Ah. En el recibo de luz aparecen kWh: miles de watts-hora.",
      err: ["Confundir m (mili) con M (mega).", "Olvidar convertir los prefijos antes de usar una fórmula.", "Leer «4k7» como 47 kΩ: es 4,7 kΩ."],
      ejer: [["Convierte 0,075 A a mA.", "75 mA."], ["Convierte 3,3 kΩ a Ω.", "3 300 Ω."], ["¿Cuánto es 1M5 en ohmios?", "1,5 MΩ = 1 500 000 Ω."], ["Escribe 0,000 47 F con un prefijo adecuado.", "470 µF."]],
      quiz: [
        { t: "num", p: "¿Cuántos ohmios son 4,7 kΩ?", r: 4700, u: "", e: "4,7 × 1 000 = 4 700 Ω." },
        { t: "num", p: "¿Cuántos amperios son 250 mA?", r: 0.25, u: "", e: "250 × 0,001 = 0,25 A." },
        { t: "om", p: "¿Qué significa «M» en 1 MΩ?", o: ["Mili (10⁻³)", "Micro (10⁻⁶)", "Mega (10⁶)", "Kilo (10³)"], c: 2, e: "M mayúscula es mega, un millón." },
        { t: "om", p: "En un esquema, «2R2» significa…", o: ["22 Ω", "2,2 Ω", "2,2 kΩ", "222 Ω"], c: 1, e: "La R hace las veces de coma decimal." },
        { t: "vf", p: "13,2 kV es lo mismo que 13 200 V.", c: true, e: "13,2 × 1 000 = 13 200 V." }
      ],
      res: ["Los prefijos evitan escribir muchos ceros: k, M, m, µ, n, p.", "m (mili) es una milésima; M (mega), un millón.", "De unidad a prefijo se divide; de prefijo a unidad se multiplica.", "Antes de una fórmula, pasa todo a unidades base.", "Notaciones como 4k7 o 2R2 sustituyen la coma por el prefijo."]
    },
    {
      id: "2-7", t: "Símbolos y diagramas de circuitos", d: "Pila, resistor, foco, interruptor, LED, tierra, fusible y medidores. Leer y dibujar esquemas.", min: 35, e: true, exp: "e-clip",
      preg: "¿Cómo podría un electricista de Japón entender el plano eléctrico de una casa en Chile sin hablar español?",
      obj: ["Reconocer los símbolos eléctricos más comunes.", "Leer un esquema y explicar cómo circula la corriente.", "Dibujar el esquema de un circuito real."],
      txt: `Dibujar un circuito «tal como se ve», con cables enredados y aparatos con forma real, sería lentísimo y confuso. Por eso se usan **esquemas**: dibujos simplificados donde cada componente se representa con un **símbolo** normalizado. Un esquema muestra **cómo están conectadas** las cosas, no dónde están físicamente.

## Los símbolos básicos
| Componente | Cómo se dibuja | Para qué sirve |
|---|---|---|
| Pila / batería | dos rayas paralelas, la larga es el **+** | fuente de voltaje de CD |
| Fuente de CA | círculo con una onda ~ | voltaje alterno (red) |
| Cable | línea recta | conecta componentes |
| Unión de cables | punto grueso donde se cruzan | conexión eléctrica |
| Cruce sin conexión | líneas que se cruzan sin punto (o con un «puente») | no hay contacto |
| Resistencia | zigzag (norma americana) o rectángulo (norma europea) | limita la corriente |
| Foco (lámpara) | círculo con una X | luz |
| Interruptor | línea inclinada entre dos puntos | abre o cierra el circuito |
| LED | triángulo con barra y dos flechitas saliendo | diodo que emite luz |
| Diodo | triángulo con barra | corriente en un solo sentido |
| Capacitor | dos rayas paralelas iguales | almacena carga |
| Fusible | rectángulo con una línea en medio | protección |
| Tierra | líneas horizontales decrecientes | referencia de 0 V / tierra física |
| Voltímetro | círculo con una V | mide voltaje (en paralelo) |
| Amperímetro | círculo con una A | mide corriente (en serie) |
| Motor | círculo con una M | movimiento |

En el mini-quiz de esta lección tendrás que reconocer algunos de estos símbolos en un diagrama.

## Cómo leer un esquema
1. **Busca la fuente.** Ubica la pila o la fuente y su polo positivo.
2. **Sigue el camino** de la corriente convencional desde el **+**, pasando por cada componente, hasta volver al **−**.
3. **Identifica los nodos:** los puntos donde se unen tres o más cables. Ahí la corriente se divide o se junta.
4. **Fíjate en los interruptores:** si están abiertos, la corriente no pasa por esa parte.

## Reglas para dibujar
- Usa **líneas rectas**, horizontales y verticales.
- Pon la fuente normalmente a la **izquierda** y el + arriba.
- Marca cada componente con su **nombre y valor**: R1 = 470 Ω, V1 = 9 V, L1 (lámpara).
- Pon un **punto** en cada unión real de cables.
- No importa la longitud de las líneas: un cable largo y uno corto son eléctricamente iguales (salvo en alta potencia o alta frecuencia).

## Esquema eléctrico y plano de instalación
Los electricistas usan además **planos de instalación**, con símbolos para contactos, apagadores, lámparas y tableros dibujados sobre el plano de la casa, y **diagramas unifilares**, donde un circuito con fase y neutro se dibuja con una sola línea. Los verás en el módulo 11.

## Normas
Existen dos familias principales de símbolos: la norma internacional **IEC** (usada en Europa y gran parte de Latinoamérica) y la estadounidense **ANSI/IEEE**. Las diferencias más visibles son la resistencia (rectángulo o zigzag) y algunas lámparas. Si conoces ambas, podrás leer cualquier esquema.

## Un ejemplo: la linterna
Una linterna tiene dos pilas AA en serie, un interruptor y un foco. Su esquema: dos símbolos de pila uno tras otro (+ de una con − de la otra), luego el interruptor y luego el foco, y un cable de regreso al primer polo. Con el interruptor cerrado, la corriente recorre ese único lazo.`,
      vida: "Los manuales de los electrodomésticos y los diagramas que vienen pegados dentro de algunos aparatos usan estos mismos símbolos. Y en el tablero de tu casa puede haber un diagrama unifilar con cada circuito.",
      err: ["Pensar que en un esquema la posición de los dibujos es la posición real de las piezas.", "Confundir un cruce de cables sin conexión con una unión (falta el punto).", "Conectar el amperímetro en paralelo: va en serie."],
      ejer: [["¿Qué símbolo tiene una pila y cuál de sus rayas es el polo positivo?", "Dos rayas paralelas de distinto largo; la larga es el +."], ["Dibuja (en papel) el esquema de un circuito con una pila, un interruptor y dos focos en serie.", "Pila → interruptor → foco 1 → foco 2 → regreso a la pila, todo en un solo lazo."], ["En un esquema dos líneas se cruzan sin punto. ¿Están conectadas?", "No; solo hay conexión si hay un punto en el cruce."]],
      quiz: [
        { t: "diag", p: "Toca el símbolo del **LED**.", dia: "simbolos", c: "led", cTexto: "el triángulo con flechitas (4)", e: "El LED es un diodo (triángulo con barra) con flechas que indican que emite luz." },
        { t: "diag", p: "Toca el símbolo del **fusible**.", dia: "simbolos", c: "fus", cTexto: "el rectángulo atravesado por una línea (6)", e: "El fusible se dibuja como un rectángulo con un hilo dentro." },
        { t: "om", p: "En el símbolo de la pila, el polo positivo es…", o: ["La raya larga", "La raya corta", "Cualquiera", "El círculo"], c: 0, e: "La raya larga es el +." },
        { t: "om", p: "¿Cómo se conecta un amperímetro?", o: ["En paralelo", "En serie", "A tierra", "Sin conexión"], c: 1, e: "Para medir la corriente que pasa, debe formar parte del camino: en serie." },
        { t: "vf", p: "En un esquema, un cable dibujado más largo tiene más resistencia que uno corto.", c: false, e: "En los esquemas las líneas son conexiones ideales: su longitud no importa." }
      ],
      res: ["Los esquemas muestran cómo se conectan los componentes con símbolos normalizados.", "La raya larga de la pila es el +; el foco es un círculo con una X.", "Un punto indica unión de cables; un cruce sin punto, no hay conexión.", "Para leer un esquema, sigue la corriente desde el + hasta el −.", "Los voltímetros van en paralelo y los amperímetros en serie."]
    },
    {
      id: "2-8", t: "Circuito abierto, cerrado y cortocircuito", d: "Qué pasa en cada caso y por qué el cortocircuito es peligroso.", min: 30, sim: "S4",
      preg: "¿Por qué «se bota la pastilla» cuando un cable pelado toca otro?",
      obj: ["Distinguir circuito abierto, cerrado y cortocircuito.", "Calcular por qué la corriente se dispara en un cortocircuito.", "Explicar cómo protegen los fusibles e interruptores."],
      txt: `Para que haya corriente hace falta un **camino completo**: la carga tiene que poder salir de la fuente, recorrer el circuito y volver. Según cómo esté ese camino, hablamos de tres situaciones.

## Circuito cerrado
El camino está completo: los electrones pueden dar la vuelta. Hay corriente y los aparatos funcionan. Es lo que pasa cuando enciendes un interruptor.

## Circuito abierto
El camino está **interrumpido** en algún punto: un interruptor apagado, un cable roto, un foco fundido, un conector flojo. La corriente **es cero en todo el circuito**, no solo después del corte, porque los electrones no pueden completar el lazo.

?> En un circuito abierto, el voltaje de la fuente aparece completo **entre los dos extremos del corte**. Por eso un interruptor apagado de la red sigue teniendo voltaje en uno de sus bornes, y por eso hay que cortar la corriente desde el tablero antes de cambiar un apagador.

## Cortocircuito
Un [[cortocircuito]] ocurre cuando la corriente encuentra un camino de **muy baja resistencia** que «se salta» la carga: por ejemplo, cuando los dos cables de un aparato se tocan porque se peló el aislante, o cuando unes los dos polos de una pila con un cable.

¿Por qué es tan grave? Por la ley de Ohm (I = V / R), que verás en el módulo 3. Si la resistencia es casi cero, la corriente se dispara:

| Situación (con {{V}}) | Resistencia | Corriente |
|---|---|---|
| Foco de 100 W | unos 160 Ω (127 V) | menos de 1 A |
| Hervidor | unos 11 Ω (127 V) | unos 12 A |
| Cortocircuito (solo los cables) | 0,1 Ω o menos | ¡más de 1 000 A! |

Una corriente tan grande calienta los cables en milisegundos (P = I²·R), funde el aislante, produce **chispas y arcos eléctricos** y puede iniciar un **incendio**.

## Cómo nos protegen
Las instalaciones tienen dispositivos que abren el circuito automáticamente cuando la corriente es excesiva:
- El [[fusible]]: un hilo que se funde y corta el circuito. Hay que reemplazarlo.
- El [[interruptor termomagnético]] (pastilla o breaker): se dispara en milisegundos ante un cortocircuito (efecto magnético) o en segundos a minutos ante una sobrecarga (efecto térmico). Se puede volver a subir.

Por eso, cuando «se bota la pastilla», casi siempre hay una razón: un cortocircuito o demasiados aparatos en el mismo circuito. **Nunca** se debe sustituir un fusible por un alambre ni puentear un interruptor: es quitar la única protección contra un incendio.

## Cortocircuito con pilas
!> Aunque una pila de 1,5 V no te electrocuta, un cortocircuito con ella sí es un problema: el cable se calienta, la pila se agota en minutos y puede derramarse o, en las baterías de litio, **incendiarse**. Nunca guardes pilas sueltas junto con monedas o llaves en el bolsillo.

## Diagnóstico rápido
- ¿Nada funciona y la pastilla está arriba? Probablemente un **circuito abierto** (cable suelto, foco fundido, interruptor dañado).
- ¿La pastilla se bota al conectar un aparato concreto? Ese aparato puede tener un **cortocircuito**.
- ¿Se bota cuando usas muchos aparatos a la vez? Es una **sobrecarga** (lección 11.2).`,
      form: [["I = V / R", "Con R casi cero, la corriente se vuelve enorme: cortocircuito."]],
      ej: { enun: "Por accidente, los cables de un aparato hacen un cortocircuito y la resistencia total del camino es 0,1 Ω. ¿Qué corriente circularía con {{V}} si no hubiera protección?", pasos: ["Datos: V = 127 V (o 230 V); R = 0,1 Ω.", "Fórmula: I = V / R.", "Con 127 V: I = 127 / 0,1 = 1 270 A. Con 230 V: I = 2 300 A.", "Un interruptor de 20 A se dispara en milisegundos ante esa corriente."], res: "Más de mil amperios: por eso el interruptor termomagnético debe cortar de inmediato." },
      vida: "Las extensiones con interruptor y las regletas suelen traer una pequeña protección que se dispara ante sobrecargas. Los cargadores tienen protección contra cortocircuito en la salida USB: si la puenteas, simplemente dejan de dar corriente.",
      err: ["Pensar que en un circuito abierto solo deja de circular corriente después del corte.", "Creer que con la pastilla abajo no hay ningún riesgo en toda la casa: solo se cortó ese circuito.", "Reemplazar un fusible por uno de más amperios o por un alambre."],
      ejer: [["¿Qué corriente hay en un circuito abierto?", "Cero, en todo el circuito."], ["Unes los polos de una pila de 9 V con un cable de 0,05 Ω. ¿Qué corriente circularía (si la pila pudiera darla)?", "I = 9 / 0,05 = 180 A; en la práctica la limita la resistencia interna de la pila, pero el cable y la pila se calientan mucho."], ["¿Por qué no se debe reemplazar un fusible por un alambre?", "Porque el alambre no se funde con la sobrecorriente: el circuito queda sin protección y puede incendiarse."]],
      quiz: [
        { t: "om", p: "¿Qué es un circuito abierto?", o: ["Uno con mucha corriente", "Uno interrumpido en algún punto, sin corriente", "Uno sin resistencia", "Uno conectado a tierra"], c: 1, e: "Sin camino completo no hay corriente." },
        { t: "om", p: "En un cortocircuito, la corriente…", o: ["Se hace cero", "Se dispara porque la resistencia es casi nula", "No cambia", "Cambia de sentido"], c: 1, e: "I = V/R con R muy pequeña da una corriente enorme." },
        { t: "vf", p: "Es correcto reemplazar un fusible fundido por un alambre grueso si no tienes repuesto.", c: false, e: "Nunca: elimina la protección y puede provocar un incendio.", crit: true },
        { t: "num", p: "Un cortocircuito de 0,2 Ω se produce en una red de 120 V. ¿Qué corriente circularía sin protección?", r: 600, u: "A", e: "I = 120 / 0,2 = 600 A." },
        { t: "om", p: "La pastilla se bota cada vez que conectas un aparato concreto. ¿Qué es lo más probable?", o: ["Que el aparato tenga un cortocircuito", "Que haya un circuito abierto", "Que falte voltaje", "Que la pastilla sea demasiado grande"], c: 0, e: "Un cortocircuito dentro del aparato dispara la protección al conectarlo." }
      ],
      res: ["Circuito cerrado: camino completo y hay corriente.", "Circuito abierto: camino interrumpido y la corriente es cero en todo el lazo.", "Cortocircuito: camino de resistencia casi nula y corriente enorme.", "Los fusibles y termomagnéticos abren el circuito ante corrientes excesivas.", "Nunca se puentea una protección ni se reemplaza un fusible por un alambre."]
    }
  ]
});
