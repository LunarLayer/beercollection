import React from 'react';

const MaltsOptions = ({setSelectedTitle, setSelectedValue}) => {
  return (
    <div className='maltsOptions'>
      <h3>Malts</h3>
      <ul>
        <li>
        <button onClick={() => {
            setSelectedValue("ingredients.malt.amount.value")
            setSelectedTitle("Amount")
          }}>Amount</button>
        </li>
      </ul>
    </div>
  );
};

export default MaltsOptions;







