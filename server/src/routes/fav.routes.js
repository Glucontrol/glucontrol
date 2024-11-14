import { Router } from "express";
import {
  agregarFavorito,
  obtenerEstadoFavorito,
  listarFavoritos,
} from "../controllers/fav.controller.js";
import getUsers from "../middlewares/getUser.js";

const router = Router();

router.post("/favoritos", getUsers, agregarFavorito);
router.get("/favoritos/:articleId", getUsers, obtenerEstadoFavorito);
router.get("/favoritos", getUsers, listarFavoritos);

export default router;
