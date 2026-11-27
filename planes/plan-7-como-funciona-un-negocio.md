# Plan 7: curso web «CÓMO FUNCIONA UN NEGOCIO: desde un negocio chico hasta empresas gigantes»

> Documento de planificación. **Solo en español.** Estado: **aprobado** y construido en `sitios/como-funciona-un-negocio/`.
> Al aprobarse, este plan se guardará como `planes/plan-7-como-funciona-un-negocio.md` (mismo formato que los Planes 1–6) y el sitio se construirá en `sitios/como-funciona-un-negocio/`.

---

## 0. Contexto

**Qué se pide:** un curso extenso, en español, para entender cómo se organiza y cómo funciona por dentro un negocio, desde un changarro hasta una corporación gigante.

**Qué hay ya en el repositorio (revisado en `main`):**
- `planes/`: planes en Markdown con secciones fijas: contexto y supuestos → estructura (niveles, tabla de módulos) → plantilla de lección → objetivos por nivel → contenido por módulo (tablas de lecciones, casos, ejercicios, evaluación) → mapa del sitio y páginas → progreso → quizzes → recursos → modelo de contenido → fases → criterios de aceptación.
- `sitios/`: cada curso es una web estática **sin servidor ni internet** (`index.html` + `styles.css` + `app.js` + archivos `data-*.js` con `window.DATOS = …`), navegación por hash (`#/curso`, `#/m/ID/3`), progreso en `localStorage`, tema claro/oscuro con `data-theme` + `prefers-color-scheme`, buscador en la cabecera, barra inferior en móvil.
- Dos estilos de construcción:
  - `sitios/_motor/` (Ciencias y Administración): genera `data.js` desde el plan con `parse-plan.js`; las lecciones y los quizzes salen automáticos, **sin texto largo** (el README lo marca como pendiente).
  - Sitios hechos a mano (`sitios/manipulacion/`, `sitios/finanzas/`): datos escritos a mano, curso con quizzes propios, examen, certificado, insignias, glosario y `pruebas.js` para comprobar fórmulas.
- **Decisión:** como este curso debe ser «extenso y a detalle», se construye **a mano, con el texto completo de cada lección**, siguiendo el patrón de `sitios/manipulacion/` (curso con niveles, quizzes, examen, certificado) y `sitios/finanzas/` (calculadoras + `pruebas.js`). Se reutilizan del código existente: el `store` con `localStorage`, `quizHTML`/`shuffle`/`rng` de `sitios/_motor/app.js`; `pageCurso`, `pageLeccion`, `examQuiz`, `pageCertificado`, `badges`, `buildIndex`/`search`, `pageGlosario` de `sitios/manipulacion/app.js`; tokens de color y modo oscuro de `sitios/manipulacion/styles.css`; el estilo de `sitios/finanzas/pruebas.js`.

## 1. Supuestos de diseño

- **Público:** personas desde los 15 años sin formación previa: curiosos, empleados que quieren entender su empresa, dueños de changarros y pymes, futuros emprendedores.
- **País de referencia: México** (la palabra «changarro», INEGI, SAT, IMSS, Profeco, IMPI, BMV, Cofece). Cada tema legal o fiscal lleva una ficha **«En otros países»** (España, Colombia, Argentina, Chile, Perú) y un aviso de que es contenido educativo, no asesoría legal ni fiscal.
- **Moneda:** pesos mexicanos (MXN) en los ejemplos; números con formato `1,234.56` (México).
- **Matemáticas:** solo sumas, restas, porcentajes y reglas de tres; todo se explica paso a paso.
- **Negocio ficticio que acompaña todo el curso: «Tortas Lupita»** (marcado siempre como ficticio):
  - Nivel 1: un puesto de tortas en la calle; Lupita y su hijo Toño lo hacen todo.
  - Nivel 2: local formal con 6 empleados, organigrama, nómina, proveedores y sistema de punto de venta.
  - Nivel 3: tres sucursales, cocina central, crédito bancario, luego franquicias.
  - Nivel 4: «Grupo Lupita»: holding con varias marcas, consejo de administración y una hipotética salida a bolsa.
- **Recuadro distintivo «Del changarro al gigante»:** en cada lección, el mismo concepto en un negocio chico y en una empresa gigante real (por ejemplo, «inventario» en una tienda de abarrotes y en Walmart).
- **Empresas reales** solo con hechos públicos y verificables, con fuente; lo ficticio se marca como tal.
- Lecciones de **30–75 minutos**; las esenciales llevan ★ (ruta exprés de unas 80 lecciones).

## 2. Estructura general

| Nivel | Nombre | Módulos | Lecciones | Horas* |
|---|---|---|---|---|
| 1 | Fundamentos: qué es un negocio | M1–M5 (5) | 41 | 44 h |
| 2 | Por dentro del negocio: estructura y áreas | M6–M15 (10) | 79 | 85 h |
| 3 | Decidir, crecer y escalar | M16–M22 (7) | 52 | 58 h |
| 4 | Empresas gigantes | M23–M29 (7) | 51 | 59 h 45 min |
| — | Evaluación final | — | — | 2 h |
| **Total** | | **29 módulos** | **223 lecciones** | **≈ 249 h** |

\*Horas = lecciones + 1 h de actividades y ejercicios del módulo + 30 min de quiz del módulo (salvo M29) + 1 h 30 min de examen de nivel.

### 2.1 Plantilla fija de cada lección

1. **Situación inicial** con Tortas Lupita («Lupita vende 300 tortas al día, pero a fin de mes no le alcanza. ¿Qué pasa?»).
2. **Objetivos** (2–3, medibles).
3. **Explicación** (800–1,500 palabras) con subtítulos, listas y tablas o diagramas sencillos.
4. **Concepto clave** en un recuadro (definición, fórmula si la hay, cuándo se usa).
5. **Del changarro al gigante:** el mismo concepto en un negocio chico y en una empresa grande real.
6. **Ejemplo resuelto** paso a paso con números de Tortas Lupita.
7. **Empresa real:** 1–3 párrafos con fuente.
8. **Errores frecuentes** (3–5).
9. **Actividad práctica** (con solución o rúbrica de autoevaluación).
10. **Mini-quiz** de 4 preguntas con explicación de cada respuesta.
11. **Términos del glosario** enlazados.

### 2.2 Dependencias

- Nivel 1 en orden (M1 → M5). M5 antes de M8, M17 y M19.
- En el Nivel 2, M6 primero; el resto en cualquier orden.
- M16–M17 antes de M18–M22. M24 antes de M25. M29 al final.
- **Modo libre:** nada se bloquea; solo el certificado exige aprobar quizzes y exámenes.

## 3. Objetivos por nivel

**Nivel 1, Fundamentos.**
- Explicar qué es un negocio, qué valor crea y quiénes participan en él.
- Clasificar un negocio por tamaño, sector, propiedad y forma legal.
- Describir el modelo de negocio de cualquier empresa con el lienzo de 9 bloques.
- Calcular ingresos, costos, utilidad, margen, punto de equilibrio y un precio.

**Nivel 2, Por dentro del negocio.**
- Leer y dibujar el organigrama de un negocio chico, mediano y grande.
- Explicar qué hace cada área (dirección, finanzas, operaciones, compras, ventas, marketing, RH, legal, tecnología) y cómo se coordinan.
- Leer un estado de resultados, un balance y un flujo de caja sencillos.
- Mapear un proceso, controlar inventario y evaluar proveedores.
- Calcular métricas de clientes (ticket promedio, conversión, CAC, valor de vida).

