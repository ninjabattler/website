import React from 'react';
import './stylesheets/About.css'
import ninjabattler from './images/ninjabattlerCapeOverlay.png'

export default function About(props){
  return (
    <div id='about'>
      <div id='stats'>
        <h1>Ninjabattler</h1>
        <h3>Lvl: 54</h3>
        <ul>
          <li>Attack: 156</li>
          <li>Intellegence: 70</li>
          <li>Defense: 50</li>
          <li>Magic-Def: 100</li>
          <li>Speed: 140</li>
        </ul>
      </div>
      <img src={ninjabattler}/>
    </div>
  )
}