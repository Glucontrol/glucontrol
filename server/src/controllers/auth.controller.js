const { connectDB } = require("../db/database");
const bcrypt = require('bcrypt');
const generarJWT = require("../helpers/generarJWT");
const { connect } = require("../routes/auth.routes");

// Definimos un objeto vacio con el nombre 'ctrl' (abreviatura de controller).
const ctrl = {};

//Empezamos a ir agrengando los controladores a dicho objeto.
ctrl.register = async (req, res) =>{

    // Desestructuramos los datos que vienen del cuerpo de la peticion.
    const { nombre, apellido, usuario, correo, contrasenia } = req.body;

    //Hacemos la conexion a la base de datos.
    const connection = await connectDB();

    // Creamos la consulta.
    const sql = 'INSERT INTO USUARIOS (nombre,email) VALUES (?,?,?,?,?)';

    // Encriptamos la contraseña utilizando la libreria bcrypt.
    const hashContrasenia = bcrypt.hashSync(contrasenia, 10); // El segundo parametro es el numero de veces que se ejecuta el algoritmo de encriptación.

    // Ejecutamos la consulta.
    await connection.query(sql, [nombre, apellido, usuario, correo, hashContrasenia]);

    // Respondemos a nuestro cliente
    res.json({
        msg: 'Registrado correctamente'
    });
}

ctrl.login = async (req, res) => {

    const { usuario, contrasenia } = req.body;

    const connection = await connectDB();

    // Buscamos el usuario en la bd.
    const sql = 'SELECT * FROM USUARIOS WHERE USUARIO=? LIMIT 1';

    const [buscarUsuario] = await connection.query(sql, usuario);
    
    // En caso de que no se encuentre ningun usuario, retornamos un error.
    if(!buscarUsuario[0]){
        return res.status(400).json({
            msg: 'El usuario no existe'
        })
    }

    // Comparamos las contraseñas con el metodo compareSync que nos devolvera un true o false.
    const validarContrasenia = bcrypt.compareSync(contrasenia, buscarUsuario[0].contrasenia);

    // En caso de que no coincidan, retornamos un error sin dar información especifica de lo que fallo.
    if(!validarContrasenia){
        return res.status(401).json({
            msg: 'El usuario o contraseña no coiciden'
        })
    }

    // Hacemos uso del helper para generar el token y le pasamos el id.
    const token = await generarJWT({id: buscarUsuario[0].id});

    //Retornamos el token con un mensaje al cliente.
    return res.json({
        msg: 'Inicio de sesión exitoso',
        token
    })

}
ctrl.selectall = async (req,res) =>{
    const nConnection = await connectDB();
    const [todo] = await nConnection.query('SELECT * FROM USUARIOS;');
    
    res.json(todo)
}
ctrl.eliminar = async (req,res) =>{
    const nConnection = await connectDB();
    console.log(req.body.Id)
    nConnection.query("DELETE FROM USUARIOS WHERE ID_USUARIO = ?;", req.body.Id)
    res.send("Usuario Eliminado")
}
// Exportamos el objeto con los controladores.
module.exports = ctrl;