import {
  listar,
  agregar,
  leer,
  buscarPorUsuario,
  deleteArticle,
  edit,
} from "../controllers/art.controller.js";
import verifyUser from "../middlewares/getUser.js";

import multer from "multer";

const upload = multer({
  dest: "./src/uploads/",
});
import { Router } from "express";
const router = Router();

//Ver todos los articulos
router.get("/articulos", listar);
//Buscar por usuario
router.get("/articles/user", verifyUser, buscarPorUsuario);
//Leer un articulo
router.get("/articulo/:id", leer);
//Agregar un articulo

router.post("/articulo", verifyUser, upload.single("photo"), agregar);
//Editar Articulo
router.patch("/article/:id", verifyUser, upload.single("photo"), edit);

router.delete("/article/:id", verifyUser, deleteArticle);
export default router;
