// Datos generales del curso: niveles, glosario, componentes, kits, seguridad, fallas, rutas, páginas y diagramas.
window.CURSO = window.CURSO || {modulos: []};
window.EXTRA = {};
const EXTRA = window.EXTRA;

EXTRA.NIVELES = [
 {n: 0, t: "Fundamentos: qué es un robot", d: "Qué es un robot, de qué está hecho, su historia y cómo preparar tu taller.",
  obj: ["Explicar qué es un robot y sus tres partes: mecánica, electrónica y software.", "Describir el ciclo sentir-pensar-actuar en cualquier robot.", "Reconocer los tipos de robots y los hitos de su historia.", "Preparar un taller seguro y usar un simulador de circuitos."]},
 {n: 1, t: "Electrónica", d: "Voltaje, corriente, resistencia, componentes, protoboard, esquemas y soldadura.",
  obj: ["Aplicar la ley de Ohm y las leyes de Kirchhoff.", "Medir voltaje, corriente, resistencia y continuidad con un multímetro.", "Identificar y elegir resistencias, condensadores, diodos, LED y transistores.", "Leer un esquema, montarlo en protoboard y soldarlo con seguridad."]},
 {n: 2, t: "Hardware y software", d: "Programación desde cero, Arduino, Raspberry Pi, energía y comunicación entre dispositivos.",
  obj: ["Programar desde cero: variables, condiciones, bucles y funciones.", "Programar Arduino y Raspberry Pi para leer entradas y controlar salidas.", "Alimentar un proyecto de forma segura y calcular su autonomía.", "Comunicar dispositivos por serial, I2C, SPI, Bluetooth y WiFi."]},
 {n: 3, t: "Sensores, actuadores y control", d: "Sensores de distancia, luz, temperatura, movimiento y sonido; motores, servos, relés y control PID.",
  obj: ["Leer, calibrar y filtrar sensores.", "Controlar motores DC, servos y motores paso a paso con el driver adecuado.", "Usar relés con seguridad.", "Aplicar control en lazo cerrado (PID) y máquinas de estados."]},
 {n: 4, t: "Proyectos prácticos paso a paso", d: "Cinco robots completos: evasor de obstáculos, seguidor de línea, carro a control remoto, brazo robótico y casa inteligente.",
  obj: ["Construir, programar y probar cinco robots completos.", "Integrar mecánica, electrónica y software en un mismo proyecto.", "Documentar y mejorar un diseño a partir de pruebas."]},
 {n: 5, t: "Inteligencia artificial en robots", d: "Visión por computadora, aprendizaje automático básico y robots autónomos.",
  obj: ["Procesar imágenes con OpenCV para que un robot siga colores u objetos.", "Entrenar y usar modelos sencillos de aprendizaje automático.", "Explicar cómo un robot se localiza, construye mapas y planifica rutas.", "Valorar los límites éticos y de seguridad de la IA en robots."]},
 {n: 6, t: "Seguridad, mantenimiento y proyecto final", d: "Seguridad eléctrica y de baterías, mantenimiento, diagnóstico de fallas y tu proyecto propio.",
  obj: ["Trabajar con seguridad eléctrica, mecánica y con baterías de litio.", "Mantener equipos y diagnosticar fallas con método.", "Diseñar, construir y presentar un proyecto propio."]}
];

