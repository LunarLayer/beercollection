import React from 'react';

import './Navbar.scss';

const Navbar = ({ onViewChange, selectedView, setFilterModalOpen }) => {
  return (
    <nav className='navbar'>
      <div className='navLinks'>
        <button
          className={selectedView === "beersList" ? "active" : ""}
          onClick={() => {
            onViewChange('beersList');
            setFilterModalOpen(false);
          }}>
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
          Add beer
        </button>
      </div>
      <div className='bottom-border' />
    </nav>
  );
};

export default Navbar;