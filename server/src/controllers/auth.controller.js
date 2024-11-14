import { client } from "../db/database.js";
import bcrypt from "bcrypt";
import { generarJWT } from "../helpers/generarJWT.js";
import { generarOID } from "../helpers/generarOID.js";
import { validarJWT } from "../helpers/validarJWT.js";
import fs from "fs";
import cloudinary from "cloudinary";

const Cloudinary = cloudinary.v2;
Cloudinary.config({
  cloud_name: "dz8trxow0",
  api_key: "848899543485337",
  api_secret: "GmUUP_OaI0LxaaCpU9ItUfnzpIw",
});
// Definimos un objeto vacio con el nombre 'export const  (abreviatura de controller).
//Empezamos a ir agrengando los controladores a dicho objeto.
export const register = async (req, res) => {
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
  doc.Contrasenia = bcrypt.hashSync(doc.Contrasenia, 10);
  console.log(doc);
  client.db("glucontrol").collection("usuarios").insertOne(doc);
  res.json({
    msg: "Registrado correctamente",
  });
};

//Terminao
export const login = async (req, res) => {
  const { Nombre, Contraseña } = req.body;
  client
    .db("glucontrol")
    .collection("usuarios")
    .findOne({ Nombre: Nombre })
    .then((usuario) => {
      try {
        if (usuario) {
          if (bcrypt.compareSync(Contraseña, usuario.Contrasenia)) {
            generarJWT({ id: usuario._id }).then((token) => {
              res.cookie("token", token, {
                httpOnly: true,
              });
              res.status(200).send("Sesión Iniciada con exito.");
            });
          } else {
            throw new Error("Las contraseñas no son correctas");
          }
        } else {
          throw new Error("El usuario no existe");
        }
      } catch (error) {
        res.status(400).send(`${error}`);
      }
    });
};

export const selectall = async (req, res) => {
  const usuarios = client.db("glucontrol").collection("usuarios").find({});
  res.send(await usuarios.toArray());
};

export const eliminar = async (req, res) => {
  const { Id } = req.headers.cookie;
  const o_id = generarOID(Id);
  const usuario = await client
    .db("glucontrol")
    .collection("usuarios")
    .findOne({ _id: o_id });
  if (!usuario) {
    res.status(404).send("No se encontró el usuario");
  } else {
    await client
      .db("glucontrol")
      .collection("usuarios")
      .deleteOne({ _id: o_id });
    res.status(200).send("Usuario Eliminado");
  }
};

//Falta
export const sesion = async (req, res) => {
  res.send(req.user);
};

export const logOut = async (req, res) => {
  res.clearCookie("token").send("");
};

//
export const user = async (req, res) => {
  const { user } = req.params;
  const usuario = await client
    .db("glucontrol")
    .collection("usuarios")
    .findOne({ Nombre: user });
  console.log(usuario);
  res.send(usuario);
};

export const datosUsuario = async (req, res) => {
  const { datos } = req.body;

  if (!datos) {
    return res.status(400).send({ error: "Datos no proporcionados." });
  }

  console.log(datos);

  try {
    const usuario = await client
      .db("glucontrol")
      .collection("usuarios")
      .insertOne({
        Diabetes: datos.Diabetes,
        Edad: datos.Edad,
        Altura: datos.Altura,
        Peso: datos.Peso,
      });

    console.log(usuario);
    res.send(usuario);
  } catch (error) {
    console.error("Error al insertar usuario:", error);
    res.status(500).send({ error: "Error al guardar los datos del usuario." });
  }
};

export const edit = async (req, res) => {
  const { cookie } = req.headers;

  const token = await validarJWT(cookie.substr(6, cookie.length));

  const doc = req.body;
  if (doc.Contrasenia.trim() == "") {
    delete doc.Contrasenia;
  }
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
  client
    .db("glucontrol")
    .collection("usuarios")
    .findOneAndUpdate({ _id: token._id }, { $set: doc });
  res.send("hola");
};
