import React from 'react';
import './stylesheets/HomePage.css'
import splashVideo from './images/Splash Video.mp4'
// import cosmicCarnage from './images/CosmicCarnage.mp4'
// import AudioPlayer from './AudioPlayer'

export default function HomePage(props){
  return (
    <div id='homePage'>
      <video autoPlay muted>
        <source src={splashVideo} type='video/mp4'></source>
      </video>
      <h1>Welcome chrome users<i>(I hope)</i>!</h1>
      <u></u>
      <p>I don't know how you found this site but since you're here, why not stick around? It's pretty quiet
        in here right now but I plan on changing that as soon as possible by filling this sight with uninformed
        opinions, video games retro and new, and whatever else I so choose to post. 
      </p>
      {/* <AudioPlayer title='Nights and Reala' pageColour='#FFFF00' src='https://vgmsite.com/soundtracks/nights-into-dreams-full-selection/nrivivhx/14%20-%20%28reala%29%20%28nights%20%26%20reala%29.mp3' /> */}

    </div>
  )
}