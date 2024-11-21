import { client } from "../db/database.js";
import fs from "fs";
import { validarJWT } from "../helpers/validarJWT.js";
import { generarOID } from "../helpers/generarOID.js";
import cloudinary from "cloudinary";
import { Resend } from "resend";
import cConfig from "../helpers/cloudinary.js";

const Cloudinary = cloudinary.v2;

Cloudinary.config(cConfig);

export const agregar = async (req, res) => {
  let doc = req.body;
  doc.Autor = req.user._id;
  console.log(doc);
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
    doc.Autor = req.user._id;
  }
  client
    .db("glucontrol")
    .collection("articulos")
    .insertOne(doc)
    .then((resp) => res.status(200).send(resp));
};

export const listar = async (req, res) => {
  const config = [
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
        verified: 1,
        Autor: {
          $getField: {
            field: "Nombre",
            input: { $arrayElemAt: ["$dbBase", 0] },
          },
        },
      },
    },
  ];
  try {
    client
      .db("glucontrol")
      .collection("articulos")
      .aggregate(config)
      .toArray()
      .then((array) => {
        res.send(array);
      });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const leer = async (req, res) => {
  try {
    generarOID(req.params.id).then((o_id) =>
      client
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
        ])
        .toArray()
        .then((array) => res.status(200).send(array[0]))
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const buscarPorUsuario = async (req, res) => {
  try {
    client
      .db("glucontrol")
      .collection("articulos")
      .find({ Autor: req.user._id })
      .toArray()
      .then((articles) => res.status(200).send(articles));
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteArticle = async (req, res) => {
  const o_id = await generarOID(req.params.id);
  client
    .db("glucontrol")
    .collection("articulos")
    .findOneAndDelete({
      _id: o_id,
      Autor: req.user._id,
    })
    .then((resp) => {
      console.log(resp);
      if (resp) {
        res.send("Articulo Eliminado Con Exito").status(200);
      } else {
        res.send("No se ha podido eliminar el Articulo").status(500);
      }
    });
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
  doc.Autor = req.user._id;
  console.log("no cambio imagen");
  console.log(doc);
  res.send(
    await client
      .db("glucontrol")
      .collection("articulos")
      .findOneAndUpdate({ _id: o_id }, { $set: doc })
  );
};

export const verificarArticulo = async (req, res) => {
  const id = await generarOID(req.params.id);
  client
    .db("glucontrol")
    .collection("articulos")
    .findOneAndUpdate({ _id: id }, { $set: { verified: true } })
    .then((resp) => {
      if (resp) {
        res.send("Articulo Verificado Con Exito").status(200);
      } else {
        res.send("No se ha podido verificar el Articulo").status(500);
      }
    });
};
