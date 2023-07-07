import React, { useContext } from 'react';

import './Showcase.scss';

import { ReactComponent as CloseIcon } from '../assets/close-icon.svg';

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

import { AppContext } from '../context/AppContext';

const Showcase = ({ beer, setSelectedView }) => {
  const context = useContext(AppContext);

  const CloseButton = () => {
    return (
      <div className="closeButton" onClick={() => setSelectedView('beersList')}>
        <CloseIcon />
      </div>
    );
  };

  return (
    <div className='showcase'>
      {context.screenSize === "mobile" &&
        <CloseButton />
      }

      <div className='wrapper-image-rating'>
        <BeerImage image={beer.image_url} />
        <Rating />
      </div>

      <div className='wrapper-details'>
        {context.screenSize !== "mobile" &&
          <CloseButton />
        }
        <div className='subject-foodPairings'>
          <Subject name={beer.name} firstBrewed={beer.first_brewed} tagline={beer.tagline} />
          {beer.food_pairing.length !== 0 &&
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
          {/* IT CANT CHECK THE temp.value, because there is no temp! */}
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

