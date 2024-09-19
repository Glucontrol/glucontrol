import React from "react";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";

export const Login = () => {
  return (
    <>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-10 text-center mt-12">
        <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row w-full sm:w-4/5 lg:w-2/3 max-w-4xl">
          <div className="w-full md:w-3/5 p-5">
            <div className="text-left font-bold">
              <span className="text-slate-500">Glucontrol</span>
            </div>

            <div className="py-6 px-4 sm:px -10">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">
                Iniciar Sesión      
              </h2>
            </div>

            <div className="border-2 w-10 border-slate-400 inline-block mb-2"></div>

            <p className="text-gray-400 my-3">Usa tu correo electrónico</p>

            <div className="flex flex-col items-center">
              <div className="bg-gray-100 w-full sm:w-64 p-2 flex items-center mb-3">
                <FaRegEnvelope className="text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="bg-gray-100 outline-none text-sm flex-1 p-1"
                  aria-label="Email"
                />
              </div>

              <div className="bg-gray-100 w-full sm:w-64 p-2 flex items-center mb-3">
                <MdLockOutline className="text-gray-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="bg-gray-100 outline-none text-sm flex-1 p-1"
                  aria-label="Password"
                />
              </div>

              <div className="flex justify-center w-full sm:w-64 mb-5 tex">
                <a href="#" className="text-xs text-slate-400 text-center">
                  Olvidé mi contraseña
                </a>
              </div>

              <button className="border-2 border-slate-400 rounded-full px-12 py-2 inline-block font-semibold hover:bg-slate-500 hover:text-white transition-colors duration-300">
                Iniciar sesión
              </button>
            </div>
          </div>

          <div className="w-full md:w-2/5 bg-slate-400 text-white rounded-br-2xl py-36 px-12">
            <h2 className="text-3xl font-bold mb-2">¡Hola!</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-10">¿Aún no tienes cuenta?</p>
            <a
              href="#"
              className="border-2 border-white rounded-full px-12 py-2 inline-block hover:bg-white hover:text-slate-400 transition-colors duration-300"
            >
              Regístrate
            </a>
          </div>
        </div>
      </main>
    </>
  );
};
