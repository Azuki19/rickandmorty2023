document.addEventListener("DOMContentLoaded", function() {
    var favoritesContainer = document.getElementById("favoritos-container");
    var activeUser = sessionStorage.getItem('activeUser');

    if (activeUser) {
        let favorites = JSON.parse(localStorage.getItem(`favorites_${activeUser}`)) || [];

        favorites.forEach(favorite => {
            const tarjeta = createCharacterCard(favorite);
            favoritesContainer.appendChild(tarjeta);
        });
    }
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
        var activeUser = sessionStorage.getItem('activeUser');

        removeFavorite(activeUser, characterId);
        tarjeta.remove();

        // Muestra en la página principal con estrella vacía
        showInMainWithEmptyStar(character);
    });

    return tarjeta;
}

function removeFavorite(user, id) {
    let favorites = JSON.parse(localStorage.getItem(`favorites_${user}`)) || [];
    favorites = favorites.filter(fav => fav.id !== id);
    localStorage.setItem(`favorites_${user}`, JSON.stringify(favorites));
}

function showInMainWithEmptyStar(character) {
    const container = document.getElementById("personajes-container");
    const tarjeta = createCharacterCardForMain(character);
    container.appendChild(tarjeta);
}

function createCharacterCardForMain(character) {
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
                <div class="estrella estrella-vacia" data-id="${character.id}"></div>
            </div>
        </div>
    `;

    var estrella = tarjeta.querySelector('.estrella');
    estrella.addEventListener('click', function (event) {
        event.stopPropagation();
        var characterId = estrella.getAttribute('data-id');
        var activeUser = sessionStorage.getItem('activeUser');

        // Añade a favoritos en la página principal
        addFavorite(activeUser, characterId, character.name, character.image);

        tarjeta.remove();
    });

    return tarjeta;
}
