import styles from "../styles/HomePage.module.scss";
import React, { FC } from "react";
import { AppData } from "../types";
import HomePageHead from "../components/PageMetadata/HomePageHead";
import ReviewPageBackground from "../components/backgrounds/ReviewPageBackground/ReviewPageBackground";

export default function Home({}: FC<{}> & AppData) {
  return (
    <>
      <HomePageHead />
      <ReviewPageBackground />

      <main id={styles.homePage}>
        <img src="/newBanner.webp" />
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
