import React from "react";
import { Navbar } from "../components/Navbar";
import { UserContext } from "../context/UserContext";
const User = () => {
  const user = React.useContext(UserContext);
  console.log(user);
  return (
    <>
      <main className="flex min-h-screen">
        <Navbar />
        <div className="flex-1 mt-4">
          <h1 className="text-2xl text-center font-semibold shadow-lg">
            Configuración de Usuario
          </h1>
          <div className="mt-4 flex ml-10">
            <h1 className="text-xl font-semibold">Nombre de Usuario:</h1>
            <span className="text-xl">{user.Nombre}</span>
          </div>
          <div className="mt-4 flex ml-10">
            <h1 className="text-xl font-semibold">Email:</h1>
            <span className="text-xl">{user.Email}</span>
          </div>
        </div>
      </main>
    </>
  );
};

export default User;
