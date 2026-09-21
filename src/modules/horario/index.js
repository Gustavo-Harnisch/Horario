import { normalizarDia } from "../../utils/texto.js";
import { aplicarCambiosTemporales } from "../cambios-temporales/logic.js";
import { crearTarjetaTemporal } from "../cambios-temporales/render.js";
import { crearNavegacionMovil } from "./mobile.js";
import { crearBloqueHorario } from "./render.js";

export function renderizarHorario({
  root,
  dias,
  horarioOriginal,
  colores,
  cambiosTemporales,
}) {
  root.querySelector(".mobile-day-navigation")?.limpiar?.();
  root.replaceChildren();
  const horarioVisible = aplicarCambiosTemporales(
    horarioOriginal,
    cambiosTemporales,
  );
  const grid = document.createElement("div");
  grid.className = "board";
  const columnas = [];

  dias.forEach((nombreDia) => {
    const columna = document.createElement("section");
    columna.className = "day-column";
    const titulo = document.createElement("h2");
    titulo.className = "day-title";
    titulo.textContent = nombreDia;
    columna.appendChild(titulo);

    horarioVisible
      .filter((clase) => normalizarDia(clase.dia) === normalizarDia(nombreDia))
      .forEach((clase) =>
        columna.appendChild(
          clase.tipo === "temporal"
            ? crearTarjetaTemporal(clase)
            : crearBloqueHorario(clase.hora, clase.contenido, colores),
        ),
      );
    grid.appendChild(columna);
    columnas.push(columna);
  });

  root.append(crearNavegacionMovil(dias, columnas), grid);
}
