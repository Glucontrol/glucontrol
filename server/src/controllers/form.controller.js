import { validarJWT } from "../helpers/validarJWT.js";
const form = {};
import { ObjectId } from "mongodb";
import { client } from "../db/database.js";

export const Insulina = async (req, res) => {
  const { token } = await req.headers;
  const { _id } = await verifyJWT(token);
  const query = client
    .db("glucontrol")
    .collection("registros")
    .find({ De: _id });
  res.send(await query.toArray());
};

export const InsulData = async (req, res) => {
  const { Tipo, Dosis, Fecha, Via, Accion, Adicional } = req.body;
  const { token } = req.headers;
  const { _id } = await verifyJWT(token);
  const peticion = client.db("glucontrol").collection("registros").insertOne({
    Tipo: Tipo,
    Dosis: Dosis,
    Fecha: Fecha,
    Via: Via,
    Accion,
    Adicional: Adicional,
    De: _id,
  });
  res.send(peticion);
};