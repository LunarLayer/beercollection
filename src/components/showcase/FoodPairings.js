import React from 'react';

import './FoodPairings.scss';

const FoodPairings = ({ foodPairingsArr }) => {
  return (
    <div className='foodPairings'>
      <h2>Food pairing</h2>
      {foodPairingsArr.length === 1 ? (
        <p>{foodPairingsArr[0]}</p>
      ) : (
        <ul>
          {foodPairingsArr.map((foodPairing, index) => (
            <li key={index}>{foodPairing}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FoodPairings;
