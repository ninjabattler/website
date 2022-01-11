import { React, useState, useEffect } from 'react';
import styles from "../styles/Picture.module.css";

export default function Picture(props) {
  const [windowServer, setWindow] = useState({})

  useEffect(() => {
    setWindow(window)
  }, [])

  return (
    <div className={styles.picture}>
      <img
        src={props.imageSrc.replace('http://', 'https://')}
        style={windowServer.innerWidth < 426 ? { filter: `drop-shadow(2px 2px 0px ${props.pageColour})` } : { filter: `drop-shadow(5px 5px 0px ${props.pageColour})` }}
        alt=''
      />
    </div>
  )
}