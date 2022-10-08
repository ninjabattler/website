import React, { ComponentType } from 'react';
import JsxParser from 'react-jsx-parser';
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

type ParagraphProps = {
  text: string;
}

const Paragraph: ComponentType<ParagraphProps> = ({ text }) => (
  <div className={styles.paragraph}>
    {/* @ts-ignore - JsxParser has an error with how it exports, works perfectly fine though */}
    <JsxParser
      components={{ FireText, EarthText, IceText, ThunderText, RegexText, MetalHeadText, TerrariaText, Picture, Spoiler } as {}}

      jsx={`<p>${text}</p>`}
    />
  </div>
)

export default Paragraph