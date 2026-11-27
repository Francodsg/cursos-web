// M12. Medición con multímetro
registrarModulo({
  id: "m12", n: 12, nivel: 3, titulo: "Medición con multímetro", quizMin: 25, quizN: 15, minEsperado: 310,
  aviso: "En este curso solo se mide con pilas y baterías de 9 V o menos. La medición de la red eléctrica se explica y se simula, pero no se practica.",
  objetivo: "Usar el multímetro con seguridad para medir voltaje, corriente, resistencia y continuidad, y diagnosticar fallas simples en circuitos de baja tensión.",
  clave: "multimetro tester polimetro medir voltaje corriente resistencia continuidad puntas perilla bornes fusible codigo de colores",
  actividades: ["Llenar la hoja de registro de mediciones de la lección 12.3 con 4 pilas.", "Resolver el reto de diagnóstico con el [multímetro virtual](#/simulacion/S15): identificar cuál de los elementos está dañado.", "Comprobar con la [calculadora de código de colores](#/calculadora/C9) el valor de tres resistencias antes de medirlas."],
  ejemplos: ["Una pila de 9 V que marca 7,2 V está casi descargada.", "Un resistor amarillo-violeta-rojo-dorado es 4,7 kΩ ±5 %: una lectura de 4,62 kΩ es correcta."],
  sims: ["S15"], calcs: ["C9"], gen: [],
  evaluacion: "Quiz de módulo de 15 preguntas (25 min), con preguntas para interpretar la pantalla y señalar las partes del multímetro. Se aprueba con el 70 %.",
  extra: [
    { t: "diag", p: "Toca el borne **COM** del multímetro (donde va siempre la punta negra).", dia: "multimetro", c: "com", cTexto: "el borne COM", e: "La punta negra va siempre en COM.", lec: "12-1" },
    { t: "diag", p: "Toca el borne donde va la punta roja para medir **voltaje o resistencia**.", dia: "multimetro", c: "vohm", cTexto: "el borne VΩmA", e: "Para voltaje y resistencia, la roja va en VΩmA.", lec: "12-2" },
    { t: "om", p: "La pantalla muestra «OL» al medir resistencia. Significa…", o: ["Que la resistencia es cero", "Que la resistencia es mayor que el rango (circuito abierto)", "Que la pila del multímetro está baja", "Que hay voltaje"], c: 1, e: "OL = fuera de rango: resistencia infinita o mayor que la escala.", lec: "12-5" }
  ],
  lecciones: [
    {
      id: "12-1", t: "Conoce el multímetro", d: "Pantalla, perilla, bornes COM, VΩmA y A/mA, puntas; analógico o digital; categorías CAT II, III y IV.", min: 35, e: true, sim: "S15",
      preg: "Un solo aparato que cabe en la mano mide voltaje, corriente y resistencia. ¿Cómo sabe qué medir?",
      obj: ["Identificar las partes de un multímetro digital.", "Distinguir las funciones de la perilla y los bornes.", "Entender qué significan las categorías de seguridad CAT."],
      txt: `El [[multímetro]] (también llamado **polímetro** o **tester**) es la herramienta básica de cualquier persona que trabaja con electricidad. Combina en un solo instrumento un **voltímetro**, un **amperímetro** y un **óhmetro**, y a menudo otras funciones.

## Partes de un multímetro digital
1. **Pantalla:** muestra el valor medido, su unidad, el signo (−) y símbolos como «OL» (fuera de rango) o el de batería baja.
2. **Perilla selectora:** elige **qué** medir y, en los modelos manuales, el **rango**:
   - **V⎓** (o DCV): voltaje de corriente directa.
   - **V~** (o ACV): voltaje de corriente alterna.
   - **Ω:** resistencia.
   - **🔊 / ▶|:** continuidad (pitido) y prueba de diodos.
   - **A⎓, A~, mA, µA:** corriente.
   - Otras: capacidad (F), frecuencia (Hz), temperatura (°C).
3. **Bornes** (entradas para las puntas):
   - **COM:** común, para la punta **negra**. Siempre.
   - **VΩmA** (o VΩ): para la punta **roja** al medir voltaje, resistencia, continuidad y corrientes pequeñas.
   - **10 A** (o 20 A): para la punta roja al medir corrientes grandes. Suele tener su propio **fusible**.
4. **Puntas de prueba:** cables con puntas metálicas aisladas y protecciones para los dedos.
5. Botones: **HOLD** (congela la lectura), **RANGE** (rango manual), **SELECT** (cambia entre funciones de una misma posición), luz de pantalla.

En la simulación S15 tienes un multímetro virtual con estas partes: puedes girar la perilla, cambiar el borne y medir circuitos de práctica.

## Analógico y digital
- **Analógico:** una aguja sobre una escala. Útil para ver tendencias, pero más difícil de leer y menos preciso.
- **Digital:** muestra números. Es el más común hoy: preciso, robusto y fácil de leer.

## Categorías de seguridad (CAT)
Los multímetros se clasifican según la **energía** de los circuitos donde pueden usarse sin riesgo ante picos de voltaje:
| Categoría | Dónde |
|---|---|
| CAT I | Electrónica de baja energía, sin conexión a la red |
| CAT II | Aparatos enchufados a contactos |
| CAT III | Instalación fija del edificio: tableros, circuitos derivados |
| CAT IV | Origen de la instalación: acometida, medidor, líneas exteriores |

Cada categoría va con un voltaje (por ejemplo, «CAT III 600 V»). Un multímetro barato sin categoría o solo CAT II **no** es seguro para medir un tablero: un pico de voltaje podría hacerlo estallar en las manos.

?> Para este curso basta un multímetro digital sencillo, porque **solo mediremos pilas y circuitos de 9 V o menos**.

## Precisión
La ficha técnica indica la precisión, por ejemplo «±(0,5 % + 2 dígitos)». Si mides 9,00 V, el error puede ser 0,5 % de 9 = 0,045 V más 2 en el último dígito (0,02 V): la lectura real está entre unos 8,93 y 9,07 V.`,
      vida: "Los técnicos de electrodomésticos, los mecánicos de autos y los electricistas usan el multímetro a diario. Con uno sencillo puedes saber si una pila está buena, si un cable está roto o si un fusible se fundió.",
      err: ["Poner la punta negra en un borne que no sea COM.", "Usar un multímetro sin categoría CAT adecuada en una instalación.", "Confundir V⎓ con V~."],
      ejer: [["¿En qué borne va siempre la punta negra?", "En COM."], ["¿Qué función de la perilla usarías para medir una pila?", "V⎓ (voltaje de corriente directa)."], ["¿Qué categoría CAT se requiere para medir dentro de un tablero?", "Al menos CAT III con el voltaje adecuado."]],
      quiz: [
        { t: "diag", p: "Toca la **perilla selectora** del multímetro.", dia: "multimetro", c: "perilla", cTexto: "la perilla redonda central", e: "La perilla elige la función y el rango." },
        { t: "om", p: "La punta negra se conecta siempre al borne…", o: ["10 A", "VΩmA", "COM", "Cualquiera"], c: 2, e: "COM es el común." },
        { t: "om", p: "¿Qué símbolo indica voltaje de corriente alterna?", o: ["V⎓", "V~", "Ω", "A⎓"], c: 1, e: "~ es alterna." },
        { t: "vf", p: "Un multímetro sin categoría CAT es adecuado para medir el tablero de una casa.", c: false, e: "Se necesita al menos CAT III; además, es trabajo de profesionales.", crit: true },
        { t: "om", p: "¿Qué muestra la pantalla cuando el valor supera el rango?", o: ["000", "OL", "HOLD", "CAT"], c: 1, e: "OL = fuera de rango." }
      ],
      res: ["El multímetro mide voltaje, corriente, resistencia y continuidad, entre otras cosas.", "La perilla elige la función; los bornes, dónde va la punta roja.", "La punta negra siempre va en COM.", "Las categorías CAT indican dónde puede usarse con seguridad.", "En este curso solo se mide hasta 9 V."]
    },
    {
      id: "12-2", t: "Antes de medir", d: "Revisar las puntas, elegir la función y el rango, autorrango y la regla de la mano en el bolsillo (explicada, no practicada en la red).", min: 30, e: true, sim: "S15",
      preg: "¿Qué puede salir mal si giras la perilla a «A» y luego mides una pila?",
      obj: ["Seguir una lista de comprobación antes de cada medición.", "Elegir correctamente función, rango y bornes.", "Conocer las reglas de seguridad de la medición."],
      txt: `La mayoría de los accidentes con multímetros (y de los multímetros quemados) ocurren por **errores de configuración** antes de medir. Por eso los profesionales siguen siempre una rutina.

## Lista de comprobación antes de medir
1. **Inspecciona** el multímetro y las puntas: sin grietas, sin cables pelados, sin puntas sueltas.
2. **Piensa qué vas a medir:** ¿voltaje, corriente, resistencia o continuidad? ¿Es CD o CA? ¿De qué orden es el valor?
3. **Gira la perilla** a la función correcta.
4. **Coloca las puntas** en los bornes correctos: negra en COM; roja en VΩmA para voltaje, resistencia y continuidad, o en 10 A solo para corrientes grandes.
5. **Elige el rango** (si el multímetro no es de autorrango): empieza por el **más alto** y baja hasta tener una lectura con buena resolución.
6. **Conecta** primero la punta negra y luego la roja; al terminar, retira primero la roja.
7. **Lee** el valor con su unidad y su signo.
8. **Al terminar**, vuelve la perilla a **apagado** o a **V**, y la punta roja al borne **VΩmA**. Así la próxima medición no empieza con el multímetro en modo corriente.

## El error clásico
Si el multímetro está en **modo corriente** (punta roja en 10 A o mA) y tocas los extremos de una pila o de un contacto **como si midieras voltaje**, estás conectando en paralelo un aparato que casi **no tiene resistencia**: es un **cortocircuito**. Con una pila, el fusible interno se funde. Con la red, puede producir un arco eléctrico y quemaduras graves. Pruébalo de forma segura en la simulación S15.

## Autorrango
Muchos multímetros modernos tienen **autorrango**: eligen solos la escala. Solo hay que seleccionar la función. Si no lo tienen:
- Para medir 9 V, elige el rango de 20 V (no el de 2 V, que daría «OL», ni el de 200 V, que daría poca resolución).
- Para medir 4,7 kΩ, el rango de 20 kΩ.

## Reglas de seguridad de la medición
- **Nunca** midas resistencia ni continuidad en un circuito **energizado**: desconecta la fuente.
- **Nunca** cambies de función con las puntas conectadas al circuito.
- No toques las partes metálicas de las puntas: sujétalas por detrás de las protecciones.
- Si el multímetro o las puntas están dañados, no los uses.
- Usa la categoría CAT adecuada.

## La regla de la «mano en el bolsillo»
Los electricistas que miden circuitos con voltaje peligroso usan, cuando pueden, **una sola mano** y mantienen la otra lejos (por eso «en el bolsillo»), para que, si algo falla, la corriente no atraviese el pecho de mano a mano. Es una de muchas precauciones profesionales.

!> En este curso **no se mide la red eléctrica**. La regla se explica para que entiendas por qué es un trabajo de profesionales.`,
      vida: "Muchos técnicos tienen la costumbre de dejar siempre el multímetro en V⎓ y con la punta roja en VΩmA al guardarlo: así evitan el error de medir voltaje en modo corriente.",
      err: ["Medir voltaje con la punta roja en el borne de corriente.", "Medir resistencia con el circuito energizado.", "Cambiar la perilla con las puntas tocando el circuito."],
      ejer: [["¿En qué rango medirías una pila de 9 V en un multímetro manual con rangos de 2, 20 y 200 V?", "En el de 20 V."], ["¿Qué haces al terminar de medir?", "Vuelvo la perilla a apagado o a V y la punta roja a VΩmA."], ["¿Por qué no se mide resistencia en un circuito con voltaje?", "Porque la lectura es falsa y puede dañar el multímetro."]],
      quiz: [
        { t: "ord", p: "Ordena los pasos antes de medir:", o: ["Inspeccionar el multímetro y las puntas", "Elegir la función con la perilla", "Colocar las puntas en los bornes correctos", "Conectar las puntas al circuito y leer"], e: "Revisar, configurar y luego medir." },
        { t: "om", p: "Si mides el voltaje de una pila con el multímetro en modo corriente…", o: ["Lees el voltaje normalmente", "Haces un cortocircuito y puedes fundir el fusible", "No pasa nada", "Lees la resistencia"], c: 1, e: "En modo corriente el multímetro casi no tiene resistencia." },
        { t: "vf", p: "Se puede medir resistencia en un circuito con la pila conectada.", c: false, e: "Siempre sin energía." },
        { t: "om", p: "En un multímetro sin autorrango, para medir un valor desconocido conviene empezar por…", o: ["El rango más bajo", "El rango más alto", "Cualquier rango", "El modo corriente"], c: 1, e: "Y bajar hasta una lectura con buena resolución." },
        { t: "om", p: "Al guardar el multímetro, la punta roja debe quedar en…", o: ["10 A", "VΩmA", "COM", "Fuera"], c: 1, e: "Para que la próxima medición no empiece en modo corriente." }
      ],
      res: ["Revisa el equipo, elige la función, los bornes y el rango antes de medir.", "Medir voltaje en modo corriente es un cortocircuito.", "La resistencia y la continuidad se miden sin energía.", "Al terminar, perilla en V o apagado y punta roja en VΩmA.", "La red eléctrica solo la miden profesionales con equipo CAT adecuado."]
    },
    {
      id: "12-3", t: "Medir voltaje de CD paso a paso", d: "Pilas y baterías; polaridad; signo negativo en pantalla; interpretar una pila «agotada».", min: 35, e: true, sim: "S15", exp: "e-medir-pilas",
      preg: "Tu linterna no enciende. ¿Es la pila o es el foco?",
      obj: ["Medir el voltaje de una pila o batería.", "Interpretar el signo negativo y la polaridad.", "Decidir si una pila está buena, débil o agotada."],
      txt: `Medir voltaje de corriente directa es la medición más sencilla y la más útil para empezar. El voltímetro se conecta **en paralelo**, tocando los **dos puntos** entre los que quieres conocer el voltaje.

## Paso a paso: medir una pila
1. Perilla en **V⎓** (rango de 20 V si es manual).
2. Punta **negra en COM** y **roja en VΩmA**.
3. Toca el **polo negativo** de la pila con la punta **negra** y el **positivo** con la **roja**.
4. Lee el valor: por ejemplo, **1,58 V**.

## El signo negativo
Si inviertes las puntas (roja en el − y negra en el +), la pantalla muestra **−1,58 V**. No pasa nada: el multímetro digital simplemente indica que la polaridad es la contraria. Es útil para **identificar el polo positivo** de un cable o de un adaptador sin marcas.

## ¿Buena, débil o agotada?
| Tipo | Nueva | A media vida | Agotada |
|---|---|---|---|
| Alcalina AA/AAA/C/D (1,5 V) | 1,55–1,65 V | 1,3 V | 1,0 V o menos |
| Batería de 9 V alcalina | 9,3–9,6 V | 8,0 V | 7,0 V o menos |
| NiMH recargable (1,2 V) | 1,35–1,45 V (recién cargada) | 1,2 V | 1,0 V |
| Litio-ion (3,7 V) | 4,2 V | 3,7 V | 3,0–3,3 V |

Ejemplo: una batería de 9 V que marca **7,2 V** está casi agotada.

## Medir sin carga y con carga
Una pila débil puede dar un voltaje aceptable **sin carga** (sin nada conectado) y caer mucho cuando le pides corriente, por su resistencia interna (lección 9.1). Para un diagnóstico más fiable, mide el voltaje **mientras alimenta el aparato** (por ejemplo, con la linterna encendida). Si cae mucho, la pila está débil aunque «en vacío» parezca buena.

## Medir voltajes en un circuito
Puedes medir el voltaje en cualquier componente de un circuito de pilas: pon las puntas en sus dos patitas con el circuito funcionando. Por ejemplo, en un circuito de pila de 9 V con una resistencia y un LED rojo medirás unos **2 V** en el LED y unos **7 V** en la resistencia: ¡la ley de voltajes de Kirchhoff en acción!

## La respuesta a la pregunta inicial
Mide las pilas de la linterna. Si están por encima de 1,3 V cada una (alcalinas), el problema probablemente es el foco, el interruptor o un contacto oxidado (lección 12.8).

## Hoja de registro
En el experimento de esta lección mide 4 pilas distintas, anota el voltaje sin carga y con carga, y ordénalas de mejor a peor.`,
      form: [["Voltímetro en paralelo: punta roja en el punto +, negra en el −", "Una lectura negativa indica polaridad invertida."]],
      ej: { enun: "En un circuito de pila de 9 V con una resistencia y un LED, mides 2,0 V en el LED. ¿Cuánto esperas medir en la resistencia? Compruébalo.", pasos: ["LVK: V(pila) = V(resistencia) + V(LED).", "V(resistencia) = 9 − 2,0 = 7,0 V.", "Si la pila está algo gastada (8,6 V), medirás 6,6 V en la resistencia."], res: "Unos 7 V en la resistencia (si la pila da 9 V)." },
      vida: "Los mecánicos miden el voltaje de la batería del auto: unos 12,6 V en reposo indica carga completa; con el motor encendido debe marcar 13,8–14,5 V (el alternador está cargando).",
      err: ["Medir con el multímetro en V~ una pila (da casi cero).", "Asustarse por un signo negativo.", "Juzgar una pila solo por su voltaje sin carga."],
      ejer: [["Una pila AA marca 1,05 V. ¿Cómo está?", "Prácticamente agotada."], ["Mides −9,1 V en una batería. ¿Qué significa?", "Que las puntas están invertidas; la batería tiene 9,1 V."], ["¿Cómo se conecta el voltímetro?", "En paralelo, en los dos puntos cuyo voltaje quieres medir."]],
      quiz: [
        { t: "om", p: "Para medir el voltaje de una pila, el multímetro se conecta…", o: ["En serie", "En paralelo, tocando sus dos polos", "Solo al polo positivo", "Con la pila desconectada de todo y en modo corriente"], c: 1, e: "El voltímetro va en paralelo." },
        { t: "om", p: "La pantalla muestra −1,52 V. Esto significa que…", o: ["La pila está dañada", "Las puntas están al revés", "La pila es de CA", "El multímetro está roto"], c: 1, e: "Solo indica polaridad invertida." },
        { t: "om", p: "Una batería de 9 V marca 7,2 V. Está…", o: ["Nueva", "Casi agotada", "Sobrecargada", "Es de 12 V"], c: 1, e: "Por debajo de unos 7,5 V está casi agotada." },
        { t: "vf", p: "Una pila débil puede marcar bien sin carga y caer mucho al alimentar un aparato.", c: true, e: "Por su resistencia interna." },
        { t: "num", p: "En un circuito de 9 V mides 2,1 V en el LED. ¿Cuánto debe haber en la resistencia en serie?", r: 6.9, u: "V", e: "9 − 2,1 = 6,9 V (LVK)." }
      ],
      res: ["El voltaje de CD se mide con la perilla en V⎓, en paralelo.", "Punta roja en el +, negra en el −; un signo negativo indica polaridad invertida.", "Una alcalina por debajo de 1,0–1,1 V está agotada.", "Medir con carga revela pilas débiles.", "En un circuito, las caídas de voltaje suman el voltaje de la fuente."]
    },
    {
      id: "12-4", t: "Medir voltaje de CA", d: "El procedimiento explicado con simulación; en la práctica, solo personas capacitadas con equipo CAT adecuado.", min: 35, sim: "S15", exp: "e-red-osciloscopio",
      preg: "¿Por qué el curso te enseña a medir la red, pero te pide que no lo hagas?",
      obj: ["Conocer el procedimiento profesional para medir el voltaje de la red.", "Entender los riesgos de esa medición.", "Interpretar las lecturas de voltaje alterno."],
      txt: `Medir el voltaje de un contacto es una tarea habitual para un electricista, pero implica **tocar con las puntas partes con voltaje peligroso**. Por eso en este curso **se explica y se simula, pero no se practica**.

!> No midas la red eléctrica con el multímetro del curso. Hazlo solo en la simulación S15. Si alguna vez te formas como electricista, aprenderás a hacerlo con supervisión, equipo certificado y protección.

## Qué mide el multímetro en V~
En la función **V~**, el multímetro mide el **valor eficaz** (RMS) del voltaje alterno (lección 5.5). En un contacto de la red de 127 V marcará algo entre 115 y 135 V según la hora; en una de 230 V, entre 207 y 253 V. El valor pico ({{VP}}) no aparece en la pantalla.

Los multímetros **«RMS verdadero»** miden bien también ondas deformadas; los más baratos suponen una senoidal perfecta y pueden equivocarse con ondas que no lo son (por ejemplo, la salida de un atenuador).

## El procedimiento profesional (solo para entender)
1. Usar un multímetro de **categoría CAT III** (o superior) con el voltaje adecuado, y puntas en perfecto estado con protecciones.
2. **Verificar el multímetro** en una fuente conocida antes y después (para asegurarse de que funciona: un multímetro roto que marca 0 V puede hacer creer que no hay voltaje).
3. Perilla en **V~**, punta negra en **COM**, roja en **VΩ**.
4. Sujetar las puntas **por detrás de las protecciones**, sin tocar el metal.
5. Introducir las puntas en las ranuras del contacto (fase y neutro), sin forzar, y leer.
6. Retirar las puntas y volver a verificar el multímetro.

## Lecturas típicas en un contacto
| Entre | Red de 127 V | Red de 230 V |
|---|---|---|
| Fase y neutro | ≈ 127 V | ≈ 230 V |
| Fase y tierra | ≈ 127 V | ≈ 230 V |
| Neutro y tierra | ≈ 0 V (unos pocos voltios) | ≈ 0 V |

Si entre neutro y tierra hay un voltaje alto, o entre fase y tierra no hay voltaje, la instalación tiene un problema que debe revisar un electricista.

## Errores que la simulación te muestra
- Medir la red en **V⎓**: la lectura es casi cero o sin sentido, porque la CA promedia cero.
- Medir con la punta roja en **10 A**: un cortocircuito directo de la red a través del multímetro, con un arco eléctrico. Muy peligroso.
- Medir resistencia o continuidad en un contacto: lectura falsa y riesgo de dañar el equipo.

## Detectores sin contacto
Los electricistas usan también **detectores de voltaje sin contacto** (con forma de bolígrafo), que pitan cerca de un cable con voltaje. Son útiles para una primera comprobación, pero **no son infalibles**: siempre se confirma con un multímetro adecuado.`,
      vida: "Cuando un electricista va a trabajar en un circuito, primero corta el interruptor y después comprueba con el multímetro que realmente no hay voltaje: «verificar la ausencia de tensión» es la regla número uno de su oficio.",
      err: ["Medir la red con un multímetro barato sin categoría.", "Confiar en un multímetro sin verificar que funciona.", "Medir la red en V⎓ o con la punta en el borne de corriente."],
      ejer: [["¿Qué valor muestra el multímetro en V~: el eficaz o el pico?", "El eficaz (RMS)."], ["¿Qué voltaje debería haber entre neutro y tierra en un contacto en buen estado?", "Casi cero (unos pocos voltios)."], ["¿Por qué se verifica el multímetro antes y después de medir?", "Para asegurarse de que funciona y no dar por buena una lectura falsa de 0 V."]],
      quiz: [
        { t: "vf", p: "En este curso se practica la medición de los contactos de la casa.", c: false, e: "Solo se explica y se simula; es trabajo de profesionales.", crit: true },
        { t: "om", p: "En la función V~, el multímetro muestra…", o: ["El voltaje pico", "El valor eficaz (RMS)", "La frecuencia", "La corriente"], c: 1, e: "El valor eficaz." },
        { t: "om", p: "¿Qué categoría mínima se recomienda para medir en un tablero?", o: ["CAT I", "CAT II", "CAT III", "Ninguna"], c: 2, e: "CAT III o superior con el voltaje adecuado." },
        { t: "om", p: "Si mides la red con la punta roja en el borne de 10 A…", o: ["Mides la corriente de la casa", "Haces un cortocircuito peligroso con arco eléctrico", "No pasa nada", "Mides el voltaje pico"], c: 1, e: "Es uno de los errores más peligrosos." },
        { t: "om", p: "Entre fase y neutro de un contacto de 230 V esperas medir…", o: ["0 V", "Unos 230 V", "325 V", "12 V"], c: 1, e: "El valor eficaz de la red." }
      ],
      res: ["Medir la red es trabajo de profesionales; en el curso solo se simula.", "En V~ el multímetro muestra el valor eficaz.", "Se necesita equipo CAT III o superior y puntas en buen estado.", "Siempre se verifica el multímetro antes y después.", "Entre neutro y tierra debe haber casi 0 V."]
    },
    {
      id: "12-5", t: "Medir resistencia", d: "Siempre con el circuito sin energía; código de colores; tolerancia.", min: 40, e: true, sim: "S15", calc: "C9", exp: "e-medir-resistores",
      preg: "¿Cómo compruebas si una resistencia tiene el valor que dicen sus colores?",
      obj: ["Medir resistencias correctamente.", "Leer el código de colores y la tolerancia.", "Interpretar «OL» y los valores fuera de tolerancia."],
      txt: `Para medir resistencia, el multímetro **aplica su propio pequeño voltaje** (con su pila interna) y mide la corriente que pasa. Con la ley de Ohm calcula R. Por eso:

!> La resistencia se mide **siempre sin energía**: desconecta la pila o la fuente. Si el circuito tiene voltaje, la lectura es falsa y el multímetro puede dañarse.

## Paso a paso
1. **Desconecta** la alimentación del circuito.
2. Si es posible, **saca la resistencia** del circuito o levanta una de sus patitas: si mides dentro del circuito, otros componentes en paralelo alteran la lectura.
3. Perilla en **Ω** (rango adecuado si es manual).
4. Punta negra en **COM**, roja en **VΩ**.
5. Junta las puntas: debe marcar casi **0 Ω** (la resistencia de las propias puntas, 0,1–0,5 Ω).
6. Toca los dos extremos de la resistencia. La polaridad no importa.
7. **No toques** con los dedos las dos patitas a la vez: tu cuerpo (cientos de kΩ) queda en paralelo y altera las lecturas altas.

## Interpretar la pantalla
- **Un número con Ω, kΩ o MΩ:** la resistencia.
- **OL** (fuera de rango): la resistencia es mayor que la escala o **infinita**: circuito abierto, componente roto o cable cortado.
- **Casi 0:** cortocircuito o un conductor.

## El código de colores
Los resistores pequeños llevan su valor en **bandas de colores** ([[código de colores]]):

| Color | Dígito | Multiplicador | Tolerancia |
|---|---|---|---|
| Negro | 0 | ×1 | — |
| Marrón | 1 | ×10 | ±1 % |
| Rojo | 2 | ×100 | ±2 % |
| Naranja | 3 | ×1 000 | — |
| Amarillo | 4 | ×10 000 | — |
| Verde | 5 | ×100 000 | ±0,5 % |
| Azul | 6 | ×1 000 000 | ±0,25 % |
| Violeta | 7 | ×10 000 000 | ±0,1 % |
| Gris | 8 | — | ±0,05 % |
| Blanco | 9 | — | — |
| Dorado | — | ×0,1 | ±5 % |
| Plateado | — | ×0,01 | ±10 % |

**Con 4 bandas:** dígito, dígito, multiplicador, tolerancia. **Con 5 bandas:** tres dígitos, multiplicador y tolerancia.

Regla mnemotécnica de los dígitos (0 a 9): **ne**gro, **ma**rrón, **ro**jo, **na**ranja, **am**arillo, **ve**rde, **az**ul, **vi**oleta, **gr**is, **bl**anco.

## Ejemplo
Amarillo – violeta – rojo – dorado: 4, 7, ×100, ±5 % → **4 700 Ω = 4,7 kΩ ±5 %**. El valor real puede estar entre 4 465 y 4 935 Ω. Si mides **4,62 kΩ**, la resistencia está **bien**. Si mides 5,8 kΩ, está fuera de tolerancia (quizá se dañó por calentamiento).

Usa la calculadora C9 para pasar de colores a ohmios y al revés, y el multímetro virtual S15 para practicar.`,
      form: [["4 bandas: R = (d₁d₂) × multiplicador", "Ejemplo: amarillo-violeta-rojo = 47 × 100 = 4 700 Ω."], ["Rango aceptable = R × (1 ± tolerancia)", "4,7 kΩ ±5 %: de 4,465 a 4,935 kΩ."]],
      ej: { enun: "Una resistencia es marrón – negro – naranja – dorado. ¿Cuánto vale y qué rango de lecturas es aceptable?", pasos: ["Marrón = 1, negro = 0 → 10.", "Naranja = ×1 000 → 10 × 1 000 = 10 000 Ω = 10 kΩ.", "Dorado = ±5 % → ±500 Ω.", "Rango: 9,5 kΩ a 10,5 kΩ."], res: "10 kΩ ±5 %: lecturas entre 9,5 y 10,5 kΩ son correctas." },
      vida: "Los técnicos que reparan placas electrónicas miden resistencias para encontrar componentes quemados: una resistencia ennegrecida suele marcar OL o un valor muy distinto del de sus colores.",
      err: ["Medir con el circuito energizado.", "Tocar las dos patitas con los dedos al medir resistencias altas.", "Leer el código de colores empezando por la banda de tolerancia."],
      ejer: [["Rojo-rojo-marrón-dorado: ¿valor?", "220 Ω ±5 %."], ["Marrón-negro-negro-marrón-marrón (5 bandas): ¿valor?", "1 kΩ ±1 %."], ["El multímetro marca OL al medir un fusible. ¿Qué significa?", "Que está abierto (fundido)."]],
      quiz: [
        { t: "vf", p: "La resistencia se puede medir con el circuito conectado a la pila.", c: false, e: "Siempre sin energía." },
        { t: "num", p: "¿Cuántos ohmios es una resistencia amarillo-violeta-rojo-dorado?", r: 4700, u: "Ω", e: "47 × 100 = 4 700 Ω." },
        { t: "om", p: "Una resistencia de 4,7 kΩ ±5 % marca 4,62 kΩ. Está…", o: ["Dañada", "Dentro de la tolerancia: bien", "En cortocircuito", "Abierta"], c: 1, e: "El rango aceptable es 4,465–4,935 kΩ." },
        { t: "om", p: "Al medir un cable, la pantalla marca OL. El cable…", o: ["Está en perfecto estado", "Está cortado (circuito abierto)", "Tiene voltaje", "Es de cobre"], c: 1, e: "Resistencia infinita." },
        { t: "om", p: "En el código de colores, el rojo como dígito vale…", o: ["1", "2", "3", "0"], c: 1, e: "Negro 0, marrón 1, rojo 2." }
      ],
      res: ["La resistencia se mide sin energía, idealmente fuera del circuito.", "El multímetro usa su propia pila y la ley de Ohm.", "OL significa resistencia infinita o fuera de rango.", "El código de colores da el valor y la tolerancia.", "Una lectura dentro de la tolerancia indica que el resistor está bien."]
    },
    {
      id: "12-6", t: "Medir corriente", d: "El multímetro va en serie; cambiar de borne; el fusible interno y el error que quema el multímetro.", min: 40, e: true, sim: "S15", exp: "e-medir-corriente-led",
      preg: "¿Por qué para medir la corriente hay que «cortar» el circuito?",
      obj: ["Conectar el amperímetro en serie.", "Elegir el borne y el rango correctos.", "Evitar el error que funde el fusible del multímetro."],
      txt: `Medir corriente es distinto de medir voltaje. Para saber cuánta corriente **pasa** por un punto, la corriente tiene que **atravesar el multímetro**. Por eso el amperímetro se conecta **en serie**: hay que **abrir el circuito** e intercalarlo.

## El multímetro en modo corriente
En modo amperímetro, el multímetro tiene una resistencia interna **muy pequeña** (un derivador de décimas de ohmio) para no alterar el circuito. Esa es justamente la razón del peligro: si lo conectas en **paralelo** con una fuente, es como un cable: **cortocircuito**.

## Paso a paso: medir la corriente de un LED
1. Arma el circuito: pila de 9 V → resistencia → LED → regreso a la pila.
2. **Desconecta** la pila.
3. Perilla en **mA⎓** (o A⎓, en el rango adecuado).
4. Punta negra en **COM**; roja en **mA** (o en **10 A** si esperas más de unos 200–400 mA). Si no sabes cuánto esperar, empieza por el borne de 10 A.
5. **Abre** el circuito en un punto (por ejemplo, entre la pila y la resistencia).
6. Conecta la punta **roja** al lado que viene del **+** de la pila y la **negra** al lado que va hacia la resistencia: el multímetro queda **en serie**.
7. Conecta la pila y lee: por ejemplo **18,2 mA**.
8. Desconecta, retira el multímetro, cierra el circuito y **vuelve la punta roja a VΩ**.

Si la lectura sale negativa, la corriente va al revés de como pusiste las puntas.

## El fusible interno
El borne de mA está protegido por un **fusible** pequeño (por ejemplo, 200 o 400 mA) y el de 10 A por otro mayor (o ninguno en los modelos baratos). Si se excede la corriente, el fusible se funde para proteger el multímetro. Síntoma: el multímetro mide voltaje bien, pero **en corriente siempre marca 0**. Se reemplaza por uno **igual** (mismo valor y tipo), nunca por un alambre.

## El error que quema el multímetro
!> Medir corriente **en paralelo** (por ejemplo, tocando los polos de una pila con el multímetro en modo corriente) es un cortocircuito: se funde el fusible. En la red, sería un arco eléctrico peligroso.

## Corriente sin cortar el circuito: la pinza
Las **pinzas amperimétricas** miden la corriente de un cable **abrazándolo**, sin abrir el circuito, detectando el campo magnético que la corriente crea (lección 7.3). Ojo: hay que abrazar **un solo conductor**; si abrazas fase y neutro a la vez, los campos se cancelan y marca casi cero (¡así funciona el diferencial!).

## Practica en la simulación
En el multímetro virtual S15, elige «A (mA)», el circuito del LED y prueba a conectar «abriendo el circuito (serie)»: verás unos 18 mA. Luego prueba «en los dos extremos (paralelo)» con una pila: verás el fusible fundirse… sin ningún riesgo.`,
      form: [["Amperímetro en serie (resistencia interna ≈ 0)", "Toda la corriente debe atravesarlo."], ["Voltímetro en paralelo (resistencia interna muy alta)", "Comparación: el voltímetro casi no toma corriente."]],
      ej: { enun: "En un circuito de pila de 9 V, resistencia de 390 Ω y LED rojo (2 V), ¿qué corriente esperas medir?", pasos: ["Voltaje en la resistencia: 9 − 2 = 7 V.", "I = 7 / 390 ≈ 0,018 A.", "≈ 18 mA: usa el borne de mA (está por debajo de su fusible de 200–400 mA)."], res: "Unos 18 mA." },
      vida: "Los técnicos miden la corriente de reposo de un aparato con pilas (por ejemplo, un control remoto) para saber si algo está consumiendo de más cuando debería estar apagado.",
      err: ["Conectar el amperímetro en paralelo.", "Medir una corriente grande en el borne de mA.", "Olvidar volver la punta roja a VΩ."],
      ejer: [["¿Cómo se conecta el amperímetro?", "En serie, abriendo el circuito."], ["El multímetro mide voltaje bien pero la corriente siempre da 0. ¿Qué pasa?", "Probablemente el fusible del borne de corriente está fundido."], ["¿Por qué una pinza amperimétrica marca casi 0 si abrazas fase y neutro juntos?", "Porque las corrientes son opuestas y sus campos se cancelan."]],
      quiz: [
        { t: "om", p: "Para medir corriente, el multímetro se conecta…", o: ["En paralelo", "En serie", "A tierra", "Sin conexión"], c: 1, e: "La corriente debe atravesarlo." },
        { t: "om", p: "En modo corriente, la resistencia interna del multímetro es…", o: ["Muy alta", "Muy pequeña", "Infinita", "Igual a la del circuito"], c: 1, e: "Por eso en paralelo hace un cortocircuito." },
        { t: "vf", p: "Si el fusible interno se funde, se puede sustituir por un alambre.", c: false, e: "Se sustituye por uno igual." },
        { t: "num", p: "Pila de 9 V, resistencia de 390 Ω y LED de 2 V. ¿Corriente esperada en mA?", r: 17.95, u: "", e: "(9 − 2)/390 ≈ 0,018 A ≈ 18 mA." },
        { t: "om", p: "Si no sabes cuánta corriente vas a medir, empieza por…", o: ["El borne de mA", "El borne de 10 A", "El modo voltaje", "El modo resistencia"], c: 1, e: "Para no fundir el fusible de mA." }
      ],
      res: ["La corriente se mide en serie, abriendo el circuito.", "En modo corriente el multímetro casi no tiene resistencia.", "Conectarlo en paralelo es un cortocircuito y funde el fusible.", "Elige el borne mA o 10 A según la corriente esperada.", "Las pinzas amperimétricas miden sin cortar, abrazando un solo conductor."]
    },
    {
      id: "12-7", t: "Continuidad y prueba de diodo", d: "El pitido; cables y fusibles; polaridad de un LED.", min: 30, sim: "S15", exp: "e-continuidad",
      preg: "¿Cómo encuentras un cable roto por dentro si por fuera parece perfecto?",
      obj: ["Usar la función de continuidad.", "Comprobar cables, fusibles e interruptores.", "Usar la prueba de diodo para identificar la polaridad de un LED."],
      txt: `## La continuidad
La [[continuidad]] indica si existe un **camino eléctrico** entre dos puntos. En esta función (símbolo 🔊 o de una onda de sonido), el multímetro mide la resistencia y **pita** si es muy baja (normalmente menos de 30–50 Ω). Así puedes probar sin mirar la pantalla.

!> Igual que la resistencia: **siempre sin energía**.

## Qué puedes comprobar
- **Cables:** toca los dos extremos de un mismo conductor. Si pita, está bien; si no, está **cortado** por dentro. Muévelo mientras mides: si pita a ratos, tiene un falso contacto.
- **Fusibles** (de aparatos, autos o del propio multímetro): un fusible bueno pita; uno fundido marca OL.
- **Interruptores:** pita en «encendido» y no pita en «apagado».
- **Cortocircuitos:** entre dos conductores que **no** deberían estar unidos (por ejemplo, los dos cables de una extensión), **no** debe pitar. Si pita, hay un corto.
- **Pistas de circuitos impresos** y soldaduras.

## La respuesta a la pregunta inicial
Desconecta el aparato y pon una punta en cada extremo de un mismo hilo del cable (por ejemplo, en una pata del enchufe y en el borne correspondiente del aparato). Si no pita, o pita solo al doblar el cable en cierta posición, el cable está roto en ese punto.

## La prueba de diodo
En la posición **▶|** (diodo), el multímetro aplica un pequeño voltaje y muestra la **caída de voltaje** del diodo cuando conduce:
- Punta **roja en el ánodo** (+) y **negra en el cátodo** (−, la banda): el diodo conduce y marca su voltaje directo: unos **0,5–0,7 V** en un diodo de silicio; **1,6–3,2 V** en un LED (a veces el LED incluso se ilumina débilmente).
- Al revés: **OL**, porque el diodo bloquea.
- Si marca casi 0 en ambos sentidos, el diodo está en **cortocircuito**; si marca OL en ambos, está **abierto**.

Así puedes saber cuál es la patita **positiva** de un LED al que le cortaron las patas (normalmente la larga es el ánodo).

## Ejemplos de lecturas
| Elemento | Lectura | Interpretación |
|---|---|---|
| Cable sano | Pitido, 0,2–0,5 Ω | Bien |
| Cable cortado | OL, sin pitido | Roto |
| Fusible fundido | OL | Reemplazar |
| LED en directo | ≈ 1,8–2 V (rojo) | Bien; roja en el ánodo |
| LED en inverso | OL | Normal |

En el multímetro virtual S15 elige «Continuidad» y mide el cable bueno y el cable roto.`,
      vida: "Los técnicos de redes usan la continuidad para encontrar cables de red rotos, y los mecánicos para revisar fusibles y cableados del auto.",
      err: ["Probar continuidad en un circuito con voltaje.", "Concluir que un cable está bien sin moverlo mientras se mide.", "Confundir la prueba de diodo con la de resistencia."],
      ejer: [["Un fusible de auto no pita. ¿Qué significa?", "Está fundido (abierto)."], ["En prueba de diodo, un LED marca 1,9 V con la roja en una pata y OL al revés. ¿Cuál es el ánodo?", "La pata donde estaba la punta roja cuando marcó 1,9 V."], ["Entre los dos cables de una extensión desenchufada, el multímetro pita. ¿Qué pasa?", "Hay un cortocircuito entre ellos: no se debe usar."]],
      quiz: [
        { t: "om", p: "En la función de continuidad, el multímetro pita cuando…", o: ["Hay voltaje", "La resistencia entre las puntas es muy baja", "La corriente es alta", "Hay un diodo"], c: 1, e: "Indica un camino eléctrico." },
        { t: "om", p: "Un fusible en buen estado, en continuidad…", o: ["Marca OL", "Pita", "Marca 9 V", "Se enciende"], c: 1, e: "Uno fundido marca OL." },
        { t: "vf", p: "La continuidad se prueba con el circuito sin energía.", c: true, e: "Igual que la resistencia." },
        { t: "om", p: "En la prueba de diodo, un LED rojo en sentido directo marca aproximadamente…", o: ["0 V", "0,2 V", "1,8–2 V", "9 V"], c: 2, e: "Su voltaje directo." },
        { t: "om", p: "Un diodo marca OL en ambos sentidos. Está…", o: ["Bien", "Abierto (dañado)", "En cortocircuito", "Polarizado"], c: 1, e: "No conduce en ningún sentido." }
      ],
      res: ["La continuidad indica con un pitido si hay camino entre dos puntos.", "Sirve para revisar cables, fusibles e interruptores.", "Siempre se prueba sin energía.", "La prueba de diodo muestra el voltaje directo y la polaridad.", "OL en ambos sentidos: diodo abierto; casi 0 en ambos: en corto."]
    },
    {
      id: "12-8", t: "Diagnóstico práctico", d: "Linterna que no enciende, cable roto, fusible de juguete y pila débil bajo carga.", min: 40, sim: "S15",
      preg: "Tienes un juguete de pilas que no funciona. ¿Por dónde empiezas a buscar la falla?",
      obj: ["Aplicar un método ordenado de diagnóstico.", "Combinar mediciones de voltaje, continuidad y corriente.", "Resolver fallas típicas de aparatos de baja tensión."],
      txt: `Diagnosticar es como ser detective: se forman hipótesis y se comprueban con mediciones, **de lo más simple a lo más complejo**.

## Método general
1. **Observa:** ¿hay olor a quemado, piezas rotas, pilas sulfatadas (polvo blanco), cables sueltos?
2. **Empieza por la fuente:** ¿llega energía? Mide las pilas **con carga**.
3. **Sigue el camino de la corriente:** desde la fuente, por el interruptor y los cables, hasta el componente que debe funcionar.
4. **Divide el problema:** mide en un punto intermedio; si ahí hay voltaje, el problema está después; si no, está antes.
5. **Comprueba los componentes sospechosos** sin energía (continuidad, resistencia, diodo).
6. **Repara y vuelve a probar.**

## Caso 1: la linterna que no enciende
1. Mide las pilas: 1,55 V cada una → buenas.
2. Mide con la linterna encendida en los extremos del portapilas: 3,1 V → la energía llega al portapilas.
3. Continuidad del interruptor: no pita en «encendido» → **interruptor dañado** (o sus contactos oxidados).
4. Solución: limpiar los contactos con una goma de borrar o alcohol isopropílico, o cambiar el interruptor.
Si el interruptor estuviera bien, la siguiente sospecha sería el **foco**: continuidad del filamento (OL = fundido) o, si es LED, prueba de diodo.

## Caso 2: el cable que funciona a ratos
Un cargador funciona solo si el cable está en cierta posición.
1. Desconectado, mide continuidad de cada conductor de punta a punta.
2. Mueve el cable mientras mides: el pitido se corta en cierta posición → **hilo roto** junto al conector (el punto más frecuente).
3. Solución: reemplazar el cable. No se recomienda empalmar cables de cargadores.

## Caso 3: el juguete que «no hace nada»
1. Pilas: 1,4 V cada una sin carga, pero 0,9 V al encender → **pilas débiles** (resistencia interna alta).
2. Con pilas nuevas sigue sin funcionar: busca un **fusible** o un termo-fusible (algunos juguetes los tienen): continuidad → OL → fundido.
3. ¿Por qué se fundió? Revisa el motor: si su resistencia es casi 0 Ω, tiene un **cortocircuito** en el bobinado; si está trabado, pedía demasiada corriente.

## Caso 4: la pila que «parece buena»
Una batería de 9 V marca 9,1 V sin carga, pero el detector de humo pita de «batería baja». Mide **con carga**: conecta una resistencia de 470 Ω (unos 19 mA) y mide de nuevo: 7,4 V → la batería está agotada aunque en vacío parecía bien.

## Lo que NO se diagnostica en casa
Aparatos conectados a la red (fuentes, televisores, microondas, cargadores por dentro): tienen voltajes peligrosos y capacitores que conservan carga. Su reparación es para técnicos.

## Reto en el multímetro virtual
En la simulación S15 hay elementos buenos y dañados: un cable bueno y uno roto, pilas nuevas y gastadas, una resistencia y un circuito con LED. Identifica cuál está mal en cada caso usando la función correcta.`,
      vida: "Muchas «averías» de controles remotos y linternas son contactos oxidados por pilas que se sulfataron. Una limpieza con alcohol isopropílico y un cotonete las resuelve.",
      err: ["Desarmar todo antes de medir las pilas.", "Medir las pilas solo sin carga.", "Intentar reparar aparatos de la red sin formación."],
      ejer: [["¿Qué es lo primero que mides cuando un aparato de pilas no funciona?", "El voltaje de las pilas, idealmente con carga."], ["El voltaje llega al portapilas pero no al foco. ¿Dónde está la falla?", "Entre ambos: interruptor, cables o contactos."], ["Un motor de juguete marca casi 0 Ω entre sus terminales y se calienta. ¿Qué tiene?", "Probablemente un cortocircuito en su bobinado."]],
      quiz: [
        { t: "ord", p: "Ordena un diagnóstico básico:", o: ["Observar señales visibles", "Comprobar la fuente de energía", "Seguir el camino de la corriente", "Comprobar componentes sin energía", "Reparar y volver a probar"], e: "De lo simple a lo complejo." },
        { t: "om", p: "Una pila marca 1,4 V sin carga y 0,9 V con el aparato encendido. Está…", o: ["Nueva", "Débil (resistencia interna alta)", "En cortocircuito", "Sobrecargada"], c: 1, e: "Cae mucho con carga." },
        { t: "om", p: "Un cable funciona solo en cierta posición. La causa probable es…", o: ["Un hilo roto cerca del conector", "Exceso de voltaje", "Una pila nueva", "El color del cable"], c: 0, e: "Es el punto donde más se dobla." },
        { t: "vf", p: "Es recomendable reparar en casa la fuente interna de un televisor si se sabe usar el multímetro.", c: false, e: "Tiene voltajes y capacitores peligrosos: es trabajo de técnicos." },
        { t: "om", p: "Para comprobar el interruptor de una linterna se usa…", o: ["La función de corriente", "La continuidad, sin pilas", "La función V~", "La prueba de capacidad"], c: 1, e: "Debe pitar en «encendido» y no en «apagado»." }
      ],
      res: ["Diagnosticar es formar hipótesis y comprobarlas con mediciones.", "Empieza por la fuente y sigue el camino de la corriente.", "Mide las pilas con carga.", "Usa la continuidad para cables, interruptores y fusibles.", "Los aparatos de la red se dejan a técnicos."]
    }
  ]
});
