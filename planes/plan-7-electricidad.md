# Plan 7: curso web «Cómo funciona la electricidad»

> Documento de planificación. No incluye código. **Solo en español.**
> Estado: **aprobado** (sin cambios) el 27 de noviembre de 2026 y **construido**. El sitio está en `sitios/como-funciona-la-electricidad/`.

---

## 0. Contexto y decisiones tomadas

| Tema | Decisión |
|---|---|
| Público | Hispanohablantes desde 13–14 años, sin conocimientos previos (secundaria, preparatoria, técnicos que empiezan, autodidactas). |
| Matemáticas | Solo aritmética, despejes y fracciones. Los sistemas 2×2 (Kirchhoff) se explican paso a paso. |
| Formato | Coma decimal (1,5 V), unidades SI. Las calculadoras aceptan coma o punto. |
| Terminología | Se usa **CD/CA** y se mencionan los sinónimos **CC** (corriente continua). Igual con «enchufe / contacto / tomacorriente», «foco / bombilla / ampolleta», «tablero / centro de carga / cuadro eléctrico»; el buscador los reconoce todos. |
| Tensión de red en ejemplos | Dos sistemas en paralelo: **120/127 V – 60 Hz** (México y gran parte de América) y **220/230 V – 50 Hz** (España y gran parte de Sudamérica). El estudiante elige el suyo y los ejemplos marcados se adaptan. |
| Moneda y tarifas | Moneda genérica «$» y tarifa editable (fija o por escalones). No se usan tarifas reales porque cambian. |
| Normativa | Se cita como referencia: NOM-001-SEDE (México), REBT (España), NEC (EE. UU.), con la indicación «consulta la de tu país». |
| Regla de oro de experimentos | **En casa solo pilas/baterías de 9 V o menos.** La red de 120/230 V **nunca** se toca: todo lo de red es simulación o demostración explicada. |
| Emergencias | 911 (gran parte de América) / 112 (Europa). |
| Texto de lecciones | **Texto completo en cada lección.** |

---

## 1. Estructura general

### 1.1 Niveles y módulos

| Nivel | Nombre | Módulos | Lecciones | Duración |
|---|---|---|---|---|
| 0 | Bienvenida | M0 | 3 | 1 h 05 min |
| 1 | Fundamentos de los circuitos | M1–M4 | 34 | 23 h 25 min |
| 2 | Corrientes, energía y máquinas | M5–M9 | 40 | 26 h 30 min |
| 3 | La electricidad en casa y en el mundo | M10–M13 | 33 | 21 h 30 min |
| 4 | Electrónica y laboratorio | M14–M15 | 18 | 13 h 55 min |
| **Total** | | **16 módulos** | **128 lecciones** | **86 h 25 min** |

Las duraciones incluyen lectura, ejemplo resuelto, simulación o experimento, ejercicios y mini-quiz de cada lección, más el quiz o examen de cada módulo.

### 1.2 Plantilla fija de cada lección

1. **Pregunta inicial** cotidiana.
2. **Objetivos** (2–3, medibles).
3. **Explicación** con diagramas y analogías.
4. **Recuadro de fórmulas y unidades**.
5. **Ejemplo resuelto paso a paso** (datos → fórmula → sustitución → resultado con unidad → comprobación).
6. **Simulación, calculadora o experimento** integrado.
7. **En la vida diaria**.
8. **Errores frecuentes**.
9. **Ejercicios** (3–6) con solución desplegable.
10. **Mini-quiz** de 5 preguntas con retroalimentación.
11. **Resumen** en 5 puntos y enlace a la siguiente lección.

### 1.3 Convenciones de experimentos

- **Seguridad:** 🟢 sin riesgo · 🟡 precaución (calor, imanes fuertes, piezas pequeñas; con adulto) · 🔴 **nunca en casa**, solo simulación.
- **Ficha:** objetivo, materiales, pasos numerados, qué observar, tabla de datos, explicación, variaciones, normas de seguridad y desecho (reciclar pilas).

### 1.4 Rutas

- **Completa:** M0 → M15 en orden.
- **Exprés (≈ 30 h):** solo lecciones ★.
- **Temáticas:** «Electricidad en casa» (M1, M2, M6, M11, M12, M13) · «Cálculo de circuitos» (M2, M3, M4, M14) · «Energía y red» (M5–M10).
- **Modo libre:** sin bloqueos; solo se recomienda M13.1–M13.4 antes de M11 y M12 (aviso en la web).

