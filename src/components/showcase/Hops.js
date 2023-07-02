import React from 'react';

import './Hops.scss';

const Hops = ({ hops }) => {
  return (
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
          {hops.map((hop, index) => (
            <tr key={index} className='hop'>
              <td>{hop.name || '-'}</td>
              <td>{hop.amount.value + " " + hop.amount.unit || '-'}</td>
              <td>{hop.add || '-'}</td>
              <td>{hop.attribute || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Hops;
