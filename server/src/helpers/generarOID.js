import { ObjectId } from "mongodb";
export const generarOID = async (req, res) => {
  if (ObjectId.isValid(req)) {
    return ObjectId.createFromHexString(req);
  } else {
    return false;
  }
};
