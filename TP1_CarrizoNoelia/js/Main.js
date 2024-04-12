
let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');

const NUM_FIGURES = 3;
const FIGURE_SIZE = 40;

// las teclas que necesito captura del teclado 
let KEY_ENTER=13;
let KEY_LEFT=37;
let KEY_UP=38;
let KEY_RIGHT=39;
let KEY_DOWN=40;
// guarda la tecla presionada
let lastPress = null;

let figures = [];

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

// dibuja las figuras en el canvas
function drawFigures() {
    clearCanvas('#F8F8FF', canvas);
    for (let i = 0; i < figures.length; i++) {
        figures[i].draw();
    }
}

// metodo de agregar rectangulos en forma aleatoria distribuidos en al canvas con un color definido
function addRectangle() {

    // dibujo rectangulos
    let posX = Math.round(Math.random() * canvas.width);
    let posY = Math.round(Math.random() * canvas.height);
    // le seteo el color aleatorio para relleno 
    let color = randomRGBA();
    let rect = new Rect(posX, posY, FIGURE_SIZE*2, FIGURE_SIZE, color, context);
    // lo agrega al array de figuras
    figures.push(rect);
}

// metodo de agregar circulos en forma aleatoria distribuidos en al canvas con un color definido
function addCircle() {

    // dibujo circulos
    let posX = Math.round(Math.random() * canvas.width);
    let posY = Math.round(Math.random() * canvas.height);
    let color = '#BF1A2F';
    let circle = new Circle(posX, posY, FIGURE_SIZE / 2, color, context);
    figures.push(circle);
}

// metodo de agregar cuadrados de colores random en forma aleatoria distribuidos en al canvas
function addSquare() {

    // dibujo cuadrados
    let posX = Math.round(Math.random() * canvas.width);
    let posY = Math.round(Math.random() * canvas.height);
    let color = '#2B4733'; // le defino un color
    let square = new Square(posX, posY, FIGURE_SIZE, color, context);
    figures.push(square);
}

function addEllipse() {

    let posX = Math.round(Math.random() * canvas.width);
    let posY = Math.round(Math.random() * canvas.height);
    let color = randomRGBA();
    let ellipse = new Ellipse(posX, posY, Math.round(Math.random() * 50), Math.round(Math.random() * 50), color, context);
    figures.push(ellipse);
}
//#endregion

// eventos del mouse sobre la figura cuando hace click sobre la misma
function findClickedFigure(x, y) {

    for (let index = 0; index < figures.length; index++) {
        const element = figures[index];
        if (element.isPointInside(x, y)) {
            return element;
        }
    }
}

let lastClickedFigure = null; // ultima figura en la que hizo click
let isMouseDown = false; // para indicar si presiono el mouse

// evento que captura cuando el usuario hace click sobre una figura
function onMouseDown(event) {

    isMouseDown = true;

    // Si se clickeo una figura 
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

// si se mueve la posicion del mouse
function onMouseMoved(event) {
    if (isMouseDown && lastClickedFigure != null) {
        lastClickedFigure.setPosition(event.layerX, event.layerY);
        drawFigures();
    }
}

// cuando suelta el boton del mouse
function onMouseUp(event) {
    isMouseDown = false;
}
//#endregion

function iniciar() {

    //Capturo el objeto del DOM donde indico si selecciono un punto interno de la figura
    let p = document.getElementById('parrafo');

    // Inicializar figuras de forma aleatoria
    for (let index = 0; index < NUM_FIGURES; index++) {
        // agrego rectangulos, circulos y cuadrados a mi canvas
        addRectangle();
        addCircle();
        addSquare();  
    }

    drawFigures();

    // Inicializar listeners de eventos de mouse en el canvas

    // toma el evento cuando el usuario presiona con el mouse
    canvas.addEventListener('mousedown', onMouseDown, false);

    // cuando suelta el mouse para poner en falso la variable que se usa para indicar que presiono mouse 'isMouseDown'
    canvas.addEventListener('mouseup', onMouseUp, false);

    // toma el evento de ir moviendo el mouse con la imagen selecionada
    canvas.addEventListener('mousemove', onMouseMoved, false);

    // evento para mostrar cuando presiona una figura en el canvas
    canvas.addEventListener('click', event => {
  
        let clickedFigure = findClickedFigure(event.layerX, event.layerY);
        if (clickedFigure != null) {
            setTimeout(() => {
                p.textContent = 'Genial!!! El punto seleccionado pertenece a la figura.';
            }, 10);
        } else {
            setTimeout(() => {
                p.textContent = "El punto seleccionado NO pertenece a la figura";
            }, 10);
        }
    });

    /****** EVENTOS PARA DETECTAR USO DE TECLADO  *****/

    //guardaremos todas las teclas que están siendo presionada
    let pressing=[];
    let cantidad=0;

    /****
        Ahora, modificaremos el EventListener al final, guardando en nuestro arreglo, 
        en la posición equivalente a la tecla presionada, el valor booleano true, 
        indicando así que esta tecla está siendo presionada.
    ****/
    canvas.addEventListener('keydown',function(evt){

        lastPress=evt.keyCode;
        pressing[evt.keyCode]=true;

        // mueve los elementos segun la direccion
        switch (lastPress) {
            // si se traslada hacia derecha o izquierda --- eje x
            case 'ArrowRigth':
                cantidad=100
                lastClickedFigure.style.transform='tralateX($(cantidad)px)'
                break;
            case 'ArrowLeft':
                cantidad-=100
                lastClickedFigure.style.transform='tralateX($(cantidad)px)'
                break;
            
            // si se traslada hacia arriba o abajo --- eje y
            case 'ArrowUp':
                cantidad=100
                lastClickedFigure.style.transform='tralateY($(cantidad)px)'
                break;
            case 'ArrowDown':
                cantidad-=100
                lastClickedFigure.style.transform='tralateY($(cantidad)px)'
                break;
            default:
                break;
        }
    },false);

    /*  De igual forma, agregaremos un EventListener para cuando la tecla es liberada, 
        cambiando entonces su valor a falso. */
    document.addEventListener('keyup',function(evt){
        pressing[evt.keyCode]=false;
        lastPress=null;
    },false);

}

// inicio con un canvas con figuras aleatorias precargadas
iniciar();