import React from 'react';
import "./stylesheets/TitleCard.css";

export default function TitleCard(props){
  return (
    <div className={`bossCard ${props.inverse ? 'inverse' : ''}`}>
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

      <h2 style={{textShadow: `1px 1px 0px ${props.pageColour}`}}>{props.title}</h2>
    </div>
  )
}