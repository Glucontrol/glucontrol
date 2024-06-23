const { connectDB } = require("../db/database");

const form = {};

form.Insulina = async (req,res) =>{
    const nConnection = await connectDB();
    const respuesta = await nConnection.query('SELECT * FROM REGISTROS')
    res.send(respuesta.json);
}
form.InsulData = async (req,res) =>{
    const nConnection = connectDB();
    const { Tipo, Dosis, Fecha, Via, Accion, Adicional } = req.body
    const { Id_Usuario } = req.header
    console.log(req.header)
    res.send(Id_Usuario)
    // await nConnection.query('INSERT INTO REGISTROS(Tipo,Dosis,Fecha,Via,Accion,Adicional,Id_Usuario) VALUES (?,?,?,?,?,?,?)')
}

module.exports = form;