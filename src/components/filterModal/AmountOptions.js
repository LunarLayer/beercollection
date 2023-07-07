import React from 'react';

// import './AmountOptions.scss';

const AmountOptions = ({setSelectedTitle, setSelectedValue}) => {
  return (
    <div className='amountOptions'>
      <h3>Amount</h3>
      <div className='flex-container'>
        <ul>
          <li>
            <button onClick={() => setSelectedValue()}>ABV</button>
          </li>
          <li>
            <button onClick={() => setSelectedValue()}>IBU</button>
          </li>
          <li>
            <button onClick={() => setSelectedValue()}>EBC</button>
          </li>
          <li>
            <button onClick={() => setSelectedValue()}>SRM</button>
          </li>
          <li>
            <button onClick={() => setSelectedValue()}>pH</button>
          </li>
        </ul>
        <ul>
          <li>
            <button onClick={() => setSelectedValue()}>Target FG</button>
          </li>
          <li>
            <button onClick={() => setSelectedValue()}>Target OG</button>
          </li>
          <li>
            <button onClick={() => setSelectedValue()}>Volume</button>
          </li>
          <li>
            <button onClick={() => setSelectedValue()}>Boil volume</button>
          </li>
          <li>
            <button onClick={() => setSelectedValue()}>Attenuation level</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AmountOptions;
