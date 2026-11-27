# Plan 7: curso web «Robótica, Electrónica, Hardware y Software: construir cosas con electricidad y código»

> Documento de planificación. **Solo en español** (salvo nombres propios: Arduino, Raspberry Pi, ESP32, Python, OpenCV, KiCad, ROS…).
> Estado: **aprobado** y construido en `sitios/robotica-electronica/`.

---

## 0. Contexto

- **Necesidad:** el repositorio `Francodsg/cursos-web` tiene 6 sitios (Filosofía, Ciencias, Administración, Personas Poderosas, Finanzas, Manipulación). Se añade el **sitio 7**: un curso extenso y práctico para aprender a construir robots y aparatos con electricidad, electrónica y programación, desde cero.
- **Convenciones que se siguen (vistas en el repositorio):**
  - Plan en `planes/plan-7-robotica-electronica.md` (este documento, copiado al repo al construir).
  - Sitio autónomo en `sitios/robotica-electronica/`: `index.html` + `styles.css` + `app.js` + archivos `data-*.js` con `window.X = …`, **sin servidor, sin internet, sin frameworks** (se abre con doble clic en `index.html`).
  - Enrutado por hash (`#/modulo/M03`), `localStorage` con `try/catch` (patrón `store` de `sitios/manipulacion/app.js`), tema claro u oscuro con `data-theme` y variables CSS en `:root` (patrón de `sitios/manipulacion/styles.css`), enlace «Saltar al contenido», cabecera fija, menú ☰ y barra inferior en móvil.
  - Pruebas con Node sin dependencias (como `sitios/finanzas/pruebas.js`).
  - Fila nueva en la tabla de `LEEME.md` y entrada en «Planes».
- **Mejora respecto a sitios anteriores:** en los sitios 1–3 «falta el texto largo de cada lección». **Aquí cada lección tendrá su contenido real** (explicación, ejemplo, código, práctica y quiz propio), no solo el título.
- **Público:** hispanohablantes desde 13–14 años, sin conocimientos previos de electrónica ni programación. Autoaprendizaje a ritmo propio; útil para docentes y clubes de robótica.
- **Supuestos:** voltajes bajos (≤ 12 V CC) en todas las prácticas; la red eléctrica (110/220 V CA) solo se explica, **nunca se manipula** en prácticas; sistema internacional, coma decimal; cada práctica tiene versión física y versión simulada (Tinkercad Circuits o Wokwi), para quien aún no tenga materiales.

---

## 1. Estructura general

### 1.1 Niveles

| Nivel | Nombre | Módulos | Lecciones | Horas |
|---|---|---|---|---|
| 0 | Fundamentos: qué es un robot | M01–M02 | 12 | 17,5 |
| 1 | Electrónica | M03–M06 | 31 | 53,5 |
| 2 | Hardware y software | M07–M11 | 45 | 76 |
| 3 | Sensores, actuadores y control | M12–M16 | 37 | 63 |
| 4 | Proyectos prácticos paso a paso | M17–M21 | 32 | 57,5 |
| 5 | Inteligencia artificial en robots | M22–M24 | 21 | 41,5 |
| 6 | Seguridad, mantenimiento y proyecto final | M25–M26 | 14 | 27,5 |
| **Total** | | **26 módulos** | **192 lecciones** | **336,5 h** |

Horas del módulo = horas de lecciones + quiz de módulo (0,5 h) + proyecto del módulo. Total: 272 h de lecciones + 64,5 h de evaluación.

**Correspondencia con los 9 temas pedidos:** 1 Fundamentos → M01–M02 · 2 Electrónica → M03–M06 · 3 Hardware → M08–M10 · 4 Software y comunicación → M07, M09, M11 · 5 Sensores → M12–M13 · 6 Actuadores y motores → M14–M16 · 7 Proyectos (seguidor de línea, brazo, casa inteligente, carro RC, evasor de obstáculos) → M17–M21 · 8 IA → M22–M24 · 9 Seguridad y mantenimiento → M02.1, M10.8, M15.8 y M25 (además, aviso de seguridad en cada práctica).

### 1.2 Plantilla fija de cada lección (en la web)

1. **Pregunta disparadora** cotidiana («¿Por qué se quema un LED sin resistencia?»).
2. **Objetivos** (2–3, medibles).
3. **Explicación** (300–500 palabras), con analogías (el agua en tuberías para el voltaje y la corriente) y, donde ayude, un **diagrama SVG** propio.
4. **Fórmula o idea clave** en un recuadro (cada símbolo con su significado y unidad).
5. **Ejemplo resuelto** o **código comentado en español** (bloque con botón «Copiar»).
6. **Práctica** paso a paso: materiales, pasos numerados, resultado esperado, versión simulada.
7. **⚠️ Seguridad** de la práctica (si aplica).
8. **Errores frecuentes** (2–3).
9. **Mini-quiz** de 5 preguntas con explicación de cada respuesta.
10. Botón **«Marcar como completada»**, nota personal, anterior / siguiente.

Lecciones ★ = esenciales; forman la **ruta exprés** (≈ 70 lecciones).

### 1.3 Rutas

- **Completa** (por defecto): niveles 0 → 6.
- **Exprés:** solo ★.
- **«Quiero mi primer robot ya»:** M01, M02, M03.3, M05.3, M06.1, M07, M08, M14, M12.2 → M17.
- **Programador que viene del software:** M01, M03, M05, M06, M08, M11, sensores y proyectos.
- **Modo libre:** sin bloqueos (no se bloquea nada; las dependencias son recomendaciones visibles).

### 1.4 Dependencias recomendadas

M03 antes de M04–M05 · M06.1–M06.3 antes de cualquier práctica física · M07 antes de M08–M09 · M08 antes de M11–M15 · M10 antes de M14 · M14 + M12 antes de M17–M19 · M15 antes de M20 · M11 antes de M19 y M21 · M09 antes de M22–M24 · M25 recomendado en cualquier momento tras el Nivel 2.

---

## 2. Objetivos por nivel

