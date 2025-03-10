import * as express from "express"
import Articles from "./routes/articles.js"
const app: express.Application = express()

app.use(express.json())
//Rutas
app.use(Articles)
app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})