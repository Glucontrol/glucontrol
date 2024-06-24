const usuarioB = document.getElementById("usuarioD");

const cerrarSesion = async (req,res) =>{
    localStorage.setItem("token", null)
}

const buscarUsuario = async (req,res) =>{
    const token = localStorage.getItem("token")
    const peticion = await fetch("http://localhost:3000/sesion",{
        method:"post",
        headers:{
            token:`${token}`
        }
    })
    const userData = peticion.json();
    return userData;
}
const mostrarNombre = async (req,res) =>{
    const info = await req
    usuarioB.innerHTML = `<div class="dropdown">
  <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
    ${info.Nombre}
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="landingPage.html" onclick="cerrarSesion()">Cerrar Sesión</a></li>
  </ul>
</div>`
}
console.log(localStorage.getItem("token"))
if (localStorage.getItem("token") == 'null'){
  console.log("no hay token")
}else{
  mostrarNombre(buscarUsuario());
}