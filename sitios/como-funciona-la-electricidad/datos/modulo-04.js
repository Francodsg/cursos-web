// M4. Circuitos en serie y en paralelo
registrarModulo({
  id: "m4", n: 4, nivel: 1, titulo: "Circuitos en serie y en paralelo", quizMin: 30, quizN: 20, minEsperado: 400,
  objetivo: "Distinguir los circuitos en serie, en paralelo y mixtos, calcular su resistencia equivalente, corrientes y voltajes, y explicar sus ventajas y desventajas.",
  clave: "serie paralelo mixto resistencia equivalente divisor",
  actividades: ["Reto: con la simulación [Constructor de circuitos](#/simulacion/S5), enciende 3 focos de modo que uno siga encendido si cualquiera de los otros se funde.", "Hacer el experimento de [LED en serie y en paralelo](#/experimento/e-led-serie-paralelo).", "Resolver con la [calculadora de resistencia equivalente](#/calculadora/C3) los problemas integradores de la lección 4.9."],
  ejemplos: ["Serie: 100 + 220 + 330 Ω = 650 Ω; con 12 V circulan 18,5 mA.", "Paralelo: 6 Ω con 3 Ω dan 2 Ω.", "Mixto: 4 Ω en serie con (6 ∥ 12) = 8 Ω."],
  sims: ["S5"], calcs: ["C3", "C4"], gen: ["serie", "paralelo", "mixto"],
  evaluacion: "Quiz de módulo de 20 preguntas (30 min) con problemas de serie, paralelo y mixtos con valores aleatorios. Se aprueba con el 70 %. Al aprobar M1–M4 obtienes el certificado del Nivel 1.",
  extra: [
    { t: "om", p: "Dos resistencias iguales en paralelo equivalen a…", o: ["El doble de una", "La mitad de una", "Una igual", "Cero"], c: 1, e: "R ∥ R = R/2.", lec: "4-5" },
    { t: "vf", p: "En serie, la resistencia equivalente siempre es mayor que la mayor de las resistencias.", c: true, e: "Se suman todas.", lec: "4-2" },
    { t: "om", p: "En un circuito en paralelo, la corriente total es…", o: ["Igual en cada rama", "La suma de las corrientes de las ramas", "Siempre cero", "Igual a la menor"], c: 1, e: "Ley de corrientes de Kirchhoff.", lec: "4-4" }
  ],
  lecciones: [
    {
      id: "4-1", t: "El circuito en serie", d: "Una sola trayectoria: misma corriente en todo el circuito; si un foco se funde, todo se apaga.", min: 35, e: true, sim: "S5",
      preg: "¿Por qué en algunas series de luces navideñas basta un foco fundido para que se apague toda la tira?",
      obj: ["Reconocer un circuito en serie.", "Explicar por qué la corriente es igual en todos sus componentes.", "Predecir qué pasa si un componente se abre."],
      txt: `Un [[circuito en serie]] es aquel en que los componentes están conectados **uno tras otro**, formando **un único camino** para la corriente. La salida de uno es la entrada del siguiente, sin derivaciones.

## Tres propiedades de la serie
1. **La corriente es la misma en todos los componentes.** No hay nodos donde la corriente pueda dividirse, así que (por la LCK) por cada componente pasa exactamente la misma corriente.
2. **El voltaje de la fuente se reparte.** Por la LVK, la suma de las caídas de voltaje en los componentes es igual al voltaje de la fuente. Cada componente se queda con una parte proporcional a su resistencia (V = I·R, con la misma I).
3. **Si un componente se abre, todo se apaga.** Basta un foco fundido, un cable suelto o un interruptor abierto para que el único camino se interrumpa y la corriente sea cero en todo el circuito.

## Ejemplos de conexiones en serie
- Las **pilas** de una linterna o de un control remoto: se suman sus voltajes.
- El **interruptor** de una lámpara está en serie con el foco: lo controla.
- Un **fusible** o un termomagnético está en serie con el circuito que protege.
- El **amperímetro** se conecta en serie para que toda la corriente lo atraviese.
- Las antiguas **series de luces navideñas**: decenas de foquitos de bajo voltaje en serie.

## La respuesta a la pregunta inicial
En una serie navideña antigua de 50 focos conectada a 127 V, cada foquito recibe unos 2,5 V. Si uno se funde, el circuito se abre y se apagan todos. Por eso los fabricantes empezaron a poner en cada foquito un **puente** (shunt) que se cierra cuando el filamento se rompe, para que el resto siga funcionando. Las tiras LED modernas suelen tener grupos en paralelo.

## Ventajas e inconvenientes
| Ventajas | Inconvenientes |
|---|---|
| Un solo interruptor o protección controla todo | Si uno falla, fallan todos |
| Permite usar componentes de bajo voltaje con una fuente alta | No se pueden encender ni apagar por separado |
| Las pilas en serie dan más voltaje | Cada componente recibe solo una parte del voltaje |
| Cableado sencillo | Añadir componentes reduce la corriente y el brillo |

## Añadir focos en serie
Si en un circuito en serie agregas un foco más, la resistencia total **aumenta**, la corriente **disminuye** y **todos** brillan menos. Pruébalo en la simulación: con modo «Serie», pasa de 1 a 4 focos y observa cómo baja la potencia de cada uno.

## Reconocer la serie en un esquema
Sigue el camino desde el + de la fuente: si en ningún punto puedes elegir entre dos caminos antes de volver al −, todo está en serie. Si en algún punto el camino se divide, ya no es una serie pura (lección 4.4).`,
      vida: "El apagador de la pared está en serie con la lámpara del techo: al abrirlo, el circuito se interrumpe y la lámpara se apaga. Y los fusibles de un auto están cada uno en serie con el aparato que protegen.",
      err: ["Creer que la corriente «se gasta» al pasar por cada foco y el último recibe menos.", "Pensar que en serie cada componente recibe el voltaje completo de la fuente.", "Confundir dos componentes dibujados en línea con componentes en serie (hay que ver si hay derivaciones entre ellos)."],
      ejer: [["Tres focos en serie: si por el primero pasan 0,2 A, ¿cuánto pasa por el tercero?", "0,2 A: en serie la corriente es igual en todos."], ["¿Qué pasa con el brillo de dos focos en serie si agregas un tercero igual?", "Todos brillan menos, porque la resistencia total aumenta y la corriente baja."], ["¿Por qué el interruptor de una lámpara va en serie con ella?", "Para que, al abrirse, interrumpa el único camino de la corriente de la lámpara."]],
      quiz: [
        { t: "om", p: "En un circuito en serie, la corriente es…", o: ["Distinta en cada componente", "La misma en todos los componentes", "Mayor en el primero", "Cero en el último"], c: 1, e: "Hay un solo camino." },
        { t: "vf", p: "En serie, si se funde un foco, los demás siguen encendidos.", c: false, e: "Se abre el único camino y se apagan todos." },
        { t: "om", p: "Al agregar un foco más en serie, el brillo de los demás…", o: ["Aumenta", "Disminuye", "No cambia", "Se duplica"], c: 1, e: "Aumenta la resistencia total y baja la corriente." },
        { t: "om", p: "¿Cuál de estos elementos se conecta en serie?", o: ["Un voltímetro", "Un fusible", "Un contacto de pared respecto a otro", "Los focos de una casa"], c: 1, e: "El fusible debe estar en serie con el circuito que protege." },
        { t: "om", p: "En serie, el voltaje de la fuente…", o: ["Llega completo a cada componente", "Se reparte entre los componentes", "Se duplica", "Desaparece"], c: 1, e: "La suma de caídas es igual al voltaje de la fuente." }
      ],
      res: ["En serie hay un único camino para la corriente.", "La corriente es la misma en todos los componentes.", "El voltaje de la fuente se reparte entre ellos.", "Si un componente se abre, todo el circuito se apaga.", "Interruptores, fusibles y amperímetros se conectan en serie."]
    },
    {
      id: "4-2", t: "Cálculos en serie", d: "Resistencia equivalente, corriente total y caída de voltaje en cada resistencia.", min: 45, e: true, calc: "C3",
      preg: "Si tienes resistencias de 100, 220 y 330 Ω en serie con 12 V, ¿cuánta corriente pasa y cuánto voltaje tiene cada una?",
      obj: ["Calcular la resistencia equivalente en serie.", "Calcular la corriente y la caída de voltaje en cada resistencia.", "Comprobar los resultados con la LVK."],
      txt: `Varias resistencias en serie se comportan como **una sola resistencia** cuyo valor es la suma de todas. Esa resistencia única se llama **resistencia equivalente** (Req).

= Req = R₁ + R₂ + R₃ + …

¿Por qué se suman? Porque los electrones tienen que atravesar todas, una tras otra: es como un cable más largo (lección 2.5). Y por la LVK: V = I·R₁ + I·R₂ + I·R₃ = I·(R₁ + R₂ + R₃).

## Método para resolver un circuito en serie
1. Suma las resistencias: **Req**.
2. Calcula la corriente con la ley de Ohm: **I = V / Req**. Es la misma en todo el circuito.
3. Calcula la caída en cada resistencia: **Vₖ = I · Rₖ**.
4. **Comprueba** con la LVK: la suma de las caídas debe dar el voltaje de la fuente.
5. (Opcional) Calcula la potencia de cada una: **Pₖ = I² · Rₖ**.

## Ejemplo completo
Fuente de 12 V; R₁ = 100 Ω, R₂ = 220 Ω, R₃ = 330 Ω.
1. Req = 100 + 220 + 330 = **650 Ω**.
2. I = 12 / 650 = 0,018 46 A ≈ **18,5 mA**.
3. Caídas:
   - V₁ = 0,018 46 × 100 ≈ **1,85 V**
   - V₂ = 0,018 46 × 220 ≈ **4,06 V**
   - V₃ = 0,018 46 × 330 ≈ **6,09 V**
4. Comprobación: 1,85 + 4,06 + 6,09 = 12,0 V ✓.

Observa que **la resistencia mayor se queda con el mayor voltaje**: el voltaje se reparte **en proporción** a las resistencias.

## Propiedades útiles
- La Req en serie es **siempre mayor** que la mayor de las resistencias.
- **n resistencias iguales** de valor R en serie: Req = n · R.
- Si una resistencia es mucho mayor que las demás, **casi todo el voltaje** cae en ella.
- Si una resistencia es 0 (un cable) no cambia nada; si es infinita (circuito abierto), la corriente es cero y **todo el voltaje aparece en el corte**.

## Fuentes en serie
Las fuentes en serie **suman** sus voltajes si están a favor (+ de una con − de la siguiente) y se **restan** si están en oposición. Tres pilas de 1,5 V a favor dan 4,5 V; si una se pone al revés, dan 1,5 V.

## Usa la calculadora
En la calculadora de resistencia equivalente escribe «100 + 220 + 330» y verás 650 Ω con los pasos. Después usa la calculadora de ley de Ohm para obtener la corriente.`,
      form: [["Req = R₁ + R₂ + … + Rₙ", "Resistencia equivalente en serie."], ["I = V / Req", "Corriente única del circuito en serie."], ["Vₖ = I · Rₖ", "Caída de voltaje en cada resistencia."]],
      ej: { enun: "Una pila de 9 V alimenta en serie resistencias de 1 kΩ, 2 kΩ y 1,5 kΩ. Calcula I y la caída en cada una.", pasos: ["Req = 1 000 + 2 000 + 1 500 = 4 500 Ω.", "I = 9 / 4 500 = 0,002 A = 2 mA.", "V₁ = 0,002 × 1 000 = 2 V; V₂ = 0,002 × 2 000 = 4 V; V₃ = 0,002 × 1 500 = 3 V.", "Comprobación: 2 + 4 + 3 = 9 V ✓."], res: "I = 2 mA; caídas de 2 V, 4 V y 3 V." },
      vida: "Cuando conectas un aparato con una extensión muy larga y delgada, la resistencia del cable queda en serie con el aparato: parte del voltaje «se queda» en el cable y el aparato recibe un poco menos.",
      err: ["Olvidar alguna resistencia en la suma.", "Usar el voltaje de la fuente en lugar de la caída en cada resistencia.", "No comprobar con la LVK."],
      ejer: [["Req de 47 Ω, 68 Ω y 100 Ω en serie.", "215 Ω."], ["Cuatro resistencias de 25 Ω en serie con 10 V: ¿corriente?", "Req = 100 Ω; I = 0,1 A."], ["12 V con 2 Ω y 4 Ω en serie: ¿caída en la de 4 Ω?", "I = 2 A; V = 8 V."]],
      quiz: [
        { t: "num", p: "¿Cuál es la resistencia equivalente de 100 Ω, 220 Ω y 330 Ω en serie?", r: 650, u: "Ω", e: "100 + 220 + 330 = 650 Ω." },
        { t: "num", p: "Una fuente de 12 V con 650 Ω en total. ¿Corriente en mA?", r: 18.46, u: "", tol: 0.02, e: "I = 12 / 650 ≈ 0,018 46 A ≈ 18,5 mA." },
        { t: "num", p: "9 V con resistencias de 1 kΩ y 2 kΩ en serie. ¿Cuánto voltaje cae en la de 2 kΩ?", r: 6, u: "V", e: "I = 3 mA; V = 0,003 × 2 000 = 6 V." },
        { t: "om", p: "En serie, la mayor caída de voltaje está en…", o: ["La resistencia menor", "La resistencia mayor", "Todas igual", "La primera"], c: 1, e: "V = I·R con la misma I." },
        { t: "vf", p: "Tres pilas de 1,5 V en serie y a favor dan 4,5 V.", c: true, e: "En serie a favor, los voltajes se suman." }
      ],
      res: ["En serie, Req = R₁ + R₂ + … (siempre mayor que la mayor).", "La corriente es I = V / Req, igual en todo el circuito.", "Cada caída es Vₖ = I·Rₖ, proporcional a su resistencia.", "La suma de las caídas debe dar el voltaje de la fuente (LVK).", "Las fuentes en serie suman sus voltajes si están a favor."]
    },
    {
      id: "4-3", t: "El divisor de voltaje", d: "Vout = Vin·R₂/(R₁+R₂) y sus usos en sensores.", min: 40, calc: "C4",
      preg: "Si solo tienes una pila de 9 V y necesitas 3 V para un sensor, ¿cómo los consigues con dos resistencias?",
      obj: ["Aplicar la fórmula del divisor de voltaje.", "Diseñar un divisor para obtener un voltaje deseado.", "Entender cómo se usa con sensores y potenciómetros."],
      txt: `Dos resistencias en serie reparten el voltaje en proporción a sus valores. Si tomas la salida **entre las dos resistencias**, obtienes un voltaje menor que el de la fuente: es un [[divisor de voltaje]], uno de los circuitos más usados de la electrónica.

## La fórmula
Con Vin aplicado a R₁ y R₂ en serie, el voltaje en R₂ es:

= Vout = Vin · R₂ / (R₁ + R₂)

Se deduce en dos pasos: la corriente es I = Vin / (R₁ + R₂) y el voltaje en R₂ es Vout = I · R₂.

## Ejemplos
- **Mitad:** con R₁ = R₂, Vout = Vin / 2. Con 9 V y dos resistencias de 10 kΩ obtienes 4,5 V.
- **Dos tercios:** 12 V con R₁ = 1 kΩ y R₂ = 2 kΩ → Vout = 12 × 2 000 / 3 000 = **8 V**.
- **Un tercio:** 9 V con R₁ = 20 kΩ y R₂ = 10 kΩ → Vout = 9 × 10 / 30 = **3 V**. ¡La respuesta a la pregunta inicial!

## Diseñar un divisor
Si quieres una relación Vout/Vin = k, elige R₂ / (R₁ + R₂) = k. Por ejemplo, para pasar de 5 V a 3,3 V (k = 0,66), puedes usar R₁ = 1 kΩ y R₂ = 2 kΩ (da 3,33 V). Conviene usar valores de kilohmios para que el divisor no gaste mucha corriente.

## Una advertencia: la carga
?> El divisor solo da el voltaje calculado si **lo que conectas a la salida casi no toma corriente** (por ejemplo, la entrada de un microcontrolador o un voltímetro). Si conectas un motor o un foco, su resistencia queda **en paralelo con R₂**, la resistencia de abajo baja y el voltaje de salida cae mucho. Por eso los divisores **no sirven como fuente de alimentación**: para eso se usan reguladores de voltaje.

## Divisores en la vida real
- **Potenciómetro:** es un divisor ajustable. Una resistencia con un cursor que se desliza: R₁ y R₂ cambian a la vez y Vout varía de 0 al voltaje total. Así funcionan muchos controles de volumen y de brillo.
- **Sensores resistivos:** una fotorresistencia (LDR), cuya resistencia baja con la luz, o un termistor, cuya resistencia cambia con la temperatura, se coloca como R₁ o R₂. El voltaje de salida cambia con la luz o la temperatura, y un circuito lo lee. Así funciona la luz nocturna automática de la lección 14.8.
- **Medir voltajes altos:** los multímetros usan divisores internos para reducir voltajes grandes a un valor que su circuito puede medir.

## Usa la calculadora
La calculadora de divisores (C4) calcula el voltaje en cada resistencia y la corriente, y comprueba que la suma de voltajes sea la de la fuente.`,
      form: [["Vout = Vin · R₂ / (R₁ + R₂)", "Voltaje en R₂ de un divisor de voltaje."], ["I = Vin / (R₁ + R₂)", "Corriente del divisor sin carga."]],
      ej: { enun: "Con una fuente de 12 V y R₁ = 1 kΩ, R₂ = 2 kΩ, ¿qué voltaje sale del divisor? ¿Qué corriente consume?", pasos: ["Vout = 12 × 2 000 / (1 000 + 2 000).", "Vout = 24 000 / 3 000 = 8 V.", "I = 12 / 3 000 = 0,004 A = 4 mA.", "Comprobación: en R₁ caen 12 − 8 = 4 V = 0,004 × 1 000 ✓."], res: "8 V a la salida; consume 4 mA." },
      vida: "El control de volumen de muchos aparatos antiguos es un potenciómetro funcionando como divisor. Los sensores de luz de las lámparas del alumbrado público y de los celulares usan divisores con fotorresistencias o fotodiodos.",
      err: ["Usar R₁ en el numerador en lugar de R₂ (la resistencia donde se mide).", "Conectar un aparato de mucho consumo a la salida y esperar el mismo voltaje.", "Elegir resistencias muy pequeñas que gastan mucha corriente."],
      ejer: [["9 V con dos resistencias de 4,7 kΩ: ¿Vout?", "4,5 V."], ["5 V con R₁ = 10 kΩ y R₂ = 15 kΩ: ¿Vout?", "5 × 15 / 25 = 3 V."], ["Quieres 1/4 de 12 V. Si R₂ = 1 kΩ, ¿cuánto debe valer R₁?", "R₂ / (R₁ + R₂) = 1/4 → R₁ = 3 kΩ; Vout = 3 V."]],
      quiz: [
        { t: "num", p: "Un divisor con 12 V, R₁ = 1 kΩ y R₂ = 2 kΩ. ¿Voltaje en R₂?", r: 8, u: "V", e: "12 × 2 / 3 = 8 V." },
        { t: "num", p: "9 V con R₁ = 20 kΩ y R₂ = 10 kΩ. ¿Voltaje en R₂?", r: 3, u: "V", e: "9 × 10 / 30 = 3 V." },
        { t: "om", p: "Si R₁ = R₂, el voltaje de salida es…", o: ["El doble de Vin", "La mitad de Vin", "Igual a Vin", "Cero"], c: 1, e: "R₂/(R₁+R₂) = 1/2." },
        { t: "vf", p: "Un divisor de voltaje es una buena forma de alimentar un motor.", c: false, e: "El motor toma mucha corriente y el voltaje de salida cae: se usa un regulador." },
        { t: "om", p: "Un potenciómetro funciona como…", o: ["Un fusible", "Un divisor de voltaje ajustable", "Un transformador", "Un diodo"], c: 1, e: "El cursor divide la resistencia en dos partes variables." }
      ],
      res: ["Dos resistencias en serie forman un divisor de voltaje.", "Vout = Vin · R₂ / (R₁ + R₂).", "El divisor solo es exacto si la salida casi no toma corriente.", "El potenciómetro es un divisor ajustable.", "Con sensores resistivos se convierten luz o temperatura en voltaje."]
    },
    {
      id: "4-4", t: "El circuito en paralelo", d: "Varias trayectorias, el mismo voltaje en cada rama y ramas independientes.", min: 35, e: true, sim: "S5",
      preg: "¿Por qué cuando se funde el foco de tu cuarto, la televisión sigue funcionando?",
      obj: ["Reconocer un circuito en paralelo.", "Explicar por qué todas las ramas tienen el mismo voltaje.", "Explicar por qué las casas se cablean en paralelo."],
      txt: `En un [[circuito en paralelo]] los componentes se conectan **lado a lado**, cada uno entre los **mismos dos nodos**. La corriente que sale de la fuente se **divide** en varias ramas y luego se vuelve a juntar.

## Tres propiedades del paralelo
1. **El voltaje es el mismo en todas las ramas.** Cada rama está conectada directamente entre los dos nodos de la fuente, así que (por la LVK) cada una recibe el voltaje completo de la fuente.
2. **La corriente total es la suma de las corrientes de las ramas.** Por la LCK: I = I₁ + I₂ + I₃ + …
3. **Las ramas son independientes.** Si una rama se abre (un foco se funde, se apaga un aparato), las demás siguen funcionando con normalidad.

## La respuesta a la pregunta inicial: la casa en paralelo
Todos los contactos y lámparas de una casa están conectados **en paralelo** entre la fase y el neutro. Por eso:
- Cada aparato recibe los {{V}} completos, que es para lo que está diseñado.
- Puedes encender y apagar cada aparato sin afectar a los demás.
- Si se funde un foco, el resto de la casa sigue con luz.

La contrapartida: **cada aparato que enciendes suma su corriente** a la total. Si enciendes demasiados en el mismo circuito, la corriente total supera lo que soporta el cable y se dispara el termomagnético (sobrecarga, lección 11.2).

## Añadir focos en paralelo
Al contrario que en serie, si agregas un foco **en paralelo**, los demás **no cambian su brillo** (siguen teniendo el voltaje completo), pero la fuente tiene que dar **más corriente**. Pruébalo en la simulación en modo «Paralelo»: los focos brillan igual con 1, 2, 3 o 4, mientras crece la corriente total.

!> Paradoja: añadir más resistencias en paralelo **reduce** la resistencia total. Cada rama nueva es un camino más para la corriente, como abrir más carriles en una autopista (lección 4.5).

## Ejemplos de conexiones en paralelo
- Los aparatos de una casa.
- Los faros de un auto: si se funde uno, el otro sigue encendido.
- Las ramas de una **tira LED** moderna.
- El **voltímetro**, que se conecta en paralelo con lo que mide.
- **Pilas en paralelo** (iguales): mismo voltaje, pero más capacidad y más tiempo de uso.

## Ventajas e inconvenientes
| Ventajas | Inconvenientes |
|---|---|
| Cada componente recibe el voltaje completo | La corriente total crece con cada rama |
| Las ramas funcionan de forma independiente | Más cableado |
| Se pueden encender y apagar por separado | Riesgo de sobrecarga si se conectan demasiados aparatos |`,
      vida: "Las regletas y extensiones múltiples conectan varios aparatos en paralelo. Por eso indican una potencia o corriente máxima: la suma de todo lo que conectes no debe superarla.",
      err: ["Creer que en paralelo el voltaje se reparte entre las ramas.", "Pensar que agregar ramas en paralelo aumenta la resistencia total.", "Olvidar que la fuente debe dar la suma de todas las corrientes."],
      ejer: [["Tres focos en paralelo con 12 V: ¿qué voltaje tiene cada uno?", "12 V."], ["Si las ramas llevan 0,5 A, 1 A y 1,5 A, ¿qué corriente da la fuente?", "3 A."], ["¿Qué pasa con los demás focos en paralelo si uno se funde?", "Siguen encendidos con el mismo brillo."]],
      quiz: [
        { t: "om", p: "En un circuito en paralelo, el voltaje en cada rama es…", o: ["Una parte del voltaje de la fuente", "El mismo que el de la fuente", "Cero", "El doble"], c: 1, e: "Cada rama está conectada directamente a la fuente." },
        { t: "vf", p: "Si se funde un foco en paralelo, los demás siguen encendidos.", c: true, e: "Cada rama es un camino independiente." },
        { t: "num", p: "Tres ramas en paralelo llevan 0,5 A, 1 A y 1,5 A. ¿Corriente total?", r: 3, u: "A", e: "0,5 + 1 + 1,5 = 3 A." },
        { t: "om", p: "Al agregar más aparatos en paralelo en un circuito de la casa…", o: ["Baja la corriente total", "Sube la corriente total", "Baja el voltaje de cada aparato a la mitad", "No cambia nada"], c: 1, e: "Cada aparato suma su corriente." },
        { t: "om", p: "¿Cómo están conectados los contactos de una casa?", o: ["En serie", "En paralelo", "Mixtos", "Sin conexión"], c: 1, e: "En paralelo, para que cada uno tenga el voltaje completo." }
      ],
      res: ["En paralelo los componentes están entre los mismos dos nodos.", "Todas las ramas tienen el voltaje de la fuente.", "La corriente total es la suma de las de las ramas.", "Las ramas funcionan de forma independiente.", "Las casas se cablean en paralelo; demasiados aparatos causan sobrecarga."]
    },
    {
      id: "4-5", t: "Cálculos en paralelo", d: "1/Req = 1/R₁ + 1/R₂ + …; atajo «producto entre suma»; corrientes de cada rama.", min: 45, e: true, calc: "C3",
      preg: "¿Cómo puede ser que una resistencia de 6 Ω y otra de 3 Ω en paralelo equivalgan a solo 2 Ω?",
      obj: ["Calcular la resistencia equivalente en paralelo.", "Usar los atajos de dos resistencias y de resistencias iguales.", "Calcular la corriente de cada rama."],
      txt: `En paralelo, cada rama nueva es un camino adicional para la corriente. Por eso la resistencia equivalente **disminuye** al añadir ramas. La fórmula general es:

= 1 / Req = 1 / R₁ + 1 / R₂ + 1 / R₃ + …

Es decir, se suman los **inversos** de las resistencias y luego se invierte el resultado.

## De dónde sale
Todas las ramas tienen el mismo voltaje V. La corriente de cada una es V/Rₖ, y la total es la suma (LCK):
- I = V/R₁ + V/R₂ + V/R₃ = V · (1/R₁ + 1/R₂ + 1/R₃).
- Como I = V/Req, resulta 1/Req = 1/R₁ + 1/R₂ + 1/R₃.

## Atajo 1: dos resistencias («producto entre suma»)
= Req = (R₁ · R₂) / (R₁ + R₂)

- 6 Ω ∥ 3 Ω = 18 / 9 = **2 Ω**. ¡La respuesta a la pregunta inicial!
- 100 Ω ∥ 100 Ω = 10 000 / 200 = **50 Ω**.
- 10 Ω ∥ 15 Ω = 150 / 25 = **6 Ω**.

## Atajo 2: n resistencias iguales
= Req = R / n

Tres resistencias de 30 Ω en paralelo: 30 / 3 = **10 Ω**.

## Propiedades útiles
- La Req en paralelo es **siempre menor** que la **menor** de las resistencias.
- Si una rama tiene resistencia **muy pequeña** comparada con las otras, casi toda la corriente se va por ella y la Req es casi esa resistencia.
- Si una rama es un **cortocircuito** (0 Ω), la Req es 0: ¡todo el paralelo queda en cortocircuito!
- Si una rama está **abierta** (resistencia infinita), es como si no existiera.

## Método para resolver un paralelo
1. Calcula la **corriente de cada rama**: Iₖ = V / Rₖ (todas tienen el voltaje de la fuente).
2. Suma las corrientes: **I total**.
3. Comprueba con la **Req**: I total = V / Req.

## Ejemplo completo
Fuente de 12 V con R₁ = 6 Ω y R₂ = 3 Ω en paralelo.
- I₁ = 12 / 6 = **2 A**; I₂ = 12 / 3 = **4 A**.
- I total = 2 + 4 = **6 A**.
- Comprobación: Req = 2 Ω → I = 12 / 2 = 6 A ✓.

Fíjate: **por la resistencia menor pasa más corriente**. La corriente prefiere el camino «más fácil», pero no va toda por él: se reparte en proporción inversa a las resistencias.

## Usa la calculadora
En la calculadora C3 escribe «6 || 3» y verás 2 Ω con el paso «producto entre suma». Puedes encadenar varias: «6 || 6 || 6» da 2 Ω.`,
      form: [["1/Req = 1/R₁ + 1/R₂ + …", "Resistencia equivalente en paralelo."], ["Req = R₁·R₂ / (R₁ + R₂)", "Atajo para dos resistencias en paralelo."], ["Req = R / n", "n resistencias iguales en paralelo."], ["Iₖ = V / Rₖ", "Corriente de cada rama."]],
      ej: { enun: "Tres resistencias de 20 Ω, 30 Ω y 60 Ω están en paralelo con 12 V. Calcula la corriente de cada rama, la total y la Req.", pasos: ["I₁ = 12 / 20 = 0,6 A; I₂ = 12 / 30 = 0,4 A; I₃ = 12 / 60 = 0,2 A.", "I total = 0,6 + 0,4 + 0,2 = 1,2 A.", "1/Req = 1/20 + 1/30 + 1/60 = 3/60 + 2/60 + 1/60 = 6/60 → Req = 10 Ω.", "Comprobación: 12 / 10 = 1,2 A ✓."], res: "0,6 A, 0,4 A y 0,2 A; total 1,2 A; Req = 10 Ω." },
      vida: "El cable de un aparato tiene muchos hilos finos de cobre trenzados: están en paralelo. Juntos tienen la misma resistencia que un cable sólido de la misma sección, pero son mucho más flexibles.",
      err: ["Sumar las resistencias en paralelo como si fueran en serie.", "Olvidar invertir al final (dar 1/Req como si fuera Req).", "Usar «producto entre suma» con más de dos resistencias a la vez (hay que hacerlo de dos en dos)."],
      ejer: [["Req de 12 Ω ∥ 4 Ω.", "48 / 16 = 3 Ω."], ["Req de cuatro resistencias de 100 Ω en paralelo.", "25 Ω."], ["Con 9 V, ¿qué corriente pasa por cada rama de 30 Ω ∥ 90 Ω?", "0,3 A y 0,1 A; total 0,4 A."]],
      quiz: [
        { t: "num", p: "¿Cuál es la Req de 6 Ω en paralelo con 3 Ω?", r: 2, u: "Ω", e: "6 × 3 / (6 + 3) = 2 Ω." },
        { t: "num", p: "¿Cuál es la Req de tres resistencias de 30 Ω en paralelo?", r: 10, u: "Ω", e: "30 / 3 = 10 Ω." },
        { t: "num", p: "12 V con 6 Ω y 3 Ω en paralelo: ¿corriente total?", r: 6, u: "A", e: "2 A + 4 A = 6 A." },
        { t: "om", p: "La Req en paralelo siempre es…", o: ["Mayor que la mayor", "Menor que la menor", "Igual a la media", "Igual a la suma"], c: 1, e: "Más caminos, menos resistencia." },
        { t: "om", p: "En paralelo, ¿por qué rama pasa más corriente?", o: ["Por la de mayor resistencia", "Por la de menor resistencia", "Por todas igual", "Por la primera"], c: 1, e: "I = V/R con el mismo V." }
      ],
      res: ["En paralelo: 1/Req = 1/R₁ + 1/R₂ + …", "Para dos: Req = R₁·R₂/(R₁ + R₂); para n iguales: R/n.", "La Req es siempre menor que la menor resistencia.", "Cada rama lleva Iₖ = V/Rₖ; por la menor resistencia pasa más corriente.", "La corriente total es la suma de las ramas y coincide con V/Req."]
    },
    {
      id: "4-6", t: "El divisor de corriente", d: "Cómo se reparte la corriente entre dos ramas en paralelo.", min: 35, calc: "C4",
      preg: "Si a dos ramas en paralelo llegan 3 A, ¿cuánto se va por cada una?",
      obj: ["Aplicar la fórmula del divisor de corriente.", "Relacionarla con la ley de Ohm y la LCK.", "Interpretar el reparto en función de las resistencias."],
      txt: `Así como el divisor de voltaje reparte el **voltaje** entre resistencias en **serie**, el **divisor de corriente** reparte la **corriente** entre resistencias en **paralelo**.

## La fórmula para dos ramas
Si a dos resistencias R₁ y R₂ en paralelo llega una corriente total I:

= I₁ = I · R₂ / (R₁ + R₂)
= I₂ = I · R₁ / (R₁ + R₂)

?> ¡Ojo con el cruce! La corriente de la rama 1 lleva **R₂** en el numerador. Es lógico: si R₂ es muy grande, casi toda la corriente se va por la rama 1.

## De dónde sale
- Las dos ramas tienen el mismo voltaje: V = I · Req = I · R₁R₂/(R₁ + R₂).
- La corriente de la rama 1 es I₁ = V / R₁ = I · R₂/(R₁ + R₂).

## Ejemplo
Llegan **3 A** a dos ramas de **10 Ω** y **20 Ω**.
- I₁ (por 10 Ω) = 3 × 20 / 30 = **2 A**.
- I₂ (por 20 Ω) = 3 × 10 / 30 = **1 A**.
- Comprobación LCK: 2 + 1 = 3 A ✓.
- Comprobación de voltaje: 2 × 10 = 20 V = 1 × 20 ✓ (mismo voltaje en ambas ramas).

Por la resistencia que es la **mitad**, pasa el **doble** de corriente.

## La regla de las proporciones
En paralelo, las corrientes son **inversamente proporcionales** a las resistencias:

= I₁ / I₂ = R₂ / R₁

Si una rama tiene el triple de resistencia que otra, lleva la tercera parte de la corriente.

## Más de dos ramas
Con tres o más ramas, la forma más sencilla es:
1. Calcular la Req de todo el paralelo.
2. Obtener el voltaje común: V = I · Req.
3. Cada corriente: Iₖ = V / Rₖ.

## Aplicaciones
- **Derivador (shunt) de un amperímetro:** para medir corrientes grandes, el instrumento se pone en paralelo con una resistencia muy pequeña. Casi toda la corriente pasa por el shunt y solo una fracción conocida por el medidor.
- **Seguridad:** si una persona toca un aparato con fuga y a la vez está conectada a tierra, su cuerpo queda en paralelo con el cable de tierra. Como el cable de tierra tiene muchísima menos resistencia, casi toda la corriente de fuga se va por él: por eso la **puesta a tierra** protege (lección 11.8).`,
      form: [["I₁ = I · R₂ / (R₁ + R₂)", "Corriente por R₁ en un divisor de corriente (nota el cruce)."], ["I₁ / I₂ = R₂ / R₁", "Las corrientes son inversamente proporcionales a las resistencias."]],
      ej: { enun: "A dos ramas en paralelo de 100 Ω y 400 Ω llegan 50 mA. ¿Cuánto pasa por cada una?", pasos: ["I₁ (100 Ω) = 0,05 × 400 / 500 = 0,04 A = 40 mA.", "I₂ (400 Ω) = 0,05 × 100 / 500 = 0,01 A = 10 mA.", "Comprobación: 40 + 10 = 50 mA ✓; 0,04 × 100 = 4 V = 0,01 × 400 ✓."], res: "40 mA por la de 100 Ω y 10 mA por la de 400 Ω." },
      vida: "La puesta a tierra de un refrigerador funciona como un divisor de corriente: si hay una fuga a la carcasa y alguien la toca, el cable de tierra (casi 0 Ω) se lleva casi toda la corriente en lugar de la persona (miles de ohmios).",
      err: ["Poner R₁ en el numerador al calcular I₁.", "Olvidar comprobar que las corrientes suman la total.", "Aplicar la fórmula de dos ramas a tres ramas."],
      ejer: [["Llegan 6 A a 3 Ω ∥ 6 Ω. ¿Corrientes?", "4 A por 3 Ω y 2 A por 6 Ω."], ["Una rama tiene 5 veces la resistencia de otra. ¿Qué fracción de la corriente total lleva?", "1/6 (la otra lleva 5/6)."], ["Llegan 1 A a 1 Ω ∥ 999 Ω. ¿Cuánto pasa por la de 999 Ω?", "1 × 1 / 1 000 = 1 mA."]],
      quiz: [
        { t: "num", p: "Llegan 3 A a dos ramas de 10 Ω y 20 Ω. ¿Cuánto pasa por la de 10 Ω?", r: 2, u: "A", e: "3 × 20 / 30 = 2 A." },
        { t: "num", p: "Llegan 6 A a 3 Ω ∥ 6 Ω. ¿Cuánto pasa por la de 6 Ω?", r: 2, u: "A", e: "6 × 3 / 9 = 2 A." },
        { t: "om", p: "En la fórmula de I₁, en el numerador va…", o: ["R₁", "R₂", "R₁ + R₂", "I₂"], c: 1, e: "I₁ = I·R₂/(R₁+R₂): la resistencia de la otra rama." },
        { t: "vf", p: "En paralelo, la corriente se reparte en proporción directa a las resistencias.", c: false, e: "Es inversamente proporcional: más resistencia, menos corriente." },
        { t: "om", p: "¿Por qué la puesta a tierra protege a una persona que toca un aparato con fuga?", o: ["Porque aumenta el voltaje", "Porque el cable de tierra, de resistencia mucho menor, se lleva casi toda la corriente", "Porque convierte la CA en CD", "Porque aísla a la persona"], c: 1, e: "Es un divisor de corriente entre la tierra y la persona." }
      ],
      res: ["El divisor de corriente reparte la corriente entre ramas en paralelo.", "I₁ = I · R₂/(R₁ + R₂): ojo al cruce.", "Las corrientes son inversamente proporcionales a las resistencias.", "Con más ramas: Req → V común → Iₖ = V/Rₖ.", "La puesta a tierra funciona como un divisor de corriente que protege a las personas."]
    },
    {
      id: "4-7", t: "Circuitos mixtos", d: "Reducir paso a paso hasta una sola resistencia y luego volver hacia atrás.", min: 55, e: true, sim: "S5", calc: "C3",
      preg: "¿Cómo resuelves un circuito que tiene una parte en serie y otra en paralelo?",
      obj: ["Identificar grupos en serie y en paralelo dentro de un circuito mixto.", "Reducir un circuito mixto a una resistencia equivalente.", "Recorrer el camino inverso para obtener todas las corrientes y voltajes."],
      txt: `La mayoría de los circuitos reales no son ni serie pura ni paralelo puro, sino una combinación: un [[circuito mixto]]. La técnica para resolverlos es **reducir y deshacer**.

## Cómo reconocer serie y paralelo
- Dos resistencias están **en serie** si están una tras otra **sin ningún nodo entre ellas** que desvíe corriente.
- Dos resistencias están **en paralelo** si están conectadas entre **los mismos dos nodos**.

## Fase 1: reducir
Ve sustituyendo grupos por su resistencia equivalente, **de dentro hacia fuera**, redibujando el circuito en cada paso, hasta que quede una sola resistencia.

## Fase 2: deshacer (volver hacia atrás)
1. Calcula la corriente total: I = V / Req.
2. Vuelve al dibujo anterior: en un grupo **en serie**, todos llevan esa corriente; calcula sus voltajes. En un grupo **en paralelo**, todos tienen el mismo voltaje; calcula sus corrientes.
3. Repite hasta llegar al circuito original.

## Ejemplo 1: 4 Ω + (6 Ω ∥ 12 Ω) con 24 V
**Reducir:**
- 6 ∥ 12 = 72 / 18 = 4 Ω.
- 4 + 4 = **8 Ω**.

**Deshacer:**
- I total = 24 / 8 = **3 A** (pasa por la de 4 Ω).
- Voltaje en la de 4 Ω: 3 × 4 = **12 V**.
- Voltaje en el paralelo: 3 × 4 = **12 V** (también 24 − 12).
- Corrientes del paralelo: 12 / 6 = **2 A**; 12 / 12 = **1 A**. Suma: 3 A ✓.

## Ejemplo 2: (10 Ω + 20 Ω) ∥ 30 Ω, todo en serie con 5 Ω, con 40 V
**Reducir:**
- 10 + 20 = 30 Ω (serie dentro de la rama).
- 30 ∥ 30 = 15 Ω.
- 15 + 5 = **20 Ω**.

**Deshacer:**
- I total = 40 / 20 = **2 A**; en la de 5 Ω caen 10 V.
- Voltaje en el paralelo: 2 × 15 = 30 V.
- Rama de 30 Ω: 30 / 30 = **1 A**. Rama 10 + 20: 30 / 30 = **1 A**, con 10 V en la de 10 Ω y 20 V en la de 20 Ω.
- Comprobación LVK: 10 + 10 + 20 = 40 V ✓.

## La notación con «+» y «∥»
Es cómodo escribir el circuito como una expresión: **4 + (6 ∥ 12)** o **5 + ((10 + 20) ∥ 30)**. Así puedes usar la calculadora C3, que entiende «+» para serie y «||» para paralelo, y te muestra cada paso de la reducción.

## Prueba en la simulación
El modo «Mixto» de la simulación S5 pone el primer foco en serie con el paralelo de los demás. Observa que el primer foco brilla más (lleva toda la corriente) y los del paralelo menos. ¿Qué pasa si fundes el primero? ¿Y uno del paralelo?`,
      form: [["Serie: Req = R₁ + R₂ · Paralelo: Req = R₁R₂/(R₁ + R₂)", "Se aplican por pasos, de dentro hacia fuera."], ["I = V / Req", "Corriente total del circuito reducido."]],
      ej: { enun: "Resuelve 2 Ω + (3 Ω ∥ 6 Ω) con una fuente de 12 V: corriente total y corrientes del paralelo.", pasos: ["3 ∥ 6 = 18 / 9 = 2 Ω.", "Req = 2 + 2 = 4 Ω.", "I = 12 / 4 = 3 A; en la de 2 Ω caen 6 V.", "Voltaje en el paralelo: 12 − 6 = 6 V.", "I(3 Ω) = 6 / 3 = 2 A; I(6 Ω) = 6 / 6 = 1 A. Suma: 3 A ✓."], res: "I total = 3 A; por 3 Ω pasan 2 A y por 6 Ω, 1 A." },
      vida: "En una casa, el cable que va del tablero a un cuarto (serie) alimenta varios aparatos en paralelo: es un circuito mixto. La resistencia del cable hace que, cuando enciendes muchos aparatos, el voltaje en el cuarto baje un poco.",
      err: ["Reducir resistencias que no están ni en serie ni en paralelo entre sí.", "Usar la corriente total en una rama del paralelo.", "No redibujar el circuito en cada paso y perderse."],
      ejer: [["Req de 10 + (20 ∥ 20).", "10 + 10 = 20 Ω."], ["Req de (4 + 2) ∥ 3.", "6 ∥ 3 = 2 Ω."], ["Con 18 V: 3 Ω + (6 Ω ∥ 6 Ω). ¿Corriente en cada rama de 6 Ω?", "Req = 6 Ω; I = 3 A; V paralelo = 9 V; cada rama 1,5 A."]],
      quiz: [
        { t: "num", p: "¿Cuál es la Req de 4 Ω + (6 Ω ∥ 12 Ω)?", r: 8, u: "Ω", e: "6 ∥ 12 = 4; 4 + 4 = 8 Ω." },
        { t: "num", p: "Con 24 V en el circuito anterior, ¿qué corriente pasa por la de 12 Ω?", r: 1, u: "A", e: "I = 3 A; V paralelo = 12 V; 12/12 = 1 A." },
        { t: "num", p: "¿Cuál es la Req de (10 + 20) ∥ 30, en serie con 5 Ω?", r: 20, u: "Ω", e: "30 ∥ 30 = 15; 15 + 5 = 20 Ω." },
        { t: "om", p: "Para resolver un mixto, primero…", o: ["Se calculan las corrientes de cada rama", "Se reduce a una resistencia equivalente", "Se mide con el multímetro", "Se usa la ley de Coulomb"], c: 1, e: "Reducir y luego deshacer." },
        { t: "om", p: "En el modo mixto de S5 (F1 en serie con el paralelo), ¿qué pasa si se funde F1?", o: ["Solo se apaga F1", "Se apagan todos", "Brillan más los demás", "Nada"], c: 1, e: "F1 está en el único camino hacia el paralelo." }
      ],
      res: ["Un circuito mixto combina partes en serie y en paralelo.", "Se reduce de dentro hacia fuera hasta una sola Req.", "Luego se deshace: en serie, misma corriente; en paralelo, mismo voltaje.", "Se escribe como expresión: 4 + (6 ∥ 12).", "Siempre se comprueba con la LCK y la LVK."]
    },
    {
      id: "4-8", t: "Ventajas, desventajas y ejemplos", d: "Series navideñas, por qué la casa está en paralelo, pilas en serie (más voltaje) y en paralelo (más capacidad).", min: 35, exp: "e-pilas-serie",
      preg: "¿Por qué un control remoto lleva dos pilas en fila y algunas linternas grandes llevan pilas lado a lado?",
      obj: ["Comparar serie y paralelo según el uso.", "Explicar el efecto de conectar pilas en serie y en paralelo.", "Elegir la conexión adecuada para una situación."],
      txt: `Serie y paralelo no son mejores ni peores: cada uno sirve para algo. Veamos cuándo se usa cada uno.

## Comparación rápida
| Característica | Serie | Paralelo |
|---|---|---|
| Caminos para la corriente | Uno | Varios |
| Corriente | Igual en todos | Se reparte; la total es la suma |
| Voltaje | Se reparte | Igual en todos |
| Resistencia equivalente | Suma (aumenta) | Disminuye |
| Si un elemento se abre | Todo se apaga | Los demás siguen |
| Al agregar elementos | Todos reciben menos | Los demás no cambian; la fuente da más corriente |

## Pilas en serie: más voltaje
Si conectas pilas **en serie** (el + de una con el − de la siguiente), sus voltajes **se suman**:
- 2 pilas AA → 3 V (control remoto).
- 4 pilas AA → 6 V.
- 6 celdas de plomo de 2 V → 12 V (batería de auto).

La capacidad (cuántas horas duran) **no** aumenta: es la de una pila, porque la misma corriente pasa por todas.

## Pilas en paralelo: más capacidad
Si conectas pilas **iguales** en **paralelo** (todos los + juntos y todos los − juntos), el voltaje es el de **una** pila, pero la **capacidad se suma**: duran más o pueden dar más corriente.
- 2 pilas AA en paralelo → 1,5 V, pero el doble de duración.

!> Nunca conectes en paralelo pilas o baterías **distintas** (de distinto voltaje, química o nivel de carga): la más cargada se descarga en la otra con corrientes grandes, se calientan y pueden derramarse o, si son de litio, incendiarse.

## Combinaciones: los packs de baterías
Las baterías de laptops, bicicletas eléctricas y autos eléctricos combinan ambas cosas. Un pack **«3S2P»** tiene 3 grupos en **serie** (S) de 2 celdas en **paralelo** (P). Con celdas de litio de 3,7 V y 2,5 Ah: 3 × 3,7 = 11,1 V y 2 × 2,5 = 5 Ah (lección 9.6).

## Ejemplos de la vida real
- **Casa:** todo en paralelo, para que cada aparato tenga el voltaje completo y funcione de forma independiente. Los interruptores y protecciones, en serie con lo que controlan.
- **Series navideñas antiguas:** en serie, para usar foquitos de bajo voltaje en la red. Inconveniente: un foco fundido apagaba todo.
- **Faros de un auto:** en paralelo, para que, si se funde uno, el otro siga funcionando.
- **Tiras LED:** grupos de LED en serie (con su resistencia) y los grupos en paralelo entre sí.
- **Calentadores con dos potencias:** dos resistencias que se conectan en serie (potencia baja) o en paralelo (potencia alta).

## Ejemplo de diseño
Tienes dos resistencias calefactoras iguales de 50 Ω y una fuente de 100 V.
- **En serie:** Req = 100 Ω, I = 1 A, P = 100 W (potencia baja).
- **En paralelo:** Req = 25 Ω, I = 4 A, P = 400 W (potencia alta, ¡cuatro veces más!).
Así funcionan algunos selectores de «mínimo» y «máximo» de estufas y secadoras.`,
      form: [["Serie: V total = V₁ + V₂ + … (capacidad de una)", "Pilas en serie."], ["Paralelo: V = V de una (capacidad = suma)", "Pilas iguales en paralelo."]],
      ej: { enun: "Tienes 4 celdas de 1,2 V y 2 000 mAh. ¿Qué voltaje y capacidad obtienes en serie? ¿Y en dos grupos de 2 en serie conectados en paralelo (2S2P)?", pasos: ["4 en serie: 4 × 1,2 = 4,8 V; capacidad 2 000 mAh.", "2S2P: voltaje de 2 en serie = 2,4 V; capacidad de 2 grupos en paralelo = 4 000 mAh.", "Energía en ambos casos: 4,8 × 2 = 9,6 Wh y 2,4 × 4 = 9,6 Wh."], res: "4S: 4,8 V y 2 000 mAh. 2S2P: 2,4 V y 4 000 mAh. La energía total es la misma (9,6 Wh)." },
      vida: "Los controles remotos y los juguetes ponen las pilas en serie para conseguir 3 V o 4,5 V. Las baterías de un auto eléctrico tienen cientos o miles de celdas combinadas en serie y paralelo para alcanzar cientos de voltios y decenas de kWh.",
      err: ["Pensar que las pilas en serie duran más: dan más voltaje, no más duración.", "Mezclar pilas nuevas y viejas en el mismo aparato.", "Conectar en paralelo baterías de distinto voltaje."],
      ejer: [["¿Qué voltaje dan 3 pilas AA en serie?", "4,5 V."], ["¿Qué pasa con la duración si pones dos pilas iguales en paralelo?", "Se duplica aproximadamente; el voltaje sigue siendo el de una."], ["Dos resistencias de 100 Ω a 200 V: ¿potencia en serie y en paralelo?", "Serie: 200² / 200 = 200 W. Paralelo: 200² / 50 = 800 W."]],
      quiz: [
        { t: "om", p: "Al conectar pilas en serie se obtiene…", o: ["Más voltaje", "Más capacidad, mismo voltaje", "Menos voltaje", "Corriente alterna"], c: 0, e: "Los voltajes se suman." },
        { t: "om", p: "Al conectar pilas iguales en paralelo se obtiene…", o: ["Más voltaje", "Mismo voltaje y más capacidad", "Menos capacidad", "El doble de voltaje y de capacidad"], c: 1, e: "Voltaje de una, capacidad sumada." },
        { t: "vf", p: "Es seguro conectar en paralelo una batería cargada con otra descargada.", c: false, e: "La cargada se descarga bruscamente en la otra: calor, derrames o incendio." },
        { t: "num", p: "Un pack 3S de celdas de 3,7 V, ¿qué voltaje tiene?", r: 11.1, u: "V", e: "3 × 3,7 = 11,1 V." },
        { t: "om", p: "¿Por qué los faros de un auto se conectan en paralelo?", o: ["Para que brillen menos", "Para que, si se funde uno, el otro siga encendido", "Para ahorrar cable", "Porque es obligatorio usar serie"], c: 1, e: "Cada faro tiene su propio camino." }
      ],
      res: ["La serie suma voltajes; el paralelo mantiene el voltaje y suma corrientes o capacidades.", "Las casas están en paralelo; interruptores y protecciones van en serie.", "Pilas en serie: más voltaje; iguales en paralelo: más capacidad.", "Nunca se conectan en paralelo baterías distintas.", "Combinando serie y paralelo se diseñan packs de baterías y calentadores de dos potencias."]
    },
    {
      id: "4-9", t: "Problemas integradores", d: "Seis problemas completos que combinan Ohm, Kirchhoff, serie, paralelo y potencia.", min: 45, calc: "C3",
      preg: "¿Puedes resolver un circuito completo, desde la resistencia equivalente hasta la potencia de cada componente?",
      obj: ["Integrar todos los conceptos del Nivel 1.", "Resolver circuitos mixtos completos.", "Calcular potencias y comprobar balances."],
      txt: `Estos seis problemas cierran el Nivel 1. Cada uno combina varias ideas. Intenta resolverlos en papel antes de leer la solución, y comprueba con las calculadoras C1 y C3.

## Problema 1: luces de una casa de muñecas
Una pila de 9 V alimenta tres foquitos de 30 Ω en paralelo, a través de un cable de 1 Ω en serie.
- Paralelo: 30 / 3 = 10 Ω. Req = 10 + 1 = **11 Ω**.
- I total = 9 / 11 ≈ **0,82 A**. Caída en el cable: 0,82 V.
- Voltaje en los focos: 9 − 0,82 ≈ 8,18 V; cada foco: 8,18 / 30 ≈ **0,27 A** y P ≈ 8,18² / 30 ≈ **2,2 W**.

## Problema 2: ¿qué foco brilla más?
Dos focos, uno de 60 Ω y otro de 120 Ω, se conectan **en serie** a 18 V.
- I = 18 / 180 = 0,1 A. P(60 Ω) = 0,1² × 60 = **0,6 W**; P(120 Ω) = 0,1² × 120 = **1,2 W**. En serie brilla más el de **mayor** resistencia.
- **En paralelo** a 18 V: P(60 Ω) = 18² / 60 = **5,4 W**; P(120 Ω) = 18² / 120 = **2,7 W**. En paralelo brilla más el de **menor** resistencia.

## Problema 3: sensor con divisor
Un sensor de luz (LDR) vale 10 kΩ a oscuras y 1 kΩ con luz. Forma un divisor con una resistencia fija de 10 kΩ (arriba) y la LDR (abajo), con 5 V.
- Oscuro: Vout = 5 × 10 / 20 = **2,5 V**.
- Con luz: Vout = 5 × 1 / 11 ≈ **0,45 V**.
Un circuito que encienda una luz cuando Vout supere 2 V funcionará como luz nocturna automática.

## Problema 4: la extensión
Un calefactor de 1 500 W para 127 V tiene una resistencia de 127² / 1 500 ≈ 10,75 Ω. Se conecta con una extensión cuyos dos conductores suman 0,5 Ω.
- Req = 11,25 Ω; I = 127 / 11,25 ≈ **11,3 A**.
- Potencia perdida en la extensión: 11,3² × 0,5 ≈ **64 W**, que calientan el cable.
- El calefactor recibe 127 − 11,3 × 0,5 ≈ 121,4 V.
Conclusión: para aparatos de calefacción, extensiones cortas y gruesas o conexión directa a la pared.

## Problema 5: el puente de dos ramas
Dos ramas en paralelo con 12 V: la rama A tiene 4 Ω + 8 Ω en serie; la rama B tiene 6 Ω + 6 Ω.
- I_A = 12 / 12 = 1 A; voltaje en el punto medio de A (sobre la de 8 Ω): 8 V.
- I_B = 12 / 12 = 1 A; voltaje en el punto medio de B: 6 V.
- Entre los dos puntos medios hay **2 V** de diferencia. Si los unes con un cable, circularía corriente entre las ramas. Este circuito, el **puente de Wheatstone**, se usa para medir resistencias con precisión.

## Problema 6: balance de energía
En el ejemplo 1 de la lección 4.7 (4 + (6 ∥ 12) con 24 V), comprueba el balance de potencias.
- Fuente: 24 × 3 = **72 W**.
- 4 Ω: 3² × 4 = 36 W; 6 Ω: 2² × 6 = 24 W; 12 Ω: 1² × 12 = 12 W. Suma: **72 W** ✓.

## Lo que has aprendido en el Nivel 1
Ya sabes qué son la carga, el voltaje, la corriente y la resistencia; sabes aplicar la ley de Ohm y las de Kirchhoff y resolver circuitos en serie, en paralelo y mixtos. ¡Haz el quiz del módulo para obtener el certificado del Nivel 1!`,
      form: [["P = I² · R = V² / R", "Potencia en una resistencia (adelanto del módulo 6)."], ["Σ P(fuentes) = Σ P(resistencias)", "Balance de potencias."]],
      ej: { enun: "Dos focos de 60 Ω y 120 Ω en paralelo con 18 V. ¿Qué corriente da la fuente y qué potencia total?", pasos: ["I₁ = 18 / 60 = 0,3 A; I₂ = 18 / 120 = 0,15 A.", "I total = 0,45 A.", "P total = 18 × 0,45 = 8,1 W.", "Comprobación: 5,4 + 2,7 = 8,1 W ✓."], res: "0,45 A y 8,1 W." },
      vida: "Los electricistas usan estos mismos cálculos para dimensionar circuitos: suman las corrientes de los aparatos en paralelo, tienen en cuenta la resistencia de los cables en serie y comprueban que la caída de voltaje y el calentamiento sean aceptables.",
      err: ["Pensar que siempre brilla más el foco de mayor potencia nominal: depende de cómo esté conectado.", "Olvidar la resistencia de los cables.", "No comprobar el balance de potencias."],
      ejer: [["Con 12 V: 2 Ω + (4 Ω ∥ 4 Ω). ¿Potencia total?", "Req = 4 Ω; I = 3 A; P = 36 W."], ["En serie, ¿brilla más el foco de mayor o de menor resistencia?", "El de mayor resistencia (P = I²R con la misma I)."], ["¿Qué potencia se pierde en un cable de 0,2 Ω con 10 A?", "P = 10² × 0,2 = 20 W."]],
      quiz: [
        { t: "om", p: "Dos focos distintos en serie: brilla más el de…", o: ["Menor resistencia", "Mayor resistencia", "Los dos igual", "El primero"], c: 1, e: "Misma corriente: P = I²R mayor donde R es mayor." },
        { t: "om", p: "Los mismos focos en paralelo: brilla más el de…", o: ["Menor resistencia", "Mayor resistencia", "Los dos igual", "El último"], c: 0, e: "Mismo voltaje: P = V²/R mayor donde R es menor." },
        { t: "num", p: "12 V con 2 Ω + (4 Ω ∥ 4 Ω). ¿Corriente total?", r: 3, u: "A", e: "Req = 2 + 2 = 4 Ω; I = 3 A." },
        { t: "num", p: "¿Qué potencia se pierde en un cable de 0,5 Ω por el que pasan 10 A?", r: 50, u: "W", e: "P = I²R = 100 × 0,5 = 50 W." },
        { t: "vf", p: "La potencia que entrega la fuente es igual a la suma de las potencias de todas las resistencias.", c: true, e: "Conservación de la energía." }
      ],
      res: ["Los circuitos reales combinan Ohm, Kirchhoff, serie y paralelo.", "En serie brilla más la mayor resistencia; en paralelo, la menor.", "La resistencia de los cables causa pérdidas y caídas de voltaje.", "Los divisores con sensores convierten magnitudes físicas en voltaje.", "El balance de potencias es la mejor comprobación final."]
    }
  ]
});
