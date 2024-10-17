import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "../views/Landing.jsx";
import { Articulos } from "../views/Articulos.jsx";
import { Articulo } from "../views/Articulo.jsx";
import { Login } from "../views/login.jsx";
import User from "../views/userPage.jsx";
import { Home } from "../views/Home.jsx";
import { CrearArticulo } from "../views/crearArticulo.jsx";
import { CrearRegistro } from "../views/crearRegistro.jsx";
import { Registros } from "../views/Registros.jsx";
<<<<<<< HEAD
import { EditDiabeticProfile } from "../views/EditDiabeticProfile";
=======
import { Registro } from "../views/Registro.jsx";
>>>>>>> 75a2b975bee54a389d127b247e1b2f53289d25da

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/articulos" element={<Articulos />} />
        <Route path="/articulo" element={<Articulo />} />
        <Route path="/articulo" element={<Articulo />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/me" element={<User />}></Route>
        <Route path="/editProfile" element={<EditDiabeticProfile />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/crearArticulo" element={<CrearArticulo />}></Route>
        <Route path="/crearRegistro" element={<CrearRegistro />}></Route>
        <Route path="/Registros" element={<Registros />}></Route>
        <Route path="/Registro/:fecha" element={<Registro />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;
