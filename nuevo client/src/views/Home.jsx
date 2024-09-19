import React from "react";
import { BsChevronDoubleRight } from "react-icons/bs";

export const Home = () => {
  return (
    <main className="flex flex-col mx-4">
      <h1 className="text-left font-bold m-4 text-3xl">¡Bienvenido¡</h1>
      <p className="text-left text-gray-600 w-3/4 mt-4 mb-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi accusamus
        error vel modi explicabo? Minus nihil maxime facilis fugit hic at est,
        facere temporibus consectetur magnam laudantium beatae officia libero.
      </p>
      <span className="bg-gray-300 w- h-0.5 my-5 "></span>
      <div className="grid grid-cols-1 md:grid-cols-3 mx-3 gap-8">
        <h4 className="text-left font-bold grid-cols-1 col-span-3 mb-2">
          hola
        </h4>
        <div className="flex flex-col border-2 rounded-lg p-4  min-h-48 min-w-6  shadow-lg shadow-gray-400 hover:scale-105 transition ease-in-out duration-100">
          <a href="">
            <img src="./assets/img/articulos.svg" alt="" />
          </a>
          <a href="">
            <h4>Descubre</h4>
          </a>
          <a href="">
            <p>
              Informate sobre los ultimos avances y los tips para cuidar tu
              salud
            </p>
          </a>
          <a
            href=""
            className="text-left font-bold text-black text-lg px-3 py-2"
          >
            Ver
          </a>
        </div>
        <div className="flex flex-col border-2 rounded-lg p-4  min-h-48 min-w-9  shadow-lg shadow-gray-400 hover:scale-110 transition ease-in-out duration-100">
          <a href="">
            <img src="./assets/img/articulos.svg" alt="" />
          </a>
          <a href="">
            <h4>Descubre</h4>
          </a>
          <a href="">
            <p>
              Informate sobre los ultimos avances y los tips para cuidar tu
              salud
            </p>
          </a>
          <a
            href=""
            className="text-left font-bold text-black text-lg px-3 py-2"
          >
            Ver
          </a>
        </div>
        <div className="flex flex-col border-2 rounded-lg p-4  min-h-48 min-w-9  shadow-lg shadow-gray-400 hover:scale-110 transition ease-in-out duration-100">
          <a href="">
            <img src="./assets/img/articulos.svg" alt="" />
          </a>
          <a href="">
            <h4>Descubre</h4>
          </a>
          <a href="">
            <p>
              Informate sobre los ultimos avances y los tips para cuidar tu
              salud
            </p>
          </a>
          <a
            href=""
            className="text-left font-bold text-black text-lg px-3 py-2"
          >
            Ver
          </a>
        </div>
      </div>
      <span className="bg-gray-300 w- h-0.5 my-5 "></span>
      <div>
        <h4>Ultimos Articulos</h4>
        <div></div>
      </div>
    </main>
  );
};
