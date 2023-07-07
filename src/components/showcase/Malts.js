import React from 'react';

import './Malts.scss';

const Malts = ({ malts }) => {
  return (
    <div className='malts'>
      <h2>Malts</h2>
      <table>
        <thead>
          <tr>
            <th><h4>Name</h4></th>
            <th><h4>Amount</h4></th>
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
