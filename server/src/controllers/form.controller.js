import { validarJWT } from "../helpers/validarJWT.js";
import { client } from "../db/database.js";
import { generarOID } from "../helpers/generarOID.js";
const form = {};

export const Insulina = async (req, res) => {
  const cookie = req.headers.cookie;
  if (cookie) {
    const token = cookie.substr(6, cookie.length - 1);
    validarJWT(token).then(async (resultado) => {
      client
        .db("glucontrol")
        .collection("registros")
        .find({ De: resultado._id })
        .toArray()
        .then((array) => {
          res.send(array);
        });
    });
  } else {
    res.status(404).send({ loggedIn: false });
  }
};

export const InsulData = async (req, res) => {
  const { Tipo, Dosis, Fecha, Via, Accion, Adicional } = req.body;
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
          Via: Via,
          Accion,
          Adicional: Adicional,
          De: resultado._id,
        });
      res.send(peticion);
    });
  }
};

export const leerRegistros = async (req, res) => {
  const fecha = req.params.fecha;
  const cookie = req.headers.cookie;
  if (cookie) {
    const token = cookie.substr(6, cookie.length - 1);
    validarJWT(token).then((resultado) => {
      const peticion = client
        .db("glucontrol")
        .collection("registros")
        .find({
          Fecha: fecha,
          De: resultado._id,
        })
        .toArray();
      res.send(peticion);
    });
  }
};
