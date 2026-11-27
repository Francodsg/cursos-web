// M3. Ley de Ohm y leyes de Kirchhoff
registrarModulo({
  id: "m3", n: 3, nivel: 1, titulo: "Ley de Ohm y leyes de Kirchhoff", quizMin: 30, quizN: 20, minEsperado: 400,
  objetivo: "Aplicar V = I·R y las leyes de corrientes y de voltajes de Kirchhoff para resolver circuitos paso a paso.",
  clave: "ohm kirchhoff lck lvk nodos mallas ecuaciones",
  actividades: ["Generar ejercicios ilimitados con valores aleatorios: cada intento del quiz del módulo cambia los números.", "Hacer el experimento de la [gráfica V–I](#/experimento/e-vi) con 1 a 4 pilas.", "En la simulación [Kirchhoff de dos mallas](#/simulacion/S6), poner V₂ = 0 y comprobar que el circuito se convierte en un circuito mixto."],
  ejemplos: ["9 V / 450 Ω = 20 mA.", "LCK: entran 2 A, salen 0,5 A y la otra rama lleva 1,5 A.", "LVK: 12 V = 4 V + V₂ + 3 V, por tanto V₂ = 5 V.", "Dos mallas con fuentes de 12 V y 6 V y resistencias de 2, 4 y 6 Ω: I₁ = 1,91 A, I₂ = −0,55 A, I₃ = 1,36 A."],
  sims: ["S4", "S6"], calcs: ["C1"], gen: ["ohmI", "ohmV", "ohmR", "lck", "lvk"],
  evaluacion: "Quiz de módulo de 20 preguntas (30 min), de ellas al menos 5 numéricas con valores aleatorios (Ohm, LCK y LVK). Se aprueba con el 70 %.",
  extra: [
    { t: "om", p: "En un circuito, si el voltaje se mantiene y la resistencia se triplica, la corriente…", o: ["Se triplica", "Se reduce a la tercera parte", "No cambia", "Se hace cero"], c: 1, e: "I = V/R: con R tres veces mayor, I es la tercera parte.", lec: "3-1" },
    { t: "vf", p: "Las leyes de Kirchhoff solo sirven para circuitos de corriente directa.", c: false, e: "Valen también en CA, en cada instante.", lec: "3-9" },
    { t: "ord", p: "Ordena los pasos para aplicar el método de mallas:", o: ["Identificar las mallas y asignar una corriente a cada una", "Escribir la LVK en cada malla", "Resolver el sistema de ecuaciones", "Calcular las corrientes de cada rama y comprobar con la LCK"], e: "Primero se plantean las incógnitas, luego las ecuaciones, se resuelve y se comprueba.", lec: "3-8" }
  ],
  lecciones: [
    {
      id: "3-1", t: "La ley de Ohm", d: "V = I·R, su historia (Georg Ohm, 1827) y su significado físico.", min: 35, e: true, sim: "S4",
      preg: "Si conectas el mismo foco a una pila de 3 V y luego a una de 6 V, ¿cuánto cambia la corriente?",
      obj: ["Enunciar la ley de Ohm y el significado de cada término.", "Predecir cómo cambia la corriente al cambiar el voltaje o la resistencia.", "Reconocer los límites de validez de la ley."],
      txt: `En 1827 [Georg Simon Ohm](#/personajes/ohm), un profesor alemán, publicó el resultado de cientos de mediciones con alambres de distintos largos y grosores conectados a pilas y termopares. Encontró una relación tan simple que al principio nadie le creyó:

+> **La corriente que circula por un conductor es directamente proporcional al voltaje aplicado e inversamente proporcional a su resistencia.**

Escrita como fórmula, es la [[ley de Ohm]]:

= V = I · R

- **V:** voltaje entre los extremos del componente, en voltios (V).
- **I:** corriente que lo atraviesa, en amperios (A).
- **R:** su resistencia, en ohmios (Ω).

## Qué significa
1. **Proporcionalidad con el voltaje.** Con la misma resistencia, si duplicas el voltaje, la corriente se duplica; si lo triplicas, se triplica. Es la respuesta a la pregunta inicial: con 6 V circula el doble que con 3 V (si la resistencia del foco no cambiara; veremos en la lección 3.3 que en un foco sí cambia un poco).
2. **Proporcionalidad inversa con la resistencia.** Con el mismo voltaje, si duplicas la resistencia, la corriente baja a la mitad.
3. **Definición del ohmio.** Una resistencia de 1 Ω deja pasar 1 A cuando se le aplica 1 V. Por eso 1 Ω = 1 V/A.

En la analogía del agua: el caudal (corriente) aumenta con la presión (voltaje) y disminuye con lo estrecho del tubo (resistencia).

## Una ley que se aplica a cada componente
La ley de Ohm se aplica **a cada resistencia por separado**, usando el voltaje **entre sus dos extremos** y la corriente **que pasa por ella**. Un error muy común es mezclar el voltaje de la fuente con la corriente de una sola rama. En los módulos siguientes la usarás una y otra vez, combinada con las leyes de Kirchhoff.

## Una historia de rechazo
El trabajo de Ohm fue duramente criticado por los científicos alemanes de su época, que preferían explicaciones filosóficas a las mediciones. Ohm perdió su puesto y vivió años con dificultades. Solo en 1841 la Royal Society de Londres le dio la medalla Copley y su ley fue aceptada. Hoy es probablemente la fórmula más usada de toda la ingeniería eléctrica.

## Cuándo se cumple y cuándo no
La ley de Ohm no es una ley universal como la conservación de la carga, sino una propiedad de muchos materiales:
- Se cumple muy bien en **metales y resistores a temperatura constante**: se llaman componentes **óhmicos**.
- **No** se cumple en diodos, LED, transistores ni en un filamento que cambia mucho de temperatura: son componentes **no óhmicos** (lección 3.3).

Aun en los no óhmicos se puede calcular el cociente V/I en un punto concreto, pero ese «R» cambia según el voltaje.

## La simulación
En la simulación de abajo cambia el voltaje y la resistencia y observa cómo los electrones se mueven más rápido o más lento. Comprueba con los números de la lectura que V = I · R se cumple siempre.`,
      form: [["V = I · R", "Voltaje (V) = corriente (A) × resistencia (Ω)."], ["I = V / R", "La corriente sube con el voltaje y baja con la resistencia."], ["R = V / I", "La resistencia es el cociente entre voltaje y corriente."]],
      ej: { enun: "Un resistor de 450 Ω se conecta a una pila de 9 V. ¿Qué corriente circula? ¿Y si se conecta a 4,5 V?", pasos: ["Datos: V = 9 V; R = 450 Ω.", "Fórmula: I = V / R.", "Sustitución: I = 9 / 450 = 0,02 A = 20 mA.", "Con 4,5 V (la mitad): I = 4,5 / 450 = 0,01 A = 10 mA, la mitad."], res: "20 mA con 9 V y 10 mA con 4,5 V: la corriente es proporcional al voltaje." },
      vida: "Los fabricantes de cargadores, focos y aparatos calculan con la ley de Ohm qué corriente pedirá cada componente y qué grosor de cable necesita. Un electricista la usa a diario, aunque sea de memoria.",
      err: ["Usar el voltaje de la fuente con la corriente de una sola rama.", "Olvidar pasar mA a A o kΩ a Ω antes de calcular.", "Aplicar la ley de Ohm a un LED como si fuera un resistor."],
      ejer: [["Un resistor de 100 Ω tiene 5 V entre sus extremos. ¿Qué corriente pasa?", "I = 5 / 100 = 0,05 A = 50 mA."], ["Si con 12 V circulan 0,6 A, ¿cuánto vale R?", "R = 12 / 0,6 = 20 Ω."], ["Por un resistor de 220 Ω pasan 30 mA. ¿Qué voltaje tiene?", "V = 0,03 × 220 = 6,6 V."]],
      quiz: [
        { t: "om", p: "¿Cuál es la ley de Ohm?", o: ["V = I / R", "V = I · R", "I = V · R", "R = V · I"], c: 1, e: "V = I·R; de ella salen I = V/R y R = V/I." },
        { t: "num", p: "Una pila de 9 V alimenta un resistor de 300 Ω. ¿Qué corriente circula?", r: 0.03, u: "A", e: "I = 9 / 300 = 0,03 A = 30 mA." },
        { t: "om", p: "Si el voltaje se duplica y la resistencia no cambia, la corriente…", o: ["Se reduce a la mitad", "Se duplica", "Se cuadruplica", "No cambia"], c: 1, e: "I es proporcional a V." },
        { t: "vf", p: "Un LED cumple la ley de Ohm igual que un resistor.", c: false, e: "El LED es no óhmico: su corriente crece muy bruscamente a partir de cierto voltaje." },
        { t: "om", p: "¿Quién descubrió la relación V = I·R?", o: ["Volta", "Ampère", "Georg Ohm", "Faraday"], c: 2, e: "Georg Simon Ohm, en 1827." }
      ],
      res: ["Ley de Ohm: V = I·R.", "La corriente es proporcional al voltaje e inversamente proporcional a la resistencia.", "Se aplica a cada componente con su propio voltaje y su propia corriente.", "1 Ω = 1 V/A.", "Se cumple en resistores y metales a temperatura constante, no en diodos ni LED."]
    },
    {
      id: "3-2", t: "Triángulo de Ohm y despejes", d: "I = V/R y R = V/I con tres problemas tipo.", min: 40, e: true, calc: "C1",
      preg: "¿Cómo despejas la corriente si solo recuerdas que «V es igual a I por R»?",
      obj: ["Despejar cualquiera de las tres magnitudes de la ley de Ohm.", "Usar el triángulo de Ohm como ayuda de memoria.", "Resolver los tres problemas tipo con unidades correctas."],
      txt: `La ley de Ohm tiene tres magnitudes. Si conoces **dos**, puedes calcular la tercera. Hay tres formas de escribirla:

= V = I · R   (para calcular el voltaje)
= I = V / R   (para calcular la corriente)
= R = V / I   (para calcular la resistencia)

## El triángulo de Ohm
Una ayuda de memoria muy usada es un triángulo dividido en tres: **V arriba**, **I y R abajo**, uno al lado del otro.

| | V | |
|---|---|---|
| **I** | × | **R** |

Tapa con el dedo la magnitud que quieres calcular:
- Tapas **V** → quedan I y R uno junto al otro: **V = I × R**.
- Tapas **I** → queda V sobre R: **I = V / R**.
- Tapas **R** → queda V sobre I: **R = V / I**.

## Despejar sin triángulo
El triángulo es útil, pero conviene saber despejar con álgebra:
- Partimos de V = I · R.
- Para dejar sola a I, dividimos los dos lados entre R: V / R = I.
- Para dejar sola a R, dividimos los dos lados entre I: V / I = R.

## Receta para cualquier problema
1. **Anota los datos** con sus unidades.
2. **Pasa a unidades base**: mA → A, kΩ → Ω.
3. **Elige la fórmula** según lo que te piden.
4. **Sustituye** y calcula.
5. **Escribe el resultado** con la unidad y un prefijo cómodo.
6. **Comprueba** que el resultado tiene sentido (¿una pila de 9 V dando 500 A? Revisa).

## Problema tipo 1: calcular la corriente
Una lámpara de auto de 12 V tiene una resistencia de 4 Ω en funcionamiento. ¿Qué corriente pide?
- I = V / R = 12 / 4 = **3 A**.

## Problema tipo 2: calcular el voltaje
Por un resistor de 2,2 kΩ circulan 5 mA. ¿Qué voltaje tiene?
- Unidades base: 2,2 kΩ = 2 200 Ω; 5 mA = 0,005 A.
- V = I · R = 0,005 × 2 200 = **11 V**.

## Problema tipo 3: calcular la resistencia
Un calentador conectado a {{V}} deja pasar 10 A. ¿Cuál es su resistencia?
- Con 127 V: R = V / I = 127 / 10 = **12,7 Ω**. Con 230 V: 23 Ω.

## Usa la calculadora para comprobar
La calculadora de ley de Ohm de abajo resuelve cualquier caso: deja vacía la magnitud que quieras calcular. Además de la respuesta muestra los pasos, igual que tú debes hacerlo en papel. Úsala para **comprobar** tus resultados, no para sustituir el razonamiento.`,
      form: [["V = I · R · I = V / R · R = V / I", "Las tres formas de la ley de Ohm."]],
      ej: { enun: "Un resistor de 2,2 kΩ está conectado a una fuente de 5 V. ¿Qué corriente pasa? Exprésala en mA.", pasos: ["Datos: V = 5 V; R = 2,2 kΩ = 2 200 Ω.", "Fórmula: I = V / R (tapar I en el triángulo).", "Sustitución: I = 5 / 2 200 = 0,002 27 A.", "En mA: 0,002 27 × 1 000 ≈ 2,27 mA."], res: "Unos 2,27 mA." },
      vida: "Un técnico que mide 12 V en un ventilador de computadora y 0,25 A de consumo sabe, sin buscarlo, que el motor se comporta como unos 48 Ω. Con eso decide qué fuente o qué cable usar.",
      err: ["Multiplicar cuando hay que dividir: revisa con el triángulo.", "No convertir kΩ y mA.", "Dar el resultado sin unidad."],
      ejer: [["V = 24 V, R = 8 Ω. ¿I?", "3 A."], ["I = 0,25 A, R = 48 Ω. ¿V?", "12 V."], ["V = 1,5 V, I = 0,3 A. ¿R?", "5 Ω."], ["V = 5 V, R = 1 kΩ. ¿I en mA?", "5 mA."]],
      quiz: [
        { t: "num", p: "Calcula R si V = 24 V e I = 2 A.", r: 12, u: "Ω", e: "R = 24 / 2 = 12 Ω." },
        { t: "num", p: "Calcula V si I = 5 mA y R = 2,2 kΩ.", r: 11, u: "V", e: "V = 0,005 × 2 200 = 11 V." },
        { t: "num", p: "Calcula I si V = 12 V y R = 4 Ω.", r: 3, u: "A", e: "I = 12 / 4 = 3 A." },
        { t: "om", p: "En el triángulo de Ohm, si tapas R queda…", o: ["V × I", "V / I", "I / V", "V + I"], c: 1, e: "V arriba sobre I abajo: R = V/I." },
        { t: "ord", p: "Ordena la receta para resolver un problema de Ohm:", o: ["Anotar los datos con unidades", "Pasar a unidades base", "Elegir la fórmula y sustituir", "Escribir el resultado con su unidad y comprobarlo"], e: "Datos → unidades → fórmula → resultado y comprobación." }
      ],
      res: ["Con dos de las tres magnitudes se calcula la tercera.", "Triángulo de Ohm: V arriba, I y R abajo; tapa la que buscas.", "V = I·R; I = V/R; R = V/I.", "Siempre pasa a unidades base antes de calcular.", "Comprueba que el resultado tenga sentido."]
    },
    {
      id: "3-3", t: "Gráfica V–I", d: "La pendiente es R; componentes óhmicos y no óhmicos (foco incandescente, LED).", min: 35, exp: "e-vi",
      preg: "Si mides voltaje y corriente de un componente y los pones en una gráfica, ¿qué forma tiene la curva de un resistor? ¿Y la de un LED?",
      obj: ["Construir e interpretar una gráfica de voltaje frente a corriente.", "Obtener la resistencia a partir de la pendiente.", "Distinguir componentes óhmicos de no óhmicos por su gráfica."],
      txt: `Una forma muy poderosa de conocer un componente es medir varios pares de valores de voltaje y corriente y representarlos en una **gráfica V–I** (también llamada curva característica).

## La gráfica de un resistor
Si mides un resistor de 100 Ω con 0, 1,5, 3, 4,5 y 6 V obtienes:

| Voltaje (V) | Corriente (mA) | V / I (Ω) |
|---|---|---|
| 0 | 0 | — |
| 1,5 | 15 | 100 |
| 3,0 | 30 | 100 |
| 4,5 | 45 | 100 |
| 6,0 | 60 | 100 |

Si pones el **voltaje en el eje vertical** y la **corriente en el horizontal**, los puntos forman una **línea recta que pasa por el origen**. Eso es lo que caracteriza a un componente **óhmico**.

## La pendiente es la resistencia
La pendiente de una recta es cuánto sube por cada unidad que avanza:

= pendiente = ΔV / ΔI = R

Por ejemplo, de 1,5 V a 6 V el voltaje sube 4,5 V mientras la corriente sube de 15 a 60 mA (0,045 A): R = 4,5 / 0,045 = 100 Ω.
- Una recta **más empinada** (más voltaje para la misma corriente) significa **más resistencia**.
- Una recta **más tendida** significa **menos resistencia**.

?> Si pones la corriente en el eje vertical y el voltaje en el horizontal (como hacen muchos libros), la pendiente es 1/R, la «conductancia». Fíjate siempre en qué va en cada eje.

## Componentes no óhmicos
### El foco incandescente
Un filamento de tungsteno frío tiene poca resistencia; al pasar corriente se calienta a unos 2 500 °C y su resistencia se multiplica por diez. Su gráfica V–I es una **curva que se va empinando**: cuanto más voltaje, más resistencia. Un foco de 60 W a 127 V tiene en caliente R = V²/P = 127²/60 ≈ 269 Ω, pero en frío apenas unos 25–30 Ω. Por eso, al encenderlo, hay un pico de corriente que muchas veces lo fundía justo en ese momento.

### El LED y el diodo
Un LED casi no deja pasar corriente hasta que el voltaje alcanza su **voltaje umbral** (unos 2 V en un LED rojo, 3 V en uno azul o blanco). A partir de ahí, un pequeño aumento de voltaje hace que la corriente se dispare. Su gráfica es casi plana y luego casi vertical (con V en el eje horizontal). Por eso **un LED siempre necesita una resistencia en serie** que limite la corriente (lección 14.6).

### Otros
Los termistores, las fotorresistencias (LDR) y los varistores también son no óhmicos: su resistencia depende de la temperatura, la luz o el voltaje.

## Cómo construir tu propia gráfica
Con el experimento de esta lección (1 a 4 pilas AA y un resistor de 100 Ω) puedes obtener tus propios puntos. Dibuja la gráfica en papel cuadriculado, traza la recta que mejor pase por los puntos y calcula su pendiente. Si te sale un valor cercano a 100 Ω (dentro de la tolerancia), ¡acabas de comprobar la ley de Ohm igual que Ohm en 1827!`,
      form: [["R = ΔV / ΔI", "Pendiente de la gráfica V–I (V en el eje vertical)."], ["R(foco caliente) = V² / P", "Resistencia de un foco incandescente encendido a partir de su potencia nominal."]],
      ej: { enun: "En una gráfica V–I, un componente pasa por (0,01 A; 2 V) y (0,04 A; 8 V). ¿Es óhmico? ¿Cuál es su resistencia?", pasos: ["Calcula V/I en cada punto: 2 / 0,01 = 200 Ω; 8 / 0,04 = 200 Ω.", "El cociente es igual: la recta pasa por el origen. Es óhmico.", "Pendiente: ΔV / ΔI = (8 − 2) / (0,04 − 0,01) = 6 / 0,03 = 200 Ω."], res: "Es óhmico y su resistencia es de 200 Ω." },
      vida: "Los fabricantes publican la curva V–I de los LED y diodos en sus hojas de datos. Los ingenieros las usan para elegir la resistencia adecuada o el tipo de fuente (de corriente constante para LED de potencia).",
      err: ["Calcular la pendiente con un solo punto que no pasa por el origen.", "No fijarse en qué magnitud va en cada eje.", "Creer que todos los componentes dan una recta."],
      ejer: [["Un resistor da 3 V con 15 mA. ¿Qué corriente dará con 9 V?", "Es óhmico: 45 mA (el triple)."], ["Un foco de 100 W a 127 V, ¿qué resistencia tiene encendido?", "R = 127² / 100 ≈ 161 Ω."], ["¿Qué forma tiene la gráfica V–I de un LED?", "Casi no conduce hasta el voltaje umbral y luego la corriente crece muy rápido: no es una recta."]],
      quiz: [
        { t: "om", p: "La gráfica V–I de un resistor óhmico es…", o: ["Una curva", "Una recta que pasa por el origen", "Una línea horizontal", "Un círculo"], c: 1, e: "V e I son proporcionales." },
        { t: "om", p: "Con V en el eje vertical, la pendiente de la recta es…", o: ["La corriente", "La potencia", "La resistencia", "La energía"], c: 2, e: "ΔV/ΔI = R." },
        { t: "num", p: "Un componente óhmico da 4 V con 0,02 A. ¿Cuál es su resistencia?", r: 200, u: "Ω", e: "R = 4 / 0,02 = 200 Ω." },
        { t: "vf", p: "La resistencia de un filamento incandescente es la misma frío que caliente.", c: false, e: "Caliente tiene unas diez veces más resistencia." },
        { t: "om", p: "¿Por qué un LED necesita una resistencia en serie?", o: ["Para que dé más luz", "Porque pasado su voltaje umbral la corriente se dispara", "Para cambiar su color", "Porque es un aislante"], c: 1, e: "Es no óhmico; la resistencia limita la corriente." }
      ],
      res: ["La gráfica V–I muestra cómo responde un componente.", "Un componente óhmico da una recta que pasa por el origen.", "Con V en el eje vertical, la pendiente es la resistencia.", "El foco incandescente y el LED son no óhmicos.", "Un LED necesita una resistencia en serie para limitar la corriente."]
    },
    {
      id: "3-4", t: "10 problemas resueltos paso a paso", d: "Problemas de ley de Ohm graduados de fácil a difícil, con unidades y prefijos.", min: 50, e: true, calc: "C1",
      preg: "¿Puedes resolver un problema de ley de Ohm en menos de un minuto y sin equivocarte con las unidades?",
      obj: ["Resolver problemas de ley de Ohm de dificultad creciente.", "Manejar prefijos con soltura.", "Interpretar físicamente cada resultado."],
      txt: `La mejor manera de dominar la ley de Ohm es practicar. Aquí tienes diez problemas de dificultad creciente, todos resueltos con la receta de la lección 3.2. Intenta resolver cada uno **antes** de leer la solución.

## Nivel básico
**Problema 1.** Una pila de 9 V alimenta un resistor de 450 Ω. ¿Qué corriente circula?
- I = V / R = 9 / 450 = 0,02 A = **20 mA**.

**Problema 2.** Un resistor de 2,4 kΩ se conecta a 12 V. ¿Corriente?
- R = 2 400 Ω. I = 12 / 2 400 = 0,005 A = **5 mA**.

**Problema 3.** Por un resistor de 24 Ω circulan 0,5 A. ¿Qué voltaje tiene?
- V = 0,5 × 24 = **12 V**.

## Nivel intermedio
**Problema 4.** Un calentador conectado a 127 V pide 10 A. ¿Cuál es su resistencia?
- R = 127 / 10 = **12,7 Ω**. (Si la red fuera de 230 V y pidiera 10 A, serían 23 Ω.)

**Problema 5.** En un circuito con un LED, por la resistencia de 330 Ω pasan 21 mA. ¿Cuánto voltaje cae en la resistencia?
- I = 0,021 A. V = 0,021 × 330 = **6,93 V**.

**Problema 6.** Un faro de auto de 12 V tiene 4 Ω de resistencia en caliente. ¿Corriente?
- I = 12 / 4 = **3 A**.

**Problema 7.** Con una pila de 1,5 V, un multímetro mide 0,3 A en un foquito. ¿Qué resistencia tiene el foquito encendido?
- R = 1,5 / 0,3 = **5 Ω**.

## Nivel avanzado
**Problema 8.** Un puerto USB de 5 V alimenta un resistor de 1 kΩ. ¿Qué corriente pasa? ¿Y si se cambia por uno de 2 kΩ?
- I₁ = 5 / 1 000 = **5 mA**. I₂ = 5 / 2 000 = **2,5 mA**. Doble de resistencia, mitad de corriente.

**Problema 9.** Un sensor de 600 Ω tiene 3 V. Si el voltaje sube a 6 V, ¿cuánto cambia la corriente?
- I₁ = 3 / 600 = 5 mA; I₂ = 6 / 600 = 10 mA. **Se duplica**, porque la corriente es proporcional al voltaje.

**Problema 10 (seguridad).** Estima la corriente que atravesaría a una persona que toca la fase de una red de 127 V con la piel seca (unos 100 kΩ en total) y con la piel mojada (unos 1 kΩ).
- Seca: I = 127 / 100 000 = 0,001 27 A = **1,27 mA**: se siente un cosquilleo.
- Mojada: I = 127 / 1 000 = 0,127 A = **127 mA**: puede causar fibrilación del corazón.
- Con 230 V los valores serían 2,3 mA y 230 mA.

!> El problema 10 explica por qué el agua y la electricidad son una combinación mortal: la humedad reduce la resistencia de la piel unas cien veces.

## Lo que aprendes de estos problemas
- Las corrientes de la electrónica son de **miliamperios**; las de los aparatos de la casa, de **amperios**.
- Al **duplicar R**, la corriente se reduce a la **mitad**; al **duplicar V**, se **duplica**.
- Es fundamental convertir los prefijos (kΩ, mA) antes de calcular.

Practica más en el quiz del módulo: cada intento genera problemas nuevos con valores aleatorios.`,
      form: [["V = I · R", "Úsala en todos los problemas, despejando lo que te pidan."]],
      ej: { enun: "Un resistor desconocido tiene 7,5 V y por él pasan 15 mA. Si se le aplican 12 V, ¿qué corriente pasará?", pasos: ["R = 7,5 / 0,015 = 500 Ω.", "Con 12 V: I = 12 / 500 = 0,024 A.", "En mA: 24 mA."], res: "Pasarán 24 mA." },
      vida: "Los electricistas estiman de memoria: un aparato que pide 10 A a 127 V se comporta como unos 13 Ω. Con eso saben que no deben ponerlo en una extensión delgada.",
      err: ["Saltarse la conversión de prefijos.", "Dar 0,02 cuando te piden mA (son 20 mA).", "No comprobar si el resultado es razonable."],
      ejer: [["5 V y 250 Ω: ¿corriente?", "20 mA."], ["0,1 A y 47 Ω: ¿voltaje?", "4,7 V."], ["230 V y 46 Ω: ¿corriente?", "5 A."], ["3,3 V y 1,5 mA: ¿resistencia?", "2,2 kΩ."]],
      quiz: [
        { t: "num", p: "Una fuente de 5 V y una resistencia de 250 Ω. ¿Corriente?", r: 0.02, u: "A", e: "I = 5 / 250 = 0,02 A = 20 mA." },
        { t: "num", p: "Por 47 Ω pasan 0,1 A. ¿Voltaje?", r: 4.7, u: "V", e: "V = 0,1 × 47 = 4,7 V." },
        { t: "num", p: "Con 3,3 V circulan 1,5 mA. ¿Resistencia?", r: 2200, u: "Ω", e: "R = 3,3 / 0,0015 = 2 200 Ω = 2,2 kΩ." },
        { t: "om", p: "Si cambias un resistor de 1 kΩ por uno de 2 kΩ con el mismo voltaje, la corriente…", o: ["Se duplica", "Se reduce a la mitad", "No cambia", "Se cuadruplica"], c: 1, e: "Doble de resistencia, mitad de corriente." },
        { t: "num", p: "Con 127 V y una resistencia corporal de 1 000 Ω (piel mojada), ¿qué corriente pasaría?", r: 0.127, u: "A", e: "I = 127 / 1 000 = 0,127 A = 127 mA: peligro mortal." }
      ],
      res: ["Resolver muchos problemas da soltura con la ley de Ohm.", "Primero convierte los prefijos; después calcula.", "Duplicar R reduce la corriente a la mitad; duplicar V la duplica.", "La piel mojada deja pasar unas cien veces más corriente que la seca.", "Comprueba siempre si el resultado es razonable."]
    },
    {
      id: "3-5", t: "Nodos, ramas y mallas", d: "El vocabulario para analizar circuitos, con diagramas marcados.", min: 30, sim: "S6",
      preg: "En un circuito con varias resistencias y cables que se cruzan, ¿por dónde empiezas a analizarlo?",
      obj: ["Identificar nodos, ramas y mallas en un circuito.", "Contar cuántas ecuaciones independientes hacen falta.", "Preparar un circuito para aplicar las leyes de Kirchhoff."],
      txt: `Cuando un circuito tiene más de un camino, la ley de Ohm sola no basta: hay que saber **cómo se reparte la corriente** y **cómo se reparte el voltaje**. Para eso se usan las leyes de Kirchhoff (lecciones 3.6 y 3.7). Antes necesitamos un poco de vocabulario.

## Nodo
Un [[nodo]] es un punto donde se unen **tres o más** conductores. Ahí la corriente se divide o se junta. En un esquema se marca con un punto grueso.

?> Todos los puntos unidos por un cable sin componentes son **el mismo nodo** eléctricamente, aunque estén dibujados lejos. Un truco: colorea con el mismo color todos los cables que se tocan sin pasar por ningún componente; cada color es un nodo.

## Rama
Una **rama** es el tramo del circuito **entre dos nodos**, que puede contener uno o varios componentes en serie. Por todos los componentes de una misma rama pasa **la misma corriente**.

## Malla
Una [[malla]] es un **camino cerrado** que empieza y termina en el mismo punto sin pasar dos veces por el mismo nodo. Una **malla simple** (o «ventana») es una malla que no contiene otras dentro: como las ventanas de un dibujo.

## Un ejemplo: el circuito de dos mallas
Mira la simulación de esta lección. Tiene:
- **2 nodos** principales: el punto de arriba al centro (nodo A) y la línea de abajo (nodo B, que tomamos como 0 V).
- **3 ramas**, todas entre A y B: la de la izquierda (fuente V₁ y R₁), la del centro (R₃) y la de la derecha (fuente V₂ y R₂).
- **2 mallas simples**: la ventana izquierda (V₁, R₁, R₃) y la ventana derecha (R₃, R₂, V₂). También existe la malla exterior (V₁, R₁, R₂, V₂), pero no es independiente de las otras dos.

## ¿Cuántas ecuaciones necesito?
Si un circuito tiene **r** ramas y **n** nodos:
- Hay **r** corrientes desconocidas (una por rama).
- La ley de corrientes da **n − 1** ecuaciones independientes.
- La ley de voltajes da **r − n + 1** ecuaciones independientes (una por malla simple).

En el ejemplo: r = 3, n = 2 → 1 ecuación de nodos + 2 de mallas = 3 ecuaciones para 3 corrientes. ¡Justo lo necesario!

## Antes de calcular: prepara el circuito
1. **Marca los nodos** y ponles nombre (A, B, C…). Elige uno como referencia (0 V), normalmente el negativo de la fuente o la línea de abajo.
2. **Marca las ramas** y dibuja en cada una una flecha con la corriente supuesta (I₁, I₂, I₃…). El sentido puedes elegirlo al azar: si al final te sale negativa, la corriente iba al revés. ¡No es un error!
3. **Marca las mallas** y elige un sentido para recorrerlas (por ejemplo, el de las manecillas del reloj).
4. Marca la **polaridad** (+ y −) de cada fuente y de cada resistencia según la corriente supuesta: en una resistencia, la corriente entra por el +.

Con eso, aplicar las leyes de Kirchhoff es casi mecánico.`,
      ej: { enun: "Un circuito tiene 4 nodos y 6 ramas. ¿Cuántas ecuaciones de nodos y cuántas de mallas necesitas?", pasos: ["Corrientes desconocidas: una por rama = 6.", "Ecuaciones de nodos (LCK): n − 1 = 4 − 1 = 3.", "Ecuaciones de mallas (LVK): r − n + 1 = 6 − 4 + 1 = 3.", "Total: 3 + 3 = 6 ecuaciones para 6 incógnitas."], res: "3 ecuaciones de nodos y 3 de mallas." },
      vida: "El cableado de una casa es una red de nodos (las cajas de conexión y el tablero) y ramas (cada tramo de cable). Los programas de simulación de circuitos, como los que usan los ingenieros, numeran automáticamente los nodos para plantear las ecuaciones.",
      err: ["Contar como nodos distintos dos puntos unidos solo por un cable.", "Contar una malla exterior como independiente además de todas las ventanas.", "Pensar que una corriente negativa significa que hay un error."],
      ejer: [["¿Qué es un nodo?", "Un punto donde se unen tres o más conductores."], ["¿Por qué todos los componentes de una rama llevan la misma corriente?", "Porque están en serie entre dos nodos: no hay otro camino por donde la corriente pueda desviarse."], ["Un circuito tiene 3 nodos y 5 ramas. ¿Cuántas mallas independientes tiene?", "r − n + 1 = 5 − 3 + 1 = 3."]],
      quiz: [
        { t: "om", p: "¿Qué es una malla?", o: ["Un punto de unión de cables", "Un camino cerrado del circuito", "Un componente", "Una fuente"], c: 1, e: "Una malla es un lazo cerrado." },
        { t: "om", p: "Un nodo es un punto donde se unen…", o: ["Dos componentes cualesquiera", "Tres o más conductores", "Solo fuentes", "Solo resistencias"], c: 1, e: "Al menos tres conductores." },
        { t: "vf", p: "Si al resolver un circuito una corriente sale negativa, significa que circula en sentido contrario al supuesto.", c: true, e: "El signo solo indica el sentido." },
        { t: "num", p: "Un circuito tiene 3 ramas y 2 nodos. ¿Cuántas mallas independientes tiene?", r: 2, u: "", e: "r − n + 1 = 3 − 2 + 1 = 2." },
        { t: "om", p: "Por los componentes de una misma rama pasa…", o: ["Distinta corriente", "La misma corriente", "Ninguna corriente", "Solo corriente alterna"], c: 1, e: "Están en serie." }
      ],
      res: ["Nodo: punto donde se unen tres o más conductores.", "Rama: tramo entre dos nodos; lleva una sola corriente.", "Malla: camino cerrado; las mallas simples son las «ventanas».", "Ecuaciones: n − 1 de nodos y r − n + 1 de mallas.", "Antes de calcular, marca nodos, corrientes supuestas, mallas y polaridades."]
    },
    {
      id: "3-6", t: "Ley de corrientes de Kirchhoff (LCK)", d: "Lo que entra a un nodo es igual a lo que sale (conservación de la carga). Cuatro ejemplos.", min: 45, e: true, sim: "S6",
      preg: "Si por un cable entran 5 A a una caja de conexión y salen dos cables, uno con 3 A, ¿cuánto lleva el otro?",
      obj: ["Enunciar la ley de corrientes de Kirchhoff.", "Relacionarla con la conservación de la carga.", "Calcular corrientes desconocidas en un nodo."],
      txt: `En 1845, el físico alemán Gustav Kirchhoff, con apenas 21 años, formuló dos leyes que permiten resolver cualquier circuito. La primera es la [[ley de corrientes de Kirchhoff]] (**LCK**, también llamada ley de nodos):

+> **La suma de las corrientes que entran a un nodo es igual a la suma de las corrientes que salen de él.**

= Σ I(entran) = Σ I(salen)

Otra forma equivalente: si tomamos las corrientes que entran como positivas y las que salen como negativas, **la suma de todas las corrientes de un nodo es cero**.

## Por qué es cierta
Es simplemente la **conservación de la carga** (lección 1.3). En un nodo no se pueden acumular electrones ni pueden aparecer de la nada. Todo lo que llega tiene que irse. Es como un cruce de tuberías: los litros por segundo que entran son los que salen.

## Ejemplo 1: dos salidas
A un nodo entran 2 A. Salen dos ramas; una lleva 0,5 A. ¿Cuánto lleva la otra?
- 2 = 0,5 + I₂ → **I₂ = 1,5 A**.

## Ejemplo 2: varias entradas
A un nodo llegan 1 A, 2 A y 0,5 A por tres cables, y sale un solo cable. ¿Cuánto lleva?
- I = 1 + 2 + 0,5 = **3,5 A**.

## Ejemplo 3: una corriente supuesta al revés
A un nodo llegan I₁ = 4 A e I₂ (desconocida), y sale I₃ = 3 A.
- 4 + I₂ = 3 → I₂ = **−1 A**.
- El signo negativo dice que I₂ en realidad **sale** del nodo, con 1 A. No hay error; solo supusimos mal el sentido.

## Ejemplo 4: la casa en paralelo
En el tablero de una casa, la acometida entra al nodo principal y de ahí salen los circuitos: iluminación (2 A), sala (5 A) y cocina (12 A). ¿Qué corriente pasa por la acometida y el medidor?
- I = 2 + 5 + 12 = **19 A**.

Por eso el interruptor principal de una casa es de más amperios que los de cada circuito: lleva la suma de todos.

## La LCK en la práctica
- En un circuito **en paralelo**, la corriente total de la fuente es la **suma** de las corrientes de las ramas.
- En un circuito **en serie** no hay nodos que dividan la corriente, así que la corriente es la misma en todas partes (caso trivial de la LCK).
- Un **amperímetro de pinza** que abraza la fase y el neutro a la vez marca cero si todo funciona bien: lo que va, vuelve. Si marca algo, hay una **fuga** a tierra. ¡Así funciona el interruptor diferencial (lección 11.3)!

## Pruébalo en la simulación
En la simulación de dos mallas, cambia las fuentes y las resistencias. En la lectura verás que siempre se cumple I₁ + I₂ = I₃ en el nodo A, aunque alguna corriente salga negativa.`,
      form: [["Σ I(entran) = Σ I(salen)", "Ley de corrientes de Kirchhoff en un nodo."], ["Σ I = 0", "Forma equivalente: entrantes positivas, salientes negativas."]],
      ej: { enun: "A un nodo llegan 3 A y 2,5 A. Salen tres ramas: una con 1 A, otra con 2 A. ¿Cuánto lleva la tercera?", pasos: ["Entran: 3 + 2,5 = 5,5 A.", "Salen: 1 + 2 + I₃.", "LCK: 5,5 = 3 + I₃.", "I₃ = 2,5 A."], res: "La tercera rama lleva 2,5 A saliendo del nodo." },
      vida: "El interruptor diferencial de tu casa aplica la LCK: compara la corriente que sale por la fase con la que vuelve por el neutro. Si difieren más de unos 30 mA, es que una parte se está yendo por otro camino (quizá por una persona) y corta la corriente.",
      err: ["Olvidar alguna corriente al sumar.", "Pensar que una corriente negativa es imposible.", "Aplicar la LCK a dos puntos que no son el mismo nodo."],
      ejer: [["Entran 6 A y salen 2 A y 1,5 A. ¿Cuánto lleva la tercera salida?", "6 − 2 − 1,5 = 2,5 A."], ["Tres focos en paralelo piden 0,5 A cada uno. ¿Corriente total?", "1,5 A."], ["Entran I₁ = 2 A e I₂ = 3 A; sale I₃ = 7 A y una cuarta corriente I₄ (supuesta saliendo). ¿I₄?", "2 + 3 = 7 + I₄ → I₄ = −2 A: en realidad entran 2 A."]],
      quiz: [
        { t: "om", p: "La ley de corrientes de Kirchhoff es una consecuencia de…", o: ["La conservación de la energía", "La conservación de la carga", "La ley de Ohm", "La ley de Coulomb"], c: 1, e: "La carga no se acumula ni desaparece en un nodo." },
        { t: "num", p: "A un nodo entran 5 A y salen dos ramas; una lleva 3 A. ¿Cuánto lleva la otra?", r: 2, u: "A", e: "5 = 3 + I → I = 2 A." },
        { t: "num", p: "Tres ramas en paralelo llevan 2 A, 5 A y 12 A. ¿Qué corriente da la fuente?", r: 19, u: "A", e: "2 + 5 + 12 = 19 A." },
        { t: "vf", p: "En un nodo, la suma de corrientes que entran puede ser mayor que la de las que salen si el cable es grueso.", c: false, e: "Siempre son iguales: la carga se conserva." },
        { t: "om", p: "Al aplicar la LCK te sale una corriente de −0,5 A. Esto significa que…", o: ["Hay un error", "La corriente circula al revés de lo supuesto, con 0,5 A", "No hay corriente", "La corriente es alterna"], c: 1, e: "El signo solo indica el sentido." }
      ],
      res: ["LCK: lo que entra a un nodo es igual a lo que sale.", "Equivale a decir que la suma de corrientes de un nodo es cero.", "Es la conservación de la carga.", "En paralelo, la corriente total es la suma de las ramas.", "Una corriente negativa solo indica que el sentido supuesto era el contrario."]
    },
    {
      id: "3-7", t: "Ley de voltajes de Kirchhoff (LVK)", d: "La suma de voltajes en una malla es cero (conservación de la energía); convención de signos. Cuatro ejemplos.", min: 45, e: true, sim: "S6",
      preg: "Si una pila de 12 V alimenta tres resistencias en serie, ¿cuánto voltaje «le toca» a cada una?",
      obj: ["Enunciar la ley de voltajes de Kirchhoff.", "Aplicar una convención de signos coherente.", "Calcular voltajes desconocidos en una malla."],
      txt: `La segunda ley de Kirchhoff es la [[ley de voltajes de Kirchhoff]] (**LVK**, o ley de mallas):

+> **En cualquier camino cerrado de un circuito, la suma de las subidas de voltaje es igual a la suma de las caídas de voltaje.**

= Σ V(subidas) = Σ V(caídas)   o bien   Σ V = 0 en una malla

## Por qué es cierta
Es la **conservación de la energía**. Recuerda la analogía de la colina (lección 2.1): la pila sube las cargas a una altura; al recorrer el circuito bajan por las resistencias, perdiendo energía. Cuando vuelven al punto de partida, están **a la misma altura** que al principio. Todo lo que subieron lo bajaron. En voltios: todo el voltaje que dan las fuentes «se reparte» en caídas a lo largo de la malla.

## Convención de signos
Para no equivocarse hay que recorrer la malla en un sentido (por ejemplo, el de las manecillas del reloj) y aplicar siempre las mismas reglas:
- **Fuente:** si pasas del **−** al **+**, es una **subida** (+V). Si pasas del + al −, es una bajada (−V).
- **Resistencia:** si la recorres **en el mismo sentido** que la corriente supuesta, es una **caída** (−I·R). Si la recorres en sentido contrario, es una subida (+I·R).

## Ejemplo 1: un voltaje desconocido
Una pila de 12 V alimenta tres resistencias en serie. En dos de ellas se miden 4 V y 3 V. ¿Cuánto cae en la tercera?
- 12 = 4 + V₂ + 3 → **V₂ = 5 V**.

## Ejemplo 2: serie con Ohm
Una pila de 9 V con dos resistencias en serie de 100 Ω y 200 Ω.
- LVK: 9 = I·100 + I·200 = I·300 → I = 9 / 300 = **0,03 A (30 mA)**.
- Caídas: V₁ = 0,03 × 100 = **3 V**; V₂ = 0,03 × 200 = **6 V**. Suma: 3 + 6 = 9 V ✓.
- La resistencia mayor se queda con más voltaje.

## Ejemplo 3: dos pilas en la misma malla
Una pila de 9 V y otra de 3 V están en la misma malla con una resistencia de 60 Ω, conectadas **en oposición** (+ con +).
- Recorriendo la malla: +9 − 3 − I·60 = 0 → I = 6 / 60 = **0,1 A**.
- Si estuvieran **a favor**, el voltaje neto sería 12 V e I = 0,2 A.

## Ejemplo 4: ¿qué voltaje mide el voltímetro?
En una malla, entre los puntos A y B hay una pila de 6 V (subiendo de A a B) y una resistencia con una caída de 2 V. El voltaje entre A y B por el otro camino debe ser el mismo: el voltaje entre dos puntos **no depende del camino**. Por eso, si sumas subidas y caídas por un camino o por otro, llegas al mismo resultado.

## La LVK en la práctica
- En **serie**, el voltaje de la fuente se **reparte** entre los componentes.
- En **paralelo**, cada rama forma una malla con la fuente, así que todas tienen el **mismo voltaje** que la fuente.
- Un foco de 6 V no funciona bien en una pila de 12 V sola, pero dos focos de 6 V **en serie** sí: cada uno recibe 6 V.

Comprueba en la simulación de dos mallas que la LVK da cero en la malla izquierda y en la derecha, cambies lo que cambies.`,
      form: [["Σ V(subidas) = Σ V(caídas)", "Ley de voltajes en una malla."], ["V_fuente = I·R₁ + I·R₂ + …", "LVK en un circuito en serie con una fuente."]],
      ej: { enun: "Una pila de 12 V alimenta en serie R₁ = 2 Ω, R₂ = 4 Ω y R₃ = 6 Ω. Calcula la corriente y la caída en cada resistencia.", pasos: ["LVK: 12 = I·2 + I·4 + I·6 = I·12.", "I = 12 / 12 = 1 A.", "V₁ = 1 × 2 = 2 V; V₂ = 1 × 4 = 4 V; V₃ = 1 × 6 = 6 V.", "Comprobación: 2 + 4 + 6 = 12 V ✓."], res: "I = 1 A; caídas de 2 V, 4 V y 6 V." },
      vida: "Las series de luces navideñas antiguas tenían 50 foquitos de unos 2,5 V conectados en serie a 127 V: la LVK reparte el voltaje entre todos (50 × 2,5 ≈ 125 V). Por eso, si uno se fundía, se apagaba toda la serie.",
      err: ["Mezclar los signos al recorrer la malla.", "Olvidar alguna fuente o resistencia del lazo.", "Creer que en paralelo el voltaje se reparte como en serie."],
      ejer: [["Una malla tiene una fuente de 24 V y caídas de 10 V y 6 V. ¿Cuánto cae en la tercera resistencia?", "24 − 10 − 6 = 8 V."], ["9 V con 1 kΩ y 2 kΩ en serie: ¿voltaje en cada una?", "I = 9 / 3 000 = 3 mA; V₁ = 3 V; V₂ = 6 V."], ["Dos pilas de 1,5 V en serie y a favor con una resistencia de 15 Ω: ¿corriente?", "I = 3 / 15 = 0,2 A."]],
      quiz: [
        { t: "om", p: "La ley de voltajes de Kirchhoff es una consecuencia de…", o: ["La conservación de la carga", "La conservación de la energía", "La ley de Coulomb", "La inducción"], c: 1, e: "Lo que las fuentes suben, las resistencias lo bajan." },
        { t: "num", p: "Una fuente de 12 V y tres resistencias en serie; dos tienen 4 V y 3 V. ¿Cuánto cae en la tercera?", r: 5, u: "V", e: "12 − 4 − 3 = 5 V." },
        { t: "num", p: "9 V alimentan 100 Ω y 200 Ω en serie. ¿Cuánto voltaje cae en la de 200 Ω?", r: 6, u: "V", e: "I = 9/300 = 0,03 A; V = 0,03 × 200 = 6 V." },
        { t: "vf", p: "En un circuito en paralelo, cada rama tiene el mismo voltaje que la fuente.", c: true, e: "Cada rama forma una malla con la fuente." },
        { t: "om", p: "Al recorrer una resistencia en el mismo sentido que la corriente, el voltaje…", o: ["Sube", "Cae", "No cambia", "Se duplica"], c: 1, e: "Es una caída de I·R." }
      ],
      res: ["LVK: en una malla, las subidas de voltaje igualan a las caídas.", "Es la conservación de la energía.", "Usa siempre la misma convención de signos.", "En serie, el voltaje de la fuente se reparte entre los componentes.", "En paralelo, todas las ramas tienen el voltaje de la fuente."]
    },
    {
      id: "3-8", t: "Circuito de dos mallas paso a paso", d: "Plantear las ecuaciones y resolver un sistema de 2×2 por sustitución; comprobar con la LCK.", min: 55, sim: "S6",
      preg: "¿Qué pasa cuando hay dos pilas en un circuito y no está claro hacia dónde va la corriente?",
      obj: ["Plantear las ecuaciones de malla de un circuito con dos fuentes.", "Resolver un sistema de dos ecuaciones por sustitución.", "Interpretar los resultados y comprobarlos."],
      txt: `Ahora vamos a resolver el circuito de la simulación S6, con dos fuentes y tres resistencias. Es el tipo de problema que aparece en los exámenes de electricidad y en la vida real (por ejemplo, una batería de auto y un alternador alimentando a la vez los faros).

## El circuito
- Rama izquierda: fuente **V₁ = 12 V** (positivo arriba) con **R₁ = 2 Ω**.
- Rama central: **R₃ = 6 Ω**.
- Rama derecha: fuente **V₂ = 6 V** (positivo arriba) con **R₂ = 4 Ω**.
- Las tres ramas se unen arriba en el nodo A y abajo en el nodo B.

## Paso 1: corrientes de malla
Usaremos el **método de mallas**: asignamos una corriente a cada ventana, ambas en sentido horario.
- **Ia** recorre la malla izquierda (sube por V₁, va a la derecha por R₁, baja por R₃).
- **Ib** recorre la malla derecha (va a la derecha por R₂, baja por V₂, sube por R₃).
- Por R₃, que es compartida, pasan las dos en sentidos contrarios: la corriente hacia abajo en R₃ es **Ia − Ib**.

## Paso 2: LVK en la malla izquierda
Recorriendo en sentido horario desde abajo a la izquierda:
- Subimos por V₁ (de − a +): **+12**.
- Atravesamos R₁ con la corriente Ia: **−2·Ia**.
- Bajamos por R₃ con la corriente (Ia − Ib): **−6·(Ia − Ib)**.

= 12 − 2·Ia − 6·(Ia − Ib) = 0  →  8·Ia − 6·Ib = 12

## Paso 3: LVK en la malla derecha
Recorriendo en sentido horario desde el nodo A:
- Atravesamos R₂ con Ib: **−4·Ib**.
- Bajamos por V₂ (de + a −): **−6**.
- Subimos por R₃; en ese sentido la corriente es (Ib − Ia): **−6·(Ib − Ia)**.

= −4·Ib − 6 − 6·(Ib − Ia) = 0  →  6·Ia − 10·Ib = 6

## Paso 4: resolver el sistema por sustitución
De la primera ecuación despejamos Ia:
- 8·Ia = 12 + 6·Ib → **Ia = 1,5 + 0,75·Ib**.

Sustituimos en la segunda:
- 6·(1,5 + 0,75·Ib) − 10·Ib = 6
- 9 + 4,5·Ib − 10·Ib = 6
- −5,5·Ib = −3 → **Ib ≈ 0,545 A**.

Y volvemos a la primera:
- Ia = 1,5 + 0,75 × 0,545 ≈ **1,909 A**.

## Paso 5: corrientes de cada rama
- Por R₁ y V₁ (rama izquierda): **I₁ = Ia ≈ 1,91 A**, hacia el nodo A.
- Por R₃ (rama central), hacia abajo: **I₃ = Ia − Ib ≈ 1,36 A**.
- Por R₂ y V₂: Ib ≈ 0,545 A en sentido horario, es decir, **entrando a V₂ por su polo positivo**. Si habíamos supuesto I₂ saliendo de V₂ hacia el nodo A, nos da **I₂ ≈ −0,55 A**: la fuente de 6 V está **recibiendo** corriente, como una batería que se carga.

## Paso 6: comprobar
- **LCK en A:** entran I₁ + I₂ = 1,909 + (−0,545) = 1,364 A; sale I₃ = 1,364 A ✓.
- **Voltaje del nodo A:** V_A = I₃ · R₃ = 1,364 × 6 ≈ **8,18 V**. Por la izquierda: 12 − 1,909 × 2 = 8,18 V ✓. Por la derecha: 6 + 0,545 × 4 = 8,18 V ✓.

Abre la simulación y comprueba que da exactamente estos valores con 12 V, 6 V, 2 Ω, 4 Ω y 6 Ω.

?> Otro método, el de **nodos**, es aún más rápido aquí: con una sola incógnita (V_A) se resuelve con una ecuación: (12 − V_A)/2 + (6 − V_A)/4 = V_A/6. Pruébalo: da V_A ≈ 8,18 V.`,
      form: [["8·Ia − 6·Ib = 12 · 6·Ia − 10·Ib = 6", "Sistema de mallas del ejemplo."], ["(V₁ − V_A)/R₁ + (V₂ − V_A)/R₂ = V_A/R₃", "Ecuación de nodos del mismo circuito."]],
      ej: { enun: "En el mismo circuito, cambia V₂ por 0 V (un cable). Calcula la corriente que da V₁ usando la reducción de resistencias.", pasos: ["Con V₂ = 0, R₂ y R₃ quedan en paralelo entre A y B: 4 × 6 / (4 + 6) = 2,4 Ω.", "Total: R₁ + 2,4 = 2 + 2,4 = 4,4 Ω.", "I₁ = 12 / 4,4 ≈ 2,73 A.", "Comprueba en la simulación poniendo V₂ = 0."], res: "Unos 2,73 A. Con V₂ = 0 el circuito se convierte en un circuito mixto (lección 4.7)." },
      vida: "En un auto, la batería y el alternador están en paralelo alimentando los faros, el radio y demás. Con el motor encendido, el alternador tiene más voltaje y carga la batería (la batería «recibe» corriente, como V₂ en el ejemplo).",
      err: ["Olvidar que por la resistencia compartida pasan las dos corrientes de malla.", "Cambiar de convención de signos a mitad de la malla.", "Asustarse por una corriente negativa."],
      ejer: [["Resuelve el sistema 2x − y = 3; x + y = 3.", "Sumando: 3x = 6 → x = 2; y = 1."], ["En el ejemplo, ¿qué potencia disipa R₃?", "P = I₃² · R₃ = 1,364² × 6 ≈ 11,2 W."], ["Con V₁ = V₂ = 12 V y las mismas resistencias, ¿cuánto vale V_A? (usa la ecuación de nodos)", "(12 − V)/2 + (12 − V)/4 = V/6 → 6 + 3 − 0,75V = 0,1667V → V = 9 / 0,9167 ≈ 9,82 V."]],
      quiz: [
        { t: "om", p: "En el método de mallas, por una resistencia compartida por dos mallas pasa…", o: ["Solo la corriente de una malla", "La diferencia (o suma) de las dos corrientes de malla", "Ninguna corriente", "El doble de corriente"], c: 1, e: "Si ambas son horarias, por la compartida pasa Ia − Ib." },
        { t: "num", p: "En el ejemplo de la lección, ¿cuánto vale la corriente por R₃? (en A, con dos decimales)", r: 1.36, u: "A", tol: 0.02, e: "I₃ = Ia − Ib ≈ 1,909 − 0,545 = 1,36 A." },
        { t: "vf", p: "En el ejemplo, la fuente de 6 V recibe corriente, como una batería que se carga.", c: true, e: "I₂ sale negativa: la corriente entra a V₂ por su polo positivo." },
        { t: "num", p: "Resuelve: 8·Ia − 6·Ib = 12 con Ib = 0 (malla derecha abierta). ¿Ia?", r: 1.5, u: "A", e: "8·Ia = 12 → Ia = 1,5 A." },
        { t: "om", p: "¿Qué ley se usa para comprobar el resultado en el nodo A?", o: ["La LVK", "La LCK", "La ley de Coulomb", "La de Faraday"], c: 1, e: "I₁ + I₂ debe ser igual a I₃." }
      ],
      res: ["Se asigna una corriente a cada malla y se aplica la LVK en cada una.", "Por la resistencia compartida pasa la diferencia de las corrientes de malla.", "El sistema de 2×2 se resuelve por sustitución.", "Una corriente negativa en una fuente indica que la fuente se está cargando.", "Siempre se comprueba con la LCK y con el voltaje de los nodos."]
    },
    {
      id: "3-9", t: "Estrategia general y errores de signos", d: "Receta en 6 pasos para cualquier circuito y los 8 errores más comunes.", min: 35,
      preg: "¿Hay una forma segura de resolver cualquier circuito sin perderse en los signos?",
      obj: ["Aplicar una estrategia sistemática a cualquier circuito resistivo.", "Elegir entre reducción, mallas y nodos.", "Detectar y evitar los errores más comunes."],
      txt: `Con la ley de Ohm y las dos leyes de Kirchhoff puedes resolver **cualquier** circuito de resistencias y fuentes de CD (y, con algunas herramientas más, también de CA). La clave es ser ordenado.

## Receta en 6 pasos
1. **Dibuja el circuito limpio.** Redibújalo con líneas rectas, nombra cada componente (R₁, R₂, V₁…) y anota sus valores en unidades base.
2. **Simplifica si se puede.** Si hay resistencias claramente en serie o en paralelo, redúcelas (módulo 4). Si al final queda un solo lazo, basta con la ley de Ohm.
3. **Marca nodos, ramas y mallas.** Elige un nodo de referencia (0 V).
4. **Supón corrientes** con flechas, una por rama o una por malla, en el sentido que quieras. Marca la polaridad de cada resistencia según la corriente supuesta (la corriente entra por el +).
5. **Escribe las ecuaciones:** LCK en n − 1 nodos y LVK en cada malla simple (o, con el método de nodos, una ecuación por cada nodo que no sea la referencia). Resuelve el sistema.
6. **Interpreta y comprueba.** Las corrientes negativas van al revés. Comprueba con la LCK en algún nodo y la LVK en alguna malla que no usaste. Verifica que la potencia entregada por las fuentes sea igual a la disipada por las resistencias.

## ¿Qué método elegir?
| Situación | Método más práctico |
|---|---|
| Un solo lazo o todo reducible a serie/paralelo | Reducción + ley de Ohm |
| Pocas mallas, muchas ramas en paralelo | Nodos (menos ecuaciones) |
| Varias fuentes en mallas distintas | Mallas |
| Circuitos grandes | Simulación por computadora |

## Los 8 errores más comunes
1. **No convertir unidades** (kΩ, mA) antes de calcular.
2. **Cambiar la convención de signos** a mitad de una malla.
3. **Olvidar una fuente o una resistencia** al recorrer la malla.
4. **Tratar como distintos dos puntos del mismo nodo** (unidos solo por un cable).
5. **Usar la corriente total en una rama** que solo lleva una parte.
6. **Poner el voltaje de la fuente en una resistencia** que solo tiene una parte de ese voltaje.
7. **Escribir más ecuaciones de las independientes** (por ejemplo, la malla exterior además de todas las ventanas) y creer que el sistema «no tiene solución».
8. **Rechazar una corriente negativa** en lugar de interpretarla como sentido contrario.

## La comprobación de potencia
Un control muy útil: la suma de las potencias que **entregan** las fuentes debe ser igual a la suma de las que **consumen** las resistencias (y las fuentes que se cargan). En el ejemplo de la lección 3.8:
- V₁ entrega 12 × 1,909 ≈ 22,9 W.
- V₂ **recibe** 6 × 0,545 ≈ 3,3 W.
- Resistencias: 1,909² × 2 + 0,545² × 4 + 1,364² × 6 ≈ 7,29 + 1,19 + 11,16 ≈ 19,6 W.
- Balance: 22,9 = 3,3 + 19,6 ✓.

## ¿Y en corriente alterna?
Las leyes de Kirchhoff también valen en CA, **en cada instante**. Para circuitos con bobinas y capacitores se usan números complejos y la [[impedancia]] en lugar de la resistencia, un tema que va más allá de este curso.`,
      ej: { enun: "Comprueba el balance de potencias de un circuito serie con 9 V, 100 Ω y 200 Ω.", pasos: ["I = 9 / 300 = 0,03 A.", "Potencia entregada por la pila: 9 × 0,03 = 0,27 W.", "Potencias disipadas: 0,03² × 100 = 0,09 W; 0,03² × 200 = 0,18 W.", "Suma disipada: 0,09 + 0,18 = 0,27 W ✓."], res: "La pila entrega 0,27 W y las resistencias disipan 0,27 W: el balance cuadra." },
      vida: "Los programas de diseño electrónico (simuladores de circuitos) aplican automáticamente el método de nodos a circuitos de miles de componentes. Pero los ingenieros siguen haciendo los cálculos a mano para comprobar que los resultados tienen sentido.",
      err: ["Saltarse el paso de comprobación.", "Elegir un método complicado cuando el circuito se puede reducir.", "Plantear ecuaciones redundantes."],
      ejer: [["¿Cuántas ecuaciones de nodos necesitas en un circuito con 3 nodos?", "2 (n − 1)."], ["Una fuente de 10 V entrega 2 A. Las resistencias disipan 15 W en total. ¿Hay un error?", "Sí: la fuente entrega 20 W; el balance no cuadra (falta un componente o hay un error de cálculo)."], ["¿Qué método usarías para un circuito con una fuente y cinco resistencias que se pueden reducir a serie y paralelo?", "Reducción y ley de Ohm."]],
      quiz: [
        { t: "ord", p: "Ordena la estrategia general para resolver un circuito:", o: ["Dibujar el circuito limpio con valores", "Simplificar lo que se pueda", "Suponer corrientes y marcar polaridades", "Escribir y resolver las ecuaciones", "Interpretar y comprobar"], e: "Es la receta en pasos de la lección." },
        { t: "om", p: "La potencia que entregan las fuentes debe ser…", o: ["Mayor que la que disipan las resistencias", "Igual a la que consumen las resistencias y las fuentes que se cargan", "Menor", "Cero"], c: 1, e: "Conservación de la energía." },
        { t: "vf", p: "Las leyes de Kirchhoff también se cumplen en corriente alterna, instante a instante.", c: true, e: "Son consecuencias de la conservación de la carga y la energía." },
        { t: "om", p: "Si el circuito se reduce a un solo lazo, ¿qué basta usar?", o: ["Método de nodos", "Método de mallas", "Ley de Ohm", "Ley de Faraday"], c: 2, e: "Con un solo lazo, la ley de Ohm con la resistencia total." },
        { t: "num", p: "Una fuente de 24 V entrega 0,5 A. ¿Cuánta potencia deben disipar en total las resistencias?", r: 12, u: "W", e: "P = 24 × 0,5 = 12 W." }
      ],
      res: ["Sigue siempre una receta: dibujar, simplificar, marcar, suponer, plantear y comprobar.", "Reducción para circuitos simples; nodos o mallas para los complejos.", "Mantén una única convención de signos.", "Comprueba con la LCK, la LVK y el balance de potencias.", "Las leyes de Kirchhoff valen también en CA, en cada instante."]
    }
  ]
});
