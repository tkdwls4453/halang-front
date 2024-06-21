import React from 'react'
import styled from 'styled-components';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Login from '../../components/Login';

const LoginPage = () => {
  return (
    <Container>
      <Nav/>
      <Login/>
      <Footer/>
    </Container>
  )
}

export default LoginPage

const Container = styled.main`
  // background-color: gray;
  width: 85vw;
  margin: 0 auto;
  display: relative;
`;