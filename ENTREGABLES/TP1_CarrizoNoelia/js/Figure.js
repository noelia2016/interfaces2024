class Figure {
    constructor(posX, posY, fill, context) {
        this.nombre= '';
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.highlighted = false;
        this.highlightedStyle = '#140305'; // para el resalto del borde de la figura cuando esta selecionada

        this.context = context;
    }

    setNombre(nombre) {
        this.nombre = nombre;
    }

    getNombre() {
        return this.nombre;
    }

    setPosition(x, y) {
        this.posX = x;
        this.posY = y;
    }

    getPosition() {
        return {
            x: this.getPosX(),
            y: this.getPosY()
        };
    }

    getPosX() {
        return this.posX;
    }

    getPosY() {
        return this.posY;
    }

    
    setFill(fill) {
        this.fill = fill;
    }

    getFill() {
        return this.fill;
    }

    setHighlighted(value) {
        this.highlighted = value;
    }

    setHighlightedStyle(style) {
        this.highlightedStyle = style;
    }

    // metodo que tiene que redefinirse segun la figura
    draw() {
		// color de relleno de la figra
        this.context.fillStyle = this.fill;
    }

    // retorna si es punto interior de la figura
    isPointInside(x, y) { }
}