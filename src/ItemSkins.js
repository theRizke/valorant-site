import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./App.css";

function ItemSkins(props) {
  const [selectedWeapon, selectWeapon] = useState(props.location.state);
  const [selectedSkin, selectSkin] = useState(props.location.state.skins[0]);
  const [selectedPreview, selectPreview] = useState(
    props.location.state.skins[0].fullRender);

  const getIcon = (skin) => {
    if (skin.chromas[0].fullRender) {
      return skin.chromas[0].fullRender;
    } else {
      return skin.displayIcon;
    }
  };

  const setVariant = (skin) => {
    if (skin.chromas.length > 1) {
      return (
        <div className="item-skin-variants">
          {skin.chromas.map((variant) => (
            <div
              className="item-skin-variant"
              onClick={() => {
                selectPreview(variant.fullRender);
              }}
            >
              <img src={variant.swatch} />
            </div>
          ))}
        </div>
      );
    } else {
      return;
    }
  };

  return (
    <div className="item-skins">
      <div className="item-skin-info">
         <div className="item-skin-info-name">
              {selectedSkin.displayName}
         </div>
          <Link to="/Weapons">
            <div className="back-button"> BACK </div>
          </Link>
        
        <div className="item-skin-info-pic">
          <img src={selectedPreview} />
        </div>
        <div className="item-skin-info-variants">
            {setVariant(selectedSkin)}
        </div>
        
            
      </div>
      <div className="item-skin-list">
        {selectedWeapon.skins.map((skin) => (
          <div
            className="item-skin"
            onClick={() => {
              selectSkin(skin);
              selectPreview(getIcon(skin));
            }}
          >
            <img src={getIcon(skin)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemSkins;
