# Estructura del proyecto

```text
Horario/
├── index.html                  # Documento y diálogo de administración
├── css/style.css               # Presentación global y responsive
├── js/script.js                # Entry point histórico (compatibilidad)
├── data/                       # Datos públicos sin transformación
│   ├── horario.csv
│   ├── colores.csv
│   └── cambios-temporales.json
├── src/
│   ├── core/                   # Composición y configuración
│   ├── services/               # I/O y persistencia
│   ├── utils/                  # Utilidades reutilizables sin DOM
│   └── modules/
│       ├── horario/            # Parser, reglas de vista y render semanal
│       ├── cambios-temporales/ # Regla y UI de excepciones
│       └── ui/                 # Primitivas de DOM y eventos
├── assets/                     # Iconos y recursos gráficos
└── docs/                       # Documentación de arquitectura y desarrollo
```

Las copias de `dist/public/Horario/` son artefactos generados por el plugin de Vite y no una
segunda fuente de código.
