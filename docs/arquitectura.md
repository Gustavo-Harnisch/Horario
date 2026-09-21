# Arquitectura

La aplicación es una página estática servida desde `Horario/`. `index.html` conserva el marcado
principal y carga `js/script.js` como módulo ES. Ese archivo es un entrypoint compatible que importa
`src/core/app.js`.

## Flujo de información

1. `core/app.js` carga los CSV y el JSON mediante `services/csv.js` y el módulo de cambios.
2. `modules/horario/parser.js` convierte las filas del CSV en sesiones base inmutables.
3. `modules/cambios-temporales/logic.js` calcula la vista efectiva sin mutar esas sesiones.
4. `modules/horario/index.js` renderiza columnas y delega las tarjetas especiales al módulo temporal.
5. `modules/cambios-temporales/index.js` administra el diálogo CRUD y notifica cambios mediante `alCambiar`.

La comunicación entre módulos se realiza mediante funciones exportadas y callbacks. Los módulos no
acceden al estado interno de otro módulo; `core/app.js` compone el estado de la aplicación.

## Principios

- El CSV es la fuente original y nunca se modifica en el navegador.
- La configuración de rutas vive en `core/config.js`.
- Reglas de dominio y presentación están separadas.
- `data/` conserva las rutas públicas existentes para GitHub Pages.
