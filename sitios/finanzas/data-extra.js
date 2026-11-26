// Contenido ampliado del Plan 5: detalle de estrategias, lecciones, preguntas, glosario,
// biblioteca, fraudes, cuestionario de riesgo, insignias y datos históricos.

// Filantropía y primer millón de los 8 perfiles modelo (para el comparador).
window.EXTRA_PERFILES = {
  "warren-buffett":{filan:"The Giving Pledge (con Gates); donaciones anuales a la Fundación Gates y a las fundaciones de sus hijos.", millon:"Hacia los 32 años (1962)"},
  "amancio-ortega":{filan:"Fundación Amancio Ortega: educación y equipos de diagnóstico y tratamiento del cáncer para la sanidad pública española."},
  "carlos-slim":{filan:"Fundación Carlos Slim: salud, educación y empleo en América Latina."},
  "jeff-bezos":{filan:"Bezos Earth Fund (clima) y Day One Fund (personas sin hogar)."},
  "john-bogle":{filan:"Donaciones regulares, sobre todo a la educación; su gran legado son las comisiones que ahorró a millones de inversores."},
  "ronald-read":{filan:"Legó unos 6 millones de dólares a un hospital y a la biblioteca de Brattleboro (Vermont)."},
  "ingvar-kamprad":{filan:"Fundaciones vinculadas a IKEA (Stichting INGKA, IKEA Foundation)."},
  "jesse-livermore":{filan:"—"}
};

// Detalle de cada estrategia (por slug): evidencia, pasos para aplicarla y errores frecuentes.
window.ESTRATEGIA_DETALLE = {
"gastar-menos":{ev:["Stanley y Danko (1996): la mayoría de los millonarios estadounidenses de primera generación vivía por debajo de sus medios.","La tasa de ahorro determina cuántos años necesitas para la independencia financiera mucho más que la rentabilidad."],pasos:["Registra todos tus gastos durante un mes.","Fija un porcentaje de ahorro (empieza por un 10 % y súbelo).","Págate primero: transfiere el ahorro el día de cobro.","Revisa una vez al mes y ajusta."],err:["Recortar solo gastos pequeños y olvidar los grandes (vivienda, coche).","Planes tan estrictos que se abandonan a las pocas semanas."]},
"interes-compuesto":{ev:["10 000 al 7 % anual se convierten en unos 19 700 en 10 años y en unos 76 100 en 30 años.","La mayor parte de la fortuna de Buffett se formó después de cumplir los 60 años: el tiempo multiplica."],pasos:["Empieza cuanto antes, aunque sea con poco.","Aporta cada mes de forma automática.","Reinvierte los rendimientos (dividendos e intereses).","No interrumpas el proceso en las caídas."],err:["Esperar a «tener más dinero» para empezar.","Sacar el dinero en la primera caída."]},
"ser-dueno":{ev:["Las listas de Forbes están formadas casi por completo por dueños de empresas o de acciones, no por asalariados.","Oprah Winfrey multiplicó su riqueza cuando pasó a ser dueña de su programa (1986)."],pasos:["Calcula tu valor neto (lo que tienes menos lo que debes).","Convierte parte de tu sueldo en activos cada mes.","Valora participaciones, acciones o un pequeño negocio."],err:["Confundir comprar cosas caras con poseer activos.","Comprar un activo sin entender cuánto rinde y cuánto cuesta."]},
"activos-productivos":{ev:["Los informes SPIVA de S&P Dow Jones Indices muestran año tras año que la gran mayoría de los fondos de gestión activa rinde menos que su índice a 15 años.","Las comisiones se restan cada año y se acumulan: un 1,5 % anual puede llevarse más de un tercio del resultado a 30 años."],pasos:["Elige fondos indexados amplios y de bajo coste (gastos totales anuales bajos).","Diversifica entre países y tipos de activos.","Comprueba el coste total anual (TER) antes de comprar."],err:["Elegir un fondo por su rentabilidad del último año.","Pagar comisiones altas sin saberlo."]},
"aprender":{ev:["Buffett dice dedicar gran parte del día a leer.","Los ingresos suelen crecer con habilidades escasas y demandadas (datos de empleo y salarios de cada país)."],pasos:["Elige una habilidad de alto valor para este año.","Dedica un tiempo fijo cada día (30 minutos).","Aplica lo aprendido en un proyecto real."],err:["Acumular cursos sin aplicarlos.","Aprender lo que está de moda en lugar de lo que valora tu sector."]},
"circulo":{ev:["Buffett evitó las puntocom (1999) porque no entendía su negocio; la burbuja estalló en 2000.","Peter Lynch encontró oportunidades en sectores que conocía como consumidor."],pasos:["Escribe en qué sectores o temas sabes más que la media.","Antes de invertir, explica en tres frases cómo gana dinero ese negocio.","Si no puedes, usa un fondo indexado."],err:["Invertir por recomendación de otro sin entender el producto.","Creer que tu círculo es más grande de lo que es."]},
"margen":{ev:["Graham perdió cerca del 70 % de su sociedad en 1929–1932 y diseñó el margen de seguridad para no repetirlo.","Livermore se arruinó varias veces por el apalancamiento."],pasos:["Ten un fondo de emergencia de 3–6 meses de gastos.","No inviertas dinero que vayas a necesitar en menos de 5 años.","Evita la deuda que te obligue a vender en mal momento."],err:["Invertir el fondo de emergencia en bolsa.","Usar dinero prestado para invertir."]},
"problema":{ev:["Gates (software para todos los ordenadores), Bezos (comprar sin salir de casa), Galperin (comprar y pagar con confianza en América Latina)."],pasos:["Anota problemas que tú o tus clientes tenéis a menudo.","Habla con 10 personas que lo sufran antes de gastar dinero.","Haz una versión mínima y comprueba si alguien paga."],err:["Enamorarte de la solución antes de comprobar el problema.","Gastar en local, marca o web antes de tener clientes."]},
"reinvertir":{ev:["Amazon reinvirtió casi todos sus beneficios durante años y no repartió dividendos.","Pontegadea reinvierte los dividendos de Inditex en inmuebles."],pasos:["Decide qué parte de tus ingresos extra o beneficios reinviertes.","Activa la reinversión automática de dividendos si tu fondo o cuenta lo permite.","En un negocio, reinvierte en lo que más rinde."],err:["Subir el nivel de vida con cada ingreso extra.","Reinvertir en un negocio que no es rentable."]},
"apalancamiento":{ev:["El software y el contenido se pueden vender infinitas veces sin coste adicional (Gates, Winfrey).","Blakely creció sin deuda ni inversores."],pasos:["Pregúntate qué parte de tu trabajo podrías convertir en producto (curso, plantilla, aplicación).","Documenta procesos para que otras personas puedan hacerlos.","Invierte capital para que trabaje por ti."],err:["Confundir apalancamiento con deuda.","Crear productos sin validar la demanda."]},
"largo-plazo":{ev:["El índice S&P 500 cayó un 37 % en 2008 y recuperó sus niveles anteriores con dividendos en unos 4–5 años.","Quien vendió en el peor momento convirtió una caída temporal en una pérdida definitiva."],pasos:["Define tu horizonte para cada objetivo.","Decide de antemano qué harás en una caída (normalmente: nada, o seguir aportando).","Revisa tu cartera una vez al año, no cada día."],err:["Mirar la cartera a diario.","Cambiar de estrategia en cada noticia."]},
"miedo":{ev:["Slim compró empresas en la crisis de deuda de 1982; Buffett invirtió en Goldman Sachs en 2008.","Ambos tenían liquidez propia y no necesitaban vender."],pasos:["Ten tu fondo de emergencia completo.","Sigue tus aportaciones automáticas en las caídas.","Si tienes liquidez extra, define de antemano cuándo la invertirías."],err:["Intentar adivinar el fondo exacto de la caída.","Comprar en caídas con dinero prestado."]},
"costes":{ev:["Walmart e IKEA construyeron su ventaja sobre costes bajos.","En inversión, cada punto de comisión es rentabilidad perdida."],pasos:["Revisa tus gastos fijos una vez al año.","Negocia seguros, telefonía y comisiones bancarias.","Elimina suscripciones que no usas."],err:["Recortar en lo que te hace ganar más (formación, salud).","Gastar tiempo en ahorrar céntimos y olvidar los grandes gastos."]},
"deuda":{ev:["Una tarjeta al 25 % TAE duplica la deuda en unos 3 años si no se paga.","Batista y Livermore se hundieron por la deuda."],pasos:["Haz una lista de deudas con saldo y TAE.","Paga primero la más cara (avalancha) o la más pequeña (bola de nieve).","Solo pide préstamos para activos que rindan más de lo que cuestan."],err:["Pagar solo el mínimo de la tarjeta.","Pedir un préstamo para pagar otro sin cambiar los hábitos."]},
"diversificar":{ev:["Ortega diversificó en inmuebles a través de Pontegadea; Gates, a través de Cascade.","La cartera «All Weather» de Dalio reparte el riesgo entre escenarios económicos."],pasos:["Reparte entre acciones, renta fija y liquidez según tu edad y tu tolerancia al riesgo.","Diversifica entre países.","Rebalancea una vez al año."],err:["Tener muchos fondos que invierten en lo mismo.","Concentrar tu patrimonio en la empresa en la que trabajas."]},
"red":{ev:["Buffett estudió con Graham y trabajó con él; Gates y Buffett se aconsejaron durante décadas.","Galperin consiguió sus primeros inversores en Stanford."],pasos:["Identifica a 3 personas de las que aprender.","Aporta valor antes de pedir.","Busca comunidades o asociaciones de tu sector."],err:["Buscar contactos solo cuando los necesitas.","Confiar en un «gurú» que vende cursos de riqueza rápida."]}
};

