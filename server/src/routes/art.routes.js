const { listar, agregar, leer, buscar, buscarUser} = require('../controllers/art.controller');
const router = require('express').Router();

//Ver todos los articulos
router.get('/articulos', listar);
//Buscar por Nombre
router.post('/articulos',buscar)
//Buscar por usuario
router.post('/articulos/usuario/:user',buscarUser)
//Leer un articulo
router.get('/articulo/:id',leer);
//Agregar un articulo
router.post('/articulo', agregar);
module.exports = router;