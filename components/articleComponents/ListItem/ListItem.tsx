import React, { ComponentType } from 'react';
import { ColourType } from '../../../types';
import styles from "./ListItem.module.scss";

type ListItemProps = {
  imgSrc: string;
  pageColour?: ColourType;
  content: string;
}

const ListItem: ComponentType<ListItemProps> = ({ imgSrc, pageColour, content }) => (
  <li className={styles.listItem}>
    {/* If given an image source, show that, otherwise show the shuriken svgs */}
    {imgSrc ?
      (<img
        src={imgSrc.replace('http://', 'https://')}
        alt=''
      />)
      :
      (<img
        src={'/shuriken.svg'}
        alt=''
      />)}
    <p dangerouslySetInnerHTML={{ __html: content }}></p>
  </li>
)

export default ListItem