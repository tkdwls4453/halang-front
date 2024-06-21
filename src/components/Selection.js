// Selection.js
import React from 'react';
import styled from 'styled-components';

const Selection = ({ selectedOption, onSelect }) => {
  return (
    <SelectionContainer>
      <OptionButton
        isSelected={selectedOption === 'portfolio'}
        onClick={() => onSelect('portfolio')}
        aria-pressed={selectedOption === 'portfolio'}
      >
        Portfolio
      </OptionButton>
      <OptionButton
        isSelected={selectedOption === 'review'}
        onClick={() => onSelect('review')}
        aria-pressed={selectedOption === 'review'}
      >
        Review
      </OptionButton>
    </SelectionContainer>
  );
};

export default Selection;

const SelectionContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const OptionButton = styled.button`
  padding: 10px 20px;
  margin: 0 10px;
  background-color: ${({ isSelected }) => (isSelected ? '#222' : '#555')};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  &:hover {
    background-color: ${({ isSelected }) => (isSelected ? '#555' : '#777')};
  }
`;
