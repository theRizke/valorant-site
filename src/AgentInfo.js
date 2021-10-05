import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";

import './App.css';
import './css/agents.css';
import AgentAbilities from './AgentAbilities';


function AgentInfo(props) {

  const [isLoaded, setLoaded] = useState();

  useEffect(()=>{
    setLoaded(false)
  },[])
  

  setTimeout(()=>{
    setLoaded(true)
  }, 500);



  if(isLoaded){
    return (
    
    <div key={props.data.displayName} className="agent-data">
      <div className="left">
        <div  className="character-name">

          <div className="character-role">
          <img className="role-icon" src={props.data.role.displayIcon}></img>
          </div>
          <div  className="character-displayname">
          {props.data.displayName}
          </div>
        </div>
      <div key={props.data.description} className="character-description">
        {props.data.description}
      </div>
        <AgentAbilities data={props.data.abilities}/>
      </div>
      <div className="right">
        <div className="character-pic">
          <img key={props.data.displayName} className="bust-portrait" src={props.data.bustPortrait}></img>
        </div>
      </div>
    </div>
  );
}
else {
  return (
    <div className="loading-div">
      <Loader type="Oval" color="#FFF" height={150} width={150} />
    </div>
  );
}

}
export default AgentInfo;
