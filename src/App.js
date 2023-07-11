import React, { useState } from 'react';

import './App.scss';
import './basics/Reset.scss';
import './basics/Constants.scss';

import Navbar from './components/Navbar';
import BeersList from './pages/BeersList';
import ShowcaseSlider from './pages/ShowcaseSlider';
import AddBeer from './pages/AddBeer';

import AppContextProvider from './context/AppContext';

const App = () => {
  const [selectedView, setSelectedView] = useState('beersList');
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  const handleViewChange = (view) => setSelectedView(view);

  return (
    <AppContextProvider>
      <Navbar
        onViewChange={handleViewChange}
        selectedView={selectedView}
        setFilterModalOpen={setFilterModalOpen}
      />
      <div className='content-wrapper'>
        {selectedView === 'beersList' &&
          <BeersList
            setSelectedView={setSelectedView}
            filterModalOpen={filterModalOpen}
            setFilterModalOpen={setFilterModalOpen} />
        }
        {selectedView === 'showcase' &&
          <ShowcaseSlider
            setSelectedView={setSelectedView} />
        }
        {selectedView === 'addBeer' &&
          <AddBeer />
        }
      </div>
    </AppContextProvider>
  );
};

export default App;