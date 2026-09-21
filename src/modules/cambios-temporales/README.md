# Módulo de cambios temporales

Gestiona las excepciones que reemplazan visualmente clases del horario base durante un rango de fechas.

- `logic.js`: vigencia, solapamiento y validación sin acceso a red ni DOM.
- `render.js`: tarjetas del horario y lista de administración.
- `index.js`: controlador CRUD y eventos del diálogo.

La carga y el guardado están en `src/services/cambios-temporales.js`.

El módulo recibe callbacks (`alCambiar`) y no conoce la implementación del módulo de horario.
