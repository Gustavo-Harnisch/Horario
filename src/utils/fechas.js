export function fechaLocalISO(fecha = new Date()) {
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  return `${anio}-${mes}-${dia}`;
}

export function formatearFecha(fechaISO) {
  const [anio, mes, dia] = String(fechaISO).split("-");
  return anio && mes && dia ? `${dia}/${mes}/${anio}` : fechaISO;
}
