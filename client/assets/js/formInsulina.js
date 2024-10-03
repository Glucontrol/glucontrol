const Tipo = document.getElementById("tipoInput");
const Dosis = document.getElementById("dosisInput");
const Fecha = document.getElementById("fechaInput");
const Via = document.getElementById("viaInput");
const Accion = document.getElementById("accionInput");
const Adicional = document.getElementById("adicionalInput");

const verRegistros = async (req, res) => {
  const response = await fetch("http://localhost:8080/insulina", {
    headers: "",
  });
  console.log(response);
};
const guardarRegistro = async (req, res) => {
  console.log("Se envió el registro");
  const token = localStorage.getItem("token");
  const data = {
    Tipo: `${Tipo.value}`,
    Dosis: `${Dosis.value}`,
    Fecha: `${Fecha.value}`,
    Via: `${Via.value}`,
    Accion: `${Accion.value}`,
    Adicional: `${Adicional.value}`,
  };
  try {
    const peticion = await fetch(`http://localhost:8080/insulina`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
      body: JSON.stringify(data),
    });
    if (peticion.ok) {
      window.location.href = "registros.html";
    }
  } catch (error) {
    alert("Error");
  }
};
