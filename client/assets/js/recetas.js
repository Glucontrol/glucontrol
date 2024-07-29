const lista = document.getElementById("lista")
const listaRecetas = async () => {
    const peticion = await fetch(`http://localhost:8080/recetas`);
    console.log(peticion)
    const response = await peticion.json();
    console.log({ response });
    pintarRecetas(response)
}
const pintarRecetas = async (req, res) => {
    lista.innerHTML = "";
    req.forEach(receta => {
        lista.innerHTML += `
            <div class="col">
              <a href="ver/receta.html?${receta._id}" style="text-decoration: none">
              <div class="card h-100">
                <img src="https://via.placeholder.com/300" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${receta.Titulo}</h5>
                  <p class="card-text">${receta.Autor}</p>
                </div>
              </div>
              </a>
            </div>
        `
    })
}
const mostrarReceta = async (req,res) =>{
  const id = (window.location.search.substring(1))
  const peticion = await fetch(`http://localhost:8080/receta/${id}`,);
  const Info = await peticion.json()
  await (Info.Ingredientes).forEach(ingrediente=>{
    document.getElementById('ingredientes').innerHTML += `<li>${ingrediente}</li>`
  })
  document.getElementById('titulo').innerText = `${Info.Titulo}`
  document.getElementById('instrucciones').innerText = `${Info.Instrucciones}`
}
async function busqueda(req,res){
  console.log(req)
  const Info = {"Input":req}
  const peticion = await fetch(`http://localhost:8080/recetas`,{
    method: "POST",
    headers:{
      'Content-Type': 'application/json;charset=utf-8'
    },
    body:JSON.stringify(Info)
    })
    return peticion.json()
}
document.getElementById('buscador').addEventListener('keyup', async function (e) {
  const Input = document.getElementById('buscador').value
  console.log(Input)
  const bsqd = await busqueda(Input)
  pintarArticulos(bsqd)
  if (!Input){
    listaArticulos();
  }
}, false);