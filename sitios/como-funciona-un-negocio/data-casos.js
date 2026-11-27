// Casos de estudio: reales (con fuentes públicas) y ficticios (marcados).
window.CASOS = window.CASOS || [];
// ===== NIVEL 1 =====
window.CASOS.push(
{id:"tienda-don-chuy", t:"La tienda de Don Chuy: ¿por qué cerró si tenía clientes?", mod:"M1", tipo:"ficticio",
ctx:`Don Chuy abrió una tienda de abarrotes en 2015 en una colonia popular. Durante años tuvo clientes fieles: los vecinos compraban refrescos, pan, huevo y botanas, y muchos pedían fiado hasta el viernes. En 2022 abrió una tienda de conveniencia de cadena a dos cuadras. En 2024, Don Chuy cerró debiendo dinero a dos proveedores.`,
dil:`¿Qué piezas del negocio fallaron y qué pudo hacer Don Chuy para seguir abierto?`,
datos:`| Dato | Antes de 2022 | 2023 |
|---|---|---|
| Clientes por día | 180 | 120 |
| Ticket promedio | 48 pesos | 41 pesos |
| Fiado pendiente | 3,000 pesos | 14,000 pesos |
| Registro de ventas | Ninguno | Ninguno |
| Pagos digitales | No aceptaba | No aceptaba |
| Horario | 7:00 a 21:00 | 8:00 a 20:00 (por cansancio) |`,
preg:["Usa las seis piezas del negocio (cliente, producto, dinero, personas, procesos, información) para identificar cuáles fallaron.","¿Qué factores del entorno (PESTEL) cambiaron entre 2022 y 2023?","¿Qué señales de alerta pudo ver antes de cerrar?","Propón tres acciones concretas que habrían ayudado a Don Chuy a competir con la cadena."],
resp:`**Piezas que fallaron:** la **información** (no sabía cuánto vendía ni cuánto ganaba), el **dinero** (el fiado se multiplicó casi por cinco y le quitó efectivo para pagar a proveedores) y las **personas** (él solo, cansado, redujo el horario justo cuando más competencia había). El **cliente** no desapareció, pero se repartió con la cadena.

**Entorno:** competencia nueva (cadena con horarios largos y pagos digitales), cambio tecnológico (los clientes querían pagar con tarjeta o transferencia) e inflación (los clientes compraban menos por visita).

**Señales de alerta:** caída de clientes y de ticket, fiado creciente, falta de efectivo para pagar a tiempo a proveedores.

**Acciones posibles:** aceptar pagos digitales y recargas, limitar y registrar el fiado, recuperar el horario con ayuda de un familiar, ofrecer lo que la cadena no da (venta por pieza, productos locales, entregas a domicilio por WhatsApp) y anotar ventas y gastos para saber qué productos dejaban más.`,
lec:["La competencia no siempre cierra a un negocio; muchas veces lo hace la falta de información y de control del dinero.","El fiado sin control es un préstamo sin intereses que puede dejar sin efectivo al negocio.","Adaptarse al entorno (pagos digitales, horarios) es parte del trabajo del dueño."]},
{id:"tres-taquerias", t:"El mismo giro en tres tamaños: taquería de barrio, cadena regional y cadena nacional", mod:"M2", tipo:"ficticio",
ctx:`Tres negocios venden tacos al pastor. «Tacos El Güero» es un puesto familiar con 3 personas. «Taquerías La Fogata» es una cadena regional de 12 sucursales con 140 empleados. «TacoMex Nacional» (ficticia) tiene 300 sucursales en el país, una planta que prepara la carne marinada y más de 4,000 empleados.`,
dil:`¿Qué cambia por dentro en cada tamaño y qué problemas enfrenta cada uno?`,
datos:`| Aspecto | El Güero | La Fogata | TacoMex Nacional |
|---|---|---|---|
| Personas | 3 | 140 | 4,000+ |
| Ventas anuales | 1.8 millones | 65 millones | 3,000 millones |
| Quién decide el precio | El dueño | Director y gerente de operaciones | Comité comercial con datos de todas las sucursales |
| Cómo se prepara la carne | En el puesto | En cada sucursal con receta escrita | En una planta central |
| Contabilidad | Contador externo | Área de administración | Dirección de finanzas |`,
preg:["Clasifica cada negocio por tamaño según la tabla de México (servicios).","¿Qué ventaja tiene El Güero que las cadenas no pueden copiar fácilmente?","¿Qué problema de crecimiento probablemente tiene La Fogata?","¿Por qué TacoMex Nacional prepara la carne en una planta central?"],
resp:`**Clasificación:** El Güero es **micro** (3 personas, menos de 4 millones). La Fogata parece **grande** si solo se cuentan las personas (más de 100 en servicios), pero la fórmula oficial combina 10 % del número de trabajadores y 90 % de las ventas en millones: 140 × 0.1 + 65 × 0.9 = 72.5 puntos, por debajo del tope de 95 para una pequeña empresa de servicios. Oficialmente sería **pequeña**, lo que muestra por qué no basta con contar empleados. TacoMex Nacional es **grande** en todos los criterios.

**Ventaja de El Güero:** trato personal, flexibilidad, decisiones inmediatas y costos fijos bajos.

**Problema de La Fogata:** crisis de crecimiento: mantener el mismo sabor en 12 sucursales, que el dueño delegue en gerentes y que los sistemas acompañen.

**Planta central de TacoMex:** para que la carne sepa igual en 300 sucursales (estandarización), comprar en grandes volúmenes (economías de escala) y controlar la calidad y la higiene en un solo lugar.`,
lec:["El giro puede ser el mismo, pero la organización cambia por completo con el tamaño.","Crecer exige estandarizar y delegar.","Cada tamaño tiene ventajas propias; ser pequeño no es una desventaja en todo."]},
{id:"socios-sin-papeles", t:"Dos socios sin papeles", mod:"M3", tipo:"ficticio",
ctx:`Mario y Andrés abrieron un taller de herrería en 2019. Mario puso 150,000 pesos y Andrés su conocimiento y su trabajo. Todo quedó a nombre de Mario como persona física: el RFC, la cuenta bancaria y el contrato de renta. Nunca escribieron cómo repartirían las utilidades. En 2024 el taller factura 3 millones al año. Andrés quiere su parte y Mario dice que el negocio es suyo.`,
dil:`¿Qué derechos puede probar cada uno y cómo se pudo evitar el conflicto?`,
datos:`| Aspecto | Situación |
|---|---|
| RFC y facturas | A nombre de Mario |
| Aportación inicial | Mario: 150,000 pesos; Andrés: trabajo y clientes |
| Acuerdo escrito | Ninguno |
| Utilidades | Mario retiraba lo que quería; a Andrés le pagaba «un sueldo» variable |
| Deuda | Un crédito de 400,000 pesos a nombre de Mario |`,
preg:["¿Qué riesgo corre Mario al tener todo a su nombre como persona física?","¿Qué puede probar Andrés sobre su participación?","¿Qué tipo de sociedad les habría convenido y qué debió decir su acta constitutiva?","¿Cómo podrían resolver el conflicto hoy?"],
resp:`**Riesgo de Mario:** responsabilidad ilimitada: el crédito de 400,000 pesos y cualquier demanda recaen sobre su patrimonio personal.

**Andrés:** sin acuerdo escrito, su posición es débil; podría intentar probar una relación de sociedad o laboral con testigos, mensajes y pagos, pero el proceso sería largo y costoso.

**Lo que debieron hacer:** constituir una sociedad (por ejemplo, una S. de R.L. de C.V. o una S.A. de C.V.) con un acta que dijera el porcentaje de cada uno (aportaciones en dinero y en trabajo), cómo se reparten las utilidades, quién administra, qué decisiones necesitan a ambos y qué pasa si uno quiere salir.

**Hoy:** negociar con ayuda de un mediador o abogado: valuar el taller, acordar un porcentaje para Andrés, constituir una sociedad y transferir el negocio, o pactar una compra de su parte.`,
lec:["Con socios, la sociedad y el acta constitutiva no son trámites: son la protección de ambos.","Las aportaciones en trabajo también deben valuarse y escribirse.","Es más barato acordar al inicio que pelear al final."]},
{id:"app-gratuita", t:"¿Cómo gana dinero una app gratuita?", mod:"M4", tipo:"ficticio",
ctx:`«Recetario MX» (ficticia) es una aplicación de recetas con 2 millones de usuarios en México. Es gratis. Sus fundadores necesitan demostrar a un inversionista que el modelo de negocio funciona.`,
dil:`¿Qué fuentes de ingreso puede tener y cuántos usuarios deben pagar para que el negocio sea rentable?`,
datos:`| Dato | Valor |
|---|---|
| Usuarios activos al mes | 2,000,000 |
| Costos fijos mensuales (equipo, servidores, oficina) | 3,000,000 pesos |
| Ingreso por publicidad por cada 1,000 usuarios gratuitos al mes | 400 pesos |
| Precio de la versión sin anuncios con recetas exclusivas | 49 pesos al mes |`,
preg:["Llena los bloques del lienzo de «Recetario MX» que tienen que ver con clientes e ingresos. ¿Quién es el cliente que paga en la publicidad?","Calcula cuánto genera la publicidad al mes si todos los usuarios fueran gratuitos.","¿Cuántos suscriptores de pago necesitan para cubrir el resto de los costos fijos?","¿Qué otras fuentes de ingreso podrían agregar?"],
resp:`**Clientes:** hay dos segmentos: los **usuarios** (cocineros caseros) y los **anunciantes** (marcas de alimentos, supermercados), que son quienes pagan la publicidad.

**Publicidad:** 2,000,000 ÷ 1,000 × 400 = **800,000 pesos al mes**.

**Suscriptores necesarios:** faltan 3,000,000 − 800,000 = 2,200,000 pesos. 2,200,000 ÷ 49 ≈ **44,898 suscriptores**, alrededor de 2.2 % de los usuarios (aproximación, porque cada suscriptor deja de ver anuncios y reduce un poco el ingreso publicitario).

**Otras fuentes:** comisión por ventas de ingredientes en supermercados en línea (intermediación), cursos de cocina de pago (venta), recetas patrocinadas por marcas (publicidad), licencias de su contenido.`,
lec:["En lo «gratis», alguien siempre paga: anunciantes o una minoría de usuarios.","El modelo «gratis con extras» funciona si una proporción suficiente se convierte en cliente de pago.","Combinar fuentes de ingreso da estabilidad."]},
{id:"vendo-mucho", t:"«Vendo mucho y no me alcanza»: el caso de Tortas Lupita", mod:"M5", tipo:"ficticio",
ctx:`Antes de ordenar sus cuentas, Lupita vendía unas 140 tortas diarias a 35 pesos (precio que no había cambiado en tres años). Sentía que el puesto no le dejaba lo suficiente y cada enero pedía prestado. Toño registró un mes completo.`,
dil:`¿Por qué no le alcanzaba y qué decisiones de precio y costos debía tomar?`,
datos:`| Concepto | Dato |
|---|---|
| Tortas al mes | 3,640 |
| Precio | 35 pesos |
| Costo variable real (con merma) | 18.50 pesos |
| Costos fijos (sin sueldo de Lupita ni de Toño) | 4,000 pesos |
| Sueldo justo de Lupita y Toño | 14,000 pesos |
| Retiros para la casa sin anotar | 9,000 pesos al mes |
| Tortas regaladas | 150 al mes |`,
preg:["Calcula el margen por torta y el margen total del mes.","Calcula la utilidad de operación incluyendo el sueldo justo de Lupita y Toño.","¿Cuántas tortas necesitaba vender para alcanzar el punto de equilibrio?","Propón un nuevo precio y dos acciones de costos, y calcula su efecto."],
resp:`**Margen:** 35 − 18.50 = 16.50 por torta; 3,640 × 16.50 = **60,060 pesos**. Las 150 tortas regaladas cuestan 150 × 18.50 = 2,775 pesos.

**Utilidad de operación:** 60,060 − 4,000 − 14,000 − 2,775 = **39,285 pesos**. El negocio sí ganaba, pero los retiros sin anotar, el precio bajo y la merma lo hacían sentir apretado; además, no apartaba para enero.

**Punto de equilibrio:** (4,000 + 14,000) ÷ 16.50 ≈ **1,091 tortas al mes**.

**Mejoras:** precio de 40 pesos y costo de 16 con receta costeada y control de merma: margen de 24 por torta, 3,640 × 24 = 87,360. Con regalos limitados y retiros convertidos en sueldo fijo, la utilidad de operación sube a más de 62,000 pesos al mes, y puede apartar el 10 % semanal para enero.`,
lec:["Vender mucho no basta si el precio y el costo no se revisan.","La merma y los regalos son costos reales.","Ordenar los retiros y apartar para meses flojos evita pedir prestado."]}
);
// ===== NIVEL 2 =====
window.CASOS.push(
{id:"quinto-empleado", t:"El quinto empleado: nadie sabe a quién obedecer", mod:"M6", tipo:"ficticio",
ctx:`Tortas Lupita abrió su local con cuatro empleados y todos le reportaban a Lupita. Al contratar al quinto (un repartidor), Toño empezó a dar instrucciones también, igual que el cocinero con más antigüedad. En dos semanas hubo pedidos duplicados, compras repetidas y una discusión en plena hora pico.`,
dil:`¿Qué estructura necesita el local y cómo se reparte la autoridad?`,
datos:`| Situación | Frecuencia en 2 semanas |
|---|---|
| Órdenes contradictorias a un mismo empleado | 9 veces |
| Compras duplicadas | 3 |
| Pedidos de WhatsApp sin atender | 7 |
| Consultas a Lupita por asuntos menores | 25 al día |`,
preg:["¿Qué principios de la estructura se están rompiendo?","Dibuja un organigrama para el local con un solo jefe por persona.","¿Qué decisiones debería delegar Lupita y con qué límites?","¿Qué documentos ayudarían a que cada quien sepa qué hacer?"],
resp:`Se rompen la **unidad de mando** (varias personas dan órdenes) y la **autoridad con responsabilidad** (nadie tiene claro quién responde por compras y pedidos). Organigrama sugerido: Lupita (directora) → Toño (encargado del local) → cocineros, cajera y repartidor; el contador como staff externo. Lupita delega en Toño las compras diarias hasta cierto monto, los horarios y la atención de quejas, con una **matriz de delegación**. Se necesitan **descripciones de puesto** y una lista de tareas con responsable, más una junta diaria de 10 minutos.`,
lec:["Con cada persona nueva, la estructura debe hacerse explícita.","Un jefe por persona y un responsable por tarea evitan duplicidades y huecos.","Delegar con límites claros libera al dueño."]},
{id:"lupita-enferma", t:"Lupita se enferma dos semanas: ¿sobrevive el negocio sin ella?", mod:"M7", tipo:"ficticio",
ctx:`Lupita debe guardar reposo dos semanas. Ella compra, decide precios, revisa la caja, atiende a las oficinas y paga a proveedores. Toño sabe cocinar y atender, pero nunca ha manejado proveedores ni números.`,
dil:`¿Qué pasa con el negocio y qué debió prepararse antes?`,
datos:`| Función | ¿Quién la hacía? | ¿Hay respaldo? |
|---|---|---|
| Compras y proveedores | Lupita | No |
| Precios y promociones | Lupita | No |
| Corte de caja | Lupita | A medias (Toño a veces) |
| Pedidos de oficinas | Lupita | No |
| Pagos y nómina | Lupita con el contador | No |`,
preg:["¿Qué riesgo revela este caso sobre la dirección del negocio?","¿Qué decisiones y tareas debe conservar Lupita y cuáles delegar?","Propón un plan de tres meses para que el negocio funcione sin ella dos semanas.","¿Qué indicadores le permitirían a Lupita seguir el negocio desde casa?"],
resp:`El caso muestra el **síndrome del fundador**: todo depende de Lupita. Debe conservar la estrategia, las grandes decisiones de dinero y la elección de personas clave, y delegar compras diarias, corte de caja, pedidos de oficinas y pagos rutinarios con límites claros. Plan: mes 1, escribir procedimientos de compras y caja y enseñar a Toño; mes 2, que Toño los haga con revisión; mes 3, que los haga solo y Lupita revise por **resultados**. Un **tablero semanal** con ventas, ticket promedio, merma, efectivo disponible y quejas le permite seguir el negocio a distancia.`,
lec:["Un negocio que no puede operar sin el dueño es frágil.","Profesionalizar es pasar de depender de una persona a depender de procesos y personas capaces.","El tablero de indicadores permite dirigir sin estar presente."]},
{id:"no-hay-para-nomina", t:"«Ganamos, pero no hay para la nómina»", mod:"M8", tipo:"ficticio",
ctx:`En marzo, el estado de resultados de Tortas Lupita mostró una utilidad de 30,000 pesos. Pero el día 15 no había efectivo para pagar la quincena. En el mismo mes se compró una segunda plancha de contado, las oficinas pagaron tarde y se abonó al crédito bancario.`,
dil:`¿Cómo puede haber utilidad sin efectivo y qué debe cambiar?`,
datos:`| Concepto del mes | Pesos |
|---|---|
| Utilidad neta | 30,000 |
| Depreciación | 2,000 |
| Aumento de cuentas por cobrar a oficinas | 25,000 |
| Compra de la segunda plancha (contado) | 18,000 |
| Pago de capital del crédito | 15,000 |
| Retiro de Lupita | 8,000 |`,
preg:["Calcula el cambio en el efectivo del mes.","Explica por qué la utilidad no se convirtió en efectivo.","¿Qué herramienta habría anticipado el problema?","Propón tres acciones para que no vuelva a pasar."],
resp:`Cambio en el efectivo: 30,000 + 2,000 − 25,000 − 18,000 − 15,000 − 8,000 = **−34,000 pesos**. La utilidad se «quedó» en las cuentas por cobrar y en la plancha, y se usó efectivo para pagar deuda y para el retiro. Un **flujo de caja proyectado** de seis semanas habría mostrado el faltante antes del día 15. Acciones: cobrar a las oficinas a 7 días con descuento por pronto pago; financiar el equipo a largo plazo en lugar de pagarlo de contado; convertir el retiro en un sueldo fijo; tener una línea de crédito aprobada para emergencias.`,
lec:["Las utilidades son una opinión; el efectivo es un hecho.","Revisa y proyecta el flujo de caja cada semana.","Financia a largo plazo lo que dura años."]},
{id:"hora-pico", t:"La hora pico: filas de 25 minutos", mod:"M9", tipo:"ficticio",
ctx:`De 13:00 a 14:30 la fila de Tortas Lupita llega a la calle. Algunos clientes esperan 25 minutos y otros se van. Lupita quiere contratar a otro cocinero.`,
dil:`¿Dónde está el cuello de botella y qué conviene hacer?`,
datos:`| Paso | Minutos por pedido | Personas | Capacidad por hora |
|---|---|---|---|
| Tomar pedido y cobrar | 1.5 | 1 | 40 |
| Preparar | 2.5 | 3 | 72 |
| Empacar y entregar | 0.5 | 1 | 120 |
| Clientes que llegan por hora | — | — | 55 |`,
preg:["¿Cuál es la capacidad del proceso y por qué?","¿Cuántas personas se acumulan en la fila en hora y media?","Aplica los cinco pasos de la teoría de las restricciones.","¿Conviene contratar otro cocinero? Justifica."],
resp:`La capacidad del proceso es **40 pedidos por hora**, la de la caja, que es el **cuello de botella**. Con 55 clientes por hora, la fila crece 15 personas por hora: unas **22 en hora y media**. Teoría de las restricciones: identificar (la caja); explotar (que la cajera solo cobre, tenga cambio y terminal lista: 1.2 minutos, 50 por hora); subordinar (el ayudante toma pedidos en la fila; preparar por adelantado las tortas más pedidas); elevar (segunda caja en el pico o pedidos anticipados por WhatsApp); repetir (ahora el límite será la cocina, 72). **No conviene contratar otro cocinero**: la cocina ya espera comandas.`,
lec:["Mejorar lo que no es el cuello de botella no mejora el resultado.","Explotar la restricción suele ser más barato que invertir.","Mide cada paso con reloj antes de decidir."]},
{id:"pan-sube", t:"El proveedor de pan sube 20 % el precio", mod:"M10", tipo:"ficticio",
ctx:`La panadería principal anuncia un aumento de 20 % en el bolillo por la subida de la harina y el gas. Tortas Lupita compra 9,000 bolillos al mes a 3 pesos y paga puntual. Otra panadería cotiza un 8 % por encima del precio actual, con buena calidad.`,
dil:`¿Cómo negociar el aumento sin dañar la relación ni el margen?`,
datos:`| Concepto | Valor |
|---|---|
| Bolillos al mes | 9,000 |
| Precio actual | 3.00 |
| Propuesta del proveedor | 3.60 (+20 %) |
| Alternativa (MAAN) | 3.24 (+8 %) |
| Impacto de cada 10 centavos en el costo mensual | 900 pesos |`,
preg:["¿Cuál es el MAAN de Lupita y qué tan fuerte es?","¿Cuáles son los intereses de la panadería?","Propón una negociación con al menos tres variables.","Calcula el costo mensual de la propuesta, del MAAN y de tu acuerdo propuesto."],
resp:`El MAAN de Lupita es la otra panadería a 3.24 (fuerte, porque tiene buena calidad). Los intereses de la panadería: cubrir el aumento de sus costos y no perder a un cliente grande y puntual. Propuesta: aumento de 7 % (3.21), precio fijo seis meses y pago semanal en lugar de quincenal; además, un pronóstico semanal para que la panadería produzca con menos desperdicio. Costos mensuales: propuesta 9,000 × 3.60 = **32,400**; MAAN 9,000 × 3.24 = **29,160**; acuerdo 9,000 × 3.21 = **28,890**. El acuerdo es mejor que el MAAN y cuida la relación.`,
lec:["Prepárate: conoce tu MAAN y los intereses del otro.","Negocia varias variables, no solo el precio.","Un buen acuerdo deja a ambas partes mejor que no acordar."]},
{id:"oficinas-credito", t:"Una empresa quiere 200 tortas diarias a crédito", mod:"M11", tipo:"ficticio",
ctx:`Un corporativo de 600 empleados ofrece a Tortas Lupita un contrato: 200 tortas diarias de lunes a viernes, a 36 pesos cada una (en lugar de 40), con factura y pago a 30 días. Sería el cliente más grande del negocio.`,
dil:`¿Conviene aceptar el contrato y en qué condiciones?`,
datos:`| Dato | Valor |
|---|---|
| Tortas al mes (22 días) | 4,400 |
| Precio | 36 |
| Costo variable | 16 |
| Ventas totales actuales del local | 236,000 al mes |
| Capacidad extra de cocina en la mañana | Alcanza con un cocinero adicional (12,000 al mes) |
| Plazo de pago | 30 días |`,
preg:["Calcula las ventas y el margen mensual del contrato, después del cocinero adicional.","¿Qué porcentaje de las ventas totales representaría este cliente?","¿Cuánto capital de trabajo adicional necesitaría el negocio por el plazo de 30 días?","¿Aceptarías? Propón condiciones para reducir riesgos."],
resp:`Ventas: 4,400 × 36 = **158,400**; margen: 4,400 × 20 = 88,000; menos el cocinero: **76,000 pesos al mes**. El cliente sería 158,400 ÷ (236,000 + 158,400) ≈ **40 % de las ventas**: mucha **concentración**. Capital de trabajo: unas cuentas por cobrar de alrededor de **158,400** (un mes de ventas a este cliente) que hay que financiar. Puede convenir, pero con condiciones: plazo de 15 días o anticipo; contrato de al menos un año con aviso de terminación de 60 días; ajuste de precio por inflación; empezar con un piloto de un mes; mientras tanto, seguir buscando otros clientes para reducir la dependencia y tramitar una línea de crédito para el capital de trabajo.`,
lec:["Un cliente grande puede ser una gran oportunidad y un gran riesgo.","Calcula el margen, el capital de trabajo y la concentración antes de aceptar.","Negocia condiciones que protejan el flujo de efectivo."]},
{id:"cadena-enfrente", t:"Abre una cadena de tortas enfrente: ¿bajar el precio o diferenciarse?", mod:"M12", tipo:"ficticio",
ctx:`Una cadena nacional de tortas abre a 50 metros de Tortas Lupita, con precios 15 % más bajos, gran publicidad y un local moderno. En el primer mes, las ventas de Lupita bajan 12 %.`,
dil:`¿Responde con precio o con diferenciación?`,
datos:`| Concepto | Tortas Lupita | Cadena |
|---|---|---|
| Precio de la torta clásica | 40 | 34 |
| Tiempo de entrega | 3 minutos | 6 minutos |
| Calificación en mapas | 4.6 | 4.1 |
| Pedidos por WhatsApp | Sí | No |
| Pedidos a oficinas con factura | Sí | No |
| Margen por torta | 24 | Desconocido (compra a gran escala) |`,
preg:["¿Cuántas tortas más tendría que vender Lupita si baja el precio a 34?","¿Cuál es el posicionamiento de cada negocio?","Propón una respuesta basada en las 7P.","¿Cómo medirías si tu respuesta funciona?"],
resp:`Si baja a 34, su margen pasa de 24 a 18: necesitaría vender 24 ÷ 18 = **1.33 veces** (33 % más) para ganar lo mismo, en una guerra de precios con alguien que compra más barato. Posicionamiento: la cadena = «barata y conocida»; Lupita = «sabor de casa, rápido». Respuesta: no bajar el precio de la torta clásica; reforzar rapidez (pantalla con el tiempo), sabor y trato (personas, procesos), combos con agua fresca, pedidos por WhatsApp sin fila, paquetes a oficinas con factura, más reseñas y fotos en mapas. Medición: ventas y clientes nuevos por semana, ticket promedio, calificación en reseñas y respuestas a «¿cómo nos conociste?».`,
lec:["Una guerra de precios con un competidor más grande suele perderse.","Diferenciarse con lo que el otro no puede copiar fácilmente.","Mide la respuesta y ajusta."]},
{id:"rotacion-80", t:"La rotación de Tortas Lupita llega a 80 % anual", mod:"M13", tipo:"ficticio",
ctx:`Con dos sucursales y 20 empleados en promedio, en un año se fueron 16 personas. En las entrevistas de salida, la mayoría mencionó horarios cambiantes, trato del encargado de la tarde y que «no hay forma de crecer».`,
dil:`¿Cuánto cuesta la rotación y qué hacer para reducirla?`,
datos:`| Dato | Valor |
|---|---|
| Empleados promedio | 20 |
| Salidas en el año | 16 |
| Costo estimado por salida | 7,000 |
| Causas más mencionadas | Horarios (9), encargado de la tarde (8), falta de crecimiento (7) |`,
preg:["Calcula la rotación anual y su costo.","¿Qué causas puede controlar el negocio?","Propón un plan de acción con responsables.","¿Qué indicadores usarías para seguir el avance?"],
resp:`Rotación: 16 ÷ 20 = **80 %**; costo: 16 × 7,000 = **112,000 pesos al año**, más clientes afectados. Todas las causas mencionadas son controlables. Plan: publicar horarios con dos semanas de anticipación (administradora); capacitar al encargado de la tarde en liderazgo y medir su rotación (Lupita); crear un camino de crecimiento ayudante → cocinero → jefe de cocina → encargado (Toño); inducción con padrino; conversaciones mensuales uno a uno. Indicadores: rotación trimestral por sucursal y por jefe, encuesta de clima trimestral, salidas en los primeros 90 días.`,
lec:["La rotación tiene un costo alto aunque no aparezca en el estado de resultados.","«La gente no deja empresas, deja jefes».","Escuchar con entrevistas de salida revela causas que se pueden corregir."]},
{id:"marca-registrada", t:"Alguien registra la marca «Tortas Lupita» antes que ella", mod:"M14", tipo:"ficticio",
ctx:`Después de diez años usando el nombre, Lupita descubre que un negocio de otra ciudad registró ante el IMPI la marca «Tortas La Lupita» en la clase de servicios de restaurante hace seis meses, y ahora le envía una carta pidiéndole que deje de usar su nombre.`,
dil:`¿Qué opciones tiene Lupita y qué debió hacer antes?`,
datos:`| Hecho | Detalle |
|---|---|
| Uso del nombre por Lupita | 10 años, con pruebas (fotos, facturas, redes) |
| Registro del otro negocio | Hace 6 meses, clase de restaurantes |
| Registro de Lupita | Ninguno |
| Planes de Lupita | Abrir sucursales y franquiciar |`,
preg:["¿Por qué la situación de Lupita es delicada?","¿Qué pruebas le servirían y a quién debe acudir?","¿Qué opciones tiene (con sus ventajas y riesgos)?","¿Qué debe registrar a partir de ahora?"],
resp:`Es delicada porque en México, en general, la protección de la marca la da el **registro**, y otro la registró primero en la misma clase con un nombre muy parecido. Le sirven las pruebas de **uso anterior** (facturas, fotos fechadas, publicaciones, contratos) y debe acudir de inmediato con un **especialista en propiedad intelectual**. Opciones: intentar la **nulidad** del registro del otro alegando uso anterior o mala fe (costo, tiempo e incertidumbre); negociar una **compra o licencia** de la marca; o **cambiar de nombre** (costoso y con pérdida de reconocimiento). A partir de ahora: registrar su marca y logo en las clases de restaurante y de productos (salsa), el aviso comercial, el dominio y los nombres en redes, y vigilar el mercado.`,
lec:["Registra tu marca antes de crecer, no después.","Guarda pruebas del uso de tu nombre.","Prevenir cuesta una fracción de litigar."]},
{id:"fraude-whatsapp", t:"Un fraude por WhatsApp se hace pasar por el proveedor", mod:"M15", tipo:"ficticio",
ctx:`La administradora recibe un mensaje de un número desconocido con la foto y el nombre del proveedor de carne: «Cambiamos de banco, deposita aquí el pago de la semana». Paga 18,000 pesos. El proveedor real llama horas después preguntando por su pago.`,
dil:`¿Qué falló y qué controles debe tener el negocio?`,
datos:`| Control | ¿Existía? |
|---|---|
| Confirmar cambios de cuenta por teléfono al número registrado | No |
| Doble autorización para pagos grandes | No |
| Lista oficial de cuentas de proveedores | No |
| Verificación en dos pasos en WhatsApp | No |
| Capacitación sobre fraudes | No |`,
preg:["¿Qué tipo de fraude es y por qué funcionó?","¿Qué debe hacer el negocio de inmediato?","Propón cinco controles para que no se repita.","¿Cómo capacitarías al equipo?"],
resp:`Es un fraude de **suplantación del proveedor** (falso proveedor); funcionó porque no había ningún control para verificar cambios de cuenta y una sola persona podía pagar. De inmediato: llamar al banco para intentar detener o rastrear la transferencia, guardar pruebas, denunciar ante la autoridad y avisar a otros proveedores y clientes. Controles: 1) ningún cambio de cuenta sin llamar al número ya registrado; 2) lista oficial de cuentas de proveedores en el sistema; 3) doble autorización para pagos de más de 5,000 pesos o a cuentas nuevas; 4) verificación en dos pasos en WhatsApp y banca en línea; 5) revisión semanal de pagos por Lupita. Capacitación: una sesión breve con ejemplos reales y una regla fácil de recordar: «si cambian la cuenta, llama antes de pagar».`,
lec:["Los fraudes digitales atacan los procesos débiles, no la tecnología.","Verificar por otro canal es la defensa más simple.","La separación de funciones protege el dinero."]}
);

