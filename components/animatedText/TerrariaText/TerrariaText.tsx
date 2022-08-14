import React, { ReactElement } from 'react';
import styles from './TerrariaText.module.css';

export interface TerrariaTextProps {
  text: string;
  colour: string;
  draedon: boolean;
  yharim: boolean;
  moonlord: boolean;
}

export default function TerrariaText({ text, colour, draedon, yharim, moonlord }: TerrariaTextProps): ReactElement {
  return (
    <span
      className={`${styles.terrariaText} ${draedon && styles.draedon} ${moonlord && styles.moonlord} ${yharim && styles.yharim}`}
      style={colour && { color: colour }}
    >
      <b>{text}</b>
    </span>
  )
}