import React from 'react';
import "./stylesheets/FireText.css";

export default function FireText(props){

  //Defin a flames object and the add a push a flame icon for each letter in props.text
  const flames = [];

  for(let i = 0; i < props.text.length; i ++) {
    const animDelay = Math.random() * 3;
    flames.push((
      <span
        className='symbol'
        style={{
          paddingTop: `${Math.random() * 50}px`, 
          marginLeft: `${((i * 20) + Math.random() * 10) - 10}px`, 
          fontSize: `${Math.random()}em`, 
          animationDelay: `${animDelay}s`}}>
        <i 
          class="fas fa-fire-alt"
          style={{
            animationDelay: `${animDelay}s`
          }}
        ></i>
      </span>
    ))
  }

  return (
    <span className='fireText'>
      {flames}
      {props.text}
    </span>
  )
}