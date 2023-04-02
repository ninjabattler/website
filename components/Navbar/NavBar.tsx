import React, { ComponentType } from 'react';
import styles from "./NavBar.module.scss";
import Link from 'next/link'
import { ColourType } from '../../types';

type NavBarProps = {
  setLinkClicked: Function;
  pageColour?: ColourType;
  isArticlePage: Boolean;
}

const NavBar: ComponentType<NavBarProps> = ({ setLinkClicked, pageColour, isArticlePage }) => (
  <div className={`${styles.navBar} ${isArticlePage ? styles.articlePage : ""}`}>
    <div className={styles.spaceOverlay} />
    <div className={styles.sketch} />

    <Link href="/">
      <a onClick={(e) => { e.preventDefault(); setLinkClicked("/") }}>

        {
          isArticlePage ?
            (
              <div
                className={styles.logoOverlay}
              />
            )
            :
            (
              <img
                // style={{ filter: `drop-shadow(5px 5px 0px ${pageColour})` }}
                src={isArticlePage ? '/bannerBW.webp' : '/banner.webp'}
                alt='logo'
              />
            )
        }
      </a>
    </Link>

    <div className={styles.navOptions}>
      <Link href="/posts" ><a className={styles.option} onClick={(e) => { e.preventDefault(); setLinkClicked("/posts") }}>Posts</a></Link>

      <Link href="/articles" ><a className={styles.option} onClick={(e) => { e.preventDefault(); setLinkClicked("/articles") }}>Articles</a></Link>

      <a className={`${styles.option} ${styles.reverse}`} href='https://github.com/ninjabattler' target='_blank' rel="noreferrer">Github</a>

      <Link href="/about" ><a className={`${styles.option} ${styles.reverse}`} onClick={(e) => { e.preventDefault(); setLinkClicked("/about") }}>About</a></Link>
    </div>
  </div>
)

export default NavBar