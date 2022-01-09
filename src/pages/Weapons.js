import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Loader from "react-loader-spinner";

import "../button.css";
import "../App.css";
import "../css/weapons.css";


function Weapons() {


  const [weaponSidearm, setSidearm] = useState([]);
  const [weaponSMG, setSMG] = useState([]);
  const [weaponShotgun, setShotgun] = useState([]);
  const [weaponRifle, setRifle] = useState([]);
  const [weaponHeavy, setHeavy] = useState([]);
  const [weaponSniper, setSniper] = useState([]);

  const [selectedWeapon, setWeapon] = useState();

  useEffect(() => {
    fetchWeapons();

  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [selectedWeapon])



  const [weaponMelee, setMelee] = useState([]);
  const [isDone, IsDone] = useState(false);

  const fetchWeapons = async () => {
    const data = await fetch("https://valorant-api.com/v1/weapons");
    const weaponsRaw = await data.json();
    const weaponsArray = [weaponsRaw.data];

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
        default:
          weaponMelee.push(weaponsArray[0][i]);
          break;
      }

    }
    weaponMelee.push(weaponsArray[0][weaponsArray[0].length - 1]);
    sortByPrice(weaponShotgun);
    sortByPrice(weaponRifle);
    sortByPrice(weaponSidearm);
    sortByPrice(weaponSMG);
    sortByPrice(weaponHeavy);
    sortByPrice(weaponSniper);
    setTimeout(() => IsDone(true), 1000);
    ;
  };

  //SORT BY PRICE
  const sortByPrice = (data) => {
    let m = data.length;
    while (m > 1) {
      for (let i = 0; i < data.length - 1; i++) {
        if (data[i].shopData.cost > data[i + 1].shopData.cost) {
          let temp = data[i];
          data[i] = data[i + 1];
          data[i + 1] = temp;
        }
      }
      m--;
    }
    return;
  };


  const loadWeapon = (data) => {
    return (
      <div key={data.uuid} className="weapon-details" onClick={() => { setWeapon(data); document.querySelector('.body').scrollTo({ top: 0, behavior: 'smooth' })}} >
        <div className="weapon-img">
          <img
            className="weapon-pic"
            src={loadWeaponImage(data)}
          ></img>
        </div>
        <div className="weapon-name">${loadShopData(data)}</div>
        <div className="weapon-name">{data.displayName}</div>
      </div>
    )

  }

  const loadWeaponImage = (data) => {

    if (data.displayName == "Melee") {
      return data.displayIcon

    }
    else {
      return data.shopData.newImage;
    }
  }
  const loadShopData = (data) => {
    if (data.displayName == "Melee") {
      return "0"

    }
    else {
      return data.shopData.cost;
    }
  }
  const loadWeaponStats = (data) => {

    if (data.displayName !== "Melee") {
      return (
        <div className="weapon-data-infos">
          <div className="weapon-data-info">Firerate: {data.weaponStats.fireRate} rounds per seconds</div>
          <div className="weapon-data-info">Magazine Capacity: {data.weaponStats.magazineSize} </div>
          <div className="weapon-data-info"><p></p>Damage:</div>
          {data.weaponStats.damageRanges.map(dmg => (
            <div className="weapon-data-info">
              Body {dmg.bodyDamage} | Head {dmg.headDamage} | Leg {dmg.legDamage}  {dmg.rangeStartMeters}-{dmg.rangeEndMeters}m
            </div>))}
        </div>)
    }
    else { return }
  }
  const loadWeaponData = (data) => {


    if (data) {
      return (
        <div key={data.uuid} className="weapon-data-details" >
          <div class="weapon-data-details-text">SELECTED WEAPON'S DATA</div>
          <div className="weapon-data-img">
            <img
              className="weapon-data-pic"
              src={data.displayIcon}
            ></img>
          </div>
          <div className="weapon-data-name">{data.displayName}</div>
          {loadWeaponStats(data)}
          <div className="button-skins">
            <div className="button-div">
              <Link to={{ pathname: '/Items/Skins', state: selectedWeapon }} className="white">
                <p>
                  <span className="bg"></span>
                  <span className="base"></span>
                  <span className="text">SKINS</span>
                </p>

              </Link>
            </div>
          </div>
        </div>

      )
    }
  }
  if (!isDone) {
    return (<div className="loading-div"><Loader type="Oval" color="#FFF" height={150} width={150} /></div>)
  }
  else {
    return (
      <div className="weapons">

        <div className="weapons-subcat">
          <div className="weapon-categories">
            <div className="weapon-item">Sidearm</div>
            {weaponSidearm.map(weapon => (loadWeapon(weapon)))}
          </div>
        </div>

        <div className="weapons-subcat">
          <div className="weapon-categories">
            <div className="weapon-item">Shotguns</div>
            {weaponShotgun.map(weapon => (loadWeapon(weapon)))}
          </div>
          <div className="weapon-categories">
            <div className="weapon-item">SMGS</div>
            {weaponSMG.map(weapon => (loadWeapon(weapon)))}
          </div>
        </div>

        <div className="weapons-subcat">
          <div className="weapon-categories">
            <div className="weapon-item">Rifles</div>
            {weaponRifle.map(weapon => (loadWeapon(weapon)))}
          </div>
        </div>
        <div className="weapons-subcat">
          <div className="weapon-categories">
            <div className="weapon-item">Heavy</div>
            {weaponHeavy.map(weapon => (loadWeapon(weapon)))}
          </div>
          <div className="weapon-categories">
            <div className="weapon-item">Sniper</div>
            {weaponSniper.map(weapon => (loadWeapon(weapon)))}
          </div>
        </div>
        <div className="weapons-subcat">

          {loadWeaponData(selectedWeapon)}

          {weaponMelee.map(weapon => (loadWeapon(weapon)))}




        </div>
      </div>
    );
  }
}

export default Weapons;
