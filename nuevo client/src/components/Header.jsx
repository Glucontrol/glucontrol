import React from "react";
export const Header = () => {
  return (
    <header className="sticky top-0 mb-10 z-10">
      <nav>
        <ul className=" grid grid-cols-4 text-center h-12 bg-slate-700 text-gray-200 text-xl">
          <li className="flex justify-center mt-3 hover:scale-110 hover:text-yellow-200">
            Hola
          </li>
          <a href="articulos">
            <li className="flex justify-center mt-3 hover:scale-110 hover:text-yellow-200">
              Artículos
            </li>
          </a>
          <li className="flex justify-center mt-3 hover:scale-110 hover:text-yellow-200">
            Registros
          </li>
          <li className="flex justify-center mt-3 hover:scale-110 hover:text-yellow-200">
            Nosotros
          </li>
        </ul>
      </nav>
    </header>
  );
};
