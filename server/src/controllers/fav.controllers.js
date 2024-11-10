import { ObjectId } from "mongodb";
import { client } from "../db/database.js";
import { validarJWT } from "../helpers/validarJWT.js";
import { generarOID } from "../helpers/generarOID.js";

export const agregarFavorito = async (req, res) => {
  console.log("llegó");
  const cookie = req.headers.cookie;
  const token = cookie.substr(6, cookie.length - 1);
  try {
    const { _id } = await validarJWT(token);
    console.log(_id);

    const usuario = await client
      .db("glucontrol")
      .collection("usuarios")
      .findOneAndUpdate({ _id: _id }, { $set: { favoritos2: [] } });
    console.log("aca", usuario);

    res.status(201).send({ message: "Artículo agregado a favoritos" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error al agregar a favoritos", error });
  }
};

export const listarFavoritos = async (req, res) => {
  const { token } = req.headers;

  try {
    const Usuario = await validarJWT(token);
    const userId = Usuario._id;

    client.connect();

    const favoritos = await client
      .db("glucontrol")
      .collection("favoritos")
      .aggregate([
        {
          $match: { userId: new ObjectId(userId) },
        },
        {
          $lookup: {
            from: "articulos",
            localField: "articuloId",
            foreignField: "_id",
            as: "articulo",
          },
        },
        {
          $unwind: "$articulo",
        },
      ])
      .toArray();

    res.send(favoritos);
  } catch (error) {
    res.status(500).send({ message: "Error al listar favoritos", error });
  }
};
