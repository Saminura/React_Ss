import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFavorites } from "../context/favorites-context";
import { getMovieById } from "../services/api";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    getMovieById(id)
      .then((data) => setMovie(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="max-w-5xl mx-auto px-4 py-10 text-slate-500">Загрузка...</div>;
  }

  if (!movie) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-slate-900">Фильм не найден</h1>
        <Link to="/" className="mt-4 inline-block text-blue-600 hover:text-blue-700">
          Вернуться назад
        </Link>
      </div>
    );
  }

  const title = movie.primaryTitle || movie.originalTitle || "Без названия";
  const poster = movie.primaryImage?.url;
  const rating = movie.rating?.aggregateRating;
  const description =
    movie.plot?.plotText?.plainText ||
    movie.plot?.plainText ||
    (typeof movie.plot === "string" ? movie.plot : "") ||
    "Описание недоступно.";
  const year = movie.startYear || movie.releaseYear?.year;
  const runtime = movie.runtimeSeconds ? Math.floor(movie.runtimeSeconds / 60) : null;
  const favorite = isFavorite(movie.id);

  const handleFavorite = () => {
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie.id);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link to="/" className="text-sm font-medium text-blue-600 hover:text-blue-700">
        Назад к фильмам
      </Link>

      <div className="mt-6 grid gap-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[260px_1fr]">
        <div className="overflow-hidden rounded-lg bg-slate-100">
          {poster ? (
            <img src={poster} alt={title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex aspect-[2/3] items-center justify-center text-slate-400">
              Нет постера
            </div>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold text-slate-900">{title}</h1>

          <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-500">
            {year && <span>{year}</span>}
            {runtime && <span>{runtime} мин</span>}
            <span>Рейтинг: {rating ? `${Number(rating).toFixed(1)}/10` : "N/A"}</span>
          </div>

          <button
            onClick={handleFavorite}
            className={`mt-6 rounded-lg px-4 py-2 font-semibold transition ${
              favorite
                ? "bg-rose-50 text-rose-600 hover:bg-rose-100"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {favorite ? "Убрать из избранного" : "Добавить в избранное"}
          </button>

          <h2 className="mt-8 text-xl font-bold text-slate-900">Описание</h2>
          <p className="mt-3 leading-7 text-slate-600">{description}</p>
        </div>
      </div>
    </div>
  );
}
