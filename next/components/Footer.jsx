import React from 'react';
import styles from "../styles/Footer.module.css";

export default function Footer(props){
  return (
    <footer className={styles.footer}>
      <div className={styles.topBar}>
      
      </div>
      <section id={styles.copyrightSection}>
        <img src={'/Ninja placeholder.png'} />
        <p>© Ninjabattler 2020</p>
      </section>
    </footer>
  )
}