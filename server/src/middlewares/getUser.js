import jwt from "jsonwebtoken";
import { client } from "../db/database.js";
import { generarOID } from "../helpers/generarOID.js";

const getCookie = (cookie) => {
  if (cookie) {
    const cookies  = cookie.includes(";") ? cookie.split(";") : cookie.substr(6);
    const token = cookies.find((el)=>el.includes("token") ? el : false)
    return token.substr(7)
  }

}

const verifyUser = async (req, res, next) => {
  const { cookie } = req.headers;
  const token = getCookie(cookie)
  console.log(token)
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