EXTRA.GLOSARIO = [
 ["Actuador", "Componente que produce una acción física: un motor, un servo, un relé, un LED o un zumbador."],
 ["ADC", "Conversor analógico-digital. Convierte un voltaje en un número; en el Arduino Uno, de 0 a 1023 (10 bits)."],
 ["Algoritmo", "Secuencia ordenada y finita de pasos para resolver un problema."],
 ["Amperio (A)", "Unidad de corriente eléctrica. 1 mA = 0,001 A."],
 ["Ánodo", "Terminal positivo de un diodo o LED (la pata larga del LED)."],
 ["Arduino", "Familia de placas con microcontrolador y un entorno de programación sencillo, muy usada en educación."],
 ["Arreglo", "Variable que guarda una lista de valores del mismo tipo, a los que se accede por posición (índice)."],
 ["ArUco", "Marcadores cuadrados en blanco y negro que una cámara reconoce fácilmente para saber posición y orientación."],
 ["A*", "Algoritmo de planificación de rutas que busca el camino más corto usando una estimación de la distancia restante."],
 ["Baudio", "Velocidad de una comunicación serial en símbolos por segundo; por ejemplo, 9600 o 115200 baudios."],
 ["Batería", "Conjunto de celdas que almacenan energía química y la entregan como electricidad."],
 ["Biblioteca", "Código ya escrito que se añade a un programa para usar un sensor o una función sin programarlo desde cero."],
 ["Bit", "Unidad mínima de información: 0 o 1."],
 ["BJT", "Transistor bipolar de unión (NPN o PNP). Una pequeña corriente de base controla una corriente mayor entre colector y emisor."],
 ["Bluetooth", "Comunicación inalámbrica de corto alcance (unos 10 m). BLE es su versión de bajo consumo."],
 ["BMS", "Sistema de gestión de baterías: protege celdas de litio contra sobrecarga, descarga excesiva y cortocircuito."],
 ["Bobina", "Alambre enrollado que crea un campo magnético al pasar corriente. Base de motores, relés y electroimanes."],
 ["Booleano", "Tipo de dato con solo dos valores: verdadero (true) o falso (false)."],
 ["Broker", "Servidor que recibe y reparte mensajes en el protocolo MQTT."],
 ["Buck", "Convertidor conmutado que baja el voltaje con alta eficiencia."],
 ["Boost", "Convertidor conmutado que sube el voltaje."],
 ["Bucle", "Parte de un programa que se repite: for, while o el loop() de Arduino."],
 ["Bus", "Conjunto de líneas compartidas por varios dispositivos para comunicarse, como I2C o SPI."],
 ["Calibración", "Ajuste de un sensor comparándolo con valores conocidos para que sus lecturas sean correctas."],
 ["Cátodo", "Terminal negativo de un diodo o LED (la pata corta, del lado plano)."],
 ["Cautín", "Herramienta que calienta la punta para fundir el estaño al soldar. También se llama soldador."],
 ["Chasis", "Estructura que sostiene todas las piezas de un robot."],
 ["Cinemática", "Estudio del movimiento sin considerar fuerzas. La cinemática inversa calcula los ángulos de un brazo para llegar a un punto."],
 ["Circuito", "Camino cerrado por donde circula la corriente desde la fuente, a través de componentes, y de vuelta a la fuente."],
 ["Circuito integrado", "Chip que contiene muchos componentes miniaturizados, como el temporizador 555 o un microcontrolador."],
 ["Código de colores", "Bandas pintadas en una resistencia que indican su valor y tolerancia."],
 ["Compilar", "Traducir el código que escribes a instrucciones que entiende el microcontrolador."],
 ["Condensador", "Componente que almacena carga eléctrica por poco tiempo. Se mide en faradios (normalmente µF, nF o pF)."],
 ["Condicional", "Instrucción que ejecuta un código solo si se cumple una condición: if, else, switch."],
 ["Continuidad", "Prueba del multímetro que pita si hay conexión eléctrica entre dos puntos."],
 ["Control PID", "Control en lazo cerrado que corrige el error usando tres términos: proporcional, integral y derivativo."],
 ["Corriente", "Cantidad de carga que pasa por un punto cada segundo. Se mide en amperios."],
 ["Corriente alterna (CA)", "Corriente que cambia de sentido muchas veces por segundo (50 o 60 Hz); es la del enchufe de casa."],
 ["Corriente continua (CC)", "Corriente que circula siempre en el mismo sentido, como la de una pila o un USB."],
 ["Cortocircuito", "Unión accidental de dos puntos con mucha diferencia de voltaje sin resistencia; produce una corriente enorme y calor."],
 ["Datasheet", "Hoja de datos: documento del fabricante con los valores, límites y conexiones de un componente."],
 ["Depurar", "Buscar y corregir errores en un programa o un circuito."],
 ["Desacoplo", "Condensador pequeño (100 nF) junto a un chip para filtrar el ruido de la alimentación."],
 ["Diodo", "Componente que deja pasar la corriente en un solo sentido."],
 ["Diodo flyback", "Diodo colocado en paralelo con una bobina (motor, relé) para absorber el pico de voltaje al apagarla."],
 ["Divisor de voltaje", "Dos resistencias en serie que entregan una fracción del voltaje de entrada."],
 ["Driver", "Circuito que permite a un microcontrolador controlar una carga que necesita más corriente, como un motor."],
 ["Dupont", "Cables con conectores macho o hembra para unir placas y módulos sin soldar."],
 ["Electrón", "Partícula con carga negativa; su movimiento forma la corriente eléctrica en los metales."],
 ["Encoder", "Sensor que cuenta giros de un eje para medir posición o velocidad."],
 ["Entrada digital", "Pin que lee solo dos estados: alto (HIGH) o bajo (LOW)."],
 ["ESP32", "Microcontrolador barato con WiFi y Bluetooth integrados."],
 ["Esquema", "Dibujo de un circuito con símbolos normalizados que muestra cómo se conectan los componentes."],
 ["Estaño", "Aleación que se funde para unir componentes al soldar."],
 ["Faradio (F)", "Unidad de capacidad de un condensador."],
 ["Filtro complementario", "Forma sencilla de combinar acelerómetro y giroscopio para calcular un ángulo estable."],
 ["Flux", "Sustancia que limpia el metal y ayuda a que el estaño fluya al soldar."],
 ["Fuente de alimentación", "Equipo o circuito que entrega la energía eléctrica que necesita un proyecto."],
 ["Función", "Bloque de código con nombre que realiza una tarea y se puede reutilizar."],
 ["Fusible", "Componente que se funde y corta el circuito si la corriente supera un valor, para evitar daños o incendios."],
 ["Giroscopio", "Sensor que mide la velocidad de giro alrededor de sus ejes."],
 ["GND", "Tierra o referencia de 0 V del circuito."],
 ["GPIO", "Pines de entrada y salida de propósito general de una placa."],
 ["Grados de libertad", "Número de movimientos independientes que puede hacer un robot o brazo."],
 ["HSV", "Forma de representar colores por tono, saturación y brillo; facilita detectar un color en visión artificial."],
 ["I2C", "Bus de comunicación de dos cables (SDA y SCL) donde cada dispositivo tiene una dirección."],
 ["IDE", "Entorno de desarrollo: programa donde escribes, compilas y cargas el código."],
 ["IMU", "Unidad de medición inercial: acelerómetro y giroscopio (a veces magnetómetro) en un solo chip."],
 ["Inteligencia artificial", "Técnicas que permiten a las máquinas realizar tareas que asociamos a la inteligencia, como reconocer imágenes o decidir."],
 ["Interrupción", "Señal que detiene momentáneamente el programa para atender un evento urgente."],
 ["IoT", "Internet de las cosas: objetos conectados a la red que envían datos o reciben órdenes."],
 ["Jumper", "Cable corto o puente que une dos puntos de un circuito."],
 ["KiCad", "Programa libre para dibujar esquemas y diseñar placas de circuito impreso."],
 ["k-NN", "Algoritmo de los k vecinos más cercanos: clasifica un dato según los ejemplos más parecidos."],
 ["Lazo cerrado", "Control que mide el resultado y corrige la acción (con realimentación)."],
 ["Lazo abierto", "Control que actúa sin medir el resultado."],
 ["LDR", "Fotorresistencia: su resistencia baja cuando recibe más luz."],
 ["LED", "Diodo emisor de luz. Necesita una resistencia en serie para limitar la corriente."],
 ["Ley de Ohm", "Relación entre voltaje, corriente y resistencia: V = I · R."],
 ["Leyes de Kirchhoff", "La corriente que entra en un nodo es igual a la que sale; la suma de voltajes en una malla cerrada es cero."],
 ["LIDAR", "Sensor que mide distancias con láser girando para crear un mapa del entorno."],
 ["Li-ion", "Batería de iones de litio, como la celda 18650 (3,7 V nominal)."],
 ["LiPo", "Batería de polímero de litio: ligera y potente, pero delicada; se hincha y puede incendiarse si se maltrata."],
 ["Máquina de estados", "Forma de programar en la que el sistema está siempre en un estado y cambia a otro según eventos."],
 ["mAh", "Miliamperio-hora: capacidad de una batería. 2000 mAh entregan 2000 mA durante 1 hora (en teoría)."],
 ["Microcontrolador", "Pequeña computadora en un chip con procesador, memoria y pines de entrada y salida."],
 ["MicroPython", "Versión de Python para microcontroladores."],
 ["MOSFET", "Transistor controlado por voltaje, ideal para conmutar cargas grandes con poca pérdida."],
 ["Motor DC", "Motor de corriente continua: gira al aplicarle voltaje; invertir la polaridad invierte el giro."],
 ["Motor paso a paso", "Motor que gira en pasos fijos y precisos; ideal para posicionar."],
 ["Motorreductor", "Motor con engranajes que reducen la velocidad y aumentan la fuerza (par)."],
 ["MQTT", "Protocolo ligero de mensajes para el Internet de las cosas, basado en publicar y suscribirse a temas."],
 ["Multímetro", "Instrumento que mide voltaje, corriente, resistencia y continuidad."],
 ["Nodo", "Punto de un circuito donde se unen dos o más componentes."],
 ["Odometría", "Estimar la posición de un robot a partir de cuánto han girado sus ruedas."],
 ["Ohmio (Ω)", "Unidad de resistencia eléctrica. 1 kΩ = 1000 Ω."],
 ["OpenCV", "Biblioteca libre de visión por computadora."],
 ["Optoacoplador", "Componente que transmite una señal mediante luz, aislando eléctricamente dos circuitos."],
 ["Par", "Fuerza de giro de un motor. También se llama torque."],
 ["Paralelo", "Conexión en la que los componentes comparten los mismos dos nodos y tienen el mismo voltaje."],
 ["PCB", "Placa de circuito impreso: soporte con pistas de cobre que conectan los componentes."],
 ["PIR", "Sensor infrarrojo pasivo que detecta movimiento de personas o animales por su calor."],
 ["Polaridad", "Indica cuál terminal es positivo y cuál negativo. Importa en LED, diodos, electrolíticos y baterías."],
 ["Potencia", "Energía por unidad de tiempo. P = V · I, en vatios."],
 ["Potenciómetro", "Resistencia variable con una perilla; funciona como divisor de voltaje ajustable."],
 ["Protoboard", "Placa con orificios conectados internamente para montar circuitos sin soldar."],
 ["Pseudocódigo", "Descripción de un algoritmo en lenguaje casi natural, antes de programarlo."],
 ["Puente H", "Circuito de cuatro interruptores que permite cambiar el sentido de giro de un motor DC."],
 ["Pull-up", "Resistencia que mantiene un pin en nivel alto cuando no hay nada conectado, para evitar lecturas al azar."],
 ["PWM", "Modulación por ancho de pulso: encender y apagar muy rápido para controlar brillo o velocidad."],
 ["Python", "Lenguaje de programación sencillo de leer, muy usado en Raspberry Pi e inteligencia artificial."],
 ["Raspberry Pi", "Computadora de placa única con Linux, pines GPIO y potencia para visión artificial."],
 ["Realimentación", "Usar la medida de la salida para corregir la acción de un sistema."],
 ["Rebote", "Señales falsas que produce un pulsador al cambiar de estado, por las vibraciones del contacto."],
 ["Red neuronal", "Modelo de aprendizaje automático formado por capas de «neuronas» con pesos que se ajustan con datos."],
 ["Regulador", "Circuito que mantiene un voltaje de salida fijo, como el 7805 (5 V)."],
 ["Relé", "Interruptor accionado por un electroimán; permite que un circuito pequeño controle otro separado."],
 ["Resistencia", "Componente que se opone al paso de la corriente. También, la magnitud medida en ohmios."],
 ["RGB", "Modelo de color que mezcla rojo, verde y azul."],
 ["Robot", "Máquina programable que percibe su entorno con sensores, decide y actúa físicamente con cierta autonomía."],
 ["ROS", "Sistema operativo robótico: conjunto de herramientas y bibliotecas para programar robots complejos."],
 ["Sensor", "Componente que convierte una magnitud física (luz, distancia, temperatura) en una señal eléctrica."],
 ["Serie", "Conexión en la que los componentes van uno tras otro y los recorre la misma corriente."],
 ["Servomotor", "Motor con control de posición: se le indica un ángulo y lo mantiene."],
 ["Shield", "Placa que se enchufa encima del Arduino para añadir funciones."],
 ["Sketch", "Nombre de un programa de Arduino."],
 ["SLAM", "Localización y mapeo simultáneos: el robot construye un mapa mientras calcula dónde está en él."],
 ["Sobreajuste", "Cuando un modelo aprende de memoria los datos de entrenamiento y falla con datos nuevos."],
 ["Soldadura", "Unión de componentes y cables con estaño fundido."],
 ["SPI", "Bus de comunicación rápido con líneas MOSI, MISO, SCK y CS."],
 ["Tasa C", "Corriente de carga o descarga de una batería en relación con su capacidad: 1C en una de 2000 mAh son 2 A."],
 ["Telemetría", "Datos que un robot envía a distancia sobre su estado: batería, sensores, posición."],
 ["Tierra común", "Unir los GND de todas las fuentes y placas para que compartan la misma referencia de 0 V."],
 ["TinyML", "Aprendizaje automático en microcontroladores con muy poca memoria y energía."],
 ["Tolerancia", "Margen de error del valor de un componente, por ejemplo ±5 %."],
 ["Tracción diferencial", "Dos ruedas motrices independientes: el robot gira variando la velocidad de cada una."],
 ["Transistor", "Componente semiconductor que funciona como interruptor o amplificador controlado electrónicamente."],
 ["UART", "Comunicación serial asíncrona con dos líneas: TX (transmitir) y RX (recibir)."],
 ["Variable", "Espacio con nombre en la memoria que guarda un dato que puede cambiar."],
 ["Vatio (W)", "Unidad de potencia."],
 ["Visión por computadora", "Técnicas para que una máquina extraiga información de imágenes o video."],
 ["Voltaje", "Diferencia de potencial eléctrico entre dos puntos: lo que «empuja» la corriente. Se mide en voltios."],
 ["Voltio (V)", "Unidad de voltaje."],
 ["WiFi", "Red inalámbrica local que permite conectar dispositivos a internet o entre sí."],
 ["Zener", "Diodo diseñado para conducir en inversa a un voltaje fijo; se usa como referencia de voltaje."],
 ["Zumbador", "Componente que produce un sonido; activo (suena solo con voltaje) o pasivo (necesita una señal)."]
];

