import React from 'react';
import JsxParser from 'react-jsx-parser';
import FireText from '../../animatedText/FireText/FireText';
import ThunderText from '../../animatedText/ThunderText/ThunderText';
import IceText from '../../animatedText/IceText/IceText';
import EarthText from '../../animatedText/EarthText/EarthText';
import RegexText from '../../animatedText/RegexText/RegexText';
import MetalHeadText from '../../animatedText/MetalHeadText/MetalHeadText';
import TerrariaText from '../../animatedText/TerrariaText/TerrariaText';
import Emoji from '../Emoji/Emoji';
import styles from "./Paragraph.module.css";
import Picture from '../../Picture';

export default function Paragraph(props) {
  return (
    <div className={styles.paragraph}>
      <JsxParser
        components={{ FireText, EarthText, IceText, ThunderText, RegexText, MetalHeadText, TerrariaText, Emoji, Picture }}

        jsx={`<p>${props.text}</p>`}
      />
    </div>
  )
}