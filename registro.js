document.addEventListener("DOMContentLoaded", function() {
    const loginform = document.getElementById("login-form");
    const usernameInput = document.getElementById("user-name");
    const emailImput = document.getElementById("email")
    const passwordInput = document.getElementById("password");
    const mensaje = document.getElementById("mensaje");
    const LoginButton = document.getElementById("Login");
  
    LoginButton.addEventListener("click", function() {
      const username = usernameInput.value.trim();
      const email = emailImput.value.trim();
      const  password = passwordInput.value;
  
      if (username === "" || email === "" || password === "") {
        mensaje.textContent = "Por favor, complete todos los campos.";
        return;
    } 
  
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      mensaje.textContent = "La dirección de correo no es válida.";
      return;
  }

    if (passwordInput.value.length < 8) {
      mensaje.textContent = "La contraseña debe tener al menos 8 caracteres.";
      return;
  }

  // Obtener la lista de usuarios del localStorage
  const userList = JSON.parse(localStorage.getItem("userList")) || [];

    // Verificar si el usuario ya está registrado
    const userExists = userList.some(user => user.email === email);
    if (userExists) {
        mensaje.textContent = "Este correo electrónico ya está registrado.";
        return;
    }

     // Agregar el nuevo usuario a la lista
     const newUser = { username, email, password };
     userList.push(newUser);


   // Guardar la lista actualizada en el localStorage
   localStorage.setItem("userList", JSON.stringify(userList));
  
  window.location.href = "./Iniciar Secion.html";
    });
  });