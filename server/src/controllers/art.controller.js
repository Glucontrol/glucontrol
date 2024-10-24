import { ObjectId } from "mongodb";
import { client } from "../db/database.js";
import { validarJWT } from "../helpers/validarJWT.js";
import { generarOID } from "../helpers/generarOID.js";
// Definimos un objeto vacio con el nombre 'export const  (abreviatura de controller).

export const agregar = async (req, res) => {
  let doc = req.body;
  const cookie = req.headers.cookie;
  if (cookie) {
    const token = cookie.split("=")[1];
    const Usuario = await validarJWT(token);
    console.log(Usuario);
    doc.Autor = Usuario.Nombre;
    console.log(doc);
    res.send(
      await client.db("glucontrol").collection("articulos").insertOne(doc)
    );
  } else {
    res.send("Fallo en la autorización").status(400);
  }
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
  const cookie = req.headers.cookie;
  if (cookie) {
    const token = cookie.split("=")[1];
    const Usuario = await validarJWT(token);
    const Articles = client
      .db("glucontrol")
      .collection("articulos")
      .find({ Autor: `${Usuario.Nombre}` });
    res.send(await Articles.toArray());
  } else {
    res.send("Fallo en la autorización").status(400);
  }
};

export const deleteArticle = async (req, res) => {
  const cookie = req.headers.cookie;
  console.log("hola", req.params.id);
  if (cookie) {
    const token = cookie.split("=")[1];
    const Usuario = await validarJWT(token);
    console.log(Usuario);
    const id = generarOID(req.params.id);
    console.log(id);
    client
      .db("glucontrol")
      .collection("articulos")
      .findOneAndDelete({
        _id: id,
        Autor: Usuario.Nombre,
      })
      .then((res) => {
        if (res) {
          res.send("Articulo Eliminado Con Exito").status(200);
        } else {
          res.send("No se ha podido eliminar el Articulo").status(500);
        }
      });
  }
};
