import { Router } from "express";
import { agregarFavorito, listarFavoritos } from "../controllers/fav.controllers";

const router = Router();

router.post('/favoritos/:id', agregarFavorito);
router.post('/favoritos', listarFavoritos);

export default router