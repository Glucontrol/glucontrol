

const Nombre = document.getElementById("nameInput");
const Contraseña = document.getElementById("passwordInput");

const iniciarSesion = async (req,res) =>{
    const data = {Nombre:`${Nombre.value}`, Contraseña:`${Contraseña.value}`}
    const respuesta = await fetch("http://localhost:3000/login",{
        method:"POST",
        headers:{
        'Content-Type': 'application/json;charset=utf-8'},
        body:JSON.stringify(data)
    })
    console.log(respuesta.ok)
    if (respuesta.ok){
        window.location.replace('./home.html');
    }
}