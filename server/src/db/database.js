import { MongoClient, ServerApiVersion } from "mongodb";
const uri =
  "mongodb+srv://usuario:1234@proyecto.wasewhi.mongodb.net/?retryWrites=true&w=majority&appName=Proyecto";
function cliente() {
  return new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: false,
      deprecationErrors: true,
    },
  });
}

async function run() {
  const client = cliente();
  await client.connect();
}
//Esto es para testear si funca la base de datos
run();
// Exportamos la funcion para realizar la conexion desde cualquier archivo.
export const client = cliente();