---

## 2. Contenido por módulo

### NIVEL 0 · Bienvenida

#### M0. Bienvenida y cómo usar el curso — 1 h 05 min
**Objetivo:** conocer el curso, las herramientas de la web y la regla de seguridad antes de experimentar.

| # | Lección | Descripción | Min |
|---|---|---|---|
| 0.1 ★ | Bienvenida: qué aprenderás | Mapa del curso, niveles, rutas, cómo se mide el progreso. | 15 |
| 0.2 | Cómo estudiar con esta web | Buscador, progreso, quizzes, modo oscuro, calculadoras y simulaciones. | 15 |
| 0.3 ★ | Seguridad mínima antes de experimentar | Regla de oro (≤ 9 V), por qué la red de casa es otra cosa, materiales seguros; compromiso de seguridad. | 20 |

- **Actividad:** elegir sistema de red y moneda; recorrido guiado.
- **Evaluación:** quiz diagnóstico de 10 preguntas sin calificación (15 min).

### NIVEL 1 · Fundamentos de los circuitos

#### M1. Qué es la electricidad — 5 h 00 min
**Objetivo:** explicar la electricidad desde el átomo y la carga, distinguir conductores y aislantes y explicar la electricidad estática.

| # | Lección | Descripción | Min |
|---|---|---|---|
| 1.1 | La electricidad en tu día | Dónde está la electricidad; qué es y qué no es. | 25 |
| 1.2 ★ | El átomo por dentro | Protones, neutrones, electrones; núcleo y capas; electrones libres. | 35 |
| 1.3 ★ | La carga eléctrica | Positiva/negativa, culombio, carga del electrón, conservación. | 35 |
| 1.4 | Ley de Coulomb | F = k·q₁·q₂/r²; inversa del cuadrado; 2 ejemplos. | 40 |
| 1.5 ★ | Conductores, aislantes y semiconductores | Por qué el cobre conduce; tabla de materiales; agua y cuerpo. | 35 |
| 1.6 ★ | Electricidad estática | Frotamiento, contacto, inducción, polarización; serie triboeléctrica. | 40 |
| 1.7 | Chispas, descargas y rayos | Cómo se forma un rayo, pararrayos, descargas en electrónica. | 30 |
| 1.8 | Campo y potencial eléctrico: la idea | Zona de influencia y «altura eléctrica». | 35 |

- **Experimentos:** 🟢 globo y papelitos / hilo de agua; 🟢 péndulo electrostático; 🟢 electroscopio casero; 🟢 prueba de conductores con pila de 9 V y LED.
- **Simulaciones:** S1, S2. **Calculadoras:** C14.
- **Evaluación:** quiz de módulo de 15 preguntas (25 min).

#### M2. Voltaje, corriente y resistencia — 5 h 05 min
**Objetivo:** definir voltaje, corriente y resistencia con sus unidades y leer diagramas.

| # | Lección | Descripción | Min |
|---|---|---|---|
| 2.1 ★ | La analogía del agua y sus límites | Presión, caudal, tubería estrecha. | 30 |
| 2.2 ★ | La corriente eléctrica | I = Q/t; amperio; sentido convencional y electrónico; velocidad de deriva. | 40 |
| 2.3 ★ | El voltaje | Diferencia de potencial; voltio; valores típicos. | 40 |
| 2.4 ★ | La resistencia | Causa, ohmio, resistor, calor. | 35 |
| 2.5 | Resistividad | R = ρ·L/A; material, longitud, grosor, temperatura. | 40 |
| 2.6 | Múltiplos y submúltiplos | mA, µA, kΩ, MΩ, mV, kV; notación científica. | 30 |
| 2.7 ★ | Símbolos y diagramas | Leer y dibujar esquemas. | 35 |
| 2.8 | Circuito abierto, cerrado y cortocircuito | Qué pasa en cada caso. | 30 |

- **Experimentos:** 🟢 resistencia de grafito; 🟢 interruptor de clip.
- **Simulaciones:** S3, S4. **Calculadoras:** C15, C14.
- **Evaluación:** 15 preguntas (25 min).

