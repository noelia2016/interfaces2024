class Rectangulo extends Figura {

    constructor(posX, posY, width, height, fill, context, estilo) 
    {
        super(posX, posY, width, height, fill, context, estilo);
    }

    // crea un rectangulo
    draw()
    {
        this.ctx.fillStyle = this.fill;
        this.ctx.beginPath();
        this.ctx.rect(this.posX, this.posY, this.width, this.height);
        this.ctx.fill();
        /*if (this.estilo)
            this.ctx.stroke();
        */
    }
}