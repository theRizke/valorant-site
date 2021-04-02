import React, { useState, useEffect } from 'react';

import './App.css';

function ItemBuddies() {
    
    const [buddies, setBuddies] = useState([]);

    const fetchBuddies = async () => {
    const data = await fetch("https://valorant-api.com/v1/buddies");
    const buddiesRaw = await data.json();
    setBuddies(buddiesRaw.data);
  };

  useEffect(() => {
    fetchBuddies();
  }, []);

  
  return (
    <div className='item-buddies'>
       {buddies.map(buddy =>(
           <div className="item-buddy-pic">
               <img src={buddy.displayIcon} title={buddy.displayName}></img> 
            </div>
        
       ))} 
    </div>
  );
}

export default ItemBuddies;
