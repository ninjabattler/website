import React, { ComponentType } from 'react';
import { ColourType } from '../../../types';
import styles from './TerrariaText.module.css';

type TerrariaTextProps = {
  text: string;
  colour: ColourType;
  draedon: boolean;
  yharim: boolean;
  moonlord: boolean;
}

const TerrariaText: ComponentType<TerrariaTextProps> = ({ text, colour, draedon, yharim, moonlord }) => (
  <span
    className={`${styles.terrariaText} ${draedon && styles.draedon} ${moonlord && styles.moonlord} ${yharim && styles.yharim}`}
    style={colour && { color: colour }}
  >
    <b>{text}</b>
  </span>
)

export default TerrariaText