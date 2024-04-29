
    // Variables  para configurar el tamaño del canvas:
    canvas.width  = 800;
    canvas.height = 800;
    // innerHeight propiedad devuelve la altura de la zona de contenido de una ventana
    canvas.maxWidth = innerWidth - canvas.parentElement.offsetLeft - 65;
    canvas.maxHeight = innerHeight - canvas.parentElement.offsetTop - 65;
    canvas.width  = canvas.maxWidth;
    canvas.height = canvas.maxHeight;
    context.fillStyle = 'white'; // color blanco predeterminado al canvas
    context.fillRect(0, 0, canvas.width, canvas.height); // dibujo la linea en el canvas
    canvas.defaultCanvas = context.getImageData(canvas.clientLeft, canvas.clientTop, canvas.width, canvas.height);
    //canvas.unfilteredImage  = null; // para indicar filtro en la imagen

// 1.0 Varibles:
// 1.1 Variable booleana que nos indica si el evento de dibujar se esta ejecutando:
let drawing = false; 

// 1.2  Colores para pintar y borrar:
let pencilColor = "black";
let cleanColor = "white";

// 1.3 Varible para manejar el grosor del lápiz:
let pencilWidth = "2";

// 1.4 Varible para manejar si se está dibujando o borrando:
let pencil = false;
let eraser = false;

// Mientras dibujo con el lápiz
function drawingWithPencil(e) {
    // Si la varible siempre se vuelve su contrario de su valor
    pencil = (!pencil);
    //console.log(pencil, eraser)
    eraser = (false);
}

// Borrando: igual al lápiz
function cleanWithEraser(e) {
    eraser = (!eraser);
    pencil = (false);
}

// seleciona el rango del lapiz y goma
function selectRange(e) {
    e.preventDefault();
    pencilWidth = e.target.value ?? 1; // Añadiendo valor por defecto
}

// seleciona el color
function selectColor(e) {
    e.preventDefault();
    pencilColor = e.target.value ?? "#000000"; // Añadiendo valor por defecto
}

loadEvents()

// tomando los eventos del mouse para dibujar
function loadEvents() {
    canvas.addEventListener('mousedown', (e) => {draw(e)}, false);
    canvas.addEventListener('mousemove', (e) => {toDraw(e)}, false);
    canvas.addEventListener('mouseup', (e) => {stopDraw(e)}, false);
    canvas.addEventListener('mouseout', (e) => {stopDraw(e)}, false);
}

// Método iniciar un trazar una linea (goma o lápiz):
function draw(e) {
    e.preventDefault();
    drawing = true;
    context.beginPath();
    context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

// Método para unir puntos y formar una linea
function toDraw(e) {
    e.preventDefault();
    if(pencil || eraser) {
        if(drawing == true){
            context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
            context.strokeStyle = (pencil) ? pencilColor : 'white';
            context.lineWidth = pencilWidth;
            context.stroke();
        }
    }
}

// Para cuando dejo de dibujar con el lapiz
function stopDraw(e) {

    e.preventDefault();
    if (drawing == true) {
        context.closePath();
        drawing = false;
    }
}

// tomo eventos del lapiz, goma grosor para el lapiz y el color
document.getElementById('lapiz').addEventListener('click', (e)=> { drawingWithPencil(e) });
document.getElementById('goma').addEventListener('click', (e)=> { cleanWithEraser(e) });
document.getElementById('grosor').addEventListener('change', (e)=> { selectRange(e) });
document.getElementById('color').addEventListener('change', (e)=> { selectColor(e) });


