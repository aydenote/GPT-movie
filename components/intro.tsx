import styled from 'styled-components';

export default function LoadingScreen() {
  return (
    <Container className="logo">
      <Logo>GPTFLIX</Logo>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  perspective: 100vw;
  font-size: 4rem;
  font-weight: bold;
  font-family: 'Netflix Sans', sans-serif;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 8px;
  color: #e50914;
  overflow: hidden;
`;

const Logo = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  transition: transform 2000ms;
  transform: translate3d(0px, 0px, 100vw);
`;
