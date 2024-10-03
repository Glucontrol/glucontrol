import { ObjectId } from "mongodb";
export const generarOID = (oid) => {
    if (ObjectId.isValid(oid)) {
        return ObjectId.createFromHexString(oid)
    }else{
        return false
    }
}