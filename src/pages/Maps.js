import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import Map from "../model/Map";

import "../App.css";
import "../css/maps.css";

function Maps() {
 
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [isMapSelected, setMapSelected] = useState(false);

  const [maps, setMaps] = useState([]);
  const [selectedMap, selectMap] = useState([])

  const fetchItems = async () => {
    const data = await fetch("https://valorant-api.com/v1/maps");
    const mapsRaw = await data.json();

    const mapData = new Array;
    for (const map of mapsRaw.data) {
      mapData.push(new Map(map))
    }
    console.log(mapData)
    setMaps(mapData);
  };

  useEffect(() => {
    if(maps.length == 0){
      fetchItems()
    }
    else{
      setDataLoaded(true)
    }
  }, [maps]);

  useEffect(() => {
    if(isDataLoaded){
      selectMap(maps[0]);
      setMapSelected(true);
    }
  },[isDataLoaded])



  const showRadar = (map) =>{
    if(map.hasRadar){
      return(
      <div className="map-radar">
      <div className="map-radar-title">RADAR</div>
      <img class="radar-img" src={map.data.displayIcon} />
    </div>)
    }
  };

  const selectedFont = (data) =>{
    if(data.uuid == selectedMap.data.uuid){
      return ({color: "burlywood"});
    }
    else{return}
  };


  if (isMapSelected) {
    return (
      <div key={selectedMap.data.uuid} className="map-div" style={{
        backgroundImage: `url('${selectedMap.data.splash}')`
      }}>
        <div className="map-list">
          {maps.map((map) => (
            <div
              className="maps"
              onClick={() => {
                selectMap(map)
              }}
            >
              <div className="map-name" style = {selectedFont(map)}>{map.data.displayName}</div>
            </div>
          ))}
         
        </div>
        <div className="map-details">
        {showRadar(selectedMap)}
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
