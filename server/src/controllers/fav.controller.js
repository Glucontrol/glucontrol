import { client } from "../db/database.js";
import { generarOID } from "../helpers/generarOID.js";

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
  console.log("hola", req.user);
  try {
    if (!req.user || !Array.isArray(req.user.favoritos)) {
      return res.status(404).send({
        message:
          "No se encontraron favoritos para este usuario o favoritos no es un arreglo.",
      });
    }

    const favoritosIds = req.user.favoritos.map((id) => generarOID(id));
    client
      .db("glucontrol")
      .collection("articulos")
      .aggregate([
        {
          $match: {
            _id: { $in: await favoritosIds },
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
      .toArray()
      .then((array) => res.status(201).send(array));
  } catch (error) {
    console.error("Error al listar favoritos:", error);
    res.status(500).send({ message: "Error al obtener favoritos", error });
  }
};
