import { React, useState } from 'react';
import "./stylesheets/NavBar.css";
import image from './images/Banner.png'
import ParticlesBg from 'particles-bg';

export default function NavBar(props) {

  const [drop, setDrop] = useState(false)

  return (
    <div className='navBar'>
      <a id='shadow' href='/'></a>
      <div id='navParticles'>
        <ParticlesBg num={5} color='#252525' type="custom" bg={true} config={{
          num: [2, 4],
          rps: 0.1,
          radius: [5, 40],
          life: [1.5, 3],
          v: [1, 2],
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
        <div className='option' onMouseEnter={() => { setDrop(true) }} onMouseLeave={() => { setDrop(false) }}>
          <div>
            <span><a>Social</a></span>
          </div>
        </div>
        <div className='option'>
          <div>
            <span><a href='/about'>About</a></span>
          </div>
        </div>
      </div>

      {/* Drop down lists */}
      <div className='navOptions lists' style={{ opacity: drop ? 1 : 0, height: 0 }}>
        <div className='option' style={{ opacity: '0', zIndex: -10000, height: 0 }}>
          <div>
            <span><a href='/posts'>Posts</a></span>
          </div>
        </div><div className='option' style={{ opacity: '0', zIndex: -10000, height: 0 }}>
          <div>
            <span><a href='/articles'>Articles</a></span>
          </div>
        </div>
        <div className='option' onMouseEnter={() => { drop ? setDrop(true) : setDrop(false) }} onMouseLeave={() => { setDrop(false) }}>
          {drop ? 
            (<div style={{ textAlign: 'left', marginLeft: '-0px', alignItems: 'flex-start' }}>
              <span><a href='https://www.linkedin.com/in/jayden-tucker-52a5711ba/'><i class="fab fa-linkedin"></i> Linkedin</a></span>
              <span><a href='https://github.com/ninjabattler'><i class="fab fa-github"></i> Github</a></span>
            </div>)
            :
            (<></>)
          }
        </div>
        <div className='option' style={{ opacity: '0', zIndex: -10000, height: 0 }}>
          <div>
            <span><a href='/about'>About</a></span>
          </div>
        </div>
      </div>
    </div>
  )
}