import { React, useState, useEffect } from 'react';
import styles from "../styles/Picture.module.css";

export default function Picture(props) {
  const [windowServer, setWindow] = useState({})

  useEffect(() => {
    setWindow(window)
  }, [])

  const calcMargin = (width) => {
    if (!width) {
      return undefined;
    } else {
      const widthNumber = Number(width.split('%')[0]);
      const margin = (100 - widthNumber) / 2;

      return `-${margin}%`;
    }
  }

  return (
    <div className={styles.picture} style={{display: 'inline'}}>
      <img
        src={props.imageSrc.replace('http://', 'https://')}
        style={{ 
          filter: windowServer.innerWidth < 426 ? `drop-shadow(0px 2px 0px ${props.pageColour})` : `drop-shadow(0px 5px 0px ${props.pageColour})`, 
          width: props.width,
          float: props.float,
          marginLeft: props.float === 'left' && '-12.5%',
          marginRight: (props.float === 'right' && '-12.5%') || (props.float === 'left' && '10px')
        }}
        alt=''
        loading="lazy"
      />
    </div>
  )
}