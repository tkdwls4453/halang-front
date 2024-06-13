import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyle from '../GlobalStyle';

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);

  const handleLogoClick = () => {
    navigate('/main');
  };

  const categories = [
    { name: 'PORTFOLIO', path: '/main' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT', path: '/contact' },
    { name: 'BLOG', path: 'https://blog.naver.com/success221120', external: true },
    { name: 'INSTAGRAM', path: 'https://www.instagram.com/halanginterior_official?igsh=Mm9ncHVvM2JzMG13', external: true },
    { name: 'YOUTUBE', path: 'https://www.youtube.com/@halanginterior', external: true },
    { name: 'REVIEW', path: '/review' },
  ];

  return (
    <NavWrapper>
      <GlobalStyle />
      <Logo>
        <img src="/images/logo.png" alt="logo" onClick={handleLogoClick} />
      </Logo>
      <Category>
        {categories.map(category => (
          <CategoryItem key={category.name}>
            <CategoryLink 
              href={category.path}
              isActive={location.pathname === category.path}
              target={category.external ? '_blank' : '_self'}
              rel={category.external ? 'noopener noreferrer' : ''}
            >
              {category.name}
            </CategoryLink>
          </CategoryItem>
        ))}
      </Category>
    </NavWrapper>
  );
};

export default Nav;

const NavWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: fixed;
  top: 0;
  z-index: 10;
  background-color: white;
  width: 100vw;
`;

const Logo = styled.div`
  margin-bottom: 20px;
  display: block;
  img {
    width: 180px;
    cursor: pointer;
  }
  margin-top: 50px;
  margin-bottom: 50px;
`;

const Category = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
`;

const CategoryItem = styled.li`
  margin-right: 20px;
`;

const CategoryLink = styled.a`
  text-decoration: none;
  color: ${({ isActive }) => (isActive ? '#136AB2' : 'black')};
  font-size: 12px;

  &:hover {
    color: #136AB2;
  }
`;
