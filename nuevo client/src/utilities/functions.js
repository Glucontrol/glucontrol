import { API_URL } from "../config.js";
export const link = {};

link.articulos = () =>
  fetch(`http://localhost:${API_URL}/articulos`).then((response) =>
    response.json()
  );

link.registros = () =>
  fetch(`http://localhost:${API_URL}/registros`).then((response) =>
    response.json()
  );

link.articuloId = (id) =>
  fetch(`http://localhost:${API_URL}/articulo/${id}`).then((response) =>
    response.json()
  );

link.login = (Nombre, Contraseña) => {
  console.log("hola");
  fetch(`http://localhost:${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "Application/Json",
    },
    body: JSON.stringify({ Nombre, Contraseña }),
  }).then((response) => response.json());
};
