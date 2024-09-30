import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

export const Login = (props) => {
  const { toggleForm } = props;
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    if (loginEmail === "" || loginPassword === "") {
      setError(true);
      return;
    }
    setError(false);
    // Aquí puedes manejar el envío del formulario
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 via-gray-200 to-blue-200">
      <div className="relative w-full max-w-4xl bg-white border border-gray-300 rounded-lg shadow-lg flex">
        <div className="form-container sign-in w-1/2 p-8 flex items-center justify-center transition-opacity duration-700 opacity-100">
          <form
            className="flex flex-col items-center justify-center w-full"
            onSubmit={handleLoginSubmit}
          >
            <h1 className="text-4xl font-bold px-3 py-3">Iniciar Sesión</h1>
            {/* Opciones de redes sociales */}
            <div className="flex space-x-4">
              <a href="#" className="px-3 py-3 border rounded-lg">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="px-3 py-3 border rounded-lg">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="px-3 py-3 border rounded-lg">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" className="px-3 py-3 border rounded-lg">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            {/* Campos del formulario */}
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="w-full bg-gray-200 border-none rounded-lg py-2 px-3 my-2"
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="w-full bg-gray-200 border-none rounded-lg py-2 px-3 my-2"
            />
            {error && (
              <p className="text-red-500 text-sm mt-4 mb-5">
                Por favor, complete todos los campos.
              </p>
            )}
            <button className="bg-indigo-700 text-white font-semibold py-2 px-10 rounded-lg mt-5 text-sm uppercase">
              Iniciar Sesión
            </button>
            <button
              className="bg-transparent border border-white text-white font-semibold py-2 px-10 rounded-lg mt-5 text-sm uppercase"
              onClick={toggleForm}
            >
              Crear Cuenta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
