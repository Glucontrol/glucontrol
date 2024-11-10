import {
  register,
  login,
  selectall,
  eliminar,
  sesion,
  user,
  logOut,
  datosUsuario,
  edit,
} from "../controllers/auth.controller.js";
import multer from "multer";

import { Router } from "express";
const router = Router();
const upload = multer({
  dest: "./src/uploads/",
});
// Creamos una ruta /register con el metodo 'POST' ya que recibiremos datos desde el cliente a traves de este metodo.
router.post("/signup", upload.single("profile"), register);

router.patch("/profile", upload.single("profile"), edit);

// Lo mismo que el registro pero con el login.
router.post("/login", login);
//Este es para ver todos los usuarios
router.get("/admin", selectall);
//Para ver un usuario en especifico
router.post("/admin/:user", user);
//Para eliminar algún pobre diablo
router.post("/admin", eliminar);
//Ver si está el usuario iniciada
router.get("/sesion", sesion);
// Exportamos las rutas
router.delete("/logout", logOut);
router.put("/me", datosUsuario);

export default router;
