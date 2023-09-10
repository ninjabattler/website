import React, { ComponentType } from 'react';
import styles from "./NavBar.module.scss";
import Link from 'next/link'
import { ColourType } from '../../types';
import { ClearAllSharp } from '@material-ui/icons';

type NavBarProps = {
  setLinkClicked: Function;
  pageColour?: ColourType;
  isArticlePage: Boolean;
}

const NavBar: ComponentType<NavBarProps> = ({ setLinkClicked, pageColour, isArticlePage }) => (
  <div className={`${styles.navBar} ${isArticlePage ? styles.articlePage : ""}`}>
    {/* <div className={styles.spaceOverlay} /> */}
    <div className={styles.sketch} />

    <div className={styles.navOptions}>
      <button>
        <ClearAllSharp />
      </button>
    </div>
  </div>
)

export default NavBar