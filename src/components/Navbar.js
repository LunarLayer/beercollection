import React from 'react';

import './Navbar.scss';

const Navbar = ({onViewChange}) => {
  return (
    <>
      <nav id='navbar'>
        <ul>
          <li><button onClick={() => onViewChange('overview')}>Overview</button></li>
          <li><button onClick={() => onViewChange('showcase')}>Showcase</button></li>
          <li><button onClick={() => onViewChange('addbeer')}>Add new beer</button></li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
