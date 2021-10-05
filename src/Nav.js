
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import './App.css';
import './css/nav.css';

function Nav() {

  const [display, setDisplay] = useState("none");
  const [activeMenu, setActiveMenu] = useState();

  const menus = ["Agents", "Maps", "Home", "Weapons", "Items"];

  const selectedMenu = (data) =>{
    if(data == activeMenu && data != "Home" && display == "none"){
      return ({color: "burlywood"});
    }
    else{return}
  }


  return (
    <div className="menu">


      {/* DESKTOP */}
      <div className="navigation">
        {menus.map((menu) => (
          <Link to={`/${menu}`} onClick={() => {setActiveMenu(menu)}} style={selectedMenu(menu)}><li>{menu}</li></Link>
        ))
        }
      </div>

      {/* //MOBILE */}
      <div className="navigation-hamburger" onClick={() => { if (display == "none") { setDisplay("flex") } else { setDisplay("none") }; document.querySelector('.body').scrollTo({ top: 0, behavior: 'smooth' }) }}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div className="navigation-mobile" style={{ display: display }}>
        {menus.map((menu) => (
          <Link to={`/${menu}`} onClick={() => {setActiveMenu(menu)}} style={selectedMenu(menu)}><li>{menu}</li></Link>
        ))
        }
      </div>
    </div>

  );
}

export default Nav;
