import {
  listar,
  agregar,
  leer,
  buscar,
} from "../controllers/rec.controller.js";
import { Router } from "express";
const router = Router();

//Ver todos los articulos
router.get("/recetas", listar);
//Buscar por Nombre
router.post("/recetas", buscar);
//Leer un articulo
router.get("/receta/:id", leer);
//Agregar un articulo
router.post("/receta", agregar);

export default router;
