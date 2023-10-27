
var container = document.getElementById("personajes-container");

dataRickAndMorty.forEach(function (personaje) {

    var tarjeta = document.createElement("div");
    tarjeta.className = "Personaje";

    
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

   
    container.appendChild(tarjeta);
});


var inputBusqueda = document.getElementById("barra-busqueda-input");

inputBusqueda.addEventListener("input", function () {
    
    var valorBusqueda = inputBusqueda.value.toLowerCase();

    
    var tarjetas = document.getElementsByClassName("Personaje");

    // ocultar tarjetas segun la busqueda
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

        
    });
}
