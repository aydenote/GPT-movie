import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import TodayRecommend from '@/components/TodayRecommend';
import { Movie, ReduxType } from '@/type';
import { getSearchMovie } from './api/movie';
import styled, { css } from 'styled-components';

type MoviePosterProps = {
  poster?: string;
};

export default function Result() {
  const questionAnswer = useSelector(state => state) as ReduxType;
  const answerList = questionAnswer.dataList.map(question => question.answer);
  const likeGenre = answerList[1];
  const likeMovie = answerList[3];
  const [answer, setAnswer] = useState<Movie | string>('');

  useEffect(() => {
    const reg = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/\n]/gim;

    /** OpenAI 영화 검색 */
    async function handleResult() {
      // 답변이 비어 있는 경우, result 페이지에서 새로고침
      if (!likeGenre && !likeMovie) {
        setAnswer('죄송합니다. 영화를 찾을 수 없습니다.');
        return;
      }

      try {
        const response = await fetch('./api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            question: `${likeMovie}와 비슷한 ${likeGenre} 장르 영화명 하나만 말해줘`,
            // question: `Tell me the name of the movie that is similar to ${likeMovie}`,
          }),
        });

        const data = await response.json();
        if (response.status !== 200) {
          throw data.error || new Error(`request failed with status ${response.status}`);
        }
        const searchMovie = await getSearchMovie(data.result.replace(reg, ''));
        setAnswer(searchMovie ? searchMovie : '죄송합니다. 영화를 찾을 수 없습니다.');

      } catch (error: any) {
        console.error(error);
        alert(error.message);
      }
    }
    handleResult()
  }, [likeGenre, likeMovie])

  /** 커튼 좌우 애니메이션 함수 */
  function handleCurtain() {
    document.querySelector('.curtainLeft')?.classList.toggle('clicked');
    document.querySelector('.curtainRight')?.classList.toggle('clicked');
  }

  return (
    <Container onClick={handleCurtain}>
      <Wrapper  >
        <CurtainLeft className="curtainLeft clicked">
        </CurtainLeft>
        <ResultContent className="curtain__prize" poster={typeof answer === 'object' ? answer.poster_path : undefined}>
          {typeof answer === 'string' && <TodayRecommend />}
        </ResultContent>
        <CurtainRight className="curtainRight clicked">
        </CurtainRight>
      </Wrapper>
    </Container >
  )
}

const Container = styled.section`
  width: 100%; 
  height: 100%;
  overflow: hidden;
  cursor: pointer;
  
  .curtainLeft.clicked {
    transform: translateX(0);
  }
  .curtainRight.clicked {
    transform: translateX(0);
  }
`

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

const CurtainLeft = styled.div`
  width: 50%;
  height: 100vh;
  float: left; 
  position: relative;
  background: #8b0000;
  background-image: url('https://images.vexels.com/media/users/17482/101168/preview2/01bdac45c37aff22f75230abf3f019d4-red-curtain-background.png');
  background-repeat: no-repeat;
  background-size: cover;
  transition: all 1s ease-out; 
  transform: translateX(-100%);
  z-index: 2;
`

const CurtainRight = styled.div`
  width: 50%;
  height: 100vh;
  float: left; 
  position: relative;
  background: #8b0000;
  background-image: url('https://images.vexels.com/media/users/17482/101168/preview2/01bdac45c37aff22f75230abf3f019d4-red-curtain-background.png');
  background-repeat: no-repeat;
  background-size: cover;
  transition: all 1s ease-out; 
  transform: translateX(100%);
  z-index: 2; 
`

const ResultContent = styled.div<MoviePosterProps>`
  position: absolute; 
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; 
  height: 100%;
  text-align: center;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  overflow: hidden;
  z-index: 1; 
  ${props =>
    props.poster !== undefined &&
    css`
      background: url(https://image.tmdb.org/t/p/w500/${props.poster}) center no-repeat;
    `}  
`
