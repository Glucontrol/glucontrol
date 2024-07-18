
const lista = document.getElementById("lista")
    const obtenerUsuarios = async () => {
        const peticion = await fetch('http://localhost:3000/admin');
        console.log(peticion)
        const response = await peticion.json();
        console.log({response});
        pintarUsuarios(response)
    }
    const pintarUsuarios = async (req,res) =>{
        lista.innerHTML = "";
        req.forEach( usuario => {
            console.log(usuario)
            lista.innerHTML += `
            <div class="card col-md-8 mt-4">
                <div class="card-body d-flex flex-row ">
                    <div class="w-100">
                     <h4 class="card-title">${usuario.Nombre}</h4>
                     <p class="card-text">${usuario.Email}</p>
                     </div>
                     <div class="btn d-flex justify-content-end">
                     <button onclick="eliminarUsuario('${usuario._id}')"><img src="../assets/img/ximg.svg" class="icon"></button>
                     </div>
                </div>
            </div>
            `
        })
    }

const eliminarUsuario = async (req,res) =>{
    const obj = {Id:`${req}`}
    await fetch('http://localhost:3000/admin',{
        method:"POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        body:JSON.stringify(obj)
    });
    setTimeout(() => {
        alert("holiwis")
        obtenerUsuarios()
    }, 1000);
}
obtenerUsuarios();