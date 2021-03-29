import React, { useState, useEffect } from "react";

import "./App.css";
import WeaponCategory from "./WeaponCategory";
import WeaponData from "./WeaponData";

function Weapons() {

  

  const weaponSidearm = new Array();
  const weaponSMG = new Array();
  const weaponShotgun = new Array();
  const weaponRifle = new Array();
  const weaponHeavy = new Array();
  const weaponSniper = new Array();
  const weaponMeelee = new Array();

  const [weaponData, setWeapon] = useState([]);

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
      }
    }
  };

  fetchWeapons();

  

  return (
    <div className="weapons">
      <div className="weapons-subcat">
        <WeaponCategory category="Sidearm" data={weaponSidearm} />
      </div>
      <div className="weapons-subcat">
        <WeaponCategory category="SMGs" data={weaponSMG} />
        <WeaponCategory category="Shotguns" data={weaponShotgun} />
      </div>
      <div className="weapons-subcat">
        <WeaponCategory category="Rifles" data={weaponRifle} />
      </div>
      <div className="weapons-subcat">
        <WeaponCategory category="Heavy" data={weaponHeavy} />
        <WeaponCategory category="Sniper" data={weaponSniper} />
      </div>
      <div className="weapon-subcat"></div>
    </div>
  );
}

export default Weapons;
