class Rectangulo extends Figura {

    constructor(posX, posY, width, height, fill, context, estilo) 
    {
        super(posX, posY, width, height, fill, context, estilo);
    }

    // crea un rectangulo
    draw()
    {
        // le da color al rectangulo
        this.ctx.fillStyle = this.fill;
        // Crea un nuevo trazado.
        this.ctx.beginPath();
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
        this.ctx.fill();
        if (this.estilo)
            // Dibuja la forma trazando su contorno.
            this.ctx.stroke();
        
    }
}