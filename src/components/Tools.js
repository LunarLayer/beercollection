import React, { useContext } from 'react';

import './Tools.scss';

import { ReactComponent as FilterIcon } from '../assets/filter-icon.svg';
import { ReactComponent as CloseIcon } from '../assets/close-icon.svg';

import { AppContext } from '../context/AppContext';

const Tools = ({ toggleDetailedView, filterModalOpen, setFilterModalOpen}) => {
  const context = useContext(AppContext);
  const RemoveFilterButton = ({ filter, key }) => {
    return (
      <button
        className='removeFilterButton'
        onClick={() => context.removeFilter(filter)}
      >
        {filter.filterTitle} {filter.minValue} - {filter.maxValue} <CloseIcon className='closeIcon' />
      </button>
    );
  }

  const toggleFilterModal = () => {
    if (filterModalOpen) {
      setFilterModalOpen(false);
    } else {
      setFilterModalOpen(true);
    }
  }

  return (
    <div id='tools'>
      <div className='filtering'>
        <button className='filterButton' onClick={() => toggleFilterModal()}>
          <FilterIcon className="filterIcon" />
          Filter
        </button>
        {context.currentFilters && ( // need better check - cause there is an empty array at default
          context.currentFilters.map((filter) => {
            return (
              <React.Fragment key={filter.filterTitle}>
                <RemoveFilterButton filter={filter} />
              </React.Fragment>
            )
          })
        )}
      </div>
      <button className='expandButton' onClick={() => toggleDetailedView()}>Expand all</button>
    </div>
  );
};

export default Tools;
