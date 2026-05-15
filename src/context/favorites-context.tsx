import React, { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (id: string) => {
    if (!favorites.includes(id)) {
      setFavorites([...favorites, id]);
    }
  };

  const removeFromFavorites = (id: string) => {
    setFavorites(favorites.filter((fav: string) => fav !== id));
  };

  const isFavorite = (id: string) => {
    return favorites.includes(id);
  };

  const value = {
    addToFavorites,
    removeFromFavorites,
    favorites,
    isFavorite,
  };
  

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}