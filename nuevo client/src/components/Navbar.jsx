import React, { useState } from "react";
export const Navbar = () => {
  const Menu = [
    { id: 1, name: "Home", icon: "add", link: "/"},

    { id: 2, name: "Registros", icon: "register", link:"/registros"},

    { id: 3, name: "Articulos",icon: "article", gap:true,  link:"/articulos"},

  ]
  const [open, setOpen] = useState(true);
  return (
    <div
      className={`${open ? "w-20" : "w-36"}  bg-gray-100 flex flex-col items-center duration-150`}
      onMouseEnter={() => {
        setOpen(false);
      }}
      onMouseLeave={()=>{
        setOpen(!open)
      }}
    >
      <div className="flex flex-col fixed">
        <ul className="">
          { Menu.map((el)=>(<a href={el.link} ><li className={` flex overflow-hidden hover:scale-110 duration-100 w-full `}><img src={`../src/assets/icons/${el.icon}.svg`} /><span className={`${open && "scale-0"} ${open ? "scale-0" : "scale-60"} duration-300`}>{el.name}</span></li></a>))}
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
