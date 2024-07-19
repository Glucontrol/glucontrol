
const lista = document.getElementById("lista")
console.log('hola')
const listaArticulos = async () => {
    const peticion = await fetch('http://localhost:3000/articulos');
    console.log(peticion)
    const response = await peticion.json();
    console.log({ response });
    pintarArticulos(response)
}
const pintarArticulos = async (req, res) => {
    lista.innerHTML = "";
    req.forEach(articulo => {
        console.log(articulo)
        lista.innerHTML += `
            <div class="col">
              <a href="articulo1.html?${articulo._id}" style="text-decoration: none">
              <div class="card h-100">
                <img src="https://via.placeholder.com/300" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${articulo.Titulo}</h5>
                  <p class="card-text">${articulo.Autor}</p>
                </div>
              </div>
              </a>
            </div>
        `
    })
}
const mostrarArticulo = async (req,res) =>{
  const id = (window.location.search.substring(1))
  const peticion = await fetch(`http://localhost:3000/articulo/${id}`,);
  const Info = await peticion.json()
  console.log(Info)
  document.getElementById('titulo').innerText = `${Info.Titulo}`
  document.getElementById('contenido').innerText = `${Info.Contenido}`
}