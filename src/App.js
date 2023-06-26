import React, { useState } from 'react';
import './App.css';
import './basics/reset.css';
import BeersContextProvider from './context/BeersContext';
import Navbar from './components/Navbar';
import Overview from './pages/Overview';
import ShowcaseSlider from './pages/ShowcaseSlider';
import AddBeerForm from './pages/AddBeerForm';

const App = () => {
  const [selectedView, setSelectedView] = useState('overview');

  const handleViewChange = (view) => setSelectedView(view);

  return (
    <BeersContextProvider>
      <Navbar onViewChange={handleViewChange} />
      {selectedView === 'overview' && <Overview />}
      {selectedView === 'showcase' && <ShowcaseSlider />}
      {selectedView === 'addbeer' && <AddBeerForm />}
    </BeersContextProvider>
  );
};

export default App;