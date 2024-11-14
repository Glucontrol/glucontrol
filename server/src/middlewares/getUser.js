import jwt from "jsonwebtoken";
import { client } from "../db/database.js";
import { generarOID } from "../helpers/generarOID.js";

const verifyUser = async (req, res, next) => {
  const { cookie } = req.headers;
  let token = cookie.includes(";") ? cookie.split(";")[0] : cookie.substr(6);
  try {
    generarOID(jwt.verify(token, "mysecret").id)
      .then((o_id) =>
        client.db("glucontrol").collection("usuarios").findOne({ _id: o_id })
      )
      .then(async (resp) => {
        if (resp) {
          req.user = resp;
          next();
        }
      });
  } catch (err) {
    res.status(500).send(err);
  }
};

export default verifyUser;
