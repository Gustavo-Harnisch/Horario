import { formatearFecha, fechaLocalISO } from "../../utils/fechas.js";
import { isCambioTemporalActivo } from "./logic.js";

export function crearTarjetaTemporal(cambio) {
  const tarjeta = document.createElement("article");
  tarjeta.className = "card temporary-card";
  tarjeta.dataset.temporaryId = String(cambio.id);

  const etiqueta = document.createElement("p");
  etiqueta.className = "temporary-label";
  etiqueta.textContent = "🔄 Cambio temporal";
  const titulo = document.createElement("p");
  titulo.className = "card-title temporary-title";
  titulo.textContent = cambio.asignatura;
  const horario = document.createElement("p");
  horario.className = "card-time";
  horario.textContent = `${cambio.dia} · ${cambio.horaInicio} - ${cambio.horaFin}`;
  const sala = document.createElement("p");
  sala.className = "card-meta";
  sala.textContent = `Sala ${cambio.sala}`;
  const vigencia = document.createElement("p");
  vigencia.className = "temporary-validity";
  vigencia.textContent = `Vigencia: ${formatearFecha(cambio.fechaInicio)} - ${formatearFecha(cambio.fechaFin)}`;
  tarjeta.append(etiqueta, titulo, horario, sala, vigencia);

  if (cambio.motivo) {
    const motivo = document.createElement("p");
    motivo.className = "temporary-reason";
    motivo.textContent = cambio.motivo;
    tarjeta.appendChild(motivo);
  }
  return tarjeta;
}

function estadoDelCambio(cambio, fechaActual = new Date()) {
  if (!cambio.activo) return { texto: "Desactivado", clase: "is-disabled" };
  const hoy = fechaLocalISO(fechaActual);
  if (hoy < cambio.fechaInicio)
    return { texto: "Programado", clase: "is-scheduled" };
  if (hoy > cambio.fechaFin)
    return { texto: "Finalizado", clase: "is-expired" };
  return { texto: "Vigente", clase: "is-current" };
}

export function renderizarListaCambios({
  lista,
  resumen,
  cambios,
  onToggle,
  onEdit,
  onDelete,
}) {
  lista.replaceChildren();
  const vigentes = cambios.filter((cambio) =>
    isCambioTemporalActivo(cambio),
  ).length;
  resumen.textContent = `${vigentes} vigente${vigentes === 1 ? "" : "s"} de ${cambios.length} cambio${cambios.length === 1 ? "" : "s"}`;

  if (cambios.length === 0) {
    const vacio = document.createElement("p");
    vacio.className = "temporary-empty";
    vacio.textContent = "No hay cambios temporales registrados.";
    lista.appendChild(vacio);
    return;
  }

  [...cambios]
    .sort((a, b) => a.fechaInicio.localeCompare(b.fechaInicio))
    .forEach((cambio) => {
      const item = document.createElement("article");
      item.className = "temporary-list-item";
      const cabecera = document.createElement("div");
      cabecera.className = "temporary-item-header";
      const titulo = document.createElement("h3");
      titulo.textContent = cambio.asignatura;
      const estado = estadoDelCambio(cambio);
      const insignia = document.createElement("span");
      insignia.className = `status-badge ${estado.clase}`;
      insignia.textContent = estado.texto;
      cabecera.append(titulo, insignia);

      const detalle = document.createElement("p");
      detalle.className = "temporary-item-detail";
      detalle.textContent = `${cambio.dia} · ${cambio.horaInicio} - ${cambio.horaFin} · Sala ${cambio.sala}`;
      const fechas = document.createElement("p");
      fechas.className = "temporary-item-dates";
      fechas.textContent = `${formatearFecha(cambio.fechaInicio)} - ${formatearFecha(cambio.fechaFin)}`;
      const acciones = document.createElement("div");
      acciones.className = "temporary-item-actions";

      const etiquetaSwitch = document.createElement("label");
      etiquetaSwitch.className = "toggle-label";
      const switchActivo = document.createElement("input");
      switchActivo.type = "checkbox";
      switchActivo.checked = cambio.activo;
      switchActivo.setAttribute("aria-label", `Activar ${cambio.asignatura}`);
      switchActivo.addEventListener("change", () =>
        onToggle(cambio, switchActivo.checked),
      );
      etiquetaSwitch.append(switchActivo, document.createTextNode(" Activo"));

      const editar = document.createElement("button");
      editar.type = "button";
      editar.className = "small-button";
      editar.textContent = "Editar";
      editar.addEventListener("click", () => onEdit(cambio));
      const eliminar = document.createElement("button");
      eliminar.type = "button";
      eliminar.className = "small-button danger-button";
      eliminar.textContent = "Eliminar";
      eliminar.addEventListener("click", () => onDelete(cambio));

      acciones.append(etiquetaSwitch, editar, eliminar);
      item.append(cabecera, detalle, fechas, acciones);
      lista.appendChild(item);
    });
}

export function cargarFormulario(formulario, cambio = null) {
  formulario.reset();
  formulario.hidden = false;
  formulario.elements.id.value = cambio?.id ?? "";
  formulario.elements.asignatura.value = cambio?.asignatura ?? "";
  formulario.elements.dia.value = cambio?.dia ?? "Lunes";
  formulario.elements.horaInicio.value = cambio?.horaInicio ?? "08:30";
  formulario.elements.horaFin.value = cambio?.horaFin ?? "09:30";
  formulario.elements.sala.value = cambio?.sala ?? "";
  formulario.elements.fechaInicio.value =
    cambio?.fechaInicio ?? fechaLocalISO();
  formulario.elements.fechaFin.value = cambio?.fechaFin ?? fechaLocalISO();
  formulario.elements.motivo.value = cambio?.motivo ?? "";
  formulario.elements.activo.checked = cambio?.activo ?? true;
}
