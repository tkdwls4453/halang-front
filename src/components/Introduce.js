import React from 'react';
import styled from 'styled-components';
import GlobalStyle from '../GlobalStyle';

const Introduce = () => {
  return (
    <IntroduceWrap>
      <GlobalStyle />
      <Text>
        하랑 인테리어는 형태의 출발점인 ‘dot’ 을<br />
        기반으로 하여, <br />
        근본적인 틀에서 시작한다.<br />
        라인으로 짜여진 공간이 면을 이루어 연출되듯,<br />
        곳곳에 기초를 토대로 단계적인 형태를 만들어낸다.<br />
        기초에서 어긋나지 않은 시작을 주목하라.<br />
        그것이 곧, 그 공간의 정체성이 될 것이니.<br />
        <br />
        <br />
        <span>嘏 장대하다；하 </span><br />
        <span>浪 파도       ；랑</span><br />
        여러분의 공간은 하랑 인테리어와 함께 합니다.<br />
      </Text>
      <IntroImages>
        <img src="/images/about-man.jpg" alt="man" />
        <img src="/images/about-girl.jpg" alt="girl" />
      </IntroImages>
    </IntroduceWrap>
  );
};

export default Introduce;

const IntroduceWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 150px;
  background-color: transparent;
  padding-top: 80px;
  padding-bottom: 100px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
    margin-top: 100px;
  }
`;

const Text = styled.p`
  color: #3B3808;
  text-align: left;
  line-height: 1.7;
  padding-right: 20px;
  font-size: 0.8em;

  @media (max-width: 768px) {
    text-align: center;
    padding-right: 0;
    font-size: 0.7em;
  }

  span {
    color: #136AB2;
  }
`;

const IntroImages = styled.div`
  display: flex;
  img {
    height: 250px;
    padding: 5px;

    @media (max-width: 768px) {
      height: 200px;
    }

    @media (max-width: 480px) {
      height: 150px;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;
