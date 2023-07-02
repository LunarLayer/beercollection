import React from 'react';

import './BrewersTip.scss';

const BrewersTip = ({tip}) => {
  return (
    <div className='brewersTip'>
      <h2>Brewers tip</h2>
      <p>{tip}</p>
    </div>
  );
};

export default BrewersTip;
