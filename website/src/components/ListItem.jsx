import React from 'react';
import "./stylesheets/ListItem.css";
import shuriken from './images/shuriken.svg';

export default function ListItem(props){
  return (
    <li className='listItem'>
      {/* If given an image source, show that otherwise show the shuriken svgs */}
      {props.imgSrc ? 
      (<img
        style={{filter: `drop-shadow(5px 5px 0px ${props.pageColour})`}}
        src={props.imgSrc}
        alt=''
      />)
      :
      (<img
        style={{filter: `drop-shadow(1px 1px 0px ${props.pageColour})`}}
        src={shuriken}
        alt=''
      />)}
      {props.content}
    </li>
  )
}