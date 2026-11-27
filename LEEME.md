# Cursos web: sitios y planes

Abre cada sitio con su `index.html` en el navegador (no necesita servidor ni internet).

## Sitios
| Carpeta | Sitio | Estado |
|---|---|---|
| sitios/filosofia | 1. Filosofía (español e inglés, botón ES/EN) | Terminado: 24 módulos, 215 lecciones, quizzes, filósofos, obras, glosario, progreso. Falta el texto largo de cada lección. |
| sitios/ciencias | 2. Ciencias (español) | Terminado: 29 módulos, 241 lecciones, ~200 experimentos, herramientas. Falta el texto largo de cada lección. |
| sitios/administracion | 3. Administración de Empresas (español) | Terminado: 26 módulos, 202 lecciones, casos, 11 calculadoras con interpretación, simulación de empresa de 6 trimestres, rutas por perfil y plan de negocio con rúbrica. Falta el texto largo de cada lección, el glosario, la línea de tiempo y las fichas de autores. |
| sitios/personas-poderosas | 4. Personas Poderosas (español) | Terminado: 12 perfiles completos, 47 fichas breves, buscador con recuadro de respuesta. Faltan los perfiles completos de las fichas breves. |
| sitios/finanzas | 5. Finanzas y Millonarios (español) | Terminado: 29 perfiles completos (8 modelo + 21 nuevos), 16 estrategias con evidencia, pasos y errores, «Cómo mantener» (8 páginas), escuela de 32 lecciones con mini-quizzes y 6 quizzes de módulo, 11 calculadoras, «Mi plan» (diagnóstico, etapas, metas, valor neto, insignias, revisión anual), comparador, glosario (80 términos), biblioteca y alertas de fraude. Pruebas de las fórmulas: `node sitios/finanzas/pruebas.js`. |
| sitios/manipulacion | 6. Investigación sobre la Manipulación (español) | Terminado: 60 experimentos con estado de réplica, 60 técnicas con señales y defensas, 14 fichas de FBI y gobiernos, B1 y B4–B8, 9 demostraciones, curso de 52 lecciones con quizzes y certificado, insignias, investigadores, glosario, biblioteca, línea de tiempo y «Pedir ayuda» por país. Pendiente: revisión por un psicólogo y verificación periódica de los teléfonos de ayuda. |
| sitios/como-funciona-un-negocio | 7. Cómo funciona un negocio: desde un negocio chico hasta empresas gigantes (español) | Terminado: 4 niveles, 29 módulos y 223 lecciones con texto completo (situación, explicación, «Del changarro al gigante», ejemplo resuelto, empresa real con fuente, errores, actividad y mini-quiz), ≈ 249 horas, 28 quizzes de módulo (bancos de 20 preguntas), 4 exámenes de nivel y evaluación final, 32 casos, 13 calculadoras, lienzo de modelo de negocio, constructor de organigramas, glosario de 420 términos, buscador, progreso guardado en el navegador (exportar e importar), modo claro y oscuro, proyecto final con rúbrica, certificado y 15 insignias. Pruebas: `node sitios/como-funciona-un-negocio/pruebas.js`. |
| sitios/hablar-sin-miedo | 8. Hablar sin miedo: en negocios y en otras áreas de la vida (español) | Terminado: 7 módulos en 5 niveles, 63 lecciones con texto completo (situación, objetivos, explicación, idea clave con nivel de evidencia, ejemplo real, paso a paso, errores, ejercicio, reto, caso y mini-quiz), 11 historias reales con fuentes, reto de 30 días con gráfica de miedo, 10 prácticas guiadas con temporizador y voz, 18 herramientas, 8 simuladores, 343 preguntas, quizzes de módulo, examen final y certificado, insignias, glosario (97 términos), buscador con respuesta rápida, rutas, modo claro y oscuro. Pruebas de los datos: `node sitios/hablar-sin-miedo/pruebas.js`. Pendiente: revisión por un psicólogo. |
| sitios/robotica-electronica | 9. Robótica, Electrónica, Hardware y Software (español) | Terminado: 7 niveles, 26 módulos y 192 lecciones con texto completo (explicación, idea clave, código comentado, práctica con versión simulada, avisos de seguridad, errores frecuentes y mini-quiz de 5 preguntas), 960 preguntas, quiz y proyecto con rúbrica por módulo, 5 robots paso a paso, examen final y certificados, buscador, progreso e insignias, 11 calculadoras, 41 fichas de componentes, glosario (153 términos), 30 fallas resueltas, kits de materiales, rutas y 18 diagramas. Pruebas: `node sitios/robotica-electronica/pruebas.js`. Pendiente: revisión técnica por un docente de electrónica. |
| sitios/_motor | Motor común de los sitios 2 y 3 | `parse-plan.js` genera `data.js` a partir de los planes 2 y 3. `app.js` acepta páginas extra de cada sitio mediante `window.EXTRA` (lo usa Administración). |

## Planes
- `planes/plan-1-4-5-6.md`: Plan 1 (Filosofía), Plan 4 (Personas Poderosas), Plan 5 (Finanzas y Millonarios) y Plan 6 (Investigación sobre la Manipulación).
- `planes/plan-2-ciencias.md`: Plan 2.
- `planes/plan-3-administracion.md`: Plan 3.
- `planes/plan-7-como-funciona-un-negocio.md`: Plan 7 (Cómo funciona un negocio).
- `planes/plan-7-hablar-sin-miedo.md`: Plan 7 (Hablar sin miedo).
- `planes/plan-7-robotica-electronica.md`: Plan del sitio 9 (Robótica, Electrónica, Hardware y Software).
