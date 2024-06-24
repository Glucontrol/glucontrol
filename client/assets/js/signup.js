const registrarse = async (req,res) =>{
    let Nombre = document.getElementById("nameInput")
    let Contrasenia = document.getElementById("passwordInput")
    let Email = document.getElementById("emailInput")
    const Info = {Nombre:`${Nombre.value}`,Contraseña:`${Contrasenia.value}`,Email:`${Email.value}`}
    console.log(Info)

    const peticion = await fetch("http://localhost:3000/register",{
        method: "POST",
        headers:{
            'Content-Type': 'application/json;charset=utf-8'
        },
        body:JSON.stringify(Info)
    })
    alert(JSON.stringify(peticion))
}