const cliente = require("../db/database");
const bcrypt = require('bcrypt');
const generarJWT = require("../helpers/generarJWT");
const verifyJWT = require("../helpers/validarJWT")
const { ObjectId } = require("mongodb");

// Definimos un objeto vacio con el nombre 'ctrl' (abreviatura de controller).
const ctrl = {};

//Empezamos a ir agrengando los controladores a dicho objeto.
ctrl.register = async (req, res) =>{
    const { Nombre, Email, Contraseña } = req.body;
    const client = cliente()
    client.connect()
    const hashContrasenia = bcrypt.hashSync(Contraseña, 10);
    client.db('glucontrol').collection('usuarios').insertOne({Nombre:Nombre,Email:Email,Contrasenia:hashContrasenia})
    res.json({
        msg: 'Registrado correctamente'
    });
}

ctrl.login = async (req, res) => {
    const { Nombre, Contraseña } = req.body;
    const client = cliente();
    const buscarUsuario = await client.db('glucontrol').collection('usuarios').findOne({Nombre:Nombre})
    // En caso de que no se encuentre ningun usuario, retornamos un error.
    if(buscarUsuario == null){
        return res.status(400).json({
            msg: 'El usuario no existe'
        })
    }

    // Comparamos las contraseñas con el metodo compareSync que nos devolvera un true o false.
    const validarContrasenia = bcrypt.compareSync(Contraseña, buscarUsuario.Contrasenia);

    // En caso de que no coincidan, retornamos un error sin dar información especifica de lo que fallo.
    if(!validarContrasenia){
        return res.status(401).json({
            msg: 'El usuario o contraseña no coiciden'
        })
    }

    // Hacemos uso del helper para generar el token y le pasamos el id.
    const token = await generarJWT({id: buscarUsuario._id});

    //Retornamos el token con un mensaje al cliente.
    return res.json({
        msg: 'Inicio de sesión exitoso',
        token
    })
}
ctrl.selectall = async (req,res) =>{
    const client = cliente()
    client.connect()
    const usuarios = client.db('glucontrol').collection('usuarios').find({})
    res.send(await usuarios.toArray())
}
ctrl.eliminar = async (req,res) =>{
    const {Id} = req.body
    const client = cliente()
    console.log(ObjectId.isValid(Id))
    const o_id = ObjectId.createFromHexString(Id)
    const usuario = await client.db('glucontrol').collection('usuarios').findOne({"_id":o_id})
    if (!usuario){
        res.status(404).send("No se encontró el usuario")
    }else{
        await client.db('glucontrol').collection('usuarios').deleteOne({"_id":o_id})
        res.status(200).send('Usuario Eliminado');
    }

}
ctrl.sesion = async (req,res) =>{
    const { token } = req.headers
    const client = cliente()
    client.connect()
    res.send(await verifyJWT(token))
} 
ctrl.user = async (req,res) =>{
    const {id} = req.params
    const client = cliente()
    client.connect()
    try{
        if (ObjectId.isValid(id)){
            const o_id = ObjectId.createFromHexString(id)
            const usuario = await client.db('glucontrol').collection('usuarios').findOne({"_id":o_id})
            if (!usuario){
                res.status(404).send("No se encontró el usuario")
            }else{
                res.send(usuario);
            }
        }
    }
        catch(error){
        console.log(error)
    }
}
// Exportamos el objeto con los controladores.
module.exports = ctrl;