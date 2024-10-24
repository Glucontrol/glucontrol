import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
export const Navbar = () => {
  const user = useContext(UserContext);

  const Menu = [
    { id: 1, name: "Home", icon: "add", link: "/home" },
    { id: 2, name: "Registros", icon: "register", link: "/registros" },
    {
      id: 3,
      name: "Articulos",
      icon: "article",
      link: "/articulos",
    },
    {
      id: 4,
      name: `${user.Nombre ? user.Nombre : "Iniciar Sesión"}`,
      icon: "account",
      link: "/me",
    },
    {
      name: "Cerrar Sesión",
      icon: "logout",
      link: "/logout",
      gap: true,
    },
  ];
  const [open, setOpen] = useState(true);
  return (
    <div
      className={`${
        open ? "w-16" : "w-36"
      }  bg-blend-color-burn border-r-2 flex flex-col items-center duration-300 `}
      onMouseEnter={() => {
        setOpen(false);
      }}
      onMouseLeave={() => {
        setOpen(!open);
      }}
    >
      <div className="flex flex-col top-20 bottom-36">
        <ul className="grid grid-rows-7 relative">
          {Menu.map((el, index) => (
            <a href={el.link} key={index}>
              <li
                className={`${
                  el.gap ? "mt-8" : "mt-3"
                } flex h-10 overflow-hidden hover:scale-110 duration-100 w-full hover:shadow-lg hover:rounded-lg ${
                  el.class
                }  `}
              >
                <img src={`../src/assets/icons/${el.icon}.svg`} />
                <span
                  className={`${open && "scale-0"} ${
                    open ? "scale-0" : "scale-60"
                  } duration-300 font-semibold flex self-center`}
                >
                  {el.name}
                </span>
              </li>
            </a>
          ))}
        </ul>
      </div>
    </div>
  );
};
