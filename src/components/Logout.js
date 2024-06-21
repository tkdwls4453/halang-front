// Logout.js
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { authState } from '../authAtoms';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Cookies from 'js-cookie';

const Logout = () => {
  const setAuthState = useSetRecoilState(authState);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthState({
      isLoggedIn: false,
      token: null,
    });
    Cookies.remove('authToken');
    navigate('/');
  };

  return (
    <Wrap>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </Wrap>
    
  );
};

export default Logout;

const Wrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 190px;
`;

const LogoutButton = styled.button`
  
  padding: 10px 15px;
  color: black;
  // border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  margin-bottom: 20px;
  &:hover {
    background-color: #333;
    color: white;
    border: white solid;
  }
`;
