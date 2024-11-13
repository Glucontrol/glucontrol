import { Router } from "express";
import {
  agregarFavorito,
  obtenerEstadoFavorito,
  listarFavoritos,
} from "../controllers/fav.controllers.js";
import verifyUser from "../middlewares/getUser.js";
const router = Router();

router.post("/favoritos", verifyUser, agregarFavorito);
router.get("/favoritos/:articleId", verifyUser, obtenerEstadoFavorito);
router.get("/favoritos", verifyUser, listarFavoritos);

export default router;
