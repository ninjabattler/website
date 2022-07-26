import { React, useState } from 'react';
import styles from "../styles/NavBar.module.css";
import Link from 'next/link'
import { LinkedIn, GitHub } from '@material-ui/icons'
import LoadingOverlay from './LoadingOverlay';
// import ParticlesBg from 'particles-bg';

export default function NavBar(props) {

  const [drop, setDrop] = useState(false)
  const [linkClicked, setLinkClicked] = useState(false)

  return (
    <>
      {linkClicked && (<LoadingOverlay />)}
      <div className={styles.navBar}>
        <p onClick={() => { setLinkClicked(true) }} id={styles.shadow}></p>
        <div className={styles.spaceBackground}></div>
        <Link href="/">
          <a onClick={() => { setLinkClicked(true) }}>
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
              <Link href="/posts" ><a onClick={() => { setLinkClicked(true) }}>Posts</a></Link>
            </div>
          </div><div className={styles.option}>
            <div>
              <Link href="/articles" ><a onClick={() => { setLinkClicked(true) }}>Articles</a></Link>
            </div>
          </div>
          <div className={styles.option} onMouseLeave={() => { setDrop(false) }}>
            <div>
              <span><a href='https://github.com/ninjabattler' target='_blank' rel="noreferrer">Github</a></span>
            </div>
          </div>
          <div className={styles.option}>
            <div>
              <Link href="/about" ><a onClick={() => { setLinkClicked(true) }}>About</a></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}