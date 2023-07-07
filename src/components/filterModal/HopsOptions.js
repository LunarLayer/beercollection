import React from 'react';

// import './HopsOptions.scss';

const HopsOptions = ({setSelectedTitle, setSelectedValue}) => {
  return (
    <div className='hopsOptions'>
      <h3>Hops</h3>
      <ul>
        <li>
          <button onClick={() => setSelectedValue()}>Amount</button>
        </li>
        <li>
          <button onClick={() => setSelectedValue()}>Add</button>
        </li>
        <li>
          <button onClick={() => setSelectedValue()}>Attribute</button>
        </li>
      </ul>
    </div>
  );
};

export default HopsOptions;


