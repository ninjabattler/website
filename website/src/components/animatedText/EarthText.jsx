import React from 'react';
import "./stylesheets/EarthText.css";

export default function EarthText(props){

  //Define a leaves array and the add a push a leaf icon for each letter in props.text
  const leaves = [];

  for(let i = 0; i < props.text.length; i +=2 ) {
    const animDelay = Math.random() * 3;
    leaves.push((
      <span
        className='symbol'
        style={{
          paddingTop: `${Math.random() * 50}px`, 
          marginLeft: `${((i * 20) + Math.random() * 10) - 10}px`, 
          fontSize: `${Math.random()}em`, 
          animationDelay: `${animDelay}s`}}>
        <i 
          class="fas fa-leaf"
          style={{
            animationDelay: `${animDelay}s`
          }}
        ></i>
      </span>
    ))
  }

  return (
    <span className='earthText'>
      {/* {leaves} */}
      {props.text}
    </span>
  )
}