- **Nivel 0:** explicar qué es un robot y sus tres partes (mecánica, electrónica, software); describir el ciclo sentir-pensar-actuar; reconocer tipos de robots y su historia; montar un taller seguro y usar un simulador.
- **Nivel 1:** aplicar la ley de Ohm y las leyes de Kirchhoff; medir con multímetro; identificar y elegir resistencias, condensadores, diodos, LED y transistores; leer un esquema y montarlo en protoboard; soldar con seguridad.
- **Nivel 2:** programar desde cero (variables, condiciones, bucles, funciones); programar Arduino y Raspberry Pi; alimentar un proyecto de forma segura y calcular su autonomía; comunicar dispositivos por serial, I2C, SPI, Bluetooth y WiFi.
- **Nivel 3:** leer, calibrar y filtrar sensores; controlar motores DC, servos y paso a paso con el driver adecuado; usar relés con seguridad; aplicar control en lazo cerrado (PID) y máquinas de estados.
- **Nivel 4:** construir, programar, probar y documentar cinco robots completos.
- **Nivel 5:** explicar y aplicar visión por computadora básica, aprendizaje automático sencillo y navegación autónoma; valorar sus límites éticos.
- **Nivel 6:** trabajar con seguridad eléctrica y de baterías; mantener equipos; diagnosticar fallas con método; diseñar y presentar un proyecto propio.

---

## 3. Contenido por módulo

> Formato: tabla de lecciones (★ esencial, horas) · **Objetivos** · **Prácticas** · **Materiales** · **Evaluación** (quiz de módulo de 12 preguntas, aprobado ≥ 70 %, + proyecto con lista de comprobación).

### NIVEL 0 · FUNDAMENTOS

#### M01. ¿Qué es un robot? (6 lecciones · 9 h)
| # | Lección | Contenidos clave | h |
|---|---|---|---|
| 1 ★ | ¿Qué es un robot? | Definiciones; robot, máquina y automatismo; qué no es un robot | 1 |
| 2 ★ | Anatomía de un robot | Mecánica (estructura, transmisión), electrónica (sensores, controlador, actuadores, energía), software | 1 |
| 3 ★ | Sentir, pensar, actuar | Ciclo de control; entradas, procesamiento, salidas; ejemplo: aspiradora robot | 1 |
| 4 | Historia de la robótica | Autómatas de Herón y Al-Jazari, Jacquard, Čapek (palabra «robot»), Asimov, Unimate, Shakey, Mars rovers, robots actuales | 1,5 |
| 5 ★ | Tipos de robots | Industriales, móviles (ruedas, patas), drones, submarinos, humanoides, médicos, de servicio, educativos, enjambres | 1,5 |
| 6 | La robótica hoy | Trabajo y automatización, ética, robótica en Latinoamérica y España, competencias escolares | 1 |
- **Objetivos:** definir robot; descomponer cualquier robot en sus partes; clasificar robots.
- **Prácticas:** analizar 3 robots reales con la ficha «sentir-pensar-actuar»; línea de tiempo personal.
- **Materiales:** ninguno (cuaderno).
- **Evaluación:** quiz (0,5 h) · proyecto (1,5 h): **«Ficha técnica de un robot»** — elegir un robot real y documentar sus partes, sensores, actuadores y tareas.

#### M02. El taller del creador (6 lecciones · 8,5 h)
| # | Lección | Contenidos clave | h |
|---|---|---|---|
| 1 ★ | Seguridad desde el primer día | Reglas del taller, ojos, ventilación, nunca la red eléctrica, orden | 1 |
| 2 | Herramientas manuales | Pinzas, alicate de corte, pelacables, destornilladores, cúter, pistola de silicona | 1 |
| 3 ★ | El kit inicial | Lista de compra por presupuesto (básico, medio, completo), clones vs originales, dónde comprar | 1 |
| 4 ★ | Simuladores | Tinkercad Circuits y Wokwi: primer circuito virtual | 1,5 |
| 5 | Documentar como ingeniero | Cuaderno de ingeniería, fotos, esquemas, control de versiones (idea de Git) | 1 |
| 6 | Método de diseño | Idea → requisitos → prototipo → prueba → mejora | 1 |
- **Prácticas:** encender un LED en el simulador; preparar la caja de herramientas.
- **Materiales:** kit inicial (Arduino Uno o compatible, protoboard, cables, LED, resistencias, pulsadores, multímetro básico).
- **Evaluación:** quiz · proyecto (1,5 h): **«Mi taller»** — inventario, normas propias y primer circuito simulado documentado.

### NIVEL 1 · ELECTRÓNICA

#### M03. Electricidad básica (8 lecciones · 13,5 h)
| # | Lección | Contenidos clave | h |
|---|---|---|---|
| 1 ★ | Carga, corriente y voltaje | Electrones, amperio, voltio; analogía hidráulica | 1,5 |
| 2 | Corriente continua y alterna | CC vs CA, pilas vs enchufe, frecuencia | 1 |
| 3 ★ | Resistencia y ley de Ohm | V = I·R; triángulo de Ohm; ejemplos | 1,5 |
| 4 ★ | Potencia y energía | P = V·I; vatios, Wh, mAh; por qué se calientan las cosas | 1 |
| 5 ★ | Circuitos en serie | Corriente igual, voltajes que se suman, R total | 1,5 |
| 6 | Paralelo y mixtos | Voltaje igual, corrientes que se suman, 1/R | 1,5 |
| 7 | Kirchhoff y divisor de voltaje | Nodos y mallas; Vout = Vin·R2/(R1+R2) | 1,5 |
| 8 ★ | El multímetro | Medir V, I, R y continuidad; errores que queman fusibles | 1,5 |
- **Prácticas:** LED con pila y resistencia; medir serie vs paralelo; divisor con dos resistencias.
- **Materiales:** pila de 9 V con broche, porta-pilas AA, resistencias, LED, multímetro.
- **Evaluación:** quiz con preguntas numéricas · proyecto (2 h): **«Linterna de 3 LED»** con cálculo de resistencias y mediciones comparadas.

