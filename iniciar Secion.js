document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form");
    const usernameInput = document.getElementById("user-name");
    const passwordInput = document.getElementById("password");
    const rememberCheckbox = document.getElementById("Re");
    const mensaje = document.getElementById("mensaje");
    const loginButton = document.getElementById("Login");

    loginButton.addEventListener("click", function() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        if (username === "" || password === "") {
            mensaje.textContent = "Por favor, complete todos los campos.";
            return;
        }

        if (password.length < 8) {
            mensaje.textContent = "La contraseña debe tener al menos 8 caracteres.";
            return;
        }

        // Obtener la lista de usuarios del localStorage
        const userList = JSON.parse(localStorage.getItem("userList")) || [];

        // Buscar el usuario en la lista
        const userData = userList.find(user => user.username === username && user.password === password);

        if (userData) {
            mensaje.textContent = "Inicio de sesión exitoso. Redirigiendo...";

            // Establece al usuario como activo
            sessionStorage.setItem('activeUser', userData.email);

            // Verifica si el usuario ha seleccionado "Recordar"
            if (rememberCheckbox.checked) {
                localStorage.setItem("storedUsername", username);
                localStorage.setItem("storedPassword", password);
            } else {
                localStorage.removeItem("storedUsername");
                localStorage.removeItem("storedPassword");
            }

            window.location.href = "./Main.html";
        } else {
            mensaje.textContent = "Usuario o contraseña incorrectos. Inténtalo de nuevo.";
        }
    });

   const openModalLink = document.getElementById("open-modal-link");
    const modal = document.getElementById("modal");
    const overlay = document.querySelector(".overlay");
    const closeModalButton = document.getElementById("close-modal-button");

    openModalLink.addEventListener("click", function(event) {
        event.preventDefault();
        modal.style.display = "block";        
    });

    closeModalButton.addEventListener("click", function() {
        modal.style.display = "none";        
    });

    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";            
        }
    });

    const enviarButton = document.getElementById("enviar-button");
    const modalMessage = document.getElementById("modal-message");

    enviarButton.addEventListener("click", function() {
        modalMessage.textContent = "Código enviado. Por favor revisa tu correo";
        
    });
});