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

// Función para actualizar el perfil
function actualizarPerfil() {
    // Obtener los valores actuales en la página
    const usuarioActual = document.querySelector(".info h2").textContent;
    const correoActual = document.querySelector(".info p").textContent;
    const contrasenaActual = document.querySelector(".contrass").textContent;

    // Obtener los nuevos valores desde los campos de entrada
    const nuevoUsuario = document.getElementById("cambiarUsuario").value;
    const nuevoCorreo = document.getElementById("cambiarCorreo").value;
    const nuevaContra = document.getElementById("cambiarContra").value;

    // Verificar si el campo de contraseña tiene al menos 8 caracteres
    if (nuevaContra !== '' && !esContrasenaValida(nuevaContra)) {
        mostrarMensajeEmergente('La contraseña debe tener al menos 8 caracteres.');
        return; // No actualizamos el perfil si la contraseña no es válida
    }

    // Verificar si el campo de correo contiene un correo electrónico válido
    if (nuevoCorreo !== '' && !esCorreoValido(nuevoCorreo)) {
        mostrarMensajeEmergente('Por favor, ingresa un correo electrónico válido.');
        return; // No actualizamos el perfil si el correo no es válido
    }

    // Actualizar los elementos en la página solo si los valores han cambiado
    if (nuevoUsuario !== '') {
        document.querySelector(".info h2").textContent = nuevoUsuario;
    }

    if (nuevoCorreo !== '') {
        document.querySelector(".info p").textContent = nuevoCorreo;
    }

    if (nuevaContra !== '') {
        document.querySelector(".contrass").textContent = nuevaContra;
    }

    // Restablecer los campos de entrada
    document.getElementById("cambiarUsuario").value = '';
    document.getElementById("cambiarCorreo").value = '';
    document.getElementById("cambiarContra").value = '';
}

// Agregar un controlador de eventos para el botón "Guardar"
const botonGuardar = document.getElementById("botonguardar");
botonGuardar.addEventListener("click", actualizarPerfil);

