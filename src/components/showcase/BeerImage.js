import React from 'react';

import PlaceholderImage from '../../assets/placeholder_image.png';

import './BeerImage.scss';

const BeerImage = ({ image }) => {
  //ChatGPT
  function isUrl(str) {
    const urlPattern = /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
    return urlPattern.test(str);
  } //
  
  return (
    <div className='beerImage'>
      {image ? (
        <img src={isUrl(image) ? image : URL.createObjectURL(image)} alt="a beer bottle or beer keg" />
      ) : (
        <img src={PlaceholderImage} alt="a beer with a question mark on the label, indicating the need to upload a beer image" />
      )}
    </div>
  );
};

export default BeerImage;
