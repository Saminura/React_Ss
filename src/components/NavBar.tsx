import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="bg-slate-950 text-white px-6 py-4 shadow-lg shadow-slate-950/10">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-black bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
          MovieStore
        </Link>

        <div className="flex gap-2 text-sm font-bold">
          <Link to="/" className="rounded-full px-4 py-2 text-slate-200 transition hover:bg-white/10 hover:text-white">
            Поиск
          </Link>
          <Link to="/favorites" className="rounded-full px-4 py-2 text-slate-200 transition hover:bg-white/10 hover:text-white">
            Избранное
          </Link>
        </div>
      </div>
    </nav>
  );
}
