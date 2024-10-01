import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import jwt_decode from "jwt-decode";

export const Register = (props) => {
  const { toggleForm } = props;
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupError, setSignupError] = useState(false);
  const [signupNameError, setSignupNameError] = useState(false);
  const [signupEmailError, setSignupEmailError] = useState(false);
  const [signupPasswordError, setSignupPasswordError] = useState(false);

  const handleSignupSubmit = (event) => {
    event.preventDefault();

    const isValid = validateSignupForm();
    if (!isValid) {
      return;
    }

    fetch("http://localhost:4000/register", {
      // Cambia la URL a tu endpoint de registro
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: signupName,
        email: signupEmail,
        password: signupPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setSignupError(true);
          return;
        }

        const token = data.token; // Asegúrate de que el backend devuelve el token
        const user = jwt_decode(token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token); // Almacena solo el token
        setSignupError(false);
        toggleForm(); // Cambia al formulario de inicio de sesión
        // Limpiar los campos solo si se registra correctamente
        setSignupName("");
        setSignupEmail("");
        setSignupPassword("");
      })
      .catch((error) => {
        console.error(error);
        setSignupError(true); // Maneja cualquier error en la solicitud
      });
  };

  const validateSignupForm = () => {
    let isValid = true;

    if (signupName === "") {
      setSignupNameError(true);
      isValid = false;
    } else {
      setSignupNameError(false);
    }

    if (signupEmail === "") {
      setSignupEmailError(true);
      isValid = false;
    } else if (
      !signupEmail.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
    ) {
      setSignupEmailError(true);
      isValid = false;
    } else {
      setSignupEmailError(false);
    }

    if (signupPassword === "") {
      setSignupPasswordError(true);
      isValid = false;
    } else if (signupPassword.length < 6) {
      setSignupPasswordError(true);
      isValid = false;
    } else {
      setSignupPasswordError(false);
    }

    return isValid;
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
            <input
              type="text"
              placeholder="Nombre"
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
              className={`w-full bg-gray-200 border-none rounded-lg py-2 px-3 my-2 ${
                signupNameError ? "border-red-500" : ""
              }`}
            />
            <input
              type="email"
              placeholder="Email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              className={`w-full bg-gray-200 border-none rounded-lg py-2 px-3 my-2 ${
                signupEmailError ? "border-red-500" : ""
              }`}
            />
            <input
              type="password"
              placeholder="Password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              className={`w-full bg-gray-200 border-none rounded-lg py-2 px-3 my-2 ${
                signupPasswordError ? "border-red-500" : ""
              }`}
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
              type="button"
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
