import React, { useState } from "react";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import "@fortawesome/fontawesome-free/css/all.min.css";

export const AuthForm = () => {
  const [isSignUpActive, setIsSignUpActive] = useState(false);

  const toggleForm = () => {
    setIsSignUpActive(!isSignUpActive);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 via-gray-200 to-blue-200">
      <div className="relative w-full max-w-4xl bg-white border border-gray-300 rounded-lg shadow-lg flex">
        {/* Toggle panel */}
        <div className="toggle-container absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out rounded-[150px_0_0_100px] z-10">
          <div
            className={`toggle bg-gradient-to-r from-indigo-600 to-purple-700 text-white absolute left-[-100%] w-[200%] h-full transition-transform duration-700 ease-in-out ${
              isSignUpActive ? "translate-x-[-50%]" : "translate-x-0"
            } rounded-lg`}
          >
            {/* Panel de alternancia derecha (Registro) */}
            <div
              className={`toggle-panel toggle-left absolute w-1/2 h-full flex flex-col items-center justify-center px-8 text-center transition-transform duration-700 ease-in-out ${
                isSignUpActive ? "translate-x-0" : "-translate-x-0"
              }`}
            >
              <h1 className="text-4xl font-bold">¡Bienvenido de vuelta!</h1>
              <p className="text-sm mt-4 mb-5">
                Ingrese sus datos para acceder a todas las funciones
              </p>
              <button
                className="bg-transparent border border-white text-white font-semibold py-2 px-10 rounded-lg text-sm uppercase"
                onClick={toggleForm}
              >
                Iniciar Sesión
              </button>
            </div>

            {/* Panel de alternancia izquierda (Iniciar Sesión) */}
            <div
              className={`toggle-panel toggle-right absolute w-1/2 h-full flex flex-col items-center justify-center px-8 text-center transition-transform duration-700 ease-in-out ${
                isSignUpActive ? "translate-x-0" : "translate-x-[100%]"
              }`}
            >
              <h1 className="text-4xl font-bold">¡Bienvenido!</h1>
              <p className="text-sm mt-4 mb-5">
                Completa el formulario para acceder a todas las funciones
              </p>
              <button
                className="bg-transparent border border-white text-white font-semibold py-2 px-10 rounded-lg text-sm uppercase"
                onClick={toggleForm}
              >
                Registrarse
              </button>
            </div>
          </div>
        </div>

        {/* Formulario de Registro o Login */}
        {isSignUpActive ? (
          <Register toggleForm={toggleForm} />
        ) : (
          <Login toggleForm={toggleForm} />
        )}
      </div>
    </div>
  );
};
