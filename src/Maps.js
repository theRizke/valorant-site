import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

import './App.css';


function Maps() {

  useEffect(() => {fetchItems()}, []);

  const defaultMap = {
    "uuid": "7eaecc1b-4337-bbf6-6ab9-04b8f06b3319",
    "displayName": "Ascent",
    "coordinates": "45°26'BF'N,12°20'Q'E",
    "displayIcon": "https://media.valorant-api.com/maps/7eaecc1b-4337-bbf6-6ab9-04b8f06b3319/displayicon.png",
    "listViewIcon": "https://media.valorant-api.com/maps/7eaecc1b-4337-bbf6-6ab9-04b8f06b3319/listviewicon.png",
    "splash": "https://media.valorant-api.com/maps/7eaecc1b-4337-bbf6-6ab9-04b8f06b3319/splash.png",
    "assetPath": "ShooterGame/Content/Maps/Ascent/Ascent_PrimaryAsset",
    "mapUrl": "/Game/Maps/Ascent/Ascent",
    "xMultiplier": 0.00007,
    "yMultiplier": -0.00007,
    "xScalarToAdd": 0.813895,
    "yScalarToAdd": 0.573242
  }

  const[maps, setMaps] = useState([defaultMap]);
  
  
  const fetchItems = async () => {
    const data = await fetch('https://valorant-api.com/v1/maps');
    const mapsRaw = await data.json();
    const maps = [mapsRaw.data];
    maps[0].splice(4, 1);
    setMaps(maps[0]);
  }
  
  
  const[selectedMap, selectMap] = useState('0');
  const uuidToID = (uuid) =>{
    let i = 0;
    let id = 0;
    
    while(i < maps.length)
    {
      if(maps[i].uuid == uuid)
      {
        id = i;
      }
      i++;
    }
    return id;
  }
  
  const backgroundCSS = {
    background: `linear-gradient(to left, rgba(255,255,255,0) 5%,
    rgba(36, 58, 93, 1)), url('${maps[selectedMap].splash}')`
  };
  
  
  

  return (
    <div className="map-div" style={backgroundCSS}>
      <div className="map-list">
        {maps.map((map) =>(
          <div className="maps" onClick={()=>{selectMap(uuidToID(map.uuid))}}> 
              <div className="map-name">{map.displayName}</div>
          </div>
        ))}
      </div>
      <div className="map-details">
        <div className="map-radar">
          <img class="radar-img" src={maps[selectedMap].displayIcon}/>
        </div>
        <div className="map-info">
        <div className="map-name-big">{maps[selectedMap].displayName}</div>
        <div className="coordinates">{maps[selectedMap].coordinates}</div>
        </div>
      </div>
    </div>
    
   
  );
}

export default Maps;
