import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { jwtDecode } from "jwt-decode";

export const Register = ({ toggleForm }) => {
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

    fetch("http://localhost:8080/register", {
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

        const token = data.token;
        const user = jwtDecode(token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        setSignupError(false);
        toggleForm();
        setSignupName("");
        setSignupEmail("");
        setSignupPassword("");
      })
      .catch((error) => {
        console.error(error);
        setSignupError(true);
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
      <p>Use la contraseña de su correo electrónico.</p>
      <input
        type="text"
        placeholder="Name"
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
    </form>
  );
};
