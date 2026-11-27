# Plan 7: curso web «Cómo dejar de tener miedo y hablar sin temor: en negocios y en otras áreas de la vida»

> Documento de planificación. Solo en español. No incluye código.
> Estado: **aprobado y construido** en `sitios/hablar-sin-miedo/` (rama `hablar-sin-miedo`). Cifras finales: 63 lecciones, 37,6 h de lecciones y quizzes + ≈ 13 h de práctica (≈ 50 h), 343 preguntas, 97 términos, 8 simuladores (el de objeciones de venta se integró en «Negociar un precio»).
> Carpeta: `sitios/hablar-sin-miedo/` · Rama: `hablar-sin-miedo` (nueva, desde `main`, **sin fusionar a main**).

---

## 0. Contexto y principios

**Necesidad.** Un curso extenso en español para dejar de tener miedo a hablar: en público, en el trabajo y los negocios (vender, negociar, pedir un aumento, poner precio, liderar reuniones), con desconocidos y en conversaciones difíciles. Debe incluir historias reales de personas que lo lograron, con lo que hicieron paso a paso, y técnicas con evidencia.

**Público.** Hispanohablantes desde los 16 años: estudiantes, empleados, emprendedores, vendedores, personas tímidas o introvertidas, y quien quiera hablar con más confianza.

**Lo que se revisó del repositorio (para seguir el mismo patrón):**
- Los 6 sitios de `sitios/` son webs estáticas sin dependencias que se abren con `index.html` sin servidor ni internet: `index.html` + `styles.css` + `app.js` + varios `data-*.js` que definen `window.X`.
- El modelo más cercano es **`sitios/manipulacion/`** (el más reciente): enrutado por hash (`#/curso/1/3`), helper `store` con `localStorage` dentro de `try/catch`, migas de pan, buscador en la cabecera, botón de tema ☾ con `data-theme` y `prefers-color-scheme`, menú hamburguesa y barra inferior en el móvil, curso de 5 niveles con caso práctico + mini-quiz de 5 preguntas (≥ 60 %), examen de nivel (≥ 70 %), insignias y certificado imprimible (`window.print()`).
- `sitios/personas-poderosas/` aporta el **buscador con recuadro de respuesta** (`data-busqueda.js`).
- Los planes anteriores (`planes/plan-1-4-5-6.md`, `plan-2`, `plan-3`) usan: contexto y principios, estructura en tabla, plantilla fija de lección, contenido por módulo, mapa de URLs, progreso, quizzes, recursos, modelo de contenido, fases y criterios de aceptación. Este plan sigue ese formato.
- Los README piden indicar qué falta. En los sitios 1–3 faltó el texto largo de cada lección; **aquí el texto de cada lección se escribe completo**.

**Principios editoriales (obligatorios):**
1. **Nada inventado.** Las historias reales solo usan hechos documentados (autobiografías, entrevistas, prensa seria), cada una con sus fuentes. Si las fuentes no coinciden, se dice (p. ej., la fecha del certificado de Buffett, el número de canciones que olvidó Streisand). Los ejemplos de «personas comunes» que no salen de una fuente se marcan como **«Caso ilustrativo (ficticio)»**.
2. **Evidencia con su grado de certeza.** Cada técnica lleva una etiqueta: **Sólida** (muchos estudios y metaanálisis), **Prometedora** (pocos estudios o réplicas parciales) o **Mito o exagerada**. Ejemplos: exposición gradual = sólida; reencuadre «estoy emocionado» = prometedora (una réplica de 2025 no encontró mejora en la charla); «93 % de la comunicación es no verbal» y los efectos hormonales de las «posturas de poder» = mito o exagerada.
3. **Salud.** El curso es educativo y no sustituye a la terapia. Una página «Cuándo pedir ayuda» explica el trastorno de ansiedad social, la terapia cognitivo-conductual y que los fármacos (p. ej., betabloqueantes) solo los receta un médico. La **tartamudez** se trata con respeto: es una condición del habla, no un fallo de confianza; las historias de personas que tartamudean no prometen «curas» (Biden dice que todavía le pasa cuando está muy cansado).
4. **Práctica antes que teoría.** Cada lección termina con un ejercicio y un reto que se hace en la vida real.
5. **Ética.** En negociación y ventas: influir con información verdadera y respeto (se enlaza la idea de persuasión frente a manipulación del sitio 6).

---

## 1. Estructura general

### 1.1 Niveles y módulos

| Nivel | Módulo | Lecciones | Duración |
|---|---|---|---|
| 1 Base | **M1** Entender el miedo | 8 | 4 h 45 min |
| 1 Base | **M2** Confianza y autoestima | 8 | 4 h 25 min |
| 2 Hablar | **M3** Hablar en público | 10 | 6 h 15 min |
| 2 Hablar | **M4** Hablar en negocios | 10 | 6 h 15 min |
| 3 Situaciones | **M5** Desconocidos y situaciones difíciles | 9 | 5 h 15 min |
| 4 Modelos | **M6** Historias reales: qué hicieron paso a paso | 11 | 5 h 55 min |
| 5 Práctica | **M7** Práctica diaria, reto de 30 días, prácticas guiadas y glosario | 7 | 12 h 35 min |
| — | Examen final y proyecto | — | 45 min |
| **Total** | **7 módulos en 5 niveles** | **63 lecciones** | **≈ 46 horas** |

Desglose: ≈ 33 h de lecciones y quizzes + ≈ 13 h de práctica (reto de 30 días a ≈ 15 min/día, prácticas guiadas, simulador y proyecto final).
Ritmo sugerido: 1 lección al día + la rutina diaria → el curso dura unas 9–10 semanas; el reto de 30 días puede empezar en paralelo desde la lección 1.8.

### 1.2 Plantilla fija de cada lección

1. **Situación inicial** (una escena real o ilustrativa: «Te toca presentarte en la reunión y notas el corazón en la garganta…»).
2. **Objetivos** (2–3, medibles).
3. **Explicación** completa (700–1 200 palabras) con subtítulos.
4. **Recuadro «La idea clave»** y **etiqueta de evidencia** (sólida / prometedora / mito).
5. **Ejemplo real** (persona o estudio, con fuente).
6. **Paso a paso** (técnica en pasos numerados).
7. **Errores frecuentes.**
8. **Ejercicio práctico** (por escrito o en voz alta, con plantilla o herramienta interactiva).
9. **Reto de la vida real** (versión fácil y versión difícil).
10. **Caso práctico** («¿qué harías?», con 3 opciones y explicación).
11. **Mini-quiz** de 5 preguntas con explicación de cada respuesta (aprobado ≥ 60 %).
12. **Para saber más** (libro, estudio o charla).
13. Ficha: duración, materiales y lecciones relacionadas.

Materiales que se repiten: cuaderno o el «Diario» del sitio, móvil para grabarse (o la grabadora del sitio), temporizador del sitio, a veces una persona de confianza.

### 1.3 Evaluación

