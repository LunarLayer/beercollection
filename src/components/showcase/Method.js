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
              <th>Mash temperature</th>
              <th>Unit</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {method.mash_temp.map((mash, index) => (
              <tr key={index} className='hop'>
                <td>{mash.temp.value || '-'}</td>
                <td>{mash.temp.unit || '-'}</td>
                <td>{mash.duration || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {((method.fermentation.temp.value && method.fermentation.temp.unit) &&
        <table>
          <thead>
            <tr>
              <th>Fermentation temperature</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{method.fermentation.temp.value}</td>
              <td>{method.fermentation.temp.unit}</td>
            </tr>
          </tbody>
        </table>
      )}
      {(method.twist &&
        <p className='twist'><strong>Twist: </strong>{method.twist}</p>
      )}
      </div>
    </div>
  );
};

export default Method;
