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
function startGame(){
    
    let corredor = new Runner();

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.code === 'ArrowUp') {
            corredor.saltar();
        }
    });

    document.getElementById("menu").style.display = "none";
    document.getElementById("contenedor").style.display = "block";

    /* cada 3 segundos genera un enemigo */
    nuevoEnemigo = setInterval(generarEnemigo, 3000);
    /* Chequeo colision con enemigo */
    setInterval(function() { checkCollision(enemigos) }, 50);


}


/** chequeo el fin del juego */
function gameOver(){
    // va a perder si termina el tiempo o si se quedo sin vidas
    let fin = document.getElementById("fin");
    fin.currentTime = 0;
    fin.play();
    fin.volume = 0.2;

    personaje.style.backgroundImage = "url(estilo/img/pjfin.png)";
    personaje.style.transform = `rotate(180deg)`;
    end = true;
    clearInterval(nuevoEnemigo);
    clearInterval(nuevoBonus);
    setTimeout(function() {

        document.getElementById("contenedor").classList.add("menu");
        document.getElementById("contenedor").innerHTML = `
      <div class="over">
        <h1 class="over">GAME OVER</h1>
        <h2>Puntos Obtenidos: ` + puntos + `</h2>
        <button class="btn" id="volverAJugar">Volver a jugar</button>
      </div>`;

        sonidoFondo.remove();

        document.getElementById("volverAJugar").addEventListener("click", () => {
            location.reload(); // Recarga la página para volver a jugar
        });
    }, 500);


}

/** chequeo si se choca contra algun enemigo, puntos o bonus de sumar vidas */
function chequekColision(){

    if (primeraColision >= 3) {
        return; // Salir de la función si ya se ha producido una colisión
    }
    for (let i = 0; i < elementos.length; i++) {

        const elemento = elementos[i];
        const pj = personaje.getBoundingClientRect();
        const elem = elemento.getBoundingClientRect();


        // Verificar si hay colisión
        if (!(pj.right < elem.left ||
                pj.left > elem.right ||
                pj.bottom < elem.top ||
                pj.top > elem.bottom)) {
            if (!elemento.classList.contains('golpeado')) {
                //choque con enemigo
                if (elemento.classList.contains('enemigo')) {
                    //cambio la imagen para hacer la "animación"
                    personaje.style.backgroundImage = "url(estilo/img/pjenemigo.png)";
                    setTimeout(cambiarImagenDeFondo, 600);
                    vida--;
                    document.getElementById('vidas').textContent = "Vidas: " + vida;
                    elemento.classList.add('golpeado'); // Marcar el enemigo como golpeado
                }
                //choque con arcoiris (bonus)
                if (elemento.classList.contains('bonus')) {
                    //cambio la imagen para hacer la "animación"
                    personaje.style.backgroundImage = "url(estilo/img/pjbonus.png)";
                    setTimeout(cambiarImagenDeFondo, 600);
                    puntos += 10;
                    tiempo += 10;
                    document.getElementById('puntos').textContent = "Puntos: " + puntos;
                    elemento.remove(); // Eliminar el bonus del DOM
                }
                //choque con lata de atun (vida)
                if (elemento.classList.contains('nuevaVida')) {
                    //cambio la imagen para hacer la "animación"
                    personaje.style.backgroundImage = "url(estilo/img/pjvida.png)";
                    setTimeout(cambiarImagenDeFondo, 600);
                    vida++;
                    document.getElementById('vidas').textContent = "Vidas: " + vida;
                    elemento.remove(); // Eliminar la vida del DOM
                }

            }
            // Verificar si se quedó sin vidas
            if (vida <= 0) {
                //"elimino" los intervalos para que deje de generar nuevos objetos
                clearInterval(intervalo);
                clearInterval(nuevaVida);
                clearInterval(nuevoEnemigo);
                //fin del juego
                gameOver();
            }
        }
    }
}

/** tomo los eventos para comenzar a jugar y para ver las instruciones */
document.getElementById("jugarBtn").addEventListener("click", function() {
    startGame();
});

document.getElementById("instruccionesBtn").addEventListener("click", function() {
    //btnSonido.play();
    showInstructions();
});

document.getElementById("volverBtn").addEventListener("click", function() {
    //btnSonido.play();
    backToMenu();
});