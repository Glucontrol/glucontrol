import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { jwtDecode } from "jwt-decode";

export const Login = ({ toggleForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setLoginError(true);
          return;
        }

        const token = data.token;
        const user = jwtDecode(token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        setLoginError(false);
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.error(error);
        setLoginError(true);
      });
  };

  return (
    <form
      className="flex flex-col items-center justify-center w-full"
      onSubmit={handleLoginSubmit}
    >
      <h1 className="text-4xl font-bold px-3 py-3">Iniciar Sesión</h1>
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
      <p>Use la contraseña de su correo electrónico.</p>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full bg-gray-200 border-none rounded-lg py-2 px-3 my-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full bg-gray-200 border-none rounded-lg py-2 px-3 my-2"
      />
      {loginError && (
        <p className="text-red-500 text-sm mt-4 mb-5">
          Credenciales incorrectas. Por favor, intente nuevamente.
        </p>
      )}
      <a className="mt-4 text-sm text-blue-500">¿Olvidaste tu contraseña?</a>
      <button className="bg-indigo-600 text-white font-semibold py-2 px-10 rounded-lg mt-5 text-sm uppercase">
        Iniciar Sesión
      </button>
    </form>
  );
};
