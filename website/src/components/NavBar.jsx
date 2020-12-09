import React from 'react';
import "./stylesheets/NavBar.css";
import image from'./images/Banner.png'

export default function NavBar(props){
  return (
    <div className='navBar'>
      <img 
        style={{filter: `drop-shadow(5px 5px 0px ${props.pageColour})`}}
        src={image}
      />
      <div className='navOptions'>
        <input type='text'>
        </input>
        <div className='option'>
          <div>
            <i class="fas fa-info-circle"></i>
            <span><a href='/about'>About</a></span>
          </div>
        </div>
        <button>Search</button>
      </div>
    </div>
  )
}