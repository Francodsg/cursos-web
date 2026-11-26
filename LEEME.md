# Cursos web: sitios y planes

Abre cada sitio con su `index.html` en el navegador (no necesita servidor ni internet).

## Sitios
| Carpeta | Sitio | Estado |
|---|---|---|
| sitios/filosofia | 1. Filosofía (español e inglés, botón ES/EN) | Terminado: 24 módulos, 215 lecciones, quizzes, filósofos, obras, glosario, progreso. Falta el texto largo de cada lección. |
| sitios/ciencias | 2. Ciencias (español) | Terminado: 29 módulos, 241 lecciones, ~200 experimentos, herramientas. Falta el texto largo de cada lección. |
| sitios/administracion | 3. Administración de Empresas (español) | Terminado: 26 módulos, 202 lecciones, casos, 5 calculadoras. Falta el texto largo de cada lección. |
| sitios/personas-poderosas | 4. Personas Poderosas (español) | Terminado: 12 perfiles completos, 47 fichas breves, buscador con recuadro de respuesta. Faltan los perfiles completos de las fichas breves. |
| sitios/finanzas | 5. Finanzas y Millonarios (español) | Terminado: 29 perfiles completos (8 modelo + 21 nuevos), 16 estrategias con evidencia, pasos y errores, «Cómo mantener» (8 páginas), escuela de 32 lecciones con mini-quizzes y 6 quizzes de módulo, 11 calculadoras, «Mi plan» (diagnóstico, etapas, metas, valor neto, insignias, revisión anual), comparador, glosario (80 términos), biblioteca y alertas de fraude. Pruebas de las fórmulas: `node sitios/finanzas/pruebas.js`. |
| — | 6. Investigación sobre la Manipulación (español) | Sin empezar. |
| sitios/_motor | Motor común de los sitios 2 y 3 | `parse-plan.js` genera `data.js` a partir de los planes 2 y 3. |

## Planes
- `planes/plan-1-4-5-6.md`: Plan 1 (Filosofía), Plan 4 (Personas Poderosas), Plan 5 (Finanzas y Millonarios) y Plan 6 (Investigación sobre la Manipulación).
- `planes/plan-2-ciencias.md`: Plan 2.
- `planes/plan-3-administracion.md`: Plan 3.
