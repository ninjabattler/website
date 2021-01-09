import { React, useState } from 'react';
import './stylesheets/Post.css';

export default function PostShadow(props){

  const [closed, setClosed] = useState(true)

  return (
  <article className='post shadow'>
    <div className='left'>
      <h1>
        {props.title}
      </h1>
      <div className={closed ? 'closed' : 'dropDown'} >
      </div>
      <div className='optionsBar'>
        <i class="fas fa-align-justify"></i>
      </div>
    </div>
    <div className='right'>
    </div>
  </article>)
}