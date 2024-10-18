import { API_URL } from "../config.js";
export const link = {};

link.articulos = async () =>
  fetch(`http://localhost:${API_URL}/articulos`).then((response) =>
    response.json()
  );

link.registros = async () =>
  fetch(`http://localhost:${API_URL}/registros`).then((response) =>
    response.json()
  );

link.articuloId = async (id) =>
  fetch(`http://localhost:${API_URL}/articulo/${id}`).then((response) =>
    response.json()
  );

link.login = async (Nombre, Contraseña) => {
  return fetch(`http://localhost:${API_URL}/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "Application/Json",
    },
    body: JSON.stringify({ Nombre, Contraseña }),
  }).then((response) => {
    if (response.status == 200) {
      console.log("salió bien");
      return true;
    } else {
      return false;
    }
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

link.registerI = async (data) => {
  return fetch(`http://localhost:${API_URL}/insulina`, {
    method: "POST",
    headers: {
      "Content-Type": "Application/JSON",
    },
    credentials: "include",
    body: JSON.stringify(data),
  }).then((res) => true);
};

link.getRegistersI = async (data) => {
  return fetch(`http://localhost:${API_URL}/registrosI`, {
    method: "GET",
    credentials: "include",
  }).then((resultado) => resultado.json());
};
