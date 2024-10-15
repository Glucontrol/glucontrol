import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import "../style.css";
import { link } from "../utilities/functions";

export const CrearRegistro = () => {
  const [contenido, setContenido] = useState("");
  const [dosis, setDosis] = useState("");
  const [tipoInsulina, setTipoInsulina] = useState("");
  const [viaAdministracion, setViaAdministracion] = useState("");
  const [fechaRegistro, setFechaRegistro] = useState("");
  const [error, setError] = useState("");

  const handleChangeDosis = (value) => {
    const regex = /^\d*(\.\d+)?( mg| UI)?$/;
    if (regex.test(value) || value === "") {
      setDosis(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que todos los campos obligatorios estén llenos
    if (!tipoInsulina || !dosis || !viaAdministracion || !fechaRegistro) {
      setError("Por favor, completa todos los campos obligatorios.");
      return;
    }

    setError(""); // Reiniciar el error si todo está correcto

    const form = {
      Fecha: fechaRegistro,
      Via: viaAdministracion,
      Dosis: dosis,
      Tipo: tipoInsulina,
    };

    console.log(form);
    link.registerI(form).then(() => {
      window.location.href = "/registros";
    });
  };

  return (
    <main className="max-w-4xl mx-auto p-4">
      <div className="flex items-center mb-6">
        <a href="/registros" className="text-blue-500 hover:text-blue-700">
          <BiArrowBack size={24} />
        </a>
        <h1 className="text-2xl font-bold ml-4">Crear Nuevo Registro</h1>
      </div>
      <div>
        <h2 className="text-xl mb-4">
          Completa con los detalles de tu registro
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}{" "}
        {/* Mostrar mensaje de error */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="tipoInsulina" className="mb-2 font-semibold">
              Tipo de Insulina
            </label>
            <select
              id="tipoInsulina"
              className="select w-full rounded-lg focus:outline-none p-2 border border-gray-300 focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setTipoInsulina(e.target.value)}
            >
              <option value="" disabled selected>
                Selecciona un tipo de insulina
              </option>
              <option value="Rápida">Rápida</option>
              <option value="Intermedia">Intermedia</option>
              <option value="Corta">Corta</option>
              <option value="Prolongada">Prolongada</option>
              <option value="Combinada">Combinada</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="dosisInsulina" className="mb-2 font-semibold">
              Dosis (ej. 10 mg o 5 UI)
            </label>
            <input
              type="text"
              id="dosisInsulina"
              value={dosis}
              onChange={(e) => handleChangeDosis(e.target.value)}
              className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Introduce la dosis"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="viaAdministracion" className="mb-2 font-semibold">
              Vía de administración
            </label>
            <select
              id="viaAdministracion"
              className="select w-full rounded-lg focus:outline-none p-2 border border-gray-300 focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setViaAdministracion(e.target.value)}
            >
              <option value="" disabled selected>
                Selecciona una vía de administración
              </option>
              <option value="Inyección Subcutánea">Inyección Subcutánea</option>
              <option value="Infusión Subcutánea">Infusión Subcutánea</option>
              <option value="Inhalación">Inhalación</option>
              <option value="Inyección Intravenosa">
                Inyección Intravenosa
              </option>
              <option value="Transdérmica">Transdérmica</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Fecha y hora</label>
            <input
              type="datetime-local"
              id="fechaRegistro"
              name="fechaRegistro"
              className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFechaRegistro(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Notas</label>
            <textarea
              className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg border-1 p-2 border-gray-300"
              placeholder="Añada su nota..."
            ></textarea>
          </div>
          <button
            type="submit" // Cambiar a submit
            className="bg-blue-400 text-white w-1/3 mt-16 p-2 rounded-lg hover:bg-blue-600 hover:text-white"
          >
            Listo
          </button>
        </form>
      </div>
    </main>
  );
};
