import React from 'react';
import "./stylesheets/NavBar.css";
import image from'./images/Banner.png'
import ParticlesBg from 'particles-bg';

export default function NavBar(props){
  return (
    <div className='navBar'>
      <a href='/'>
        <img 
          style={{filter: `drop-shadow(5px 5px 0px ${props.pageColour})`}}
          src={image}
        />
      </a>
      <div className='navOptions'>
        <div className='option'>
          <div>
            <i class="fas fa-sticky-note"></i>
            <span><a href='/posts'>Posts</a></span>
          </div>
        </div>
        <div className='option'>
          <div>
            <i class="fas fa-info-circle"></i>
            <span><a href='/about'>About</a></span>
          </div>
        </div>
      </div>
      <ParticlesBg num={50} color='#252525' type="cobweb" bg={true} />
    </div>
  )
}