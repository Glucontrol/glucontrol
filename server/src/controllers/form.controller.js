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
          De: req.user._id,
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
  client
    .db("glucontrol")
    .collection("registros")
    .find({
      Fecha: { $regex: `^${fecha}` }, // Usar regex para que coincida solo la parte de la fecha
      De: req.user._id,
    })
    .toArray()
    .then((peticion) => res.send(peticion))
    .catch((error) => res.status(500).send({ error: "Error en la consulta" }));
};

export const deleteRegister = async (req, res) => {
  console.log("hola", req.params.id);

  const id = generarOID(req.params.id).then((o_id) => {
    client
      .db("glucontrol")
      .collection("registros")
      .findOneAndDelete({
        _id: o_id,
        De: req.user._id,
      })
      .then((resp) => {
        console.log("salió", resp);
        if (resp) {
          res.send("Articulo Eliminado Con Exito").status(200);
        } else {
          res.send("No se ha podido eliminar el Articulo").status(500);
        }
      });
  });
};
