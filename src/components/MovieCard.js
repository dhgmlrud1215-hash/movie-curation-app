import { useEffect, useState } from "react";
import { getMovieCertification, getMovieDetail } from "../api/movieApi";

function MovieCard({ movie, type }) {
  const [certification, setCertification] = useState("");
  const [liked, setLiked] = useState(false);
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
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
      />

      <h3>
        <span className="movie-title">{movie.title}</span>
        {certification && <span className="movie-age">{certification}</span>}
      </h3>

      <div className="movie-info">
        {type === "upcoming" ? (
          <span>{getDday(movie.release_date)}</span>
        ) : (
        <>  
          {movie.vote_average > 0 && (
            <span>⭐ {movie.vote_average.toFixed(1)}</span>
          )}
          {runtime > 0 && <span className="movie-time">{runtime}분</span>}
        </>
        )}
      </div>

      <div className="movie-actions">
        <button className="ticket-btn">상세보기</button>

        <button className="like-btn" onClick={() => setLiked(!liked)}>
            <img
                src={liked ? "/icon/favorite_fill.svg" : "/icon/favorite.svg"}
                alt="찜하기"
                className="heart-icon"
            />
            찜하기
        </button>
      </div>
    </div>
  );
}

export default MovieCard;