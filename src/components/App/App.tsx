// import { useState } from 'react'
import { fetchMovies } from '../../services/movieService'
import SearchBar from '../SearchBar/SearchBar'
import styles from './App.module.css'
// import type { Movie } from '../../types/movie'
import toast, { Toaster } from 'react-hot-toast'

export default function App() {
    // const [movies, setMovies] = useState<Movie[]>([])
   
    const handleSearch = async (query: string) => {
    const data = await fetchMovies(query);

    if(data.results.length === 0) {
        toast.error('No movies found for your request.', {
             position: 'top-right',
        duration: 2500,
        })
    }
    }
    
    return (
        <div className={styles.app}>
        <Toaster/> 
        <SearchBar onSubmit={handleSearch} />    
        </div>
    )
}