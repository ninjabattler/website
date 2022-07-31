import { React, useState } from 'react';
import styles from "../styles/NavBar.module.css";
import Link from 'next/link'

export default function NavBar(props) {

  const [drop, setDrop] = useState(false)
  const setLinkClicked = props.setLinkClicked;

  return (
    <>
      {/* {linkClicked && (<LoadingOverlay />)} */}
      <div className={styles.navBar}>
        <p onClick={() => { setLinkClicked("/") }} id={styles.shadow}></p>
        <div className={styles.spaceBackground}></div>
        <Link href="/">
          <a onClick={(e) => { e.preventDefault(); setLinkClicked("/") }}>
            <img
              id={styles.glow}
              style={{ filter: `drop-shadow(5px 5px 0px ${props.pageColour})` }}
              src='/Banner.png'
              alt='logo'
            />
            <img
              style={{ filter: `drop-shadow(5px 5px 0px ${props.pageColour})` }}
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
          <div className={styles.option} onMouseLeave={() => { setDrop(false) }}>
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
    </>
  )
}