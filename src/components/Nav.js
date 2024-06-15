import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyle from '../GlobalStyle';

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogoClick = () => {
    navigate('/main');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
      <MenuButton onClick={toggleMenu}>
        ☰
      </MenuButton>
      <Category menuOpen={menuOpen}>
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
  width: 85vw;
  padding: 10px;

  @media (max-width: 768px) {
    // align-items: center;
  }
`;

const Logo = styled.div`
  margin-bottom: 20px;
  display: block;
  img {
    width: 180px;
    cursor: pointer;
  }
  margin-top: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    img {
      width: 150px; /* 모바일에서 로고 크기 줄이기 */
    }
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
    position: absolute;
    top: 20px;
    right: 20px;
  }
`;

const Category = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    display: ${({ menuOpen }) => (menuOpen ? 'flex' : 'none')};
    width: 100%;
  }
`;

const CategoryItem = styled.li`
  margin-right: 20px;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

const CategoryLink = styled.a`
  text-decoration: none;
  color: ${({ isActive }) => (isActive ? '#136AB2' : 'black')};
  font-size: 12px;

  &:hover {
    color: #136AB2;
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