#### M3. Ley de Ohm y leyes de Kirchhoff — 6 h 40 min
**Objetivo:** aplicar V = I·R, LCK y LVK paso a paso.

| # | Lección | Descripción | Min |
|---|---|---|---|
| 3.1 ★ | La ley de Ohm | V = I·R, historia, significado. | 35 |
| 3.2 ★ | Triángulo de Ohm y despejes | 3 problemas tipo. | 40 |
| 3.3 | Gráfica V–I | Pendiente = R; óhmicos y no óhmicos. | 35 |
| 3.4 ★ | 10 problemas resueltos | Graduados. | 50 |
| 3.5 | Nodos, ramas y mallas | Vocabulario. | 30 |
| 3.6 ★ | Ley de corrientes (LCK) | Conservación de carga; 4 ejemplos. | 45 |
| 3.7 ★ | Ley de voltajes (LVK) | Conservación de energía; signos; 4 ejemplos. | 45 |
| 3.8 | Circuito de dos mallas | Sistema 2×2 paso a paso. | 55 |
| 3.9 | Estrategia y errores de signos | Receta de 6 pasos. | 35 |

- **Experimento:** 🟢 gráfica V–I con 1–4 pilas.
- **Simulaciones:** S4, S6. **Calculadoras:** C1. Generador de ejercicios aleatorios.
- **Evaluación:** 20 preguntas (30 min).

#### M4. Circuitos en serie y en paralelo — 6 h 40 min
**Objetivo:** distinguir y calcular serie, paralelo y mixtos.

| # | Lección | Descripción | Min |
|---|---|---|---|
| 4.1 ★ | El circuito en serie | Una trayectoria. | 35 |
| 4.2 ★ | Cálculos en serie | Req, corriente, caídas. | 45 |
| 4.3 | Divisor de voltaje | Vout = Vin·R₂/(R₁+R₂). | 40 |
| 4.4 ★ | El circuito en paralelo | Mismo voltaje en ramas. | 35 |
| 4.5 ★ | Cálculos en paralelo | 1/Req; producto entre suma. | 45 |
| 4.6 | Divisor de corriente | Reparto entre ramas. | 35 |
| 4.7 ★ | Circuitos mixtos | Reducción paso a paso. | 55 |
| 4.8 | Ventajas y ejemplos | Series navideñas, casa en paralelo, pilas. | 35 |
| 4.9 | Problemas integradores | 6 problemas. | 45 |

- **Experimentos:** 🟢 LED en serie y paralelo; 🟢 pilas en serie.
- **Simulaciones:** S5. **Calculadoras:** C3, C4.
- **Evaluación:** 20 preguntas (30 min) + certificado de Nivel 1.

### NIVEL 2 · Corrientes, energía y máquinas

#### M5. CD y CA — 5 h 05 min
| # | Lección | Min |
|---|---|---|
| 5.1 ★ | La corriente directa | 30 |
| 5.2 ★ | La corriente alterna | 35 |
| 5.3 ★ | La onda senoidal | 40 |
| 5.4 ★ | La frecuencia | 30 |
| 5.5 | Valores pico, pico a pico y eficaz | 45 |
| 5.6 | La guerra de las corrientes | 30 |
| 5.7 | Convertir CA y CD | 35 |
| 5.8 | Monofásica y trifásica | 35 |

Experimentos: 🟢 etiquetas de cargadores; 🟢 efecto estroboscópico; 🔴 medir la red (solo simulación). S7. C12. Quiz 15 preguntas (25 min).

#### M6. Potencia y energía eléctrica — 5 h 30 min
| # | Lección | Min |
|---|---|---|
| 6.1 ★ | Energía y potencia no son lo mismo | 35 |
| 6.2 ★ | La potencia eléctrica | 45 |
| 6.3 | Watts, kilowatts y placa de datos | 30 |
| 6.4 ★ | Energía: Wh y kWh | 35 |
| 6.5 ★ | Leer tu recibo de luz | 45 |
| 6.6 ★ | Consumo y costo de cada aparato | 45 |
| 6.7 | Consumo fantasma | 30 |
| 6.8 | Eficiencia, efecto Joule y ahorro | 40 |

Experimento: 🟢 lectura del medidor dos días. S5, Casa virtual. C2, C5, C6, C17. Quiz 15 (25 min).

