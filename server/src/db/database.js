const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = "mongodb+srv://usuario:1234@proyecto.wasewhi.mongodb.net/?retryWrites=true&w=majority&appName=Proyecto"
function cliente(){
    return new MongoClient(uri, {
        serverApi:{
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true
        }
    })
}
async function run() {
    const client = cliente()
    await client.connect();
    const resposta = await client.db("admin").command({ping: 1})
    console.log(resposta); 
};
//Esto es para testear si funca la base de datos
run();
// Exportamos la funcion para realizar la conexion desde cualquier archivo.
module.exports = cliente


