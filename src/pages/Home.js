import React, { useState, useEffect } from "react";

import "../App.css";
import "../css/home.css";

function Home() {
  const defaultItem = {
    branch: "?",
    version: "?",
    buildVersion: "?",
    buildDate: "?",
  };
  const [info, setInfo] = useState(defaultItem);

  const fetchData = async () => {
    const data = await fetch("https://valorant-api.com/v1/version");
    const dataRaw = await data.json();
    setInfo(dataRaw.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="home-screen">
      <div className="home-title">
        VALORANT INFO SITE
      </div>
      <div className="home-powered">
        Powered by Valorant-API.com <br />
        Version: {info.version} <br />
        Last API update: {info.buildDate.split("T")[0]}
      </div>
      <div className="home-video">
        <video className="bgvideo" loop autoPlay muted>
          <source src="https://davidriz.hu/valorant/HomeScreen.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export default Home;
