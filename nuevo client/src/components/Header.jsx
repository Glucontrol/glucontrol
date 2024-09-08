import React from "react";
export const Header = () =>{
    return(
        <header>
            <nav>
                <ul className=" grid grid-cols-4 text-center h-12 bg-slate-700 text-gray-200">
                    <li className="table-cell hover:scale-110">Hola</li>
                    <li className="table-cell hover:scale-110">Artículos</li>
                    <li className="table-cell hover:scale-110">Registros</li>
                    <li className="table-cell align-sub hover:scale-110">Nosotros</li>

                </ul>
            </nav>
        </header>
    )
}