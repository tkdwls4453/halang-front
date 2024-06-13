import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // BrowserRouter 추가
import App from './App';
import { act } from 'react'; // React에서 act 가져오기

test('renders specific text', async () => {
  await act(async () => {
    render(
      <Router>
        <App />
      </Router>
    );
  });
  
  // 실제로 존재하는 텍스트로 테스트를 수정합니다.
  const linkElement = screen.getByText(/하랑 인테리어/i);
  expect(linkElement).toBeInTheDocument();
});
