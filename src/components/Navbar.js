import React from 'react';

import './Navbar.scss';

const Navbar = () => {
  return (
    <>
      <nav id='navbar'>
        <ul>
          <li><a href="/">Overview</a></li>
          <li><a href="/showcase">Showcase</a></li>
          <li><a href="/add">Add new beer</a></li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