#### M04. Componentes pasivos (7 lecciones · 10,5 h)
| # | Lección | Contenidos clave | h |
|---|---|---|---|
| 1 ★ | Resistencias | Tipos, código de colores, tolerancia, potencia | 1,5 |
| 2 | Resistencias variables | Potenciómetro, LDR, termistor | 1 |
| 3 ★ | Condensadores | Carga y descarga, constante τ = R·C | 1,5 |
| 4 | Tipos de condensadores | Cerámicos, electrolíticos (polaridad), desacoplo | 1 |
| 5 | Bobinas y magnetismo | Inductancia, electroimán, picos de voltaje | 1 |
| 6 | Interruptores, conectores y fusibles | Pulsador, conmutador, jumper, fusible | 1 |
| 7 | Leer una hoja de datos | Valores máximos, curvas, encapsulados | 1 |
- **Prácticas:** atenuador con potenciómetro; LED que se apaga lento (RC); electroimán (con pila de 1,5 V y tiempo corto).
- **Materiales:** surtido de resistencias, potenciómetro 10 kΩ, LDR, condensadores 100 µF–1000 µF, alambre esmaltado, clavo.
- **Evaluación:** quiz · proyecto (2 h): **«Lámpara nocturna»** que se enciende con oscuridad (LDR + transistor, se completa en M05).

#### M05. Semiconductores (8 lecciones · 14,5 h)
| # | Lección | Contenidos clave | h |
|---|---|---|---|
| 1 | ¿Qué es un semiconductor? | Silicio, dopaje, unión PN | 1 |
| 2 ★ | Diodos | Rectificación, polaridad, diodo de protección (flyback) | 1,5 |
| 3 ★ | LED | Caída de voltaje, R = (Vfuente − VLED)/I, RGB | 1,5 |
| 4 | Diodo Zener | Referencia y regulación simple | 1 |
| 5 ★ | Transistor BJT como interruptor | NPN, base-colector-emisor, resistencia de base | 2 |
| 6 ★ | MOSFET | Cargas grandes, nivel lógico, disipación | 1,5 |
| 7 | Circuitos integrados | Temporizador 555, compuertas lógicas AND/OR/NOT | 2 |
| 8 | Optoacopladores | Aislar circuitos de control y potencia | 1 |
- **Prácticas:** LED intermitente con 555; transistor que enciende un motor pequeño; semáforo con compuertas.
- **Materiales:** diodos 1N4007, LED variados y RGB, BC547/2N2222, IRLZ44N, NE555, 74HC08/74HC04, PC817.
- **Evaluación:** quiz · proyecto (2,5 h): **«Intermitente y lámpara nocturna automática»** (cierra el proyecto de M04).

#### M06. Protoboard, soldadura y esquemas (8 lecciones · 15 h)
| # | Lección | Contenidos clave | h |
|---|---|---|---|
| 1 ★ | La protoboard por dentro | Filas, rieles de alimentación, errores típicos | 1 |
| 2 ★ | Símbolos y esquemas | Símbolos normalizados, nodos, tierra, cómo leer un esquema | 1,5 |
| 3 ★ | Del esquema a la protoboard | Método paso a paso, colores de cables | 1,5 |
| 4 ★ | Soldadura: equipo y seguridad | Cautín, estaño sin plomo, flux, humos, soporte | 1 |
| 5 | Técnica de soldadura | Unión correcta vs fría, desoldador, malla | 2 |
| 6 | Placas perforadas | Pasar un circuito de protoboard a placa | 1,5 |
| 7 | Diseño de PCB con KiCad | Esquema, huellas, rutado, fabricar una placa | 2 |
| 8 | Cables y orden | Calibres, Dupont, terminales, termorretráctil, gestión de cables | 1 |
- **Prácticas:** montar 3 esquemas dados; soldar un kit sencillo; dibujar un esquema en KiCad.
- **Materiales:** protoboard 830 puntos, cautín 30–60 W con soporte, estaño, flux, malla, placa perforada, gafas.
- **Evaluación:** quiz (incluye «encuentra el error en el esquema») · proyecto (3 h): **«Mi primera placa soldada»** (el intermitente 555 en placa perforada).

### NIVEL 2 · HARDWARE Y SOFTWARE

#### M07. Programación desde cero (10 lecciones · 15 h)
| # | Lección | Contenidos clave | h |
|---|---|---|---|
| 1 ★ | ¿Qué es programar? | Algoritmos, diagramas de flujo | 1 |
| 2 | Pensamiento computacional | Descomponer, patrones, abstracción, pseudocódigo | 1 |
| 3 ★ | Variables y tipos de datos | int, float, bool, char, String; memoria | 1,5 |
| 4 | Operadores | Aritméticos, comparación, lógicos | 1 |
| 5 ★ | Condicionales | if / else / switch | 1,5 |
| 6 ★ | Bucles | for, while; bucles infinitos | 1,5 |
| 7 ★ | Funciones | Parámetros, retorno, reutilizar | 1,5 |
| 8 | Arreglos y cadenas | Listas de valores, recorrerlas | 1,5 |
| 9 | Depurar | Leer errores del compilador, imprimir valores, aislar el fallo | 1 |
| 10 | Bloques y texto | Programar por bloques (mBlock, MakeCode) y pasar a C++ y Python | 1 |
- **Prácticas:** ejercicios en el simulador Wokwi (C++ de Arduino) y en Python en línea; cada concepto se aplica a un LED o botón.
- **Materiales:** computadora; simulador.
- **Evaluación:** quiz (incluye «¿qué imprime este código?») · proyecto (2 h): **«Semáforo programado»** con funciones y estados.

#### M08. Arduino (10 lecciones · 17 h)
| # | Lección | Contenidos clave | h |
|---|---|---|---|
| 1 ★ | ¿Qué es un microcontrolador? | CPU, memoria, pines, reloj | 1 |
| 2 | Placas Arduino | Uno, Nano, Mega, Leonardo; clones y drivers CH340 | 1 |
| 3 ★ | Primer programa | IDE, cargar Blink, puerto, errores comunes | 1,5 |
| 4 ★ | Estructura del sketch | setup(), loop(), comentarios | 1 |
| 5 ★ | Salidas digitales | pinMode, digitalWrite, corriente máxima por pin | 1,5 |
| 6 ★ | Entradas digitales | digitalRead, pull-up interno, rebote | 1,5 |
| 7 ★ | Entradas analógicas | ADC de 10 bits, analogRead, map() | 1,5 |
| 8 ★ | PWM | analogWrite, brillo y velocidad | 1,5 |
| 9 | Tiempo sin bloquear | delay() vs millis(); varias tareas | 1,5 |
| 10 | Interrupciones y bibliotecas | attachInterrupt, instalar y usar bibliotecas | 1,5 |
- **Prácticas:** Blink, botón que alterna LED, potenciómetro → brillo, coche fantástico con LED.
- **Materiales:** Arduino Uno o Nano, cable USB, LED, pulsadores, potenciómetro, zumbador.
- **Evaluación:** quiz · proyecto (3 h): **«Juego de reflejos»** (LED aleatorio, botón, puntaje por serial).

