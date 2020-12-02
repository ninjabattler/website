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
        <button>Search</button>
      </div>
    </div>
  )
}