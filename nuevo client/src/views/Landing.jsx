import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Importa los estilos de AOS
import landing from "../assets/icons/landing.svg";
import statics from "../assets/icons/statics.svg";
import { Footer } from "../components/Footer.jsx";
import { FcLineChart, FcReading, FcCalendar } from "react-icons/fc";
import { FcSurvey } from "react-icons/fc";
import people from "../assets/icons/people.svg";
import email from "../assets/icons/emails.svg";

export const Landing = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Inicializa AOS y establece la duración de las animaciones
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 grid items-center grid-cols-2 bg-white mx-3 mb-4">
        <div className="flex flex-row justify-start p-4">
          <h1 className="font-bold text-gray-800 ">Glucontrol</h1>
        </div>

        <div className="flex flex-row justify-end mx-3 items-center content-center ">
          <ul className="flex flex-row justify-between gap-8 p-4 ">
            <li>
              <a
                href="/login"
                className="rounded-lg cursor-pointer font-semibold text-white bg-slate-400 px-4 hover:bg-slate-600 py-2 text-center items-center"
              >
                Iniciar Sesión
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <main>
        <div className="grid grid-cols-2 m-10 h-full">
          <div
            className="flex flex-col justify-center gap-4"
            data-aos="fade-right"
          >
            <h1 className="text-5xl font-extrabold ">
              Haz del autocuidado un hábito diario
            </h1>
            <p className="font-normal text-lg text-justify">
              Una herramienta diseñada para ayudarte a tomar decisiones más
              informadas sobre tu salud. Únete a una comunidad de apoyo que te
              acompaña en cada paso.
            </p>
            <a
              href="/register"
              type="button"
              className="rounded-lg font-semibold justify-center text-center hover:bg-slate-600 bg-slate-400 p-1 w-1/4 text-white transition ease-in-out delay-150 duration-300"
            >
              Comienza hoy
            </a>
          </div>
          <div data-aos="fade-left">
            <img src={landing} className="mt-10" />
          </div>
        </div>

        <div className="grid grid-cols-2 mt-10" data-aos="fade-up">
          <div>
            <img src={statics} className="w-3/4 mx-10 my-4" />
          </div>
          <div className="flex flex-col justify-center gap-4">
            <h1 className="text-lg font-bold text-center ">
              ¿Qué es Glucontrol?
            </h1>
            <p className=" text-base text-justify mx-10">
              Glucontrol es una aplicación diseñada para ayudar a las personas
              con diabetes a llevar un seguimiento fácil y organizado de sus
              niveles de glucosa e insulina. A través de una interfaz intuitiva
              y herramientas personalizadas, permite registrar datos diarios,
              visualizar tendencias y acceder a recursos educativos que
              promueven un mejor control de la condición.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 p-10 mt-20" data-aos="fade-up">
          <div className="flex flex-col items-center">
            <FcSurvey className="text-6xl mb-4" />
            <h3 className="font-bold text-xl">Seguimiento Diario</h3>
            <p className="text-center mt-4">
              Registra tus niveles de glucosa e insulina con facilidad cada día.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <FcLineChart className="text-6xl mb-4" />
            <h3 className="font-bold text-xl">Visualización de Gráficos</h3>
            <p className="text-center mt-4">
              Observa las tendencias de tu salud a través de gráficos dinámicos.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <FcReading className="text-6xl mb-4" />
            <h3 className="font-bold text-xl">Articulos y Recetas</h3>
            <p className="text-center mt-4">
              Accede a una biblioteca de artículos y recetas que te ayudan en tu
              día a día
            </p>
          </div>
        </div>

        <div
          className=" text-black p-10 text-center mt-20 grid grid-cols-2  justify-between items-center"
          data-aos="fade-up"
        >
          <div className="flex flex-col text-center items-center">
            <h2 className="text-3xl font-bold ">
              Únete a Glucontrol hoy mismo
            </h2>
            <p className="mt-4">
              Se parte de Glucontrol y toma el control de tu salud de una manera
              simple y efectiva.
            </p>
          </div>
          <div className="flex items-end content-end justify-evenly">
            <img
              src={people}
              alt="imagen"
              className="w-3/5 content-end items-end justify-end"
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};
