import { ABREVIATURAS_DIAS } from "../../core/constants.js";

export function crearNavegacionMovil(dias, columnas) {
  const mediaMobile = window.matchMedia("(max-width: 768px)");
  const diaActual = new Date().getDay();
  let indiceActivo = diaActual >= 1 && diaActual <= 5 ? diaActual - 1 : 0;

  const navegacion = document.createElement("nav");
  navegacion.className = "mobile-day-navigation";
  navegacion.setAttribute("aria-label", "Navegación por días del horario");
  const listaTabs = document.createElement("div");
  listaTabs.className = "day-tabs";
  listaTabs.setAttribute("role", "tablist");
  listaTabs.setAttribute("aria-label", "Días de la semana");

  const botones = dias.map((dia, indice) => {
    const boton = document.createElement("button");
    const idTab = `tab-dia-${indice}`;
    const idPanel = `panel-dia-${indice}`;
    boton.type = "button";
    boton.id = idTab;
    boton.className = "day-tab";
    boton.textContent = ABREVIATURAS_DIAS[indice] ?? dia.slice(0, 3);
    boton.setAttribute("role", "tab");
    boton.setAttribute("aria-label", dia);
    boton.setAttribute("aria-controls", idPanel);
    columnas[indice].id = idPanel;
    columnas[indice].setAttribute("aria-labelledby", idTab);
    boton.addEventListener("click", () => seleccionarDia(indice));
    listaTabs.appendChild(boton);
    return boton;
  });

  function actualizarVista() {
    const esMobile = mediaMobile.matches;
    navegacion.hidden = !esMobile;
    columnas.forEach((columna, indice) => {
      const activa = indice === indiceActivo;
      columna.classList.toggle("is-active", activa);
      if (esMobile) {
        columna.setAttribute("role", "tabpanel");
        columna.setAttribute("aria-hidden", String(!activa));
      } else {
        columna.removeAttribute("role");
        columna.removeAttribute("aria-hidden");
      }
    });
    botones.forEach((boton, indice) => {
      const activo = indice === indiceActivo;
      boton.setAttribute("aria-selected", String(activo));
      boton.tabIndex = activo ? 0 : -1;
    });
  }

  function seleccionarDia(indice, moverFoco = false) {
    indiceActivo = (indice + columnas.length) % columnas.length;
    actualizarVista();
    if (moverFoco) botones[indiceActivo].focus();
  }

  listaTabs.addEventListener("keydown", (evento) => {
    const movimientos = {
      ArrowLeft: -1,
      ArrowRight: 1,
      Home: "inicio",
      End: "fin",
    };
    if (!(evento.key in movimientos)) return;
    evento.preventDefault();
    const movimiento = movimientos[evento.key];
    seleccionarDia(
      movimiento === "inicio"
        ? 0
        : movimiento === "fin"
          ? columnas.length - 1
          : indiceActivo + movimiento,
      true,
    );
  });

  navegacion.appendChild(listaTabs);
  mediaMobile.addEventListener("change", actualizarVista);
  navegacion.limpiar = () =>
    mediaMobile.removeEventListener("change", actualizarVista);
  actualizarVista();
  return navegacion;
}
