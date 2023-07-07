import React from 'react';

// import './MaltsOptions.scss';

const MaltsOptions = ({setSelectedTitle, setSelectedValue}) => {
  return (
    <div className='maltsOptions'>
      <h3>Malts</h3>
      <ul>
        <li>
          <button onClick={() => setSelectedValue()}>Amount</button>
        </li>
      </ul>
    </div>
  );
};

export default MaltsOptions;







