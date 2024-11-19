import { client } from "../db/database.js";
import { generarOID } from "../helpers/generarOID.js";
import { ObjectId } from "mongodb";

export const agregarFavorito = async (req, res) => {
  const { articleId, bookmarked } = req.body;

  const update = bookmarked
    ? { $addToSet: { favoritos: articleId } }
    : { $pull: { favoritos: articleId } };
  try {
    client
      .db("glucontrol")
      .collection("usuarios")
      .updateOne({ _id: req.user._id }, update);
    res.status(201).send("Estado de favoritos actualizado");
  } catch (error) {
    res.status(500).send(error);
  }
};

export const obtenerEstadoFavorito = async (req, res) => {
  const { articleId } = req.params;
  try {
    const usuario = await client
      .db("glucontrol")
      .collection("usuarios")
      .findOne({ _id: req.user._id, favoritos: articleId });

    const isBookmarked = usuario ? true : false;
    res.status(200).send({ isBookmarked });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error al obtener el estado de favorito", error });
  }
};

export const listarFavoritos = async (req, res) => {
  const usuario = await client
    .db("glucontrol")
    .collection("usuarios")
    .findOne({ _id: req.user._id });

  if (!usuario || !Array.isArray(usuario.favoritos)) {
    return res.status(404).send({
      message:
        "No se encontraron favoritos para este usuario o favoritos no es un arreglo.",
    });
  }

  const favoritosIds = usuario.favoritos.map((id) =>
    ObjectId.createFromHexString(id)
  );
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
  console.log("Artículos favoritos:", articulos);
  res.status(200).send(articulos);
};
