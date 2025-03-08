import { useState, useEffect } from "react";

const useBookmark = (articleId) => {
  console.log("aca", articleId);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Función para obtener el estado de favorito inicial
  const fetchBookmarkStatus = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/favoritos/${articleId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setIsBookmarked(data.isBookmarked);
      }
    } catch (error) {
      console.error("Error al obtener el estado de favorito:", error);
    }
  };

  // Función para marcar o desmarcar el artículo
  const toggleBookmark = async () => {
    const prevBookmarked = isBookmarked;
    setIsBookmarked(!prevBookmarked);

    try {
      const response = await fetch("http://localhost:8080/favoritos", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          articleId,
          bookmarked: !prevBookmarked,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error al marcar el artículo: ${response.statusText}`);
      }

      console.log("Artículo marcado/desmarcado con éxito");
    } catch (error) {
      console.error("Error:", error);
      setIsBookmarked(prevBookmarked); // Revertir el estado en caso de error
    }
  };

  useEffect(() => {
    fetchBookmarkStatus();
  }, [articleId]);

  return [isBookmarked, toggleBookmark];
};

export default useBookmark;
