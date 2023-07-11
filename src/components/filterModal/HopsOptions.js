import React from 'react';

const HopsOptions = ({ setSelectedTitle, setSelectedValue }) => {
  return (
    <div className='hopsOptions'>
      <h3>Hops</h3>
      <ul>
        <li>
          <button onClick={() => {
            setSelectedValue("ingredients.hops.amount.value")
            setSelectedTitle("Amount")
          }}>Amount</button>
        </li>
        <li>
          <button onClick={() => {
            setSelectedValue("ingredients.hops.add")
            setSelectedTitle("Add")
          }}>Add</button>
        </li>
        <li>
          <button onClick={() => {
            setSelectedValue("ingredients.hops.attribute")
            setSelectedTitle("Attribute")
          }}>Attribute</button>
        </li>
      </ul>
    </div>
  );
};

export default HopsOptions;


