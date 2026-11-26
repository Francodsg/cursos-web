# Plan 2: sitio web del curso «Ciencias: del método científico a las fronteras del conocimiento»

> Documento de planificación. No incluye código. **Solo en español.** Su función es servir de especificación completa para construir más adelante el sitio del curso.
> Estado: plan, **pendiente de aprobación**. No se construye nada hasta aprobarlo.

---

## 0. Contexto y supuestos

- **Necesidad:** un curso de ciencias naturales en línea, en español, que vaya de lo básico a lo avanzado en física, química, biología, astronomía, ciencias de la Tierra, ecología y ambiente, ciencias de la salud y herramientas de datos, con temas y experimentos en cada módulo.
- **Público:** hispanohablantes desde los 14 años, sin conocimientos previos. Sirve para secundaria, preparación preuniversitaria, primeros cursos universitarios y autodidactas. Útil para docentes como material de apoyo.
- **Modalidad:** autoaprendizaje a ritmo propio, con uso opcional en grupo con docente.
- **Supuestos de diseño:**
  - Lecciones de 20–35 minutos (explicación, ejemplo resuelto, simulación o experimento, ejercicios, mini-quiz).
  - Estructura de **áreas** (columnas) por **niveles** (filas): el estudiante avanza por niveles y elige el orden de las áreas dentro de cada nivel.
  - Matemáticas solo en la medida necesaria en cada nivel: aritmética y proporciones en el Nivel 1, álgebra y trigonometría en el Nivel 2, nociones de cálculo en el Nivel 3 (con un módulo de apoyo).
  - Sistema Internacional de Unidades (SI), coma decimal y notación habitual en español.
  - Los experimentos se clasifican por seguridad y por lugar (casa, laboratorio escolar, virtual). **En casa solo se proponen experimentos con materiales domésticos seguros**; los que exigen reactivos o equipo pasan a laboratorio supervisado o a simulación.

---

## 1. Estructura general del curso

### 1.1 Áreas

| Código | Área | Contenido |
|---|---|---|
| FUN | Fundamentos | Método científico, medición, matemáticas para la ciencia, laboratorio, historia y filosofía de la ciencia |
| FIS | Física | Mecánica, energía, ondas, termodinámica, electromagnetismo, física moderna |
| QUI | Química | Materia, átomo, enlaces, reacciones, química orgánica, fisicoquímica, química analítica |
| BIO | Biología | Célula, genética, evolución, fisiología, microbiología, biología molecular |
| AST | Astronomía y ciencias del espacio | Cielo, sistema solar, estrellas, galaxias, cosmología, exploración espacial |
| TIE | Ciencias de la Tierra | Geología, tectónica, meteorología, oceanografía, clima, recursos y riesgos |
| ECO | Ecología y ciencias ambientales | Ecosistemas, biodiversidad, cambio climático, contaminación, sostenibilidad |
| SAL | Cuerpo humano y ciencias de la salud | Anatomía, fisiología, inmunología, neurociencia, epidemiología |
| DAT | Datos y computación científica | Estadística, visualización, hojas de cálculo, programación para simular |
| FRO | Fronteras e integración | Temas interdisciplinarios actuales y proyecto final |

### 1.2 Niveles y módulos

| Nivel | Nombre | Módulos | Lecciones | Horas estimadas* |
|---|---|---|---|---|
| 0 | Propedéutica: pensar como científico | FUN0.1–FUN0.5 | 30 | 20 |
| 1 | Básico | FIS1 · QUI1 · BIO1 · AST1 · TIE1 · ECO1 · SAL1 | 64 | 50 |
| 2 | Intermedio | FIS2 · QUI2 · BIO2 · AST2 · TIE2 · ECO2 · SAL2 · DAT2 | 75 | 65 |
| 3 | Avanzado | MAT3 (apoyo) · FIS3 · QUI3 · BIO3 · AST3 · TIE3 · SAL3 | 56 | 55 |
| 4 | Fronteras e integración | FRO4 · PROY (proyecto final) | 16 | 30 |
| **Total** | | **30 módulos** | **241 lecciones** | **≈ 220 h** |

\*Incluye lecciones, experimentos, ejercicios, quizzes y exámenes.

### 1.3 Plantilla fija de cada lección

1. **Pregunta disparadora** a partir de algo cotidiano («¿Por qué el cielo es azul?»).
2. **Objetivos** (2–3, medibles).
3. **Conocimientos previos** con enlaces a las lecciones necesarias.
4. **Explicación** (1 000–1 800 palabras) con diagramas, animaciones y analogías.
5. **Fórmulas y conceptos clave** en un recuadro (con unidades y significado de cada símbolo).
6. **Ejemplo resuelto** paso a paso (en lecciones cuantitativas).
7. **Experimento o simulación** (ficha según §3.0).
8. **Historia breve:** quién lo descubrió y cómo (2–3 párrafos).
9. **Ciencia en la vida diaria:** aplicaciones y tecnología.
10. **Errores frecuentes** (ideas previas incorrectas y por qué lo son).
11. **Ejercicios** (3–6, de dificultad creciente, con solución desplegable).
12. **Mini-quiz** de 5 preguntas con retroalimentación.
13. **Para saber más:** lecturas, vídeos y simulaciones.

Las lecciones **esenciales** llevan ★ y forman la ruta exprés (≈ 90 lecciones).

### 1.4 Rutas de aprendizaje

- **Ruta completa (por defecto):** Nivel 0 → 1 → 2 → 3 → 4. Dentro de cada nivel, las áreas se pueden hacer en cualquier orden, salvo las dependencias marcadas (§1.5).
- **Rutas por área:** por ejemplo, solo física (FUN0 → FIS1 → FIS2 → MAT3 → FIS3 → temas de FRO4).
- **Ruta exprés:** solo lecciones ★.
- **Rutas temáticas transversales:** Energía · Materia · Vida · Universo · Planeta y clima · Salud · Tecnología.
- **Ruta preuniversitaria:** Niveles 0–2 de FIS, QUI y BIO, con exámenes tipo admisión.
- **Modo libre:** sin bloqueos; el progreso se registra, pero sin certificado de nivel hasta aprobar los exámenes.

### 1.5 Dependencias principales

- FUN0 (al menos FUN0.1 y FUN0.2) antes de cualquier Nivel 1.
- QUI1 antes de BIO1, lección «Biomoléculas».
- FIS1 antes de AST2 y TIE2 (parcialmente).
- QUI2 antes de BIO2, lección «Genética molecular».
- MAT3 recomendado antes de FIS3 y QUI3.
- FIS2 y QUI2 antes de QUI3 (química cuántica).
- Todo el Nivel 3 de un área antes de los temas de FRO4 relacionados.

---

## 2. Objetivos de aprendizaje por nivel

**Nivel 0, Propedéutica.**
- Explicar y aplicar el método científico: observación, pregunta, hipótesis, experimento, análisis y conclusión.
- Distinguir ciencia de pseudociencia, correlación de causalidad, y hipótesis, teoría y ley.
- Medir con unidades SI, convertir unidades y usar notación científica y cifras significativas.
- Construir e interpretar gráficas y tablas de datos; calcular media, mediana y error.
- Trabajar en un laboratorio con seguridad y redactar un informe.

**Nivel 1, Básico.**
- Describir los fenómenos básicos de cada área con el vocabulario correcto.
- Resolver problemas sencillos de una o dos operaciones (velocidad, densidad, fuerza, concentración simple).
- Explicar los modelos fundamentales: modelo atómico, teoría celular, sistema solar heliocéntrico, ciclo de las rocas, cadenas tróficas.
- Realizar experimentos guiados en casa y registrar datos.
- Relacionar la ciencia con la vida diaria y la salud.

**Nivel 2, Intermedio.**
- Resolver problemas cuantitativos de varios pasos con álgebra y trigonometría.
- Aplicar las leyes de Newton, la conservación de la energía y del momento, las leyes de los gases, la estequiometría y el equilibrio químico.
- Explicar el flujo de información genética (ADN → ARN → proteína) y la evolución por selección natural.
- Interpretar evidencias de la ciencia del clima y de la tectónica de placas.
- Diseñar un experimento propio con variables controladas y analizar sus datos con estadística básica.

**Nivel 3, Avanzado.**
- Explicar los fundamentos de la relatividad y de la mecánica cuántica, y sus consecuencias.
- Usar nociones de cálculo (derivadas e integrales simples) en problemas físicos y químicos.
- Explicar mecanismos de reacción orgánica, técnicas instrumentales y biotecnología (PCR, CRISPR, secuenciación).
- Describir la cosmología actual (Big Bang, materia y energía oscuras) y sus evidencias.
- Leer y evaluar críticamente un artículo científico de divulgación avanzada.

**Nivel 4, Fronteras e integración.**
- Explicar temas actuales de investigación interdisciplinaria y sus implicaciones éticas.
- Realizar un proyecto de investigación completo: pregunta, revisión, método, datos, análisis, conclusiones y comunicación.

---

## 3. Contenido por área y nivel

### 3.0 Convenciones para los experimentos

Cada experimento tiene una ficha con:

