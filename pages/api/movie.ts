import axios from 'axios';

/** 최신 영화 20선 정보 가져오기 */
export async function getTrendingMovie() {
  const movieListReq = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/week?&api_key=${process.env.REACT_APP_TMDB_KEY}`
  );
  const movieList = await movieListReq.data.results;

  return movieList;
}
