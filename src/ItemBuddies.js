import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "./App.css";

function ItemBuddies() {
  const [buddies, setBuddies] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  const [searchResult, setResult] = useState([]);

  const fetchBuddies = async () => {
    const data = await fetch("https://valorant-api.com/v1/buddies");
    const buddiesRaw = await data.json();
    setBuddies(buddiesRaw.data);
    setTimeout(() => setLoaded(true), 800);
  };

  const searchGunbuddy = (string) => {
    if (string.length > 1) {
      var result = [];
      for (let i = 0; i < buddies.length; i++) {
        let buddyname = buddies[i].displayName.toLowerCase().replace(/\s/g, "");
        string.toLowerCase().toLowerCase().replace(/\s/g, "");

        if (buddyname.includes(string)) {
          if (!searchResult.includes(buddies[i])) {
            result.push(buddies[i]);
          }
        }
      }
      setResult(result);
    }
  };

  useEffect(() => {
    fetchBuddies();
  }, []);

  if (isLoaded) {
    return (
      <div className="item-buddies">
        <div className="item-buddy-search">
          <div className="item-buddy-search-bar">
            <input
              type="text"
              name="input-gunbuddy"
              id="input-gunbuddy"
              onInput={(e) => {
                setResult([]);
                searchGunbuddy(e.target.value);
              }}
            />
            <FontAwesomeIcon id="search-icon" icon={faSearch} />
          </div>
          <div className="item-buddy-search-result">
            {searchResult.map((buddy) => (
              <div className="item-buddy-pic">
                <img src={buddy.displayIcon} title={buddy.displayName}></img>
              </div>
            ))}
          </div>
        </div>
        <div className="item-buddy-list">
          {buddies.map((buddy) => (
            <div className="item-buddy-pic">
              <img src={buddy.displayIcon} title={buddy.displayName}></img>
            </div>
          ))}
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
export default ItemBuddies;
