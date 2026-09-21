export function normalizarDia(dia) {
  return String(dia)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

export function obtenerCodigo(contenido) {
  return (
    String(contenido)
      .match(/\b([A-Z]{2,}(?:-?\d+))\b/i)?.[1]
      .toUpperCase() ?? ""
  );
}
