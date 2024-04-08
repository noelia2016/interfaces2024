let
    KEY_ENTER = 13,
    KEY_LEFT = 37,
    KEY_UP = 38,
    KEY_RIGHT = 39,
    KEY_DOWN = 40,
    
    pause = true,
    x = 50,
    y = 50,
    dir = 0;

function paintMover(ctx) {
    // Clean canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw square
    ctx.fillStyle = '#0f0';
    ctx.fillRect(x, y, 10, 10);

    // Debug last key pressed
    ctx.fillStyle = '#fff';
    //ctx.fillText('Last Press: ' + lastPress, 0, 20);
    
    // Draw pause
    if (pause) {
        ctx.textAlign = 'center';
        ctx.fillText('PAUSE', 150, 75);
        ctx.textAlign = 'left';
    }
}


function detectarTecla() {

    /* detecta las teclas de direccion del teclado arriba/abajo/costadoizq/costadoder
        para saber que direccion toma la forma */
    if (!pause) {
        // Change Direction
        if (lastPress == KEY_UP) {
            dir = 0;
        }
        if (lastPress == KEY_RIGHT) {
            dir = 1;
        }
        if (lastPress == KEY_DOWN) {
            dir = 2;
        }
        if (lastPress == KEY_LEFT) {
            dir = 3;
        }

        // moveremos nuestra forma dependiendo la dirección que se haya tomado
        if (dir == 0) {
            y -= 10;
        }
        if (dir == 1) {
            x += 10;
        }
        if (dir == 2) {
            y += 10;
        }
        if (dir == 3) {
            x -= 10;
        }

         // Si salio la forma del lienzo lo regresamos a la misma
        if (x > canvas.width) {
            x = 0;
        }
        if (y > canvas.height) {
            y = 0;
        }
        if (x < 0) {
            x = canvas.width;
        }
        if (y < 0) {
            y = canvas.height;
        }
    }
    
    // Pause/Unpause cuando se presiona la tecla enter se para el movimiento
    if (lastPress == KEY_ENTER) {
        pause = !pause;
        lastPress = null;
    }
}

function repaintMover() {
    window.requestAnimationFrame(repaintMover);
    paintMover(ctx);
}

function runM() {
    setTimeout(runM, 50);
    detectarTecla();
}

function iniciarMoviemientos() {
    // Get canvas and context
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    
    // Start game
    runM();
    repaintMover();
}

window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 17);
        };
}());


//window.addEventListener('load', init, false);
document.addEventListener('keydown', function (evt) {
    lastPress = evt.which;
    iniciarMoviemientos();
}, false);
