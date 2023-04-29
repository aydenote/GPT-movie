import { getTodayTrend } from '@/pages/api/movie';
import { Movie } from '@/type';
import { useState } from 'react';
import LoadingSpinner from './LoadingSpinner ';
import styled from 'styled-components';

type MoviePosterProps = {
  poster?: string;
};

export default function TodayRecommend() {
  const [isLoaded, setIsLoaded] = useState<Movie[] | boolean>(false);
  getTodayTrend().then(moviList => setIsLoaded(moviList));

  return typeof isLoaded === 'object' ? (
    <>
      {isLoaded.map(movie =>
        <Card key={movie.id}>
          <Wrapper>
            <BackgroundBox className='background' poster={movie.poster_path}></BackgroundBox>
            <MovieInfo>
              <Content className='info'>
                <DateBox>
                  <p>{movie.release_date}</p>
                </DateBox>
                <Title>{movie.title}</Title>
                <Overview >{movie.overview}</Overview>
              </Content>
            </MovieInfo>
          </Wrapper>
        </Card>
      )}
    </>
  )
    : <LoadingSpinner />

};

const Card = styled.section`
  width: 50%;
  max-width: 388px;
  padding: 0 1.7rem;
  @media (max-width: 776px) {
    width: 321px;
  }

  @media (max-width: 643px) {
    width: 254px;
  }

  @media (max-width: 510px) {
    width: 188px;
  }
`

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  :hover .info{
    transform: translateY(0);
  }

  :hover .background{
    opacity: 0.2;
  }
`
const BackgroundBox = styled.div<MoviePosterProps>`
  height: 500px;
  background: url(https://image.tmdb.org/t/p/w500/${props => props.poster});
  background-size: contain;
  background-repeat: no-repeat;

  @media (max-width: 776px) {
      height: 400px;
  }

  @media (max-width: 643px) {
      height: 300px;
  }

  @media (max-width: 510px) {
      height: 200px;
  }

`

const DateBox = styled.div`
  font-size: 14px;
  color:white;
`
const MovieInfo = styled.section`
  position: absolute;
  width: 100%;
  bottom: 0;
  color: white;  
`

const Content = styled.div`
  padding: 1em;
  position: relative;
  z-index: 1;
  transition: transform 0.3s;
  transform: translateY(calc(70px + 4em));
`
const Title = styled.h1`
  margin-top: 10px;
  font-size: 1em;
  font-family: 'Open Sans', sans-serif;
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis;
`

const Overview = styled.p`
  display: -webkit-box;
  margin: 0;
  height: 70px;
  text-align: left;
  text-overflow: ellipsis;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
`