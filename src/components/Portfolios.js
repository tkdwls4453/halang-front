import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import styled from 'styled-components';
import { postsState, fetchPostsSelector } from '../postAtoms';

const Portfolios = () => {
  const [posts, setPosts] = useRecoilState(postsState);
  const { content, page, totalPages } = posts;
  const postsLoadable = useRecoilValueLoadable(fetchPostsSelector(page));

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
          <Post key={post.id}>
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
  justify-content: center;
  margin-top: 190px;
`;

const Post = styled.div`
  flex: 1 1 calc(33.333% - 40px);
  background-color: white;
  margin-right: 5px; /* 오른쪽에만 margin 추가 */
  margin-bottom: 20px; /* 아래쪽에 margin 추가 */
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-left: 3px;

  &:hover {
    transform: scale(1.01);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:nth-child(3n) {
    margin-right: 0; /* 세 번째 요소마다 오른쪽 margin을 제거 */
  }

  @media (max-width: 768px) {
    flex: 1 1 100%; /* 모바일 환경에서는 전체 너비 사용 */
    margin-right: 0; /* 오른쪽 여백 제거 */
    margin-left: 0; /* 왼쪽 여백 제거 */
  }
`;

const PostImage = styled.img`
  width: 100%;
  height: auto;
`;

const PostInfo = styled.div`
  padding: 10px;
  text-align: left; /* 텍스트를 왼쪽으로 정렬 */
`;

const PostTitle = styled.h2`
  font-size: 0.9em;
  text-align: left; /* 텍스트를 왼쪽으로 정렬 */
`;

const PostDescription = styled.p`
  font-size: 0.8em;
  text-align: left; /* 텍스트를 왼쪽으로 정렬 */
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
