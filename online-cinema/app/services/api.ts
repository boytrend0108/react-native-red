
export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
}


export const fetchPopularMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;


  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};


export const fetchMovieDetails = async (movieId: string): Promise<MovieDetails> => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`;

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.status}`);
    }
    const data = await response.json();
    return data || null;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};


