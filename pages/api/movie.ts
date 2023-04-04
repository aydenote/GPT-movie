import axios from 'axios';

/** 최신 영화 20선 정보 가져오기 */
export async function getWeekTrend() {
  const movieListReq = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/week?&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
  );
  const movieList = await movieListReq.data.results;

  return movieList;
}

/** 영화 제목으로 정보 검색 */
export async function getSearchMovie(title: string) {
  const search = await axios.get(
    `https://api.themoviedb.org/3/search/movie?language=ko-KR&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&page=1&query=${title}&language=ko-KR`
  );
  return search.data.results[0];
}

/** 오늘의 트렌드 영화 정보 가져오기 */
export async function getTodayTrend() {
  const movieListReq = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=ko-KR&per_page=5&page=1`
  );

  const movieList = await movieListReq.data.results.slice(0, 4);

  return movieList;
}
