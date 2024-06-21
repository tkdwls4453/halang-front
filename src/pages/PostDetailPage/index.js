import React from 'react'
// import { useParams } from 'react-router-dom';
import Nav from '../../components/Nav';
import styled from 'styled-components';
import Images from '../../components/Images';

const PostDetailPage = () => {
  // const { postId } = useParams();

  return (
    <Container>
      <Nav />
      <Images />
    </Container>
  )
}

export default PostDetailPage

const Container = styled.main`
  width: 75vw;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;