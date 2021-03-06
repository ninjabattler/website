import React from 'react';
import "./stylesheets/InfoBar.css";

export default function InfoBar(props){
  return (
    <div className='infoBar'>
      <div className='infoUnderline'></div>
      <span>
        <div>
          <i class="fas fa-calendar-alt"></i>
          {props.date}
        </div>
        <div>
          <i class="fas fa-gamepad"></i>
          {props.categoryGenre}
        </div>
      </span>
    </div>
  )
}