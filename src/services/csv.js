export function parsearCsv(texto) {
  return texto
    .replace(/^\uFEFF/, "")
    .split(/\r?\n/)
    .map((linea) => linea.trim())
    .filter(Boolean)
    .map((linea) => linea.split(";").map((celda) => celda.trim()));
}

export function crearMapaDeColores(filas) {
  const colores = new Map();
  const cabecera = filas[0]?.map((campo) => campo.toLowerCase());

  if (
    !cabecera ||
    cabecera[0] !== "codigo" ||
    cabecera[2] !== "colorfondo" ||
    cabecera[3] !== "colortexto"
  ) {
    throw new Error("Cabecera inválida en colores.csv");
  }

  filas.slice(1).forEach(([codigo, ramo, colorFondo, colorTexto]) => {
    if (
      !codigo ||
      !CSS.supports("color", colorFondo) ||
      !CSS.supports("color", colorTexto)
    ) {
      console.warn(`Color ignorado para ${codigo || "un código vacío"}.`);
      return;
    }
    colores.set(codigo.toUpperCase(), { ramo, colorFondo, colorTexto });
  });

  return colores;
}

export async function obtenerTexto(url) {
  const respuesta = await fetch(url, { cache: "no-store" });
  if (!respuesta.ok) throw new Error(`No se pudo cargar ${url}`);
  return respuesta.text();
}
