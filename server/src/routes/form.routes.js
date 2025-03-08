import {
  deleteRegister,
  InsulData,
  Insulina,
  leerRegistros,
} from "../controllers/form.controller.js";
import getUser from "../middlewares/getUser.js";
import { Router } from "express";
const router = Router();
router.get("/registrosI", getUser, Insulina);

router.post("/insulina", getUser, InsulData);
router.get("/registrosI/:fecha", getUser, leerRegistros);
router.delete("/registros/:id", getUser, deleteRegister);

export default router;
