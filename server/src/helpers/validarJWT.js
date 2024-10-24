import jwt from "jsonwebtoken";
import { client } from "../db/database.js";
import { generarOID } from "./generarOID.js";

export const validarJWT = async (token, error, next) => {
  try {
    const { id } = jwt.verify(token, "mysecret");
    const o_id = generarOID(id);
    const usuario = client
      .db("glucontrol")
      .collection("usuarios")
      .findOne({ _id: o_id });
    // En caso de que no exista retornamos false.
    if (usuario == null) {
      return false;
    } else {
      return usuario;
    }
  } catch (error) {
    // Si ocurre un error lo mostramos por consola y retornamos false.
    return false;
  }
};
