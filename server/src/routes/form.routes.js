import {
  deleteRegister,
  InsulData,
  Insulina,
  leerRegistros,
} from "../controllers/form.controller.js";
import { Router } from "express";
const router = Router();
router.get("/registrosI", Insulina);

router.post("/insulina", InsulData);
router.get("/registrosI/:fecha", leerRegistros);
router.delete("/registros/:id", deleteRegister);

export default router;
