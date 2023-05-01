# GPT-Movie

[![React Version](https://img.shields.io/badge/Next-v13.2.4-blue)](https://ko.reactjs.org/)
[![Package Manager Version](https://img.shields.io/badge/npm-v6.14.17-yellow)](https://www.npmjs.com/)

OpenAI API를 활용해 취향에 맞는 영화를 추천해주는 프로젝트입니다. 영화 추천이 어려울 경우, 오늘의 트렌드 영화를 추천 받을 수 있습니다.

## 📅 기간

> 2023.03.28 - 2023.04.06

## 🔗 배포

> https://gpt-movie-git-main-aydenote.vercel.app/

<br />

## 📚 프로젝트 설명

<br>

### 1️⃣ 인트로

```jsx
// components/intro.tsx

 const router = useRouter();

  /** 2초 후 페이지 이동 */
  setTimeout(() => {
    router.push('/poster');
  }, 2000)

  /** 스타일 */
  transform: translate3d(0px, 0px, 100vw);

```

> 📌 setTimeout 함수를 사용해 일정 시간 이후 poster 페이지로 이동되도록 구현했습니다.  
> 📌 영화 시청 인트로와 같이 Netflx 로고가 다가오도록 구현했습니다. Netflx를 그대로 사용하지 않고 GPTFIX 로 로고를 변경하기 위해서 .svg 이미지를 사용하는 대신 Netflix 폰트를 사용했습니다.

## <br />

### 2️⃣ 질답

```jsx
// components/poster.tsx

export async function getStaticProps() {
  const movieList = await getWeekTrend();

  return {
    props: { movieList },
  };
}
```

> 📌 `getStaticProps` 함수를 사용해 렌더링 전에 서버에서 이번 주 트렌드 영화 데이터를 받아 포스터 이미지를 사용자에게 보여줍니다.  
> 📌 redux를 활용해 질문에 대한 답을 state에 저장하고 답변에 따라 영화 추천이 진행됩니다.

## <br />

### 3️⃣ 추천 결과

```jsx
// components/result.tsx
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
```

> 📌 OpenAI API에게 영화 취향을 전달하고 결과를 state에 저장하여 tmdb API에 해당 영화를 검색하는 방법으로 구현했습니다.  
> 📌 영화 검색 결과가 undefined 일 경우, 오늘의 트렌드 영화를 사용자에게 추천합니다.

---

<br>

## 💻 실행 방법

해당 프로젝트를 로컬서버에서 실행하기 위해서는 Git 과 Npm (node.js를 포함) 이 설치되어 있어야 합니다.
<br>

1.레파지토리 클론

```
npm clone https://github.com/aydenote/GPT-movie.git
```

<br>
2. packages 설치

```bash
npm install
```

<br>
3. 실행

```bash
# client 실행 : localhost:3000
npm run dev
```
