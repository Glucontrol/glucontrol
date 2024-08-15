const verifyJWT = require("../helpers/validarJWT");
const form = {};
const { ObjectId } = require("mongodb");
const cliente = require("../db/database");
const client = cliente();

form.Insulina = async (req, res) => {
  client.connect();
  const { token } = await req.headers;
  const { _id } = await verifyJWT(token);
  const query = client
    .db("glucontrol")
    .collection("registros")
    .find({ De: _id });
  res.send(await query.toArray());
};
form.InsulData = async (req, res) => {
  client.connect();
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

module.exports = form;
