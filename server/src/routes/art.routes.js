import {
  listar,
  agregar,
  leer,
  buscarPorUsuario,
  deleteArticle,
  edit,
  verificarArticulo,
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
router.post("/articulo", upload.single("photo"), verifyUser, agregar);
//Editar Articulo
router.patch("/article/:id", upload.single("photo"), verifyUser, edit);

router.delete("/article/:id", verifyUser, deleteArticle);

//verificar articulo
router.patch("/articulo/:id", verifyUser, verificarArticulo);
export default router;
