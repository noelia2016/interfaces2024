class Bonus extends Elemento {


    constructor() {
        super();
        this.bonus = document.createElement("div");
        this.bonus.classList.add("bonus");
        document.getElementById("contenedor").appendChild(this.bonus);

        // Genero altura y rotación aleatorias
        const randomRotation = Math.floor(Math.random() * 40) - 15 + "deg";

        // Aplico rotación aleatorias al bonus
        this.bonus.style.transform = `rotate(${randomRotation})`;

    }

    status() {
        super.status();
    }
}