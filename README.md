# 📅 Horario Universitario

Proyecto hecho en **HTML, CSS y JavaScript** para mostrar mi horario universitario.  
El diseño es **responsive**, funciona en computador y celular.

---

## 🌐 ENLACE

👉 [-> LINK A HORARIO <-](https://gustavo-harnisch.github.io/Horario/)

---

## 📂 Archivos

- `index.html` → Página principal
- `style.css` → Estilos
- `script.js` → Entry point compatible; la implementación está en `src/`
- `horario.csv` → Datos del horario
- `data/cambios-temporales.json` → Cambios temporales iniciales

## 🔄 Cambios temporales

El botón **🔄 Cambios Temporales** permite crear, editar, activar/desactivar y eliminar
excepciones sin modificar `horario.csv`. Las modificaciones hechas desde el navegador se
guardan en `localStorage`; una excepción solo reemplaza visualmente las clases que se
superponen dentro de sus fechas de vigencia y luego deja que el horario base reaparezca
automáticamente.

La arquitectura modular y las reglas para extender el proyecto están documentadas en
[`docs/`](docs/), especialmente en [`docs/arquitectura.md`](docs/arquitectura.md) y
[`docs/crear-modulo.md`](docs/crear-modulo.md).

---

✍️ Autor: Gustavo Harnisch
