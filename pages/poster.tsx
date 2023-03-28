import { useEffect, useState } from 'react';
import axios from 'axios';
import { Movie } from '@/type/movie';
import LoadingSpinner from '@/components/LoadingSpinner ';
import styled, { keyframes } from 'styled-components';
import { getTrendingMovie } from './api/movie';

type MovieListProps = {
  movieList: Movie[];
};

/** 영화 포스터 이미지 로드 함수 */
const preloadImages = (movieList: Movie[]) => {
  const images = movieList.map(movie => {
    const img = new Image();
    img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    return img;
  });
  return Promise.all(images);
};

export default function poster({ movieList }: MovieListProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    preloadImages(movieList).then(() => setIsLoaded(true));
  }, [movieList]);

  return isLoaded ? <Container movieList={movieList}></Container> : <LoadingSpinner />;
}

/** API 호출하여 페이지에 props로 Data 전달 함수 */
export async function getStaticProps() {
  const movieList = await getTrendingMovie();

  return {
    props: { movieList },
  };
}

const backgroundSlider = (movieList: Movie[]) => keyframes`
  0% {
    background-image: url(https://image.tmdb.org/t/p/w500/${movieList[0].poster_path});
  }
  25% {
    background-image: url(https://image.tmdb.org/t/p/w500/${movieList[1].poster_path});
  }
  50% {
    background-image: url(https://image.tmdb.org/t/p/w500/${movieList[2].poster_path});
  }
  75% {
    background-image: url(https://image.tmdb.org/t/p/w500/${movieList[3].poster_path});
  }
  100% {
    background-image: url(https://image.tmdb.org/t/p/w500/${movieList[4].poster_path});
  }`;

const Container = styled.div<MovieListProps>`
  height: 100vh;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  animation: ${props => backgroundSlider(props.movieList)} 20s infinite;
`;
