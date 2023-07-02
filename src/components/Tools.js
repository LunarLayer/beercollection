import React from 'react';

import './Tools.scss';

const Tools = ({toggleDetailedView}) => {
  return (
    <>
      <div id='tools'>
        <button onClick={() => toggleDetailedView()}>Expand all</button>
        <button>Filter</button>
      </div>
    </>
  );
};

export default Tools;
