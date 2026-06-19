import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetail, getMovieCredits } from "../api/movieApi";
import ReserveModal from "../components/ReserveModal";

function MovieDetail() {
    const {id} = useParams();
    const [movie, setMovies] = useState(null);
    const [cast, setCast] = useState([]);
    const [isReserveOpen, setIsReserveOpen] = useState(false);

    useEffect(() => {
        getMovieDetail(id).then((data) => {
            setMovies(data);
        });

        getMovieCredits(id).then((data) => {
            setCast(data);
        });
    },[id]);

    if (!movie) return <p>Loading...</p>;


    return (
        <main className="detail">
            <section className="detail-main">
                <img 
                    src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
                    alt={movie.title}
                    className="detail-poster"
                />

                <div className="detail-text">
                    <h2>{movie.title}</h2>
                    <p>{movie.overview}</p>
                </div>

                <div className="detail-info">
                    <span>⭐ {movie.vote_average.toFixed(1)}</span>
                    <span>{movie.runtime}분</span>
                    <span>{movie.release_date}</span>
                </div>

                <button className="reserve-btn" onClick={() => setIsReserveOpen(true)}>
                    예매하기
                </button>
            </section>

            {isReserveOpen && (
                <ReserveModal
                    movie={movie}
                    onClose={() => setIsReserveOpen(false)}
                />
            )}

            <section className="cast-section">
                <h3>출연진</h3>

                <div className="cast-list">
                    {cast
                    .filter((person) => person.profile_path)
                    .slice(0, 8)
                    .map((person) => (
                    <div className="cast-card" key={person.id}>
                    <img
                        src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                        alt={person.name}
                    />
                    <strong>{person.name}</strong>
                    <p>{person.character}</p>
                    </div>
                ))}
                </div>
        </section>
        </main>
    );
}

export default MovieDetail;