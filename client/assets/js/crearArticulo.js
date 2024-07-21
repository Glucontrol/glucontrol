const crearArt = async (req,res) =>{
    const Titulo = document.getElementById("tituloInput")
    const Contenido = document.getElementById("contenidoInput")
    const Autor = "Yo"
    const Info = {Titulo:`${Titulo.value}`,Contenido:`${Contenido.value}`,Autor:``} //Objeto que pasa toda la informacion del articulo
    const token = localStorage.getItem('token') // Obtenemos el token local
    if (!Titulo.value || !Contenido.value){ //Detectamos que el input tenga algo
        console.log('Error')
    }else{
        const peticion = await fetch("http://localhost:3000/articulo",{method:"POST",
            headers: {
                token,
                'Content-Type': 'application/json'},
            body: JSON.stringify(Info)
        })
        if (peticion.ok){
            console.log(peticion)
            console.log(window.location.origin)
            alert('Articulo creado')
            window.location.href = "articulos.html"
        }
    }


}