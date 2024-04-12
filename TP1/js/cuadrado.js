class Cuadrado extends Figure {
    constructor(posX, posY, fill, context, estilo) 
    {
        super(posX, posY, fill, context, estilo);
    }

    // crea un cuadrado
    draw()
    {
        this.ctx.fillStyle = this.fill;
        this.ctx.beginPath();
        this.ctx.rect(this.posX, this.posY, this.width, this.height);
        this.ctx.fill();
        if (this.estilo)
            this.ctx.stroke();
    }
}