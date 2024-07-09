
var btn = document.getElementById('ingresar');

btn.addEventListener('click', function(evt){

    evt.preventDefault();
    var clave = document.getElementById('clave');
    var usuario = document.getElementById('usuario');

    console.log(usuario.value);
    console.log(clave.value);
    if (usuario.value != 'pepe' || clave.value != '1234') {

        // si no valido muestro este error 
        const nombreError = document.getElementById("nombreError");
        nombreError.classList.add("visible");
        usuario.classList.add("invalido");
        clave.classList.add("invalido");
        usuario.value ='';
        clave.value ='';
        nombreError.setAttribute("aria-hidden", false);
        nombreError.setAttribute("aria-invalid", true);
    }else if (usuario.value == 'pepe' && clave.value == '1234'){
        // si valido redirecciono
        console.log('valido el form redirecciona');
        window.location.href = 'conoce-las-mascotas.html';
    }

});