- **Lugar:** 🏠 casa · 🧪 laboratorio escolar (con supervisión) · 💻 simulación virtual.
- **Seguridad:** 🟢 sin riesgo · 🟡 precaución (calor, vidrio, cortes; con adulto) · 🔴 solo laboratorio supervisado, nunca en casa.
- **Ficha:** objetivo, hipótesis guiada, materiales, procedimiento numerado, tabla de datos, preguntas de análisis, explicación científica, variaciones, normas de seguridad, eliminación de residuos.
- Las simulaciones remiten a laboratorios virtuales gratuitos (PhET de la Universidad de Colorado, en español) o a simuladores propios del sitio.

---

### FUN0. Propedéutica: pensar como científico (Nivel 0)

**FUN0.1 ¿Qué es la ciencia? (6 lecciones)**
1. ★ ¿Qué es la ciencia? Conocimiento, evidencia y escepticismo organizado.
2. ★ El método científico paso a paso.
3. Hipótesis, teoría y ley: diferencias.
4. ★ Ciencia y pseudociencia; falsabilidad (Popper).
5. Correlación y causalidad; experimentos controlados y sesgos.
6. La ciencia como empresa humana: revisión por pares, replicación, ética.

**FUN0.2 Medición (6 lecciones)**
1. ★ Magnitudes y el Sistema Internacional de Unidades (7 unidades básicas).
2. ★ Conversión de unidades y análisis dimensional.
3. Notación científica y órdenes de magnitud.
4. Cifras significativas y redondeo.
5. Error, precisión y exactitud; incertidumbre de una medida.
6. Instrumentos de medida: regla, balanza, probeta, termómetro, cronómetro, sensores del móvil.

**FUN0.3 Matemáticas para la ciencia (8 lecciones)**
1. Proporciones, porcentajes y regla de tres.
2. ★ Álgebra: despejar fórmulas.
3. ★ Gráficas: lineal, pendiente y su significado físico.
4. Funciones cuadráticas, inversas, exponenciales y logarítmicas en la naturaleza.
5. Geometría y trigonometría básicas (seno, coseno, tangente).
6. Vectores: suma, componentes y magnitud.
7. Estadística descriptiva: media, mediana, desviación estándar.
8. Probabilidad básica.

**FUN0.4 Laboratorio (5 lecciones)**
1. ★ Seguridad: normas, pictogramas de peligro, equipo de protección.
2. Material de laboratorio y su uso.
3. El cuaderno de laboratorio.
4. ★ Cómo escribir un informe científico (estructura IMRyD).
5. Ciencia en casa: materiales seguros y buenas prácticas.

**FUN0.5 Breve historia de la ciencia (5 lecciones)**
1. Ciencia antigua: Mesopotamia, Egipto, Grecia (Tales, Aristóteles, Arquímedes, Eratóstenes), China e India.
2. Ciencia en el mundo islámico y la Edad Media (Alhacén, Al-Juarismi, Avicena).
3. ★ La revolución científica (Copérnico, Galileo, Kepler, Newton).
4. Siglos XVIII–XIX: química moderna, electricidad, evolución.
5. Siglos XX–XXI: relatividad, cuántica, ADN, era espacial, internet, genómica.

**Científicos clave:** Aristóteles, Eratóstenes, Alhacén (padre del método experimental en óptica), Francis Bacon, Galileo, Karl Popper, Thomas Kuhn.

**Experimentos:**
- 🏠🟢 **Medir la Tierra como Eratóstenes:** sombra de un palo a mediodía en dos ciudades (colaborativo entre estudiantes del sitio).
- 🏠🟢 **El péndulo y la hipótesis:** ¿influye la masa en el periodo? Diseño con variables controladas.
- 🏠🟢 **Precisión frente a exactitud:** medir 10 veces la misma mesa y calcular media y desviación.
- 🏠🟢 **Tiempo de reacción:** la regla que cae (estadística del grupo).
- 💻 Gráficas interactivas: ajustar una recta a datos reales.

**Actividades:** analizar un anuncio «científico» y detectar pseudociencia; escribir una hipótesis falsable para una pregunta cotidiana.

**Evaluación:** quiz por módulo; primer informe de laboratorio (péndulo) con rúbrica.

---

### Nivel 1: Básico

#### FIS1. Física básica (12 lecciones)

**Contexto histórico:** de Aristóteles a Galileo y Newton: el paso de la física cualitativa a la experimental y matemática.

| Lección | Temas | Conceptos y fórmulas |
|---|---|---|
| 1 ★ | Movimiento: posición, distancia, desplazamiento | Sistema de referencia |
| 2 ★ | Velocidad y rapidez; movimiento uniforme | v = d/t |
| 3 | Aceleración; caída libre | a = Δv/Δt; g ≈ 9,8 m/s² |
| 4 ★ | Fuerzas y leyes de Newton | F = m·a; acción y reacción |
| 5 | Peso, masa, fricción y equilibrio | P = m·g |
| 6 ★ | Trabajo, energía y potencia; conservación de la energía | W = F·d; Ec = ½mv²; Ep = mgh |
| 7 | Máquinas simples: palanca, polea, plano inclinado | Ventaja mecánica |
| 8 | Presión y fluidos: Pascal, Arquímedes, flotación | p = F/A; empuje |
| 9 | Calor y temperatura; dilatación; conducción, convección y radiación | Escalas °C, K |
| 10 | Ondas y sonido | v = λ·f |
| 11 | Luz: reflexión, refracción, colores | Espectro visible |
| 12 ★ | Electricidad y magnetismo básicos: carga, corriente, circuitos simples, imanes | V = I·R |

**Científicos clave:** Galileo Galilei (caída de los cuerpos, inercia), Isaac Newton (leyes del movimiento), Arquímedes (flotación), Blaise Pascal (presión), James Joule (equivalente mecánico del calor), Christiaan Huygens (ondas), Alessandro Volta (pila), Georg Ohm (resistencia), Michael Faraday.

**Experimentos:**
- 🏠🟢 Carrito o bola por una rampa: medir tiempo y distancia, graficar.
- 🏠🟢 Caída libre con el cronómetro del móvil o vídeo a cámara lenta.
- 🏠🟢 Fricción: arrastrar un libro sobre superficies distintas con una goma elástica como dinamómetro.
- 🏠🟢 Palanca con regla y monedas.
- 🏠🟢 Ludión de Descartes (botella con un gotero) y flotación de un huevo en agua salada.
- 🏠🟡 Conducción del calor en cucharas de distintos materiales (agua caliente, con adulto).
- 🏠🟢 Teléfono de vasos y cuerda (ondas sonoras).
- 🏠🟢 Lápiz «roto» en un vaso de agua (refracción); arcoíris con un CD o un vaso.
- 🏠🟢 Circuito con pila, cables y bombilla LED; electroimán con pila de 1,5 V, clavo y alambre (desconectar tras unos segundos para evitar calentamiento).
- 💻 PhET: «Fuerzas y movimiento», «Parque de patinaje: energía», «Kit de construcción de circuitos».

**Errores frecuentes:** «los objetos pesados caen más rápido»; «sin fuerza no hay movimiento»; confundir calor y temperatura, y masa y peso.

#### QUI1. Química básica (10 lecciones)

**Contexto histórico:** de la alquimia a Lavoisier (conservación de la masa) y Dalton (teoría atómica).

| Lección | Temas |
|---|---|
| 1 ★ | Materia: propiedades, estados, cambios de estado |
| 2 | Sustancias puras y mezclas; métodos de separación |
| 3 ★ | El átomo: modelos de Dalton, Thomson, Rutherford, Bohr |
| 4 ★ | Partículas subatómicas, número atómico y másico, isótopos |
| 5 ★ | La tabla periódica: grupos, periodos, metales y no metales (Mendeléyev) |
| 6 | Enlaces: iónico, covalente, metálico |
| 7 ★ | Reacciones químicas; ley de conservación de la masa; ajustar ecuaciones |
| 8 | El mol y la masa molar (introducción) |
| 9 ★ | Ácidos, bases y pH |
| 10 | Química de la vida diaria: cocina, limpieza, plásticos, medicamentos |

**Científicos clave:** Robert Boyle, Antoine Lavoisier y Marie-Anne Paulze Lavoisier, John Dalton, J. J. Thomson, Ernest Rutherford, Niels Bohr, Dmitri Mendeléyev, Marie Curie.

**Experimentos:**
- 🏠🟢 Separar una mezcla de arena, sal y limaduras (imán, filtración y evaporación al sol).
- 🏠🟢 Cromatografía con tiza o papel de filtro y rotuladores.
- 🏠🟢 Indicador de pH con col lombarda: probar vinagre, limón, bicarbonato, jabón.
- 🏠🟢 Conservación de la masa: bicarbonato y vinagre en una botella con globo, pesando antes y después.
- 🏠🟢 Cristales de sal o azúcar (cristalización durante varios días).
- 🏠🟢 Oxidación de una manzana y de clavos de hierro en distintas condiciones.
- 🧪🟡 Ensayo a la llama de sales metálicas (solo laboratorio, docente).
- 💻 PhET: «Construye un átomo», «Escala de pH», «Balanceo de ecuaciones químicas»; tabla periódica interactiva del sitio.

