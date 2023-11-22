const favoritesContainer = document.getElementById("favoritos-container");

document.addEventListener("DOMContentLoaded", function() {
    var activeUser = sessionStorage.getItem('activeUser');

    if (activeUser) {
        let favorites = JSON.parse(localStorage.getItem(`favorites_${activeUser}`)) || [];

        favorites.forEach(favorite => {
            const tarjeta = createCharacterCard(favorite);
            favoritesContainer.appendChild(tarjeta);
        });
    }

    var inputBusqueda = document.getElementById("barra-busqueda-input");

    inputBusqueda.addEventListener("input", function() {
        var valorBusqueda = inputBusqueda.value.toLowerCase();
        var tarjetas = document.getElementsByClassName("Personaje");

        for (var i = 0; i < tarjetas.length; i++) {
            var tarjeta = tarjetas[i];
            var nombrePersonaje = tarjeta.querySelector(".name h2").textContent.toLowerCase();
            if (nombrePersonaje.includes(valorBusqueda)) {
                tarjeta.style.display = "block";
            } else {
                tarjeta.style.display = "none";
            }
        }
    });
});

function createCharacterCard(character) {
    const tarjeta = document.createElement("div");
    tarjeta.className = "Personaje";

    tarjeta.innerHTML = `
        <div class="contenedor-verdeo">
            <div class="contenedor-verdec">
                <a href="./Personaje.html?id=${character.id}">
                    <img src="${character.image}" alt="${character.name}">
                </a>
            </div>
            <div class="nameandfav">
                <div class="name"><h2>${character.name}</h2></div>
                <div class="estrella estrella-rellena" data-id="${character.id}"></div>
            </div>
        </div>
    `;

    var estrella = tarjeta.querySelector('.estrella');
    estrella.addEventListener('click', function (event) {
        event.stopPropagation();
        var characterId = estrella.getAttribute('data-id');

        removeFavorite(activeUser, characterId);
        tarjeta.remove();
    });

    return tarjeta;
}

function removeFavorite(user, id) {
    let favorites = JSON.parse(localStorage.getItem(`favorites_${user}`)) || [];
    favorites = favorites.filter(fav => fav.id !== id);
    localStorage.setItem(`favorites_${user}`, JSON.stringify(favorites));
}
