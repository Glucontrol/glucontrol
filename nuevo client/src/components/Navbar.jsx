import React, { useState } from "react";
import { MdOutlineMenu, MdLeaderboard } from "react-icons/md";
export const Navbar = () => {
  const [open, setOpen] = useState(true);
  return (
    <div
      className={`${open ? "w-28" : "w-60"} h-screen bg-blue-950`}
      onClick={() => {
        setOpen(!open);
      }}
    >
      <ul>
        <li>hola</li>
      </ul>
    </div>
    // <div className="navbar bg-slate-100 shadow-xl w-10 flex  flex-col h-full fixed z-20 border-r-2">
    //   <div>
    //     <MdOutlineMenu className="w-20 h-14 mx-0.5 self-center" />
    //     <MdLeaderboard className="w-20 h-14 mx-0.5 my-40 hover:scale-110 ease-in-out duration-200 " />
    //   </div>
    // </div>
  );
};
