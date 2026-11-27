// M11. Instalaciones eléctricas domésticas
registrarModulo({
  id: "m11", n: 11, nivel: 3, titulo: "Instalaciones eléctricas domésticas", quizMin: 30, quizN: 20, minEsperado: 360,
  aviso: "**Este módulo es para entender, no para manipular la instalación.** Cualquier trabajo en la red de tu casa (cambiar contactos, apagadores, cables o interruptores) debe hacerlo un electricista calificado.",
  objetivo: "Reconocer las partes de una instalación eléctrica doméstica y su función, y saber qué se puede revisar uno mismo y qué le corresponde a un electricista.",
  clave: "instalacion casa tablero centro de carga pastilla breaker termomagnetico diferencial contacto enchufe apagador cable calibre tierra",
  actividades: ["Dibujar el diagrama unifilar de tu casa a partir de lo que observas en el tablero (sin abrirlo).", "Completar la lista de revisión de seguridad del hogar de la lección 11.9.", "En la [simulación del tablero](#/simulacion/S14), provocar una sobrecarga en la cocina y una fuga en el baño."],
  ejemplos: ["Hervidor (1 500 W) + microondas (1 200 W) + tostador (900 W) a 127 V = 28 A: supera un termomagnético de 20 A. A 230 V serían 15,7 A.", "Un cable de 2,5 mm² (≈ 14 AWG) soporta unos 20 A en condiciones típicas."],
  sims: ["S14", "S21"], calcs: ["C11", "C2"], gen: ["potencia"],
  evaluacion: "Quiz de módulo de 20 preguntas (30 min), con una pregunta para identificar las partes del tablero en un diagrama. Se aprueba con el 70 %.",
  extra: [
    { t: "diag", p: "Toca el **interruptor diferencial** del tablero (el que tiene botón de prueba).", dia: "tablero", c: "diferencial", cTexto: "el interruptor con botón de prueba", e: "El diferencial tiene un botón de prueba (T) para comprobar su funcionamiento.", lec: "11-3" },
    { t: "diag", p: "Toca la **barra de tierra** del tablero.", dia: "tablero", c: "tierra", cTexto: "la barra de tierra", e: "A la barra de tierra llegan todos los conductores de protección (verde o verde-amarillo).", lec: "11-8" },
    { t: "num", p: "En un circuito de 127 V hay conectados 2 000 W. ¿Qué corriente circula?", r: 15.75, u: "A", e: "I = 2 000 / 127 ≈ 15,7 A.", lec: "11-4" }
  ],
  lecciones: [
    {
      id: "11-1", t: "Recorrido por la instalación de una casa", d: "Plano interactivo: acometida, medidor, tablero, circuitos, contactos y luminarias.", min: 30, e: true, sim: "S14",
      preg: "Desde que la electricidad entra por la acometida hasta que llega al contacto de tu cuarto, ¿por dónde pasa?",
      obj: ["Describir el recorrido de la electricidad dentro de una casa.", "Identificar los componentes principales de una instalación.", "Reconocer qué partes pueden inspeccionarse sin riesgo."],
      txt: `Una instalación eléctrica doméstica es un sistema ordenado que lleva la energía desde la acometida hasta cada punto de uso, con **protecciones** en el camino.

## El recorrido
1. **Acometida y medidor:** la energía llega de la red y pasa por el medidor (lección 10.6).
2. **Interruptor principal:** un interruptor general que corta toda la casa. Puede estar junto al medidor o en el tablero.
3. **[[tablero eléctrico|Tablero]] (centro de carga, cuadro eléctrico):** reparte la energía en varios **circuitos derivados**, cada uno con su **interruptor termomagnético** (pastilla) y, donde corresponde, un **interruptor diferencial**.
4. **Circuitos derivados:** cada uno alimenta un grupo de puntos: iluminación, contactos de una zona, cocina, baño, aire acondicionado…
5. **Canalizaciones:** los cables viajan dentro de **tubos** (conduit) por paredes, techos o pisos, hasta **cajas de registro** donde se hacen las conexiones.
6. **Puntos de uso:** **contactos** (enchufes), **apagadores** (interruptores) y **luminarias**.
7. **Puesta a tierra:** un conductor de protección acompaña a los circuitos y se conecta a un electrodo enterrado (lección 11.8).

## Los conductores
En un circuito monofásico típico hay tres conductores:
| Conductor | Función | Color habitual |
|---|---|---|
| **Fase** (línea, vivo) | Lleva el voltaje respecto de tierra | Negro, rojo o marrón (varía por país) |
| **Neutro** | Cierra el circuito de regreso | Blanco (América) o azul (Europa) |
| **Tierra** (protección) | Solo lleva corriente si hay una falla | Verde, verde-amarillo o desnudo |

?> Los colores dependen de la norma de cada país y de la antigüedad de la instalación. **Nunca** supongas qué cable es cuál solo por su color: un electricista lo comprueba con instrumentos.

## Un plano simplificado
- **Tablero** junto a la entrada.
- **Circuito 1 (15 A):** focos de toda la casa.
- **Circuito 2 (20 A):** contactos de sala y recámaras.
- **Circuito 3 (20 A):** contactos de la cocina.
- **Circuito 4 (20 A, con diferencial):** contactos del baño y exteriores.
- **Circuito 5 (30 A, 220 V o 230 V):** aire acondicionado o calentador.

En la simulación del tablero (S14) verás un tablero de este tipo: puedes conectar aparatos y ver qué pasa en cada circuito.

## Lo que sí puedes revisar
- Que el tablero esté **rotulado** (qué circuito es cada interruptor).
- Que los contactos y apagadores no estén **rotos, flojos, calientes ni ennegrecidos**.
- Que no haya **cables expuestos** ni extensiones permanentes.
- Que el **diferencial** funcione con su botón de prueba (lección 11.3).

Todo lo demás —abrir cajas, cambiar piezas, añadir circuitos— le corresponde a un electricista.`,
      vida: "Cuando un electricista llega a revisar tu casa, lo primero que mira es el tablero: cuántos circuitos hay, de cuántos amperios, si hay diferencial y si hay tierra.",
      err: ["Creer que toda la casa es un solo circuito.", "Identificar la fase o el neutro solo por el color del cable.", "Pensar que apagar un apagador deja sin voltaje toda la caja."],
      ejer: [["Ordena: contacto, medidor, tablero, acometida.", "Acometida → medidor → tablero → contacto."], ["¿Qué tres conductores suele tener un circuito monofásico?", "Fase, neutro y tierra."], ["Menciona dos cosas que puedes revisar sin abrir nada.", "Que el tablero esté rotulado y que los contactos no estén rotos, flojos ni calientes."]],
      quiz: [
        { t: "ord", p: "Ordena el recorrido de la electricidad dentro de la casa:", o: ["Acometida", "Medidor", "Tablero", "Circuito derivado", "Contacto"], e: "De la red al punto de uso." },
        { t: "om", p: "¿Qué conductor lleva el voltaje respecto de tierra?", o: ["El neutro", "La fase", "La tierra", "Ninguno"], c: 1, e: "La fase (línea o vivo)." },
        { t: "vf", p: "Se puede saber con seguridad qué cable es la fase solo mirando su color.", c: false, e: "Los colores varían y pueden estar mal instalados: se comprueba con instrumentos." , crit: true },
        { t: "om", p: "El conductor de tierra lleva corriente…", o: ["Siempre", "Solo cuando hay una falla", "Solo de noche", "Nunca puede llevarla"], c: 1, e: "Es un conductor de protección." },
        { t: "om", p: "¿Dónde se reparte la energía en varios circuitos?", o: ["En el medidor", "En el tablero", "En el contacto", "En el foco"], c: 1, e: "El tablero o centro de carga." }
      ],
      res: ["La energía pasa por la acometida, el medidor, el tablero y los circuitos derivados.", "El tablero reparte la energía y protege cada circuito.", "Fase, neutro y tierra cumplen funciones distintas.", "Los colores de los cables no garantizan su función.", "Puedes inspeccionar a la vista; los trabajos los hace un electricista."]
    },
    {
      id: "11-2", t: "El tablero o centro de carga", d: "Interruptor principal, termomagnéticos, cómo se rotulan y qué significa que «se bote» la pastilla.", min: 40, e: true, sim: "S14",
      preg: "¿Qué pasa exactamente cuando «se bota la pastilla» y por qué no conviene subirla una y otra vez?",
      obj: ["Describir las partes de un tablero eléctrico.", "Explicar cómo funciona un interruptor termomagnético.", "Saber qué hacer cuando un interruptor se dispara."],
      txt: `El tablero (también llamado **centro de carga**, **cuadro eléctrico** o **caja de breakers**) es el corazón de la instalación: reparte la energía y **protege** cada circuito.

## Partes del tablero
- **Interruptor principal:** corta toda la instalación.
- **Interruptores termomagnéticos** (pastillas, breakers, automáticos): uno por circuito, con su corriente nominal grabada (10, 15, 16, 20, 25, 30, 32 A…).
- **Interruptores diferenciales:** protegen a las personas contra fugas (lección 11.3).
- **Barras:** de fase (donde se conectan los interruptores), de **neutro** y de **tierra**.
- **Tapa** con un directorio para rotular cada circuito.

## Cómo funciona el interruptor termomagnético
El [[interruptor termomagnético]] tiene dos mecanismos:
1. **Térmico (sobrecargas):** una lámina de dos metales (bimetálica) se calienta con la corriente y se curva. Si la corriente supera la nominal durante cierto tiempo, la curvatura dispara el interruptor. Cuanto mayor la sobrecarga, más rápido se dispara: con un 30 % de exceso puede tardar minutos; con el doble, segundos.
2. **Magnético (cortocircuitos):** una pequeña bobina crea un campo que, ante corrientes muy grandes (5 a 10 veces la nominal), atrae una pieza y dispara el interruptor en **milisegundos**.

Al dispararse, la palanca queda en una posición intermedia o en «apagado». Se **rearma** llevándola a apagado y luego a encendido.

## ¿Qué protege?
El termomagnético protege **los cables y la instalación** contra el calentamiento y el incendio. **No protege a las personas** contra un choque eléctrico: la corriente que mata (30–100 mA) es mucho menor que la que dispara un interruptor de 20 A. Para eso está el diferencial.

## «Se botó la pastilla»: qué hacer
1. **Desconecta** o apaga los aparatos de ese circuito.
2. **Rearma** el interruptor (abajo y luego arriba).
3. Vuelve a conectar los aparatos **uno por uno**.
- Si se dispara al conectar **muchos** aparatos: era una **sobrecarga**. Repártelos en otros circuitos.
- Si se dispara al conectar **uno concreto**: ese aparato puede tener un **cortocircuito**. No lo uses y llévalo a revisar.
- Si se dispara **sin nada conectado** o de inmediato: hay una falla en la instalación. **Llama a un electricista.**

!> Nunca mantengas apretada la palanca para que «no se bote», nunca la amarres con cinta ni la sustituyas por una de más amperios. El interruptor se elige según el **calibre del cable**: uno más grande dejaría que el cable se sobrecaliente sin cortar.

## La sobrecarga en números
Un circuito de cocina de 20 A a 127 V soporta unos 20 × 127 = 2 540 W. Si conectas un hervidor (1 500 W), un microondas (1 200 W) y un tostador (900 W) = 3 600 W → 3 600 / 127 ≈ **28 A**: el interruptor se dispara. A 230 V, los mismos aparatos piden 15,7 A y no lo disparan.

## Rotular el tablero
Un tablero bien rotulado te ahorra tiempo y riesgos: escribe junto a cada interruptor qué alimenta («focos planta alta», «contactos cocina»). Para averiguarlo, apaga uno a uno y mira qué se apaga (con ayuda de un adulto).`,
      form: [["P máx ≈ V × I nominal", "Potencia máxima de un circuito."], ["I = Σ P / V", "Corriente total de los aparatos conectados al circuito."]],
      ej: { enun: "En un circuito de contactos de 15 A a 127 V se conectan un calefactor de 1 500 W y una aspiradora de 1 000 W. ¿Se disparará el interruptor?", pasos: ["Potencia total: 1 500 + 1 000 = 2 500 W.", "Corriente: 2 500 / 127 ≈ 19,7 A.", "19,7 A > 15 A: sobrecarga del 31 %; el mecanismo térmico lo disparará en segundos o minutos."], res: "Sí: 19,7 A superan los 15 A del interruptor." },
      vida: "En los tableros modernos, el interruptor disparado se nota porque su palanca queda a medio camino. En algunos tableros viejos con fusibles de tapón, el fusible fundido se ve ennegrecido por la mirilla.",
      err: ["Cambiar un interruptor por otro de más amperios porque «se bota mucho».", "Creer que el termomagnético protege a las personas de una descarga.", "Rearmar una y otra vez sin buscar la causa."],
      ejer: [["¿Cuánta potencia admite aproximadamente un circuito de 20 A a 230 V?", "4 600 W."], ["¿Qué mecanismo dispara el interruptor ante un cortocircuito?", "El magnético, en milisegundos."], ["El interruptor se dispara siempre al conectar la plancha, aunque no haya nada más. ¿Qué haces?", "No usar la plancha y llevarla a revisar: probablemente tiene un cortocircuito."]],
      quiz: [
        { t: "om", p: "El interruptor termomagnético protege principalmente…", o: ["A las personas contra choques", "A los cables contra sobrecargas y cortocircuitos", "Al medidor", "A los focos"], c: 1, e: "Para las personas está el diferencial." },
        { t: "om", p: "El mecanismo térmico del interruptor actúa ante…", o: ["Cortocircuitos instantáneos", "Sobrecargas sostenidas", "Fugas a tierra", "Rayos"], c: 1, e: "La lámina bimetálica se calienta con la sobrecarga." },
        { t: "num", p: "En un circuito de 127 V se conectan 3 600 W. ¿Qué corriente circula? (A)", r: 28.35, u: "A", e: "3 600 / 127 ≈ 28,3 A." },
        { t: "vf", p: "Si una pastilla se bota mucho, la solución es cambiarla por una de más amperios.", c: false, e: "El interruptor protege el cable: uno mayor dejaría que el cable se sobrecaliente.", crit: true },
        { t: "diag", p: "Toca el **interruptor principal** del tablero.", dia: "tablero", c: "principal", cTexto: "el interruptor marcado «Principal»", e: "El interruptor principal corta toda la instalación." }
      ],
      res: ["El tablero reparte la energía en circuitos con su propio interruptor.", "El termomagnético tiene un mecanismo térmico (sobrecargas) y otro magnético (cortocircuitos).", "Protege los cables, no a las personas.", "Si se dispara: desconectar, rearmar y reconectar uno por uno para hallar la causa.", "Nunca se puentea ni se sustituye por uno de más amperios."]
    },
    {
      id: "11-3", t: "El interruptor diferencial", d: "ID, RCD o GFCI: detecta fugas de unos 30 mA y protege a las personas; botón de prueba.", min: 35, e: true, sim: "S14", exp: "e-boton-prueba",
      preg: "¿Cómo puede un aparato saber que una corriente diminuta está pasando por una persona?",
      obj: ["Explicar el principio de funcionamiento del interruptor diferencial.", "Distinguir su función de la del termomagnético.", "Saber probarlo y dónde es obligatorio."],
      txt: `El [[interruptor diferencial]] (ID, disyuntor diferencial, RCD, o GFCI en los contactos de tipo estadounidense) es probablemente el dispositivo que **más vidas salva** en una casa.

## El principio: lo que va debe volver
En un circuito sano, **toda la corriente que sale por la fase regresa por el neutro**. Si en algún punto una parte de la corriente se escapa por otro camino —por ejemplo, a través de una **persona** hasta el suelo, o por un aislamiento dañado hasta tierra—, la corriente de ida y la de vuelta **ya no son iguales**.

El diferencial compara ambas corrientes:
1. La fase y el neutro atraviesan juntos un pequeño **núcleo toroidal** (un anillo de hierro).
2. Si las corrientes son iguales, sus campos magnéticos se **cancelan**.
3. Si hay una diferencia (una fuga), aparece un campo neto que **induce** una corriente en una bobina de detección.
4. Esa señal dispara el interruptor y corta el circuito en **menos de 30 a 40 milisegundos**.

Es una aplicación directa de la ley de corrientes de Kirchhoff (lección 3.6) y de la inducción (lección 7.6).

## Sensibilidad
- **30 mA** (o 10 mA en algunos usos): protección de **personas**. Es el valor obligatorio en baños, cocinas, exteriores y, en muchos países, en todos los circuitos de contactos.
- **300 mA:** protección contra **incendios** por fugas.
- Los GFCI de tipo estadounidense actúan con unos **5 mA**.

## Diferencial frente a termomagnético
| | Termomagnético | Diferencial |
|---|---|---|
| Detecta | Exceso de corriente | Diferencia entre ida y vuelta (fuga) |
| Protege | Cables e instalación | Personas (y contra incendios por fuga) |
| Actúa con | 15–30 A o más | 30 mA (personas) |
| ¿Detecta un choque fase-neutro a través de una persona? | No | No (la corriente va y vuelve igual) |
| ¿Detecta un choque fase-tierra a través de una persona? | No | **Sí** |

?> El diferencial **no** protege si una persona toca a la vez la fase y el neutro estando aislada del suelo: la corriente entra y vuelve por el circuito. Por eso no sustituye a las demás precauciones.

Existen interruptores que combinan ambas funciones (**magnetotérmicos diferenciales**).

## El botón de prueba
Todo diferencial tiene un botón marcado **«T»** o **«Prueba» / «Test»**. Al pulsarlo, crea internamente una pequeña fuga simulada: el diferencial **debe dispararse**. Se recomienda probarlo **una vez al mes** o cada pocos meses. Si no se dispara, está dañado y hay que cambiarlo (lo hace un electricista).

## Por qué se dispara un diferencial
- Una **persona** recibiendo una descarga (¡está haciendo su trabajo!).
- Un **aparato con fuga** (calentador de agua, lavadora, refrigerador con aislamiento dañado).
- **Humedad** en contactos exteriores o cajas.
- Muchos aparatos con pequeñas fugas en el mismo diferencial.

Si se dispara repetidamente, hay que buscar la causa desconectando aparatos y, si sigue, llamar a un electricista. **Nunca** se anula ni se puentea un diferencial.

Prueba en la simulación S14 qué pasa al simular una fuga en el baño con diferencial y sin él.`,
      form: [["I(fase) − I(neutro) = I(fuga)", "El diferencial mide esta diferencia."], ["Dispara si I(fuga) ≥ 30 mA (en < 40 ms)", "Sensibilidad típica para proteger personas."]],
      ej: { enun: "Por la fase de un circuito salen 8,000 A y por el neutro vuelven 7,962 A. ¿Hay fuga? ¿Se disparará un diferencial de 30 mA?", pasos: ["Fuga = 8,000 − 7,962 = 0,038 A = 38 mA.", "38 mA ≥ 30 mA → el diferencial se dispara.", "Esos 38 mA están yendo a tierra por otro camino, quizá una persona."], res: "Sí: hay una fuga de 38 mA y el diferencial de 30 mA corta el circuito." },
      vida: "En muchos baños y cocinas de América hay contactos con dos botones («TEST» y «RESET»): son contactos GFCI, un diferencial integrado en el propio contacto.",
      err: ["Pensar que el termomagnético protege igual que el diferencial.", "No probar nunca el botón del diferencial.", "Anular el diferencial porque «se bota mucho»."],
      ejer: [["¿Qué compara un interruptor diferencial?", "La corriente que sale por la fase con la que vuelve por el neutro."], ["¿Cada cuánto se recomienda pulsar el botón de prueba?", "Una vez al mes o cada pocos meses."], ["¿Protege el diferencial a una persona que toca fase y neutro a la vez estando aislada del suelo?", "No: la corriente va y vuelve por el circuito, sin diferencia."]],
      quiz: [
        { t: "om", p: "El interruptor diferencial detecta…", o: ["Sobrecargas", "Diferencias entre la corriente de ida y la de vuelta (fugas)", "Bajos voltajes", "Rayos"], c: 1, e: "Compara fase y neutro." },
        { t: "om", p: "¿Qué sensibilidad tiene un diferencial para proteger personas?", o: ["30 A", "30 mA", "300 A", "3 A"], c: 1, e: "30 mA (o menos)." },
        { t: "vf", p: "El botón de prueba del diferencial debe dispararlo; si no lo hace, está dañado.", c: true, e: "Hay que cambiarlo." },
        { t: "num", p: "Salen 5,000 A por la fase y vuelven 4,965 A por el neutro. ¿Cuántos mA de fuga hay?", r: 35, u: "", e: "5,000 − 4,965 = 0,035 A = 35 mA." },
        { t: "om", p: "Si el diferencial se dispara repetidamente, lo correcto es…", o: ["Puentearlo", "Buscar el aparato con fuga y, si sigue, llamar a un electricista", "Ponerle cinta", "Quitarlo"], c: 1, e: "Nunca se anula un diferencial.", crit: true }
      ],
      res: ["El diferencial compara la corriente de ida (fase) con la de vuelta (neutro).", "Una diferencia indica una fuga, quizá a través de una persona.", "Con 30 mA corta en menos de 40 ms: protege vidas.", "El termomagnético protege cables; el diferencial, personas.", "Se prueba con su botón «T» periódicamente y nunca se anula."]
    },
    {
      id: "11-4", t: "Circuitos derivados", d: "Iluminación, contactos, cocina, baño y aire acondicionado: por qué se separan.", min: 35, calc: "C2",
      preg: "¿Por qué la cocina tiene sus propios contactos en un circuito aparte?",
      obj: ["Explicar por qué una instalación se divide en varios circuitos.", "Calcular la carga de un circuito.", "Reconocer los circuitos especiales."],
      txt: `Una casa no tiene un solo circuito: tiene varios **[[circuito derivado|circuitos derivados]]**, cada uno con su propio interruptor en el tablero. Dividir la instalación tiene muchas ventajas.

## ¿Por qué separar?
1. **Capacidad:** cada circuito tiene un cable y un interruptor de cierta capacidad (por ejemplo, 15 o 20 A). Repartir la carga evita sobrecargas.
2. **Seguridad y continuidad:** si falla un circuito, el resto de la casa sigue funcionando. Que la falla de la cocina no deje a oscuras toda la casa.
3. **Protección adecuada:** cada zona recibe la protección que necesita (diferencial en baños y cocinas).
4. **Mantenimiento:** se puede cortar solo el circuito donde se trabaja.

## Circuitos típicos
| Circuito | Uso | Interruptor típico (127 V / 230 V) |
|---|---|---|
| Iluminación | Focos y luminarias | 15 A / 10 A |
| Contactos generales | Sala, recámaras | 20 A / 16 A |
| Cocina | Contactos de la encimera (microondas, hervidor…) | 20 A / 20–25 A |
| Lavadora y lavavajillas | Aparatos con motor y resistencia | 20 A / 16–20 A |
| Baño | Contactos (secadora de cabello) | 20 A con diferencial |
| Exteriores y cochera | Contactos y luces exteriores | 20 A con diferencial |
| Especiales | Aire acondicionado, horno, estufa, calentador de agua, cargador de auto | Según su potencia, a menudo a 220/230 V o con dos fases |

## Calcular la carga de un circuito
Suma las potencias de lo que puede funcionar **a la vez** y divide entre el voltaje:

= I = Σ P / V

Un buen diseño mantiene la carga continua por debajo del **80 %** de la capacidad del interruptor. Un circuito de 20 A a 127 V conviene cargarlo con no más de unos 2 000 W de uso continuo.

## La cocina, un caso especial
La cocina concentra aparatos de **alta potencia y uso simultáneo** (hervidor, microondas, tostador, cafetera, licuadora). Por eso las normas suelen exigir **al menos dos circuitos** de contactos para la encimera, además de circuitos separados para el refrigerador o la estufa eléctrica. Así se evita que se dispare el interruptor cada mañana al preparar el desayuno.

## Circuitos dedicados
Los aparatos de gran potencia o de uso continuo tienen su **propio circuito**, con cable e interruptor dimensionados para ellos: aire acondicionado, calentador eléctrico, horno, estufa de inducción y **cargador de auto eléctrico**. Muchos funcionan a **220/230 V** (entre dos fases en las redes de 127 V) para reducir la corriente.

!> Agregar un circuito nuevo o un aparato grande (por ejemplo, un aire acondicionado o un cargador de auto) requiere el cálculo de un electricista: hay que comprobar que la acometida, el medidor y el interruptor principal soporten la carga extra.`,
      form: [["I = Σ P / V", "Corriente total de un circuito."], ["Carga continua recomendada ≤ 80 % de la capacidad", "Margen de seguridad."]],
      ej: { enun: "Un circuito de cocina de 20 A a 127 V alimenta a la vez un microondas de 1 200 W y una cafetera de 800 W. ¿Qué corriente circula y qué porcentaje de la capacidad usa?", pasos: ["Potencia total: 1 200 + 800 = 2 000 W.", "I = 2 000 / 127 ≈ 15,7 A.", "Porcentaje: 15,7 / 20 × 100 ≈ 79 %.", "Está en el límite del 80 % recomendado: no conviene añadir el hervidor."], res: "Unos 15,7 A, el 79 % de la capacidad." },
      vida: "Si en tu casa la pastilla se bota siempre que usas el microondas y el hervidor a la vez, es probable que la cocina tenga un solo circuito: un electricista puede dividirlo.",
      err: ["Conectar varios aparatos de calor en el mismo contacto con una regleta.", "Pensar que basta cambiar el interruptor por uno mayor para tener más capacidad.", "Ignorar que los aparatos de motor piden más corriente al arrancar."],
      ejer: [["¿Cuánta potencia continua conviene en un circuito de 15 A a 127 V (80 %)?", "15 × 127 × 0,8 ≈ 1 524 W."], ["¿Por qué el aire acondicionado suele tener su propio circuito?", "Porque tiene mucha potencia y funciona durante horas."], ["Tres aparatos de 600 W en un circuito de 230 V: ¿corriente?", "1 800 / 230 ≈ 7,8 A."]],
      quiz: [
        { t: "om", p: "¿Por qué una casa tiene varios circuitos derivados?", o: ["Por estética", "Para repartir la carga, dar continuidad y proteger cada zona", "Para gastar más cable", "Porque el medidor lo exige"], c: 1, e: "Capacidad, continuidad, protección y mantenimiento." },
        { t: "num", p: "Un microondas de 1 200 W y una cafetera de 800 W a 127 V: ¿corriente total? (A)", r: 15.75, u: "A", e: "2 000 / 127 ≈ 15,7 A." },
        { t: "vf", p: "Se recomienda que la carga continua de un circuito no supere el 80 % de su capacidad.", c: true, e: "Deja margen y evita el calentamiento." },
        { t: "om", p: "¿Qué aparato suele necesitar un circuito dedicado?", o: ["Un cargador de celular", "Un aire acondicionado", "Un reloj de pared", "Una lámpara de escritorio"], c: 1, e: "Por su gran potencia y uso prolongado." },
        { t: "om", p: "¿Qué circuitos deben tener diferencial casi siempre?", o: ["Solo los de focos", "Baños, cocina y exteriores", "Ninguno", "Solo el del refrigerador"], c: 1, e: "Zonas húmedas y exteriores." }
      ],
      res: ["La instalación se divide en circuitos derivados con su propio interruptor.", "Separar reparte la carga, da continuidad y permite protecciones adecuadas.", "La corriente de un circuito es la suma de potencias entre el voltaje.", "Conviene no superar el 80 % de la capacidad de forma continua.", "Los aparatos grandes tienen circuitos dedicados, a menudo a 220/230 V."]
    },
    {
      id: "11-5", t: "Cables", d: "Calibre AWG y mm², colores de fase, neutro y tierra en América y Europa, capacidad de corriente y tabla orientativa.", min: 45, e: true, calc: "C11",
      preg: "¿Por qué el cable del aire acondicionado es más grueso que el de los focos?",
      obj: ["Interpretar el calibre de un cable en mm² y en AWG.", "Relacionar el calibre con la corriente y la caída de tensión.", "Reconocer los colores normalizados de los conductores."],
      txt: `Los cables de una instalación se eligen según **la corriente que van a llevar** y **la distancia**. Un cable demasiado delgado se calienta (efecto Joule) y puede provocar un incendio.

## El calibre
- En Europa y gran parte de Latinoamérica se indica la **sección en mm²**: 1,5; 2,5; 4; 6; 10 mm²…
- En Estados Unidos, México y otros países se usa el **[[AWG]]**: 14, 12, 10, 8, 6… **A menor número, más grueso**.

| Sección | AWG aproximado | Capacidad orientativa (cobre, en tubo) | Uso típico |
|---|---|---|---|
| 1,5 mm² | 16 (≈ 1,3 mm²) | 15 A | Iluminación (en países de mm²) |
| 2,5 mm² | 14 (≈ 2,1 mm²) | 20 A | Contactos |
| 4 mm² | 12 (≈ 3,3 mm²) | 25–27 A | Cocina, lavadora |
| 6 mm² | 10 (≈ 5,3 mm²) | 32–34 A | Aire acondicionado, horno |
| 10 mm² | 8 (≈ 8,4 mm²) | 45–50 A | Calentadores, acometidas pequeñas |

?> Las capacidades reales dependen de la norma de cada país, del tipo de aislamiento, de la temperatura ambiente, de cuántos cables van juntos en el mismo tubo y de cómo se instalan. Esta tabla es **solo orientativa** para aprender.

## Capacidad de corriente (ampacidad)
La capacidad de un cable es la corriente máxima que puede llevar **sin que su aislamiento se caliente por encima de su límite** (por ejemplo, 70–90 °C). La regla clave:

+> **El interruptor de un circuito debe ser igual o menor que la capacidad del cable.**

Si pones un interruptor de 30 A en un cable de 2,5 mm² (unos 20 A), el cable puede sobrecalentarse con 25 A sin que nada lo corte.

## Caída de tensión
Además del calentamiento, en tramos largos la resistencia del cable provoca una **caída de tensión**: el aparato recibe menos voltaje. Se recomienda que no supere el **3 %** en los circuitos derivados.

= ΔV = I × R(cable) = I × ρ × 2L / S

(El factor 2 es porque la corriente va y vuelve.) La calculadora C11 calcula la caída de tensión y sugiere la sección mínima para una corriente y una distancia.

Ejemplo: 15 A por 20 m de cable de cobre de 2,5 mm² → R = 0,0168 × 40 / 2,5 ≈ 0,27 Ω → ΔV ≈ 4 V: un **3,2 %** a 127 V (justo por encima del límite) o un **1,8 %** a 230 V.

## Colores de los conductores
| Conductor | América (habitual) | Europa (IEC) |
|---|---|---|
| Fase | Negro, rojo (u otros salvo blanco y verde) | Marrón, negro o gris |
| Neutro | Blanco o gris | Azul |
| Tierra | Verde o desnudo | Verde-amarillo |

!> En instalaciones viejas o mal hechas los colores pueden no respetarse. Un electricista **siempre** verifica con instrumentos antes de trabajar.

## Tipos de cable
- **Unipolar** (un conductor con aislamiento): se pasa por tubos.
- **Multiconductor** (varios conductores en una funda): extensiones, aparatos.
- **Rígido** (un solo alambre): instalaciones fijas.
- **Flexible** (muchos hilos finos): cables de aparatos y extensiones.

Busca cables con **certificación** y el calibre impreso en el aislamiento. Los cables muy baratos a veces tienen menos cobre del que dicen.`,
      form: [["ΔV = I × ρ × 2L / S", "Caída de tensión en un circuito de ida y vuelta (S en m²)."], ["ΔV (%) = ΔV / V × 100 (recomendado ≤ 3 %)", "Caída porcentual."], ["Interruptor ≤ capacidad del cable", "Regla de protección."]],
      ej: { enun: "Un aire acondicionado pide 12 A a 127 V y está a 25 m del tablero. ¿Qué caída de tensión hay con cable de 2,5 mm² y con 4 mm²?", pasos: ["2,5 mm²: R = 1,68 × 10⁻⁸ × 50 / 2,5 × 10⁻⁶ = 0,336 Ω; ΔV = 12 × 0,336 ≈ 4,0 V (3,2 %).", "4 mm²: R = 1,68 × 10⁻⁸ × 50 / 4 × 10⁻⁶ = 0,21 Ω; ΔV = 12 × 0,21 ≈ 2,5 V (2,0 %).", "Con 4 mm² se cumple el límite del 3 %."], res: "3,2 % con 2,5 mm² y 2,0 % con 4 mm²: conviene el de 4 mm²." },
      vida: "En las extensiones viene impreso el calibre (por ejemplo «3 × 1,5 mm²» o «16 AWG») y la corriente máxima. Si una extensión se calienta al usarla, es demasiado delgada para lo que conectaste.",
      err: ["Pensar que en AWG un número mayor es un cable más grueso.", "Poner un interruptor más grande que la capacidad del cable.", "Ignorar la caída de tensión en tramos largos."],
      ejer: [["¿Cuál es más grueso: 12 AWG o 14 AWG?", "12 AWG."], ["¿Qué color tiene el neutro en la norma europea?", "Azul."], ["Un cable de 2,5 mm² con interruptor de 32 A: ¿es correcto?", "No: el interruptor supera la capacidad del cable (unos 20 A)."]],
      quiz: [
        { t: "om", p: "En el sistema AWG…", o: ["A mayor número, más grueso", "A menor número, más grueso", "El número es la corriente", "El número es el voltaje"], c: 1, e: "14 AWG es más delgado que 10 AWG." },
        { t: "om", p: "La regla de protección dice que el interruptor debe ser…", o: ["Mayor que la capacidad del cable", "Igual o menor que la capacidad del cable", "Siempre de 50 A", "Del mismo color que el cable"], c: 1, e: "Para que corte antes de que el cable se sobrecaliente." },
        { t: "vf", p: "En la norma europea, el conductor de tierra es verde-amarillo.", c: true, e: "Y el neutro, azul." },
        { t: "om", p: "Se recomienda que la caída de tensión en un circuito derivado no supere…", o: ["El 3 %", "El 30 %", "El 50 %", "No importa"], c: 0, e: "Alrededor del 3 %." },
        { t: "om", p: "¿Qué cable conviene para un circuito de contactos de 20 A (orientativo)?", o: ["0,5 mm²", "1 mm²", "2,5 mm² (≈ 14 AWG)", "Cualquiera"], c: 2, e: "2,5 mm² soporta unos 20 A en condiciones típicas." }
      ],
      res: ["El calibre se indica en mm² o en AWG (menor número, más grueso).", "Cada cable tiene una capacidad máxima de corriente.", "El interruptor debe ser igual o menor que la capacidad del cable.", "En tramos largos hay que limitar la caída de tensión a un 3 %.", "Los colores varían por norma y no sustituyen la verificación con instrumentos."]
    },
    {
      id: "11-6", t: "Interruptores de luz", d: "Sencillo, de escalera (tres vías), atenuador y con sensor; esquemas.", min: 35, sim: "S21", exp: "e-escalera",
      preg: "¿Cómo puede una misma lámpara encenderse y apagarse desde arriba y desde abajo de una escalera?",
      obj: ["Explicar la conexión de un apagador sencillo.", "Entender el circuito de escalera con dos conmutadores.", "Conocer atenuadores y sensores."],
      txt: `Los **apagadores** (interruptores de pared) controlan las luminarias. Aunque parecen sencillos, hay varios tipos y una regla de seguridad importante.

## El apagador sencillo
Un apagador sencillo es un interruptor de dos posiciones conectado **en serie** con la lámpara, que abre o cierra el circuito.

!> El apagador debe interrumpir **la fase**, no el neutro. Así, con la luz apagada, el portalámparas queda **sin voltaje**. Si por error se interrumpe el neutro, el portalámparas sigue con voltaje aunque la luz esté apagada, y cambiar el foco puede dar una descarga. Por eso, antes de cambiar una luminaria, se corta la corriente desde el tablero.

## El interruptor de escalera (tres vías)
Para controlar una luz desde **dos lugares**, se usan dos **conmutadores** ([[interruptor de escalera|interruptores de escalera]]), cada uno con un borne común y dos salidas. Entre ellos van dos cables llamados **viajeros**:
1. La fase llega al común del primer conmutador.
2. Los dos viajeros unen las salidas de ambos conmutadores.
3. El común del segundo conmutador va a la lámpara.

La lámpara enciende cuando **los dos conmutadores eligen el mismo viajero**. Si cambias cualquiera de los dos, el camino se rompe (o se restablece). ¡Es una puerta lógica **XNOR**! (lección 14.9). Pruébalo en la simulación S21 y en la maqueta de pilas del experimento.

## Más de dos lugares
Para controlar una luz desde tres o más lugares, se intercalan entre los dos conmutadores uno o más **interruptores de cruce** (cuatro vías), que intercambian los viajeros.

## El atenuador (dímer)
Regula el brillo recortando una parte de cada semiciclo de la CA con un componente electrónico (triac). Ojo: los focos **LED** necesitan ser **regulables** y un atenuador compatible; si no, parpadean o se dañan.

## Sensores y temporizadores
- **Sensores de movimiento:** encienden la luz al detectar el calor de una persona (pasillos, exteriores).
- **Fotoceldas:** encienden al oscurecer (alumbrado público y exterior).
- **Temporizadores** y **apagadores inteligentes** controlados por el celular.

## Señales de problemas
- Apagador **caliente**, que **chispea** o hace ruido al accionarlo.
- Luz que **parpadea** sin motivo (puede ser una conexión floja).
- Placa **ennegrecida** u olor a quemado.

Ante cualquiera de ellas: deja de usarlo, corta el circuito en el tablero y llama a un electricista.`,
      vida: "En las escaleras, pasillos largos y recámaras con dos puertas es común tener interruptores de escalera. Si un día ves que «arriba» y «abajo» están invertidos, es justo como debe funcionar.",
      err: ["Creer que un apagador apagado deja todo sin voltaje: depende de si corta la fase.", "Usar un atenuador común con focos LED no regulables.", "Cambiar un foco o una lámpara sin cortar el circuito en el tablero."],
      ejer: [["¿Qué conductor debe interrumpir un apagador?", "La fase."], ["¿Cuántos conmutadores necesitas para controlar una luz desde dos lugares?", "Dos conmutadores de escalera (más los viajeros)."], ["¿Por qué parpadea un LED con un atenuador común?", "Porque no es regulable o el atenuador no es compatible con LED."]],
      quiz: [
        { t: "om", p: "Un apagador se conecta con la lámpara…", o: ["En paralelo", "En serie", "A tierra", "Sin conexión"], c: 1, e: "Para abrir o cerrar su circuito." },
        { t: "om", p: "El apagador debe interrumpir…", o: ["El neutro", "La fase", "La tierra", "Da igual"], c: 1, e: "Así el portalámparas queda sin voltaje al apagar." , crit: true },
        { t: "vf", p: "Con dos conmutadores de escalera, la luz enciende cuando ambos eligen el mismo viajero.", c: true, e: "Si cambias cualquiera, cambia el estado." },
        { t: "om", p: "¿Qué hace un atenuador?", o: ["Cambia la frecuencia", "Regula el brillo recortando parte de cada semiciclo", "Convierte CA en CD", "Mide la potencia"], c: 1, e: "Usa un triac." },
        { t: "om", p: "Un apagador caliente que chispea…", o: ["Es normal", "Indica un problema: hay que cortar el circuito y llamar a un electricista", "Ahorra energía", "Significa que el foco es LED"], c: 1, e: "Puede ser una conexión floja o un apagador dañado." }
      ],
      res: ["El apagador sencillo se conecta en serie e interrumpe la fase.", "Dos conmutadores de escalera con dos viajeros controlan una luz desde dos lugares.", "Para tres o más lugares se añaden interruptores de cruce.", "Los atenuadores necesitan focos LED regulables.", "Calor, chispas o parpadeos son señales de problemas."]
    },
    {
      id: "11-7", t: "Enchufes o contactos", d: "Tipos A, B, C, F, G e I; polarizados; con tierra; adaptadores de viaje.", min: 35,
      preg: "¿Por qué un enchufe de tu país no entra en el contacto de otro, y por qué algunos tienen una pata más ancha?",
      obj: ["Reconocer los principales tipos de enchufe del mundo.", "Explicar la polarización y la conexión a tierra.", "Usar con seguridad adaptadores y extensiones."],
      txt: `El [[contacto]] (enchufe, tomacorriente) es la interfaz entre la instalación y los aparatos. Cada región del mundo tiene sus propios tipos.

## Tipos principales
| Tipo | Descripción | Dónde |
|---|---|---|
| **A** | Dos patas planas paralelas | México, EE. UU., Centroamérica, parte de Sudamérica |
| **B** | Como el A, con una pata redonda de tierra | Los mismos países (aparatos con tierra) |
| **C** | Dos patas redondas, sin tierra | Europa, Sudamérica (aparatos pequeños) |
| **F** (Schuko) | Dos patas redondas con contactos de tierra laterales | España, Alemania y gran parte de Europa |
| **G** | Tres patas rectangulares grandes, con fusible | Reino Unido, Irlanda |
| **I** | Dos patas planas en V y una de tierra | Argentina, Uruguay, Australia, China |
| **L** | Tres patas redondas en línea | Chile, Italia |
| **N** | Tres patas redondas (brasileño) | Brasil |

## El contacto polarizado
En los tipos A y B, una de las patas planas es **más ancha** que la otra. El contacto tiene también una ranura ancha (conectada al **neutro**) y una estrecha (a la **fase**). Así el aparato solo puede conectarse en una posición, y el fabricante puede asegurar que el interruptor del aparato corte la fase y que las partes accesibles (como la rosca de un portalámparas) queden en el neutro.

!> Nunca limes la pata ancha de un enchufe polarizado para que entre en un contacto viejo: anula esa protección.

## La tercera pata: tierra
Los enchufes con **tierra** (B, F, G, I, L…) conectan la **carcasa metálica** del aparato con el conductor de tierra de la instalación. Si un cable interno se suelta y toca la carcasa, la corriente se va por la tierra (y dispara el diferencial o el termomagnético) en lugar de pasar por quien toque el aparato (lección 11.8).

!> Nunca quites la pata de tierra ni uses adaptadores que la eliminen en aparatos que la tienen (refrigeradores, lavadoras, computadoras de escritorio, hornos). Es una protección de vida.

Los aparatos con el símbolo de **doble aislamiento** (un cuadrado dentro de otro) no necesitan tierra: tienen dos capas de aislamiento.

## Adaptadores de viaje
Un **adaptador** solo cambia la **forma** de las patas, **no el voltaje**. Si llevas un aparato de 127 V a un país de 230 V, el adaptador no basta: necesitas que el aparato diga «100–240 V» o un **transformador** de la potencia adecuada (lección 5.4).

## Extensiones y regletas
- Respeta la **potencia máxima** impresa.
- No conectes **una extensión a otra** en cadena.
- No uses extensiones como instalación **permanente** ni las pases bajo alfombras o por puertas (se dañan).
- Desenróllalas por completo si llevan mucha corriente (enrolladas se calientan).
- Aparatos de calor (calefactores, hervidores, planchas): mejor directamente a la pared.

## Contactos en zonas húmedas
En baños, cocinas y exteriores se usan contactos protegidos por **diferencial** (o contactos GFCI), con **tapas** a prueba de salpicaduras en exteriores, y a la distancia de las bañeras y regaderas que marque la norma.

## Protección para niños
Existen **contactos con obturadores** que solo se abren al introducir las dos patas a la vez, y tapas protectoras para contactos sin uso.`,
      vida: "Al viajar entre México y España, necesitas un adaptador de tipo A a tipo F. Tu cargador de celular funcionará (acepta 100–240 V), pero tu plancha de 127 V se quemaría a 230 V.",
      err: ["Limar la pata ancha de un enchufe polarizado.", "Quitar la pata de tierra para que el enchufe entre en un contacto viejo.", "Creer que un adaptador de viaje cambia el voltaje."],
      ejer: [["¿Qué tipo de enchufe se usa en España?", "Tipo F (Schuko), también el C."], ["¿Para qué sirve la pata de tierra?", "Para desviar a tierra una fuga a la carcasa metálica y proteger a las personas."], ["¿Puedes usar un adaptador para conectar un aparato de 127 V en una red de 230 V?", "No: el adaptador no cambia el voltaje; el aparato se dañaría."]],
      quiz: [
        { t: "om", p: "En un contacto polarizado, la ranura ancha corresponde a…", o: ["La fase", "El neutro", "La tierra", "Ninguna"], c: 1, e: "La ranura ancha es el neutro." },
        { t: "vf", p: "Un adaptador de viaje cambia el voltaje de la red.", c: false, e: "Solo cambia la forma de las patas." },
        { t: "om", p: "¿Qué pasa si quitas la pata de tierra de un refrigerador?", o: ["Consume menos", "Pierdes la protección contra descargas por fugas a la carcasa", "Funciona mejor", "Nada"], c: 1, e: "La tierra protege a las personas.", crit: true },
        { t: "om", p: "El tipo de enchufe con tres patas rectangulares y fusible es el…", o: ["A", "C", "G", "F"], c: 2, e: "El tipo G del Reino Unido." },
        { t: "om", p: "Con una extensión es correcto…", o: ["Conectar otra extensión a continuación", "Respetar su potencia máxima y no usarla como instalación permanente", "Pasarla bajo la alfombra", "Dejarla enrollada con un calefactor"], c: 1, e: "Las cadenas y el enrollado provocan calentamiento." }
      ],
      res: ["Cada región usa sus propios tipos de enchufe (A, B, C, F, G, I…).", "Los contactos polarizados fijan la posición de fase y neutro.", "La pata de tierra protege a las personas: nunca se quita.", "Los adaptadores cambian la forma, no el voltaje.", "Las extensiones tienen límites: no en cadena ni como instalación fija."]
    },
    {
      id: "11-8", t: "La puesta a tierra", d: "Para qué sirve, la varilla de tierra, la conexión equipotencial y por qué no se quita la tercera pata.", min: 40, e: true, calc: "C4",
      preg: "Si un cable suelto toca la carcasa metálica de la lavadora, ¿qué impide que te electrocutes al tocarla?",
      obj: ["Explicar la función de la puesta a tierra.", "Describir sus partes.", "Relacionarla con el funcionamiento de las protecciones."],
      txt: `La [[puesta a tierra]] es un sistema de conductores que une las **partes metálicas** de la instalación y de los aparatos con la **tierra física** (el suelo), a través de un electrodo enterrado.

## ¿Para qué sirve?
1. **Proteger a las personas.** Si una falla hace que la carcasa metálica de un aparato quede con voltaje, la corriente encuentra un camino de **muy baja resistencia** hacia tierra por el conductor de protección, en lugar de pasar por quien la toque (es un divisor de corriente, lección 4.6).
2. **Hacer que actúen las protecciones.** Esa corriente de falla es grande y hace que el diferencial (o el termomagnético, si es muy grande) **corte el circuito** de inmediato. Sin tierra, la carcasa quedaría «viva», esperando a que alguien la toque.
3. **Estabilizar el voltaje** de la instalación respecto del suelo.
4. **Descargar** sobretensiones (rayos, maniobras) a través de los supresores de picos.

## La respuesta a la pregunta inicial
Imagina la lavadora con un cable de fase suelto tocando su carcasa:
- **Con tierra:** se forma un cortocircuito fase-tierra; la corriente de falla es grande, el diferencial (o el termomagnético) corta en milisegundos. La carcasa nunca llega a quedar peligrosa por mucho tiempo.
- **Sin tierra:** la carcasa queda a {{V}}. No pasa nada… hasta que alguien la toca estando descalzo en el piso mojado: entonces la corriente pasa por su cuerpo. Si hay diferencial, cortará (con 30 mA); si no lo hay, la persona puede morir.

## Partes del sistema
- **Electrodo de tierra:** normalmente una **varilla de cobre** (o acero recubierto de cobre) de 1,5 a 3 m clavada en el suelo, o una malla.
- **Conductor del electrodo:** une la varilla con la barra de tierra del tablero.
- **Barra de tierra del tablero:** de ahí salen los **conductores de protección** (verdes, verde-amarillo o desnudos) que acompañan a cada circuito.
- **Pata de tierra** de los contactos y enchufes.

La **resistencia de tierra** (entre el electrodo y el suelo) debe ser baja: muchas normas piden menos de 10 a 25 Ω. La mide un electricista con un instrumento especial (telurómetro).

## Conexión equipotencial
En los baños y cocinas, las normas piden unir a tierra las tuberías metálicas, bañeras metálicas y otras partes conductoras, para que **todo esté al mismo potencial** y no haya diferencias de voltaje peligrosas entre dos cosas que se puedan tocar a la vez.

## Tierra y neutro no son lo mismo
El **neutro** lleva la corriente de retorno de forma normal; la **tierra** solo lleva corriente cuando hay una falla. En el origen de la instalación (o en el transformador) se unen, pero **dentro de la casa van separados**. Unirlos en un contacto (un «puente» que hacen algunos para simular tierra) es peligroso: puede poner las carcasas a voltaje si el neutro se interrumpe.

!> Nunca quites la pata de tierra de un enchufe, no uses tuberías de gas como tierra y no hagas «puentes» entre neutro y tierra en los contactos. Si tu casa no tiene tierra, un electricista puede instalarla.`,
      form: [["I(persona) ≈ I(fuga) × R(tierra) / R(cuerpo)", "Con tierra de baja resistencia, casi toda la fuga va por el conductor de tierra (aproximación de divisor de corriente)."]],
      ej: { enun: "Una fuga a la carcasa produce 10 A de corriente de falla. La carcasa está unida a tierra con una resistencia de 0,5 Ω y una persona la toca (1 000 Ω a tierra). ¿Qué corriente pasa por la persona (aprox.)?", pasos: ["Divisor de corriente: I(persona) = I × R(tierra) / (R(tierra) + R(persona)).", "I(persona) = 10 × 0,5 / (0,5 + 1 000) ≈ 0,005 A = 5 mA.", "Además, 10 A de fuga disparan de inmediato el diferencial."], res: "Unos 5 mA por la persona (frente a los 10 A que se van por la tierra), y el diferencial corta en milisegundos." },
      vida: "Los refrigeradores, lavadoras, hornos y computadoras de escritorio tienen enchufe con tierra porque su carcasa es metálica. Los cargadores y secadoras de cabello suelen tener doble aislamiento y no la necesitan.",
      err: ["Confundir el neutro con la tierra.", "Pensar que la tierra no sirve si hay diferencial: ambos se complementan.", "Hacer un puente entre neutro y tierra en un contacto."],
      ejer: [["¿Cuándo lleva corriente el conductor de tierra?", "Solo cuando hay una falla."], ["¿Qué es el electrodo de tierra?", "Una varilla o malla enterrada que conecta la instalación con el suelo."], ["¿Por qué se unen a tierra las tuberías metálicas del baño?", "Para que todo esté al mismo potencial y no haya diferencias de voltaje peligrosas."]],
      quiz: [
        { t: "om", p: "La función principal de la puesta a tierra es…", o: ["Ahorrar energía", "Desviar las fugas a tierra y proteger a las personas", "Aumentar el voltaje", "Medir el consumo"], c: 1, e: "Y hacer que actúen las protecciones." },
        { t: "vf", p: "El neutro y la tierra son lo mismo y se pueden unir en cualquier contacto.", c: false, e: "Dentro de la casa van separados; unirlos es peligroso.", crit: true },
        { t: "om", p: "El electrodo de tierra suele ser…", o: ["Un foco", "Una varilla de cobre enterrada", "Un fusible", "El medidor"], c: 1, e: "Una varilla o malla enterrada." },
        { t: "om", p: "Sin tierra, si la carcasa de una lavadora queda con voltaje…", o: ["No pasa nada nunca", "Queda «viva» hasta que alguien la toca", "Se apaga sola", "Se convierte en aislante"], c: 1, e: "La tierra haría actuar las protecciones." },
        { t: "om", p: "¿Qué aparatos no necesitan tierra?", o: ["Los de carcasa metálica", "Los de doble aislamiento (cuadrado dentro de otro)", "Los refrigeradores", "Las lavadoras"], c: 1, e: "Tienen dos capas de aislamiento." }
      ],
      res: ["La puesta a tierra une las partes metálicas con el suelo mediante un electrodo.", "Desvía las fugas y hace actuar las protecciones.", "El neutro lleva la corriente normal; la tierra, solo la de falla.", "La conexión equipotencial evita diferencias de voltaje entre partes metálicas.", "Nunca se quita la pata de tierra ni se une neutro con tierra en un contacto."]
    },
    {
      id: "11-9", t: "Problemas comunes y normativa", d: "Contactos calientes, focos que parpadean, pastillas que se botan; cuándo llamar al electricista; normas NOM, REBT y NEC.", min: 35, exp: ["e-tablero-mirar", "e-cablear"],
      preg: "¿Cuándo es un problema eléctrico algo que puedes resolver tú y cuándo hay que llamar a un profesional?",
      obj: ["Reconocer los problemas eléctricos domésticos más comunes y su causa probable.", "Distinguir lo que puede hacer un usuario de lo que es trabajo de electricista.", "Conocer el papel de las normas de instalación."],
      txt: `Los problemas eléctricos de una casa suelen dar **avisos** antes de convertirse en algo grave. Saber leerlos puede evitar un incendio.

## Problemas comunes
| Síntoma | Causa probable | ¿Qué hacer? |
|---|---|---|
| Se bota la pastilla al usar varios aparatos | Sobrecarga | Repartir los aparatos en otros circuitos |
| Se bota la pastilla al conectar un aparato concreto | Aparato en cortocircuito | Dejar de usarlo y llevarlo a revisar |
| Se dispara el diferencial | Fuga en un aparato o humedad | Desconectar aparatos uno a uno; si sigue, electricista |
| Contacto **caliente**, ennegrecido u olor a quemado | Conexión floja o sobrecarga | **Dejar de usarlo, cortar el circuito y llamar a un electricista** |
| Focos que **parpadean** en toda la casa | Conexión floja en el tablero o la acometida, o problema de la red | Electricista o compañía eléctrica |
| Luces que bajan de brillo al arrancar un motor | Caída de tensión: circuito sobrecargado o cables delgados | Electricista |
| **Toques** al tocar un aparato o una llave de agua | Fuga a tierra sin protección | **Peligro**: cortar la corriente y llamar a un electricista de inmediato |
| Chispas al enchufar algo | Normal si es muy pequeña al conectar un aparato encendido; anormal si es grande o repetida | Si es grande: revisar contacto y aparato |
| Zumbido en el tablero | Conexión floja o interruptor dañado | Electricista |

## Lo que SÍ puede hacer un usuario
- Rearmar un interruptor disparado (y buscar la causa).
- Probar el diferencial con su botón.
- Cambiar un foco (con el circuito apagado y el foco frío).
- Revisar visualmente contactos, cables de aparatos y extensiones.
- Rotular el tablero.
- Desconectar y reemplazar aparatos o extensiones dañadas.

## Lo que es trabajo de electricista
- Abrir el tablero, cambiar interruptores o diferenciales.
- Cambiar o añadir contactos, apagadores, lámparas fijas o circuitos.
- Instalar la puesta a tierra, aires acondicionados, calentadores o cargadores de auto.
- Diagnosticar fugas, calentamientos, parpadeos generales.
- Cualquier trabajo en la acometida o el medidor (este, además, con la compañía).

!> Muchos accidentes eléctricos ocurren cuando alguien sin formación «solo cambia un contacto». Un error de conexión puede no notarse durante meses y luego provocar un incendio o una electrocución.

## Las normas de instalación
Cada país tiene una **norma** que establece cómo deben hacerse las instalaciones: calibres, protecciones, distancias, tierras, número de circuitos…
- **México:** NOM-001-SEDE (Instalaciones eléctricas, utilización).
- **España:** REBT (Reglamento Electrotécnico para Baja Tensión) y sus instrucciones técnicas.
- **Estados Unidos:** NEC (Código Eléctrico Nacional), que sirve de referencia en otros países de América.
- Otros países tienen sus propios reglamentos (por ejemplo, en Argentina, Chile, Colombia o Perú).

Consulta siempre la norma de **tu país**. Una instalación conforme a la norma, hecha por un electricista calificado y, donde se exija, **certificada o verificada**, es la mejor garantía de seguridad.

## Lista de revisión del hogar
1. ¿El tablero tiene diferencial y está rotulado?
2. ¿Probaste el diferencial este mes?
3. ¿Hay contactos calientes, flojos o rotos?
4. ¿Hay extensiones permanentes o en cadena?
5. ¿Los aparatos con carcasa metálica están conectados a contactos con tierra?
6. ¿Hay cables pelados o aplastados?
7. ¿Los contactos de baño y exteriores están protegidos?
8. ¿Hay detectores de humo?`,
      vida: "Un contacto que se calienta es una de las causas más comunes de incendios eléctricos en casa: casi siempre es una conexión floja que tiene resistencia y se calienta con el uso.",
      err: ["Ignorar un contacto caliente porque «todavía funciona».", "Hacer instalaciones sin conocer la norma del país.", "Pensar que un toque al tocar un aparato «no es grave»."],
      ejer: [["Un contacto está tibio y ennegrecido. ¿Qué haces?", "Dejar de usarlo, cortar ese circuito en el tablero y llamar a un electricista."], ["¿Cómo se llama la norma de instalaciones en México? ¿Y en España?", "NOM-001-SEDE en México; REBT en España."], ["Menciona dos cosas que puede hacer un usuario sin electricista.", "Rearmar un interruptor y probar el diferencial (también rotular el tablero o cambiar un foco con el circuito apagado)."]],
      quiz: [
        { t: "om", p: "Si un contacto está caliente y huele a quemado, debes…", o: ["Seguir usándolo con cuidado", "Dejar de usarlo, cortar el circuito y llamar a un electricista", "Echarle agua", "Ponerle cinta"], c: 1, e: "Es un riesgo de incendio.", crit: true },
        { t: "om", p: "Sientes un toque al tocar la llave del lavabo. ¿Qué significa?", o: ["Es electricidad estática normal", "Hay una fuga peligrosa: hay que cortar la corriente y llamar a un electricista", "Es normal en las casas antiguas", "El agua está caliente"], c: 1, e: "Indica una fuga a tierra sin protección.", crit: true },
        { t: "vf", p: "Cambiar un contacto de la pared es una tarea para un electricista calificado.", c: true, e: "Un error de conexión puede causar incendios o electrocuciones." },
        { t: "om", p: "¿Qué norma de instalaciones eléctricas se usa en España?", o: ["NOM-001-SEDE", "REBT", "NEC", "ISO 9001"], c: 1, e: "Reglamento Electrotécnico para Baja Tensión." },
        { t: "om", p: "Si las luces de toda la casa parpadean, la causa probable es…", o: ["Un foco fundido", "Una conexión floja en el tablero o la acometida, o un problema de la red", "El control remoto", "Demasiados cargadores"], c: 1, e: "Requiere electricista o compañía eléctrica." }
      ],
      res: ["Los problemas eléctricos dan avisos: calor, olor, chispas, parpadeos, toques.", "Sobrecargas y aparatos en corto disparan el termomagnético; las fugas, el diferencial.", "El usuario puede rearmar, probar el diferencial, rotular y revisar a la vista.", "Cualquier modificación de la instalación la hace un electricista.", "Cada país tiene su norma: NOM-001-SEDE, REBT, NEC u otras."]
    }
  ]
});
