const Tipo = document.getElementById("tipoInput");
const Dosis = document.getElementById("dosisInput");
const Fecha = document.getElementById("fechaInput");
const Via = document.getElementById("viaInput");
const Accion = document.getElementById("accionInput");
const Adicional = document.getElementById("adicionalInput");


const verRegistros = async(req,res) =>{
    const response = await fetch(`/.netlify/functions/index/insulina`)
    console.log(response)
}
const guardarRegistro = async(req,res) =>{
    console.log("Se envió el registro")
    const token = await localStorage.getItem("token")
    const data = {Tipo:`${Tipo.value}`, Dosis:`${Dosis.value}`,Fecha:`${Fecha.value}`,Via:`${Via.value}`,Accion:`${Accion.value}`,Adicional:`${Adicional.value}`}
    console.log(JSON.stringify(data) )
    const peticion = await fetch(`/.netlify/functions/index/insulina`,{method:"POST",
        headers: {
            'Content-Type': 'application/json',
            token:`${token}`},
        body: JSON.stringify(data)
    })
    const respuesta = await peticion.json()
    console.log(respuesta)
}
