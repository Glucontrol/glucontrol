import { client } from "../db/database.js";
import bcrypt from "bcrypt";
import { generarJWT } from "../helpers/generarJWT.js";
import { generarOID } from "../helpers/generarOID.js";
import { ObjectId } from "mongodb";
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
  doc.Email = "hola@gmail.com";
  doc.Contrasenia = bcrypt.hashSync(doc.Contrasenia, 10);
  console.log(doc);
  client.db("glucontrol").collection("usuarios").insertOne(doc);
  res.json({
    msg: "Registrado correctamente",
  });
};

export const login = async (req, res) => {
  const { Nombre, Contraseña } = req.body;
  client
    .db("glucontrol")
    .collection("usuarios")
    .findOne({ Nombre: Nombre })
    .then((usuario) => {
      console.log(usuario);
      if (usuario) {
        if (bcrypt.compareSync(Contraseña, usuario.Contrasenia)) {
          generarJWT({ id: usuario._id }).then((token) => {
            res.cookie("token", token, {
              httpOnly: true,
            });
            res.status(200).send("Authorized");
          });
        } else {
          res.status(400).send("Bad Login");
        }
      } else {
        res.status(404).json({ msg: "El usuario no existe" });
      }
      // bcrypt
      //   .compareSync(Contraseña, usuario.Contrasenia)
      //   .then((resultado) => {
      //     if (resultado) {
      //       generarJWT({ id: buscarUsuario._id }).then((token) =>
      //         res.json({ msg: "Inicio de sesión exitoso", token })
      //       );
      //     } else {
      //       return res.status(401).json({
      //         msg: "El usuario o contraseña no coiciden",
      //       });
      //     }
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

export const sesion = async (req, res) => {
  const cookie = req.headers.cookie
  console.log(cookie);

  if (cookie) {
    const token = cookie.trim().substr(6, cookie.length - 1);
    validarJWT(token).then((resultado) => {
      resultado
        ? res.send(resultado).status(200)
        : res.status(400).send({ loggedIn: false });
    });
  } else {
    res.status(404).send({ loggedIn: false });
  }
};

export const logOut = async (req, res) => {
  res.clearCookie("token").send("hola");
};

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
