const lista = document.getElementById("formularios")
const pintarLista = async (req,res) => {
    const token = localStorage.getItem("token")
    const peticion = await fetch(`http://localhost:8080/registrosI`,{
        method:"POST",
        headers:{
            'token':`${token}`
        }
    })
    const data = await peticion.json()
    console.log(data)
    data.forEach(element => {
        const fecha = element.Fecha
        lista.innerHTML += `
        <div class="card mt-3 w-75 mx-auto">
            <div class="card-body">
            <h4 class="card-title">${fecha.substring(0,10)}</h4>
            <p class="card-text">Acción:${element.Accion}</p>
            <p class="card-text">Tipo:${element.Tipo}</p>
            <p class="card-text">Dosis:${element.Dosis}</p>
            <p class="card-text">Vía:${element.Via}</p>
            <p class="card-text">Información Adicional:${element.Adicional}</p>
            </div>
        </div>
`
    });
}
pintarLista()
