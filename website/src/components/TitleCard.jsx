import React from 'react';
import "./stylesheets/TitleCard.css";

export default function TitleCard(props){
  return (
    <div className='bossCard'>
      <div className='background2' style={{borderColor: props.pageColour, borderRightColor: "transparent"}}></div>
      <div className='background1'></div>

      {props.imageSrc ? 
      (<div className='imageContainer' style={{filter: `drop-shadow(5px 5px 0px ${props.pageColour})`}}> 
        <img
          src={props.imageSrc}
        />
      </div>)
      :
      (null)
      }   

      <h1 style={{textShadow: `2px 2px 0px ${props.pageColour}`}}>{props.title}</h1>
    </div>
  )
}