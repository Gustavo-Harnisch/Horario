# Crear un módulo

1. Crea `src/modules/nombre-funcion/`.
2. Añade `index.js` como fachada pública, `logic.js` para reglas puras, `render.js` para DOM y un
   `README.md` con la responsabilidad del módulo.
3. Mantén datos y llamadas de red en `services/`; usa `utils/` para helpers sin estado.
4. Expón una función de inicialización que reciba dependencias y callbacks, en lugar de importar el
   estado de otro módulo.
5. Conecta el módulo únicamente desde `core/app.js` y actualiza `docs/funcionalidades.md`.
6. Añade estilos con un prefijo propio y conserva la adaptación móvil existente.

Ejemplo mínimo:

```js
// modules/ejemplo/index.js
import { renderizarEjemplo } from "./render.js";
import { calcularEjemplo } from "./logic.js";

export function crearEjemplo({ root, datos, alCambiar }) {
  renderizarEjemplo(root, calcularEjemplo(datos));
  return { actualizar: (nuevosDatos) => alCambiar(nuevosDatos) };
}
```
