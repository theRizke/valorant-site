import React from "react";
import {Link} from 'react-router-dom';

import "./App.css";

function Items() {
  return (
    <div className="item-select">
      <Link to="/Items/Sprays">
      <div className="item-select-items">
        <div className="item-category-pic">
          <img src="https://media.valorant-api.com/playercards/9fb348bc-41a0-91ad-8a3e-818035c4e561/largeart.png"/>
        </div>
        <div className="item-category-name">Sprays</div>
        
      </div>
      </Link>
      <div className="item-select-items">
        <div className="item-category-pic">
          <img src="https://media.valorant-api.com/playercards/e6a07a97-4c48-421f-515e-288379f7a5be/largeart.png"/>
          </div>
        <div className="item-category-name">Gunbuddies</div>
        
      </div>
      <div className="item-select-items">
        <div className="item-category-pic">
          <img src="https://media.valorant-api.com/playercards/c8c31580-4315-967b-998b-dfa377bb8843/largeart.png"/>
        </div>
        <div className="item-category-name">Playercards</div>
       
      </div>
      <Link to="/Items/Bundles">
      <div className="item-select-items">
        <div className="item-category-pic">
          <img src="https://media.valorant-api.com/playercards/df3adf8c-4fa3-5f57-544d-eabf8b68713d/largeart.png"/>
        </div>
        <div className="item-category-name">Bundles</div>
      </div>
      </Link>
    </div>
  );
}

export default Items;