**Seguridad:** nunca mezclar productos de limpieza (lejía con amoníaco o con ácidos genera gases tóxicos). Esta advertencia aparece destacada en el módulo.

#### BIO1. Biología básica (12 lecciones)

**Contexto histórico:** Hooke y Leeuwenhoek con los primeros microscopios; la teoría celular de Schleiden, Schwann y Virchow; Linneo; Mendel.

| Lección | Temas |
|---|---|
| 1 ★ | ¿Qué es la vida? Características de los seres vivos |
| 2 | El microscopio y la escala de la vida |
| 3 ★ | La célula: teoría celular; células procariotas y eucariotas |
| 4 | Organelos y sus funciones; célula animal y vegetal |
| 5 | Biomoléculas: carbohidratos, lípidos, proteínas, ácidos nucleicos |
| 6 ★ | Energía en la célula: fotosíntesis y respiración celular |
| 7 | Membrana y transporte: difusión y ósmosis |
| 8 | División celular: mitosis y meiosis |
| 9 ★ | Herencia: Mendel, genes, dominante y recesivo, cuadro de Punnett |
| 10 | Clasificación de los seres vivos: dominios y reinos |
| 11 | Plantas: estructura, nutrición y reproducción |
| 12 | Animales y microorganismos (bacterias, hongos, virus) |

**Científicos clave:** Robert Hooke, Antonie van Leeuwenhoek, Matthias Schleiden y Theodor Schwann, Rudolf Virchow, Carlos Linneo, Gregor Mendel, Louis Pasteur, Santiago Ramón y Cajal (introducción).

**Experimentos:**
- 🏠🟢 Extraer ADN de una fresa o un plátano (sal, jabón, alcohol frío).
- 🏠🟢 Ósmosis con una papa o un huevo sin cáscara (vinagre, después agua y jarabe).
- 🏠🟢 Fotosíntesis: hojas de espinaca en agua con bicarbonato (flotación de discos de hoja).
- 🏠🟢 Germinación de semillas con distintas condiciones de luz y agua (variables controladas).
- 🏠🟢 Levadura, azúcar y globo: respiración y fermentación.
- 🏠🟢 Pan con moho en distintas condiciones (sin abrir la bolsa; desechar sellado).
- 🧪🟢 Observar al microscopio células de cebolla y de mucosa bucal.
- 🏠🟢 Árbol genealógico de rasgos (enrollar la lengua, lóbulo de la oreja; advertir que muchos rasgos no siguen herencia mendeliana simple).
- 💻 Simulador de cuadros de Punnett; microscopio virtual.

#### AST1. Astronomía básica (9 lecciones)

| Lección | Temas |
|---|---|
| 1 ★ | El cielo nocturno: estrellas, constelaciones, planetas, Vía Láctea; contaminación lumínica |
| 2 ★ | Rotación y traslación: día, año, estaciones |
| 3 ★ | La Luna: fases, mareas, eclipses |
| 4 | Del geocentrismo al heliocentrismo: Ptolomeo, Copérnico, Galileo, Kepler |
| 5 ★ | El sistema solar: el Sol, planetas, planetas enanos, asteroides, cometas |
| 6 | Distancias en el universo: unidad astronómica, año luz |
| 7 | Las estrellas: color, brillo, temperatura |
| 8 | Telescopios y observatorios (los grandes observatorios de Chile, Canarias y México) |
| 9 | Astronomía de las culturas: maya, inca, mexica, polinesia y otras |

**Científicos clave:** Hiparco, Ptolomeo, Nicolás Copérnico, Tycho Brahe, Johannes Kepler, Galileo Galilei, Edmond Halley, Henrietta Leavitt, Annie Jump Cannon.

**Experimentos:**
- 🏠🟢 Diario lunar: dibujar la Luna cada noche durante un mes.
- 🏠🟢 Modelo de fases con una lámpara y una pelota.
- 🏠🟢 Modelo a escala del sistema solar en un pasillo o una calle (calculadora de escala del sitio).
- 🏠🟢 Reloj de sol.
- 🏠🟢 Observación con app de mapa estelar y conteo de estrellas (proyecto ciudadano de contaminación lumínica).
- 🏠🟡 Observar el Sol solo de forma indirecta (cámara estenopeica o proyección). **Nunca mirar el Sol directamente ni con prismáticos.**
- 💻 Planetario virtual (Stellarium, gratuito).

#### TIE1. Ciencias de la Tierra básica (9 lecciones)

| Lección | Temas |
|---|---|
| 1 ★ | Estructura interna de la Tierra: corteza, manto, núcleo |
| 2 | Minerales: propiedades e identificación (escala de Mohs) |
| 3 ★ | Rocas ígneas, sedimentarias y metamórficas; ciclo de las rocas |
| 4 ★ | Introducción a la tectónica de placas (Wegener) |
| 5 | Volcanes y terremotos; el Cinturón de Fuego del Pacífico |
| 6 | La atmósfera: capas y composición |
| 7 ★ | Tiempo atmosférico: temperatura, presión, viento, humedad, nubes |
| 8 | El agua en la Tierra y el ciclo hidrológico |
| 9 | Suelos, erosión y paisaje |

**Científicos clave:** James Hutton (tiempo profundo), Charles Lyell, Alfred Wegener, Inge Lehmann (núcleo interno), Friedrich Mohs, Charles Richter.

**Experimentos:**
- 🏠🟢 Modelo de la estructura terrestre con plastilina.
- 🏠🟢 Ciclo de las rocas con ceras de colores (raspado, presión y calor suave con adulto).
- 🏠🟢 Volcán de bicarbonato y vinagre (y discusión de por qué no es un volcán real).
- 🏠🟢 Placas tectónicas con galletas y crema.
- 🏠🟢 Estación meteorológica casera: pluviómetro, veleta, anemómetro de vasos.
- 🏠🟢 Nube en un frasco (agua tibia y hielo).
- 🏠🟢 Erosión con bandejas de tierra con y sin plantas.
- 💻 Mapa en tiempo real de sismos (Servicio Geológico de EE. UU.).

#### ECO1. Ecología básica (6 lecciones)

1. ★ Ecosistemas: factores bióticos y abióticos.
2. ★ Cadenas y redes tróficas; productores, consumidores, descomponedores.
3. Flujo de energía y pirámides ecológicas.
4. Ciclos del carbono, el agua y el nitrógeno.
5. ★ Biodiversidad y su importancia; ecosistemas de América Latina y España.
6. Impacto humano: deforestación, contaminación, especies invasoras.

**Científicos clave:** Alexander von Humboldt, Ernst Haeckel, Rachel Carson, Eugene Odum.

**Experimentos:**
- 🏠🟢 Ecosistema en un frasco cerrado (terrario) con observación semanal.
- 🏠🟢 Inventario de biodiversidad del barrio (fotografías y app de ciencia ciudadana).
- 🏠🟢 Compostera pequeña: descomposición.
- 🏠🟢 Huella de residuos: pesar la basura de una semana y clasificarla.

#### SAL1. Cuerpo humano y salud básica (6 lecciones)

1. ★ Niveles de organización: células, tejidos, órganos, sistemas.
2. ★ Sistemas digestivo, respiratorio y circulatorio.
3. Sistemas nervioso, locomotor y sentidos.
4. Nutrición: macronutrientes, micronutrientes, dieta equilibrada.
5. ★ Microbios, enfermedades e higiene; vacunas (introducción).
6. Hábitos saludables: sueño, ejercicio, salud mental (con base científica).

**Científicos clave:** Andrés Vesalio, William Harvey, Edward Jenner, Louis Pasteur, Robert Koch, Ignaz Semmelweis.

**Experimentos:**
- 🏠🟢 Medir el pulso en reposo y tras ejercicio (gráfica).
- 🏠🟢 Capacidad pulmonar con una botella invertida en agua.
- 🏠🟢 Mapa de la lengua desmentido (prueba de sabores).
- 🏠🟢 Lavado de manos con purpurina o pimienta (simular la propagación de microbios).
- 🏠🟢 Punto ciego del ojo.

**Nota del módulo:** el contenido de salud es educativo y no sustituye la consulta médica.

**Evaluación del Nivel 1:** quiz por módulo; **examen de Nivel 1** (§6) y un informe de experimento casero a elegir.

---

### Nivel 2: Intermedio

#### FIS2. Física intermedia (14 lecciones)

| Lección | Temas | Conceptos y fórmulas |
|---|---|---|
| 1 ★ | Cinemática con gráficas; movimiento uniformemente acelerado | x = x₀ + v₀t + ½at² |
| 2 | Movimiento en dos dimensiones: tiro parabólico | Componentes de vectores |
| 3 ★ | Dinámica: diagramas de cuerpo libre, fricción, planos inclinados | ΣF = m·a |
| 4 ★ | Momento lineal, impulso y colisiones | p = m·v; conservación |
| 5 | Movimiento circular; fuerza centrípeta | a = v²/r |
| 6 ★ | Gravitación universal; órbitas y satélites | F = G·m₁m₂/r² |
| 7 | Rotación: torque, momento de inercia, momento angular | τ = r·F |
| 8 | Oscilaciones: muelle y péndulo; movimiento armónico simple | Ley de Hooke; T = 2π√(L/g) |
| 9 ★ | Termodinámica: calor específico, cambios de fase, primera y segunda leyes; máquinas térmicas | Q = m·c·ΔT; entropía |
| 10 | Ondas: interferencia, ondas estacionarias, efecto Doppler | Resonancia |
| 11 | Óptica: espejos, lentes, instrumentos ópticos; difracción | 1/f = 1/d₀ + 1/dᵢ |
| 12 ★ | Electrostática: ley de Coulomb, campo y potencial eléctrico | F = k·q₁q₂/r² |
| 13 | Circuitos: serie, paralelo, leyes de Kirchhoff, potencia eléctrica | P = V·I |
| 14 ★ | Electromagnetismo: campo magnético, inducción (Faraday), motores, generadores; ondas electromagnéticas (Maxwell) | Espectro electromagnético |

