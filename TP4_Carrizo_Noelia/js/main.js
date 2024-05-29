"use strict"

let runner = new Runner();

document.addEventListener('keydown', () => {
    runner.saltar();
});



/* cada 50 milisegundos verifica estado del juego */
setInterval(gameLoop, 50);



/* cada 2 segundo genera un enemigo */
setInterval(generarEnemigo, 2000);




/**
 * Chequear estado del runner y de los enemigos
 */
function gameLoop() {

    //console.log(runner.status())


}


function generarEnemigo() {
    let enemigo = new Enemigo();
}

/*
(function () {
    var requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
  })();
  
  var start = null;
  var element = document.getElementById("SomeElementYouWantToAnimate");
  
  function step(timestamp) {
    if (!start) start = timestamp;
    var progress = timestamp - start;
    element.style.transform =
      "translateX(" + Math.min(progress / 10, 200) + "px)";
    if (progress < 2000) {
      window.requestAnimationFrame(step);
    }
  }
  
  window.requestAnimationFrame(step);*/