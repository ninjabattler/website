import React from 'react';
import "./stylesheets/Paragraph.css";

export default function Paragraph(props){
  return (
    <div className='paragraph'>
      <p dangerouslySetInnerHTML={{__html: props.text}}></p>
    </div>
  )
}