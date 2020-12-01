import React from 'react';
import './stylesheets/VideoHeader.css'
import video from './test/0001-0900.mp4';

export default function VideoHeader(props){
  return (
    <div className='videoHeader'>
      <video loop muted autoPlay >
        <source src={video} type="video/mp4"></source>
      </video>

      <div className='bar2'></div>
      <div className='barC' style={{borderColor: props.pageColour, borderRightColor: "transparent"}}></div>
      <div className='bar1'></div>

      <h1 style={{textShadow: `4px 4px 0px ${props.pageColour}`}}>
        {props.title}
      </h1>
    </div>
  )
}