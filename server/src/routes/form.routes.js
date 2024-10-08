import {
  InsulData,
  Insulina,
  leerRegistros,
} from "../controllers/form.controller.js";
import { Router } from "express";
const router = Router();
router.get("/registrosI", Insulina);

router.post("/insulina", InsulData);
router.get("/registrosI/:fecha", leerRegistros);

export default router;
