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
  }).then(async (usuario) => {
    if (usuario.status == 200) {
      const doc = {
        ...(await usuario.json()),
        loggedIn: true,
      };
      return doc;
    } else {
      console.log("no logeado");
      return { loggedIn: false };
    }
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

link.logOut = async (req, res) => {
  return fetch(`http://localhost:${API_URL}/logout`, {
    method: "DELETE",
    credentials: "include",
  });
};

link.createArticulo = async (data) => {
  return fetch(`http://localhost:${API_URL}/articulo`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

link.delete = async (id, res) => {
  return fetch(`http://localhost:${API_URL}/article/${id}`, {
    method: "DELETE",
    credentials: "include",
  }).then((res) => console.log("hola man", res));
};
