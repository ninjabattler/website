import { React, useState } from 'react';
import './stylesheets/Post.css';
import FireText from './animatedText/FireText';
import IceText from './animatedText/IceText';
import ThunderText from './animatedText/ThunderText';
import EarthText from './animatedText/EarthText';

export default function Posts(props){

  const [closed, setClosed] = useState(true)

  return (
  <article className='post'>
    <div className='left'>
      <h1>
        {props.title}
      </h1>
      <div className={closed ? 'closed' : 'dropDown'}>
        {props.content}
        <EarthText text='I be a test'/>
        {props.content}
      </div>
      <div className='optionsBar'
        onClick={() => {setClosed(!closed)}}
      >
        <i class="fas fa-align-justify"></i>
      </div>
    </div>
    <div className='right'>
      <img src={props.image ? props.image : null}/>
    </div>
  </article>)
}