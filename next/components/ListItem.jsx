import React from 'react';
import styles from "../styles/ListItem.module.css";

export default function ListItem(props){
  return (
    <li className={styles.listItem}>
      {/* If given an image source, show that otherwise show the shuriken svgs */}
      {props.imgSrc ? 
      (<img
        style={{filter: `drop-shadow(5px 5px 0px ${props.pageColour})`}}
        src={props.imgSrc}
        alt=''
      />)
      :
      (<img
        style={{filter: `drop-shadow(1px 1px 0px ${props.pageColour})`}}
        src={'/shuriken.svg'}
        alt=''
      />)}
      {props.content}
    </li>
  )
}