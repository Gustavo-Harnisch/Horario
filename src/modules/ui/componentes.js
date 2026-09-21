export function obtenerElemento(id) {
  const elemento = document.getElementById(id);
  if (!elemento) throw new Error(`No se encontró el elemento #${id}`);
  return elemento;
}
