import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Homepage,
  Articulospage,
  Articulopage,
  Loginpage,
  Logoutpage,
  Registerpage,
  Usuariopage,
  Registrospage,
  Registropage,
  CrearArticulopage,
  CrearRegistropage,
  Landingpage,
} from "../views/Index.jsx";
import PrivateRoutes from "../routes/PrivateRoutes.jsx";
import PublicRoutes from "./publicRoutes.jsx";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Registerpage />} />
        </Route>

        {/* Rutas privadas */}
        <Route element={<PrivateRoutes />}>
          <Route path="/articulos" element={<Articulospage />} />
          <Route path="/logout" element={<Logoutpage />} />
          <Route path="/articulo" element={<Articulopage />} />
          <Route path="/me" element={<Usuariopage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/crearRegistro" element={<CrearRegistropage />} />
          <Route path="/crearArticulo" element={<CrearArticulopage />} />
          <Route path="/Registros" element={<Registrospage />} />

          {/* Rutas de edición */}
          <Route path="/edit/article/*" element={<CrearArticulopage />} />
          <Route path="/edit/user" element={<Registerpage />} />
        </Route>

        {/* Rutas de registros */}
        <Route path="/Registro/:fecha" element={<Registropage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
