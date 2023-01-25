import React, { ReactElement } from 'react';
import styles from "./Footer.module.scss";

export default function Footer(): ReactElement {
  return (
    <footer className={styles.footer}>
      <div className={styles.topBar}>

      </div>
      <section id={styles.copyrightSection}>
        <img src={'/Ninja placeholder.png'} alt='logo' />
      </section>
    </footer>
  )
}