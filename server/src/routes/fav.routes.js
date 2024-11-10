import { Router } from "express";
import {
  agregarFavorito,
  obtenerEstadoFavorito
} from "../controllers/fav.controllers.js";

const router = Router();

router.post("/favoritos", agregarFavorito);
router.get("/favoritos/:articleId", obtenerEstadoFavorito);



export default router;
