import React, { ComponentType, CSSProperties } from 'react';
import styles from './Comment.module.scss';
import { ColourType } from '../../types';
import { styleText } from '../../helpers/articlePageHelpers';
import moment from 'moment';

const avatars = {
  avatar1: '/userAvatars/Mask 1.png',
  avatar2: '/userAvatars/Mask 2.png',
  avatar3: '/userAvatars/Mask 3.png',
  avatar4: '/userAvatars/Mask 4.png',
  avatar5: '/userAvatars/Mask 5.png'
}

export type CommentProps = {
  username: string;
  content: string;
  style?: CSSProperties;
  pageColour: ColourType;
  avatar: number;
  date?: string
}

const Comment: ComponentType<CommentProps> = ({ username, content, style, pageColour, avatar, date }) => (
  <article className={styles.comment} style={style}>
    <img className={styles.avatar} src={avatars[`avatar${avatar}`]} style={{ borderColor: pageColour || 'var(--light-gray)' }} alt='profile pic' />
    <div>
      <b>Ninja #{username}</b>
      <i>{moment(date).fromNow(true)}</i>
      <p dangerouslySetInnerHTML={{ __html: styleText(content) }}></p>
    </div>
  </article>
)

export default Comment