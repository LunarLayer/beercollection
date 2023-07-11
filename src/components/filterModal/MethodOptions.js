import React from 'react';

const MethodOptions = ({setSelectedTitle, setSelectedValue}) => {
  return (
    <div className='methodOptions'>
      <h3>Method</h3>
      <ul>
        <li>
          <button onClick={() => {
            setSelectedValue("method.mash_temp.temp.value")
            setSelectedTitle("Mash temperature")
          }}>Mash temperature</button>
        </li>
        <li>
          <button onClick={() => {
            setSelectedValue("method.mash_temp.duration")
            setSelectedTitle("Mash duration")
          }}>Mash duration</button>
        </li>
        <li>
          <button onClick={() => {
            setSelectedValue("method.fermentation.temp.value")
            setSelectedTitle("Fermentation temperature")
          }}>Fermentation temperature</button>
        </li>
      </ul>
    </div>
  );
};

export default MethodOptions;
