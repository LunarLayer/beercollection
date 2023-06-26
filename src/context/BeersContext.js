import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const BeersContext = createContext();

const BeersContextProvider = ({ children }) => {
  const [beers, setBeers] = useState(null);

  console.log(beers);

  const getAllBeers = async () => {
    try {
      const response = await axios.get('https://api.punkapi.com/v2/beers?per_page=3');
      
      console.log(response.data);
      for (let beer of response.data) {
        beer.comments = [];
        beer.rating = "";
      }

      setBeers(response.data);

      console.log(beers);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addBeer = (newBeer) => {
    setBeers([...beers, newBeer]);
  };

  useEffect(() => {
    getAllBeers();
  }, []);

  return (
    <BeersContext.Provider value={{beers, setBeers, addBeer}}>
      {children}
    </BeersContext.Provider>
  );
};

export default BeersContextProvider;