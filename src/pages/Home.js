import { useEffect, useState } from "react";
import { getNowPlayingMovies } from "../api/movieApi";
import MovieCard from "../components/MovieCard";

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getNowPlayingMovies().then((data) => {
      setMovies(data);
    });
  }, []);

   return (
    <main>
      {movies[0] && (
        <section className="hero">
            <img
              src={`https://image.tmdb.org/t/p/original${movies[0].backdrop_path}`}
              alt={movies[0].title}  
            />

            <div className="hero-text">
                <h1>{movies[0].title}</h1>
                <p>{movies[0].overview}</p>
                <button>상세보기</button>
            </div>
        </section>
      )}

      <h2>현재 상영작</h2>

      <section className="movie-list">
        {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
        ))}
      </section>
    </main>
  );
}
export default Home;