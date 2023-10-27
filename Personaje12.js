// Obtén una referencia a los elementos HTML que quieres actualizar
const nombrePersonaje = document.getElementById('nombre-personaje');
const speciePersonaje = document.getElementById('specie-personaje');
const genderPersonaje = document.getElementById('gender-personaje');
const statusPersonaje = document.getElementById('status-personaje');
const planetPersonaje = document.getElementById('planet-personaje');
const locationPersonaje = document.getElementById('location-personaje');
const imagenPersonaje = document.getElementById('imagen-personaje');

// Obtén el primer personaje de la lista de datos
const character = dataRickAndMorty[11];

// Actualiza los elementos HTML con la información del primer personaje
nombrePersonaje.textContent = character.name;
speciePersonaje.textContent = character.species;
genderPersonaje.textContent = character.gender;
statusPersonaje.textContent = character.status;
planetPersonaje.textContent = character.origin.name;
locationPersonaje.textContent = character.location.name;
imagenPersonaje.src = character.image;