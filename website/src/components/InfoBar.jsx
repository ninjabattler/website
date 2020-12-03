import React from 'react';
import "./stylesheets/InfoBar.css";

export default function InfoBar(props){
  return (
    <div className='infoBar'>
      <div className='infoUnderline'></div>
      <span>{new Date(Date.now()).getFullYear()}, {new Date(Date.now()).getDay()}, {new Date(Date.now()).getDate()}</span>
    </div>
  )
}