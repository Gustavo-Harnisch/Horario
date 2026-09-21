export function escuchar(elemento, evento, manejador) {
  elemento.addEventListener(evento, manejador);
  return () => elemento.removeEventListener(evento, manejador);
}
