import axios from 'axios';

/** 최신 영화 20선 정보 가져오기 */
export async function getTrendingMovie() {
  const movieListReq = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/week?&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
  );
  const movieList = await movieListReq.data.results;

  return movieList;
}

export async function getSearchMovie(title: string) {
  const search = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&page=1&query=${title}&language=ko-KR`
  );
  return search.data.results[0];
}
