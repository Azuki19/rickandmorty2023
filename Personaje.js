
function isFavorite(id) {
    var activeUser = sessionStorage.getItem('activeUser');
    let favorites = JSON.parse(localStorage.getItem(`favorites_${activeUser}`)) || [];
    return favorites.some(fav => fav.id === id);
}


function addFavorite(activeUser, id, name, image) {
    let favorites = JSON.parse(localStorage.getItem(`favorites_${activeUser}`)) || [];
    favorites.push({ id, name, image });
    localStorage.setItem(`favorites_${activeUser}`, JSON.stringify(favorites));
}


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

        
        nombrePersonaje.textContent = character.name;
        speciePersonaje.textContent = character.species;
        genderPersonaje.textContent = character.gender;
        statusPersonaje.textContent = character.status;
        planetPersonaje.textContent = character.origin.name;
        locationPersonaje.textContent = character.location.name;

        const imagenPersonaje = document.getElementById('imagen-personaje');
        imagenPersonaje.src = character.image;
        imagenPersonaje.alt = character.name;

        
        const starIcon = document.getElementById('star-icon');

        
        if (isFavorite(characterId)) {
            starIcon.src = 'IMG/baseline_star_white_48dp.png'; // Cambia la imagen a la estrella rellena
        } else {
            starIcon.src = 'IMG/baseline_star_outline_white_48dp.png'; // Cambia la imagen a la estrella vacia
        }

        
        starIcon.addEventListener('click', function () {
            if (isFavorite(characterId)) {
                
                removeFavorite(sessionStorage.getItem('activeUser'), characterId);
                starIcon.src = 'IMG/baseline_star_outline_white_48dp.png'; 
            } else {
                
                const character = {
                    id: characterId,
                    name: nombrePersonaje.textContent,
                    image: imagenPersonaje.src
                };
                addFavorite(sessionStorage.getItem('activeUser'), characterId, character.name, character.image);
                starIcon.src = 'IMG/baseline_star_white_48dp.png'; 
            }
            
            location.reload();
        });
    } catch (error) {
        console.error("Error fetching character data:", error);
    }
}

fetchCharacterInfo();