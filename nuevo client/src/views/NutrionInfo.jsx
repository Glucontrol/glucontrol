import React, { useState } from "react";
import axios from "axios";

const API_ID = "83ae47a6";
const API_KEY = "f2e0cf6f570bcce79db71aea7d6c275d";
const API_URL = "https://api.edamam.com/api/nutrition-data";

const foodTranslations = {
  manzana: "apple",
  plátano: "banana",
  naranja: "orange",
  leche: "milk",
  huevo: "egg",
  pollo: "chicken",
  arroz: "rice",
  pan: "bread",
  queso: "cheese",
  tomate: "tomato",
  lechuga: "lettuce",
  zanahoria: "carrot",
  cebolla: "onion",
  ajo: "garlic",
  carne: "meat",
  pescado: "fish",
  frijoles: "beans",
  papa: "potato",
  aguacate: "avocado",
  espinaca: "spinach",
};

export const NutritionInfo = () => {
  const [food, setFood] = useState("");
  const [nutritionInfo, setNutritionInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const translateFood = (input) => {
    const words = input.toLowerCase().split(" ");
    const translatedWords = words.map((word) => {
      if (foodTranslations[word]) {
        return foodTranslations[word];
      }
      return word;
    });
    return translatedWords.join(" ");
  };

  const fetchNutritionInfo = async () => {
    setLoading(true);
    setError("");
    setNutritionInfo(null);
    const translatedFood = translateFood(food);
    try {
      const response = await axios.get(API_URL, {
        params: {
          app_id: API_ID,
          app_key: API_KEY,
          ingr: translatedFood,
        },
      });
      console.log("API Response:", response.data); // Para depuración
      if (response.data && response.data.totalWeight > 0) {
        setNutritionInfo(response.data);
      } else {
        setError(
          'No se encontró información nutricional para este alimento. Intenta ser más específico (ej: "100g de manzana").'
        );
      }
    } catch (error) {
      console.error("Error al obtener información nutricional:", error);
      setError(
        "No se pudo obtener la información nutricional. Por favor, intenta de nuevo."
      );
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (food.trim()) {
      fetchNutritionInfo();
    }
  };

  const getNutrientValue = (nutrient) => {
    if (
      nutritionInfo &&
      nutritionInfo.totalNutrients &&
      nutritionInfo.totalNutrients[nutrient]
    ) {
      const value = nutritionInfo.totalNutrients[nutrient].quantity;
      const unit = nutritionInfo.totalNutrients[nutrient].unit;
      return `${value.toFixed(1)} ${unit}`;
    }
    return "No disponible";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Información Nutricional de Alimentos
      </h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex items-center justify-center">
          <input
            type="text"
            value={food}
            onChange={(e) => setFood(e.target.value)}
            placeholder="Ingresa un alimento (ej: 100g de manzana)"
            className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50"
          >
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </div>
      </form>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {nutritionInfo && !error && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Resultados para: {food}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-bold">
                Calorías: {nutritionInfo.calories.toFixed(0)}
              </p>
              <p>Peso total: {nutritionInfo.totalWeight.toFixed(0)}g</p>
              <p>Proteínas: {getNutrientValue("PROCNT")}</p>
              <p>Carbohidratos: {getNutrientValue("CHOCDF")}</p>
              <p>Grasas: {getNutrientValue("FAT")}</p>
            </div>
            <div>
              <p>Fibra: {getNutrientValue("FIBTG")}</p>
              <p>Azúcares: {getNutrientValue("SUGAR")}</p>
              <p>Sodio: {getNutrientValue("NA")}</p>
              <p>Potasio: {getNutrientValue("K")}</p>
              <p>Colesterol: {getNutrientValue("CHOLE")}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
