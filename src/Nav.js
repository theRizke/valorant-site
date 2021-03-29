
import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import './App.css';

function Nav() {
  return (
    <div className="navigation">
      <Link to='/Home'><li>Home</li></Link>
     <Link to='/Agents'><li>Agents</li></Link>
     <Link to='/Maps'><li>Maps</li></Link>
     <Link to='/Weapons'><li>Weapons</li></Link>
     <Link to='/Items'><li>Items</li></Link>
     </div>

  );
}

export default Nav;
