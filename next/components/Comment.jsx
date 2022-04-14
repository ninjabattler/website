import { React } from 'react';
import styles from '../styles/Comment.module.css';

const avatars = {
  avatar1: '/userAvatars/Mask 1.png',
  avatar2: '/userAvatars/Mask 2.png',
  avatar3: '/userAvatars/Mask 3.png',
  avatar4: '/userAvatars/Mask 4.png',
  avatar5: '/userAvatars/Mask 5.png'
}

export default function Comment(props) {

  return (
    <article className={styles.comment} style={props.style}>
      <img className={styles.avatar} src={avatars[`avatar${props.avatar}`]} style={{ filter: `drop-shadow(1px 1px 0px ${props.pageColour || 'transparent'})` }} alt='profile pic' />
      <div>
        <i style={{ textShadow: `1px 1px 0px ${props.pageColour || 'transparent'}` }}>Ninja #{props.username}</i>
        <p dangerouslySetInnerHTML={{__html: props.content}}></p>
      </div>
    </article>)
}