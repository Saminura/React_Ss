import type React from "react";
import { useState } from "react";

export default function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex max-w-2xl gap-2 mx-auto w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Название фильма"
        className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-white shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
      />
      <button type="submit" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm active:scale-95">
        Найти
      </button>
    </form>
  );
}