EXTRA.COMPONENTES = [
 {id: "resistencia", t: "Resistencia", cat: "Pasivos", g: "led", d: "Limita la corriente y reparte voltajes. Su valor se lee con el código de colores.", uso: "Proteger LED, crear divisores de voltaje, resistencias pull-up y de base de transistores.", pines: ["Dos terminales iguales, sin polaridad."], val: ["220 Ω y 330 Ω para LED a 5 V.", "10 kΩ para pull-up y divisores.", "1 kΩ para la base de un transistor.", "Potencia habitual: 1/4 W."], ojo: ["Si se calienta mucho, su potencia es insuficiente: P = I² · R."], lec: ["M04-1", "M03-3"]},
 {id: "potenciometro", t: "Potenciómetro", cat: "Pasivos", d: "Resistencia variable con perilla; da un voltaje ajustable entre 0 V y el de alimentación.", uso: "Controlar brillo, velocidad o posición; mandos de un brazo robótico.", pines: ["Extremos: 5 V y GND.", "Central (cursor): salida hacia una entrada analógica."], val: ["10 kΩ lineal (B10K) es el más usado."], lec: ["M04-2", "M08-7"]},
 {id: "ldr", t: "Fotorresistencia (LDR)", cat: "Sensores", d: "Resistencia que baja con la luz: de cientos de kΩ en oscuridad a pocos kΩ con luz.", uso: "Detectar día y noche, luces automáticas, seguidores de luz.", pines: ["Dos terminales sin polaridad; se usa en un divisor con una resistencia de 10 kΩ."], lec: ["M04-2", "M12-4"]},
 {id: "condensador", t: "Condensador", cat: "Pasivos", g: "rc", d: "Almacena carga. Los electrolíticos tienen polaridad; los cerámicos no.", uso: "Filtrar la alimentación, temporizar con una resistencia (RC), estabilizar motores.", pines: ["Electrolítico: pata larga positiva; franja con «−» negativa."], val: ["100 nF cerámico junto a cada chip.", "100–1000 µF electrolítico junto a motores y servos."], ojo: ["Un electrolítico al revés o con voltaje excesivo puede reventar. Respeta su voltaje máximo."], lec: ["M04-3", "M04-4"]},
 {id: "diodo", t: "Diodo rectificador (1N4007)", cat: "Semiconductores", d: "Deja pasar la corriente en un solo sentido, con una caída de unos 0,7 V.", uso: "Protección contra polaridad inversa y diodo flyback en motores y relés.", pines: ["Ánodo (+).", "Cátodo (−), marcado con una franja."], val: ["1N4007: 1 A, 1000 V.", "1N5819 (Schottky): caída de solo 0,3 V."], lec: ["M05-2"]},
 {id: "led", t: "LED", cat: "Semiconductores", g: "led", d: "Diodo que emite luz. Siempre con resistencia en serie.", uso: "Indicadores, iluminación, semáforos, tiras RGB.", pines: ["Ánodo: pata larga (+).", "Cátodo: pata corta, lado plano (−)."], val: ["Corriente: 10–20 mA.", "Caída: rojo ≈ 2 V; azul o blanco ≈ 3,1 V."], ojo: ["Sin resistencia se quema en segundos."], lec: ["M05-3"]},
 {id: "zener", t: "Diodo Zener", cat: "Semiconductores", d: "Conduce en inversa a un voltaje fijo (por ejemplo, 5,1 V).", uso: "Referencias de voltaje y protección de entradas.", pines: ["Cátodo marcado con franja; se conecta en inversa."], lec: ["M05-4"]},
 {id: "transistor", t: "Transistor NPN (BC547, 2N2222)", cat: "Semiconductores", g: "transistor", d: "Interruptor electrónico: una corriente pequeña en la base enciende una corriente mayor entre colector y emisor.", uso: "Encender motores pequeños, relés o tiras de LED desde un pin del Arduino.", pines: ["C: colector (hacia la carga).", "B: base (con resistencia de 1 kΩ hacia el pin).", "E: emisor (a GND)."], val: ["BC547: hasta 100 mA.", "2N2222: hasta 600 mA."], ojo: ["El orden de patas cambia según el modelo: revisa la hoja de datos.", "Pon un diodo flyback si la carga es una bobina."], lec: ["M05-5"]},
 {id: "mosfet", t: "MOSFET de nivel lógico (IRLZ44N)", cat: "Semiconductores", d: "Transistor controlado por voltaje que conmuta corrientes de varios amperios con poco calor.", uso: "Motores de 12 V, tiras LED, bombas y solenoides.", pines: ["G: puerta (al pin, con 220 Ω y una de 10 kΩ a GND).", "D: drenador (a la carga).", "S: fuente (a GND)."], ojo: ["Usa modelos «de nivel lógico» (IRLZ44N, no IRFZ44N) para que funcionen con 5 V o 3,3 V."], lec: ["M05-6"]},
 {id: "555", t: "Temporizador 555", cat: "Circuitos integrados", d: "Chip clásico que genera pulsos e intermitencias sin programar.", uso: "Intermitentes, generadores de tono, retardos.", pines: ["1 GND, 2 disparo, 3 salida, 4 reinicio, 5 control, 6 umbral, 7 descarga, 8 VCC."], lec: ["M05-7"]},
 {id: "optoacoplador", t: "Optoacoplador (PC817)", cat: "Semiconductores", d: "Un LED y un fototransistor en el mismo chip: transmite la señal con luz y aísla dos circuitos.", uso: "Separar la parte de control de la de potencia; módulos de relé.", lec: ["M05-8"]},
 {id: "arduino-uno", t: "Arduino Uno", cat: "Placas", d: "Placa con el microcontrolador ATmega328P a 5 V y 16 MHz.", uso: "La placa de inicio del curso: entradas, salidas, PWM, sensores y motores.", pines: ["14 pines digitales (6 con PWM).", "6 entradas analógicas (A0–A5).", "5V, 3.3V, GND, VIN."], val: ["Memoria de programa: 32 KB.", "Corriente por pin: 20 mA recomendados."], ojo: ["No alimentes motores desde el pin 5V.", "No conectes más de 5 V a ningún pin."], lec: ["M08-2"]},
 {id: "arduino-nano", t: "Arduino Nano", cat: "Placas", d: "Igual que el Uno en tamaño pequeño, ideal para protoboard y robots.", uso: "Robots compactos.", ojo: ["Muchos clones usan el chip USB CH340 y necesitan su controlador."], lec: ["M08-2"]},
 {id: "esp32", t: "ESP32", cat: "Placas", d: "Microcontrolador de 3,3 V con WiFi y Bluetooth integrados, mucho más potente que el Uno.", uso: "Carros por WiFi, casa inteligente, servidores web, MQTT.", pines: ["Funciona a 3,3 V: no le pongas 5 V en los pines.", "ADC de 12 bits (0–4095)."], lec: ["M09-6"]},
 {id: "raspberry-pi", t: "Raspberry Pi", cat: "Placas", d: "Computadora completa con Linux en una placa, con pines GPIO de 3,3 V.", uso: "Visión por computadora, inteligencia artificial, ROS, servidores.", ojo: ["Los GPIO son de 3,3 V y no toleran 5 V.", "Usa una fuente de calidad (5 V, 3 A o más).", "Apágala con el sistema antes de desconectarla."], lec: ["M09-1", "M09-5"]},
 {id: "pico", t: "Raspberry Pi Pico", cat: "Placas", d: "Microcontrolador barato (RP2040) programable en MicroPython o C++.", uso: "Proyectos sencillos y económicos.", lec: ["M09-7"]},
 {id: "protoboard", t: "Protoboard", cat: "Herramientas", g: "protoboard", d: "Placa para montar circuitos sin soldar.", uso: "Prototipos rápidos.", pines: ["Filas de 5 orificios conectados.", "Rieles laterales de alimentación (+ y −) a lo largo."], ojo: ["Algunas tienen los rieles cortados a la mitad.", "No soporta corrientes grandes (más de 1 A)."], lec: ["M06-1"]},
 {id: "multimetro", t: "Multímetro", cat: "Herramientas", d: "Mide voltaje, corriente, resistencia y continuidad.", uso: "Diagnosticar cualquier circuito.", ojo: ["Para medir corriente se conecta en serie y en el borne de corriente; nunca así en paralelo con una fuente.", "Vuelve a poner las puntas en V/Ω al terminar."], lec: ["M03-8"]},
 {id: "regulador-7805", t: "Regulador 7805 y AMS1117", cat: "Energía", d: "Reguladores lineales: el 7805 da 5 V y el AMS1117, 3,3 V.", uso: "Obtener un voltaje fijo de una batería.", pines: ["7805: entrada, GND, salida (de izquierda a derecha visto de frente)."], ojo: ["Disipan (Vin − Vout) · I como calor."], lec: ["M10-3"]},
 {id: "buck", t: "Convertidor buck (LM2596) y boost (MT3608)", cat: "Energía", d: "Convertidores conmutados ajustables: bajan o suben el voltaje con eficiencia de 85–95 %.", uso: "Alimentar el robot desde baterías.", ojo: ["Ajusta el voltaje con el tornillo y mídelo ANTES de conectar la carga."], lec: ["M10-4"]},
 {id: "18650", t: "Celda Li-ion 18650", cat: "Energía", d: "Celda recargable de 3,7 V nominales (4,2 V cargada) y 2000–3500 mAh.", uso: "Robots móviles (2 en serie = 7,4 V).", ojo: ["Nunca la cortocircuites ni la perfores.", "Cárgala con un cargador de litio con protección.", "No la descargues por debajo de unos 3 V."], lec: ["M10-5", "M25-3"]},
 {id: "lipo", t: "Batería LiPo", cat: "Energía", d: "Batería de polímero de litio muy ligera y capaz de dar mucha corriente.", uso: "Drones y robots rápidos.", ojo: ["Carga solo con cargador balanceador y bajo supervisión.", "Si se hincha, deja de usarla y llévala a un punto de reciclaje.", "Guárdala en una bolsa ignífuga al 40–60 %."], lec: ["M10-5", "M25-3"]},
 {id: "tp4056", t: "Cargador TP4056", cat: "Energía", d: "Módulo que carga una celda de litio de una sola celda desde USB.", uso: "Proyectos con una 18650.", ojo: ["Usa la versión con protección (tiene un chip DW01 extra)."], lec: ["M10-6"]},
 {id: "hc-sr04", t: "Sensor ultrasónico HC-SR04", cat: "Sensores", g: "ultrasonico", d: "Mide distancia (2–400 cm) con ecos de sonido.", uso: "Evitar obstáculos, medir niveles.", pines: ["VCC (5 V), Trig (disparo), Echo (eco), GND."], ojo: ["El pin Echo da 5 V: con ESP32 o Raspberry Pi usa un divisor de voltaje."], lec: ["M12-2"]},
 {id: "vl53l0x", t: "Sensor de distancia láser VL53L0X", cat: "Sensores", d: "Mide distancia por tiempo de vuelo de luz infrarroja, hasta unos 2 m, por I2C.", uso: "Robots pequeños y precisos.", lec: ["M12-3"]},
 {id: "dht22", t: "Sensor DHT22 (y DHT11)", cat: "Sensores", d: "Mide temperatura y humedad relativa con un solo cable de datos.", uso: "Estaciones meteorológicas, casa inteligente.", pines: ["VCC, datos (con pull-up de 10 kΩ), GND."], val: ["DHT11: 0–50 °C, ±2 °C.", "DHT22: −40–80 °C, ±0,5 °C."], ojo: ["Solo se puede leer cada 2 segundos."], lec: ["M12-6"]},
 {id: "ds18b20", t: "Sensor de temperatura DS18B20", cat: "Sensores", d: "Termómetro digital por bus 1-Wire; existe en versión sumergible.", uso: "Medir temperatura de líquidos o en exteriores.", lec: ["M12-5"]},
 {id: "pir", t: "Sensor de movimiento PIR (HC-SR501)", cat: "Sensores", d: "Detecta el movimiento de cuerpos calientes.", uso: "Alarmas y luces automáticas.", pines: ["VCC (5 V), salida digital, GND.", "Dos potenciómetros: sensibilidad y tiempo."], ojo: ["Necesita unos 30–60 s para estabilizarse al encender."], lec: ["M13-1"]},
 {id: "mpu6050", t: "Acelerómetro y giroscopio MPU6050", cat: "Sensores", d: "IMU de 6 ejes por I2C.", uso: "Medir inclinación, detectar gestos, equilibrar robots.", pines: ["VCC, GND, SCL, SDA."], lec: ["M13-3"]},
 {id: "tcrt5000", t: "Sensor infrarrojo de línea (TCRT5000)", cat: "Sensores", d: "Emisor y receptor infrarrojo que distingue superficies claras (reflejan) y oscuras (absorben).", uso: "Seguidores de línea.", lec: ["M18-1"]},
 {id: "motor-dc", t: "Motorreductor DC (motor TT)", cat: "Actuadores", d: "Motor de 3–6 V con caja de engranajes, típico de los chasis 2WD.", uso: "Ruedas de robots móviles.", ojo: ["Nunca lo conectes directamente a un pin del Arduino: usa un driver."], lec: ["M14-1", "M14-6"]},
 {id: "l298n", t: "Driver L298N", cat: "Actuadores", g: "puenteh", d: "Doble puente H clásico para dos motores DC de hasta 2 A.", uso: "Robots móviles.", pines: ["IN1–IN4: dirección.", "ENA, ENB: velocidad (PWM).", "12V, GND, 5V."], ojo: ["Pierde unos 2 V: con 6 V de batería el motor recibe unos 4 V.", "Une GND con el del Arduino."], lec: ["M14-4"]},
 {id: "tb6612", t: "Driver TB6612FNG", cat: "Actuadores", d: "Doble puente H moderno, pequeño y eficiente (1,2 A por canal).", uso: "Robots pequeños con baterías.", pines: ["AIN1, AIN2, PWMA; BIN1, BIN2, PWMB; STBY (a 5 V para activar)."], lec: ["M14-4"]},
 {id: "servo", t: "Servomotor (SG90, MG996R)", cat: "Actuadores", g: "servo", d: "Motor que va a un ángulo de 0 a 180° según la señal.", uso: "Brazos, radares, pinzas, barreras.", pines: ["Marrón o negro: GND.", "Rojo: 5 V.", "Naranja o amarillo: señal."], ojo: ["Varios servos necesitan una fuente aparte de 5 V con GND común.", "No fuerces el eje con la mano."], lec: ["M15-1", "M15-2"]},
 {id: "pca9685", t: "Controlador de servos PCA9685", cat: "Actuadores", d: "Controla 16 servos por I2C con alimentación separada.", uso: "Brazos robóticos y robots con patas.", lec: ["M15-2"]},
 {id: "paso-a-paso", t: "Motor paso a paso (28BYJ-48, NEMA17)", cat: "Actuadores", d: "Gira en pasos precisos. El 28BYJ-48 es barato y lento; el NEMA17 es potente.", uso: "Relojes, impresoras 3D, plataformas giratorias.", ojo: ["Ajusta el límite de corriente del A4988 antes de usar un NEMA17."], lec: ["M15-4", "M15-5"]},
 {id: "rele", t: "Módulo de relé", cat: "Actuadores", d: "Interruptor mecánico accionado por el Arduino.", uso: "Encender bombas, ventiladores o lámparas de bajo voltaje.", pines: ["Control: VCC, GND, IN.", "Carga: COM, NA (normalmente abierto), NC (normalmente cerrado)."], ojo: ["En este curso solo se conmutan cargas de 12 V o menos. La red de 110/220 V puede matar."], lec: ["M15-6", "M15-8"]},
 {id: "hc05", t: "Módulo Bluetooth HC-05", cat: "Comunicación", d: "Bluetooth clásico que funciona como un puerto serial inalámbrico.", uso: "Controlar el robot desde el móvil.", pines: ["VCC (5 V), GND, TX, RX."], ojo: ["Su RX es de 3,3 V: usa un divisor desde el TX del Arduino."], lec: ["M11-6"]},
 {id: "nrf24", t: "Radio nRF24L01", cat: "Comunicación", d: "Radio de 2,4 GHz por SPI para comunicar dos placas a decenas de metros.", uso: "Mandos a distancia propios.", ojo: ["Se alimenta a 3,3 V y necesita un condensador de 10 µF entre VCC y GND."], lec: ["M11-9"]},
 {id: "oled", t: "Pantalla OLED SSD1306", cat: "Comunicación", d: "Pantalla pequeña de 128×64 píxeles por I2C.", uso: "Mostrar datos de sensores y menús.", lec: ["M11-3"]},
 {id: "zumbador", t: "Zumbador", cat: "Actuadores", d: "Activo: suena con voltaje. Pasivo: necesita una señal (tone()).", uso: "Alarmas, avisos, melodías.", lec: ["M08-5"]}
];

