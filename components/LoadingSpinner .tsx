import spinnerSrc from '../public/spinner.svg';
import Image from 'next/image';
import styled from 'styled-components';

export default function LoadingSpinner() {
  return (
    <Background>
      <LoadingText>잠시만 기다려 주세요.</LoadingText>
      <Image src={spinnerSrc} alt="로딩 중" />
    </Background>
  );
}

const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled.div`
  font-size: 4rem;
  font-weight: bold;
  font-family: 'Netflix Sans', sans-serif;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 8px;
`;