// Herramientas: metadatos (la lógica está en tools.js).
window.HERRAMIENTAS = [
["compuesto","Interés compuesto","Cuánto crece tu dinero con aportaciones periódicas."],
["independencia","Independencia financiera","Tu cifra de independencia y cuántos años te faltan."],
["presupuesto","Presupuesto 50/30/20","Reparte tus ingresos entre necesidades, deseos y ahorro."],
["emergencia","Fondo de emergencia","Cuánto necesitas y en cuánto tiempo lo completas."],
["deudas","Salir de deudas","Avalancha frente a bola de nieve: meses e intereses."],
["comisiones","Coste de las comisiones","Lo que te cuestan las comisiones en 30 años."],
["inflacion","Inflación y poder adquisitivo","Lo que valdrá tu dinero dentro de unos años."],
["valor-neto","Valor neto","Lo que tienes menos lo que debes, y la regla de Stanley y Danko."],
["comprar-alquilar","Comprar o alquilar vivienda","Patrimonio final en cada opción."],
["caidas","Simulador de caídas del mercado","¿Qué habría pasado si invertías en 2007?"],
["equilibrio","Punto de equilibrio","Cuántas ventas necesita tu negocio para no perder dinero."]
];

// Lecciones ampliadas: c = cuerpo adicional, e = ejemplo, m = millonario relacionado (slug), h = herramienta, x = ejercicio de «Mi plan».
window.LECCION_EXTRA = {
"E1-1":{c:"Separa los gastos fijos (alquiler, suministros, cuotas) de los variables (comida fuera, ocio). Los ingresos que cuentan son los netos, después de impuestos.",e:"Ingresas 1 500 al mes y al anotar todo descubres 180 en comidas fuera y 60 en suscripciones que casi no usas.",m:"john-d-rockefeller",h:"presupuesto",x:"Anota durante 30 días todos tus gastos en «Mi plan» o en una hoja."},
"E1-2":{c:"La regla 50/30/20 dedica un 50 % a necesidades, un 30 % a deseos y un 20 % al ahorro y la deuda. Es solo un punto de partida: si la vivienda se lleva más de la mitad, ajusta los deseos.",e:"Con 2 000 netos: 1 000 necesidades, 600 deseos, 400 ahorro.",m:"ingvar-kamprad",h:"presupuesto",x:"Haz tu primer presupuesto con la herramienta y guárdalo en «Mi plan»."},
"E1-3":{c:"Lo que no ves, no lo gastas. Programar una transferencia automática convierte el ahorro en un hábito que no depende de la fuerza de voluntad.",e:"Una transferencia de 150 cada día 1 durante 10 años son 18 000 sin contar rendimientos.",m:"ronald-read",h:"compuesto",x:"Programa una transferencia automática el día de cobro."},
"E1-4":{c:"Debe estar en una cuenta segura y disponible (no en bolsa). Si tu trabajo es inestable o tienes personas a cargo, acércate a 6 meses o más.",e:"Gastos esenciales de 1 200 al mes: fondo de 3 600 a 7 200.",m:"carlos-slim",h:"emergencia",x:"Calcula tu fondo de emergencia objetivo y fija una fecha para completarlo."},
"E1-5":{c:"Una meta SMART es específica, medible, alcanzable, relevante y con fecha. Divide cada meta en una cantidad mensual.",e:"«6 000 en 12 meses» = 500 al mes.",m:"millonario-tipico",h:"",x:"Escribe 3 metas con cifra y fecha en «Mi plan»."},
"E1-6":{c:"Morgan Housel defiende que en el dinero el comportamiento pesa más que la inteligencia. Las decisiones impulsivas, la comparación con otros y el miedo arruinan buenos planes.",e:"Dos personas con la misma cartera: una vende en la caída de 2020 y otra no; cinco años después sus patrimonios son muy distintos.",m:"ronald-read",h:"",x:"Escribe tu regla personal para las compras impulsivas (p. ej., esperar 48 horas)."},
"E2-1":{c:"El tipo nominal (TIN) no incluye comisiones ni la frecuencia de pago; la TAE sí, por eso es la cifra para comparar préstamos y depósitos.",e:"Dos préstamos al 8 % TIN pueden tener TAE de 8,3 % y de 9,5 % según sus comisiones.",m:"",h:"deudas",x:"Busca la TAE de cada una de tus deudas y anótala en el diagnóstico."},
"E2-2":{c:"La deuda solo es razonable si financia algo que rinde más de lo que cuesta o que es imprescindible (una vivienda a un tipo moderado, una formación que sube tus ingresos).",e:"Pedir un préstamo al 20 % para unas vacaciones es deuda mala; una hipoteca al 3 % sobre una vivienda que podrías alquilar puede ser razonable.",m:"eike-batista",h:"",x:"Clasifica tus deudas en buenas y malas."},
"E2-3":{c:"Los bancos consultan registros de impagos y tu historial para decidir si te prestan y a qué tipo. Pagar a tiempo y no usar todo el límite de las tarjetas mejora tus condiciones.",e:"Un impago de una factura pequeña puede encarecer años después una hipoteca.",m:"",h:"",x:"Domicilia los pagos mínimos de tus deudas para no olvidar ninguno."},
"E2-4":{c:"En los dos métodos pagas el mínimo en todas las deudas y el dinero extra va a una. La avalancha ahorra más intereses; la bola de nieve da victorias rápidas que motivan.",e:"Con una tarjeta al 24 % y un préstamo al 7 %, la avalancha ataca primero la tarjeta.",m:"jesse-livermore",h:"deudas",x:"Compara los dos métodos con tus deudas reales y elige uno."},
"E3-1":{c:"No hay rendimiento alto sin riesgo. El riesgo se mide por cuánto puede variar el valor y cuánto puedes perder; tu horizonte decide cuánto riesgo puedes asumir.",e:"Un depósito apenas varía; las acciones pueden caer un 30 % en un año y subir mucho en una década.",m:"benjamin-graham",h:"",x:"Haz el cuestionario de tolerancia al riesgo del diagnóstico."},
"E3-2":{c:"El crecimiento depende de tres factores: la cantidad, la rentabilidad y, sobre todo, el tiempo. La «regla del 72»: divide 72 entre la rentabilidad anual para saber en cuántos años se duplica el dinero.",e:"Al 6 % anual el dinero se duplica en unos 12 años (72 ÷ 6).",m:"warren-buffett",h:"compuesto",x:"Calcula cuánto tendrías a los 65 años con tu aportación actual."},
"E3-3":{c:"Una acción es una parte de una empresa. A largo plazo su valor sigue a los beneficios de la empresa; a corto plazo, al ánimo del mercado.",e:"Quien compró acciones de una empresa que creció sus beneficios durante 20 años participó de ese crecimiento, con caídas por el camino.",m:"peter-lynch",h:"",x:"Elige una empresa que conozcas y explica en tres frases cómo gana dinero."},
"E3-4":{c:"Al comprar un bono prestas dinero a cambio de intereses. Su precio baja cuando suben los tipos de interés y su riesgo depende de quién lo emite.",e:"Un bono del Estado a 2 años es más estable que uno de una empresa con mucha deuda.",m:"",h:"",x:"Decide qué parte de tu cartera necesitas estable (renta fija o liquidez)."},
"E3-5":{c:"Un fondo indexado copia un índice (por ejemplo, las grandes empresas del mundo) sin intentar elegir ganadoras, lo que mantiene los costes bajos y la diversificación alta.",e:"Un fondo indexado mundial incluye miles de empresas de decenas de países.",m:"john-bogle",h:"comisiones",x:"Compara el coste total anual de dos fondos disponibles en tu país."},
"E3-6":{c:"Fíjate en el coste total anual (TER o gastos corrientes), en las comisiones de compra, custodia y venta y en las de tu plan de pensiones.",e:"100 000 al 6 % durante 30 años: con un 0,2 % de coste anual acabas con unos 543 000; con un 1,5 %, con unos 375 000.",m:"john-bogle",h:"comisiones",x:"Calcula con la herramienta lo que te cuestan tus comisiones a 30 años."},
"E3-7":{c:"Diversificar es repartir entre empresas, sectores, países y tipos de activos para que un solo fallo no te arruine. No elimina las caídas generales del mercado.",e:"Ronald Read tenía acciones de decenas de empresas: perdió en Lehman Brothers, pero el conjunto siguió creciendo.",m:"ronald-read",h:"",x:"Revisa si tu patrimonio depende de una sola empresa, sector o país."},
"E4-1":{c:"Una regla muy usada (y simplificada) es tener en renta fija un porcentaje parecido a tu edad o algo menor; lo importante es que puedas aguantar las caídas sin vender.",e:"Una persona de 30 años con tolerancia media podría tener un 80 % en acciones y un 20 % en renta fija.",m:"ray-dalio",h:"",x:"Escribe tu reparto objetivo de activos."},
"E4-2":{c:"Con el tiempo los activos se desvían del reparto objetivo. Rebalancear obliga a vender caro y comprar barato de forma disciplinada; una vez al año suele bastar.",e:"Un 80/20 que tras un año bueno queda en 86/14: vendes acciones o aportas a renta fija hasta volver al 80/20.",m:"",h:"",x:"Fija en tu calendario una fecha anual de rebalanceo."},
"E4-3":{c:"La vivienda en alquiler da rentas, pero conlleva impuestos, mantenimiento, periodos vacíos, poca liquidez y concentración. Calcula la rentabilidad neta, no la bruta.",e:"Un piso de 150 000 alquilado por 700 al mes da un 5,6 % bruto; tras gastos y vacíos puede quedarse en un 3–4 % neto.",m:"amancio-ortega",h:"comprar-alquilar",x:"Haz el cálculo de comprar o alquilar con tus cifras."},
"E4-4":{c:"El método de Graham y Buffett: entender el negocio, su ventaja competitiva, sus beneficios y su deuda, estimar su valor y comprar solo con margen de seguridad.",e:"See's Candies podía subir precios cada año sin perder clientes: eso es una ventaja competitiva.",m:"warren-buffett",h:"",x:"Lee una carta anual de Buffett y anota tres ideas."},
"E4-5":{c:"Exceso de confianza, aversión a la pérdida (duele más perder que alegra ganar), efecto rebaño, anclaje en un precio y sesgo de confirmación.",e:"Vender en una caída por miedo y volver a comprar cuando ya ha subido.",m:"jesse-livermore",h:"",x:"Escribe qué harás en la próxima caída del 30 % antes de que ocurra."},
"E4-6":{c:"Crac de 1929 (la bolsa tardó unos 25 años en recuperar su máximo sin contar dividendos), burbuja puntocom (2000–2002), crisis financiera (2008) y la pandemia (2020, recuperación en meses).",e:"Quien invirtió en 2007 y siguió aportando estaba en ganancias pocos años después.",m:"carlos-slim",h:"caidas",x:"Prueba el simulador de caídas empezando en 2000 y en 2007."},
"E5-1":{c:"Las habilidades valiosas son escasas, demandadas y difíciles de sustituir: técnicas, de ventas, de gestión o de idiomas. Combinar dos o tres te hace más escaso.",e:"Una persona con contabilidad e inglés puede acceder a puestos internacionales mejor pagados.",m:"charlie-munger",h:"",x:"Elige la habilidad de alto valor que aprenderás este año."},
"E5-2":{c:"Prepara datos de salarios del mercado, una lista de logros medibles y una cifra concreta. Negociar al entrar en una empresa tiene efecto compuesto durante toda la carrera.",e:"Un 5 % más de sueldo inicial, mantenido 30 años, suma mucho más que el 5 % del primer año.",m:"oprah-winfrey",h:"",x:"Haz tu lista de 5 logros medibles."},
"E5-3":{c:"Habla con clientes potenciales sobre su problema, no sobre tu idea. Haz un producto mínimo viable y comprueba si alguien paga antes de invertir mucho.",e:"Sara Blakely empezó con 5 000 dólares y unos grandes almacenes antes de fabricar en serie.",m:"sara-blakely",h:"equilibrio",x:"Habla con 10 posibles clientes y anota lo que dicen."},
"E5-4":{c:"El beneficio contable no es dinero en el banco: los clientes pueden tardar en pagar y el inventario inmoviliza caja. Prevé tu caja mes a mes.",e:"Una empresa vende mucho a 90 días pero paga a proveedores a 30: puede quedarse sin caja aunque gane dinero.",m:"marcos-galperin",h:"equilibrio",x:"Calcula el punto de equilibrio de tu idea de negocio."},
"E5-5":{c:"Reinvertir los beneficios en lo que más rinde hace crecer el negocio sin deuda ni socios, pero solo si cada nueva inversión es rentable.",e:"Amazon reinvirtió durante años; Inditex reinvirtió en nuevas tiendas y logística.",m:"jeff-bezos",h:"compuesto",x:"Decide qué porcentaje de tus ingresos extra reinvertirás."},
"E6-1":{c:"Asegura lo que no podrías pagar tú: salud, responsabilidad civil, hogar y vida si hay personas que dependen de ti. Lo pequeño, mejor cubrirlo con tu fondo de emergencia.",e:"Un seguro de vida temporal es barato y protege a una familia con hipoteca.",m:"",h:"emergencia",x:"Revisa tus seguros: qué cubren y qué falta."},
"E6-2":{c:"Cada país tiene cuentas o planes con ventajas fiscales y reglas sobre plusvalías y dividendos. Aprovéchalos, pero consulta la norma vigente y a un asesor.",e:"Ver la ficha «Consulta la norma de tu país» en la sección Cómo mantener.",m:"",h:"",x:"Infórmate de las cuentas con ventajas fiscales de tu país."},
"E6-3":{c:"Un testamento, beneficiarios designados y una lista ordenada de cuentas y contraseñas ahorran problemas a tu familia. Las grandes fortunas preparan a los herederos.",e:"Sam Walton planificó la sucesión décadas antes de morir.",m:"sam-walton",h:"",x:"Haz un inventario de tus cuentas, seguros y deudas."},
"E6-4":{c:"Señales: rendimientos garantizados altos, prisa, secretismo, entidades no registradas, pagos en criptomonedas y ganancias por traer a otros inversores.",e:"FTX parecía sólida hasta que se supo que usaba el dinero de los clientes.",m:"sam-bankman-fried",h:"",x:"Repasa la sección Alertas de fraude y guarda el enlace del supervisor de tu país."}
};

