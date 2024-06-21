import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { authState } from '../authAtoms';
import config from '../config';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const setAuthState = useSetRecoilState(authState);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      setAuthState({
        isLoggedIn: true,
        token: data.token,
      });

      Cookies.set('authToken', data.token, { expires: 1 }); // Token을 쿠키에 저장 (유효기간: 1일)

      navigate('/admin'); // Redirect to admin page
    } catch (error) {
      console.error('Login error:', error);
      alert('아이디와 비밀번호를 다시 확인해 주세요.'); // Show alert on login failure
    }
  };

  return (
    <Container>
      <LoginBox>
        <Title>관리자 로그인</Title>
        <Subtitle>관리자만 접근 가능합니다.</Subtitle>
        <Input 
          type="text" 
          placeholder="아이디" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input 
          type="password" 
          placeholder="비밀번호" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoginButton onClick={handleLogin}>로그인</LoginButton>
      </LoginBox>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const LoginBox = styled.div`
  background: #fff;
  padding: 40px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;
  margin-top: 60px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.5em;
  color: #333;
`;

const Subtitle = styled.p`
  font-size: 0.9em;
  color: #999;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9em;
`;

const LoginButton = styled.button`
  width: 110%;
  padding: 10px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  margin-bottom: 10px;
  &:hover {
    background-color: #555;
  }
`;
