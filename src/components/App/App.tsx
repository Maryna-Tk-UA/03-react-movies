import { useState } from "react";
import { fetchMovies } from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./App.module.css";
import type { Movie } from "../../types/movie";
import toast, { Toaster } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSearch = async (query: string) => {
    try {
        setIsError(false);
        setLoading(true);

      const data = await fetchMovies(query);

      if (data.results.length === 0) {
        toast.error("No movies found for your request.", {
          position: "top-center",
          duration: 2500,
        });
      }
      setMovies(data.results);
    } catch {
      setIsError(true);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (id: number) => {
    console.log(id);
  };

  return (
    <div className={styles.app}>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {loading 
        ? (<Loader />)
        : isError
          ? (<ErrorMessage />)
          : movies.length > 0 && (<MovieGrid onSelect={handleSelect} movies={movies} />)}
    </div>
  );
}
