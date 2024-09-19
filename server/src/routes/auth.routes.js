import {
  register,
  login,
  selectall,
  eliminar,
  sesion,
  user,
} from "../controllers/auth.controller.js";

import { Router } from "express";
const router = Router();

// Creamos una ruta /register con el metodo 'POST' ya que recibiremos datos desde el cliente a traves de este metodo.
router.post("/register", register);

// Lo mismo que el registro pero con el login.
router.post("/login", login);
//Este es para ver todos los usuarios
router.get("/admin", selectall);
//Para ver un usuario en especifico
router.post("/admin/:user", user);
//Para eliminar algún pobre diablo
router.post("/admin", eliminar);
//Ver si está el usuario iniciada
router.post("/sesion", sesion);
// Exportamos las rutas

export default router;
