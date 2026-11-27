// M14. Electrónica básica
registrarModulo({
  id: "m14", n: 14, nivel: 4, titulo: "Electrónica básica", quizMin: 30, quizN: 20, minEsperado: 420,
  objetivo: "Conocer los componentes electrónicos básicos (resistor, capacitor, inductor, diodo, LED y transistor) y armar circuitos simples con pilas.",
  clave: "electronica protoboard resistor capacitor condensador inductor diodo led transistor npn puertas logicas arduino microcontrolador",
  actividades: ["Armar en la protoboard el circuito de la luz nocturna de la lección 14.8 después de probarlo en las simulaciones.", "Calcular con la [calculadora de resistencia para LED](#/calculadora/C10) la resistencia de tres LED de colores distintos con una pila de 9 V.", "Construir las puertas AND y OR con interruptores y un LED (lección 14.9)."],
  ejemplos: ["LED rojo (2 V, 20 mA) con 9 V: R = 350 Ω → valor comercial de 390 Ω.", "τ de 10 kΩ con 100 µF = 1 s.", "Un transistor con β = 100 y 50 µA de base deja pasar hasta 5 mA de colector."],
  sims: ["S17", "S18", "S19", "S20"], calcs: ["C10", "C13", "C9"], gen: ["led", "rc"],
  evaluacion: "Quiz de módulo de 20 preguntas (30 min), con cálculos de resistencia para LED y constante RC con valores aleatorios y una pregunta para identificar símbolos electrónicos. Se aprueba con el 70 %. Al aprobar M14 y M15 obtienes el certificado del Nivel 4.",
  extra: [
    { t: "diag", p: "Toca el símbolo del **diodo** (sin flechas de luz).", dia: "simbolos2", c: "diodo", cTexto: "el triángulo con barra (3)", e: "El diodo es un triángulo que apunta a una barra; el LED añade flechas de luz.", lec: "14-5" },
    { t: "diag", p: "Toca el símbolo del **capacitor**.", dia: "simbolos2", c: "cap", cTexto: "las dos rayas paralelas iguales (6)", e: "Dos placas paralelas del mismo tamaño.", lec: "14-3" }
  ],
  lecciones: [
    {
      id: "14-1", t: "De la electricidad a la electrónica", d: "Controlar la corriente; señales; la protoboard por dentro.", min: 35, e: true, exp: "e-led-resistencia",
      preg: "¿Qué diferencia hay entre la electricidad de una plancha y la de un celular?",
      obj: ["Distinguir electricidad de potencia y electrónica.", "Explicar qué es una señal.", "Usar una protoboard para armar circuitos sin soldar."],
      txt: `Hasta ahora hemos usado la electricidad sobre todo para **transportar energía**: calentar, iluminar, mover motores. La **electrónica** usa la electricidad de otra manera: para **controlar** corrientes y para **procesar información**.

## Electricidad y electrónica
| Electricidad (potencia) | Electrónica |
|---|---|
| Lleva energía: calor, luz, movimiento | Controla, amplifica y procesa señales |
| Corrientes de amperios | Corrientes de miliamperios o menos |
| Cables, interruptores, motores, resistencias de calefacción | Diodos, transistores, chips, sensores |
| Plancha, estufa, bomba de agua | Celular, computadora, control remoto |

En la práctica están muy unidas: un aire acondicionado moderno tiene una parte de potencia (el compresor) y una electrónica que la controla.

## Las señales
Una **señal** es un voltaje o una corriente que **lleva información** porque cambia de cierta manera:
- **Analógica:** varía de forma continua, como el voltaje de un micrófono que copia la onda del sonido, o el de un sensor de temperatura.
- **Digital:** solo toma dos valores, «0» (bajo, por ejemplo 0 V) y «1» (alto, por ejemplo 5 o 3,3 V). Las computadoras trabajan con señales digitales (lección 14.9).

## Los componentes básicos
| Componente | Qué hace | Lección |
|---|---|---|
| Resistor | Limita la corriente, reparte voltajes | 14.2 |
| Capacitor | Guarda carga; filtra; temporiza | 14.3 |
| Inductor | Se opone a los cambios de corriente | 14.4 |
| Diodo | Deja pasar la corriente en un solo sentido | 14.5 |
| LED | Diodo que emite luz | 14.6 |
| Transistor | Interruptor o amplificador controlado | 14.7 |

## La protoboard
La [[protoboard]] (placa de pruebas) permite armar circuitos **sin soldar**, insertando las patitas de los componentes en sus agujeros. Por dentro tiene **tiras metálicas** que conectan grupos de agujeros:
- En la parte central, cada **columna de 5 agujeros** está unida (a un lado y otro de la ranura central, por separado).
- A los lados hay dos **líneas largas** (marcadas con + rojo y − azul) para la alimentación: todos sus agujeros de una misma línea están conectados.
- La **ranura central** separa las dos mitades: ahí se colocan los chips.

Reglas para usarla:
1. Lleva el + y el − de la pila a las líneas de alimentación.
2. Dos componentes están conectados si sus patitas están en la **misma columna** de 5.
3. Usa cables de puente cortos y ordenados (rojo para el +, negro para el −).
4. **Conecta la pila al final**, después de revisar el circuito.

## Tu primer circuito
Pila de 9 V → resistencia de 390 Ω → LED (patita larga hacia la resistencia) → negativo. En la sección de práctica tienes la ficha completa del experimento.

?> Todos los circuitos de este módulo funcionan con una pila de 9 V. Son seguros: el peor accidente posible es quemar un LED o calentar una resistencia.`,
      vida: "Dentro de un control remoto hay una pequeña electrónica que convierte cada botón en una señal digital y la envía con un LED infrarrojo que tu ojo no ve, pero la cámara del celular sí.",
      err: ["Insertar las dos patitas de un componente en la misma columna de la protoboard (queda en cortocircuito).", "Conectar la pila antes de revisar el circuito.", "Pensar que electrónica y electricidad no tienen nada que ver."],
      ejer: [["¿Qué diferencia hay entre una señal analógica y una digital?", "La analógica varía de forma continua; la digital solo toma dos valores (0 y 1)."], ["En la protoboard, ¿cómo están conectados los agujeros de una columna central?", "Los 5 agujeros de cada columna (a un lado de la ranura) están unidos."], ["¿Para qué sirven las líneas largas laterales?", "Para la alimentación: + y −."]],
      quiz: [
        { t: "om", p: "La electrónica se dedica principalmente a…", o: ["Transportar grandes potencias", "Controlar corrientes y procesar información", "Generar electricidad en centrales", "Medir el consumo"], c: 1, e: "Controlar y procesar señales." },
        { t: "om", p: "Una señal digital…", o: ["Varía de forma continua", "Solo toma dos valores, 0 y 1", "Es siempre de corriente alterna", "No tiene voltaje"], c: 1, e: "Alto o bajo." },
        { t: "vf", p: "En la protoboard, si las dos patitas de un resistor están en la misma columna de 5, el resistor queda en cortocircuito.", c: true, e: "Las dos patitas quedan unidas por la tira metálica." },
        { t: "om", p: "En la protoboard, la pila se conecta…", o: ["Al principio, antes de colocar nada", "Al final, después de revisar el circuito", "En la ranura central", "No hace falta"], c: 1, e: "Así se evitan cortocircuitos al montar." },
        { t: "om", p: "¿Qué componente deja pasar la corriente en un solo sentido?", o: ["Resistor", "Capacitor", "Diodo", "Inductor"], c: 2, e: "El diodo." }
      ],
      res: ["La electrónica usa la electricidad para controlar y procesar información.", "Las señales pueden ser analógicas (continuas) o digitales (0 y 1).", "Los componentes básicos son resistor, capacitor, inductor, diodo, LED y transistor.", "La protoboard permite montar circuitos sin soldar.", "Los circuitos del curso usan pilas de 9 V: son seguros."]
    },
    {
      id: "14-2", t: "Resistores", d: "Código de colores, potencia nominal, tipos, potenciómetros, LDR y termistores.", min: 40, e: true, calc: "C9",
      preg: "Si todas las resistencias pequeñas se ven iguales, ¿cómo sabes cuál usar?",
      obj: ["Leer el valor de un resistor por su código de colores.", "Elegir la potencia nominal adecuada.", "Conocer los resistores variables y sensores resistivos."],
      txt: `El [[resistor]] es el componente más común de la electrónica. Su trabajo es **oponerse a la corriente** con un valor conocido.

## Para qué se usan
- **Limitar la corriente:** por ejemplo, la de un LED (lección 14.6).
- **Dividir voltajes:** divisores para sensores y referencias (lección 4.3).
- **Fijar corrientes de base** en transistores (lección 14.7).
- **Junto con capacitores**, fijar tiempos (lección 14.3).

## El código de colores
Los resistores de patitas llevan **bandas de colores** que indican su valor y su tolerancia (tabla completa en la lección 12.5). Repaso rápido con 4 bandas: **dígito – dígito – multiplicador – tolerancia**.
- Marrón-negro-rojo-dorado = 10 × 100 = **1 kΩ ±5 %**.
- Rojo-rojo-marrón-dorado = 22 × 10 = **220 Ω ±5 %**.
- Amarillo-violeta-naranja-dorado = 47 × 1 000 = **47 kΩ ±5 %**.

La calculadora C9 convierte colores en ohmios y ohmios en colores, y dibuja el resistor.

Los resistores de montaje superficial (diminutos, en placas de celulares) usan un **código numérico**: «472» = 47 × 10² = 4 700 Ω.

## Valores normalizados
No existen resistores de cualquier valor: se fabrican en **series normalizadas**. La más común, la **E12**, tiene 12 valores por década: **10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82** (y sus múltiplos: 100, 120… 1 k, 1,2 k…). Si un cálculo da 350 Ω, se elige el valor comercial más cercano adecuado, normalmente el **superior** (390 Ω) para no exceder corrientes.

## La potencia nominal
Un resistor convierte energía en calor: P = I²·R. Cada resistor soporta una potencia máxima: los comunes son de **¼ W** (0,25 W); también hay de ½, 1, 2, 5 W o más (más grandes). Regla práctica: elige uno con **al menos el doble** de la potencia calculada.

Ejemplo: 7 V en una resistencia de 390 Ω → P = 7² / 390 = 0,126 W → uno de ¼ W está justo en el límite del margen doble (0,25 W): sirve, aunque uno de ½ W iría más holgado.

## Resistores variables
- **Potenciómetro:** tiene tres patitas y un cursor; funciona como divisor de voltaje ajustable (controles de volumen, perillas).
- **Trimpot:** potenciómetro pequeño de ajuste, se gira con destornillador.

## Resistores sensores
- **LDR (fotorresistencia):** su resistencia **baja con la luz**: de 1 MΩ a oscuras a unos pocos kΩ o cientos de ohmios a pleno sol. Se usa en luces nocturnas automáticas (lección 14.8).
- **Termistor NTC:** su resistencia **baja al calentarse**; **PTC:** sube. Se usan como sensores de temperatura y protecciones.
- **Galgas extensiométricas:** cambian su resistencia al deformarse; están en las básculas digitales.`,
      form: [["4 bandas: R = (d₁d₂) × multiplicador", "Valor por código de colores."], ["P = I² · R = V² / R", "Potencia que disipa el resistor."], ["P nominal ≥ 2 × P calculada", "Regla práctica de margen."]],
      ej: { enun: "Una resistencia de 1 kΩ tiene 12 V. ¿Qué potencia disipa y qué potencia nominal conviene?", pasos: ["P = V² / R = 144 / 1 000 = 0,144 W.", "Margen doble: 0,288 W.", "Elegir una de ½ W (0,5 W)."], res: "0,144 W; conviene un resistor de ½ W." },
      vida: "Las básculas digitales de cocina usan galgas extensiométricas: resistencias que cambian un poquito cuando el metal se deforma por el peso.",
      err: ["Leer las bandas al revés (desde la de tolerancia).", "Usar un resistor de ¼ W donde se disipan 0,5 W.", "Creer que se puede comprar un resistor de cualquier valor exacto."],
      ejer: [["Marrón-negro-naranja-dorado: ¿valor?", "10 kΩ ±5 %."], ["¿Qué valor E12 eliges para un cálculo de 150 Ω? ¿Y para 160 Ω?", "150 Ω (existe); para 160 Ω, 180 Ω."], ["¿Qué le pasa a una LDR cuando la iluminas?", "Su resistencia baja."]],
      quiz: [
        { t: "num", p: "¿Cuántos ohmios es un resistor rojo-rojo-marrón-dorado?", r: 220, u: "Ω", e: "22 × 10 = 220 Ω." },
        { t: "om", p: "Un resistor «472» de montaje superficial vale…", o: ["472 Ω", "4,7 kΩ", "47 kΩ", "4,72 Ω"], c: 1, e: "47 × 10² = 4 700 Ω." },
        { t: "num", p: "Una resistencia de 100 Ω con 5 V, ¿qué potencia disipa? (W)", r: 0.25, u: "W", e: "P = 25/100 = 0,25 W: con margen doble, mejor de ½ W." },
        { t: "om", p: "La resistencia de una LDR…", o: ["Sube con la luz", "Baja con la luz", "No cambia", "Depende del color de la pila"], c: 1, e: "Por eso detecta la oscuridad." },
        { t: "om", p: "¿Cuál de estos valores pertenece a la serie E12?", o: ["350 Ω", "390 Ω", "400 Ω", "450 Ω"], c: 1, e: "Serie E12: ..., 330, 390, 470, ..." }
      ],
      res: ["El resistor limita corrientes, divide voltajes y fija tiempos.", "Su valor se lee con el código de colores o un código numérico.", "Se fabrican en series normalizadas como la E12.", "Hay que elegir una potencia nominal con margen (el doble).", "Potenciómetros, LDR y termistores son resistores variables o sensores."]
    },
    {
      id: "14-3", t: "Capacitores", d: "Almacenan carga; el faradio; carga y descarga; constante τ = R·C; polaridad de los electrolíticos.", min: 45, e: true, sim: "S17", calc: "C13", exp: "e-capacitor",
      preg: "¿Por qué algunas luces de aparatos siguen encendidas unos segundos después de desenchufarlos?",
      obj: ["Explicar cómo almacena carga un capacitor.", "Calcular la constante de tiempo de un circuito RC.", "Manejar con seguridad los capacitores electrolíticos."],
      txt: `Un [[capacitor]] (o condensador) está formado por **dos placas conductoras separadas por un aislante** (el dieléctrico). Cuando se conecta a una fuente, en una placa se acumulan cargas positivas y en la otra negativas: el capacitor **almacena carga y energía** en el campo eléctrico entre sus placas.

## La capacidad
La capacidad indica cuánta carga guarda por cada voltio:

= C = Q / V

Se mide en [[faradio|faradios]] (F). Un faradio es enorme; en la práctica se usan **µF** (microfaradios), **nF** (nanofaradios) y **pF** (picofaradios). Los [[supercapacitor|supercapacitores]] llegan a cientos o miles de faradios.

## Carga y descarga: el circuito RC
Si cargas un capacitor a través de una resistencia R:
- Al principio, la corriente es máxima y el voltaje del capacitor es 0.
- Poco a poco, el voltaje sube y la corriente baja.
- La curva no es recta: sube rápido al principio y cada vez más despacio.

El tiempo característico es la **[[constante de tiempo]]**:

= τ = R · C

- En **1 τ**, el capacitor llega al **63 %** del voltaje de la fuente.
- En **5 τ**, se considera **cargado** (99 %).
- Al descargarse, en 1 τ baja al 37 %, y en 5 τ queda prácticamente vacío.

Ejemplo: R = 10 kΩ y C = 100 µF → τ = 10 000 × 0,000 1 = **1 s**. En unos 5 s está cargado.

En la simulación S17 cambia R y C y observa las curvas; la calculadora C13 calcula τ y el voltaje en cualquier instante.

## Para qué se usan
- **Filtrar:** alisar el voltaje pulsante de un rectificador (lección 5.7).
- **Temporizar:** encender o apagar algo después de un tiempo (con R·C).
- **Desacoplar:** pequeños capacitores junto a los chips eliminan ruidos de la alimentación.
- **Bloquear la CD y dejar pasar la CA:** en audio.
- **Arranque de motores** monofásicos.
- **Flash de cámaras:** se cargan lentamente y se descargan de golpe.

## Tipos y polaridad
- **Cerámicos:** pequeños, de pF a µF, sin polaridad.
- **De película:** precisos, sin polaridad.
- **Electrolíticos:** grandes capacidades (µF a miles de µF) en poco espacio, **con polaridad**: la patita **larga** es el +, y la franja del cuerpo marca el −.

!> Un capacitor electrolítico conectado al revés o a más voltaje del indicado puede **hincharse o reventar**. Respeta la polaridad y su voltaje máximo.

## La respuesta a la pregunta inicial
Los capacitores de las fuentes **guardan carga** después de desconectarlas: por eso un LED indicador se apaga poco a poco. En aparatos de la red (fuentes, microondas, televisores) esa carga puede ser **peligrosa** durante minutos: otra razón para no abrirlos.`,
      form: [["C = Q / V", "Capacidad (F) = carga (C) / voltaje (V)."], ["τ = R · C", "Constante de tiempo (s)."], ["Carga: V(t) = Vs · (1 − e^(−t/τ))", "63 % en 1τ; 99 % en 5τ."], ["E = ½ · C · V²", "Energía almacenada (J)."]],
      ej: { enun: "Un capacitor de 470 µF se carga a través de 2,2 kΩ con 9 V. ¿Cuánto vale τ, cuándo está casi cargado y qué voltaje tiene en 1 τ?", pasos: ["τ = 2 200 × 0,000 47 ≈ 1,03 s.", "Casi cargado en 5τ ≈ 5,2 s.", "En 1τ: 9 × 0,632 ≈ 5,7 V."], res: "τ ≈ 1 s; casi cargado en unos 5 s; 5,7 V en 1 τ." },
      vida: "Los capacitores son los componentes cilíndricos (electrolíticos) y las pequeñas pastillas de colores que ves en cualquier placa electrónica. Cuando una fuente se daña, a menudo es porque un electrolítico se hinchó.",
      err: ["Conectar un electrolítico al revés.", "Creer que un capacitor se carga a velocidad constante.", "Tocar los capacitores de una fuente recién desenchufada."],
      ejer: [["R = 1 kΩ, C = 1 000 µF. ¿τ?", "1 s."], ["¿Qué porcentaje de carga tiene un capacitor tras 1 τ?", "Un 63 %."], ["¿Cómo se identifica la patita negativa de un electrolítico?", "Es la más corta y está del lado de la franja del cuerpo."]],
      quiz: [
        { t: "om", p: "Un capacitor almacena…", o: ["Corriente", "Carga eléctrica en un campo eléctrico", "Resistencia", "Imanes"], c: 1, e: "Entre sus placas." },
        { t: "num", p: "¿Cuál es τ con R = 10 kΩ y C = 100 µF? (s)", r: 1, u: "s", e: "τ = 10 000 × 0,0001 = 1 s." },
        { t: "om", p: "Tras 1 τ de carga, el capacitor tiene…", o: ["El 37 % del voltaje", "El 50 %", "El 63 %", "El 100 %"], c: 2, e: "1 − e⁻¹ ≈ 0,63." },
        { t: "vf", p: "Un capacitor electrolítico conectado al revés puede hincharse o reventar.", c: true, e: "Tienen polaridad." },
        { t: "om", p: "¿Cuántas constantes de tiempo se necesitan para considerar cargado un capacitor?", o: ["1", "2", "5", "100"], c: 2, e: "En 5 τ llega al 99 %." }
      ],
      res: ["Un capacitor tiene dos placas separadas por un aislante y almacena carga.", "Su capacidad se mide en faradios (µF, nF, pF).", "En un circuito RC, τ = R·C: 63 % en 1τ, cargado en 5τ.", "Filtran, temporizan, desacoplan y bloquean la CD.", "Los electrolíticos tienen polaridad; los de la red pueden guardar carga peligrosa."]
    },
    {
      id: "14-4", t: "Inductores (bobinas)", d: "Se oponen a los cambios de corriente; usos en filtros y fuentes.", min: 30,
      preg: "¿Por qué salta una chispa al desconectar un motor o un electroimán?",
      obj: ["Explicar qué es la inductancia.", "Describir el comportamiento de un inductor ante cambios de corriente.", "Conocer sus aplicaciones y el diodo de protección."],
      txt: `Un [[inductor]] es una **bobina** de alambre, a menudo con un núcleo de hierro o de ferrita. Ya conoces su principio (módulo 7): una corriente crea un campo magnético, y un campo que cambia induce un voltaje.

## La autoinducción
Cuando la corriente por una bobina **cambia**, también cambia su propio campo magnético, y ese cambio **induce en la misma bobina** un voltaje que, por la ley de Lenz, **se opone al cambio**. Es la **autoinducción**, descubierta por [Joseph Henry](#/personajes/henry).

= V = L · ΔI / Δt

La **inductancia** L se mide en **henrios** (H); en electrónica se usan mH y µH.

## Lo que significa en la práctica
+> **Un inductor se opone a los cambios bruscos de corriente.** Es como la inercia en mecánica: un objeto pesado no se deja acelerar ni frenar de golpe.

- Al **conectar** una bobina, la corriente no sube de inmediato: crece poco a poco (con una constante de tiempo τ = L/R).
- Al **desconectarla** de golpe, la corriente «quiere» seguir circulando; el inductor genera un **pico de voltaje** muy alto (cientos o miles de voltios) para intentar mantenerla.

## La respuesta a la pregunta inicial
Al abrir el interruptor de un motor, un electroimán o un relé, el pico de voltaje de la autoinducción hace saltar una **chispa** en los contactos. Con el tiempo, esas chispas los desgastan, y en un circuito electrónico pueden **destruir el transistor** que controla la bobina.

## El diodo de protección
Por eso, cuando un transistor o un microcontrolador maneja un relé o un motorcito, se coloca un **diodo en paralelo con la bobina**, en sentido inverso (diodo de rueda libre). En funcionamiento normal no conduce; al desconectar, ofrece un camino a la corriente de la bobina y el pico de voltaje desaparece.

## Aplicaciones
- **Filtros:** dejan pasar la CD y frenan las variaciones rápidas (ruido, alta frecuencia). Las «bolitas» o cilindros negros en los cables USB y de video son **ferritas** que actúan como inductores contra interferencias.
- **Fuentes conmutadas:** guardan energía en su campo magnético y la sueltan para subir o bajar voltajes de CD (convertidores).
- **Transformadores:** dos inductores acoplados (módulo 8).
- **Encendido de autos:** la bobina de encendido genera los miles de voltios de la chispa de las bujías aprovechando precisamente el pico de autoinducción.
- **Sintonizadores de radio:** junto con capacitores forman circuitos resonantes que eligen una frecuencia.

## Inductor y capacitor: complementarios
| Capacitor | Inductor |
|---|---|
| Se opone a cambios bruscos de **voltaje** | Se opone a cambios bruscos de **corriente** |
| Guarda energía en un campo **eléctrico** | Guarda energía en un campo **magnético** |
| Deja pasar la CA y bloquea la CD | Deja pasar la CD y frena la CA de alta frecuencia |`,
      form: [["V = L · ΔI / Δt", "Voltaje de autoinducción (L en henrios)."], ["τ = L / R", "Constante de tiempo de un circuito RL."]],
      ej: { enun: "Por una bobina de 0,5 H circulan 0,2 A y se corta la corriente en 1 ms. ¿Qué voltaje se induce (aprox.)?", pasos: ["ΔI = 0,2 A; Δt = 0,001 s.", "V = L · ΔI / Δt = 0,5 × 0,2 / 0,001 = 100 V."], res: "Unos 100 V: mucho más que los 9 o 12 V de la fuente; por eso se usa un diodo de protección." },
      vida: "La bobina de encendido de un auto convierte los 12 V de la batería en los más de 20 000 V que hacen saltar la chispa en las bujías, aprovechando la autoinducción al cortar bruscamente la corriente.",
      err: ["Olvidar el diodo de protección al controlar un relé con un transistor.", "Pensar que una bobina se comporta igual en CD que en CA.", "Confundir inductancia con resistencia."],
      ejer: [["¿En qué unidad se mide la inductancia?", "En henrios (H)."], ["¿Qué hace un inductor ante un cambio brusco de corriente?", "Genera un voltaje que se opone al cambio."], ["¿Para qué sirve el diodo en paralelo con la bobina de un relé?", "Para absorber el pico de voltaje al desconectar y proteger el transistor."]],
      quiz: [
        { t: "om", p: "Un inductor se opone a…", o: ["Los cambios bruscos de voltaje", "Los cambios bruscos de corriente", "La luz", "El calor"], c: 1, e: "Por la autoinducción." },
        { t: "om", p: "La inductancia se mide en…", o: ["Faradios", "Henrios", "Ohmios", "Teslas"], c: 1, e: "Henrios (H)." },
        { t: "vf", p: "Al desconectar de golpe una bobina puede aparecer un voltaje mucho mayor que el de la fuente.", c: true, e: "Es el pico de autoinducción." },
        { t: "om", p: "¿Qué componente protege al transistor que controla un relé?", o: ["Un fusible", "Un diodo en paralelo con la bobina", "Un LED", "Un potenciómetro"], c: 1, e: "Diodo de rueda libre." },
        { t: "num", p: "L = 0,1 H; la corriente cae 0,5 A en 0,01 s. ¿Voltaje inducido? (V)", r: 5, u: "V", e: "0,1 × 0,5 / 0,01 = 5 V." }
      ],
      res: ["Un inductor es una bobina que se opone a los cambios de corriente.", "La inductancia se mide en henrios; V = L·ΔI/Δt.", "Al desconectar una bobina aparece un pico de voltaje.", "Un diodo en paralelo protege los circuitos que controlan bobinas.", "Se usa en filtros, fuentes, transformadores y encendidos."]
    },
    {
      id: "14-5", t: "Semiconductores y el diodo", d: "Silicio, dopaje N y P, unión PN; la corriente en un solo sentido; rectificación.", min: 40, e: true, exp: "e-diodo",
      preg: "¿Cómo puede un pedacito de silicio dejar pasar la corriente en un sentido y bloquearla en el otro?",
      obj: ["Explicar qué es un semiconductor y el dopaje.", "Describir la unión PN y el funcionamiento del diodo.", "Identificar el ánodo y el cátodo y aplicar el diodo en circuitos."],
      txt: `Los [[semiconductor|semiconductores]], sobre todo el **silicio**, son la base de toda la electrónica moderna. El silicio puro conduce poco, pero se puede modificar su conductividad de forma controlada.

## El dopaje
Al silicio puro se le añaden cantidades diminutas de otros elementos (**dopaje**):
- **Tipo N:** con fósforo, que aporta **electrones** extra libres (cargas Negativas que se mueven).
- **Tipo P:** con boro, que crea **huecos**: lugares donde falta un electrón, que se comportan como cargas Positivas que se mueven.

## La unión PN
Un **diodo** se forma juntando una zona **P** y una zona **N**. En la frontera, algunos electrones de la zona N rellenan huecos de la zona P y se forma una **zona de agotamiento** sin cargas libres, con un pequeño voltaje interno que actúa como barrera.
- **Polarización directa:** si conectas el **+ a la zona P (ánodo)** y el **− a la zona N (cátodo)**, empujas las cargas hacia la frontera, la barrera se estrecha y, a partir de unos **0,6–0,7 V** (silicio), la corriente pasa con facilidad.
- **Polarización inversa:** al revés, la barrera se ensancha y casi **no pasa corriente**.

+> El [[diodo]] es una «válvula» que deja pasar la corriente convencional **del ánodo al cátodo** y la bloquea en sentido contrario.

## Símbolo y patitas
El símbolo es un **triángulo que apunta a una barra**: la flecha indica el sentido en que pasa la corriente. En el componente real, el **cátodo** está marcado con una **franja**.

## La caída de voltaje
Un diodo de silicio conduciendo «se queda» con unos **0,7 V** (en los de germanio, 0,3 V; en los Schottky, 0,2–0,4 V). En un circuito, esos 0,7 V se restan del voltaje disponible.

## Usos del diodo
1. **Rectificación:** convertir CA en CD (lección 5.7). Un diodo hace media onda; un puente de cuatro, onda completa.
2. **Protección contra inversión de polaridad:** un diodo en serie con la alimentación impide que el circuito se dañe si pones la pila al revés.
3. **Diodo de rueda libre** en bobinas (lección 14.4).
4. **Diodos Zener:** conducen en inverso a un voltaje preciso; se usan como **referencias** y reguladores sencillos.
5. **Fotodiodos y celdas solares:** uniones PN que producen corriente con la luz.
6. **LED:** diodos que **emiten luz** (lección 14.6).

## Probar un diodo
Con el multímetro en prueba de diodo (lección 12.7): unos 0,5–0,7 V con la roja en el ánodo y OL al revés.

## Experimento
Con una pila de 9 V, una resistencia y un LED, coloca un diodo 1N4007 en serie: el LED enciende con el diodo en un sentido y se apaga al invertirlo.`,
      form: [["Caída en directa ≈ 0,6–0,7 V (silicio)", "Voltaje que «consume» un diodo al conducir."], ["Corriente: del ánodo (+) al cátodo (−, franja)", "Sentido de conducción."]],
      ej: { enun: "Una pila de 9 V alimenta una resistencia de 1 kΩ a través de un diodo de silicio en directa. ¿Qué corriente circula? ¿Y si el diodo se invierte?", pasos: ["Voltaje en la resistencia: 9 − 0,7 = 8,3 V.", "I = 8,3 / 1 000 = 8,3 mA.", "Con el diodo invertido: prácticamente 0 mA (bloquea)."], res: "Unos 8,3 mA en directa; casi nada en inversa." },
      vida: "Muchos aparatos de pilas tienen un diodo de protección: si pones las pilas al revés, simplemente no encienden en vez de dañarse.",
      err: ["Conectar un diodo al revés y pensar que está dañado.", "Olvidar la caída de 0,7 V en los cálculos.", "Confundir la franja del cátodo con el ánodo."],
      ejer: [["¿Cómo se llama la patita marcada con una franja?", "Cátodo."], ["¿Qué voltaje cae en un diodo de silicio en directa?", "Unos 0,7 V."], ["¿Para qué sirve un diodo en serie con la pila de un aparato?", "Para protegerlo si la pila se coloca al revés."]],
      quiz: [
        { t: "om", p: "Un diodo deja pasar la corriente convencional…", o: ["Del cátodo al ánodo", "Del ánodo al cátodo", "En ambos sentidos", "En ninguno"], c: 1, e: "Del ánodo (+) al cátodo (−)." },
        { t: "om", p: "La franja del cuerpo de un diodo indica…", o: ["El ánodo", "El cátodo", "El voltaje", "El color de la luz"], c: 1, e: "Marca el cátodo." },
        { t: "num", p: "9 V, diodo de silicio (0,7 V) en directa y 1 kΩ. ¿Corriente en mA?", r: 8.3, u: "", e: "(9 − 0,7) / 1 000 = 8,3 mA." },
        { t: "om", p: "El silicio tipo N tiene…", o: ["Huecos extra", "Electrones libres extra", "Protones libres", "Nada"], c: 1, e: "Dopado con fósforo." },
        { t: "vf", p: "Un puente de cuatro diodos produce rectificación de onda completa.", c: true, e: "Voltea los semiciclos negativos." }
      ],
      res: ["Los semiconductores se dopan: tipo N (electrones) y tipo P (huecos).", "La unión PN forma un diodo.", "El diodo conduce del ánodo al cátodo (franja) y bloquea al revés.", "En directa cae unos 0,7 V (silicio).", "Se usa para rectificar, proteger, regular (Zener) y en LED y celdas solares."]
    },
    {
      id: "14-6", t: "El LED y su resistencia", d: "R = (Vfuente − VLED)/I; colores y caída de voltaje; por qué se quema sin resistencia.", min: 40, e: true, sim: "S18", calc: "C10", exp: "e-led-resistencia",
      preg: "¿Por qué un LED conectado directamente a una pila de 9 V se quema en un instante?",
      obj: ["Explicar cómo funciona un LED.", "Calcular la resistencia limitadora.", "Elegir el valor comercial y la potencia de la resistencia."],
      txt: `Un [[LED]] (diodo emisor de luz) es un diodo en el que, al recombinarse electrones y huecos en la unión, la energía se libera como **luz**. El color depende del **material semiconductor**, y cada color tiene su **voltaje directo** (Vf):

| Color | Voltaje directo típico | Material |
|---|---|---|
| Infrarrojo | 1,2–1,5 V | Arseniuro de galio |
| Rojo | 1,8–2,2 V | AlGaInP |
| Amarillo / naranja | 2,0–2,2 V | AlGaInP |
| Verde | 2,0–3,2 V | según tipo |
| Azul | 2,8–3,4 V | Nitruro de galio-indio |
| Blanco | 2,8–3,4 V | LED azul + fósforo amarillo |

Los LED indicadores comunes funcionan con unos **10–20 mA** y su máximo suele ser de unos **20–30 mA**.

## La respuesta a la pregunta inicial
El LED es **no óhmico** (lección 3.3): por debajo de su Vf casi no conduce, pero por encima la corriente **se dispara**. Conectado directamente a 9 V, la corriente quedaría limitada solo por la resistencia interna de la pila y del LED: cientos de miliamperios. El LED se calienta y se **quema** en una fracción de segundo. Por eso:

+> **Todo LED necesita algo que limite su corriente**, normalmente una **resistencia en serie**.

## Calcular la resistencia
Por la LVK, el voltaje de la fuente se reparte entre la resistencia y el LED:

= R = (Vfuente − n · Vf) / I

(n = número de LED en serie).

**Ejemplo:** pila de 9 V, LED rojo de 2 V y 20 mA.
1. Voltaje en la resistencia: 9 − 2 = 7 V.
2. R = 7 / 0,020 = **350 Ω**.
3. Valor comercial E12 **superior**: **390 Ω** (con 330 Ω la corriente pasaría de 20 mA).
4. Corriente real: 7 / 390 ≈ **18 mA**.
5. Potencia en la resistencia: 7 × 0,018 ≈ 0,126 W → resistencia de **¼ W** (o ½ W para más margen).

La calculadora C10 hace todos estos pasos, y la simulación S18 te deja comprobar qué pasa si eliges una resistencia demasiado pequeña (el LED se quema) o demasiado grande (brilla poco).

## Varios LED
- **En serie:** se suman los Vf. Con 9 V puedes poner dos LED blancos (2 × 3 = 6 V) con una resistencia de (9 − 6) / 0,02 = 150 Ω. Tres blancos (9 V) ya no dejan margen.
- **En paralelo:** **cada LED con su propia resistencia**. Si compartes una sola resistencia, el LED con menor Vf se lleva casi toda la corriente y se quema.

## Polaridad
- La patita **larga** es el **ánodo** (+); la corta, el **cátodo** (−).
- El cuerpo tiene un lado **plano** del lado del cátodo.
- Al revés, el LED no enciende (y con voltajes inversos de más de unos 5 V puede dañarse).

## LED de potencia
Los focos LED de casa usan LED de potencia alimentados por un **driver** de corriente constante, no por resistencias, para ser eficientes.`,
      form: [["R = (Vfuente − n·Vf) / I", "Resistencia limitadora para n LED en serie."], ["P(R) = (Vfuente − n·Vf) · I", "Potencia en la resistencia."]],
      ej: { enun: "Con una fuente de 5 V (USB), ¿qué resistencia necesita un LED azul de 3,2 V y 15 mA?", pasos: ["Voltaje en la resistencia: 5 − 3,2 = 1,8 V.", "R = 1,8 / 0,015 = 120 Ω.", "120 Ω existe en la serie E12: se usa 120 Ω.", "Potencia: 1,8 × 0,015 = 0,027 W → ¼ W sobra."], res: "120 Ω de ¼ W." },
      vida: "Las tiras LED de 12 V traen grupos de 3 LED en serie con una resistencia cada uno; por eso solo se pueden cortar en las marcas cada 3 LED.",
      err: ["Conectar un LED sin resistencia.", "Usar una sola resistencia para varios LED en paralelo.", "Elegir el valor comercial inferior en lugar del superior."],
      ejer: [["9 V, LED verde de 3 V, 20 mA: ¿R?", "300 Ω → comercial 330 Ω."], ["12 V, tres LED rojos de 2 V en serie, 20 mA: ¿R?", "(12 − 6) / 0,02 = 300 Ω → 330 Ω."], ["¿Cuál es la patita positiva de un LED?", "La larga (ánodo)."]],
      quiz: [
        { t: "num", p: "9 V, LED rojo de 2 V, 20 mA. ¿Resistencia calculada? (Ω)", r: 350, u: "Ω", e: "(9 − 2)/0,02 = 350 Ω." },
        { t: "om", p: "Para un cálculo de 350 Ω, el valor comercial E12 adecuado es…", o: ["330 Ω", "390 Ω", "300 Ω", "350 Ω exactos"], c: 1, e: "El superior, para no exceder la corriente." },
        { t: "vf", p: "Varios LED en paralelo pueden compartir una sola resistencia sin problema.", c: false, e: "Cada uno necesita su resistencia." },
        { t: "om", p: "Un LED conectado directamente a 9 V sin resistencia…", o: ["Brilla perfecto", "Se quema por exceso de corriente", "No enciende nunca", "Se convierte en resistor"], c: 1, e: "Es no óhmico: la corriente se dispara." },
        { t: "om", p: "¿Qué color de LED tiene mayor voltaje directo?", o: ["Rojo", "Infrarrojo", "Azul", "Amarillo"], c: 2, e: "Azul y blanco: unos 3 V." }
      ],
      res: ["El LED emite luz y tiene un voltaje directo según su color.", "Siempre necesita limitar su corriente con una resistencia.", "R = (Vfuente − n·Vf)/I; elige el valor comercial superior.", "En paralelo, cada LED con su resistencia.", "La patita larga es el ánodo (+)."]
    },
    {
      id: "14-7", t: "El transistor como interruptor", d: "Transistor NPN (base, colector, emisor): una corriente pequeña controla una grande.", min: 45, e: true, sim: "S19",
      preg: "¿Cómo puede la diminuta corriente de un sensor o de un chip encender un motor o una tira de LED?",
      obj: ["Describir el transistor NPN y sus terminales.", "Explicar el funcionamiento en corte y saturación.", "Calcular la resistencia de base para usarlo como interruptor."],
      txt: `El [[transistor]] es el componente que hizo posible la electrónica moderna: inventado en 1947, hoy un chip de celular tiene **miles de millones** de ellos. Puede funcionar como **amplificador** o como **interruptor electrónico**. Aquí veremos el segundo uso.

## El transistor bipolar NPN
Tiene tres terminales:
- **Base (B):** la entrada de control.
- **Colector (C):** por donde entra la corriente de la carga.
- **Emisor (E):** por donde sale, normalmente hacia el negativo (tierra).

Una **pequeña corriente de base** (Ib) permite que circule una **corriente de colector** (Ic) mucho mayor:

= Ic = β · Ib

donde **β** (beta, o hFE) es la **[[ganancia]]**: típicamente de 100 a 300 en transistores pequeños como el 2N2222 o el BC547.

## Tres estados
1. **Corte:** sin corriente de base (o con menos de unos 0,6 V entre base y emisor), no pasa corriente de colector: **interruptor abierto**.
2. **Zona activa:** Ic = β · Ib, proporcional: es la zona de los **amplificadores**.
3. **[[saturación|Saturación]]:** con suficiente corriente de base, el transistor conduce **todo lo que la carga permite**; entre colector y emisor quedan solo unos 0,2 V: **interruptor cerrado**.

Para usarlo como interruptor se le hace pasar **del corte a la saturación**.

## El circuito típico
- La **carga** (LED con su resistencia, relé, motorcito) va entre el **+** de la fuente y el **colector**.
- El **emisor** va al **−** (tierra).
- La señal de control llega a la **base** a través de una **resistencia de base (Rb)** que limita la corriente de base.

## Calcular la resistencia de base
1. Corriente de la carga: por ejemplo, Ic = 20 mA.
2. Corriente de base mínima: Ib = Ic / β = 0,020 / 100 = 0,2 mA.
3. Para asegurar la saturación, se usa de **3 a 10 veces** más: digamos 1 mA.
4. Rb = (Vcontrol − 0,7) / Ib = (5 − 0,7) / 0,001 = **4,3 kΩ** → valor comercial **3,9 kΩ** o 4,7 kΩ.

En la simulación S19, cierra el interruptor de la base y cambia Rb: con valores pequeños el transistor se satura (LED brillante); con valores muy grandes queda en zona activa (LED tenue).

## Por qué es tan útil
- Un **microcontrolador** (Arduino) solo puede dar unos 20 mA por cada pin: con un transistor puede manejar un motor de 500 mA.
- Un **sensor** débil (una LDR) puede encender un LED o una alarma.
- Es la base de las **puertas lógicas** y de las computadoras: miles de millones de transistores funcionando como interruptores.

!> Si el transistor maneja una bobina (relé, motor), no olvides el **diodo de protección** en paralelo con la bobina (lección 14.4).

## Otros transistores
- **PNP:** como el NPN pero con polaridades invertidas (la carga va entre el colector y tierra).
- **MOSFET:** se controla con **voltaje** en la puerta (casi sin corriente); manejan grandes corrientes con muy poca pérdida. Están en fuentes, autos eléctricos y en todos los chips (versión CMOS).`,
      form: [["Ic = β · Ib", "Corriente de colector en zona activa."], ["Rb = (Vcontrol − 0,7) / Ib", "Resistencia de base."], ["Ib (saturación) ≈ 3 a 10 × Ic / β", "Margen para asegurar la saturación."]],
      ej: { enun: "Un transistor con β = 150 debe encender un relé de 60 mA con una señal de 5 V. Calcula Ib mínima y una Rb adecuada (usa 5 veces la mínima).", pasos: ["Ib mín = 0,060 / 150 = 0,4 mA.", "Con margen ×5: Ib = 2 mA.", "Rb = (5 − 0,7) / 0,002 = 2 150 Ω → valor comercial 2,2 kΩ (o 1,8 kΩ para más margen).", "Diodo de protección en paralelo con la bobina del relé."], res: "Rb ≈ 2,2 kΩ (o 1,8 kΩ) y un diodo de protección." },
      vida: "Los cargadores, las fuentes de las computadoras y los controladores de los motores de los drones usan transistores MOSFET que conmutan decenas de miles de veces por segundo.",
      err: ["Conectar la base directamente a la señal sin resistencia.", "Calcular Rb justa para la zona activa en lugar de saturar el transistor.", "Olvidar el diodo de protección con cargas inductivas."],
      ejer: [["β = 100 y Ib = 0,1 mA: ¿Ic en zona activa?", "10 mA."], ["¿Qué terminal del NPN va a tierra en el circuito interruptor?", "El emisor."], ["¿En qué estado está el transistor como interruptor cerrado?", "En saturación."]],
      quiz: [
        { t: "om", p: "En un transistor NPN usado como interruptor, la carga se conecta…", o: ["Entre la base y tierra", "Entre el + de la fuente y el colector", "En el emisor sin tierra", "En paralelo con la base"], c: 1, e: "El emisor va a tierra." },
        { t: "num", p: "Con β = 100 e Ib = 0,2 mA, ¿qué Ic se obtiene en zona activa? (mA)", r: 20, u: "", e: "Ic = 100 × 0,2 = 20 mA." },
        { t: "om", p: "Un transistor sin corriente de base está en…", o: ["Saturación", "Corte", "Zona activa", "Ruptura"], c: 1, e: "Interruptor abierto." },
        { t: "num", p: "Rb para Ib = 1 mA con una señal de 5 V (Vbe = 0,7 V). ¿Ω?", r: 4300, u: "Ω", e: "(5 − 0,7)/0,001 = 4 300 Ω." },
        { t: "vf", p: "Un transistor permite que una corriente pequeña controle otra mucho mayor.", c: true, e: "Es su gran utilidad." }
      ],
      res: ["El transistor NPN tiene base, colector y emisor.", "Ic = β·Ib en la zona activa.", "Como interruptor pasa del corte a la saturación.", "Rb = (Vcontrol − 0,7)/Ib, con margen para saturar.", "Con bobinas, siempre un diodo de protección."]
    },
    {
      id: "14-8", t: "Circuitos simples", d: "Luz nocturna con LDR y transistor; alarma con interruptor de lengüeta; LED que se apaga lentamente con un capacitor.", min: 45, sim: ["S19", "S17"], exp: "e-luz-nocturna",
      preg: "¿Puedes construir con menos de diez componentes una luz que se encienda sola al oscurecer?",
      obj: ["Armar circuitos simples combinando sensores, transistores, capacitores y LED.", "Explicar el funcionamiento de cada parte.", "Ajustar un circuito con un potenciómetro."],
      txt: `Con lo que ya sabes puedes construir circuitos útiles. Todos funcionan con una **pila de 9 V** y se arman en la protoboard.

## Circuito 1: luz nocturna automática
**Componentes:** pila de 9 V, LDR, potenciómetro de 10 kΩ (o resistencia de 10 kΩ), resistencia de 1 kΩ, transistor NPN (BC547 o 2N2222), LED y resistencia de 390 Ω.

**Cómo se conecta:**
1. Un **divisor de voltaje** entre +9 V y tierra: arriba el potenciómetro, abajo la **LDR**. El punto medio va, a través de 1 kΩ, a la **base** del transistor.
2. **Colector:** +9 V → resistencia de 390 Ω → LED → colector.
3. **Emisor:** a tierra.

**Cómo funciona:**
- **Con luz,** la LDR tiene poca resistencia: el punto medio del divisor queda cerca de 0 V, la base no recibe corriente, el transistor está en **corte** y el LED **apagado**.
- **A oscuras,** la LDR tiene mucha resistencia: el voltaje del punto medio sube por encima de 0,7 V, entra corriente a la base, el transistor se **satura** y el LED **enciende**.
- El **potenciómetro** ajusta a qué nivel de oscuridad se enciende.

Así funcionan, con más refinamiento, las luminarias públicas con fotocelda.

## Circuito 2: alarma de puerta
**Componentes:** pila, interruptor de lengüeta (reed) e imán, zumbador activo de 9 V (o LED), transistor y resistencias.

Un **interruptor de lengüeta** son dos láminas metálicas dentro de una ampolla de vidrio que se **cierran con un imán**. Se pone el interruptor en el marco y el imán en la puerta: con la puerta cerrada, el imán mantiene el interruptor cerrado y la base del transistor a tierra (corte). Al abrirse la puerta, el interruptor se abre, una resistencia lleva la base a positivo, el transistor se satura y el **zumbador suena**. Es el principio de las alarmas de puertas y ventanas.

## Circuito 3: LED que se apaga lentamente
**Componentes:** pila, pulsador, capacitor electrolítico de 470–1 000 µF, resistencias de 10 kΩ y 390 Ω, transistor NPN, LED.

1. Al pulsar el botón, el capacitor se **carga** casi al instante a 9 V.
2. Al soltarlo, el capacitor se **descarga lentamente** a través de la resistencia de 10 kΩ hacia la base del transistor.
3. Mientras el voltaje del capacitor sea suficiente, el transistor conduce y el LED brilla, cada vez menos.
4. El tiempo depende de τ = R · C: con 10 kΩ y 1 000 µF, τ = 10 s; el LED se apaga gradualmente en unos 10–20 s.

Es un **temporizador**: el principio de las luces de pasillo que se apagan solas.

## Consejos de montaje
- Arma primero en la **simulación** (S19 para el transistor, S17 para el capacitor).
- Monta por partes y prueba cada una.
- Revisa la polaridad de LED, capacitores electrolíticos y la posición de las patitas del transistor (consulta su hoja de datos: el orden E-B-C varía según el modelo).
- Conecta la pila al final; si algo se calienta, desconéctala.`,
      form: [["Base activa si V(divisor) > 0,7 V", "Condición para que el transistor conduzca."], ["τ = R · C", "Tiempo del temporizador."]],
      ej: { enun: "En la luz nocturna, el potenciómetro está en 10 kΩ. A oscuras la LDR vale 100 kΩ y con luz 1 kΩ. ¿Qué voltaje hay en el punto medio en cada caso (con 9 V, sin contar la base)?", pasos: ["A oscuras: V = 9 × 100 / (10 + 100) ≈ 8,2 V → muy por encima de 0,7 V: el LED enciende.", "Con luz: V = 9 × 1 / (10 + 1) ≈ 0,82 V → apenas por encima de 0,7 V; con algo más de luz baja de 0,7 V y el LED se apaga.", "Ajustar el potenciómetro (por ejemplo, a 20 kΩ) hace que con luz el voltaje sea aún menor."], res: "≈ 8,2 V a oscuras y ≈ 0,8 V con luz; el potenciómetro fija el umbral." },
      vida: "Las luminarias de las calles, las luces de jardín solares y los sensores de puertas de las alarmas usan exactamente estos principios.",
      err: ["Poner la LDR y el potenciómetro al revés (el LED se encendería con luz).", "Olvidar la resistencia de base.", "Conectar el capacitor electrolítico al revés."],
      ejer: [["¿Qué componente detecta la oscuridad en la luz nocturna?", "La LDR."], ["¿Para qué sirve el potenciómetro?", "Para ajustar el nivel de oscuridad al que se enciende el LED."], ["Con 22 kΩ y 470 µF, ¿cuánto vale τ?", "Unos 10,3 s."]],
      quiz: [
        { t: "om", p: "En la luz nocturna, a oscuras la LDR…", o: ["Baja su resistencia", "Sube su resistencia y el transistor se satura", "Se calienta", "Se desconecta"], c: 1, e: "El voltaje en la base sube." },
        { t: "om", p: "Un interruptor de lengüeta se cierra con…", o: ["La luz", "Un imán", "El calor", "El agua"], c: 1, e: "Por eso se usa en alarmas de puertas." },
        { t: "num", p: "Temporizador con 10 kΩ y 1 000 µF: ¿τ en segundos?", r: 10, u: "s", e: "10 000 × 0,001 = 10 s." },
        { t: "vf", p: "En la luz nocturna, el potenciómetro permite ajustar el umbral de oscuridad.", c: true, e: "Cambia el divisor de voltaje." },
        { t: "om", p: "¿Qué hace el capacitor en el circuito del LED que se apaga lentamente?", o: ["Aumenta el voltaje", "Guarda carga y la suelta lentamente por la base", "Cambia el color del LED", "Mide la luz"], c: 1, e: "Funciona como temporizador RC." }
      ],
      res: ["Un divisor con LDR y un transistor forman una luz nocturna automática.", "Un interruptor de lengüeta y un imán forman una alarma de puerta.", "Un capacitor que se descarga por la base forma un temporizador.", "El potenciómetro ajusta el umbral.", "Primero se simula, luego se monta por partes y se conecta la pila al final."]
    },
    {
      id: "14-9", t: "Lo digital: puertas lógicas", d: "0 y 1; AND, OR y NOT con interruptores y con transistores; tablas de verdad.", min: 40, sim: "S20", exp: "e-puertas",
      preg: "¿Cómo puede una computadora «decidir» algo si solo tiene interruptores?",
      obj: ["Representar información con 0 y 1.", "Describir las puertas AND, OR, NOT, NAND, NOR y XOR con sus tablas de verdad.", "Construir puertas sencillas con interruptores."],
      txt: `La electrónica **digital** trabaja con solo dos estados: **0** (bajo, apagado, falso, por ejemplo 0 V) y **1** (alto, encendido, verdadero, por ejemplo 5 V o 3,3 V). Con muchos de estos «bits» se representan números, letras, imágenes y sonidos.

## Las puertas lógicas
Una [[puerta lógica]] recibe una o más entradas de 0 y 1 y produce una salida según una regla. Su comportamiento se resume en una **tabla de verdad**.

### NOT (NO)
Invierte la entrada: si entra 1, sale 0, y al revés.
| A | Salida |
|---|---|
| 0 | 1 |
| 1 | 0 |

### AND (Y)
La salida es 1 **solo si todas** las entradas son 1.
| A | B | Salida |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

Con interruptores: **dos interruptores en serie** con un LED. Solo enciende si ambos están cerrados. Ejemplo: una prensa industrial que solo funciona si el operador pulsa los dos botones (y así tiene las dos manos fuera).

### OR (O)
La salida es 1 si **al menos una** entrada es 1.
| A | B | Salida |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

Con interruptores: **dos interruptores en paralelo**. Ejemplo: el timbre que suena desde la puerta principal **o** desde la trasera.

### NAND, NOR y XOR
- **NAND** (NO-Y): lo contrario de AND. Sale 0 solo si todas las entradas son 1.
- **NOR** (NO-O): lo contrario de OR. Sale 1 solo si todas son 0.
- **XOR** (O exclusivo): sale 1 si las entradas son **distintas**.

Curiosidad: el interruptor de escalera de la lección 11.6 es una puerta **XNOR** (lo contrario de XOR): la luz enciende si los dos conmutadores están en la misma posición.

Prueba todas en la simulación S20: elige la puerta, cambia las entradas y mira la tabla de verdad con la fila actual marcada.

## Puertas con transistores
- Un transistor como interruptor que invierte la señal es una puerta **NOT**: si entra 1 a la base, el transistor se satura y la salida (en el colector) baja a 0.
- Dos transistores en serie forman una **NAND**; en paralelo, una **NOR**.
- Con solo puertas **NAND** se puede construir **cualquier** otra puerta y, en teoría, una computadora completa.

## De las puertas a las computadoras
Combinando puertas se construyen:
- **Sumadores** que suman números en binario.
- **Memorias** (biestables) que guardan un bit.
- **Procesadores** con miles de millones de transistores.

## Contar en binario
Con 0 y 1 se puede contar: 0, 1, 10 (dos), 11 (tres), 100 (cuatro), 101 (cinco)… Cada posición vale el doble que la anterior: 1, 2, 4, 8, 16… Así, 1011 = 8 + 0 + 2 + 1 = **11**.`,
      form: [["AND: 1 solo si todas son 1 · OR: 1 si alguna es 1 · NOT: invierte", "Reglas básicas."], ["Binario: posiciones 1, 2, 4, 8, 16…", "1011₂ = 8 + 2 + 1 = 11."]],
      ej: { enun: "Una alarma debe sonar si la puerta está abierta (A = 1) Y el sistema está activado (B = 1), O si se pulsa el botón de pánico (C = 1). Escribe la salida para A = 1, B = 0, C = 1 y para A = 1, B = 1, C = 0.", pasos: ["Salida = (A AND B) OR C.", "Caso 1: (1 AND 0) OR 1 = 0 OR 1 = 1 → suena.", "Caso 2: (1 AND 1) OR 0 = 1 OR 0 = 1 → suena."], res: "La alarma suena en ambos casos." },
      vida: "La lógica de muchos aparatos es una combinación de puertas: el microondas solo calienta si la puerta está cerrada AND se pulsó «iniciar» AND el tiempo es mayor que cero.",
      err: ["Confundir AND con OR.", "Pensar que XOR da 1 cuando ambas entradas son 1.", "Creer que lo digital no tiene que ver con voltajes."],
      ejer: [["¿Qué sale de una AND con entradas 1 y 0?", "0."], ["¿Qué sale de una NOR con entradas 0 y 0?", "1."], ["Convierte 101 binario a decimal.", "5."]],
      quiz: [
        { t: "om", p: "Una puerta AND da 1 cuando…", o: ["Alguna entrada es 1", "Todas las entradas son 1", "Las entradas son distintas", "Todas son 0"], c: 1, e: "Solo si todas son 1." },
        { t: "om", p: "Dos interruptores en paralelo controlando un LED forman una puerta…", o: ["AND", "OR", "NOT", "XOR"], c: 1, e: "Basta uno cerrado." },
        { t: "om", p: "XOR con entradas 1 y 1 da…", o: ["1", "0", "2", "Depende"], c: 1, e: "XOR da 1 solo si son distintas." },
        { t: "num", p: "¿Cuánto vale en decimal el número binario 1011?", r: 11, u: "", e: "8 + 0 + 2 + 1 = 11." },
        { t: "vf", p: "Con solo puertas NAND se puede construir cualquier otra puerta lógica.", c: true, e: "Es una puerta «universal»." }
      ],
      res: ["Lo digital usa dos estados: 0 y 1.", "NOT invierte; AND exige todas; OR basta una.", "NAND, NOR y XOR son variantes muy usadas.", "Con transistores se construyen puertas; con puertas, computadoras.", "En binario cada posición vale el doble que la anterior."]
    },
    {
      id: "14-10", t: "Siguientes pasos", d: "Microcontroladores (Arduino), sensores y dónde seguir aprendiendo.", min: 30,
      preg: "Ya sabes encender un LED con un transistor. ¿Cómo se hace un robot que responda a su entorno?",
      obj: ["Conocer qué es un microcontrolador.", "Identificar sensores y actuadores comunes.", "Planificar cómo seguir aprendiendo electrónica de forma segura."],
      txt: `Has recorrido todo el camino: de los electrones a los transistores. El siguiente paso natural es la **electrónica programable**.

## El microcontrolador
Un **microcontrolador** es una computadora diminuta en un solo chip: procesador, memoria y **pines de entrada y salida**. Se le carga un **programa** que decide qué hacer según lo que miden sus entradas.

Las placas de desarrollo como **Arduino**, **Raspberry Pi Pico** o **ESP32** hacen muy fácil empezar: se conectan por USB a la computadora, se programan con un lenguaje sencillo y funcionan con **5 V o 3,3 V**: seguros para aprender.

## Entradas: sensores
| Sensor | Mide | Principio |
|---|---|---|
| LDR o fotodiodo | Luz | Resistencia o corriente que cambia con la luz |
| Termistor o sensor digital | Temperatura | Resistencia o chip |
| Botones e interruptores | Pulsaciones | Abren o cierran un circuito |
| Ultrasonido | Distancia | Tiempo de eco del sonido |
| Infrarrojo pasivo (PIR) | Movimiento de personas | Cambios de calor |
| Acelerómetro | Inclinación y movimiento | Microestructuras en un chip |
| Humedad del suelo | Agua en una maceta | Resistencia entre dos electrodos |

## Salidas: actuadores
- **LED** y pantallas.
- **Zumbadores** y bocinas.
- **Motores** de CD (con un transistor o un controlador), **servomotores** (giran a un ángulo preciso) y **motores paso a paso**.
- **Relés** para controlar cargas mayores… con las precauciones de siempre (lo que esté del lado de la red, solo con módulos certificados y conocimiento).

## Un primer proyecto típico
**Maceta inteligente:** un sensor de humedad del suelo, un microcontrolador y un LED (o una pequeña bomba de agua de 5 V con un transistor). El programa lee la humedad; si está por debajo de un umbral, enciende el LED de aviso o la bomba durante unos segundos.

## Cómo seguir aprendiendo
1. **Repasa** las lecciones esenciales (★) y las simulaciones de este curso.
2. Consigue un **kit de iniciación** de electrónica con protoboard, LED, resistencias, transistores, sensores y un microcontrolador (lección 15.2).
3. Sigue los **ejemplos** que traen las plataformas de microcontroladores y modifícalos.
4. Aprende a **soldar** con un soldador de baja potencia, en un lugar ventilado y con supervisión (el estaño fundido y la punta están a más de 300 °C).
5. Explora **simuladores de circuitos** gratuitos en línea.
6. Si te interesa como profesión: **electricista** (instalaciones), **técnico en electrónica**, **ingeniería eléctrica, electrónica o mecatrónica**. Las instalaciones de la red requieren formación y certificación oficiales.

## Seguridad, siempre
- Sigue trabajando con **pilas, baterías pequeñas o fuentes USB**.
- Para cualquier cosa que se conecte a la red, usa **módulos certificados** y pide ayuda a alguien con experiencia.
- Ten cuidado con las **baterías de litio** de los proyectos: usa celdas con protección y cargadores adecuados.

¡Felicidades por llegar hasta aquí! En el último módulo pondrás todo en práctica en el laboratorio y en el proyecto final.`,
      vida: "Muchos aparatos de tu casa (la lavadora, el microondas, el termostato, el control remoto) tienen un microcontrolador que lee botones y sensores y decide qué hacer.",
      err: ["Conectar directamente un motor o un relé a un pin del microcontrolador (necesita un transistor o controlador).", "Pasar a proyectos con la red eléctrica sin formación.", "Usar baterías de litio sin protección en proyectos caseros."],
      ejer: [["¿Qué es un microcontrolador?", "Una computadora en un chip, con procesador, memoria y pines de entrada y salida."], ["Nombra dos sensores y dos actuadores.", "Sensores: LDR, termistor. Actuadores: LED, motor."], ["¿Por qué no se conecta un motor directamente a un pin de un microcontrolador?", "Porque el pin solo da unos 20 mA; hace falta un transistor o un controlador."]],
      quiz: [
        { t: "om", p: "Un microcontrolador es…", o: ["Un tipo de pila", "Una computadora pequeña en un chip que se programa", "Un transformador", "Un fusible"], c: 1, e: "Con entradas y salidas." },
        { t: "om", p: "¿Cuál de estos es un sensor?", o: ["Un LED", "Un zumbador", "Una LDR", "Un motor"], c: 2, e: "Mide la luz." },
        { t: "vf", p: "Un pin de un microcontrolador puede alimentar directamente un motor de 500 mA.", c: false, e: "Necesita un transistor o un controlador." },
        { t: "om", p: "Las placas de aprendizaje suelen funcionar con…", o: ["127 V", "5 V o 3,3 V", "400 kV", "24 kV"], c: 1, e: "Voltajes bajos y seguros." },
        { t: "om", p: "Para un proyecto que debe controlar un aparato de la red, lo adecuado es…", o: ["Conectar cables a la red directamente", "Usar módulos certificados y pedir ayuda a alguien con experiencia", "Abrir el aparato", "Quitar los fusibles"], c: 1, e: "La seguridad primero." }
      ],
      res: ["Un microcontrolador es una computadora en un chip que se programa.", "Los sensores miden el entorno; los actuadores actúan sobre él.", "Placas como Arduino funcionan con voltajes bajos y seguros.", "Los motores y relés se controlan con transistores o controladores.", "Sigue aprendiendo con kits, simuladores y, para la red, formación profesional."]
    }
  ]
});
