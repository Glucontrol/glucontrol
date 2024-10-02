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

link.login = async (Nombre, Contraseña) => {
  fetch(`http://localhost:${API_URL}/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "Application/Json",
    },
    body: JSON.stringify({ Nombre, Contraseña }),
  }).then((response) => {
    console.log(response.json());
  });
};

link.sesion = async (req, res) => {
  return fetch(`http://localhost:${API_URL}/sesion`, {
    method: "GET",
    credentials: "include",
  }).then((usuario) => {
    return usuario;
  });
};
