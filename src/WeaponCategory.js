import React, { useState, useEffect } from "react";

import "./App.css";

function WeaponCategory(props) {

  const [weapon, addWeapon] = useState(props.data);

  let uoArray = new Array();
  uoArray = props.data;
  console.log("Tömb hossza:" + props.data.length);

  const bubbleOrder = () => {
    if (uoArray.length == 2) {
      if (uoArray[0].shopData.cost > uoArray[1].shopData.cost) {
        let temp = uoArray[0];
        uoArray[0] = uoArray[1];
        uoArray[1] = temp;
        addWeapon(uoArray);
      }
    }
    else{

    }
  };

  bubbleOrder(); 
  useEffect(() => {
    bubbleOrder();
  }, [props.data]);

  return (
    <div className="weapon-categories">
      <div className="weapon-item">{props.category}</div>
      {weapon.map((weapon) => (
        <div className="weapon-details">
          <div className="weapon-img">
            <img
              key={weapon.uuid}
              className="weapon-pic"
              src={weapon.shopData.newImage}
            ></img>
          </div>
          <div className="weapon-name">${weapon.shopData.cost}</div>
          <div className="weapon-name">{weapon.displayName}</div>
        </div>
      ))}
    </div>
  );
}

export default WeaponCategory;
