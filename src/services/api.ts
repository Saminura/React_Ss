
const API ='https://api.imdbapi.dev';

export const boardMovies = async () => {
     const res = await fetch(`${API}/titles`);
    return res.json();
}

export const searchMovies = async (query: string = '', limit = 50) => {
    const res = await fetch (`${API}/search/titles?query=${query}&limit=${limit}`);
    return res.json();
}

export const getMovieById = async (id: string) => {
    const res = await fetch(`${API}/titles/${id}`);
    return res.json();

}

export const getMoviesByIds = async (ids: string[]) => {
    // const res = await fetch(`${API}/titles:batchGet?titleIds=${ids.join(',')}`);
    // return res.json();


    const movies = await Promise.all(
        ids.map(movieId => getMovieById(movieId))
    );

    return movies;
}