import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";

import "./App.css";
import "./css/ItemSpraysCards.css";

function ItemSprays() {
  //STATES
  const [sprays, setSprays] = useState([]);
  const [IsSpraysLoaded, setSpraysLoaded] = useState(false);

  const [item, setItem] = useState([]);
  const [IsItemLoaded, setItemLoaded] = useState(false);

  const [isLoaded, setLoaded] = useState(false);
  const [currentItemID, setCurrentItemID] = useState();

  const [transform, setTransform] = useState([0, 0]);
  const [clickPos, setClickPos] = useState([]);

  const transformPreview = (data) => {
    let divPosX = data.target.x;
    let divPosY = data.target.y;

    let divHeight = data.target.height;
    let divWidth = data.target.width;

    let mousePosX = data.pageX;
    let mousePosY = data.pageY;

    let midX = divWidth / 2 + divPosX;
    let midY = divHeight / 2 + divPosY;

    let X =  ((clickPos[0] - mousePosX) / 5) ; //(mousePosX - midX) / -4 *
    let Y =  ((clickPos[1] - mousePosY) / 5) ; //(mousePosY - midY) / 4 *

    
    //max 45deg
    if(X > 45){X = 45}
    if(X < -45){X = -45}
    if(Y > 45){Y = 45}
    if(Y < -45){Y = -45}

    setTransform([X, -Y]);

  };

  const transFormCSS = {
    transform: `rotateX(${transform[0]}deg) rotateY(${transform[1]}deg) rotateZ(${(transform[0]+transform[1])/-2}deg)`,
  };

  const fetchSprays = async () => {
    const data = await fetch("https://valorant-api.com/v1/sprays");
    const spraysRaw = await data.json();
    setSprays(spraysRaw.data);
    setSpraysLoaded(true);
  };

  const checkIsNull = (data) => {
    if (data === null) {
      return "https://upload.wikimedia.org/wikipedia/commons/1/15/No_image_available_600_x_450.svg";
    } else {
      return data;
    }
  };

  const setSelectedSprayStyle = (data) => {
    if (data.uuid == item.uuid) {
      return {
        background: "rgba(255, 255, 255, 0.8)",
        border: "2px solid darkgrey",
        
      };
    } else {
      return;
    }
  };

  useEffect(() => {
    fetchSprays();
  }, []);

  useEffect(() => {
    if (IsSpraysLoaded) {
      let rnd = Math.floor(Math.random() * sprays.length);
      setItem(sprays[rnd]);
      setItemLoaded(true);
      setCurrentItemID(rnd);
    }
  }, [IsSpraysLoaded]);

  useEffect(() => {
    if (IsItemLoaded) {
      setTimeout(() => setLoaded(true), 800);
    }
  }, [IsItemLoaded]);

  const setFirstItem = (data) => {
    if (data <= 0) {
      return 0;
    } else if (data >= sprays.length - 13) {
      return sprays.length - 13;
    } else {
      return data;
    }
  };

  const setLastItem = (data) => {
    if (data > sprays.length) {
      return sprays.length;
    } else if (data < 13) {
      return 13;
    } else {
      return data;
    }
  };

  const setCurrent = (data, index) => {
    setItem(data);
    let newItemId = currentItemID + (index - 6);
    if (newItemId > sprays.length) {
      setCurrentItemID(sprays.length - 1);
    } else if (newItemId < 0) {
      setCurrentItemID(0);
    } else {
      setCurrentItemID(newItemId);
    }
  };

  const mouseWheelSelector = (e) =>{
    if(e.deltaY > 0){
      if (currentItemID == sprays.length-1) {
        setCurrentItemID(0);
        setItem(sprays[0]);
      } else {
        setCurrentItemID(currentItemID + 1);
        setItem(sprays[currentItemID + 1]);
      }
    }
    else{
      if(e.deltaY < 0){
        if (currentItemID == 0) {
          setCurrentItemID(sprays.length - 1);
          setItem(sprays[sprays.length - 1]);
        } else {
          setCurrentItemID(currentItemID - 1);
          setItem(sprays[currentItemID - 1]);
        }
      }
    }
  }

  if (isLoaded) {
    return (
      <div className="sprays" onWheel={(e) => {mouseWheelSelector(e)}}>
        <div className="spray-info">
          <div className="spray-name">{item.displayName}</div>
          <div
            className="spray-pic"
            onMouseDown={(e) => {
              setClickPos([e.pageX, e.pageY])
            }}
            onMouseMove={(e) => {
              transformPreview(e);
            }}
            onMouseLeave={(e) => {
              setTransform([0, 0]);
              setClickPos([e.target.x + (e.target.width/2), e.target.y + (e.target.height/2)]);
            }}
            onMouseUp={(e) => {
              setTransform([0, 0]);
              setClickPos([e.target.x + (e.target.width/2), e.target.y + (e.target.height/2)]);
            }}
            style={transFormCSS}
          >
            <img
              key={item.displayName}
              src={checkIsNull(item.fullTransparentIcon)
              }
            />
          </div>
        </div>
        <div key={currentItemID + "_list"} className="spray-list">
          {sprays
            .slice(
              [setFirstItem(currentItemID - 6)],
              [setLastItem(currentItemID + 7)]
            )
            .map((spray, index) => (
              <div
                className="spray-icon"
                style={setSelectedSprayStyle(spray)}
                onClick={() => {
                  setCurrent(spray, index);
                }}
              >
                <img src={spray.displayIcon} />
              </div>
            ))}
        </div>

        <div className="page-control">
          <div
            className="page-back"
            onClick={() => {
              if (currentItemID == 0) {
                setCurrentItemID(sprays.length - 1);
                setItem(sprays[sprays.length - 1]);
              } else {
                setCurrentItemID(currentItemID - 1);
                setItem(sprays[currentItemID - 1]);
              }
            }}
          >
            -
          </div>
          <div className="page-number">
            {currentItemID + 1} / {sprays.length}
          </div>
          <div
            className="page-next"
            onClick={() => {
              if (currentItemID == sprays.length - 1) {
                setCurrentItemID(0);
                setItem(sprays[0]);
              } else {
                setCurrentItemID(currentItemID + 1);
                setItem(sprays[currentItemID + 1]);
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

export default ItemSprays;