EXTRA.KITS = [
 {t: "Kit básico (unos 35–50 USD)", d: "Para los niveles 0 a 2. Si solo puedes comprar una cosa, compra esto.", items: [
  ["Arduino Uno o Nano compatible", "1", "8–15 USD", "El cerebro de casi todas las prácticas."], ["Cable USB", "1", "2 USD", "Programar y alimentar."], ["Protoboard de 830 puntos", "1", "3 USD", "Montar sin soldar."], ["Cables Dupont macho-macho y macho-hembra", "40 de cada", "3 USD", "Conexiones."],
  ["Surtido de resistencias", "1 caja", "3 USD", "220 Ω, 330 Ω, 1 kΩ, 10 kΩ…"], ["LED de colores y uno RGB", "30", "2 USD", "Salidas visibles."], ["Pulsadores", "10", "1 USD", "Entradas."], ["Potenciómetro de 10 kΩ", "3", "1 USD", "Entrada analógica."],
  ["LDR", "3", "1 USD", "Sensor de luz."], ["Zumbador activo y pasivo", "2", "1 USD", "Sonido."], ["Multímetro digital básico", "1", "8–12 USD", "Medir todo."], ["Porta-pilas 4×AA y broche de 9 V", "1 de cada", "2 USD", "Energía."]]},
 {t: "Kit intermedio (unos 60–90 USD más)", d: "Para los niveles 3 y 4: sensores, motores y el primer robot móvil.", items: [
  ["Chasis 2WD con 2 motorreductores y rueda loca", "1", "10–15 USD", "Robots M17–M19."], ["Driver TB6612FNG o L298N", "1", "3–5 USD", "Controlar los motores."], ["Sensor HC-SR04", "2", "3 USD", "Distancia."], ["Servos SG90", "4", "8 USD", "Radar y brazo."],
  ["Sensores TCRT5000 (o barra de 5)", "1 barra", "4 USD", "Seguidor de línea."], ["DHT22, PIR HC-SR501, MPU6050", "1 de cada", "10 USD", "Sensores ambientales y de movimiento."], ["Módulo de relé de 1 canal y minibomba de 5 V", "1 de cada", "4 USD", "Riego."],
  ["2 celdas 18650 con porta-baterías y cargador con protección", "1 juego", "12–18 USD", "Energía del robot."], ["Convertidor buck LM2596", "2", "3 USD", "Regular voltaje."], ["Cautín de 30–60 W con soporte, estaño, malla y flux", "1 juego", "12–20 USD", "Soldar."], ["Gafas de seguridad", "1", "3 USD", "Protección."]]},
 {t: "Kit avanzado (unos 100–180 USD más)", d: "Para los niveles 5 y 6: WiFi, visión e inteligencia artificial.", items: [
  ["ESP32 DevKit", "2", "10 USD", "WiFi y Bluetooth."], ["Raspberry Pi 4 (2 GB o más) o Pi 5 con fuente oficial y microSD de 32 GB", "1", "60–90 USD", "Visión e IA."], ["Cámara para Raspberry Pi o webcam USB", "1", "10–25 USD", "Visión."],
  ["Kit de brazo de 4 grados de libertad y PCA9685", "1", "20–30 USD", "Brazo robótico."], ["Encoders para las ruedas", "2", "4 USD", "Odometría y PID."], ["Módulos nRF24L01 y joystick", "2 + 1", "6 USD", "Mando propio."], ["Bolsa ignífuga para baterías", "1", "5–8 USD", "Seguridad."]]}
];

