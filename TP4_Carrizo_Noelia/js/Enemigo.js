class Enemigo extends Personaje {


    constructor() {
        super();
        
        this.enemigo = document.createElement("div");
        this.enemigo.classList.add("enemigo");
        document.getElementById("contenedor").appendChild(this.enemigo);


    }

    status() {
        super.status();
    }
}