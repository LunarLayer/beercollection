import React, { useContext, useState } from 'react';

import './BeersList.scss';

import { AppContext } from '../context/AppContext';

import { ReactComponent as SortArrowsUpDown } from '../assets/sort-arrows.svg';

import Tools from '../components/Tools';
import TableRow from '../components/TableRow';
import FilterModal from '../components/FilterModal';

const BeersList = ({ setSelectedView, filterModalOpen, setFilterModalOpen }) => {
  const context = useContext(AppContext);
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
    if (expandedRows.length === context.beers.length) {
      setExpandedRows([]);
    } else {
      const allBeerIds = context.beers.map((beer) => beer.id);
      setExpandedRows(allBeerIds);
    }
  }

  function sortListBy(parameter) {
    // no sort selected or a different sort is selected
    if ((context.sortType.parameter === null && context.sortType.direction === null)
      || (context.sortType.parameter !== parameter)) {
      // sort with the new parameter
      context.sortBeers(parameter, "desc");
      context.setSortType({ parameter: parameter, direction: "desc" });
      // clicked a previously selected sort button
    } else if (context.sortType.direction === "desc") {
      context.sortBeers(parameter, "asc");
      context.setSortType({ parameter: parameter, direction: "asc" });
      // clicked a previously selected sort button
    } else if (context.sortType.direction === "asc") {
      // reset sort direction to null
      // TODO: Reset to the order they came in from punkAPI (UX)
      context.setSortType({ parameter: null, direction: null });
    }
  };

  const SortButton = ({ title, sortBy }) => {
    const SortArrows = ({ sortBy }) => {
      return (
        <div
          className={
            `sortArrows 
            ${context.sortType.parameter === sortBy && context.sortType.direction === "desc"
                ? "desc" : context.sortType.parameter === sortBy && context.sortType.direction === "asc"
                  ? "asc" : ""}`}>
          <SortArrowsUpDown />
        </div>
      );
    }

    return (
      <button className="sortButton" onClick={() => sortListBy(sortBy)}>
        {title}
        <SortArrows sortBy={sortBy} />
      </button>
    )
  }

  return (
    <div className='beersList'>
      <Tools
        toggleDetailedView={toggleDetailedView}
        filterModalOpen={filterModalOpen}
        setFilterModalOpen={setFilterModalOpen} />
      {filterModalOpen ? (
        <FilterModal
          setFilterModalOpen={setFilterModalOpen} />
      ) : (
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
            </tr>
          </thead>
          <tbody>
            {context.beers ? (
              context.beers.map((beer) => (
                <TableRow
                  key={beer.id}
                  beer={beer}
                  expanded={expandedRows.includes(beer.id)}
                  toggleDetails={toggleDetails}
                  setSelectedView={setSelectedView}
                />
              ))
            ) : (
              <tr>
                <td>Loading beers</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BeersList;