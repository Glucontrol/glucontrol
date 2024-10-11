import { validarJWT } from "../helpers/validarJWT.js";
import { client } from "../db/database.js";
import { generarOID } from "../helpers/generarOID.js";
const form = {};

export const Insulina = async (req, res) => {
  const cookie = req.headers.cookie;
  if (cookie) {
    const token = cookie.substr(6, cookie.length - 1);
    validarJWT(token).then(async (resultado) => {
      client
        .db("glucontrol")
        .collection("registros")
        .find({ De: resultado._id })
        .toArray()
        .then((array) => {
          res.send(array);
        });
    });
  } else {
    res.status(404).send({ loggedIn: false });
  }
};

export const InsulData = async (req, res) => {
  const { Tipo, Dosis, Fecha, Via, Accion, Adicional } = req.body;
  const cookie = req.headers.cookie;
  if (cookie) {
    const token = cookie.substr(6, cookie.length - 1);
    validarJWT(token).then((resultado) => {
      console.log(resultado);
      const peticion = client
        .db("glucontrol")
        .collection("registros")
        .insertOne({
          Tipo: Tipo,
          Dosis: Dosis,
          Fecha: Fecha,
          Via: Via,
          Accion,
          Adicional: Adicional,
          De: resultado._id,
        });
      res.send(peticion);
    });
  }
};

/* export const leerRegistros = async (req, res) => {
  const fecha = req.params.fecha;
  const cookie = req.headers.cookie;

  if (cookie) {
    const token = cookie.substr(6, cookie.length - 1);
    const resultado = await validarJWT(token);

    try {
      const peticion = await client
        .db("glucontrol")
        .collection("registros")
        .find({
          Fecha: { $regex: `^${fecha}` },
          De: resultado._id,
        })
        .toArray();

      res.send(peticion);
    } catch (error) {
      console.error("Error al obtener los registros:", error);
      res.status(500).json({ message: "Error al obtener los registros" });
    }
  } else {
    res.status(401).json({ message: "No se encontró cookie" });
  }
};
 */
/* export const leerRegistros = async (req, res) => {
  const fecha = req.params.fecha; // La fecha enviada en formato YYYY-MM-DD
  const cookie = req.headers.cookie;

  if (cookie) {
    const token = cookie.substr(6, cookie.length - 1);
    const resultado = await validarJWT(token);

    console.log(fecha);

    try {
      // Realizar la consulta buscando registros cuya fecha contenga la cadena de la fecha
      const peticion = await client
        .db("glucontrol")
        .collection("registros")
        .find({
          Fecha: { $regex: `^${fecha}` }, // Usa una expresión regular para coincidir con la fecha sin importar la hora
          De: resultado._id, // Filtra por el ID del usuario autenticado
        })
        .toArray();

      console.log("Registros encontrados:", peticion.length); // Verifica cuántos registros devuelve
      res.send(peticion);
    } catch (error) {
      console.error("Error al obtener los registros:", error);
      res.status(500).json({ message: "Error al obtener los registros" });
    }
  } else {
    res.status(401).json({ message: "No se encontró cookie" });
  }
};
 */
export const leerRegistros = async (req, res) => {
  const fecha = req.params.fecha; // Fecha en formato YYYY-MM-DD
  const cookie = req.headers.cookie;

  if (cookie) {
    const token = cookie.substr(6, cookie.length - 1);
    validarJWT(token).then((resultado) => {
      client
        .db("glucontrol")
        .collection("registros")
        .find({
          Fecha: { $regex: `^${fecha}` }, // Usar regex para que coincida solo la parte de la fecha
          De: resultado._id,
        })
        .toArray()
        .then((peticion) => res.send(peticion))
        .catch((error) =>
          res.status(500).send({ error: "Error en la consulta" })
        );
    });
  } else {
    res.status(401).send({ error: "Usuario no autenticado" });
  }
};
