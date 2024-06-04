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
let vida = 4;
let intervalo = 0;
let cantColisiones = 0;
let end= false; /** para finalizar el juego */
let nuevoEnemigo;
let nuevoBonus;
let nuevoVidas;

const personaje = document.getElementById("personaje");
const enemigos = document.getElementsByClassName('enemigo');
const bonus = document.getElementsByClassName('bonus');
const vidas = document.getElementsByClassName('nuevaVida');
// los botones de juego y demas
const btns = document.getElementsByClassName('btn');

//muestro en pantalla la vida y los putnos
document.getElementById('puntos').textContent = "PUNTOS: " + puntos;
document.getElementById('vidas').textContent = "VIDAS: " + vida;

/** GENERACION DE OBJETOS DE BONUS ENEMIGOS Y VIDAS PARA PODER JUGAR  */
/** genera los enemigos */
function generarEnemigo() {
    let enemigo = new Enemigo();
}

/** genera bonus */
function generarBonus() {
    let bonus = new Bonus();
}

/** genera vidas  */
function generarVidas() {
    let nuevaVida = new Vida();
}


// Función para actualizar el tiempo cada segundo
function actualizarReloj() {

    // Verifica si el tiempo ha llegado a cero
    if (tiempo <= 0) {
        clearInterval(intervalo);
        // si se sertina el tiempo finaliza el juego
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

//Vuelve a la imagen original
function volverAlPersonaje() {
    personaje.style.backgroundImage = "url(../images/personaje/pajaro.png)";
}

/** chequeo si se choca contra algun enemigo, puntos o bonus de sumar vidas */
function checkCollision(elementos){

    if (cantColisiones >= 3) {
        return true; // Salir de la función si ya se ha producido una colisión
    }

    // recorre mientras continue el juego y tenga elementos
    for (let i = 0; i < elementos.length; i++) {

        const elemento = elementos[i];
        const pj = personaje.getBoundingClientRect();
        const elem = elemento.getBoundingClientRect();

        // Verificar si hay colisión con el personaje
        if (!(pj.right < elem.left || pj.left > elem.right || pj.bottom < elem.top || pj.top > elem.bottom)) {

            if (!elemento.classList.contains('golpeado')) {
                //cuando choca contra enemigo
                if (elemento.classList.contains('enemigo')) {
                    //cambio la imagen para hacer la "animación"
                    personaje.style.backgroundImage = "url(../images/personaje/personaje-colision.png)";
                    setTimeout(volverAlPersonaje, 600);
                    vida--;
                    document.getElementById('vidas').textContent = "Vidas: " + vida;
                    elemento.classList.add('golpeado'); // Marcar el enemigo como golpeado
                }
                //choque con bonus
                if (elemento.classList.contains('bonus')) {
                    // cambio la imagen para hacer la "animación"
                    personaje.style.backgroundImage = "url(../images/personaje/pj-bonus.png)";
                    setTimeout(volverAlPersonaje, 600);
                    puntos += 10;
                    tiempo += 10;
                    document.getElementById('puntos').textContent = "Puntos: " + puntos;
                    elemento.remove(); // Eliminar el bonus del DOM
                }
                // choque con un corazon (vida)
                if (elemento.classList.contains('nuevaVida')) {
                    //cambio la imagen para hacer la "animación"
                    personaje.style.backgroundImage = "url(../images/personaje/pj-vida.png)";
                    setTimeout(volverAlPersonaje, 600);
                    vida++;
                    document.getElementById('vidas').textContent = "Vidas: " + vida;
                    elemento.remove(); // Eliminar la vida del DOM
                }

            }
            // Verificar si se quedó sin vidas
            if (vida == 0) {
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

    /* Chequeo colision con bonus */
    setInterval(function() { checkCollision(bonus) }, 50);

    /* Chequeo colision con vida */
    setInterval(function() { checkCollision(vidas) }, 50);

    /* cada 5 segundos genera un bonus */
    nuevoBonus = setInterval(generarBonus, 5000);

    /* cada 7 segundos genera un bonus */
    nuevaVida = setInterval(generarVidas, 7000);

    // Inicia el contador del juego
    intervalo = setInterval(actualizarReloj, 1000);

}


/** chequeo el fin del juego */
function gameOver(){

    // va a perder si termina el tiempo o si se quedo sin vidas
    let fin = document.getElementById("fin");
    fin.currentTime = 0;
    fin.play();
    fin.volume = 0.2;

    // cuando muere el personaje
    personaje.style.backgroundImage = "url(../images/personaje/personaje_mueree.png)";
    personaje.style.transform = `rotate(180deg)`;
    end = true; // finaliza el juego 
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





