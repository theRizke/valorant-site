import React, { useState, useEffect } from 'react';
import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'




import '../../App.css';
import '../../css/items.css';


function ItemBundles() {



  const[bundles, setBundles] = useState([]);
  const[bundlesLoaded, setBundlesLoaded] = useState(false);

  const[selectedBundle, selectBundle] = useState([]);
  const[selectedBundleLoaded, setSelectedBundleLoaded] = useState(false);
  const[isLoaded, setLoaded] = useState(false);

 
  
  
  const fetchBundles = async () => {
    const data = await fetch('https://valorant-api.com/v1/bundles');
    const bundlesRaw = await data.json();
    const bundle = [bundlesRaw.data];
    sortByName(bundle[0]);
    setBundles(bundle[0]);
    setBundlesLoaded(true);
  }
   
  const sortByName = (data) => {
    let m = data.length;
    while (m > 1) {
      for (let i = 0; i < data.length - 1; i++) {
        if (data[i].displayName > data[i + 1].displayName) {
          let temp = data[i];
          data[i] = data[i + 1];
          data[i + 1] = temp;
        }
      }
      m--;
    }
    return;
  };

  const searchBundle = (string) =>{
    if(string.length > 2){
      for(let i = 0; i < bundles.length; i++)
      {
        let bundlename = bundles[i].displayName.substring(0,string.length).toLowerCase();
        if(bundlename == string.toLowerCase())
        {
          selectBundle(bundles[i]);
        }
      }
    }
  }

  const backgroundCSS = {
     background: ` url('${selectedBundle.displayIcon}')`
  }
  
  const checkSelectedStyle = (data) =>{
    if(data.uuid == selectedBundle.uuid){
      return ({border: "2px solid whitesmoke"})
    }
    else{return}
  }

  const setBundleIcon = (bundle) =>{
    if(bundle.verticalPromoImage){ return bundle.verticalPromoImage}
    else {return bundle.displayIcon}
  }

  useEffect(() => {
    fetchBundles();
  }, []);

  useEffect(() => {
    if(bundlesLoaded){
      let rndBundle = Math.floor(Math.random()*bundles.length)
      selectBundle(bundles[rndBundle]);
      setSelectedBundleLoaded(true);
    }
  }, [bundlesLoaded]);

  useEffect(() => {
    if(selectedBundleLoaded)
    {
    setLoaded(true);
    }
  }, [selectedBundleLoaded]);
  
  if (!isLoaded) {
    return (<div className="loading-div"><Loader type="Oval" color="#FFF" height={150} width={150} /></div>)
  }
  else{
  return (
    <div className="item-bundles">
      <div className="item-bundle-left">
        <div className="item-bundle-search">
          <input type="text" name="input-bundle" id="input-bundle" onInput={(e) => searchBundle(e.target.value)}/>
          <FontAwesomeIcon id="search-icon" icon={faSearch}/>
        </div>
         <div className="item-bundle-list">
          
            {bundles.map(bundle => (
                <div className="bundle-list-pic" onClick={() => {selectBundle(bundle)}} >
                    <img src={setBundleIcon(bundle)} title={bundle.displayName} srcset="" style={checkSelectedStyle(bundle)}/>
                </div>
            ))}
       </div>
       </div>
      
       <div key={selectedBundle.uuid} className="item-bundle-infos" style={backgroundCSS}>
            <div className="bundle-name">
                {selectedBundle.displayName}
            </div>
       </div>
       <div key={selectedBundle.uuid + "loading"} className="bundles-load-div">
         <Loader type="ThreeDots" color="#FFF" height={150} width={150} />
       </div>

    </div>
    
   
  );}
}

export default ItemBundles;