EXTRA.SEGURIDAD = [
 {t: "1. La red eléctrica no se toca", w: 1, p: ["El enchufe de casa (110/220 V de corriente alterna) puede matar. En este curso **nunca** se abre, se modifica ni se conecta nada a la red.", "Todas las prácticas usan pilas, baterías o USB: 12 V o menos en corriente continua.", "Si un proyecto necesita controlar algo de la red, se usa un enchufe inteligente comercial y certificado, sin abrirlo."]},
 {t: "2. Antes de encender", p: ["Revisa el circuito con el esquema delante, cable por cable.", "Comprueba la polaridad de baterías, LED, condensadores electrolíticos y diodos.", "Busca cortocircuitos: ningún cable debe unir directamente + y −.", "Conecta la alimentación al final y desconéctala antes de cambiar el circuito."]},
 {t: "3. Si algo huele, humea o quema", w: 1, p: ["Desconecta la alimentación de inmediato (quita la batería o el USB).", "No toques el componente: puede estar muy caliente. Espera a que se enfríe.", "Busca la causa (cortocircuito, polaridad, corriente excesiva) antes de volver a encender."]},
 {t: "4. Baterías de litio (Li-ion y LiPo)", w: 1, p: ["Cárgalas solo con un cargador adecuado y **bajo supervisión**, sobre una superficie que no arda.", "Nunca las cortocircuites, perfores, aplastes ni calientes.", "Si se hinchan, se calientan sin motivo o huelen raro: deja de usarlas, colócalas lejos de cosas inflamables y llévalas a un punto de reciclaje.", "Guárdalas a media carga (40–60 %), en una bolsa ignífuga, lejos del calor.", "En caso de fuego de batería, aléjate y llama a emergencias; no uses agua sobre un aparato conectado."]},
 {t: "5. Soldadura", p: ["La punta del cautín supera los 300 °C: déjalo siempre en su soporte.", "Usa gafas: el estaño puede salpicar.", "Trabaja con ventilación y no respires el humo del flux.", "Lávate las manos después, sobre todo si el estaño contiene plomo (mejor usar estaño sin plomo).", "Desenchufa el cautín al terminar."]},
 {t: "6. Herramientas y mecánica", p: ["Corta alejando la herramienta del cuerpo.", "Las patas de los componentes salen disparadas al cortarlas: usa gafas.", "Los robots en movimiento pueden pellizcar los dedos o caer de la mesa: prueba con las ruedas en el aire la primera vez.", "Añade un interruptor de apagado fácil de alcanzar en todo robot."]},
 {t: "7. Proteger tus placas", p: ["No conectes más de 5 V a los pines del Arduino ni más de 3,3 V a los de ESP32 y Raspberry Pi.", "No pidas más de 20 mA a un pin: usa transistores o drivers para motores, relés y tiras de LED.", "Une siempre las tierras (GND) de todas las fuentes.", "Toca algo metálico conectado a tierra antes de manipular chips sensibles (electricidad estática)."]},
 {t: "8. Menores de edad", p: ["Trabaja con un adulto, sobre todo al soldar, cortar y cargar baterías.", "Pregunta siempre antes de usar herramientas nuevas."]},
 {t: "9. Primeros auxilios básicos", w: 1, p: ["Quemadura pequeña: agua fría (no helada) del grifo durante 10–20 minutos; no pongas hielo, pasta ni aceite.", "Choque eléctrico: no toques a la persona si sigue en contacto; corta primero la corriente. Llama a emergencias.", "Ante cualquier duda, llama al número de emergencias de tu país (112 en Europa, 911 en gran parte de América)."]}
];

