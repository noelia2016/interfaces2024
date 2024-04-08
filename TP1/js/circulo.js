
/** dibuja un circulo */
function Circle(x, y, radius) {

    this.x = (x === undefined) ? 0 : x;
    this.y = (y === undefined) ? 0 : y;
    this.radius = (radius === undefined) ? 0 : radius;
}

Circle.prototype.distance = function (circle) {
    
    if (circle !== undefined) {
        var dx = this.x - circle.x,
            dy = this.y - circle.y,
            circleRadius = circle.radius || 0;  // se le asigna el radio del círculo que mandamos, o cero si no la encuentra
        return (Math.sqrt(dx * dx + dy * dy) - (this.radius + circleRadius));
    }
};

Circle.prototype.fill = function (ctx) {
    if (ctx !== undefined) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.fill();
    }
    };
/*
    for(var i=0;i<4;i++){
        for(var j=0;j<3;j++){
            ctx.beginPath();
            var x              = 25+j*50;       // coordenada x
            var y              = 25+i*50;       // coordenada y
            var radius         = 20;            // radio del arco
            var startAngle     = 0;             // punto inicial del círculo
            var endAngle       = Math.PI+(Math.PI*j)/2; // punto final
            var anticlockwise  = i%2==0 ? false : true;
            ctx.arc(x,y,radius,startAngle,endAngle, anticlockwise);
            if (i>1){
                ctx.fill();
            } else {
                ctx.stroke();
            }
        }
    }*/