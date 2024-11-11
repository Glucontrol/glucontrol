import { Router } from "express";
import {
  agregarFavorito,
  obtenerEstadoFavorito,
  listarFavoritos
} from "../controllers/fav.controllers.js";

const router = Router();

router.post("/favoritos", agregarFavorito);
router.get("/favoritos/:articleId", obtenerEstadoFavorito);
router.get("/favoritos", listarFavoritos);


export default router;
