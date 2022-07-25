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
        {/* <div id={styles.navParticles}>
          <ParticlesBg num={5} color='#252525' type="custom" bg={true} config={{
          num: [2, 4],
          rps: 0.1,
          radius: [5, 40],
          life: [1.5, 3],
          v: [1, 2],
          tha: [-40, 40],
          alpha: [0.6, 0],
          scale: [.1, 0.6],
          position: "all",
          color: ["#FFFF00", "#050843"],
          cross: "dead",
          // emitter: "follow",
          random: 15
        }} />
        </div> */}
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

        {/* Drop down lists */}
        {/* <div className={styles.navOptions} style={{ opacity: drop ? 1 : 0, height: 0 }}>
          <div className={styles.option} style={{ opacity: '0', zIndex: -10000, height: 0 }}>
            <div>
            </div>
          </div><div className={styles.option} style={{ opacity: '0', zIndex: -10000, height: 0 }}>
            <div>
            </div>
          </div>
          <div className={styles.option} onMouseEnter={() => { drop ? setDrop(true) : setDrop(false) }} onMouseLeave={() => { setDrop(false) }}>
            {drop ?
              (<div className={styles.socialLinks} style={{ textAlign: 'left', alignItems: 'flex-start', marginTop: drop ? "90px" : "-100px" }}>
                <span><a onClick={() => { setLinkClicked(true) }} href='https://www.linkedin.com/in/jayden-tucker-52a5711ba/'><LinkedIn /> Linkedin</a></span>
                <span><a onClick={() => { setLinkClicked(true) }} href='https://github.com/ninjabattler'><GitHub /> Github</a></span>
              </div>)
              :
              (<></>)
            }
          </div>
          <div className={styles.option} style={{ opacity: '0', zIndex: -10000, height: 0 }}>
            <div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  )
}