// Estructura general del curso. Los módulos se añaden desde datos/modulo-XX.js.
window.CURSO = {
  titulo: "Cómo funciona la electricidad",
  niveles: [
    { n:0, nombre:"Bienvenida", desc:"Cómo funciona el curso y la regla de seguridad antes de experimentar." },
    { n:1, nombre:"Fundamentos de los circuitos", desc:"Carga, voltaje, corriente, resistencia, ley de Ohm, Kirchhoff, serie y paralelo." },
    { n:2, nombre:"Corrientes, energía y máquinas", desc:"CD y CA, potencia y energía, magnetismo, generadores, motores, transformadores y baterías." },
    { n:3, nombre:"La electricidad en casa y en el mundo", desc:"Redes eléctricas, instalaciones domésticas, multímetro y seguridad." },
    { n:4, nombre:"Electrónica y laboratorio", desc:"Componentes electrónicos, circuitos simples, experimentos y proyecto final." }
  ],
  modulos: [],
  rutas: [
    { id:"completa", nombre:"Ruta completa", desc:"Todos los módulos en orden, de M0 a M15.", modulos:null },
    { id:"expres", nombre:"Ruta exprés", desc:"Solo las lecciones esenciales (★), unas 30 horas.", soloEsenciales:true },
    { id:"casa", nombre:"Electricidad en casa", desc:"Lo necesario para entender y usar con seguridad la electricidad del hogar.", modulos:["m1","m2","m6","m11","m12","m13"] },
    { id:"calculo", nombre:"Cálculo de circuitos", desc:"Ohm, Kirchhoff, serie, paralelo y electrónica.", modulos:["m2","m3","m4","m14"] },
    { id:"energia", nombre:"Energía y red", desc:"De la corriente alterna a la red eléctrica.", modulos:["m5","m6","m7","m8","m9","m10"] }
  ],
  // Simulaciones (las implementaciones están en js/sim-*.js)
  sims: {
    S1:{ t:"Globo y estática", d:"Frota un globo contra el cabello y observa cómo pasan los electrones y cómo atrae papelitos.", m:"m1" },
    S2:{ t:"Ley de Coulomb", d:"Cambia las cargas y la distancia y mira cómo cambia la fuerza entre ellas.", m:"m1" },
    S3:{ t:"Analogía del agua", d:"Un circuito y un sistema de tuberías lado a lado: presión, caudal y estrechamiento.", m:"m2" },
    S4:{ t:"Electrones en movimiento", d:"Circuito con pila y resistor: la velocidad de los electrones depende del voltaje y la resistencia.", m:"m2" },
    S5:{ t:"Constructor de circuitos serie y paralelo", d:"Hasta 4 focos en serie, paralelo o mixto; brillo según la potencia y focos que se funden.", m:"m4" },
    S6:{ t:"Kirchhoff de dos mallas", d:"Cambia fuentes y resistencias y comprueba en vivo la ley de corrientes y la de voltajes.", m:"m3" },
    S7:{ t:"Osciloscopio virtual", d:"Corriente directa, alterna o rectificada: amplitud, frecuencia, valor pico y valor eficaz.", m:"m5" },
    S8:{ t:"Campo magnético", d:"Campo de un imán, de un cable con corriente o de una bobina, con brújulas que puedes mover.", m:"m7" },
    S9:{ t:"Inducción de Faraday", d:"Arrastra un imán dentro de una bobina y observa el galvanómetro.", m:"m7" },
    S10:{ t:"Generador y motor", d:"La misma máquina funciona como generador o como motor; cambia la velocidad y mira la onda.", m:"m8" },
    S11:{ t:"Transformador", d:"Elige las vueltas y el voltaje de entrada; descubre por qué no funciona con CD.", m:"m8" },
    S12:{ t:"Batería", d:"Carga y descarga, porcentaje, curva de voltaje, temperatura y conexión en serie o paralelo.", m:"m9" },
    S13:{ t:"Red eléctrica", d:"De la central a la casa: tensión de transmisión, pérdidas, demanda del día y apagones.", m:"m10" },
    S14:{ t:"Tablero interactivo", d:"Conecta aparatos en cada circuito: el termomagnético salta por sobrecarga y el diferencial por fuga.", m:"m11" },
    S15:{ t:"Multímetro virtual", d:"Elige la función y los bornes y mide circuitos de práctica; detecta los errores típicos.", m:"m12" },
    S16:{ t:"Cuerpo humano y corriente", d:"Modelo educativo: voltaje, piel seca o mojada y trayectoria de la corriente.", m:"m13" },
    S17:{ t:"Capacitor RC", d:"Curvas de carga y descarga de un capacitor según R y C.", m:"m14" },
    S18:{ t:"LED y su resistencia", d:"Elige fuente, color de LED y resistencia; si la corriente es excesiva, el LED se quema.", m:"m14" },
    S19:{ t:"Transistor como interruptor", d:"Una corriente pequeña en la base controla una corriente grande en el colector.", m:"m14" },
    S20:{ t:"Puertas lógicas", d:"AND, OR, NOT, NAND, NOR y XOR con interruptores y tabla de verdad.", m:"m14" },
    S21:{ t:"Interruptor de escalera", d:"Dos conmutadores controlan el mismo foco desde dos lugares.", m:"m11" },
    CASA:{ t:"Casa virtual de consumo", d:"Enciende aparatos y mira cómo se acumulan los kWh y el costo en tiempo acelerado.", m:"m6" }
  },
  // Calculadoras (implementación en js/calculadoras.js)
  calcs: {
    C1:{ t:"Ley de Ohm", d:"Escribe dos de V, I y R y obtén la tercera, con los pasos.", m:"m3" },
    C2:{ t:"Potencia eléctrica", d:"Con dos datos entre P, V, I y R obtén los demás.", m:"m6" },
    C3:{ t:"Resistencia equivalente", d:"Serie, paralelo o mixto con una expresión como 4 + (6 || 12).", m:"m4" },
    C4:{ t:"Divisores de voltaje y de corriente", d:"Voltaje en R₂ de un divisor y reparto de corriente entre dos ramas.", m:"m4" },
    C5:{ t:"Consumo y costo eléctrico", d:"Lista de aparatos, horas y tarifa fija o por escalones: kWh y costo mensual.", m:"m6" },
    C6:{ t:"Consumo fantasma", d:"Cuánto gastan al año los aparatos en espera.", m:"m6" },
    C7:{ t:"Autonomía de batería", d:"Capacidad, voltaje y consumo: horas de uso y energía en Wh.", m:"m9" },
    C8:{ t:"Transformador", d:"Relación de vueltas, voltajes, corrientes y eficiencia.", m:"m8" },
    C9:{ t:"Código de colores de resistencias", d:"De colores a ohmios y de ohmios a colores (4 y 5 bandas).", m:"m12" },
    C10:{ t:"Resistencia para LED", d:"Resistencia necesaria, valor comercial recomendado y potencia.", m:"m14" },
    C11:{ t:"Calibre de cable y caída de tensión", d:"Orientativa: caída de voltaje y sección sugerida para una corriente y una distancia.", m:"m11" },
    C12:{ t:"Valor eficaz, pico y frecuencia", d:"Convierte entre valor eficaz (RMS), pico y pico a pico; frecuencia y periodo.", m:"m5" },
    C13:{ t:"Constante de tiempo RC", d:"τ = R·C, tiempo de carga casi completa y voltaje en un instante.", m:"m14" },
    C14:{ t:"Conversor de unidades", d:"Prefijos (µ, m, k, M), energía (J, Wh, kWh) y mAh ↔ Wh.", m:"m2" },
    C15:{ t:"Resistividad", d:"Resistencia de un cable según material, longitud y sección.", m:"m2" },
    C16:{ t:"Pérdidas de transmisión", d:"Potencia perdida en una línea según la tensión de transmisión.", m:"m10" },
    C17:{ t:"Ahorro al cambiar a LED", d:"Ahorro anual y tiempo de recuperación al cambiar focos.", m:"m6" }
  }
};
// Ayudante para que cada archivo de módulo se registre.
window.registrarModulo = function (m) { window.CURSO.modulos.push(m); window.CURSO.modulos.sort(function (a, b) { return a.n - b.n; }); };
