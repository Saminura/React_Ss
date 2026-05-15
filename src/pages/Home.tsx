import { useEffect, useState } from "react";
import MoviesList from "../components/MoviesList";
import SearchBar from "../components/SearchBar";
import { boardMovies, searchMovies } from "../services/api";

export default function Home() {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    boardMovies().then((data) => {
      setMovies(data.titles);
    });
  }, []);

  const handleSearch = (query: string) => {
    searchMovies(query).then((data) => {
      setMovies(data.titles);
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-12 text-center">
        <p className="mb-3 text-sm font-bold uppercase tracking-wide text-blue-600">Каталог фильмов</p>
        <h1 className="text-4xl font-black text-slate-950 mb-4 sm:text-5xl">Поиск популярных фильмов</h1>
        <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
          Найдите фильм, откройте детали и сохраните понравившееся в избранное.
        </p>
        <SearchBar onSearch={handleSearch} />
      </div>

      <MoviesList movies={movies} />
    </div>
  );
}
