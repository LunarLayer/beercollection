import React, { useContext, useState } from 'react';

import './BeersList.scss';

import { BeersContext } from '../context/BeersContext';

import Tools from './Tools';
import TableRow from './TableRow';

const BeersList = () => {
  const beers = useContext(BeersContext);
  const [expandedRows, setExpandedRows] = useState([]);

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

  return (
    <>
      <div id='beersList'>
        <Tools toggleDetailedView={toggleDetailedView}/>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>First Brew</th>
              <th>Rating</th>
              <th>Comments</th>
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