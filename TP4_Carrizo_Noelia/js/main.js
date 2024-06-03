"use strict"

function showInstructions() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("instrucciones").style.display = "flex";
}

/** para volver a jugar */
function backToMenu() {
  document.getElementById("instrucciones").style.display = "none";
  document.getElementById("menu").style.display = "flex";
}

document.querySelector('#arrow-next').addEventListener('click', () => {
  show_slide(++slider_index);
});



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