// Preguntas adicionales: [módulo, lección (1..n), enunciado, opciones (la primera es la correcta), explicación]
window.PREGUNTAS = [
["E1",1,"¿Qué ingresos se usan para hacer un presupuesto?",["Los netos, después de impuestos","Los brutos","Los del mejor mes del año"],"Solo puedes gastar o ahorrar lo que realmente recibes."],
["E1",1,"¿Qué es un gasto fijo?",["Uno que se repite con un importe estable, como el alquiler","Un gasto que no se puede reducir nunca","Cualquier gasto pagado con tarjeta"],"Los gastos fijos son previsibles; los variables cambian de un mes a otro."],
["E1",2,"En la regla 50/30/20, ¿qué parte va al ahorro y a pagar deudas?",["20 %","30 %","50 %"],"50 % necesidades, 30 % deseos y 20 % ahorro y deudas."],
["E1",2,"Si la vivienda se lleva más del 50 % de tus ingresos, ¿qué conviene?",["Ajustar los deseos u otros gastos","Dejar de ahorrar","Pedir un préstamo"],"La regla es orientativa: se adapta reduciendo otras partidas."],
["E1",3,"¿Por qué funciona el ahorro automático?",["Porque no depende de la fuerza de voluntad cada mes","Porque da más intereses","Porque es obligatorio"],"Lo que no ves en la cuenta corriente, no lo gastas."],
["E1",4,"¿Dónde debe estar el fondo de emergencia?",["En una cuenta segura y disponible","En acciones","En criptomonedas"],"Debe poder usarse en cualquier momento sin pérdidas."],
["E1",4,"¿Quién necesita un fondo de emergencia más grande?",["Quien tiene ingresos inestables o personas a cargo","Quien tiene un sueldo fijo y sin cargas","Nadie"],"Más incertidumbre exige más colchón."],
["E1",5,"¿Cuál es una meta SMART?",["Ahorrar 6 000 en 12 meses","Ahorrar más","Ser rico algún día"],"Tiene cifra y fecha."],
["E1",6,"Según Morgan Housel, ¿qué pesa más en los resultados financieros?",["El comportamiento","La inteligencia","La suerte del primer año"],"La psicología del dinero: las decisiones bajo emoción determinan el resultado."],
["E1",6,"¿Qué regla ayuda contra las compras impulsivas?",["Esperar 48 horas antes de comprar algo no previsto","Comprar enseguida antes de que suba","Usar la tarjeta de crédito"],"El tiempo enfría el impulso."],
["E2",1,"¿Qué incluye la TAE que no incluye el TIN?",["Comisiones y frecuencia de pago","El IVA","Nada"],"Por eso la TAE sirve para comparar."],
["E2",1,"Para comparar dos préstamos, ¿qué cifra usas?",["La TAE","El TIN","La cuota mensual sola"],"La cuota baja puede esconder un plazo más largo y más intereses."],
["E2",1,"Una deuda al 25 % TAE sin pagar, ¿aproximadamente en cuánto tiempo se duplica?",["Unos 3 años","Unos 10 años","Unos 25 años"],"Regla del 72: 72 ÷ 25 ≈ 2,9 años."],
["E2",2,"¿Cuál es un ejemplo de deuda razonable?",["Una formación que sube tus ingresos claramente","Un viaje pagado a plazos","Un móvil caro con tarjeta"],"Financia algo que rinde más de lo que cuesta."],
["E2",2,"¿Qué hundió a Eike Batista?",["Deuda y promesas que no se cumplieron","Demasiado ahorro","Invertir en fondos indexados"],"La deuda multiplicó las pérdidas cuando los proyectos fallaron."],
["E2",3,"¿Qué mejora tu historial crediticio?",["Pagar siempre a tiempo","Pedir muchas tarjetas","Usar todo el límite"],"Los prestamistas valoran la puntualidad."],
["E2",3,"¿Qué puede pasar si dejas una factura pequeña impagada?",["Que encarezca préstamos futuros","Nada nunca","Que te bajen los impuestos"],"Puede quedar registrada en ficheros de impagos."],
["E2",4,"¿Qué ventaja tiene la bola de nieve?",["Victorias rápidas que motivan","Paga menos intereses siempre","No requiere pagar mínimos"],"Saldar deudas pequeñas pronto refuerza el hábito."],
["E2",4,"En ambos métodos, ¿qué se paga en todas las deudas?",["El pago mínimo","Nada","El total"],"El dinero extra va a la deuda prioritaria."],
["E2",4,"¿Qué hacer con el pago de una deuda ya saldada?",["Sumarlo al pago de la siguiente","Gastarlo","Dejarlo en la cuenta corriente sin plan"],"Así el pago crece como una bola de nieve."],
["E3",1,"¿Qué relación hay entre riesgo y rendimiento esperado?",["Más rendimiento esperado suele implicar más riesgo","Ninguna","Más riesgo garantiza más rendimiento"],"El riesgo no garantiza nada; es el precio por aspirar a más."],
["E3",1,"¿Qué factor decide cuánto riesgo puedes asumir?",["Tu horizonte temporal y tu tolerancia","Lo que hace tu vecino","Las noticias del día"],"Con más tiempo puedes esperar a que se recuperen las caídas."],
["E3",2,"Según la regla del 72, al 8 % anual el dinero se duplica en…",["Unos 9 años","Unos 72 años","Unos 4 años"],"72 ÷ 8 = 9."],
["E3",2,"¿Qué factor pesa más en el interés compuesto a largo plazo?",["El tiempo","La suerte","El banco elegido"],"Empezar pronto vale más que aportar mucho tarde."],
["E3",3,"¿Qué es una acción?",["Una parte de la propiedad de una empresa","Un préstamo a una empresa","Un seguro"],"El accionista es dueño de una fracción."],
["E3",4,"¿Qué le pasa al precio de un bono si suben los tipos de interés?",["Baja","Sube","No cambia"],"Los nuevos bonos pagan más, así que los antiguos valen menos."],
["E3",5,"¿Quién creó el primer fondo indexado para el público?",["John Bogle","Warren Buffett","Jesse Livermore"],"Vanguard lo lanzó en 1976."],
["E3",6,"¿Qué es el TER o los gastos corrientes de un fondo?",["El coste total anual del fondo","Un impuesto","La rentabilidad"],"Se descuenta del valor del fondo cada año."],
["E3",7,"¿Qué elimina la diversificación?",["El riesgo de que un solo fallo te arruine","Todas las caídas","Los impuestos"],"No evita las caídas generales del mercado."],
["E3",7,"Tener cinco fondos que invierten en las mismas empresas es…",["Falsa diversificación","Máxima diversificación","Obligatorio"],"Diversificar es repartir entre cosas distintas."],
["E4",1,"¿Qué explica gran parte del resultado de una cartera a largo plazo?",["La asignación de activos","El día de compra","El nombre del banco"],"El reparto entre acciones, renta fija y liquidez."],
["E4",2,"¿Con qué frecuencia suele bastar rebalancear?",["Una vez al año","Cada día","Nunca"],"Más a menudo genera costes y decisiones emocionales."],
["E4",3,"¿Cuál es un inconveniente de invertir en inmuebles?",["Poca liquidez y gastos","No tienen riesgo","No pagan rentas"],"Además concentran mucho capital en un activo."],
["E4",3,"Piso de 150 000 alquilado por 700 al mes: ¿rentabilidad bruta aproximada?",["5,6 %","0,5 %","14 %"],"700 × 12 = 8 400; 8 400 ÷ 150 000 = 5,6 %."],
["E4",4,"¿Qué es el margen de seguridad?",["Comprar claramente por debajo del valor estimado","Comprar lo que más sube","Usar deuda con garantía"],"Deja espacio para los errores de estimación."],
["E4",4,"¿Quién escribió El inversor inteligente?",["Benjamin Graham","Peter Lynch","Ray Dalio"],"Publicado en 1949; Buffett lo considera el mejor libro sobre inversión."],
["E4",5,"Duele más perder 100 que alegra ganar 100: ¿cómo se llama el sesgo?",["Aversión a la pérdida","Anclaje","Efecto halo"],"Descrito por Kahneman y Tversky."],
["E4",5,"Comprar algo porque todo el mundo lo compra es…",["Efecto rebaño","Diversificación","Rebalanceo"],"Las burbujas se alimentan de este sesgo."],
["E4",6,"¿Cuánto cayó aproximadamente el S&P 500 con dividendos en 2008?",["Un 37 %","Un 5 %","Un 90 %"],"Fue la peor caída anual desde los años treinta."],
["E4",6,"¿Qué crisis tuvo una recuperación muy rápida, en meses?",["La de la pandemia (2020)","El crac de 1929","La burbuja puntocom"],"La bolsa recuperó su máximo en agosto de 2020."],
["E5",1,"¿Qué hace valiosa una habilidad en el mercado laboral?",["Ser escasa y demandada","Ser fácil","Estar de moda en redes"],"Escasez + demanda = mejores ingresos."],
["E5",2,"¿Qué conviene llevar a una negociación salarial?",["Datos del mercado y logros medibles","Quejas","Nada: improvisar"],"Los datos dan fuerza a tu petición."],
["E5",3,"¿Qué es un producto mínimo viable?",["La versión más sencilla que permite comprobar si alguien paga","El producto final perfecto","Un prototipo que nadie ve"],"Sirve para aprender con poco dinero."],
["E5",3,"¿Con cuánto dinero empezó Sara Blakely?",["Unos 5 000 dólares de ahorros","Un préstamo de un millón","Una herencia"],"Conservó el 100 % de Spanx durante años."],
["E5",4,"Punto de equilibrio con costes fijos de 3 000, precio de 50 y coste variable de 20:",["100 unidades","60 unidades","150 unidades"],"3 000 ÷ (50 − 20) = 100."],
["E5",5,"¿Cuándo tiene sentido reinvertir los beneficios en el negocio?",["Cuando la nueva inversión es rentable","Siempre, pase lo que pase","Nunca"],"Reinvertir en algo que pierde dinero destruye valor."],
["E6",1,"¿Qué conviene asegurar?",["Las pérdidas que no podrías pagar tú","Cualquier cosa pequeña","Nada"],"Lo pequeño, mejor con tu fondo de emergencia."],
["E6",1,"¿Cuándo es especialmente importante un seguro de vida?",["Cuando hay personas que dependen de tus ingresos","Cuando eres joven y sin cargas","Nunca"],"Protege a tu familia si faltas."],
["E6",2,"¿A quién consultar antes de una decisión fiscal importante?",["A un asesor registrado de tu país","A un influencer","A nadie"],"Las normas cambian de un país a otro y de un año a otro."],
["E6",3,"¿Por qué muchas fortunas familiares no pasan de la tercera generación?",["Herederos no preparados y falta de reglas","Por los impuestos solamente","Por mala suerte"],"Las familias que lo logran forman a sus herederos."],
["E6",3,"¿Qué ayuda a tu familia si te pasa algo?",["Testamento e inventario de cuentas y seguros","Guardar las contraseñas en secreto absoluto","Nada"],"El orden evita problemas y gastos."],
["E6",4,"¿Qué es un esquema Ponzi?",["Pagar a los inversores antiguos con el dinero de los nuevos","Un fondo indexado","Un depósito bancario"],"Se derrumba cuando dejan de entrar inversores."],
["E6",4,"Te ofrecen un 10 % mensual garantizado y te piden decidir hoy. ¿Qué haces?",["Desconfiar y comprobar el registro de la entidad ante el supervisor","Invertir rápido","Pedir un préstamo para invertir más"],"Rendimiento garantizado alto + prisa = alarma."],
["E6",4,"¿Qué le pasó a FTX en 2022?",["Quebró al saberse que usaba el dinero de los clientes","Se convirtió en un banco","Fue comprada por Vanguard"],"Su fundador fue condenado por fraude en 2023."]
];

