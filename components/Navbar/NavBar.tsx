import React, { ComponentType, useCallback, useState } from "react";
import styles from "./NavBar.module.scss";
import Link from "next/link";
import { ColourType } from "../../types";
import { TiersIcon } from "@sanity/icons";

type NavBarProps = {
  setLinkClicked: Function;
  pageColour?: ColourType;
  isArticlePage: Boolean;
};

/**
 * Main navbar component for the site
 * @author ninjabattler
 * @prop setLinkClicked Function
 */
const NavBar: ComponentType<NavBarProps> = ({
  setLinkClicked,
  pageColour,
  isArticlePage,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const openMenu = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <div
      className={`${styles.navBar} ${isArticlePage ? styles.articlePage : ""} ${
        open ? styles.fullscreen : ""
      }`}
    >
      <div className={styles.sketch} />
      <div className={styles.space} />

      <div className={styles.navOptions}>
        <button onClick={openMenu}>
          <TiersIcon />
        </button>
      </div>

      <div className={styles.links}>
        <img src="/newBanner.png" />

        <Link legacyBehavior href={`/posts`}>
          <a
            onClick={(e) => {
              e.preventDefault();
              setLinkClicked(`/posts`);
            }}
          >
            Posts
          </a>
        </Link>
        <Link legacyBehavior href={`/articles`}>
          <a
            onClick={(e) => {
              e.preventDefault();
              setLinkClicked(`/articles`);
            }}
          >
            Articles
          </a>
        </Link>
        <Link legacyBehavior href={`/about`}>
          <a
            onClick={(e) => {
              e.preventDefault();
              setLinkClicked(`/about`);
            }}
          >
            About
          </a>
        </Link>
      </div>

      <div className={styles.profileBar}>
        <img src="/userAvatars/Mask 4.png" alt="profile picture" />
        <span>Unknown Ninja</span>
      </div>
    </div>
  );
};

export default NavBar;
