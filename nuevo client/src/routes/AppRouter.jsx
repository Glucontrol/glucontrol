import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "../views/Landing.jsx";
import { Articulos } from "../views/Articulos.jsx";
import { Articulo } from "../views/Articulo.jsx";
import { Login } from "../views/login.jsx";
import { Home } from "../views/Home.jsx";
import { CrearArticulo } from "../views/crearArticulo.jsx";
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/articulos" element={<Articulos />} />
        <Route path="/articulo" element={<Articulo />} />

        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>

        <Route path="/crear" element={<CrearArticulo />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;
