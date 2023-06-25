import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const BeersContext = createContext();

const BeersContextProvider = ({ children }) => {
  const [beers, setBeers] = useState(null);

  const getAllBeers = async () => {
    try {
      const response = await axios.get('https://api.punkapi.com/v2/beers');
      setBeers(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getAllBeers();
  }, []);

  return (
    <BeersContext.Provider value={beers}>
      {children}
    </BeersContext.Provider>
  );
};

export default BeersContextProvider;