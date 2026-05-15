import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Movieslist from "../components/MoviesList";
import { useFavorites } from "../context/favorites-context";
import { getMoviesByIds } from "../services/api";

export default function Favorites() {
  const { favorites } = useFavorites();
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!favorites.length) {
      setMovies([]);
      return;
    }

    setLoading(true);
    getMoviesByIds(favorites)
      .then((data) => setMovies(data))
      .finally(() => setLoading(false));
  }, [favorites]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Избранное</h1>
        <p className="mt-2 text-slate-500">Фильмов: {favorites.length}</p>
      </div>

      {loading ? (
        <p className="text-slate-500">Загрузка...</p>
      ) : movies.length ? (
        <Movieslist movies={movies} />
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <h2 className="text-xl font-bold text-slate-900">Пока пусто</h2>
          <p className="mt-2 text-slate-500">Добавьте фильмы в избранное, и они появятся здесь.</p>
          <Link to="/" className="mt-5 inline-block rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
            Найти фильмы
          </Link>
        </div>
      )}
    </div>
  );
}
