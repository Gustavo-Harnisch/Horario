import { DIAS_SEMANA } from "../../core/constants.js";
import { fechaLocalISO } from "../../utils/fechas.js";
import {
  intervalosSeSuperponen,
  minutosDesdeHora,
} from "../../utils/horarios.js";
import { normalizarDia } from "../../utils/texto.js";

export function isCambioTemporalActivo(cambio, fechaActual = new Date()) {
  if (!cambio || cambio.activo !== true) return false;
  const hoy =
    fechaActual instanceof Date
      ? fechaLocalISO(fechaActual)
      : String(fechaActual).slice(0, 10);
  return hoy >= cambio.fechaInicio && hoy <= cambio.fechaFin;
}

export function aplicarCambiosTemporales(
  horarioOriginal = [],
  cambiosTemporales = [],
  fechaActual = new Date(),
) {
  const activos = cambiosTemporales.filter((cambio) =>
    isCambioTemporalActivo(cambio, fechaActual),
  );
  const originalesVisibles = horarioOriginal.filter(
    (clase) =>
      !activos.some(
        (cambio) =>
          normalizarDia(cambio.dia) === normalizarDia(clase.dia) &&
          intervalosSeSuperponen(clase, cambio),
      ),
  );
  const temporales = activos.map((cambio) => ({
    ...cambio,
    tipo: "temporal",
    contenido: cambio.asignatura,
  }));

  return [...originalesVisibles, ...temporales].sort((a, b) => {
    const diaA = DIAS_SEMANA.findIndex(
      (dia) => normalizarDia(dia) === normalizarDia(a.dia),
    );
    const diaB = DIAS_SEMANA.findIndex(
      (dia) => normalizarDia(dia) === normalizarDia(b.dia),
    );
    return (
      diaA - diaB ||
      minutosDesdeHora(a.horaInicio) - minutosDesdeHora(b.horaInicio)
    );
  });
}

export function cambioTemporalValido(cambio) {
  return Boolean(
    cambio &&
    cambio.id !== undefined &&
    typeof cambio.asignatura === "string" &&
    typeof cambio.dia === "string" &&
    /^\d{1,2}:\d{2}$/.test(cambio.horaInicio) &&
    /^\d{1,2}:\d{2}$/.test(cambio.horaFin) &&
    /^\d{4}-\d{2}-\d{2}$/.test(cambio.fechaInicio) &&
    /^\d{4}-\d{2}-\d{2}$/.test(cambio.fechaFin),
  );
}

export function siguienteIdCambio(cambios) {
  return (
    cambios.reduce(
      (maximo, cambio) => Math.max(maximo, Number(cambio.id) || 0),
      0,
    ) + 1
  );
}

export function validarRangoCambio(cambio) {
  if (cambio.fechaFin < cambio.fechaInicio)
    return "La fecha final debe ser igual o posterior a la inicial.";
  if (minutosDesdeHora(cambio.horaFin) <= minutosDesdeHora(cambio.horaInicio)) {
    return "La hora final debe ser posterior a la inicial.";
  }
  return "";
}
