class Figura {
    
    constructor(posX, posY, width, height, fill, context, estilo)
    {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.fill = fill;  // le da color a la figura
        this.ctx = context;
        this.estilo = estilo;
    }

    draw()
    {
        // dibuja cada uno segun su tipo de figura
    }

    /** muerve la figura a un punto especifico */
    moveTo(posX, posY)
    {
        this.posX = posX;
        this.posY = posY;
    }

    // le da estilo a la figura
    selected(estilo)
    {
        this.estilo = estilo;
    }

    /** setea la posicion  de la figura*/
    setPosicion(x, y) {
        this.posX = x;
        this.posY = y;
    }

    // retona la posicion x e y
    getPosition() {
        return {
            x: this.getPosX(),
            y: this.getPosY(),
        }
    }

    // retona la posicion x
    getPosX() {
        return this.posX;
    }

    // retona la posicion x
    getPosY() {
        return this.posY;
    }

    // retona la posicion x
    isPointInside(x, y) {
        // console.log(this.id);
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radio;
    }
}