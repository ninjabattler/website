import React, { ComponentType } from 'react';
import JsxParser from 'react-jsx-parser';
import FireText from '../../animatedText/FireText/FireText';
import ThunderText from '../../animatedText/ThunderText/ThunderText';
import IceText from '../../animatedText/IceText/IceText';
import EarthText from '../../animatedText/EarthText/EarthText';
import RegexText from '../../animatedText/RegexText/RegexText';
import MetalHeadText from '../../animatedText/MetalHeadText/MetalHeadText';
import TerrariaText from '../../animatedText/TerrariaText/TerrariaText';
import styles from "./Paragraph.module.css";
import Picture from '../Picture/Picture';

type ParagraphType = {
  text: string;
}

const Paragraph: ComponentType<ParagraphType> = ({ text }) => (
  <div className={styles.paragraph}>
    <JsxParser
      components={{ FireText, EarthText, IceText, ThunderText, RegexText, MetalHeadText, TerrariaText, Picture } as {}}

      jsx={`<p>${text}</p>`}
    />
  </div>
)

export default Paragraph