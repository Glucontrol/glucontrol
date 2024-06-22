const { register, login, selectall, eliminar } = require('../controllers/auth.controller');

//requerimos el metodo router de express y lo inicializamos.
const router = require('express').Router();

// Creamos una ruta /register con el metodo 'POST' ya que recibiremos datos desde el cliente a traves de este metodo.
router.post('/register', register);

// Lo mismo que el registro pero con el login.
router.post('/login', login);
//Este es para ver todos los usuarios
router.get('/admin',selectall)
//Para eliminar algún pobre diablo
router.post('/admin',eliminar);

// Exportamos las rutas
module.exports = router;