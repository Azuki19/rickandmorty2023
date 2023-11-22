// Función para mostrar el mensaje emergente
function mostrarMensajeEmergente(mensaje) {
    const mensajeEmergente = document.getElementById("mensajeEmergente");
    mensajeEmergente.textContent = mensaje;
    mensajeEmergente.style.display = "block";

    // Ocultar el mensaje después de unos segundos (puedes ajustar el tiempo)
    setTimeout(function () {
        mensajeEmergente.style.display = "none";
    }, 3000); // 3000 milisegundos = 3 segundos
}

// Función para validar un correo electrónico
function esCorreoValido(correo) {
    // Expresión regular para validar correos electrónicos
    const expresionRegularCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresionRegularCorreo.test(correo);
}

// Función para validar una contraseña
function esContrasenaValida(contrasena) {
    return contrasena.length >= 8;
}

function actualizarPerfil() {
    const usuarioActualElement = document.querySelector(".info h2");
    const correoActualElement = document.querySelector(".info p");
    const contrasenaActualElement = document.querySelector(".contrass");

    const usuarioActual = usuarioActualElement.textContent;
    const correoActual = correoActualElement.textContent;
    const contrasenaActual = contrasenaActualElement.textContent;

    const nuevoUsuario = document.getElementById("cambiarUsuario").value;
    const nuevoCorreo = document.getElementById("cambiarCorreo").value;
    const nuevaContra = document.getElementById("cambiarContra").value;

    if (nuevoUsuario !== '') {
        usuarioActualElement.textContent = nuevoUsuario;
    }
    if (nuevoCorreo !== '') {
        correoActualElement.textContent = nuevoCorreo;
    }
    if (nuevaContra !== '') {
        contrasenaActualElement.textContent = nuevaContra;
    }

    const activeUserEmail = sessionStorage.getItem('activeUser');
    const storedUserList = JSON.parse(localStorage.getItem("userList")) || [];

    const activeUserIndex = storedUserList.findIndex(user => user.email === activeUserEmail);

    if (activeUserIndex !== -1) {
        const currentUser = storedUserList[activeUserIndex];

        if (nuevoUsuario !== '') {
            currentUser.username = nuevoUsuario;
        }
        if (nuevoCorreo !== '') {
            currentUser.email = nuevoCorreo;
        }
        if (nuevaContra !== '') {
            currentUser.password = nuevaContra;
        }

        storedUserList[activeUserIndex] = currentUser;
        localStorage.setItem("userList", JSON.stringify(storedUserList));
    }

    // Restablecer los campos de entrada
    document.getElementById("cambiarUsuario").value = '';
    document.getElementById("cambiarCorreo").value = '';
    document.getElementById("cambiarContra").value = '';
}


// Agregar un controlador de eventos para el botón "Guardar"
const botonGuardar = document.getElementById("botonguardar");
botonGuardar.addEventListener("click", actualizarPerfil);

// Función para obtener los datos del usuario del LocalStorage
function obtenerDatosUsuario() {
    const usuarioActual = document.querySelector(".info h2");
    const correoActual = document.querySelector(".info p");
    const contrasenaActual = document.querySelector(".contrass");

    // Obtener datos del usuario que ha iniciado sesión
    const activeUserEmail = sessionStorage.getItem('activeUser');
    const storedUserList = JSON.parse(localStorage.getItem("userList")) || [];

    // Buscar al usuario activo en la lista de usuarios almacenados
    const activeUser = storedUserList.find(user => user.email === activeUserEmail);

    // Mostrar los datos del usuario si están disponibles en el sessionStorage y la lista de usuarios
    if (activeUser) {
        usuarioActual.textContent = activeUser.username;
        correoActual.textContent = activeUser.email;
        contrasenaActual.textContent = activeUser.password;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    obtenerDatosUsuario();
});