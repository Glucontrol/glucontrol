import { ObjectId } from "mongodb";
import { client } from "../db/database.js";
import { validarJWT } from "../helpers/validarJWT.js";
import { generarOID } from "../helpers/generarOID.js";
// Definimos un objeto vacio con el nombre 'export const  (abreviatura de controller).

export const agregar = async (req, res) => {
  let doc = req.body;
  const { token } = req.headers;
  const Usuario = await validarJWT(token);
  doc.Autor = Usuario.Nombre;
  res.send(
    await client.db("glucontrol").collection("articulos").insertOne(doc)
  );
};

export const listar = async (req, res) => {
  const articulos = client.db("glucontrol").collection("articulos").find({});
  res.send(await articulos.toArray());
};

export const leer = async (req, res) => {
  console.log(req.params.id);
  const { id } = req.params;
  const o_id = generarOID(id);
  client
    .db("glucontrol")
    .collection("articulos")
    .findOne({ _id: o_id })
    .then((doc) => {
      if (doc) {
        res.send(doc);
      } else {
        res
          .status(404)
          .send({ Titulo: "Error", Contenido: "No sé encontró el articulo" });
      }
    });
  if (!o_id) {
    res.send({ Titulo: "Error:ID no valido", Contenido: "ID no Valido" });
  }
};

export const buscarPorUsuario = async (req, res) => {
  const Nombre = req.params.user;
  client
    .db("glucontrol")
    .collection("articulos")
    .find({ Autor: `${Nombre}` })
    .then((doc) => {
      if (doc) {
        res.send(doc);
      } else {
        res
          .status(404)
          .send({ Titulo: "Error", Contenido: "No se encontró el documento" });
      }
    });
};
