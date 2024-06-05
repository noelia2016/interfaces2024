class Vida extends Elemento {

    /** elemento que le da una vida mas al personaje */
    constructor() {
        super();
        this.vida = document.createElement("div");
        this.vida.classList.add("nuevaVida");
        document.getElementById("contenedor").appendChild(this.vida);
    }

    status() {
        super.status();
    }


}