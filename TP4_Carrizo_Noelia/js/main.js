"use strict"

let runner = new Runner();

// toma el evento de saltar cuando presiona las teclas de espacio y la flecha para arriba
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.code === 'ArrowUp') {
    runner.saltar();
  }
});

/* cada 3 segundo genera un enemigo */
setInterval(generarEnemigo, 3000);

/** cada 3 segundos chequeo las vidas */

/** cada 3 segundos chequeo los puntos que tiene */

/** chequear colision */

function generarEnemigo() {
    let enemigo = new Enemigo();
}

function showInstructions() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("instrucciones").style.display = "flex";
}

function backToMenu() {
  document.getElementById("instrucciones").style.display = "none";
  document.getElementById("menu").style.display = "flex";
}
