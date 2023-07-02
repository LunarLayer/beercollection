import React from 'react';

import './Malts.scss';

const Malts = ({ malts }) => {
  return (
    <div className='malts'>
      <h2>Malts</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {malts.map((malt, index) => (
            <tr key={index} className='malt'>
              <td>{malt.name || '-'}</td>
              <td>{malt.amount.value + " " + malt.amount.unit || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Malts;
