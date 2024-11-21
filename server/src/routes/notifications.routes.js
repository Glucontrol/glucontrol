import { newGmail } from "../controllers/notifications.controller.js";
import verifyUser from "../middlewares/getUser.js";
import { Router } from "express";
const router = Router();
router.post("/newgmail", verifyUser, newGmail);

export default router;
