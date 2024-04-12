// tomo mi canvas para poder utilizarlo
const canvas = document.getElementById("mi_canvas");
const context = canvas.getContext('2d');

// aca debo tomar los diferentes eventos tanto de teclado como de mouse
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;


const NUM_FIGURES = 8; // cantidad de figuras
const FIGURE_SIZE = 20; // tamaño de la figura

let figures = [];

// nuevo canvas
function clearCanvas(color, canvas) {
    context.fillStyle = color;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

// dibuja las figuras en el canvas limpiandolo
function drawFigures() {
    clearCanvas('#F8F8FF', canvas);
    for (let i = 0; i < figures.length; i++) {
        figures[i].draw();
    }
}

// Inicio de codigo de creaccion de figuras y las agrega al array de figuras
function addRectangle() {
    // dibuja rectangulos
    let posX = Math.round(Math.random() * canvas.width);
    let posY = Math.round(Math.random() * canvas.height);
    let color = randomRGBA();
    let rect = new Rect(posX, posY, FIGURE_SIZE, FIGURE_SIZE, color, context);
    figures.push(rect);
}

function addCircle() {

    // dibuja circulos
    let posX = Math.round(Math.random() * canvas.width);
    let posY = Math.round(Math.random() * canvas.height);
    let color = randomRGBA();
    let circle = new Circle(posX, posY, FIGURE_SIZE / 2, color, context);
    figures.push(circle);
}
//# fin de creacion de figuras

//#region 'Mouse events'
function findClickedFigure(x, y) {
    
    for (let index = 0; index < figures.length; index++) {
        const element = figures[index];
        if (element.isPointInside(x, y)) {
            return element;
        }
    }
}

let lastClickedFigure = null; // ultima figura en la que hizo click
let isMouseDown = false;

function onMouseDown(event) {
    isMouseDown = true;

    // Se limpia la propiedad highlighted de la ultima figura clickeada
    if (lastClickedFigure != null) {
        lastClickedFigure.setHighlighted(false);
        lastClickedFigure = null;
    }

    // Buscar si hay una nueva figura clickeada
    let clickedFigure = findClickedFigure(event.layerX, event.layerY);
    if (clickedFigure != null) {
        clickedFigure.setHighlighted(true);
        lastClickedFigure = clickedFigure;
    }

    drawFigures();
}

function onMouseMoved(event) {
    if (isMouseDown && lastClickedFigure != null) {
        lastClickedFigure.setPosition(event.layerX, event.layerY);
        drawFigures();
    }
}

function onMouseUp(event) {
    isMouseDown = false;
}
//#endregion

function init() {
    // Inicializar figuras de forma aleatoria
    for (let index = 0; index < NUM_FIGURES; index++) {
        if (Math.random() > 0.5) {
           addRectangle();
        } else {
            addCircle();
        }
    }

    drawFigures();

    // Inicializar listeners de eventos de mouse en el canvas
    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mousemove', onMouseMoved, false);
}

/** le da color a las figuras aleatoriamente */
function randomRGBA() {

    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    let a = 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

// inicia el paint dibujando
init();