class Pen {
    constructor(posX, posY, fill, context) {
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.context = context;
    }

    /**
     * Funcion que empieza a dibujar la linea
     */
    empezarDibujo() {

        let posicion = canvas.getBoundingClientRect();
        correccionX = posicion.x;
        correccionY = posicion.y;
        pintarLinea = true;
        lineas.push([]);
    };

    /**
     * Funcion que guarda la posicion de la nueva línea
     */
    guardarLinea() {

        lineas[lineas.length - 1].push({
            x: nuevaPosicionX,
            y: nuevaPosicionY
        });
    }

    /**
     * Funcion dibuja la linea
     */
    dibujarLinea(event) {

        event.preventDefault();
        if (pintarLinea) {
            // Estilos de linea
            context.lineJoin = ctx.lineCap = 'round';
            context.lineWidth = 10; // grosor de la linea
            // Color de la linea
            context.strokeStyle = '#fff';
            // Marca el nuevo punto
            if (event.changedTouches == undefined) {
                // Versión ratón
                nuevaPosicionX = event.layerX;
                nuevaPosicionY = event.layerY;
            } 
            // Guarda la linea
            guardarLinea();
            // Redibuja todas las lineas guardadas
            context.beginPath();
            lineas.forEach(function (segmento) {
                context.moveTo(segmento[0].x, segmento[0].y);
                segmento.forEach(function (punto, index) {
                    context.lineTo(punto.x, punto.y);
                });
            });
            context.stroke();
        }
    }

    /**
     * Funcion que deja de dibujar la linea
     */
    pararDibujar () {
        pintarLinea = false;
        guardarLinea();
    }

}