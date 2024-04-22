class Filtro {

    /**
     * La propiedad filter de CSS aplica efectos gráficos como desenfoque o cambio de color a un elemento. Los filtros se usan comúnmente para ajustar la representación de imágenes, fondos y bordes.
     * @param {*} context 
     * @param {*} whidth 
     * @param {*} height 
     */
    constructor(context, whidth, height) {
        this.ctx = context;
        this.height = height;
        this.whidth = whidth;
    } // constructor

    // funcion para aplicar el filtro deseado dependiendo de la opcion que elija el usuario
    aplicarFiltro (imageData){

        // aca cada subclase implenta lo que hace su filtro sobre el imageData
    }

    // aplica el filtro y lo muestra en el canvas
    aplicaElFiltro(){

        // toma todo lo que hay en el canvas -- Devuelve un objeto ImageData que copia los datos de los píxeles del rectángulo especificado.
        let imageData = this.ctx.getImageData (0,0, this.whidth, this.height);

        // llama al filtro necesario
        this.aplicarFiltro(imageData);

        // lo muestro en el canvas luego de procesado el filtro -- Pone los datos de la imagen (de un objeto ImageData especificado) de nuevo en el canvas
        this.ctx.putImageData(0,0, this.whidth, this.height);

    } // aplicaElFiltro

}