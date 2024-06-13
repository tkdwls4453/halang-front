import React from 'react';
import styled from 'styled-components';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';

const FirstPage = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 네비게이터 함수를 얻음

  const handleLogoClick = () => {
    navigate('/main'); // 페이지를 '/main'으로 이동
  };

  return (
    <Container>
      <Content>
        <Logo>
          <img src="/images/logo.png" alt="logo" onClick={handleLogoClick}/>
        </Logo>
      </Content>
      <Footer />
    </Container>
  );
};

export default FirstPage;

const Container = styled.main`
  // background-color: gray;
  width: 85vw;
  margin: 0 auto;
`;

const Content = styled.div`
  // background-color: pink;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 120px;
`;

const Logo = styled.a`
  img {
    width: 12rem;
    cursor: pointer; // 커서 모양을 포인터로 변경 (선택 사항)
  }
`;
