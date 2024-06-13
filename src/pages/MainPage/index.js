import React from 'react'
import Nav from '../../components/Nav'
import Portfolios from '../../components/Portfolios'
import Footer from '../../components/Footer'
import styled from 'styled-components'

const MainPage = () => {
  return (
    <Container>
      <Nav/>
      <Portfolios/>
      <Footer/>
    </Container>
  )
}

export default MainPage

const Container = styled.main`
  // background-color: gray;
  width: 85vw;
  margin: 0 auto;
  display: relative;
`;