EXTRA.FALLAS = [
 {s: "El programa no se carga en el Arduino", cat: "Arduino", c: ["Puerto o placa equivocados en el IDE.", "Falta el controlador del chip USB (clones con CH340).", "Cable USB solo de carga, sin datos.", "Algo conectado a los pines 0 y 1 (RX/TX)."], r: ["Elige la placa y el puerto correctos en Herramientas.", "Instala el controlador CH340.", "Prueba otro cable USB.", "Desconecta lo que haya en D0 y D1 al cargar."]},
 {s: "El Arduino se reinicia cuando arrancan los motores", cat: "Energía", c: ["Los motores piden un pico de corriente y el voltaje cae.", "Motores alimentados desde el pin 5V del Arduino.", "Batería descargada o pilas débiles.", "Ruido eléctrico de las escobillas."], r: ["Alimenta los motores desde la batería a través del driver, no desde el Arduino.", "Añade un condensador de 470–1000 µF en la alimentación de los motores.", "Carga o cambia las baterías.", "Pon un condensador cerámico de 100 nF en los bornes de cada motor."]},
 {s: "El LED no enciende", cat: "Electrónica", c: ["LED al revés.", "Resistencia de valor demasiado alto o mal conectada.", "Pin equivocado en el código o falta pinMode(…, OUTPUT).", "LED quemado."], r: ["Gira el LED: la pata larga va hacia el positivo.", "Comprueba el código de colores (220–330 Ω a 5 V).", "Revisa el número de pin y pinMode.", "Prueba el LED con una pila y una resistencia."]},
 {s: "El LED se quemó al instante", cat: "Electrónica", c: ["Faltaba la resistencia en serie.", "Voltaje muy alto."], r: ["Calcula la resistencia con la herramienta «Resistencia para un LED» y ponla siempre."]},
 {s: "La lectura del pulsador cambia sola", cat: "Arduino", c: ["Entrada «flotante»: no hay resistencia pull-up ni pull-down.", "Rebote del pulsador."], r: ["Usa pinMode(pin, INPUT_PULLUP) y conecta el botón a GND.", "Añade un retardo de 20–50 ms o un antirrebote por software."]},
 {s: "El sensor ultrasónico siempre da 0 o un valor enorme", cat: "Sensores", c: ["Trig y Echo intercambiados.", "Falta alimentación de 5 V o GND.", "No hay eco: el objeto está muy lejos, muy cerca (menos de 2 cm) o es blando o inclinado.", "pulseIn sin tiempo límite."], r: ["Revisa los pines en el código.", "Mide 5 V en VCC con el multímetro.", "Prueba con una pared lisa a 30 cm.", "Usa pulseIn(echo, HIGH, 30000) y descarta los 0."]},
 {s: "Un dispositivo I2C no responde", cat: "Comunicación", c: ["SDA y SCL intercambiados.", "Dirección equivocada.", "Falta GND común o alimentación.", "Módulo de 3,3 V con señales de 5 V."], r: ["Usa un escáner I2C para ver las direcciones conectadas.", "En el Uno: SDA = A4, SCL = A5.", "Revisa alimentación y GND.", "Usa un conversor de nivel si hace falta."]},
 {s: "El monitor serie muestra símbolos raros", cat: "Comunicación", c: ["Velocidad del monitor distinta de la de Serial.begin()."], r: ["Pon la misma velocidad (por ejemplo, 9600 o 115200) en el código y en el monitor."]},
 {s: "El motor no gira pero se oye un zumbido", cat: "Motores", c: ["PWM demasiado bajo para vencer el arranque.", "Batería débil.", "Rueda bloqueada o engranajes atascados."], r: ["Empieza con un PWM de al menos 120–150 sobre 255.", "Carga la batería.", "Revisa la mecánica y libera el eje."]},
 {s: "Un motor gira al revés", cat: "Motores", c: ["Cables del motor invertidos."], r: ["Intercambia los dos cables de ese motor en el driver, o invierte la lógica en el código."]},
 {s: "El robot no va recto", cat: "Motores", c: ["Los motores baratos nunca son idénticos.", "Una rueda roza o está floja.", "Batería baja."], r: ["Ajusta en el código un PWM un poco distinto para cada motor.", "Usa encoders y control PID.", "Revisa ruedas y tornillos."]},
 {s: "El servo tiembla o se mueve solo", cat: "Motores", c: ["Alimentación insuficiente (varios servos desde el Arduino).", "Falta GND común.", "Señal con ruido o cables largos."], r: ["Usa una fuente de 5 V aparte, de 2 A o más, con GND común.", "Añade un condensador de 470 µF en la alimentación de los servos.", "Acorta los cables."]},
 {s: "El driver L298N se calienta mucho", cat: "Motores", c: ["Es normal que se caliente: pierde unos 2 V como calor.", "Motores que piden más de 2 A o están bloqueados."], r: ["Usa el disipador.", "Cambia a un driver moderno como el TB6612FNG.", "Revisa que las ruedas no estén frenadas."]},
 {s: "El regulador 7805 quema al tocarlo", cat: "Energía", c: ["Mucha diferencia entre entrada y salida con mucha corriente: P = (Vin − Vout) · I."], r: ["Usa un convertidor buck, añade un disipador o baja el voltaje de entrada."]},
 {s: "La batería dura muy poco", cat: "Energía", c: ["Consumo mayor de lo calculado (motores, servos, WiFi).", "Batería vieja o de baja calidad.", "Regulador lineal que desperdicia energía."], r: ["Mide la corriente real con el multímetro en serie.", "Recalcula la autonomía con la herramienta.", "Usa un convertidor buck en lugar de un regulador lineal."]},
 {s: "La batería LiPo o 18650 está hinchada o caliente", cat: "Energía", c: ["Sobrecarga, descarga excesiva, golpe o defecto."], r: ["**Deja de usarla de inmediato.** Desconéctala con cuidado y colócala sobre una superficie que no arda, lejos de objetos inflamables.", "No la cargues ni la perfores.", "Llévala a un punto de reciclaje de baterías."]},
 {s: "El ESP32 no se conecta al WiFi", cat: "Comunicación", c: ["Nombre o contraseña de la red mal escritos.", "Red de 5 GHz (el ESP32 solo usa 2,4 GHz).", "Alimentación débil: el WiFi pide picos de 300–500 mA."], r: ["Revisa SSID y contraseña (distinguen mayúsculas).", "Conéctate a una red de 2,4 GHz.", "Usa un buen cable USB o una fuente de 1 A."]},
 {s: "El ESP32 no se puede programar", cat: "Placas", c: ["La placa no entra en modo de carga.", "Cable o controlador USB."], r: ["Mantén pulsado el botón BOOT mientras empieza la carga.", "Instala el controlador CP210x o CH340 según la placa."]},
 {s: "La Raspberry Pi no arranca", cat: "Placas", c: ["Tarjeta microSD mal grabada o dañada.", "Fuente de poca corriente (aparece un rayo amarillo).", "Cable HDMI en el puerto equivocado (Pi 4 y 5 tienen dos)."], r: ["Vuelve a grabar la tarjeta con Raspberry Pi Imager.", "Usa la fuente oficial.", "Conecta el monitor al puerto HDMI 0."]},
 {s: "La lectura analógica salta mucho", cat: "Sensores", c: ["Ruido eléctrico.", "Cables largos.", "Entrada sin conectar."], r: ["Promedia varias lecturas (promedio móvil).", "Añade un condensador de 100 nF entre la entrada y GND.", "Comprueba las conexiones."]},
 {s: "El sensor DHT da «NaN» o error", cat: "Sensores", c: ["Lecturas demasiado seguidas (necesita 2 s).", "Falta la resistencia pull-up de 10 kΩ en datos.", "Tipo de sensor mal indicado en el código (DHT11 o DHT22)."], r: ["Espera al menos 2 s entre lecturas.", "Añade la pull-up o usa un módulo que la incluya.", "Corrige el tipo en el código."]},
 {s: "El seguidor de línea se sale en las curvas", cat: "Robots", c: ["Velocidad demasiado alta.", "Sensores sin calibrar o muy altos sobre el suelo.", "Constantes PID mal ajustadas."], r: ["Baja la velocidad base.", "Calibra con la línea y el fondo; sensores a 3–8 mm del suelo.", "Ajusta primero Kp, luego Kd y por último Ki."]},
 {s: "El robot evasor choca igualmente", cat: "Robots", c: ["Distancia de reacción demasiado corta para su velocidad.", "El sensor no ve objetos bajos o en ángulo.", "Uso de delay() que bloquea las lecturas."], r: ["Aumenta la distancia de frenado o baja la velocidad.", "Añade un servo de barrido o un segundo sensor.", "Reescribe el programa con millis()."]},
 {s: "El código no compila: «was not declared in this scope»", cat: "Programación", c: ["Variable o función escrita distinto (mayúsculas).", "Variable declarada dentro de otra función.", "Falta incluir la biblioteca."], r: ["Revisa la ortografía exacta.", "Declara la variable fuera de las funciones si la usas en varias.", "Añade #include y la biblioteca correspondiente."]},
 {s: "El código no compila: «expected ';'»", cat: "Programación", c: ["Falta un punto y coma al final de la línea anterior.", "Llave o paréntesis sin cerrar."], r: ["Mira la línea que marca el error y la anterior.", "Usa Herramientas → Autoformato para ver las llaves descolocadas."]},
 {s: "La soldadura queda opaca y como una bola", cat: "Soldadura", c: ["Soldadura fría: el metal no se calentó lo suficiente.", "Punta sucia."], r: ["Calienta pata y pad a la vez 2–3 s y luego aplica el estaño sobre ellos, no sobre la punta.", "Limpia la punta con la esponja o la lana de latón y estáñala."]},
 {s: "El multímetro marca 0 al medir corriente", cat: "Medición", c: ["Fusible del multímetro fundido.", "Puntas en el borne equivocado o el multímetro en paralelo."], r: ["Revisa el fusible interno.", "Para corriente, abre el circuito y pon el multímetro en serie, con la punta roja en el borne de mA."]},
 {s: "La cámara no se detecta en la Raspberry Pi", cat: "Visión", c: ["Cinta plana al revés o mal insertada.", "Cámara no activada o sistema antiguo."], r: ["Apaga, revisa la orientación de la cinta y vuelve a encender.", "Prueba con rpicam-hello; actualiza el sistema."]},
 {s: "El modelo de IA acierta en las pruebas pero falla en la realidad", cat: "IA", c: ["Pocos datos o poco variados (misma luz, mismo fondo).", "Sobreajuste."], r: ["Recoge ejemplos con distintas luces, fondos y ángulos.", "Separa datos de prueba que el modelo no haya visto.", "Prueba un modelo más sencillo."]},
 {s: "El relé hace clic pero la carga no enciende", cat: "Actuadores", c: ["Carga conectada a NC en lugar de NA.", "Falta alimentación del circuito de la carga.", "Contactos dañados."], r: ["Usa COM y NA para que encienda al activar.", "Comprueba con el multímetro la continuidad entre COM y NA al activar."]}
];

EXTRA.RUTAS = [
 {t: "Ruta completa", d: "El curso entero en orden, del Nivel 0 al Nivel 6. Recomendada si empiezas desde cero.", f: () => true},
 {t: "Ruta exprés", d: "Solo las lecciones esenciales (★): lo imprescindible para construir robots.", f: l => !!l.s},
 {t: "«Quiero mi primer robot ya»", d: "El camino más corto hasta tu robot que evita obstáculos.", ids: ["M01-1", "M01-2", "M01-3", "M02-1", "M02-4", "M03-1", "M03-3", "M05-3", "M06-1", "M06-3", "M07-1", "M07-3", "M07-5", "M07-6", "M08-3", "M08-5", "M08-8", "M10-5", "M12-2", "M14-1", "M14-3", "M14-4", "M14-7", "M17"]},
 {t: "Vengo del software", d: "Para quien ya programa: fundamentos de electrónica y directo al hardware.", ids: ["M01-2", "M03", "M05-3", "M05-5", "M05-6", "M06-1", "M06-2", "M08", "M10-3", "M10-5", "M10-8", "M11", "M12", "M14", "M15", "M16-5", "M17"]},
 {t: "Casa inteligente e Internet de las cosas", d: "Sensores, ESP32, WiFi y MQTT para automatizar una maqueta de casa.", ids: ["M03-3", "M05-3", "M08-5", "M08-7", "M09-6", "M11-3", "M11-7", "M11-8", "M12-4", "M12-6", "M13-1", "M15-6", "M15-8", "M21"]},
 {t: "Inteligencia artificial y visión", d: "Para llegar pronto a robots que ven y aprenden.", ids: ["M07", "M09-2", "M09-3", "M09-4", "M09-5", "M14-7", "M22", "M23", "M24"]}
];

