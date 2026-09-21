# Modules

Cada subcarpeta representa una funcionalidad de la aplicación.

Un módulo debe tener una responsabilidad clara y comunicarse con los demás mediante funciones,
parámetros o callbacks. No importes directamente el estado interno de otro módulo.

Estructura recomendada: `index.js` para coordinar, `logic.js` para reglas, `render.js` para DOM y
`README.md` para explicar el módulo.
