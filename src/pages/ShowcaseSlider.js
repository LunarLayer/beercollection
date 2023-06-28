import React, { useContext } from 'react';

import './ShowcaseSlider.scss';

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper"; // need all these?

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import placeholder_image from '../assets/placeholder_image.png'

import rightArrow from '../assets/swiper-right-arrow.svg';
import LeftArrow from '../assets/swiper-left-arrow.svg';

import Showcase from '../components/showcase/Showcase';

import { AppContext } from '../context/AppContext';

const ShowcaseSlider = () => {
  const context = useContext(AppContext);

 
  function SlideNextButton() {
    const swiper = useSwiper();

    return (
      <div className="swiper-arrow-right" onClick={() => swiper.slideNext()}>
        <img src={rightArrow} alt="Arrow pointing to the right" />
      </div>
    );
  }
  function SlidePrevButton() {
    const swiper = useSwiper();

    return (
      <div className="swiper-arrow-left" onClick={() => swiper.slidePrev()}>
        <img src={LeftArrow} alt="Arrow pointing to the left" />
      </div>
    );
  }


  return (
    <div id="showcaseSlider">
      <Swiper
        className="mySwiper"
        loop={true}
      >
        {context.beers ? (
          context.beers.map((beer) => (
            <SwiperSlide key={`beerSlide-${beer.id}`}>
              <Showcase beer={beer} beerId={beer.id} />
            </SwiperSlide>
          ))
        ) : (
          <p>Loading beers</p>
        )}
        <SlideNextButton />
        <SlidePrevButton />
      </Swiper>
    </div>
  );
};

export default ShowcaseSlider;

// TODO: Look at boil volume for example. It should wrap the "25 litres" as a whole unit, not just wrap "litres" and then "25"