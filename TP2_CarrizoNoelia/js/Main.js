
let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

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