**Nivel 3, Decidir, crecer y escalar.**
- Explicar quién decide qué y cómo se decide con datos, presupuestos y análisis de riesgos.
- Comparar real contra presupuesto y montar un tablero de indicadores.
- Describir las etapas de crecimiento y las opciones de financiamiento.
- Evaluar abrir sucursales, franquiciar o expandirse a otro mercado.

**Nivel 4, Empresas gigantes.**
- Explicar la estructura de un grupo corporativo (holding, subsidiarias, divisiones, corporativo).
- Explicar quién manda en una empresa grande: accionistas, asamblea, consejo, comités, CEO.
- Leer lo esencial del informe anual de una empresa en bolsa.
- Analizar la estrategia, el gobierno y los fracasos de empresas reales.
- Hacer la radiografía completa de un negocio real (proyecto final).

---

## 4. Contenido por módulo

Cada módulo incluye: objetivo, lecciones (con duración), actividades, ejercicios, ejemplos reales, quiz y caso. Duración de lecciones en minutos; total del módulo en horas.

### NIVEL 1 · Fundamentos: qué es un negocio

#### M1. ¿Qué es un negocio? (8 lecciones · 7 h 45 min)
**Objetivo:** entender qué es un negocio, por qué existe y de qué piezas se compone.

| # | Lección | Descripción | Min |
|---|---|---|---|
| 1 ★ | Qué es un negocio | Resolver un problema o necesidad a cambio de dinero, de forma repetible | 45 |
| 2 ★ | El valor: por qué la gente paga | Valor percibido, precio y costo; por qué alguien paga 40 pesos por una torta | 45 |
| 3 ★ | Las piezas de todo negocio | Cliente, producto, dinero, personas, procesos e información | 45 |
| 4 | Negocio, empresa, emprendimiento y autoempleo | Diferencias, con ejemplos | 45 |
| 5 | Las partes interesadas | Dueño, clientes, empleados, proveedores, gobierno, comunidad, bancos | 45 |
| 6 | El entorno del negocio | Economía, competencia, leyes, tecnología, sociedad (introducción a PESTEL) | 60 |
| 7 | Por qué nacen y por qué mueren los negocios | Datos del INEGI sobre esperanza de vida de los negocios; causas típicas | 60 |
| 8 | Mapa del curso y presentación de Tortas Lupita | Cómo usar el curso; la historia que nos acompaña | 30 |

**Actividades:** describir un negocio del barrio con las 6 piezas; mapa de partes interesadas de Tortas Lupita.
**Ejercicios:** clasificar 10 situaciones como «crea valor / no crea valor»; ordenar el ciclo de un negocio.
**Ejemplos reales:** tienda de la esquina frente a OXXO; Coca-Cola y su red de tienditas.
**Caso:** «La tienda de Don Chuy» (ficticio): ¿por qué cerró si tenía clientes?
**Quiz del módulo:** 10 preguntas de un banco de 20; aprobación 70 %.

#### M2. Tipos de negocio por tamaño (8 lecciones · 8 h 30 min)
**Objetivo:** distinguir un changarro, una micro, pequeña, mediana, grande y un corporativo, y saber qué cambia en cada uno.

| # | Lección | Descripción | Min |
|---|---|---|---|
| 1 ★ | Cómo se mide el tamaño | Empleados, ventas y activos; criterios de México (Secretaría de Economía) y de la Unión Europea | 45 |
| 2 ★ | El changarro y el negocio familiar | Tiendita, puesto, fonda, taller: cómo funcionan y por qué son tantos | 60 |
| 3 | El autoempleo y el profesionista independiente | Plomero, diseñadora, contador: el negocio de una persona | 45 |
| 4 | La microempresa | De 1 a 10 empleados: primeros empleados y primeros problemas | 45 |
| 5 ★ | La pequeña y mediana empresa (pyme) | Más áreas, más reglas, más procesos | 60 |
| 6 | La gran empresa | Cientos o miles de empleados, departamentos completos | 45 |
| 7 ★ | El corporativo y el grupo empresarial | Introducción: varias empresas bajo un mismo dueño | 60 |
| 8 | La economía informal | Qué es, por qué existe, riesgos y beneficios de formalizarse | 60 |

**Actividades:** tabla comparativa de 6 tamaños (dueño, empleados, decisiones, dinero, sistemas).
**Ejercicios:** clasificar 12 negocios reales y ficticios por tamaño.
**Ejemplos reales:** tiendas de abarrotes (censos del INEGI), Grupo Bimbo, Walmart de México.
**Caso:** el mismo giro en tres tamaños: taquería de barrio, cadena regional, cadena nacional.
**Quiz del módulo.**

#### M3. Tipos de negocio por sector, propiedad y forma legal (8 lecciones · 8 h 30 min)
**Objetivo:** clasificar un negocio por lo que hace, por quién es su dueño y por su forma legal.

| # | Lección | Descripción | Min |
|---|---|---|---|
| 1 | Sectores de la economía | Primario, secundario, terciario y cuaternario | 45 |
| 2 | Por giro | Comercio, servicios, manufactura, tecnología | 45 |
| 3 | Por propiedad | Privada, pública, mixta, cooperativa, social y sin fines de lucro | 60 |
| 4 ★ | Persona física y persona moral | Responsabilidad limitada e ilimitada: qué arriesgas | 60 |
| 5 ★ | Sociedades en México | S.A. de C.V., S. de R.L. de C.V., S.A.P.I., S.A.S., S.C., cooperativa | 60 |
| 6 | En otros países | España (S.L., S.A.), Colombia (S.A.S.), Argentina (S.R.L., S.A.), Chile (SpA) | 45 |
| 7 ★ | Los impuestos que toca un negocio | IVA, ISR, impuestos sobre nómina; regímenes (introducción) | 60 |
| 8 | Cómo se da de alta un negocio | RFC, permisos, licencia de funcionamiento, Protección Civil | 45 |

**Actividades:** árbol de decisión «¿qué forma legal le conviene?» para Tortas Lupita.
**Ejercicios:** emparejar empresa ↔ sector ↔ propiedad; verdadero o falso sobre responsabilidad.
**Ejemplos reales:** Pemex (empresa del Estado), Mondragón (cooperativa), Cruz Roja (sin fines de lucro).
**Caso:** dos socios sin papeles se pelean: ¿qué pasa con el negocio?
**Quiz del módulo.**

#### M4. El modelo de negocio (7 lecciones · 7 h 30 min)
**Objetivo:** describir cómo cualquier negocio crea, entrega y cobra valor.

| # | Lección | Descripción | Min |
|---|---|---|---|
| 1 ★ | Qué es un modelo de negocio | La lógica de cómo un negocio gana dinero | 45 |
| 2 ★ | El lienzo de modelo de negocio | Los 9 bloques, explicados con Tortas Lupita | 60 |
| 3 | Propuesta de valor y segmentos de clientes | Para quién y qué problema resuelves | 45 |
| 4 | Canales y relación con el cliente | Cómo llega el producto y cómo se cuida al cliente | 45 |
| 5 ★ | Fuentes de ingreso | Venta, suscripción, comisión, publicidad, licencia, gratis con extras | 60 |
| 6 | Recursos, actividades, socios y costos | El lado de atrás del lienzo | 45 |
| 7 | Modelos comparados | Tienda, restaurante, fábrica, plataforma, franquicia, suscripción | 60 |

