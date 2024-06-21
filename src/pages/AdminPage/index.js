import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logout from '../../components/Logout';
import Selection from '../../components/Selection';
import PortfolioManagement from '../../components/PortfolioManagement';
import ReviewManagement from '../../components/ReviewManagement';
import Nav from '../../components/Nav';
import { checkJwt } from '../../api/api';

const AdminPage = () => {
  const [selectedOption, setSelectedOption] = useState('portfolio');
  const navigate = useNavigate();
  const location = useLocation();

  const handleJwt = useCallback(async () => {
    try {
      const response = await checkJwt();
      console.log(response);
    } catch (error) {
      console.error('실패:', error);
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    handleJwt();
  }, [location, handleJwt]);

  return (
    <Container>
      <Nav />
      <Logout />
      <Selection selectedOption={selectedOption} onSelect={setSelectedOption} />
      {selectedOption === 'portfolio' && <PortfolioManagement />}
      {selectedOption === 'review' && <ReviewManagement />}
    </Container>
  );
};

export default AdminPage;

const Container = styled.main`
  width: 85vw;
  margin: 0 auto;
  display: relative;
`;
