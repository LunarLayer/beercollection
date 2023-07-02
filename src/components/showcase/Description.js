import React from 'react';

import './Description.scss';

const Description = ({description}) => {
  return (
    <div className='description'>
      <h2>Description</h2>
      <p>{description}</p>
    </div>
  );
};

export default Description;
