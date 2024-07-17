const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = "mongodb+srv://ezequielafeita;QdngbLQUKTaLc32Y@proyecto.wasewhi.mongodb.net/?retryWrites=true&w=majority&appName=Proyecto";

const client = new MongoClient(uri, {
    serverApi:{
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

async function run() {
    try{
        await client.connect();
    
    await client.db("admin").command({ping: 1})
    console.log('Anduvo equisde'); 
    }finally{
        await client.close();
    }
}
run().catch(console.dir)