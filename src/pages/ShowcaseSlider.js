import React, { useContext } from 'react';

import './ShowcaseSlider.scss';

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { ReactComponent as RightArrow } from '../assets/swiper-right-arrow.svg';
import { ReactComponent as LeftArrow } from '../assets/swiper-left-arrow.svg';

import Showcase from '../components/Showcase';

import { AppContext } from '../context/AppContext';

const ShowcaseSlider = ({setSelectedView}) => {
  const context = useContext(AppContext);

  const SlideNextButton = () => {
    const swiper = useSwiper();
    return (
      <div className="swiper-arrow-right" onClick={() => swiper.slideNext()}>
        <RightArrow />
      </div>
    );
  }
  const SlidePrevButton = () => {
    const swiper = useSwiper();
    return (
      <div className="swiper-arrow-left" onClick={() => swiper.slidePrev()}>
        <LeftArrow /> 
      </div>
    );
  }

  return (
    <div className="showcaseSlider">
      <Swiper
        className="mySwiper"
        loop={true}
      >
        {context.beers ? (
          context.beers.map((beer) => (
            <SwiperSlide key={`beerSlide-${beer.id}`}>
              <Showcase beer={beer} setSelectedView={setSelectedView} />
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