#### M09. Raspberry Pi y otras placas (8 lecciones · 14,5 h)
| # | Lección | Contenidos clave | h |
|---|---|---|---|
| 1 ★ | Microcontrolador vs computadora de placa única | Cuándo usar cada una | 1 |
| 2 ★ | Instalar Raspberry Pi OS | Raspberry Pi Imager, primer arranque, SSH | 1,5 |
| 3 ★ | Linux básico | Terminal, archivos, permisos, apt | 1,5 |
| 4 ★ | Python desde cero | Sintaxis, listas, funciones, bibliotecas | 2 |
| 5 ★ | GPIO con Python | gpiozero: LED, botón, 3,3 V máximo | 1,5 |
| 6 | ESP32 | WiFi y Bluetooth integrados, programarlo con el IDE de Arduino | 1,5 |
| 7 | Pico, micro:bit y MicroPython | Alternativas baratas y educativas | 1,5 |
| 8 | Elegir la placa | Tabla comparativa: precio, consumo, pines, potencia | 1 |
- **Prácticas:** LED y botón en la Pi con Python; script que registra temperatura del procesador.
- **Materiales:** Raspberry Pi 4/5 (o simulación), tarjeta microSD, fuente oficial; ESP32 DevKit; Pico opcional.
- **Evaluación:** quiz · proyecto (2,5 h): **«Estación de control con Python»** (botón en la Pi que enciende LED y guarda registro).

#### M10. Energía: fuentes, baterías y seguridad eléctrica (8 lecciones · 13 h)
| # | Lección | Contenidos clave | h |
|---|---|---|---|
| 1 ★ | ¿Cuánta energía necesita mi proyecto? | Tabla de consumos, picos de motores | 1 |
| 2 | Fuentes de alimentación | USB, adaptadores, fuente de laboratorio, tierra común | 1 |
| 3 ★ | Reguladores lineales | 7805, AMS1117; calor = (Vin − Vout)·I | 1,5 |
| 4 | Convertidores conmutados | Buck y boost (LM2596, MT3608), eficiencia | 1,5 |
| 5 ★ | Pilas y baterías | Alcalinas, NiMH, Li-ion 18650, LiPo; voltaje, capacidad, tasa C | 1,5 |
| 6 ★ | Cargar y proteger baterías | TP4056, BMS, cargadores balanceadores | 1,5 |
| 7 | Calcular autonomía | horas = mAh × 0,8 / mA | 1 |
| 8 ★ | Seguridad eléctrica | Choque, cortocircuito, incendio; por qué no tocar la red; fusibles | 1,5 |
- **Prácticas:** medir el consumo de un Arduino con motor; alimentar un proyecto con 2×18650 y regulador.
- **Materiales:** porta-baterías, regulador buck, TP4056 con protección, multímetro, fusible rápido.
- **Evaluación:** quiz · proyecto (2 h): **«Presupuesto de energía»** de un robot (tabla de consumos, batería elegida, autonomía calculada y verificada).

#### M11. Comunicación entre dispositivos (9 lecciones · 16,5 h)
| # | Lección | Contenidos clave | h |
|---|---|---|---|
| 1 | Bits y protocolos | Serie vs paralelo, síncrono vs asíncrono, velocidad en baudios | 1 |
| 2 ★ | Serial (UART) | Serial.print, monitor y trazador serie, TX/RX cruzados | 1,5 |
| 3 ★ | I2C | SDA/SCL, direcciones, escáner I2C, pantalla OLED | 1,5 |
| 4 | SPI | MOSI/MISO/SCK/CS, lector de tarjetas SD | 1,5 |
| 5 ★ | Niveles lógicos | 3,3 V vs 5 V, conversores de nivel | 1 |
| 6 ★ | Bluetooth | HC-05/HC-06, BLE en ESP32, app móvil | 1,5 |
| 7 ★ | WiFi | Servidor web en ESP32, página de control | 2 |
| 8 | MQTT e Internet de las cosas | Broker, temas, publicar y suscribirse | 1,5 |
| 9 | Infrarrojo y radio | Control remoto IR, nRF24L01 | 1,5 |
- **Prácticas:** dos Arduino conversando por serial; OLED por I2C; LED controlado desde el móvil por WiFi.
- **Materiales:** 2 Arduino, OLED SSD1306, módulo SD, HC-05, ESP32, receptor IR, nRF24L01.
- **Evaluación:** quiz · proyecto (3 h): **«Panel de control inalámbrico»** (ESP32 con página web que muestra un sensor y controla un LED).

### NIVEL 3 · SENSORES, ACTUADORES Y CONTROL

#### M12. Sensores del entorno (8 lecciones · 13,5 h)
| # | Lección | Contenidos clave | h |
|---|---|---|---|
| 1 ★ | ¿Qué es un sensor? | Analógico/digital, rango, resolución, calibración | 1 |
| 2 ★ | Distancia ultrasónica | HC-SR04, tiempo de vuelo, d = t·343/2 | 1,5 |
| 3 | Distancia IR y láser | Sharp IR, VL53L0X (ToF) | 1 |
| 4 ★ | Luz | LDR con divisor, BH1750 (lux) | 1,5 |
| 5 ★ | Temperatura | LM35, DS18B20 (1-Wire) | 1,5 |
| 6 ★ | Temperatura y humedad | DHT11, DHT22, BME280 (presión) | 1,5 |
| 7 | Otros sensores | Humedad del suelo, lluvia, gas MQ-2 (calentamiento) | 1 |
| 8 ★ | Filtrar lecturas | Promedio móvil, mediana, descartar errores | 1,5 |
- **Prácticas:** medidor de distancia con OLED; termómetro e higrómetro; regar una planta (solo la lectura).
- **Materiales:** HC-SR04, VL53L0X, LDR, BH1750, DS18B20, DHT22, sensor de humedad de suelo.
- **Evaluación:** quiz · proyecto (2,5 h): **«Estación meteorológica»** con registro de datos y gráfica en el trazador serie.

