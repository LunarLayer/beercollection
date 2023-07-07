import React from 'react';

import './Hops.scss';

const Hops = ({ hops }) => {
  return (
    <div className='hops'>
      <h2>Hops</h2>
      <table className='hops-table'>
        <thead>
          <tr>
            <th><h4>Name</h4></th>
            <th><h4>Amount</h4></th>
            <th><h4>Add</h4></th>
            <th><h4>Attribute</h4></th>
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
