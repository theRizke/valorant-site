import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import Nav from './Nav';
import Home from './pages/Home';
import Agents from './pages/Agents';
import Maps from './pages/Maps';
import Weapons from './pages/Weapons';
import Items from './pages/Items';
import ItemSprays from './pages/items/ItemSprays';
import ItemBundles from './pages/items/ItemBundles';
import ItemBuddies from './pages/items/ItemBuddies';
import ItemPlayercards from './pages/items/ItemPlayercards';
import ItemSkins from './pages/items/ItemSkins';


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
