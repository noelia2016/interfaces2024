temporizadorDeRetraso();

/** despues de unos segundos el contenedor se tiene que esconder */
function temporizadorDeRetraso() {
    setTimeout(loaderF, 2000);
}

function loaderF() {

    let contenedorLoader = document.querySelector('#contenedor-loader');
    contenedorLoader.style.opacity = 0;
    contenedorLoader.style.visibility = 'hidden';
    contenedorLoader.style.display = 'none';
}

// tomo el evento
document.addEventListener("DOMContentLoaded", function(e) {


    let btn1 = document.querySelector(".icon-menu");
    btn1.addEventListener("click", cambiar);

    //funcion para el boton del menu hamburguesa
    function cambiar() {
        document.querySelector(".menuMobile").classList.toggle("active");
    }
});