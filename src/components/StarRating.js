import React, { useState, useContext } from 'react';


import './StarRating.scss';

import { AppContext } from '../context/AppContext';

const StarRating = ({beerId, starRating}) => {
  const context = useContext(AppContext);

  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (index) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    if (starRating > 0) {
      setHoverRating(starRating);
    }
    setHoverRating(0);
  };

  const handleClick = (index, event) => {
    context.setStarRating(beerId, index);
    event.stopPropagation();
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((index) => (
        <span
          key={index}
          className={`star ${index <= (hoverRating || starRating) ? 'filled' : ''}`}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={(event) => handleClick(index, event)}
        >
        </span>
      ))}
    </div>
  );
};

export default StarRating;