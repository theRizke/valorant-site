import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router";

import './App.css';
import Agents from './Agents';
import AgentAbilities from './AgentAbilities';



function AgentInfo(props) {

  
    


  return (
    <div class="agent-data">
      <div className="left">
        <div className="character-name">

          <div className="character-role">
          <img className="role-icon" src={props.data.role.displayIcon}></img>
          </div>
          <div className="character-displayname">
          {props.data.displayName}
          </div>
        </div>
      <div className="character-description">
        {props.data.description}
      </div>
        <AgentAbilities data={props.data.abilities}/>
      </div>
      <div className="right">
        <div className="character-pic">
          <img class="bust-portrait" src={props.data.bustPortrait}></img>
        </div>
      </div>
    </div>
  );
}


export default AgentInfo;
