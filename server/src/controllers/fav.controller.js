import { ObjectId } from "mongodb";
import { client } from "../db/database.js";
import { validarJWT } from "../helpers/validarJWT.js";
import { generarOID } from "../helpers/generarOID.js";

export const agregarFavorito = async (req, res) => {
  const { articleId, bookmarked } = req.body;

  if (!req.user || !req.user._id) {
    return res.status(401).send({ mensaje: "Usuario no autenticado" });
  }

  const update = bookmarked
    ? { $addToSet: { favoritos: articleId } }
    : { $pull: { favoritos: articleId } };
  try {
    await client
      .db("glucontrol")
      .collection("usuarios")
      .updateOne({ _id: new ObjectId(req.user._id) }, update);
    res.status(201).send("Estado de favoritos actualizado");
  } catch (error) {
    console.error("Error al agregar/quitar favorito:", error);
    res
      .status(500)
      .send({ mensaje: "Error al actualizar favoritos", error: error.message });
  }
};

export const obtenerEstadoFavorito = async (req, res) => {
  const { articleId } = req.params;

  if (!req.user || !req.user._id) {
    return res.status(401).send({ mensaje: "Usuario no autenticado" });
  }

  try {
    const usuario = await client
      .db("glucontrol")
      .collection("usuarios")
      .findOne({ _id: new ObjectId(req.user._id), favoritos: articleId });

    const isBookmarked = !!usuario;
    res.status(200).send({ isBookmarked });
  } catch (error) {
    console.error("Error al obtener el estado de favorito:", error);
    res
      .status(500)
      .send({
        mensaje: "Error al obtener el estado de favorito",
        error: error.message,
      });
  }
};

export const listarFavoritos = async (req, res) => {
  if (!req.user || !Array.isArray(req.user.favoritos)) {
    return res.status(404).send({
      mensaje:
        "No se encontraron favoritos para este usuario o favoritos no es un arreglo.",
    });
  }

  try {
    const favoritosIds = req.user.favoritos.map((id) => generarOID(id));
    const articulos = await client
      .db("glucontrol")
      .collection("articulos")
      .aggregate([
        {
          $match: {
            _id: { $in: favoritosIds },
          },
        },
        {
          $sort: {
            _id: -1,
          },
        },
        {
          $project: {
            Titulo: 1,
            Contenido: 1,
            Fecha: 1,
            Categoria: 1,
            urlImg: 1,
            verified: 1,
            Autor: 1,
          },
        },
      ])
      .toArray();

    res.status(200).send(articulos);
  } catch (error) {
    console.error("Error al listar favoritos:", error);
    res
      .status(500)
      .send({ mensaje: "Error al obtener favoritos", error: error.message });
  }
};
