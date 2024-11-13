import { Router } from "express";
import {
  agregarFavorito,
  obtenerEstadoFavorito,
  listarFavoritos,
<<<<<<< HEAD
} from "../controllers/fav.controllers.js";
import verifyUser from "../middlewares/getUser.js";
const router = Router();

router.post("/favoritos", verifyUser, agregarFavorito);
router.get("/favoritos/:articleId", verifyUser, obtenerEstadoFavorito);
router.get("/favoritos", verifyUser, listarFavoritos);
=======
} from "../controllers/fav.controller.js";

const router = Router();

router.post("/favoritos", agregarFavorito);
router.get("/favoritos/:articleId", obtenerEstadoFavorito);
router.get("/favoritos", listarFavoritos);
>>>>>>> 1690338a21bcbe15815cc59e1e758b01e1b81145

export default router;