**Actividades:** lienzo interactivo (se guarda en el navegador) del negocio que elija el estudiante.
**Ejercicios:** identificar la fuente de ingreso de 10 empresas.
**Ejemplos reales:** Netflix (suscripción), Mercado Libre (comisión), Google (publicidad), Gillette (rastrillo y repuestos).
**Caso:** ¿cómo gana dinero una app gratuita?
**Quiz del módulo.**

#### M5. Cómo fluye el dinero I: de la venta a la utilidad (10 lecciones · 10 h 15 min)
**Objetivo:** calcular ingresos, costos, gastos, utilidad, margen, punto de equilibrio y precio.

| # | Lección | Descripción | Min |
|---|---|---|---|
| 1 ★ | El ciclo del dinero | Compras → produces → vendes → cobras → vuelves a comprar | 45 |
| 2 ★ | Ingresos | Ventas, cobros, ticket promedio y número de clientes | 45 |
| 3 ★ | Costos fijos y variables | Cuáles cambian con las ventas y cuáles no | 60 |
| 4 | Gastos de operación | Diferencia entre costo y gasto; gastos que no se ven | 45 |
| 5 ★ | Utilidad bruta, operativa y neta | Qué queda después de cada capa | 60 |
| 6 ★ | El margen | Margen en pesos y en porcentaje; margen frente a sobreprecio (*markup*) | 60 |
| 7 ★ | Punto de equilibrio | Cuántas tortas hay que vender para no perder | 60 |
| 8 ★ | Cómo se fijan los precios | Por costo, por competencia y por valor | 60 |
| 9 | Descuentos y promociones | Cuánto más hay que vender para compensar un descuento | 45 |
| 10 | Errores clásicos con el dinero | Mezclar dinero personal y del negocio, no pagarse sueldo, «vendo mucho y no gano» | 45 |

**Actividades:** calculadoras de margen, precio y punto de equilibrio con datos de Tortas Lupita.
**Ejercicios numéricos (con solución):** costos fijos 18,000 MXN/mes, precio 40, costo variable 16 → punto de equilibrio = 750 tortas/mes.
**Ejemplos reales:** márgenes públicos de supermercados frente a empresas de software (informes anuales).
**Caso:** «Vendo mucho y no me alcanza» (Tortas Lupita).
**Quiz del módulo** (incluye preguntas numéricas).
**Examen del Nivel 1:** 25 preguntas + 2 problemas numéricos (1 h 30 min, aprobación 70 %).

---

### NIVEL 2 · Por dentro del negocio: estructura y áreas

#### M6. Estructura y organigrama (8 lecciones · 8 h 15 min)
**Objetivo:** entender cómo se organiza un negocio por dentro y leer y dibujar organigramas.

| # | Lección | Descripción | Min |
|---|---|---|---|
| 1 ★ | Por qué un negocio necesita estructura | Quién hace qué y a quién reporta | 45 |
| 2 ★ | Cómo leer un organigrama | Niveles, líneas de mando, puestos de apoyo (*staff*) | 45 |
| 3 | La estructura del changarro | El dueño hace todo; familia y ayudantes | 45 |
| 4 ★ | Estructura funcional | Por áreas: la típica de una pyme | 60 |
| 5 | Por divisiones | Por producto, por región o por tipo de cliente | 60 |
| 6 | Matricial, por proyectos y plana | Dos jefes, equipos temporales, pocas capas | 60 |
| 7 | Tramo de control, centralización y delegación | Cuánta gente puede dirigir un jefe y quién decide | 45 |
| 8 | Puestos, perfiles y manuales de organización | Descripción de puesto y manual | 45 |

**Actividades:** constructor de organigramas en la web (arrastrar puestos); organigrama de Tortas Lupita en 4 etapas.
**Ejercicios:** identificar el tipo de estructura de 6 organigramas.
**Ejemplos reales:** estructura por divisiones de Grupo Bimbo (por regiones); estructura plana de Valve (según su manual público).
**Caso:** Tortas Lupita contrata a su quinto empleado y nadie sabe a quién obedecer.
**Quiz del módulo.**

#### M7. Dirección: quién conduce el negocio (7 lecciones · 7 h 30 min)
**Objetivo:** explicar qué hace la dirección y cómo un dueño pasa de hacer todo a dirigir.

| # | Lección | Descripción | Min |
|---|---|---|---|
| 1 ★ | El dueño y el director general | Propiedad frente a dirección | 45 |
| 2 ★ | Planear | Misión, visión, valores y objetivos SMART | 60 |
| 3 | Organizar, dirigir y controlar | El ciclo de la administración | 45 |
| 4 ★ | Indicadores clave (KPI) y tablero | Los 5–8 números que el dueño mira cada semana | 60 |
| 5 | Ritmos de gestión | Junta diaria, semanal y mensual; comunicación interna | 45 |
| 6 | Liderazgo y cultura | Cómo el jefe marca la forma de trabajar | 45 |
| 7 ★ | El dueño que no suelta | Delegar y profesionalizar | 60 |

**Actividades:** redactar misión, visión y 3 objetivos SMART; elegir 6 KPI para Tortas Lupita.
**Ejercicios:** convertir objetivos vagos en SMART.
**Ejemplos reales:** misión publicada de empresas conocidas; el estilo de dirección de Southwest Airlines.
**Caso:** Lupita se enferma dos semanas: ¿sobrevive el negocio sin ella?
**Quiz del módulo.**

#### M8. Finanzas y contabilidad: cómo fluye el dinero II (10 lecciones · 10 h 45 min)
**Objetivo:** leer los estados financieros básicos, controlar la caja y entender cómo se financia un negocio.

| # | Lección | Descripción | Min |
|---|---|---|---|
| 1 | Qué hace el área de finanzas y contabilidad | Registrar, informar, cuidar la caja, conseguir dinero | 45 |
| 2 ★ | El estado de resultados | Ventas − costos − gastos = utilidad | 60 |
| 3 ★ | El balance general | Lo que tienes, lo que debes y lo que es tuyo | 60 |
| 4 ★ | El flujo de caja | Por qué una empresa con utilidades puede quebrar | 60 |
| 5 ★ | Capital de trabajo | Inventarios, cuentas por cobrar y por pagar | 60 |
| 6 | Crédito y cobranza a clientes | Vender a crédito sin hundirse | 45 |
| 7 ★ | El presupuesto anual | Cómo se arma y para qué sirve | 60 |
| 8 | Financiamiento | Ahorro, préstamo, crédito de proveedores, socios | 60 |
| 9 | Razones financieras básicas | Liquidez, endeudamiento y rentabilidad | 60 |
| 10 | Impuestos en el día a día y facturación | Facturas electrónicas (CFDI), declaraciones, contador | 45 |

**Actividades:** armar el estado de resultados y el flujo de caja de 6 meses de Tortas Lupita (calculadora).
**Ejercicios numéricos:** completar un balance; detectar en qué mes se queda sin efectivo.
**Ejemplos reales:** lectura guiada del estado de resultados público de una empresa de la BMV.
**Caso:** «Ganamos, pero no hay para la nómina».
**Quiz del módulo.**

#### M9. Operaciones: procesos diarios, inventarios y calidad (9 lecciones · 9 h 30 min)
**Objetivo:** describir cómo se hace el trabajo diario, cómo se controla el inventario y cómo se cuida la calidad.

