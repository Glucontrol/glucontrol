const Host = window.location.origin
const Nombre = document.getElementById("nameInput");
const Contraseña = document.getElementById("passwordInput");

const iniciarSesion = async (req,res) =>{
    const data = {Nombre:`${Nombre.value}`, Contraseña:`${Contraseña.value}`}
    const peticion = await fetch(`/.netlify/functions/index/login`,{
        method:"POST",
        headers:{
        'Content-Type': 'application/json;charset=utf-8'},
        body:JSON.stringify(data)
    })
    if (peticion.status == 200){
        console.log(peticion)
        const { token } = await peticion.json()
        localStorage.setItem("token",token)
        window.location.href = `./home`
    }else{
        alert('Algo salió mal intente de nuevo')
    }
}