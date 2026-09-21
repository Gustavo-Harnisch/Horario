import { obtenerElemento } from "../ui/componentes.js";
import { escuchar } from "../ui/eventos.js";
import { cargarFormulario, renderizarListaCambios } from "./render.js";
import { siguienteIdCambio, validarRangoCambio } from "./logic.js";
import { guardarCambiosTemporales } from "../../services/cambios-temporales.js";

export function crearGestorCambiosTemporales({ cambiosIniciales, alCambiar }) {
  let cambios = [...cambiosIniciales];
  const dialogo = obtenerElemento("temporary-dialog");
  const formulario = obtenerElemento("temporary-form");
  const lista = obtenerElemento("temporary-list");
  const resumen = obtenerElemento("temporary-summary");
  const tituloFormulario = obtenerElemento("temporary-form-title");

  const refrescarLista = () =>
    renderizarListaCambios({
      lista,
      resumen,
      cambios,
      onToggle(cambio, activo) {
        cambio.activo = activo;
        guardarCambiosTemporales(cambios);
        alCambiar(cambios);
        refrescarLista();
      },
      onEdit(cambio) {
        tituloFormulario.textContent = "Editar cambio temporal";
        cargarFormulario(formulario, cambio);
        formulario.scrollIntoView({ behavior: "smooth", block: "start" });
        formulario.elements.asignatura.focus({ preventScroll: true });
      },
      onDelete(cambio) {
        if (
          !window.confirm(
            `¿Eliminar el cambio temporal de ${cambio.asignatura}?`,
          )
        )
          return;
        cambios = cambios.filter(
          (item) => String(item.id) !== String(cambio.id),
        );
        guardarCambiosTemporales(cambios);
        alCambiar(cambios);
        refrescarLista();
      },
    });

  function abrirFormulario(cambio = null) {
    tituloFormulario.textContent = cambio
      ? "Editar cambio temporal"
      : "Nuevo cambio temporal";
    cargarFormulario(formulario, cambio);
    formulario.scrollIntoView({ behavior: "smooth", block: "start" });
    formulario.elements.asignatura.focus({ preventScroll: true });
  }

  escuchar(obtenerElemento("open-temporary-dialog"), "click", () => {
    refrescarLista();
    if (!dialogo.open) dialogo.showModal();
  });
  escuchar(obtenerElemento("close-temporary-dialog"), "click", () =>
    dialogo.close(),
  );
  escuchar(obtenerElemento("add-temporary-change"), "click", () =>
    abrirFormulario(),
  );
  escuchar(obtenerElemento("cancel-temporary-form"), "click", () => {
    formulario.hidden = true;
  });
  escuchar(dialogo, "close", () => {
    formulario.hidden = true;
  });
  escuchar(dialogo, "click", (evento) => {
    if (evento.target === dialogo) dialogo.close();
  });
  escuchar(formulario.elements.fechaFin, "input", () =>
    formulario.elements.fechaFin.setCustomValidity(""),
  );
  escuchar(formulario.elements.horaFin, "input", () =>
    formulario.elements.horaFin.setCustomValidity(""),
  );
  escuchar(formulario, "submit", (evento) => {
    evento.preventDefault();
    const datos = new FormData(formulario);
    const cambio = {
      id: datos.get("id")
        ? Number(datos.get("id"))
        : siguienteIdCambio(cambios),
      activo: formulario.elements.activo.checked,
      asignatura: String(datos.get("asignatura")).trim(),
      dia: String(datos.get("dia")),
      horaInicio: String(datos.get("horaInicio")),
      horaFin: String(datos.get("horaFin")),
      sala: String(datos.get("sala")).trim(),
      fechaInicio: String(datos.get("fechaInicio")),
      fechaFin: String(datos.get("fechaFin")),
      motivo: String(datos.get("motivo")).trim(),
    };
    const error = validarRangoCambio(cambio);
    if (error) {
      const campo = error.startsWith("La fecha")
        ? formulario.elements.fechaFin
        : formulario.elements.horaFin;
      campo.setCustomValidity(error);
      campo.reportValidity();
      return;
    }
    const indice = cambios.findIndex(
      (item) => String(item.id) === String(cambio.id),
    );
    if (indice >= 0) cambios[indice] = cambio;
    else cambios.push(cambio);
    guardarCambiosTemporales(cambios);
    formulario.hidden = true;
    alCambiar(cambios);
    refrescarLista();
  });

  return {
    getCambios: () => cambios,
    renderizar: refrescarLista,
  };
}
