import React from 'react';

import './Showcase.scss';

import BeerImage from './showcase/BeerImage';
import Rating from './showcase/Rating';
import Subject from './showcase/Subject';
import FoodPairings from './showcase/FoodPairings';
import Description from './showcase/Description';
import BrewersTip from './showcase/BrewersTip';
import Comments from './showcase/Comments';
import Method from './showcase/Method';
import Amount from './showcase/Amount';
import Hops from './showcase/Hops';
import Malts from './showcase/Malts';

const Showcase = ({ beer, setSelectedView}) => {
  const CloseButton = () => {
    return (
      <button className="closeButton" onClick={() => setSelectedView('beersList')}>
        Close
      </button>
    );
  };

  return (
    <div className='showcase'>
      <CloseButton />
      <div className='wrapper-image-rating'>
        <BeerImage image={beer.image_url} />
        <Rating />
      </div>

      <div className='wrapper-details'>
        <div className='subject-foodPairings'>
          <Subject name={beer.name} firstBrewed={beer.first_brewed} tagline={beer.tagline} />
          {beer.food_pairing &&
            <FoodPairings foodPairingsArr={beer.food_pairing} />
          }
        </div>

        {(beer.description &&
          <Description description={beer.description} />
        )}

        <div className='brewersTip-comments'>
          {(beer.brewers_tips &&
            <BrewersTip tip={beer.brewers_tips} />
          )}
          {(beer.comments.length !== 0 &&
            <Comments commentsArr={beer.comments} />
          )}
        </div>

        <div className='method-amount'>
          {((beer.method.mash_temp.length !== 0 || beer.method.fermentation.temp.value || beer.method.twist) &&
            <Method method={beer.method} />
          )}
          {(beer.abv || beer.ibu || beer.ebc || beer.srm || beer.ph ||
            beer.target_fg || beer.target_og || beer.volume.value ||
            beer.boil_volume.value || beer.attenuation_level) &&
            <Amount beer={beer} />
          }
        </div>

        <div className='hops-malts'>
          {(beer.ingredients.hops.length !== 0 &&
            <Hops hops={beer.ingredients.hops} />
          )}
          {(beer.ingredients.malt.length !== 0 &&
            <Malts malts={beer.ingredients.malt} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Showcase;

