import React from 'react';

import './Amount.scss';

const Amounts = ({ beer }) => {
  return (
    <div className='amount'>
      <h2>Amount</h2>
      <div className='flex-container'>
        <table>
          <tbody>
            {(beer.abv &&
              <tr>
                <td><h4>ABV: </h4></td>
                <td>{beer.abv}</td>
              </tr>
            )}
            {(beer.ibu &&
              <tr>
                <td><h4>IBU: </h4></td>
                <td>{beer.ibu}</td>
              </tr>
            )}
            {(beer.ebc &&
              <tr>
                <td><h4>EBC: </h4></td>
                <td>{beer.ebc}</td>
              </tr>
            )}
            {(beer.srm &&
              <tr>
                <td><h4>SRM: </h4></td>
                <td>{beer.srm}</td>
              </tr>
            )}
            {(beer.ph &&
              <tr>
                <td><h4>pH: </h4></td>
                <td>{beer.ph}</td>
              </tr>
            )}
          </tbody>
        </table>
        <table>
          <tbody>
            {(beer.target_fg &&
              <tr>
                <td><h4>Target fg: </h4></td>
                <td>{beer.target_fg}</td>
              </tr>
            )}
            {(beer.target_og &&
              <tr>
                <td><h4>Target og: </h4></td>
                <td>{beer.target_og}</td>
              </tr>
            )}
            {((beer.volume.value && beer.volume.unit) &&
              <tr>
                <td><h4>Volume: </h4></td>
                <td>{beer.volume.value} {beer.volume.unit}</td>
              </tr>
            )}
            {((beer.boil_volume.value && beer.boil_volume.unit) &&
              <tr>
                <td><h4>Boil volume: </h4></td>
                <td>{beer.boil_volume.value} {beer.boil_volume.unit}</td>
              </tr>
            )}
            {(beer.attenuation_level &&
              <tr>
                <td><h4>Attenuation level: </h4></td>
                <td>{beer.attenuation_level}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Amounts;
