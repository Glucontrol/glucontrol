import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "../views/Landing.jsx";
import { Articulos } from "../views/Articulos.jsx";
import { Articulo } from "../views/Articulo.jsx";
import { Login } from "../views/login.jsx";
import Usuario from "../views/userPage.jsx";
import { Home } from "../views/Home.jsx";
import Logout from "../views/Logout.jsx";
import { CrearRegistro } from "../views/crearRegistro.jsx";
import { Registros } from "../views/Registros.jsx";

import { Register } from "../views/register.jsx";
import PrivateRoutes from "../routes/PrivateRoutes.jsx";
import { Registro } from "../views/Registro.jsx";
import { CrearArticulo } from "../views/crearArticulo.jsx";
import PublicRoutes from "./publicRoutes.jsx";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/articulos" element={<Articulos />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/articulo" element={<Articulo />} />
          <Route path="/me" element={<Usuario />}></Route>

          <Route path="/home" element={<Home />}></Route>
          <Route path="/crearRegistro" element={<CrearRegistro />}></Route>
          <Route path="/crearArticulo" element={<CrearArticulo />}></Route>
          <Route path="/Registros" element={<Registros />}></Route>
          <Route path="/Registros" element={<Registros />}></Route>

          {/* Editar */}
          <Route path="/edit/article/*" element={<CrearArticulo />} />
          <Route path="/edit/user" element={<Register />}></Route>
        </Route>
        <Route path="/Registro/:fecha" element={<Registro />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;
