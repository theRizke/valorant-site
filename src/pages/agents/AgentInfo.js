import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";

import "../../App.css";
import "../../css/agents.css";
import AgentAbilities from './AgentAbilities';


function AgentInfo(props) {

  const [isLoaded, setLoaded] = useState(false);
  const agent = props.data;

  setTimeout(() => {
    setLoaded(true)
  }, 500);


  if (isLoaded) {
    return (
      <div key={agent.displayName} className="agent-data">
        <audio src={agent.voiceLine.mediaList[0].wave} autoPlay></audio>
        <div className="left">
          <div className="character-name">

            <div className="character-role">
              <img className="role-icon" src={agent.role.displayIcon}></img>
            </div>
            <div className="character-displayname">
              {agent.displayName}
            </div>
          </div>
          <div key={agent.description} className="character-description">
            {agent.description}
          </div>
          <AgentAbilities data={agent.abilities} />
        </div>
        <div className="right">
          <div className="character-pic">
            <img key={agent.displayName} className="bust-portrait" src={agent.bustPortrait}></img>
          </div>
        </div>
      </div>
    );
  }
  else {
    return (
      <div className="">
        <Loader type="Oval" color="#FFF" height={150} width={150} />
      </div>
    );
  }

}
export default AgentInfo;
