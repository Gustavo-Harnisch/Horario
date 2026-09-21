export function leerJsonLocal(clave) {
  try {
    const valor = localStorage.getItem(clave);
    return valor === null ? null : JSON.parse(valor);
  } catch (error) {
    console.warn(`No fue posible leer ${clave} desde localStorage.`, error);
    return null;
  }
}

export function guardarJsonLocal(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch (error) {
    console.warn(`No fue posible guardar ${clave} en localStorage.`, error);
  }
}
