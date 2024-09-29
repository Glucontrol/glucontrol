import { ObjectId } from "mongodb";
import { client } from "../db/database.js";
import { validarJWT } from "../helpers/validarJWT.js";

export const agregarFavorito = async (req, res) => {
  const { token } = req.headers;
  const { articuloId } = req.body || req.params; 

  try {
    
    const {_id } = await validarJWT(token);

    if (!ObjectId.isValid(articuloId)) {
      return res.status(400).send({ message: "ID de artículo no válido" });
    }

    client.connect();

    const favorito = {
      userId: new ObjectId(_id),
      articuloId: new ObjectId(articuloId),
      fecha: new Date()
    };

    await client.db("glucontrol").collection("favoritos").insertOne(favorito);

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
            $match: { userId: new ObjectId(userId) }
          },
          {
            $lookup: {
              from: "articulos",
              localField: "articuloId",
              foreignField: "_id",
              as: "articulo"
            }
          },
          {
            $unwind: "$articulo"
          }
        ])
        .toArray();
  
      res.send(favoritos);
    } catch (error) {
      res.status(500).send({ message: "Error al listar favoritos", error });
    }
  };
  