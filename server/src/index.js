//Requerimos las dependencias.
import express from "express";
import cors from "cors";
import morgan from "morgan";
const port = process.env.URL || 8080;
//Inicializamos express.
const app = express();

//Aplicamos los middlewares.
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
); // cors para que nos permita realizar peticiones desde cualquier cliente.
app.use(morgan("dev")); // morgan para mostrar informacion acerca de las peticiones que llegan a nuestro servidor.
app.use(express.json()); // express.json para que nuestro servidor pueda reconocer los json que recibimos por el body.

import formRouter from "./routes/form.routes.js";
import artRouter from "./routes/art.routes.js";
import authRouter from "./routes/auth.routes.js";
import recRouter from "./routes/rec.routes.js";
//Requerimos nuestras rutas.

app.use(formRouter);
app.use(artRouter);
app.use(authRouter);
app.use(recRouter);

//Configuramos el puerto al que escuchara nuestro servidor.
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
