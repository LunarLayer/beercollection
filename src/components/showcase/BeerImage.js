import React from 'react';

import PlaceholderImage from '../../assets/placeholder_image.png';

import './BeerImage.scss';

const BeerImage = ({ image }) => {
  return (
    <div className='beerImage'>
      {image ? (
        <img src={image} alt="a beer bottle or beer keg" />
      ) : (
        <img src={PlaceholderImage} alt="a beer with a question mark on the label, indicating the need to upload a beer image" />
      )}
    </div>
  );
};

export default BeerImage;
