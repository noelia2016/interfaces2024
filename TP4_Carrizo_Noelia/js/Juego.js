/***
 * Contiene lo relacionado al juego 
 * la suma de puntos y vidas y el contador del tiempo del juego
 */

/** 
 * defino el tiempo inicial del juego 
 * 4 minutos
*/
let tiempo = 240;
let puntos = 0;
let vidas = 4;
let intervalo = 0;
let cantColisiones = 0;
let sonidoFondo = document.getElementById("sonidoFondo");
let btnSonido = document.getElementById("clickBtn");

//muestro en pantalla la vida y los putnos
document.getElementById('puntos').textContent = "PUNTOS: " + puntos;
document.getElementById('vidas').textContent = "VIDAS: " + vidas;


// Función para actualizar el tiempo cada segundo
function actualizarReloj() {
    // Verifica si el tiempo ha llegado a cero
    if (tiempo <= 0) {
        clearInterval(intervalo);
        gameOver();

        return;
    }

    // Convierte el tiempo a minutos y segundos
    let minutos = Math.floor(tiempo / 60);
    let segundos = tiempo % 60;

    // Formatea los valores para mostrarlos con dos dígitos
    minutos = minutos < 10 ? '0' + minutos : minutos;
    segundos = segundos < 10 ? '0' + segundos : segundos;

    // Muestra en pantalla el contador en el elemento con el id "contador"
    document.getElementById('contador').textContent = minutos + ':' + segundos;

    // Reduce el tiempo en 1 segundo
    tiempo--;

}

/** iniciar juego luego de presionar el boton jugar */
function iniciarJuego(){
    

}


/** chequeo el fin del juego */
function gameOver(){
    // va a perder si termina el tiempo o si se quedo sin vidas

}

/** chequeo si se choca contra algun enemigo, puntos o bonus de sumar vidas */
function chequeoColision(){

}