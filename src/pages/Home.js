import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import {
  getNowPlayingMovies,
  getUpcomingMovies,
  getTopRatedMovies,
  getMoviesByGenre,
} from "../api/movieApi";

function Home() {
  const [movies, setMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);

  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genreMovies, setGenreMovies] = useState([]);
  const [todayMovie, setTodayMovie] = useState(null);

  const genres = [
    { id: 28, name: "액션" },
    { id: 35, name: "코미디" },
    { id: 10749, name: "로맨스" },
    { id: 27, name: "공포" },
    { id: 16, name: "애니메이션" },
  ];

  const handleLikeMovie = (movie) => {
    const isLiked = likedMovies.some((item) => item.id === movie.id);

    let updatedMovies;

    if (isLiked) {
      updatedMovies = likedMovies.filter((item) => item.id !== movie.id);
    } else {
      const newLike = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
      };

      updatedMovies = [...likedMovies, newLike];
    }

    setLikedMovies(updatedMovies);
    localStorage.setItem("likedMovies", JSON.stringify(updatedMovies));
  };

  useEffect(() => {
  getNowPlayingMovies().then((data) => {
    const movieData = data || [];

    setMovies(movieData);

    if (movieData.length > 0) {
      const randomMovie =
        movieData[Math.floor(Math.random() * movieData.length)];

      setTodayMovie(randomMovie);
    }
  });

  getUpcomingMovies().then((data) => {
    setUpcomingMovies(data || []);
  });

  getTopRatedMovies().then((data) => {
    setTopMovies(data || []);
  });

  const saved = JSON.parse(localStorage.getItem("likedMovies")) || [];
  setLikedMovies(saved);
}, []);

useEffect(() => {
  if (!selectedGenre) return;

  getMoviesByGenre(selectedGenre).then((data) => {
    setGenreMovies(data || []);
  });
}, [selectedGenre]);

  return (
    <main id="main-content">
      {movies[0] && (
        <section className="hero">
          <img
            src={`https://image.tmdb.org/t/p/original${movies[0].backdrop_path}`}
            alt={movies[0].title}
          />

          <div className="hero-text">
            <h1>{movies[0].title}</h1>
            <p>{movies[0].overview}</p>

            <Link to={`/movie/${movies[0].id}`}>
              <button>▶ 자세히 보기</button>
            </Link>
          </div>
        </section>
      )}

      {todayMovie && (
        <section className="today-section">
          <div className="today-info">
            <h2>오늘 이 영화 어때요?</h2>
            <p className="today-reason">
              평점과 인기도를 기준으로 오늘 보기 좋은 영화로 추천드려요.
            </p>
            <p className="today-overview">
              {todayMovie.overview || "줄거리 정보가 없습니다."}
            </p>
          </div>

          <MovieCard
            movie={todayMovie}
            likedMovies={likedMovies}
            onLike={handleLikeMovie}
            type="today"
          />
        </section>
      )}

      <div className="section-title">
        <h2>
          <span>현재 </span>상영작
        </h2>
        <small>more &gt;&gt;</small>
      </div>

      <section className="movie-list">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            likedMovies={likedMovies}
            onLike={handleLikeMovie}
            type="now"
          />
        ))}
      </section>

      <section className="genre-section">
        <h2>장르별 영화</h2>

        <div className="genre-button">
          {genres.map((genre) => (
            <button
              key={genre.id}
              className={selectedGenre === genre.id ? "active" : ""}
              onClick={() => setSelectedGenre(genre.id)}
            >
              {genre.name}
            </button>
          ))}
        </div>

        <div className="movie-list">
          {genreMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              likedMovies={likedMovies}
              onLike={handleLikeMovie}
              type="genre"
            />
          ))}
        </div>
      </section>

      <div className="section-title">
        <h2>
          <span>평점 </span>높은 영화
        </h2>
        <small>more &gt;&gt;</small>
      </div>

      <section className="movie-list">
        {topMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            likedMovies={likedMovies}
            onLike={handleLikeMovie}
            type="top"
          />
        ))}
      </section>

      <h2 className="liked-title">
        내가<span>찜</span>한 영화
      </h2>

      <section className="movie-list">
        {likedMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            likedMovies={likedMovies}
            onLike={handleLikeMovie}
            type="like"
          />
        ))}
      </section>
    </main>
  );
}

export default Home;