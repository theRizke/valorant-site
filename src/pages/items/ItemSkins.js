import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../../App.css";
import "../../css/skins.css";

function ItemSkins(props) {

  let randomDefaultSkin = Math.floor(Math.random()*props.location.state.skins.length);

  const getIcon = (skin) => {
    if (skin.chromas[0].fullRender) {
      return skin.chromas[0].fullRender;
    } else {
      return skin.displayIcon;
    }
  };
  const [selectedWeapon, selectWeapon] = useState(props.location.state);
  const [selectedSkin, selectSkin] = useState(props.location.state.skins[randomDefaultSkin]);
  const [selectedPreview, selectPreview] = useState(
    getIcon(props.location.state.skins[randomDefaultSkin]));

  const setVariant = (skin) => {
    if (skin.chromas.length > 1) {
      return (
        <div className="item-skin-variants">
          {skin.chromas.map((variant) => (
            <div
              className="item-skin-variant"
              onMouseOver={() => {
                selectPreview(variant.fullRender);
              }}
            >
              <img src={variant.swatch} />
            </div>
          ))}
        </div>
      );
    } else {
      return (<div className="item-skin-variants"><div class="no-variant"> No variants available</div></div>);
    }
  };

  const setSelectedSkinStyle = (data) => {
    if(data.uuid == selectedSkin.uuid){
      return ({background: "rgba(255, 255, 255, 0.8)",
      border: "2px solid darkgrey"})
    }
    else{return};
  }

  return (
    <div className="item-skins">
       <Link to="/Weapons">
            <div className="back-button"> {"<<"} BACK </div>
          </Link>
      <div key={selectedSkin.displayName} className="item-skin-info">
         <div className="item-skin-info-name">
              {selectedSkin.displayName}
         </div>
         
        <div className="item-skin-info-pic">
          <img src={selectedPreview} />
        </div> 
        <div className="item-skin-info-variants">
            {setVariant(selectedSkin)}
        </div>          
      </div>
      
      <div className="item-skin-list">
        <div className="skin-list">
        {selectedWeapon.skins.map((skin) => (
          <div
            className="item-skin"
            onClick={() => {
              selectSkin(skin);
              selectPreview(getIcon(skin));
            }}
            style={setSelectedSkinStyle(skin)}
          >
            <img src={getIcon(skin)} />
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

export default ItemSkins;
