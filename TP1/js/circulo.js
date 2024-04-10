class Circulo extends Figura {
    constructor(posX, posY, width, height, fill, context, estilo, radio) 
    {
        super(posX, posY, width, height, fill, context, estilo);
        this.radius=radio;
    }

    // dibujar un circulo
    draw()
    {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
              ctx.beginPath();
              const x = 25 + j * 50; // Coordenada x
              const y = 25 + i * 50; // Coordenada y
              const radius = 10; // Radio del Arco
              const startAngle = 0; // Punto inicial del Círculo
              const endAngle = Math.PI + (Math.PI * j) / 2; // Punto final del Círculo
              const counterclockwise = i % 2 !== 0; // En el sentido de las agujas del reloj o en sentido contrario
      
              ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);
              ctx.fill();
            }
        }
    }
}