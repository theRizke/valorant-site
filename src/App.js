import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import Nav from './Nav';
import Home from './Home';
import Agents from './pages/Agents';
import Maps from './pages/Maps';
import Weapons from './Weapons';
import Items from './Items';
import ItemSprays from './ItemSprays';
import ItemBundles from './ItemBundles';
import ItemBuddies from './ItemBuddies';
import ItemPlayercards from './ItemPlayercards';
import ItemSkins from './ItemSkins';


function App() {
  return (
    <div className="body">
      <div className="head">
        <Router>
            <Nav/>
          <div className="content">
            <Switch>
            <Route path="/" exact component={Home}/>
              <Route path="/Home" component={Home}/>
              <Route path="/Agents" component={Agents} />
              <Route path="/Maps" component={Maps} />
              <Route path="/Weapons" component={Weapons} />
              <Route path="/Items" exact component={Items} />
              <Route path="/Items/Sprays" component={ItemSprays} />
              <Route path="/Items/Bundles" component={ItemBundles} />
              <Route path="/Items/Gunbuddies" component={ItemBuddies} />
              <Route path="/Items/Playercards" component={ItemPlayercards} />
              <Route path="/Items/Skins" component={ItemSkins} />
            </Switch>
          </div>
        </Router>
      </div>

    </div>
  );
}

export default App;