| # | Lección | Descripción | Min |
|---|---|---|---|
| 1 ★ | Qué son las operaciones | Convertir insumos en productos o servicios | 45 |
| 2 ★ | Procesos y diagramas de flujo | Mapear un proceso paso a paso | 60 |
| 3 | La rutina diaria | Apertura, operación y cierre (lista de verificación) | 45 |
| 4 | Capacidad y cuellos de botella | Cuántos clientes puedes atender y dónde se atora | 60 |
| 5 ★ | Inventarios | Qué, cuánto y cuándo; clasificación ABC; primeras entradas, primeras salidas | 60 |
| 6 | Punto de reorden e inventario de seguridad | Cuándo pedir para no quedarse sin nada | 60 |
| 7 ★ | Calidad y mejora continua | Estándares, control, Kaizen y 5S | 60 |
| 8 | Logística y entregas | Rutas, tiempos y repartidores | 45 |
| 9 | Procedimientos estándar | Escribir «cómo se hace» para que todos lo hagan igual | 45 |

**Actividades:** diagrama de flujo de «preparar y entregar una torta»; calculadora de punto de reorden.
**Ejercicios:** clasificar 15 insumos en A, B y C; encontrar el cuello de botella en un proceso con tiempos.
**Ejemplos reales:** sistema de producción de Toyota; manuales de operación de cadenas de comida rápida.
**Caso:** la hora pico de Tortas Lupita: filas de 25 minutos.
**Quiz del módulo.**

#### M10. Compras y proveedores (7 lecciones · 7 h 15 min)
**Objetivo:** elegir, evaluar y negociar con proveedores.

| # | Lección | Descripción | Min |
|---|---|---|---|
| 1 | Qué hace el área de compras | Comprar lo correcto, al precio y en el momento correctos | 45 |
| 2 ★ | Cómo elegir proveedores | Precio, calidad, plazo, confiabilidad: matriz de evaluación | 60 |
| 3 | Cotizar y comparar | Comparar «manzanas con manzanas»; costo total | 45 |
| 4 ★ | Negociar con proveedores | Preparación, alternativas (MAAN), concesiones | 60 |
| 5 | Órdenes de compra, contratos y crédito de proveedor | Los papeles que te protegen | 45 |
| 6 | El riesgo del proveedor único | Dependencia y cómo diversificar | 45 |
| 7 | Relaciones de largo plazo y cadena de suministro | Del campo a la mesa | 45 |

**Actividades:** matriz de evaluación de 3 panaderías que surten pan a Tortas Lupita; juego de rol de negociación.
**Ejercicios:** calcular el costo total de dos ofertas con distinto crédito y flete.
**Ejemplos reales:** Walmart y su relación con proveedores; escasez de chips de 2021 en la industria automotriz.
**Caso:** el proveedor de pan sube 20 % el precio.
**Quiz del módulo.**

#### M11. Ventas y clientes: conseguirlos y conservarlos (9 lecciones · 9 h 30 min)
**Objetivo:** explicar cómo se consigue un cliente, cómo se le vende y cómo se le conserva.

| # | Lección | Descripción | Min |
|---|---|---|---|
| 1 | Qué hace el área de ventas | Vendedores, metas, comisiones | 45 |
| 2 ★ | Quién es tu cliente | Perfil, necesidades y motivos de compra | 45 |
| 3 ★ | El embudo de ventas | De desconocido a cliente frecuente | 60 |
| 4 ★ | Cómo se consigue un cliente | Ubicación, recomendación, redes, vendedores, distribuidores | 60 |
| 5 | El proceso de venta | Atender, escuchar, ofrecer, cerrar | 60 |
| 6 | Vender a personas y a empresas | B2C frente a B2B | 45 |
| 7 | Servicio al cliente y quejas | Convertir una queja en lealtad | 45 |
| 8 ★ | Retener clientes | Lealtad, recompra y valor de vida del cliente | 60 |
| 9 | Métricas de ventas | Ticket promedio, conversión, costo de adquirir un cliente (CAC), valor de vida (LTV) | 60 |

**Actividades:** embudo de ventas de Tortas Lupita; calculadora CAC/LTV.
**Ejercicios numéricos:** 1,000 personas pasan, 120 compran, ticket 85 → conversión 12 % y ventas 10,200 MXN.
**Ejemplos reales:** programas de lealtad (Starbucks Rewards); venta por catálogo (Natura, Avon).
**Caso:** una empresa de oficinas quiere 200 tortas diarias a crédito.
**Quiz del módulo.**

#### M12. Marketing (8 lecciones · 8 h 30 min)
**Objetivo:** entender cómo un negocio se da a conocer, se diferencia y mide su marketing.

| # | Lección | Descripción | Min |
|---|---|---|---|
| 1 | Marketing y ventas: no son lo mismo | Atraer frente a cerrar | 45 |
| 2 | Investigación de mercado barata | Encuestas, observación, competencia | 60 |
| 3 ★ | Segmentación y posicionamiento | A quién le hablas y qué lugar quieres ocupar | 60 |
| 4 ★ | Las 4P | Producto, precio, plaza y promoción | 60 |
| 5 | La marca | Nombre, logo, promesa y experiencia | 45 |
| 6 ★ | Marketing digital | Redes sociales, WhatsApp Business, Google Maps, reseñas | 60 |
| 7 | Publicidad y presupuesto de marketing | Cuánto gastar y dónde | 45 |
| 8 | Medir el marketing | Alcance, clics, ventas atribuidas, retorno | 45 |

**Actividades:** plan de marketing de una página para Tortas Lupita.
**Ejercicios:** identificar las 4P de 5 productos conocidos.
**Ejemplos reales:** reposicionamiento de marcas mexicanas conocidas; campañas de Coca-Cola.
**Caso:** abre una cadena de tortas enfrente: ¿bajar el precio o diferenciarse?
**Quiz del módulo.**

#### M13. Recursos humanos (8 lecciones · 8 h 15 min)
**Objetivo:** explicar cómo se consigue, contrata, paga, desarrolla y despide a las personas.

| # | Lección | Descripción | Min |
|---|---|---|---|
| 1 | Qué hace recursos humanos | El ciclo de vida del empleado | 45 |
| 2 ★ | Reclutar y seleccionar | Perfil, vacante, entrevista | 60 |
| 3 ★ | Contratar | Contrato, alta en el IMSS, prestaciones de ley | 60 |
| 4 | Inducción y capacitación | El primer día y el aprendizaje continuo | 45 |
| 5 ★ | Nómina y costo real de un empleado | Sueldo + cuotas + prestaciones | 60 |
| 6 | Desempeño y motivación | Evaluar, reconocer, dar retroalimentación | 45 |
| 7 | Rotación, clima y cultura | Cuánto cuesta que la gente se vaya | 45 |
| 8 | Renuncias, despidos y conflictos | Finiquito, liquidación y trato digno | 45 |

**Actividades:** descripción de puesto de «tortero» y guía de entrevista; calculadora del costo de un empleado (porcentajes editables y aviso de verificar con un contador).
**Ejercicios:** calcular la rotación anual.
**Ejemplos reales:** prácticas públicas de selección de Google; capacitación en cadenas de restaurantes.
**Caso:** la rotación de Tortas Lupita llega al 80 % anual.
**Quiz del módulo.**

#### M14. Legal y cumplimiento (6 lecciones · 6 h 30 min)
**Objetivo:** reconocer las obligaciones legales básicas y los riesgos legales más comunes.

