// Obtén una referencia a los elementos HTML que quieres actualizar
const nombrePersonaje = document.getElementById('nombre-personaje');
const speciePersonaje = document.getElementById('specie-personaje');
const genderPersonaje = document.getElementById('gender-personaje');
const statusPersonaje = document.getElementById('status-personaje');
const planetPersonaje = document.getElementById('planet-personaje');
const locationPersonaje = document.getElementById('location-personaje');
const imagenPersonaje = document.getElementById('imagen-personaje');

// Obtén el primer personaje de la lista de datos
const character = dataRickAndMorty[17];

// Actualiza los elementos HTML con la información del primer personaje
nombrePersonaje.textContent = character.name;
speciePersonaje.textContent = character.species;
genderPersonaje.textContent = character.gender;
statusPersonaje.textContent = character.status;
planetPersonaje.textContent = character.origin.name;
locationPersonaje.textContent = character.location.name;
imagenPersonaje.src = character.image;

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