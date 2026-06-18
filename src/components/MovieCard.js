import { useEffect, useState } from "react";
import { getMovieCertification, getMovieDetail } from "../api/movieApi";

function MovieCard({ movie }) {
  const [certification, setCertification] = useState("");
  const [liked, setLiked] = useState(false);
  const [runtime, setRuntime] = useState("");

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
        {movie.title}
        {certification && <span>{certification}</span>}
      </h3>

      <div className="movie-info">
        <span>⭐ {movie.vote_average.toFixed(1)}</span>
        {runtime && <span>{runtime}분</span>}
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