#### M7. Magnetismo y electromagnetismo — 5 h 10 min
| # | Lección | Min |
|---|---|---|
| 7.1 ★ | Los imanes | 30 |
| 7.2 ★ | El campo magnético | 35 |
| 7.3 ★ | La corriente crea magnetismo | 35 |
| 7.4 ★ | Bobinas y electroimanes | 40 |
| 7.5 | Fuerza sobre un cable con corriente | 35 |
| 7.6 ★ | Inducción electromagnética | 45 |
| 7.7 | Ley de Lenz y corrientes de Foucault | 35 |
| 7.8 | Aplicaciones | 30 |

Experimentos: 🟢 campo con brújula; 🟢 Oersted; 🟡 electroimán; 🟡 imán en tubo de cobre. S8, S9. Quiz 15 (25 min).

#### M8. Generadores, motores y transformadores — 5 h 30 min
| # | Lección | Min |
|---|---|---|
| 8.1 ★ | El generador | 40 |
| 8.2 | Alternador y dinamo | 35 |
| 8.3 ★ | El motor de CD | 40 |
| 8.4 | Motores de CA y sin escobillas | 40 |
| 8.5 ★ | El transformador | 45 |
| 8.6 ★ | Cálculos de transformadores | 45 |
| 8.7 | Dónde se usan | 30 |
| 8.8 | Pérdidas y eficiencia | 30 |

Experimentos: 🟡 motor homopolar; 🟢 motor como generador; 🟢 desarmar juguete. S10, S11. C8. Quiz 15 (25 min).

#### M9. Baterías y almacenamiento — 5 h 15 min
| # | Lección | Min |
|---|---|---|
| 9.1 ★ | Cómo funciona una pila | 40 |
| 9.2 | De Volta al litio | 25 |
| 9.3 ★ | Tipos de baterías | 40 |
| 9.4 ★ | Capacidad y autonomía | 45 |
| 9.5 | Carga y descarga | 40 |
| 9.6 | Baterías en serie y en paralelo | 35 |
| 9.7 ★ | Cuidado, seguridad y reciclaje | 35 |
| 9.8 | Otras formas de almacenar energía | 30 |

Experimentos: 🟢 pila de limones; 🟢 pila de monedas; 🟢 curva de descarga. S12. C7, C14. Quiz 15 (25 min) + certificado de Nivel 2.

### NIVEL 3 · La electricidad en casa y en el mundo

#### M10. Redes eléctricas — 5 h 10 min
| # | Lección | Min |
|---|---|---|
| 10.1 ★ | El viaje de la electricidad | 30 |
| 10.2 ★ | Generación | 45 |
| 10.3 ★ | ¿Por qué alta tensión? | 40 |
| 10.4 | Transmisión | 30 |
| 10.5 | Distribución | 35 |
| 10.6 ★ | La acometida y el medidor | 30 |
| 10.7 | El equilibrio de la red | 40 |
| 10.8 | Redes inteligentes y generación en casa | 35 |

Experimento: 🟢 observación desde el suelo. S13. C16. Quiz 15 (25 min).

#### M11. Instalaciones eléctricas domésticas — 6 h 00 min
| # | Lección | Min |
|---|---|---|
| 11.1 ★ | Recorrido por la instalación de una casa | 30 |
| 11.2 ★ | El tablero o centro de carga | 40 |
| 11.3 ★ | El interruptor diferencial | 35 |
| 11.4 | Circuitos derivados | 35 |
| 11.5 ★ | Cables | 45 |
| 11.6 | Interruptores de luz | 35 |
| 11.7 | Enchufes o contactos | 35 |
| 11.8 ★ | La puesta a tierra | 40 |
| 11.9 | Problemas comunes y normativa | 35 |

Experimentos: 🟢 tablero sin abrir; 🟢 botón de prueba del diferencial; 🟢 maqueta de escalera; 🔴 cablear la red. S14, S21. C11, C2. Quiz 20 (30 min).

#### M12. Medición con multímetro — 5 h 10 min
| # | Lección | Min |
|---|---|---|
| 12.1 ★ | Conoce el multímetro | 35 |
| 12.2 ★ | Antes de medir | 30 |
| 12.3 ★ | Medir voltaje de CD | 35 |
| 12.4 | Medir voltaje de CA | 35 |
| 12.5 ★ | Medir resistencia | 40 |
| 12.6 ★ | Medir corriente | 40 |
| 12.7 | Continuidad y prueba de diodo | 30 |
| 12.8 | Diagnóstico práctico | 40 |