| # | Lección | Descripción | Min |
|---|---|---|---|
| 1 | Qué hace el área legal | De un abogado externo a un departamento jurídico | 45 |
| 2 ★ | Contratos básicos | Arrendamiento, proveedor, trabajo, socios | 60 |
| 3 | Propiedad intelectual | Registro de marca y patentes (IMPI) | 45 |
| 4 | Consumidor y datos personales | Profeco, garantías, aviso de privacidad | 45 |
| 5 ★ | Obligaciones fiscales, laborales y sanitarias | SAT, IMSS, Cofepris, Protección Civil | 60 |
| 6 | Cumplimiento y prevención | Lista de verificación legal del negocio | 45 |

**Actividades:** lista de verificación legal de Tortas Lupita.
**Ejercicios:** identificar el riesgo legal en 8 situaciones.
**Ejemplos reales:** disputas públicas por marcas registradas.
**Caso:** alguien registra la marca «Tortas Lupita» antes que ella.
**Quiz del módulo.**

#### M15. Tecnología y sistemas (7 lecciones · 7 h 30 min)
**Objetivo:** conocer las herramientas y sistemas que usa un negocio según su tamaño.

| # | Lección | Descripción | Min |
|---|---|---|---|
| 1 | El papel de la tecnología | Del cuaderno al sistema integral | 45 |
| 2 ★ | Punto de venta y control de caja | Terminal, corte de caja, pagos digitales | 45 |
| 3 ★ | La hoja de cálculo para el negocio | Ventas, inventario y flujo en una hoja | 60 |
| 4 | Sistemas administrativos y ERP | Qué son y cuándo se necesitan | 60 |
| 5 | CRM y comercio electrónico | Guardar clientes y vender en línea | 45 |
| 6 | Ciberseguridad y respaldos | Fraudes, contraseñas, copias de seguridad | 45 |
| 7 | Datos, automatización e inteligencia artificial | Usos reales y límites | 60 |

**Actividades:** elegir la tecnología de Tortas Lupita en cada etapa (tabla).
**Ejercicios:** emparejar problema ↔ sistema.
**Ejemplos reales:** pagos con terminal y QR en negocios chicos; el ERP en grandes empresas.
**Caso:** un fraude por WhatsApp se hace pasar por el proveedor.
**Quiz del módulo.**
**Examen del Nivel 2:** 25 preguntas + 2 problemas + 1 minicaso (1 h 30 min).

---

### NIVEL 3 · Decidir, crecer y escalar

#### M16. Cómo se toman decisiones (8 lecciones · 8 h 15 min)
**Objetivo:** explicar quién decide qué en un negocio y cómo decidir bien.

| # | Lección | Descripción | Min |
|---|---|---|---|
| 1 | Tipos de decisión | Estratégicas, tácticas y operativas | 45 |
| 2 ★ | Quién decide qué | Dueño, gerentes y empleados; matriz de autoridad | 45 |
| 3 ★ | Un proceso para decidir bien | Problema → opciones → criterios → decisión → revisión | 45 |
| 4 ★ | Decidir con datos | Qué medir, cómo leerlo, cuándo no basta | 60 |
| 5 | Sesgos al decidir | Exceso de confianza, costo hundido, confirmación | 45 |
| 6 | Costo-beneficio y escenarios | Pesimista, probable, optimista | 60 |
| 7 ★ | Riesgos | Identificar, medir y reducir (matriz de riesgos) | 60 |
| 8 | Decidir en crisis | Pandemia, robo, pérdida del cliente principal | 45 |

**Actividades:** matriz de riesgos de Tortas Lupita; árbol de decisión «¿abrir los domingos?».
**Ejercicios:** identificar el sesgo en 8 historias.
**Ejemplos reales:** decisiones de restaurantes durante la pandemia de 2020.
**Caso:** comprar una máquina de 120,000 MXN o contratar a otra persona.
**Quiz del módulo.**

#### M17. Presupuestos, indicadores y control (7 lecciones · 7 h 45 min)
**Objetivo:** usar presupuestos e indicadores para controlar el negocio.

| # | Lección | Descripción | Min |
|---|---|---|---|
| 1 | El presupuesto como herramienta de decisión | Plan en números | 45 |
| 2 ★ | Presupuesto de ventas, gastos y efectivo | Paso a paso | 60 |
| 3 ★ | Real contra presupuesto | Analizar las diferencias y actuar | 60 |
| 4 ★ | Tablero de control | Indicadores financieros, de clientes, de procesos y de personas | 60 |
| 5 | Evaluar una inversión | Periodo de recuperación y valor presente (versión sencilla) | 60 |
| 6 | Control interno | Evitar robos, fugas y «hormigas» | 45 |
| 7 | La auditoría | Interna y externa: qué revisan | 45 |

**Actividades:** calculadoras de real contra presupuesto y de periodo de recuperación.
**Ejercicios numéricos:** inversión de 60,000 MXN que ahorra 5,000 al mes → se recupera en 12 meses.
**Ejemplos reales:** fraudes por falta de control interno reportados públicamente.
**Caso:** falta dinero en caja todos los viernes.
**Quiz del módulo.**

#### M18. Las etapas del crecimiento (8 lecciones · 8 h 30 min)
**Objetivo:** reconocer en qué etapa está un negocio y qué necesita para pasar a la siguiente.

| # | Lección | Descripción | Min |
|---|---|---|---|
| 1 ★ | Las etapas de un negocio | Modelos de Greiner y de Churchill y Lewis | 60 |
| 2 | Del autoempleo al primer empleado | El primer gran salto | 45 |
| 3 ★ | Profesionalizar | Procesos, finanzas separadas, gerentes | 60 |
| 4 ★ | La empresa familiar y la sucesión | Familia, propiedad y negocio | 60 |
| 5 | Crecer sin quedarse sin dinero | Crecimiento y flujo de caja | 45 |
| 6 | Estrategias de crecimiento | Matriz de Ansoff | 60 |
| 7 | Formalizarse para vender a empresas grandes | Requisitos de clientes corporativos | 45 |
| 8 | Cuándo no conviene crecer | Negocios de estilo de vida | 45 |

**Actividades:** diagnóstico de la etapa de un negocio conocido.
**Ejercicios:** ubicar 6 negocios en la matriz de Ansoff.
**Ejemplos reales:** historia de Grupo Bimbo (de una panadería en 1945 a empresa global).
**Caso:** el hijo de Lupita quiere crecer rápido; ella no.
**Quiz del módulo.**

#### M19. Financiar el crecimiento (7 lecciones · 7 h 45 min)
**Objetivo:** comparar las formas de conseguir dinero para crecer.

| # | Lección | Descripción | Min |
|---|---|---|---|
| 1 | Opciones de financiamiento | Mapa general | 45 |
| 2 ★ | Crédito bancario y de fomento | Tasas, garantías, Nafin | 60 |
| 3 ★ | Socios e inversionistas | Repartir la empresa: participación y control | 60 |
| 4 | Inversionistas ángel y capital emprendedor | Cómo funcionan y qué esperan | 45 |
| 5 | Cuánto vale un negocio | Valuación sencilla por múltiplos | 60 |
| 6 ★ | Deuda o capital | Ventajas y riesgos de cada uno | 45 |
| 7 | El plan de negocio y la presentación a inversionistas | Qué preguntan y cómo responder | 60 |

