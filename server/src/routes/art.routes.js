import {
  listar,
  agregar,
  leer,
  buscarPorUsuario,
  deleteArticle,
  edit,
} from "../controllers/art.controller.js";

import multer from "multer";

const upload = multer({
  dest: "./src/uploads/",
});
import { Router } from "express";
const router = Router();

//Ver todos los articulos
router.get("/articulos", listar);
//Buscar por usuario
router.get("/articles/user", buscarPorUsuario);
//Leer un articulo
router.get("/articulo/:id", leer);
//Agregar un articulo
router.post("/articulo", upload.single("photo"), agregar);
//Editar Articulo
router.patch("/article/:id", upload.single("photo"), edit);

router.delete("/article/:id", deleteArticle);
export default router;