// Cuestionario de tolerancia al riesgo (8 preguntas, 1–3 puntos).
window.RIESGO = [
["¿Cuándo necesitarás la mayor parte del dinero que inviertes?",["En menos de 3 años","Entre 3 y 10 años","En más de 10 años"]],
["Si tu inversión cae un 20 % en un mes, ¿qué harías?",["Vender todo","Esperar sin hacer nada","Seguir aportando o comprar más"]],
["¿Cuánta experiencia tienes invirtiendo?",["Ninguna","Algo (fondos, depósitos)","Bastante"]],
["¿Cómo de estables son tus ingresos?",["Inestables","Bastante estables","Muy estables"]],
["¿Tienes un fondo de emergencia completo?",["No","Parcial","Sí, de 3 a 6 meses o más"]],
["¿Qué prefieres?",["Ganar poco pero seguro","Un equilibrio","Más rendimiento aunque haya caídas grandes"]],
["¿Qué pérdida temporal soportarías sin perder el sueño?",["Hasta un 5 %","Hasta un 20 %","Más de un 30 %"]],
["¿Qué peso tienen tus deudas sobre tus ingresos?",["Alto","Moderado","Bajo o sin deudas"]]
];

// Rentabilidad total anual aproximada del índice S&P 500 con dividendos reinvertidos (%), en dólares nominales.
// Fuente: S&P Dow Jones Indices; serie recopilada por A. Damodaran (NYU Stern). Valores redondeados.
window.SP500 = {1995:37.6,1996:23.0,1997:33.4,1998:28.6,1999:21.0,2000:-9.1,2001:-11.9,2002:-22.1,2003:28.7,2004:10.9,2005:4.9,2006:15.8,2007:5.5,2008:-37.0,2009:26.5,2010:15.1,2011:2.1,2012:16.0,2013:32.4,2014:13.7,2015:1.4,2016:12.0,2017:21.8,2018:-4.4,2019:31.5,2020:18.4,2021:28.7,2022:-18.1,2023:26.3,2024:25.0};