#### M13. Movimiento, sonido y orientación (7 lecciones · 13 h)
| # | Lección | Contenidos clave | h |
|---|---|---|---|
| 1 ★ | Sensor PIR | Infrarrojo pasivo, ajuste de sensibilidad y tiempo | 1 |
| 2 | Sonido | Micrófono KY-038 y MAX9814, detectar aplausos, umbral | 1,5 |
| 3 ★ | Acelerómetro y giroscopio | MPU6050 por I2C, ejes, unidades | 2 |
| 4 | Calcular ángulos | Inclinación, deriva del giroscopio, filtro complementario | 1,5 |
| 5 ★ | Encoders | Ópticos y magnéticos, contar vueltas, velocidad | 1,5 |
| 6 | Contacto y mando | Finales de carrera, joystick, sensor táctil | 1 |
| 7 | Combinar sensores | Lectura de varios sensores sin bloquear | 1,5 |
- **Prácticas:** alarma de presencia; lámpara por aplauso; nivel electrónico con MPU6050.
- **Materiales:** HC-SR501, KY-038/MAX9814, MPU6050, encoder, joystick, finales de carrera.
- **Evaluación:** quiz · proyecto (2,5 h): **«Nivel de burbuja digital con alarma»**.

#### M14. Motores DC y puentes H (7 lecciones · 11,5 h)
| # | Lección | Contenidos clave | h |
|---|---|---|---|
| 1 ★ | Cómo funciona un motor DC | Imán, bobina, escobillas; corriente de arranque | 1 |
| 2 ★ | Motor con transistor | Nunca directo del pin; diodo de protección | 1,5 |
| 3 ★ | El puente H | Cambiar el sentido de giro; estados prohibidos | 1,5 |
| 4 ★ | Drivers | L298N, L9110S, TB6612FNG: comparación | 1,5 |
| 5 ★ | Velocidad con PWM | Rampa de aceleración | 1 |
| 6 | Motorreductores y par | Relación de reducción, velocidad vs fuerza | 1 |
| 7 ★ | Tracción diferencial | Dos motores: avanzar, girar, girar en el sitio | 1,5 |
- **Prácticas:** ventilador con velocidad variable; plataforma de 2 ruedas que hace un cuadrado.
- **Materiales:** 2 motorreductores TT con ruedas, TB6612FNG o L298N, chasis 2WD, porta-baterías.
- **Evaluación:** quiz · proyecto (2 h): **«Coreografía robótica»** (secuencia de movimientos programada).

#### M15. Servos, paso a paso y relés (8 lecciones · 13 h)
| # | Lección | Contenidos clave | h |
|---|---|---|---|
| 1 ★ | Servomotores | Señal de 50 Hz, ancho de pulso, SG90 vs MG996R | 1 |
| 2 ★ | Controlar servos | Biblioteca Servo, alimentación aparte, PCA9685 | 1,5 |
| 3 | Servos de rotación continua | Usos y límites | 1 |
| 4 ★ | Motores paso a paso | Unipolar/bipolar, pasos, micropasos | 1,5 |
| 5 | Drivers de paso a paso | ULN2003 (28BYJ-48), A4988, límite de corriente | 1,5 |
| 6 ★ | Relés | Bobina, contactos NA/NC, módulo con optoacoplador | 1,5 |
| 7 | Otras cargas | Bomba de agua, solenoide, ventilador 12 V con MOSFET | 1 |
| 8 ★ | Cargas de red: por qué no | Riesgos de 110/220 V, alternativas seguras (enchufes inteligentes certificados) | 1 |
- **Prácticas:** barrera con servo; reloj con paso a paso; bomba de 5 V con relé.
- **Materiales:** SG90, MG996R, PCA9685, 28BYJ-48 + ULN2003, NEMA17 + A4988, módulo de relé, minibomba 5 V.
- **Evaluación:** quiz · proyecto (2,5 h): **«Riego automático»** (humedad del suelo → relé → bomba de 5 V).

#### M16. Mecánica y control (7 lecciones · 12 h)
| # | Lección | Contenidos clave | h |
|---|---|---|---|
| 1 | Materiales y estructuras | Cartón, MDF, acrílico, aluminio, PLA; rigidez | 1 |
| 2 | Ruedas, engranajes y poleas | Relación de transmisión, tracción, ruedas locas | 1,5 |
| 3 | Fabricación digital | Impresión 3D y corte láser: introducción, Tinkercad 3D | 1,5 |
| 4 ★ | Lazo abierto y cerrado | Realimentación; ejemplo del termostato | 1 |
| 5 ★ | Control PID | P, I, D explicados con un coche que quiere mantenerse en el carril; ajuste | 2 |
| 6 ★ | Máquinas de estados | Estados, transiciones, switch en código | 1,5 |
| 7 | Integración y pruebas | Probar por partes, lista de comprobación | 1 |
- **Prácticas:** control de velocidad con encoder y PID; máquina de estados para una puerta automática.
- **Materiales:** plataforma de M14 con encoders, cartón o MDF, herramientas.
- **Evaluación:** quiz · proyecto (2 h): **«Robot que avanza exactamente 1 metro»** (encoder + PID).

### NIVEL 4 · PROYECTOS PRÁCTICOS PASO A PASO

> Cada proyecto incluye: lista de materiales con precios orientativos, esquema SVG, fotos/diagramas de montaje por pasos, código completo comentado en español, pruebas, problemas típicos y mejoras propuestas. Evaluación: quiz (0,5 h) + entrega con rúbrica (1 h).

#### M17. Robot que evita obstáculos (6 lecciones · 10,5 h)
| # | Lección | h |
|---|---|---|
| 1 ★ | Diseño y lista de materiales | 1 |
| 2 ★ | Montaje del chasis y motores | 2 |
| 3 ★ | Cableado: driver, sensor, batería | 1,5 |
| 4 ★ | Programa base: avanzar, detectar, girar | 1,5 |
| 5 | Radar con servo de barrido | 1,5 |
| 6 | Pruebas y mejoras (máquina de estados, velocidad) | 1,5 |
- **Materiales:** chasis 2WD, Arduino, TB6612FNG/L298N, HC-SR04, SG90, 2×18650.

