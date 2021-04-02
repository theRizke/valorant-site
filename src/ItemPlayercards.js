import React, { useState, useEffect } from "react";

import "./App.css";

function ItemPlayercards() {
  const defaultItem = {"uuid": "33c1f011-4eca-068c-9751-f68c788b2eee",
  "displayName": "The Way Forward Card",
  "isHiddenIfNotOwned": false,
  "displayIcon": "https://media.valorant-api.com/playercards/33c1f011-4eca-068c-9751-f68c788b2eee/displayicon.png",
  "smallArt": "https://media.valorant-api.com/playercards/33c1f011-4eca-068c-9751-f68c788b2eee/smallart.png",
  "wideArt": "https://media.valorant-api.com/playercards/33c1f011-4eca-068c-9751-f68c788b2eee/wideart.png",
  "largeArt": "https://media.valorant-api.com/playercards/33c1f011-4eca-068c-9751-f68c788b2eee/largeart.png",
  "assetPath": "ShooterGame/Content/Personalization/PlayerCards/Act1_2_BP/Birb/Playercard_Birb_PrimaryAsset"
  };

  const [playercards, setPlayercards] = useState([]);
  const [page, setPage] = useState(0);
  const [item, setItem] = useState([defaultItem]);

  const fetchPlayercards = async () => {
    const data = await fetch("https://valorant-api.com/v1/playercards");
    const cardsRaw = await data.json();
    setPlayercards(cardsRaw.data);
  };

  

  const checkIsNull = (data) => {
    console.log(data);
    if (data === null) {
      return "https://upload.wikimedia.org/wikipedia/commons/1/15/No_image_available_600_x_450.svg";
    } else {
      return data;
    }
  };

  const setCopy = () => {
    const backupArray = playercards;
    return backupArray;
  };

  const backupArray = setCopy();

  useEffect(() => {
    fetchPlayercards();
    setItem(defaultItem);
  }, []);

  return (
    <div className="cards">
      <div className="card-info">
      
      <div className="card-pic">
          <img src={item.largeArt} />
        </div>
        <div className="card-pic-mini">
          <img src={item.wideArt} />
       </div>
        <div className="card-name">{item.displayName}</div>
        
      </div>
      <div className="card-list">
        {playercards.slice([page], [page + 13]).map((card) => (
          <div className="card-icon" onClick={() => setItem(card)}>
            <img src={card.smallArt} />
          </div>
        ))}
      </div>
      <div className="page-control">
        <div
          className="page-back"
          onClick={() => {
            setPlayercards(backupArray);
            setPage(page - 12);
          }}
        >
          -
        </div>
        <div className="page-number">
         
          {Math.round(page / 12) + 1} / {Math.round(playercards.length / 12)+1}
        </div>
        <div
          className="page-next"
          onClick={() => {
            setPlayercards(backupArray);
            setPage(page + 12);
          }}
        >
          +
        </div>
      </div>
    </div>
  );
}

export default ItemPlayercards;