**Actividades:** tabla de participación (quién tiene qué porcentaje) antes y después de una inversión.
**Ejercicios numéricos:** el inversionista pone 500,000 por el 20 % → valuación posterior de 2.5 millones.
**Ejemplos reales:** rondas públicas de empresas latinoamericanas (Kavak, Rappi).
**Caso:** banco o socio para abrir la segunda sucursal.
**Quiz del módulo.**

#### M20. Sucursales y cadenas (7 lecciones · 7 h 45 min)
**Objetivo:** entender cómo se replica un negocio en varias ubicaciones.

| # | Lección | Descripción | Min |
|---|---|---|---|
| 1 | Cuándo abrir una segunda sucursal | Señales y requisitos | 45 |
| 2 ★ | Elegir la ubicación | Flujo de personas, competencia, renta | 60 |
| 3 ★ | Estandarizar | Que todas las sucursales sean iguales | 60 |
| 4 | Gerentes de sucursal y estructura regional | Nuevos puestos y nuevos niveles | 45 |
| 5 | Centro de distribución y cocina central | Producir en un lugar, vender en muchos | 45 |
| 6 | Indicadores por sucursal | Comparar sucursales con justicia | 60 |
| 7 ★ | Caso: OXXO | Cómo FEMSA creció a miles de tiendas (datos de informes públicos) | 60 |

**Actividades:** evaluación de 3 ubicaciones con matriz ponderada.
**Ejercicios:** comparar 4 sucursales por ventas por metro cuadrado y margen.
**Caso:** la segunda sucursal de Tortas Lupita vende la mitad que la primera.
**Quiz del módulo.**

#### M21. Franquicias (7 lecciones · 8 h)
**Objetivo:** entender cómo funciona una franquicia desde los dos lados.

| # | Lección | Descripción | Min |
|---|---|---|---|
| 1 ★ | Qué es una franquicia | Vender el derecho a usar tu marca y tu sistema | 45 |
| 2 ★ | Franquiciante y franquiciatario | Derechos y obligaciones de cada uno | 60 |
| 3 | Cuotas, regalías y manual de operación | Cómo gana dinero cada parte | 60 |
| 4 | Convertir un negocio en franquicia | Requisitos y pasos | 60 |
| 5 | Comprar una franquicia | Cómo evaluarla; la Circular de Oferta de Franquicia | 60 |
| 6 | Otros modelos | Licencias, concesiones y distribuidores | 45 |
| 7 ★ | Caso: McDonald's | El negocio de la marca y de los inmuebles (informes públicos) | 60 |

**Actividades:** calcular cuánto gana un franquiciatario con cuota inicial y regalías.
**Ejercicios numéricos:** ventas de 400,000 al mes, regalía 6 % y publicidad 2 % → 32,000 de pagos mensuales.
**Ejemplos reales:** franquicias mexicanas conocidas (Farmacias Similares, Tacos Bambino u otras con datos públicos).
**Caso:** ¿Tortas Lupita debe franquiciar o abrir sucursales propias?
**Quiz del módulo.**

#### M22. Expansión: nuevos mercados, países y adquisiciones (8 lecciones · 8 h 30 min)
**Objetivo:** comparar las formas de expandirse y por qué fallan.

| # | Lección | Descripción | Min |
|---|---|---|---|
| 1 | Expansión a otras ciudades | Lo que cambia fuera de casa | 45 |
| 2 | Nuevos productos y líneas | Extender la marca | 45 |
| 3 | Comercio electrónico y plataformas | Vender en línea y en apps de reparto | 45 |
| 4 ★ | Exportar e internacionalizarse | Formas de entrar a otro país | 60 |
| 5 | Alianzas y empresas conjuntas | Crecer con otro | 45 |
| 6 ★ | Fusiones y adquisiciones | Comprar otra empresa: por qué y cómo | 60 |
| 7 | Integración vertical y horizontal | Comprar a tu proveedor o a tu competidor | 60 |
| 8 ★ | Por qué fracasan las expansiones | Target en Canadá y otros casos públicos | 60 |

**Actividades:** plan de expansión de una página para Tortas Lupita.
**Ejercicios:** clasificar 8 adquisiciones como verticales u horizontales.
**Ejemplos reales:** compra de Grupo Modelo por AB InBev (2013); Walmart y la compra de Cifra (1997).
**Caso:** abrir en Monterrey o vender por apps en toda la ciudad.
**Quiz del módulo.**
**Examen del Nivel 3:** 25 preguntas + 2 problemas + 1 minicaso (1 h 30 min).

---

### NIVEL 4 · Empresas gigantes

#### M23. Anatomía de una corporación (8 lecciones · 8 h 30 min)
**Objetivo:** describir cómo está armada por dentro una empresa gigante.

| # | Lección | Descripción | Min |
|---|---|---|---|
| 1 | Qué hace «gigante» a una empresa | Escala, alcance, número de países y marcas | 45 |
| 2 ★ | Grupo, holding y subsidiarias | Empresas dentro de empresas | 60 |
| 3 | Unidades de negocio y divisiones | Cada una con su director y sus números | 45 |
| 4 ★ | El corporativo y los servicios compartidos | Qué hacen las oficinas centrales | 60 |
| 5 ★ | Los altos directivos | CEO, CFO, COO, CMO, CTO, director de personas, director jurídico | 60 |
| 6 | Cómo fluye el dinero en un gigante | Presupuesto corporativo y asignación de capital | 60 |
| 7 | Los conglomerados | Grupo Carso, Berkshire Hathaway, Alphabet | 45 |
| 8 | Burocracia y silos | Cómo los gigantes intentan seguir siendo ágiles | 45 |

**Actividades:** mapa de la estructura de un grupo real con su informe anual.
**Ejercicios:** emparejar directivo ↔ responsabilidad.
**Caso:** Tortas Lupita se convierte en «Grupo Lupita» con 3 marcas: ¿qué hace el corporativo?
**Quiz del módulo.**

#### M24. Gobierno corporativo: quién manda en una empresa grande (9 lecciones · 9 h 15 min)
**Objetivo:** explicar el papel de accionistas, asamblea, consejo, comités y CEO.

| # | Lección | Descripción | Min |
|---|---|---|---|
| 1 ★ | Qué es el gobierno corporativo | Las reglas de quién decide y quién vigila | 45 |
| 2 ★ | Los accionistas | Tipos de acciones, derechos y la asamblea | 60 |
| 3 ★ | El consejo de administración | Funciones y comités (auditoría, prácticas societarias) | 60 |
| 4 | Consejeros independientes | Por qué existen y qué aportan | 45 |
| 5 ★ | El CEO y el consejo | Quién contrata, evalúa y despide al director general | 45 |
| 6 | El problema de agencia | Cuando los directivos no piensan como los dueños | 60 |
| 7 | Gobierno en empresas familiares grandes | Protocolo familiar y consejo de familia | 45 |
| 8 | Reglas en México | Ley del Mercado de Valores y Código de Principios y Mejores Prácticas | 45 |
| 9 ★ | Cuando el gobierno falla | Enron, Wirecard y WeWork | 60 |

**Actividades:** organigrama de gobierno (asamblea → consejo → comités → CEO → directivos).
**Ejercicios:** ¿quién decide? (asamblea, consejo o CEO) en 12 decisiones.
**Ejemplos reales:** composición del consejo publicada en informes de empresas de la BMV.
**Caso:** el fundador quiere seguir decidiendo todo con el 30 % de las acciones.
**Quiz del módulo.**

