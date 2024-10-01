import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { jwtDecode } from "jwt-decode";

export const Login = ({ toggleForm }) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [loginEmailError, setLoginEmailError] = useState(false);
  const [loginPasswordError, setLoginPasswordError] = useState(false);

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    const isValid = validateLoginForm();
    if (!isValid) {
      return;
    }

    fetch("http://localhost:4000/login", {
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
          setLoginError(true);
          return;
        }

        const token = data.token; // Asegúrate de que el backend devuelve el token
        const user = jwtDecode(token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token); // Almacena solo el token
        setLoginError(false);
        toggleForm(); // Cambia al formulario de registro
        setLoginEmail("");
        setLoginPassword("");
      })
      .catch((error) => {
        console.error(error);
        setLoginError(true);
      });
  };

  const validateLoginForm = () => {
    let isValid = true;

    if (loginEmail === "") {
      setLoginEmailError(true);
      isValid = false;
    } else {
      setLoginEmailError(false);
    }

    if (loginPassword === "") {
      setLoginPasswordError(true);
      isValid = false;
    } else {
      setLoginPasswordError(false);
    }

    return isValid;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 via-gray-200 to-blue-200">
      <div className="relative w-full max-w-4xl bg-white border border-gray-300 rounded-lg shadow-lg flex">
        <div className="form-container sign-in w-1/2 p-8 flex items-center justify-center transition-opacity duration-700 opacity-100 pointer-events-auto z-20">
          <form
            className="flex flex-col items-center justify-center w-full"
            onSubmit={handleLoginSubmit}
          >
            <h1 className="text-4xl font-bold px-3 py-3">Iniciar Sesión</h1>
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
            {loginError && (
              <p className="text-red-500 text-sm mt-4 mb-5">
                Por favor, verifique su email y contraseña.
              </p>
            )}
            <button className="bg-purple-700 text-white font-semibold py-2 px-10 rounded-lg mt-5 text-sm uppercase">
              Iniciar Sesión
            </button>
            <button
              type="button"
              className="bg-transparent border border-white text-white font-semibold py-2 px-10 rounded-lg mt-5 text-sm uppercase"
              onClick={toggleForm}
            >
              Crear cuenta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
