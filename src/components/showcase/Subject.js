import React from 'react';

import './Subject.scss';

import StarRating from '../StarRating';

const Subject = ({ name, firstBrewed, tagline, starRating, beerId }) => {
  return (
    <div className='subject'>
      <h2>Subject</h2>
      <p>{name}</p>
      {firstBrewed && (
        <p>First brew - {firstBrewed}</p>
      )}
      {tagline && (
        <p><em>{tagline}</em></p>
      )}
      <StarRating beerId={beerId} starRating={starRating}/>
    </div>
  );
};

export default Subject;
