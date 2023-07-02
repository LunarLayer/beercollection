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
        <table>
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
  );
};

export default Amounts;
