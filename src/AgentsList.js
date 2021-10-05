import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";

import "./App.css";
import "./css/agents.css";
import AgentInfo from "./AgentInfo";

function AgentsList() {
  //AGENTLIST
  const [agents, setAgents] = useState([]);
  const [isAgentsLoaded, setAgentsLoaded] = useState(false);

  const [selectedAgent, selectAgent] = useState();
  const [isDefaultAgentSelected, setDefaultAgentSelected] = useState(false);

  const [isAllLoaded, setAllLoaded] = useState(false);

  const fetchItems = async () => {
    const data = await fetch("https://valorant-api.com/v1/agents");
    const agentsRaw = await data.json();
    const agentsArray = [agentsRaw.data];
    agentsArray[0].splice(5, 1);
    setAgents(agentsArray[0]);
    setAgentsLoaded(true);
  };

  useEffect(() => {
    fetchItems();
    if (isAgentsLoaded) {
      let id = Math.floor(Math.random() * (agents.length));
      selectAgent(agents[id]);
      setDefaultAgentSelected(true);
    }
  }, [isAgentsLoaded]);

  useEffect(() => {
    if (isDefaultAgentSelected) {
      setTimeout(() => {
        setAllLoaded(true);
      }, 1000);

    }
  }, [isDefaultAgentSelected]);

  const selectedAgentStyle = (data) =>{
    if(selectedAgent.uuid == data.uuid)
    {
      return ({background: "rgba(255, 255, 255, 0.8)",
              border: "2px solid grey"})
  }
  else{return;}
}

  if (isAllLoaded) {
    return (
      <div className="agent-site">
        <div class="agent-data">
         <AgentInfo data={selectedAgent} />
        </div>

        <div className="agent-list">
          {agents.map((agent) => (
            <div
              key={agent.uuid}
              className="icon"
              onClick={() => {
                selectAgent(agent);
              }}
              
            >
              <img
                className="agent-icon"
                src={agent.displayIcon}
                alt={agent.displayName}
                title={agent.displayName}
                style={selectedAgentStyle(agent)}
              ></img>
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

export default AgentsList;
