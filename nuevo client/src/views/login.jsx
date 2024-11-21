import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import Alert from "../components/Alert";
import { link } from "../utilities/functions";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [texto, setTexto] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    link.login(email, password).then((res) => {
      try {
        if (res.status === 200) {
          window.location.href = "/home";
        }
        setTexto(res.data);
      } catch (error) {
        console.error(error);
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6 py-12 transition-colors duration-300 dark:bg-gray-900">
      <div className="w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-xl transition-colors duration-300 dark:bg-gray-800">
        <div className="flex flex-col md:flex-row">
          {/* Panel izquierdo */}
          <div className="p-8 md:w-3/5">
            <div className="mb-4 text-center">
              <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                Glucontrol
              </h1>
            </div>
            <h2 className="mb-8 text-center text-2xl font-semibold text-gray-800 dark:text-gray-200">
              Iniciar Sesión
            </h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Nombre de Usuario
                </label>
                <div className="mt-2 flex items-center rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 transition-all focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700">
                  <FaRegUser className="text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="text"
                    required
                    className="ml-3 w-full bg-transparent text-gray-900 placeholder-gray-500 outline-none focus:outline-none dark:text-gray-200 dark:placeholder-gray-400"
                    placeholder="Nombre de Usuario"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Contraseña
                </label>
                <div className="mt-2 flex items-center rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 transition-all focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700">
                  <MdLockOutline className="text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="ml-3 w-full bg-transparent text-gray-900 placeholder-gray-500 outline-none focus:outline-none dark:text-gray-200 dark:placeholder-gray-400"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 dark:ring-offset-gray-900"
              >
                Iniciar Sesión
              </button>
            </form>
          </div>

          {/* Panel derecho */}
          <div className="flex items-center justify-center bg-indigo-600 p-8 text-white dark:bg-indigo-800 md:w-2/5">
            <div className="text-center">
              <h2 className="mb-4 text-2xl font-bold">¡Bienvenido!</h2>
              <p className="mb-4">
                Completa el formulario para acceder a todas las funciones.
              </p>
              <p className="mb-6">¿Aún no tienes cuenta?</p>
              <Link to="/register">
                <button className="rounded-full border-2 border-white px-6 py-2 font-semibold hover:bg-white hover:text-indigo-600">
                  Regístrate
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {texto && <Alert prop={{ texto: texto }} />}
    </div>
  );
};

export default Login;