import React from 'react';
import JsxParser from 'react-jsx-parser';
import FireText from './animatedText/FireText';
import ThunderText from './animatedText/ThunderText';
import IceText from './animatedText/IceText';
import EarthText from './animatedText/EarthText';
import RegexText from './animatedText/RegexText';
import styles from "../styles/Paragraph.module.css";

export default function Paragraph(props) {
  return (
    <div className={styles.paragraph}>
      <JsxParser
        components={{ FireText, EarthText, IceText, ThunderText, RegexText }}

        jsx={`<p>${props.text}</p>`}
      />
    </div>
  )
}