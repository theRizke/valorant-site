import React from "react";
import {Link} from 'react-router-dom';

import "./App.css";
import "./css/items.css";

function Items() {
  return (
    <div className="item-select">
      <div className="item-select-items">
      <Link to="/Items/Sprays">
       
        <div className="item-category-name">Sprays</div>
        
      </Link>
      </div>

      <div className="item-select-items">
      <Link to="/Items/Gunbuddies">
       
        <div className="item-category-name">Gunbuddies</div>
      </Link>
      </div>
      <div className="item-select-items">
      <Link to='/Items/Playercards'>
        
        <div className="item-category-name">Playercards</div>
      </Link>
      </div>
      <div className="item-select-items">
      <Link to="/Items/Bundles">
        
        <div className="item-category-name">Bundles</div>
      </Link>
      </div>
      <div className="item-select-items">
        <div className="item-category-name">More coming soon..</div>
      </div>
    </div>
  );
}

export default Items;
