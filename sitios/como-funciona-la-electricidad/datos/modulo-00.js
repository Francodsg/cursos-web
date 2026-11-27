// M0. Bienvenida y cómo usar el curso
registrarModulo({
  id: "m0", n: 0, nivel: 0, titulo: "Bienvenida y cómo usar el curso", quizMin: 15, quizN: 10, aprobar: 0,
  objetivo: "Conocer cómo está organizado el curso, usar las herramientas de la web y aceptar la regla de seguridad antes de experimentar.",
  clave: "inicio introduccion presentacion",
  actividades: ["Elegir en [Ajustes](#/ajustes) el sistema de red de tu país (120/127 V – 60 Hz o 220/230 V – 50 Hz) y la moneda.", "Hacer el recorrido guiado de la lección 0.2: buscar un tema, cambiar el tema claro u oscuro y abrir una calculadora.", "Firmar el compromiso de seguridad de la lección 0.3."],
  ejemplos: ["Buscar «enchufe» y comprobar que también aparecen resultados de «contacto» y «tomacorriente».", "Abrir la [calculadora de ley de Ohm](#/calculadora/C1) y calcular la corriente de un resistor de 450 Ω con 9 V."],
  sims: [], calcs: ["C1"],
  evaluacion: "Quiz diagnóstico de 10 preguntas, sin calificación. Sirve para saber cuánto sabes ya y te recomienda una ruta.",
  extra: [
    { t: "om", p: "¿Qué partícula del átomo se mueve por un cable cuando hay corriente eléctrica?", o: ["El protón", "El neutrón", "El electrón", "El núcleo completo"], c: 2, e: "En los metales se mueven los electrones libres; los protones están fijos en el núcleo." },
    { t: "om", p: "¿En qué unidad se mide el voltaje?", o: ["Amperio", "Voltio", "Ohmio", "Watt"], c: 1, e: "El voltaje se mide en voltios (V); la corriente en amperios, la resistencia en ohmios y la potencia en watts." },
    { t: "vf", p: "Un circuito en paralelo se apaga por completo si se funde uno de sus focos.", c: false, e: "En paralelo cada foco tiene su propio camino; si uno se funde, los demás siguen encendidos. Eso pasa en serie." },
    { t: "om", p: "¿Qué indica el número «kWh» de tu recibo de luz?", o: ["La potencia máxima de tu casa", "La energía que consumiste", "El voltaje de la red", "La corriente promedio"], c: 1, e: "El kilowatt-hora es una unidad de energía: potencia por tiempo." },
    { t: "vf", p: "La corriente alterna cambia de sentido muchas veces por segundo.", c: true, e: "En una red de 60 Hz cambia de sentido 120 veces por segundo (50 Hz: 100 veces)." },
    { t: "om", p: "¿Para qué sirve un transformador?", o: ["Para guardar energía", "Para cambiar el voltaje de la corriente alterna", "Para convertir CA en CD", "Para medir la corriente"], c: 1, e: "Un transformador sube o baja el voltaje de la CA. Para convertir CA en CD se usa un rectificador." },
    { t: "om", p: "Si una persona queda pegada a un cable con corriente, lo primero que debes hacer es…", o: ["Jalarla con las manos", "Cortar la corriente sin tocarla", "Echarle agua", "Esperar a que se suelte"], c: 1, e: "Primero se corta la corriente (interruptor o tablero) o se la separa con un objeto seco y aislante; nunca se la toca directamente." },
    { t: "om", p: "¿Qué componente deja pasar la corriente en un solo sentido?", o: ["Resistor", "Capacitor", "Diodo", "Bobina"], c: 2, e: "El diodo conduce en un sentido y bloquea el contrario." },
    { t: "vf", p: "Con un multímetro, la corriente se mide conectándolo en serie con el circuito.", c: true, e: "Para medir corriente hay que abrir el circuito e intercalar el multímetro, en serie." },
    { t: "om", p: "¿Por qué la electricidad se transmite a cientos de miles de voltios?", o: ["Porque viaja más rápido", "Para reducir las pérdidas en los cables", "Para que las casas reciban más voltaje", "Porque así lo exige el medidor"], c: 1, e: "A mayor voltaje, menor corriente para la misma potencia; y las pérdidas dependen del cuadrado de la corriente (I²R)." }
  ],
  lecciones: [
    {
      id: "0-1", t: "Bienvenida: qué aprenderás", d: "Mapa del curso, niveles, rutas y cómo se mide el progreso.", min: 15, e: true,
      preg: "¿Qué pasa exactamente, desde la central eléctrica hasta tu foco, cuando presionas el interruptor de la luz?",
      obj: ["Describir cómo están organizados los niveles y módulos del curso.", "Elegir la ruta de aprendizaje que mejor te convenga."],
      txt: `Bienvenido a **Cómo funciona la electricidad**. La electricidad está en casi todo lo que haces: la luz de tu cuarto, el refrigerador, el celular, el transporte y hasta los impulsos de tus nervios. Aun así, para mucha gente es una especie de magia invisible. Este curso la explica desde cero, paso a paso, sin dar nada por sabido.

## Cómo está organizado
El curso tiene **16 módulos** repartidos en **5 niveles**. Cada nivel se apoya en el anterior:

| Nivel | Qué aprenderás |
|---|---|
| 0. Bienvenida | Cómo usar esta web y la regla de seguridad. |
| 1. Fundamentos de los circuitos | Qué es la carga, el voltaje, la corriente y la resistencia; ley de Ohm; leyes de Kirchhoff; circuitos en serie y en paralelo. |
| 2. Corrientes, energía y máquinas | Corriente directa y alterna, potencia y energía, magnetismo, generadores, motores, transformadores y baterías. |
| 3. En casa y en el mundo | La red eléctrica, la instalación de tu casa, el multímetro y la seguridad eléctrica. |
| 4. Electrónica y laboratorio | Diodos, LED, transistores, capacitores, circuitos simples y el proyecto final. |

## Cómo es cada lección
Todas las lecciones siguen la misma estructura para que sepas siempre qué esperar: una **pregunta inicial** de la vida diaria, los **objetivos**, la **explicación**, un recuadro con **fórmulas y unidades**, un **ejemplo resuelto paso a paso**, una **simulación, calculadora o experimento**, ejemplos **de la vida diaria**, los **errores frecuentes**, **ejercicios** con solución y un **mini-quiz** de 5 preguntas. Al final hay un **resumen** de cinco puntos.

Las lecciones marcadas con **★** son esenciales. Si tienes poco tiempo, sigue la **ruta exprés**, que reúne solo esas lecciones (unas 30 horas).

## Rutas de aprendizaje
- **Ruta completa:** todos los módulos en orden, unas 86 horas.
- **Ruta exprés:** solo las lecciones ★.
- **Electricidad en casa:** lo necesario para entender y usar con seguridad la electricidad del hogar.
- **Cálculo de circuitos:** para quien quiere resolver problemas (escuela, carrera técnica).
- **Energía y red:** de la corriente alterna a las centrales y la red eléctrica.

Puedes estudiar en el orden que quieras (modo libre). La web solo te recomendará estudiar la seguridad eléctrica antes de los módulos de instalaciones y multímetro.

## Cómo se mide tu progreso
Una lección cuenta como **completada** cuando llegas al final y respondes su mini-quiz (también puedes marcarla a mano). Cada módulo termina con un **quiz de módulo**; si lo apruebas con el 70 % o más, ganas una insignia. Al aprobar todos los módulos de un nivel obtienes el **certificado de ese nivel**, y al aprobar el **examen final** (75 %), el certificado del curso. Todo se guarda automáticamente en tu navegador.

> Consejo: estudia de 30 a 60 minutos al día. Es mejor poco y seguido que mucho de golpe.`,
      vida: "Piensa en cinco aparatos que uses todos los días. Al terminar el curso podrás explicar cómo funciona cada uno: de dónde viene su energía, cuánto consume, qué lo protege y qué riesgos tiene.",
      err: ["Creer que hay que saber matemáticas avanzadas: solo necesitas sumar, multiplicar, dividir y despejar fórmulas sencillas, y todo se explica paso a paso.", "Saltarse la seguridad: los módulos de casa y multímetro suponen que ya conoces las reglas de la lección 0.3 y del módulo 13."],
      ejer: [["¿Cuántos módulos y niveles tiene el curso?", "16 módulos (M0 a M15) organizados en 5 niveles (0 a 4)."], ["¿Qué necesitas para que una lección cuente como completada?", "Llegar al final de la lección y responder su mini-quiz. También puedes marcarla a mano con el botón «Marcar como completada»."], ["Si solo tienes 30 horas, ¿qué ruta te conviene?", "La ruta exprés, que reúne las lecciones esenciales marcadas con ★."]],
      quiz: [
        { t: "om", p: "¿Qué significa la estrella ★ junto a una lección?", o: ["Que es opcional", "Que es esencial y forma parte de la ruta exprés", "Que es difícil", "Que tiene un experimento peligroso"], c: 1, e: "Las lecciones ★ son las esenciales; juntas forman la ruta exprés." },
        { t: "om", p: "¿Con qué porcentaje se aprueba un quiz de módulo?", o: ["50 %", "60 %", "70 %", "100 %"], c: 2, e: "Los quizzes de módulo se aprueban con el 70 %; el examen final, con el 75 %." },
        { t: "vf", p: "El progreso del curso se guarda en un servidor de internet.", c: false, e: "Se guarda solo en tu navegador (localStorage). Puedes exportarlo a un archivo para pasarlo a otro dispositivo." },
        { t: "om", p: "¿En qué nivel se estudia la instalación eléctrica de una casa?", o: ["Nivel 1", "Nivel 2", "Nivel 3", "Nivel 4"], c: 2, e: "El Nivel 3, «La electricidad en casa y en el mundo», incluye redes, instalaciones, multímetro y seguridad." },
        { t: "ord", p: "Ordena las partes de una lección tal como aparecen:", o: ["Pregunta inicial", "Explicación", "Ejemplo resuelto", "Mini-quiz", "Resumen"], e: "Primero la pregunta, luego la explicación y el ejemplo; al final el mini-quiz y el resumen." }
      ],
      res: ["El curso tiene 16 módulos en 5 niveles, de lo básico a la electrónica.", "Cada lección sigue la misma estructura y termina con un mini-quiz.", "Las lecciones ★ forman la ruta exprés.", "Los quizzes de módulo se aprueban con el 70 % y dan insignias y certificados de nivel.", "Tu progreso se guarda automáticamente en tu navegador."]
    },
    {
      id: "0-2", t: "Cómo estudiar con esta web", d: "Buscador, progreso, quizzes, modo oscuro, calculadoras y simulaciones.", min: 15, calc: "C1",
      preg: "¿Cómo encuentras rápido la lección que explica por qué «se bota la pastilla» de tu casa?",
      obj: ["Usar el buscador, el menú y los accesos rápidos.", "Abrir una calculadora y una simulación, y guardar o exportar tu progreso."],
      txt: `Esta web está pensada para usarse igual en una computadora que en un celular, con o sin internet. Aquí tienes un recorrido por sus herramientas.

## El buscador
Arriba está el **buscador de lecciones y temas**. Escribe una palabra y verás resultados al instante: lecciones, calculadoras, simulaciones, experimentos, términos del glosario y personajes. Algunas ventajas:
- No importan los acentos: «tension» encuentra «tensión».
- Entiende sinónimos de distintos países: *enchufe, contacto y tomacorriente*; *foco, bombilla y ampolleta*; *tablero, centro de carga y cuadro eléctrico*; *pastilla, breaker y termomagnético*; *CD y CC*.
- Tolera un error de escritura en palabras largas («tranformador»).
- Pulsa la tecla **/** para ir directo al buscador, usa las flechas para elegir y Enter para abrir.

## El menú y la barra inferior
En el celular, el botón ☰ abre el menú completo y abajo tienes accesos rápidos: **Inicio, Curso, Buscar, Laboratorio y Progreso**. En la computadora, el menú principal está arriba y, dentro de cada lección, a la izquierda verás el índice del módulo y de la lección.

## Modo claro y oscuro
El botón ☾/☀ cambia entre modo claro y oscuro. Por defecto la web sigue la preferencia de tu sistema; si eliges uno, se recuerda la próxima vez.

## Calculadoras y simulaciones
El **laboratorio virtual** reúne 21 simulaciones y 17 calculadoras. Las calculadoras aceptan coma o punto decimal y prefijos: puedes escribir «20 mA», «4,7 kΩ» o «4k7». Siempre muestran **los pasos del cálculo** y una interpretación. Abajo tienes la calculadora de ley de Ohm: prueba a dejar vacío el voltaje y escribir 20 mA y 450 Ω.

## Tu progreso
Todo se guarda automáticamente en tu navegador: lecciones vistas y completadas, resultados de los quizzes y experimentos realizados. En **Mi progreso** puedes:
- ver tu avance por nivel y por módulo;
- continuar donde lo dejaste;
- **exportar** el progreso a un archivo y **importarlo** en otro dispositivo;
- reiniciarlo.

?> Si usas el modo privado o incógnito del navegador, el progreso se borrará al cerrar la ventana. La web te avisará si no puede guardar.

## Ajustes
En **Ajustes** elige el sistema eléctrico de tu país. Los ejemplos marcados del curso usarán **{{V}}** y **{{HZ}}**, que es lo que tienes elegido ahora. También puedes poner tu moneda y la tarifa por kWh para que las calculadoras de consumo te den costos más realistas.`,
      vida: "Busca «pastilla» en el buscador: deberías encontrar la lección del tablero eléctrico (11.2) aunque en tu país se diga «breaker» o «automático».",
      err: ["Pensar que hay que escribir el número sin unidades: las calculadoras entienden «20 mA» igual que «0,02».", "Borrar los datos del navegador sin exportar antes el progreso."],
      ejer: [["Escribe «bombilla» en el buscador. ¿Qué lecciones aparecen?", "Aparecen las lecciones que hablan de focos, aunque usen la palabra «foco», porque el buscador reconoce los sinónimos."], ["En la calculadora C1, ¿qué corriente circula con 9 V y 450 Ω?", "I = 9 / 450 = 0,02 A = 20 mA."], ["¿Dónde puedes cambiar la tarifa por kWh?", "En Ajustes. Las calculadoras de consumo la usan si dejas su campo vacío."]],
      quiz: [
        { t: "om", p: "¿Qué tecla te lleva directo al buscador?", o: ["Enter", "/", "Esc", "Tab"], c: 1, e: "Pulsa «/» en cualquier página (fuera de un campo de texto)." },
        { t: "vf", p: "En las calculadoras puedes escribir «4,7 kΩ» en lugar de 4700.", c: true, e: "Aceptan coma o punto y prefijos como m, k o M." },
        { t: "om", p: "Si buscas «tomacorriente», ¿qué resultados encontrarás?", o: ["Ninguno, porque el curso dice «contacto»", "Los que usan contacto, enchufe o tomacorriente", "Solo los del glosario", "Solo las calculadoras"], c: 1, e: "El buscador reconoce sinónimos regionales." },
        { t: "om", p: "¿Para qué sirve exportar el progreso?", o: ["Para compartirlo en redes sociales", "Para pasarlo a otro dispositivo o guardar una copia", "Para borrar las respuestas", "Para cambiar de idioma"], c: 1, e: "Se descarga un archivo .json que puedes importar en otro navegador." },
        { t: "num", p: "Con la calculadora de ley de Ohm: ¿qué corriente circula por 450 Ω con 9 V?", r: 0.02, u: "A", e: "I = V / R = 9 / 450 = 0,02 A = 20 mA." }
      ],
      res: ["El buscador entiende sinónimos, ignora acentos y tolera errores.", "La tecla / abre el buscador.", "Las calculadoras aceptan prefijos y muestran los pasos.", "El progreso se guarda solo y se puede exportar e importar.", "En Ajustes eliges la red de tu país, la moneda y la tarifa."]
    },
    {
      id: "0-3", t: "Seguridad mínima antes de experimentar", d: "Regla de oro (≤ 9 V), por qué la red de casa es otra cosa, materiales seguros y compromiso de seguridad.", min: 20, e: true,
      preg: "¿Por qué puedes tocar los dos polos de una pila de 9 V sin sentir nada, pero un contacto de la pared puede matarte?",
      obj: ["Enunciar la regla de oro de los experimentos del curso.", "Distinguir los experimentos seguros de los que nunca deben hacerse en casa."],
      txt: `Antes de hacer cualquier experimento, necesitas tres ideas claras. Las verás con detalle en el módulo 13, pero desde ya son obligatorias.

## La regla de oro
!> **En casa experimenta solo con pilas o baterías de 9 V o menos.** Nunca uses la red eléctrica de la casa ({{V}}), ni cargadores abiertos, ni fuentes de computadora desarmadas, ni baterías de auto o de moto para experimentos.

¿Por qué 9 V? Porque con un voltaje tan bajo la corriente que puede atravesar tu cuerpo es diminuta: la piel seca tiene una resistencia de decenas de miles de ohmios. Aplicando la ley de Ohm, que verás en el módulo 3, 9 V entre 100 000 Ω dan menos de 0,1 mA, y el cuerpo no empieza a notar la corriente hasta alrededor de 0,5 mA. En cambio, la red de casa puede hacer circular por tu cuerpo decenas o cientos de miliamperios, y con unos **30 mA** ya hay riesgo de que el corazón deje de latir bien.

## Lo que sí es seguro, y con qué cuidados
| Material | Riesgo | Cuidado |
|---|---|---|
| Pilas AA, AAA o de 9 V | Muy bajo | No ponerlas en cortocircuito: el cable se calienta y la pila puede dañarse. |
| LED, resistencias, cables, protoboard | Muy bajo | Las patitas son puntiagudas; los componentes pequeños no son para niños pequeños. |
| Imanes de neodimio | Medio | Pellizcan la piel y, si se tragan dos, perforan el intestino. Siempre con un adulto. |
| Electroimán con clavo | Medio | El alambre se calienta: conecta solo unos segundos. |
| Baterías de litio de celular | **Alto** | No se abren, no se perforan ni se cortocircuitan: pueden incendiarse. |
| Red eléctrica de la casa | **Mortal** | Nunca. Solo simulación. |

## Cómo se marcan los experimentos
- 🟢 **Sin riesgo:** puedes hacerlo solo.
- 🟡 **Precaución:** calor, imanes fuertes o piezas pequeñas; hazlo con un adulto.
- 🔴 **Nunca en casa:** se presenta solo como simulación o demostración.

## Diez reglas para tu mesa de trabajo
1. Trabaja en una mesa seca, lejos del agua y de líquidos.
2. Ten a mano solo los materiales del experimento.
3. Antes de conectar, revisa el circuito; conecta la pila al final.
4. Si algo se calienta, huele a quemado o hace humo, desconecta la pila de inmediato.
5. Nunca conectes los dos polos de una pila directamente con un cable (cortocircuito).
6. No uses baterías hinchadas, oxidadas o derramadas.
7. No abras pilas ni baterías.
8. Recicla las pilas usadas en un punto de recolección; no las tires a la basura.
9. Si tienes menos de 14 años, experimenta con un adulto.
10. Ante la duda, no lo hagas: pregunta o usa la simulación.

## Tu compromiso
Al responder el mini-quiz de esta lección te comprometes a seguir estas reglas. Es la condición para usar la sección de experimentos del curso.`,
      form: [["I = V / R", "Corriente (amperios) = voltaje (voltios) / resistencia (ohmios). Con poco voltaje y mucha resistencia, la corriente es pequeña."]],
      ej: { enun: "Estima la corriente que pasaría por una persona con la piel seca (100 000 Ω) si tocara los polos de una pila de 9 V, y compárala con la red de {{V}} con la piel mojada (1 000 Ω).", pasos: ["Pila: I = V / R = 9 V / 100 000 Ω = 0,00009 A = 0,09 mA.", "0,09 mA está por debajo del umbral de percepción (≈ 0,5 mA): no se siente.", "Red con piel mojada: I = V / R; con 127 V, I = 127 / 1 000 = 0,127 A = 127 mA (con 230 V serían 230 mA).", "Más de 100 mA puede causar fibrilación del corazón: es potencialmente mortal."], res: "La pila de 9 V da unos 0,09 mA (no se siente); la red con piel mojada, más de 100 mA (mortal). Por eso la regla de oro." },
      vida: "Los juguetes, controles remotos y relojes funcionan con pilas de pocos voltios precisamente porque son seguros de manipular. Los aparatos conectados a la red tienen carcasas aislantes y tornillos especiales para que nadie toque las partes con voltaje.",
      err: ["Pensar que «si no me ha pasado nada, no es peligroso»: el peligro depende de la humedad, el camino de la corriente y el tiempo.", "Creer que una batería de auto (12 V) es inofensiva: no electrocuta con facilidad, pero puede dar cientos de amperios en cortocircuito, fundir herramientas y explotar.", "Abrir un cargador «porque solo da 5 V»: dentro del cargador está la red de la casa."],
      ejer: [["¿Qué voltaje máximo se permite en los experimentos caseros del curso?", "9 V, con pilas o baterías."], ["Clasifica: imán de neodimio, pila AA, contacto de pared.", "Pila AA: 🟢. Imán de neodimio: 🟡 (con un adulto). Contacto de pared: 🔴, nunca."], ["Tu circuito empieza a oler a quemado. ¿Qué haces?", "Desconectar la pila de inmediato, esperar a que se enfríe y revisar si hay un cortocircuito."]],
      quiz: [
        { t: "om", p: "¿Cuál es la regla de oro de los experimentos del curso?", o: ["Usar siempre guantes", "Solo pilas o baterías de 9 V o menos", "Trabajar con la red solo si está apagada", "Usar cables gruesos"], c: 1, e: "Solo pilas o baterías de 9 V o menos; la red de la casa nunca." , crit: true },
        { t: "vf", p: "Está bien abrir un cargador de celular para experimentar porque su salida es de solo 5 V.", c: false, e: "Dentro del cargador está la red eléctrica de la casa: abrirlo es peligroso.", crit: true },
        { t: "om", p: "¿Qué significa un experimento marcado con 🔴?", o: ["Que necesita pilas rojas", "Que es difícil", "Que nunca se hace en casa: solo simulación", "Que se hace con un adulto"], c: 2, e: "🔴 = nunca en casa. 🟡 = con un adulto." },
        { t: "om", p: "Un cable conecta directamente los dos polos de una pila. ¿Qué ocurre?", o: ["Nada", "Cortocircuito: el cable y la pila se calientan", "La pila se recarga", "Se enciende un LED"], c: 1, e: "Sin resistencia, la corriente es muy alta: el cable se calienta y la pila se daña." },
        { t: "num", p: "¿Qué corriente pasaría con 9 V a través de 100 000 Ω? (en mA o A)", r: 0.00009, u: "A", e: "I = 9 / 100 000 = 0,00009 A = 0,09 mA: no se siente." }
      ],
      res: ["En casa, solo pilas o baterías de 9 V o menos.", "La red de la casa puede hacer pasar por el cuerpo corrientes mortales (más de 30 mA).", "Los experimentos se marcan 🟢, 🟡 o 🔴.", "Nunca se abren cargadores, baterías de litio ni aparatos conectados a la red.", "Si algo se calienta o huele a quemado, se desconecta la pila de inmediato."]
    }
  ]
});
