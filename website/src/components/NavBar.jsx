import React from 'react';
import "./stylesheets/NavBar.css";
import image from './images/Banner.png'
import ParticlesBg from 'particles-bg';

export default function NavBar(props) {
  return (
    <div className='navBar'>
      <div id='navParticles'>
        <ParticlesBg num={5} color='#252525' type="custom" bg={true} config={{
          num: [4, 4],
          rps: 0.1,
          radius: [5, 40],
          life: [1.5, 3],
          v: [2, 3],
          tha: [-40, 40],
          alpha: [0.6, 0],
          scale: [.1, 0.6],
          position: "all",
          color: ["#FFFF00", "#050843"],
          cross: "dead",
          // emitter: "follow",
          random: 15
        }} />
      </div>
      <a href='/'>
        <img
          id='glow'
          style={{ filter: `drop-shadow(5px 5px 0px ${props.pageColour})` }}
          src={image}
          alt='logo'
        />
        <img
          style={{ filter: `drop-shadow(5px 5px 0px ${props.pageColour})` }}
          src={image}
          alt='logo'
        />
      </a>
      <div className='navOptions'>
      <div className='option'>
          <div>
            <span><a href='/posts'>Posts</a></span>
          </div>
        </div><div className='option'>
          <div>
            <span><a href='/articles'>Articles</a></span>
          </div>
        </div>
        <div className='option'>
          <div>
            <span><a href='https://github.com/ninjabattler'>Github</a></span>
          </div>
        </div>
        <div className='option'>
          <div>
            <span><a href='/about'>About</a></span>
          </div>
        </div>
      </div>
    </div>
  )
}