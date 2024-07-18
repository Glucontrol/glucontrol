const jwt = require('jsonwebtoken');
const cliente = require('../db/database');
const { ObjectId } = require('mongodb');

const validarJWT = async (token) => {
    try {
        const { id } = jwt.verify(token, 'mysecret');
        const client = cliente()
        client.connect()
        const o_id = new ObjectId(id)
        const usuario = client.db('glucontrol').collection('usuarios').findOne({_id:o_id})
        // En caso de que no exista retornamos false.
        if(usuario == null){
            return false;
        } else {
            //Caso contrario retornamos el usuario.
            return usuario;
        }
        
    } catch (error) {
        // Si ocurre un error lo mostramos por consola y retornamos false.
        console.log(error);
        return false;
    }

}

module.exports = validarJWT;