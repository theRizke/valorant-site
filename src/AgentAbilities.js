import React, { useState, useEffect } from "react";
import "./App.css";


function AgentAbility(props) {
  const ability = props.data;

  const [abilityDESC, setabilityDESC] = useState(ability[0]);

  useEffect(() => {
    setabilityDESC(ability[0]);
  }, [ability[0]]);

  const selectedAbilityStyle = (data) => {
    if (abilityDESC.displayName == data.displayName) {
      return { background: "rgba(0, 0, 0, 0.8)", border: "2px solid grey" };
    } else {
      return;
    }
  };

  const setAbilityIcon = (data) => {
    if (data.slot == "Passive") {
      return "/noabicon.png" }
     else {
      return  data.displayIcon ;
    }
  };

  

  return (
    <div className="abilities" >
      <div
        key={ability[0].slot + ability[1].displayIcon}
        className="all-ability"
      >
        {ability.map((ability) => (
          <div
            className="ability"
            onClick={() => {
              setabilityDESC(ability);
            }}
          >
            <img
              className="ab-icon"
              src={setAbilityIcon(ability)}
              title={ability.displayName}
              alt={ability.displayName}
              style={selectedAbilityStyle(ability)}
            ></img>
          </div>
        ))}
      </div>
      <div key={abilityDESC.displayName} className="ability-desc">
        <div className="ability-name">{abilityDESC.displayName}</div>

        <div className="ability-description">{abilityDESC.description}</div>
      </div>
    </div>
  );
}

export default AgentAbility;
