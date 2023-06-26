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
  const context = useContext(BeersContext);

  const Showcase = ({ beer, beerId }) => {
    console.log(beerId);
    return (
      <div className='showcase'>

        {beer.image_url && (
          <div className='image_rating'>
            <img src={beer.image_url} alt="a beer" />
            <div className='star-rating'>
              ✪✪✪✪✪
            </div>
          </div>
        )}


        <div className='details'>
          <div className='subject_foodPairing'>
            <div>
              <h3>Subject</h3>
              <p>{beer.name} - {beer.first_brewed}</p>
              {beer.tagline && (
                <p><em>{beer.tagline}</em></p>
              )}
              {!beer.image_url && (
                <div className='star-rating'>
                  ✪✪✪✪✪
                </div>
              )}
            </div>
            {beer.food_pairing.length !== 0 && (
              <div>
                <h3>Food pairing</h3>
                <ul>
                  {beer.food_pairing.map((food, index) => (
                    <li key={index}>{food}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>


          {beer.description && (
            <div className='description'>
              <h3>Description</h3>
              <p>{beer.description}</p>
            </div>
          )}
          <div className='brewersTips_comments'>
            {beer.brewers_tips && (
              <div>
                <h3>Brewers tips</h3>
                <p>{beer.brewers_tips}</p>
              </div>
            )}
            {beer.comments.length !== 0 && (
              <div className='comments'>
                <h3>Comments</h3>
                <ul>
                  {beer.comments.map((comment, index) => (
                    <li key={`beer_${beer.id}_comment${index}`}>{comment}{`beer_${beerId}_comment${index}`}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className='method_amount'>
            {beer.method && (
              <div>
                <h3>Method</h3>
                {beer.method.mash_temp[0] && (
                  <>
                    <p><strong>Mash temp: </strong>{beer.method.mash_temp[0].temp.value} {beer.method.mash_temp[0].temp.unit}</p>
                    <p><strong>Mash temp duration: </strong>{beer.method.mash_temp[0].duration} seconds</p>
                  </>
                )}
                {beer.method.fermentation && (
                  <p><strong>Fermentation temp: </strong>{beer.method.fermentation.temp.value} {beer.method.fermentation.temp.unit}</p>
                )}
                {beer.method.twist && (
                  <p><strong>Twist: </strong>{beer.method.twist}</p>
                )}
              </div>
            )}
            {(beer.abv ||
              beer.ibu ||
              beer.ebc ||
              beer.srm ||
              beer.ph ||
              beer.target_fg ||
              beer.target_og ||
              beer.volume ||
              beer.boil_volume ||
              beer.attenuation_level) && (
                <div className='amount'>
                  <h3>Amount</h3>
                  <table className='table-1'>
                    <tbody>
                      {(beer.abv &&
                        <tr>
                          <td><strong>ABV: </strong></td>
                          <td>{beer.abv}</td>
                        </tr>
                      )}
                      {(beer.ibu &&
                        <tr>
                          <td><strong>IBU: </strong></td>
                          <td>{beer.ibu}</td>
                        </tr>
                      )}
                      {(beer.ebc &&
                        <tr>
                          <td><strong>EBC: </strong></td>
                          <td>{beer.ebc}</td>
                        </tr>
                      )}
                      {(beer.srm &&
                        <tr>
                          <td><strong>SRM: </strong></td>
                          <td>{beer.srm}</td>
                        </tr>
                      )}
                      {(beer.ph &&
                        <tr>
                          <td><strong>pH: </strong></td>
                          <td>{beer.ph}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <table className='table-2'>
                    <tbody>
                      {(beer.target_fg &&
                        <tr>
                          <td><strong>Target fg: </strong></td>
                          <td>{beer.target_fg}</td>
                        </tr>
                      )}
                      {(beer.target_og &&
                        <tr>
                          <td><strong>Target og: </strong></td>
                          <td>{beer.target_og}</td>
                        </tr>
                      )}
                      {(beer.volume &&
                        <tr>
                          <td><strong>Volume: </strong></td>
                          <td>{beer.volume.value} {beer.volume.unit}</td>
                        </tr>
                      )}
                      {(beer.boil_volume &&
                        <tr>
                          <td><strong>Boil volume: </strong></td>
                          <td>{beer.boil_volume.value} {beer.boil_volume.unit}</td>
                        </tr>
                      )}
                      {(beer.attenuation_level &&
                        <tr>
                          <td><strong>Attenuation level: </strong></td>
                          <td>{beer.attenuation_level}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
          </div>

          {(beer.ingredients &&
            <div className='hops_malts'>
              {(beer.ingredients.hops.length !== 0 &&
                <div className='hops'>
                  <h3>Hops</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Add</th>
                        <th>Attribute</th>
                      </tr>
                    </thead>
                    <tbody>
                      {beer.ingredients.hops.map((hop, index) => (
                        <tr key={index} className='hop'>
                          {(hop.name &&
                            <td>{hop.name}</td>
                          )}
                          {((hop.amount.value && hop.amount.unit) &&
                            <td>{hop.amount.value} {hop.amount.unit}</td>
                          )}
                          {(hop.add &&
                            <td>{hop.add}</td>
                          )}
                          {(hop.attribute &&
                            <td>{hop.attribute}</td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {(beer.ingredients.malt.length !== 0 &&
                <div className='malts'>
                  <h3>Malts</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {beer.ingredients.malt.map((malt, index) => (
                        <tr key={index} className='malt'>
                          {(malt.name &&
                            <td>{malt.name}</td>
                          )}
                          {((malt.amount.value && malt.amount.unit) &&
                            <td>{malt.amount.value} {malt.amount.unit}</td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
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
        {context.beers ? (
          context.beers.map((beer) => (
            <SwiperSlide key={`beerSlide-${beer.id}`}>
              <Showcase beer={beer} beerId={beer.id} />
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

// TODO: Look at boil volume for example. It should wrap the "25 litres" as a whole unit, not just wrap "litres" and then "25"