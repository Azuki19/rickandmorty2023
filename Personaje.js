// Función para verificar si un personaje es favorito
function isFavorite(id) {
    var activeUser = sessionStorage.getItem('activeUser');
    let favorites = JSON.parse(localStorage.getItem(`favorites_${activeUser}`)) || [];
    return favorites.some(fav => fav.id === id);
}

// Función para agregar un personaje como favorito
function addFavorite(activeUser, id, name, image) {
    let favorites = JSON.parse(localStorage.getItem(`favorites_${activeUser}`)) || [];
    favorites.push({ id, name, image });
    localStorage.setItem(`favorites_${activeUser}`, JSON.stringify(favorites));
}

// Función para quitar un personaje de la lista de favoritos
function removeFavorite(activeUser, id) {
    let favorites = JSON.parse(localStorage.getItem(`favorites_${activeUser}`)) || [];
    let updatedFavorites = favorites.filter(fav => fav.id !== id);
    localStorage.setItem(`favorites_${activeUser}`, JSON.stringify(updatedFavorites));
}

const urlParams = new URLSearchParams(window.location.search);
const characterId = urlParams.get('id');

const nombrePersonaje = document.getElementById('nombre-personaje');
const speciePersonaje = document.getElementById('specie-personaje');
const genderPersonaje = document.getElementById('gender-personaje');
const statusPersonaje = document.getElementById('status-personaje');
const planetPersonaje = document.getElementById('planet-personaje');
const locationPersonaje = document.getElementById('location-personaje');
const imagenPersonaje = document.getElementById('imagen-personaje');

const characterURL = `https://rickandmortyapi.com/api/character/${characterId}`;

async function fetchCharacterInfo() {
    try {
        const response = await fetch(characterURL);
        const character = await response.json();

        // Actualizar elementos HTML con la información del personaje
        nombrePersonaje.textContent = character.name;
        speciePersonaje.textContent = character.species;
        genderPersonaje.textContent = character.gender;
        statusPersonaje.textContent = character.status;
        planetPersonaje.textContent = character.origin.name;
        locationPersonaje.textContent = character.location.name;

        const imagenPersonaje = document.getElementById('imagen-personaje');
        imagenPersonaje.src = character.image;
        imagenPersonaje.alt = character.name;

        // Obtener referencia al elemento de la estrella
        const starIcon = document.getElementById('star-icon');

        // Verificar si el personaje ya es favorito y actualizar la estrella en consecuencia
        if (isFavorite(characterId)) {
            starIcon.src = 'IMG/baseline_star_white_48dp.png'; // Cambia la imagen a la estrella rellena
        } else {
            starIcon.src = 'IMG/baseline_star_outline_white_48dp.png'; // Cambia la imagen a la estrella outline
        }

        // Agregar evento de clic a la estrella para agregar o quitar el personaje de favoritos
        starIcon.addEventListener('click', function () {
            if (isFavorite(characterId)) {
                // Si el personaje ya es favorito, quitarlo de la lista de favoritos
                removeFavorite(sessionStorage.getItem('activeUser'), characterId);
                starIcon.src = 'IMG/baseline_star_outline_white_48dp.png'; // Cambia la imagen a la estrella outline
            } else {
                // Si el personaje no es favorito, agregarlo a la lista de favoritos
                const character = {
                    id: characterId,
                    name: nombrePersonaje.textContent,
                    image: imagenPersonaje.src
                };
                addFavorite(sessionStorage.getItem('activeUser'), characterId, character.name, character.image);
                starIcon.src = 'IMG/baseline_star_white_48dp.png'; // Cambia la imagen a la estrella rellena
            }
            // Recargar la página después de agregar/quitar de favoritos para reflejar los cambios en la lista de favoritos
            location.reload();
        });
    } catch (error) {
        console.error("Error fetching character data:", error);
    }
}

fetchCharacterInfo();