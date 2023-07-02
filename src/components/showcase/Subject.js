import React from 'react';

import './Subject.scss';

const Subject = ({ name, firstBrewed, tagline }) => {
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
    </div>
  );
};

export default Subject;