// ===== Casos del Nivel 3 =====
window.CASOS.push(
{id:"maquina-o-persona", t:"¿Comprar una máquina de 120,000 o contratar a otra persona?", mod:"M16", tipo:"ficticio", les:"M16-3",
ctx:`En la hora pico, la cocina de Tortas Lupita no se da abasto. Toño propone comprar una máquina rebanadora y freidora automática de 120,000 pesos que acelera la preparación. Lupita prefiere contratar a un ayudante más, con un costo total de unos 14,000 pesos al mes. Los dos tienen argumentos y discuten cada semana.`,
dil:`¿Qué opción conviene más y cómo decidir sin dejarse llevar por la preferencia de cada uno?`,
datos:`| Concepto | Máquina | Ayudante |
|---|---|---|
| Inversión inicial | 120,000 | 0 |
| Costo mensual | 1,500 (mantenimiento y luz) | 14,000 |
| Tortas extra por hora pico | 40 | 30 |
| Vida útil | 5 años | — |
| Flexibilidad | Baja (solo ciertas tareas) | Alta (también limpia, atiende) |
| Riesgo | Descompostura | Rotación, faltas |

Margen de contribución por torta: 24. Hora pico: 2 horas al día, 26 días al mes.`,
preg:["Calcula cuánto margen extra genera cada opción al mes y cuánto cuesta.","¿En cuántos meses se recupera la máquina?","Arma una matriz ponderada con al menos cuatro criterios.","¿Qué sesgos podrían influir en Toño y en Lupita?","¿Qué recomendarías y cómo revisarías la decisión?"],
resp:`**Máquina:** 40 tortas × 2 horas × 26 días = 2,080 tortas extra al mes × 24 = 49,920 de margen, menos 1,500 de costo = 48,420 netos al mes, siempre que haya clientes para esas tortas. Se recupera en 120,000 ÷ 48,420 ≈ 2.5 meses. **Ayudante:** 30 × 2 × 26 = 1,560 tortas × 24 = 37,440, menos 14,000 = 23,440 al mes. En números, la máquina gana; pero el supuesto clave es que **la demanda existe** para 2,080 tortas más. Si solo hay demanda para 800 tortas extra al mes (19,200 de margen), la máquina deja 17,700 y el ayudante 5,200. Una matriz con criterios de margen (35 %), flexibilidad (25 %), riesgo (20 %) y facilidad de implementación (20 %) suele favorecer a la máquina, salvo que la flexibilidad pese mucho. Sesgos: Toño, **exceso de confianza** y entusiasmo por la tecnología; Lupita, **aversión al cambio** y apego a lo conocido. Recomendación: medir primero la demanda real no atendida (clientes que se van de la fila) durante dos semanas; si supera 1,000 tortas al mes, comprar la máquina con un plan de mantenimiento; si no, contratar al ayudante en medio tiempo para la hora pico. Revisar en tres meses con los datos de ventas por hora.`,
lec:["Una inversión solo rinde si hay demanda para lo que produce.","Pon los supuestos por escrito y mídelos antes de decidir.","Reconocer los sesgos de cada parte mejora la conversación."]},
{id:"falta-dinero-viernes", t:"Falta dinero en caja todos los viernes", mod:"M17", tipo:"ficticio", les:"M17-6",
ctx:`Desde hace dos meses, el corte de caja de los viernes sale con faltantes de entre 400 y 900 pesos. Los demás días cuadra o casi. Los viernes hay más clientes, dos cajeros rotan en la misma caja y Rosa, la cajera de confianza, sale temprano porque estudia. Nadie quiere acusar a nadie.`,
dil:`¿Cómo encontrar la causa y qué controles poner sin crear un mal ambiente?`,
datos:`| Día | Ventas promedio | Diferencia promedio en el corte |
|---|---|---|
| Lunes a jueves | 7,500 | −20 |
| Viernes | 12,800 | −650 |
| Sábado | 10,200 | −40 |

Viernes: dos cajeros comparten caja de 14:00 a 18:00; no hay corte al cambiar de turno; los pagos con tarjeta se registran a mano cuando la terminal falla; hay descuentos sin autorización escrita.`,
preg:["¿Qué patrón muestran los datos?","Menciona al menos cuatro posibles causas, no solo robo.","¿Qué controles internos propondrías?","¿Cómo comunicarías los cambios al equipo?","¿Qué indicador usarías para saber si funcionó?"],
resp:`El patrón es claro: el problema se concentra **los viernes**, cuando hay más volumen y **dos personas comparten la caja sin corte al cambiar de turno**. Causas posibles: errores al dar cambio por la prisa; pagos con tarjeta registrados a mano con errores; descuentos o cortesías sin registro; billetes falsos; y, también, robo. Sin control no se puede saber cuál es. Controles: 1) **una caja por cajero** o, al menos, corte parcial firmado en cada cambio de turno; 2) fondo fijo contado al inicio de cada turno; 3) todos los descuentos con autorización y registro en el sistema; 4) cuando falle la terminal, anotar el folio del comprobante; 5) arqueos sorpresa; 6) revisar las cámaras solo si persiste el faltante. Comunicación: explicar que los controles **protegen a los cajeros**, porque permiten demostrar que cuadraron su turno, y no son una acusación. Indicador: diferencia promedio en el corte de los viernes; meta, menos de 50 pesos en un mes.`,
lec:["Los datos por día y por turno revelan dónde está el problema.","El control interno protege a los empleados honestos.","Separar responsabilidades permite saber qué pasó."]},
{id:"crecer-rapido", t:"Toño quiere crecer rápido; Lupita no", mod:"M18", tipo:"ficticio", les:"M18-4",
ctx:`Toño, socio con el 30 %, quiere abrir cinco sucursales en dos años con un inversionista. Lupita, con el 70 %, prefiere consolidar las dos que tienen y tal vez abrir una tercera. Las discusiones empiezan a afectar el trabajo y la relación familiar. El resto del equipo no sabe a quién hacerle caso.`,
dil:`¿Cómo resolver un desacuerdo sobre el crecimiento entre socios que además son familia?`,
datos:`| Opción | Inversión | Utilidad esperada al año 3 | Riesgo | Control de la familia |
|---|---|---|---|---|
| Consolidar (2 locales) | 0 | 650,000 | Bajo | 100 % |
| Crecimiento moderado (3 locales) | 600,000 | 900,000 | Medio | 100 % |
| Crecimiento rápido (7 locales con inversionista) | 3,500,000 | 1,000,000 a 2,500,000 o pérdidas | Alto | 60 % |

Situación: procesos escritos parciales; un solo gerente formado; caja equivalente a 2 meses de gastos.`,
preg:["¿En qué etapa de crecimiento está Tortas Lupita?","¿Qué capacidades le faltan para crecer rápido?","Analiza cada opción con la matriz de Ansoff y con el flujo de caja.","¿Qué papel juegan los círculos de familia, propiedad y empresa en el conflicto?","¿Qué acuerdo propondrías?"],
resp:`Tortas Lupita está saliendo de la etapa de **supervivencia** hacia el **éxito**, en plena transición a la profesionalización. Para crecer rápido le faltan: procesos completos, más gerentes formados, sistemas de control a distancia y caja; crecer siete locales con un solo gerente formado es muy arriesgado. Las tres opciones son **penetración o desarrollo de mercado**, de bajo a medio riesgo en producto, pero la rápida tiene alto riesgo financiero y de ejecución. En el conflicto se mezclan los círculos: Toño es **familia, socio minoritario y directivo**; Lupita, **familia, socia mayoritaria y directora**. Conviene separar la conversación de negocio de la familiar. Acuerdo propuesto: un plan por etapas con **metas medibles**: año 1, terminar el manual, formar dos gerentes y abrir la tercera sucursal; si la tercera alcanza su punto de equilibrio en seis meses y la caja llega a tres meses de gastos, en el año 2 evaluar dos más o franquicias. Firmar un **protocolo familiar** y un convenio entre socios con reglas para decidir y para salir.`,
lec:["Crecer exige capacidades, no solo ganas.","Las metas por etapas convierten un pleito en un plan.","En la empresa familiar, separar los círculos reduce el conflicto."]},
{id:"banco-o-socio", t:"¿Banco o socio para la segunda sucursal?", mod:"M19", tipo:"ficticio", les:"M19-6",
ctx:`Para abrir la segunda sucursal faltan 350,000 pesos. El Banco A ofrece un crédito a 36 meses con pago de unos 11,900 al mes. El ingeniero Ramírez, cliente frecuente, ofrece poner el dinero a cambio del 20 % de todo el negocio. Toño prefiere el socio; Lupita, el banco.`,
dil:`¿Qué opción conviene, o qué combinación?`,
datos:`| Escenario de la sucursal | Utilidad mensual antes del financiamiento |
|---|---|
| Pesimista | 10,000 |
| Probable | 25,000 |
| Optimista | 35,000 |

Utilidad anual del negocio completo en el escenario probable: unos 600,000. Valuación previa estimada: 1,400,000. Ramírez también podría prestar en lugar de comprar una parte.`,
preg:["¿Qué pasa con el pago del banco en cada escenario?","¿Cuánto le costaría Ramírez en utilidades en tres años en el escenario probable?","Compara el control del negocio en cada opción.","¿Qué alternativas intermedias existen?","¿Qué recomiendas?"],
resp:`Con el banco, el pago de 11,900 **no cabe** en el escenario pesimista (10,000) y obliga a usar dinero del primer local; en el probable deja 13,100 al mes y en el optimista 23,100. Con Ramírez como socio del 20 %, en el escenario probable recibiría unos 120,000 al año, es decir, **360,000 en tres años**, y conservaría su 20 % para siempre; el banco cobra unos 78,400 de intereses en total. Control: con el banco, la familia conserva el 100 %; con Ramírez, Lupita baja a 56 % y Toño a 24 %, y hay que negociar un convenio. Alternativas: crédito menor (200,000, pago de unos 6,800 que sí cabe en el pesimista) más un **préstamo de Ramírez** de 150,000 con interés, o **deuda convertible** en una participación pequeña si la sucursal funciona. Recomendación: la mezcla, porque reduce el riesgo de los pagos sin ceder propiedad de inmediato.`,
lec:["Prueba siempre la deuda en el escenario pesimista.","El capital es caro cuando el negocio va bien y seguro cuando va mal.","Las opciones intermedias suelen ser las mejores."]},
{id:"segunda-sucursal", t:"La segunda sucursal vende la mitad que la primera", mod:"M20", tipo:"ficticio", les:"M20-6",
ctx:`Seis meses después de abrir, la segunda sucursal de Tortas Lupita vendió 810,000 pesos en el trimestre, contra 1,620,000 de la original. Toño quiere cambiar al gerente. Lupita cree que no es justo compararlas así.`,
dil:`¿La sucursal va mal o se está comparando de forma injusta? ¿Qué hacer?`,
datos:`| Indicador | Original | Nueva |
|---|---|---|
| Ventas del trimestre | 1,620,000 | 810,000 |
| Superficie | 60 m² | 30 m² |
| Tickets | 21,600 | 13,500 |
| Costo de alimentos | 41 % | 38 % |
| Tiempo de espera | 8 min | 6 min |
| Días abiertos por semana | 7 | 6 |
| Meses abierta | 48 | 6 |`,
preg:["Calcula ventas por metro cuadrado y ticket promedio de cada una.","¿Qué indicadores favorecen a la nueva y cuáles no?","¿Qué contexto hay que considerar?","¿El gerente es el problema?","Propón dos acciones concretas."],
resp:`Ventas por m²: original 27,000; nueva 27,000: **iguales**. Ticket promedio: original 75; nueva 60. La nueva gana en costo de alimentos (38 % contra 41 %) y en tiempo de espera; pierde en ticket promedio. Contexto: tiene la mitad de superficie, abre un día menos, lleva solo seis meses (está **madurando**) y atiende a trabajadores de una fábrica que compran solo la torta. El gerente **no** es el problema: opera con más eficiencia. Acciones: 1) crear un **combo** de torta con agua fresca a precio atractivo para subir el ticket; 2) abrir pedidos para llevar a las oficinas de la fábrica antes del turno; además, fijar metas de ticket y comparar con el presupuesto propio de la sucursal, no solo con la original.`,
lec:["Compara sucursales con indicadores relativos.","Juzga al gerente por lo que puede controlar.","La comparación sirve más para aprender que para castigar."]},
{id:"franquiciar-o-no", t:"¿Franquiciar o abrir sucursales propias?", mod:"M21", tipo:"ficticio", les:"M21-4",
ctx:`Con dos sucursales funcionando, Tortas Lupita recibe tres solicitudes de personas que quieren comprar una franquicia. Lupita duda: con sucursales propias gana más por local, pero necesita mucho dinero; con franquicias crecería más rápido, pero tendría menos control y necesita preparar todo el sistema.`,
dil:`¿Qué camino conviene en los próximos tres años?`,
datos:`| Concepto | Sucursal propia | Franquicia |
|---|---|---|
| Inversión de Tortas Lupita por local | 600,000 | 0 (más la preparación del sistema) |
| Ingreso para Tortas Lupita por local al mes | Utilidad del local: 25,000 | Regalía 6 % de 400,000 = 24,000 (la publicidad del 2 % va al fondo común) |
| Preparación del sistema (una vez) | — | 450,000 (manual, abogados, marca, estructura) |
| Costo anual de la estructura de apoyo | — | 360,000 |
| Locales posibles en 3 años | 2 (por dinero) | 8 |

Requisitos pendientes para franquiciar: manual completo, registro de marca en todas las clases, contrato y Circular de Oferta, un año de la segunda sucursal funcionando sin Lupita.`,
preg:["Calcula el ingreso anual para Tortas Lupita con 2 sucursales propias nuevas y con 8 franquicias.","¿Cuánto tarda en recuperarse la preparación del sistema de franquicias?","¿Qué riesgos tiene cada camino?","¿Está lista Tortas Lupita para franquiciar hoy?","¿Qué recomiendas?"],
resp:`**Sucursales propias:** 2 × 25,000 × 12 = 600,000 al año, con 1,200,000 de inversión. **Franquicias:** 8 × 24,000 × 12 = 2,304,000 en regalías, menos 360,000 de estructura = 1,944,000 al año, con 450,000 de preparación. Con todas las franquicias abiertas, la preparación se recupera en unos 3 meses de su margen; pero al principio, con 1 o 2 franquicias (24,000 a 48,000 al mes contra 30,000 de estructura), tarda mucho más. Riesgos: las sucursales propias exigen capital y gerentes; las franquicias, perder control de la calidad y dañar la marca con un mal franquiciatario. **Hoy no está lista**: faltan manual, registro, documentos legales y probar el sistema sin Lupita. Recomendación: un plan mixto: preparar la franquicia durante 12 meses, abrir una tercera sucursal propia como laboratorio y lanzar una **franquicia piloto** con uno de los interesados mejor calificados.`,
lec:["Franquiciar es construir un sistema, no vender un nombre.","Los números deben funcionar para el franquiciante y el franquiciatario.","Una franquicia piloto reduce el riesgo de crecer rápido."]},
{id:"monterrey-o-apps", t:"¿Abrir en Monterrey o vender por apps en toda la ciudad?", mod:"M22", tipo:"ficticio", les:"M22-1",
ctx:`Tortas Lupita tiene dos opciones de expansión para el próximo año: abrir una sucursal en Monterrey con un empresario local, o usar su cocina central para vender por apps de reparto en toda su propia ciudad, con dos cocinas ocultas en zonas donde no tiene locales.`,
dil:`¿Qué expansión conviene más y cómo reducir el riesgo?`,
datos:`| Concepto | Monterrey (sucursal con socio, 50 %) | Apps en la ciudad (2 cocinas ocultas) |
|---|---|---|
| Inversión de Tortas Lupita | 325,000 (su mitad) | 240,000 |
| Ventas esperadas al mes | 220,000 | 300,000 |
| Margen de contribución | 55 % | 35 % (por comisiones de 25 % y empaque) |
| Gastos fijos al mes | 65,000 | 56,000 |
| Conocimiento del mercado | Bajo (lo aporta el socio) | Alto |
| Supervisión | Difícil (a distancia) | Fácil |`,
preg:["Calcula la utilidad mensual esperada de cada opción (y la parte de Tortas Lupita en Monterrey).","¿En cuántos meses se recupera la inversión de cada una?","¿Qué riesgos tiene cada opción?","¿Qué prueba de bajo costo harías antes?","¿Qué recomiendas?"],
resp:`**Monterrey:** 220,000 × 55 % = 121,000 − 65,000 = 56,000 al mes; a Tortas Lupita le toca la mitad: **28,000**. Recupera 325,000 en unos 11.6 meses. **Apps:** 300,000 × 35 % = 105,000 − 56,000 = **49,000** al mes; recupera 240,000 en unos 4.9 meses. Riesgos de Monterrey: mercado desconocido, gustos distintos, supervisión a distancia, efecto «isla», conflicto con el socio. Riesgos de las apps: dependencia de las plataformas (pueden subir la comisión), margen bajo, calidad en la entrega, canibalización si las zonas se cruzan con los locales. Prueba: para Monterrey, tres meses de una cocina oculta con el socio; para las apps, empezar con una sola cocina oculta y medir ventas nuevas y recompra. Recomendación: **primero las apps en la ciudad** (mejor recuperación, mercado conocido), con precios ajustados y un canal propio por WhatsApp; Monterrey, como prueba pequeña con límite de pérdidas, para decidir en un año.`,
lec:["Calcula el margen real de cada canal, no solo las ventas.","Expandirse cerca y con conocimiento del mercado suele ser menos riesgoso.","Prueba con poco y define de antemano cuánto estás dispuesto a perder."]}
);

