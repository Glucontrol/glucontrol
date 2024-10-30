import { useState, useEffect } from "react";
import {
  FaRegEnvelope,
  FaGoogle,
  FaFacebook,
  FaApple,
  FaUser,
} from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { link } from "../utilities/functions";

export const Register = () => {
  const [preview, setPreview] = useState("")
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleRegister = (e) => {
    e.preventDefault();
    // Implementa tu lógica de registro aquí
    console.log("Registrar con:", name, email, password);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
    <main className="flex w-full h-full" >

    <div className="bg-red-200  shadow-lg w-1/2 mx-auto">

    <form action="post" onSubmit={(e)=>{
      e.preventDefault()
      const formData = new FormData()
      const hola = formData.forEach((el)=>
      console.log(el))
      link.signUp(formData)
    }}>
      <div className="bg-white shadow-lg text-center flex flex-col w-full gap-5">
        <h1 className="text-3xl font-semibold "> Creación de Nuevo Usuario</h1>
        <div className="w-full ">
        <label htmlFor="Nombre" className="text-2xl">Nombre de Usuario</label>
        <input type="text" name="Nombre"  className="bg-gray-200 border  w-1/2 mx-auto border-gray200 outline-none rounded-xl text-center"/>
        </div>
        <div className="w-full ">
        <label htmlFor="Contraseña" className="text-2xl">Contraseña</label>
        <input type="text" name="Contraseña"  className="bg-gray-200 border  w-1/2 mx-auto border-gray200 outline-none rounded-xl text-center"/>
        </div>
        <div>
          <h1 className="border-b-2 border-gray-50">Foto de Perfil</h1>
        <input type="file" name="profile" onChange={(e)=>setPreview(e.target.files[0])}/>
        </div>
        <button type="submit" className="bg-sky-300 w-1/2 rounded-lg self-center hover:text-white hover:bg-sky-400" 
        >
          Chi
        </button>
      </div>
    </form>
    </div>
    </main>
    </>
  );
};
