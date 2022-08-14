import React, { ComponentType, CSSProperties } from 'react';
import styles from './Comment.module.css';
import FireText from '../animatedText/FireText/FireText';
import ThunderText from '../animatedText/ThunderText/ThunderText';
import IceText from '../animatedText/IceText/IceText';
import EarthText from '../animatedText/EarthText/EarthText';
import RegexText from '../animatedText/RegexText/RegexText';
import MetalHeadText from '../animatedText/MetalHeadText/MetalHeadText';
import JsxParser from 'react-jsx-parser';
import { ColourType } from '../../types';

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
    <img className={styles.avatar} src={avatars[`avatar${avatar}`]} style={{ filter: `drop-shadow(1px 1px 0px ${pageColour || 'transparent'})` }} alt='profile pic' />
    <div>
      <i>Ninja #{username}</i>
      <JsxParser
        components={{ FireText, EarthText, IceText, ThunderText, RegexText, MetalHeadText } as {}}

        jsx={`<p>${content}</p>`}
      />
    </div>
  </article>
)

export default Comment