class Square extends Figure {

    constructor(posX, posY, width, fill, context) {
        super(posX, posY, fill, context);
        this.nombre = 'Cuadrado';
        this.width = width;

    }

    draw() {
        super.draw();
        this.context.fillRect(this.posX, this.posY, this.width, this.width);

        if (this.highlighted === true) {
            this.context.strokeStyle = this.highlightedStyle;
            this.context.lineWidth = 5;
            this.context.strokeRect(this.posX, this.posY, this.width, this.width);
        }
    }

    getWidth() {
        return this.width;
    }

    isPointInside(x, y) {
        return !(x < this.posX || x > this.posX + this.width || y < this.posY || y > this.posY + this.width);
    }
}