// ===== Casos del Nivel 4 =====
window.CASOS.push(
{id:"grupo-lupita", t:"Grupo Lupita con tres marcas: ¿qué hace el corporativo?", mod:"M23", tipo:"ficticio", les:"M23-4",
ctx:`Grupo Lupita tiene tres marcas: Tortas Lupita (restaurantes propios y franquicias), Salsas Lupita (venta en supermercados) y Cafés del Barrio (cadena comprada). Cada una tiene su director, su contador, su nómina y su proveedor de sistemas. La oficina de Lupita creció a 25 personas sin un diseño claro. Los directores se quejan de que el corporativo «pide muchos reportes y no ayuda», y el consejo quiere saber cuánto cuesta y qué aporta.`,
dil:`¿Qué debe hacer el corporativo, qué debe dejar a las unidades y cómo medir si agrega valor?`,
datos:`| Unidad | Ventas (millones) | Utilidad de operación después de impuestos | Capital invertido |
|---|---|---|---|
| Restaurantes | 400 | 42 | 300 |
| Salsas | 60 | 9 | 30 |
| Cafés | 50 | 3 | 40 |

Costo actual del corporativo: 18 millones al año. Funciones duplicadas en las tres unidades (contabilidad, nómina, sistemas): 9.6 millones al año. Rendimiento mínimo del grupo: 12 %.`,
preg:["¿Qué funciones debería tener el corporativo y cuáles deberían quedarse en las unidades?","¿Qué funciones convendría llevar a servicios compartidos y cuánto se ahorraría?","Calcula el rendimiento sobre el capital de cada unidad. ¿Cuál debería recibir más inversión?","¿Cómo medirías si el corporativo agrega valor?","¿Qué harías con Cafés del Barrio?"],
resp:`El corporativo debería concentrarse en **estrategia del grupo, asignación de capital, finanzas corporativas (bancos, tesorería, consolidación), control de desempeño, gobierno y cumplimiento, y selección de directores**. Las unidades deben conservar **clientes, ventas, marketing, operación y compras de sus insumos**. Llevar contabilidad, nómina y sistemas a un **centro de servicios compartidos** podría bajar su costo de 9.6 a unos 6.3 millones (ahorro de 3.3 millones, 34 %), con acuerdos de nivel de servicio. Rendimientos: Restaurantes 14 %, Salsas 30 %, Cafés 7.5 %. Salsas merece más inversión si tiene proyectos con rendimiento similar; Restaurantes supera el mínimo; Cafés no lo alcanza. Para medir al corporativo: su costo como porcentaje de las ventas del grupo (hoy 18 ÷ 510 ≈ 3.5 %), el ahorro logrado, la rapidez de los reportes y una encuesta anual a los directores. Para Cafés: un plan de 12 a 18 meses con metas claras (remodelación y nuevo formato); si no supera el 12 %, evaluar venderla.`,
lec:["El corporativo debe agregar valor, no solo costos.","Los servicios compartidos ahorran en tareas repetitivas.","El capital se asigna por rendimiento, riesgo y estrategia, no por quién lo pide más fuerte."]},
{id:"fundador-30", t:"El fundador quiere seguir decidiendo todo con el 30 % de las acciones", mod:"M24", tipo:"ficticio", les:"M24-5",
ctx:`Después de una ronda de inversión y la entrada de un fondo, Toño, fundador de una nueva marca del grupo (Tortas Lupita Express, cocinas ocultas y suscripciones), conserva el 30 % de las acciones de esa empresa. El fondo tiene el 45 % y Grupo Lupita el 25 %. Toño sigue como director general y quiere decidir solo las adquisiciones, los sueldos de su equipo y la estrategia. Ha firmado contratos con una empresa de su cuñado sin informar al consejo. Las ventas crecen, pero las pérdidas también.`,
dil:`¿Qué puede decidir Toño, qué le corresponde al consejo y a la asamblea, y cómo resolver el conflicto sin destruir la empresa?`,
datos:`| Dato | Valor |
|---|---|
| Acciones: Toño / fondo / Grupo Lupita | 30 % / 45 % / 25 % |
| Consejo | 5 miembros: Toño, 2 del fondo, 1 de Grupo Lupita, 1 independiente |
| Ventas del año | 80 millones (+60 %) |
| Pérdida de operación | −12 millones |
| Contratos con la empresa del cuñado | 6 millones al año, sin aprobación del consejo |
| Convenio entre accionistas | Las adquisiciones y los contratos con partes relacionadas requieren aprobación del consejo |`,
preg:["¿Qué decisiones corresponden al director general, al consejo y a la asamblea?","¿Qué problema de gobierno representan los contratos con la empresa del cuñado?","¿Hay un problema de agencia? ¿Cuál?","¿Qué opciones tiene el consejo?","¿Qué recomendarías para conservar el talento de Toño y proteger a todos los accionistas?"],
resp:`Toño, como **director general**, dirige el día a día y propone la estrategia, pero **el consejo** aprueba la estrategia, el presupuesto, las adquisiciones, los contratos con partes relacionadas y la compensación de la alta dirección, y puede removerlo; la **asamblea** elige al consejo y decide sobre capital, fusiones y estatutos. Con 30 % de las acciones, Toño **no controla** la empresa: el fondo y Grupo Lupita suman 70 %. Los contratos con la empresa de su cuñado son **operaciones con partes relacionadas** sin aprobación: un conflicto de interés y una violación del convenio. Hay un **problema de agencia**: el director busca crecer y controlar aunque se pierda dinero, y puede beneficiar a su familia a costa de los socios. Opciones del consejo: exigir que los contratos se revisen por el consejero independiente y se ajusten a precios de mercado o se cancelen; aprobar un plan con metas de rentabilidad; fijar una matriz de autoridad; ligar su bono a metas de largo plazo; y, si no hay cambio, removerlo como director general (conservando sus acciones). Recomendación: separar los cargos (Toño como presidente del producto o director de innovación y un director general con experiencia operativa), sumar otro independiente y aplicar una política formal de partes relacionadas.`,
lec:["Tener una parte de las acciones no da el control de la empresa.","Las operaciones con partes relacionadas deben aprobarse y revelarse.","El consejo protege a todos los accionistas, incluido el fundador."]},
{id:"lupita-bolsa", t:"Grupo Lupita evalúa salir a bolsa", mod:"M25", tipo:"ficticio", les:"M25-2",
ctx:`El fondo de capital privado que tiene el 20 % de Grupo Lupita quiere vender su parte en dos años. Al mismo tiempo, el grupo quiere 500 millones de pesos para crecer en Estados Unidos. Un banco de inversión propone una oferta pública en la Bolsa Mexicana de Valores; otro asesor propone una venta privada de la parte del fondo y un crédito para la expansión.`,
dil:`¿Conviene salir a bolsa ahora, esperar o buscar otra vía?`,
datos:`| Dato | Valor |
|---|---|
| Ventas anuales | 900 millones |
| EBITDA | 135 millones |
| Utilidad neta | 60 millones |
| Deuda neta | 120 millones |
| Múltiplo valor de la empresa ÷ EBITDA de empresas comparables en bolsa | 9 veces |
| Costo estimado de la oferta | 5 % del monto colocado + 8 millones al año de cumplimiento |
| Gobierno actual | 7 consejeros, 2 independientes; sin comité de prácticas societarias |`,
preg:["Estima el valor de la empresa y el valor de las acciones con el múltiplo.","¿Cuánto valdría la parte del fondo?","¿Qué ventajas y desventajas tendría la salida a bolsa para Grupo Lupita?","¿Está lista la empresa en gobierno corporativo?","¿Qué recomiendas y en qué plazo?"],
resp:`Valor de la empresa: 135 × 9 = **1,215 millones**; valor de las acciones: 1,215 − 120 = **1,095 millones**. La parte del fondo (20 %) valdría unos **219 millones**. Una oferta de 500 millones primarios más 219 secundarios (unos 719 millones) costaría unos 36 millones de comisiones más 8 millones al año. **Ventajas:** capital para crecer sin más deuda, liquidez para el fondo y los familiares, visibilidad. **Desventajas:** costos, transparencia (los competidores verán sus márgenes), presión trimestral, pérdida parcial de control y un tamaño todavía pequeño para atraer a grandes inversionistas. **Gobierno:** no está lista: necesita comités de auditoría y prácticas societarias solo con independientes, política de partes relacionadas, área de relación con inversionistas y estados conforme a NIIF. Recomendación: **no salir ahora**; resolver la salida del fondo con una **venta privada** a otro fondo o inversionista estratégico, financiar la primera etapa en Estados Unidos con crédito y utilidades (deuda neta ÷ EBITDA pasaría de 0.9 a unas 2.5 veces si se piden 220 millones, en el límite de la prudencia), adoptar el Código de Mejores Prácticas durante dos años y reconsiderar la bolsa cuando el grupo sea más grande.`,
lec:["Salir a bolsa es un cambio de forma de vida, no solo una forma de conseguir dinero.","El gobierno corporativo se prepara años antes de la oferta.","Hay otras vías para dar liquidez a un fondo."]},
{id:"amazon-pierde-gana", t:"¿Por qué Amazon pierde dinero en algunos negocios y gana en otros?", mod:"M26", tipo:"real", les:"M28-7",
ctx:`Amazon informa sus resultados en tres segmentos: Norteamérica, Internacional y AWS. Durante años, su tienda internacional perdió dinero, mientras AWS, que representa una parte menor de las ventas, generaba la mayor parte de la utilidad de operación. Muchos analistas se han preguntado si Amazon debería separar AWS o cerrar los negocios que pierden.`,
dil:`¿Es razonable que una empresa mantenga negocios que pierden dinero? ¿Cómo se relacionan los negocios de Amazon entre sí?`,
datos:`Datos de 2023, según el Formulario 10-K de Amazon (redondeados, miles de millones de dólares):

| Segmento | Ventas | Utilidad de operación |
|---|---|---|
| Norteamérica | 353 | 15 |
| Internacional | 131 | −3 |
| AWS | 91 | 25 |
| **Total** | **575** | **37** |`,
preg:["¿Qué porcentaje de las ventas y de la utilidad aporta cada segmento?","¿Qué ventaja competitiva tiene cada negocio (lecciones M26-1, M26-2 y M26-4)?","¿Por qué Amazon podría aceptar pérdidas en el segmento Internacional?","¿Qué economías de alcance comparten sus negocios?","¿Qué riesgos tiene depender tanto de AWS para la utilidad?"],
resp:`Ventas: Norteamérica ≈ 61 %, Internacional ≈ 23 %, AWS ≈ 16 %. Utilidad: Norteamérica ≈ 41 %, Internacional ≈ −8 %, AWS ≈ 68 %. **Ventajas:** la tienda compite por **costo y conveniencia** (escala, logística, Prime) con efecto red en el mercado para vendedores externos; AWS tiene **escala**, tecnología y **costos de cambio** altos para sus clientes; la publicidad aprovecha el tráfico de la tienda. Amazon acepta pérdidas internacionales porque las considera **inversiones** para ganar posición en mercados grandes, financiadas por el efectivo de AWS y de Norteamérica, con una visión de **largo plazo** que su fundador explicó desde la carta de 1997. **Economías de alcance:** infraestructura tecnológica (de donde nació AWS), centros de distribución usados por vendedores externos, clientes Prime que compran más y alimentan la publicidad. **Riesgos:** si la competencia en la nube reduce los márgenes de AWS, la empresa tendría menos recursos para sostener las inversiones; además, los reguladores de competencia vigilan su poder en varios mercados. La clave es la **disciplina**: Amazon también ha cerrado proyectos que no funcionaron.`,
fuentes:`Amazon.com, Inc., Formulario 10-K 2023; carta de Jeff Bezos a los accionistas (1997).`,
lec:["Mira los resultados por segmento para saber dónde se gana el dinero.","Perder dinero en un negocio puede ser una inversión si hay una lógica de largo plazo y disciplina.","Los negocios que comparten recursos se refuerzan entre sí."]},
{id:"crisis-intoxicacion", t:"Crisis por intoxicación en una sucursal de Tortas Lupita", mod:"M27", tipo:"ficticio", les:"M27-4",
ctx:`Un sábado, doce clientes de una sucursal de Tortas Lupita presentan síntomas de intoxicación; dos son hospitalizados. A mediodía, un video viral acusa a la marca. Los periodistas llaman, los franquiciatarios preguntan qué decir y un abogado recomienda «no reconocer nada». Lupita debe decidir en las próximas horas.`,
dil:`¿Cómo responder para proteger a las personas, a la marca y a la empresa?`,
datos:`| Dato | Valor |
|---|---|
| Afectados | 12 (2 hospitalizados) |
| Reproducciones del video a las 12:00 | 200,000 |
| Sucursales de la marca | 60 (40 propias, 20 franquiciadas) |
| Proveedor de carne de esa sucursal | El mismo que surte a otras 15 |
| Plan de crisis | Existe, pero nunca se ha practicado |
| Seguro de responsabilidad civil | Sí, con cobertura limitada |`,
preg:["¿Qué hacer en la primera hora y en las primeras seis horas?","¿Qué decir en el primer mensaje público y qué no decir?","¿Qué hacer con las otras sucursales y con el proveedor?","¿Cómo comunicarse con los franquiciatarios y los empleados?","¿Qué cambios se deben hacer después?"],
resp:`**Primera hora:** cerrar la sucursal, atender a los afectados y llamar a servicios de salud, guardar muestras, avisar al comité de crisis. **Primeras seis horas:** activar el comité (dirección, operaciones, legal, comunicación), avisar a la autoridad sanitaria y cooperar, **inmovilizar los lotes** del mismo proveedor en las otras 15 sucursales como precaución, y visitar a los afectados. **Primer mensaje (en unas tres horas):** reconocer lo ocurrido, expresar preocupación genuina, informar que la sucursal está cerrada, que se atiende a los afectados y se coopera con las autoridades, y cuándo habrá más información. **No decir:** negar, minimizar, culpar al cliente o al proveedor sin pruebas, ni «sin comentarios». El consejo legal de «no reconocer nada» debe equilibrarse: se puede ser responsable y empático sin aceptar culpas legales antes de la investigación. **Franquiciatarios y empleados:** un mensaje interno inmediato con instrucciones claras y un solo vocero. **Después:** investigar la causa raíz (por ejemplo, falla de refrigeración), cubrir gastos médicos, auditoría externa de seguridad alimentaria, nueva capacitación, revisión del proveedor, practicar el plan de crisis con simulacros y comunicar públicamente los cambios antes de reabrir.`,
lec:["Primero las personas, después la imagen.","Comunicar pronto, con la verdad y con acciones.","Un plan de crisis sirve solo si se practica."]}
);