- **Mini-quiz por lección:** 5 preguntas (opción múltiple, verdadero o falso, «¿qué técnica es?»), ≥ 60 %.
- **Caso práctico por lección:** 1 situación con explicación.
- **Quiz de módulo:** 12 preguntas al azar de un banco del módulo (≈ 20 por módulo), ≥ 70 %; si fallas, las preguntas cambian.
- **Examen final:** 30 preguntas de todo el curso, ≥ 75 %.
- **Proyecto final** (autoevaluado con rúbrica): charla grabada de 5 minutos **o** negociación o conversación difícil real, más reflexión escrita.
- **Certificado** imprimible al aprobar los 7 quizzes de módulo y el examen final.
- **Banco total:** ≈ 315 preguntas de lección + ≈ 140 de módulo + casos → **≈ 450 preguntas**.

### 1.4 Rutas

- **Completa** (por defecto): M1 → M7.
- **Exprés «Tengo una presentación en 7 días»:** 1.2, 1.5, 2.3, 3.1, 3.2, 3.7, 3.8, 3.9, 3.10 + prácticas guiadas 1, 3 y 8.
- **Negocios:** M1 (1.1, 1.5, 1.6), M2 (2.2, 2.3), M4 completo, 5.3, 5.4, 5.6, historias 6.1 y 6.9.
- **Timidez social:** M1, M2, M5, 6.2, 6.10 y el reto de 30 días.
- Modo libre: todo abierto, sin bloqueos; el certificado requiere los quizzes.

---

## 2. Objetivos generales por nivel

- **Nivel 1 (Base):** explicar qué es el miedo a hablar y qué lo mantiene; medir tu propio miedo; cambiar el diálogo interno; empezar a construir pruebas de confianza.
- **Nivel 2 (Hablar):** preparar, estructurar, ensayar y dar una charla de 5 minutos; usar voz y cuerpo; recuperarte de un error; presentar, vender, negociar y pedir en el trabajo.
- **Nivel 3 (Situaciones):** iniciar conversaciones con desconocidos, decir que no, poner límites, tener conversaciones difíciles, recibir críticas y hablar por teléfono y por video.
- **Nivel 4 (Modelos):** analizar cómo personas reales superaron el miedo y extraer pasos que puedas copiar.
- **Nivel 5 (Práctica):** aplicar la exposición gradual con una escalera personal y completar el reto de 30 días.

---

## 3. Contenido por módulo y lección

Formato por lección: **Objetivos · Temas · Ejemplo real · Ejercicio · Reto · Actividad interactiva · Duración · Materiales · Evaluación**. Si no se indica otra cosa, la evaluación es el mini-quiz de 5 preguntas + el caso práctico.

### M1. Entender el miedo (Nivel 1 · 8 lecciones · 4 h 45 min)

Objetivo del módulo: entender qué es el miedo a hablar, por qué aparece y qué lo mantiene, y hacer tu propio mapa del miedo.

**1.1 ¿Qué es el miedo a hablar?** (30 min)
- Objetivos: diferenciar nervios normales, glosofobia (miedo a hablar en público), timidez, introversión y trastorno de ansiedad social.
- Temas: definiciones; por qué es tan común; la introversión no es timidez (Susan Cain); el miedo no indica falta de capacidad.
- Ejemplo real: Warren Buffett, que tenía tanto miedo que pagó un curso de Dale Carnegie y canceló el cheque (se amplía en 6.1).
- Ejercicio: «Mi historia con el miedo» (3 situaciones en las que evitaste hablar y qué te costó).
- Reto: decir en voz alta a una persona de confianza «a veces me pongo nervioso al hablar».
- Actividad: test de autoevaluación de 12 ítems (orientativo y propio del sitio, **no diagnóstico**).
- Materiales: Diario.

**1.2 El cuerpo en alerta** (30 min)
- Objetivos: explicar la respuesta de lucha, huida o congelación; reconocer los síntomas (corazón acelerado, temblor, boca seca, voz temblorosa, mente en blanco) como respuestas normales y no peligrosas.
- Temas: sistema nervioso simpático y parasimpático; adrenalina; por qué la mente se queda en blanco (el estrés agudo afecta a la memoria de trabajo); el pico de ansiedad suele estar en el primer minuto y luego baja.
- Ejemplo real: estudio de Jamieson y otros (2012): reinterpretar la activación como útil mejoró la respuesta cardiovascular ante una prueba de estrés social.
- Ejercicio: lista de tus síntomas y frase alternativa para cada uno («Mi corazón se acelera para darme energía»).
- Reto: provocar tu activación (subir escaleras) y observar que baja sola en minutos.
- Actividad: práctica guiada 1 (respiración diafragmática) por primera vez.

**1.3 ¿Por qué aparece el miedo?** (30 min)
- Objetivos: identificar los orígenes del miedo: evolución (el rechazo del grupo era peligroso), temperamento, experiencias de burla o humillación, modelos familiares, falta de práctica.
- Temas: aprendizaje del miedo por experiencia directa, por observación y por lo que nos cuentan.
- Ejemplo real: James Earl Jones dejó de hablar casi por completo en la escuela por la vergüenza de su tartamudez (6.3).
- Ejercicio: línea de vida del miedo (momentos clave).
- Reto: identificar una creencia que heredaste («hablar de dinero es de mala educación»).

**1.4 Tipos de miedo al hablar** (35 min)
- Objetivos: clasificar tu miedo: hablar en público, ante la autoridad (jefes, clientes), con desconocidos, por teléfono, pedir (precio, aumento, favor), conflicto y crítica, otro idioma o acento, grupos y fiestas.
- Temas: cada tipo y la lección del curso que lo trata.
- Ejemplo: Barbra Streisand: miedo escénico tras olvidar letras en Central Park (1967) que la alejó de los conciertos unos 27 años; el miedo puede ser muy específico (6.10).
- Ejercicio: ranking personal de las 8 situaciones del 0 al 10.
- Actividad: el ranking se guarda y alimenta la escalera de exposición de M7.

**1.5 El miedo al juicio y al rechazo** (35 min)
- Objetivos: explicar el efecto foco y la ilusión de transparencia y aplicarlos a tus nervios.
- Temas: Gilovich, Medvec y Savitsky (2000): quienes llevaban una camiseta de Barry Manilow sobrestimaron cuánta gente se fijó. Savitsky y Gilovich (2003): los oradores creen que su nerviosismo se nota más de lo que se nota; a quienes se les explicó este efecto dieron charlas mejor valoradas (una réplica posterior matiza el efecto). El rechazo duele, pero es temporal y casi nunca es tan grave como imaginamos.
- Ejemplo real: Jia Jiang y sus 100 días de rechazo (6.9).
- Ejercicio: «¿Qué es lo peor, lo más probable y lo mejor que puede pasar?».
- Reto: llevar una prenda llamativa un día y contar cuántas personas lo comentan.

**1.6 Cómo se mantiene el miedo** (35 min)
- Objetivos: identificar la evitación, las conductas de seguridad, la atención puesta en uno mismo y la rumiación (modelo de Clark y Wells, 1995).
- Temas: por qué evitar alivia hoy y aumenta el miedo mañana; conductas de seguridad (leer todo, no mirar a nadie, hablar rápido para terminar); el «análisis post mortem» que hacemos después.
- Ejemplo: en la terapia basada en este modelo, ver el video de tu propia charla suele corregir la imagen negativa que tienes de ti (evidencia mixta: funciona mejor con una conversación después de verlo).
- Ejercicio: registro de tus 5 conductas de seguridad y cuál soltarás primero.
- Reto: una conversación sin tu conducta de seguridad principal.

