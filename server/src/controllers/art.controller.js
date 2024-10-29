import { client } from "../db/database.js";
import fs from "fs";
import { validarJWT } from "../helpers/validarJWT.js";
import { generarOID } from "../helpers/generarOID.js";
import cloudinary from "cloudinary";

const Cloudinary = cloudinary.v2;

// Definimos un objeto vacio con el nombre 'export const  (abreviatura de controller).

const API_ENV =
  "CLOUDINARY_URL=cloudinary://848899543485337:GmUUP_OaI0LxaaCpU9ItUfnzpIw@dz8trxow0";

Cloudinary.config({
  cloud_name: "dz8trxow0",
  api_key: "848899543485337",
  api_secret: "GmUUP_OaI0LxaaCpU9ItUfnzpIw",
});

export const agregar = async (req, res) => {
  fs.renameSync(
    `${req.file.path}`,
    `${req.file.destination}${req.file.originalname}`
  );
  const url = Cloudinary.uploader
    .upload(`${req.file.destination}${req.file.originalname}`, {
      use_filename: true,
    })
    .then((el) => el.url);
  let doc = req.body;
  const cookie = req.headers.cookie;
  if (cookie) {
    const token = cookie.split("=")[1];
    const Usuario = await validarJWT(token);
    doc.Autor = Usuario.Nombre;
    doc.urlImg = await url;
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
  const { id } = req.params;
  const o_id = generarOID(id);
  const doc = await client
    .db("glucontrol")
    .collection("articulos")
    .findOne({ _id: o_id });
  if (doc) {
    res.send(doc);
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
  fs.renameSync(
    `${req.file.path}`,
    `${req.file.destination}${req.file.originalname}`
  );
  const url = Cloudinary.uploader
    .upload(`${req.file.destination}${req.file.originalname}`, {
      use_filename: true,
    })
    .then((el) => el.url);
  let doc = req.body;
  const o_id = generarOID(req.params.id);
  const cookie = req.headers.cookie;
  if (cookie) {
    const token = cookie.split("=")[1];
    const Usuario = await validarJWT(token);
    doc.Autor = Usuario.Nombre;
    doc.urlImg = await url;
    console.log(doc);
    res.send(
      await client
        .db("glucontrol")
        .collection("articulos")
        .findOneAndReplace({ _id: o_id }, doc)
    );
  } else {
    res.send("Fallo en la autorización").status(400);
  }
};
