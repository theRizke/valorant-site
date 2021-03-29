import React, { useState, useEffect } from "react";

import "./App.css";

function ItemSprays() {
  const defaultItem = {
    uuid: "3d2bcfc5-442b-812e-3c08-9180d6b36077",
    displayName: "Caught on Camera Spray",
    category: null,
    displayIcon:
      "https://media.valorant-api.com/sprays/3d2bcfc5-442b-812e-3c08-9180d6b36077/displayicon.png",
    fullIcon:
      "https://media.valorant-api.com/sprays/3d2bcfc5-442b-812e-3c08-9180d6b36077/fullicon.png",
    fullTransparentIcon:
      "https://media.valorant-api.com/sprays/3d2bcfc5-442b-812e-3c08-9180d6b36077/fulltransparenticon.png",
    assetPath:
      "ShooterGame/Content/Personalization/Sprays/Act1_2_BP/CaughtOnCamera/CaughtOnCamera_PrimaryAsset",
    levels: [
      {
        uuid: "20d547a4-4ec8-c9ef-dd9d-1c8b74d0e6f7",
        sprayLevel: 1,
        displayName: "Caught on Camera Spray",
        displayIcon:
          "https://media.valorant-api.com/spraylevels/20d547a4-4ec8-c9ef-dd9d-1c8b74d0e6f7/displayicon.png",
        assetPath:
          "ShooterGame/Content/Personalization/Sprays/Act1_2_BP/CaughtOnCamera/CaughtOnCamera_Level1_PrimaryAsset",
      },
    ],
  };

  const [sprays, setSprays] = useState([]);
  const [site, setSite] = useState(0);
  const [item, setItem] = useState([defaultItem]);

  const fetchSprays = async () => {
    const data = await fetch("https://valorant-api.com/v1/sprays");
    const spraysRaw = await data.json();
    setSprays(spraysRaw.data);
  };

  const setCopy = () => {
    const backupArray = sprays;
    return backupArray;
  };

  const backupArray = setCopy();

  const checkIsNull = (data) => {
    console.log(data);
    if (data === null) {
      return "https://upload.wikimedia.org/wikipedia/commons/1/15/No_image_available_600_x_450.svg";
    } else {
      return data;
    }
  };

  useEffect(() => {
    fetchSprays();
    setItem(defaultItem);
  }, []);

  return (
    <div className="sprays">
      <div className="spray-info">
        <div className="spray-pic">
          <img src={checkIsNull(item.fullTransparentIcon)} />
        </div>
        <div className="spray-name">{item.displayName}</div>
      </div>
      <div className="spray-list">
        {sprays.slice([site], [site + 13]).map((spray) => (
          <div className="spray-icon" onClick={() => setItem(spray)}>
            <img src={spray.displayIcon} />
          </div>
        ))}
      </div>
      <div className="page-control">
        <div
          className="page-back"
          onClick={() => {
            setSprays(backupArray);
            setSite(site - 12);
          }}
        >
          -
        </div>
        <div className="page-number">
         
          {Math.round(site / 12) + 1} / {Math.round(sprays.length / 12)}
        </div>
        <div
          className="page-next"
          onClick={() => {
            setSprays(backupArray);
            setSite(site + 12);
          }}
        >
          +
        </div>
      </div>
    </div>
  );
}

export default ItemSprays;
