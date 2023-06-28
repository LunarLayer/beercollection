import React, { useContext, useState, useEffect } from 'react';

import './BeersList.scss';

import { AppContext } from '../context/AppContext';

import Tools from './Tools';
import TableRow from './TableRow';

const BeersList = () => {
  const context = useContext(AppContext);
  const [beers, setBeers] = useState(null);
  const [expandedRows, setExpandedRows] = useState([]);
  const [sort, setSort] = useState({ parameter: null, direction: null });

  useEffect(() => {
    setBeers(context.beers);
  }, [context.beers]);

  function toggleDetails(beerId) {
    setExpandedRows((prevExpandedRows) => {
      if (prevExpandedRows.includes(beerId)) {
        return prevExpandedRows.filter((rowId) => rowId !== beerId);
      } else {
        return [...prevExpandedRows, beerId];
      }
    });
  };

  function toggleDetailedView() {
    console.log("toggling");
    if (expandedRows.length === beers.length) {
      setExpandedRows([]);
    } else {
      const allBeerIds = beers.map((beer) => beer.id);
      setExpandedRows(allBeerIds);
    }
  }

  const sortBeers = (parameter, sortDirection) => {
    const sorted = [...beers].sort((beerA, beerB) => {
      switch (parameter) {
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

  function sortListBy(parameter) {
    if ((sort.parameter === null && sort.direction === null) || (sort.parameter !== parameter)) {
      sortBeers(parameter, "desc");
      setSort({ parameter: parameter, direction: "desc" });
    } else if (sort.direction === "desc") {
      sortBeers(parameter, "asc");
      setSort({ parameter: parameter, direction: "asc" });
    } else if (sort.direction === "asc") {
      setBeers(context.beers);
      setSort({ parameter: null, direction: null });
    }
  };

  const SortButton = ({ title, sortBy }) => {
    return (
      <button className="sortButton" onClick={() => sortListBy(sortBy)}>
        {title}
        <span className={`arrowDown ${sort.parameter === sortBy && sort.direction === "desc" ? "active" : ""}`}>&#8595;</span>
        <span className={`arrowUp ${sort.parameter === sortBy && sort.direction === "asc" ? "active" : ""}`}>&#8593;</span>
      </button>
    )
  }

  return (
    <>
      <div id='beersList'>
        <Tools toggleDetailedView={toggleDetailedView} />
        <table>
          <thead>
            <tr>
              <th>
                <SortButton title="Name" sortBy="name" />
              </th>
              <th>
                <SortButton title="First brew" sortBy="first_brew" />
              </th>
              <th className='hideOnMobile'>
                <SortButton title="rating" sortBy="rating" />
              </th>
              <th className='hideOnMobile'>
                <SortButton title="comments" sortBy="comments" />
              </th>
              <th>Showcase</th>
            </tr>
          </thead>
          <tbody>
            {beers ? (
              beers.map((beer) => (
                <TableRow
                  key={beer.id}
                  beer={beer}
                  expanded={expandedRows.includes(beer.id)}
                  toggleDetails={toggleDetails}
                />
              ))
            ) : (
              <tr>
                <td>Loading beers</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BeersList;