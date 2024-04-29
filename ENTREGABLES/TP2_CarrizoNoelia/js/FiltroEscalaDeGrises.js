class FiltroEscalaDeGrises extends Filtro {

    constructor(context, whidth, height) {
        super(context, whidth, height);
    } // constructor

    // funcion para aplicar el filtro deseado dependiendo de la opcion que elija el usuario
    aplicarFiltro (imageData){
    
        // recorre la imagenData pixel por pixel aplicando el filtro
        for (let pixel = 0; pixel < imageData.data.length; pixel += 4) {
            let promedio = (imageData.data[pixel + 0] + imageData.data[pixel + 1] + imageData.data[pixel + 2])/3;
            // se lo aplico al pixel en la imageData
            imageData.data[ pixel + 0] = promedio; // rojo 
            imageData.data[ pixel + 1] = promedio; // verde 
            imageData.data[ pixel + 2] = promedio; // azul
        } // for
} // aplicarFiltro

} // fin de class del filtro escala de grises