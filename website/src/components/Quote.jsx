import React from 'react';
import "./stylesheets/Quote.css";

export default function Quote(props){
  return (
    <div className='quote'>
      <div>
        <h2>"</h2>
        <p><i>{props.quote}</i></p>
        <h2>"</h2>
      </div>
      <h3>{props.source}</h3>
    </div>
  )
}