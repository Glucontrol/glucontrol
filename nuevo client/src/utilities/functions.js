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
  }).then((response) =>
    response.text().then((res) => {
      console.log(res);
      return {
        status: response.status,
        data: res,
      };
    })
  );
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
    body: data,
  }).then((res) => res.json());
};

link.cambiarDatosPerfil = async (datosUsuario) => {
  return fetch(`http://localhost:${API_URL}/articulo`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datosUsuario),
  }).then((res) => res.json());
};

link.delete = async (id, res) => {
  return fetch(`http://localhost:${API_URL}/article/${id}`, {
    method: "DELETE",
    credentials: "include",
  }).then((res) => (res.status == 200 ? true : false));
};

link.edit = async (doc, id) => {
  return fetch(`http://localhost:${API_URL}/article/${id}`, {
    method: "PATCH",
    credentials: "include",
    body: doc,
  }).then((res) => console.log("editar", res));
};

link.editProfile = async (data) => {
  return fetch(`http://localhost:${API_URL}/profile`, {
    method: "PATCH",
    credentials: "include",
    body: data,
  }).then((res) => (res.ok ? true : false));
};

link.signUp = async (data) => {
  return fetch(`http://localhost:${API_URL}/signup`, {
    method: "POST",
    body: data,
  }).then((res) => console.log(res));
};

link.deleteRegister = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:${API_URL}/registros/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Error al eliminar el registro");
    }
    return await response.text();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

link.validarArticulo = async (id) => {
  try {
    return await fetch(`http://localhost:${API_URL}/articulo/${id}`, {
      method: "PATCH",
      credentials: "include",
    }).then((res) =>
      res.text().then((resp) => {
        return {
          text: resp,
          status: res.status,
        };
      })
    );
  } catch (error) {
    console.log(error);
  }
};