#### M25. Empresas en la bolsa (7 lecciones · 7 h 15 min)
**Objetivo:** entender qué significa que una empresa cotice en bolsa y leer sus informes.

| # | Lección | Descripción | Min |
|---|---|---|---|
| 1 ★ | Qué es una acción | Ser dueño de un pedacito | 45 |
| 2 | Salir a bolsa | Oferta pública inicial: por qué y cómo | 60 |
| 3 | Las bolsas | BMV, BIVA, Nueva York y Nasdaq | 45 |
| 4 ★ | Informes trimestrales y anuales | Qué leer primero | 60 |
| 5 | Valor de mercado | Por qué sube o baja el precio de la acción | 45 |
| 6 | Dividendos y recompras | Cómo regresan dinero a los accionistas | 45 |
| 7 | Gigantes privados y capital privado | Empresas grandes que no cotizan | 45 |

**Actividades:** ficha de una empresa de la BMV a partir de su informe anual.
**Ejercicios numéricos:** valor de mercado = precio × número de acciones.
**Aviso:** contenido educativo, no es recomendación de inversión.
**Caso:** «Grupo Lupita» evalúa salir a bolsa (ficticio).
**Quiz del módulo.**

#### M26. La estrategia de los gigantes (8 lecciones · 8 h 15 min)
**Objetivo:** explicar por qué algunas empresas se vuelven gigantes y cómo compiten.

| # | Lección | Descripción | Min |
|---|---|---|---|
| 1 ★ | Ventaja competitiva | Costo, diferenciación y enfoque (Porter) | 60 |
| 2 ★ | Economías de escala y de alcance | Por qué lo grande sale más barato | 45 |
| 3 | Las cinco fuerzas | Cómo se analiza una industria | 60 |
| 4 ★ | Plataformas y efecto red | Mercado Libre, Uber, Airbnb | 45 |
| 5 | Ecosistemas y portafolios de marcas | Muchas marcas, un dueño | 45 |
| 6 | Innovación y disrupción | Cómo los nuevos tumban a los viejos | 60 |
| 7 | Operar en muchos países | Global frente a local | 45 |
| 8 | Monopolios y competencia | Reguladores (Cofece) y casos públicos | 45 |

**Actividades:** análisis de cinco fuerzas de la industria de las tiendas de conveniencia.
**Ejercicios:** identificar el tipo de ventaja de 8 empresas.
**Caso:** ¿por qué Amazon pierde dinero en algunos negocios y gana en otros?
**Quiz del módulo.**

#### M27. Ética, responsabilidad, crisis y fracasos (7 lecciones · 7 h 30 min)
**Objetivo:** analizar la responsabilidad de las empresas y por qué caen los gigantes.

| # | Lección | Descripción | Min |
|---|---|---|---|
| 1 | Ética empresarial | Dilemas reales en negocios chicos y grandes | 45 |
| 2 ★ | Responsabilidad social y criterios ASG | Ambiente, sociedad y gobierno | 60 |
| 3 | Corrupción y cumplimiento | Programas de integridad | 45 |
| 4 | Crisis y reputación | Cómo responder a una crisis pública | 60 |
| 5 ★ | Gigantes que cayeron | Kodak, Blockbuster y Nokia | 60 |
| 6 | Quiebras y reestructuras | Mexicana de Aviación (2010), General Motors (2009) | 45 |
| 7 | Lecciones: por qué caen los gigantes | Patrones comunes | 45 |

**Actividades:** plan de respuesta a una crisis en Tortas Lupita (intoxicación en una sucursal).
**Ejercicios:** detectar el patrón de caída en 5 casos breves.
**Quiz del módulo.**

#### M28. Radiografía de empresas reales (8 lecciones · 11 h 30 min)
**Objetivo:** aplicar todo el curso al análisis de empresas reales. Cada lección es un caso completo (75 min) con la misma ficha: origen, modelo de negocio, estructura, áreas, dinero, decisiones clave, crecimiento, gobierno, lecciones y fuentes.

| # | Lección | Enfoque | Min |
|---|---|---|---|
| 1 | Una tienda de abarrotes de barrio | Ficticio con datos del INEGI: el changarro completo | 75 |
| 2 | Grupo Bimbo | De panadería familiar a empresa global; empresa familiar en bolsa | 75 |
| 3 | Walmart y Walmart de México | Compras, logística y escala | 75 |
| 4 | Inditex (Zara) | Cadena de suministro rápida | 75 |
| 5 | Toyota | Procesos y calidad | 75 |
| 6 | Mercado Libre | De empresa emergente a plataforma latinoamericana | 75 |
| 7 | Amazon | Varios negocios en uno (tienda, marketplace, AWS) | 75 |
| 8 | Cemex | Internacionalización y crisis de deuda de 2008 | 75 |

**Quiz del módulo** (preguntas sobre los 8 casos).

#### M29. Proyecto final integrador (4 lecciones · 6 h)
**Objetivo:** hacer la radiografía completa de un negocio real que el estudiante conozca.

| # | Lección | Descripción | Min |
|---|---|---|---|
| 1 | Elegir el negocio y armar su ficha | Tamaño, sector, forma legal, modelo de negocio | 60 |
| 2 | Radiografía interna | Organigrama, áreas, procesos, clientes, proveedores, números | 120 |
| 3 | Plan de crecimiento | Del tamaño actual al siguiente: decisiones, riesgos, financiamiento | 120 |
| 4 | Presentación y autoevaluación | Exportar el proyecto y evaluarlo con la rúbrica | 60 |

**Rúbrica:** modelo de negocio (15 %) · estructura y áreas (20 %) · números (20 %) · clientes y proveedores (15 %) · plan de crecimiento y riesgos (20 %) · claridad (10 %).
**Examen del Nivel 4:** 25 preguntas + 1 minicaso (1 h 30 min).

### Evaluación final (2 h)
40 preguntas de todo el curso (10 por nivel) + 2 problemas numéricos + 1 caso integrador. Aprobación 70 %. Con el proyecto final completado se obtiene el **certificado del curso** (generado en el navegador, imprimible).

---

## 5. Evaluaciones

| Evaluación | Formato | Aprobación | Intentos |
|---|---|---|---|
| Mini-quiz de lección | 4 preguntas | 75 % (3 de 4) | Ilimitados |
| Quiz de módulo | 10 preguntas al azar de un banco de 20 | 70 % | Ilimitados (preguntas nuevas en cada intento) |
| Examen de nivel | 25 preguntas + problemas o minicaso | 70 % | Ilimitados |
| Evaluación final | 40 preguntas + 2 problemas + 1 caso | 70 % | Ilimitados |
| Proyecto final | Autoevaluación con rúbrica | 70 % | Reentrega |

**Tipos de pregunta:** opción múltiple · verdadero o falso · respuesta numérica con tolerancia · emparejar · ordenar pasos · minicaso «¿Qué harías?» con respuesta modelo. Cada pregunta guarda la explicación de la respuesta correcta y del error típico.

**Volumen:** ≈ 890 preguntas de mini-quiz + ≈ 560 de banco de módulos + ≈ 140 de exámenes y final ≈ **1,600 preguntas**.

---

## 6. La web: estructura de archivos

