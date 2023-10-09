import React, { ComponentType } from 'react';
import FireText from '../../animatedText/FireText/FireText';
import ThunderText from '../../animatedText/ThunderText/ThunderText';
import IceText from '../../animatedText/IceText/IceText';
import EarthText from '../../animatedText/EarthText/EarthText';
import RegexText from '../../animatedText/RegexText/RegexText';
import MetalHeadText from '../../animatedText/MetalHeadText/MetalHeadText';
import TerrariaText from '../../animatedText/TerrariaText/TerrariaText';
import styles from "./Paragraph.module.scss";
import Picture from '../Picture/Picture';
import Spoiler from '../Spoiler/Spoiler';
import { ParagraphItem, PictureItem } from '../../../types';
import { PortableText } from '@portabletext/react';

type ParagraphProps = {
  content: Array<any>;
}

const Paragraph: ComponentType<ParagraphProps> = ({ content }) => (
  <div className={styles.paragraph}>
    <PortableText value={content} />
  </div>
)

export default Paragraph