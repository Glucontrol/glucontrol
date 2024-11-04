import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "ad5cc8814c5049c3b7af572ec7f6ab99";
const API_URL = "https://newsapi.org/v2/everything";

export const DiabetesNews = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: {
          apiKey: API_KEY,
          q: "diabetes tratamiento OR diabetes tecnología",
          language: "es",
          pageSize: initialLoad ? 3 : 10,
          page: page,
          sortBy: "publishedAt",
        },
      });
      setArticles((prevArticles) => [
        ...prevArticles,
        ...response.data.articles,
      ]);
      setPage((prevPage) => prevPage + 1);
      setInitialLoad(false);
    } catch (error) {
      console.error("Error al obtener artículos:", error);
    }
    setLoading(false);
  };

  const loadLessArticles = () => {
    setPage((prevPage) => prevPage - 1);
    setArticles((prevArticles) => prevArticles.slice(0, -10));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Últimos Avances en Diabetes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles
          .slice(0, initialLoad ? 3 : articles.length)
          .map((article, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                <p className="text-gray-600 mb-4">{article.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </span>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Leer más
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="mt-8 text-center">
        <button
          onClick={loadLessArticles}
          disabled={page === 1}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50 mr-4"
        >
          Cargar menos articulos
        </button>
        <button
          onClick={fetchArticles}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50"
        >
          {loading ? "Cargando..." : "Cargar más artículos"}
        </button>
      </div>
    </div>
  );
};