```
sitios/como-funciona-un-negocio/
  index.html              cabecera, buscador, botón de tema, menú móvil, barra inferior
  styles.css              variables de color, modo claro/oscuro, diseño adaptable
  app.js                  rutas, páginas, buscador, progreso, quizzes, certificado
  tools.js                calculadoras y lienzos interactivos
  data-curso.js           niveles, módulos (objetivo, horas, actividades, casos, quiz)
  data-lecciones-1.js     texto completo de las lecciones del Nivel 1
  data-lecciones-2.js     ídem Nivel 2
  data-lecciones-3.js     ídem Nivel 3
  data-lecciones-4.js     ídem Nivel 4
  data-quizzes.js         bancos de módulo, exámenes de nivel y evaluación final
  data-casos.js           casos de empresas reales y de Tortas Lupita
  data-glosario.js        ≈ 250 términos
  pruebas.js              comprobaciones automáticas (node pruebas.js)
```

Además: `planes/plan-7-como-funciona-un-negocio.md` (este plan) y una fila nueva en `README.md` / `LEEME.md`.

### Rutas (hash, sin servidor)
`#/` inicio · `#/curso` mapa por niveles · `#/nivel/1` · `#/m/M5` módulo · `#/m/M5/3` lección · `#/m/M5/quiz` · `#/examen/nivel-1` · `#/examen-final` · `#/proyecto` · `#/casos` y `#/casos/oxxo` · `#/herramientas` y `#/herramientas/punto-de-equilibrio` · `#/glosario` y `#/glosario/margen` · `#/buscar?q=` · `#/mi-progreso` · `#/certificado` · `#/acerca` · `#/aviso-legal`.

### Funcionalidades
- **Navegación por niveles → módulos → lecciones:** migas de pan, barra lateral del módulo con el estado de cada lección, botones anterior/siguiente, «Continuar donde me quedé».
- **Buscador** en la cabecera: busca en títulos y texto de lecciones, casos, glosario y herramientas; sin acentos ni mayúsculas; resultados agrupados con fragmento resaltado.
- **Progreso guardado (localStorage, clave `negocio-v1`):** lecciones completadas, resultados de quizzes y exámenes, notas por lección, lienzos y proyecto, última lección, racha; barra de progreso global, por nivel y por módulo; exportar e importar el progreso en un archivo JSON y botón de reinicio con confirmación. Todo protegido con `try/catch` (la web funciona aunque el navegador bloquee el almacenamiento).
- **Quizzes** por lección, módulo, nivel y final, con retroalimentación inmediata y mejor resultado guardado.
- **Calculadoras** (`tools.js`) con interpretación en lenguaje sencillo: margen y sobreprecio, precio, punto de equilibrio, efecto de un descuento, estado de resultados, flujo de caja de 6 meses, costo de un empleado, punto de reorden, CAC/LTV, real contra presupuesto, periodo de recuperación, regalías de franquicia, tabla de participación; más lienzo de modelo de negocio y constructor de organigramas.
- **Glosario** alfabético con buscador, letra índice y enlaces a las lecciones donde aparece cada término.
- **Insignias:** Primer peso (M5), Organigrama (M6), Dueño de los números (M8), Cazador de cuellos de botella (M9), Negociador (M10), Franquiciante (M21), Consejero (M24), Radiólogo de empresas (M28), Director general (curso completo).
- **Diseño:** adaptable a celular (desde 360 px, menú hamburguesa y barra inferior), tableta y PC; **modo claro y oscuro** (respeta el sistema y se puede cambiar; se recuerda la elección); un color por nivel; tipografía del sistema, sin dependencias externas; contraste WCAG AA; navegable con teclado; enlace «Saltar al contenido»; impresión limpia de lecciones y certificado.
- **Pie:** aviso de contenido educativo (no es asesoría legal, fiscal ni de inversión) y aviso de que el progreso se guarda solo en el navegador.

---

## 7. Fases de construcción (al aprobar)

1. **Base:** `index.html`, `styles.css`, `app.js`, `tools.js`, `data-curso.js` con los 29 módulos; páginas de inicio, curso, nivel, módulo, lección, quiz, progreso, glosario y buscador; `pruebas.js`. Commit.
2. **Nivel 1 completo** (41 lecciones con texto, mini-quizzes, bancos de módulo, examen) + calculadoras de dinero. Commit.
3. **Nivel 2 completo** (79 lecciones) + organigrama, estados financieros, punto de reorden, CAC/LTV, costo de empleado. Commit.
4. **Nivel 3 completo** (52 lecciones) + presupuesto, recuperación, regalías, participación. Commit.
5. **Nivel 4 completo** (51 lecciones), casos, evaluación final, proyecto, certificado, insignias, glosario final. Commit.
6. **Pruebas completas, README/LEEME y plan en `planes/`.** Push a `claude/nice-cannon-npf31y`.

## 8. Criterios de calidad y pruebas antes de subir

**Automáticas (`node sitios/como-funciona-un-negocio/pruebas.js`):**
- Conteos exactos: 4 niveles, 29 módulos, 223 lecciones; horas de cada módulo = suma de sus lecciones + actividades + quiz; total ≈ 249 h.
- Cada lección tiene todas las partes de la plantilla (§2.1) y al menos 800 palabras de explicación.
- Cada pregunta tiene opciones válidas, índice de respuesta dentro del rango y explicación; cada banco de módulo tiene ≥ 20 preguntas; sin preguntas duplicadas.
- Fórmulas verificadas con ejemplos de control (punto de equilibrio 750 tortas; conversión 12 %; recuperación 12 meses; valuación 2.5 millones; regalías 32,000).
- Todos los enlaces internos (`#/…`), términos del glosario y referencias a casos existen; identificadores únicos.
- `node --check` sin errores en todos los `.js`.

**En navegador (Playwright con el Chromium instalado, script en el scratchpad, no en el repo):**
- Abrir `index.html` con `file://` y recorrer **todas las rutas** (≈ 300 páginas) en PC (1280 px) y celular (390 px), en modo claro y oscuro: cero errores de consola, ninguna página vacía, sin desplazamiento horizontal.
- Flujo completo: completar una lección → aprobar un quiz → recargar → el progreso sigue ahí; exportar/importar progreso; reiniciar.
- Buscador: «margen», «organigrama», «consejo», «franquicia» devuelven resultados correctos; búsqueda sin acentos funciona.
- Calculadoras: valores de control dan el resultado esperado; entradas vacías o negativas muestran aviso, no errores.
- Capturas de pantalla de inicio, lección, quiz y glosario en PC y celular para revisión visual.

**Contenido:**
- Todo en español, sin textos en inglés salvo términos explicados (*markup*, CEO).
- Datos de empresas reales con fuente pública; lo ficticio marcado como tal.
- Avisos legales y fiscales en los módulos M3, M8, M13, M14, M19 y M25.

---

## 9. Resumen

- **4 niveles · 29 módulos · 223 lecciones · ≈ 249 horas** (≈ 240 h 45 min de módulos + 6 h de exámenes de nivel + 2 h de evaluación final).
  - Nivel 1: 5 módulos, 41 lecciones, 44 h.
  - Nivel 2: 10 módulos, 79 lecciones, 85 h.
  - Nivel 3: 7 módulos, 52 lecciones, 58 h.
  - Nivel 4: 7 módulos, 51 lecciones, 59 h 45 min.
- ≈ 1,600 preguntas, ≈ 40 casos, 13 calculadoras + 2 herramientas visuales, ≈ 250 términos de glosario.
- Web estática en `sitios/como-funciona-un-negocio/`, sin servidor ni internet, con texto completo en cada lección.
