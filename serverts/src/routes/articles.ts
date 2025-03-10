import {Router} from "express";
import Controller from "../controllers/articles";
const router : Router = Router()

router.get("/articulos",Controller.list) 

export default router;
