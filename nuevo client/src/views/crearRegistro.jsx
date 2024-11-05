import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import "../style.css";
import { link } from "../utilities/functions";
import toast, { Toaster } from "react-hot-toast";
import {useNavigate}from 'react-router-dom';

export const CrearRegistro = () => {
  // estos son los estads locales para almacenar los valores de los inputs del formulario
  const [tipoRegistro, setTipoRegistro] = useState("insulina"); // Controla si se está registrando insulina o glucosa
  const [dosis, setDosis] = useState(""); // Almacena la dosis de insulina
  const [tipoInsulina, setTipoInsulina] = useState(""); // Almacena el tipo de insulina seleccionado
  const [viaAdministracion, setViaAdministracion] = useState(""); // Almacena la vía de administración de la insulina
  const [glucosa, setGlucosa] = useState(""); // Almacena el nivel de glucosa
  const [fechaRegistro, setFechaRegistro] = useState(""); // Almacena la fecha y hora del registro
  const [estadoFisico, setEstadoFisico] = useState(""); // Almacena el estado físico seleccionado
  const [medicacionAdicional, setMedicacionAdicional] = useState(""); // Almacena medicación adicional (si existe)
  const [notas, setNotas] = useState(""); // Almacena notas o comentarios adicionales
  const [error, setError] = useState(""); // Almacena el mensaje de error si algún campo está incompleto
  const [hba1c, setHbA1c] = useState(""); // Almacena el valor de HbA1c

  const navigate = useNavigate()

  // Valida que la dosis de insulina siga el formato adecuado (ej. 10 mg o 5 UI)
  const handleChangeDosis = (value) => {
    const regex = /^\d*(\.\d+)?( mg| UI)?$/;
    if (regex.test(value) || value === "") {
      setDosis(value); // Actualiza la dosis si el valor es válido
    }
  };
  const handleChangeHbA1c = (value) => {
    const regex = /^\d*(\.\d+)?( mg| UI)?$/;
    if (regex.test(value) || value === "") {
      setHbA1c(value); // Actualiza la dosis si el valor es válido
    }
  };

  // Maneja el envío del formulario tanto para el registro de insulina como de glucosa
  const handleSubmit = (e) => {
    e.preventDefault();
    if (tipoRegistro === "insulina") {
      // Validación de campos obligatorios para el registro de insulina
      if (!tipoInsulina || !dosis || !viaAdministracion || !fechaRegistro) {
        setError("Por favor, completa todos los campos obligatorios.");
        return;
      }

      setError("");

      const formInsulina = {
        Fecha: fechaRegistro,
        Via: viaAdministracion,
        Dosis: dosis,
        Tipo: tipoInsulina,
        tipoRegistro: tipoRegistro,
        Adicional: notas,
      };

      console.log(formInsulina);

      // API
      link.registerI(formInsulina).then(() => {
        
          toast.success("Registro creado con éxito");
          setTimeout(() => {
            navigate('/registros'); // Redirigir después del toast
          }, 2000);
        
      }); 
    } else if (tipoRegistro === "glucosa") {
      // Validación de campos obligatorios para el registro de glucosa
      if (!glucosa || !fechaRegistro || !estadoFisico || !medicacionAdicional) {
        setError("Por favor, completa todos los campos obligatorios.");
        return;
      }

      setError(""); // Borra los errores previos si la validación es correcta

      const formGlucosa = {
        Fecha: fechaRegistro,
        Glucosa: glucosa,
        EstadoFisico: estadoFisico,
        MedicacionAdicional: medicacionAdicional,
        Adicional: notas,
        TipoRegistro: tipoRegistro,
      };

      console.log(formGlucosa);
      //  API
      link.registerI(formGlucosa).then((res) => {
        
          toast.success("Registro creado con éxito");
          setTimeout(() => {
            navigate('/registros'); // Redirigir después del toast
          }, 1000);
        
      });
    } else if (tipoRegistro === "hba1c") {
      if (!hba1c || !fechaRegistro) {
        setError("Por favor, completa todos los campos obligatorios.");
        return;
      }

      setError(""); // Borra los errores previos si la validación es correcta

      const formHba1c = {
        HbA1c: hba1c,
        Fecha: fechaRegistro,

        Adicional: notas,
        TipoRegistro: tipoRegistro,
      };

      console.log(formHba1c);
      //  API
      link.registerI(formHba1c).then(() => {
      
          toast.success("Registro creado con éxito");
          setTimeout(() => {
            navigate('/registros'); // Redirigir después del toast
          }, 2000);
        
      });
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-4">
      <Toaster />
      <div className="flex items-center mb-6">
        <a href="/registros" className="text-blue-500 hover:text-blue-700">
          <BiArrowBack size={24} />
        </a>
        <h1 className="text-2xl font-bold ml-4">Crear Nuevo Registro</h1>
      </div>
      <div>
        <h2 className="text-xl mb-4">Selecciona el tipo de registro:</h2>
        <div className="flex mb-6 space-x-4">
          <button
            className={`${
              tipoRegistro === "insulina"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            } p-2 rounded-lg`}
            onClick={() => setTipoRegistro("insulina")}
          >
            Registrar Insulina
          </button>
          <button
            className={`${
              tipoRegistro === "glucosa"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            } p-2 rounded-lg`}
            onClick={() => setTipoRegistro("glucosa")}
          >
            Registrar Glucosa
          </button>
          <button
            className={`${
              tipoRegistro === "hba1c"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            } p-2 rounded-lg`}
            onClick={() => setTipoRegistro("hba1c")}
          >
            Registrar HbA1c
          </button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Campos para registrar insulinaa */}

          {tipoRegistro === "insulina" && (
            <>
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
                <label
                  htmlFor="viaAdministracion"
                  className="mb-2 font-semibold"
                >
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
                  <option value="Inyección Subcutánea">
                    Inyección Subcutánea
                  </option>
                  <option value="Infusión Subcutánea">
                    Infusión Subcutánea
                  </option>
                  <option value="Inhalación">Inhalación</option>
                  <option value="Inyección Intravenosa">
                    Inyección Intravenosa
                  </option>
                  <option value="Transdérmica">Transdérmica</option>
                </select>
              </div>
            </>
          )}

          {/* Campos para registrar glucosa */}
          {tipoRegistro === "glucosa" && (
            <>
              <div className="flex flex-col">
                <label htmlFor="glucosa" className="mb-2 font-semibold">
                  Nivel de glucosa (mg/dL)
                </label>
                <input
                  type="number"
                  id="nivelGlucosa"
                  value={glucosa}
                  onChange={(e) => setGlucosa(e.target.value)}
                  className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Introduce el nivel de glucosa"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="estadoFisico" className="mb-2 font-semibold">
                  Estado físico
                </label>
                <select
                  id="estadoFisico"
                  value={estadoFisico}
                  className="select w-full rounded-lg focus:outline-none p-2 border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setEstadoFisico(e.target.value)}
                >
                  <option value="" disabled selected>
                    Selecciona el estado físico
                  </option>
                  <option value="Antes de comer">Antes de comer</option>
                  <option value="Después de comer">Después de comer</option>
                  <option value="Después de ejercicio">
                    Después de ejercicio
                  </option>
                  <option value="Antes de dormir">Antes de dormir</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="notas" className="mb-2 font-semibold">
                  Medicación adicional
                </label>
                <input
                  type="text"
                  id="nmedicacionAdicional"
                  value={medicacionAdicional}
                  onChange={(e) => setMedicacionAdicional(e.target.value)}
                  className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Escribe cualquier anotación adicional..."
                />
              </div>
            </>
          )}
          {tipoRegistro === "hba1c" && (
            <>
              <div className="flex flex-col">
                <label htmlFor="glucosa" className="mb-2 font-semibold">
                  Nivel de hemoglobina glucosilada (mg/dL)
                </label>
                <input
                  type="number"
                  id="nivelHba1c"
                  value={hba1c}
                  onChange={(e) => handleChangeHbA1c(e.target.value)}
                  className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Introduce el nivel de HbA1c"
                />
              </div>
            </>
          )}
          <div className="flex flex-col">
            <label htmlFor="notas" className="mb-2 font-semibold">
              Notas
            </label>
            <input
              type="text"
              id="notaAdicional"
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Escribe cualquier anotación adicional..."
            />
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

          <button
            type="submit"
            className="bg-blue-400 text-white w-1/3 mt-16 p-2 rounded-lg hover:bg-blue-600 hover:text-white"
          >
            Listo
          </button>
        </form>
      </div>
    </main>
  );
};
