import React, { useState } from "react";
export const Sidebar = () => {
  const Menu = [
    {
      boton: "Hola",
      icono: "fa fa-home",
      link: "./",
    },
    {
      boton: "Usuario",
      icono: "fa fa-user",
    },
    {
      boton: "Opciones",
      icono: "fa fa-options",
      gap: true,
    },
  ];
  const [open, setOpen] = useState(true);
  return (
    <div
      className={`${
        open ? "w-28" : "w-60"
      } min-h-full  duration-300 delay-150 bg-transparent border-gray-300 border-2 `}
      onMouseEnter={() => {
        if (open == true) {
          setOpen(!open);
        }
      }}
      onMouseLeave={() => {
        setOpen(true);
      }}
    >
      <div className="flex justify-center">
        <ul className="fixed mt-10">
          {Menu.map((el) => {
            return (
              <a href={`${el.link}`}>
                <li className={`${!el.gap ? "mt-3" : "mt-9"} text-lg `}>
                  {el.boton}
                </li>
              </a>
            );
          })}
        </ul>
      </div>
    </div>
    // <div className="navbar bg-slate-100 shadow-xl w-10 flex  flex-col h-full fixed z-20 border-r-2">
    //   <div>
    //     <MdOutlineMenu className="w-20 h-14 mx-0.5 self-center" />
    //     <MdLeaderboard className="w-20 h-14 mx-0.5 my-40 hover:scale-110 ease-in-out duration-200 " />
    //   </div>
    // </div>
  );
};
