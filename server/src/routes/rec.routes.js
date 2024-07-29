const { listar, agregar, leer, buscar} = require('../controllers/rec.controller');
const router = require('express').Router();

//Ver todos los articulos
router.get('/recetas', listar);
//Buscar por Nombre
router.post('/recetas',buscar)
//Leer un articulo
router.get('/receta/:id',leer);
//Agregar un articulo
router.post('/receta', agregar);
module.exports = router;