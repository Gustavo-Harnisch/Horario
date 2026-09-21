import { CLAVE_CAMBIOS_TEMPORALES } from "../core/constants.js";
import { leerJsonLocal, guardarJsonLocal } from "./storage.js";
import { cambioTemporalValido } from "../modules/cambios-temporales/logic.js";

export async function cargarCambiosTemporales(url) {
  let iniciales = [];

  try {
    const respuesta = await fetch(url, { cache: "no-store" });
    if (!respuesta.ok) throw new Error(`No se pudo cargar ${url}`);
    const datos = await respuesta.json();
    iniciales = Array.isArray(datos) ? datos.filter(cambioTemporalValido) : [];
  } catch (error) {
    // El horario base sigue funcionando aunque el archivo opcional no esté disponible.
    console.warn(
      "No fue posible cargar los cambios temporales iniciales.",
      error,
    );
  }

  const guardados = leerJsonLocal(CLAVE_CAMBIOS_TEMPORALES);
  return Array.isArray(guardados)
    ? guardados.filter(cambioTemporalValido)
    : iniciales;
}

export function guardarCambiosTemporales(cambios) {
  guardarJsonLocal(CLAVE_CAMBIOS_TEMPORALES, cambios);
}
