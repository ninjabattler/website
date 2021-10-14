import React from 'react';
import './stylesheets/About.css'
import { Helmet } from "react-helmet";
import ninjabattler from './images/Ninja placeholder.png'

export default function About(props){
  return (
    <div id='about'>
      <Helmet>
        <title>Ninjabattler - About</title>
      </Helmet>
      <div className='left'></div>
      <img src={ninjabattler} alt='logo'/>
      <div className='right'></div>
      <br></br>
      <div id='content'>
        <h1>About everything</h1>
        <p>Im a junior web developer that had nothing better to do with my time so I made this site using some words I copied off of google.
          I plan to use this sight as a way to talk about my passion for both programming and video games. Now while I could just use any 
          form of social media out there, I think this is much more fun. This site was built using
        </p>
        <h1>
          <i class="fab fa-node"></i>
          <span>Express.js</span> 
          <i class="fab fa-react"></i>
        </h1>
        <p>
          I've put links to my github and linkedin in the footer of this site iff for some reason you would want that. Other than that 
          you can read my posts.
        </p>
      </div>
    </div>
  )
}