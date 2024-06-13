import React from 'react'
import styled from 'styled-components';
import Contact from '../../components/Contact';
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';

const ContactPage = () => {
  return (
    <Container>
      <Nav/>
      <Contact/>
      <Footer/>
    </Container>
  )
}

export default ContactPage

const Container = styled.main`
  width: 85vw;
  margin: 0 auto;
  display: relative;
`;