Experimentos 🟢 con pilas. S15. C9. Quiz 15 (25 min).

#### M13. Seguridad eléctrica — 5 h 10 min
| # | Lección | Min |
|---|---|---|
| 13.1 ★ | Efectos de la corriente en el cuerpo | 40 |
| 13.2 ★ | Voltaje, corriente y resistencia del cuerpo | 35 |
| 13.3 ★ | Tipos de riesgo | 35 |
| 13.4 ★ | Las protecciones | 35 |
| 13.5 ★ | Seguridad en casa | 35 |
| 13.6 | Seguridad en el exterior | 30 |
| 13.7 ★ | Qué hacer ante una persona electrocutada | 40 |
| 13.8 ★ | Lo que NUNCA hay que hacer | 30 |

Experimento: 🟢 recorrido de seguridad. S16 y escenarios «¿Qué harías?». C1. Quiz 20 con preguntas críticas (30 min) + certificado de Nivel 3.

### NIVEL 4 · Electrónica y laboratorio

#### M14. Electrónica básica — 7 h 00 min
| # | Lección | Min |
|---|---|---|
| 14.1 ★ | De la electricidad a la electrónica | 35 |
| 14.2 ★ | Resistores | 40 |
| 14.3 ★ | Capacitores | 45 |
| 14.4 | Inductores | 30 |
| 14.5 ★ | Semiconductores y el diodo | 40 |
| 14.6 ★ | El LED y su resistencia | 40 |
| 14.7 ★ | El transistor como interruptor | 45 |
| 14.8 | Circuitos simples | 45 |
| 14.9 | Lo digital: puertas lógicas | 40 |
| 14.10 | Siguientes pasos | 30 |

Experimentos 🟢 con pila de 9 V. S17–S20. C10, C13, C9. Quiz 20 (30 min).

#### M15. Laboratorio y proyecto final — 6 h 55 min
| # | Lección | Min |
|---|---|---|
| 15.1 | Cómo usar el laboratorio virtual | 25 |
| 15.2 ★ | Tu kit casero seguro | 30 |
| 15.3 ★ | Taller de calculadoras | 45 |
| 15.4 | Taller de estática y magnetismo | 45 |
| 15.5 ★ | Taller de circuitos con pilas | 50 |
| 15.6 | Construye una batería casera | 40 |
| 15.7 ★ | Proyecto final A: auditoría energética | 60 |
| 15.8 ★ | Proyecto final B: circuito controlado | 60 |

Evaluación: examen final de 40 preguntas (60 min, 75 %), rúbricas de los proyectos y certificado.

### 2.1 Resumen de duraciones

| Módulo | Lecciones | Min lecciones | Quiz | Total |
|---|---|---|---|---|
| M0 | 3 | 50 | 15 | 1 h 05 |
| M1 | 8 | 275 | 25 | 5 h 00 |
| M2 | 8 | 280 | 25 | 5 h 05 |
| M3 | 9 | 370 | 30 | 6 h 40 |
| M4 | 9 | 370 | 30 | 6 h 40 |
| M5 | 8 | 280 | 25 | 5 h 05 |
| M6 | 8 | 305 | 25 | 5 h 30 |
| M7 | 8 | 285 | 25 | 5 h 10 |
| M8 | 8 | 305 | 25 | 5 h 30 |
| M9 | 8 | 290 | 25 | 5 h 15 |
| M10 | 8 | 285 | 25 | 5 h 10 |
| M11 | 9 | 330 | 30 | 6 h 00 |
| M12 | 8 | 285 | 25 | 5 h 10 |
| M13 | 8 | 280 | 30 | 5 h 10 |
| M14 | 10 | 390 | 30 | 7 h 00 |
| M15 | 8 | 355 | 60 | 6 h 55 |
| **Total** | **128** | **4 735** | **450** | **86 h 25 min** |

