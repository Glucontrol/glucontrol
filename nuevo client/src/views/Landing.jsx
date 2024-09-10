import React from "react";
import { Header } from "../components/Header";
import helao from "../assets/helao.png";
export const Landing = () => {
  return (
    <>
      <Header />
      <main>
        <div className="grid grid-cols-2 grid-rows-2 mt-10">
          <div className="flex flex-col ml-10 mt-10 justify-center">
            <h1 className="text-5xl ml-4 mt-6 font-bold">
              Ten un control de tu vida
            </h1>
            <p className="mt-4 ml-10 font-semibold text-lg">
              {" "}
              Registra tus niveles de glucosa y manten un registro de los
              niveles de insulina, haciendo un buen hábito que permitirá que
              disfrutes la vida de la forma que te mereces. Descubra una
              comunidad que comparte su misma patología.{" "}
            </p>
            <div className="flex justify-center mt-5">
              <button
                type="button"
                className="rounded-lg font-semibold w-40 h-7 justify-center hover:bg-slate-100 transition ease-in-out delay-150duration-300"
              >
                Unirse
              </button>
            </div>
          </div>
          <div>
            <img src={helao} />
          </div>
          <div>
            <h1 className="text-xl font-bold mt-10 ml-5">
              Descubre quienes forman parte de la comunidad Glucontrol:
            </h1>
          </div>
        </div>
      </main>
    </>
  );
};
