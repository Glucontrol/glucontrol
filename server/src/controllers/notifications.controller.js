import { client } from "../db/database.js";
import { generarOID } from "../helpers/generarOID.js";
import { Resend } from "resend";
const resend = new Resend("re_G56Hxu31_PFB4Wvm8TY3HZBFVuqmaufCk");
// Definimos un objeto vacio con el nombre 'export const  (abreviatura de controller).
//Empezamos a ir agrengando los controladores a dicho objeto.
export const newGmail = async (req, res) => {
  const { fecha } = req.body;
  if (fecha.trim() == "") {
    res.status(500).send("La fecha no puede estar vacía");
  } else {
    const hola = await resend.emails.send({
      from: "glucontrol@resend.dev",
      to: req.user.Email,
      subject: "Recordatorio",
      html: "<p>¡No te olvides de registrar tus niveles de </p> <h1>Glucosa</h1>",
      scheduledAt: fecha,
    });
    if (hola.error) {
      res.status(400).send("Error:" + "" + hola.error.name);
    } else {
      res.status(200).send("Recordatorio Creado ");
    }
  }
};
