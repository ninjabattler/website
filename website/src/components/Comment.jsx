import { React, useState } from 'react';
import './stylesheets/Comment.css';
import avatar1 from './images/userAvatars/Mask 1.png'
import avatar2 from './images/userAvatars/Mask 2.png'
import avatar3 from './images/userAvatars/Mask 3.png'
import avatar4 from './images/userAvatars/Mask 4.png'
import avatar5 from './images/userAvatars/Mask 5.png'

const avatars = {
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5
}

export default function Comment(props){

  const [closed, setClosed] = useState(true)

  return (
  <article className='comment'>
    <img className='avatar' src={avatars[`avatar${props.avatar}`]} style={{filter: `drop-shadow(2px 2px 0px ${props.pageColour || 'transparent'})`}}/>
    <header style={{textShadow: `1px 1px 0px ${props.pageColour || 'transparent'}`}}>
      <i>Anon-{props.username}</i>
      <p>{props.date}</p>
    </header>
    <span>{props.content}</span>
  </article>)
}