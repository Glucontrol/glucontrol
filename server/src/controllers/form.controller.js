const verifyJWT = require("../helpers/validarJWT");
const form = {};
const { ObjectId } = require("mongodb");
const cliente = require("../db/database");
const client = cliente();

form.Insulina = async (req, res) => {
  client.connect();
  const { token } = await req.headers;
  const { Id_Usuario } = await verifyJWT(token);
  const o_id = Id_Usuario;
  const [query] = client
    .db("glucontrol")
    .collection("registros")
    .find({ _id: `${o_id}` });
  res.json(query);
};
form.InsulData = async (req, res) => {
  client.connect();
  const { Tipo, Dosis, Fecha, Via, Accion, Adicional } = req.body;
  const { token } = req.headers;
  console.log(req.body);
  const { Id_Usuario } = await verifyJWT(token);
  console.log(Tipo, Dosis, Fecha, Via, Accion, Adicional);

  client.db("glucontrol").collection("registros").insertOne({
    Tipo: Tipo,
    Dosis: Dosis,
    Fecha: Fecha,
    Via: Via,
    Accion,
    Adicional: Adicional,
  });
};

module.exports = form;