### 2.2 Simulaciones (21)
S1 Globo y estática · S2 Ley de Coulomb · S3 Analogía del agua · S4 Electrones en movimiento · S5 Constructor serie/paralelo · S6 Kirchhoff dos mallas · S7 Osciloscopio · S8 Campo magnético · S9 Inducción de Faraday · S10 Generador y motor · S11 Transformador · S12 Batería · S13 Red eléctrica · S14 Tablero interactivo · S15 Multímetro virtual · S16 Cuerpo humano y corriente · S17 Capacitor RC · S18 LED · S19 Transistor interruptor · S20 Puertas lógicas · S21 Interruptor de escalera. Más la «Casa virtual» de consumo.

### 2.3 Calculadoras (17)
C1 Ley de Ohm · C2 Potencia · C3 Resistencia equivalente · C4 Divisores · C5 Consumo y costo · C6 Consumo fantasma · C7 Autonomía de batería · C8 Transformador · C9 Código de colores · C10 Resistencia para LED · C11 Calibre de cable y caída de tensión · C12 RMS/pico/frecuencia · C13 Constante RC · C14 Conversor de unidades · C15 Resistividad · C16 Pérdidas de transmisión · C17 Ahorro con LED.

### 2.4 Secciones extra
Glosario (~150 términos), Personajes (14), Línea de tiempo, Hoja de fórmulas, Catálogo de experimentos.

---

## 3. Funciones de la web

HTML + CSS + JavaScript sin frameworks ni CDN; funciona con doble clic en `index.html` y en GitHub Pages. Rutas con `#`. Datos en `.js`.

- **Buscador:** índice en memoria; minúsculas, sin acentos, sin palabras vacías; sinónimos; puntuación por campo; prefijos y tolerancia a 1 error; resultados en vivo y página con filtros; tecla `/`.
- **Progreso:** `localStorage` clave `electricidad-progreso-v1` con versión; guardado automático; `try/catch` con modo en memoria; lección completada al llegar al final y hacer el mini-quiz (o manualmente); panel «Mi progreso»; exportar/importar/reiniciar.
- **Quizzes:** opción múltiple, verdadero/falso, numérica (coma/punto, unidades y prefijos, ±2 %), ordenar pasos y señalar en diagrama; retroalimentación inmediata y enlace a la lección; mini-quiz de 5; quiz de módulo de 15–20 al azar con valores aleatorios, 70 % (M13: críticas obligatorias); examen final de 40 al 75 %; certificado imprimible.
- **Responsive:** móvil primero, cortes 600/960 px, menú desplegable, barra inferior, tablas con desplazamiento interno, objetivos ≥ 44 px, SVG escalable, *pointer events*, hoja de impresión.
- **Modo claro/oscuro:** variables en `:root`, `prefers-color-scheme` con `data-theme`, script en `<head>` sin destello, SVG con `currentColor`.
- **Accesibilidad y solo español:** `lang="es"`, saltar al contenido, teclado, `aria-live`, contraste AA, `prefers-reduced-motion`; textos en `datos/interfaz.js`; prueba de idioma.

## 4. Estructura de archivos

```
sitios/como-funciona-la-electricidad/
├── index.html · estilos.css · LEEME.md · icono.svg
├── js/ app.js · progreso.js · buscador.js · quizzes.js · calculadoras.js · sim-circuitos.js · sim-campos.js · sim-componentes.js
├── datos/ interfaz.js · curso.js · modulo-00.js … modulo-15.js · experimentos.js · glosario.js · personajes.js
└── pruebas/ pruebas-calculos.js · pruebas-datos.js · revisar-idioma.js · pruebas-navegador.js
```

## 5. Pruebas antes de subir

1. `node pruebas/pruebas-calculos.js` (casos de control y casos límite).
2. `node pruebas/pruebas-datos.js` (integridad, 128 lecciones, 5 preguntas por mini-quiz, duraciones 86 h 25 min, enlaces, ningún experimento casero > 9 V).
3. `node pruebas/revisar-idioma.js` (sin inglés).
4. `node pruebas/pruebas-navegador.js` (Playwright: todas las rutas sin errores, móvil 390×844 y PC 1366×768 sin desplazamiento horizontal, tema, progreso, buscador, quizzes, calculadoras y simulaciones).
5. Revisión manual y publicación en la rama de trabajo.

## 6. Fases

1. Base de la web, M0 y pruebas. 2. Nivel 1. 3. Nivel 2. 4. Nivel 3. 5. Nivel 4 y secciones extra. 6. Pruebas completas y subida.
