import { InsulData, Insulina } from "../controllers/form.controller.js";
import { Router } from "express";
const router = Router();
router.get("/registrosI", Insulina);

router.post("/insulina", InsulData);

export default router;