// Insignias: [id, nombre, cómo se consigue]
window.INSIGNIAS = [
["presupuesto","Primer presupuesto","Guarda un presupuesto en «Mi plan» desde la herramienta 50/30/20."],
["colchon","Colchón lleno","Tus ahorros líquidos cubren al menos 3 meses de gastos (según el diagnóstico)."],
["sin-deuda-cara","Libre de deudas caras","No tienes deudas con un interés superior al 10 % (según el diagnóstico)."],
["aporte","Primer aporte automático","Marca la tarea «Programar aportaciones mensuales automáticas» de la etapa 3."],
["constante","Inversor constante","Registra aportaciones en 12 meses seguidos."],
["lector","Lector de Buffett","Marca 5 cartas de Buffett como leídas en la Biblioteca."],
["antifraude","Alerta antifraude","Aprueba el quiz del módulo E6."],
["diagnostico","Punto de partida","Completa el diagnóstico inicial."],
["escuela","Graduado","Aprueba los 6 quizzes de módulo de la Escuela."]
];

// Glosario: [término, definición]
window.GLOSARIO = [
["Acción","Parte de la propiedad de una empresa. Da derecho a una parte de sus beneficios y, a veces, a votar."],
["Activo","Algo que posees y que tiene valor: dinero, acciones, inmuebles, un negocio."],
["Activo productivo","Activo que genera ingresos o crece de valor por sí mismo (empresas, inmuebles en alquiler), a diferencia de un bien de consumo."],
["Amortización","Devolución gradual del capital de un préstamo; también, reparto contable del coste de un activo a lo largo de su vida útil."],
["Apalancamiento","Usar dinero prestado (o recursos ajenos) para multiplicar el resultado. Multiplica también las pérdidas."],
["Arbitraje","Aprovechar una diferencia de precio del mismo activo en dos mercados."],
["Asignación de activos","Reparto de tu patrimonio entre acciones, renta fija, inmuebles y liquidez."],
["Aversión a la pérdida","Sesgo por el que una pérdida duele más de lo que alegra una ganancia del mismo tamaño."],
["Balance","Estado financiero que muestra lo que una empresa tiene (activos), lo que debe (pasivos) y la diferencia (patrimonio neto)."],
["Bola de nieve (método)","Pagar primero la deuda de menor saldo para ganar motivación."],
["Avalancha (método)","Pagar primero la deuda con el interés más alto; es el que menos intereses paga."],
["Bono","Préstamo a un gobierno o una empresa a cambio de intereses periódicos y la devolución del capital."],
["Burbuja","Subida de precios muy por encima del valor razonable, alimentada por expectativas; suele terminar con una caída brusca."],
["Capital","Dinero o bienes destinados a producir más riqueza."],
["Capitalización bursátil","Valor en bolsa de una empresa: precio de la acción × número de acciones."],
["Cartera","Conjunto de inversiones de una persona."],
["Ciclo económico","Alternancia de fases de expansión y recesión de la economía."],
["Círculo de competencia","Área de conocimiento en la que entiendes de verdad los negocios y los riesgos (Buffett y Munger)."],
["Comisión de gestión","Porcentaje anual que cobra un fondo por gestionarlo."],
["Coste de oportunidad","Lo que dejas de ganar al elegir una opción en lugar de otra."],
["Crac","Caída brusca y generalizada de la bolsa (por ejemplo, 1929 o 1987)."],
["Deflación","Bajada generalizada y sostenida de los precios."],
["Depósito a plazo","Dinero que dejas en el banco durante un tiempo fijo a cambio de un interés."],
["Diversificación","Repartir el dinero entre inversiones distintas para reducir el riesgo de un solo fallo."],
["Dividendo","Parte del beneficio que una empresa reparte entre sus accionistas."],
["Efecto rebaño","Seguir lo que hace la mayoría sin análisis propio."],
["ETF","Fondo cotizado: un fondo (a menudo indexado) que se compra y vende en bolsa como una acción."],
["Estado de resultados","Informe de ingresos, gastos y beneficio de una empresa en un periodo (cuenta de resultados)."],
["Fideicomiso","Estructura legal en la que una persona entrega bienes a otra para que los administre en favor de terceros."],
["Float","Dinero que una aseguradora cobra en primas antes de pagar siniestros y que puede invertir mientras tanto."],
["Flujo de caja","Dinero que realmente entra y sale de una empresa o una familia en un periodo."],
["Fondo de emergencia","Ahorro líquido de 3 a 6 meses de gastos para imprevistos."],
["Fondo indexado","Fondo que replica un índice de mercado con costes bajos."],
["Fondo de inversión","Patrimonio de muchos inversores gestionado conjuntamente."],
["Ganancia de capital (plusvalía)","Diferencia positiva entre el precio de venta y el de compra."],
["Gestión activa","Intentar batir al mercado eligiendo valores; suele tener costes más altos."],
["Gestión pasiva","Seguir un índice sin intentar batirlo."],
["Hipoteca","Préstamo para comprar un inmueble, con el propio inmueble como garantía."],
["Holding","Sociedad cuya actividad principal es poseer participaciones en otras empresas."],
["Independencia financiera","Situación en la que tus inversiones cubren tus gastos y no dependes del salario."],
["Índice bursátil","Indicador que mide la evolución de un grupo de acciones (S&P 500, IBEX 35, MSCI World)."],
["Inflación","Subida generalizada de los precios que reduce el poder adquisitivo del dinero."],
["Interés compuesto","Interés que se calcula sobre el capital más los intereses anteriores."],
["Interés simple","Interés calculado solo sobre el capital inicial."],
["Inversión en valor","Comprar empresas por debajo de su valor estimado (Graham, Buffett)."],
["Liquidez","Facilidad para convertir un activo en dinero sin perder valor."],
["Margen de seguridad","Diferencia entre el valor estimado de un activo y el precio que pagas."],
["Mr. Market","Metáfora de Graham: el mercado es un socio de humor cambiante que cada día te ofrece un precio."],
["Oficina familiar","Organización que gestiona el patrimonio de una familia muy rica."],
["Pasivo","Lo que debes: préstamos, hipotecas, tarjetas."],
["Patrimonio neto (valor neto)","Activos menos pasivos."],
["Poder adquisitivo","Cantidad de bienes que puedes comprar con tu dinero."],
["Poder de precios","Capacidad de una empresa para subir precios sin perder clientes."],
["Presupuesto","Plan de ingresos y gastos para un periodo."],
["Prima de riesgo","Rendimiento adicional que se exige por asumir más riesgo."],
["Producto mínimo viable","Versión más sencilla de un producto que permite comprobar si hay demanda."],
["Punto de equilibrio","Ventas necesarias para cubrir todos los costes, sin ganar ni perder."],
["Rebalanceo","Devolver la cartera al reparto objetivo de activos."],
["Recesión","Caída de la actividad económica durante varios meses."],
["Regla del 4 %","Pauta según la cual retirar cada año un 4 % inicial de una cartera diversificada (ajustado por inflación) ha resistido históricamente unos 30 años en EE. UU. No es una garantía."],
["Regla del 72","Atajo: 72 ÷ rentabilidad anual = años aproximados para duplicar el dinero."],
["Renta fija","Inversiones con pagos previsibles, como bonos y depósitos."],
["Renta variable","Inversiones cuyo rendimiento no está fijado de antemano, como las acciones."],
["Rentabilidad bruta y neta","Bruta: antes de gastos e impuestos. Neta: después."],
["Rentabilidad real","Rentabilidad descontada la inflación."],
["Riesgo","Posibilidad de que el resultado sea peor del esperado, incluida la pérdida."],
["Sesgo de confirmación","Buscar solo la información que confirma lo que ya crees."],
["Sesgo de supervivencia","Error de estudiar solo a quienes triunfaron y olvidar a los muchos que siguieron el mismo camino y fracasaron."],
["Esquema Ponzi","Fraude que paga a los inversores antiguos con el dinero de los nuevos."],
["Esquema piramidal","Negocio cuyos ingresos dependen sobre todo de reclutar a nuevos participantes."],
["Supervisor financiero","Organismo público que autoriza y vigila a las entidades financieras (CNMV, CONDUSEF, CNV, SEC…)."],
["TAE","Tasa anual equivalente: coste o rendimiento anual que incluye comisiones y frecuencia de pago."],
["Tasa de ahorro","Porcentaje de tus ingresos netos que ahorras."],
["TER (gastos corrientes)","Coste total anual de un fondo, expresado como porcentaje del patrimonio."],
["TIN","Tipo de interés nominal: el interés pactado, sin comisiones."],
["Tolerancia al riesgo","Capacidad y disposición a soportar pérdidas temporales."],
["Trading","Compraventa frecuente de activos para ganar con movimientos de corto plazo. La mayoría de los particulares pierde dinero así."],
["Valor intrínseco","Valor estimado de una empresa según los beneficios futuros que generará."],
["Ventaja competitiva («foso»)","Lo que protege a una empresa de la competencia: marca, costes, red, patentes."],
["Volatilidad","Cuánto y con qué rapidez varía el precio de un activo."]
];

