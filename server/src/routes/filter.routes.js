import {
  buscarPorPalabrasClave,
  filtrarPorFecha,
  filtrarPorTema,
} from "../controllers/filter.controller.js";

import { Router } from "express";
const router = Router();

router.get("/busqueda", buscarPorPalabrasClave);
router.get("/fecha", filtrarPorFecha);
router.get("/tema", filtrarPorTema);

export default router;
