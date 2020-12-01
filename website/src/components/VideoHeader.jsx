import React from 'react';
import './stylesheets/VideoHeader.css'
import video from './test/0001-0900.mp4';

export default function VideoHeader(props){
  return (
    <div className='videoHeader'>
      <video loop muted autoPlay >
        <source src={video} type="video/mp4"></source>
      </video>
    </div>
  )
}