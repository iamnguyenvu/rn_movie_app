import axios from "axios";
import Constants from 'expo-constants';

// Get API key from environment variables
const API_KEY = process.env.EXPO_PUBLIC_MOVIE_API_KEY || Constants.expoConfig?.extra?.movieApiKey;

export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
    }
}

export const fetchMovies = async ({query}: { query: string }) => {
    if (!API_KEY) {
        throw new Error("EXPO_PUBLIC_MOVIE_API_KEY not found in environment variables");
    }

    const endpoint = query
        ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    try {
        const response = await axios.get(endpoint, {
            headers: TMDB_CONFIG.headers
        });

        return response.data.results;
    } catch (error) {
        console.error("Failed to fetch movies", error);
        throw error;
    }
}

export const fetchMovieDetails = async (movieId: string): Promise<MovieDetails> => {
    if (!API_KEY) {
        throw new Error("EXPO_PUBLIC_MOVIE_API_KEY not found in environment variables");
    }
    
    try {
        const response = await axios.get(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}`, {
            headers: TMDB_CONFIG.headers
        });

        return response.data;
    } catch (err) {
        console.error("Failed to fetch movie details:", err);
        throw err;
    }
}