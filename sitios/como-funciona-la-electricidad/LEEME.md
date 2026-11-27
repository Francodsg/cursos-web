# Cómo funciona la electricidad

Curso web completo en español (Plan 7). Abre `index.html` con doble clic en cualquier navegador: no necesita servidor ni internet.

## Estructura

```
index.html        página única; carga los scripts en orden
estilos.css       tema claro/oscuro con variables, diseño adaptable, impresión
icono.svg         icono del sitio
js/app.js         rutas (#/...), páginas, lecciones, tema, menú, buscador en vivo
js/progreso.js    progreso en localStorage (clave electricidad-progreso-v1), exportar/importar
js/buscador.js    índice, normalización sin acentos, sinónimos, tolerancia a errores
js/quizzes.js     motor de preguntas, generadores con valores aleatorios, quiz de módulo y examen final
js/calculadoras.js  17 calculadoras (funciones puras + interfaz) y utilidades numéricas
js/sim-*.js       21 simulaciones en SVG y la casa virtual
datos/            textos de la interfaz, curso, módulos 00–15, experimentos, glosario, personajes
pruebas/          pruebas automáticas
```

## Pruebas

Desde esta carpeta:

```bash
node pruebas/pruebas-calculos.js
```

```bash
node pruebas/pruebas-datos.js
```

```bash
node pruebas/revisar-idioma.js
```

```bash
node pruebas/pruebas-navegador.js
```

La última necesita Playwright con Chromium.
