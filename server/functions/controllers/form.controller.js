const { connectDB } = require("../db/database");
const verifyJWT = require("../helpers/validarJWT")
const form = {};

form.Insulina = async (req,res) =>{
    const nConnection = await connectDB();
    const { token } = await req.headers;
    const { Id_Usuario } = await verifyJWT(token)
    const [query] = await nConnection.query('SELECT * FROM REGISTROS WHERE Id_Usuario = ?', [Id_Usuario])
    res.json(query);
}
form.InsulData = async (req,res) =>{
    const nConnection = await connectDB();
    const { Tipo, Dosis, Fecha, Via, Accion, Adicional } = req.body
    const { token } = req.headers
    console.log(req.body)
    const {Id_Usuario} = await verifyJWT(token)
    console.log(Tipo,Dosis,Fecha,Via,Accion,Adicional)
    const query = await nConnection.query('INSERT INTO REGISTROS(Tipo,Dosis,Fecha,Via,Accion,Adicional,Id_Usuario) VALUES (?,?,?,?,?,?,?)',	 [Tipo, Dosis, Fecha, Via, Accion, Adicional, Id_Usuario])
}

module.exports = form;