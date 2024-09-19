import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "../views/Landing.jsx";
import { Articulos } from "../views/Articulos.jsx";
import { Articulo } from "../views/Articulo.jsx";
import { Hola } from "./Hola.jsx";
import { Login } from "../views/login.jsx";
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/articulos" element={<Articulos />} />
        <Route path="/articulo" element={<Articulo />} />
        <Route path="/hola" element={<Articulos />}></Route>
        <Route path="/login" element={<Login/>}></Route>

      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;
