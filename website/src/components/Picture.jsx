import React from 'react';
import "./stylesheets/Picture.css";

export default function Picture(props) {
  return (
    <div className='picture'>
      <img
        src={props.imageSrc}
        style={{ filter: `drop-shadow(5px 5px 0px ${props.pageColour})` }}
        alt=''
      />
    </div>
  )
}