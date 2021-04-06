import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';

import "./App.css";


function Weapons() {

 


  const [weaponSidearm, setSidearm] = useState([]);
  const [weaponSMG, setSMG] = useState([]);
  const [weaponShotgun, setShotgun] = useState([]);
  const [weaponRifle, setRifle] = useState([]);
  const [weaponHeavy, setHeavy] = useState([]);
  const [weaponSniper, setSniper] = useState([]);

  const [selectedWeapon, setWeapon] = useState();
  
  useEffect(()=>{
    fetchWeapons();

  },[])
 


  const weaponMeelee = new Array();


  const fetchWeapons = async () => {
    const data = await fetch("https://valorant-api.com/v1/weapons");
    const weaponsRaw = await data.json();

    const weaponsArray = [weaponsRaw.data];
    //setWeapon(weaponsArray);

    for (let i = 0; i < weaponsArray[0].length - 1; i++) {
      switch (weaponsArray[0][i].shopData.category) {
        case "Heavy Weapons":
          weaponHeavy.push(weaponsArray[0][i]);
          break;
        case "Rifles":
          weaponRifle.push(weaponsArray[0][i]);
          break;
        case "Shotguns":
          weaponShotgun.push(weaponsArray[0][i]);
          break;
        case "Pistols":
          weaponSidearm.push(weaponsArray[0][i]);
          break;
        case "Sniper Rifles":
          weaponSniper.push(weaponsArray[0][i]);
          break;
        case "SMGs":
          weaponSMG.push(weaponsArray[0][i]);
          break;
      }
    }
  };

  const loadWeapon = (data) =>{
      return(
        <div className="weapon-details" onClick={()=> setWeapon(data)} >
        <div className="weapon-img">
          <img
            key={data.uuid}
            className="weapon-pic"
            src={data.shopData.newImage}
          ></img>
        </div>
        <div className="weapon-name">${data.shopData.cost}</div>
        <div className="weapon-name">{data.displayName}</div>
      </div>
      )

  }

  const loadWeaponData = (data) =>{

    if(data){
    return(
    <div className="weapon-data-details" >
      <div className="weapon-data-img">
        <img
          key={data.uuid}
          className="weapon-data-pic"
          src={data.displayIcon}
        ></img>
      </div>
      <div className="weapon-data-name">{data.displayName}</div>
      <div className="weapon-data-infos">
        <div className="weapon-data-info">Firerate: {data.weaponStats.fireRate} rounds per seconds</div>
        <div className="weapon-data-info">Magazine Capacity: {data.weaponStats.magazineSize} </div>
        <div className="weapon-data-info"><p></p>Damage:</div>
        {data.weaponStats.damageRanges.map(dmg =>(
            <div className="weapon-data-info">
              Body {dmg.bodyDamage} | Head {dmg.headDamage} | Leg {dmg.legDamage}  {dmg.rangeStartMeters}-{dmg.rangeEndMeters}m
            </div>))}   
      </div>
      <div className="button-skins">
            <Link to={{ pathname: '/Items/Skins', state: selectedWeapon}}><button>SKINS</button></Link>
          </div>
    </div>
  
    )
        } 
}

  
  return (
    <div className="weapons">

      <div className="weapons-subcat">
        <div className="weapon-categories">
         <div className="weapon-item">Sidearm</div>
            {weaponSidearm.map( weapon => ( loadWeapon(weapon) ))}
        </div>
      </div>

      <div className="weapons-subcat">
        <div className="weapon-categories">
         <div className="weapon-item">Shotguns</div>
            {weaponShotgun.map( weapon => ( loadWeapon(weapon) ))}
        </div>
        <div className="weapon-categories">
        <div className="weapon-item">SMGS</div>
            {weaponSMG.map( weapon => ( loadWeapon(weapon) ))}
        </div>
      </div>

      <div className="weapons-subcat">
      <div className="weapon-categories">
         <div className="weapon-item">Rifles</div>
            {weaponRifle.map( weapon => ( loadWeapon(weapon) ))}
      </div>
      </div>
      <div className="weapons-subcat">
      <div className="weapon-categories">
         <div className="weapon-item">Heavy</div>
            {weaponHeavy.map( weapon => ( loadWeapon(weapon) ))}
      </div>
      <div className="weapon-categories">
         <div className="weapon-item">Sniper</div>
            {weaponSniper.map( weapon => ( loadWeapon(weapon) ))}
      </div>
      </div>
      <div className="weapons-subcat">
            {loadWeaponData(selectedWeapon)}
      </div>
    </div>
  );
}

export default Weapons;
