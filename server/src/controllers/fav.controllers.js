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


