import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import GlobalStyle from '../GlobalStyle';



const Footer = () => {
  return (
    <Container>
      <GlobalStyle />
      <Title>하랑 인테리어</Title>
      <Content>
        경기도 성남시 수정구 위례광장로 328, 우성위례타워 805호 <br />
        대표 : 임형태 | 전화 : 010-3690-9407 | 이메일 : halanginterior@naver.com <br />
        ⓒ 2022. 하랑인테리어 All Rights Reserved.
      </Content>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  color: #3B3808;
  text-align: left;
  margin-bottom: 0;
`;

const Title = styled.h1`
  font-size: 1.0rem;
  color: #3B3808;
  text-align: left;
`;

const Content = styled.p`
  font-size: 0.8rem;
  margin-left: 10px;
  line-height: 1.7;
`;
