import { Router } from "express";
import {
  agregarFavorito,
  listarFavoritos,
} from "../controllers/fav.controllers.js";

const router = Router();

router.post("/favoritos/:id", agregarFavorito);
router.get("/favoritos", listarFavoritos);

export default router;