// Biblioteca: [categoría, autor, título, nota]
window.BIBLIOTECA = [
["Finanzas personales","Morgan Housel","La psicología del dinero","El comportamiento importa más que el conocimiento."],
["Finanzas personales","Thomas Stanley y William Danko","El millonario de la puerta de al lado","Cómo viven de verdad los millonarios de primera generación."],
["Finanzas personales","George S. Clason","El hombre más rico de Babilonia","Principios de ahorro en forma de parábolas."],
["Finanzas personales","Ramit Sethi","Te enseñaré a ser rico","Automatizar las finanzas y gastar en lo que importa."],
["Finanzas personales","Robert Kiyosaki","Padre rico, padre pobre","Popular; léelo con espíritu crítico: mezcla ideas útiles con afirmaciones discutidas."],
["Inversión","Benjamin Graham","El inversor inteligente","El libro de referencia de la inversión en valor."],
["Inversión","John C. Bogle","El pequeño libro para invertir con sentido común","El argumento a favor de los fondos indexados."],
["Inversión","Burton Malkiel","Un paseo aleatorio por Wall Street","Por qué es tan difícil batir al mercado."],
["Inversión","Peter Lynch","Un paso por delante de Wall Street","Invertir en lo que conoces."],
["Inversión","Ray Dalio","Principios","Reglas de vida y de trabajo a partir de los errores."],
["Inversión","Warren Buffett","Cartas anuales a los accionistas de Berkshire Hathaway","Gratuitas en berkshirehathaway.com."],
["Biografías","Alice Schroeder","La bola de nieve","Biografía autorizada de Buffett."],
["Biografías","Brad Stone","La tienda de los sueños","Historia de Amazon y Jeff Bezos."],
["Biografías","Ron Chernow","Titán","Biografía de John D. Rockefeller."],
["Biografías","Sam Walton","Made in America","Memorias del fundador de Walmart."],
["Biografías","Covadonga O'Shea","Así es Amancio Ortega","El fundador de Inditex."],
["Biografías","Walter Isaacson","Elon Musk","Biografía de 2023."],
["Emprendimiento","Eric Ries","El método Lean Startup","Validar ideas con clientes reales."],
["Emprendimiento","Peter Thiel","De cero a uno","Crear algo nuevo en lugar de copiar."],
["Advertencias","Edwin Lefèvre","Recuerdos de un operador de bolsa","La vida novelada de Jesse Livermore."],
["Advertencias","Michael Lewis","Going Infinite","La caída de Sam Bankman-Fried y FTX."],
["Documentales","HBO","Becoming Warren Buffett (2017)","Documental sobre la vida de Buffett."],
["Documentales","Netflix","Inside Bill's Brain (2019)","Serie documental sobre Bill Gates."],
["Educación pública","Banco de España y CNMV","Finanzas para todos (finanzasparatodos.es)","Portal público de educación financiera de España."],
["Educación pública","CONDUSEF (México)","condusef.gob.mx","Educación financiera y defensa del usuario."]
];
// Cartas de Buffett para la insignia «Lector de Buffett».
window.CARTAS_BUFFETT = ["1977 (la primera publicada)","1986 («temeroso cuando otros son codiciosos»)","1987 (Mr. Market)","1989 (errores de los primeros 25 años)","1996 (el inversor que no sabe)","2008 (la crisis financiera)","2013 (consejos para su esposa: fondos indexados)","2014 (50 años de Berkshire)","2021","2023 (homenaje a Charlie Munger)"];

