import React from 'react';
import './stylesheets/VideoHeader.css'
// import video from './test/CosmicCarnage.mp4';

export default function VideoHeader(props) {
  return (
    <div className='videoHeader'>
      <div id="videoContainer">
        {!props.video.startsWith('htt') && (<div id="videoOverlay" style={{backgroundColor: props.pageColour}}></div>)}
        <video loop muted autoPlay >
          <source src={props.video} type="video/webm"></source>
          <source src={props.video} type="video/ogg"></source>
          <source src={props.video} type="video/mp4"></source>
        </video>
      </div>

      <div className='bar2'></div>
      <div className='barC' style={{ borderBottomColor: props.pageColour, borderRightColor: "transparent" }}></div>
      <div className='bar1'></div>

      <h1 style={{ textShadow: `1px 1px 0px ${props.pageColour}` }}>
        {props.title}
      </h1>
    </div>
  )
}