**1.7 Mitos sobre hablar en público** (30 min)
- Objetivos: separar mitos de evidencia.
- Mitos: «el 93 % de la comunicación es no verbal» (Mehrabian solo estudió sentimientos y actitudes con mensajes contradictorios); «los buenos oradores no sienten miedo»; «hay que calmarse antes de hablar» (Brooks, 2014: reencuadrar como emoción fue mejor que intentar calmarse, con una réplica parcial en 2025); «las posturas de poder cambian tus hormonas» (no replicado; sí se repite un pequeño efecto en cómo te sientes); «imagina al público en ropa interior»; «el miedo a hablar es mayor que el miedo a la muerte» (de encuestas antiguas mal citadas).
- Actividad: juego «¿Mito o evidencia?» con 15 afirmaciones.

**1.8 Tu mapa del miedo y cuándo pedir ayuda** (40 min)
- Objetivos: medir tu miedo con la escala de 0 a 100 (SUDS); hacer tu mapa personal; saber cuándo consultar a un profesional (si el miedo te impide trabajar o estudiar, aparecen ataques de pánico o lleva meses limitándote).
- Temas: terapia cognitivo-conductual y exposición (tratamiento con evidencia sólida para la ansiedad social); exposición con realidad virtual (metaanálisis con efecto grande, parecido a la exposición en vivo); grupos como Toastmasters (fundado en 1924 en el YMCA de Santa Ana, California, por Ralph Smedley).
- Ejercicio: completar el mapa del miedo (situaciones + SUDS + conductas de seguridad + objetivo a 90 días).
- Actividad: herramienta «Mi mapa del miedo» (se guarda en el navegador).
- **Quiz del módulo M1** (12 preguntas, 20 min).

### M2. Confianza y autoestima (Nivel 1 · 8 lecciones · 4 h 25 min)

Objetivo del módulo: construir confianza con pruebas y cambiar el diálogo interno.

**2.1 La confianza no es no tener miedo** (30 min)
- Objetivos: explicar la autoeficacia (Bandura, 1977) y sus 4 fuentes: logros propios, ver a otros parecidos a ti, ánimo de otros, y cómo interpretas tu estado físico.
- Ejemplo real: Buffett no perdió el miedo antes de hablar: se apuntó al curso y luego dio clases nocturnas en la Universidad de Omaha para obligarse a practicar.
- Ejercicio: lista de 10 logros pequeños de comunicación que ya tienes.
- Reto: anotar cada noche una «prueba» de que puedes hablar.
- Actividad: «Diario de victorias» (contador y racha).

**2.2 Creencias limitantes** (35 min)
- Objetivos: detectar distorsiones (leer la mente, catastrofizar, todo o nada, personalizar) y examinarlas con preguntas.
- Temas: reestructuración cognitiva de la terapia cognitivo-conductual; registro de pensamientos: situación → pensamiento → emoción → pruebas a favor y en contra → pensamiento equilibrado.
- Ejemplo: caso ilustrativo (ficticio) de Lucía, contable que cree que «si me equivoco en la reunión, pensarán que soy incompetente».
- Ejercicio y actividad: registro de pensamientos interactivo (3 entradas).
- Reto: poner a prueba una creencia con un experimento conductual (predecir, hacerlo, comparar).

**2.3 El diálogo interno** (35 min)
- Objetivos: usar la autocharla en segunda o tercera persona y el reencuadre «estoy emocionado».
- Temas: Kross y otros (2014): hablarte por tu nombre antes de una charla redujo la ansiedad y mejoró la valoración de la charla; Brooks (2014): decir «estoy emocionado» antes de hablar (etiqueta: prometedora).
- Ejercicio: escribir tu guion de 3 frases para antes de hablar.
- Reto: usarlo antes de una llamada o reunión real.
- Actividad: práctica guiada 8 (reencuadre previo a hablar).

**2.4 Autocompasión en lugar de autocrítica** (30 min)
- Objetivos: aplicar los 3 componentes de la autocompasión (Kristin Neff): amabilidad con uno mismo, humanidad compartida y atención plena.
- Temas: por qué la autocrítica dura aumenta la evitación; cómo hablarte después de un error.
- Ejemplo real: Brené Brown y la «resaca de vulnerabilidad» tras su charla TEDxHouston (2010) (6.10).
- Ejercicio: carta a ti mismo como a un buen amigo después de un mal momento hablando.
- Actividad: práctica guiada 9 (pausa de autocompasión).

**2.5 La identidad de persona segura** (30 min)
- Objetivos: definir la persona que quieres ser al hablar y elegir conductas pequeñas que lo demuestren.
- Temas: hábitos basados en la identidad («soy alguien que pregunta en las reuniones»); pequeñas victorias; acumular pruebas; no fingir: actuar con miedo.
- Ejemplo real: Sara Blakely y la pregunta de su padre en la cena: «¿En qué fallaste esta semana?» (6.9).
- Ejercicio: tarjeta de identidad (3 valores + 3 conductas).

**2.6 El error como dato** (30 min)
- Objetivos: tratar los errores al hablar como información para mejorar.
- Temas: mentalidad de crecimiento (Dweck) con su matiz (los metaanálisis encuentran efectos pequeños); revisar sin castigarte: qué funcionó, qué cambio una cosa.
- Ejemplo real: Churchill se quedó en blanco en la Cámara de los Comunes en 1904 y desde entonces siempre llevó notas completas (6.7).
- Ejercicio: análisis post mortem sano (3 preguntas fijas).

**2.7 Presencia física: qué dice la evidencia** (25 min)
- Objetivos: usar la postura y el movimiento para sentirte y verte más seguro sin creer en mitos.
- Temas: Carney, Cuddy y Yap (2010) y la réplica de Ranehill y otros (2015): no hay efecto hormonal, pero sí un pequeño efecto en cómo te sientes; postura abierta y estable; sonrisa genuina.
- Ejercicio: grabarte 30 s con postura cerrada y 30 s con postura abierta; compara.

**2.8 Plan personal de confianza** (30 min)
- Objetivos: unir lo aprendido en un plan de 30 días.
- Ejercicio y actividad: plan con objetivo, creencia a trabajar, guion interno, 3 retos y fecha de revisión.
- **Quiz del módulo M2** (12 preguntas, 20 min).

### M3. Hablar en público (Nivel 2 · 10 lecciones · 6 h 15 min)

Objetivo del módulo: preparar y dar una charla de 5 minutos y recuperarte de cualquier error.

**3.1 Antes de escribir: público, objetivo y mensaje** (35 min)
- Objetivos: analizar al público (qué sabe, qué le preocupa, qué quiere); definir el objetivo (informar, convencer, inspirar, pedir); resumir el mensaje en una frase de menos de 15 palabras.
- Ejemplo: García Márquez escribía y leía sus discursos; preparaba el texto con el mismo cuidado que un cuento (6.8).
- Actividad: herramienta «Mensaje en una frase».

**3.2 Estructuras que funcionan** (40 min)
- Objetivos: elegir la estructura correcta para cada charla.
- Temas: PREP (punto, razón, ejemplo, punto); problema → solución → beneficio; pasado → presente → futuro; la regla de tres; la pirámide (conclusión primero); historia → lección → acción.
- Ejercicio: la misma idea en 3 estructuras.
- Actividad: plantillas rellenables.

