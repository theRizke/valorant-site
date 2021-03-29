import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Link} from 'react-router-dom';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import './App.css';
import AgentInfo from './AgentInfo';



function AgentsList() {


  const defaultAgent ={
    
      "uuid": "320b2a48-4d9b-a075-30f1-1f93a9b638fa",
      "displayName": "Sova",
      "description": "Born from the eternal winter of Russia's tundra, Sova tracks, finds, and eliminates enemies with ruthless efficiency and precision. His custom bow and incredible scouting abilities ensure that even if you run, you cannot hide. ",
      "developerName": "Hunter",
      "characterTags": [
        "Detection",
        "Area Damage"
      ],
      "displayIcon": "https://media.valorant-api.com/agents/320b2a48-4d9b-a075-30f1-1f93a9b638fa/displayicon.png",
      "displayIconSmall": "https://media.valorant-api.com/agents/320b2a48-4d9b-a075-30f1-1f93a9b638fa/displayiconsmall.png",
      "bustPortrait": "https://media.valorant-api.com/agents/320b2a48-4d9b-a075-30f1-1f93a9b638fa/bustportrait.png",
      "fullPortrait": "https://media.valorant-api.com/agents/320b2a48-4d9b-a075-30f1-1f93a9b638fa/fullportrait.png",
      "assetPath": "ShooterGame/Content/Characters/Hunter/Hunter_PrimaryAsset",
      "isFullPortraitRightFacing": false,
      "isPlayableCharacter": true,
      "isAvailableForTest": true,
      "role": {
        "uuid": "1b47567f-8f7b-444b-aae3-b0c634622d10",
        "displayName": "Initiator",
        "description": "Initiators challenge angles by setting up their team to enter contested ground and push defenders away.",
        "displayIcon": "https://media.valorant-api.com/agents/roles/1b47567f-8f7b-444b-aae3-b0c634622d10/displayicon.png",
        "assetPath": "ShooterGame/Content/Characters/_Core/Roles/Breaker_PrimaryDataAsset"
      },
      "abilities": [
        {
          "slot": "Ability1",
          "displayName": "Shock Bolt",
          "description": "EQUIP a bow with a shock bolt. FIRE to send the explosive bolt forward, detonating upon collision and damaging players nearby. HOLD FIRE to extend the range of the projectile. ALTERNATE FIRE to add up to two bounces to this arrow.",
          "displayIcon": "https://media.valorant-api.com/agents/320b2a48-4d9b-a075-30f1-1f93a9b638fa/abilities/ability1/displayicon.png"
        },
        {
          "slot": "Ability2",
          "displayName": "Recon Bolt",
          "description": "EQUIP a bow with recon bolt. FIRE to send the recon bolt forward, activating upon collision and revealing the location of nearby enemies caught in the line of sight of the bolt. Enemies can destroy this bolt. HOLD FIRE to extend the range of the projectile. ALTERNATE FIRE to add up to two bounces to this arrow. ",
          "displayIcon": "https://media.valorant-api.com/agents/320b2a48-4d9b-a075-30f1-1f93a9b638fa/abilities/ability2/displayicon.png"
        },
        {
          "slot": "Grenade",
          "displayName": "Owl Drone",
          "description": "EQUIP an owl drone. FIRE to deploy and take control of movement of the drone. While in control of the drone, FIRE to shoot a marking dart. This dart will reveal the location of any player struck by the dart.",
          "displayIcon": "https://media.valorant-api.com/agents/320b2a48-4d9b-a075-30f1-1f93a9b638fa/abilities/grenade/displayicon.png"
        },
        {
          "slot": "Ultimate",
          "displayName": "Hunter's Fury",
          "description": "EQUIP a bow with three long-range, wall-piercing energy blasts. FIRE to release an energy blast in a line in front of Sova, dealing damage and revealing the location of enemies caught in the line. This ability can be RE-USED up to two more times while the ability timer is active.",
          "displayIcon": "https://media.valorant-api.com/agents/320b2a48-4d9b-a075-30f1-1f93a9b638fa/abilities/ultimate/displayicon.png"
        },
        {
          "slot": "Passive",
          "displayName": "Uncanny Marksman",
          "description": "Sova's custom bow can fire his arrows and bounce them off terrain. Holding fire charges the bow's power, and the bolt is loosed when released. Press alt fire to change the number of bounces.Your arrows can bounce off terrain. Holding left click increases the bow's range trajectory. Right clicking Toggle through the desired number of terrain bounces by right clicking. The arrow is loosed when left click is released.",
          "displayIcon": null
        }
      ]
    }
  


  //AGENTLIST
  const [agents, setAgents] = useState([]);
  
  const fetchItems = async () => {
    const data = await fetch('https://valorant-api.com/v1/agents');
    const agentsRaw= await data.json();
    const agentsArray = [agentsRaw.data];
    agentsArray[0].splice(4,1);
    setAgents(agentsArray[0]);
   
    
  }
  //AGENTID
  const [agentid, setAgentID] = useState('320b2a48-4d9b-a075-30f1-1f93a9b638fa'); //DEFAULT
  
  
  //AGENT
  const [agentinfo, setAgentInfo] = useState(defaultAgent);
  const fetchAgent = async (agentid) => {
    const data = await fetch('https://valorant-api.com/v1/agents/'+agentid);
    const agentinfo= await data.json();
    setAgentInfo(agentinfo.data);
    
  }
  useEffect(() => { fetchItems(); fetchAgent(agentid)}, [agentid]);

  const checkAgentID = (uuid) =>{
    if(uuid == 'ded3520f-4264-bfed-162d-b080e2abccf9')
    {return "320b2a48-4d9b-a075-30f1-1f93a9b638fa"}
    else {return uuid}
  }
  
  
  

  return (
    <div className='agent-site'>
      <CSSTransition
            in={agentinfo} 
            appear={true}
            enter={true}
            timeout={1000}
            classNames="fade">
      <div class="agent-data">
       <AgentInfo data={agentinfo}/>
      </div >
       </CSSTransition>

    <div className='agent-list'>
    
      {agents.map(agent =>
          (
        <div className="icon" onClick={() => {setAgentID(checkAgentID(agent.uuid)); }}>
          <img key={agent.uuid} className='agent-icon' src={agent.displayIcon}></img>
        </div>
          )
      )}
    </div>

    </div>
  );
}

export default AgentsList;
