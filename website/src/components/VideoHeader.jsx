import React from 'react';
import './stylesheets/VideoHeader.css'
// import video from './test/CosmicCarnage.mp4';

export default function VideoHeader(props){
  return (
    <div className='videoHeader'>
      <video loop muted autoPlay >
        <source src={props.video} type="video/mp4"></source>
      </video>

      <div className='bar2'></div>
      <div className='barC' style={{borderBottomColor: props.pageColour, borderRightColor: "transparent"}}></div>
      <div className='bar1'></div>

      <h1 style={{textShadow: `4px 4px 0px ${props.pageColour}`}}>
        {props.title}
      </h1>
    </div>
  )
}