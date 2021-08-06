import React from 'react';
import JsxParser from 'react-jsx-parser';
import FireText from './animatedText/FireText';
import ThunderText from './animatedText/ThunderText';
import IceText from './animatedText/IceText';
import EarthText from './animatedText/EarthText';
import "./stylesheets/Paragraph.css";

export default function Paragraph(props) {
  return (
    <div className='paragraph'>
      <JsxParser
        components={{ FireText, EarthText, IceText, ThunderText }}

        jsx={`<p>${props.text}</p>`}
      />
      {/* <p dangerouslySetInnerHTML={{ __html: props.text }}></p> */}
    </div>
  )
}