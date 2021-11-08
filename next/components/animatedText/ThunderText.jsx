import React from 'react';
import styles from '../../styles/ThunderText.module.css'

export default function ThunderText(props){

  //Define a bolts array and the add a push a flame icon for each letter in props.text
  // const bolts = [];

  // for(let i = 0; i < props.text.length; i +=2 ) {
  //   const animDelay = Math.random() * 3;
  //   bolts.push((
  //     <span
  //       className='symbol'
  //       style={{
  //         paddingTop: `${Math.random() * 50}px`, 
  //         marginLeft: `${((i * 20) + Math.random() * 10) - 10}px`, 
  //         fontSize: `${Math.random()}em`, 
  //         animationDelay: `${animDelay}s`}}>
  //       <i 
  //         class="fas fa-bolt"
  //         style={{
  //           animationDelay: `${animDelay}s`
  //         }}
  //       ></i>
  //     </span>
  //   ))
  // }

  return (
    <span className={styles.thunderText}>
      {/* {bolts} */}
      {props.text}
    </span>
  )
}