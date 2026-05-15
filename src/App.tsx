import {BrowserRouter,Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/favorites';
import NavBar from './components/NavBar';
import { FavoritesProvider } from './context/favorites-context';

function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
          <div className='min-h-screen bg-slate-50 flex flex-col'>
              <NavBar />
              <main className='flex-1'>
                  <Routes>
                      <Route path="/" element={<Home/>} />
                      <Route path="/movie/:id" element={<MovieDetails/>}/>
                      <Route path="/favorites" element={<Favorites/>}/>
                  </Routes>
                </main>
            </div>
      </FavoritesProvider>
    </BrowserRouter>

  );
}
 

export default App;