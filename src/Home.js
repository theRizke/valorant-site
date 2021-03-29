import React from 'react';

import './App.css';
import bgvid from './home.mp4';

function Home() {
  return (
    <div className="home-screen">
        <video className="bgvideo" loop autoPlay muted>
         <source src= { bgvid } type="video/mp4" />
        </video>   
    </div>
  );
}

export default Home;
