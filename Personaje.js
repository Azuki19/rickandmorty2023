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
    } catch (error) {
        console.error("Error fetching character data:", error);
    }
}

fetchCharacterInfo();

// Obtén una referencia al elemento de la estrella
const starIcon = document.getElementById('star-icon');

// Agrega un evento de clic a la estrella
starIcon.addEventListener('click', function () {
    // Obtén la ruta de la imagen actual de la estrella
    const currentImage = starIcon.src;

    // Define las rutas de las imágenes de la estrella llena y la estrella outline
    const starOutlineImage = 'IMG/baseline_star_outline_white_48dp.png';
    const starFilledImage = 'IMG/baseline_star_white_48dp.png'; // Reemplaza 'IMG/star_filled.png' con la ruta de tu imagen de estrella rellena

    // Verifica si la imagen actual es la de la estrella outline
    if (currentImage.endsWith(starOutlineImage)) {
        // Cambia la imagen a la estrella rellena
        starIcon.src = starFilledImage;
    } else {
        // Si no es la estrella outline, cambia la imagen a la estrella outline
        starIcon.src = starOutlineImage;
    }
});
