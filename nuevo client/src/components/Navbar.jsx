import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import useMobile from "../utilities/isMobile.jsx";
export const Navbar = () => {
  const user = useContext(UserContext);

  const Menu = [
    {
      id: 1,
      name: "Home",
      icon: "home",
      link: "/home",
    },
    {
      id: 2,
      name: "Registros",
      icon: "register",
      link: "/registros",
    },
    {
      id: 3,
      name: "Articulos",
      icon: "article",
      link: "/articulos",
    },
    {
      id: 4,
      name: "Usuario",
      icon: "account",
      link: "/me",
    },
    {
      name: "Salir",
      icon: "logout",
      link: "/logout",
    },
  ];
  const [open, setOpen] = useState(true);

  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return width <= 768 ? (
    <>
      <div className="fixed bottom-0 flex w-full justify-between bg-white z-10 border border-t-2 ">
        <ul className="flex flex-row mx-auto gap-28">
          {Menu.map((el, index) => (
            <a href={el.link} key={index}>
              <li
                className={`${
                  el.gap ? "mt-8" : "mt-3"
                } flex h-10 hover:scale-110 duration-100 w-full hover:shadow-lg hover:rounded-lg ${
                  el.class
                }  `}
              >
                <img src={`../src/assets/icons/${el.icon}.svg`} />
              </li>
            </a>
          ))}
        </ul>
      </div>
    </>
  ) : (
    <div
      className={`${
        open ? "w-16" : "w-36"
      }  bg-blend-color-burn border-r-2 flex flex-col items-center duration-300 dark:bg-slate-700 dark:border-slate-600 `}
      onMouseEnter={() => {
        setOpen(false);
      }}
      onMouseLeave={() => {
        setOpen(!open);
      }}
    >
      <div className="flex flex-col my-10 fixed dark:text-gray-300 ">
        <ul className="grid grid-rows-7 gap-y-24 relative">
          {Menu.map((el, index) => (
            <a href={el.link} key={index}>
              <li
                className={`${
                  el.gap ? "mt-8" : "mt-3"
                } flex h-10 ml-5 hover:scale-110 duration-100 w-full  hover:rounded-lg ${
                  el.class
                }  `}
              >
                <img src={`../src/assets/icons/${el.icon}.svg`} />
                <span
                  className={`${
                    open ? " scale-0" : "scale-60 "
                  } duration-300 origin-left font-semibold flex self-center `}
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
