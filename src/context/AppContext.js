import React, { createContext, useEffect, useState } from 'react';

import axios from 'axios';
import debounce from 'lodash/debounce';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [beers, setBeers] = useState(null);
  const [screenSize, setScreenSize] = useState(false);


  const getAllBeers = async () => {
    try {
      const response = await axios.get('https://api.punkapi.com/v2/beers');

      for (let beer of response.data) {
        beer.comments = [];
        beer.rating = "";
        console.log(beer);
      }

      setBeers(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addBeer = (newBeer) => {
    console.log(beers[2]);
    console.log(newBeer);
    setBeers([...beers, newBeer]);
  };

  useEffect(() => {
    getAllBeers();

    function handleResize() {
      if (window.innerWidth <= 600) setScreenSize('mobile');
      else if (window.innerWidth <= 800) setScreenSize('tablet');
      else setScreenSize('desktop');
    }
    const debouncedHandleResize = debounce(handleResize, 100);
    window.addEventListener("resize", debouncedHandleResize);
    handleResize();
  }, []);

  return (
    <AppContext.Provider
      value={{
        beers, setBeers, addBeer,
        screenSize, setScreenSize
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;