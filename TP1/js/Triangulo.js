class Triangulo extends Figure {

    constructor(posX, posY, fill, context, estilo) 
    {
        super(posX, posY, fill, context, estilo);
    }

    // crea un triangulo
    draw()
    {
        this.ctx.fillStyle = this.fill;
        this.ctx.beginPath();
        this.ctx.moveTo(75, 50);
        this.ctx.lineTo(100, 75);
        this.ctx.lineTo(100, 25);
        this.ctx.fill();
        if (this.estilo)
            this.ctx.stroke();       
    }
}