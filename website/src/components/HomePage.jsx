import React from 'react';
import './stylesheets/HomePage.css'
import splashVideo from './images/Splash Video.mp4'

export default function HomePage(props){
  return (
    <>
      <div id='homePage'>
        <video autoPlay muted>
          <source src={splashVideo} type='video/mp4'></source>
        </video>
      </div>
    </>
  )
}