**3.3 Inicios que atrapan** (30 min)
- Temas: empezar con una historia, una pregunta, un dato verificado, una frase sorprendente; evitar «bueno, eh, no sé si se oye…»; memorizar las primeras 2–3 frases (el miedo es mayor al empezar).
- Ejercicio: escribir 3 inicios y elegir uno.

**3.4 Cierres que se recuerdan** (25 min)
- Temas: resumen en una frase, llamada a la acción, volver a la historia del inicio; no terminar con «eso es todo»; cómo dar las gracias.
- Ejercicio: 2 cierres para tu charla.

**3.5 Contar historias** (35 min)
- Temas: estructura situación → conflicto → decisión → resultado → lección; detalles concretos; diálogo; contar tu propia vulnerabilidad sin exagerar.
- Ejemplo real: la charla de Brené Brown se basa en su propia crisis.
- Ejercicio: banco de 5 historias personales.
- Reto: contar una historia de 2 minutos a un amigo.

**3.6 Lenguaje corporal** (35 min)
- Temas: mirada (una idea, una persona; mirar «en zonas»); gestos abiertos a la altura de la cintura; postura estable; moverse con intención; qué hacer con las manos; sonrisa; diferencias culturales.
- Ejemplo real: Borges se imaginaba que no hablaba a 100 personas sino a cada una por separado.
- Ejercicio: grabarse sin sonido y evaluar con lista de control.

**3.7 La voz** (40 min)
- Objetivos: respirar con el diafragma, proyectar, variar ritmo y tono, hacer pausas y reducir muletillas.
- Temas: volumen; velocidad (los nervios aceleran); la pausa como herramienta; muletillas («eh», «o sea», «¿vale?»); calentamiento vocal; tono más grave y lento para calmar en negociación (la «voz de locutor nocturno» de Chris Voss).
- Ejemplo real: Lionel Logue trabajó con Jorge VI con respiración, ejercicios de diafragma, pausas y cambiando palabras difíciles (6.6).
- Actividad: práctica guiada 6 (calentamiento vocal), contador de muletillas manual y temporizador de palabras por minuto.
- Reto: leer en voz alta 5 minutos al día durante una semana.

**3.8 Ensayar con inteligencia** (40 min)
- Temas: ensayar en voz alta, no solo en la cabeza; de pie y con temporizador; grabarse; ensayar con 1–3 personas; ensayar en el lugar real; notas con palabras clave en lugar de memorizar todo (salvo inicio y cierre); ensayo mental.
- Ejemplo real: Churchill (notas completas tras 1904); Susan Cain contrató a un entrenador y dedicó la semana anterior a ensayar su charla TED de 2012.
- Actividad: temporizador de charla con avisos (verde, amarillo, rojo) y grabadora local.
- Reto: 3 ensayos grabados de tu charla de 5 minutos.

**3.9 Los 10 minutos antes y durante** (30 min)
- Temas: rutina previa (llegar pronto, probar la técnica, hablar con alguien del público, respiración, guion interno); poner la atención fuera de ti (en el mensaje y en el público); beber agua; qué hacer si tiembla la voz.
- Actividad: práctica guiada 2 (suspiro cíclico) y lista de control imprimible.

**3.10 Errores en vivo y preguntas difíciles** (40 min)
- Objetivos: recuperarte de quedarte en blanco, de un error o de un fallo técnico; responder preguntas difíciles.
- Temas: quedarse en blanco (pausa, mirar notas, repetir la última idea, «lo que quiero que se lleven es…»); corregir un error sin dramatizar; el público casi nunca se da cuenta (ilusión de transparencia); preguntas: escuchar entera, agradecer, reformular, responder breve, «no lo sé, lo averiguo y te escribo»; preguntas hostiles (reconocer la emoción, volver al dato, no discutir en público); el puente («lo importante aquí es…»).
- Ejemplo real: Streisand volvió a los conciertos en 1994 con teleprompters (una ayuda, no una derrota).
- Actividad: simulador de preguntas difíciles (10 preguntas, elegir respuesta, explicación).
- **Quiz del módulo M3** (12 preguntas, 25 min).

### M4. Hablar en negocios (Nivel 2 · 10 lecciones · 6 h 15 min)

Objetivo del módulo: hablar con seguridad ante jefes, clientes y compañeros, y vender, negociar y pedir sin miedo.

**4.1 Comunicar con claridad en el trabajo** (30 min)
- Temas: conclusión primero (principio de la pirámide de Barbara Minto); correos y mensajes que se entienden; cómo decir «no estoy de acuerdo» con respeto.
- Ejercicio: reescribir 3 mensajes confusos.

**4.2 Presentar ideas a jefes y directivos** (35 min)
- Temas: situación → problema → propuesta → beneficio → petición; anticipar objeciones; datos y una historia; terminar con una decisión concreta.
- Ejercicio: propuesta de 2 minutos.
- Reto: presentar una mejora real a tu jefe o equipo.

**4.3 Hablar y liderar en reuniones** (35 min)
- Temas: intervenir pronto (cuanto más esperas, más crece el miedo); preparar 1 pregunta y 1 aporte; pedir la palabra; liderar: agenda, tiempos, dar la palabra a los callados, cerrar con acuerdos.
- Reto: intervenir en los primeros 10 minutos de la próxima reunión.

**4.4 Vender sin miedo** (40 min)
- Temas: vender como ayudar a decidir; preguntas de situación, problema, implicación y necesidad (método SPIN de Neil Rackham); escuchar más que hablar; objeciones (reconocer → preguntar → responder); pedir el cierre.
- Ejemplo real: Sara Blakely vendió fax puerta a puerta durante años antes de crear Spanx: la echaban de edificios y le rompían la tarjeta (6.9).
- Actividad: simulador de objeciones (8 situaciones).

**4.5 Manejar el rechazo en ventas y en la vida** (30 min)
- Temas: separar el «no» de tu valor; el rechazo como número y como información; preguntar «¿qué tendría que cambiar para que fuera un sí?»; reencuadrar.
- Ejemplo real: Jia Jiang (pedir 100 dólares a un desconocido; los donuts con forma de aros olímpicos que sí le hicieron).
- Reto: hacer 3 peticiones que esperas que te rechacen.

**4.6 Negociar** (45 min)
- Temas: la mejor alternativa a un acuerdo negociado (MAAN, Fisher y Ury, *Obtenga el sí*); intereses frente a posiciones; la primera oferta como ancla (Galinsky y Mussweiler, 2001: el efecto se reduce si piensas en tu alternativa o en tu objetivo); empatía táctica, reflejo y etiquetado, y preguntas abiertas «¿cómo…?» y «¿qué…?» (Chris Voss, *Rompe la barrera del no*); el silencio.
- Actividad: planificador de negociación (objetivo, mínimo, alternativa, ancla, concesiones, preguntas).
- Reto: negociar algo pequeño y real (plazo, precio, condición).