#### M18. Robot seguidor de línea (6 lecciones · 10,5 h)
| # | Lección | h |
|---|---|---|
| 1 ★ | Principio: sensores infrarrojos TCRT5000 / QTR | 1 |
| 2 ★ | Montaje y calibración de sensores | 2 |
| 3 ★ | Control todo-nada | 1,5 |
| 4 ★ | Control PID aplicado | 2 |
| 5 | Pistas y competencias | 1 |
| 6 | Mejoras: velocidad, cruces, curvas cerradas | 1,5 |
- **Materiales:** chasis, arreglo de 5 sensores IR, cinta aislante negra, cartulina blanca.

#### M19. Carro a control remoto (6 lecciones · 11 h)
| # | Lección | h |
|---|---|---|
| 1 ★ | Diseño y elección de la conexión | 1 |
| 2 ★ | Control por Bluetooth con app móvil | 2 |
| 3 ★ | Control por WiFi con página web (ESP32) | 2 |
| 4 | Mando propio con joystick y nRF24L01 | 2 |
| 5 | Telemetría: batería y distancia | 1,5 |
| 6 ★ | Seguridad: parada si se pierde la señal | 1 |
- **Materiales:** chasis 2WD/4WD, ESP32 o Arduino + HC-05, joystick, 2 nRF24L01.

#### M20. Brazo robótico (7 lecciones · 12,5 h)
| # | Lección | h |
|---|---|---|
| 1 ★ | Grados de libertad y articulaciones | 1,5 |
| 2 | Diseño y materiales (MDF, acrílico, impreso) | 1 |
| 3 ★ | Montaje de 4 servos | 2,5 |
| 4 ★ | Control con potenciómetros | 1,5 |
| 5 | Grabar y reproducir movimientos | 1,5 |
| 6 | Cinemática inversa en 2D | 2 |
| 7 | Pinza y tareas de recoger y dejar | 1 |
- **Materiales:** kit de brazo de 4 GDL, 4 servos SG90/MG90S, PCA9685, fuente 5 V 3 A, 4 potenciómetros.

#### M21. Casa inteligente (7 lecciones · 13 h)
| # | Lección | h |
|---|---|---|
| 1 ★ | Arquitectura: sensores, controlador, actuadores, red | 1 |
| 2 ★ | Iluminación automática (LDR + PIR) | 1,5 |
| 3 | Clima: temperatura y ventilador | 1,5 |
| 4 ★ | Alarma con PIR, zumbador y aviso | 1,5 |
| 5 ★ | Panel web en ESP32 | 2 |
| 6 | MQTT y Home Assistant | 2 |
| 7 | Maqueta e integración | 2 |
- **Materiales:** ESP32, DHT22, PIR, LDR, LED/tira LED 5 V, ventilador 5 V, servo (puerta), zumbador, maqueta de cartón. **Todo a 5 V**, sin red eléctrica.

### NIVEL 5 · INTELIGENCIA ARTIFICIAL EN ROBOTS

#### M22. Visión por computadora (7 lecciones · 14,5 h)
| # | Lección | Contenidos clave | h |
|---|---|---|---|
| 1 ★ | ¿Qué es una imagen digital? | Píxeles, RGB, HSV, resolución | 1 |
| 2 | Cámaras para robots | Cámara de la Pi, webcam USB, ESP32-CAM | 1,5 |
| 3 ★ | OpenCV: primeros pasos | Leer, mostrar, transformar imágenes en Python | 2 |
| 4 ★ | Seguir un color | Máscaras HSV, centroide | 2 |
| 5 | Bordes y formas | Canny, contornos | 1,5 |
| 6 | Rostros y marcadores | Detección de rostros, QR, ArUco | 1,5 |
| 7 ★ | Robot que sigue una pelota | Visión → control de motores | 2 |
- **Materiales:** Raspberry Pi + cámara (o computadora con webcam), robot de M17.
- **Evaluación:** quiz · proyecto (2,5 h): **«Robot que persigue un color»**.

#### M23. Aprendizaje automático básico (7 lecciones · 13,5 h)
| # | Lección | Contenidos clave | h |
|---|---|---|---|
| 1 ★ | IA y aprendizaje automático | Reglas vs aprendizaje; tipos de aprendizaje | 1 |
| 2 ★ | Datos, entrenamiento y prueba | Conjuntos, sobreajuste, exactitud | 1,5 |
| 3 | Clasificar con k vecinos | k-NN en Python con datos de sensores | 2 |
| 4 ★ | Redes neuronales explicadas | Neuronas, pesos, capas, sin matemáticas difíciles | 1,5 |
| 5 ★ | Modelos sin programar | Teachable Machine; usar modelos ya entrenados | 1,5 |
| 6 | IA en microcontroladores | TinyML, Edge Impulse, reconocer gestos con MPU6050 | 2 |
| 7 ★ | Ética y límites | Sesgos, privacidad, errores, responsabilidad | 1 |
- **Materiales:** computadora; opcional ESP32/Arduino Nano 33 BLE Sense, MPU6050.
- **Evaluación:** quiz · proyecto (2,5 h): **«Clasificador de gestos o de objetos»** que activa una acción del robot.

#### M24. Robots autónomos (7 lecciones · 13,5 h)
| # | Lección | Contenidos clave | h |
|---|---|---|---|
| 1 ★ | ¿Qué hace autónomo a un robot? | Niveles de autonomía, percepción-decisión-acción | 1 |
| 2 ★ | Odometría y localización | Encoders, IMU, error acumulado | 1,5 |
| 3 | Mapas y SLAM | Rejillas de ocupación, LIDAR, concepto de SLAM | 1,5 |
| 4 ★ | Planificar rutas | Búsqueda en anchura y A* sobre una cuadrícula | 2 |
| 5 | Introducción a ROS 2 | Nodos, temas, mensajes | 2 |
| 6 | Simulación | Webots / Gazebo: robot virtual | 1,5 |
| 7 | Autonomía segura | Parada de emergencia, límites, robots y modelos de lenguaje | 1 |
- **Materiales:** computadora; robot con encoders; LIDAR opcional.
- **Evaluación:** quiz · proyecto (2,5 h): **«Robot que encuentra la salida de un laberinto»** (simulado o real).

