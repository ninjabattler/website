import React, { ReactElement } from 'react';
import styles from "./Footer.module.css";

export default function Footer(): ReactElement {
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