**Científicos clave:** Isaac Newton, Henry Cavendish, Robert Hooke, Sadi Carnot, Rudolf Clausius, Lord Kelvin, Charles-Augustin de Coulomb, André-Marie Ampère, Hans Christian Ørsted, Michael Faraday, James Clerk Maxwell, Heinrich Hertz, Christian Doppler, Thomas Young.

**Experimentos:**
- 🏠🟢 Tiro parabólico con una pelota grabada en vídeo; análisis con software gratuito de análisis de vídeo (Tracker).
- 🏠🟢 Colisiones con canicas o monedas.
- 🏠🟢 Ley de Hooke con muelles o gomas y pesos (bolsas de monedas): gráfica y pendiente.
- 🏠🟢 Péndulo: medir g con distintas longitudes.
- 🏠🟡 Calor específico: calentar agua y aceite con la misma fuente (con adulto).
- 🏠🟢 Ondas estacionarias con una cuerda; resonancia con copas de vidrio.
- 🏠🟢 Doppler con el sonido de un móvil que gira atado a una cuerda (en espacio abierto y con cuidado).
- 🏠🟢 Lupa: medir la distancia focal.
- 🏠🟢 Electroscopio casero con frasco, clip y papel de aluminio.
- 🏠🟢 Motor homopolar (pila, imán de neodimio, alambre de cobre; **los imanes de neodimio son peligrosos si se tragan: mantener lejos de niños pequeños**).
- 💻 PhET: «Movimiento de proyectiles», «Laboratorio de colisiones», «Gravedad y órbitas», «Laboratorio de Faraday», «Interferencia de ondas», «Óptica geométrica».

#### QUI2. Química intermedia (12 lecciones)

| Lección | Temas |
|---|---|
| 1 ★ | Configuración electrónica y propiedades periódicas (radio, electronegatividad, energía de ionización) |
| 2 | Enlace covalente: estructuras de Lewis, geometría molecular (RPECV), polaridad, fuerzas intermoleculares |
| 3 | Nomenclatura inorgánica (IUPAC) |
| 4 ★ | Estequiometría: mol, masa molar, reactivo limitante, rendimiento |
| 5 | Gases: leyes de Boyle, Charles, Gay-Lussac; gas ideal (PV = nRT) |
| 6 ★ | Disoluciones: molaridad, solubilidad, propiedades coligativas |
| 7 | Termoquímica: entalpía, ley de Hess, reacciones exotérmicas y endotérmicas |
| 8 | Cinética química: velocidad de reacción, factores, catalizadores |
| 9 ★ | Equilibrio químico: constante de equilibrio, principio de Le Châtelier |
| 10 ★ | Ácidos y bases cuantitativos: pH, pOH, Ka, titulación, disoluciones amortiguadoras |
| 11 | Redox y electroquímica: pilas, electrólisis, corrosión |
| 12 | Introducción a la química orgánica (grupos funcionales) y química nuclear (radiactividad, vida media, fisión y fusión) |

**Científicos clave:** Amedeo Avogadro, Gilbert N. Lewis, Linus Pauling, Henry Le Châtelier, Svante Arrhenius, Johannes Brønsted y Thomas Lowry, Fritz Haber, Michael Faraday, Marie y Pierre Curie, Lise Meitner, Friedrich Wöhler.

**Experimentos:**
- 🏠🟢 Ley de Boyle con una jeringa sin aguja; ley de Charles con un globo y agua fría o tibia.
- 🏠🟢 Velocidad de reacción: pastillas efervescentes en agua a diferentes temperaturas y tamaños de partícula.
- 🏠🟢 Reacción endotérmica: bicarbonato y ácido cítrico en agua (medir temperatura).
- 🏠🟢 Pila de limones o papas con monedas de cobre y clavos galvanizados (encender un LED).
- 🏠🟢 Titulación casera de vinagre con bicarbonato y el indicador de col lombarda.
- 🏠🟢 Propiedades coligativas: punto de congelación del agua con sal (helado casero en bolsa).
- 🧪🔴 Titulación ácido-base con bureta y fenolftaleína (laboratorio).
- 🧪🔴 Electrólisis del agua con electrodos de grafito y sulfato de sodio (laboratorio; **no usar sal común: produce cloro**).
- 💻 PhET: «Propiedades de los gases», «Concentración», «Reactivos, productos y sobrantes», «Formas de las moléculas»; simulador de vida media radiactiva.

#### BIO2. Biología intermedia (12 lecciones)

| Lección | Temas |
|---|---|
| 1 ★ | Estructura del ADN (Watson, Crick, Franklin, Wilkins) y replicación |
| 2 ★ | Expresión génica: transcripción, traducción, código genético |
| 3 | Mutaciones y regulación génica (operón lac) |
| 4 | Genética avanzada: herencia ligada al sexo, codominancia, poligenia, genética humana |
| 5 ★ | Evolución: Lamarck frente a Darwin y Wallace; selección natural |
| 6 ★ | Evidencias de la evolución: fósiles, anatomía comparada, embriología, ADN |
| 7 | Genética de poblaciones (Hardy-Weinberg), deriva y especiación |
| 8 | Origen y evolución humana |
| 9 | Fisiología vegetal: transporte, hormonas, tropismos |
| 10 | Fisiología animal comparada |
| 11 | Microbiología: bacterias, virus, antibióticos y resistencia |
| 12 | Ecología de poblaciones y comportamiento animal (etología) |

**Científicos clave:** Charles Darwin, Alfred Russel Wallace, Jean-Baptiste Lamarck, Gregor Mendel, Thomas Hunt Morgan, Rosalind Franklin, James Watson y Francis Crick, Barbara McClintock, François Jacob y Jacques Monod, Alexander Fleming, Konrad Lorenz, Jane Goodall, Lynn Margulis (endosimbiosis).

**Experimentos:**
- 🏠🟢 Modelo de ADN con caramelos o cuentas (pares de bases).
- 🏠🟢 Simulación de selección natural con «presas» de papel de colores sobre fondos distintos.
- 🏠🟢 Simulación de deriva genética con frijoles o monedas.
- 🏠🟢 Tropismos: planta en una caja con laberinto hacia la luz.
- 🏠🟢 Observación de comportamiento animal (hormigas o aves) con registro sistemático.
- 🧪🟡 Cultivo de bacterias de superficies en placas de agar (laboratorio escolar, **placas cerradas, sin abrir, eliminación por el docente**); prueba de antibióticos solo con discos de laboratorio.
- 💻 Simulador de Hardy-Weinberg; HHMI BioInteractive; PhET «Selección natural».

#### AST2. Astronomía intermedia (8 lecciones)

1. ★ Las leyes de Kepler y la gravitación de Newton aplicadas a las órbitas.
2. ★ La luz como mensajera: espectros, efecto Doppler, ley de Wien.
3. El Sol: estructura, fusión, manchas y viento solar.
4. ★ Vida y muerte de las estrellas: diagrama de Hertzsprung-Russell, enanas blancas, supernovas, estrellas de neutrones.
5. Medir distancias: paralaje, cefeidas, candelas estándar.
6. Galaxias y la Vía Láctea; ley de Hubble.
7. ★ Exoplanetas: métodos de detección (tránsito, velocidad radial).
8. Exploración espacial: cohetes, sondas, estaciones espaciales, misiones actuales.

**Científicos clave:** Kepler, Newton, Joseph von Fraunhofer, Ejnar Hertzsprung y Henry Norris Russell, Cecilia Payne-Gaposchkin, Subrahmanyan Chandrasekhar, Edwin Hubble, Michel Mayor y Didier Queloz, Konstantín Tsiolkovski.

**Experimentos:**
- 🏠🟢 Espectroscopio con un CD y una caja: comparar espectros de bombillas.
- 🏠🟢 Paralaje con el dedo y medición de distancias.
- 🏠🟢 Curva de luz de un «tránsito» con una lámpara, una bola y el sensor de luz del móvil.
- 🏠🟡 Cohete de agua con botella de plástico (al aire libre, con adulto, nunca apuntar a personas).
- 💻 Datos reales de exoplanetas de la NASA; simulador del diagrama H-R.

#### TIE2. Ciencias de la Tierra intermedia (8 lecciones)

