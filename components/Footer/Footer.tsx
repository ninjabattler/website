import React, { ReactElement } from "react";
import styles from "./Footer.module.scss";
// import { Twitter, GitHub, Instagram } from '@material-ui/icons';

export default function Footer(): ReactElement {
  return (
    <footer className={styles.footer}>
      <div className={styles.sketch} />

      <section id={styles.linksSection}>
        <img src={"/Ninja placeholder.png"} alt="logo" />
        <div>
          {/* <a href='https://twitter.com/ninjabattler' target='_blank' rel='noreferrer'><Twitter /> Twitter</a>
          <a href='https://www.instagram.com/ninjabattler/' target='_blank' rel='noreferrer'><Instagram /> Instagram</a>
          <a href='https://github.com/ninjabattler' target='_blank' rel='noreferrer'><GitHub /> Github</a> */}
        </div>
      </section>
    </footer>
  );
}
