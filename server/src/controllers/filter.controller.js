import { validarJWT } from "../helpers/validarJWT.js";
import { client } from "../db/database.js";

// Función para filtrar artículos por tema
export const filtrarPorTema = async (req, res) => {
  const tema = req.params.tema; // Tema a filtrar (ej: Nutrición, Actividad Física)
  const cookie = req.headers.cookie;

  if (cookie) {
    const token = cookie.substr(6, cookie.length - 1);
    validarJWT(token).then((resultado) => {
      client
        .db("glucontrol")
        .collection("articulos")
        .find({ tema: tema })
        .toArray()
        .then((articulos) => res.send(articulos))
        .catch((error) =>
          res
            .status(500)
            .send({ error: "Error en la consulta de artículos por tema" })
        );
    });
  } else {
    res.status(401).send({ error: "Usuario no autenticado" });
  }
};

// Función para filtrar artículos por fecha de publicación
export const filtrarPorFecha = async (req, res) => {
  const { fechaInicio, fechaFin } = req.query; // Rango de fechas para filtrar
  const cookie = req.headers.cookie;

  if (cookie) {
    const token = cookie.substr(6, cookie.length - 1);
    validarJWT(token).then((resultado) => {
      client
        .db("glucontrol")
        .collection("articulos")
        .find({
          fechaPublicacion: {
            $gte: new Date(fechaInicio),
            $lte: new Date(fechaFin),
          },
        })
        .toArray()
        .then((articulos) => res.send(articulos))
        .catch((error) =>
          res
            .status(500)
            .send({ error: "Error en la consulta de artículos por fecha" })
        );
    });
  } else {
    res.status(401).send({ error: "Usuario no autenticado" });
  }
};

// Función para buscar artículos por palabras clave
export const buscarPorPalabrasClave = async (req, res) => {
  const palabrasClave = req.query.keywords; // Palabras clave separadas por comas
  const cookie = req.headers.cookie;

  if (cookie) {
    const token = cookie.substr(6, cookie.length - 1);
    validarJWT(token).then((resultado) => {
      const keywordsArray = palabrasClave
        .split(",")
        .map((keyword) => new RegExp(keyword.trim(), "i"));
      client
        .db("glucontrol")
        .collection("articulos")
        .find({
          $or: [
            { titulo: { $in: keywordsArray } },
            { contenido: { $in: keywordsArray } },
            { tags: { $in: keywordsArray } },
          ],
        })
        .toArray()
        .then((articulos) => res.send(articulos))
        .catch((error) =>
          res.status(500).send({
            error: "Error en la búsqueda de artículos por palabras clave",
          })
        );
    });
  } else {
    res.status(401).send({ error: "Usuario no autenticado" });
  }
};
