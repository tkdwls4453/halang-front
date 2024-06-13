import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // BrowserRouter 추가
import App from './App';

test('renders learn react link', () => {
  render(
    <Router> {/* App을 BrowserRouter로 감쌉니다 */}
      <App />
    </Router>
  );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
