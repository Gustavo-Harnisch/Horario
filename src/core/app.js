import { configuracionApp } from "./config.js";
import { obtenerElemento } from "../modules/ui/componentes.js";
import {
  parsearCsv,
  crearMapaDeColores,
  obtenerTexto,
} from "../services/csv.js";
import { crearGestorCambiosTemporales } from "../modules/cambios-temporales/index.js";
import { cargarCambiosTemporales } from "../services/cambios-temporales.js";
import {
  validarCabeceraHorario,
  convertirCsvEnHorario,
} from "../modules/horario/parser.js";
import { renderizarHorario } from "../modules/horario/index.js";

const estado = {
  dias: [],
  horarioOriginal: [],
  colores: new Map(),
  cambiosTemporales: [],
};

function renderizar() {
  renderizarHorario({ root: obtenerElemento("horario"), ...estado });
}

async function iniciarApp() {
  const root = obtenerElemento("horario");
  root.replaceChildren();
  root.setAttribute("aria-busy", "true");

  try {
    const [horarioTexto, coloresTexto, cambios] = await Promise.all([
      obtenerTexto(configuracionApp.datos.horario),
      obtenerTexto(configuracionApp.datos.colores),
      cargarCambiosTemporales(configuracionApp.datos.cambiosTemporales),
    ]);
    const filasHorario = parsearCsv(horarioTexto);
    const filasColores = parsearCsv(coloresTexto);
    if (filasHorario.length === 0) {
      root.textContent = "El CSV del horario está vacío.";
      return;
    }

    estado.dias = validarCabeceraHorario(filasHorario);
    estado.horarioOriginal = convertirCsvEnHorario(
      filasHorario.slice(1),
      estado.dias,
    );
    estado.colores = crearMapaDeColores(filasColores);
    estado.cambiosTemporales = cambios;

    renderizar();
    crearGestorCambiosTemporales({
      cambiosIniciales: estado.cambiosTemporales,
      alCambiar(nuevosCambios) {
        estado.cambiosTemporales = nuevosCambios;
        renderizar();
      },
    }).renderizar();
  } catch (error) {
    console.error(error);
    const mensaje = document.createElement("p");
    mensaje.className = "horario-error";
    mensaje.textContent =
      "No se pudo cargar el horario. Verifica los archivos de datos, sus cabeceras y formatos.";
    root.appendChild(mensaje);
  } finally {
    root.removeAttribute("aria-busy");
  }
}

document.addEventListener("DOMContentLoaded", iniciarApp);

// API de compatibilidad para integraciones existentes y pruebas manuales.
export { iniciarApp };
