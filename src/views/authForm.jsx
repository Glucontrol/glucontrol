import React, { useState } from "react";
import { Register } from "./register";
import { Login } from "./login";
import "@fortawesome/fontawesome-free/css/all.min.css";

export const AuthForm = () => {
  const [isSignUpActive, setIsSignUpActive] = useState(false);

  const toggleForm = () => {
    setIsSignUpActive((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 via-gray-200 to-blue-200">
      <div className="relative w-full max-w-4xl bg-white border border-gray-300 rounded-lg shadow-lg flex overflow-hidden">
        {/* Panel de Alternancia */}
        <div className="w-full flex flex-col items-center justify-center py-4 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-lg">
          <div className="flex space-x-4 items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold">
                {isSignUpActive ? "¡Bienvenido!" : "¡Bienvenido de vuelta!"}
              </h1>
              <p className="text-sm mt-4 mb-5">
                {isSignUpActive
                  ? "Completa el formulario para acceder a todas las funciones"
                  : "Completa el formulario para acceder a todas las funciones"}
              </p>
            </div>
          </div>
          <button
            onClick={toggleForm}
            className="py-2 px-4 rounded-lg bg-white text-indigo-600 font-semibold hover:bg-indigo-100 transition-all duration-300"
          >
            {isSignUpActive ? "Iniciar Sesión" : "Registrarse"}{" "}
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>

        {/* Panel de Inicio de Sesión */}
        <div
          className={`form-container sign-in w-full p-8 flex items-center justify-center transition-all duration-700 ${
            isSignUpActive ? "hidden" : "flex"
          }`}
        >
          <Login />
        </div>

        {/* Panel de Registro */}
        <div
          className={`form-container sign-up w-full p-8 flex items-center justify-center transition-all duration-700 ${
            isSignUpActive ? "flex" : "hidden"
          }`}
        >
          <Register />
        </div>
      </div>
    </div>
  );
};
