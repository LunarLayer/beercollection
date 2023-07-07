import React from 'react';

import './Method.scss';

const Method = ({ method }) => {
  return (
    <div className='method'>
      <h2>Method</h2>
      <div className='flex-container'>
      {(method.mash_temp[0] &&
        <table>
          <thead>
            <tr>
              <th><h4>Mash temperature</h4></th>
              <th><h4>Unit</h4></th>
              <th><h4>Duration</h4></th>
            </tr>
          </thead>
          <tbody>
            {method.mash_temp.map((mash, index) => (
              <tr key={index}>
                <td>{mash.temp.value || '-'}</td>
                <td>{mash.temp.unit || '-'}</td>
                <td>{mash.duration || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {((method.fermentation.temp.value && method.fermentation.temp.unit) &&
        <div className="Fermentation-temperature">
          <h4>Fermentation temperature: </h4>
          <p>{method.fermentation.temp.value} {method.fermentation.temp.unit}</p>
        </div>
      )}
      {(method.twist &&
        <p className='twist'><strong>Twist: </strong>{method.twist}</p>
      )}
      </div>
    </div>
  );
};

export default Method;
