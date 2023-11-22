import React, { FC } from 'react';
import styles from "./Dialogue.module.scss";
import { SanityImage } from '../../../types';
import Image from 'next/image';

type DialogueProps = {
  text: string;
  speaker: string;
  image: SanityImage;
  invert?: boolean;
}

/**
 * Component used to display a quote with and a speaker's name, in the style of a dialogue box
 * @author Ninjabattler
 * @param text The main content of the Dialogue box
 * @param speaker The name of the speaker
 * @param image An image, usually a portrait to display
 * @param invert An optional value to display the speaker and image on the right rather than left
 */
const Dialogue: FC<DialogueProps> = ({ text, speaker, image, invert }) => (
  <div className={`${styles.dialogue} ${invert ? styles.invert : ''}`}>
    <div className={styles.space} />
    <div className={`${styles.space} ${styles.gradient}`} />

    <Image
      src={image.url}
      width={image.width}
      height={image.height}
      loading='lazy'
      placeholder="blur"
      blurDataURL={image.blur}
      alt={image.alt}
    />

    <div className={styles.textBox}>
      <p>{text}</p>
    </div>

    <h3>{speaker}</h3>
  </div>
);

export default Dialogue