### NIVEL 6 · SEGURIDAD, MANTENIMIENTO Y PROYECTO FINAL

#### M25. Seguridad, mantenimiento y solución de problemas (8 lecciones · 12 h)
| # | Lección | Contenidos clave | h |
|---|---|---|---|
| 1 ★ | Seguridad eléctrica a fondo | Efectos de la corriente en el cuerpo, protección, normas | 1,5 |
| 2 ★ | Primeros auxilios | Choque eléctrico (cortar la corriente primero), quemaduras, cuándo llamar a emergencias | 1 |
| 3 ★ | Baterías de litio | Carga supervisada, bolsa ignífuga, hinchazón, almacenamiento al 40–60 %, desecho | 1,5 |
| 4 | Seguridad mecánica | Pellizcos, piezas giratorias, parada de emergencia | 1 |
| 5 ★ | Mantenimiento preventivo | Limpieza, conectores, tornillos, engranajes, calendario | 1 |
| 6 ★ | Método de diagnóstico | Observar, reproducir, dividir y aislar, medir, cambiar una cosa a la vez | 1,5 |
| 7 ★ | Fallas comunes | No carga el programa, se reinicia al arrancar motores, sensor lee 0, I2C no responde… | 1,5 |
| 8 | Residuos electrónicos | Reciclaje, reutilización, puntos limpios | 1 |
- **Evaluación:** quiz · proyecto (1,5 h): **«Diagnóstico guiado»** de 5 casos de falla + plan de mantenimiento de un robot propio.

#### M26. Proyecto final integrador (6 lecciones · 15,5 h)
| # | Lección | h |
|---|---|---|
| 1 ★ | Elegir y definir el proyecto (requisitos) | 1 |
| 2 ★ | Diseño: esquema, lista de materiales, presupuesto, energía | 2 |
| 3 ★ | Prototipo | 4 |
| 4 ★ | Programación e integración | 4 |
| 5 ★ | Pruebas y documentación | 2 |
| 6 ★ | Presentación y portafolio | 1 |
- **Evaluación:** examen final (1,5 h, 30 preguntas de todo el curso, ≥ 70 %) + proyecto con rúbrica: funcionamiento (25 %), diseño electrónico y seguridad (20 %), código (20 %), mecánica (10 %), documentación (15 %), presentación (10 %).

---

## 4. Evaluación

| Evaluación | Formato | Aprobación | Intentos |
|---|---|---|---|
| Mini-quiz de lección | 5 preguntas propias de la lección | ≥ 60 % | Ilimitados |
| Quiz de módulo | 12 preguntas al azar del banco del módulo (≥ 20 preguntas) | ≥ 70 % | Ilimitados (se guarda la mejor nota) |
| Proyecto de módulo | Lista de comprobación autoevaluada (5–8 criterios) | Todos los criterios obligatorios marcados | — |
| Examen final | 30 preguntas de todos los módulos | ≥ 70 % | Ilimitados |

**Tipos de pregunta:** opción múltiple · verdadero o falso · **numérica con tolerancia** (ley de Ohm, resistencia de un LED, autonomía, código de colores) · «¿qué hace este código?» · «encuentra el error» en un esquema o un programa. Cada pregunta tiene explicación.

**Certificado** (página imprimible, nombre guardado localmente) al completar todos los módulos y aprobar el examen final; certificados por nivel.

---

## 5. Diseño de la web (`sitios/robotica-electronica/`)

### 5.1 Archivos a crear

| Archivo | Contenido |
|---|---|
| `index.html` | Esqueleto: «Saltar al contenido», cabecera (☰, marca, navegación, buscador, botón de tema), `<main id="app">`, pie con aviso de seguridad, barra inferior móvil; carga de scripts |
| `styles.css` | Variables en `:root` (claro), `@media (prefers-color-scheme: dark)` con `:root:not([data-theme="light"])` y `:root[data-theme="dark"]`; móvil primero; colores por nivel; tarjetas, barra de progreso, quiz, bloques de código, recuadros de seguridad, impresión del certificado |
| `data-curso-1.js` | `window.CURSO` con niveles 0–2 (M01–M11): lecciones completas con texto, código, práctica, materiales y mini-quiz |
| `data-curso-2.js` | Niveles 3–4 (M12–M21), añade a `window.CURSO` |
| `data-curso-3.js` | Niveles 5–6 (M22–M26) |
| `data-extra.js` | Glosario (≈ 150 términos), fichas de componentes (≈ 40: símbolo, función, pines, valores típicos, precauciones), kits de materiales, página de seguridad, guía de solución de problemas (≈ 30 síntomas → causas → solución), preguntas del examen final |
| `tools.js` | Calculadoras: ley de Ohm, resistencia para LED, código de colores de resistencias (interactivo), divisor de voltaje, constante RC, autonomía de batería, conversor de unidades (mA/A, mAh/Wh), mapa de pines de Arduino Uno |
| `app.js` | Enrutador, vistas, buscador, progreso, quizzes, tema, menú |
| `pruebas.js` | `node sitios/robotica-electronica/pruebas.js`: fórmulas de las calculadoras y coherencia de datos |

Además: `planes/plan-7-robotica-electronica.md` (este plan) y fila nueva en `LEEME.md`.

### 5.2 Modelo de datos

```
Nivel   {n, t, d, objetivos[], color}
Módulo  {id:"M03", n:nivel, t, d, h, objetivos[], practicas[], materiales[], proyecto:{t, d, pasos[], criterios[]}, banco:[pregunta…]}
Lección {id:"M03-3", t, h, star, pregunta, obj[], txt (párrafos), clave?, codigo?:{lenguaje, texto}, practica?:{pasos[], esperado, simulada}, seg?, errores[], q:[pregunta×5]}
Pregunta [enunciado, opciones[] | {num, tol, unidad}, correcta, explicación]
```

### 5.3 Páginas (rutas con hash)

