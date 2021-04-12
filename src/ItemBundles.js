import React, { useState, useEffect } from 'react';
import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'



import './App.css';


function ItemBundles() {


  const defaultBundle = {
    "uuid": "a981af4a-4d81-9668-8923-9c84c43da3d3",
    "displayName": "Magepunk",
    "description": "Magepunk",
    "displayIcon": "https://media.valorant-api.com/bundles/a981af4a-4d81-9668-8923-9c84c43da3d3/displayicon.png",
    "displayIcon2": "https://media.valorant-api.com/bundles/a981af4a-4d81-9668-8923-9c84c43da3d3/displayicon2.png",
    "verticalPromoImage": "https://media.valorant-api.com/bundles/a981af4a-4d81-9668-8923-9c84c43da3d3/verticalpromoimage.png",
    "assetPath": "ShooterGame/Content/UI/OutOfGame/MainMenu/Store/Bundles/StorefrontItem_MagepunkThemeBundle_DataAsset"
}

  const[bundles, setBundles] = useState([]);

 
  
  
  const fetchBundles = async () => {
    const data = await fetch('https://valorant-api.com/v1/bundles');
    const bundlesRaw = await data.json();
    const bundle = [bundlesRaw.data];
    sortByName(bundle[0]);
    setBundles(bundle[0]);
    console.log(bundle);
  }
   
  const sortByName = (data) => {
    let m = data.length;
    while (m > 1) {
      for (let i = 0; i < data.length - 1; i++) {
        if (data[i].displayName > data[i + 1].displayName) {
          let temp = data[i];
          data[i] = data[i + 1];
          data[i + 1] = temp;
        }
      }
      m--;
    }
    return;
  };

  const[selectedBundles, selectBundle] = useState(defaultBundle);

  const searchBundle = (string) =>{
    if(string.length > 2){
      for(let i = 0; i < bundles.length; i++)
      {
        let bundlename = bundles[i].displayName.substring(0,string.length).toLowerCase();
        if(bundlename == string.toLowerCase())
        {
          selectBundle(bundles[i]);
        }
      }
    }
  }

  const backgroundCSS = {
    background: `linear-gradient(to bottom, rgba(255,255,255,0) 10%,
    rgba(36, 58, 93, 1)), url('${selectedBundles.displayIcon}')`
  };
  

  
  useEffect(() => {
    fetchBundles();
  }, []);

  const setBundleIcon = (bundle) =>{
    if(bundle.verticalPromoImage){ return bundle.verticalPromoImage}
    else {return bundle.displayIcon}
  }
  

  return (
    <div className="item-bundles">
      <div className="item-bundle-left">
        <div className="item-bundle-search">
          <input type="text" name="input-bundle" id="input-bundle" onInput={(e) => searchBundle(e.target.value)}/>
          <FontAwesomeIcon id="search-icon" icon={faSearch}/>
        </div>
         <div className="item-bundle-list">
            {bundles.map(bundle => (
                <div className="bundle-list-pic" onMouseOver={() => {selectBundle(bundle)}}>
                    <img src={setBundleIcon(bundle)} title={bundle.displayName} srcset=""/>
                </div>
            ))}
       </div>
       </div>
      
       <div key={selectedBundles.uuid} className="item-bundle-infos" style={backgroundCSS}>
            <div className="bundle-name">
                {selectedBundles.displayName}
            </div>
       </div>
       <div key={selectedBundles.uuid + "loading"} className="bundles-load-div">
         <Loader type="ThreeDots" color="#FFF" height={150} width={150} />
       </div>

    </div>
    
   
  );
}

export default ItemBundles;
