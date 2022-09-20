import React, { ComponentType } from 'react';
import { ColourType } from '../../../types';
import styles from "./Picture.module.scss";

type PictureProps = {
  imageSrc: string;
  width: string;
  float: 'left' | 'right';
  pageColour?: ColourType
}

const Picture: ComponentType<PictureProps> = ({ imageSrc, width, float, pageColour }) => {

  const floatLeft = float === 'left';
  const floatRight = float === 'right';

  return (
    <div className={`${styles.picture} ${floatLeft && styles.floatingLeft} ${floatRight && styles.floatingRight}`} style={{display: 'inline', '--shadowColour': pageColour} as any}>
      <img
        src={imageSrc.replace('http://', 'https://')}
        style={{ 
          width: width,
          float: float,
          marginLeft: floatLeft && '-12.5%',
          marginRight: (floatRight && '-12.5%') || (floatLeft && '10px'),
        }}
        alt=''
        loading="lazy"
      />
    </div>
  )
}

export default Picture