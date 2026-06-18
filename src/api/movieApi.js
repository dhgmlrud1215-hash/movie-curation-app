const API_KEY = process.env.REACT_APP_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function getNowPlayingMovies() {
  const res = await fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&region=KR&page=1`
  );

  const data = await res.json();
  return data.results;
}

export async function getMovieCertification(movieId) {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/release_dates?api_key=${API_KEY}`
  );

  const data = await res.json();
  const kr = data.results.find((item) => item.iso_3166_1 === "KR");

  return kr?.release_dates[0]?.certification || "";
}

export async function getMovieDetail(movieId) {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`
  );

  const data = await res.json();
  return data;
}

export async function getUpcomingMovies() {
  const res = await fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko-KR&region=KR&page=1`
  );

  const data = await res.json();
  return data.results;
}