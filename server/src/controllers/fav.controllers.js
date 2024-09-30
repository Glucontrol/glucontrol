import { ObjectId } from "mongodb";
import { client } from "../db/database.js";
import { validarJWT } from "../helpers/validarJWT.js";
import { generarOID } from "../helpers/generarOID.js";

export const agregarFavorito = async (req, res) => {
  const { token } = req.headers;
  const { articuloId } = req.body || req.params;

  try {
    const { _id } = await validarJWT(token);
    const o_id = generarOID(_id);

    await client.db("glucontrol").collection("favoritos").insertOne({
      userId: o_id,
      articuloId: new ObjectId(),
      fecha: new Date(),
    });

    res.status(201).send({ message: "Artículo agregado a favoritos" });
  } catch (error) {
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
