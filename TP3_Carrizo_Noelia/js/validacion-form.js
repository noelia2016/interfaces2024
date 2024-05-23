// Variables
const formulario = document.querySelector('#formulario');
const nombre = document.querySelector('#nombre');
const cant = document.querySelector('#cant');
const telefono = document.querySelector('#telefono');
const email = document.querySelector('#email');
const errores = document.querySelector('#errores');
let mensajesErrores = [];

// Funciones
function validar (evento) {
    // Evitar que se envie el formulario
    evento.preventDefault();

    // Vacia los mensajesErrores antes de rellenarlo nuevamente
    mensajesErrores = [];

    // VALIDACIONES

    // Nombre carácteres válidos

    if (!/^[a-zA-Z0-9]*$/.exec(nombre.value.trim())) {
        mensajesErrores = mensajesErrores.concat('Nombre no tiene carácteres válidos');
    }

    // Telefono debe ser números

    if (isNaN(telefono.value.trim())) {
        mensajesErrores = mensajesErrores.concat('Telefono debe ser número');
    }


    // ENVIAR O MOSTRAR MENSAJES
    if (mensajesErrores.length === 0) {
        // Enviamos el formulario si no hay errores
        formulario.reset();
        alert ("El formulario valido correctamente");
    } else {
        // Muestro los errores
        errores.textContent = '';
        mensajesErrores.forEach(function (mensaje) {
            const miLi = document.createElement('li');
            miLi.textContent = mensaje;
            errores.appendChild(miLi);
        });
    }
}

// Eventos
formulario.addEventListener('submit', validar);