import { Route, Routes } from 'react-router-dom';
import './App.css';
import FirstPage from './pages/FirstPage';
import MainPage from './pages/MainPage';
import AboutPage from './pages/AboutPage/AboutPage';
import ContactPage from './pages/ContactPage/ContactPage';
import ReviewPage from './pages/ReviewPage/ReviewPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import PortfolioAddPage from './pages/PortfolioAddPage';
import PostDetailPage from './pages/PostDetailPage';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/'>
          <Route index element={<FirstPage/>} />
          <Route path='/main' element={<MainPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/review' element={<ReviewPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/add/post' element={<PortfolioAddPage />} />
          <Route path='/post/:postId'element={<PostDetailPage/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
