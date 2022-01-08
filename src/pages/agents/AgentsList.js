import React, { useState, useEffect } from "react";
import Agent from "../../model/Agent";
import AgentInfo from "./AgentInfo";
import Loader from "react-loader-spinner";

import "../../App.css";
import "../../css/agents.css";


function AgentsList() {

  const [agents, setAgents] = useState([]);
  const [isAgentsLoaded, setAgentsLoaded] = useState(false);
  const [selectedAgent, selectAgent] = useState();
  const [isDefaultAgentSelected, setDefaultAgentSelected] = useState(false);
  const [isAllLoaded, setAllLoaded] = useState(false);

  const fetchItems = async () => {
    const data = await fetch("https://valorant-api.com/v1/agents");
    const agentsRaw = await data.json();

    const agentObjects = new Array;
    agentsRaw.data.forEach(agent => {
        agentObjects.push(new Agent(agent))
    });

    setAgents(agentObjects);
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


  const selectedAgentStyle = (agent) => {
    if (selectedAgent.data.uuid == agent.data.uuid) {
      return ({
        background: "rgba(255, 255, 255, 0.8)",
        border: "2px solid grey"
      })
    }
    else { return; }
  }

  if (isAllLoaded) {
    return (
      <div className="agent-site">
        <div class="agent-data">
          <AgentInfo data={selectedAgent.data} />
        </div>

        <div className="agent-list">
          {agents.filter(agent => agent.visible).map((agent) => (
            <div
              key={agent.data.uuid}
              className="icon"
              onClick={() => {
                selectAgent(agent);
              }}
            >
              <img
                className="agent-icon"
                src={agent.data.displayIcon}
                alt={agent.data.displayName}
                title={agent.data.displayName}
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
