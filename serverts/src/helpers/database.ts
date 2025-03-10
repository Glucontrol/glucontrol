import { MongoClient } from "mongodb";
import { uri,Options } from "./uri";
export const client = () : MongoClient => 
   new MongoClient(uri,Options);


//Esto es para testear si funca la base de datos
// async function run() {
//   const client = cliente();
//   await client.connect();
// }
// run();
// Exportamos la funcion para realizar la conexion desde cualquier archivo.