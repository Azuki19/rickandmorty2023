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

// Función para obtener la lista de registros desde el localStorage
function obtenerListaRegistros() {
    const listaRegistros = JSON.parse(localStorage.getItem('listaRegistros')) || [];
    return listaRegistros;
}

// Función para realizar el hash de la contraseña
function hashContrasena(contrasena) {
    // Aquí puedes usar un algoritmo de hash seguro, como bcrypt
    // Este ejemplo utiliza un hash simple con btoa (Base64 encoding)
    return btoa(unescape(encodeURIComponent(contrasena)));
}

// Función para cargar la información del último usuario en el perfil
function cargarUltimoUsuario() {
    const listaRegistros = obtenerListaRegistros();
    if (listaRegistros.length > 0) {
        const ultimoRegistro = listaRegistros[listaRegistros.length - 1];
        document.querySelector(".info h2").textContent = ultimoRegistro.usuario;
        document.querySelector(".info p").textContent = ultimoRegistro.correo;
        document.querySelector(".contrass").textContent = "••••••••"; // Contraseña enmascarada
    }
}

// Función para actualizar el perfil y almacenar en localStorage
function actualizarPerfil() {
    // Obtener los nuevos valores desde los campos de entrada
    const nuevoUsuario = document.getElementById("cambiarUsuario").value;
    const nuevoCorreo = document.getElementById("cambiarCorreo").value;
    const nuevaContra = document.getElementById("cambiarContra").value;

    // ... (código de validación)

    // Obtener la lista actual de registros desde el Local Storage
    const listaRegistros = obtenerListaRegistros();

    // Crear un nuevo registro con la contraseña encriptada (hashed)
    const nuevoRegistro = {
        usuario: nuevoUsuario,
        correo: nuevoCorreo,
        contrasena: hashContrasena(nuevaContra)
    };

    // Agregar el nuevo registro a la lista
    listaRegistros.push(nuevoRegistro);

    // Almacenar la lista actualizada en el Local Storage
    localStorage.setItem('listaRegistros', JSON.stringify(listaRegistros));

    // Actualizar los elementos en la página solo si los valores han cambiado
    if (nuevoUsuario !== '') {
        document.querySelector(".info h2").textContent = nuevoUsuario;
    }

    if (nuevoCorreo !== '') {
        document.querySelector(".info p").textContent = nuevoCorreo;
    }

    // No mostramos la contraseña real, solo una máscara
    document.querySelector(".contrass").textContent = "••••••••";

    // Restablecer los campos de entrada
    document.getElementById("cambiarUsuario").value = '';
    document.getElementById("cambiarCorreo").value = '';
    document.getElementById("cambiarContra").value = '';
}

// Agregar un controlador de eventos para el botón "Guardar"
const botonGuardar = document.getElementById("botonguardar");
botonGuardar.addEventListener("click", actualizarPerfil);

// Cargar la información del último usuario al cargar la página
window.addEventListener("load", cargarUltimoUsuario);
