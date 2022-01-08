import React from 'react';


import '../App.css';
import '../css/agents.css';

import AgentsList from './agents/AgentsList';



function Agents() {

  return (
    <div className='agent-site'>
        <AgentsList />
    </div>
  );
}

export default Agents;