// ===== Casos reales adicionales =====
window.CASOS.push(
{id:"oxxo", t:"OXXO: cómo FEMSA creció a miles de tiendas", mod:"M20", tipo:"real", les:"M20-7",
ctx:`Según la historia corporativa de FEMSA, la primera tienda OXXO abrió en Monterrey en 1978. En la primera mitad de la década de 2020, la cadena superó las 20,000 tiendas, la mayoría en México, con presencia en otros países de Latinoamérica, según los informes anuales de la empresa.`,
dil:`¿Qué elementos explican que un formato de tienda pequeña se haya podido replicar miles de veces?`,
datos:`| Elemento | Qué hace OXXO (según información pública) |
|---|---|
| Formato | Tienda pequeña, estandarizada, con horario amplio |
| Ubicación | Análisis con datos de población, flujo y competencia |
| Abasto | Red de centros de distribución y entregas directas de proveedores |
| Operación | Muchas tiendas operadas por comisionistas |
| Servicios | Pagos de recibos, depósitos, recargas, pagos de compras en línea |
| Indicadores | Número de tiendas, aperturas netas, ventas mismas tiendas, ticket promedio |`,
preg:["¿Qué parte del modelo es más difícil de copiar para un competidor nuevo?","¿Por qué los servicios son importantes para una tienda de conveniencia?","¿Qué ventajas y riesgos tiene operar con comisionistas?","¿Qué críticas se han hecho a este tipo de cadenas?"],
resp:`Lo más difícil de copiar es la combinación de **escala, logística y ubicaciones**: una red de miles de tiendas surtidas con frecuencia desde centros de distribución permite tiendas pequeñas con poco inventario, algo que un competidor con pocas tiendas no puede igualar en costo. Los **servicios** atraen visitas aunque el cliente no venga a comprar, y aprovechan la misma red (economías de alcance). Los **comisionistas** combinan control central del formato con el incentivo de un operador local, pero sus condiciones han sido objeto de críticas y requieren una relación justa. Entre las críticas a las cadenas de conveniencia se mencionan su efecto en las tiendas de abarrotes, la venta de productos ultraprocesados, temas laborales y de seguridad.`,
fuentes:`FEMSA, historia corporativa e informes anuales (femsa.com).`,
lec:["Un formato estandarizado y bien ubicado se puede replicar a gran escala.","La logística hace posible el modelo de tienda pequeña.","Un caso real tiene luces y sombras."]},
{id:"mcdonalds", t:"McDonald's: el negocio de la marca y de los inmuebles", mod:"M21", tipo:"real", les:"M21-7",
ctx:`Ray Kroc abrió en 1955 su primer local franquiciado de McDonald's en Des Plaines, Illinois, y en 1961 compró los derechos a los hermanos McDonald. Según los informes anuales de la empresa, alrededor del 95 % de sus restaurantes son operados por franquiciatarios y sus ingresos de restaurantes franquiciados incluyen rentas, regalías y cuotas iniciales.`,
dil:`¿Por qué una cadena de hamburguesas obtiene buena parte de sus ingresos de rentas inmobiliarias?`,
datos:`| Concepto | Ejemplo ilustrativo por restaurante (no son cifras reales) |
|---|---|
| Ventas mensuales | 1,000,000 |
| Regalía (4 %) | 40,000 |
| Renta (10 % de ventas) | 100,000 |
| Costo del inmueble para la marca | 50,000 |
| Margen de la marca | 90,000 |`,
preg:["¿Cuánto recibe la marca por regalías y cuánto por renta en el ejemplo?","¿Por qué ser dueña o arrendataria del local le da más control?","¿Qué tensiones puede generar este modelo con los franquiciatarios?","¿Qué puede copiar una franquicia pequeña de este modelo?"],
resp:`En el ejemplo, la marca recibe 40,000 por regalías y 100,000 por renta; su margen es 90,000, más de dos veces la regalía. Ser dueña o arrendataria principal del local le da **control**: si el franquiciatario incumple, puede terminar el arrendamiento y conservar la ubicación. Las **tensiones** típicas tienen que ver con remodelaciones obligatorias, promociones de precio bajo y cambios de menú que afectan la utilidad del franquiciatario. Una franquicia pequeña puede copiar la idea de **controlar las ubicaciones** (rentar a su nombre y subarrendar) y de cobrar sobre ventas, siempre que el franquiciatario gane lo suficiente.`,
fuentes:`McDonald's Corporation, Formulario 10-K e historia corporativa; J. Love, «McDonald's: Behind the Arches» (1986).`,
lec:["En una franquicia, el control de la ubicación puede valer tanto como la marca.","Los ingresos sobre ventas son estables para el franquiciante.","La red solo dura si los franquiciatarios ganan."]},
{id:"target-canada", t:"Target en Canadá: crecer demasiado rápido", mod:"M22", tipo:"real", les:"M22-8",
ctx:`En 2011, Target anunció la compra de los derechos de arrendamiento de tiendas de la cadena canadiense Zellers. En 2013 abrió sus primeras tiendas en Canadá y en menos de un año llegó a más de 130. En enero de 2015 anunció el cierre de sus 133 tiendas en ese país, con pérdidas y cargos de miles de millones de dólares, según la empresa y la prensa de negocios.`,
dil:`¿Qué falló en una expansión de una de las mayores cadenas de Estados Unidos a un país vecino?`,
datos:`| Factor | Lo que se reportó públicamente |
|---|---|
| Velocidad | Más de 130 tiendas en menos de un año |
| Abasto | Anaqueles vacíos mientras los centros de distribución estaban llenos |
| Datos | Errores en la información de productos del nuevo sistema |
| Ubicaciones | Locales heredados de Zellers, no siempre en los mejores lugares |
| Precios | Más altos de lo que esperaban los clientes canadienses |`,
preg:["¿Qué patrones de expansión fallida aparecen en el caso?","¿Qué habría cambiado una prueba piloto con pocas tiendas?","¿Por qué las ubicaciones heredadas fueron un problema?","¿Qué lista de verificación habrías aplicado antes de abrir?"],
resp:`Aparecen la **velocidad excesiva**, los **sistemas y la logística no probados**, las **ubicaciones elegidas por disponibilidad** y las **expectativas que no se cumplieron**. Una **prueba piloto** con pocas tiendas habría permitido detectar las fallas de inventario y de precios antes de que afectaran a todo el país, y corregirlas con menos costo. Las ubicaciones heredadas se usaron porque ya se habían pagado los derechos de renta (presión por no dejarlas vacías), no porque fueran las mejores. Antes de abrir: concepto probado en un mercado parecido, sistemas funcionando, ubicaciones evaluadas, precios competitivos, equipo local, escenarios y un límite de pérdidas.`,
fuentes:`Target Corporation, comunicado del 15 de enero de 2015 e informe anual 2014; «The Last Days of Target» (Canadian Business, 2016).`,
lec:["La prisa es el mayor enemigo de una expansión.","Los sistemas deben probarse antes de crecer.","Define cuánto estás dispuesto a perder antes de empezar."]},
{id:"wework", t:"WeWork: cuando el gobierno corporativo falla antes de salir a bolsa", mod:"M24", tipo:"real", les:"M24-9",
ctx:`WeWork rentaba edificios a largo plazo y los subarrendaba como oficinas compartidas. En una ronda privada de enero de 2019 fue valuada en unos 47,000 millones de dólares, según lo informado públicamente. En agosto de 2019 presentó su prospecto para salir a bolsa; en septiembre canceló la oferta y su fundador dejó la dirección. En noviembre de 2023 se acogió a la protección por quiebra en Estados Unidos.`,
dil:`¿Qué señales de gobierno corporativo y de modelo de negocio alertaron a los inversionistas?`,
datos:`| Señal | Según el prospecto y la prensa |
|---|---|
| Pérdidas | Muy altas y crecientes |
| Modelo | Rentas de largo plazo contra ingresos de corto plazo |
| Control | Acciones con voto múltiple para el fundador |
| Conflictos de interés | Rentas de edificios con participación del fundador; pago por la marca «We» (después revertido) |
| Consejo | Poca capacidad real de vigilar al fundador |`,
preg:["¿Qué riesgo financiero tenía el modelo de negocio?","¿Qué problema de agencia aparece en el caso?","¿Qué mecanismos de gobierno habrían reducido los conflictos?","¿Por qué el prospecto fue el momento en que todo se hizo visible?"],
resp:`El riesgo financiero era un **desajuste de plazos**: la empresa se comprometía a pagar rentas durante muchos años, pero sus clientes podían irse en meses; en una crisis, los ingresos caen y las rentas siguen (lección M19-1). El **problema de agencia** se ve en las operaciones del fundador con la empresa y en su control desproporcionado mediante acciones con voto múltiple. Habrían ayudado: consejeros independientes con poder real, un comité que aprobara las **operaciones con partes relacionadas**, límites al voto múltiple y separación de cargos. El **prospecto** obligó a revelar con detalle los números y los conflictos, y los inversionistas públicos, que no habían participado en las rondas privadas, reaccionaron con desconfianza.`,
fuentes:`Prospecto S-1 de The We Company (agosto de 2019); comunicados de WeWork (2019 y 2023); cobertura de prensa de negocios.`,
lec:["La transparencia de una oferta pública revela lo que las rondas privadas pueden esconder.","El control sin contrapesos aumenta el riesgo de conflictos.","Un modelo con plazos desajustados es frágil ante una crisis."]},
{id:"kodak", t:"Kodak: inventar el futuro y no aprovecharlo", mod:"M27", tipo:"real", les:"M27-5",
ctx:`Kodak dominó durante gran parte del siglo XX la fotografía y ganaba sobre todo con película, revelado y papel. Según su propia historia, en 1975 uno de sus ingenieros, Steven Sasson, construyó uno de los primeros prototipos de cámara digital. En enero de 2012, Kodak se declaró en quiebra en Estados Unidos y salió del proceso en 2013 como una empresa mucho más pequeña.`,
dil:`¿Por qué una empresa que inventó una tecnología clave no logró aprovecharla?`,
datos:`| Concepto (ilustrativo) | Película | Digital al inicio |
|---|---|---|
| Margen por cada 100 de ventas | 60 | 15 |
| Atractivo para la dirección | Muy alto | Bajo |
| Riesgo de canibalizar | — | Alto |
| Futuro del mercado | En declive | En crecimiento |`,
preg:["¿Qué dilema enfrentaba la dirección de Kodak?","¿Por qué no basta con inventar una tecnología?","¿Qué habría hecho una empresa «ambidiestra»?","¿Qué lección aplica a un negocio pequeño?"],
resp:`El dilema era el del **innovador**: el negocio digital al principio dejaba mucho menos margen y amenazaba con **canibalizar** la película, que era la gran fuente de utilidades; parecía racional proteger lo que funcionaba. Inventar no basta: hace falta un **modelo de negocio** que gane con la nueva tecnología y la disposición a reemplazar el negocio propio antes de que lo haga otro. Una empresa **ambidiestra** habría separado el negocio digital en una unidad independiente, con metas de crecimiento y aprendizaje, y habría aceptado la canibalización. Para un negocio pequeño: vigilar los cambios en los hábitos de los clientes y probar a tiempo nuevas formas de atenderlos, aunque al principio dejen menos.`,
fuentes:`Eastman Kodak, historia corporativa y comunicados (2012–2013).`,
lec:["Ver el cambio no es suficiente: hay que actuar a tiempo.","Proteger el negocio de hoy puede destruir el de mañana.","Las unidades independientes ayudan a innovar."]}
);
