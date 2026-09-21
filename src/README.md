# Source de Horario

Esta carpeta contiene el código modular de la aplicación.

- `core/`: inicia la aplicación y centraliza la configuración.
- `modules/`: funcionalidades independientes.
- `services/`: acceso a datos y almacenamiento.
- `utils/`: funciones pequeñas reutilizables.
- `data/`: explica la ubicación pública de los datos; los archivos reales siguen en `Horario/data/`.

Regla simple: agrega la lógica a la carpeta que corresponda y evita poner todo en `core/app.js`.
