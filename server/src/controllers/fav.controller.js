import { ObjectId } from "mongodb";
import { client } from "../db/database.js";
import { validarJWT } from "../helpers/validarJWT.js";

export const agregarFavorito = async (req, res) => {
  console.log("llegó");
  const cookie = req.headers.cookie;
  const token = cookie.split("=")[1];
  const { articleId, bookmarked } = req.body; 
  try {
    const { _id } = await validarJWT(token);

    const update = bookmarked
      ? { $addToSet: { favoritos: articleId } } 
      : { $pull: { favoritos: articleId } }; 

    const usuario = await client
      .db("glucontrol")
      .collection("usuarios")
      .findOne({_id:_id})

      client
      .db("glucontrol")
      .collection("usuarios")
      .updateOne(
        {_id:_id}, update
      )
    
    console.log("cambio", usuario);

    res.status(201).send({ message: "Estado de favoritos actualizado" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error al actualizar favoritos", error });
  }
};


export const obtenerEstadoFavorito = async (req, res) => {
  const cookie = req.headers.cookie;
  const token = cookie.split("=")[1];
  const { articleId }= req.params ;

  try {
    const { _id } = await validarJWT(token);

    const usuario = await client
      .db("glucontrol")
      .collection("usuarios")
      .findOne({ _id: _id, favoritos: articleId });

    const isBookmarked = usuario ? true : false;
    res.status(200).send({ isBookmarked });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error al obtener el estado de favorito", error });
  }
};

export const listarFavoritos = async (req, res) => {
  try {
    const cookie = req.headers.cookie;
    const token = cookie.split("=")[1];
    const { _id } = await validarJWT(token); 

    const usuario = await client
      .db("glucontrol")
      .collection("usuarios")
      .findOne({ _id: _id });
    
    if (!usuario || !Array.isArray(usuario.favoritos)) {
      return res.status(404).send({ message: "No se encontraron favoritos para este usuario o favoritos no es un arreglo." });
    }

    
    const favoritosIds = usuario.favoritos.map((id) => new ObjectId(id));

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
  } catch (error) {
    console.error("Error al listar favoritos:", error);
    res.status(500).send({ message: "Error al obtener favoritos", error });
  }
};