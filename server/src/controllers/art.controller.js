import { ObjectId } from "mongodb";
import { client } from "../db/database.js";
import { validarJWT } from "../helpers/validarJWT.js";
// Definimos un objeto vacio con el nombre 'export const  (abreviatura de controller).

export const agregar = async (req, res) => {
  let doc = req.body;
  const { token } = req.headers;
  const Usuario = await verifyJWT(token);
  doc.Autor = Usuario.Nombre;
  client.connect();
  res.send(
    await client.db("glucontrol").collection("articulos").insertOne(doc)
  );
};

export const listar = async (req, res) => {
  client.connect();
  const articulos = client.db("glucontrol").collection("articulos").find({});
  console.log(articulos);
  res.send(await articulos.toArray());
};

export const leer = async (req, res) => {
  console.log(req.params.id);
  const { id } = req.params;
  if (ObjectId.isValid(id)) {
    const o_id = ObjectId.createFromHexString(id);
    const articulo = await client
      .db("glucontrol")
      .collection("articulos")
      .findOne({ _id: o_id });
    if (articulo == null) {
      res.send({ Titulo: "Error", Contenido: "No se encontró el articulo" });
    } else {
      res.send(articulo);
    }
  } else {
    res.send({ Titulo: "Error:ID no valido", Contenido: "" });
  }
};

export const buscar = async (req, res) => {
  const { Input } = req.body;
  console.log(req.body);
  if (Input) {
    console.log("hola");
    const lista = client
      .db("glucontrol")
      .collection("articulos")
      .aggregate([
        {
          $search: {
            index: "default",
            text: {
              query: Input,
              path: "Titulo",
            },
          },
        },
      ]);
    res.send(await lista.toArray());
  }
};

export const buscarUser = async (req, res) => {
  const Nombre = req.params.user;
  console.log(Nombre);
  client.connect();
  const articulos = client
    .db("glucontrol")
    .collection("articulos")
    .find({ Autor: `${Nombre}` });
  console.log(articulos);
  res.send(await articulos.toArray());
};
