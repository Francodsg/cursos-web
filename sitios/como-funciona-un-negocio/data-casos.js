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
