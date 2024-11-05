import { client } from "../db/database.js";
import fs from "fs";
import { validarJWT } from "../helpers/validarJWT.js";
import { generarOID } from "../helpers/generarOID.js";
import cloudinary from "cloudinary";
import cConfig from "../helpers/cloudinary.js";

const Cloudinary = cloudinary.v2;
import { Resend } from "resend";

const resend = new Resend("re_ZQF7nqyB_BuEZ1QvPRAwB39Z7R9kjZy2e");

// Definimos un objeto vacio con el nombre 'export const  (abreviatura de controller).

const API_ENV =
  "CLOUDINARY_URL=cloudinary://848899543485337:GmUUP_OaI0LxaaCpU9ItUfnzpIw@dz8trxow0";

Cloudinary.config(cConfig);

export const agregar = async (req, res) => {
  let doc = req.body;
  if (req.file) {
    fs.renameSync(
      `${req.file.path}`,
      `${req.file.destination}${req.file.originalname}`
    );
    const url = Cloudinary.uploader
      .upload(`${req.file.destination}${req.file.originalname}`, {
        use_filename: true,
      })
      .then((el) => el.url);
    doc.urlImg = await url;
  }
  const cookie = req.headers.cookie;
  if (cookie) {
    const token = cookie.split("=")[1];
    const Usuario = await validarJWT(token);
    doc.Autor = Usuario._id;

    console.log(doc);
    res.send(
      await client.db("glucontrol").collection("articulos").insertOne(doc)
    );
  } else {
    res.send("Fallo en la autorización").status(400);
  }
};

export const listar = async (req, res) => {
  const articulos = client
    .db("glucontrol")
    .collection("articulos")
    .aggregate([
      {
        $sort: {
          _id: -1,
        },
      },
      {
        $lookup: {
          from: "usuarios",
          localField: "Autor",
          foreignField: "_id",
          as: "dbBase",
        },
      },
      {
        $project: {
          Titulo: 1,
          Contenido: 1,
          Fecha: 1,
          Categoria: 1,
          urlImg: 1,
          Categoria: 1,
          Autor: {
            $getField: {
              field: "Nombre",
              input: { $arrayElemAt: ["$dbBase", 0] },
            },
          },
        },
      },
    ]);
  res.send(await articulos.toArray());
};

export const leer = async (req, res) => {
  const { id } = req.params;

  const o_id = generarOID(id);
  const articulos = client
    .db("glucontrol")
    .collection("articulos")
    .aggregate([
      {
        $match: {
          _id: o_id,
        },
      },
      {
        $lookup: {
          from: "usuarios",
          localField: "Autor",
          foreignField: "_id",
          as: "dbBase",
        },
      },
      {
        $project: {
          Titulo: 1,
          Contenido: 1,
          Fecha: 1,
          Categoria: 1,
          urlImg: 1,
          Autor: {
            $getField: {
              field: "Nombre",
              input: { $arrayElemAt: ["$dbBase", 0] },
            },
          },
        },
      },
    ]);
  const articulo = await articulos.toArray();
  if (articulos) {
    console.log(articulo[0]);
    res.send(articulo[0]);
  } else {
    res
      .status(404)
      .send({ Titulo: "Error", Contenido: "No sé encontró el articulo" });
  }
  if (!o_id) {
    res.send({ Titulo: "Error:ID no valido", Contenido: "ID no Valido" });
  }
};

export const buscarPorUsuario = async (req, res) => {
  const cookie = req.headers.cookie;
  if (cookie) {
    const token = cookie.split("=")[1];
    const Usuario = await validarJWT(token);
    console.log("id", Usuario._id);
    const Articles = client
      .db("glucontrol")
      .collection("articulos")
      .find({ Autor: Usuario._id });
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
      .then((resp) => {
        if (resp) {
          res.send("Articulo Eliminado Con Exito").status(200);
        } else {
          res.send("No se ha podido eliminar el Articulo").status(500);
        }
      });
  }
};

export const edit = async (req, res) => {
  let doc = req.body;
  if (req.file) {
    fs.renameSync(
      `${req.file.path}`,
      `${req.file.destination}${req.file.originalname}`
    );
    const url = Cloudinary.uploader
      .upload(`${req.file.destination}${req.file.originalname}`, {
        use_filename: true,
      })
      .then((el) => el.url);
    doc.urlImg = await url;
  }
  const o_id = generarOID(req.params.id);
  const cookie = req.headers.cookie;
  if (cookie) {
    const token = cookie.split("=")[1];
    const Usuario = await validarJWT(token);
    doc.Autor = Usuario._id;
    console.log("no cambio imagen");
    console.log(doc);
    res.send(
      await client
        .db("glucontrol")
        .collection("articulos")
        .findOneAndUpdate({ _id: o_id }, { $set: doc })
    );
  } else {
    res.send("Fallo en la autorización").status(400);
  }
};
