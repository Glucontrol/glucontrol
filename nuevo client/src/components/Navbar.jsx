import React, { useState } from "react";
export const Navbar = () => {
  const Menu = [
    { id: 1, name: "Home", icon: "add", link: "/home", gap: true },
    { id: 2, name: "Registros", icon: "register", link: "/registros" },
    {
      id: 3,
      name: "Articulos",
      icon: "article",
      gap: true,
      link: "/articulos",
    },
    {
      id: 4,
      name: "Usuario",
      icon: "account",
      link: "/me",
    },
  ];
  const [open, setOpen] = useState(true);
  return (
    <div
      className={`${
        open ? "w-20" : "w-36"
      }  bg-blend-color-burn border-r-2 flex flex-col items-center duration-300`}
      onMouseEnter={() => {
        setOpen(false);
      }}
      onMouseLeave={() => {
        setOpen(!open);
      }}
    >
      <div className="flex flex-col fixed top-20 bottom-36">
        <ul className="">
          {Menu.map((el) => (
            <a href={el.link}>
              <li
                className={`${
                  el.gap ? "mt-8" : "mt-3"
                } flex h-10 overflow-hidden hover:scale-110 duration-100 w-full hover:shadow-lg hover:rounded-lg  `}
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
