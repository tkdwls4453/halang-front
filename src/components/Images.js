import React, { useEffect, useRef, useCallback } from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { fetchImagesSelector, imagesState, pageState } from '../postAtoms';

const Images = () => {
  const { postId } = useParams();
  const [images, setImages] = useRecoilState(imagesState);
  const [page, setPage] = useRecoilState(pageState);
  const imagesLoadable = useRecoilValueLoadable(fetchImagesSelector({ page, postId }));
  const observer = useRef();

  // postId가 변경될 때마다 이미지를 초기화하고 페이지를 1로 설정
  useEffect(() => {
    setImages([]);
    setPage(1);
  }, [postId, setImages, setPage]);

  // imagesLoadable의 상태가 "hasValue"일 때 이미지를 추가
  useEffect(() => {
    if (imagesLoadable.state === 'hasValue') {
      setImages(prevImages => [...prevImages, ...imagesLoadable.contents]);
    }
  }, [imagesLoadable.state, imagesLoadable.contents, setImages]);

  const lastImageRef = useCallback(node => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [setPage]);

  return (
    <PortfolioWrap>
      {images.map((imgUrl, index) => {
        if (images.length === index + 1) {
          return <ImageWrap ref={lastImageRef} key={index}><Image src={imgUrl} alt={`Image ${index}`} /></ImageWrap>;
        }
        return <ImageWrap key={index}><Image src={imgUrl} alt={`Image ${index}`} /></ImageWrap>;
      })}
    </PortfolioWrap>
  );
};

export default Images;

const PortfolioWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 150px;
  width: 70vw;
`;

const ImageWrap = styled.div`
  flex: 1 1 calc(50% - 20px);
  margin: 10px;
  display: flex;
  justify-content: center;
`;

const Image = styled.img`
  width: 32vw;
  height: auto;
  display: block;
  object-fit: contain; /* 이미지가 왜곡되지 않도록 함 */
`;
