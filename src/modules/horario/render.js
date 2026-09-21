import { obtenerCodigo } from "../../utils/texto.js";

export function crearSlot(hora, contenido, colores, mostrarHora = true) {
  const slot = document.createElement("article");
  slot.className = "card";

  const codigo = obtenerCodigo(contenido);
  const tema = colores.get(codigo);
  if (tema) {
    slot.dataset.code = codigo;
    slot.style.setProperty("--c-bg", tema.colorFondo);
    slot.style.setProperty("--c-text", tema.colorTexto);
  }

  const titulo = document.createElement("p");
  titulo.className = "card-title";
  const nombreCompleto = tema ? `${codigo} ${tema.ramo}` : contenido;
  titulo.textContent = nombreCompleto;

  const detalle =
    tema && contenido.startsWith(nombreCompleto)
      ? contenido.slice(nombreCompleto.length).trim()
      : "";
  const detalleEl = document.createElement("p");
  detalleEl.className = "card-meta";
  detalleEl.textContent = detalle;

  const horaEl = document.createElement("p");
  horaEl.className = "card-time";
  horaEl.textContent = hora;

  slot.appendChild(titulo);
  if (detalle) slot.appendChild(detalleEl);
  if (mostrarHora) slot.appendChild(horaEl);
  return slot;
}

export function crearBloqueHorario(hora, contenido, colores) {
  const ramos = contenido
    .split(/\s*\|\|\s*/)
    .map((ramo) => ramo.trim())
    .filter(Boolean);

  if (ramos.length <= 1) return crearSlot(hora, ramos[0] ?? contenido, colores);

  const bloque = document.createElement("div");
  bloque.className = "conflict-slot";
  bloque.setAttribute(
    "aria-label",
    `Choque de horario: ${ramos.length} ramos entre ${hora}`,
  );

  const cabecera = document.createElement("div");
  cabecera.className = "conflict-header";
  const horaEl = document.createElement("p");
  horaEl.className = "conflict-time";
  horaEl.textContent = hora;
  const aviso = document.createElement("p");
  aviso.className = "conflict-label";
  aviso.textContent = "Choque de horario";
  const tarjetas = document.createElement("div");
  tarjetas.className = "conflict-cards";
  ramos.forEach((ramo) =>
    tarjetas.appendChild(crearSlot(hora, ramo, colores, false)),
  );

  cabecera.append(horaEl, aviso);
  bloque.append(cabecera, tarjetas);
  return bloque;
}
