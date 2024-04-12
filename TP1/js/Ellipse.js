class Ellipse extends Figure {
    constructor(posX, posY, fill, context, estilo)
    {
        super(posX, posY, fill, context, estilo);
    }

    draw()
    {
        this.ctx.fillStyle = this.fill;
        this.ctx.beginPath();
        this.ctx.ellipse(this.posX, this.posY, this.width / 2, this.height / 2, 0, 0, 2 * Math.PI);
        this.ctx.fill();
        if (this.estilo)
            this.ctx.stroke();        
    }
}