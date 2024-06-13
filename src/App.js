import { Route, Routes } from 'react-router-dom';
import './App.css';
import FirstPage from './pages/FirstPage';
import MainPage from './pages/MainPage';
import AboutPage from './pages/AboutPage/AboutPage';
import ContactPage from './pages/ContactPage/ContactPage';
import ReviewPage from './pages/ReviewPage/ReviewPage';


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
        </Route>
        
      </Routes>
    </div>
  );
}

export default App;
