let ingredientes = document.getElementsByName("ingredientes")

document.addEventListener('keyup',(e)=>{
    if (ingredientes[ingredientes.length-1].value){
        const ingr = document.createElement('textarea')
        ingr.name = 'ingredientes'
        ingr.className = 'form-control'
        ingr.rows = '1'    
        ingr.placeholder = 'Agregar otro ingrediente'
        document.getElementById('listaIngredientes').append(ingr)
    }
})
document.getElementById('crearReceta').addEventListener('click',async ()=>{
    document.getElementById('crearReceta').outerHTML= `
                                <a
                                  name=""
                                  id="crearReceta"
                                  class="btn btn-primary disabled"
                                  href="#"
                                  role="button"
                                  >
                                <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                </a>
    `
    const Titulo = (document.getElementById('tituloInput')).value
    const Instrucciones = (document.getElementById('instruccionesInput')).value
    let Ingredientes = []
    ingredientes.forEach(elemento=>{
        if (elemento.value){
            Ingredientes.push(elemento.value)
        }
    })
    const receta = {Titulo,Instrucciones,Ingredientes,Autor:''}
    const token = localStorage.getItem('token')
    const peticion = await fetch('http://localhost:8080/receta',{
        method:'POST',
        headers:{
         'Content-Type':'application/json',
         token:`${token}`
        },
        body: JSON.stringify(receta)
    })
    if (peticion.status==200){
        window.location.href='recetas.html'
    }else{
        alert('Algo salió mal')
        document.getElementById('crearReceta').outerHTML= `
        <a
          name=""
          id="crearReceta"
          class="btn btn-primary"
          href="#"
          role="button"
          >Crear receta
        </a>
`
    }
})