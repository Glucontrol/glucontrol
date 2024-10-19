import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaRegEnvelope,
  FaGoogle,
  FaFacebook,
  FaApple,
  FaUser,
} from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleRegister = (e) => {
    e.preventDefault();
    // Implementa tu lógica de registro aquí
    console.log("Registrar con:", name, email, password);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 transition-colors duration-300 dark:bg-gray-900">
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl transition-colors duration-300 dark:bg-gray-800">
        <div className="flex flex-col md:flex-row">
          {/* Panel izquierdo */}
          <div className="p-8 md:w-3/5">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900 transition-colors duration-300 dark:text-white">
                Glucontrol
              </span>
              <button
                onClick={toggleDarkMode}
                className="rounded-full bg-gray-200 p-2 text-gray-600 transition-colors duration-300 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                {darkMode ? "☀️" : "🌙"}
              </button>
            </div>
            <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900 transition-colors duration-300 dark:text-white">
              Regístrate
            </h2>
            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 transition-colors duration-300 dark:text-gray-300"
                >
                  Nombre
                </label>
                <div className="mt-1 flex items-center rounded-md border border-gray-300 bg-white transition-colors duration-300 dark:border-gray-600 dark:bg-gray-700">
                  <FaUser className="ml-2 text-gray-400" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full border-0 bg-transparent p-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white dark:placeholder-gray-400"
                    placeholder="full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 transition-colors duration-300 dark:text-gray-300"
                >
                  Email
                </label>
                <div className="mt-1 flex items-center rounded-md border border-gray-300 bg-white transition-colors duration-300 dark:border-gray-600 dark:bg-gray-700">
                  <FaRegEnvelope className="ml-2 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full border-0 bg-transparent p-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white dark:placeholder-gray-400"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 transition-colors duration-300 dark:text-gray-300"
                >
                  Contraseña
                </label>
                <div className="mt-1 flex items-center rounded-md border border-gray-300 bg-white transition-colors duration-300 dark:border-gray-600 dark:bg-gray-700">
                  <MdLockOutline className="ml-2 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="w-full border-0 bg-transparent p-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white dark:placeholder-gray-400"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Registrarse
              </button>
            </form>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                    O regístrate con
                  </span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[FaGoogle, FaFacebook, FaApple].map((Icon, index) => (
                  <button
                    key={index}
                    className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-500 shadow-sm transition-colors duration-300 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  >
                    <Icon className="h-5 w-5" />
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* Panel derecho */}
          <div className="bg-blue-600 p-8 text-white transition-colors duration-300 dark:bg-blue-800 md:w-2/5 md:flex md:items-center md:justify-center">
            <div className="md:w-full">
              <h2 className="mb-6 text-center text-3xl font-extrabold">
                ¡Bienvenido!
              </h2>
              <div className="mb-6 flex justify-center">
                <div className="w-16 border-b-2 border-white"></div>
              </div>
              <p className="mb-2 text-center">
                Completa el formulario para acceder a todas las funciones
              </p>
              <p className="mb-6 text-center">¿Ya tienes una cuenta?</p>
              <div className="flex justify-center">
                <Link to="/login">
                  <button className="rounded-full border-2 border-white bg-transparent px-6 py-2 font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-blue-600">
                    Iniciar sesión
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
