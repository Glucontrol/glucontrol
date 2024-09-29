import { client } from "../db/database.js";
import bcrypt from "bcrypt";
import { generarJWT } from "../helpers/generarJWT.js";
import { generarOID } from "../helpers/generarOID.js";
import { ObjectId } from "mongodb";
// Definimos un objeto vacio con el nombre 'export const  (abreviatura de controller).
//Empezamos a ir agrengando los controladores a dicho objeto.
export const register = async (req, res) => {
  const { Nombre, Email, Contraseña } = req.body;
  const hashContrasenia = bcrypt.hashSync(Contraseña, 10);
  client
    .db("glucontrol")
    .collection("usuarios")
    .insertOne({ Nombre: Nombre, Email: Email, Contrasenia: hashContrasenia });
  res.json({
    msg: "Registrado correctamente",
  })
};

export const login = async (req, res) => {
  const { Nombre, Contraseña } = req.body;
  client
    .db("glucontrol")
    .collection("usuarios")
    .findOne({ Nombre: Nombre }).then((usuario)=>{
      if (usuario){
        bcrypt.compareSync(Contraseña,usuario.Contrasenia).then((resultado)=>{
          if (resultado){
            generarJWT({ id: buscarUsuario._id }).then((token) => (res.json({msg:"Inicio de sesión exitoso",
              token
            })))
          }else{
            return res.status(401).json({
              msg: "El usuario o contraseña no coiciden",
            });
          }
        })
      }else{
        return res.status(400).json({
          msg: "El usuario no existe"
        })
      }
    })
  }

export const selectall = async (req, res) => {
  const usuarios = client.db("glucontrol").collection("usuarios").find({});
  res.send(await usuarios.toArray());
}

export const eliminar = async (req, res) => {
  const { Id } = req.body;
  const o_id = generarOID(Id)
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
  const { token } = req.headers;
  res.send(await verifyJWT(token));
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

