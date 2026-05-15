import type React from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/favorites-context";

export default function MovieCard({ movie }: { movie: any }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();

  const favorite = isFavorite(movie.id);
  const title = movie.primaryTitle || movie.originalTitle || "Без названия";
  const year = movie.startYear || movie.releaseYear?.year;
  const rating = movie.rating?.aggregateRating;

  const handleFavorites = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie.id);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <Link to={`/movie/${movie.id}`}>
        <div className="aspect-[2/3] bg-slate-100">
          {movie.primaryImage?.url ? (
            <img src={movie.primaryImage.url} alt={title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-slate-400">
              Нет постера
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="line-clamp-2 min-h-10 font-bold leading-tight text-slate-900">
            {title}
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            {year || "Год неизвестен"} {rating ? `• ${Number(rating).toFixed(1)}/10` : ""}
          </p>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <button
          onClick={handleFavorites}
          className={`w-full rounded-lg px-4 py-2 text-sm font-semibold transition ${
            favorite
              ? "bg-rose-50 text-rose-600 hover:bg-rose-100"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {favorite ? "Убрать" : "В избранное"}
        </button>
      </div>
    </div>
  );
}
