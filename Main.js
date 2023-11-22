var container = document.getElementById("personajes-container");

async function fetchRickAndMorty() {
    try {
        const response = await fetch("https://rickandmortyapi.com/api/character");
        const json = await response.json();

        const data = json.results;
        renderCharacters(data);
        updateStarStatus();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function toggleFavoriteStatus(activeUser, characterId, estrella, name, image) {
    if (isFavorite(characterId)) {
        removeFavorite(activeUser, characterId);
        estrella.classList.remove("estrella-rellena");
        estrella.classList.add("estrella-vacia");
    } else {
        addFavorite(activeUser, characterId, name, image);
        estrella.classList.remove("estrella-vacia");
        estrella.classList.add("estrella-rellena");
    }
}

function renderCharacters(data) {
    data.forEach(function (personaje) {
        var tarjeta = document.createElement("div");
        tarjeta.className = "Personaje";

        tarjeta.innerHTML = `
        <div class="contenedor-verdeo">
            <div class="contenedor-verdec">
                <a href="./Personaje.html?id=${personaje.id}">
                    <img src="${personaje.image}" alt="${personaje.name}">
                </a>
            </div>
            <div class="nameandfav">
                <div class="name"><h2>${personaje.name}</h2></div>
                <div class="estrella ${isFavorite(personaje.id) ? 'estrella-rellena' : 'estrella-vacia'}" data-id="${personaje.id}"></div>
            </div>
        </div>
        `;

        container.appendChild(tarjeta);

        var estrella = tarjeta.querySelector('.estrella');
        estrella.addEventListener('click', function (event) {
            event.stopPropagation();
            var characterId = estrella.getAttribute('data-id');
            var activeUser = sessionStorage.getItem('activeUser');
            toggleFavoriteStatus(activeUser, characterId, estrella, personaje.name, personaje.image);
        });

        tarjeta.addEventListener('click', function () {
            window.location.href = `./Personaje.html?id=${personaje.id}`;
        });
    });
}

function updateStarStatus() {
    var activeUser = sessionStorage.getItem('activeUser');
    var estrellas = document.querySelectorAll('.estrella');
    estrellas.forEach(function (estrella) {
        var characterId = estrella.getAttribute('data-id');
        if (isFavorite(characterId)) {
            estrella.classList.remove("estrella-vacia");
            estrella.classList.add("estrella-rellena");
        }
    });
}


function addFavorite(user, id, name, image) {
    let favorites = JSON.parse(localStorage.getItem(`favorites_${user}`)) || [];
    const exists = favorites.some(fav => fav.id === id);
    if (!exists) {
        favorites.push({ id, name, image });
        localStorage.setItem(`favorites_${user}`, JSON.stringify(favorites));
    }
}

function removeFavorite(user, id) {
    let favorites = JSON.parse(localStorage.getItem(`favorites_${user}`)) || [];
    favorites = favorites.filter(fav => fav.id !== id);
    localStorage.setItem(`favorites_${user}`, JSON.stringify(favorites));
}

function isFavorite(id) {
    var activeUser = sessionStorage.getItem('activeUser');
    let favorites = JSON.parse(localStorage.getItem(`favorites_${activeUser}`)) || [];
    return favorites.some(fav => fav.id === id);
}

fetchRickAndMorty();
