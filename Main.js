// Obtiene el contenedor para las tarjetas dinámicas
var container = document.getElementById("personajes-container");

dataRickAndMorty.forEach(function (personaje) {
    // Crea un nuevo elemento div para la tarjeta del personaje
    var tarjeta = document.createElement("div");
    tarjeta.className = "Personaje";

    // Crea el contenido de la tarjeta (imagen, nombre, etc.) basado en los datos del personaje
    tarjeta.innerHTML = `
        <div class="contenedor-verdeo">
            <div class="contenedor-verdec">
                <a href="./Personaje${personaje.id}.html">
                    <img src="${personaje.image}" alt="${personaje.name}">
                </a>
            </div>
            <div class="nameandfav">
                <div class="name"><h2>${personaje.name}</h2></div>
                <div class="estrella"></div>
            </div>
        </div>
    `;

    // Agrega la tarjeta al contenedor
    container.appendChild(tarjeta);
});

// Obtiene el elemento de entrada de búsqueda
var inputBusqueda = document.getElementById("barra-busqueda-input");

// Agrega un evento de escucha al elemento de entrada para realizar la búsqueda
inputBusqueda.addEventListener("input", function () {
    // Obtén el valor del input de búsqueda y conviértelo a minúsculas para hacer una búsqueda sin distinción entre mayúsculas y minúsculas
    var valorBusqueda = inputBusqueda.value.toLowerCase();

    // Obtén todas las tarjetas de personajes
    var tarjetas = document.getElementsByClassName("Personaje");

    // Itera sobre las tarjetas y muestra u oculta según la coincidencia con el valor de búsqueda
    for (var i = 0; i < tarjetas.length; i++) {
        var tarjeta = tarjetas[i];
        var nombrePersonaje = tarjeta.querySelector(".name h2").textContent.toLowerCase();
        if (nombrePersonaje.includes(valorBusqueda)) {
            tarjeta.style.display = "block"; // Muestra la tarjeta
        } else {
            tarjeta.style.display = "none"; // Oculta la tarjeta
        }
    }
});

var estrellas = document.getElementsByClassName("estrella");

for (var i = 0; i < estrellas.length; i++) {
    estrellas[i].addEventListener("click", function () {
        // Cambia las clases de la estrella (de vacía a rellena o viceversa)
        if (this.classList.contains("estrella-vacia")) {
            this.classList.remove("estrella-vacia");
            this.classList.add("estrella-rellena");
        } else {
            this.classList.remove("estrella-rellena");
            this.classList.add("estrella-vacia");
        }

        // Accede a la tarjeta correspondiente y obtén información relevante (por ejemplo, el nombre del personaje)
        var tarjeta = this.closest(".Personaje");
        var nombrePersonaje = tarjeta.querySelector(".name h2").textContent;

        // Almacena información en el almacenamiento local
        var favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        if (favoritos.includes(nombrePersonaje)) {
            favoritos = favoritos.filter(function (nombre) {
                return nombre !== nombrePersonaje;
            });
        } else {
            favoritos.push(nombrePersonaje);
        }
        localStorage.setItem("favoritos", JSON.stringify(favoritos));

        // Actualiza los personajes favoritos en la página Favoritos (Favorito.html)
        actualizarPersonajesFavoritos();

        
    });
}
