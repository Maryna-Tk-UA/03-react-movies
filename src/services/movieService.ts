import axios from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_TOKEN as string;

interface fetchMovesProps {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export async function fetchMovies(query: string): Promise<fetchMovesProps> {
    const { data } = await axios.get<fetchMovesProps>(`${BASE_URL}/search/movie`, {
        params: {
            query,
        },
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    });
    return data;
}

// const url = 'https://api.themoviedb.org/3/search/movie?query=batman&include_adult=false&language=en-US&page=1';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjdiNWI1ZGE5NjVmZTM4OTI5YTM4MzYxOTViNmM3NCIsIm5iZiI6MTc1MzUxMDYzNy4yOTIsInN1YiI6IjY4ODQ3MmVkYzJhZGFkZTI0MDU1ZTlkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EAmx_FYgycmYjne2ka3CRzGLbQelItOlJnL2Qaj8tiM'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));