export const addToFavorites = (id: string) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!favorites.includes(id)) {
        favorites.push(id);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}

export const removeFromFavorites = (id: string) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const newFavorites = favorites.filter((fav: string) => fav !== id);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
}

export const getFavorites = () => {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
}