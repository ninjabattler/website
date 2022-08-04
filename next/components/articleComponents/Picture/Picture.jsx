import { React } from 'react';
import styles from "./Picture.module.css";

export default function Picture(props) {

  const floatLeft = props.float === 'left';
  const floatRight = props.float === 'right';

  return (
    <div className={`${styles.picture} ${floatLeft && styles.floatingLeft} ${floatRight && styles.floatingRight}`} style={{display: 'inline'}}>
      <img
        src={props.imageSrc.replace('http://', 'https://')}
        style={{ 
          width: props.width,
          float: props.float,
          marginLeft: floatLeft && '-12.5%',
          marginRight: (floatRight && '-12.5%') || (floatLeft && '10px')
        }}
        alt=''
        loading="lazy"
      />
    </div>
  )
}