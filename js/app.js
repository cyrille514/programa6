// 1. Captura de elementos de la interfaz (DOM)
const formulario = document.getElementById("form-contar");
const inputTexto = document.getElementById("input-texto");
const inputPalabra = document.getElementById("input-palabra");
const contenedorResultado = document.getElementById("contenedor-resultado");
const textoResultado = document.getElementById("texto-resultado");

// 2. Función flecha pura encargada de contar las palabras exactas
const calcularRepeticiones = (texto, palabra) => {
    if (!texto.trim() || !palabra.trim()) return 0;
    
    // Escapamos caracteres especiales por seguridad si el usuario busca signos como o puntos
    const palabraEscapada = palabra.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    
    // Usamos límites de palabra (\b) para buscar la palabra exacta (global e insensible a mayúsculas)
    const patron = new RegExp(`\\b${palabraEscapada}\\b`, 'gi');
    const coincidencias = texto.match(patron);
    
    return coincidencias ? coincidencias.length : 0;
};

// 3. Escuchador de eventos (Event Listener) asignado al formulario
formulario.addEventListener("submit", (evento) => {
    // Evita el comportamiento nativo de refrescar la página
    evento.preventDefault(); 

    // Capturar los valores introducidos por el usuario
    const textoCompleto = inputTexto.value;
    const palabraABuscar = inputPalabra.value;

    // Ejecutar la función flecha de procesamiento
    const totalRepeticiones = calcularRepeticiones(textoCompleto, palabraABuscar);

    // Renderizar el resultado en el documento HTML
    textoResultado.textContent = totalRepeticiones;

    // Hacer visible el contenedor de resultados aplicando clases de Tailwind de forma progresiva
    contenedorResultado.classList.remove("hidden");
    
    // Retardo asíncrono mínimo para que el navegador ejecute la transición visual de opacidad
    setTimeout(() => {
        contenedorResultado.classList.remove("opacity-0", "translate-y-2");
        contenedorResultado.classList.add("opacity-100", "translate-y-0");
    }, 10);
});

