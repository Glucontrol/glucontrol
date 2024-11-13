import { validarJWT } from "../helpers/validarJWT.js";
import { generarOID } from "../helpers/generarOID.js";
import { client } from "../db/database.js";
const form = {};

export const Insulina = async (req, res) => {
  client
    .db("glucontrol")
    .collection("registros")
    .find({ De: req.user._id })
    .toArray()
    .then((array) => {
      res.send(array);
    });
};

export const InsulData = async (req, res) => {
  const {
    Tipo,
    Dosis,
    Fecha,
    Via,
    HbA1c,
    Adicional,
    TipoRegistro,
    Glucosa,
    EstadoFisico,
    MedicacionAdicional,
  } = req.body;
  const cookie = req.headers.cookie;
  if (cookie) {
    const token = cookie.substr(6, cookie.length - 1);
    validarJWT(token).then((resultado) => {
      console.log(resultado);
      const peticion = client
        .db("glucontrol")
        .collection("registros")
        .insertOne({
          Tipo: Tipo,
          Dosis: Dosis,
          Fecha: Fecha,
          HbA1c,
          Via: Via,
          Adicional: Adicional,
          De: resultado._id,
          TipoRegistro: TipoRegistro,
          Glucosa: Glucosa,
          EstadoFisico: EstadoFisico,
          MedicacionAdicional: MedicacionAdicional,
        });
      res.send(peticion);
    });
  }
};

export const leerRegistros = async (req, res) => {
  const fecha = req.params.fecha; // Fecha en formato YYYY-MM-DD
  const cookie = req.headers.cookie;

  if (cookie) {
    const token = cookie.substr(6, cookie.length - 1);
    validarJWT(token).then((resultado) => {
      client
        .db("glucontrol")
        .collection("registros")
        .find({
          Fecha: { $regex: `^${fecha}` }, // Usar regex para que coincida solo la parte de la fecha
          De: resultado._id,
        })
        .toArray()
        .then((peticion) => res.send(peticion))
        .catch((error) =>
          res.status(500).send({ error: "Error en la consulta" })
        );
    });
  } else {
    res.status(401).send({ error: "Usuario no autenticado" });
  }
};

export const deleteRegister = async (req, res) => {
  const cookie = req.headers.cookie;
  console.log("hola", req.params.id);
  if (cookie) {
    const token = cookie.split("=")[1];
    const Usuario = await validarJWT(token);
    console.log(Usuario);
    const id = generarOID(req.params.id);
    client
      .db("glucontrol")
      .collection("registros")
      .findOneAndDelete({
        _id: id,
        De: Usuario._id,
      })
      .then((resp) => {
        console.log("salió", resp);
        if (resp) {
          res.send("Articulo Eliminado Con Exito").status(200);
        } else {
          res.send("No se ha podido eliminar el Articulo").status(500);
        }
      });
  }
};
