import styles from "../styles/HomePage.module.scss";
import React, { FC } from "react";
import HomePageHead from "../components/PageMetadata/HomePageHead";
import HomePageBackground from "../components/backgrounds/HomePageBackground/HomePageBackground";

export default function Home({}: FC<{}> & AppData) {
  return (
    <>
      <HomePageHead />
      <HomePageBackground />

      <main id={styles.homePage}>
        {/* <img src="/newBanner.webp" /> */}
        <em>
          {
            '"Designs improved with time and knowledge are the essence of my work. Through no other method can I approach perfection."'
          }
        </em>
        <span>- Draedon, Calamity Mod</span>
      </main>
    </>
  );
}
