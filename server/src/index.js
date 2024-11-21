//Requerimos las dependencias.
import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();
//Inicializamos express.
const port = process.env.URL || 8080;

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
import articlesRoutes from "./routes/art.routes.js";
import userRoutes from "./routes/auth.routes.js";
import favRouter from "./routes/fav.routes.js";
import notificationRouter from "./routes/notifications.routes.js";
//Requerimos nuestras rutas.

app.use(formRouter);
app.use(articlesRoutes);
app.use(userRoutes);
app.use(favRouter);
app.use(notificationRouter);

//Configuramos el puerto al que escuchara nuestro servidor.
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
