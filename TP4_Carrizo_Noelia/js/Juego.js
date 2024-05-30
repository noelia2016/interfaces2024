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

//muestro en pantalla la vida y los putnos
document.getElementById('puntos').textContent = "PUNTOS: " + puntos;
document.getElementById('vidas').textContent = "VIDAS: " + vida;

/** iniciar juego luego de presionar el boton jugar */
function inicarJuego(){
    

}


/** chequeo el fin del juego */
function gameOver(){
    // va a perder si termina el tiempo o si se quedo sin vidas

}

/** chequeo si se choca contra algun enemigo, puntos o bonus de sumar vidas */
function chequeoColision(){

}