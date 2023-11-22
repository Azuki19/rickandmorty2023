
function mostrarMensajeEmergente(mensaje) {
    const mensajeEmergente = document.getElementById("mensajeEmergente");
    mensajeEmergente.textContent = mensaje;
    mensajeEmergente.style.display = "block";

    
    setTimeout(function () {
        mensajeEmergente.style.display = "none";
    }, 3000); // 3000 milisegundos = 3 segundos
}


function esCorreoValido(correo) {
    
    const expresionRegularCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresionRegularCorreo.test(correo);
}


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

    
    if (nuevoCorreo !== '' && !esCorreoValido(nuevoCorreo)) {
        mostrarMensajeEmergente('Por favor, ingresa un correo electrónico válido.');
        return;
    }

    
    if (nuevaContra !== '' && !esContrasenaValida(nuevaContra)) {
        mostrarMensajeEmergente('La contraseña debe tener al menos 8 caracteres.');
        return;
    }

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

    
    document.getElementById("cambiarUsuario").value = '';
    document.getElementById("cambiarCorreo").value = '';
    document.getElementById("cambiarContra").value = '';
}




const botonGuardar = document.getElementById("botonguardar");
botonGuardar.addEventListener("click", actualizarPerfil);

function obtenerDatosUsuario() {
    const usuarioActual = document.querySelector(".info h2");
    const correoActual = document.querySelector(".info p");
    const contrasenaActual = document.querySelector(".contrass");

    
    const activeUserEmail = sessionStorage.getItem('activeUser');
    const storedUserList = JSON.parse(localStorage.getItem("userList")) || [];

   
    const activeUser = storedUserList.find(user => user.email === activeUserEmail);

   
    if (activeUser) {
        usuarioActual.textContent = activeUser.username;
        correoActual.textContent = activeUser.email;
        contrasenaActual.textContent = activeUser.password;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    obtenerDatosUsuario();
});