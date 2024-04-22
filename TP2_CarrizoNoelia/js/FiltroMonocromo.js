class FiltroMonocromo extends Filtro {

     /*
     Una imagen binaria o monocromo es una imagen digital que tiene únicamente dos valores posibles para cada píxel. ​ 
    Normalmente, los colores utilizados para su representación son negro y blanco
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
            let promedio = (imageData.data[pixel + 0] + imageData.data[pixel + 1] + imageData.data[pixel + 2])/3;

            if (promedio > 128)
                promedio = 255;
            else
                promedio = 0;

            // se lo aplico al pixel en la imageData
            imageData.data[ pixel + 0] = promedio; // rojo 
            imageData.data[ pixel + 1] = promedio; // verde 
            imageData.data[ pixel + 2] = promedio; // azul
        } // for
    } // aplicarFiltro

} // fin de class del filtro monocromo