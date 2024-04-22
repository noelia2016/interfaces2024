
let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');

let image;

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

// para darle un color aleatorio a la figura
function randomRGBA() {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    let a = 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

// para borrar el canvas
function clearCanvas(color, canvas) {
    context.fillStyle = color;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function cargar(){

}

function filtro(){

}

function iniciar() {

    //Capturo el objeto del DOM donde indico si selecciono un punto interno de la figura
  
    var archivoSelect = document.getElementById("archivo");
    var filtroSelect  = document.getElementById("filtro");
    
    //Eventos que deben ocurrir cuando elijo filtro y cargo una imagen en el canvas
    /*archivoSelect.onchange = function(e){
        canvas.cargar(archivoSelect.value);
    }
    filtroSelect.onchange = function(e){
        canvas.filtro(filtroSelect.value);
    }
    */
    //Código

}

// inicio con un canvas vacio
iniciar();