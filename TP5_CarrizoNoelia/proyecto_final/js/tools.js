
var btn = document.getElementById('ingresar');
var clave = document.getElementById('clave');
var usuario = document.getElementById('usuario');

btn.addEventListener('click', function(evt){

    if (usuario.value != 'pepe' && clave.value != '1234') {
        const nombreError = document.getElementById("nombreError");
        nombreError.classList.add("visible");
        campoNombre.classList.add("invalido");
        nombreError.setAttribute("aria-hidden", false);
        nombreError.setAttribute("aria-invalid", true);
    }else{
        // si valido redirecciono
        window.location.href = 'conoce-las-mascotas.html';
    }

});