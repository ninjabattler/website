import React from 'react';
import "./stylesheets/Picture.css";

export default function Picture(props){
  return (
    <img
      className='picture'
      src={props.imageSrc}
      style={{filter: `drop-shadow(5px 5px 0px ${props.pageColour})`}}
    />
  )
}