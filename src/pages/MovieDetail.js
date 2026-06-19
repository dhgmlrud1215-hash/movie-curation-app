import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetail } from "../api/movieApi";

function MovieDetail() {
    const {id} = useParams();
    const [movie, setMovies] = useState(null);

    useEffect(() => {
        getMovieDetail(id).then((data) => {
            setMovies(data);
        });
    },[id]);

    if (!movie) return <p>Loading...</p>;


    return (
        <main className="detail">
            
        </main>
    );
}

export default MovieDetail;