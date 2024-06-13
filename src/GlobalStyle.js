import { createGlobalStyle } from "styled-components";

// 글로벌 스타일 설정
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    src: local('Pretendard Medium'), local('Pretendard-Medium'),
         url(../fonts/Pretendard-Medium.woff) format('woff');
  }

  body {
    font-family: 'Pretendard', sans-serif;
  }
`;

export default GlobalStyle;