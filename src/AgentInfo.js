import React, { useState, useEffect } from 'react';
import Loader from "react-loader-spinner";

import './App.css';
import AgentAbilities from './AgentAbilities';



function AgentInfo(props) {
  return (
    
    <div className="agent-data">
      
      <div className="left">
        <div key={props.data.displayName} className="character-name">

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


export default AgentInfo;
