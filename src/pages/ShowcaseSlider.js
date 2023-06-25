import React, { useContext } from 'react';

import './ShowcaseSlider.scss';

import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper"; // need all these?
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import rightArrow from '../assets/right-arrow.svg';
// import LeftArrow from '../assets/left-arrow.svg';

import { BeersContext } from '../context/BeersContext';

const ShowcaseSlider = () => {
  const beers = useContext(BeersContext);

  const Showcase = ({ beer }) => {
    return (
      <div className='showcase'>
        <div className='image_rating'>
          <img src={beer.image_url} alt="a beer" />
          <div className='star-rating'>
            ✪✪✪✪✪
          </div>
        </div>
        <div className='details'>
          <div className='subject_created'>
            <div>
              <h3>Subject</h3>
              <p>{beer.name}</p>
              <p><em>{beer.tagline}</em></p>
            </div>
            <div>
              <h3>Created</h3>
              <p>{beer.first_brewed}</p>
            </div>
          </div>
          <div className='description'>
            <div>
              <h3>Description</h3>
              <p>{beer.description}</p>
            </div>
          </div>
          <div className='foodPairing_brewersTips'>
            <div>
              <h3>Food pairing</h3>
              <ul>
                {beer.food_pairing.map((food, index) => (
                  <li key={index}>{food}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Brewers tips</h3>
              <p>{beer.brewers_tips}</p>
            </div>
          </div>
          <div className='comments_details'>
            <div>
              <h3>Comments</h3>
              <ul>
                <li>A comment</li>
                <li>Another comment</li>
              </ul>
            </div>
            <div className='data'>
              <h3>Data</h3>
              <div className='data-column-1'>
                <p>ABV: {beer.abv}</p>
                <p>IBU: {beer.ibu}</p>
                <p>EBC: {beer.srm}</p>
                <p>SRM: {beer.srm}</p>
                <p>pH: {beer.ph}</p>
              </div>
              <div className='data-column-2'>
                <p>Target fg: {beer.target_fg}</p>
                <p>Target og: {beer.target_og}</p>
                <p>Volume: {beer.volume.value} {beer.volume.unit}</p>
                <p>Boil volume: {beer.boil_volume.value} {beer.boil_volume.unit}</p>
                <p>Attenuation level: {beer.attenuation_level}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div id="showcaseSlider">
      <Swiper
        className="mySwiper"
        loop={true}
      >
        {beers ? (
          beers.map((beer) => (
            <SwiperSlide key={`beerSlide-${beer.id}`}>
              <Showcase beer={beer} />
            </SwiperSlide>
          ))
        ) : (
          <p>Loading beers</p>
        )}
      </Swiper>
    </div>
  );
};

export default ShowcaseSlider;



