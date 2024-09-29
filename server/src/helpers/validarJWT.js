import jwt from "jsonwebtoken";
import { client } from "../db/database.js";
import { ObjectId } from "mongodb";

export const validarJWT = async (token, error) => {
  try {
    const { id } = jwt.verify(token, "mysecret");
    if (ObjectId.isValid(id)) {
      const o_id = ObjectId.createFromHexString(id.toString());
      const usuario = client
        .db("glucontrol")
        .collection("usuarios")
        .findOne({ _id: o_id });
      // En caso de que no exista retornamos false.
      if (usuario == null) {
        return false;
      } else {
        //Caso contrario retornamos el usuario.
        return usuario;
      }
    }
  } catch (error) {
    // Si ocurre un error lo mostramos por consola y retornamos false.
    console.log(error);
    console.log("Hubo un error");
    return false;
  }
};
