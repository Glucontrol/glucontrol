import {
  listar,
  agregar,
  leer,
  buscarPorUsuario,
} from "../controllers/art.controller.js";

import { Router } from "express";
const router = Router();

//Ver todos los articulos
router.get("/articulos", listar);
//Buscar por usuario
router.get("/articles/user", buscarPorUsuario);
//Leer un articulo
router.get("/articulo/:id", leer);
//Agregar un articulo
router.post("/articulo", agregar);
export default router;
