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
import verifyUser from "../middlewares/getUser.js";
const router = Router();
const upload = multer({
  dest: "./src/uploads/",
});
// Creamos una ruta /register con el metodo 'POST' ya que recibiremos datos desde el cliente a traves de este metodo.
router.post("/signup", upload.single("profile"), register);

router.patch("/profile", upload.single("profile"), verifyUser, edit);

// Lo mismo que el registro pero con el login.
router.post("/login", login);
//Este es para ver todos los usuarios
router.get("/admin", selectall);
//Para ver un usuario en especifico
router.post("/admin/:user", verifyUser, user);
router.delete("/admin/:user", eliminar);
//Ver si está el usuario iniciada
router.get("/sesion", verifyUser, sesion);
// Exportamos las rutas
router.delete("/logout", logOut);
router.put("/me", datosUsuario);

export default router;