**4.7 Pedir un aumento** (35 min)
- Temas: preparar datos (logros, mercado); el momento; guion (logros → valor → cifra concreta → silencio); qué hacer con un «no ahora» (pedir criterios y fecha).
- Ejemplo de estudio: Babcock y Laschever (*Women Don't Ask*): en un estudio de egresados de Carnegie Mellon, el 57 % de los hombres y el 7 % de las mujeres negociaron su primer salario (datos antiguos; estudios más recientes muestran cambios).
- Actividad: generador de guion para pedir un aumento.

**4.8 Poner precio y defenderlo** (35 min)
- Temas: decir el precio sin disculparte y callarte; no bajar a la primera; ofrecer opciones en lugar de descuentos; subir precios a clientes actuales.
- Ejercicio: decir tu precio en voz alta 10 veces y grabarte.

**4.9 Hablar con clientes: quejas y malas noticias** (30 min)
- Temas: escuchar, reconocer, disculpar si corresponde, solucionar, hacer seguimiento; dar malas noticias pronto y de forma directa; llamar en lugar de escribir.
- Actividad: simulador de cliente enfadado.

**4.10 Presentarte, hacer contactos y el pitch** (35 min)
- Temas: presentación de 30–60 segundos (quién eres, a quién ayudas, cómo, prueba, pregunta); iniciar y salir de conversaciones en eventos; seguimiento.
- Reto: presentarte a 2 personas nuevas en un evento o en internet.
- **Quiz del módulo M4** (12 preguntas, 25 min).

### M5. Desconocidos y situaciones difíciles (Nivel 3 · 9 lecciones · 5 h 15 min)

Objetivo del módulo: hablar con cualquiera, decir que no, poner límites y sostener conversaciones incómodas.

**5.1 Hablar con desconocidos** (35 min)
- Temas: Epley y Schroeder (2014): las personas que hablaron con un desconocido en el tren disfrutaron más el viaje de lo que predecían; Boothby y otros (2018): la «brecha de agrado» (caemos mejor de lo que creemos); empezar (comentario sobre el entorno + pregunta), mantener y cerrar con amabilidad.
- Reto: 3 microconversaciones (cajero, vecino, alguien en la fila).

**5.2 Escuchar y preguntar** (30 min)
- Temas: escucha activa; preguntas de seguimiento (Huang y otros, 2017: hacer más preguntas, sobre todo de seguimiento, aumenta el agrado); resumir; callar.
- Ejercicio: 5 preguntas de seguimiento para respuestas típicas.

**5.3 Conversaciones difíciles** (40 min)
- Temas: las 3 conversaciones de Stone, Patton y Heen (qué pasó, emociones, identidad); empezar desde la «tercera historia»; separar intención de impacto; preparar la conversación (*Conversaciones cruciales*).
- Actividad: preparador de conversación difícil (hechos, mi historia, su historia, objetivo, primera frase).
- Reto: tener una conversación pendiente de bajo riesgo.

**5.4 Decir que no** (30 min)
- Temas: el «no» amable y firme; «yo no hago…» frente a «no puedo» (Patrick y Hagtvedt, 2012: «no hago» resulta más firme y convincente); no dar demasiadas explicaciones; el disco rayado; ganar tiempo («déjame mirarlo y te digo mañana»).
- Ejercicio: 10 frases para decir que no según el contexto (jefe, familia, cliente, amigo).
- Reto: decir que no a una petición pequeña esta semana.

**5.5 Poner límites** (35 min)
- Temas: comunicación no violenta (Rosenberg): observación, sentimiento, necesidad, petición; límites en el trabajo, la familia y la pareja; qué hacer si no se respetan (consecuencias claras); cuándo un problema de límites es abuso y pedir ayuda.
- Actividad: constructor de mensajes según la comunicación no violenta.

**5.6 Recibir críticas y responder a ataques** (35 min)
- Temas: *Thanks for the Feedback* (Stone y Heen): 3 tipos de crítica (agradecimiento, consejo, evaluación) y lo que nos dispara al escucharlas; pedir ejemplos; agradecer sin estar de acuerdo; ante ataques o burlas: pausa, pregunta, límite y salida.
- Ejercicio: responder a 6 críticas tipo.
- Reto: pedir una crítica a alguien y solo agradecerla.

**5.7 Hablar por teléfono** (25 min)
- Temas: por qué asusta (sin señales visuales, sin tiempo para pensar); guion de 3 puntos; llamar de pie; sonreír se nota en la voz; mensaje de voz modelo.
- Reto: 2 llamadas que vienes evitando.

**5.8 Hablar por video** (30 min)
- Temas: cámara a la altura de los ojos; mirar a la cámara al hablar; luz; ocultar la vista de ti mismo (reduce la atención puesta en ti); hablar primero en la reunión; cuidar los silencios por el retraso.
- Ejercicio: grabar un video de 1 minuto con la lista de control.

**5.9 Otro idioma, acento, grupos y fiestas** (30 min)
- Temas: el acento no es un error; pedir que repitan; hablar más despacio; entrar en grupos (acercarse, escuchar, aportar); salir de una conversación con elegancia.
- Ejemplo real: Emily Blunt hablaba con fluidez cuando usaba otro acento, por consejo de un profesor (6.5).
- **Quiz del módulo M5** (12 preguntas, 25 min).

### M6. Historias reales: qué hicieron paso a paso (Nivel 4 · 11 lecciones · 5 h 55 min)

Ficha fija de cada historia: **Quién era · Su miedo · El momento más difícil · Qué hizo, paso a paso · Resultado · Lo que puedes copiar · Dudas o versiones distintas en las fuentes · Fuentes · Ejercicio «Hazlo como…»**. 30 min por lección + quiz del módulo (25 min).

**6.1 Warren Buffett: el curso de 100 dólares** — Tenía terror a hablar en público; se apuntó a un curso de Dale Carnegie, canceló el pago, volvió a apuntarse y pagó en efectivo para no echarse atrás; practicó cada semana con el grupo; dio clases nocturnas de inversión en la Universidad de Omaha; el certificado (enero de 1952; las fuentes no coinciden en el día) es el único diploma que tiene en su despacho y ha dicho que «le cambió la vida». Pasos que puedes copiar: comprometerte de forma que te cueste echarte atrás, practicar con un grupo, buscar escenarios para repetir. Fuentes: biografía de Alice Schroeder (*La bola de nieve*), entrevistas, Inc. y LinkedIn Learning.

**6.2 Mahatma Gandhi: de no poder leer un discurso a liderar a millones** — En Londres, en la Sociedad Vegetariana, no pudo pasar de la primera frase de un brindis y otra persona leyó su discurso; en su primer caso en Bombay (Mamibai, tribunal de causas menores) se levantó y no pudo hacer ni una pregunta, devolvió los honorarios y pasó el caso a otro abogado; en Sudáfrica fue venciendo poco a poco la timidez al defender a la comunidad india; describió la timidez como su «escudo»: le enseñó a hablar poco y medir sus palabras. Fuente: *Autobiografía: la historia de mis experimentos con la verdad*, parte I, cap. 18 y parte II, cap. 3.

**6.3 James Earl Jones: de casi no hablar a una de las voces más famosas** — Tartamudeo severo y casi mudo durante años de escuela; su profesor Donald Crouch dudó de que hubiera escrito él un poema y le pidió que lo leyera en voz alta ante la clase; lo leyó sin trabarse; después, debate y oratoria, y teatro. Pasos: un mentor, un texto propio y memorizado, un público pequeño, práctica en debate. Fuentes: Academy of Achievement, revista Time, Stuttering Foundation.

**6.4 Joe Biden: la tartamudez y el espejo** — Burlas en la escuela; de adolescente memorizaba pasajes largos de Yeats y Emerson y los recitaba ante el espejo, a veces con una linterna para controlar los gestos de la cara; buscaba ritmo y cadencia; ayuda a niños que tartamudean; reconoce que todavía le pasa cuando está muy cansado. Matiz: es una historia de manejo, no de «cura». Fuentes: PBS Frontline, *The Atlantic* (John Hendrickson, 2019), Stuttering Foundation.

**6.5 Emily Blunt y Ed Sheeran: encontrar otra forma de hablar** — Blunt: un profesor notó que no tartamudeaba al imitar voces y la animó a hacer la obra escolar con un acento inventado. Sheeran: dice que aprender y rapear una y otra vez *The Marshall Mathers LP* de Eminem le ayudó con su tartamudez infantil. Lo que puedes copiar: el ritmo, la música y el «personaje» como apoyo; practicar con textos memorizados. Fuentes: NPR (2014), entrevistas en The Howard Stern Show (2023) y en el American Institute for Stuttering (2015).

**6.6 Jorge VI y Lionel Logue: preparar un discurso imposible** — El rey tartamudeaba y temía los discursos; Logue usó ejercicios de respiración y de diafragma, relajación, práctica constante, pausas marcadas y cambio de palabras difíciles; preparación del discurso radiofónico del 3 de septiembre de 1939. Matiz: la película *El discurso del rey* dramatiza; se usan los diarios de Logue (libro de Mark Logue y Peter Conradi, 2010). Fuentes: Australian Dictionary of Biography, el libro citado.

**6.7 Winston Churchill: quedarse en blanco y cambiar de método** — Tenía un ligero ceceo; en la primavera de 1904, tras 45 minutos hablando sin notas en la Cámara de los Comunes, se quedó en blanco y se sentó; desde entonces preparó casi siempre notas completas, escritas en líneas cortas como versos; ensayaba mucho. Lo que puedes copiar: no depender solo de la memoria; notas por frases. Fuente: International Churchill Society.

**6.8 Gabriel García Márquez: el escritor que no quería dar discursos** — Decía que los discursos eran «el más terrorífico de los compromisos humanos»; prometió no recibir premios ni dar discursos; aun así los escribió con cuidado y los leyó, desde su discurso de 17 años hasta el Nobel de 1982 («La soledad de América Latina»); reunidos en *Yo no vengo a decir un discurso* (2010). Lo que puedes copiar: escribir el texto, leerlo bien, aceptar el miedo y hacerlo igual.

**6.9 Jia Jiang y Sara Blakely: perder el miedo al rechazo** — Jiang: 100 días buscando rechazos y grabándolos (pedir 100 dólares, «recarga» de hamburguesa, los donuts con aros olímpicos), libro *Rejection Proof* y charla TEDx (2015); aprendió a preguntar «¿por qué?» después de un no. Blakely: años vendiendo fax puerta a puerta; su padre preguntaba en la cena «¿en qué fallaste esta semana?»; con Spanx presentó su producto en persona a compradores. Fuentes: TED, NPR, CNBC, Business Insider.

**6.10 Susan Cain, Brené Brown y Barbra Streisand: la timidez, la vulnerabilidad y la recaída** — Cain: introvertida, su «Año de hablar peligrosamente» (Toastmasters y práctica gradual) y la charla TED de 2012; Brown: la «resaca de vulnerabilidad» y no salir de casa unos días tras TEDxHouston; Streisand: el miedo escénico tras 1967 y el regreso en 1994 con teleprompters. Lección: el miedo puede volver y tiene solución con ayudas y práctica.

**6.11 Jorge Luis Borges y las personas comunes** — Borges era muy tímido y tartamudeaba; al perder su puesto en la biblioteca en 1946 tuvo que dar conferencias para vivir; se convencía de que hablaba con cada persona y no con la masa; con los años pedía a María Kodama sentarse en primera fila. Personas comunes: el origen de Toastmasters (jóvenes del YMCA que practicaban hablando por turnos y recibiendo comentarios) y 3 **casos ilustrativos (ficticios)** claramente marcados: una dependienta que aprende a decir que no, un técnico que presenta en su primera reunión y una emprendedora que sube sus precios, cada uno con su escalera de exposición. Fuentes: *La Nación* (2023), Toastmasters International.

- **Actividad del módulo:** comparador «¿Qué tienen en común?» (preparación, práctica repetida, un mentor o un grupo, empezar en pequeño, aceptar el miedo).
- **Quiz del módulo M6** (12 preguntas).

### M7. Práctica diaria, reto de 30 días, prácticas guiadas y glosario (Nivel 5 · 7 lecciones · 12 h 35 min)

**7.1 Cómo funciona la exposición gradual** (35 min)
- Temas: escalera de exposición de 10 peldaños con SUDS; quedarte en la situación sin conductas de seguridad; aprendizaje inhibitorio (Craske y otros, 2014): lo importante es comprobar que lo temido no pasa o que puedes con ello, no solo que baje el miedo; variar las situaciones; repetir.
- Actividad: constructor de escalera (se llena con el ranking de 1.4).

**7.2 La rutina diaria de 15 minutos** (20 min)
- 3 min de respiración, 3 min de voz (lectura en voz alta), 1 minuto de improvisación (tema al azar), 1 microrreto social, 2 min de diario (SUDS antes y después + una victoria).
- Actividad: botón «Hacer la rutina de hoy» con temporizadores.

**7.3 El reto de 30 días** (20 min de explicación + ≈ 7 h 30 min de práctica)
Cada día: reto, versión fácil y difícil, SUDS antes y después, nota, marca de completado y racha.
- **Semana 1 (bajo riesgo):** 1 saludar y sonreír a 3 personas · 2 preguntar una dirección o la hora a un desconocido · 3 grabarte 1 minuto hablando de tu día · 4 llamar a un negocio para preguntar algo · 5 hacer un cumplido sincero · 6 pedir una recomendación a un dependiente · 7 leer en voz alta 5 min y repasar la semana.
- **Semana 2:** 8 hacer una pregunta en una reunión o clase · 9 dar tu opinión en una conversación de grupo · 10 pedir un pequeño descuento · 11 hacer una reclamación con calma · 12 decir que no a una petición pequeña · 13 videollamada con la cámara encendida y hablar el primero · 14 grabar una charla de 3 min y revisarla con la lista.
- **Semana 3:** 15 conversación de 3 min con un desconocido · 16 presentarte en 60 s a alguien nuevo · 17 contar una historia personal con estructura · 18 dar una crítica constructiva con comunicación no violenta · 19 una petición «imposible» al estilo Jia Jiang · 20 hablar 2 min ante 2–3 personas · 21 subir un peldaño de tu escalera.
- **Semana 4:** 22 intervenir en los primeros 10 minutos de una reunión · 23 negociar algo real · 24 la llamada difícil pendiente · 25 poner un límite importante · 26 preparar tu charla de 5 min · 27 ensayarla ante un público pequeño · 28 pedir una crítica y agradecerla · 29 dar la charla (en el trabajo, familia, Toastmasters o grabada) · 30 carta a tu yo del día 1 y nueva escalera.
- Insignias en los días 7, 14, 21 y 30.

**7.4 Prácticas guiadas** (10 prácticas · ≈ 80 min)
Cada una con texto en pantalla, temporizador, círculo animado de respiración y **lectura en voz alta opcional** con la voz en español del navegador (sin archivos de audio ni internet; si el navegador no tiene voz, funciona solo con texto y temporizador).
1. Respiración diafragmática lenta (≈ 6 respiraciones por minuto, 5 min) · 2. Suspiro cíclico (doble inhalación y exhalación larga, 5 min; Balban y otros, 2023) · 3. Respiración en caja 4-4-4-4 (3 min) · 4. Relajación muscular progresiva (Jacobson, 10 min) · 5. Anclaje 5-4-3-2-1 para el pánico (4 min) · 6. Calentamiento vocal (5 min) · 7. Ensayo mental de tu charla (8 min) · 8. Reencuadre antes de hablar: «estoy emocionado» y autocharla por tu nombre (3 min) · 9. Pausa de autocompasión tras un error (5 min) · 10. Improvisación: temas al azar de 1 minuto (generador con 150 temas).

**7.5 Simuladores** (60 min)
Escenarios con elección de respuesta y explicación: entrevista de trabajo, pedir un aumento, cliente enfadado, negociación de precio, pregunta hostil en una charla, decir que no a un familiar, llamar para reclamar, hablar con un desconocido en un evento (8 escenarios de 4–6 decisiones).

**7.6 Glosario** (≈ 120 términos, consulta libre)
Ej.: glosofobia, ansiedad social, SUDS, exposición gradual, conducta de seguridad, efecto foco, ilusión de transparencia, autoeficacia, reestructuración cognitiva, autocompasión, PREP, MAAN, ancla, empatía táctica, reflejo, etiquetado, SPIN, comunicación no violenta, muletilla, pausa, proyección de voz, aprendizaje inhibitorio, suspiro cíclico, Toastmasters… Cada término con definición sencilla, ejemplo y lección relacionada.

**7.7 Proyecto final** (90 min)
Opción A: charla de 5 minutos grabada. Opción B: negociación o conversación difícil real. Rúbrica de autoevaluación de 8 criterios (mensaje, estructura, inicio, cierre, voz, cuerpo, manejo de los nervios o del error, aplicación de la técnica) + comparación con tu mapa del miedo del día 1.
- **Quiz del módulo M7** (12 preguntas) y **examen final** (30 preguntas, 45 min) → certificado.

---

## 4. El sitio web

### 4.1 Mapa del sitio (hash, igual que los otros sitios)

```
#/                         Inicio
#/curso                    Mapa del curso: niveles, módulos, progreso
#/modulo/[n]               Página del módulo (objetivos, lecciones, quiz)
#/leccion/[m]/[l]          Lección (plantilla §1.2)
#/quiz/[m]                 Quiz del módulo
#/examen                   Examen final
#/historias, #/historias/[slug]   Historias reales (M6)
#/reto-30-dias, #/reto-30-dias/[d] Reto de 30 días
#/practicas, #/practicas/[slug]   Prácticas guiadas
#/herramientas/[slug]      Mapa del miedo, escalera, registro de pensamientos, temporizador, grabadora, mensaje en una frase, planificador de negociación, guion de aumento, conversación difícil, mensaje CNV, generador de temas
#/simuladores/[slug]       Simuladores
#/rutas                    Rutas (completa, exprés, negocios, timidez)
#/glosario                 Glosario con filtro A–Z
#/biblioteca               Libros, estudios y charlas
#/evidencia                Cómo se clasifica la evidencia
#/pedir-ayuda              Cuándo pedir ayuda profesional
#/progreso                 Progreso, insignias, diario, exportar/borrar
#/certificado · #/buscar · #/acerca · #/privacidad · #/accesibilidad
```

### 4.2 Navegación y funciones obligatorias

- **Buscador** en la cabecera: busca en lecciones, historias, retos, prácticas, herramientas y glosario, sin distinguir tildes ni mayúsculas; resultados agrupados por tipo y resaltando el texto. Incluye un **recuadro de respuesta** (como en Personas Poderosas) con ≈ 40 respuestas rápidas a frases como «me quedé en blanco», «me tiembla la voz», «cómo pedir un aumento», «cómo decir que no», «tengo una presentación mañana», con enlace a la lección.
- **Progreso guardado** en `localStorage` (con `try/catch`): lecciones completadas, notas de quizzes, días del reto, mapa del miedo, escalera, diario, herramientas rellenadas, insignias, tema elegido y nombre del certificado. En Progreso: porcentaje global y por módulo, racha, **exportar e importar** el progreso en un archivo JSON y borrar todo.
- **Quizzes** por lección (mini-quiz) y por módulo, examen final, con retroalimentación y preguntas al azar al repetir.
- **PC y celular:** cabecera fija; en móvil, menú hamburguesa y barra inferior (Curso · Reto · Prácticas · Buscar); sin desplazamiento horizontal a 360 px; botones grandes.
- **Modo claro y oscuro:** botón ☾/☀ y preferencia del sistema, mismas variables CSS que el sitio 6, con otra paleta (cálida: azul petróleo y ámbar).
- **Accesibilidad:** «saltar al contenido», foco visible, contraste AA, `aria-live` en resultados del quiz, animación de respiración que respeta `prefers-reduced-motion`.
- **Privacidad:** sin servidor, sin analítica, sin cookies; la grabadora (si el navegador lo permite) graba solo en tu equipo, no sube nada y no guarda el audio.
- **Todo en español.**

### 4.3 Páginas principales

- **Inicio:** frase de entrada («El miedo no se va antes de hablar: se va hablando»); 3 accesos (Entender · Practicar · Negocios); «Continuar donde lo dejé»; reto del día; historia destacada; rutas.
- **Lección:** la plantilla de §1.2 con barra de progreso, «anterior y siguiente» y «Marcar como completada» (se marca sola al aprobar el mini-quiz).
- **Historia:** la ficha fija de M6 con cronología paso a paso y caja «Lo que puedes copiar».
- **Progreso:** gráfica simple de SUDS a lo largo del reto (SVG propio).

### 4.4 Archivos (mismo patrón que `sitios/manipulacion/`)

```
sitios/hablar-sin-miedo/
  index.html          cabecera, buscador, tema, menú, barra inferior, scripts
  styles.css          variables de tema claro y oscuro, diseño adaptable, impresión del certificado
  app.js              enrutado, store, buscador, quizzes, progreso, insignias, certificado
  herramientas.js     herramientas, simuladores, prácticas guiadas (temporizador y voz)
  data-curso-1.js     M1 y M2 (texto completo, casos, preguntas)
  data-curso-2.js     M3 y M4
  data-curso-3.js     M5 y M7 (lecciones)
  data-historias.js   M6 (11 historias con fuentes)
  data-practica.js    reto de 30 días, prácticas, simuladores, temas de improvisación
  data-extra.js       glosario, biblioteca, respuestas rápidas del buscador, banco de preguntas de módulo
  pruebas.js          comprobación con Node de los datos (como finanzas/pruebas.js)
```

Se reutilizan patrones (copiados y adaptados, no enlazados) de `sitios/manipulacion/app.js`: `store`, `crumbs`, `route()`, el examen con preguntas al azar, el certificado imprimible y el botón de borrar progreso; del buscador de `sitios/personas-poderosas/` el recuadro de respuesta.

También: `planes/plan-7-hablar-sin-miedo.md` (este plan) y una fila nueva «7. Hablar sin miedo» en `README.md` y `LEEME.md`.

---

## 5. Insignias

Primer paso (1.ª lección) · Entiendo mi miedo (M1) · Voz propia (M2) · Orador (M3) · Negociador (M4) · Valiente social (M5) · Aprendiz de los grandes (M6) · Semana 1, 2, 3 y 30 días del reto · Respira (10 prácticas guiadas) · Rechazo a prueba (día 19 + lección 4.5) · Graduado (certificado).

---

## 6. Biblioteca (recursos citados)

**Libros:** Dale Carnegie, *Cómo hablar bien en público e influir en los hombres de negocios* · Chris Anderson, *Charlas TED* · Chris Voss, *Rompe la barrera del no* · Roger Fisher, William Ury y Bruce Patton, *Obtenga el sí* · Stone, Patton y Heen, *Conversaciones difíciles* · Stone y Heen, *Thanks for the Feedback* · Patterson y otros, *Conversaciones cruciales* · Marshall Rosenberg, *Comunicación no violenta* · Susan Cain, *El poder de los introvertidos* · Brené Brown, *El poder de ser vulnerable* · Jia Jiang, *Rejection Proof* · Kristin Neff, *Sé amable contigo mismo* · Neil Rackham, *SPIN Selling* · Barbara Minto, *El principio de la pirámide* · Linda Babcock y Sara Laschever, *Women Don't Ask* · Gandhi, *Autobiografía* · Mark Logue y Peter Conradi, *El discurso del rey* · Alice Schroeder, *La bola de nieve* · García Márquez, *Yo no vengo a decir un discurso*.

**Estudios:** Clark y Wells (1995); Gilovich, Medvec y Savitsky (2000), *JPSP*; Savitsky y Gilovich (2003), *JESP*; Brooks (2014), *JEP: General*, y la réplica de 2025; Jamieson y otros (2012), *JEP: General*; Kross y otros (2014), *JPSP*; Bandura (1977); Craske y otros (2014), *Behaviour Research and Therapy*; Balban y otros (2023), *Cell Reports Medicine*; Ranehill y otros (2015), *Psychological Science*; Galinsky y Mussweiler (2001), *JPSP*; Patrick y Hagtvedt (2012), *Journal of Consumer Research*; Epley y Schroeder (2014); Boothby y otros (2018), *Psychological Science*; Huang y otros (2017), *JPSP*; Reeves y otros (2021), *Behavior Modification* (realidad virtual).

**Charlas:** Jia Jiang, «Lo que aprendí de 100 días de rechazo» · Susan Cain, «El poder de los introvertidos» · Brené Brown, «El poder de la vulnerabilidad» · Chris Anderson, «El secreto de las grandes charlas TED».

---

## 7. Modelo de contenido

| Entidad | Campos |
|---|---|
| Módulo | n, nivel, título, objetivo, duración, lecciones[], bancoQuiz[] |
| Lección | id, título, duración, situación, objetivos[], texto (párrafos y subtítulos), ideaClave, evidencia, ejemploReal {texto, fuente}, pasos[], errores[], ejercicio, reto {fácil, difícil}, herramienta, caso [situación, opciones, correcta, explicación], quiz[5], saberMás[], materiales[] |
| Historia | slug, nombre, fechas, quién, miedo, momentoDifícil, pasos[], resultado, copiar[], versiones, fuentes[], ejercicio |
| Día del reto | d, semana, título, fácil, difícil, consejo, lección |
| Práctica guiada | slug, título, minutos, pasos [{texto, segundos, fase}], evidencia, fuente |
| Simulador | slug, título, nodos [{situación, opciones [{texto, resultado, siguiente}]}] |
| Pregunta | enunciado, opciones[], correcta, explicación |
| Término | término, definición, ejemplo, lección |
| Respuesta rápida | frases[], respuesta, enlace |

**Volumen:** 63 lecciones (≈ 55 000 palabras de texto), 11 historias, 30 días, 10 prácticas, 8 simuladores, 11 herramientas, ≈ 450 preguntas, ≈ 120 términos, ≈ 40 respuestas rápidas.

---

## 8. Fases de construcción (solo tras tu aprobación)

1. **Rama:** `git checkout -b hablar-sin-miedo` desde `main`.
2. **Fase 1:** `index.html`, `styles.css`, `app.js` (enrutado, tema, buscador, progreso, quizzes), M1 y M2 completos.
3. **Fase 2:** M3, M4 y M5 con sus herramientas.
4. **Fase 3:** M6 (historias), M7 (reto, prácticas, simuladores, glosario), biblioteca, examen, certificado, insignias, recuadro de respuesta.
5. **Fase 4:** `pruebas.js`, revisión en navegador (abajo), plan en `planes/`, README y LEEME.
6. Commits por fase y `git push -u origin hablar-sin-miedo`. **No se crea PR ni se fusiona a main.**
   (Nota: la sesión tenía asignada la rama `claude/trusting-rubin-322yzd`; se usará `hablar-sin-miedo` porque la pides tú expresamente.)

---

## 9. Verificación

- `node --check` de todos los `.js` y `node sitios/hablar-sin-miedo/pruebas.js`: 7 módulos, 63 lecciones; cada lección con todos los campos, 5 preguntas con índice de respuesta válido y caso; 30 días; 10 prácticas; enlaces internos (`#/leccion/…`) apuntando a lecciones que existen; ningún texto en inglés en la interfaz.
- Script de Playwright (Chromium ya instalado) abriendo `file://…/index.html`:
  - recorrer todas las rutas sin errores en la consola;
  - buscar «me quedé en blanco» → aparece el recuadro de respuesta y el enlace a 3.10;
  - aprobar un mini-quiz y un quiz de módulo → recargar → el progreso sigue;
  - marcar un día del reto y rellenar el mapa del miedo → recargar → se conserva;
  - cambiar el tema → recargar → se mantiene; probar claro y oscuro;
  - a 390 px de ancho: menú hamburguesa y barra inferior visibles, sin desplazamiento horizontal;
  - capturas de inicio, lección, quiz y reto en PC y móvil, en ambos temas, para revisarlas.
- Comprobación final de los criterios de aceptación.

## 10. Criterios de aceptación

- [ ] 7 módulos, 63 lecciones, ≈ 46 h, con el texto completo de cada lección.
- [ ] Cada lección tiene objetivos, temas, ejemplo real, ejercicio, reto, actividad, duración, materiales y quiz.
- [ ] 11 historias reales con pasos y fuentes; versiones distintas señaladas; los casos ficticios están marcados.
- [ ] Cada técnica con su etiqueta de evidencia; los mitos están corregidos.
- [ ] Buscador con recuadro de respuesta, progreso guardado, quizzes por lección y módulo, examen y certificado.
- [ ] Funciona sin internet, en PC y celular, en modo claro y oscuro.
- [ ] Página «Cuándo pedir ayuda» y aviso de que el curso no sustituye a la terapia.
- [ ] Todo en español; en `sitios/hablar-sin-miedo/`, en la rama `hablar-sin-miedo`, sin fusionar a main.
