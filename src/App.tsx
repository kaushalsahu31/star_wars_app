import React, { useEffect }  from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CharacterDetails from './pages/CharacterDetails';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import "./App.css"
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import ThemeToggle from './components/ThemeToggle';
const App: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-mode' : '';
  }, [theme]);
  return (
    <ErrorBoundary>
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/character/:id" element={<CharacterDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
    </ErrorBoundary>
  );
};

export default App;
