import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { postsState, fetchPostsSelector } from '../postAtoms';

const Portfolios = () => {
  const [posts, setPosts] = useRecoilState(postsState);
  const { content, page, totalPages } = posts;
  const postsLoadable = useRecoilValueLoadable(fetchPostsSelector(page));
  const navigate = useNavigate();

  useEffect(() => {
    if (postsLoadable.state === 'hasValue') {
      setPosts(prevState => ({
        ...prevState,
        content: postsLoadable.contents.data.content,
        totalPages: postsLoadable.contents.data.totalPages
      }));
    }
  }, [postsLoadable.state, postsLoadable.contents, setPosts]);

  const handlePageChange = (newPage) => {
    setPosts(prevState => ({
      ...prevState,
      page: newPage
    }));
  };

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  if (postsLoadable.state === 'loading') {
    return <div>로딩중</div>;
  }

  if (postsLoadable.state === 'hasError') {
    return <div>Error loading posts</div>;
  }

  return (
    <div>
      <PortfolioWrap>
        {content.map(post => (
          <Post key={post.id} onClick={() => handlePostClick(post.id)}>
            <PostImage src={post.imgUrl} alt={post.title} />
            <PostInfo>
              <PostTitle>{post.title}</PostTitle>
              <PostDescription>{post.description}</PostDescription>
            </PostInfo>
          </Post>
        ))}
      </PortfolioWrap>
      <Pagination>
        {Array.from({ length: totalPages }, (_, i) => (
          <PageNumber
            key={i + 1}
            isActive={i + 1 === page}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </PageNumber>
        ))}
      </Pagination>
    </div>
  );
};

export default Portfolios;

const PortfolioWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 150px;
  gap: 20px;
  padding: 10px;
`;

const Post = styled.div`
  flex: 0 0 calc(33.333% - 20px); /* 한 줄에 최대 3개 아이템 */
  max-width: calc(33.333% - 20px);
  background-color: white;
  margin-bottom: 20px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    transform: scale(1.01);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    flex: 1 1 100%;
    max-width: 100%;
    margin-bottom: 10px;
  }
`;

const PostImage = styled.img`
  width: 100%;
  height: auto;
`;

const PostInfo = styled.div`
  padding: 10px;
  text-align: left;
`;

const PostTitle = styled.h2`
  font-size: 0.9em;
  text-align: left;
`;

const PostDescription = styled.p`
  font-size: 0.8em;
  text-align: left;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  font-size: 0.9em;
`;

const PageNumber = styled.a`
  margin: 0 5px;
  padding: 5px 10px;
  color: ${({ isActive }) => (isActive ? '#136AB2' : '#3B3838')};
  cursor: pointer;
`;
