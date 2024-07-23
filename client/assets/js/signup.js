const registrarse = async (req,res) =>{
    let Nombre = document.getElementById("nameInput")
    let Contrasenia = document.getElementById("passwordInput");
    let Email = document.getElementById("emailInput")
    const Info = {Nombre:`${Nombre.value}`,Contraseña:`${Contrasenia.value}`,Email:`${Email.value}`}
    console.log(Info)

    const peticion = await fetch(`/.netlify/functions/index/register`,{
        method: "POST",
        headers:{
            'Content-Type': 'application/json;charset=utf-8'
        },
        body:JSON.stringify(Info)
    })
    if (peticion.ok){
        window.location.href = "login"
    }else{
        alert('Algo salió mal intente de nuevo')
    }
}