import React, { FC } from 'react';
import { SanityImage } from '../../../types';
import styles from "./ListItem.module.scss";
import Image from 'next/image';

type ListItemProps = {
  image: SanityImage;
  content: string;
}

/**
 * An <li> tag with an optional image for a custom bullet point
 * @author Ninjabattler
 * @param content The main content of the List Item
 * @param image An optional image for the custom bullet point
 */
const ListItem: FC<ListItemProps> = ({ image, content }) => (
  <li className={styles.listItem}>
    <Image
      src={image.url ? image.url : '/shuriken.svg'}
      width={image.width ? image.width : 1920}
      height={image.height ? image.height : 1080}
      loading='lazy'
      placeholder="blur"
      blurDataURL={image.blur ? image.blur : ''}
      alt={image.alt ? image.alt : ''}
    />
    <span>{content}</span>
  </li>
)

export default ListItem