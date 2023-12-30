import React, { ComponentType } from 'react';
import styles from "./Picture.module.scss";
import Image from 'next/image';
import { SanityImage } from '../../../types';

type PictureProps = {
  picture: SanityImage;
  width?: number;
  float?: 'Left' | 'Right';
  source?: string;
  sourceLink?: string;
}

const Picture: ComponentType<PictureProps> = ({ picture, width, float, source, sourceLink }) => {
  const floatLeft = width < 100 && float === 'Left';
  const floatRight = width < 100 && float === 'Right';

  return (
    <figure
      className={`${styles.picture} ${floatLeft && styles.floatingLeft} ${floatRight && styles.floatingRight}`}
      style={{
        display: 'inline-flex',
        width: width && width < 100 ? `calc(${width}%)` : '100%',
        float: width < 100 ? float : null,
        marginLeft: (floatLeft && 'calc(-12.5%)') || (floatRight && 'calc(0.6em + 0.5vw)'),
        marginRight: (floatRight && 'calc(-12.5%)') || (floatLeft && 'calc(0.6em + 0.5vw)'),
      } as any}
    >
      <Image
        className={styles.banner}
        src={picture.url}
        width={picture.width}
        height={picture.height}
        loading='lazy'
        placeholder="blur"
        blurDataURL={picture.blur}
        alt={picture.alt}
      />
      
      {
        source &&
        <figcaption>
          <a href={sourceLink} target='_blank' rel='noreferrer'>
            {source}
          </a>
        </figcaption>
      }
    </figure>
  )
}

export default Picture