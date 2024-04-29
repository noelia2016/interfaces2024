class Filtro {

    /**
     * La propiedad filter de CSS aplica efectos gráficos como desenfoque o cambio de color a un elemento. Los filtros se usan comúnmente para ajustar la representación de imágenes, fondos y bordes.
     * @param {*} context 
     * @param {*} whidth 
     * @param {*} height 
     */
    constructor(context, whidth, height) {
        this.context = context;
        this.height = height;
        this.whidth = whidth;
    } // constructor

    // trabaja con los pixeles para usar en los filtros
    getPixel (imageData, x, y, pos) {

        let index = (x + y * imageData.width) * 4;
        return imageData.data[index + pos];
    }
    
    setPixel (imageData, x, y, r, g, b) {

        let index = ( x + y * imageData.width) * 4;
        imageData.data[index + 0] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
    }

    // funcion para aplicar el filtro deseado dependiendo de la opcion que elija el usuario
    aplicarFiltro (imageData){

        // aca cada filtro distinto implenta lo que debe hacer 
        // es una CLASE ABSTRACTA donde cada filtro trabaja con los pixeles de imageData
    }

    // aplica el filtro y lo muestra en el canvas
    aplicaElFiltro(){

        // toma todo lo que hay en el canvas -- Devuelve un objeto ImageData que copia los datos de los píxeles del rectángulo especificado.
        let imageData = this.context.getImageData (0,0, this.whidth, this.height);

        // llama al filtro necesario
        this.aplicarFiltro(imageData);

        // lo muestro en el canvas luego de procesado el filtro -- Pone los datos de la imagen (de un objeto ImageData especificado) de nuevo en el canvas
        this.context.putImageData(imageData,0,0);

    } // aplicaElFiltro

}

// defino que hacer cuando elijo el filtro sepia
document.querySelector("#sepia").addEventListener("click", (e) => {
    let miFiltro = new FiltroSepia(context,canvasWidth,canvasHeight);
    miFiltro.aplicaElFiltro();
    miFiltro=null;
});

// defino que hacer cuando elijo el filtro sepia
document.querySelector("#negative").addEventListener("click", (e) => {
    let miFiltro = new FiltroNegativo(context,canvasWidth,canvasHeight);
    miFiltro.aplicaElFiltro();
    miFiltro=null;
});
