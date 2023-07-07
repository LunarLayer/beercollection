import React, { createContext, useEffect, useState } from 'react';

import axios from 'axios';
import debounce from 'lodash/debounce';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [unsortedBeers, setUnsortedBeers] = useState(null)
  const [beers, setBeers] = useState(null);
  const [screenSize, setScreenSize] = useState(false);


  const getAllBeers = async () => {
    try {
      const response = await axios.get('https://api.punkapi.com/v2/beers');

      for (let beer of response.data) {
        beer.comments = [];
        beer.rating = "";
      }

      console.log(response.data);
      for (let beer of response.data) {
        beer.comments = ["This beer takes a bit of patience to love", "Once it's in full flour (pun intended), is that even a word? Let's say it is! Once it's in full flour (pun intended), is that even a word? Let's say it is! Once it's in full flour (pun intended), is that even a word? Let's say it is!"]
        
      }

      setUnsortedBeers(response.data)
      setBeers(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const sortBeers = (parameter, sortDirection, beerId) => {
    const sorted = [...beers].sort((beerA, beerB) => {
      switch (parameter) {
        case 'setBeerFirstInArray':
          return setBeerFirstInArray(beerId, beerA.id, beerB.id);
        case 'name':
          return compareString(beerA.name, beerB.name, sortDirection);
        case 'first_brew':
          return compareDate(beerA.first_brewed, beerB.first_brewed, sortDirection);
        case 'rating': // TODO: Confirm working
          return compareRating(beerA.rating, beerB.rating, sortDirection);
        case 'comments': // TODO: Confirm working
          return compareNumber(beerA.comments, beerB.comments, sortDirection);
        default:
          return 0;
      }
    });

    setBeers(sorted);
  };

  const setBeerFirstInArray = (beerId, idA, idB) => {
    if (idA === beerId) return -1;
    if (idB === beerId) return 1;
    return 0;
  };

  const compareString = (beerA, beerB, sortDirection) => {
    const a = beerA.toLowerCase();
    const b = beerB.toLowerCase();

    if (a < b) {
      return sortDirection === 'desc' ? -1 : 1;
    }
    if (a > b) {
      return sortDirection === 'desc' ? 1 : -1;
    }
    return 0;
  };

  const compareDate = (beerA, beerB, sortDirection) => {
    if (!beerA || !beerB) return 0;

    const [monthA, yearA] = beerA.split('/');
    const [monthB, yearB] = beerB.split('/');

    if (yearA < yearB) return sortDirection === 'desc' ? -1 : 1;
    if (yearA > yearB) return sortDirection === 'desc' ? 1 : -1;
    if (monthA > monthB) return sortDirection === 'desc' ? 1 : -1;
    if (monthA > monthB) return sortDirection === 'desc' ? 1 : -1;
    return 0;
  };

  const compareRating = (valueA, valueB, sortDirection) => {
    return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
  };

  const compareNumber = (valueA, valueB, sortDirection) => {
    return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
  };

  const addBeer = (newBeer) => {
    setBeers([...beers, newBeer]);

    console.log(newBeer);
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
        unsortedBeers, setUnsortedBeers,
        sortBeers,
        beers, setBeers, addBeer,
        screenSize, setScreenSize
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;