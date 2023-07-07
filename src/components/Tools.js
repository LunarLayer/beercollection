import React from 'react';

import './Tools.scss';

const Tools = ({ toggleDetailedView, filterModalOpen, setFilterModalOpen }) => {
  const toggleFilterModal = () => {
    if (filterModalOpen) {
      setFilterModalOpen(false);
    } else {
      setFilterModalOpen(true);
    }
  }

  return (
    <div id='tools'>
      <button onClick={() => toggleFilterModal()}>Filter</button>
      <button onClick={() => toggleDetailedView()}>Expand all</button>
    </div>
  );
};

export default Tools;
