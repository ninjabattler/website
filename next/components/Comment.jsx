import { React } from 'react';
import styles from '../styles/Comment.module.css';

const avatars = {
  avatar1: '/userAvatars/Mask 1.png',
  avatar2: '/userAvatars/Mask 2.png',
  avatar3: '/userAvatars/Mask 3.png',
  avatar4: '/userAvatars/Mask 4.png',
  avatar5: '/userAvatars/Mask 5.png'
}

export default function Comment(props){

  return (
  <article className={styles.comment}>
    <img className={styles.avatar} src={avatars[`avatar${props.avatar}`]} style={{filter: `drop-shadow(2px 2px 0px ${props.pageColour || 'transparent'})`}} alt='profile pic' />
    <header style={{textShadow: `1px 1px 0px ${props.pageColour || 'transparent'}`}}>
      <i>Anon-{props.username}</i>
      <p>{props.date}</p>
    </header>
    <span>{props.content}</span>
  </article>)
}