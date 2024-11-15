import { lazy } from "react";

export const Homepage = lazy(() => import("./Home"));
export const Articulopage = lazy(() => import("./Articulo"));
export const Articulospage = lazy(() => import("./Articulos"));
export const Loginpage = lazy(() => import("./login"));
export const Logoutpage = lazy(() => import("./Logout"));
export const Registerpage = lazy(() => import("./register"));
export const Usuariopage = lazy(() => import("./userPage"));
export const Registrospage = lazy(() => import("./Registros"));
export const Registropage = lazy(() => import("./Registro"));
export const CrearArticulopage = lazy(() => import("./crearArticulo"));
export const CrearRegistropage = lazy(() => import("./crearRegistro"));
export const Landingpage = lazy(() => import("./Landing"));
