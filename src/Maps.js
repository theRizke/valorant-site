import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";

import "./App.css";
import "./css/maps.css";

function Maps() {
 


  // const defaultMap = {
  //   "uuid": "7eaecc1b-4337-bbf6-6ab9-04b8f06b3319",
  //   "displayName": "Ascent",
  //   "coordinates": "45°26'BF'N,12°20'Q'E",
  //   "displayIcon": "https://media.valorant-api.com/maps/7eaecc1b-4337-bbf6-6ab9-04b8f06b3319/displayicon.png",
  //   "listViewIcon": "https://media.valorant-api.com/maps/7eaecc1b-4337-bbf6-6ab9-04b8f06b3319/listviewicon.png",
  //   "splash": "https://media.valorant-api.com/maps/7eaecc1b-4337-bbf6-6ab9-04b8f06b3319/splash.png",
  //   "assetPath": "ShooterGame/Content/Maps/Ascent/Ascent_PrimaryAsset",
  //   "mapUrl": "/Game/Maps/Ascent/Ascent",
  //   "xMultiplier": 0.00007,
  //   "yMultiplier": -0.00007,
  //   "xScalarToAdd": 0.813895,
  //   "yScalarToAdd": 0.573242
  // }

  const [isDataLoaded, setDataLoaded] = useState(false);
  const [maps, setMaps] = useState([]);
  const [selectedMap, selectMap] = useState([]);
  const [nextMap,  selectNextMap] = useState([]);
  const [isBgLoading, setBgLoad] = useState(false);

  const fetchItems = async () => {
    const data = await fetch("https://valorant-api.com/v1/maps");
    const mapsRaw = await data.json();
    const mapData = [mapsRaw.data];
    setMaps(mapData[0]);
    selectMap(mapData[0][0]);
    selectNextMap(mapData[0][0]);
    setTimeout(() => {
      setDataLoaded(true);
    }, 1000);
  };

  const backgroundCSS = {
    backgroundImage: `url('${selectedMap.splash}'), url('${nextMap.splash}')`
  };

  const addRadar = (data) =>{
    if(data.displayIcon && !isBgLoading){
      return(
      <div className="map-radar">
      <div className="map-radar-title">RADAR</div>
      <img class="radar-img" src={data.displayIcon} />
    </div>)
    }
    else{return}
  };

  const selectedFont = (data) =>{
    if(data.uuid == nextMap.uuid){
      return ({color: "burlywood"});
    }
    else{return}
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(()=>{
    if(selectedMap.uuid != nextMap.uuid)
    {
      setTimeout(()=>{
        selectMap(nextMap)
        setBgLoad(false)
      }, 3000)
    }
  }, [nextMap])

  const loadingBGbar = (data) =>{
    if(data){
      return (
        <Loader type="Circles" color="#00BFFF" height={300} width={300} />
      )
    }
  }


  if (isDataLoaded) {
    return (
      <div key={nextMap.uuid} className="map-div" style={backgroundCSS}>
        <div className="map-list">
          {maps.map((map) => (
            <div
              className="maps"
              onClick={() => {
                selectNextMap(map)
                setBgLoad(true)
              }}
            >
              <div className="map-name" style = {selectedFont(map)}>{map.displayName}</div>
            </div>
          ))}
         
        </div>
        <div className="map-details">
        {loadingBGbar(isBgLoading) }
        {addRadar(selectedMap)}
          <div className="map-info">
            {/* <div className="map-name-big">{maps[selectedMap].displayName}</div>
        <div className="coordinates">{maps[selectedMap].coordinates}</div> */}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="loading-div">
        <Loader type="Oval" color="#FFF" height={150} width={150} />
      </div>
    );
  }
}

export default Maps;
