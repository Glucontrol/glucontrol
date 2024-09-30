import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

export const Register = (props) => {
  const { toggleForm } = props;
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupError, setSignupError] = useState(false);

  const handleSignupSubmit = (event) => {
    event.preventDefault();

    if (signupName === "" || signupEmail === "" || signupPassword === "") {
      setSignupError(true);
      return;
    }
    setSignupError(false);
    // Aquí puedes manejar el envío del formulario
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 via-gray-200 to-blue-200">
      <div className="relative w-full max-w-4xl bg-white border border-gray-300 rounded-lg shadow-lg flex">
        <div className="form-container sign-up w-1/2 p-8 flex items-center justify-center transition-opacity duration-700 opacity-100 pointer-events-auto z-20">
          <form
            className="flex flex-col items-center justify-center w-full"
            onSubmit={handleSignupSubmit}
          >
            <h1 className="text-4xl font-bold px-3 py-3">Crear Cuenta</h1>
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
              type="text"
              placeholder="Nombre"
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
              className="w-full bg-gray-200 border-none rounded-lg py-2 px-3 my-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              className="w-full bg-gray-200 border-none rounded-lg py-2 px-3 my-2"
            />
            <input
              type="password"
              placeholder="Password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              className="w-full bg-gray-200 border-none rounded-lg py-2 px-3 my-2"
            />
            {signupError && (
              <p className="text-red-500 text-sm mt-4 mb-5">
                Por favor, complete todos los campos.
              </p>
            )}
            <button className="bg-purple-700 text-white font-semibold py-2 px-10 rounded-lg mt-5 text-sm uppercase">
              Registrarse
            </button>
            <button
              className="bg-transparent border border-white text-white font-semibold py-2 px-10 rounded-lg mt-5 text-sm uppercase"
              onClick={toggleForm}
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