EXTRA.PAGINAS = {
 acerca: ["Acerca de este curso", ["**Robótica, Electrónica, Hardware y Software** es un curso libre y gratuito en español para aprender a construir cosas con electricidad, electrónica y programación, desde cero.", "Está organizado en 7 niveles, 26 módulos y 192 lecciones con explicación, código comentado, prácticas paso a paso, avisos de seguridad y un mini-quiz por lección. Cada módulo cierra con un quiz y un proyecto.", "Las prácticas se pueden hacer con materiales baratos o, si aún no los tienes, en simuladores gratuitos como Tinkercad Circuits o Wokwi.", "Los valores de componentes, precios y versiones de programas son orientativos: consulta siempre la hoja de datos de tus componentes y la documentación oficial de cada herramienta.", "El contenido es educativo. Las prácticas están pensadas para voltajes bajos; no sustituyen la formación profesional para trabajar con instalaciones eléctricas."]],
 privacidad: ["Privacidad", ["Este sitio funciona sin servidor: **no recoge, envía ni vende datos**. No usa cookies de seguimiento ni analítica.", "Tu progreso (lecciones completadas, notas de quizzes, notas personales, proyectos, tema claro u oscuro y el nombre del certificado) se guarda solo en el almacenamiento local de tu navegador.", "Puedes descargar una copia, cargarla en otro equipo o borrarlo todo desde [Mi progreso](#/progreso).", "Los enlaces a sitios externos (simuladores, documentación) abren páginas de terceros con sus propias políticas."]]
};

// ---------- Diagramas SVG (usan currentColor para adaptarse al tema) ----------
const R_ZZ = (x, y) => `<path d="M${x} ${y}h10l5-10 10 20 10-20 10 20 10-20 5 10h10" fill="none" stroke="currentColor" stroke-width="2"/>`; // resistencia horizontal de 70 px
const R_V = (x, y) => `<path d="M${x} ${y}v10l-10 5 20 10-20 10 20 10-20 10 10 5v10" fill="none" stroke="currentColor" stroke-width="2"/>`; // resistencia vertical de 70 px
const BAT_V = (x, y, lbl) => `<g stroke="currentColor" stroke-width="2"><line x1="${x - 16}" y1="${y}" x2="${x + 16}" y2="${y}"/><line x1="${x - 9}" y1="${y + 8}" x2="${x + 9}" y2="${y + 8}" stroke-width="4"/></g><text x="${x + 22}" y="${y + 8}" fill="currentColor" font-size="13">${lbl}</text><text x="${x - 30}" y="${y - 2}" fill="currentColor" font-size="12">+</text>`;
const LED_V = (x, y) => `<g stroke="currentColor" stroke-width="2" fill="none"><path d="M${x - 12} ${y}h24l-12 18z"/><line x1="${x - 12}" y1="${y + 18}" x2="${x + 12}" y2="${y + 18}"/><path d="M${x + 16} ${y + 2}l10-8M${x + 20} ${y + 10}l10-8"/></g>`;
const T = (x, y, s, sz) => `<text x="${x}" y="${y}" fill="currentColor" font-size="${sz || 13}">${s}</text>`;
const W = d => `<path d="${d}" fill="none" stroke="currentColor" stroke-width="2"/>`;
let SVN = 0;
const SV = (w, h, title, body) => { const id = "svgt" + (++SVN); return `<svg viewBox="0 0 ${w} ${h}" width="${w}" role="img" aria-labelledby="${id}"><title id="${id}">${title}</title>${body}</svg>`; };

