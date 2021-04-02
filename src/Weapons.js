import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';

import "./App.css";


function Weapons() {

  const defaultValue = {
      "uuid": "63e6c2b6-4a8e-869c-3d4c-e38355226584",
      "displayName": "Odin",
      "category": "EEquippableCategory::Heavy",
      "defaultSkinUuid": "f454efd1-49cb-372f-7096-d394df615308",
      "displayIcon": "https://media.valorant-api.com/weapons/63e6c2b6-4a8e-869c-3d4c-e38355226584/displayicon.png",
      "killStreamIcon": "https://media.valorant-api.com/weapons/63e6c2b6-4a8e-869c-3d4c-e38355226584/killstreamicon.png",
      "assetPath": "ShooterGame/Content/Equippables/Guns/HvyMachineGuns/HMG/HMGPrimaryAsset",
      "weaponStats": {
        "fireRate": 12,
        "magazineSize": 100,
        "runSpeedMultiplier": 0.76,
        "equipTimeSeconds": 1.25,
        "reloadTimeSeconds": 5,
        "firstBulletAccuracy": 0.8,
        "shotgunPelletCount": 1,
        "wallPenetration": "EWallPenetrationDisplayType::High",
        "feature": "EWeaponStatsFeature::ROFIncrease",
        "fireMode": null,
        "altFireType": "EWeaponAltFireDisplayType::ADS",
        "adsStats": {
          "zoomMultiplier": 1.15,
          "fireRate": 15.6,
          "runSpeedMultiplier": 0.76,
          "burstCount": 1,
          "firstBulletAccuracy": 0.79
        },
        "altShotgunStats": null,
        "airBurstStats": null,
        "damageRanges": [
          {
            "rangeStartMeters": 0,
            "rangeEndMeters": 30,
            "headDamage": 95,
            "bodyDamage": 38,
            "legDamage": 32.3
          },
          {
            "rangeStartMeters": 30,
            "rangeEndMeters": 50,
            "headDamage": 77.5,
            "bodyDamage": 31,
            "legDamage": 26.35
          }
        ]
      },
      "shopData": {
        "cost": 3200,
        "category": "Heavy Weapons",
        "categoryText": "Heavy Weapons",
        "gridPosition": {
          "row": 2,
          "column": 2
        },
        "image": "https://media.valorant-api.com/weapons/63e6c2b6-4a8e-869c-3d4c-e38355226584/shop/image.png",
        "newImage": "https://media.valorant-api.com/weapons/63e6c2b6-4a8e-869c-3d4c-e38355226584/shop/newimage.png",
        "newImage2": "https://media.valorant-api.com/weapons/63e6c2b6-4a8e-869c-3d4c-e38355226584/shop/newimage2.png",
        "assetPath": "ShooterGame/Content/Equippables/Guns/HvyMachineGuns/HMG/HeavyMachineGunPurchase"
      }};
  


  const [weaponSidearm, setSidearm] = useState([defaultValue]);
  const [weaponSMG, setSMG] = useState([defaultValue]);
  const [weaponShotgun, setShotgun] = useState([defaultValue]);
  const [weaponRifle, setRifle] = useState([defaultValue]);
  const [weaponHeavy, setHeavy] = useState([defaultValue]);
  const [weaponSniper, setSniper] = useState([defaultValue]);

  const [selectedWeapon, setWeapon] = useState(defaultValue);
  
  
 


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
useEffect(()=>{fetchWeapons();

},[])
  
  return (
    <div className="weapons">

      <div className="weapons-subcat">
        <div className="weapon-categories">
         <div className="weapon-item">Sidearm</div>
            {weaponSidearm.slice(1).map( weapon => ( loadWeapon(weapon) ))}
        </div>
      </div>

      <div className="weapons-subcat">
        <div className="weapon-categories">
         <div className="weapon-item">Shotguns</div>
            {weaponShotgun.slice(1).map( weapon => ( loadWeapon(weapon) ))}
        </div>
        <div className="weapon-categories">
        <div className="weapon-item">SMGS</div>
            {weaponSMG.slice(1).map( weapon => ( loadWeapon(weapon) ))}
        </div>
      </div>

      <div className="weapons-subcat">
      <div className="weapon-categories">
         <div className="weapon-item">Rifles</div>
            {weaponRifle.slice(1).map( weapon => ( loadWeapon(weapon) ))}
      </div>
      </div>
      <div className="weapons-subcat">
      <div className="weapon-categories">
         <div className="weapon-item">Heavy</div>
            {weaponHeavy.slice(1).map( weapon => ( loadWeapon(weapon) ))}
      </div>
      <div className="weapon-categories">
         <div className="weapon-item">Sniper</div>
            {weaponSniper.slice(1).map( weapon => ( loadWeapon(weapon) ))}
      </div>
      </div>
      <div className="weapons-subcat">
            {loadWeaponData(selectedWeapon)}
      </div>
    </div>
  );
}

export default Weapons;
