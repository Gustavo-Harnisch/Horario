# Reglas de desarrollo

- No mezclar lógica de dominio con creación de elementos HTML.
- Cada funcionalidad nueva debe vivir en su propio módulo.
- Mantener una responsabilidad única por archivo y evitar archivos gigantes.
- Preferir funciones puras para parsing, cálculos y validaciones.
- Pasar dependencias y callbacks explícitamente; evitar estado global compartido.
- No modificar datos base para representar una excepción.
- Mantener las rutas públicas de `data/` compatibles con GitHub Pages.
- Usar `textContent` para texto procedente de datos y conservar la accesibilidad.
- Validar en navegador y con `node --check` antes de publicar.
- Actualizar la documentación cuando cambie la arquitectura o aparezca una funcionalidad.
