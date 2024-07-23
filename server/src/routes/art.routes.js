const { listar, agregar, leer, buscar} = require('../controllers/art.controller');
const router = require('express').Router();

//Ver todos los articulos
router.get('/articulos', listar);
//Buscar por Nombre
router.post('/articulos',buscar)
//Leer un articulo
router.get('/articulo/:id',leer);
//Agregar un articulo
router.post('/articulo', agregar);
module.exports = router;