class FiltroNegativo extends Filtro {

    /*
      Para sacar el negativo de una imagen en colores, hay que acceder uno por uno cada pixel de esta imagen y cambiar el color del pixel por el color complementario
    */
    constructor(context, whidth, height) {
        this.ctx = context;
        this.height = height;
        this.whidth = whidth;
    } // constructor

    // funcion para aplicar el filtro deseado dependiendo de la opcion que elija el usuario
    aplicarFiltro (imageData){

        // recorre la imagenData pixel por pixel aplicando el filtro
        for (let pixel = 0; pixel < imageData.data.length; pixel += 4) {

            // se lo aplico al pixel en la imageData
            imageData.data[ pixel + 0] = 255 - imageData.data[ pixel + 0]; // rojo 
            imageData.data[ pixel + 1] = 255 - imageData.data[ pixel + 1]; // verde 
            imageData.data[ pixel + 2] = 255 - imageData.data[ pixel + 2] ; // azul
        } // for
    } // aplicarFiltro

} // fin de class del filtro negativo
