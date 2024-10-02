import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import "../style.css";

export const CrearRegistro = () => {
  const [contenido, setContenido] = useState("");
  const [dosis, setDosis] = useState("");

  const handleChangeDosis = (value) => {
    // Validación para permitir solo números y la unidad correcta
    const regex = /^\d*(\.\d+)?( mg| UI)?$/; // Puedes ajustar esto según las unidades que necesites
    if (regex.test(value) || value === "") {
      setDosis(value);
    }
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
        <form className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="tipoInsulina" className="mb-2 font-semibold">
              Tipo de Insulina
            </label>
            <select
              id="tipoInsulina"
              className="select w-full rounded-lg focus:outline-none p-2 border border-gray-300 focus:ring-2 focus:ring-blue-500"
            >
              <option disabled selected>
                Selecciona un tipo de insulina
              </option>
              <option>Rápida</option>
              <option>Intermedia</option>
              <option>Corta</option>
              <option>Prolongada</option>
              <option>Combinada</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="dosis" className="mb-2 font-semibold">
              Dosis (ej. 10 mg o 5 UI)
            </label>
            <input
              type="text"
              id="dosis"
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
            >
              <option disabled selected>
                Selecciona una vía de administración
              </option>
              <option>Inyección Subcutánea</option>
              <option>Infusión Subcutánea</option>
              <option>Inhalación</option>
              <option>Inyección Intravenosa</option>
              <option>Transdérmica</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Fecha y hora</label>
            <input
              type="datetime-local"
              id="fechaRegistro"
              name="fechaRegistro"
              className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Notas</label>
            <textarea
              className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg border-1 p-2 border-gray-300"
              placeholder="Añada su nota..."
            ></textarea>
          </div>
          <button className="bg-blue-400 text-white w-1/3 mt-16 p-2 rounded-lg hover:bg-blue-600 hover:text-white">
            Listo
          </button>
        </form>
      </div>
    </main>
  );
};