window.SVG = {
 ciclo: {t: "El ciclo sentir-pensar-actuar: los sensores informan al controlador, que decide y ordena a los actuadores; el entorno cambia y vuelve a medirse.", svg: SV(460, 170, "Ciclo sentir-pensar-actuar",
  `<g fill="none" stroke="currentColor" stroke-width="2"><rect x="10" y="50" width="120" height="60" rx="10"/><rect x="170" y="50" width="120" height="60" rx="10"/><rect x="330" y="50" width="120" height="60" rx="10"/>
  <path d="M130 80h36M290 80h36"/><path d="M160 74l8 6-8 6M320 74l8 6-8 6"/><path d="M390 110v35H70v-35"/><path d="M64 118l6-8 6 8"/></g>
  ${T(42, 78, "SENTIR")}${T(26, 96, "sensores", 12)}${T(198, 78, "PENSAR")}${T(186, 96, "controlador", 12)}${T(358, 78, "ACTUAR")}${T(350, 96, "actuadores", 12)}${T(170, 162, "el entorno cambia", 12)}`)},
 led: {t: "Circuito básico: batería, resistencia limitadora y LED en serie. La corriente sale del positivo, pasa por la resistencia y el LED, y vuelve al negativo.", svg: SV(340, 200, "Circuito de un LED con resistencia",
  `${BAT_V(50, 95, "9 V")}${W("M50 95V30h60M50 103v67h230V125M180 30h100v35")}${R_ZZ(110, 30)}${T(118, 18, "R = 330 Ω")}${LED_V(280, 65)}${W("M280 83v42")}${T(300, 80, "LED")}${T(150, 192, "corriente →", 12)}`)},
 serie: {t: "Resistencias en serie: una detrás de otra. La corriente es la misma en todas y los voltajes se suman.", svg: SV(380, 170, "Resistencias en serie",
  `${BAT_V(40, 85, "V")}${W("M40 85V30h40M150 30h40M260 30h80v110H40V93")}${R_ZZ(80, 30)}${R_ZZ(190, 30)}${T(100, 18, "R1")}${T(210, 18, "R2")}${T(110, 160, "R total = R1 + R2", 13)}`)},
 paralelo: {t: "Resistencias en paralelo: comparten los mismos dos nodos. El voltaje es igual en todas y las corrientes se suman.", svg: SV(340, 200, "Resistencias en paralelo",
  `${BAT_V(40, 95, "V")}${W("M40 95V20h260M40 103v77h260M160 20v40M160 130v50M280 20v40M280 130v50")}${R_V(160, 60)}${R_V(280, 60)}${T(176, 100, "R1")}${T(296, 100, "R2")}${T(60, 196, "1/R = 1/R1 + 1/R2", 13)}`)},
 divisor: {t: "Divisor de voltaje: la salida se toma entre las dos resistencias. Vout = Vin · R2 / (R1 + R2).", svg: SV(300, 230, "Divisor de voltaje",
  `${BAT_V(50, 110, "Vin")}${W("M50 110V20h110v20M50 118v92h110v-30M160 110v0M160 110h80")}${R_V(160, 40)}${R_V(160, 110)}${T(176, 80, "R1")}${T(176, 150, "R2")}<circle cx="240" cy="110" r="4" fill="currentColor"/>${T(248, 114, "Vout")}${T(150, 226, "GND", 12)}`)},
 transistor: {t: "Transistor NPN como interruptor: el pin del Arduino, a través de una resistencia de base, enciende la carga conectada entre +V y el colector.", svg: SV(360, 240, "Transistor NPN como interruptor",
  `${W("M240 20v30M240 120v100M70 85h30M170 85h40M210 60v50M210 75l30-25M210 95l30 25")}${W("M232 113l8 7-10 2")}<rect x="225" y="50" width="30" height="0"/>
  ${T(250, 18, "+V")}${T(260, 70, "C (colector)", 12)}${T(260, 120, "E (emisor)", 12)}${T(160, 72, "B", 12)}${R_ZZ(100, 85)}${T(110, 72, "1 kΩ")}${T(8, 90, "pin D9")}
  <rect x="222" y="22" width="36" height="22" fill="none" stroke="currentColor" stroke-width="2"/>${T(266, 38, "carga (motor, relé)", 12)}${W("M240 44v6")}${T(228, 236, "GND", 12)}`)},
 puenteh: {t: "Puente H: cuatro interruptores alrededor del motor. Cerrando S1 y S4 gira en un sentido; cerrando S2 y S3, en el contrario. Nunca S1 y S2 a la vez (cortocircuito).", svg: SV(360, 230, "Puente H",
  `${W("M60 20h240M60 210h240M60 20v40M60 100v30M60 170v40M300 20v40M300 100v30M300 170v40M60 115h90M210 115h90")}
  ${W("M60 60l20 40M300 60l-20 40M60 130l20 40M300 130l-20 40")}<circle cx="180" cy="115" r="28" fill="none" stroke="currentColor" stroke-width="2"/>${T(171, 120, "M", 16)}
  ${T(10, 84, "S1")}${T(320, 84, "S2")}${T(10, 154, "S3")}${T(320, 154, "S4")}${T(165, 14, "+V")}${T(160, 226, "GND", 12)}`)},
 protoboard: {t: "Protoboard: cada columna de 5 orificios (a–e y f–j) está conectada por dentro; los rieles laterales + y − recorren la placa a lo largo.", svg: SV(420, 200, "Protoboard por dentro",
  `<rect x="5" y="5" width="410" height="190" rx="8" fill="none" stroke="currentColor" stroke-width="2"/>
  ${[20, 34, 166, 180].map((y, k) => `<line x1="30" y1="${y}" x2="390" y2="${y}" stroke="${k % 2 ? "#2457c5" : "#d32020"}" stroke-width="3" opacity=".7"/>`).join("")}
  ${Array.from({length: 18}, (_, i) => `<line x1="${40 + i * 20}" y1="52" x2="${40 + i * 20}" y2="92" stroke="currentColor" stroke-width="3" opacity=".45"/><line x1="${40 + i * 20}" y1="108" x2="${40 + i * 20}" y2="148" stroke="currentColor" stroke-width="3" opacity=".45"/>`).join("")}
  <rect x="30" y="96" width="360" height="8" fill="currentColor" opacity=".15"/>${T(8, 24, "+", 12)}${T(8, 38, "−", 12)}${T(150, 103, "canal central", 11)}`)},
 ultrasonico: {t: "Sensor HC-SR04: Trig emite un pulso de ultrasonido; Echo permanece en alto mientras el sonido va y vuelve. Distancia = tiempo · 0,0343 / 2 (cm).", svg: SV(420, 160, "Funcionamiento del sensor ultrasónico",
  `<rect x="10" y="40" width="120" height="70" rx="6" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="42" cy="75" r="20" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="98" cy="75" r="20" fill="none" stroke="currentColor" stroke-width="2"/>
  ${W("M150 60q20 15 0 30M170 52q28 23 0 46M190 44q36 31 0 62")}<rect x="340" y="20" width="16" height="110" fill="currentColor" opacity=".5"/>${W("M330 75h-120")}${W("M218 69l-8 6 8 6")}
  ${T(30, 130, "VCC Trig Echo GND", 12)}${T(345, 150, "objeto", 12)}${T(220, 66, "eco", 12)}`)},
 servo: {t: "Señal de un servo: un pulso cada 20 ms (50 Hz). 1 ms ≈ 0°, 1,5 ms ≈ 90°, 2 ms ≈ 180°.", svg: SV(420, 160, "Señal PWM de un servomotor",
  `${W("M20 120h30v-70h20v70h150v-70h30v70h150")}${T(40, 40, "1 ms → 0°", 12)}${T(225, 40, "1,5 ms → 90°", 12)}${W("M50 140h220")}${T(120, 156, "20 ms", 12)}`)},
 i2c: {t: "Bus I2C: todos los dispositivos comparten SDA (datos) y SCL (reloj), con resistencias pull-up. Cada uno tiene su propia dirección.", svg: SV(440, 190, "Bus I2C",
  `<g fill="none" stroke="currentColor" stroke-width="2"><rect x="10" y="60" width="90" height="70" rx="6"/><rect x="170" y="120" width="100" height="55" rx="6"/><rect x="320" y="120" width="110" height="55" rx="6"/></g>
  ${W("M100 80h330M100 105h330M220 80v40M240 105v15M360 80v40M380 105v15M140 80V40M160 105V40M130 40h40")}${T(20, 100, "Arduino")}${T(400, 76, "SDA", 12)}${T(400, 101, "SCL", 12)}${T(180, 152, "OLED 0x3C", 12)}${T(328, 152, "MPU6050 0x68", 12)}${T(120, 32, "pull-up 4,7 kΩ a 5 V", 11)}`)},
 uart: {t: "Comunicación serial (UART): el TX de cada placa va al RX de la otra, y las tierras se unen.", svg: SV(400, 150, "Conexión serial entre dos placas",
  `<g fill="none" stroke="currentColor" stroke-width="2"><rect x="10" y="20" width="110" height="110" rx="6"/><rect x="280" y="20" width="110" height="110" rx="6"/></g>
  ${W("M120 50L280 80M120 80L280 50M120 110h160")}${T(30, 75, "Placa A")}${T(300, 75, "Placa B")}${T(124, 46, "TX", 12)}${T(124, 92, "RX", 12)}${T(250, 46, "TX", 12)}${T(250, 92, "RX", 12)}${T(185, 126, "GND", 12)}`)},
 robot2wd: {t: "Robot 2WD visto desde arriba: dos ruedas motrices con su driver, rueda loca, batería, Arduino y sensor al frente.", svg: SV(360, 260, "Robot de dos ruedas visto desde arriba",
  `<g fill="none" stroke="currentColor" stroke-width="2"><rect x="80" y="30" width="200" height="200" rx="20"/><rect x="40" y="140" width="34" height="70" rx="6"/><rect x="286" y="140" width="34" height="70" rx="6"/>
  <circle cx="180" cy="55" r="10"/><rect x="120" y="120" width="120" height="50" rx="4"/><rect x="120" y="180" width="120" height="36" rx="4"/><rect x="140" y="80" width="80" height="26" rx="4"/></g>
  ${T(148, 150, "Arduino")}${T(132, 203, "driver + batería", 12)}${T(150, 98, "HC-SR04", 12)}${T(150, 24, "frente", 12)}${T(10, 230, "motor I", 12)}${T(282, 230, "motor D", 12)}${T(195, 60, "rueda loca", 11)}`)},
 rc: {t: "Carga de un condensador a través de una resistencia: en 1 τ = R·C llega al 63 % y en 5 τ está casi cargado.", svg: SV(400, 200, "Curva de carga RC",
  `${W("M40 170h340M40 170V20")}<path d="M40 170 C 90 60, 160 35, 370 28" fill="none" stroke="currentColor" stroke-width="3"/>${W("M40 28h330")}
  <line x1="95" y1="170" x2="95" y2="78" stroke="currentColor" stroke-dasharray="4"/>${T(86, 188, "1τ", 12)}${T(345, 188, "5τ", 12)}${T(100, 76, "63 %", 12)}${T(300, 22, "100 %", 12)}${T(380, 186, "t", 12)}${T(10, 30, "V", 12)}`)},
 lazo: {t: "Control en lazo cerrado: el controlador compara la referencia con la medida del sensor y corrige la acción sobre el motor.", svg: SV(470, 160, "Lazo cerrado de control",
  `<g fill="none" stroke="currentColor" stroke-width="2"><circle cx="80" cy="60" r="14"/><rect x="130" y="35" width="110" height="50" rx="6"/><rect x="280" y="35" width="100" height="50" rx="6"/><rect x="280" y="110" width="100" height="40" rx="6"/></g>
  ${W("M10 60h56M94 60h36M240 60h40M380 60h70M420 60v70h-40M280 130H80v-56")}${T(4, 52, "objetivo", 12)}${T(140, 65, "controlador")}${T(298, 65, "motor")}${T(303, 135, "sensor", 12)}${T(400, 52, "salida", 12)}${T(66, 92, "−", 14)}${T(52, 54, "+", 14)}${T(100, 52, "error", 11)}`)},
 flujo: {t: "Diagrama de flujo: inicio, lectura de un sensor, decisión y acciones.", svg: SV(360, 300, "Diagrama de flujo",
  `<g fill="none" stroke="currentColor" stroke-width="2"><rect x="130" y="10" width="100" height="36" rx="18"/><rect x="110" y="70" width="140" height="40"/><path d="M180 135l70 35-70 35-70-35z"/><rect x="10" y="230" width="130" height="40"/><rect x="220" y="230" width="130" height="40"/></g>
  ${W("M180 46v24M180 110v25M110 170H75v60M250 170h35v60M75 270v20h-60V90h95M285 270v20h60V90h-95")}
  ${T(158, 33, "inicio")}${T(122, 95, "leer distancia")}${T(140, 175, "¿< 20 cm?", 12)}${T(80, 165, "sí", 12)}${T(262, 165, "no", 12)}${T(32, 255, "girar")}${T(240, 255, "avanzar")}`)},
 multimetro: {t: "Cómo medir: el voltaje se mide en paralelo con el componente; la corriente, abriendo el circuito y poniendo el multímetro en serie.", svg: SV(440, 190, "Medición de voltaje y corriente",
  `${BAT_V(40, 90, "")}${W("M40 90V30h120M40 98v62h120V30")}<circle cx="200" cy="95" r="24" fill="none" stroke="currentColor" stroke-width="2"/>${T(193, 100, "V")}${W("M160 60h16M160 130h16M176 60v18M176 130v-18")}${T(110, 184, "en paralelo", 12)}
  ${BAT_V(270, 90, "")}${W("M270 90V30h50M370 30h40v130H270v-62")}<circle cx="345" cy="30" r="22" fill="none" stroke="currentColor" stroke-width="2"/>${T(339, 35, "A")}${T(300, 184, "en serie", 12)}`)},
 pwm: {t: "PWM: la señal se enciende y apaga muy rápido. Cuanto mayor es el ciclo de trabajo (tiempo encendido), mayor es el brillo o la velocidad.", svg: SV(420, 200, "Señal PWM",
  `${W("M20 70h20v-40h20v40h60v-40h20v40h60v-40h20v40h60")}${T(300, 55, "25 %", 12)}${W("M20 170h20v-40h60v40h20v-40h60v40h20v-40h60v40h20")}${T(300, 155, "75 %", 12)}`)}
};
