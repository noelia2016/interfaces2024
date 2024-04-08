let 

    lastPress = null, // indicará el momento en que apretamos el ratón
    lastRelease = null, // indicará el momento en que soltamos el ratón
    mouse = {x: 0, y: 0},
    pointer = {x: 0, y: 0},
    dragging = null, // elemento que estamos arrastrando en este moment
    draggables = [], // que contendrá todos nuestros elementos arrastrables
    i = 0,
    l = 0;

/**
 * toma el movimiento del mouse cuando presionas un boton
 */
function enableInputs() {

    document.addEventListener('mousemove', function (evt) {
        mouse.x = evt.pageX - canvas.offsetLeft;
        mouse.y = evt.pageY - canvas.offsetTop;
    }, false);

    document.addEventListener('mouseup', function (evt) {
        lastRelease = evt.which;
    }, false);

    canvas.addEventListener('mousedown', function (evt) {
        evt.preventDefault();
        lastPress = evt.which;
    }, false);
}

function random(max) {
    return ~~(Math.random() * max);
}

// dibuja en el canvas la figura para mover en este caso circulos
function paintRaton(ctx) {

    // Clean canvas
    ctx.fillStyle = '#AA3939';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw circles
    ctx.fillStyle = '#00f';
    for (i = 0, l = draggables.length; i < l; i += 1) {
        draggables[i].fill(ctx);
    }

    // Debug pointer position
    ctx.fillStyle = '#0f0';
    ctx.fillRect(pointer.x - 1, pointer.y - 1, 2, 2);

    // Debug dragging circle
    ctx.fillStyle = '#fff';
    ctx.fillText('Dragging: ' + dragging, 0, 10);
}

// mueve los punteros para arrastar en el canvas
function moverFigMouse() {

    // toma el puntero del mouse
    pointer.x = mouse.x;
    pointer.y = mouse.y;

    // Limita el puntero en el canvas
    if (pointer.x < 0) {
        pointer.x = 0;
    }
    if (pointer.x > canvas.width) {
        pointer.x = canvas.width;
    }
    if (pointer.y < 0) {
        pointer.y = 0;
    }
    if (pointer.y > canvas.height) {
        pointer.y = canvas.height;
    }

    if (lastPress === 1) {
        for (i = 0, l = draggables.length; i < l; i += 1) {
            if (draggables[i].distance(pointer) < 0) {
                dragging = i;
                break; // con esto se corta el for para que solo se mueva el dragable que se seleciono
            }
        }
    } else if (lastRelease === 1) {
        // si solto el circulo vuelve a null el draggin
        dragging = null;
    }

    // mover el circulo si se seleccion 
    if (dragging !== null) {
        // si dragging no tiene un valor nulo, el elemento está siendo arrastrado obtendrá la posición del ratón
        draggables[dragging].x = pointer.x;
        draggables[dragging].y = pointer.y;
    }
}

function runR() {

    window.requestAnimationFrame(runR);
    moverFigMouse();
    paintRaton(ctx); // escribe en el canvas

    lastPress = null;
    lastRelease = null; // indicará el momento en que soltamos el ratón
}

function moverFiguras() {

    // Obtener el canvas y su contexto
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    // les doy tamaño al canvas
    canvas.width = 600;
    canvas.height = 400;

    // Creaa los circulos draggables para que se puedan mover en el canvas
    cantCirculos=35;
    for (i = 0; i < cantCirculos; i += 1) {
        draggables.push(new Circle(random(canvas.width), random(canvas.height), 10));

    }

    // utiliza los punteros y corre
    enableInputs();
    runR();
}

// inicia 
//window.addEventListener('load', moverFiguras, false);

// cuando hago click sobre la figura
document.addEventListener('dblclick', function (evt) {
    moverFiguras();
}, false);

/*document.addEventListener('mousedown',function(evt){
    lastPress=evt.which;
    moverFiguras();
},false);*/

