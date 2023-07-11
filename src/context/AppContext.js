import React, { createContext, useEffect, useState } from 'react';

import axios from 'axios';
import debounce from 'lodash/debounce';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [unsortedBeers, setUnsortedBeers] = useState(null)
  const [beers, setBeers] = useState(null);
  const [screenSize, setScreenSize] = useState(false);
  const [currentFilters, setCurrentFilters] = useState([]);
  const [sortType, setSortType] = useState({ parameter: null, direction: null });

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

  function setStarRating(beerId, rating) {
    setBeers(prevBeers => {
      return prevBeers.map(beer => {
        if (beer.id === beerId) {
          beer.starRating = rating;
        }
        return beer;
      });
    });
  }

  function addFilter(newFilter) {
    let updatedFilters = currentFilters;
    updatedFilters.push(newFilter)
    setCurrentFilters(updatedFilters);
    applyFilters(updatedFilters);
  }

  function removeFilter(filter) {
    const updatedFilters = currentFilters.filter((currentFilter) => currentFilter !== filter);
    if (updatedFilters.length === 0) {
      setBeers(unsortedBeers);
    } else {
      applyFilters(updatedFilters);
    }

    setCurrentFilters(updatedFilters);
  }

  function applyFilters(filters) {
    const updatedBeers = [];

    for (let beer of unsortedBeers) {
      let allFiltersMatch = true;

      for (let filter of filters) {
        if (!matchesFilter(beer, filter.filterValue, filter.minValue, filter.maxValue)) {
          allFiltersMatch = false;
          break;
        }
      }

      if (allFiltersMatch) {
        updatedBeers.push(beer);
      }
    }

    if (updatedBeers.length !== 0) {
      setBeers(updatedBeers);
    }
  }

  // ChatGPT - Then altered quite a bit.
  function matchesFilter(beer, valuePath, minValue, maxValue) {
    let nestedValue = beer;
    let matchFound = false;

    if (valuePath.includes('.') || Array.isArray(valuePath)) { // isArray might not be needed
      let propertyPathArr = valuePath;

      if (valuePath.includes('.')) {
        propertyPathArr = valuePath.split(".");
      }
      for (let i = 0; i < propertyPathArr.length; i++) {
        if (Array.isArray(nestedValue)) {
          for (let obj of nestedValue) {
            let pathInStringFormat = propertyPathArr.slice(i).join(".").toString();;
            if (matchesFilter(obj, pathInStringFormat, minValue, maxValue)) {
              matchFound = true;
            }
          }
        } else {
          nestedValue = nestedValue[propertyPathArr[i]];
        }
      }
      if (nestedValue >= minValue && nestedValue <= maxValue) {
        matchFound = true;
      }

    } else if (nestedValue[valuePath] >= minValue && nestedValue[valuePath] <= maxValue) {
      matchFound = true;
    }

    return matchFound;
  }


  const getAllBeers = async () => {
    try {
      const response = await axios.get('https://api.punkapi.com/v2/beers');

      for (let beer of response.data) {
        beer.comments = [];
        beer.starRating = 0;
      }

      for (let beer of response.data) {
        beer.comments = [
          "This beer takes a bit of getting used to, but most find that after some time, it might just turn out to become a favourite",
          "Due to the potent flavor of this brew, cooling it way down adds a little delay to the pop of the flavor. A sparkly and refreshing delight only for those brave enough"]
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
        case 'rating':
          return compareRating(beerA.starRating, beerB.starRating, sortDirection);
        case 'comments': // TODO: Implement comments first
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

    if (a < b) return sortDirection === 'desc' ? -1 : 1;
    if (a > b) return sortDirection === 'desc' ? 1 : -1;

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
  };

  return (
    <AppContext.Provider
      value={{
        unsortedBeers, setUnsortedBeers,
        sortBeers,
        sortType, setSortType,
        addFilter, removeFilter, applyFilters,
        currentFilters, setCurrentFilters,
        beers, setBeers, addBeer,
        setStarRating,
        screenSize, setScreenSize
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;