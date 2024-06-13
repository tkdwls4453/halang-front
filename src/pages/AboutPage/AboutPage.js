import React from 'react'
import Nav from '../../components/Nav'
import styled from 'styled-components'
import Introduce from '../../components/Introduce'
import Footer from '../../components/Footer'

const AboutPage = () => {
  return (
    <Container>
      <Nav />
      <Introduce />
      <Footer />
    </Container>
  )
}

export default AboutPage

const Container = styled.main`
  width: 85vw;
  margin: 0 auto;
  display: relative;
`;