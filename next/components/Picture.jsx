import { React, useState, useEffect } from 'react';
import styles from "../styles/Picture.module.css";

export default function Picture(props) {
  const [windowServer, setWindow] = useState({})

  useEffect(() => {
    setWindow(window)
  }, [])

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