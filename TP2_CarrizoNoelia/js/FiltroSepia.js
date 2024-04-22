class FiltroSepia extends Filtro {

    constructor(context, whidth, height) {
        this.ctx = context;
        this.height = height;
        this.whidth = whidth;
    } // constructor

    // funcion para aplicar el filtro deseado dependiendo de la opcion que elija el usuario
    aplicarFiltro (imageData){

        for (let y = 0; y < imageData.height; y++) {
            for (let x = 0; x < imageData.width; x++) {
                let r = 0.393 * getPixel(imageData, x, y, red) + 0.769 * getPixel(imageData, x, y, green) + 0.189 * getPixel(imageData, x, y, blue);
                if (r > 255) r = 255;
                let g = 0.349 * getPixel(imageData, x, y, red) + 0.686 * getPixel(imageData, x, y, green) + 0.168 * getPixel(imageData, x, y, blue);
                if (g > 255) g = 255;

                let b = 0.272 * getPixel(imageData, x, y, red) + 0.534 * getPixel(imageData, x, y, green) + 0.131 * getPixel(imageData, x, y, blue);
                if (b > 255) b = 255;

                setPixel(imageData, x, y, r, g, b);
            }
        }
       
    } // aplicarFiltro

} // fin de class del filtro sepia