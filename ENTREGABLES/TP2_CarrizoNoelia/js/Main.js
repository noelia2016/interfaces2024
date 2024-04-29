
let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

// tomo los elementos
let archivo = document.querySelector("#newFile"); // para abrir el paint nuevo
let openFile = document.querySelector("#openFile"); // para abrir la imagen
let downloadFile = document.querySelector("#downloadFile"); // para descargar el contenido trabajado en el canvas

/** carga la imagen seleccionada en el canvas */
function nuevoProyecto(){
//let image = new Image();
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
    
    // aquí le decimos al lector qué hacer cuando esta cargando la imagen....
    reader.onload = readerEvent => {

        let content = readerEvent.target.result; // me quedo con el contenido del archivo
        image = new Image();
        image.src = content;

        // Este evento se activa cada vez que la operación de lectura se ha completado satisfactoriamente.
        image.onload = function () {

            // adapto la imagen a mi canvas
            let imageAspectRatio = (1.0 * this.height) / this.width;
            let imageScaledWidth;
            let imageScaledHeight;

            if (this.width > this.height) {
                imageScaledWidth= canvas.height;
                imageScaledHeight= canvas.height * imageAspectRatio;
            }else{
                imageScaledWidth= canvas.width;
                imageScaledHeight= canvas.width * imageAspectRatio;
            }

            // muestro la imagen en el canvas
            context.drawImage(this, 0, 0, image.width, image.height);

            // obtener imageData del contenido del lienzo
            let imageData = context.getImageData(0, 0, image.width, image.height);
            
            // dibuja la imagen modificada
            context.putImageData(imageData, 0, 0);
        }
    }
    // si no se cargo queda en null
    openFile.value = null;
    });

//Evento al querer descargar la imagen que trabaje en el paint con filtros y demas
downloadFile.addEventListener("click", downloadImage);