1. ★ Tectónica de placas: bordes, expansión del fondo oceánico, evidencias.
2. Sismología: ondas sísmicas, magnitud e intensidad, localización de epicentros.
3. ★ El tiempo geológico: datación relativa y absoluta, fósiles, eras.
4. Meteorología: masas de aire, frentes, presión, tormentas, huracanes, El Niño.
5. Oceanografía: corrientes, mareas, circulación termohalina.
6. ★ Clima frente a tiempo; sistema climático y efecto invernadero.
7. Recursos naturales: agua, minerales, combustibles fósiles.
8. Riesgos naturales y su prevención (sismos, tsunamis, volcanes, inundaciones).

**Científicos clave:** Alfred Wegener, Harry Hess, Marie Tharp, Arthur Holmes, Beno Gutenberg, Vilhelm Bjerknes, Gilbert Walker, Svante Arrhenius.

**Experimentos:**
- 🏠🟢 Localizar el epicentro de un sismo real por triangulación con datos de tres estaciones.
- 🏠🟢 Línea de tiempo geológico a escala en un rollo de papel.
- 🏠🟢 Circulación termohalina: agua coloreada caliente o fría y salada.
- 🏠🟢 Efecto invernadero con dos frascos y termómetros al sol.
- 🏠🟢 Sismógrafo casero con caja, marcador y papel.
- 💻 Datos meteorológicos y sísmicos en tiempo real; simulador de tsunamis.

#### ECO2. Ecología y ambiente intermedia (7 lecciones)

1. Dinámica de poblaciones: crecimiento exponencial y logístico, capacidad de carga.
2. Interacciones: competencia, depredación, simbiosis.
3. Sucesión ecológica y biomas del mundo.
4. ★ La ciencia del cambio climático: evidencias, causas, informes del IPCC, curva de Keeling.
5. Contaminación del aire, del agua y del suelo; plásticos y microplásticos.
6. ★ Energía: fósiles, nuclear y renovables; eficiencia.
7. Conservación y sostenibilidad: áreas protegidas, economía circular.

**Científicos clave:** Charles Keeling, Rachel Carson, G. Evelyn Hutchinson, Wangari Maathai, Mario Molina (capa de ozono).

**Experimentos:**
- 🏠🟢 Curva de crecimiento de levaduras o de lentejas de agua.
- 🏠🟢 Filtro de agua con arena, grava y carbón (**el agua resultante no es potable**).
- 🏠🟢 Lluvia ácida simulada sobre tiza o plantas con vinagre diluido.
- 🏠🟢 Horno solar con caja de cartón y papel de aluminio.
- 🏠🟢 Auditoría energética del hogar (calculadora del sitio).
- 💻 Datos reales de CO₂ (Mauna Loa) y temperaturas globales (NASA y NOAA): construir la gráfica.

#### SAL2. Ciencias de la salud intermedia (8 lecciones)

1. ★ Sistema cardiovascular: corazón, presión arterial, sangre.
2. Sistema respiratorio e intercambio de gases.
3. ★ Sistema nervioso: neurona, sinapsis, cerebro (Ramón y Cajal).
4. Sistema endocrino: hormonas y homeostasis.
5. ★ Sistema inmunitario: inmunidad innata y adaptativa; cómo funcionan las vacunas.
6. Genética y salud: enfermedades hereditarias.
7. Farmacología básica: cómo actúan los medicamentos; antibióticos frente a antivirales.
8. ★ Epidemiología: transmisión, R₀, curvas epidémicas, estudios de casos y controles.

**Científicos clave:** Santiago Ramón y Cajal, Camillo Golgi, Claude Bernard, Walter Cannon, Frederick Banting, Edward Jenner, Louis Pasteur, John Snow (cólera de Londres), Katalin Karikó y Drew Weissman (vacunas de ARNm), César Milstein (anticuerpos monoclonales).

**Experimentos:**
- 🏠🟢 Tiempo de reacción y fatiga.
- 🏠🟢 Modelo de pulmón con botella y globos.
- 🏠🟢 Mapa de receptores táctiles con dos puntas (prueba de dos puntos).
- 🏠🟢 Mapa de John Snow: análisis de datos reales del brote de cólera de 1854.
- 💻 Simulador epidémico SIR (cambiar R₀, vacunación, distanciamiento).

#### DAT2. Datos y computación científica (6 lecciones)

1. ★ Estadística inferencial básica: muestra, población, margen de error.
2. Visualización de datos: elegir el gráfico correcto; gráficos engañosos.
3. Hojas de cálculo para ciencia: tablas, fórmulas, gráficas, regresión lineal.
4. Introducción a la programación científica con Python en un cuaderno en línea (sin instalación).
5. Simulaciones simples: caída libre, crecimiento poblacional, paseo aleatorio.
6. ★ Lectura crítica de estudios: tamaño de la muestra, grupo de control, valor p, reproducibilidad.

**Experimentos:**
- 💻 Analizar los datos colectivos de los experimentos de los estudiantes del sitio (tiempo de reacción, pulso).
- 💻 Programar el péndulo y comparar con los datos medidos en FUN0.

**Evaluación del Nivel 2:** quiz por módulo; **examen de Nivel 2**; **proyecto de diseño experimental** propio (pregunta, hipótesis, variables, datos, análisis estadístico, informe).

---

### Nivel 3: Avanzado

#### MAT3. Matemáticas de apoyo para el nivel avanzado (6 lecciones)

1. Funciones y límites (idea intuitiva).
2. ★ Derivadas: tasa de cambio, velocidad y aceleración.
3. ★ Integrales: área bajo la curva, trabajo y desplazamiento.
4. Ecuaciones diferenciales simples: decaimiento exponencial, oscilador.
5. Vectores y producto escalar y vectorial.
6. Números complejos y probabilidad avanzada (para la cuántica).

#### FIS3. Física avanzada (12 lecciones)

| Lección | Temas |
|---|---|
| 1 | Mecánica analítica: principio de mínima acción (conceptual) |
| 2 ★ | Relatividad especial: postulados, dilatación del tiempo, contracción de longitudes, E = mc² |
| 3 ★ | Relatividad general: equivalencia, curvatura del espacio-tiempo, GPS, lentes gravitacionales |
| 4 ★ | Crisis de la física clásica: cuerpo negro (Planck), efecto fotoeléctrico (Einstein) |
| 5 ★ | Mecánica cuántica I: dualidad onda-partícula, experimento de la doble rendija, De Broglie |
| 6 | Mecánica cuántica II: función de onda, ecuación de Schrödinger, principio de incertidumbre |
| 7 | El átomo cuántico: números cuánticos, espín, principio de exclusión |
| 8 | Entrelazamiento, desigualdades de Bell, interpretaciones |
| 9 | Física estadística: entropía de Boltzmann, temperatura microscópica |
| 10 | Física nuclear: modelo del núcleo, radiactividad, reactores, fusión |
| 11 ★ | Física de partículas: Modelo Estándar, quarks, leptones, bosón de Higgs, aceleradores |
| 12 | Física del estado sólido: bandas, semiconductores, transistores, superconductividad |

**Científicos clave:** Albert Einstein, Max Planck, Niels Bohr, Louis de Broglie, Werner Heisenberg, Erwin Schrödinger, Paul Dirac, Wolfgang Pauli, Ludwig Boltzmann, Emmy Noether, Enrico Fermi, Richard Feynman, Chien-Shiung Wu, Murray Gell-Mann, Peter Higgs, John Bell, Alain Aspect.

**Experimentos:**
- 🏠🟢 Doble rendija con un puntero láser de baja potencia y un cabello o papel de aluminio cortado (**nunca apuntar el láser a los ojos**).
- 🏠🟢 Polarización con gafas de sol y pantallas LCD.
- 🏠🟢 Medir la velocidad de la luz con un microondas y chocolate (con adulto; quitar el plato giratorio).
- 🏠🟢 Modelo de curvatura del espacio-tiempo con una tela elástica y bolas.
- 🧪🟡 Efecto fotoeléctrico y espectros de gases con tubos de descarga (laboratorio).
- 💻 PhET: «Efecto fotoeléctrico», «Interferencia cuántica», «Modelos del átomo de hidrógeno»; datos abiertos del CERN.

#### QUI3. Química avanzada (10 lecciones)

1. ★ Química cuántica: orbitales atómicos y moleculares, hibridación.
2. Química orgánica I: alcanos, alquenos, aromáticos; isomería y estereoquímica.
3. ★ Química orgánica II: mecanismos de reacción (sustitución, eliminación, adición).
4. Química orgánica III: alcoholes, ácidos carboxílicos, ésteres, aminas; síntesis.
5. Química inorgánica: compuestos de coordinación, metales de transición.
6. ★ Química analítica instrumental: espectroscopía (infrarroja, ultravioleta-visible, RMN, masas), cromatografía.
7. Fisicoquímica: energía libre de Gibbs, espontaneidad, cinética avanzada.
8. Polímeros y ciencia de materiales.
9. Bioquímica química: aminoácidos, proteínas y enzimas (puente con BIO3).
10. ★ Química verde y sostenible.

**Científicos clave:** Linus Pauling, Robert Mulliken, August Kekulé, Robert Burns Woodward, Alfred Werner, Dorothy Hodgkin, Willard Gibbs, Wallace Carothers, Ahmed Zewail, Paul Anastas y John Warner.

