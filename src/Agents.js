import React, { useState, useEffect } from 'react';

import './App.css';
import AgentsList from './AgentsList';
import AgentInfo from './AgentInfo';


function Agents() {

  return (
    <div className='agent-site'>
        <AgentsList />
    </div>
  );
}

export default Agents;
