import React, { useState, useEffect } from 'react';

import './App.css';


function ItemBundles() {


  const defaultBundle = {
  "uuid": "b37b6a01-40f9-af81-ed34-fd8563539d44",
  "displayName": "VALORANT GO! Vol. 1",
  "description": "VALORANT GO! Vol. 1",
  "displayIcon": "https://media.valorant-api.com/bundles/b37b6a01-40f9-af81-ed34-fd8563539d44/displayicon.png",
  "displayIcon2": "https://media.valorant-api.com/bundles/b37b6a01-40f9-af81-ed34-fd8563539d44/displayicon2.png",
  "verticalPromoImage": "https://media.valorant-api.com/bundles/b37b6a01-40f9-af81-ed34-fd8563539d44/verticalpromoimage.png",
  "assetPath": "ShooterGame/Content/UI/OutOfGame/MainMenu/Store/Bundles/StorefrontItem_Anime1ThemeBundle_DataAsset"
}

  const[bundles, setBundles] = useState([]);
  
  
  const fetchBundles = async () => {
    const data = await fetch('https://valorant-api.com/v1/bundles');
    const bundlesRaw = await data.json();
    const bundle = [bundlesRaw.data];
    setBundles(bundle[0]);
    console.log(bundle);
  }
   
  const[selectedBundles, selectBundle] = useState(defaultBundle);

  const backgroundCSS = {
    background: `linear-gradient(to bottom, rgba(255,255,255,0) 10%,
    rgba(36, 58, 93, 1)), url('${selectedBundles.displayIcon}')`
  };
  

  
  useEffect(() => {
    fetchBundles();
    selectBundle(defaultBundle);
  }, []);
  

  return (
    <div className="item-bundles">
         <div className="item-bundle-list">
            {bundles.map(bundle => (
                <div className="bundle-list-pic" onClick={() => {selectBundle(bundle)}}>
                    <img src={bundle.verticalPromoImage} alt={bundle.displayName} srcset=""/>
                </div>
            ))}
       </div>
       <div className="item-bundle-infos" style={backgroundCSS}>
            <div className="bundle-name">
                {selectedBundles.displayName}
            </div>
           {/* <div className="bundle-picture">
                <img src={selectedBundles.displayIcon}/>
           </div> */}

       </div>
      

    </div>
    
   
  );
}

export default ItemBundles;
