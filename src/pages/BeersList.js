import React, { useContext, useState, useEffect } from 'react';

import './BeersList.scss';

import { AppContext } from '../context/AppContext';

import { ReactComponent as SortArrowsUpDown } from '../assets/sort-arrows.svg';

import Tools from '../components/Tools';
import TableRow from '../components/TableRow';
import FilterModal from '../components/FilterModal';

const BeersList = ({ setSelectedView }) => {
  const context = useContext(AppContext);
  const [expandedRows, setExpandedRows] = useState([]);
  const [sort, setSort] = useState({ parameter: null, direction: null });
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  useEffect(() => {
    if (!sort.parameter) {
      context.setBeers(context.unsortedBeers)
    }
  }, [context, context.beers, context.unsortedBeers, sort.parameter]);

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
    if ((sort.parameter === null && sort.direction === null) || (sort.parameter !== parameter)) {
      context.sortBeers(parameter, "desc");
      setSort({ parameter: parameter, direction: "desc" });
    } else if (sort.direction === "desc") {
      context.sortBeers(parameter, "asc");
      setSort({ parameter: parameter, direction: "asc" });
    } else if (sort.direction === "asc") {
      context.setBeers(context.unsortedBeers);
      setSort({ parameter: null, direction: null });
    }
  };

  const SortButton = ({ title, sortBy }) => {
    const SortArrows = ({ sortBy }) => {
      return (
        <div className={`sortArrows ${sort.parameter === sortBy && sort.direction === "desc" ? "desc" : sort.parameter === sortBy && sort.direction === "asc" ? "asc" : ""}`}>
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
      <Tools toggleDetailedView={toggleDetailedView} filterModalOpen={filterModalOpen} setFilterModalOpen={setFilterModalOpen} />
      {filterModalOpen ? (
        <FilterModal setFilterModalOpen={setFilterModalOpen} />
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
              <th>Details</th>
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