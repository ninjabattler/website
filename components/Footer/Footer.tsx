import React, { FC } from "react";
import styles from "./Footer.module.scss";
import { Twitter, GitHub, Instagram, Email } from "@mui/icons-material";

/**
 * The footer of the website, with links to my socials and contacts
 * @author Ninjabattler
 */
const Footer: FC = () => (
  <footer className={styles.footer}>
    <div>
      <a
        href="https://twitter.com/ninjabattler"
        target="_blank"
        rel="noreferrer"
      >
        <Twitter />
      </a>
      <a
        href="https://www.instagram.com/ninjabattler/"
        target="_blank"
        rel="noreferrer"
      >
        <Instagram />
      </a>
    </div>

    <img src="/Ninja placeholder.png" alt="logo" />

    <div>
      <a
        href="https://github.com/ninjabattler"
        target="_blank"
        rel="noreferrer"
      >
        <GitHub />
      </a>
      <a href="mailto:ninjabattler@ninjabattler.ca">
        <Email />
      </a>
    </div>
  </footer>
);

export default Footer;
