class Ellipse extends Figure {
    constructor(posX, posY, width, height, fill, context)
    {
        super(posX, posY, fill, context);
        this.nombre = 'Ellipse';
        this.width = width;
        this.height = height;
    }

    draw()
    {
        this.context.beginPath();
        this.context.ellipse(this.posX, this.posY, this.width/ 2, this.height/ 2, 0, 0, 2 * Math.PI);
        this.context.fill();
        if (this.estilo)
            this.context.stroke();    
            this.context.closePath();    
    }   

    isPointInside(x, y) {
        return !(x < this.posX || x > this.posX + this.width || y < this.posY || y > this.posY + this.height);
    }    
    
}