temporizadorDeRetraso();

function temporizadorDeRetraso() {
    setTimeout(loaderF, 2000);
}

function loaderF() {
    let contenedorLoader = document.querySelector('#contenedor-loader');

    console.log('hola mundo!');
    contenedorLoader.style.opacity = 0;
    contenedorLoader.style.visibility = 'hidden';
    contenedorLoader.style.display = 'none';
}


document.addEventListener("DOMContentLoaded", function(e) {


    let btn1 = document.querySelector(".icon-menu");
    btn1.addEventListener("click", cambiar);

    //funcion para el boton del menu hamburguesa
    function cambiar() {
        document.querySelector(".menuMobile").classList.toggle("active");
    }
});