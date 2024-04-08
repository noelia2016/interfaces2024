class Figura {
    
    constructor(posX, posY, width, height, fill, context, estilo)
    {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.fill = fill; 
        this.ctx = context;
        this.estilo = estilo;
    }

    draw()
    {
        // Nothing to do
    }

    moveTo(posX, posY)
    {
        this.posX = posX;
        this.posY = posY;
    }

    selected(estilo)
    {
        this.estilo = estilo;
    }

    setPosicion(x, y) {
        this.posX = x;
        this.posY = y;
    }

    getPosition() {
        return {
            x: this.getPosX(),
            y: this.getPosY(),
        }
    }

    getPosX() {
        return this.posX;
    }

    getPosY() {
        return this.posY;
    }

    isPointInside(x, y) {
        // console.log(this.id);
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radio;
    }
}