// Alertas de fraude
window.FRAUDES = [
["Esquema Ponzi","Paga «rendimientos» a los inversores antiguos con el dinero de los nuevos. Se derrumba cuando dejan de entrar inversores. Caso célebre: Bernard Madoff (2008)."],
["Esquema piramidal","Ganas sobre todo por reclutar a otros, no por vender un producto real."],
["«Gurús» de la riqueza rápida","Venden cursos caros o señales de trading con promesas de libertad financiera en poco tiempo. Su negocio es vender el curso."],
["Trading apalancado (CFD, divisas)","Productos complejos donde la mayoría de los particulares pierde dinero; los propios proveedores europeos deben publicar ese porcentaje."],
["Chiringuitos financieros","Entidades no autorizadas que ofrecen inversiones por teléfono, redes sociales o mensajería."],
["Criptoestafas","Plataformas falsas, «pump and dump» y proyectos sin producto. Un activo especulativo no es un plan de ahorro."],
["Estafas románticas e «inversiones de amigos»","Alguien que conociste en línea te anima a invertir en una plataforma que él controla."],
["Suplantación","Llamadas o mensajes que imitan a tu banco o a un supervisor para pedirte claves o transferencias."]
];
window.SENALES = ["Rendimiento alto y garantizado","Prisa: «solo hoy», «plazas limitadas»","No puedes explicar cómo se genera el beneficio","La entidad no aparece en el registro del supervisor","Te piden pagar en criptomonedas, por transferencia a particulares o con tarjetas regalo","Ganas por traer a otros","Te presionan para no contárselo a nadie","Testimonios de lujo en redes sociales"];
window.SUPERVISORES = [
["España","CNMV (valores) y Banco de España","cnmv.es · bde.es — listas de entidades no autorizadas («chiringuitos»)"],
["México","CONDUSEF y CNBV","condusef.gob.mx — Sistema de Prestadores de Servicios Financieros"],
["Argentina","CNV y BCRA","argentina.gob.ar/cnv — alertas al público inversor"],
["Colombia","Superintendencia Financiera","superfinanciera.gov.co"],
["Chile","Comisión para el Mercado Financiero (CMF)","cmfchile.cl"],
["Perú","SMV y SBS","smv.gob.pe · sbs.gob.pe"],
["Estados Unidos","SEC y FINRA","sec.gov · finra.org (BrokerCheck)"]
];
// Ficha «Consulta la norma de tu país»: ejemplos de cuentas con ventajas fiscales (verificar la norma vigente).
window.FISCAL = [
["España","Planes de pensiones (reducción en el IRPF con límites anuales); los fondos de inversión pueden traspasarse entre sí sin tributar hasta el reembolso."],
["México","Afore con aportaciones voluntarias y Planes Personales de Retiro (PPR) con posibles deducciones."],
["Argentina","Fuerte influencia de la inflación y del tipo de cambio; consulta las normas vigentes sobre instrumentos en pesos ajustables y en dólares."],
["Colombia","Fondos voluntarios de pensiones y cuentas AFC con beneficios tributarios bajo condiciones."],
["Chile","Ahorro Previsional Voluntario (APV) con regímenes A y B."],
["Perú","Aportes voluntarios a la AFP con y sin fin previsional."],
["Estados Unidos","401(k), IRA y Roth IRA."]
];
