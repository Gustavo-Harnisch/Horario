export function minutosDesdeHora(hora) {
  const coincidencia = String(hora)
    .trim()
    .match(/^(\d{1,2}):(\d{2})$/);
  if (!coincidencia) return Number.NaN;
  return Number(coincidencia[1]) * 60 + Number(coincidencia[2]);
}

export function separarRangoHorario(hora) {
  const [horaInicio = "", horaFin = ""] = String(hora)
    .split(/\s*-\s*/)
    .map((valor) => valor.trim());
  return { horaInicio, horaFin };
}

export function intervalosSeSuperponen(a, b) {
  const inicioA = minutosDesdeHora(a.horaInicio);
  const finA = minutosDesdeHora(a.horaFin);
  const inicioB = minutosDesdeHora(b.horaInicio);
  const finB = minutosDesdeHora(b.horaFin);

  if ([inicioA, finA, inicioB, finB].some(Number.isNaN)) return false;
  return inicioA < finB && inicioB < finA;
}
