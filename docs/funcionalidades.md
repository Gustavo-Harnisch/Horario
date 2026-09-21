# Funcionalidades actuales

## Carga de datos

- Carga de `data/horario.csv` y `data/colores.csv` con `fetch` sin caché.
- Parsing del separador `;`, eliminación de BOM y validación de cabeceras.
- Asociación de código de asignatura con colores de `colores.csv`.

## Vista semanal

- Cinco columnas de lunes a viernes.
- Tarjetas coloreadas por asignatura.
- Visualización de choques (`||`) en tarjetas agrupadas.
- Navegación por pestañas en pantallas de hasta 768px.

## Cambios temporales

- Datos iniciales en `data/cambios-temporales.json`.
- Activación por `activo` y rango inclusivo de fechas.
- Reemplazo visual de sesiones base solapadas, sin eliminar el CSV.
- Tarjetas con indicador visual, sala, motivo y vigencia.
- Alta, edición, activación/desactivación y eliminación desde un diálogo.
- Persistencia local mediante `localStorage`.

## Presentación

- Estilo neobrutalista existente, colores por asignatura y adaptación móvil.
- Estados de carga y error accesibles mediante `aria-busy` y `aria-live`.
