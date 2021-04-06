import React, { useState, useEffect } from 'react';
import {CSSTransition} from 'react-transition-group';

import './App.css';


function AgentAbility(props) {

    const ability = props.data;
    
    const [abilityDESC, setabilityDESC] = useState(ability[4]);
    
    useEffect(() => { setabilityDESC(ability[0])}, [ability[0]]);

  return (
    <div className='abilities'>
         


        <div key={ability[0].slot + ability[1].displayIcon} className="all-ability" >
        <div className="ability" onClick={() => {setabilityDESC(ability[0])}}>
            <img className='ab-icon' src={ability[0].displayIcon} ></img>
        </div>
        <div className="ability" onClick={() => {setabilityDESC(ability[1])}}>
            <img className='ab-icon' src={ability[1].displayIcon} ></img>
        </div>
        <div className="ability" onClick={() => {setabilityDESC(ability[2])}}>
            <img className='ab-icon' src={ability[2].displayIcon} ></img>
        </div>
        <div className="ability" onClick={() => {setabilityDESC(ability[3])}}>
            <img className='ab-icon' src={ability[3].displayIcon} ></img>
        </div>
        </div>
        <div key={abilityDESC.displayName} className="ability-desc">
            <div className="ability-name">
                {abilityDESC.displayName}
            </div>
            
            <div className="ability-description">
           
                {abilityDESC.description}
        
            </div>
        </div>

    </div>
  );
}

export default AgentAbility;
