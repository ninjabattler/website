import { React, useState } from 'react';
import './stylesheets/Comment.css';
import FireText from './animatedText/FireText';
import IceText from './animatedText/IceText';
import ThunderText from './animatedText/ThunderText';
import EarthText from './animatedText/EarthText';
import JsxParser from 'react-jsx-parser';

export default function Comment(props){

  const [closed, setClosed] = useState(true)

  return (
  <article className='comment'>
    <div className='avatar'></div>
    <span></span>
    <i>Anonymous-4ba8hA</i>
    <span>You fucking asshole how dare you talk shit about this masterpiece!!!!</span>
  </article>)
}