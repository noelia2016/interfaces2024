"use strict"

function showInstructions() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("instrucciones").style.display = "flex";
}

function backToMenu() {
  document.getElementById("instrucciones").style.display = "none";
  document.getElementById("menu").style.display = "flex";
}
