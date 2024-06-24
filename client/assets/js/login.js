

const Nombre = document.getElementById("nameInput");
const Contraseña = document.getElementById("passwordInput");

const iniciarSesion = async (req,res) =>{
    const data = {Nombre:`${Nombre.value}`, Contraseña:`${Contraseña.value}`}
    const peticion = await fetch("http://localhost:3000/login",{
        method:"POST",
        headers:{
        'Content-Type': 'application/json;charset=utf-8'},
        body:JSON.stringify(data)
    })
    const { token } = await peticion.json()
    localStorage.setItem("token",token)
    window.location.href = "http://127.0.0.1:5501/client/home.html"
}