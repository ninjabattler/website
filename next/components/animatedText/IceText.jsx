import React from 'react';
import styles from '../../styles/IceText.module.css'

export default function IceText(props){

  //Define a snowFlakes array and the add a push a flame icon for each letter in props.text
  // const snowFlakes = [];

  // for(let i = 0; i < props.text.length; i +=2 ) {
  //   const animDelay = Math.random() * 3;
  //   snowFlakes.push((
  //     <span
  //       className='symbol'
  //       style={{
  //         paddingTop: `${Math.random() * 50}px`, 
  //         marginLeft: `${((i * 10) + Math.random() * 10) - 10}px`, 
  //         fontSize: `${Math.random()}em`, 
  //         animationDelay: `${animDelay}s`}}>
  //       <i 
  //         class="fas fa-snowflake"
  //         style={{
  //           animationDelay: `${animDelay}s`
  //         }}
  //       ></i>
  //     </span>
  //   ))
  // }

  return (
    <span className={styles.iceText}>
      {/* {snowFlakes} */}
      {props.text}
    </span>
  )
}