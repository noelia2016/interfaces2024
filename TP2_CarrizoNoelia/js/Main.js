
let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
console.log(canvasWidth,canvasHeight);
// tomo los elementos
let archivo = document.querySelector("#newFile");
let openFile = document.querySelector("#openFile");
let downloadFile = document.querySelector("#downloadFile");

/** carga la imagen seleccionada en el canvas */
function nuevoProyecto(){

    context.fillStyle = "#fff"; // canvas background color
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    
}

// accion para descargar la imagen
function downloadImage () {
    let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    downloadFile.setAttribute("href", image);
}

function aplicarFiltrosImagen() {
    // 1. Seleccionando el formulario HTML que contiene los filtros 
    // Creación de una copia del canvas
    let inputsFilters = e.target;
    let inputImagen  = ctx.getImageData(canvas.clientLeft, canvas.clientTop, canvas.width, canvas.height);
    
    // 2.1.0 Seleccionando los inputs tipo rango
    inputsFilters.querySelectorAll("input[type=range]").forEach( input => {
        
        // obtengo filtro particular, se guarda en su respectivo input
        // en un atributo con nombre "data-filter-type" 
        let filter = input.getAttribute("data-filter-type");

        // se recupera el valor del rango
        let intensity = input.value ?? 0;

        // En caso de que la intensidad, el valor del rango, no sea mayor a 0, no se llaman a los filtros
        if(intensity > 0) {
            // Se crea una nueva copia del canvas "outputImagen", esto para no editar la misma
            // imagen de la cual se está obteniendo la información para aplicar los filtros
            let outputImagen = ctx.getImageData(canvas.clientLeft, canvas.clientTop, canvas.width, canvas.height);
            
            // Utilizando la variable "filter" llamo a su respectivo método, pasando las variables correspondientes
            // Se iguala el valor de la variable "inputImagen" al valor de retorno de la función de un filtro, 
            // a pesar de que la misma función retorna la variable "outputImagen", la cual ya contiene los efectos de los
            // los filtros aplicados. Esto se hace con la razón de poder aplicar filtros consecutivos
            // sobre la misma imagen
            inputImagen = ImageFilters[filter](inputImagen, outputImagen, intensity);
        }
    });
    
    // Adaptado a los inputs tipo checkbox
    inputsFilters.querySelectorAll("input[type=checkbox]:checked").forEach( input => {
        let outputImagen = ctx.getImageData(canvas.clientLeft, canvas.clientTop, canvas.width, canvas.height);
        let filter = input.getAttribute("data-filter-type")
        inputImagen = ImageFilters[filter](inputImagen, outputImagen);
    });

    // Se coloca la imagen editada en el canvas
    ctx.putImageData(inputImagen, canvas.clientLeft, canvas.clientTop);
}

// abre un canvas vacio cuando presiona nuevo en el menu
archivo.addEventListener("click", nuevoProyecto);

// cuando hace click para cargar archivo
openFile.addEventListener("change", e => {

    // getting a hold of the file reference
    let file = e.target.files[0];

    // para quedarme y trabajar con el archivo utilizo FileReader

    /** El objeto FileReader permite que las aplicaciones web lean ficheros (o información en buffer) almacenados en el cliente de forma asíncrona, usando los objetos File  */
    let reader = new FileReader();
    reader.readAsDataURL(file); // Comienza la lectura del contenido del objeto Blob, una vez terminada, el atributo result contiene un data: URL que representa los datos del fichero.
    
    // aquí le decimos al lector qué hacer cuando termine de leer....
    reader.onload = readerEvent => {

        let content = readerEvent.target.result; // me quedo con el contenido del archivo
        image = new Image();
        image.src = content;

        // Este evento se activa cada vez que la operación de lectura se ha completado satisfactoriamente.
        image.onload = function () {

            // adapto la imagen a mi canvas
            var hRatio = canvas.width  / image.width    ;
            var vRatio =  canvas.height / image.height  ;
            var ratio  = Math.max ( hRatio, vRatio );
            canvas.width  = image.width * ratio; 
            canvas.height = image.height * ratio; 

            // muestro la imagen en el canvas
            context.drawImage(this, 0, 0, canvas.width, canvas.height);
            // obtener imageData del contenido del lienzo
            let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            
            // dibuja la imagen modificada
            context.putImageData(imageData, 0, 0);
        }
    }
    // si no se cargo queda en null
    openFile.value = null;
    });

//Evento al querer descargar la imagen que trabaje en el paint con filtros y demas
downloadFile.addEventListener("click", downloadImage);





