function renderForm() {
    let container = document.getElementById("container");
    const loginForm = document.createElement("div");
    loginForm.innerHTML = `
    <div class="center-box">
        
        <div class="login-container">
            
            <h2>INICIAR SESIÓN</h2>
            <form>

                <div class="primercontenedor">

                    <div class="todocont">
                        <div class="imgen"> <img src="IMG INICIO Y REGISTRO/usuario-de-perfil.png" class="foto"> </div> <gap> </gap> <div class="diveentrada">  <input type="text" placeholder="Username"> </div>
                    </div>

                     <div class="todocont">    
                        <div class="imagen"> <img src="IMG INICIO Y REGISTRO/candado.png" class="foto"> </div> <gap> </gap> <div class="diveentrada"> <input type="password" placeholder="Password"> </div>
                    </div>

                    <div class="botonon-c">
                        <button type="Login"> <a href="./Main.html" target="_blank"> Iniciar Sesión</a></button> 
                    </div>
                </div>

                <div class="abajo">
                    <div class="forgot"><a href="">Forgot password?</a></div>
                    <div class="remember">Remember</div>
                    <div class="box"><input type="checkbox" id="Re"></div>
                </div>


            </form>
        </div>
    </div> `

container.appendChild(loginForm);
}

renderForm()