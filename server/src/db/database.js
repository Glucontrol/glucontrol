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
    await client.connect();
    await client.db("admin").command({ping: 1})
    console.log('Conectao'); 
};
// Exportamos la funcion para realizar la conexion desde cualquier archivo.
module.exports = cliente