| Ruta | Página |
|---|---|
| `#/` | Inicio: «Empezar» o «Continuar donde lo dejaste», progreso global, 7 niveles en tarjetas, proyecto destacado, ruta exprés |
| `#/curso` | Mapa: niveles → módulos (tarjeta con lecciones, horas, % completado, estado) |
| `#/nivel/3` | Nivel: objetivos, módulos, horas |
| `#/modulo/M14` | Módulo: objetivos, índice de lecciones con ✓, prácticas, materiales, botón al quiz y al proyecto, dependencias recomendadas |
| `#/leccion/M14-3` | Lección (plantilla §1.2), migas de pan, barra lateral con las lecciones del módulo (en móvil, desplegable) |
| `#/quiz/M14` | Quiz del módulo |
| `#/proyecto/M14` | Proyecto con pasos y lista de comprobación guardada |
| `#/examen` | Examen final · `#/certificado` |
| `#/buscar/texto` | Resultados del buscador |
| `#/progreso` | Panel: % global y por nivel, lecciones, notas de quizzes, horas acumuladas, racha, insignias, exportar/importar/borrar progreso |
| `#/herramientas` · `#/herramientas/ohm` … | Calculadoras |
| `#/componentes` · `#/componentes/transistor` | Fichas de componentes |
| `#/glosario` | Glosario con filtro A–Z |
| `#/seguridad` | Normas permanentes (enlazada desde cada aviso ⚠️) |
| `#/solucion-de-problemas` | Guía de fallas por síntoma |
| `#/materiales` | Kits por presupuesto y por módulo |
| `#/rutas` | Rutas de aprendizaje |
| `#/acerca` · `#/privacidad` | Información del sitio |

### 5.4 Funciones clave

- **Buscador:** índice construido al cargar con lecciones (título, objetivos, texto, código), módulos, glosario, componentes, fallas y herramientas. Normaliza tildes y mayúsculas («ohm» encuentra «Ohm»), puntúa por coincidencia en título > objetivos > texto, muestra fragmento con el término resaltado, tipo (lección, término, componente…) y nivel; filtro por tipo y nivel. Caja en la cabecera y caja grande en la página de resultados.
- **Progreso (`localStorage`, clave `robotica-progreso`):** `{lecciones:{id:fecha}, miniquiz:{id:mejor}, quiz:{id:{mejor, intentos}}, proyectos:{id:[criterios]}, notas:{id:texto}, ultima, dias:[fechas], examen, nombre}`; tema en `robotica-tema`. Lectura y escritura con `try/catch`; el sitio funciona igual sin almacenamiento. Exportar e importar como archivo JSON; borrar con confirmación.
- **Estados:** lección (sin empezar / completada / dominada = mini-quiz 100 %); módulo (disponible / en curso / completado = lecciones + quiz ≥ 70 % + proyecto); nivel completado.
- **Insignias (≈ 12):** Primer LED (M03.3), Ohm dominado (M03), Soldador (M06), Programador (M07), Arduinista (M08), Comunicador (M11), Sensorial (M12–M13), Motorizado (M14), Constructor (cada proyecto de nivel 4), Visión artificial (M22), Seguro (M25), Ingeniero (curso completo).
- **Quizzes:** corrección instantánea, explicación por pregunta, preguntas numéricas con tolerancia y unidad, orden aleatorio con semilla, mejor nota guardada.
- **Responsive:** móvil primero; menú ☰ y barra inferior (Curso · Buscar · Herramientas · Progreso) bajo 760 px; tablas con desplazamiento propio; bloques de código con ajuste; sin desplazamiento horizontal de la página a 360 px.
- **Tema claro/oscuro:** sigue al sistema por defecto, botón para forzar; contraste AA en ambos.
- **Accesibilidad:** HTML semántico, foco visible, `aria-live` en resultados de quiz, diagramas SVG con `<title>`, no depender solo del color.
- **Diagramas:** SVG en línea para ≈ 20 esquemas clave (LED con resistencia, serie/paralelo, divisor, transistor como interruptor, puente H, protoboard, conexión de HC-SR04, servo, I2C, robot 2WD).
- **Sin internet:** los enlaces a Tinkercad, Wokwi, documentación oficial, etc. se muestran como referencias externas; nada esencial depende de ellos.

### 5.5 Colores por nivel

N0 gris pizarra · N1 ámbar (electrónica) · N2 azul (hardware/software) · N3 verde (sensores y actuadores) · N4 naranja (proyectos) · N5 violeta (IA) · N6 rojo (seguridad).

---

## 6. Fases de construcción (en esta sesión, rama `claude/vigilant-gauss-7n7o5l`)

1. **Base:** copiar este plan a `planes/`, `index.html`, `styles.css`, `app.js` (rutas, vistas, buscador, progreso, quizzes, tema), `tools.js`, `data-extra.js` y Nivel 0–1 completo. Commit.
2. **Nivel 2** (M07–M11) en `data-curso-1.js`. Commit.
3. **Niveles 3–4** en `data-curso-2.js`. Commit.
4. **Niveles 5–6**, examen final, certificado, insignias, `pruebas.js`, `LEEME.md`. Commit y push.

Volumen estimado de contenido: 192 lecciones con texto propio, ≈ 960 preguntas de mini-quiz, ≈ 26 bancos de módulo, ≈ 150 términos, ≈ 40 componentes, ≈ 30 fallas, ≈ 20 diagramas, ≈ 80 programas de ejemplo.

---

## 7. Verificación

- `node sitios/robotica-electronica/pruebas.js`: 26 módulos, 192 lecciones, horas por módulo que cuadran con el total (336,5 h), cada lección con 5 preguntas y respuesta válida, ids únicos, enlaces internos que existen, fórmulas de las calculadoras (p. ej., LED: (9 − 2)/0,02 = 350 Ω; autonomía: 2000 mAh × 0,8 / 250 mA = 6,4 h).
- Navegador (Playwright con el Chromium instalado), abriendo `index.html` como archivo: sin errores en consola; recorrer inicio → nivel → módulo → lección → quiz → proyecto; completar una lección, recargar y comprobar que sigue marcada; buscar «ohm», «servo», «i2c» y obtener resultados; cambiar tema; capturas a 375 px y 1280 px en claro y oscuro, sin desplazamiento horizontal.
- Revisión de idioma: búsqueda de palabras inglesas comunes en la interfaz (salvo nombres propios y palabras clave de código).

---

## 8. Totales

**7 niveles · 26 módulos · 192 lecciones · 336,5 horas** (272 h de lecciones + 12,5 h de quizzes de módulo + 1,5 h de examen final + 50,5 h de proyectos).
