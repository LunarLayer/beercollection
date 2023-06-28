import React, { useContext } from 'react';

import './Showcase.scss';

import placeholder_image from '../../assets/placeholder_image.png'

import { AppContext } from '../../context/AppContext';

const Showcase = ({ beer, beerId }) => {
  const context = useContext(AppContext);

  const ImageRating = () => {
    return (
      <div className='image_rating'>
        {beer.image_url ? (
          <img src={beer.image_url} alt="a beer" />
        ) : (
          <img src={placeholder_image} alt="a beer" />
        )}
        <div className='star-rating'>
          ✪✪✪✪✪
        </div>
      </div>
    );
  }

  const SubjectFoodPairing = () => {
    return (
      <div className='subject_food-pairing'>
        <div className='subject'>
          <h2>Subject</h2>
          <p>{beer.name}{beer.first_brewed && ` - ${beer.first_brewed}`}</p>
          {beer.tagline && (
            <p><em>{beer.tagline}</em></p>
          )}
        </div>
        {beer.food_pairing.length !== 0 && (
          <div className='food-pairing'>
            <h2>Food pairing</h2>
            <ul>
              {beer.food_pairing.map((food, index) => (
                <li key={index}>{food}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  const Description = () => {
    return (
      <div className='description'>
        <h2>Description</h2>
        <p>{beer.description}</p>
      </div>
    );
  }

  const BrewersTipsComments = () => {
    return (
      <div className='brewers-tips_comments'>
        {(beer.brewers_tips &&
          <div className='tips'>
            <h2>Brewers tips</h2>
            <p>{beer.brewers_tips}</p>
          </div>
        )}
        {beer.comments.length !== 0 && (
          <div className='comments'>
            <h2>Comments</h2>
            <ul>
              {beer.comments.map((comment, index) => (
                <li key={`beer_${beer.id}_comment${index}`}>{comment}{beer.id}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  const MethodAmount = () => {
    return (
      <div className='method_amount'>
        {((beer.method.mash_temp.length !== 0 || beer.method.fermentation.temp.value || beer.method.twist) &&
          <div className='method'>
            <h2>Method</h2>
            {(beer.method.mash_temp[0] &&
              <table className='mash-temp-table'>
                <thead>
                  <tr>
                    <th>Mash temperature</th>
                    <th>Unit</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {beer.method.mash_temp.map((mash, index) => (
                    <tr key={index} className='hop'>
                      {mash.temp.value ? (
                        <td>{mash.temp.value}</td>
                      ) : (
                        <td></td>
                      )}
                      {mash.temp.unit ? (
                        <td>{mash.temp.unit}</td>
                      ) : (
                        <td></td>
                      )}
                      {mash.duration ? (
                        <td>{mash.duration}</td>
                      ) : (
                        <td></td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {((beer.method.fermentation.temp.value && beer.method.fermentation.temp.unit) &&
              <table className='fermentation-temp-table'>
                <thead>
                  <tr>
                    <th>Fermentation temperature</th>
                    <th>Unit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{beer.method.fermentation.temp.value}</td>
                    <td>{beer.method.fermentation.temp.unit}</td>
                  </tr>
                </tbody>
              </table>
            )}
            {(beer.method.twist &&
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
          beer.volume.value ||
          beer.boil_volume.value ||
          beer.attenuation_level) && (
            <div className='amount'>
              <h2>Amount</h2>
              <div className='wrapper'>
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
                    {((beer.volume.value && beer.volume.unit) &&
                      <tr>
                        <td><strong>Volume: </strong></td>
                        <td>{beer.volume.value} {beer.volume.unit}</td>
                      </tr>
                    )}
                    {((beer.boil_volume.value && beer.boil_volume.unit) &&
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
            </div>
          )}
      </div>
    );
  }

  const HopsMalts = () => {
    return (
      <div className='hops_malts'>
        {(beer.ingredients.hops.length !== 0 &&
          <div className='hops'>
            <h2>Hops</h2>
            <table className='hops-table'>
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
            <h2>Malts</h2>
            <table className='malts-table'>
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
    );
  }

  return (
    <>
      <div className='showcase'>
        {(context.screenSize === "tablet" || context.screenSize === "desktop") ? (
          <>
            <ImageRating />
            <div className='details-wrapper'>
              <SubjectFoodPairing />
              <Description />
              <BrewersTipsComments />
              <MethodAmount />
              <HopsMalts />
            </div>
          </>
        ) : (
          <>
            <ImageRating />
            <SubjectFoodPairing />
            {(beer.description &&
              <Description />
            )}
            {((beer.brewers_tips || beer.comments.length !== 0) &&
              <BrewersTipsComments />
            )}
            {((beer.method.mash_temp.length !== 0 || beer.abv ||
              beer.ibu ||
              beer.ebc ||
              beer.srm ||
              beer.ph ||
              beer.target_fg ||
              beer.target_og ||
              beer.volume.value ||
              beer.boil_volume.value ||
              beer.attenuation_level) &&
              <MethodAmount />
            )}
            {((beer.ingredients.malt || beer.ingredients.hops || beer.ingredients.yeast) &&
              <HopsMalts />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Showcase;

