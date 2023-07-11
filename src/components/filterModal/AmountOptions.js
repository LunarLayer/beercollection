import React from 'react';

const AmountOptions = ({setSelectedTitle, setSelectedValue}) => {
  return (
    <div className='amountOptions'>
      <h3>Amount</h3>
      <div className='flex-container'>
        <ul>
          <li>
          <button onClick={() => {
            setSelectedValue("abv")
            setSelectedTitle("ABV")
          }}>ABV</button>
          </li>
          <li>
          <button onClick={() => {
            setSelectedValue("ibu")
            setSelectedTitle("IBU")
          }}>IBU</button>
          </li>
          <li>
          <button onClick={() => {
            setSelectedValue("ebc")
            setSelectedTitle("EBC")
          }}>EBC</button>
          </li>
          <li>
          <button onClick={() => {
            setSelectedValue("srm")
            setSelectedTitle("SRM")
          }}>SRM</button>
          </li>
          <li>
          <button onClick={() => {
            setSelectedValue("ph")
            setSelectedTitle("PH")
          }}>pH</button>
          </li>
        </ul>
        <ul>
          <li>
          <button onClick={() => {
            setSelectedValue("target_fg")
            setSelectedTitle("Target FG")
          }}>Target FG</button>
          </li>
          <li>
          <button onClick={() => {
            setSelectedValue("target_og")
            setSelectedTitle("Target OG")
          }}>Target OG</button>
          </li>
          <li>
          <button onClick={() => {
            setSelectedValue("volume.value")
            setSelectedTitle("Volume")
          }}>Volume</button>
          </li>
          <li>
          <button onClick={() => {
            setSelectedValue("boil_volume.value")
            setSelectedTitle("Boil volume")
          }}>Boil volume</button>
          </li>
          <li>
          <button onClick={() => {
            setSelectedValue("Attenuation_level")
            setSelectedTitle("Attenuation level")
          }}>Attenuation level</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AmountOptions;
