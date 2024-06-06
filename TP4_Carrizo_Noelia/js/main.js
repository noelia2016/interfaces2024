"use strict"

/** muestra las instrucciones de juego */
function showInstructions() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("instrucciones").style.display = "flex";
}

/** para volver a jugar */
function backToMenu() {
  document.getElementById("instrucciones").style.display = "none";
  document.getElementById("menu").style.display = "flex";
}

/** tomo los eventos para comenzar a jugar y para ver las instruciones */
document.getElementById("jugarBtn").addEventListener("click", function() {
  startGame(); // inicia el juego
});

// toma el evento para mostrar las instrucciones
document.getElementById("instruccionesBtn").addEventListener("click", function() {
  //btnSonido.play();
  showInstructions();
});

// toma el evento para mostrar las instrucciones
document.getElementById("volverBtn").addEventListener("click", function() {
  //btnSonido.play();
  backToMenu();
});

// para cuando tiene que mostrar lwatchmeas instruciones de como se juega
var e = document.getElementById("instrucciones");
e.addEventListener("animationstart", listener, false);
e.addEventListener("animationend", listener, false);
e.addEventListener("animationiteration", listener, false);

e.className = "slidein";

// arma la lista a mostrar con las instruciones
function listener(e) {
  var l = document.createElement("li");
  switch (e.type) {
    case "animationstart":
      l.innerHTML = "Debes agarrar todas las monedas posibles para sumar puntos. Tambien tenes la posibilidad de sumar puntos extras con el bonus.";
      break;
    case "animationend":
      l.innerHTML = "CUIDADO!!! .. al chocar con algun enemigo se te descuenta una vida.";
      break;
    case "animationiteration":
      l.innerHTML = "";
      break;
  }
  document.getElementById("output").appendChild(l);
}
