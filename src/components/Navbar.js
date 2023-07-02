import React from 'react';

import './Navbar.scss';

const Navbar = ({ onViewChange, selectedView }) => {
  return (
    <>
      <nav className='navbar'>
        <button
          className={selectedView === "beersList" ? "active" : ""}
          onClick={() => onViewChange('beersList')}>
          Beers
        </button>
        <button
          className={selectedView === "showcase" ? "active" : ""}
          onClick={() => onViewChange('showcase')}>
          Showcase
        </button>
        <button
          className={selectedView === "addBeer" ? "active" : ""}
          onClick={() => onViewChange('addBeer')}>
          Add new beer
        </button>
      </nav>
    </>
  );
};

export default Navbar;
