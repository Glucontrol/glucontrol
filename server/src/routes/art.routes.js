const { listar, agregar, leer} = require('../controllers/art.controller');
const router = require('express').Router();

//Ver todos los articulos
router.get('/articulos', listar);
//Leer un articulo
router.get('/articulo/:id',leer);
//Agregar un articulo
router.post('/articulo', agregar);
module.exports = router;