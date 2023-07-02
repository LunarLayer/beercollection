import React, { useState } from 'react';
import './App.scss';
import './basics/Reset.scss';
import './basics/Constants.scss';
import AppContextProvider from './context/AppContext';
import Navbar from './components/Navbar';
import BeersList from './pages/BeersList';
import ShowcaseSlider from './pages/ShowcaseSlider';
import AddBeer from './pages/AddBeer';

const App = () => {
  const [selectedView, setSelectedView] = useState('beersList');
  const handleViewChange = (view) => setSelectedView(view);

  return (
    <AppContextProvider>
      <Navbar onViewChange={handleViewChange} selectedView={selectedView}/>
      <div className='content-wrapper'>
        {selectedView === 'beersList' && <BeersList setSelectedView={setSelectedView} />}
        {selectedView === 'showcase' && <ShowcaseSlider setSelectedView={setSelectedView} />}
        {selectedView === 'addBeer' && <AddBeer />}
      </div>
    </AppContextProvider>
  );
};

export default App;