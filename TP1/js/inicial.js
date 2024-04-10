// tomo mi canvas para poder utilizarlo
const canvas = document.getElementById("mi_canvas");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
  }

// aca debo tomar los diferentes eventos tanto de teclado como de mouse
let ctx = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let figuras = [];  // contendrá todos nuestros elementos arrastrables

const CANT_FIG = 25;

/*  crea figuras aleatoriamente */
function crearFiguras()
{
    if (figuras.length < CANT_FIG) {
        addFigura(figuras.length < (CANT_FIG / 2));
        figuras[figuras.length - 1].draw();
        setTimeout(() => {
            crearFiguras();
        }, 100);
    }

}

function dibujar()
{
    crearFiguras(); // crea figuras aleatoriamente
    pintarCanvas();
    buscarFiguraSeleccionada();
    
}

function pintarCanvas()
{
    let unColor = 'rgba(245, 245, 245, 255)';
    let color = 'rgba(225, 225, 225, 255)';
    /*let rect = new Rectangulo(0, 0, canvasWidth-1, canvasHeight-1, unColor , ctx, true);
    rect.draw();*/
    /*let square = new Triangulo(3, 4, canvasWidth-1, canvasHeight-1, color, ctx, true);
    square.raw();*/
    let square = new Cuadrado(0, 0, canvasWidth-1, canvasHeight-1, color , ctx, false);
    square.draw();
}

// agrega las figuras
function addFigura(estilo)
{
    let posX = Math.round(Math.random() * canvasWidth);
    let posY = Math.round(Math.random() * canvasHeight);
    let color = randomRGBA();

    if (estilo == true) {
        let rect = new Rectangulo(posX, posY, Math.round(Math.random() * 50), Math.round(Math.random() * 50), color, ctx, false);
        figuras.push(rect);
        /*let square = new Triangulo(posX, posY, Math.round(Math.random() * 50), Math.round(Math.random() * 50), color, ctx, false);
        figuras.push(square);*/

    }else{
        let ellipse = new Ellipse(posX, posY, Math.round(Math.random() * 50), Math.round(Math.random() * 50), color, ctx, false);
        figuras.push(ellipse);
        let cuadrado = new Cuadrado(posX, posY, Math.round(Math.random() * 20), Math.round(Math.random() * 20), color, ctx, false);
        figuras.push(cuadrado);
        let circulo = new Circulo(posX, posY, Math.round(Math.random() * 20), Math.round(Math.random() * 20), color, ctx, false, 10);
        figuras.push(circulo);

    }    

}

/** le da color a las figuras aleatoriamente */
function randomRGBA() {

    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    let a = 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/* cada figura se fija si clickeo en ella*/
function buscarFiguraSeleccionada(x, y) {
    for (let i = 0; i < figuras.length; i++) {
        const fi = figuras[i];

        if (fi.isPointInside(x, y)) {
            console.log(fi);
            return fi;
        }
    }

}

// Agregar event listener para el mouse down en el canvas
window.addEventListener('mousedown', function (e) {
    // Verificar si se hizo clic dentro del rectángulo
    figuras.forEach(function(fig) {
        if (e.offsetX >= fig.x && e.offsetX <= fig.x + fig.width &&
            e.offsetY >= fig.y && e.offsetY <= fig.y + fig.height) {
            // Agregar event listener para el mouse move en el canvas
            canvas.addEventListener('mousemove', dibujar);
        }
    });
});


var output = document.getElementById("forma");

// muestra las cordenadas del cursor
function marcarCoords(output, x, y) {
    output.innerHTML = ("x: " + x + ", y: " + y);
    output.style.top = (y + 10) + "px";
    output.style.left = (x + 10) + "px";
    output.style.backgroundColor = "#FFF";
    output.style.border = "1px solid #d9d9d9"
    canvas.style.cursor = "pointer";
}

// limpia las cordenadas
function limpiarCoords(output) {
    output.innerHTML = "";
    output.style.top = 0 + "px";
    output.style.left = 0 + "px";
    output.style.backgroundColor = "transparent"
    output.style.border = "none";
    canvas.style.cursor = "default";
}

// cuando se posiciona sobre el cambas muestra las coordenadas
function oMousePos(canvas, evt) {
    var ClientRect = canvas.getBoundingClientRect(); // información sobre el tamaño de un elemento y su posición relativa a la ventana gráfica
    return { //objeto
      x: Math.round(evt.clientX - ClientRect.left),
      y: Math.round(evt.clientY - ClientRect.top),      
      pos:buscarFiguraSeleccionada(evt.clientX, evt.clientX)
      // deberia mostrar si hay figura
    }
  }

// capturas los eventos para mostrar las coordenadas
canvas.addEventListener("mousemove", function(evt) {
    var mousePos = oMousePos(canvas, evt);
    marcarCoords(output, mousePos.x, mousePos.y)
}, false);

canvas.addEventListener("mouseout", function(evt) {
    limpiarCoords(output);
}, false);

// inicia la pagina poniendo el lienzo de muchas figuras
window.addEventListener('load', dibujar, false);
