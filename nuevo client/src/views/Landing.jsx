import React from "react";
import { Header } from "../components/Header";
import helao from "../assets/helao.png";
import landing from "../assets/icons/landing.svg";
import cardregister from "../assets/icons/cardregister.svg";
export const Landing = () => {
  return (
    <>
      <nav className="grid items-center grid-cols-2  shadow-lg shadow-gray-100 m-3  ">
        <div className="flex flex-row  justify-start  p-4">
          <h1 className="font-bold text-gray-800 ">Glucontrol</h1>
        </div>
        <div className="flex flex-row justify-end mx-3 items-center content-center ">
          <ul className="flex flex-row justify-between gap-8 p-4 ">
            <li className="">Nosotros</li>
            <li>Servicios</li>
            <li>Contacto</li>
            <li>
              <a
                href="/login"
                className="rounded-lg cursor-pointer font-semibold text-white bg-slate-400 px-4  hover:bg-slate-600 py-2 text-center items-center"
              >
                Iniciar Sesión
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <main>
        <div className="grid grid-cols-2  m-10">
          <div className="flex flex-col justify-center gap-4">
            <h1 className="text-5xl  font-extrabold ">
              Haz del autocuidado un hábito diario
            </h1>
            <p className="font-normal text-lg text-justify">
              {" "}
              Una herramienta diseñada para ayudarte a tomar decisiones más
              informadas sobre tu salud. Únete a una comunidad de apoyo que te
              acompaña en cada paso.{" "}
            </p>
            <a
              href="/register"
              type="button"
              className="rounded-lg font-semibold justify-center text-center hover:bg-slate-600 bg-slate-400 p-1 w-1/4 text-white transition ease-in-out delay-150 duration-300"
            >
              Comienza hoy
            </a>
          </div>
          <div>
            <img src={landing} />
          </div>
        </div>

        <div className="bg-slate-400 rounded-3xl shadow-2xl grid grid-cols-4 justify-center items-center gap-4 ">
          <div className="rounded-lg bg-white grid grid-rows-2 m-10">
            <div>
              <img src="" alt="" />
            </div>
            <div>
              <h1>Registra tus niveles de glucosa</h1>
              <a href="">Ir</a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
