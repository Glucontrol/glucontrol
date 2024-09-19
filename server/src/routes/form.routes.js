import { InsulData, Insulina } from "../controllers/form.controller.js";
import { Router } from "express";
const router = Router();
router.post("/registrosI", Insulina);

router.post("/insulina", InsulData);

export default router;
