import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getNowPlayingMovies, getUpcomingMovies, getTopRatedMovies } from "../api/movieApi";
import "../css/Search.css";

function Search() {
  const [keyword, setKeyword] = useState("");
  const [movies, setMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);

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
    Promise.all([
      getNowPlayingMovies(),
      getUpcomingMovies(),
      getTopRatedMovies(),
    ]).then(([now, upcoming, top]) => {
      const allMovies = [...now, ...upcoming, ...top];
      const uniqueMovies = allMovies.filter(
        (movie, index, self) =>
          index === self.findIndex((m) => m.id === movie.id)
      );

      setMovies(uniqueMovies);
    });

    const saved = JSON.parse(localStorage.getItem("likedMovies")) || [];
    setLikedMovies(saved);
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <main className="search-page">
      <h2>영화 검색</h2>

      <input
        className="search-input"
        type="text"
        placeholder="영화 제목을 검색해보세요"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      {keyword && (
        <p className="search-count">
          "{keyword}" 검색 결과 {filteredMovies.length}개
        </p>
      )}

      <section className="movie-list">
        {keyword === "" ? (
            <p className="empty-text">검색어를 입력해주세요.</p>
        ) : filteredMovies.length === 0 ? (
            <p className="empty-text">검색 결과가 없습니다.</p>
        ) : (
            filteredMovies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    likedMovies={likedMovies}
                    onLike={handleLikeMovie}
                    type="search"
                />
            ))
        )}
     </section>
    </main>
  );
}

export default Search;