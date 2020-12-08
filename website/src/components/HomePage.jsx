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
        <h1>Welcome chrome users<i>(I hope)</i>!</h1>
        <u></u>
        <p>I don't know how you found this sight but since you're here, why not stick around? It's pretty quite
          in here right now but I plan on changing that as soon as possible by filling this sight with uninformed
          opinions, video games retro and new, and whatever else I so choose to post. Check out my about page to learn
          more about me!
        </p>
      </div>
    </>
  )
}