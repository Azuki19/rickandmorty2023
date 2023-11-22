var container = document.getElementById("personajes-container");

async function fetchRickAndMorty() {
    try {
        const response = await fetch("https://rickandmortyapi.com/api/character");
        const json = await response.json();

        const data = json.results;
        renderCharacters(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function renderCharacters(data) {
    data.forEach(function (personaje) {
        var tarjeta = document.createElement("div");
        tarjeta.className = "Personaje";

        tarjeta.addEventListener('click', function () {
            window.location.href = `./Personaje.html?id=${personaje.id}`;
        });

        tarjeta.innerHTML = `
        <div class="contenedor-verdeo">
            <div class="contenedor-verdec">
            <a href="./Personaje.html?id=${personaje.id}">
            <img src="${personaje.image}" alt="${personaje.name}">
        </a>
            </div>
            <div class="nameandfav">
                <div class="name"><h2>${personaje.name}</h2></div>
                <div class="estrella estrella-vacia"></div>
            </div>
        </div>
    `;

    container.appendChild(tarjeta);

    var estrella = tarjeta.querySelector('.estrella');
    estrella.addEventListener('click', function () {
        if (estrella.classList.contains("estrella-vacia")) {
            estrella.classList.remove("estrella-vacia");
            estrella.classList.add("estrella-rellena");
        } else {
            estrella.classList.remove("estrella-rellena");
            estrella.classList.add("estrella-vacia");
        }
    });
});
}

fetchRickAndMorty();


var inputBusqueda = document.getElementById("barra-busqueda-input");

inputBusqueda.addEventListener("input", function () {
    var valorBusqueda = inputBusqueda.value.toLowerCase();
    var tarjetas = document.getElementsByClassName("Personaje");

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