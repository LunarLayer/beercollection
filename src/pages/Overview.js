import React from 'react';
import './Overview.scss';

import BeersList from '../components/BeersList';

const Overview = () => {
  return (
    <>
      <div id='overview'>
        <BeersList />
      </div>
    </>
  );
};

export default Overview;