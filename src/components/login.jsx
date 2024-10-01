import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import jwt_decode from "jwt-decode";

export const Login = (props) => {
  const { toggleForm } = props;
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState(false);
  const [loginEmailError, setLoginEmailError] = useState(false);
  const [loginPasswordError, setLoginPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    const isValid = validateLoginForm();
    if (!isValid) {
      return;
    }

    setLoading(true);
    fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(true);
          setLoading(false);
          return;
        }
        const token = data.token;
        localStorage.setItem("token", token);
        const user = jwt_decode(token);
        localStorage.setItem("user", JSON.stringify(user));
        toggleForm();
        resetForm();
      })
      .catch((error) => {
        console.error(error);
        setError(true);
        setLoading(false);
      });
  };

  const validateLoginForm = () => {
    let isValid = true;

    if (!loginEmail.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
      setLoginEmailError(true);
      isValid = false;
    } else {
      setLoginEmailError(false);
    }

    if (loginPassword.length < 6) {
      setLoginPasswordError(true);
      isValid = false;
    } else {
      setLoginPasswordError(false);
    }

    return isValid;
  };

  const resetForm = () => {
    setLoginEmail("");
    setLoginPassword("");
    setError(false);
    setLoading(false);
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
              className={`w-full bg-gray-200 border-none rounded-lg py-2 px-3 my-2 ${
                loginEmailError ? "border-red-500" : ""
              }`}
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className={`w-full bg-gray-200 border-none rounded-lg py-2 px-3 my-2 ${
                loginPasswordError ? "border-red-500" : ""
              }`}
            />
            {error && (
              <p className="text-red-500 text-sm mt-4 mb-5">
                Por favor, complete todos los campos.
              </p>
            )}
            {loading && (
              <p className="text-gray-500 text-sm mt-4 mb-5">Cargando...</p>
            )}
            <button
              className="bg-indigo-700 text-white font-semibold py-2 px-10 rounded-lg mt-5 text-sm uppercase"
              disabled={loading}
            >
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