**Experimentos:**
- 🏠🟢 Modelos moleculares con plastilina y palillos (isómeros y quiralidad).
- 🏠🟢 Polímero de leche (caseína con vinagre) y bioplástico de almidón.
- 🏠🟢 Ésteres y aromas: identificar olores de frutas (sin síntesis en casa).
- 🧪🔴 Síntesis de aspirina o de un éster (laboratorio supervisado).
- 🧪🔴 Cromatografía en capa fina (laboratorio).
- 💻 Simuladores de espectros y visualizador molecular 3D.

#### BIO3. Biología avanzada (10 lecciones)

1. ★ Bioquímica: enzimas, cinética enzimática, metabolismo (glucólisis, ciclo de Krebs, cadena respiratoria).
2. Biología celular avanzada: señalización, ciclo celular y cáncer.
3. ★ Biotecnología I: ADN recombinante, PCR, electroforesis.
4. ★ Biotecnología II: secuenciación, CRISPR-Cas9, terapia génica, organismos modificados.
5. Genómica y bioinformática: Proyecto Genoma Humano, alineamiento de secuencias.
6. Inmunología avanzada: anticuerpos, linfocitos, inmunoterapia.
7. Neurobiología: potencial de acción, neurotransmisores, plasticidad, memoria.
8. Biología del desarrollo y células madre; evo-devo.
9. Filogenia y sistemática moderna; el árbol de la vida.
10. Ética de la biotecnología: clonación, edición genética, bioseguridad.

**Científicos clave:** Hans Krebs, Peter Mitchell, Kary Mullis, Frederick Sanger, Jennifer Doudna y Emmanuelle Charpentier, Francisco Mojica (CRISPR), Craig Venter, Shinya Yamanaka, Alan Hodgkin y Andrew Huxley, Eric Kandel, Carl Woese, Severo Ochoa.

**Experimentos:**
- 🏠🟢 Enzimas: catalasa de la papa con agua oxigenada al 3 % a distintas temperaturas (guantes y gafas).
- 🏠🟢 Electroforesis casera de colorantes alimentarios en gel de agar (corriente de pilas de 9 V).
- 💻 Laboratorio virtual de PCR y CRISPR; buscar un gen en bases de datos públicas (NCBI) y alinear secuencias (BLAST).
- 🧪🟡 Transformación bacteriana con plásmido fluorescente (kit educativo, laboratorio autorizado).

#### AST3. Astronomía avanzada y cosmología (7 lecciones)

1. ★ El Big Bang: expansión, nucleosíntesis primordial, radiación cósmica de fondo.
2. ★ Materia oscura y energía oscura: evidencias (curvas de rotación, lentes, supernovas).
3. ★ Agujeros negros: horizonte, radiación de Hawking, la primera imagen (Event Horizon Telescope).
4. Ondas gravitacionales (LIGO, 2015) y astronomía de múltiples mensajeros.
5. Formación de estructuras: cúmulos, filamentos, galaxias tempranas (telescopio James Webb).
6. Astrobiología: condiciones para la vida, zonas habitables, búsqueda de biofirmas.
7. Preguntas abiertas: inflación, multiverso, destino del universo.

**Científicos clave:** Georges Lemaître, Alexander Friedmann, Arno Penzias y Robert Wilson, Vera Rubin, Fritz Zwicky, Stephen Hawking, Roger Penrose, Andrea Ghez y Reinhard Genzel, Kip Thorne, Rainer Weiss, Saul Perlmutter, Jocelyn Bell Burnell.

**Experimentos:**
- 🏠🟢 Globo con puntos para modelar la expansión del universo.
- 💻 Análisis de la señal real de ondas gravitacionales GW150914 (datos abiertos de LIGO).
- 💻 Curvas de rotación galácticas con datos reales.
- 💻 Explorador de imágenes del telescopio James Webb.

#### TIE3. Ciencias de la Tierra avanzadas (6 lecciones)

1. Geofísica: interior terrestre por tomografía sísmica, campo magnético y paleomagnetismo.
2. Geoquímica: isótopos y datación radiométrica.
3. ★ Paleoclima: núcleos de hielo, glaciaciones, ciclos de Milankovitch.
4. ★ Modelos climáticos: cómo funcionan, escenarios y su incertidumbre.
5. Planetología comparada: Venus, Marte, Titán, Europa.
6. Ciclos biogeoquímicos globales y el Antropoceno.

**Científicos clave:** Milutin Milanković, Claude Lorius, Syukuro Manabe y Klaus Hasselmann, Clair Patterson (edad de la Tierra), Eugene Shoemaker.

**Experimentos:**
- 💻 Datos de núcleos de hielo de Vostok (CO₂ y temperatura).
- 💻 Simulador climático educativo (variar CO₂, albedo, aerosoles).
- 🏠🟢 Albedo: temperatura de superficies blancas y negras al sol.

#### SAL3. Ciencias de la salud avanzadas (5 lecciones)

1. ★ Neurociencia avanzada: sistemas sensoriales, emoción, sueño, conciencia.
2. Genética médica y medicina personalizada.
3. ★ Medicina basada en la evidencia: ensayos clínicos aleatorizados, placebo, metaanálisis.
4. Microbioma humano.
5. Salud global: enfermedades emergentes, resistencia antimicrobiana, «Una sola salud».

**Experimentos:**
- 🏠🟢 Ensayo «doble ciego» simulado entre compañeros con un placebo inocuo (agua con colorante y una prueba de memoria), para entender el diseño.
- 💻 Leer y analizar un resumen de ensayo clínico real con una plantilla de evaluación.

**Evaluación del Nivel 3:** quiz por módulo, **examen de Nivel 3** y **análisis crítico de un artículo científico** (con rúbrica).

---

### Nivel 4: Fronteras e integración

#### FRO4. Fronteras de la ciencia (12 lecciones)

1. ★ Computación cuántica: cúbits, superposición, algoritmos.
2. ★ Inteligencia artificial en la ciencia: descubrimiento de fármacos, predicción de estructuras de proteínas (AlphaFold), astronomía con datos masivos.
3. Nanotecnología y nuevos materiales (grafeno, metamateriales).
4. Energía de fusión: tokamaks, confinamiento inercial, ITER.
5. Biología sintética y vida artificial.
6. ★ El origen de la vida: experimento de Miller-Urey, mundo de ARN, fuentes hidrotermales.
7. Neurociencia de la conciencia; interfaces cerebro-computadora.
8. Sistemas complejos y caos: efecto mariposa, fractales, redes.
9. Exploración de Marte y del espacio profundo.
10. Geoingeniería y soluciones climáticas: captura de carbono y debate.
11. ★ Ética de la ciencia: integridad, conflictos de interés, bioética, ciencia abierta.
12. Comunicación científica y desinformación.

**Experimentos:**
- 💻 Programar un circuito cuántico simple en un simulador en línea gratuito.
- 💻 Explorar estructuras de proteínas predichas en la base de datos pública de AlphaFold.
- 🏠🟢 Caos con un péndulo doble (vídeo) o un grifo que gotea.
- 🏠🟢 Fractales en la naturaleza: medir la dimensión de una hoja de helecho o de una costa en un mapa.

#### PROY. Proyecto final de investigación (4 lecciones)

1. Elegir una pregunta investigable (dentro de cualquier área) y revisar la literatura.
2. Diseñar el método: variables, controles, materiales, seguridad (revisada con lista de verificación).
3. Recoger y analizar datos (con las herramientas de DAT2).
4. Comunicar: informe científico (IMRyD), póster digital y vídeo de 3–5 minutos.

**Ejemplos de proyectos:** ¿afecta la música al crecimiento de las plantas?; contaminación lumínica de mi ciudad; calidad del agua de un río local con kits seguros; eficiencia de distintos aislantes térmicos; biodiversidad de insectos en dos zonas; análisis de datos climáticos de mi región.

---

## 4. El sitio web: navegación y estructura de páginas

### 4.1 Mapa del sitio y URLs (solo en español)

```
/                                   Inicio
/curso                              Mapa del curso (matriz de áreas × niveles)
/niveles/[n]                        Página de nivel (0–4)
/areas/[area]                       Página de área (p. ej., /areas/fisica)
/modulos/[modulo]                   Página de módulo (p. ej., /modulos/fisica-1)
/modulos/[modulo]/[leccion]         Lección
/modulos/[modulo]/quiz              Quiz de módulo
/examenes/nivel-[n]                 Examen de nivel
/experimentos                       Catálogo de experimentos (filtros)
/experimentos/[slug]                Ficha de experimento
/simulaciones                       Laboratorio virtual (catálogo de simulaciones)
/cientificos                        Índice de científicos
/cientificos/[slug]                 Ficha de científico
/tabla-periodica                    Tabla periódica interactiva
/formulas                           Formulario por área
/herramientas                       Calculadoras y conversor de unidades
/glosario, /glosario/[termino]      Glosario
/linea-de-tiempo                    Línea de tiempo de descubrimientos
/rutas, /rutas/[ruta]               Rutas de aprendizaje
/proyecto-final                     Guía y entrega del proyecto
/mi-progreso                        Panel de progreso
/mi-cuaderno                        Cuaderno de laboratorio digital y notas
/logros                             Insignias y certificados
/recursos                           Recursos sugeridos
/docentes                           Guía docente
/seguridad                          Normas de seguridad (página permanente)
/buscar · /acerca · /ayuda · /accesibilidad · /privacidad · /contacto
```

