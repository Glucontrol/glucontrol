const Nombre = document.getElementById("nameInput");
const Contraseña = document.getElementById("passwordInput");

const iniciarSesion = async (req,res) =>{
    document.getElementById("login").outerHTML = `
    <button type="button" class="btn btn-primary w-20 d-flex rounded-4 mt-2" onclick="iniciarSesion()" id="login">
    <span class="visually-hidden" role="status">Cargando...</span>
    <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
    </button>`
    const data = {Nombre:`${Nombre.value}`, Contraseña:`${Contraseña.value}`}
    const peticion = await fetch(`http://localhost:8080/login`,{
        method:"POST",
        headers:{
        'Content-Type': 'application/json;charset=utf-8'},
        body:JSON.stringify(data)
    })
    if (peticion.status == 200){
        const { token } = await peticion.json()
        localStorage.setItem("token",token)
        window.location.href = "home.html"
    }
    else{
        alert('Algo salió mal,intentelo de nuevo.')
        document.getElementById("login").outerHTML = `<button type="button" class="btn btn-primary w-20 d-flex rounded-4 mt-2" onclick="iniciarSesion()" id = "login">Iniciar Sesión</button>`
    }
}