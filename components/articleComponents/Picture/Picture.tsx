import React, { ComponentType } from 'react';
import { ColourType } from '../../../types';
import styles from "./Picture.module.scss";

type PictureProps = {
  imageSrc: string;
  width?: string;
  float?: 'left' | 'right';
  pageColour?: ColourType
}

const Picture: ComponentType<PictureProps> = ({ imageSrc, width, float, pageColour }) => {

  const floatLeft = float === 'left';
  const floatRight = float === 'right';

  return (
    <div
      className={`${styles.picture} ${floatLeft && styles.floatingLeft} ${floatRight && styles.floatingRight}`}
      style={{
        display: 'inline-flex', '--shadowColour': pageColour,
        width: width ? `calc(${width} - 1.3vw)` : '100%',
        float: float,
        marginLeft: (floatLeft && 'calc(-12.5% - 0.5vw)') || (floatRight && 'calc(0.6em + 0.5vw)'),
        marginRight: (floatRight && 'calc(-12.5% - 0.5vw)') || (floatLeft && 'calc(0.6em + 0.5vw)'),
      } as any}
    >
      <img
        src={imageSrc.replace('http://', 'https://')}
        alt=''
        loading="lazy"
      />
    </div>
  )
}

export default Picture