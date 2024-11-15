import jwt from "jsonwebtoken";
import { client } from "../db/database.js";
import { generarOID } from "../helpers/generarOID.js";

const verifyUser = async (req, res, next) => {
  const { cookie } = req.headers;
  let token = "";
  if (cookie) {
    token = cookie.includes(";") ? cookie.split(";")[0] : cookie.substr(6);
    console.log(token);
  }

  try {
    // Verificamos el token y obtenemos el id
    const decoded = jwt.verify(token, "mysecret");
    const o_id = await generarOID(decoded.id);

    // Buscamos al usuario en la base de datos
    const user = await client
      .db("glucontrol")
      .collection("usuarios")
      .findOne({ _id: o_id });

    if (user) {
      req.user = user;
      return next(); // Si el usuario es encontrado, continuamos con el siguiente middleware
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error verifying user" });
  }
};

export default verifyUser;
