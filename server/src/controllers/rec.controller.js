import { ObjectId } from "mongodb";
import { client } from "../db/database.js";
import { validarJWT } from "../helpers/validarJWT.js";
// Definimos un objeto vacio con el nombre 'export const  (abreviatura de controller).
export const agregar = async (req, res) => {
  let doc = req.body;
  const { token } = req.headers;
  const Usuario = await verifyJWT(token);
  doc.Autor = Usuario.Nombre;
  res.send(await client.db("glucontrol").collection("recetas").insertOne(doc));
};
export const listar = async (req, res) => {
  const recetas = client.db("glucontrol").collection("recetas").find({});
  res.send(await recetas.toArray());
};

export const leer = async (req, res) => {
  const { id } = req.params;
  if (ObjectId.isValid(id)) {
    const o_id = ObjectId.createFromHexString(id);
    const receta = await client
      .db("glucontrol")
      .collection("recetas")
      .findOne({ _id: o_id });
    if (receta == null) {
      res.send({ Titulo: "Error", Contenido: "No se encontró el articulo" });
    } else {
      res.send(receta);
    }
  } else {
    res.send({ Titulo: "Error:ID no valido", Contenido: "" });
  }
};
export const buscar = async (req, res) => {
  const { Input } = req.body;
  console.log(req.body);
  if (Input) {
    const lista = client
      .db("glucontrol")
      .collection("recetas")
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
