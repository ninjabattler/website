import React, { ComponentType } from 'react';
import styles from "./NavBar.module.scss";
import Link from 'next/link'
import { ColourType } from '../../types';

type NavBarProps = {
  setLinkClicked: Function;
  pageColour?: ColourType;
}

const NavBar: ComponentType<NavBarProps> = ({ setLinkClicked, pageColour }) => (
  <div className={styles.navBar}>
    <p onClick={() => { setLinkClicked("/") }} id={styles.shadow}></p>
    <div className={styles.spaceBackground}></div>
    <Link href="/">
      <a onClick={(e) => { e.preventDefault(); setLinkClicked("/") }}>
        <img
          id={styles.glow}
          style={{ filter: `drop-shadow(5px 5px 0px ${pageColour})` }}
          src='/Banner.png'
          alt='logo'
        />
        <img
          style={{ filter: `drop-shadow(5px 5px 0px ${pageColour})` }}
          src='/Banner.png'
          alt='logo'
        />
      </a>
    </Link>
    
    <div className={`${styles.navOptions} ${styles.navOptionsOverlay}`}></div>
    <div className={styles.navOptions}>
      <div className={styles.option}>
        <div>
          <Link href="/posts" ><a onClick={(e) => { e.preventDefault(); setLinkClicked("/posts") }}>Posts</a></Link>
        </div>
      </div><div className={styles.option}>
        <div>
          <Link href="/articles" ><a onClick={(e) => { e.preventDefault(); setLinkClicked("/articles") }}>Articles</a></Link>
        </div>
      </div>
      <div className={styles.option}>
        <div>
          <span><a href='https://github.com/ninjabattler' target='_blank' rel="noreferrer">Github</a></span>
        </div>
      </div>
      <div className={styles.option}>
        <div>
          <Link href="/about" ><a onClick={(e) => { e.preventDefault(); setLinkClicked("/about") }}>About</a></Link>
        </div>
      </div>
    </div>
  </div>
)

export default NavBar