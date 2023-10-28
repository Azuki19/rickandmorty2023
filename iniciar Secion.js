document.addEventListener("DOMContentLoaded", function() {
    const loginform = document.getElementById("login-form");
    const usernameInput = document.getElementById("user-name");  
    const passwordInput = document.getElementById("password");
    const mensaje = document.getElementById("mensaje");
    const LoginButton = document.getElementById("Login");
  
    LoginButton.addEventListener("click", function() {
      const username = usernameInput.value.trim();    
      const  password = passwordInput.value;
  
      if (username === "" || password === "") {
        mensaje.textContent = "Por favor, complete todos los campos.";
        return;
    } 
  
    if (passwordInput.value.length < 8) {
      mensaje.textContent = "La contraseña debe tener al menos 8 caracteres.";
      return;
  }
  
  window.location.href = "./Main.html";
    });
  });