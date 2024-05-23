// method que se ejecuta al activarse el click del menu
function validarForm(event) {

	event.preventDefault();

    // tomo los campos ingresados en el formulario
    valor = document.getElementById("campo").value;
    if( valor == null || valor.length == 0 || /^\s+$/.test(valor) ) { 
        return false;
    }

    // valor para validar fecha
    fechaDesde = document.getElementById("fechaDesde").value;

    if ( !(/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[1-9]|2[1-9])$/.test(fechaDesde))){  
        return false;
    }

    // Para validar un checkbox, puede añadirse este código:

    tipo = document.getElementById("tipo");
    if ( !(tipo.checked ))  
        return false;
}


const btnEnviar = document.getElementById('botonRegistro');

// event para que el formulario se valide
const validación = (e) => {

  e.preventDefault(); // prevengo que el formulario se envie
  
  // TOMO LOS DATOS INGRESADOS EN EL FORM
  const nombre = document.getElementById('nombre');
  const email = document.getElementById('email');
  const tipo = document.getElementById("tipo");

  if (nombre.value === "") {
    alert("Por favor, escribe su nombre.");
    nombre.focus();
    return false;
  }
    
  if (email.value === "") {
    alert("Por favor, escribe tu correo electrónico");
    email.focus();
    return false;
  }

  if (!validarEmail(email.value)) {
    alert("Por favor, escribe un correo electrónico válido");
    emailAddress.focus();
    return false;
  }

  // Para validar un checkbox, puede añadirse este código:
  if ( !(tipo.checked ))  
      return false;
  
  return true; //Se pueden enviar los datos del formulario al servidor
}


function validarEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

btnEnviar.addEventListener('click', validate);