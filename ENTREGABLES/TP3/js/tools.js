// selector
var menu = document.querySelector('.hamburger');

// method que se ejecuta al activarse el menu hamburguesa
function toggleMenu(event) {
	this.classList.toggle('is-active');
	document.querySelector(".menuppal").classList.toggle("is_active");
	event.preventDefault();
}

// event para que el menu se despliegue
menu.addEventListener('click', toggleMenu, false);

