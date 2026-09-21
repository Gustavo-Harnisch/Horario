import { separarRangoHorario } from "../../utils/horarios.js";

export function convertirCsvEnHorario(filas, dias) {
  const horario = [];

  filas.forEach((celdas, indiceFila) => {
    const hora = celdas[0] ?? "";
    const { horaInicio, horaFin } = separarRangoHorario(hora);

    dias.forEach((dia, indiceDia) => {
      const contenido = celdas[indiceDia + 1] ?? "";
      if (!contenido) return;
      horario.push(
        Object.freeze({
          id: `base-${indiceFila}-${indiceDia}`,
          tipo: "base",
          dia,
          hora,
          horaInicio,
          horaFin,
          contenido,
        }),
      );
    });
  });

  return Object.freeze(horario);
}

export function validarCabeceraHorario(filas) {
  const cabecera = filas[0];
  if (
    !cabecera ||
    cabecera.length < 2 ||
    cabecera[0].toLowerCase() !== "hora"
  ) {
    throw new Error("La primera columna de horario.csv debe llamarse 'Hora'");
  }
  return cabecera.slice(1);
}
