import React from 'react';
import './App.css';
import './basics/reset.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BeersContextProvider from './context/BeersContext';
import Navbar from './components/Navbar';
import Overview from './pages/Overview';
import ShowcaseSlider from './pages/ShowcaseSlider';

const App = () => {
  return (
    <BeersContextProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/showcase" element={<ShowcaseSlider />} />
        </Routes>
      </Router>
    </BeersContextProvider>
  );
};

export default App;