### 4.2 Navegación global

- **Cabecera fija:** logo · Curso · Experimentos · Laboratorio virtual · Herramientas (tabla periódica, formulario, conversor) · Glosario · buscador · Mi progreso · tema claro u oscuro.
- **Migas de pan:** Curso › Nivel 2 › Química › QUI2 › Lección 6.
- **Barra lateral de módulo** con el estado de cada lección y el quiz.
- **Navegación de lección:** anterior, siguiente y volver al módulo.
- **Móvil:** menú hamburguesa y barra inferior (Curso · Experimentos · Buscar · Mi progreso).
- **Pie:** seguridad, licencias, créditos de imágenes y simulaciones, accesibilidad, contacto.
- **Búsqueda global** en lecciones, experimentos, científicos, términos y fórmulas, con filtros por área y nivel.

### 4.3 Estructura de cada tipo de página

**Inicio:** hero con «Empezar» o «Continuar»; «Pregunta del día» científica; imagen astronómica del día; matriz de áreas en miniatura; experimento destacado de la semana; rutas sugeridas.

**Mapa del curso (`/curso`):** matriz interactiva con las áreas en columnas y los niveles en filas. Cada celda es un módulo con su color de área, número de lecciones, porcentaje completado y estado (bloqueado, disponible, en curso, completado). Las dependencias se muestran como flechas al pasar el cursor.

**Página de área:** descripción del área, recorrido de niveles, científicos destacados, experimentos estrella y preguntas frecuentes.

**Página de nivel:** objetivos (§2), módulos del nivel, horas y requisitos del examen de nivel.

**Página de módulo:** cabecera con color e icono de área; ficha (nivel, lecciones, horas, prerrequisitos); contexto histórico; índice de lecciones; experimentos del módulo; científicos; quiz; módulos relacionados.

**Lección:** plantilla de §1.3, con:
- Fórmulas renderizadas con notación matemática correcta y legible.
- Símbolos con información emergente (al tocar «v» aparece «velocidad, en m/s»).
- Diagramas y animaciones; simulaciones incrustadas cuando las haya.
- Ejercicios con respuesta numérica (con tolerancia y control de unidades) y soluciones paso a paso desplegables.
- Botones: añadir nota, guardar fórmula al formulario personal, marcar como completada.

**Ficha de experimento:** cabecera con iconos de lugar, seguridad, duración y dificultad; objetivo; pregunta e hipótesis; materiales (lista marcable); procedimiento con fotos o vídeo por paso; tabla de datos editable que se guarda en Mi cuaderno; gráfica automática a partir de los datos; preguntas de análisis; explicación científica; variaciones; seguridad y residuos; «Comparte tus datos» (datos anónimos agregados de la comunidad, para experimentos colectivos como el de Eratóstenes o el tiempo de reacción).

**Catálogo de experimentos:** filtros por área, nivel, lugar (casa, laboratorio, virtual), seguridad, duración y materiales disponibles («tengo vinagre y bicarbonato» → resultados).

**Laboratorio virtual:** catálogo de simulaciones (propias y externas enlazadas), cada una con una guía de actividad.

**Ficha de científico:** nombre, fechas, país, área; biografía (250 palabras); descubrimientos clave; experimento famoso; cita; lecciones donde aparece; ubicación en la línea de tiempo. Se cuida la diversidad (mujeres científicas, ciencia hispanohablante y no europea).

**Tabla periódica interactiva:** cada elemento con número y masa atómica, configuración electrónica, propiedades, usos, historia de su descubrimiento; vistas por familia, estado, electronegatividad, radio.

**Formulario:** fórmulas por área y nivel con significado de cada símbolo, unidades y enlace a la lección. Formulario personal del estudiante.

**Herramientas:** conversor de unidades, calculadora científica, calculadora de masa molar, cuadro de Punnett, calculadora de escala del sistema solar, calculadora de huella energética, graficador de datos.

**Línea de tiempo:** descubrimientos desde la Antigüedad hasta hoy, con carriles por área y filtros.

**Seguridad (`/seguridad`):** normas generales, pictogramas, primeros auxilios básicos, combinaciones peligrosas que nunca deben hacerse, qué experimentos nunca se hacen en casa. Se enlaza desde cada experimento 🟡 o 🔴.

**Mi cuaderno:** cuaderno de laboratorio digital (fecha, experimento, hipótesis, datos, gráficas, conclusiones), notas por lección, formulario personal; exportación a PDF.

**Docentes:** planificación por semanas, alineación con programas escolares, lista de materiales por experimento, rúbricas, panel de grupo opcional.

### 4.4 Diseño visual y accesibilidad

- Un color e icono por área: física (azul, átomo), química (naranja, matraz), biología (verde, célula), astronomía (violeta, planeta), Tierra (marrón, montaña), ecología (verde claro, hoja), salud (rojo, corazón), datos (gris, gráfica), fronteras (dorado, estrella).
- Diagramas claros, coherentes y accesibles; no depender solo del color.
- Fórmulas legibles y accesibles para lectores de pantalla.
- WCAG 2.2 AA; modo claro y oscuro; tamaño de letra ajustable; subtítulos en todos los vídeos.
- Fotos de procedimiento reales para los experimentos.
- Diseño adaptable (móvil primero), porque muchos experimentos se hacen con el móvil en la mano.

---

## 5. Seguimiento del progreso

| Unidad | Estados | Criterio de completado |
|---|---|---|
| Lección | sin empezar → en curso → completada → dominada | Contenido leído + ejercicios intentados + mini-quiz ≥ 60 %. Dominada: mini-quiz al 100 % y ejercicios correctos |
| Experimento | pendiente → realizado → informado | Realizado: datos registrados en el cuaderno. Informado: preguntas de análisis respondidas |
| Módulo | bloqueado → disponible → en curso → completado | Lecciones completadas + al menos 1 experimento realizado + quiz de módulo ≥ 70 % |
| Nivel | bloqueado → disponible → completado → certificado | Módulos completados (o los de la ruta elegida) + examen de nivel ≥ 70 % |
| Curso | — → finalizado → certificado final | Niveles 0–4 + proyecto final aprobado |

**Indicadores:** porcentaje global; progreso por área (gráfica de radar con las 9 áreas); matriz del curso coloreada; experimentos realizados; tiempo de estudio; racha diaria; puntos (lección +10, experimento +20, quiz de módulo +50, examen de nivel +150, proyecto +500); temas débiles detectados por los quizzes.

**Insignias (ejemplos):** Medidor de la Tierra (experimento de Eratóstenes) · Pequeño Newton (completar FIS1) · Indicador natural (col lombarda) · Doble hélice (extraer ADN) · Cazador de exoplanetas · Sismólogo (localizar un epicentro) · Científico ciudadano (compartir datos 5 veces) · Laboratorio seguro (completar FUN0.4) · Cuántico (completar FIS3) · Investigador (proyecto final).

**Repaso:** tarjetas de repaso espaciado de conceptos y fórmulas; bancos de ejercicios adicionales por tema.

**Persistencia:** uso sin cuenta con progreso guardado en el navegador; cuenta opcional para sincronizar, obtener certificados y unirse a un grupo docente. Datos mínimos; borrado a petición. Los datos compartidos en experimentos colectivos son anónimos.

---

## 6. Quizzes y evaluaciones

| Evaluación | Formato | Aprobación | Intentos |
|---|---|---|---|
| Mini-quiz de lección | 5 preguntas | ≥ 60 % | Ilimitados |
| Quiz de módulo | 15–20 preguntas al azar de un banco de 40 o más | ≥ 70 % | 3 por cada 24 h |
| Examen de nivel | 40 preguntas + 3 problemas de desarrollo + 1 interpretación de datos (90–120 min) | ≥ 70 % | 2 por semana |
| Informe de experimento (niveles 0–1) | Informe con rúbrica | ≥ 60 % | Reentrega |
| Proyecto de diseño experimental (nivel 2) | Informe completo | ≥ 70 % | Reentrega |
| Análisis de artículo (nivel 3) | Plantilla de análisis crítico | ≥ 70 % | Reentrega |
| Proyecto final (nivel 4) | Informe IMRyD + póster + vídeo | ≥ 70 % | Reentrega |

**Tipos de pregunta:** opción múltiple · verdadero o falso con justificación · **respuesta numérica** (con tolerancia relativa y verificación de unidades) · problema por pasos (cada paso puntúa) · emparejar (científico ↔ descubrimiento, órgano ↔ función) · ordenar (etapas de la mitosis, ciclo de las rocas) · etiquetar diagramas (partes de la célula, del corazón, de un circuito) · interpretar gráficas y tablas de datos · predecir el resultado de un experimento · detectar el error en un razonamiento o en un diseño experimental · equilibrar ecuaciones químicas (interactivo).

Cada pregunta guarda: enunciado, datos, respuesta, tolerancia, unidades, explicación paso a paso, dificultad, área, módulo, lección y errores frecuentes asociados (para dar retroalimentación específica: si el estudiante confunde masa y peso, el mensaje lo explica).

