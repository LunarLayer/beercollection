import React, { useState } from 'react';
import './App.scss';
import './basics/Reset.scss';
import './basics/Constants.scss';
import AppContextProvider from './context/AppContext';
import Navbar from './components/Navbar';
import Overview from './pages/Overview';
import ShowcaseSlider from './pages/ShowcaseSlider';
import AddBeer from './pages/AddBeer';

const App = () => {
  const [selectedView, setSelectedView] = useState('overview');
  const handleViewChange = (view) => setSelectedView(view);

  return (
    <AppContextProvider>
      <Navbar onViewChange={handleViewChange} />
      {selectedView === 'overview' && <Overview />}
      {selectedView === 'showcase' && <ShowcaseSlider />}
      {selectedView === 'addbeer' && <AddBeer />}
    </AppContextProvider>
  );
};

export default App;