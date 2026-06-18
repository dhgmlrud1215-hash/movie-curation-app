import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { 
  getNowPlayingMovies, getUpcomingMovies, getTopRatedMovies 
  } from "../api/movieApi";

function Home() {
  const [movies, setMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);

  const [likedMovies, setLikedMovies] = useState([]);

  const handleLikeMovie = (movie) => {
  const isLiked = likedMovies.some((item) => item.id === movie.id);

  let updatedMovies;

  if (isLiked) {
    updatedMovies = likedMovies.filter((item) => item.id !== movie.id);
  } else {
    updatedMovies = [...likedMovies, movie];
  }

  setLikedMovies(updatedMovies);
  localStorage.setItem("likedMovies", JSON.stringify(updatedMovies));
};



  useEffect(() => {
    getNowPlayingMovies().then((data) => {
      setMovies(data);
    });

    getUpcomingMovies().then((data) => {
      setUpcomingMovies(data);
    });

    getTopRatedMovies().then((data) => {
      setTopMovies(data);

    },[])

    const saved = JSON.parse(localStorage.getItem("likedMovies")) || [];
          setLikedMovies(saved);
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

      <div className="section-title">
        <h2><span>현재 </span>상영작</h2>
        <small>more &gt;&gt;</small>
      </div>

      <section className="movie-list">
        {movies.map((movie) => (
            <MovieCard k
            key={movie.id}
            movie={movie}
            likedMovies={likedMovies}
            onLike={handleLikeMovie}
            type="now" />
        ))}
      </section>

      <div className="section-title">
        <h2>상영 <span>예정</span>작</h2>
        <small>more &gt;&gt;</small>
      </div>

      <section className="movie-list">
        {upcomingMovies
          .filter((movie) => !movies.some((nowMovie) => nowMovie.id === movie.id))  
          .map((movie) => (
            <MovieCard 
            key={movie.id}
            movie={movie}
            likedMovies={likedMovies}
            onLike={handleLikeMovie}
            type="upcoming" />
          ))}
      </section>

      <div className="section-title">
        <h2><span>평점 </span>높은 영화</h2>
        <small>more &gt;&gt;</small>
      </div>

      <section className="movie-list">
        {topMovies.map((movie) => (
          <MovieCard 
          key={movie.id}
          movie={movie}
          likedMovies={likedMovies}
          onLike={handleLikeMovie}
          type="top" />
        ))}
      </section>

      <h2 className="section-title">
        내가<span>찜</span>한 영화
      </h2>

      <section className="movie-list">
        {likedMovies.map((movie) => (
          <MovieCard 
          key={movie.id}
          movie={movie}
          likedMovies={likedMovies}
          onLike={handleLikeMovie}
          type="like" />
        ))}
      </section>
    </main>
  );
}
export default Home;