**Ejemplos:**
- *(Numérica, FIS1)* Un ciclista recorre 18 km en 45 min. ¿Velocidad media en m/s? → 6,67 m/s (tolerancia del 2 %).
- *(Predicción, FIS1)* Se sueltan a la vez una pelota de tenis y una de golf desde 1 m. ¿Cuál llega antes? → Prácticamente a la vez; la resistencia del aire es despreciable a esa altura.
- *(Ecuación, QUI1)* Ajustar: CH₄ + O₂ → CO₂ + H₂O → CH₄ + 2 O₂ → CO₂ + 2 H₂O.
- *(Gráfica, ECO2)* Ver la curva de Keeling y explicar los «dientes» anuales (fotosíntesis estacional del hemisferio norte).
- *(Diseño, FUN0)* Un estudiante prueba un fertilizante en una planta junto a la ventana y compara con otra en la sombra. ¿Qué error tiene el diseño? → Dos variables cambian a la vez (fertilizante y luz).

**Rúbrica del informe científico:** pregunta e hipótesis (15 %) · método y control de variables (20 %) · datos y presentación (20 %) · análisis (20 %) · conclusiones y limitaciones (15 %) · seguridad y comunicación (10 %).

**Calificación final:** quizzes de módulo 25 % · exámenes de nivel 35 % · experimentos e informes 15 % · proyecto final 25 %.

**Certificados:** por nivel (Propedéutica, Básico, Intermedio, Avanzado, Fronteras) y por área completa (p. ej., «Física: Niveles 1–3»), más el certificado final; con código de verificación, horas y mención.

---

## 7. Recursos sugeridos (en español o con versión en español)

**Libros de texto:**
- OpenStax (libres y gratuitos, con versiones en español): *Física universitaria*, *Química 2e*, *Biología 2e*, *Astronomía* (comprobar disponibilidad de cada edición en español).
- Paul G. Hewitt, *Física conceptual* (Pearson).
- Raymond Chang, *Química* (McGraw-Hill).
- Campbell, Urry y otros, *Biología* (Panamericana).
- Serway y Jewett, *Física para ciencias e ingeniería*; Tipler y Mosca, *Física*.
- Tarbuck y Lutgens, *Ciencias de la Tierra* (Pearson).
- Guyton y Hall, *Tratado de fisiología médica* (nivel avanzado).

**Divulgación:**
- Carl Sagan, *Cosmos* y *El mundo y sus demonios*.
- Stephen Hawking, *Breve historia del tiempo*.
- Bill Bryson, *Una breve historia de casi todo*.
- Richard Feynman, *Seis piezas fáciles* y *¿Está usted de broma, Sr. Feynman?*
- Siddhartha Mukherjee, *El gen*.
- Richard Dawkins, *El gen egoísta*.
- Oliver Sacks, *El hombre que confundió a su mujer con un sombrero*.
- Rachel Carson, *Primavera silenciosa*.
- Javier Santaolalla, *El bosón de Higgs no te va a hacer la cama*.
- José Manuel Sánchez Ron, *El poder de la ciencia*.

**Plataformas y simulaciones:** PhET (Universidad de Colorado, en español); Khan Academy en español; HHMI BioInteractive; Stellarium; Tracker (análisis de vídeo); GeoGebra; cuadernos de Python en línea; bases de datos públicas (NASA, NOAA, Servicio Geológico de EE. UU., NCBI, CERN Open Data, LIGO Open Science Center).

**Vídeo y pódcast en español:** canales de divulgación como *QuantumFracture*, *Date un Vlog*, *CienciaDeSofá*, *La Gata de Schrödinger*, *Derivando* (matemáticas); documentales: *Cosmos* (Sagan y Tyson), *Planeta Tierra* (BBC).

**Ciencia ciudadana:** iNaturalist (biodiversidad), Globe at Night (contaminación lumínica), Zooniverse (galaxias, fauna y más), GLOBE Program (clima y ambiente).

**Instituciones:** museos de ciencia del mundo hispanohablante, agencias espaciales (NASA, ESA, CONAE, AEM), observatorios (ESO, Instituto de Astrofísica de Canarias), servicios meteorológicos y sismológicos nacionales.

---

## 8. Modelo de contenido (para construir el sitio)

| Entidad | Campos principales |
|---|---|
| **Área** | id, nombre, color, icono, descripción, módulos[] |
| **Nivel** | número (0–4), nombre, objetivos[], horas, módulos[], examen |
| **Módulo** | id/slug, área, nivel, nombre, contexto histórico, prerrequisitos[], lecciones[], experimentos[], científicos[], quiz |
| **Lección** | id/slug, módulo, orden, título, esencial, duración, objetivos[], conocimientos previos[], pregunta disparadora, cuerpo, fórmulas[], ejemplos resueltos[], experimento o simulación, historia, aplicaciones, errores frecuentes[], ejercicios[], mini-quiz, recursos[], etiquetas transversales[] |
| **Experimento** | slug, título, área, nivel, lugar (casa, laboratorio, virtual), seguridad (verde, amarillo, rojo), duración, dificultad, objetivo, hipótesis guiada, materiales[], pasos[] (texto e imagen), tabla de datos (columnas y unidades), tipo de gráfica, preguntas de análisis[], explicación, variaciones[], seguridad[], residuos, colectivo (sí/no) |
| **Simulación** | slug, título, fuente (propia o externa), enlace, guía de actividad, lecciones[] |
| **Científico** | slug, nombre, fechas, país, áreas[], biografía, descubrimientos[], cita, imagen y créditos, lecciones[] |
| **Elemento químico** | número, símbolo, nombre, masa, configuración, grupo, periodo, familia, estado, propiedades, usos, descubrimiento |
| **Fórmula** | id, expresión, símbolos[] {símbolo, significado, unidad}, área, nivel, lección |
| **Término** | slug, término, definición breve y extensa, área, relacionados[], lecciones[] |
| **Descubrimiento** (línea de tiempo) | fecha, título, científico(s), área, descripción |
| **Pregunta** | id, tipo, enunciado, datos, opciones[], respuesta, tolerancia, unidades, explicación, errores frecuentes[], dificultad, área, módulo, lección |
| **Quiz / Examen** | ámbito, número de preguntas, banco[], umbral, tiempo, intentos |
| **Insignia** | id, nombre, icono, condición |
| **Progreso del usuario** | lecciones, experimentos (datos registrados), quizzes, puntos, racha, insignias, cuaderno, formulario personal, tarjetas |

**Volumen estimado:** 30 módulos · 241 lecciones · ≈ 200 experimentos (≈ 140 en casa, ≈ 25 de laboratorio, ≈ 35 virtuales) · ≈ 150 fichas de científicos · 118 elementos · ≈ 300 fórmulas · ≈ 800 términos · ≈ 1 200 mini-preguntas · ≈ 1 200 preguntas de banco · ≈ 1 000 ejercicios.

---

## 9. Fases sugeridas para la construcción posterior

1. **Fase 1, base:** navegación, plantillas (lección, módulo, experimento), Nivel 0 completo, FIS1 y QUI1, mini-quizzes con respuesta numérica, progreso local, página de seguridad, conversor de unidades.
2. **Fase 2, Nivel 1 completo:** resto de módulos del Nivel 1, catálogo de experimentos con filtros, cuaderno de laboratorio, tabla periódica interactiva, glosario y fichas de científicos.
3. **Fase 3, Nivel 2:** módulos intermedios, laboratorio virtual, formulario, herramientas, experimentos colectivos con datos compartidos.
4. **Fase 4, Niveles 3 y 4:** módulos avanzados, MAT3, fronteras, proyecto final.
5. **Fase 5, evaluación y comunidad:** exámenes de nivel, certificados, insignias, repaso espaciado, panel docente.

---

## 10. Verificación del plan (criterios de aceptación)

- [ ] Están todas las áreas pedidas (física, química, biología, astronomía, ciencias de la Tierra) más las añadidas (fundamentos, ecología y ambiente, salud, datos, fronteras).
- [ ] Cada módulo tiene: contexto histórico, temas por lección, científicos clave, conceptos o fórmulas, experimentos con ficha de seguridad y evaluación.
- [ ] El orden va de lo básico a lo avanzado y las dependencias (§1.5) son coherentes.
- [ ] Cada nivel tiene objetivos medibles (§2) y un examen que los evalúa (§6).
- [ ] **Seguridad:** ningún experimento 🔴 aparece como realizable en casa; todos los 🟡 indican supervisión adulta; la página de seguridad cubre las combinaciones peligrosas.
- [ ] Todas las páginas del mapa del sitio (§4.1) tienen estructura definida (§4.3).
- [ ] Las reglas de progreso, insignias y certificados (§5–6) son completas y sin contradicciones.
- [ ] Todo el contenido está en español (sin versión en inglés), con SI y coma decimal.
- [ ] Revisión por especialistas de cada área (datos, fórmulas, fechas y atribuciones) y por un responsable de seguridad de laboratorio antes de publicar.
- [ ] Prueba con 3–5 estudiantes por nivel en la Fase 1 (comprensión, duración real, experimentos reproducibles con materiales comunes).
