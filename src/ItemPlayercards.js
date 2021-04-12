import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";

import "./App.css";

function ItemPlayercards() {
  const defaultItem = {
    uuid: "33c1f011-4eca-068c-9751-f68c788b2eee",
    displayName: "The Way Forward Card",
    isHiddenIfNotOwned: false,
    displayIcon:
      "https://media.valorant-api.com/playercards/33c1f011-4eca-068c-9751-f68c788b2eee/displayicon.png",
    smallArt:
      "https://media.valorant-api.com/playercards/33c1f011-4eca-068c-9751-f68c788b2eee/smallart.png",
    wideArt:
      "https://media.valorant-api.com/playercards/33c1f011-4eca-068c-9751-f68c788b2eee/wideart.png",
    largeArt:
      "https://media.valorant-api.com/playercards/33c1f011-4eca-068c-9751-f68c788b2eee/largeart.png",
    assetPath:
      "ShooterGame/Content/Personalization/PlayerCards/Act1_2_BP/Birb/Playercard_Birb_PrimaryAsset",
  };

  const [isLoaded, setLoaded] = useState(false);
  const [playercards, setPlayercards] = useState([]);
  const [page, setPage] = useState(0);
  const [item, setItem] = useState(playercards[0]);

  const fetchPlayercards = async () => {
    const data = await fetch("https://valorant-api.com/v1/playercards");
    const cardsRaw = await data.json();
    setPlayercards(cardsRaw.data);
    setTimeout(() => setLoaded(true), 800);
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

  if (isLoaded) {
    return (
      <div className="cards">
        <div key={item.displayName} className="card-info">
          <div className="card-name">{item.displayName}</div>
          <div className="card-pic">
            <img src={item.largeArt} />
          </div>
          <div className="card-pic-mini">
            <img src={item.wideArt} />
          </div>
        </div>
        <div key={page + "page"} className="card-list">
          {playercards.slice(page * 13, (page + 1) * 13).map((card) => (
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
              if (page > 0) { setPage(page-1) } 
              else {
                setPage(0);
              }
            }}
          >
            -
          </div>
          <div className="page-number">
            {Math.round(page + 1)} / {Math.round(playercards.length / 13) + 1}
          </div>
          <div
            className="page-next"
            onClick={() => {
              setPlayercards(backupArray);
              console.log(page*13, playercards.length)
              if ((page+1) * 13 > playercards.length) {
                setPage(page);
              } else {
                setPage(page + 1);
              }
            }}
          >
            +
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
export default ItemPlayercards;
