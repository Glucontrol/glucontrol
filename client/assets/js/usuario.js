const usuarioB = document.getElementById("usuarioD");

const cerrarSesion = async (req, res) => {
  localStorage.setItem("token", null);
};

const buscarUsuario = async (req, res) => {
  const token = localStorage.getItem("token");
  const peticion = await fetch(`http://localhost:8080/sesion`, {
    method: "post",
    headers: {
      token: `${token}`,
    },
  });
  const userData = await peticion.json();
  if (!userData) {
    alert("Algo salió mal.Por favor inicie sesión de nuevo");
    window.location.href = "./login.html";
  } else {
    return userData;
  }
};
const mostrarNombre = async (req, res) => {
  const info = await req;
  console.log(info);
  usuarioB.innerHTML = `<div class="dropdown">
  <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
    ${info.Nombre}
  </button>
  <ul class="dropdown-menu dropdown-menu-end">
  <li><a class="dropdown-item" href="usuario.html?${info.Nombre}" >Cuenta</a></li>
  <li><a class="dropdown-item" href="registros.html" >Registros</a></li>
  <li><a class="dropdown-item" href="landingPage.html" >Configuración</a></li>
  <li><hr class="dropdown-divider"></hr></li>
    <li><a class="dropdown-item" href="landingPage.html" onclick="cerrarSesion()">Cerrar Sesión</a></li>
  </ul>
</div>`;
};
console.log(localStorage.getItem("token"));
if (localStorage.getItem("token") == "null") {
  console.log("no hay token");
} else {
  mostrarNombre(buscarUsuario());
}
const mostrarUsuario = async (req, res) => {
  const user = window.location.search.substring(1);
  const peticion = await fetch(`http://localhost:8080/admin/${user}`, {
    method: "POST",
  });
  const peticion2 = await await fetch(
    `http://localhost:8080/articulos/usuario/${user}`,
    {
      method: "POST",
    }
  );
  const info = await peticion.json();
  const articulos = await peticion2.json();
  document.getElementById("Nombre").innerText = `${info.Nombre}`;
  articulos.forEach((element) => {
    document.getElementById("articulos").innerHTML += `
            <div class="card">
          <div class="card-body bg-dark text-danger">
            <h4 class="card-title">${element.Titulo}</h4>
          </div>
    `;
  });
};
