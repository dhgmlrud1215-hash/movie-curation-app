import { useEffect, useState } from "react";
import { getMovieCertification, getMovieDetail } from "../api/movieApi";
import { Link } from "react-router-dom";

function MovieCard({ movie, type, likedMovies, onLike }) {

  const [certification, setCertification] = useState("");

  const liked = likedMovies?.some((item) => item.id === movie.id);

  const [runtime, setRuntime] = useState("");


  const getDday = (date) => {
  const today = new Date();
  const releaseDate = new Date(date);

  today.setHours(0, 0, 0, 0);
  releaseDate.setHours(0, 0, 0, 0);

  const diff = releaseDate - today;
  const dday = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (dday > 0) return `D-${dday}`;
  if (dday === 0) return "D-DAY";
  return "상영중";
  };


  useEffect(() => {
  getMovieCertification(movie.id).then((data) => {
    setCertification(data);
  });

  getMovieDetail(movie.id).then((data) => {
    setRuntime(data.runtime);
  });
  }, [movie.id]);


  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />
      </Link>

      <button className="like-btn" onClick={() => onLike(movie)}>
        <img
          src={liked ? "/icon/favorite_fill.svg" : "/icon/favorite.svg"}
          alt="찜하기"
          className="heart-icon"
        />
      </button>

      <h3>
        <span className="movie-title">{movie.title}</span>
        {certification && <span className="movie-age">{certification}</span>}
      </h3>

      <div className="movie-info">
        {type === "upcoming" ? (
          <span className="comingday">{getDday(movie.release_date)}</span>
        ) : (
        <>  
          {movie.vote_average > 0 && (
            <span>⭐ {movie.vote_average.toFixed(1)}</span>
          )}
          {runtime > 0 && <span className="movie-time">{runtime}분</span>}
        </>
        )}
      </div>
    </div>
  );
}

export default MovieCard;