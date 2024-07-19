const crearArt = async (req,res) =>{
    const Titulo = document.getElementById("tituloInput")
    const Contenido = document.getElementById("contenidoInput")
    const Autor = "Yo"
    const Info = {Titulo:`${Titulo.value}`,Contenido:`${Contenido.value}`,Autor:``}
    const token = localStorage.getItem('token')
    const peticion = await fetch("http://localhost:3000/articulo",{method:"POST",
        headers: {
            token,
            'Content-Type': 'application/json'},
        body: JSON.stringify(Info)
    })
    console.log(peticion)
}