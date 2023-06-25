import React from 'react';

import './Tools.scss';

const Tools = ({toggleDetailedView}) => {
  return (
    <>
      <div id='tools'>
        <button>Add</button>
        <button onClick={() => toggleDetailedView()}>Detailed view</button>
        <button>Filter</button>
      </div>
    </>
  );
};

export default Tools;
