class Runner extends Personaje {

    constructor() {
        super();
        this.personaje = document.getElementById("personaje");
    }

    status() {
        this.personaje.getBoundingClientRect();
    }

    /** al personaje lo hace correr  */
    correr() {
        this.clean();
        this.personaje.classList.add("correr"); 
    }

    /** al personaje lo hace saltar  */
    saltar() {

        /** si el personaje esta corriendo le agrega la clase de saltar para que se muestre en la animacion  */
        if(this.personaje.classList.contains("correr")) {       
            this.clean(); 

            this.personaje.classList.add("saltar");

            this.personaje.addEventListener("animationend", () => {
                this.caer();
            });
        }
    }

    /** el personaje lo hace caer despues de saltar */
    caer() {

        this.clean();
        this.personaje.classList.add("caer");

        // despues que caiga sigue corriendo
        this.personaje.addEventListener("animationend", () => {
            this.correr();
        }); 
    }

    /**
     * remueve la clase que tiene el personaje para que deje hacer por unos segundos lo que esta haciendo
     */
    clean() {
        this.personaje.classList.remove("correr"); 
        this.personaje.classList.remove("saltar");
        this.personaje.classList.remove("caer"); 
        this.personaje.removeEventListener("animationend", () => {}); 
    }
}