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
