import { React, useState } from 'react';
import styles from "../styles/NavBar.module.css";
// import ParticlesBg from 'particles-bg';

export default function NavBar(props) {

  const [drop, setDrop] = useState(false)

  return (
    <div className={styles.navBar}>
      <a id={styles.shadow}></a>
      <div id={styles.navParticles}>
        {/* <ParticlesBg num={5} color='#252525' type="custom" bg={true} config={{
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
        }} /> */}
      </div>
      <a>
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
      <div className={styles.navOptions}>
        <div className={styles.option}>
          <div>
            <span><a>Posts</a></span>
          </div>
        </div><div className={styles.option}>
          <div>
            <span><a>Articles</a></span>
          </div>
        </div>
        <div className={styles.option} onMouseEnter={() => { setDrop(true) }} onMouseLeave={() => { setDrop(false) }}>
          <div>
            <span><a>Social</a></span>
          </div>
        </div>
        <div className={styles.option}>
          <div>
            <span><a>About</a></span>
          </div>
        </div>
      </div>

      {/* Drop down lists */}
      <div className={styles.navOptions} style={{ opacity: drop ? 1 : 0, height: 0 }}>
        <div className={styles.option} style={{ opacity: '0', zIndex: -10000, height: 0 }}>
          <div>
            {/* <span><a>Posts</a></span> */}
          </div>
        </div><div className={styles.option} style={{ opacity: '0', zIndex: -10000, height: 0 }}>
          <div>
            {/* <span><a>Articles</a></span> */}
          </div>
        </div>
        <div className={styles.option} onMouseEnter={() => { drop ? setDrop(true) : setDrop(false) }} onMouseLeave={() => { setDrop(false) }}>
          {drop ? 
            (<div style={{ textAlign: 'left', marginLeft: '-0px', alignItems: 'flex-start' }}>
              <span><a><i class="fab fa-linkedin"></i> Linkedin</a></span>
              <span><a><i class="fab fa-github"></i> Github</a></span>
            </div>)
            :
            (<></>)
          }
        </div>
        <div className={styles.option} style={{ opacity: '0', zIndex: -10000, height: 0 }}>
          <div>
            {/* <span><a>About</a></span> */}
          </div>
        </div>
      </div>
    </div>
  )
}