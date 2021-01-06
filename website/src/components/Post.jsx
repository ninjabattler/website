import { React, useState } from 'react';
import './stylesheets/Post.css';
import image from './images/Ninja placeholder.png'

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
      </div>
      <div className='optionsBar'
        onClick={() => {setClosed(!closed)}}
      >
        <i class="fas fa-align-justify"></i>
      </div>
    </div>
    <div className='right'>
      <img src={image}/>
    </div>
  </article>)
}