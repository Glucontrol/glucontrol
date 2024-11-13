import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import Alert from "../components/Alert";
import { link } from "../utilities/functions";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [password, setPassword] = useState("");
  const [texto, setTexto] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Implementa tu lógica de inicio de sesión aquí
    const email = document.querySelector("#email").value;
    const name = document.querySelector("#password").value;
    link.login(email, name).then((res) => {
      console.log(res);
      try {
        if (res.status == 200) {
          window.location.href = "/home";
        }
        setTexto(res.data);
      } catch (error) {
      } finally {
      }
    });
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
            </div>
            <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900 transition-colors duration-300 dark:text-white ">
              Iniciar Sesión
            </h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="my">
                <label
                  htmlFor="text"
                  className="block text-sm font-medium text-gray-700 transition-colors duration-300 dark:text-gray-300"
                >
                  Nombre de Usuario
                </label>
                <div className="mt-1 flex items-center rounded-md border border-gray-300 bg-white transition-colors duration-300 dark:border-gray-600 dark:bg-gray-700">
                  <FaRegUser className="ml-2 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="text"
                    required
                    className="w-full border-0 bg-transparent p-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white dark:placeholder-gray-400"
                    placeholder="Nombre de Usuario"
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
                    className="w-full border-0 bg-transparent p-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white dark:placeholder-gray-400"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`border-2 border-slate-400 rounded-full px-12 py-2 inline-block font-semibold hover:bg-slate-500 hover:text-white transition-colors duration-300 w-full `}
              >
                Iniciar sesión
              </button>
            </form>
          </div>
          {/* Panel derecho */}
          <div className="bg-blue-600 p-8 text-white transition-colors duration-300 dark:bg-blue-800 md:w-2/5">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h2 className="mb-6 text-3xl font-extrabold">¡Bienvenido!</h2>
                <div className="mb-6 flex justify-center">
                  <div className="w-16 border-b-2 border-white"></div>
                </div>
                <p className="mb-6">
                  Completa el formulario para acceder a todas las funciones
                </p>
                <p className="mb-6">¿Aún no tienes cuenta?</p>
                <div className="flex justify-center">
                  <Link to="/register">
                    <button className="rounded-full border-2 border-white bg-transparent px-6 py-2 font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-blue-600">
                      Regístrate
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {texto && <Alert prop={{ texto: texto }} />}
    </div>
  );
};
