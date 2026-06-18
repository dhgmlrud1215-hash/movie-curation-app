import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getNowPlayingMovies, getUpcomingMovies } from "../api/movieApi";

function Home() {
  const [movies, setMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    getNowPlayingMovies().then((data) => {
      setMovies(data);
    });

    getUpcomingMovies().then((data) => {
      setUpcomingMovies(data);
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
                <button>▶ 자세히 보기</button>
            </div>
        </section>
      )}

      <h2>현재 상영작</h2>

      <section className="movie-list">
        {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} type="now" />
        ))}
      </section>

      <h2 className="section-title">
        상영 <span>예정</span>작
      </h2>

      <section className="movie-list">
        {upcomingMovies
          .filter((movie) => !movies.some((nowMovie) => nowMovie.id === movie.id))  
          .map((movie) => (
            <MovieCard key={movie.id} movie={movie} type="upcoming" />
          ))}
      </section>
    </main>
  );
}
export default Home;